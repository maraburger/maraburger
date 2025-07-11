let images = []

let sounds = []

let currentImage
function preload() {  // Lade deine Bilder  
    for(let i = 0; i<3; i++){
      images.push(loadImage("bilder/" + i + ".jpg"));
    }  
  // Lade deine Sounds  sounds[0] = loadSound('https://p5js.org/assets/examples/assets/doorbell.mp3')
     for(let i = 1; i<4; i++){
      sounds.push(loadSound("sounds/" + nf(i, 2) + ".wav"));
    }  
  }
function setup() {  createCanvas(640, 480)
    imageMode(CENTER)
    currentImage = images[0]
//  // Starte mit einem Bild
}
function draw() {  
  background(220)
    if (currentImage) {    
      image(currentImage, width / 2, height / 2)
    }
  }

  function touchStarted() {  // Zufälliges Bild auswählen  

    fullscreen(true);
    let randomIndex = floor(random(images.length))
    currentImage = images[randomIndex]
    // Zufälligen Sound auswählen und abspielen  
    let randomSoundIndex = floor(random(sounds.length))
    let selectedSound = sounds[randomSoundIndex]
    // Stoppe alle anderen Sounds, bevor du einen neuen abspielst  
    for (let s of sounds) {    
      s.stop()
    }  
    selectedSound.play();
    return false
//  // Verhindert Standard-Scrolling auf Mobile
}