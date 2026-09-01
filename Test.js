import Poco from "commodetto/Poco";

const render = new Poco(screen);

// ------------------------------------------------------------
// TEST BITMAP
// Change this number to test each resource:
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
// ------------------------------------------------------------

const testBitmap = new Poco.PebbleBitmap(2);


// ------------------------------------------------------------
// DRAW
// ------------------------------------------------------------

render.begin();

// Black background
const black = render.makeColor(0, 0, 0);

render.fillRectangle(
    black,
    0,
    0,
    render.width,
    render.height
);


// ------------------------------------------------------------
// Draw bitmap at top-left
// ------------------------------------------------------------

render.drawBitmap(
    testBitmap,
    0,
    0
);

render.end();
