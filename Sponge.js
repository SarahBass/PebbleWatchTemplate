import Poco from "commodetto/Poco";

console.log("Hello, Gary.");

const render = new Poco(screen);

const black = render.makeColor(0, 85, 170);

const gary = new Poco.PebbleBitmap(1);
const pet = new Poco.PebbleBitmap(4);
const pet1 = new Poco.PebbleBitmap(5);
const ocean = new Poco.PebbleBitmap(2);

let garyX = render.width;
let garyY = (render.height - gary.height)-10;
let petX = 1;

// Which pet frame to display
let petFrame = pet;

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
        ocean,
        -40,
        (render.height - ocean.height)
    );

    // Draw current pet animation frame
    render.drawBitmap(
        petFrame,
        petX,
        garyY
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


// Move everything approximately 30 times per second
setInterval(() => {

    // Move Gary to the left
    garyX -= 2;

    // If Gary goes completely off the left side,
    // put him back on the right.
    if (garyX < -gary.width) {
        garyX = render.width;
    }

    // Move Pet to the right
    petX += 2;

    // If Pet goes completely off the right side,
    // put him back on the left.
    if (petX > render.width) {
        petX = -pet.width;
    }

    // Redraw everything
    draw();

}, 50);


// Switch between pet and pet1
setInterval(() => {

    if (petFrame === pet) {
        petFrame = pet1;
    }
    else {
        petFrame = pet;
    }

}, 70);
