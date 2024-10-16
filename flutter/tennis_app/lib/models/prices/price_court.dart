class PricesCourtModel {
  final int courtWeekDayFirstPart;
  final int courtWeekDaySecondPart;
  final int courtWeekends;

  PricesCourtModel({
    required this.courtWeekDayFirstPart,
    required this.courtWeekDaySecondPart,
    required this.courtWeekends,
  });

  @override
  String toString() {
    return 'PricesCourtModel(courtWeekDayFirstPart: $courtWeekDayFirstPart, courtWeekDaySecondPart: $courtWeekDaySecondPart, courtWeekends: $courtWeekends)';
  }
}
