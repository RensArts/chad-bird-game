
// Constants
const PIPE_PASSED = 200; // distance through pipe before counting as point
const PIPE_WIDTH = 80; // Adjust this value to control the width of the spawn pipes
const PIPE_COLOR_TOP = "#000000"; //Adjust the color of the top pipe
const PIPE_COLOR_BOTTOM = "#00000"; //Adjust the color of the bottom pipe
const HITBOX_RIGHT = -40; // Adjust the right side hitbox of the bird
const HITBOX_TOP = -60; // Adjust the top side hitbox of the bird
const HITBOX_BOTTOM = 0; // Adjust the bottom side hitbox of the bird
const HITBOX_LEFT = 140; // Adjust the left side hitbox of the bird
const COIN_HITBOX = 50; // Adjust the radius for collecting coins
const COIN_SIZE = 2.5; // Adjust the size of the coin
const COIN_SPEED = 2.5; // Adjust the speed of the coin
const STAR_SPEED = 3; // Adjust the speed of the stars
const countDown = 2950; // time before game starts in ms
let selectedButton = null;
let coinIntervalId;
let powerUpCoinIntervalId;
let starIntervalId;
let ghostIntervalId;

// Set up event listeners
document.addEventListener("mouseup", moveDown);
document.getElementById("startButton").addEventListener("mousedown", moveUp);
window.addEventListener("resize", resizeVideo); // Call resizeVideo on window resize event

//Arrays
var flapSounds = [];
var coins = [];
var pipes = [];
var stars = [];
var ghosts = [];

// Variables
var PIPE_SPEED = 2; //Adjust the speed of the pipes
var skyboxSpeed = 1; // Adjust the speed of the skybox
var difficulty = "normal"; // Default difficulty level
var GROUND_SPEED = 2.1; // Adjust the speed of the ground and ceiling
var JUMP = 1.2; // Adjust the value of upward momentum
var GRAVITY = 0.9; // Adjust this value to control the downward speed of the bird
var PIPE_GAP = 320; // Adjust this value to control the gap of the spawn pipes
var score = 0; // Variable to keep track of the score
var collectedCoins = 0; // Variable to keep track of collected coins
var matchCoins = 0; // Variable to keep track of coins collected in single match
var groundSpeed = 0; // Track the speed of the ground movement
var AMOUNT_OF_COINS = 3000; // Adjust the amount of coins spawned
var minStarSpawn = 3000; // Minimum spawn rate in milliseconds (20 seconds)
var maxStarSpawn = 14000; // Maximum spawn rate in milliseconds (40 seconds)
var minGhostSpawn = 3000; // Minimum spawn rate in milliseconds (20 seconds)
var maxGhostSpawn = 14000; // Maximum spawn rate in milliseconds (40 seconds)
var starSpeedMultiplier = 1; // Initial speed multiplier
var ghostSpeedMultiplier = 1;
var isInvincible = false; // Initial invincibility state
var isGhost = false; // Initial ghost state
var starPowerUpDuration = 3000; // Duration of power-ups in milliseconds 
var ghostPowerUpDuration = 4000;  // Duration of power-ups in milliseconds
var starPowerUpEndTime = 0; // Time when the current power-up will end
var ghostPowerUpEndTime = 0; // Time when the current power-up will end
var powerUpCoinSpawnRate = 250; // Spawn rate of coins during power-up (in milliseconds)
var pipeStartSkip = 24; // amount of pipes that won't be rendered at the start (2 = 1 pipe)

var isMusicOn = true; // Initial state of the background music
var isSfxOn = true; // Initial state of the SFX

// adds a pipe based on elapsed frames per 0.1 seconds (in update)
var frameCounter = 0; // set counter for pipe update interval
var framesPerPipe = 0; // set default value for pipe update interval 1ps/75fps
var minFramesPerPipe = 0.1; // set minimum spawn time for the pipes 200ms/30fps
var pipeSpawnRate = 0.3; // set spawn rate for the pipes (higher = more pipes)
var minimumFpsValue = 3; // if framerate drops below 30fps, it will register as 30fps
var pipeSpawnNormal = 0.28; // set this value if changing the pipespawnrate of hard difficulty in function
var pipeSpawnHard = 0.42; // set this value if changing the pipe spawn rate of normal difficulty in function

// to adjust game speed based on frames per 0.1 seconds (in update)
var speed = 8; // Variable to increment speed in function Update();
var speedNormal = 8; // set this value if changing the speed of normal difficulty in function
var speedHard = 10; // set this value if changing the speed of hard difficulty in function
var frameCount = 0; // set counter for game speed update interval
var fps = 0; // set default value for game speed update interval
var lastTime = performance.now(); // counts frames in update
var elapsedTime = 0; // set counter for game speed update interval

// Get the game canvas and its 2D rendering context
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Initialize game state variables
var isMovingUp = false; // Track if bird is moving up
var isGameOver = false; // Track if the game is over

// Get the logo element
var logo = document.getElementById("logo");

// Track the game start state and score
var isGameStarted = false;
var score = 0;

// Get the equipped skin from local storage
var equippedSkin = localStorage.getItem("equippedSkin");

// Default skin paths
var birdUpImg = new Image();
birdUpImg.src = "assets/birdUp.png";
var birdDownImg = new Image();
birdDownImg.src = "assets/birdDown.png";

