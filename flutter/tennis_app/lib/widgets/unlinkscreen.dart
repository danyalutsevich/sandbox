import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';

Future<void> handleGoogleSignOut() async {
  try {
    print('Starting Google Sign-Out...');

    User? currentUser = FirebaseAuth.instance.currentUser;
    print('Current user: $currentUser');

    if (currentUser != null) {
      // Unlink the Google account from Firebase
      await currentUser.unlink('google.com');
      print('Google account unlinked successfully.');

      // Sign out from GoogleSignIn to ensure full disconnection
      final GoogleSignIn googleSignIn = GoogleSignIn();
      await googleSignIn.signOut();
      print('Google account signed out successfully.');
    } else {
      print('No user is signed in to unlink.');
    }
  } catch (e) {
    print('Error during Google Sign-Out or unlinking: $e');
  }
}
