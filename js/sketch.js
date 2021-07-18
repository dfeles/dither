
// gui params
var bgColor = '##2e2e33';
var shape = ['Floyd - Steinberg'];
var label = 'label';
let css

function preload() {
	css = loadStrings('/js/libs/style.css', loaded);
}
function loaded(result) {
	print(result)
}
// gui
var visible = true;
var gui;
var img;

// dynamic parameters
var bigRadius;

function setup() {
	img = loadImage('assets/laDefense.jpg');
	createCanvas(windowWidth, windowHeight);

	// Calculate big radius
	bigRadius = height / 3.0;

	// Create Layout GUI
	gui = createGui('Dithering');
	gui.addGlobals('bgColor','shape','label');

	gui.addButton("randomize", function() {
	randomize();
	});

	// Don't loop automatically
	noLoop();

}


function draw() {
	background(bgColor);
	print('a')
}

function randomize() {
	
}

// check for keyboard events
function keyPressed() {
	switch(key) {
	// type [F1] to hide / show the GUI
	case 'p':
		visible = !visible;
		if(visible) gui.show(); else gui.hide();
		break;
	}
}


// draw a regular n-gon with n sides
function ngon(n, x, y, d) {
  beginShape();
  for(var i = 0; i < n; i++) {
    var angle = TWO_PI / n * i;
    var px = x + sin(angle) * d / 2;
    var py = y - cos(angle) * d / 2;
    vertex(px, py);
  }
  endShape(CLOSE);
}
