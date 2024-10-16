import 'package:flutter/material.dart';
import 'package:tennis_app/pages/profile/login_page.dart';
import 'package:tennis_app/services/auth/auth_service.dart';
import 'package:tennis_app/services/bookings/get_court_bookings_service.dart';
import 'package:tennis_app/services/bookings/get_hall_bookings.dart';
import 'package:tennis_app/widgets/linkscreen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:tennis_app/widgets/unlinkscreen.dart';
import 'package:intl/intl.dart';
import 'package:intl/date_symbol_data_local.dart';

class ProfileDetailPage extends StatefulWidget {
  const ProfileDetailPage({super.key});

  @override
  _ProfileDetailPageState createState() => _ProfileDetailPageState();
}

class _ProfileDetailPageState extends State<ProfileDetailPage> {
  final GetCourtBookingService _bookingService = GetCourtBookingService();
  final GetHallBookingService _bookingHallService = GetHallBookingService();
  List<Map<String, dynamic>> _bookings = [];
  List<Map<String, dynamic>> _bookingsHall = [];

  bool _isLoading = true;
  bool _isGoogleCalendarLinked = false;
  final user = AuthService.currentUser;

  @override
  void initState() {
    super.initState();
    initializeDateFormatting('uk', null).then((_) {
      _fetchBookings();
      _fetchHallBookings();
    });
    _checkGoogleCalendarLinkStatus();
  }

  Future<void> _checkGoogleCalendarLinkStatus() async {
    User? currentUser = FirebaseAuth.instance.currentUser;
    print(currentUser);
    if (currentUser != null) {
      setState(() {
        _isGoogleCalendarLinked = currentUser.providerData
            .any((provider) => provider.providerId == 'google.com');
      });
    }
  }

