#Initializers
declare upper;
input confirmLevel = .50;
input confirmBars = 3;

# Variables
def tenBarSMA = reference SimpleMovingAvg(length = 10);
def wap = reference VWAP();
def lastClose = close from confirmBars bar ago;

# Plots
plot SMA10 = tenBarSMA;
plot VWAP = wap;

# Elevating Conditionals
def aboveSMA = close is greater than tenBarSMA;
def aboveVWAP = close is greater than wap and high is greater than wap;
def aboveLastClose = low is greater than lastClose;
def vwapCrossUp = close crosses above (wap + confirmLevel);
def isConfirmedBull = aboveSMA and aboveVWAP and aboveLastClose and vwapCrossUp;

plot confirmationBull = isConfirmedBull;
alert(confirmationBull, "Buy CALL!", Alert.BAR, Sound.Ring);
AddChartBubble(confirmationBull, high, "Buy CALL!!!", Color.LIGHT_GREEN, yes);
confirmationBull.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
confirmationBull.SetDefaultColor(Color.LIGHT_GREEN);

# Deprecating Contionals
def belowSMA = close is less than tenBarSMA;
def belowVWAP = close is less than wap;
def belowLastClose = high is less than lastClose;
def vwapCrossDown = close crosses below (wap - confirmLevel);
def isConfirmedBear = belowSMA and belowVWAP and belowLastClose and vwapCrossDown;

plot confirmationBear = isConfirmedBear;
alert(confirmationBull, "Buy PUT!", Alert.BAR, Sound.Ring);
AddChartBubble(confirmationBear, high, "Buy PUT!!!", Color.LIGHT_RED, yes);
confirmationBear.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
confirmationBear.SetDefaultColor(Color.LIGHT_RED);

