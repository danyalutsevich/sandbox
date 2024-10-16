import 'package:cloud_firestore/cloud_firestore.dart';

class PreTrainingCourtService {
  final CollectionReference _bookingCollection =
      FirebaseFirestore.instance.collection('courtBookings');

  Future<bool> isPreTrainingCourtAvailable(
      String date, String startTime) async {
    try {
      print('Checking availability for date: $date and time: $startTime');

      // Step 1: Filter bookings by the provided date
      QuerySnapshot querySnapshot =
          await _bookingCollection.where('bookDate', isEqualTo: date).get();

      print('Data found: ${querySnapshot.docs.length} documents');

      if (querySnapshot.docs.isNotEmpty) {
        // Step 2: Convert the snapshot data to a list of maps
        List<Map<String, dynamic>> bookingsList = querySnapshot.docs.map((doc) {
          return {
            'id': doc.id,
            ...doc.data() as Map<String, dynamic>,
          };
        }).toList();

        print('Filtered bookings list: $bookingsList');

        // Step 3: Further filter the bookings by checking the booked time
        List<Map<String, dynamic>> timeFilteredBookings =
            bookingsList.where((booking) {
          String firstBookedTime = booking['bookTime'] is List<dynamic>
              ? (booking['bookTime'][0] as String)
              : booking['bookTime'] as String;

          print('____________booking $booking');
          print('____________firstBookedTime $firstBookedTime');
          print('____________booking[0] ${booking['bookTime'][0]}');

          return firstBookedTime == startTime;
        }).toList();

        print(
            "Step 3 Done, conflicting bookings found: ${timeFilteredBookings.length}");

        // Step 4: Check if any of these bookings have `warmUp` set to true
        bool isWarmUpBooked =
            timeFilteredBookings.any((booking) => booking['warmUp'] == true);
        print("Step 4 Done, warm-up booked: $isWarmUpBooked");

        // Step 5: If `warmUp` is true for any booking, the training court is not available
        return !isWarmUpBooked;
      } else {
        print('No bookings found for the specified date.');
        return true; // If no bookings are found, assume the court is available
      }
    } catch (e) {
      print("Error checking pre-training court availability: $e");
      return false; // Handle or log the error
    }
  }
}
