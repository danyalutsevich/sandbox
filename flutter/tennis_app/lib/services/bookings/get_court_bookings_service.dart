import 'package:cloud_firestore/cloud_firestore.dart';

class GetCourtBookingService {
  final CollectionReference _bookingCollection =
      FirebaseFirestore.instance.collection('courtBookings');

  Future<List<Map<String, dynamic>>> getBookingsByDate(String date) async {
    try {
      print('Fetching bookings for date: $date');

      // Query Firestore for bookings where 'bookDate' equals the given date
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
      print('Fetching bookings for user ID: $userId');

      // Query Firestore for bookings where 'userId' equals the given user ID
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
