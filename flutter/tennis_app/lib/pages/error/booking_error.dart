import 'package:flutter/material.dart';
import 'package:tennis_app/pages/home_page.dart';

class ErrorPage extends StatelessWidget {
  final VoidCallback? onRetry; // Optional callback function for retry

  const ErrorPage({Key? key, this.onRetry}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Помилка при бронюванні',
          style: TextStyle(
              fontWeight: FontWeight.bold, color: Colors.white, fontSize: 16),
        ),
        backgroundColor: Colors.redAccent[700],
        // iconTheme: const IconThemeData(color: Colors.white),
        // actionsIconTheme: const IconThemeData(
        //     color: Colors
        //         .white), // Optional: Change the color to indicate an error
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Icon(
                Icons.error_outline,
                size: 80,
                color: Colors.red,
              ),
              const SizedBox(height: 20),
              const Text(
                'Упс, щось пішло не так.',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 10),
              const Text(
                'Спробуйте, будь-ласка, пізніше',
                style: TextStyle(fontSize: 16),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 30),
              // if (onRetry !=
              //     null) // Only show the button if onRetry is provided
              //   ElevatedButton(
              //     onPressed: onRetry,
              //     child: const Text('Retry'),
              //   ),
              const SizedBox(height: 20),
              ElevatedButton(
                // onPressed: () {
                //   Navigator.of(context).popUntil((route) => route.isFirst);
                // },
                // child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.pushNamed(context, '/');
                },
                style: ElevatedButton.styleFrom(
                  elevation: 5,
                  padding: const EdgeInsets.symmetric(
                      horizontal: 16.0, vertical: 16.0),
                  // shape: RoundedRectangleBorder(
                  //   borderRadius: BorderRadius.circular(20.0),
                  //   // side: BorderSide(
                  //   //     color: Color(0xFF221F1F), width: 2),
                  // ),
                  backgroundColor: Color(0xFFE0E0E), // Remove primary color
                ),
                // icon: Icon(Icons.event,
                //     size: 18, color: Color(0xFF425516)),
                child: const Text(
                  'Повернутися на головну',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: FontWeight.bold),
                ),
                // ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
