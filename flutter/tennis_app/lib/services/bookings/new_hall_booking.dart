import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:tennis_app/models/hall_booking.dart';

class BookingHallService {
  final CollectionReference _bookingCollection =
      FirebaseFirestore.instance.collection('hallBookings');

  Future<void> createHallBooking(HallBooking booking) async {
    try {
      // Create a unique ID for the booking entry
      String bookingId = _bookingCollection.doc().id;

      // Save booking data to Firestore under 'hallBookings/{bookingId}'
      await _bookingCollection.doc(bookingId).set(booking.toMap());
    } catch (error) {
      // Handle errors (e.g., print to console, show error message)
      print('Failed to create booking: $error');
      throw Exception('Failed to create booking');
    }
  }
}
