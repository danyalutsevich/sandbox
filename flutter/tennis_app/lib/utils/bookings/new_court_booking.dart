import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:tennis_app/modals/success/success_court_modal.dart';
import 'package:tennis_app/models/booking.dart';
import 'package:tennis_app/pages/error/booking_error.dart';
import 'package:tennis_app/services/auth/auth_service.dart';
import 'package:tennis_app/services/bookings/new_court_booking_service.dart';

Future<void> createNewCourtBooking({
  required BuildContext context,
  required List<String> selectedTimes,
  required int courtNumber,
  required String selectedDate,
  required bookTrainCourt,
}) async {
  BookingCourtService bookingService = BookingCourtService();
  final user = AuthService.currentUser;

  bool isGoogleCalendarLinked = await _checkGoogleCalendarLinkStatus();

  Booking newBooking = Booking(
    bookDate: selectedDate,
    bookTime: selectedTimes,
    courtId: courtNumber,
    createdAt: DateTime.now().toString(),
    userId: user!.uid,
    warmUp: bookTrainCourt,
    // warmUpTime: "none",
  );

  try {
    if (isGoogleCalendarLinked) {
      await bookingService.createCourtBookingLinkedGoogle(newBooking);
      print('Booking and linking created successfully');
    } else {
      await bookingService.createCourtBooking(newBooking);
      print('Booking created successfully');
    }
    // print('Booking created successfully');
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => SuccessBookingModal(),
      ),
    );
  } catch (e) {
    print('Error creating booking: $e');
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ErrorPage(),
      ),
    );
  }
}

Future<bool> _checkGoogleCalendarLinkStatus() async {
  User? currentUser = FirebaseAuth.instance.currentUser;
  if (currentUser != null) {
    return currentUser.providerData
        .any((provider) => provider.providerId == 'google.com');
  }
  return false;
}
