import 'package:flutter/material.dart';
import 'package:tennis_app/services/bookings/get_closest_dates_service.dart';

class ClosestFreeDatesWidget extends StatefulWidget {
  final String startDate;
  final int daysAhead;

  const ClosestFreeDatesWidget({
    Key? key,
    required this.startDate,
    required this.daysAhead,
  }) : super(key: key);

  @override
  _ClosestFreeDatesWidgetState createState() => _ClosestFreeDatesWidgetState();
}

class _ClosestFreeDatesWidgetState extends State<ClosestFreeDatesWidget> {
  late Future<List<Map<String, String>>> _availableDatesFuture;

  @override
  void initState() {
    super.initState();
    _availableDatesFuture = GetClosestFreeDatesService()
        .getClosestFreeDates(widget.startDate, widget.daysAhead, [1, 2, 3]);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Color(0xFF425516).withOpacity(0.6),
        borderRadius: BorderRadius.circular(16.0),
      ),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Найближчі вільні дати для бронювання кортів:',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          FutureBuilder<List<Map<String, String>>>(
            future: _availableDatesFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(
                  child: Text(
                    'Error: ${snapshot.error}',
                    style: const TextStyle(color: Colors.red),
                  ),
                );
              } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
                return const Center(
                  child: Text(
                    'Немає доступних дат.',
                    style: TextStyle(color: Colors.white, fontSize: 14),
                  ),
                );
              }

              final availableDates =
                  snapshot.data!.take(3).toList(); // Limit to 3 dates

              return Column(
                children: availableDates.map((entry) {
                  DateTime date =
                      DateTime.parse(entry['date']!); // Parsing the date
                  String formattedDate =
                      '${_getWeekDay(date.weekday)} ${_formatDate(date)} - ${entry['time']}';

                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: InkWell(
                      onTap: () {
                        Navigator.pushNamed(
                          context,
                          '/courts-schedule', // Replace with your booking page route
                          arguments: {
                            'selectedDate': date.toIso8601String(),
                            'selectedTime': entry['time'],
                          },
                        );
                      },
                      child: Text(
                        formattedDate,
                        style:
                            const TextStyle(color: Colors.white, fontSize: 14),
                      ),
                    ),
                  );
                }).toList(),
              );
            },
          ),
        ],
      ),
    );
  }

  // Helper function to get the weekday in Ukrainian
  String _getWeekDay(int weekday) {
    const weekDays = [
      'Неділя',
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      'П’ятниця',
      'Субота'
    ];
    return weekDays[weekday];
  }

  // Helper function to format the date to 'dd.MM'
  String _formatDate(DateTime date) {
    return '${date.day.toString().padLeft(2, '0')}.${date.month.toString().padLeft(2, '0')}';
  }
}
