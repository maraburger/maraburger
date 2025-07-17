let images = [];
let sounds = [];
let currentImage;

function preload() {  
  // Lade Bilder (du kannst weitere Bilder hinzufügen, falls gewünscht)
  images.push(loadImage("bilder/01.png"));  

  // Lade Sounds
  for (let i = 1; i < 4; i++) {
    sounds.push(loadSound("sounds/" + nf(i, 2) + ".wav"));
  }
}

function setup() {  
  createCanvas(windowWidth, windowHeight); // Vollflächig
  imageMode(CENTER);
  currentImage = images[0]; // Startbild
}

function draw() {  
  background(0); // oder 220 für hell

  if (currentImage) {    
    // Berechne Skalierung ohne Verzerrung (Contain)
    let imgAspect = currentImage.width / currentImage.height;
    let canvasAspect = width / height;
    let w, h;

    if (canvasAspect > imgAspect) {
      // Canvas ist breiter: Höhe auf Canvas-Höhe setzen
      h = height;
      w = imgAspect * h;
    } else {
      // Canvas ist schmaler: Breite auf Canvas-Breite setzen
      w = width;
      h = w / imgAspect;
    }

    image(currentImage, width / 2, height / 2, w, h);
  }
}

function touchStarted() {  
  // Optional: fullscreen erst auf Touch aktivieren
  if (!fullscreen()) {
    fullscreen(true);
  }

  // Zufälliges Bild laden (falls du mehrere hinzufügen willst)
  let randomIndex = floor(random(images.length));
  currentImage = images[randomIndex];

  // Zufälligen Sound abspielen
  let randomSoundIndex = floor(random(sounds.length));
  let selectedSound = sounds[randomSoundIndex];

  // Alle Sounds stoppen, dann neuen abspielen
  for (let s of sounds) {    
    s.stop();
  }
  selectedSound.play();

  return false; // Verhindert Standard-Scrolling
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
