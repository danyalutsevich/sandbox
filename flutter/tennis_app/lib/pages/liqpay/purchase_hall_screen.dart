import 'dart:ffi';

import 'package:flutter/material.dart';
// import 'package:flutter_credit_card/credit_card_brand.dart';
import 'package:flutter_credit_card/flutter_credit_card.dart';
import 'package:tennis_app/pages/error/booking_error.dart';
import 'package:tennis_app/utils/bookings/new_hall_booking.dart';
import 'package:tennis_app/utils/liqpay/liqpay.dart';
import 'package:uuid/uuid.dart';

class PurchaseHallScreen extends StatefulWidget {
  final int peopleAmount;
  final List<String> bookHours;
  final String selectedDate;
  final int totalPrice;

  const PurchaseHallScreen({
    Key? key,
    required this.peopleAmount,
    required this.bookHours,
    required this.selectedDate,
    required this.totalPrice,
  }) : super(key: key);
  @override
  State<PurchaseHallScreen> createState() => _PurchaseHallScreenState();
}

class _PurchaseHallScreenState extends State<PurchaseHallScreen> {
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  late LiqPay liqPay;
  late OutlineInputBorder border;

  String _cardNumber = "";
  String _cardExpiryDate = "";
  String _cardHolderName = "";
  String _cardCvvCode = "";
  // bool _isCvvFocused = false;

  @override
  void initState() {
    super.initState();

    border = OutlineInputBorder(
      borderSide: BorderSide(
        color: Colors.grey.withOpacity(0.7),
        width: 2.0,
      ),
    );

    _cardNumber = "4242424242424242";
    final now = DateTime.now();
    _cardExpiryDate =
        '${now.month.toString().padLeft(2, '0')}/${(now.year + 1).toString().substring(2)}';
    _cardCvvCode = '000';

    liqPay = LiqPay("sandbox_i48947057704",
        "sandbox_vsWOLz1DnvlgQBBvMm6lvAmxUJVsKema32dKVYrO");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Purchases"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            // CreditCardWidget(
            //   glassmorphismConfig: null,
            //   cardNumber: _cardNumber,
            //   expiryDate: _cardExpiryDate,
            //   cardHolderName: _cardHolderName,
            //   cvvCode: _cardCvvCode,
            //   bankName: 'Bank',
            //   showBackView: _isCvvFocused,
            //   obscureCardNumber: true,
            //   obscureCardCvv: true,
            //   isHolderNameVisible: true,
            //   cardBgColor: Colors.amber[800]!.withRed(70),
            //   backgroundImage: null,
            //   isSwipeGestureEnabled: true,
            //   onCreditCardWidgetChange: (CreditCardBrand creditCardBrand) {},
            // ),
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    CreditCardForm(
                      formKey: formKey,
                      obscureCvv: true,
                      obscureNumber: true,
                      cardNumber: _cardNumber,
                      cvvCode: _cardCvvCode,
                      isHolderNameVisible: true,
                      isCardNumberVisible: true,
                      isExpiryDateVisible: true,
                      cardHolderName: _cardHolderName,
                      expiryDate: _cardExpiryDate,
                      // onCreditCardModelChange: onCreditCardModelChange,
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: ElevatedButton(
                  onPressed: () async {
                    final cardDate = _cardExpiryDate.split('/');
                    final card = LiqPayCard(_cardNumber.trim(), cardDate[0],
                        cardDate[1], _cardCvvCode);
                    print('___________Card___${card}');
                    final order = LiqPayOrder(
                        const Uuid().v4(),
                        widget.totalPrice.toDouble(),
                        'Оплата за бронювання залу',
                        card: card,
                        action: LiqPayAction.pay);
                    print('___________Order__${order}');

                    final result = await liqPay.purchase(order);
                    if (result.status == 'success') {
                      print('Success booking');
                      createNewHallBooking(
                        peopleAmount: widget.peopleAmount,
                        bookHours: widget.bookHours, // Use `widget.courtTime`
                        selectedDate: widget.selectedDate,
                        context: context, // Use `widget.selectedDate`
                      );
                    } else {
                      print('Oops something went wrong');
                      // const ErrorPage();
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => ErrorPage()),
                      );
                    }
                    // result
                  },
                  child: const Text("Оплатити")),
            )
          ],
        ),
      ),
    );
  }

  void onCreditCardModelChange(CreditCardModel? creditCardModel) {
    // setState(() {
    //   _cardNumber = creditCardModel!.cardNumber;
    //   _cardExpiryDate = creditCardModel.expiryDate;
    //   _cardHolderName = creditCardModel.cardHolderName;
    //   _cardCvvCode = creditCardModel.cvvCode;
    //   _isCvvFocused = creditCardModel.isCvvFocused;
    // });
  }
}
