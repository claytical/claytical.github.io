var logo;
var system;
var particleColor;
var can;
var currentPixel = 0;
var pixelDirection = 1;

function preload() {
	logo = loadImage("images/claytical-logo.jpg");
}

function setup() {
  // uncomment this line to make the canvas the full size of the window
   	can = createCanvas(logo.width, logo.height);
   	can.parent('logo-canvas');
	system = new ParticleSystem(createVector(width/2, height/2));
//	particleColor = color("#E94648");
	particleColor = color("#334350");
//	particleColor.rgba[3] = 50;
	logo.loadPixels();
	noStroke();
  	for (var x = 0; x < logo.width; x+=1) {
  		for (var y = 0; y < logo.height; y+=2) {

	  		var p = logo.get(x,y);
			if (p[0] == 0 && p[1] == 0 && p[2] == 0) {
				system.addParticle(x,y);

			}
		}
  }

  system.reset(100000);
  
}

function draw() {
  	// draw stuff here
  	background(255);
  	system.run();
	if (frameCount%2000 == 0) {
		system.reset(random(system.particles.length));
	}
	if (currentPixel < -100) {
		pixelDirection = 1;
	}
	if (currentPixel > system.particles.length+100) {
		pixelDirection = -1;
	}
	currentPixel+=pixelDirection;

}


// A simple Particle class
var Particle = function(position) {
  	this.acceleration = createVector(0, 0.05);
	this.speed = random(.1, .3);
	this.resizing = 1;
	this.radius = random(1,5);
	this.color = color("#334350");
	this.position = position.copy();
	this.originalPosition = position.copy();
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
	if (int(dist(mouseX, mouseY, this.position.x, this.position.y)) > 3) {
		this.position.x += (this.originalPosition.x - this.position.x) * this.speed;
		this.position.y += (this.originalPosition.y - this.position.y) * this.speed;
	}
	else {
		this.position.x = mouseX;
		this.position.y = mouseY;
	}
	
	this.radius = this.radius + (this.resizing *.01);

	if (this.radius > 5) {
		this.resizing = -1;
	}
	if (this.radius < 2) {
		this.resizing = 1;
	}
	
  //this.velocity.add(this.acceleration);
  //this.position.add(this.velocity);
  //this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(255, 60);
  strokeWeight(1);
//  noStroke();
  fill(this.color);
  ellipse(this.position.x, this.position.y, this.radius, this.radius);
};



var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(xPos, yPos) {
	var pos = createVector(xPos, yPos);
  	this.particles.push(new Particle(pos));
};

ParticleSystem.prototype.reset = function(amount) {
	var startPixel = parseInt(random(this.particles.length));
	console.log(startPixel);
	if (amount >= this.particles.length) {
		startPixel = 0;	
		amount = this.particles.length;
	}

	if (startPixel + amount > this.particles.length) {
		amount = this.particles.length - startPixel;
	}	

	for (var i = startPixel; i < startPixel + amount; i++) {
		var p = this.particles[i];
		p.position.x = random(0, width);
		p.position.y = random(0, height);
		p.radius = random(1,3);
	}
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    if (currentPixel > i) {
    	p.color = color("#334350");
    }
    else {
		p.color = color("#E94648");
    } 
    p.run();
  }
/*
  if (currentPixel > 50) {
  	currentPixel = 0;
  }
  */
};