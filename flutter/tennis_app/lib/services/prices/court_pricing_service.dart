import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:tennis_app/models/prices/price_court.dart';

class CourtPricingService {
  final CollectionReference _pricingCollection =
      FirebaseFirestore.instance.collection('prices');

  PricesCourtModel? _courtPrices;

  // Helper method to filter and extract values safely
  int getPrice(Map<String, dynamic>? data, String key) {
    if (data == null) return 0;

    final entry = data.entries
        .where((entry) => entry.key == key && entry.value is int)
        .firstOrNull;
    return entry?.value as int? ?? 0;
  }

  Future<void> fetchCourtPrices() async {
    try {
      print('Fetching court pricing data');

      // Fetch court prices
      DocumentSnapshot courtDocSnapshot =
          await _pricingCollection.doc('courtPrices').get();
      print('Court Prices Document Exists: ${courtDocSnapshot.exists}');
      print('Court Prices Raw Data: ${courtDocSnapshot.data()}');

      if (courtDocSnapshot.exists) {
        Map<String, dynamic>? courtData =
            courtDocSnapshot.data() as Map<String, dynamic>?;

        if (courtData != null) {
          _courtPrices = PricesCourtModel(
            courtWeekDayFirstPart: getPrice(courtData, 'courtWeekDayFirstPart'),
            courtWeekDaySecondPart:
                getPrice(courtData, 'courtWeekDaySecondPart'),
            courtWeekends: getPrice(courtData, 'courtWeekends'),
          );

          print(
              'Court Week Day First Part: ${_courtPrices?.courtWeekDayFirstPart}');
          print(
              'Court Week Day Second Part: ${_courtPrices?.courtWeekDaySecondPart}');
          print('Court Weekends: ${_courtPrices?.courtWeekends}');
        } else {
          print('Warning: Court Data is null.');
        }
      } else {
        print('Court pricing document does not exist.');
      }

      // Fetch hall prices
      // DocumentSnapshot hallDocSnapshot =
      //     await _pricingCollection.doc('hallPrices').get();
      // print('Hall Prices Document Exists: ${hallDocSnapshot.exists}');
      // print('Hall Prices Raw Data: ${hallDocSnapshot.data()}');

      // if (hallDocSnapshot.exists) {
      //   Map<String, dynamic>? hallData =
      //       hallDocSnapshot.data() as Map<String, dynamic>?;

      //   if (hallData != null) {
      //     _hallPrices = PricesHallModel(
      //       hallAllDay: getPrice(hallData, 'hallAllDay'),
      //       hallHour: getPrice(hallData, 'hallHour'),
      //     );

      //     print('Hall All Day: ${_hallPrices?.hallAllDay}');
      //     print('Hall Hour: ${_hallPrices?.hallHour}');
      //   } else {
      //     print('Warning: Hall Data is null.');
      //   }
      // } else {
      //   print('Hall pricing document does not exist.');
      // }
    } catch (e) {
      print('Error fetching court pricing data: $e');
    }
  }

  int calculateCourtPrice(
    DateTime selectedDate,
    List<String> selectedTimes,
  ) {
    if (selectedTimes.isEmpty || _courtPrices == null) {
      return 0;
    }

    // Determine if the booking is on a weekend
    bool isWeekend = selectedDate.weekday == DateTime.saturday ||
        selectedDate.weekday == DateTime.sunday;

    int totalPrice = 0;

    for (String time in selectedTimes) {
      int hour = int.parse(time.split(':')[0]);

      if (isWeekend) {
        totalPrice += _courtPrices!.courtWeekends;
      } else {
        if (hour < 16) {
          totalPrice += _courtPrices!.courtWeekDayFirstPart;
        } else {
          totalPrice += _courtPrices!.courtWeekDaySecondPart;
        }
      }
    }

    return totalPrice;
  }
}

// Extension method to safely get the first element or null
extension IterableExtensions<E> on Iterable<E> {
  E? get firstOrNull => isEmpty ? null : first;
}
