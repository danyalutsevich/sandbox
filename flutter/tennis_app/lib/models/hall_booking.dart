// lib/models/HallBooking.dart

class HallBooking {
  final int amountPeople;
  final String bookDate;
  final List<String> bookHours;
  // final String bookType;
  // final int courtId;
  final String createdAt;
  final String userId;

  HallBooking({
    required this.amountPeople,
    required this.bookDate,
    required this.bookHours,
    // required this.bookType,
    // required this.courtId,
    required this.createdAt,
    required this.userId,
  });

  // Convert HallBooking to Map for Firebase
  Map<String, dynamic> toMap() {
    return {
      'amountPeople': amountPeople,
      'bookDate': bookDate,
      'bookHours': bookHours,
      // 'bookType': bookType,
      // 'courtId': courtId,
      'createdAt': createdAt,
      'userId': userId,
    };
  }
}
