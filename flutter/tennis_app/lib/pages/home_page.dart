import 'package:flutter/material.dart';
import 'package:tennis_app/pages/profile/profile_page.dart';
import 'package:tennis_app/pages/schedules/courts_schedule_page.dart';
import 'package:tennis_app/pages/schedules/hall_schedule_page.dart';
import 'package:tennis_app/pages/trainers/trainers_page.dart';
import 'package:tennis_app/services/auth/auth_service.dart';
import 'package:tennis_app/widgets/closest_dates.dart';
import 'package:tennis_app/widgets/contacts.dart';
import 'package:tennis_app/widgets/events_list.dart';
import 'package:firebase_auth/firebase_auth.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    String today =
        DateTime.now().toIso8601String().substring(0, 10); // 'YYYY-MM-DD'

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Central Park Tennis',
          style: TextStyle(
              fontWeight: FontWeight.bold, color: Colors.white, fontSize: 16),
        ),
        backgroundColor: Color(0xFF425516),
        iconTheme: const IconThemeData(color: Colors.white),
        actionsIconTheme: const IconThemeData(color: Colors.white),
        actions: [
          StreamBuilder<User?>(
            stream: AuthService.authChanges,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.active) {
                final User? user = snapshot.data;

                return IconButton(
                  icon: Icon(user == null ? Icons.login : Icons.person),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ProfilePage()),
                    );
                  },
                );
              } else {
                // Show a loading spinner or a placeholder if necessary
                return CircularProgressIndicator();
              }
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          Container(
            color: Colors.white,
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(height: 10),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Stack(
                            alignment: Alignment.center,
                            children: [
                              Image.asset(
                                'images/logo.png',
                                width: 120,
                                height: 120,
                              ),
                            ],
                          ),
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: ElevatedButton.icon(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          CourtsSchedulePage()),
                                );
                              },
                              style: ElevatedButton.styleFrom(
                                elevation: 5,
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 16.0, vertical: 16.0),
                                backgroundColor: const Color.fromARGB(
                                        255, 255, 71, 15)
                                    .withOpacity(0.6), // Remove primary color
                              ),
                              label: const Text(
                                'Забронювати корт',
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        mainAxisAlignment:
                            MainAxisAlignment.center, // Center within Row
                        crossAxisAlignment:
                            CrossAxisAlignment.center, // Center within Row
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: ElevatedButton.icon(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => HallSchedulePage()),
                                );
                              },
                              style: ElevatedButton.styleFrom(
                                elevation: 5,
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 16.0, vertical: 16.0),
                                backgroundColor: const Color(0xFF425516)
                                    .withOpacity(0.6), // Remove primary color
                              ),
                              label: const Text(
                                'Забронювати зал',
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 14,
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                          ),
                          Stack(
                            alignment: Alignment.center,
                            children: [
                              Image.asset(
                                'images/hall_logo1.png',
                                width: 120,
                                height: 120,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),

                  const SizedBox(height: 20),

                  // Використання ClosestFreeDatesWidget
                  ClosestFreeDatesWidget(
                    startDate: today,
                    daysAhead: 30,
                  ),

                  const SizedBox(height: 20),
                  EventsList(),
                  Padding(
                    padding:
                        EdgeInsets.symmetric(vertical: 8.0, horizontal: 5.0),
                    child: ContactInfoBlock(
                      location: "Central Park Tennis Court, Ternopil",
                      phoneNumber: "+380 97 004 6006",
                      instagram: "@central.park.ternopil",
                    ),
                  ),
                ],
              ),
            ),
          ),
          // Positioned(
          //   bottom: 16, // Position it at the bottom
          //   left: 16,
          //   right: 16,
          //   child: ContactInfoBlock(
          //     location: "Київ, Україна",
          //     phoneNumber: "+380 123 456 789",
          //     instagram: "@your_instagram_handle",
          //   ),
          // ),
        ],
      ),
      bottomNavigationBar: ClipRRect(
        borderRadius: const BorderRadius.vertical(top: Radius.circular(35.0)),
        child: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Головна',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.sports_tennis),
              label: 'Розклад кортів',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.schedule_outlined),
              label: 'Розклад залу',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person_pin_outlined),
              label: 'Тренери',
            ),
          ],
          onTap: (index) {
            switch (index) {
              case 0:
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => HomePage()));
                break;
              case 1:
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => CourtsSchedulePage()));
                break;
              case 2:
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => HallSchedulePage()));
                break;
              case 3:
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => TrainersPage()));
                break;
            }
          },
          selectedItemColor: Color(0xFF425516), // Color for the selected item
          unselectedItemColor: Colors.grey, // Color for the unselected items
          backgroundColor:
              Color(0xFFE0E0E0), // Background color of the navigation bar
        ),
      ),
    );
  }
}
