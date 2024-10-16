import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:tennis_app/models/booking.dart';
import 'package:tennis_app/services/google_events/new_google_event.dart';

class BookingCourtService {
  final CollectionReference _courtBookingsCollection =
      FirebaseFirestore.instance.collection('courtBookings');

  Future<void> createCourtBooking(Booking booking) async {
    try {
      // Create a unique ID for the booking document
      String bookingId = _courtBookingsCollection.doc().id;

      // Save booking data to Firestore under 'courtBookings/{bookingId}'
      await _courtBookingsCollection.doc(bookingId).set(booking.toMap());
    } catch (error) {
      // Handle errors (e.g., print to console, show error message)
      print('Failed to create booking: $error');
      throw Exception('Failed to create booking');
    }
  }

  Future<void> createCourtBookingLinkedGoogle(Booking booking) async {
    final GoogleSignIn googleSignIn = GoogleSignIn(
      scopes: ['https://www.googleapis.com/auth/calendar'],
    );
    final GoogleSignInAccount? googleUser = await googleSignIn.signIn();
    final GoogleSignInAuthentication? googleAuth =
        await googleUser?.authentication;
    try {
      // Create a unique ID for the booking document
      String bookingId = _courtBookingsCollection.doc().id;

      // Save booking data to Firestore under 'courtBookings/{bookingId}'
      await _courtBookingsCollection.doc(bookingId).set(booking.toMap());

      List<Booking> bookingArray;
      if (booking is List<Booking>) {
        bookingArray = booking as List<Booking>;
      } else if (booking is Booking) {
        bookingArray = [booking]; // Wrap booking in a list
      } else {
        throw Exception('Invalid booking type');
      }

      // Pass the bookingArray to createGoogleCalendarEvent
      await createGoogleCalendarEvent(googleAuth!.accessToken!, bookingArray);
    } catch (error) {
      // Handle errors (e.g., print to console, show error message)
      print('Failed to create booking: $error');
      throw Exception('Failed to create booking');
    }
  }
}
