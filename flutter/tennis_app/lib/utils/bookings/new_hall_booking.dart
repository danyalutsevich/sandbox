import 'package:flutter/material.dart';
import 'package:tennis_app/modals/success/success_court_modal.dart';
import 'package:tennis_app/models/hall_booking.dart';
import 'package:tennis_app/pages/error/booking_error.dart';
import 'package:tennis_app/services/auth/auth_service.dart';
import 'package:tennis_app/services/bookings/new_hall_booking.dart';

void createNewHallBooking({
  required peopleAmount,
  required BuildContext context,
  required bookHours,
  required String selectedDate,
}) async {
  BookingHallService bookingService = BookingHallService();
  final user = AuthService.currentUser;

  HallBooking newBooking = HallBooking(
    amountPeople: peopleAmount,
    bookDate: selectedDate,
    bookHours: bookHours,
    createdAt: DateTime.now().toString(),
    userId: user!.uid,
  );

  try {
    await bookingService.createHallBooking(newBooking);
    print('Booking created successfully');
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SuccessBookingModal()),
    );
  } catch (e) {
    print('Error creating booking: $e');
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => ErrorPage()),
    );
  }
}
