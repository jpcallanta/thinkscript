# Initializers
declare upper;
input confirmBars = 3;
input vwapPeriod = AggregationPeriod.DAY;
input smaPeriod = 10;

# Variables
def barSMA = reference SimpleMovingAvg(length = smaPeriod);
def wap = reference VWAP(vwapPeriod);
def lastClose = close from confirmBars bar ago;

# Plots
plot SMA10 = barSMA;
plot VWAP = wap;

# Elevating Conditionals
def aboveSMA = close > barSMA && high > barSMA;
def aboveVWAP = close > wap && high > wap;
def vwapCrossUp = barSMA crosses above wap;
def isConfirmedBull = aboveSMA && aboveVWAP && vwapCrossUp;
plot confirmationBull = isConfirmedBull;
alert(confirmationBull, "Buy CALL!", Alert.BAR, Sound.Ring);
AddChartBubble(confirmationBull, high, "Buy CALL!!!", Color.LIGHT_GREEN, yes);
confirmationBull.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
confirmationBull.SetDefaultColor(Color.LIGHT_GREEN);

# Deprecating Contionals
def belowSMA = close < barSMA && low < barSMA;
def belowVWAP = close < wap && low < wap;
def belowLastClose = high > lastClose;
def vwapCrossDown = barSMA crosses below wap;
def isConfirmedBear = belowSMA && belowVWAP && belowLastClose && vwapCrossDown;

plot confirmationBear = isConfirmedBear;
alert(confirmationBull, "Buy PUT!", Alert.BAR, Sound.Ring);
AddChartBubble(confirmationBear, high, "Buy PUT!!!", Color.LIGHT_RED, yes);
confirmationBear.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
confirmationBear.SetDefaultColor(Color.LIGHT_RED);

