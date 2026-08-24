import Poco from "commodetto/Poco";

console.log("Hello, Gary.");

const render = new Poco(screen);

const black = render.makeColor(0, 0, 0);

const gary = new Poco.PebbleBitmap(1);

let garyX = render.width;
let garyY = (render.height - gary.height) / 2;


function draw() {

    render.begin();

    render.fillRectangle(
        black,
        0,
        0,
        render.width,
        render.height
    );

    render.drawBitmap(
        gary,
        garyX,
        garyY
    );

    render.end();
}


// Initial draw
draw();


// Move Gary approximately 30 times per second
setInterval(() => {

    // Move Gary to the left
    garyX -= 2;


    // If Gary goes completely off the left side,
    // put him back on the right.
    if (garyX < -gary.width) {

        garyX = render.width;
    }


    // Redraw everything
    draw();

}, 33);
