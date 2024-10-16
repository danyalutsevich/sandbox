import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:tennis_app/models/prices/price_hall.dart';

class HallPricingService {
  final CollectionReference _pricingCollection =
      FirebaseFirestore.instance.collection('prices');
  PricesHallModel? _hallPrices;

  int getPrice(Map<String, dynamic>? data, String key) {
    if (data == null) return 0;

    final entry = data.entries
        .where((entry) => entry.key == key && entry.value is int)
        .firstOrNull;
    return entry?.value as int? ?? 0;
  }

  Future<PricesHallModel?> fetchHallPrices() async {
    try {
      print('Fetching hall pricing data');

      DocumentSnapshot docSnapshot =
          await _pricingCollection.doc('hallPrices').get();
      print('Document exists: ${docSnapshot.exists}');
      print('Document data: ${docSnapshot.data()}');

      if (docSnapshot.exists) {
        Map<String, dynamic> data = docSnapshot.data() as Map<String, dynamic>;
        if (data != null) {
          _hallPrices = PricesHallModel(
            hallAllDay: getPrice(data, 'hallAllDay'),
            hallHour: getPrice(data, 'hallHour'),
          );
          print('Fetched hall prices: $_hallPrices');
          return _hallPrices; // Make sure to return the fetched prices
        } else {
          print('Warning: Pricing data is null.');
          return null;
        }
      } else {
        print('Hall pricing document does not exist.');
        return null;
      }
    } catch (e) {
      print('Error fetching hall pricing data: $e');
      return null;
    }
  }

  int? calculateHallPrice(List<String> selectedTimes) {
    if (selectedTimes.isEmpty || _hallPrices == null) {
      print('__selectedTimes__${selectedTimes}');
      print('____hallPrices_${_hallPrices}');

      return 0;
    }

    print('__Calculating Price__');
    print('__hallPrices__${_hallPrices}');

    if (selectedTimes.length == 15) {
      print('__Returning All Day Price__');
      return _hallPrices?.hallAllDay;
    } else {
      int totalPrice = selectedTimes.length * _hallPrices!.hallHour;
      print('____totalPrice_${totalPrice}');
      print('selectedTimes____________${selectedTimes}');

      return totalPrice;
    }
  }
}
