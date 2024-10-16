import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:tennis_app/modals/booking/hall_booking_modal.dart';
import 'package:tennis_app/pages/profile/login_page.dart';
import 'package:tennis_app/services/auth/auth_service.dart';
import 'package:tennis_app/services/bookings/get_hall_bookings.dart';
import 'package:tennis_app/services/prices/hall_pricing_service.dart';

class HallSchedulePage extends StatefulWidget {
  @override
  _HallSchedulePageState createState() => _HallSchedulePageState();
}

class _HallSchedulePageState extends State<HallSchedulePage> {
  HallPricingService pricingService = HallPricingService();

  DateTime _selectedDate = DateTime.now();
  final GetHallBookingService _bookingService = GetHallBookingService();

  List<String> hallAvailability = List.generate(15, (_) => 'Вільно');
  List<String> selectedTimes = []; // To store selected times
  int? totalPrice; // To store the total price

  @override
  void initState() {
    super.initState();
    _fetchBookings();
  }

  Future<void> _fetchBookings() async {
    String formattedDate = DateFormat('yyyy-MM-dd').format(_selectedDate);
    List<Map<String, dynamic>> bookings =
        await _bookingService.getHallBookingsByDate(formattedDate);

    // Update hall availability based on bookings
    List<String> updatedAvailability = List.generate(15, (_) => 'Вільно');

    for (var booking in bookings) {
      List<String> bookHours = booking['bookHours'] != null
          ? List<String>.from(booking['bookHours'])
          : [];
      for (String bookTime in bookHours) {
        int timeIndex = _getTimeIndex(bookTime);

        if (timeIndex >= 0 && timeIndex < hallAvailability.length) {
          updatedAvailability[timeIndex] = 'Бронь';
        }
      }
    }

    setState(() {
      hallAvailability = updatedAvailability;
    });
  }

  // Helper function to get the index for a given time
  int _getTimeIndex(String bookTime) {
    int hour = int.parse(bookTime.split(':')[0]);
    return hour - 9; // Adjust for the starting hour of 09:00
  }

  void _onDateChanged(DateTime newDate) {
    setState(() {
      _selectedDate = newDate;
    });
    _fetchBookings();
  }

