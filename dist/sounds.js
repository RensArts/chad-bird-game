// Create Audio objects for each sound
const buttonSound = new Audio("assets/button-sound.mp3");
const startSound = new Audio("assets/start-sound.mp3")


  
  function playStarSound(){
    var starSound = document.getElementById("starSound")
    starSound.play();
  }
  
  function playGhostSound(){
    var ghostSound = document.getElementById("ghostSound")
    ghostSound.play();
  }
  
  function playSizeSound(){
    var sizeSound = document.getElementById("sizeSound")
    sizeSound.play();
  }

  function playReduceGapSound(){
    var reduceGapSound = document.getElementById("reduceGapSound")
    reduceGapSound.play();
  }

  // Function to play a coin sound
function playCoinSound() {
  // Find an available coin sound
  var coinSound = coinSounds.find(function(sound) {
    return sound.paused || sound.ended;
  });

  // If all sounds are in use, create a new one
  if (!coinSound) {
    coinSound = new Audio("assets/coin-sound.mp3");
    coinSounds.push(coinSound);
  }

  coinSound.play();
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
    var deathSound = document.getElementById("deathSound");
    deathSound.play();
  }
}

  

  