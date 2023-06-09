img = "";
cocossd_status = "";
objects = [];

function back() {
    window.location = "index.html";
}

function preload() {
    img = loadImage('fruits_basket.jpeg');
}

function setup() {
    canvas = createCanvas(500, 400);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 500, 400);

    if (cocossd_status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("cocossd").innerHTML = "There are many objects in the image from which CoCoSSD has detected 2 objects.";

            percent = floor(objects[i].confidence * 100);
            fill('red');
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('red');
            strokeWeight(1);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model is loaded!");
    cocossd_status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}