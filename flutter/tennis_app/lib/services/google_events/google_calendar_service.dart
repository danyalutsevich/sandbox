// lib/services/calendar_service.dart

import 'package:http/http.dart' as http;
import 'package:googleapis/calendar/v3.dart' as calendar;

class CalendarService {
  final String accessToken;

  CalendarService(this.accessToken);

  Future<void> addEvent() async {
    final httpClient = http.Client();

    final authHeaders = {
      'Authorization':
          'Bearer $accessToken', // Ensure this header is set correctly
    };

    final calendarApi = calendar.CalendarApi(httpClient);

    final event = calendar.Event()
      ..summary = 'Meeting with the Team'
      ..start = (calendar.EventDateTime()
        ..dateTime = DateTime.now().add(Duration(days: 1))
        ..timeZone = 'GMT')
      ..end = (calendar.EventDateTime()
        ..dateTime = DateTime.now().add(Duration(days: 1, hours: 1))
        ..timeZone = 'GMT');

    try {
      await calendarApi.events.insert(event, 'primary', $fields: 'id');
      print('Event added successfully');
    } catch (e) {
      print('Error adding event: $e');
    } finally {
      httpClient.close();
    }
  }
}
