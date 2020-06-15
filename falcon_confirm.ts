##############################################
# Trend confirmation based on VWAP/SMA cross #
# To be used on the intraday charts          #
##############################################

declare upper;

input smaLength = 18;
input displayBreakout = yes;
input breakoutOffset = 0.05;

def sma = reference SimpleMovingAvg(length = smaLength);
def wap = reference VWAP();
def upTrendConfirm = low crosses above sma;
def downTrendConfirm =  high crosses below sma;
def upTrendStop = round(low - ATR());
def downTrendStop = round(high + ATR());

plot upConfirm = if upTrendConfirm then (low - breakoutOffset) else Double.NaN;
upConfirm.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
upConfirm.SetDefaultColor(Color.LIGHT_GREEN);
upConfirm.SetHiding(!displayBreakout);

plot downConfirm = if downTrendConfirm then (high + breakoutOffset) else Double.NaN;
downConfirm.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
downConfirm.SetDefaultColor(Color.LIGHT_RED);

AssignPriceColor(if upTrendConfirm then Color.YELLOW else if downTrendConfirm then Color.VIOLET else Color.CURRENT);

