import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:tennis_app/services/google_events/new_google_event.dart';
import 'package:tennis_app/models/booking.dart';

Future<void> handleGoogleSignIn(List<dynamic> events) async {
  print('__________events $events');
  try {
    print('Starting Google Sign-In...');

    User? currentUser = FirebaseAuth.instance.currentUser;
    print('Current user: $currentUser');

    if (currentUser != null) {
      final GoogleSignIn googleSignIn = GoogleSignIn(
        scopes: ['https://www.googleapis.com/auth/calendar'],
      );
      final GoogleSignInAccount? googleUser = await googleSignIn.signIn();
      final GoogleSignInAuthentication? googleAuth =
          await googleUser?.authentication;

      if (googleAuth != null && googleAuth.accessToken != null) {
        final AuthCredential googleCredential = GoogleAuthProvider.credential(
          accessToken: googleAuth.accessToken,
          idToken: googleAuth.idToken,
        );
        print('___googleCredential ${googleCredential.accessToken}');

        // Ensure events is of type List<Booking>
        List<Booking> bookingEvents = events.cast<Booking>();

        print('createGoogleCalendarEvent 1______');
        await createGoogleCalendarEvent(googleAuth.accessToken!, bookingEvents);

        UserCredential userCredential =
            await currentUser.linkWithCredential(googleCredential);

        if (userCredential.user != null) {
          print('createGoogleCalendarEvent 2_______');
          await createGoogleCalendarEvent(
              googleAuth.accessToken!, bookingEvents);
        } else {
          print('Failed to link Google account.');
        }
      } else {
        print('Failed to obtain Google Auth details.');
      }
    } else {
      print('No user is signed in with phone number.');
    }
  } catch (e) {
    print('Error during Google Sign-In or linking: $e');
  }
}
