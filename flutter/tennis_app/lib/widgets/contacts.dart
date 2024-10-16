import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactInfoBlock extends StatelessWidget {
  final String location;
  final String phoneNumber;
  final String instagram;

  const ContactInfoBlock({
    Key? key,
    required this.location,
    required this.phoneNumber,
    required this.instagram,
  }) : super(key: key);

  Future<void> _launchURL(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  Future<void> _openLocationInMap(String location) async {
    final query = Uri.encodeComponent(location);
    final googleMapsUrl =
        "https://maps.app.goo.gl/YoQChEAscyk8psjJ7?g_st=com.google.maps.preview.copy";
    await _launchURL(googleMapsUrl);
  }

  Future<void> _openInstagram(String handle) async {
    final instagramUrl = "https://www.instagram.com/central.park.ternopil/";
    await _launchURL(instagramUrl);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity, // Full width
      padding: const EdgeInsets.all(12.0),
      decoration: BoxDecoration(
        color: Colors.deepOrange[50],
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            spreadRadius: 3,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Text(
              "Контактна інформація",
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.deepOrange[800],
              ),
            ),
          ),
          const SizedBox(height: 10),
          GestureDetector(
            onTap: () => _openLocationInMap(location),
            child: Row(
              children: [
                const Icon(Icons.location_on, color: Color(0xFF425516)),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    location,
                    style: const TextStyle(
                      fontSize: 14,
                      color: Colors.blueGrey,
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              const Icon(Icons.phone, color: Color(0xFF425516)),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  phoneNumber,
                  style: const TextStyle(fontSize: 14),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          GestureDetector(
            onTap: () => _openInstagram(instagram),
            child: Row(
              children: [
                const Icon(Icons.camera_alt, color: Color(0xFF425516)),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    instagram,
                    style: const TextStyle(
                      fontSize: 14,
                      color: Colors.blueGrey,
                      decoration: TextDecoration.underline,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