// Check if there is an equipped skin
if (equippedSkin) {
  // Update the birdUp and birdDown paths with the equipped skin path
  switch (equippedSkin) {
    case "Default":
      birdUpImg.src = "assets/birdUp.png";
      birdDownImg.src = "assets/birdDown.png";
      break;
    case "Sunglasses":
      birdUpImg.src = "assets/storeAssets/birdUpSunglasses.png";
      birdDownImg.src = "assets/storeAssets/birdDownSunglasses.png";
      break;
    case "Baseball Cap":
      birdUpImg.src = "assets/storeAssets/birdUpCap.png";
      birdDownImg.src = "assets/storeAssets/birdDownCap.png";
      break;
    case "Sir":
      birdUpImg.src = "assets/storeAssets/birdUpSir.png";
      birdDownImg.src = "assets/storeAssets/birdDownSir.png";
    break;
    case "Viking":
      birdUpImg.src = "assets/storeAssets/birdUpViking.png";
      birdDownImg.src = "assets/storeAssets/birdDownViking.png";
      break;
    case "Ninja":
      birdUpImg.src = "assets/storeAssets/birdUpNinja.png";
      birdDownImg.src = "assets/storeAssets/birdDownNinja.png";
      break;
    case "Rasta":
      birdUpImg.src = "assets/storeAssets/birdUpRasta.png";
      birdDownImg.src = "assets/storeAssets/birdDownRasta.png";
    break;
    case "Baller":
      birdUpImg.src = "assets/storeAssets/birdUpBaller.png";
      birdDownImg.src = "assets/storeAssets/birdDownBaller.png";
    break;
    default:
      // Use default paths if the equipped s kin is not recognized
      birdUpImg.src = "assets/birdUp.png";
      birdDownImg.src = "assets/birdDown.png";
      break;
  }
}

// Create an image object for key up picture
var arrowUpLogo = new Image();
arrowUpLogo.src = "assets/arrowUpLogo.png";

// Create an image object for border around scores
var borderBox = new Image();
borderBox.src = "assets/borderBox.png";

// Define the bird object (for hitbox)
var bird = {
  x: 700,
  y: 400,
  width: 250,
  height: 250,
};

// Define the bird going up object
var birdUp = {
  x: 700,
  y: 400,
  width: 250,
  height: 250,
};

// Define the bird going down object
var birdDown = {
  x: 700,
  y: 400,
  width: 250,
  height: 250,
};

// Define the ground object
var ground = {
  x: 0,
  y: canvas.height - 100, // Adjust the y-coordinate according to your game's ground position
  width: canvas.width,
  height: 100, // Adjust the height of the ground as needed
  speed: 0, // Adjust the speed of the ground movement
};

// Define the ceiling object
var ceiling = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: 100, // Adjust the height of the ceiling as needed
  speed: 0, // Adjust the speed of the ceiling movement
};

// Create Audio objects for each sound
const buttonSound = new Audio("assets/button-sound.mp3");
const startSound = new Audio("assets/start-sound.mp3")

// Add event listeners to your buttons and play corresponding audio on click
document.getElementById('normalButton').addEventListener('click', function() {
  buttonSound.play();
});

document.getElementById('hardButton').addEventListener('click', function() {
  buttonSound.play();
});

// Define button to go to store
var storeButton = document.createElement("button");
storeButton.textContent = "Store";
storeButton.addEventListener("click", goToStore);
storeButton.id = "storeButton";
document.body.appendChild(storeButton);

function goToStore() {
  window.location.href = "store.html";
}

// Get the selected difficulty from localStorage
function getDifficulty() {
  return localStorage.getItem('selectedDifficulty');
}

function setDifficulty(selectedDifficulty) {
  localStorage.setItem('selectedDifficulty', difficulty);
  difficulty = selectedDifficulty;
  
  // Clear the existing coin interval
  clearInterval(coinIntervalId);

  // Remove the selected class from the previously selected button
  if (selectedButton) {
    selectedButton.classList.remove('selected');
  }

  // Adjust the game constants based on the selected difficulty level
  switch (selectedDifficulty) {
    case "normal":
      speed = speedNormal;
      pipeSpawnRate = pipeSpawnNormal
      AMOUNT_OF_COINS = 3000; // Set the appropriate value for normal difficulty
      coinIntervalId = setInterval(addCoin, AMOUNT_OF_COINS);
      selectedButton = document.getElementById('normalButton');
      break;
    case "hard":
      speed = speedHard;
      pipeSpawnRate = pipeSpawnHard;
      AMOUNT_OF_COINS = 1500; // Set the appropriate value for hard difficulty
      coinIntervalId = setInterval(addCoin, AMOUNT_OF_COINS);
      selectedButton = document.getElementById('hardButton');
      break;
    // Add additional cases for other difficulty levels if desired
  }

  // Add the selected class to the newly selected button
  selectedButton.classList.add('selected');
}


var coinSounds = []; // Array to store coin sound instances

