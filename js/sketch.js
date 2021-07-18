
// gui params
var bgColor = '#2e2e33';
var shape = ['Floyd - Steinberg'];
var label = 'label';
var factor = 1;
var steps = 2;
var color1 = '#2e2e33';
var color2 = '#2e2e33';
var color3 = '#2e2e33';
var color4 = '#2e2e33';
var color5 = '#2e2e33';
var color6 = '#2e2e33';

function preload() {
	img = loadImage('./assets/harmashatar-cropped.jpg')
}
function loaded(result) {
	print(result)
}
// gui
var visible = true;
var gui;
var img, img_scaled;
var aratio;
var dither;

// dynamic parameters
var bigRadius;


function setup() {
	createCanvas(windowWidth, windowHeight);

	aratio = img.height/img.width
	// img_scaled = img.loadPixels()
	// img_scaled.resize(windowWidth, aratio*windowWidth);

	// img.resize(500, img.height*aratio)
	img.loadPixels();
	dither = new Dither(img);
	// });
	

	// Calculate big radius
	bigRadius = height / 3.0;

	// Create Layout GUI
	gui = createGui('Dithering');
	gui.addGlobals('bgColor', 'shape', 'label', 'factor', 'steps', 'color1', 'color2', 'color3', 'color4', 'color5', 'color6');

	gui.addButton("Dither", function() {
		dither.dither();
		draw();
	});

	// Don't loop automatically
	noLoop();
	draw();
}



function draw() {
	if(dither) {
		if(dither.ready) {
			dither.display();
			print('raj');
		} else {
			// image(img, 0, 0, windowWidth, aratio*windowWidth);
			print('raj');
		}
	}
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

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}




////DITHERING


class Dither {
	
	constructor(img) {
		this.ready = false
		this.image = img;
		this.pixels = [...img.pixels];
		// this.image.get(0,0);
		this.outcomePixels = [...this.pixels];
		print('megvagyok')
	}

	getPixel(x, y) {
		var index = x + y * img.width;
		return this.outcomePixels[index];
	}
	getRGBAPixel(x, y) {
		var index = 4 * (x + y * img.width);
		return color(this.outcomePixels[index], this.outcomePixels[index+1], this.outcomePixels[index+2], this.outcomePixels[index+3]);
	}
	setIndexPixel(x, y, c) {
		var index = x + y * img.width;
		this.outcomePixels[index] = c;
	}
	
	setIndex(x, y, quantError, errR, errG, errB) {
		if(x > this.image.width) return;
		if(y > this.image.height) return;
		
		var c = this.getRGBAPixel(x,y);
		//var c = this.image.get(x,y);
		// print(c)


		var r = red(c);
		var g = green(c);
		var b = blue(c);

		r = r + errR * quantError;
		g = g + errG * quantError;
		b = b + errB * quantError;
		
		this.setIndexPixel(x, y, color(r, g, b))

		// this.outcomeValues.set(x, y, color(r, g, b));
	}
  
	dither() {
		this.outcomePixels = [...this.pixels];

		for (var y = 0; y < this.image.height-1; y+=steps) {
			if(y%10 == 0) print(y);
			for (var x = 1; x < this.image.width-1; x+=steps) {
			  var pix = this.getRGBAPixel(x, y);
			  var oldR = red(pix);
			  var oldG = green(pix);
			  var oldB = blue(pix);
			  var newR = round(factor * oldR / 255) * (255/factor);
			  var newG = round(factor * oldG / 255) * (255/factor);
			  var newB = round(factor * oldB / 255) * (255/factor);

			  this.setIndexPixel(x, y, color(newR, newG, newB))
			//   this.outcomeValues.set(x,y, color(newR, newG, newB))
			  
		
			  var errR = oldR - newR;
			  var errG = oldG - newG;
			  var errB = oldB - newB;
		
			  var sint = int(steps);
			  this.setIndex(x+sint, y     , 7/16.0, errR, errG, errB);
			  this.setIndex(x-sint, y+sint, 3/16.0, errR, errG, errB); // 3/16
			  this.setIndex(x     , y+sint, 5/16.0, errR, errG, errB); // 5/16.0
			  this.setIndex(x+sint, y+sint, 1/16.0, errR, errG, errB);
			  

			}
		  }
		  this.ready = true;
	}
  
	display() {
		noStroke();
		fill(255);
		rect(0,0, 400, 400)
		for (var y = 0; y < this.image.height-1; y+=steps) {
			for (var x = 1; x < this.image.width-1; x+=steps) {
				fill(this.getPixel(x,y));
				rect(x,y,steps, steps);
			}
		}

		print('rajzoltam')
		this.ready = false;
	}
}


