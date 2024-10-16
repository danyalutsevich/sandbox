import 'package:cloud_firestore/cloud_firestore.dart';

class GetClosestFreeDatesService {
  final CollectionReference _bookingRef =
      FirebaseFirestore.instance.collection('courtBookings');

  Future<List<Map<String, String>>> getClosestFreeDates(
      String startDate, int daysAhead, List<int> courtIds) async {
    try {
      List<Map<String, String>> availableDates = [];
      DateTime now = DateTime.now();

      for (int i = 0; i <= daysAhead; i++) {
        DateTime currentDate = DateTime.parse(startDate).add(Duration(days: i));
        String formattedDate =
            "${currentDate.year.toString().padLeft(4, '0')}-${currentDate.month.toString().padLeft(2, '0')}-${currentDate.day.toString().padLeft(2, '0')}";

        List<String> timeSlots = [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
        ];

        for (String time in timeSlots) {
          DateTime slotDateTime = DateTime.parse("$formattedDate $time:00");

          if (slotDateTime.isBefore(now)) {
            continue; // Пропустіть час, якщо він вже пройшов
          }

          bool isAvailableOnAnyCourt =
              false; // Прапорець для перевірки доступності

          // Перевірка для всіх корти
          for (int courtId in courtIds) {
            QuerySnapshot querySnapshot = await _bookingRef
                .where('bookDate', isEqualTo: formattedDate)
                .where('courtId', isEqualTo: courtId)
                .get();

            // Перевірка наявності часу у бронюванні
            bool isTimeBooked =
                false; // Прапорець для перевірки, чи час заброньовано

            for (var doc in querySnapshot.docs) {
              List<dynamic> bookedTimes =
                  doc['bookTime']; // Отримуємо масив з часами
              if (bookedTimes.contains(time)) {
                isTimeBooked =
                    true; // Якщо час знайдено в масиві, відзначити як заброньований
                break; // Вийти з циклу, якщо знайдено бронювання
              }
            }

            // Якщо час не заброньовано на цьому корту, відзначити як доступний
            if (!isTimeBooked) {
              isAvailableOnAnyCourt = true;
            }
          }

          // Додаємо час до списку, якщо доступний на принаймні одному з кордів
          if (isAvailableOnAnyCourt) {
            availableDates.add({
              'date': formattedDate,
              'time': time,
              'courtId':
                  courtIds.first.toString(), // Додати courtId для відображення
            });

            if (availableDates.length >= 3) {
              return availableDates; // Повертаємо, якщо знайшли 3 дати
            }
          }
        }
      }

      return availableDates;
    } catch (e) {
      print('Error getting available dates: $e');
      return [];
    }
  }
}
