import 'package:flutter/material.dart';
import 'package:tennis_app/modals/booking/court_booking_modal.dart';
import 'package:tennis_app/pages/profile/login_page.dart';
import 'package:tennis_app/services/auth/auth_service.dart';
import 'package:tennis_app/services/bookings/get_court_bookings_service.dart';
import 'package:intl/intl.dart';
import 'package:tennis_app/services/prices/court_pricing_service.dart';

class CourtsSchedulePage extends StatefulWidget {
  @override
  _CourtsSchedulePageState createState() => _CourtsSchedulePageState();
}

class _CourtsSchedulePageState extends State<CourtsSchedulePage> {
  CourtPricingService pricingService = CourtPricingService();

  DateTime _selectedDate = DateTime.now();
  final GetCourtBookingService _bookingService = GetCourtBookingService();
  List<List<String>> courtAvailability = List.generate(
    12, // 12 hours from 9:00 AM to 9:00 PM
    (_) => List.generate(3, (_) => 'Вільно'),
  );
  Map<int, List<int>> selectedSlots = {};
  String _filter = 'Усі'; // Default filter

  @override
  void initState() {
    super.initState();
    _fetchBookings();
  }

  Future<void> _fetchBookings() async {
    String formattedDate = DateFormat('yyyy-MM-dd').format(_selectedDate);
    List<Map<String, dynamic>> bookings =
        await _bookingService.getBookingsByDate(formattedDate);

    List<List<String>> updatedAvailability = List.generate(
      12,
      (_) => List.generate(3, (_) => 'Вільно'),
    );

    for (var booking in bookings) {
      int courtIndex = booking['courtId'] - 1;
      List<String> bookTimes = booking['bookTime'] is String
          ? [booking['bookTime']]
          : List<String>.from(booking['bookTime']);

      for (String time in bookTimes) {
        int timeIndex = _getTimeIndex(time);

        if (courtIndex >= 0 &&
            courtIndex < 3 &&
            timeIndex >= 0 &&
            timeIndex < 12) {
          updatedAvailability[timeIndex][courtIndex] = 'Бронь';
        }
      }
    }

    setState(() {
      courtAvailability = updatedAvailability;
    });
  }

  int _getTimeIndex(String bookTime) {
    int hour = int.parse(bookTime.split(':')[0]);
    return hour - 9;
  }

  void _onDateChanged(DateTime newDate) {
    setState(() {
      _selectedDate = newDate;
      selectedSlots.clear();
    });
    _fetchBookings();
  }

