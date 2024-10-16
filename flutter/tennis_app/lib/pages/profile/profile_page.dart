import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:tennis_app/pages/profile/login_page.dart';
import 'package:tennis_app/pages/profile/profile_detail.dart';
import 'package:tennis_app/services/auth/auth_service.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: AuthService.authChanges,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.active) {
          // Check if user is signed in
          if (snapshot.data != null) {
            return ProfileDetailPage(); // User is signed in
          } else {
            return LoginPage(); // User is not signed in
          }
        }
        // Show loading indicator while waiting for auth data
        return Scaffold(
          body: Center(child: CircularProgressIndicator()),
        );
      },
    );
  }
}
