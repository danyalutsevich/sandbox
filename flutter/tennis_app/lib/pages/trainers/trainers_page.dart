import 'package:flutter/material.dart';
import 'package:tennis_app/services/trainers/get_trainers.dart';

class TrainersPage extends StatefulWidget {
  @override
  _TrainersPageState createState() => _TrainersPageState();
}

class _TrainersPageState extends State<TrainersPage> {
  late Future<List<Map<String, dynamic>>> _trainersFuture;

  @override
  void initState() {
    super.initState();
    _trainersFuture = TrainerService().getTrainers();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Тренери',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Colors.white,
            fontSize: 18.0,
          ),
        ),
        backgroundColor: Color(0xFF425516),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: _trainersFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Помилка: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return Center(child: Text('Тренерів не знайдено.'));
          }
          print('-------------------${snapshot}');
          final trainers = snapshot.data!;

          return GridView.builder(
            padding: const EdgeInsets.all(8.0),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 8.0,
              mainAxisSpacing: 8.0,
            ),
            itemCount: trainers.length,
            itemBuilder: (context, index) {
              final trainer = trainers[index];
              final photoUrl =
                  trainer['photo'] as String? ?? 'default_photo_url';
              final name = trainer['name'] as String? ?? 'Невідомо';
              final phone = trainer['number'].toString();
              final description =
                  trainer['description'] as String? ?? 'Біографія не доступна';

              return GestureDetector(
                onTap: () {
                  showDialog(
                    context: context,
                    builder: (context) => TrainerDetailDialog(trainer: trainer),
                  );
                },
                child: Card(
                  color: Color(0xFFE0E0E0),
                  elevation: 5,
                  child: Column(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(16.0),
                          topRight: Radius.circular(16.0),
                        ),
                        child: Image.network(
                          photoUrl,
                          height: 90,
                          width: double.infinity,
                          fit: BoxFit.fill,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          children: [
                            Text(
                              name,
                              style: TextStyle(fontWeight: FontWeight.bold),
                            ),
                            Text(phone),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class TrainerDetailDialog extends StatelessWidget {
  final Map<String, dynamic> trainer;

  const TrainerDetailDialog({Key? key, required this.trainer})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final photoUrl = trainer['photo'] as String? ?? 'default_photo_url';
    final name = trainer['name'] as String? ?? 'Невідомо';
    final phone = trainer['number'].toString() as String? ?? 'Невідомо';
    final description =
        trainer['description'] as String? ?? 'Біографія не доступна';

    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16.0),
      ),
      child: Container(
        // Constrain the height to a reasonable size
        constraints: BoxConstraints(
          maxHeight: MediaQuery.of(context).size.height * 0.8,
        ),
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(16.0),
                child: Image.network(
                  photoUrl,
                  height: 250,
                  width: double.infinity,
                  fit: BoxFit.fill,
                ),
              ),
              SizedBox(height: 16),
              Text(
                name,
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 8),
              Text(
                phone,
                style: TextStyle(fontSize: 18),
              ),
              SizedBox(height: 16),
              Text(
                description,
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                style: ElevatedButton.styleFrom(
                  elevation: 5,
                  padding: const EdgeInsets.symmetric(
                      horizontal: 16.0, vertical: 16.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(15.0),
                    side: BorderSide(color: Color(0xFF425516), width: 2),
                  ),
                  textStyle: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.normal,
                  ),
                  backgroundColor: Color(0xFF425516), // Remove primary color
                ),
                child: Text(
                  'Закрити',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
