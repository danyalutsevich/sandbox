// lib/models/booking.dart

class Booking {
  // final int amountPeople;
  final String bookDate;
  final List<String> bookTime;
  // final String bookType;
  final int courtId;
  final String createdAt;
  final String userId;
  final bool warmUp;
  // final String warmUpTime;

  Booking({
    // required this.amountPeople,
    required this.bookDate,
    required this.bookTime,
    // required this.bookType,
    required this.courtId,
    required this.createdAt,
    required this.userId,
    required this.warmUp,
    // required this.warmUpTime,
  });

  // Convert Booking to Map for Firebase
  Map<String, dynamic> toMap() {
    return {
      // 'amountPeople': amountPeople,
      'bookDate': bookDate,
      'bookTime': bookTime,
      // 'bookType': bookType,
      'courtId': courtId,
      'createdAt': createdAt,
      'userId': userId,
      'warmUp': warmUp,
      // 'warmUpTime': warmUpTime,
    };
  }
}
