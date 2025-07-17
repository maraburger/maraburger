let images = [];
let sounds = [];
let currentImage;
let blurAmount = 20; // Maximaler Blur-Wert
let targetBlur = 20; // Ziel-Blur-Wert
let currentBlur = 20; // Aktueller Blur-Wert
let isPlaying = false;

function preload() {
  // Lade die Bilder 01_01.png bis 01_08.png
  for (let i = 4; i <= 8; i++) {
    let filename = "bilder/04_0" + i + ".png";
    images.push(loadImage(filename));
  }

  // Lade die Sounds 01_01.wav bis 01_09.wav
  for (let i = 4; i <= 9; i++) {
    let soundname = "sounds/04_0" + i + ".wav";
    sounds.push(loadSound(soundname));
  }
}

function setup() {  
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  currentImage = images[0]; // Starte mit dem ersten geladenen Bild
}

function draw() {  
  background(220);
  
  // Prüfe ob ein Sound abgespielt wird
  isPlaying = false;
  for (let s of sounds) {
    if (s.isPlaying()) {
      isPlaying = true;
      break;
    }
  }
  
  // Setze Ziel-Blur basierend auf Sound-Status
  if (isPlaying) {
    targetBlur = 0; // Kein Blur wenn Sound spielt
  } else {
    targetBlur = blurAmount; // Voller Blur wenn kein Sound
  }
  
  // Sanfte Überblendung zum Ziel-Blur
  currentBlur = lerp(currentBlur, targetBlur, 0.1);
  
  if (currentImage) {
    // Berechne die richtige Skalierung für volle Höhe
    let imgAspectRatio = currentImage.width / currentImage.height;
    let displayHeight = height;
    let displayWidth = displayHeight * imgAspectRatio;
    
    // Falls das Bild breiter als der Bildschirm ist, passe an die Breite an
    if (displayWidth > width) {
      displayWidth = width;
      displayHeight = displayWidth / imgAspectRatio;
    }
    
    // Wende Blur-Filter an
    if (currentBlur > 0.1) {
      drawingContext.filter = `blur(${currentBlur}px)`;
    } else {
      drawingContext.filter = 'none';
    }
    
    // Zeichne das Bild mit berechneter Größe
    image(currentImage, width / 2, height / 2, displayWidth, displayHeight);
    
    // Filter zurücksetzen
    drawingContext.filter = 'none';
  }
}

function touchStarted() {  
  fullscreen(true);

  // Wähle zufälliges Bild
  let randomIndex = floor(random(images.length));
  currentImage = images[randomIndex];

  // Wähle zufälligen Sound
  let randomSoundIndex = floor(random(sounds.length));
  let selectedSound = sounds[randomSoundIndex];

  // Stoppe alle Sounds
  for (let s of sounds) {    
    s.stop();
  }
  
  // Spiele den ausgewählten Sound
  selectedSound.play();

  return false; // Verhindert Standard-Scrolling auf Mobile
}

// Optional: Fenstergröße anpassen
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}