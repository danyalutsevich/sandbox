import 'package:flutter/material.dart';
import 'package:tennis_app/main.dart';
// import 'package:tennis_app/pages/home_page.dart';

class SuccessBookingModal extends StatelessWidget {
  // final String courtTime;
  // final int courtNumber;
  // final String selectedDate;

  const SuccessBookingModal({
    Key? key,
    // required this.courtTime,
    // required this.courtNumber,
    // required this.selectedDate,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Container(
        width: 300, // Set your desired width
        height: 350, // Set your desired height
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Icon(
              Icons.check_circle,
              color: Colors.green,
              size: 80,
            ),
            SizedBox(height: 20),
            Text(
              'Оплата пройшла успішно!',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 10),
            Text(
              'Ваше бронювання успішне',
              style: TextStyle(fontSize: 16),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          MyApp()), // Use context for navigation
                );
              },
              child: Text('OK'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green[800],
                foregroundColor: Colors.white,
                padding: EdgeInsets.symmetric(horizontal: 30, vertical: 15),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
