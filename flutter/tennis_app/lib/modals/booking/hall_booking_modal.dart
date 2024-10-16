import 'package:flutter/material.dart';
import 'package:tennis_app/pages/liqpay/purchase_hall_screen.dart';
import 'package:tennis_app/services/prices/hall_pricing_service.dart';

class HallBookingModal extends StatefulWidget {
  final List<String> selectedTimes;
  final String selectedDate;
  final int totalPrice;

  const HallBookingModal({
    Key? key,
    required this.selectedTimes,
    required this.selectedDate,
    required this.totalPrice,
  }) : super(key: key);

  @override
  _HallBookingModalState createState() => _HallBookingModalState();
}

class _HallBookingModalState extends State<HallBookingModal> {
  int peopleAmount = 0;
  // int? totalPrice; // Change to nullable int to handle loading state
  TextEditingController _controller = TextEditingController();
  HallPricingService pricingService = HallPricingService();

  @override
  void initState() {
    super.initState();
    // _calculateTotalPrice();
  }

  // void _calculateTotalPrice() async {
  //   int calculatedPrice = await pricingService.calculateHallPrice(
  //         widget.selectedTimes,
  //       ) ??
  //       0;
  //   print('Total price calculated: $calculatedPrice грн');

  //   setState(() {
  //     totalPrice = calculatedPrice;
  //     print('Total price calculated: $totalPrice грн');
  //   });
  // }

  @override
  void dispose() {
    _controller.dispose(); // Dispose the controller when the widget is removed
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                "Підтвердження бронювання",
                style: TextStyle(
                  fontSize: 16.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              TextField(
                controller: _controller,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Вкажіть кількість людей',
                ),
                onChanged: (value) {
                  setState(() {
                    peopleAmount = int.tryParse(value) ?? 0;
                  });
                },
              ),
              SizedBox(height: 16),
              Text(
                "Вибрані години:",
                style: TextStyle(
                  fontSize: 14.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 8),
              ...widget.selectedTimes.map((time) => Text(time)).toList(),
              SizedBox(height: 16),
              widget.totalPrice ==
                      null // Show loading spinner while price is being calculated
                  ? CircularProgressIndicator()
                  : Text(
                      'До сплати: ${widget.totalPrice} грн', // Show the calculated price once ready
                      style: TextStyle(
                        fontSize: 16.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
              SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  TextButton(
                    child: Text(
                      "Закрити",
                      style: TextStyle(
                        color: Color(0xFF221F1F),
                        fontSize: 12.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color(0xFF425516),
                      foregroundColor: Colors.white,
                      padding: EdgeInsets.symmetric(vertical: 6, horizontal: 6),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: Text(
                      "Підтвердити",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 12.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    onPressed:
                        widget.totalPrice != null && widget.totalPrice! > 0
                            ? () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => PurchaseHallScreen(
                                      peopleAmount: peopleAmount,
                                      bookHours: widget.selectedTimes,
                                      selectedDate: widget.selectedDate,
                                      totalPrice: widget.totalPrice!,
                                    ),
                                  ),
                                );
                              }
                            : null, // Disable button if totalPrice is null or 0
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
