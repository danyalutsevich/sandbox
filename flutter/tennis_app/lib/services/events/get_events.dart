import 'package:cloud_firestore/cloud_firestore.dart';

class EventService {
  final CollectionReference eventsCollection =
      FirebaseFirestore.instance.collection('events');

  Future<List<Map<String, dynamic>>> fetchEvents() async {
    try {
      QuerySnapshot querySnapshot = await eventsCollection.get();

      List<Map<String, dynamic>> events = querySnapshot.docs.map((doc) {
        Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
        return {
          'title': data['title'] ?? '',
          'date': data['date'] ?? '',
          'description': data['description'] ?? '',
          'postAt': data['postAt'] ?? '',
        };
      }).toList();

      events.sort((a, b) {
        Timestamp postAtA = a['postAt'] as Timestamp;
        Timestamp postAtB = b['postAt'] as Timestamp;
        return postAtB.compareTo(postAtA);
      });

      return events;
    } catch (e) {
      print('Error fetching events: $e');
      return [];
    }
  }
}
