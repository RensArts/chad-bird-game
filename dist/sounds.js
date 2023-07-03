// Create Audio objects for each sound
const buttonSound = new Audio("assets/button-sound.mp3");
const startSound = new Audio("assets/start-sound.mp3")

// Pause the music when the document becomes hidden
document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    backgroundMusic.pause();
  }
});

  function playStarSound(){
    starSound.play();
  }
  
  function playGhostSound(){
    ghostSound.play();
  }
  
  function playSizeSound(){
    sizeSound.play();
  }

  function playReduceGapSound(){
    reduceGapSound.play();
  }

  function playLevelSound(){
    levelSound.play();
  }

  // Function to play a coin sound
function playCoinSound() {
  // Find an available coin sound
  if (isSfxOn)
  var coinSound = coinSounds.find(function(sound) {
    return sound.paused || sound.ended;
  });

  // If all sounds are in use, create a new one
  if (!coinSound) {
    coinSound = new Audio("assets/coin-sound.mp3");
    coinSounds.push(coinSound);
    if (isInvincible && flapSound.volume == 0){
      coinSound.volume = 0;
    }
  }
  coinSound.play();
}

function initializeFlapSounds() {
  for (var i = 0; i < 5; i++) {
    flapSounds.push(flapSound);
  }
}

function initializeCoinSounds() {
  for (var i = 0; i < 5; i++) {
    coinSounds.push(coinSound);
  }
}

// Function to play a flap sound
function playFlapSound() {
  // Find an available flap sound
  var flapSound = flapSounds.find(function(sound) {
    return sound.paused || sound.ended;
  });

  // If all sounds are in use, create a new one
  if (!flapSound) {
    flapSound = new Audio("assets/flap.mp3");
    flapSounds.push(flapSound);
  }
  
  // Play the flap sound
  flapSound.play();
}

function playDeathSound() {
  if (isGameOver) {
    deathSound.play();
  }
}

  

  