import 'package:flutter/material.dart';
import 'package:tennis_app/pages/profile/profile_detail.dart';
import 'package:tennis_app/services/auth/auth_service.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  TextEditingController _phoneController = TextEditingController();
  TextEditingController _otpController = TextEditingController();

  final _formKey = GlobalKey<FormState>();
  final _formKey1 = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Увійти',
          style: TextStyle(
              fontWeight: FontWeight.bold, color: Colors.white, fontSize: 16),
        ),
        backgroundColor: Colors.deepOrange[800],
        iconTheme: const IconThemeData(color: Colors.white),

        // actions: [
        //   IconButton(
        //     icon: Icon(Icons.close),
        //     onPressed: () {
        //       Navigator.of(context).pop();
        //     },
        //   ),
        // ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(height: MediaQuery.of(context).size.height * 0.2),
              Image.asset(
                'images/logo.png',
                width: 120,
                height: 120,
              ),
              SizedBox(height: 30),
              Text(
                "Увідійдіть в додаток:",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 10),
              Form(
                key: _formKey,
                child: TextFormField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: InputDecoration(
                    prefixText: '+380',
                    labelText: "Введіть Ваш номер телефону",
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty || value.length != 9)
                      return "Введіть валідний 9-значний номер";
                    return null;
                  },
                ),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState!.validate()) {
                    showDialog(
                      context: context,
                      barrierDismissible: false,
                      builder: (BuildContext context) =>
                          Center(child: CircularProgressIndicator()),
                    );
                    await AuthService.sentOtp(
                      phone: _phoneController.text,
                      errorStep: (String errorMessage) {
                        Navigator.pop(context); // Hide the dialog
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content:
                                Text("Помилка надсилання коду: $errorMessage"),
                            backgroundColor: Colors.red,
                          ),
                        );
                      },
                      nextStep: () {
                        Navigator.pop(context); // Hide the dialog
                        showOtpDialog(context);
                      },
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.deepOrange[800], // Background color
                  foregroundColor: Colors.white, // Text color
                  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 35),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                child: Text("Отримати код", style: TextStyle(fontSize: 16)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void showOtpDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          "Перевірка коду",
          style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Color(0xFF221F1F),
              fontSize: 16),
        ),
        content: Form(
          key: _formKey1,
          child: TextFormField(
            controller: _otpController,
            keyboardType: TextInputType.number,
            decoration: InputDecoration(
              labelText: "Введіть код",
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            validator: (value) {
              if (value == null || value.isEmpty || value.length != 6) {
                return "Невірний код";
              }
              return null;
            },
          ),
        ),
        actions: [
          TextButton(
            onPressed: () {
              if (_formKey1.currentState!.validate()) {
                AuthService.loginWithOtp(otp: _otpController.text)
                    .then((result) {
                  Navigator.pop(context);
                  if (result == "Success") {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const ProfileDetailPage()),
                    );
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(result),
                        backgroundColor: Colors.red,
                      ),
                    );
                  }
                });
              }
            },
            child: Text("Перевірити код"),
          ),
        ],
      ),
    );
  }
}
