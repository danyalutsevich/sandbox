import 'package:cloud_firestore/cloud_firestore.dart';

class GetHallBookingService {
  final CollectionReference _bookingCollection =
      FirebaseFirestore.instance.collection('hallBookings');

  Future<List<Map<String, dynamic>>> getHallBookingsByDate(String date) async {
    try {
      print('Fetching bookings for date: $date'); // Debug log

      // Query Firestore for hall bookings where 'bookDate' equals the given date
      QuerySnapshot querySnapshot =
          await _bookingCollection.where('bookDate', isEqualTo: date).get();

      // Process and return the bookings
      return querySnapshot.docs.map((doc) {
        return {
          'id': doc.id,
          ...doc.data() as Map<String, dynamic>,
        };
      }).toList();
    } catch (e) {
      print('Error getting bookings: $e');
      return [];
    }
  }

  Future<List<Map<String, dynamic>>> getBookingsByUserId(String userId) async {
    try {
      print('Fetching bookings for user ID: $userId'); // Debug log

      // Query Firestore for hall bookings where 'userId' equals the given user ID
      QuerySnapshot querySnapshot =
          await _bookingCollection.where('userId', isEqualTo: userId).get();

      // Process and return the bookings
      return querySnapshot.docs.map((doc) {
        return {
          'id': doc.id,
          ...doc.data() as Map<String, dynamic>,
        };
      }).toList();
    } catch (e) {
      print('Error getting bookings: $e');
      return [];
    }
  }
}
