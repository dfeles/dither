class Dither {
	constructor(img) {
		this.image = img;
		this.x = random(width);
		this.y = random(height);
		this.diameter = random(10, 30);
		this.speed = 1;
	}
  
	dither() {
		print(this.image.width);
	}
  
	display() {
	  ellipse(this.x, this.y, this.diameter, this.diameter);
	}
  }