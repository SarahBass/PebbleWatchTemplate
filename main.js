import Poco from "commodetto/Poco";
import Battery from "embedded:sensor/Battery";

const render = new Poco(screen);

// Fonts
const timeFont = new render.Font("Leco-Regular", 42);
const dateFont = new render.Font("Gothic-Regular", 14);

// Colors
const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);
const green = render.makeColor(0, 170, 0);
const yellow = render.makeColor(255, 170, 0);
const red = render.makeColor(255, 0, 0);

// Day and month names for date formatting
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// Battery
let batteryPercent = 100;
const battery = new Battery({
    onSample() {
        batteryPercent = this.sample().percent;
        drawScreen();
    }
});





function draw(event) {
    const now = event.date;

    render.begin();
    render.fillRectangle(black, 0, 0, render.width, render.height);
    batteryPercent = battery.sample().percent;

   
 

    // Format time as HH:MM
    const hours = String(now.getHours()% 12 || 12);
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;

    // Center the time vertically (shifted up slightly to make room for date)
    let width = render.getTextWidth(timeStr, timeFont);
    render.drawText(timeStr, timeFont, white,
        (render.width - width) / 2,
        (render.height / 2) - timeFont.height + 5);

    // Format date as "Mon Jan 01"
    const dayName = DAYS[now.getDay()];
    const monthName = MONTHS[now.getMonth()];
    const dateStr = `${dayName} ${monthName} ${String(now.getDate()).padStart(2, "0")}`;

    // Draw date below the time
    width = render.getTextWidth(dateStr, dateFont);
    render.drawText(dateStr, dateFont, white,
        (render.width - width) / 2,
        (render.height / 2) + 10);

drawBatteryBar();

const Year = now.getFullYear();
const Month =now.getMonth() ;
const Day=now.getDate();
const moon = getMoonPhase(Year, Month, Day);


drawMoon(moon);

   render.end();











}

function drawBatteryBar() {
    const barWidth = (render.width / 6) | 0;
    const barX = ((render.width - barWidth) / 4) | 0;
    const barY = render.height < 180 ? 6 : 20;
    const barHeight = 8;

    // Draw border
    render.fillRectangle(white, barX, barY, barWidth, barHeight);
    render.fillRectangle(black, barX + 1, barY + 1, barWidth - 2, barHeight - 2);

    // Choose color based on battery level
    let barColor;
    if (batteryPercent <= 20) {
        barColor = red;
    } else if (batteryPercent <= 40) {
        barColor = yellow;
    } else {
        barColor = green;
    }

    // Draw filled portion
    const fillWidth = ((batteryPercent * (barWidth - 4)) / 100) | 0;
    render.fillRectangle(barColor, barX + 2, barY + 2, fillWidth, barHeight - 4);
}

function drawMoon(Moon) {
   const CX = (render.width*3 / 4) | 0;
    const CY = render.height < 180 ? 6 : 20;
const moon = Moon;

  if (moon==0){
render.drawCircle(white, CX, CY, 8, 0, 360);
render.drawCircle(black, CX, CY, 7, 0, 360);}
  else if(moon==4){render.drawCircle(white, CX, CY, 8, 0, 360);}
  else if (moon==2){
render.drawCircle(white, CX, CY, 8, 0, 360);
render.drawCircle(black, CX, CY, 8, 180, 360);}
  else if (moon==6){
render.drawCircle(white, CX, CY, 8, 0, 360);
render.drawCircle(black, CX, CY, 8, 0, 180);}
  else if (moon==7){
render.drawCircle(white, CX, CY, 8, 0, 360);
render.drawCircle(black, CX+3, CY, 8, 0, 360);}
  else if (moon==1){
render.drawCircle(white, CX, CY, 8, 0, 360);
render.drawCircle(black, CX-3, CY, 8, 0, 360);}
  else if (moon==5){
render.drawCircle(white, CX, CY, 8, 0, 360);
render.drawCircle(black, CX+4, CY, 8, 0, 180);}
  else if (moon==3){
render.drawCircle(white, CX, CY, 8, 0, 360);
render.drawCircle(black, CX-4, CY, 8, 180, 360);}
else{}

     /*
     0 => New Moon
     1 => Waxing Crescent Moon
     2 => Quarter Moon
     3 => Waxing Gibbous Moon
     4 => Full Moon
     5 => Waning Gibbous Moon
     6 => Last Quarter Moon
     7 => Waning Crescent Moon
     */

}

function getMoonPhase(year, month, day) {
  var c = 0;
  var e = 0;
  var jd = 0;
  var b = 0;

  if (month < 3) {
    year--;
    month += 12;
  }

  month++;

  c = 365.25 * year;
  e = 30.6 * month;

  jd = c + e + day - 694039.09;

  jd /= 29.5305882;

  b = Math.floor(jd);

  jd -= b;

  b = Math.round(jd * 8);

  if (b >= 8) {
    b = 0;
  }

  return b;}

     /*
     0 => New Moon
     1 => Waxing Crescent Moon
     2 => Quarter Moon
     3 => Waxing Gibbous Moon
     4 => Full Moon
     5 => Waning Gibbous Moon
     6 => Last Quarter Moon
     7 => Waning Crescent Moon
     */

// Update every minute (fires immediately when registered)
watch.addEventListener("minutechange", draw);