  Future<void> _selectDate(BuildContext context) async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      locale: const Locale('uk'), // Set the locale to Ukrainian
      initialDate: _selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(Duration(days: 365)),
      builder: (BuildContext context, Widget? child) {
        return Theme(
          data: ThemeData.light().copyWith(
            colorScheme: ColorScheme.light(
              primary: Color(0xFF425516), // Header background color
              onPrimary: Colors.white, // Header text color
              onSurface: Color(0xFF221F1F), // Body text color
            ),
            dialogBackgroundColor:
                Colors.white, // Background color of the dialog
            textButtonTheme: TextButtonThemeData(
              style: TextButton.styleFrom(
                foregroundColor: Color(0xFF425516), // Button text color
              ),
            ),
          ),
          child: child!,
        );
      },
    );

    if (pickedDate != null && pickedDate != _selectedDate) {
      _onDateChanged(pickedDate);
    }
  }

  Future<void> _calculateTotalPrice() async {
    final hallPrices = await pricingService.fetchHallPrices();
    if (hallPrices != null) {
      setState(() {
        if (selectedTimes.length == 15) {
          totalPrice = hallPrices.hallAllDay;
        } else {
          totalPrice = selectedTimes.length * hallPrices.hallHour;
        }
      });
    } else {
      print('Error fetching hall prices');
      setState(() {
        totalPrice = 0; // Set to 0 in case of error fetching prices
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Розклад бенкетного залу',
          style: TextStyle(
              fontWeight: FontWeight.bold, color: Colors.white, fontSize: 16),
        ),
        backgroundColor: Color(0xFF425516),
        iconTheme: const IconThemeData(color: Colors.white),
        actionsIconTheme: const IconThemeData(color: Colors.white),
        actions: [
          IconButton(
            icon: Icon(Icons.calendar_today),
            onPressed: () => _selectDate(context),
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              'Розклад на ${_formatDate(_selectedDate)}',
              style: TextStyle(
                color: Color(0xFF221F1F),
                fontSize: 18.0,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: hallAvailability.length,
              itemBuilder: (context, index) {
                String time = '${9 + index}:00';

                // Заборона бронювання для вже минулих годин
                DateTime slotTime = DateTime(
                  _selectedDate.year,
                  _selectedDate.month,
                  _selectedDate.day,
                  9 + index,
                );
                bool isPastTime = slotTime.isBefore(DateTime.now());

                return Card(
                  margin: EdgeInsets.symmetric(
                      vertical: 16.0), // Add vertical spacing between cards
                  child: ListTile(
                    contentPadding: EdgeInsets.symmetric(
                        horizontal: 16.0), // Add padding inside the ListTile
                    title: Row(
                      children: [
                        Expanded(
                          child: Text(
                            time,
                            style: TextStyle(fontSize: 16),
                          ),
                        ),
                        SizedBox(
                            width: 20), // Gap between time and schedule status
                        Expanded(
                          child: Text(
                            hallAvailability[index],
                            style: TextStyle(
                              color: hallAvailability[index] == 'Вільно'
                                  ? Colors.green
                                  : Colors.red,
                              fontWeight: FontWeight.bold,
                            ),
                            textAlign:
                                TextAlign.right, // Align the text to the right
                          ),
                        ),
                      ],
                    ),
                    trailing: (hallAvailability[index] == 'Бронь' || isPastTime)
                        ? null
                        : Switch(
                            value: selectedTimes.contains(time),
                            onChanged: (bool value) {
                              setState(() {
                                if (value) {
                                  selectedTimes.add(time);
                                } else {
                                  selectedTimes.remove(time);
                                }
                              });
                            },
                            activeColor: Colors.red,
                            inactiveThumbColor: Colors.green,
                            inactiveTrackColor: Colors.green.withOpacity(0.5),
                          ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                ElevatedButton(
                  onPressed: _isAnySlotBooked()
                      ? null
                      : () async {
                          // Перевірка на авторизацію
                          if (AuthService.currentUser == null) {
                            // Якщо користувач не авторизований, показати модальне вікно
                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: const Text(
                                    'Реєстрація обов`язково',
                                    style: TextStyle(
                                        color: Color(0xFF221F1F),
                                        fontSize: 14,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  content: const Text(
                                    'Зареєструйтеся для бронювання корту.',
                                    style: TextStyle(
                                        color: Color(0xFF221F1F),
                                        fontSize: 12,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  actions: [
                                    ElevatedButton(
                                      onPressed: () {
                                        Navigator.of(context)
                                            .pop(); // Закриває діалогове вікно
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.grey,
                                        foregroundColor: Colors.white,
                                        padding: EdgeInsets.symmetric(
                                            horizontal: 5, vertical: 3),
                                      ),
                                      child: const Text(
                                        'OK',
                                        style: TextStyle(
                                            color: Color(0xFF221F1F),
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    ElevatedButton(
                                      onPressed: () {
                                        Navigator.of(context)
                                            .pop(); // Закриває діалогове вікно
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  LoginPage()), // Переходить на сторінку входу
                                        );
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: const Color.fromARGB(
                                            255, 142, 172, 144),
                                        foregroundColor: Colors.white,
                                        padding: EdgeInsets.symmetric(
                                            horizontal: 5, vertical: 5),
                                      ),
                                      child: const Text(
                                        'Зареєструватися',
                                        style: TextStyle(
                                            color: Color(0xFF221F1F),
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ],
                                );
                              },
                            );
                            return;
                          }

                          // Далі йде основний код для бронювання
                          bool allFree = hallAvailability
                              .every((status) => status == 'Вільно');

                          setState(() {
                            for (int i = 0; i < hallAvailability.length; i++) {
                              String time = '${9 + i}:00';

                              if (hallAvailability[i] == 'Вільно') {
                                if (allFree) {
                                  hallAvailability[i] = 'Бронь';
                                  if (!selectedTimes.contains(time)) {
                                    selectedTimes.add(time);
                                  }
                                } else {
                                  hallAvailability[i] = 'Вільно';
                                  selectedTimes.remove(time);
                                }
                              }
                            }
                          });

                          await _calculateTotalPrice(); // Calculate total price

                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return Dialog(
                                child: Container(
                                  width: 300,
                                  height: 500,
                                  child: HallBookingModal(
                                    selectedTimes: selectedTimes,
                                    selectedDate: DateFormat('yyyy-MM-dd')
                                        .format(_selectedDate),
                                    totalPrice: totalPrice ??
                                        0, // Pass the calculated total price
                                  ),
                                ),
                              );
                            },
                          );
                        },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    foregroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(vertical: 12, horizontal: 24),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "Забронювати весь день",
                    style: TextStyle(fontSize: 16),
                  ),
                ),
                SizedBox(height: 8),
                ElevatedButton(
                  onPressed: selectedTimes.isNotEmpty
                      ? () async {
                          // Перевірка на авторизацію
                          if (AuthService.currentUser == null) {
                            // Якщо користувач не авторизований, показати модальне вікно
                            showDialog(
                              context: context,
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: const Text(
                                    'Реєстрація обов`язково',
                                    style: TextStyle(
                                        color: Color(0xFF221F1F),
                                        fontSize: 14,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  content: const Text(
                                    'Зареєструйтеся для бронювання корту.',
                                    style: TextStyle(
                                        color: Color(0xFF221F1F),
                                        fontSize: 12,
                                        fontWeight: FontWeight.bold),
                                  ),
                                  actions: [
                                    ElevatedButton(
                                      onPressed: () {
                                        Navigator.of(context)
                                            .pop(); // Закриває діалогове вікно
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.grey,
                                        foregroundColor: Colors.white,
                                        padding: EdgeInsets.symmetric(
                                            horizontal: 5, vertical: 3),
                                      ),
                                      child: const Text(
                                        'OK',
                                        style: TextStyle(
                                            color: Color(0xFF221F1F),
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                    ElevatedButton(
                                      onPressed: () {
                                        Navigator.of(context)
                                            .pop(); // Закриває діалогове вікно
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                              builder: (context) =>
                                                  LoginPage()), // Переходить на сторінку входу
                                        );
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: const Color.fromARGB(
                                            255, 142, 172, 144),
                                        foregroundColor: Colors.white,
                                        padding: EdgeInsets.symmetric(
                                            horizontal: 5, vertical: 5),
                                      ),
                                      child: const Text(
                                        'Зареєструватися',
                                        style: TextStyle(
                                            color: Color(0xFF221F1F),
                                            fontSize: 12,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ],
                                );
                              },
                            );
                            return;
                          }

                          await _calculateTotalPrice(); // Calculate total price

                          showDialog(
                            context: context,
                            builder: (BuildContext context) {
                              return Dialog(
                                child: Container(
                                  width: 320,
                                  height: 400,
                                  child: HallBookingModal(
                                    selectedTimes: selectedTimes..sort(),
                                    selectedDate: DateFormat('yyyy-MM-dd')
                                        .format(_selectedDate),
                                    totalPrice: totalPrice ?? 0,
                                  ),
                                ),
                              );
                            },
                          );
                        }
                      : null, // Disable button if no times are selected
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF425516).withOpacity(0.6),
                    foregroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(vertical: 12, horizontal: 24),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    "Забронювати вибраний час",
                    style: TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 16), // Add spacing from bottom
        ],
      ),
    );
  }

  bool _isAnySlotBooked() {
    return hallAvailability.contains('Бронь');
  }
}

String _formatDate(DateTime date) {
  const months = [
    '',
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня'
  ];

  return '${date.day} ${months[date.month]}';
}
