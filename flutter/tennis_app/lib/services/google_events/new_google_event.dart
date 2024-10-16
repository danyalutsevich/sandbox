import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:tennis_app/models/booking.dart';

Future<void> createGoogleCalendarEvent(
    String accessToken, List<Booking> bookings) async {
  print('HERE WE ARE');
  print('__YAY: $bookings');

  for (var booking in bookings) {
    for (var time in booking.bookTime) {
      final startDateTimeString = '${booking.bookDate}T$time:00';
      DateTime startDateTime = DateTime.parse(startDateTimeString);
      DateTime eventStartDate = startDateTime.toLocal();
      DateTime nowDate = DateTime.now();

      if (eventStartDate.isAfter(nowDate)) {
        final eventObject = {
          'summary': 'Тенніс',
          'location':
              'https://www.google.com/maps/place/Central+Park+Tennis+Court/@49.5451965,25.5865707,15z/data=!4m6!3m5!1s0x473037f0bc43a31b:0x60a4f0e174d45791!8m2!3d49.5451965!4d25.5865707!16s%2Fg%2F11p00_x0df?entry=ttu',
          'description': '',
          'start': {
            'dateTime': startDateTime.toIso8601String(),
            'timeZone': 'Europe/Kyiv',
          },
          'end': {
            'dateTime': startDateTime
                .add(Duration(minutes: 30))
                .toIso8601String(), // Adjust the duration if needed
            'timeZone': 'Europe/Kyiv',
          },
        };

        print('____________WAIT____________');
        final response = await http.post(
          Uri.parse(
              'https://www.googleapis.com/calendar/v3/calendars/primary/events'),
          headers: {
            'Authorization': 'Bearer $accessToken',
            'Content-Type': 'application/json',
          },
          body: json.encode(eventObject),
        );
        print('______________RESPONSE_____________$response');
        if (response.statusCode == 200) {
          print('Event created successfully');
        } else {
          print('Failed to create event: ${response.body}');
        }
      }
    }
  }
}
