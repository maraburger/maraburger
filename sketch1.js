let images = [];
let sounds = [];
let currentImage;

function preload() {
  for (let i = 1; i <= 8; i++) {
    let filename = "bilder/01_" + nf(i, 2) + ".png";
    images.push(loadImage(filename));

  // Lade deine Sounds
  for (let i = 1; i < 4; i++) {
    sounds.push(loadSound("sounds/" + nf(i, 2) + ".wav"));
  }
}

function setup() {  
  createCanvas(640, 480);
  imageMode(CENTER);
  currentImage = images[0]; // Starte mit dem geladenen Bild
}

function draw() {  
  background(220);
  if (currentImage) {    
    image(currentImage, width / 2, height / 2);
  }
}

function touchStarted() {  
  fullscreen(true);

  let randomIndex = floor(random(images.length));
  currentImage = images[randomIndex];

  let randomSoundIndex = floor(random(sounds.length));
  let selectedSound = sounds[randomSoundIndex];

  for (let s of sounds) {    
    s.stop();
  }
  selectedSound.play();

  return false; // Verhindert Standard-Scrolling auf Mobile
}
