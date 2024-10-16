import 'package:tennis_app/utils/liqpay/liqpay.dart';

/// Base LiqPay error response
class LiqPayErrorResponse extends LiqPayResponse {
  final String? errorCode;
  final String? errorDescription;
  LiqPayErrorResponse(
      super.result,
      super.status,
      super.version,
      // super.action,
      this.errorCode,
      this.errorDescription);

  factory LiqPayErrorResponse.fromJson(Map<String, dynamic> json) =>
      LiqPayErrorResponse(
        json['result'] as String,
        json['status'] as String,
        json['version'].toString(),
        // LiqPayAction.fromValue(json['action']).toString() as LiqPayAction,
        json['err_code'] as String?,
        json['err_description'] as String?,
      );
}