  Future<void> _selectDate(BuildContext context) async {
    DateTime? pickedDate = await showDatePicker(
      context: context,
      locale: const Locale('uk'),
      initialDate: _selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(Duration(days: 365)),
      builder: (BuildContext context, Widget? child) {
        return Theme(
          data: ThemeData.light().copyWith(
            colorScheme: ColorScheme.light(
              primary: Color(0xFF425516),
              onPrimary: Colors.white,
              onSurface: Color(0xFF221F1F),
            ),
            dialogBackgroundColor: Colors.white,
            textButtonTheme: TextButtonThemeData(
              style: TextButton.styleFrom(
                foregroundColor: Color(0xFF425516),
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

  void _toggleSlotSelection(int courtIndex, int timeIndex) {
    DateTime now = DateTime.now();

    int hour = 9 + timeIndex;
    DateTime selectedTime = DateTime(
      _selectedDate.year,
      _selectedDate.month,
      _selectedDate.day,
      hour,
      0,
    );

    if (selectedTime.isBefore(now)) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Неможливо забронювати для минувших дат'),
        ),
      );
      return;
    }

    // Перевірка чи вже є вибрані слоти з іншого корту
    if (selectedSlots.isNotEmpty && !selectedSlots.containsKey(courtIndex)) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Можна вибирати лише слоти з одного корту'),
        ),
      );
      return;
    }

    setState(() {
      if (selectedSlots.containsKey(courtIndex)) {
        if (selectedSlots[courtIndex]!.contains(timeIndex)) {
          selectedSlots[courtIndex]!.remove(timeIndex);
        } else {
          selectedSlots[courtIndex]!.add(timeIndex);
        }
      } else {
        selectedSlots[courtIndex] = [timeIndex];
      }

      if (selectedSlots[courtIndex]!.isEmpty) {
        selectedSlots.remove(courtIndex);
      }
    });
  }

  int _calculateTotalTime() {
    int totalMinutes = 0;
    for (var slots in selectedSlots.values) {
      totalMinutes += slots.length * 60;
    }
    return totalMinutes;
  }

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final screenWidth = mediaQuery.size.width;
    final screenHeight = mediaQuery.size.height;
    final isLandscape = mediaQuery.orientation == Orientation.landscape;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Розклад кортів',
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
              _formatDate(_selectedDate),
              style: TextStyle(
                color: Color(0xFF221F1F),
                fontSize: 18.0,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Фільтрація:',
                  style: TextStyle(
                      fontWeight: FontWeight.bold, color: Color(0xFF221F1F)),
                ),
                DropdownButton<String>(
                  value: _filter,
                  onChanged: (String? newValue) {
                    setState(() {
                      _filter = newValue!;
                    });
                  },
                  items: <String>['Усі', 'Вільно', 'Бронь']
                      .map<DropdownMenuItem<String>>((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          Expanded(
            child: LayoutBuilder(
              builder: (context, constraints) {
                int gridColumns = screenWidth > 600
                    ? 5
                    : 4; // Adjust grid layout for larger screens
                return GridView.builder(
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: gridColumns, // Adjust based on screen width
                    childAspectRatio:
                        isLandscape ? 3 : 2, // Adjust based on orientation
                  ),
                  itemCount: courtAvailability.length * gridColumns,
                  itemBuilder: (context, index) {
                    int row = index ~/ gridColumns;
                    int col = index % gridColumns;

                    if (col == 0) {
                      int hour = 9 + row;
                      String timeLabel = '$hour:00';

                      return Container(
                        alignment: Alignment.center,
                        color: Color(0xFF425516),
                        child: Text(
                          timeLabel,
                          style: TextStyle(color: Colors.white),
                        ),
                      );
                    } else {
                      int courtIndex = col - 1;
                      bool isFree =
                          courtAvailability[row][courtIndex] == 'Вільно';
                      bool isSelected =
                          selectedSlots[courtIndex]?.contains(row) ?? false;

                      if (_filter == 'Вільно' && !isFree) return Container();
                      if (_filter == 'Бронь' && isFree) return Container();

                      Color boxColor;
                      if (isSelected) {
                        boxColor = Colors.orange;
                      } else if (isFree) {
                        boxColor = Colors.green;
                      } else {
                        boxColor = Colors.red;
                      }

                      return GestureDetector(
                        onTap: isFree
                            ? () {
                                if (AuthService.currentUser != null) {
                                  _toggleSlotSelection(courtIndex, row);
                                } else {
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
                                              Navigator.of(context).pop();
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
                                              Navigator.of(context).pop();
                                              Navigator.push(
                                                context,
                                                MaterialPageRoute(
                                                    builder: (context) =>
                                                        LoginPage()),
                                              );
                                            },
                                            style: ElevatedButton.styleFrom(
                                              backgroundColor:
                                                  const Color.fromARGB(
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
                                }
                              }
                            : null,
                        child: Container(
                          margin: EdgeInsets.all(2.0),
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: boxColor,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            isSelected
                                ? 'Обрано'
                                : courtAvailability[row][courtIndex],
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      );
                    }
                  },
                );
              },
            ),
          ),
          _buildBottomBar(),
        ],
      ),
    );
  }

  Widget _buildBottomBar() {
    return BottomAppBar(
      color: Colors.white,
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
        height: 60.0,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Всього: ${_calculateTotalTime()} хв',
              style: TextStyle(
                fontSize: 14.0,
                fontWeight: FontWeight.bold,
                color: Color(0xFF221F1F),
              ),
            ),
            ElevatedButton(
              onPressed: (selectedSlots.isNotEmpty &&
                      _calculateTotalTime() >= 60)
                  ? () async {
                      if (AuthService.currentUser != null) {
                        List<String> selectedTimes = [];
                        int? selectedCourtNumber;

                        selectedSlots.forEach((courtIndex, timeIndices) {
                          selectedCourtNumber = courtIndex + 1;
                          for (int timeIndex in timeIndices) {
                            int hour = 9 + timeIndex;
                            String formattedTime =
                                hour < 10 ? '0$hour:00' : '$hour:00';
                            selectedTimes.add(formattedTime);
                          }
                        });

                        selectedTimes.sort((a, b) {
                          return a.compareTo(b);
                        });

                        await pricingService.fetchCourtPrices();

                        int totalPrice = pricingService.calculateCourtPrice(
                            _selectedDate, selectedTimes);

                        showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return Dialog(
                              child: Container(
                                width: 300,
                                height: 500,
                                child: CourtBookingModal(
                                  selectedTimes: selectedTimes,
                                  courtNumber: selectedCourtNumber!,
                                  selectedDate: _selectedDate
                                      .toIso8601String()
                                      .substring(0, 10),
                                  totalPrice: totalPrice,
                                ),
                              ),
                            );
                          },
                        );
                      } else {
                        showDialog(
                          context: context,
                          builder: (BuildContext context) {
                            return AlertDialog(
                              title: Text('Реєстрація обов`язково'),
                              content:
                                  Text('Зареєструйтеся для бронювання корту.'),
                              actions: [
                                TextButton(
                                  onPressed: () {
                                    Navigator.of(context).pop();
                                  },
                                  child: Text('OK'),
                                ),
                              ],
                            );
                          },
                        );
                      }
                    }
                  : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: Color(0xFF425516),
              ),
              child: Text(
                'Оплатити',
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 14,
                    fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      ),
    );
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
