import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:tennis_app/api/firebase_api.dart';
import 'package:tennis_app/pages/home_page.dart';
import 'package:tennis_app/pages/schedules/courts_schedule_page.dart';
import 'package:tennis_app/pages/schedules/hall_schedule_page.dart';
import 'package:tennis_app/pages/trainers/trainers_page.dart';
import 'package:timezone/data/latest_all.dart' as tz;
import 'package:intl/date_symbol_data_local.dart';
import 'package:flutter_localizations/flutter_localizations.dart'; // Import for localization

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // if (kIsWeb) {
  //   await Firebase.initializeApp(
  //     options: const FirebaseOptions(
  //       apiKey: "AIzaSyC3W5UwgPShpQ3xC83dorCOxRp3sQ2bTz0",
  //       authDomain: "tennis-5b1a9.firebaseapp.com",
  //       projectId: "tennis-5b1a9",
  //       storageBucket: "tennis-5b1a9.appspot.com",
  //       messagingSenderId: "777303258538",
  //       appId: "1:777303258538:web:6666aad64689a16ddfa7d3",
  //       // databaseURL: 'https://tennis-5b1a9-default-rtdb.firebaseio.com/'
  //     ),
  //   );
  // } else {
  await Firebase.initializeApp();
  // }
  tz.initializeTimeZones();
  await initializeDateFormatting('uk', null);
  await FirebaseApi().initNotifications();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.black),
          useMaterial3: true,
          fontFamily: 'Geometria'
          // textTheme: GoogleFonts.robotoTextTheme(
          //   Theme.of(context).textTheme.copyWith(
          //         headlineLarge: GoogleFonts.playfairDisplaySc(),
          //         headlineMedium: GoogleFonts.playfairDisplaySc(),
          //         headlineSmall: GoogleFonts.playfairDisplaySc(),
          //       ),
          // ),
          ),
      locale: const Locale('uk'), // Force Ukrainian locale for the entire app
      supportedLocales: [
        const Locale('uk', ''), // Ukrainian
        const Locale('en', ''), // English (fallback)
      ],
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      home: HomePage(),
      initialRoute: '/',
      routes: {
        // '/': (context) => HomePage(),
        '/courts-schedule': (context) => CourtsSchedulePage(),
        '/hall-schedule': (context) => HallSchedulePage(),
        // '/purchase-screen': (context) => const PurchaseScreen(),
        '/trainers': (context) => TrainersPage(),
      },
    );
  }
}

final DatabaseReference _databaseReference = FirebaseDatabase.instance.ref();
