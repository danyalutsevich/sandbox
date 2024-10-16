import 'package:flutter/material.dart';
import 'package:tennis_app/services/events/get_events.dart';

class EventsList extends StatefulWidget {
  @override
  _EventsListState createState() => _EventsListState();
}

class _EventsListState extends State<EventsList> {
  final EventService _eventService = EventService();
  List<Map<String, dynamic>> events = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchEvents();
  }

  Future<void> _fetchEvents() async {
    List<Map<String, dynamic>> fetchedEvents =
        await _eventService.fetchEvents();
    setState(() {
      events = fetchedEvents;
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
      return Center(child: CircularProgressIndicator());
    }

    if (events.isEmpty) {
      return Center(child: Text('No events available.'));
    }

    return SingleChildScrollView(
      scrollDirection:
          Axis.horizontal, // Set the scroll direction to horizontal
      child: Row(
        children: events.map((event) {
          return Container(
            height: 150,
            width: 200, // Set a fixed width for each event card
            margin: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 5.0),
            padding: const EdgeInsets.all(10.0),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10.0),
              border: Border.all(
                color: Color(0xFF425516), // Border color
                width: 2.0, // Border width
              ),
            ),
            child: SizedBox(
              height: 150.0, // Set the desired height for the scrollable area
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      event['title'] as String? ?? '',
                      style: const TextStyle(
                        color: Color(0xFF221F1F),
                        fontWeight: FontWeight.bold,
                        fontSize: 16.0,
                      ),
                    ),
                    const SizedBox(height: 5.0),
                    if (event['description'] != null &&
                        (event['description'] as String).isNotEmpty) ...[
                      Text(
                        event['description'] as String? ?? '',
                        style: const TextStyle(
                          color: Color(0xFF221F1F),
                          fontSize: 12.0,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }
}
