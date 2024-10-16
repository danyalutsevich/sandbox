import 'package:flutter/material.dart';
import 'package:tennis_app/pages/liqpay/purchase_screen.dart';
import 'package:tennis_app/services/bookings/pre_training_booking_service.dart';
import 'package:intl/intl.dart';

class CourtBookingModal extends StatefulWidget {
  final List<String> selectedTimes;
  final int courtNumber;
  final String selectedDate;
  final int totalPrice;

  const CourtBookingModal({
    Key? key,
    required this.selectedTimes,
    required this.courtNumber,
    required this.selectedDate,
    required this.totalPrice,
  }) : super(key: key);

  @override
  _CourtBookingModalState createState() => _CourtBookingModalState();
}

class _CourtBookingModalState extends State<CourtBookingModal> {
  final PreTrainingCourtService _preTrainingCourtService =
      PreTrainingCourtService();
  String _preTrainingCourtMessage = '';
  bool _isPreTrainingCourtAvailable = false;
  bool _bookTrainCourt = false;

  @override
  void initState() {
    super.initState();
    _checkPreTrainingCourtAvailability();
  }

  Future<void> _checkPreTrainingCourtAvailability() async {
    String preTrainingStartTime =
        _getPreTrainingStartTime(widget.selectedTimes.first);
    String preTrainingEndTime = widget.selectedTimes.last;

    bool isAvailable =
        await _preTrainingCourtService.isPreTrainingCourtAvailable(
      widget.selectedDate,
      widget.selectedTimes[0],
    );

    setState(() {
      _isPreTrainingCourtAvailable = isAvailable;
      _preTrainingCourtMessage = isAvailable
          ? 'Тренувальний корт доступний для розігріву на $preTrainingStartTime'
          : 'Тренувальний корт вже заброньований на цей час';
    });
  }

  String _formatDate(String date) {
    DateTime parsedDate = DateTime.parse(date);
    return DateFormat('d MMMM', 'uk').format(parsedDate);
  }

  String _getPreTrainingStartTime(String courtTime) {
    DateTime dateTime =
        DateTime.parse('2023-01-01 $courtTime:00'); // Sample date for parsing
    DateTime preTrainingDateTime = dateTime.subtract(Duration(minutes: 30));
    return preTrainingDateTime
        .toIso8601String()
        .substring(11, 16); // Extract time
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: SingleChildScrollView(
        child: Container(
          width: 300.0, // Set the width of the modal
          padding: EdgeInsets.all(20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Text(
                'Бронювання на наступні години:',
                style: TextStyle(fontSize: 14),
                textAlign: TextAlign.center,
              ),
              Column(
                children: widget.selectedTimes.map((time) {
                  return Text(
                    time,
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  );
                }).toList(),
              ),
              SizedBox(height: 10.0),
              Text(
                'Дата бронювання:',
                style: TextStyle(fontSize: 14),
                textAlign: TextAlign.center,
              ),
              Text(
                _formatDate(widget.selectedDate),
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 10.0),
              Divider(
                color: Colors.green[900],
                thickness: 2.0,
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: 8.0),
                child: Text(
                  _preTrainingCourtMessage,
                  style: TextStyle(fontSize: 14),
                  textAlign: TextAlign.center,
                ),
              ),
              if (_isPreTrainingCourtAvailable)
                Column(
                  children: [
                    SizedBox(height: 5.0),
                    SizedBox(
                        width: double.infinity,
                        child: OutlinedButton(
                          onPressed: () {
                            setState(() {
                              _bookTrainCourt = !_bookTrainCourt;
                            });
                          },
                          child: Text(
                            _bookTrainCourt ? 'Скасувати бронь' : 'Бронь',
                            textAlign: TextAlign.center,
                          ),
                          style: OutlinedButton.styleFrom(
                            side: BorderSide(
                              color: _bookTrainCourt
                                  ? const Color.fromARGB(255, 230, 81, 0)
                                  : const Color.fromRGBO(
                                      0, 98, 51, 1), // Колір бордера
                              width: 2.0, // Товщина бордера
                            ),
                            foregroundColor: _bookTrainCourt
                                ? const Color.fromARGB(255, 200, 156, 156)
                                : const Color.fromARGB(
                                    255, 142, 172, 144), // Колір тексту
                            padding: EdgeInsets.symmetric(
                                horizontal: 5, vertical: 3), // Відступи
                          ),
                        )),
                    SizedBox(height: 10.0),
                  ],
                ),
              Divider(
                color: Colors.green[900],
                thickness: 2.0,
              ),
              Text(
                'До оплати: ${widget.totalPrice} грн',
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 10.0),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => PurchaseScreen(
                            selectedTimes: widget.selectedTimes,
                            courtNumber: widget.courtNumber,
                            selectedDate: widget.selectedDate,
                            bookTrainCourt: _bookTrainCourt,
                            totalPrice: widget.totalPrice),
                      ),
                    );
                  },
                  child: Text(
                    'Оплатити',
                    textAlign: TextAlign.center,
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green[800],
                    foregroundColor: Colors.white,
                    padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
