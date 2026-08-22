import Poco from "commodetto/Poco";
import Battery from "embedded:sensor/Battery";
const render = new Poco(screen);


// ============================================================
// FONTS
// ============================================================

const timeFont = new render.Font("Leco-Regular", 42);
//const secondsFont = new render.Font("Leco-Regular", 20);
const dateFont = new render.Font("Gothic-Regular", 14);


// ============================================================
// COLORS
// ============================================================

const black = render.makeColor(0, 0, 0);
const white = render.makeColor(255, 255, 255);
const green = render.makeColor(0, 170, 0);
const yellow = render.makeColor(255, 170, 0);
const red = render.makeColor(255, 0, 0);


// ============================================================
// Text Variables
// ============================================================

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


// ============================================================
// BATTERY
// ============================================================

let batteryPercent = 100;

const battery = new Battery({});


// ============================================================
// ANIMATION VARIABLES
// ============================================================

// Current X position of the circle
let circleX = 0;

// Current X position of the rectangle
let rectangleX = render.width - 7;


// ============================================================
// MAIN DRAW FUNCTION
// ============================================================

function draw(event) {

    const now = event.date;

    // Get current battery percentage
    batteryPercent = battery.sample().percent;


    render.begin();

   //BG Color
    render.fillRectangle(
        black,
        0,
        0,
        render.width,
        render.height
    );

    drawBatteryBar();


    // --------------------------------------------------------
    // Time
    // --------------------------------------------------------

    const hours = String(now.getHours() % 12 || 12);

    const minutes = String(now.getMinutes()).padStart(2, "0");

    const timeStr = `${hours}:${minutes}`;

    let width = render.getTextWidth(timeStr, timeFont);

    render.drawText(
        timeStr,
        timeFont,
        white,
        (render.width - width) / 2,
        (render.height / 2) - timeFont.height + 5
    );


    // --------------------------------------------------------
    // Date
    // --------------------------------------------------------

    const dayName = DAYS[now.getDay()];

    const monthName = MONTHS[now.getMonth()];

    const dateStr =
        `${dayName} ${monthName} ${String(now.getDate()).padStart(2, "0")}`;

    width = render.getTextWidth(dateStr, dateFont);

    render.drawText(
        dateStr,
        dateFont,
        white,
        (render.width - width) / 2,
        (render.height / 2) + 10
    );


    // --------------------------------------------------------
    // Moon
    // --------------------------------------------------------

    const Year = now.getFullYear();
    const Month = now.getMonth();
    const Day = now.getDate();

    const moon = getMoonPhase(Year, Month, Day);

    drawMoon(moon);


    // --------------------------------------------------------
    // Animations
    // --------------------------------------------------------

    drawpet();

    drawpet2();


    render.end();
}


// ============================================================
// BATTERY BAR
// ============================================================

function drawBatteryBar() {

    const barWidth = (render.width / 8) | 0;

    // Center the battery bar
    const barX = ((render.width - barWidth) / 2) - 20 | 0;

    const barY = (render.height / 2) - 60;

    const barHeight = 8;


    // Border
    render.fillRectangle(
        white,
        barX,
        barY,
        barWidth,
        barHeight
    );


    // Interior/background
    render.fillRectangle(
        black,
        barX + 1,
        barY + 1,
        barWidth - 2,
        barHeight - 2
    );


    // Battery color

    let barColor;

    if (batteryPercent <= 20) {
        barColor = red;
    }
    else if (batteryPercent <= 40) {
        barColor = yellow;
    }
    else {
        barColor = green;
    }


    // Filled portion

    const fillWidth =
        ((batteryPercent * (barWidth - 4)) / 100) | 0;

    render.fillRectangle(
        barColor,
        barX + 2,
        barY + 2,
        fillWidth,
        barHeight - 4
    );
}


// ============================================================
// MOON
// ============================================================

function drawMoon(Moon) {

    const CX = (render.width * 3 / 4) - 30 | 0;

    const CY = (render.height / 2) - 57;

    const moon = Moon;


    if (moon == 0) {

        render.drawCircle(
            white,
            CX,
            CY,
            6,
            0,
            360
        );

        render.drawCircle(
            black,
            CX,
            CY,
            5,
            0,
            360
        );
    }

    else if (moon == 4) {

        render.drawCircle(
            white,
            CX,
            CY,
            8,
            0,
            360
        );
    }

    else if (moon == 2) {

        render.drawCircle(
            white,
            CX,
            CY,
            7,
            0,
            360
        );

        render.drawCircle(
            black,
            CX,
            CY,
            6,
            180,
            360
        );
    }

    else if (moon == 6) {

        render.drawCircle(
            white,
            CX,
            CY,
            7,
            0,
            360
        );

        render.drawCircle(
            black,
            CX,
            CY,
            6,
            0,
            180
        );
    }

    else if (moon == 7) {

        render.drawCircle(
            white,
            CX,
            CY,
            7,
            0,
            360
        );

        render.drawCircle(
            black,
            CX + 3,
            CY,
            6,
            0,
            360
        );
    }

    else if (moon == 1) {

        render.drawCircle(
            white,
            CX,
            CY,
            7,
            0,
            360
        );

        render.drawCircle(
            black,
            CX - 3,
            CY,
            6,
            0,
            360
        );
    }

    else if (moon == 5) {

        render.drawCircle(
            white,
            CX,
            CY,
            7,
            0,
            360
        );

        render.drawCircle(
            black,
            CX + 4,
            CY,
            6,
            0,
            180
        );
    }

    else if (moon == 3) {

        render.drawCircle(
            white,
            CX,
            CY,
            7,
            0,
            360
        );

        render.drawCircle(
            black,
            CX - 4,
            CY,
            6,
            180,
            360
        );
    }
}


// ============================================================
// MOON PHASE CALCULATION
// ============================================================

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


    return b;
}


// ============================================================
// Objects to Move
// ============================================================

function drawpet() {

    render.drawCircle(
        white,
        circleX,
        (render.height * 4) / 5,
        7
    );
}


function drawpet2() {

    render.fillRectangle(
        white,
        rectangleX,
        (render.height * 4) / 5,
        7,
        7
    );
}


// ============================================================
// ANIMATION
// ============================================================
//
// This runs approximately 30 times per second.
//
// Every time it runs:
//     circleX moves RIGHT
//     rectangleX moves LEFT
//
// Then draw() redraws the screen with the new positions.
// ============================================================

setInterval(() => {

    // Move circle to the right
    circleX += 2;

    // Move rectangle to the left
    rectangleX -= 2;


    // If circle goes off the right side,
    // put it back on the left.
    if (circleX > render.width + 7) {

        circleX = -7;
    }


    // If rectangle goes off the left side,
    // put it back on the right.
    if (rectangleX < -7) {

        rectangleX = render.width;
    }


    // Redraw everything
    //
    // Make animation visible
    draw({
        date: new Date()
    });

}, 33);


// ============================================================
// WATCHFACE TIME UPDATE
// ============================================================


watch.addEventListener("minutechange", draw);