// Function to initialize the coin sounds
function initializeCoinSounds() {
  for (var i = 0; i < 5; i++) {
    var coinSound = new Audio("assets/coin-sound.mp3");
    coinSounds.push(coinSound);
  }
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

// Play the star sound
function playStarSound(){
  var starSound = document.getElementById("starSound")
  starSound.play();
}

// Play the star sound
function playGhostSound(){
  var ghostSound = document.getElementById("ghostSound")
  ghostSound.play();
}

// Generate a random spawn rate between minSpawnRate and maxSpawnRate
function generateStarSpawnRate() {
  return Math.random() * (maxStarSpawn - minStarSpawn) + minStarSpawn;
}
// Generate a random spawn rate between minSpawnRate and maxSpawnRate
function generateGhostSpawnRate() {
  return Math.random() * (maxGhostSpawn - minGhostSpawn) + minGhostSpawn;
}

// Start the initial star interval with a random spawn rate
starIntervalId = setInterval(addStar, generateStarSpawnRate());
ghostIntervalId = setInterval (addGhost, generateGhostSpawnRate());
coinIntervalId = setInterval(addCoin, AMOUNT_OF_COINS);


//Determines the coins spawning location
function addCoin() {
  var coin = {
    x: canvas.width, // Spawn the coin at the right edge of the canvas
    y: getRandomInt(450, canvas.height - 450), // Randomize the coin's y-coordinate
    radius: 40, // Adjust the size of the coin as needed
  };
  coins.push(coin);
}

//Determines the star spawning location
function addStar() {
  var star = {
    x: canvas.width, // Spawn the coin at the right edge of the canvas
    y: getRandomInt(450, canvas.height - 450), // Randomize the coin's y-coordinate
    radius: 40, // Adjust the size of the coin as needed
  };
  stars.push(star);
}

//Determines the star spawning location
function addGhost() {
  var ghost = {
    x: canvas.width, // Spawn the coin at the right edge of the canvas
    y: getRandomInt(450, canvas.height - 450), // Randomize the coin's y-coordinate
    radius: 40, // Adjust the size of the coin as needed
  };
  ghosts.push(ghost);
}

// Updates the coin spawning, coin collecting and hitbox
function updateCoins() {
  for (var i = 2; i < coins.length; i++) {
    var coin = coins[i];
    coin.x -= PIPE_SPEED * (speed + COIN_SPEED); // Move the coin with the pipes

    // Draw the coin image
    var coinImage = document.getElementById("coinImage"); // Get the coin image element
    ctx.drawImage(coinImage, coin.x - coin.radius, coin.y - coin.radius, coin.radius * COIN_SIZE, coin.radius * COIN_SIZE);
    // Check if the bird collects the coin
    if (bird.x + COIN_HITBOX + bird.width > coin.x - coin.radius &&
        bird.x < COIN_HITBOX + coin.x + coin.radius &&
        bird.y + COIN_HITBOX + bird.height > coin.y - coin.radius &&
        bird.y < COIN_HITBOX + coin.y + coin.radius) {
      coins.splice(i, 1); // Remove the collected coin from the array
      matchCoins++; // Increment the coins match score
      collectedCoins++; // Increment the total coins score
      playCoinSound();
      saveCollectedCoins(collectedCoins);
    }
  }
}

// Updates the star spawning, star collecting and hitbox
function updateStars() {
  for (var i = 1; i < stars.length; i++) {
    var star = stars[i];
    star.x -= PIPE_SPEED * (speed + STAR_SPEED); // Move the coin with the pipes

    // Draw the coin image
    var starImage = document.getElementById("starImage"); // Get the coin image element
    ctx.drawImage(starImage, star.x - star.radius, star.y - star.radius, star.radius * COIN_SIZE, star.radius * COIN_SIZE);

    // Check if the bird collects the coin
    if (bird.x + COIN_HITBOX + bird.width > star.x - star.radius &&
        bird.x < COIN_HITBOX + star.x + star.radius &&
        bird.y + COIN_HITBOX + bird.height > star.y - star.radius &&
        bird.y < COIN_HITBOX + star.y + star.radius) {
      stars.splice(i, 1); // Remove the collected coin from the array
      // Apply power-up effects
      isInvincible = true;
      starPowerUpEndTime = Date.now() + starPowerUpDuration;
      starSpeedMultiplier = 1.15;
      clearInterval(powerUpCoinIntervalId); // Clear the current coin interval
      powerUpCoinIntervalId = setInterval(addCoin, powerUpCoinSpawnRate); // Set a new coin interval with power-up spawn rate
      // Set a new star interval with a random spawn rate
      clearInterval(starIntervalId); // Clear the current star interval
      starIntervalId = setInterval(addStar, generateStarSpawnRate());
      //play the star sound
      starSound.play();
      }
  }
}

// Updates the star spawning, star collecting and hitbox
function updateGhosts() {
  for (var i = 1; i < ghosts.length; i++) {
    var ghost = ghosts[i];
    ghost.x -= PIPE_SPEED * (speed + STAR_SPEED); // Move the coin with the pipes

    // Draw the coin image
    var ghostImage = document.getElementById("ghostImage"); // Get the coin image element
    ctx.drawImage(ghostImage, ghost.x - ghost.radius, ghost.y - ghost.radius, ghost.radius * COIN_SIZE, ghost.radius * COIN_SIZE);

    // Check if the bird collects the coin
    if (bird.x + COIN_HITBOX + bird.width > ghost.x - ghost.radius &&
        bird.x < COIN_HITBOX + ghost.x + ghost.radius &&
        bird.y + COIN_HITBOX + bird.height > ghost.y - ghost.radius &&
        bird.y < COIN_HITBOX + ghost.y + ghost.radius) {
      ghosts.splice(i, 1); // Remove the collected coin from the array
      isGhost = true;
      ghostSpeedMultiplier = 1.1;
      ghostPowerUpEndTime = Date.now() + ghostPowerUpDuration;
      // Apply power-up effects
      ghostSound.play();
      clearInterval(ghostIntervalId);
      ghostIntervalId = setInterval (addGhost, generateGhostSpawnRate());
      }
  }
}


// Preload the image
var image = new Image();
image.src = "assets/coin-box.png"; // Replace with the path to your image


// Check if the image is already loaded
if (image.complete) {
  // The image is already loaded, call drawCollectedCoins immediately
  drawCollectedCoins();
} else {
  // Wait for the image to load
  image.addEventListener("load", function() {
    drawCollectedCoins();
  });
}

// Draw score and image on the top of the screen
function drawCollectedCoins() {
  ctx.fillStyle = "orange";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.font = "bolder 60px Arial";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";

  var savedCoins = localStorage.getItem("coins");
  if (savedCoins) {
    collectedCoins = parseInt(savedCoins); // Update the collectedCoins variable with the saved value
  }

  // Draw image
  ctx.drawImage(image, canvas.width - 2560, 0, 260, 120); // Adjust the position and size of the image as needed
  ctx.fillText(collectedCoins, canvas.width - 2395, 59);
  ctx.strokeText(collectedCoins, canvas.width - 2395, 59);
  ctx.fillText("x", canvas.width - 2435, 55);
  ctx.strokeText("x", canvas.width - 2435, 55);
}

// Saves the collected coins to local storage
function saveCollectedCoins(collectedCoins) {
  localStorage.setItem("coins", collectedCoins)
}

// Draw the FPS on the top-right corner of the screen
function drawFPS() {
  var text = "FPS: " + fps * 10; // Create the FPS text string

  ctx.font = "bold 24px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText(text, canvas.width - 10, 10);
}

// Draw score on the top of the screen
function drawScore() {
  if (isGameOver) {
    return;
  }
  var text = score.toString(); // Convert the score to a string

  ctx.font = "bolder 150px Arial";
  ctx.textAlign = "end";
  ctx.textBaseline = "middle";
  
  // Set the stroke style (black border)
  ctx.strokeStyle = "black";
  ctx.lineWidth = 15;
  ctx.strokeText(text, canvas.width - 1220, 90);
  
  // Set the fill style (white text)
  ctx.fillStyle = "white";
  ctx.fillText(text, canvas.width - 1220, 90);
}

// Checks if bird passes pipe and adds score
function checkScore() {
  if (isGameOver) {
    return;
  }
  // Check if bird has passed a pipe
  for (var i = 0; i < pipes.length; i++) {
    var p = pipes[i];
    if (!p.passed && bird.x + PIPE_PASSED > p.x + p.width) {
      p.passed = true;
      score += 0.5; // Increment the score by 0.5
    }
  }
}

/**
 * Saves the highscore to the local storage.
 * @param {number} score - The score to be saved as the highscore.
 */
function saveHighscore(score, difficulty) {
  localStorage.setItem(`highscore_${difficulty}`, score);
}

// Creates the button to turn the music on or off
function createMusicButton() {
  var button = document.createElement("button");
  button.id = "musicButton";
  button.style.backgroundImage = "url('assets/musicButton.png')";
  button.style.backgroundSize = "cover";
  button.style.width = "80px";
  button.style.height = "80px";
  
  // Add event listener to handle button click
  button.addEventListener("click", function() {
    buttonSound.play();
    if (isMusicOn) {
      // Pause the background music
      backgroundMusic.volume = 0;
      isMusicOn = false;
      button.style.backgroundImage = "url('assets/musicOffButton.png')";
    } else {
      // Resume playing the background music
      backgroundMusic.volume = 1;
      isMusicOn = true;
      button.style.backgroundImage = "url('assets/musicButton.png')";
    }
    if (clickHandler) {
      clickHandler();
    }
    });
  
  // Append the button to the body element
  document.body.appendChild(button);
};

// Creates the button to turn the sound effects on or off
function createSfxButton() {
  var button = document.createElement("button");
  button.id = "sfxButton";
  button.style.backgroundImage = "url('assets/sfxButton.png')";
  button.style.backgroundSize = "cover";
  button.style.width = "80px";
  button.style.height = "80px";

  // Add event listener to handle button click
  button.addEventListener("click", function() {
    initializeFlapSounds();
    initializeCoinSounds();
    if (isSfxOn) {
      // Disable the SFX
      isSfxOn = false;
      button.style.backgroundImage = "url('assets/sfxOffButton.png')";
      for (var i = 0; i < flapSounds.length; i++) {
        flapSounds[i].volume = 0;
      }
      for (var i = 0; i < coinSounds.length; i++) {
        coinSounds[i].volume = 0;
      }
      for (var i = 0; i < coinSounds.length; i++) {
        coinSounds[i].volume = 0;
      }
      deathSound.volume = 0;
      startSound.volume = 0;
      starSound.volume = 0;
      buttonSound.volume = 0;
      ghostSound.volume = 0;
    } else {
      // Enable the SFX
      isSfxOn = true;
      button.style.backgroundImage = "url('assets/sfxButton.png')";
      for (var i = 0; i < flapSounds.length; i++) {
        flapSounds[i].volume = 1;
      }
      for (var i = 0; i < coinSounds.length; i++) {
        coinSounds[i].volume = 1;
      }
      for (var i = 0; i < coinSounds.length; i++) {
        coinSounds[i].volume = 1;
      }
      deathSound.volume = 1;
      startSound.volume = 1;
      starSound.volume = 1;
      buttonSound.volume = 1;
      ghostSound.volume = 1;
    }
  });
  // Append the button to the body element
  document.body.appendChild(button);
};

// Function to initialize the flap sounds
function initializeFlapSounds() {
  for (var i = 0; i < 5; i++) {
    var flapSound = new Audio("assets/flap.mp3");
    flapSounds.push(flapSound);
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

function getRandomInt(min, max) {
  const range = max - min + 1;
  const random = Math.random();

  // Generate random numbers using Math.random() multiple times
  const random1 = Math.floor(random * range);
  const random2 = Math.floor(random * range);
  const random3 = Math.floor(random * range);

  // Combine the random numbers to introduce more randomness
  const combinedRandom = (random1 + random2 + random3) / 3;

  // Return the final random integer within the specified range
  return Math.floor(combinedRandom) + min;
}

/**
 * Adds a new pair of pipes and the coins to the game.
 */
function addPipe() {
  var gapPosition = getRandomInt(100, canvas.height - PIPE_GAP - 400);
  var gapSize = 500; // Consistent gap size

  pipes.push({
    x: canvas.width,
    y: 0,
    width: PIPE_WIDTH,
    height: gapPosition + 100,
    top: true,
    passed: false,
  });

  pipes.push({
    x: canvas.width,
    y: gapPosition + gapSize,
    width: PIPE_WIDTH,
    height: canvas.height - (gapPosition + gapSize - 200),
    top: false,
    passed: false,
  });

  groundSpeed = GROUND_SPEED * speed;
}

var pipeImage = new Image();
pipeImage.src = 'assets/pipeTexture.png';

// Draws the pipes on the canvas and moves them
function updatePipes() {
   // Move all existing pipes from right to left on every frame
  for (var i = pipeStartSkip; i < pipes.length; i++) {
    var p = pipes[i];
    p.x -= PIPE_SPEED * speed; // Pipe movement speed
    
    // Draw top pipe
    ctx.fillStyle = PIPE_COLOR_TOP; 
    ctx.fillRect(p.x, p.y, p.width, p.height);

    // Draw bottom pipe
    ctx.fillStyle = PIPE_COLOR_BOTTOM; 
    var bottomPipeHeight = canvas.height - (p.height + PIPE_GAP);
    ctx.fillRect(p.x, p.height + PIPE_GAP, p.width, bottomPipeHeight);
    
    // Render picture on top of the pipes
    var imageWidth = p.width + 300; // Adjust the image width as desired
    var imageHeight = p.height + 170; // Adjust the image height as desired
    ctx.drawImage(pipeImage, p.x - 150, p.y - 130, imageWidth, imageHeight);
  }
}
//p.x - 150

function drawReadyMessage() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 6;
  ctx.font = "bolder 160px Arial";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.fillText("READY", canvas.width / 2 - 260, canvas.height / 2 - 200);
  ctx.strokeText("READY", canvas.width / 2 - 260, canvas.height / 2 - 200);
  
}

function drawGoMessage() {
  if (!isGameOver){
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 6;
  ctx.font = "bolder 220px Arial";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.fillText("GO", canvas.width / 2 - 155, canvas.height / 2 - 200);
  ctx.strokeText("GO", canvas.width / 2 - 155, canvas.height / 2 - 200);
  }
}

var enableVerticalMovement = false;

// Handles the gravity of the bird.
function handleVerticalMovement() {
  if (!enableVerticalMovement) {
    // Bird cannot move vertically yet, wait for the timeout to expire
    return;
  }

  if (isMovingUp && bird.y > 0) {
    bird.y -= JUMP * speed;
    birdUp.y = bird.y; // Update birdUp's position
  } else {
    bird.y += GRAVITY * speed;
    birdDown.y = bird.y; // Update birdDown's position
  }
}

// Call this function to enable vertical movement after a timeout
function enableVerticalMovementAfterTimeout() {
  enableVerticalMovement = true;
}

// Call this function when you want to start the timeout
function startVerticalMovementTimeout() {
  enableVerticalMovement = false; // Disable vertical movement initially
  setTimeout(enableVerticalMovementAfterTimeout, countDown); // Enable vertical movement after 1 second
}

// Function to move the bird up when a key is pressed
function moveUp(event) {
  if (isGameOver) {
    return;
  }
  if (event.type === "mousedown") {
    isMovingUp = true;
    if (!isGameStarted) {
      isGameStarted = true;
      startVerticalMovementTimeout();
      buttonSound.play();
      startSound.play();
      startGame();
      pipes = [];
      isGhost = false;
      isInvincible = false;
      document.addEventListener("mousedown", moveUp);
      }
    }

    // Check if the game is in progress and pipes are actively moving
    if (isGameStarted && pipes.length > 0 && speed > 0 && enableVerticalMovement) {
      // Play the flap sound
      playFlapSound();
      document.getElementById("backgroundMusic").play();
    }
  }

// Function to move the bird down when the key is released
function moveDown(event) {
  if (event.type === "mouseup") { // Customize the key according to your needs
    isMovingUp = false;
  }
}

/**
 * Starts the game by resetting necessary variables and game state.
 */
function startGame() {
  isGameOver = false;
  bird.y = 400; // Reset the bird's position
  pipes = []; // Clear the pipes array
  coins = []; // Clear the coins array
  stars = []; // Clear the stars array
  score = 0; // Reset the score
  // Hide the logo
  logo.style.display = "none";
  // Display "ready?" message for the first second
  requestAnimationFrame(update);
}

/**
 * Restarts the game when the Enter key is pressed.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
function restartGame(event) {
  if (event.type === "mousedown") {
    // Remove the event listener
    document.removeEventListener("mousedown", restartGame);

    // Reset game variables and state
    isMovingUp = false;
    isGameOver = false;
    isGameStarted = false;
    score = 0;
    matchCoins = 0;
    bird.y = 400;
    bird.x = 700;
    birdUp.y = 400;
    birdUp.x = 700;
    birdDown.y = 400;
    birdDown.x = 700;
    pipes = [];
    coins = [];
    ghosts = [];
    GRAVITY = 0.9;
    PIPE_SPEED = 2;
    GROUND_SPEED = 2.1;
    skyboxSpeed  = 1;
    JUMP = 1.2;
    pipeStartSkip = 24;
  
    // Start the game
    startGame();
  }
}

let isBirdFalling = true;

// Draw the animated bird based on up or down position
function drawDeathAnimation() {
  let birdImage = isBirdFalling ? birdUpImg : birdDownImg;
  ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
}

// Function to switch between the two bird images
function switchDeathAnimationImages() {
  isBirdFalling = !isBirdFalling;
}

// Call switchDeathAnimationImages function every 150 milliseconds
setInterval(switchDeathAnimationImages, 100);

/**
 * Checks collision between the bird and pipes.
 * @returns {boolean} True if collision detected, false otherwise.
 */
function checkCollision() {
  if (isGameOver) {
    return false; // No collision when the game is over
  }
  if (isGhost) {
    return false; // No collision when being a ghost
  }
  for (var i = 0; i < pipes.length; i++) {
    var p = pipes[i];
    // Check if bird overlaps horizontally with current pipe
    if (bird.x + HITBOX_RIGHT + bird.width > p.x && bird.x + HITBOX_LEFT < p.x + p.width) {
      // Check if bird overlaps vertically with top or bottom pipe
      if (bird.y < p.y + HITBOX_TOP + p.height && bird.y + HITBOX_BOTTOM + bird.height > p.y) {
        GRAVITY = 1.6;
        PIPE_SPEED = 0.5;
        GROUND_SPEED = 0.55;
        skyboxSpeed = 0.25;
        JUMP = -1.6;
        isBirdFalling = true;
        return true; // Collision detected
      }
    }
  }
  return false; // No collision detected
}

/**
 * Resizes the video element to match the canvas size and sets the video source.
 */
function resizeVideo() {
  const video = document.getElementById("gameVideo");
  const canvas = document.getElementById("gameCanvas");
  video.style.width = canvas.clientWidth + "px";
  video.style.height = canvas.clientHeight + "px";
  video.src = "assets/hell.mp4";
}

var drawTimeout = null;

// Draws ground and ceiling
function drawSpikes() {
// Draw the ceiling image
ctx.drawImage(ceilingImg, ceiling.x, ceiling.y, ceiling.width, ceiling.height);
ctx.drawImage(ceilingImg, ceiling.x + ceiling.width, ceiling.y, ceiling.width, ceiling.height);

// Draw the ground image
ctx.drawImage(groundImg, ground.x, ground.y, ground.width, ground.height);
ctx.drawImage(groundImg, ground.x + ground.width, ground.y, ground.width, ground.height);
};

// Define skybox properties
var skybox = {
  x: 0,
  y: 0,
  width: 11486,
  height: 1080,
};

// Preload skybox texture
var skyboxImg = new Image();
skyboxImg.src = 'assets/skybox.png'; // Replace with the path to your skybox texture


// Draws the skybox
function drawSkybox() {
  ctx.drawImage(skyboxImg, skybox.x, skybox.y, skybox.width, skybox.height);
  ctx.drawImage(skyboxImg, skybox.x + skybox.width, skybox.y, skybox.width, skybox.height);
}

// Draws the bird based on up or down position
function drawBird() {
  clearTimeout(drawTimeout); // Clear any previously scheduled draw
  if (isMovingUp && bird.y > 0) {
    ctx.drawImage(birdUpImg, birdUp.x, birdUp.y, birdUp.width, birdUp.height);
  } else if (!isMovingUp && bird.y <= canvas.height - bird.height &&!isGhost) {
    ctx.drawImage(birdDownImg, birdDown.x, birdDown.y, birdDown.width, birdDown.height);
  }
}

let isBirdUp = true;

// Draw the animated bird based on up or down position
function drawAnimatedBird() {
  let birdImage = isBirdUp ? birdUpImg : birdDownImg;
  ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

  // Change bird.y position based on isBirdUp
  if (isBirdUp) {
    bird.y -= 8;
  } else {
    bird.y += 6;
  }
}

// Function to switch between the two bird images
function switchBirdImages() {
  isBirdUp = !isBirdUp;
  if (!enableVerticalMovement && isGameStarted && isBirdUp){
  playFlapSound();
  }
}

// Call switchBirdImages function every 200 milliseconds
setInterval(switchBirdImages, 350);

/**
 * Handles the game over state.
 */
function gameOver() {
  // Get the previous highscore for the current difficulty from localStorage
  var previousHighscore = localStorage.getItem(`highscore_${difficulty}`);

  // Check if a new highscore is reached and save it if necessary
  if (previousHighscore === null || score > previousHighscore) {
    saveHighscore(score, difficulty);
    previousHighscore = score;
  }

  // Implement the logic for the game over state
  saveCollectedCoins(collectedCoins);
  playDeathSound();
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  // Display game over message, score, and highscore
  ctx.drawImage(borderBox, canvas.width / 2 - 450, canvas.height / 2 - 265)
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black"; // Set the border color
  ctx.lineWidth = 8; // Set the border width
  ctx.font = "bolder 80px Helvetica";
    
  ctx.strokeText(score, canvas.width / 2 + 60, canvas.height / 2 - 160);
  ctx.strokeText(matchCoins, canvas.width / 2 + 60, canvas.height / 2 - 75);
  ctx.strokeText(`${previousHighscore}`, canvas.width / 2 + 60, canvas.height / 2 + 15);
  ctx.strokeText(collectedCoins, canvas.width / 2 + 60, canvas.height / 2 + 100);
  ctx.strokeText(`${difficulty}`, canvas.width / 2 + 60, canvas.height / 2 + 190);
  ctx.fillText(score, canvas.width / 2 + 60, canvas.height / 2 - 160);
  ctx.fillText(matchCoins, canvas.width / 2 + 60, canvas.height / 2 - 75);
  ctx.fillText(`${previousHighscore}`, canvas.width / 2 + 60, canvas.height / 2 + 15);
  ctx.fillText(collectedCoins, canvas.width / 2 + 60, canvas.height / 2 + 100);
  ctx.fillText(`${difficulty}`, canvas.width / 2 + 60, canvas.height / 2 + 190);
  //ctx.drawImage(arrowUpLogo, canvas.width / 2 - 90, canvas.height / 2 + 40);
  
// Disable the button temporarily using a timer
var buttonEnabled = false;
setTimeout(function() {
  buttonEnabled = true;
  document.removeEventListener("mousedown", moveUp)
  document.addEventListener("mousedown", restartGame); // Press to continue to main menu
  ctx.font = "bolder 70px Helvetica";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black"; // Set the border color
  ctx.lineWidth = 8; // Set the border width
  ctx.strokeText("continue ", canvas.width / 2 - 140, canvas.height / 2 + 400);
  ctx.fillText("continue ", canvas.width / 2 - 140, canvas.height / 2 + 400);
}, 300); // Change the duration (in milliseconds) to your desired delay 

}

//Plays the death sound effect.
function playDeathSound() {
  if (isGameOver) {
    var deathSound = document.getElementById("deathSound");
    deathSound.play();
  }
}

// Load in the buttons and background. Start background animation.
window.onload = function() {
  drawCollectedCoins();
  createSfxButton(); 
  createMusicButton();
  drawBird();
  

  const video = document.getElementById("gameVideo");
  video.src = "assets/hell.mp4";
  video.muted = true; // Mute the video
  video.preload = "auto"; // Preload the video
  video.onloadeddata = function() {
    // The video has finished preloading, you can proceed with other game setup here
    video.play();
  };
};

//Updates the game state every frame.
 function update() {

handleVerticalMovement();

  // Reset ground position when it goes off-screen
if (ground.x <= -ground.width) {
  ground.x = 0;
}

// Reset ceiling position when it goes off-screen
if (ceiling.x <= -ceiling.width) {
  ceiling.x = 0;
}

// Reset skybox position when it goes off-screen
if (skybox.x <= -skybox.width) {
  skybox.x = 0;
}

  // Move the ground
  ground.x -= groundSpeed;

  // Move the ceiling
  ceiling.x -= groundSpeed;

  // Move the skybox
  skybox.x -= skyboxSpeed;

  // Check for collision with top or bottom border
  if (bird.y < 20) {
    isGameOver = true; // Set the game over state
    drawBird();
    gameOver(); // Call the game over function
    JUMP = -1.6
    GRAVITY = 1.6
    document.removeEventListener("mousedown", moveUp)
  }
  
  // Check for collision with bottom border
  if (bird.y + bird.height > canvas.height + 40) {
    isGameOver = true; // Set the game over state
    gameOver(); // Call the game over function
    return;
  }

  
  // Check if the current power-up has expired
  var currentTime = Date.now();
  if (currentTime > starPowerUpEndTime) {
    // Power-up has expired, reset effects
    starSpeedMultiplier = 1;
    isInvincible = false;
    clearInterval(powerUpCoinIntervalId); // Clear the current coin interval
  }
  if (currentTime > ghostPowerUpEndTime) {
    // Power-up has expired, reset effects
    isGhost = false;
    ghostSpeedMultiplier = 1;
  }



  if (isInvincible) {
    speed = speed * starSpeedMultiplier;
    pipeStartSkip = 0;
    pipes = [];
  }

  if (isGhost) {
    speed = speed * ghostSpeedMultiplier;
  }

  // Check for collision with pipes
  if (checkCollision()) {
    deathSound.play()
    backgroundMusic.pause()
    isGameOver = true; // Set the game over state
}  

   // Clear canvas before drawing new elements each frame
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Check if the game is started
    if (!isGameStarted) {
      // Display the logo and buttons
      logo.style.display = "block";
      sfxButton.style.display = "block";
      musicButton.style.display = "block";
      difficultyButtons.style.display = "block";
      storeButton.style.display = "block";
      startButton.style.display = "block";
      drawCollectedCoins();
      drawBird();
      return;
      
    } 
     if (isGameStarted) {
      // Hide the logo and buttons once the game starts
      logo.style.display = "none";
      sfxButton.style.display = "none";
      musicButton.style.display = "none";
      difficultyButtons.style.display = "none";
      storeButton.style.display = "none";
      startButton.style.display = "none";
    }

  // Draw skybox
  drawSkybox();

  //Spawn in coins
  updateCoins();

  //Spawn in stars
  updateStars();

  //Spawn in ghosts
  updateGhosts();

  //Draw and move pipes
  updatePipes();

  // Draw floor and ceiling;
  drawSpikes();

  // Draw the score counter
  drawScore();

  // Call the drawFPS function
  drawFPS();

  // Draw the coin counter
  drawCollectedCoins();
  
  // Draw the message before vertical movement starts and start flying animation
  if (!enableVerticalMovement && isGameStarted){
  drawReadyMessage();
  drawAnimatedBird();
  }

  // Draw the message afte vertical movement starts
  if (enableVerticalMovement && score < 1 && isGameStarted){
  drawGoMessage();
  }

  if (isBirdFalling && isGameOver) {
  drawDeathAnimation(); // Call the drawing function when collision is detected
  }

  // Check if bird passes pipe and add score
  checkScore();

  var currentTime = performance.now();
  var deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  // Accumulate the elapsed time
  elapsedTime += deltaTime;

  // Calculate frames per 100ms
  frameCount++;
  if (elapsedTime >= 100) {
    var framesPer100ms = frameCount / (elapsedTime / 100);
    fps = framesPer100ms.toFixed(1); // Convert framesPer100ms to a string with one decimal place
    frameCount = 0;
    elapsedTime = 0;
    setTimeout(adjustSpeed, 1000);
    setTimeout(adjustPipeSpawnRate, 1000);
    console.log("fps: " + fps + " (update)")
    console.log("speed: " + speed + " (update)")
    console.log("pipe: " + pipeSpawnRate + " (update)")
  }

  var minFPS = minimumFpsValue; // Minimum FPS value

  // Calculate the desired frame rate for adding a pipe every 0.5 seconds
  var targetFrameRate = pipeSpawnRate;
  var framesPerPipe = Math.max(fps / targetFrameRate, minFPS);

  frameCounter++;

  // Check if it's time to add a new pipe
  if (frameCounter >= framesPerPipe && frameCounter >= minFramesPerPipe) {
    addPipe();
    frameCounter = 0; // Reset the frame counter
  }

  // Draw Bird
  if (enableVerticalMovement && !isGameOver) 
    drawBird();
  if (isGameOver) {
    drawDeathAnimation(); // Call the drawing function when collision is detected
  }

  // var coinSpawnCounter = 0;
  // var framesPerCoin = Math.ceil(AMOUNT_OF_COINS / (1000 / (1 / fps))); // Calculate frames per coin
  
  // // Check if it's time to add a new coin
  // if (coinSpawnCounter >= framesPerCoin) {
  //   addCoin();
  //   coinSpawnCounter = 0; // Reset the coin spawn counter
  // }
  
  // // Inside the update loop or function
  // coinSpawnCounter++; // Increment the coin spawn counter
  
  

  requestAnimationFrame(update);
}

function adjustSpeed() {
  var targetFPS = 7.5; // Define your target FPS
  var minFPS = minimumFpsValue; // Minimum FPS value
  var targetSpeed = difficulty === 'hard' ? speedHard : speedNormal; // Define the base speed for the difficulty level

  // Calculate the adjusted speed based on the current FPS
  var adjustedSpeed = targetSpeed * (targetFPS / Math.max(fps, minFPS));

  // Assign the adjusted speed value to the speed variable
  speed = adjustedSpeed;
}

function adjustPipeSpawnRate() {
  var targetFPS = 7.5; // Define your target FPS
  var minFPS = minimumFpsValue; // Minimum FPS value
  var targetFrameRate = difficulty === 'hard' ? pipeSpawnHard : pipeSpawnNormal; // Define the base speed for the difficulty level

  // Calculate the adjusted frame rate based on the current FPS
  var adjustedFrameRate = targetFrameRate * (targetFPS / Math.max(fps, minFPS * 2.3));

  // Assign the adjusted frame rate value to the pipeSpawnRate variable
  pipeSpawnRate = adjustedFrameRate;
}

// function adjustCoinSpawnRate() {
//   var targetFPS = 7.5; // Define your target FPS
//   var minFPS = minimumFpsValue; // Minimum FPS value

//   // Calculate the adjusted frame rate based on the current FPS
//   var adjustedCoinSpawnRate = AMOUNT_OF_COINS * (targetFPS / Math.max(fps, minFPS));

//   // Assign the adjusted frame rate value to the AMOUNT_OF_COINS variable
//   AMOUNT_OF_COINS = adjustedCoinSpawnRate;
// }

// Resize the video element
resizeVideo();

// Start the game
startGame();




=======
