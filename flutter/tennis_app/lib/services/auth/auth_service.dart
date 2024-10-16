import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  static final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;
  static String verifyId = "";

  static Stream<User?> get authChanges => _firebaseAuth.authStateChanges();

  static User? get currentUser => _firebaseAuth.currentUser;

  static Future<void> sentOtp({
    required String phone,
    //update to see the error
    required Function(String) errorStep,
    required Function nextStep,
  }) async {
    try {
      print("Attempting to send OTP to +380$phone");
      await _firebaseAuth.verifyPhoneNumber(
        phoneNumber: "+380$phone",
        verificationCompleted: (PhoneAuthCredential phoneAuthCredential) async {
          print("Verification completed automatically.");
          nextStep();
        },
        verificationFailed: (FirebaseAuthException error) async {
          print("Verification failed with error: ${error.message}");
          errorStep(error.message ?? "Unknown error"); // Pass the error message
        },
        codeSent: (String verificationId, int? forceResendingToken) async {
          print("OTP code sent successfully. Verification ID: $verificationId");
          verifyId = verificationId;
          nextStep();
        },
        codeAutoRetrievalTimeout: (String verificationId) async {
          print(
              "Code auto-retrieval timeout. Verification ID: $verificationId");
          verifyId = verificationId;
        },
      );
    } catch (e) {
      print("Error in sending OTP: $e");
      errorStep(e.toString()); // Pass the error message
    }
  }

  // Verify code and login
  static Future<String> loginWithOtp({required String otp}) async {
    try {
      final PhoneAuthCredential cred = PhoneAuthProvider.credential(
        verificationId: verifyId,
        smsCode: otp,
      );

      final UserCredential user =
          await _firebaseAuth.signInWithCredential(cred);
      if (user.user != null) {
        print("User signed in successfully: ${user.user!.uid}");
        return "Success";
      } else {
        print("Error in OTP login: User is null");
        return "Error in OTP login";
      }
    } on FirebaseAuthException catch (e) {
      print("FirebaseAuthException during login: ${e.message}");
      return e.message.toString();
    } catch (e) {
      print("Error during login with OTP: $e");
      return e.toString();
    }
  }

  static Future<void> logout() async {
    try {
      await _firebaseAuth.signOut();
      print("User logged out successfully");
    } catch (e) {
      print("Error during logout: $e");
    }
  }
}
