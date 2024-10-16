import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class FirebaseApi {
  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FlutterLocalNotificationsPlugin _flutterLocalNotificationsPlugin =
      FlutterLocalNotificationsPlugin();

  Future<void> initNotifications() async {
    await _firebaseMessaging.requestPermission();

    const AndroidInitializationSettings initializationSettingsAndroid =
        AndroidInitializationSettings('@mipmap/ic_launcher');

    const DarwinInitializationSettings initializationSettingsIOS =
        DarwinInitializationSettings();

    final InitializationSettings initializationSettings =
        InitializationSettings(
      android: initializationSettingsAndroid,
      iOS: initializationSettingsIOS,
    );

    await _flutterLocalNotificationsPlugin.initialize(initializationSettings);

    const AndroidNotificationChannel channel = AndroidNotificationChannel(
      'events_channel',
      'Events Notifications',
      description: 'This channel is used for events.',
      importance: Importance.max,
    );

    await _flutterLocalNotificationsPlugin
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(channel);

    final fCMToken = await _firebaseMessaging.getToken();
    print('Token: $fCMToken');

    _firestore.collection('events').snapshots().listen((snapshot) {
      for (var change in snapshot.docChanges) {
        if (change.type == DocumentChangeType.added ||
            change.type == DocumentChangeType.modified) {
          final eventData = change.doc.data() as Map<String, dynamic>;

          final expiresAt = eventData['expiresAt'] as Timestamp;
          if (expiresAt.toDate().isBefore(DateTime.now())) {
            continue; // Skip this event
          }

          _scheduleNotification(eventData);
        }
      }
    });
  }

  Future<void> _scheduleNotification(Map<String, dynamic> eventData) async {
    final postAt = (eventData['postAt'] as Timestamp).toDate();
    final currentTime = DateTime.now();

    if (currentTime.isAfter(postAt)) {
      print('Skipped event: postAt time has already passed.');
    } else {
      final timeUntilPost = postAt.difference(currentTime).inSeconds;

      Future.delayed(Duration(seconds: timeUntilPost), () {
        _showLocalNotification(eventData);
      });
    }
  }

  Future<void> _showLocalNotification(Map<String, dynamic> eventData) async {
    final title = eventData['title'] ?? 'New Event';
    final body = eventData['description'] ?? 'Check out the new event!';

    const AndroidNotificationDetails androidPlatformChannelSpecifics =
        AndroidNotificationDetails(
      'events_channel',
      'Events Notifications',
      channelDescription: 'This channel is used for events.',
      importance: Importance.max,
      priority: Priority.high,
    );
    const NotificationDetails platformChannelSpecifics =
        NotificationDetails(android: androidPlatformChannelSpecifics);

    await _flutterLocalNotificationsPlugin.show(
      0,
      title,
      body,
      platformChannelSpecifics,
      payload: 'Default_Sound',
    );
  }
}
