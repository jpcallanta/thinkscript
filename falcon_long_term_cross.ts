###############################################################
# Long term swing/investment trend signaling and confirmation #
# Also displays ATR based price targets and stop exits        #
###############################################################

#Initializers
declare upper;
input ema1Period = 10;
input ema2Period = 20;
input ema3Period = 200;
input targetFactor = 2.5;
input stopFactor = 1.5;

#Variables
def barEMA1 = reference MovAvgExponential(length = ema1Period);
def barEMA2 = reference MovAvgExponential(length = ema2Period);
def barEMA3 = reference MovAvgExponential(length = ema3Period);

# Plot Averages
plot ema1 = barEMA1;
plot ema2 = barEMA2;
plot ema3 = barEMA3;

ema1.SetDefaultColor(Color.CYAN);
ema2.SetDefaultColor(Color.ORANGE);
ema3.SetDefaultColor(Color.GRAY);

# Falcon Crossing
def crossedUp = barEMA1 crosses above barEMA2;
def crossedDown = barEMA1 crosses below barEMA2;

plot upTrend = crossedUp;
plot downTrend = crossedDown;

upTrend.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
downTrend.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
upTrend.SetDefaultColor(Color.LIGHT_GREEN);
downTrend.SetDefaultColor(Color.LIGHT_RED);

# Price Targets
def longTarget = round(close + ATR());
def shortTarget = round(close - ATR());

AddChartBubble(crossedUp, longTarget, "PT: " + longTarget, Color.LIGHT_GREEN, yes);
AddChartBubble(crossedDown, shortTarget, "PT: " + shortTarget, Color.LIGHT_GREEN, no);

plot longTargetLine = if crossedUp then longTarget else Double.NaN;
plot shortTargetLine = if crossedDown then shortTarget else Double.NaN;
longTargetLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
shortTargetLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
longTargetLine.SetDefaultColor(Color.LIGHT_GREEN);
shortTargetLine.SetDefaultColor(Color.LIGHT_GREEN);

# Stop Exits
def longStop = round(close - (ATR() * targetFactor));
def shortStop = round(close + (ATR() * stopFactor));

plot longStopLine = if crossedUp then longStop else Double.NaN;
plot shortStopLine = if crossedDown then shortStop else Double.NaN;
longStopLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
shortStopLine.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
longStopLine.SetDefaultColor(Color.LIGHT_RED);
shortStopLine.SetDefaultColor(Color.LIGHT_RED);

AddChartBubble(crossedUp, longStop, "SL: " + longStop, Color.LIGHT_RED, yes);
AddChartBubble(crossedDown, shortStop, "SL: " + shortStop, Color.LIGHT_RED, yes);
