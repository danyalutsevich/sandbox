// import 'dart:developer';

// import 'package:flutter/material.dart';
// import 'package:tennis_app/utils/google_calendar/google_calendar.dart';

// class TestCalendar extends StatefulWidget {
//   @override
//   _TestCalendarState createState() => _TestCalendarState();
// }

// class _TestCalendarState extends State<TestCalendar> {
//   CalendarClient calendarClient = CalendarClient();
//   DateTime startTime = DateTime.now();
//   DateTime endTime = DateTime.now().add(Duration(days: 1));
//   TextEditingController _eventName = TextEditingController();

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: _body(context),
//     );
//   }

//   _body(BuildContext context) {
//     return Center(
//       child: Column(
//         mainAxisAlignment: MainAxisAlignment.center,
//         children: <Widget>[
//           // Display the start time
//           Row(
//             children: <Widget>[
//               Text(
//                 'Event Start Time: $startTime',
//                 style: TextStyle(fontSize: 16),
//               ),
//             ],
//           ),
//           // Display the end time
//           Row(
//             children: <Widget>[
//               Text(
//                 'Event End Time: $endTime',
//                 style: TextStyle(fontSize: 16),
//               ),
//             ],
//           ),
//           Padding(
//             padding: const EdgeInsets.all(12.0),
//             child: TextField(
//               controller: _eventName,
//               decoration: InputDecoration(hintText: 'Enter Event name'),
//             ),
//           ),
//           ElevatedButton(
//             child: Text(
//               'Insert Event',
//             ),
//             style: ElevatedButton.styleFrom(
//               backgroundColor: Colors.grey, // Updated parameter name
//             ),
//             onPressed: () {
//               //log('add event pressed');
//               calendarClient.insert(
//                 _eventName.text,
//                 startTime,
//                 endTime,
//               );
//             },
//           ),
//         ],
//       ),
//     );
//   }
// }