  Future<void> _fetchBookings() async {
    if (user?.uid != null) {
      List<Map<String, dynamic>> bookings =
          await _bookingService.getBookingsByUserId(user!.uid);

      // Filter out bookings that are on or after today
      DateTime now = DateTime.now();
      bookings = bookings.where((booking) {
        DateTime bookingDate = DateTime.parse(booking['bookDate']);
        return bookingDate.isAfter(now.subtract(Duration(days: 1))) ||
            bookingDate.isAtSameMomentAs(now);
      }).toList();

      if (mounted) {
        setState(() {
          _bookings = bookings;
          _isLoading = false;
        });
      }
    } else {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _fetchHallBookings() async {
    if (user?.uid != null) {
      List<Map<String, dynamic>> bookings =
          await _bookingHallService.getBookingsByUserId(user!.uid);

      // Filter out bookings that are on or after today
      DateTime now = DateTime.now();
      bookings = bookings.where((booking) {
        DateTime bookingDate = DateTime.parse(booking['bookDate']);
        return bookingDate.isAfter(now.subtract(Duration(days: 1))) ||
            bookingDate.isAtSameMomentAs(now);
      }).toList();

      if (mounted) {
        setState(() {
          _bookingsHall = bookings;
          _isLoading = false;
        });
      }
    } else {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Профіль',
          style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Color(0xFF221F1F),
              fontSize: 18),
        ),
        centerTitle: true,
        actions: [
          ElevatedButton(
            onPressed: () async {
              await AuthService.logout();
              // Navigate to the login screen using MaterialPageRoute
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => LoginPage()),
              );
            },
            child: Text('Вийти'),
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red, // Button color
              foregroundColor: Colors.white,
              elevation: 0, // Remove shadow
            ),
          ),
          SizedBox(width: 16), // Space between button and edge
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 20),
            ListTile(
              leading: Icon(Icons.phone),
              title: Text('${user?.phoneNumber}'),
            ),
            ListTile(
              leading: Icon(Icons.calendar_month_outlined),
              title: Text(
                'Інтеграція з Google Calendar',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF221F1F),
                    fontSize: 12),
              ),
            ),
            ElevatedButton(
              onPressed: () async {
                if (_isGoogleCalendarLinked) {
                  await handleGoogleSignOut();
                  setState(() {
                    _isGoogleCalendarLinked = false;
                  });
                } else {
                  await handleGoogleSignIn(_bookings);
                  setState(() {
                    _isGoogleCalendarLinked = true;
                  });
                }
              },
              style: ElevatedButton.styleFrom(
                elevation: 5,
                padding: const EdgeInsets.symmetric(
                    horizontal: 16.0, vertical: 14.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(25.0),
                  side: BorderSide(color: Color(0xFF425516), width: 2),
                ),
                backgroundColor: Colors.white, // Remove primary color
              ),
              child: Text(
                _isGoogleCalendarLinked
                    ? 'Від`єднати Google Calendar'
                    : 'Приєднати Google Calendar',
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF221F1F),
                    fontSize: 12),
              ),
            ),
            const SizedBox(height: 10),
            Divider(),
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Мої бронювання кортів',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF221F1F),
                      fontSize: 12),
                  // style: Theme.of(context).textTheme.labelMedium,
                ),
              ),
            ),
            _isLoading
                ? Center(child: CircularProgressIndicator())
                : _bookings.isEmpty
                    ? Center(child: Text('Бронювань не знайдено.'))
                    : ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: _bookings.length,
                        itemBuilder: (context, index) {
                          final booking = _bookings[index];

                          final dateTime = DateTime.parse(booking['bookDate']);
                          final formattedDate =
                              DateFormat('EEEE dd.MM', 'uk').format(dateTime);

                          final bookTime = booking['bookTime'] as List<dynamic>;
                          final formattedStartTime = bookTime.isNotEmpty
                              ? bookTime[0].toString()
                              : '00:00';

                          // Calculate the end time by taking the last booked time and adding 1 hour
                          String formattedEndTime = '00:00';
                          if (bookTime.isNotEmpty) {
                            final lastTimeString = bookTime.last.toString();
                            final lastTime = DateTime.parse(
                                '${dateTime.toIso8601String().split('T')[0]} $lastTimeString');
                            final endTime = lastTime.add(Duration(hours: 1));
                            formattedEndTime =
                                DateFormat.Hm('uk').format(endTime);
                          }

                          final displayDate =
                              '$formattedDate на $formattedStartTime до $formattedEndTime';

                          return ListTile(
                            leading: Icon(Icons.book_online),
                            title: Text('Бронювання корту'),
                            subtitle: Text(displayDate),
                          );
                        },
                      ),

            // Hall bookings
            Divider(),
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Мої бронювання залу',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF221F1F),
                      fontSize: 12),
                  // style: Theme.of(context).textTheme.labelMedium,
                ),
              ),
            ),
            _isLoading
                ? Center(child: CircularProgressIndicator())
                : _bookingsHall.isEmpty
                    ? Center(child: Text('Бронювань не знайдено.'))
                    : ListView.builder(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: _bookingsHall.length,
                        itemBuilder: (context, index) {
                          final booking = _bookingsHall[index];

                          // Parse the booking date
                          DateTime bookingDate = DateTime.parse(booking[
                              'bookDate']); // Assuming there's a date field
                          String formattedDate = DateFormat('EEEE dd.MM', 'uk')
                              .format(bookingDate);

                          // Get the booking hours
                          List<String> bookHours = List<String>.from(
                              booking['bookHours'] as List<dynamic>);

                          // Get the start and end times
                          String formattedStartTime =
                              bookHours.isNotEmpty ? bookHours.first : '00:00';
                          DateTime startDateTime = DateTime.parse(
                              '${booking['bookDate']} $formattedStartTime');

                          // Calculate the end time by getting the last hour and adding one hour
                          String formattedEndTime =
                              bookHours.isNotEmpty ? bookHours.last : '00:00';
                          DateTime endDateTime = DateTime.parse(
                                  '${booking['bookDate']} $formattedEndTime')
                              .add(Duration(hours: 1));

                          String displayEndTime =
                              DateFormat('HH:mm').format(endDateTime);

                          return ListTile(
                            leading: Icon(Icons.book_online),
                            title: Text('Бронювання залу'),
                            subtitle: Text(
                                '$formattedDate на $formattedStartTime до $displayEndTime'),
                          );
                        },
                      ),
          ],
        ),
      ),
    );
  }
}
