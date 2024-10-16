import 'package:cloud_firestore/cloud_firestore.dart';

class TrainerService {
  final CollectionReference _trainerRef =
      FirebaseFirestore.instance.collection('trainers');

  Future<List<Map<String, dynamic>>> getTrainers() async {
    try {
      // Fetching data from Firestore
      QuerySnapshot snapshot = await _trainerRef.get();
      print('Snapshot: ${snapshot.docs}');

      if (snapshot.docs.isNotEmpty) {
        print('Data fetched: ${snapshot.docs}');

        // Map each document to a map
        return snapshot.docs.map((doc) {
          return doc.data() as Map<String, dynamic>;
        }).toList();
      } else {
        print('No data found.');
        return [];
      }
    } catch (e) {
      print('Error getting trainers: $e');
      return [];
    }
  }
}
