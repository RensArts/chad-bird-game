// Check if resolution is stored in local storage
var savedResolution = localStorage.getItem("resolution");

// Get the canvas element
var canvas = document.getElementById("gameCanvas");

// Obtain the rendering context
var ctx = canvas.getContext("2d");

// Function to open the settings window
function openSettingsWindow() {
  isInSettingsMenu = true;
  // Create the modal overlay
  var overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  // Create the modal window
  var modal = document.createElement("div");
  modal.className = "modal";
  overlay.appendChild(modal);

  // Append the settings menu to the modal
  var settingsMenu = document.getElementById("settingsMenu");
  modal.appendChild(settingsMenu);
  settingsMenu.classList.remove("hidden");

  // Create the buttons container
  var buttonsContainer = document.createElement("div");
  buttonsContainer.className = "modal-buttons";
  modal.appendChild(buttonsContainer);

  // Create the Apply button
  var applyButton = document.createElement("button");
  applyButton.textContent = "Apply";
  buttonSound.play();
  applyButton.addEventListener("click", applySettings);
  buttonsContainer.appendChild(applyButton);

  // Create the Close button
  var closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  buttonSound.play();
  closeButton.addEventListener("click", closeSettingsWindow);
  buttonsContainer.appendChild(closeButton);

  // Display the modal
  modal.style.display = "block";
}

function applySettings() {
  var selectedResolution = document.querySelector('.resolutionButton.selected').value;

  switch (selectedResolution) {
    case "native":
      localStorage.setItem("resolution", "native");
      break;
    case "0.5":
      localStorage.setItem("resolution", "0.5");
      break;
    case "0.25":
      localStorage.setItem("resolution", "0.25");
      break;
    default:
      break;
  }

  // Reload the page to apply the new resolution
  location.reload();
}

// Function to close the settings window
function closeSettingsWindow() {
  var overlay = document.querySelector(".overlay");
  var settingsMenu = document.getElementById("settingsMenu");
  settingsMenu.classList.add("hidden");
  overlay.classList.add("hidden")
  location.reload();
}

// Check if resolution is stored in local storage
var savedResolution = localStorage.getItem("resolution");

if (savedResolution) {
  switch (savedResolution) {
    case "native":
      canvas.width = 2560;
      canvas.height = 1080;
      resolutionAdjust = 1;
      secondResolutionAdjust = 1;
      break;
    case "0.5":
      canvas.width = 1280;
      canvas.height = 540;
      resolutionAdjust = 2;
      secondResolutionAdjust = 1.4;
      break;
    case "0.25":
      canvas.width = 640;
      canvas.height = 270;
      resolutionAdjust = 4;
      secondResolutionAdjust = 2;
      break;
    default:
      break;
  }
} else {
  // Default resolution
  canvas.width = 1280;
  canvas.height = 540;
  resolutionAdjust = 2;
  secondResolutionAdjust = 1.5;
  localStorage.setItem("resolution", "0.5");
}

// Update the checked state of the buttons
var resolutionButtons = document.querySelectorAll('.resolutionButton');
resolutionButtons.forEach(function (button) {
  if (button.value === savedResolution) {
    button.classList.add('selected');
  }
  
  button.addEventListener('click', function () {
    resolutionButtons.forEach(function (btn) {
      buttonSound.play();
      btn.classList.remove('selected');
    });
    button.classList.add('selected');
  });
});

var pipeTextureButton = document.getElementById("pipeTextureButton");
var showFPSButton = document.getElementById("showFPSButton");
var touchButton = document.getElementById("touchButton");
var mouseButton = document.getElementById("mouseButton");

// Set the initial state of the "showFPS" button
var showFPS = localStorage.getItem("showFPS") || "false";
showFPSButton.setAttribute("data-value", showFPS);
if (showFPS === "true") {
  showFPSButton.classList.add("selected");
} else {
  showFPSButton.classList.remove("selected");
}

// Set the initial state of the "pipeTexture" button
var showTextures = localStorage.getItem("pipeTexture") || "false";
pipeTextureButton.setAttribute("data-value", showTextures);
if (showTextures === "true") {
  pipeTextureButton.classList.add("selected");
} else {
  pipeTextureButton.classList.remove("selected");
}

// Set the initial state of the input buttons
var chosenInput = localStorage.getItem("chosenInput") || "touch";
if (chosenInput === "touch") {
  touchButton.classList.add("selected");
} else {
  mouseButton.classList.add("selected");
}

var pipeTextureButton = document.getElementById("pipeTextureButton");
var showFPSButton = document.getElementById("showFPSButton");
var touchButton = document.getElementById("touchButton");
var mouseButton = document.getElementById("mouseButton");

// Set the initial state of the "showFPS" button
var showFPS = localStorage.getItem("showFPS") || "false";
showFPSButton.setAttribute("data-value", showFPS);
if (showFPS === "true") {
  showFPSButton.classList.add("selected");
} else {
  showFPSButton.classList.remove("selected");
}

// Set the initial state of the "pipeTexture" button
var showTextures = localStorage.getItem("pipeTexture") || "false";
pipeTextureButton.setAttribute("data-value", showTextures);
if (showTextures === "true") {
  pipeTextureButton.classList.add("selected");
} else {
  pipeTextureButton.classList.remove("selected");
}

// Set the initial state of the input buttons
var chosenInput = localStorage.getItem("chosenInput") || "mouse";
if (chosenInput === "touch") {
  touchButton.classList.add("selected");
} else {
  mouseButton.classList.add("selected");
}

pipeTextureButton.addEventListener("click", toggleOption);
showFPSButton.addEventListener("click", toggleOption);
touchButton.addEventListener("click", setInputOption);
mouseButton.addEventListener("click", setInputOption);

function toggleOption(event) {
  buttonSound.play();
  var button = event.target;
  var option = button.getAttribute("data-option");
  var value = button.getAttribute("data-value");

  if (value === "true") {
    value = "false";
    button.classList.remove("selected"); // Remove the "selected" class immediately
  } else {
    value = "true";
    button.classList.add("selected"); // Add the "selected" class immediately
  }

  button.setAttribute("data-value", value);

  // Update the option value and perform any necessary actions
  updateOption(option, value);
}

function setInputOption(event) {
  buttonSound.play();
  var button = event.target;
  var value = button.getAttribute("data-value");

  // Update the input option value and perform any necessary actions
  chosenInput = value;
  localStorage.setItem("chosenInput", chosenInput); // Store the chosen input option in local storage

  // Update the button states
  touchButton.classList.remove("selected");
  mouseButton.classList.remove("selected");
  button.classList.add("selected");

  // Add or remove event listeners based on the chosen input
  if (chosenInput === "touch") {
    document.removeEventListener("mousedown", moveUp);
    document.addEventListener("touchstart", touchMoveUp);
  } else if (chosenInput === "mouse") {
    document.removeEventListener("touchstart", touchMoveUp);
    document.addEventListener("mousedown", moveUp);
  }
}

function updateOption(option, value) {
  if (option === "pipeTexture") {
    showTextures = value === "true";

    // Perform any necessary actions based on the pipeTexture option
    if (showTextures) {
      pipeTextureButton.classList.add("selected");
    } else {
      pipeTextureButton.classList.remove("selected");
    }

    localStorage.setItem("pipeTexture", value); // Store the value in local storage
  } else if (option === "showFPS") {
    showFPS = value === "true";
    localStorage.setItem("showFPS", value); // Store the value in local storage
  }
}



// Constants
const PIPE_PASSED = canvas.width * resolutionAdjust * 0.0781;
const PIPE_WIDTH = canvas.width * resolutionAdjust * 0.0508;
const PIPE_COLOR_TOP = "black";
const PIPE_COLOR_BOTTOM = "black";
var HITBOX_RIGHT = -40 * (canvas.width / 2560);
var HITBOX_TOP = -75 * (canvas.height / 1080); 
var HITBOX_BOTTOM = -10 * (canvas.height / 1080); 
var HITBOX_LEFT = 140 * (canvas.width / 2560); 
var COIN_HITBOX = 0;
const COIN_SIZE = canvas.width * resolutionAdjust * 0.0006;
const COIN_SPEED = 2.5 / secondResolutionAdjust; // Adjust the speed of the coin
const STAR_SPEED = 3 / secondResolutionAdjust; // Adjust the speed of the stars
const countDown = 2950; // time before game starts in ms
let selectedButton = null;
let coinIntervalId;
let powerUpCoinIntervalId;
let starIntervalId;
let ghostIntervalId;
let sizeIntervalId;
let reduceGapIntervalId;

//Arrays
var flapSounds = [];
var coins = [];
var pipes = [];
var stars = [];
var ghosts = [];
var sizes = [];
var reduceGaps = [];


// Variables
var PIPE_SPEED = 2 / secondResolutionAdjust; //Adjust the speed of the pipes
var skyboxSpeed = 2 / resolutionAdjust; // Adjust the speed of the skybox
var secondSkyboxSpeed = 16 / resolutionAdjust; // Adjust the speed of the second skybox
var difficulty = "normal"; // Default difficulty level
var GROUND_SPEED = 2.1 / secondResolutionAdjust; // Adjust the speed of the ground and ceiling
var JUMP = 1.2 * secondResolutionAdjust;// Adjust the value of upward momentum
var GRAVITY = 0.9 * secondResolutionAdjust; // Adjust this value to control the downward speed of the bird
var PIPE_GAP = 320 * (canvas.height / 1080); // Adjust this value to control the gap of the spawn pipes
var gapSize = 500 * (canvas.height / 1080); // Consistent gap size
var score = 0; // Variable to keep track of the score
var collectedCoins = 0; // Variable to keep track of collected coins
var matchCoins = 0; // Variable to keep track of coins collected in single match
var groundSpeed = 0; // Track the speed of the ground movement
var AMOUNT_OF_COINS = 3000; // Adjust the amount of coins spawned
var minStarSpawn = 5000; // Minimum spawn rate in milliseconds (20 seconds)
var maxStarSpawn = 45000; // Maximum spawn rate in milliseconds (40 seconds)
var minGhostSpawn = 5000; // Minimum spawn rate in milliseconds (20 seconds)
var maxGhostSpawn = 45000; // Maximum spawn rate in milliseconds (40 seconds)
var minSizeSpawn = 5000; // Minimum spawn rate in milliseconds (20 seconds)
var maxSizeSpawn = 45000; // Maximum spawn rate in milliseconds (40 seconds)
var minReduceGapSpawn = 5000; // Minimum spawn rate in milliseconds (20 seconds)
var maxReduceGapSpawn = 45000; // Maximum spawn rate in milliseconds (40 seconds)
var starSpeedMultiplier = 1; // Initial speed multiplier
var ghostSpeedMultiplier = 1;
var reduceGapSpeedMultiplier = 1;
var isInvincible = false; // Initial invincibility state
var isGhost = false; // Initial ghost state
var isSize = false; // Initial size state
var isReduceGap = false; // initial gap size state
var starPowerUpDuration = 2500; // Duration of power-ups in milliseconds 
var ghostPowerUpDuration = 5000;  // Duration of power-ups in milliseconds
var sizePowerUpDuration = 10000; // Duration of power-ups in milliseconds
var reduceGapPowerUpDuration = 5000; // duration of the power up
var starPowerUpEndTime = 0; // Time when the current power-up will end
var ghostPowerUpEndTime = 0; // Time when the current power-up will end
var sizePowerUpEndTime = 0; // Time when the current power-up will end
var reduceGapPowerUpEndTime = 0; // Time when the current power up will end
var powerUpCoinSpawnRate = 200; // Spawn rate of coins during power-up (in milliseconds)
var pipeStartSkip = 24; // amount of pipes that won't be rendered at the start (2 = 1 pipe)

var isMusicOn = true; // Initial state of the background music
var isSfxOn = true; // Initial state of the SFX

// adds a pipe based on elapsed frames per 0.1 seconds (in update)
var frameCounter = 0; // set counter for pipe update interval
var framesPerPipe = 0; // set default value for pipe update interval 1ps/75fps
var minFramesPerPipe = 0.1; // set minimum spawn time for the pipes 200ms/30fps
var pipeSpawnRate = 0.3; // set spawn rate for the pipes (higher = more pipes)
var minimumFpsValue = 3; // if framerate drops below 30fps, it will register as 30fps
var pipeSpawnNormal = 0.22; // set this value if changing the pipespawnrate of hard difficulty in function
var pipeSpawnHard = 0.34; // set this value if changing the pipe spawn rate of normal difficulty in function

// to adjust game speed based on frames per 0.1 seconds (in update)
var speed = 8 / secondResolutionAdjust; // Variable to increment speed in function Update();
var speedNormal = 8 / secondResolutionAdjust; // set this value if changing the speed of normal difficulty in function
var speedHard = 10 / secondResolutionAdjust; // set this value if changing the speed of hard difficulty in function
var frameCount = 0; // set counter for game speed update interval
var fps = 0; // set default value for game speed update interval
var lastTime = performance.now(); // counts frames in update
var elapsedTime = 0; // set counter for game speed update interval

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
  x: canvas.width * 700 / 2560, // Adjusted x-coordinate
  y: canvas.height * 400 / 1080, // Adjusted y-coordinate
  width: canvas.width  * 250 / 2560, // Adjusted width
  height: canvas.height  * 250 / 1080, // Adjusted height
};

// Define the bird going up object
var birdUp = {
  x: canvas.width  * 700 / 2560,
  y: canvas.height  * 400 / 1080,
  width: canvas.width  * 250 / 2560,
  height: canvas.height  * 250 / 1080,
};

// Define the bird going down object
var birdDown = {
  x: canvas.width  * 700 / 2560,
  y: canvas.height  * 400 / 1080,
  width: canvas.width  * 250 / 2560,
  height: canvas.height  * 250 / 1080,
};

// Define the ground object
var ground = {
  x: 0,
  y: canvas.height - (canvas.height * 100 / 1080), // Adjusted y-coordinate
  width: canvas.width,
  height: canvas.height* 100 / 1080, // Adjusted height
  speed: 0, // Adjust the speed of the ground movement
};

// Define the ceiling object
var ceiling = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height * 100 / 1080, // Adjusted height
  speed: 0, // Adjust the speed of the ceiling movement
};

// Create Audio objects for each sound
const buttonSound = new Audio("assets/button-sound.mp3");
const startSound = new Audio("assets/start-sound.mp3")

// Create the store button
var storeButton = document.createElement("button");
storeButton.textContent = "Store";
storeButton.addEventListener("click", goToStore);
storeButton.id = "storeButton";
document.body.appendChild(storeButton);

// Create the settings button
var settingsButton = document.createElement("button");
settingsButton.textContent = "Settings";
settingsButton.addEventListener("click", openSettingsWindow);
settingsButton.id = "settingsButton";
document.body.appendChild(settingsButton);

// Position the buttons
var buttonsContainer = document.createElement("div");
buttonsContainer.id = "buttonsContainer";
document.body.appendChild(buttonsContainer);
buttonsContainer.appendChild(storeButton);
buttonsContainer.appendChild(settingsButton);

// Position the buttons on the right side
function positionButtons() {
  var windowWidth = window.innerWidth;
  var buttonsContainerWidth = buttonsContainer.offsetWidth;
  buttonsContainer.style.right = (windowWidth - buttonsContainerWidth - 1) + "px";
}

function goToStore() {
  window.location.href = "store.html";
}

// Add event listeners to your buttons and play corresponding audio on click
document.getElementById('normalButton').addEventListener('click', function() {
  setDifficulty('normal');
});

document.getElementById('hardButton').addEventListener('click', function() {
  setDifficulty('hard');
});

// Get the selected difficulty from localStorage
function getDifficulty() {
  return localStorage.getItem('selectedDifficulty');
}

function setDifficulty(selectedDifficulty) {
  localStorage.setItem('selectedDifficulty', selectedDifficulty);
  difficulty = selectedDifficulty;

  // Clear the existing coin interval
  clearInterval(coinIntervalId);

  // Remove the selected class from the previously selected button
  if (selectedButton) {
    selectedButton.classList.remove('selected');
    buttonSound.play();
  }

  // Adjust the game constants based on the selected difficulty level
  switch (selectedDifficulty) {
    case "normal":
      speed = speedNormal;
      pipeSpawnRate = pipeSpawnNormal;
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

function initializeGame() {
  const selectedDifficulty = getDifficulty();
  if (selectedDifficulty === 'normal') {
    document.getElementById('normalButton').click();
  } else if (selectedDifficulty === 'hard') {
    document.getElementById('hardButton').click();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  initializeGame();
});



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

// Play the star sound
function playSizeSound(){
  var sizeSound = document.getElementById("sizeSound")
  sizeSound.play();
}

function playReduceGapSound(){
  var reduceGapSound = document.getElementById("reduceGapSound")
  reduceGapSound.play();
}

// Generate a random spawn rate between minSpawnRate and maxSpawnRate
function generateStarSpawnRate() {
  return Math.random() * (maxStarSpawn - minStarSpawn) + minStarSpawn;
}
// Generate a random spawn rate between minSpawnRate and maxSpawnRate
function generateGhostSpawnRate() {
  return Math.random() * (maxGhostSpawn - minGhostSpawn) + minGhostSpawn;
}

// Generate a random spawn rate between minSpawnRate and maxSpawnRate
function generateSizeSpawnRate() {
  return Math.random() * (maxSizeSpawn - minSizeSpawn) + minSizeSpawn;
}

// Generate a random spawn rate between minSpawnRate and maxSpawnRate
function generateReduceGapSpawnRate() {
  return Math.random() * (maxReduceGapSpawn - minReduceGapSpawn) + minReduceGapSpawn;
}

// Determines the coins spawning location
function addCoin() {
  var coin = {
    x: canvas.width, // Spawn the coin at the right edge of the canvas
    y: getRandomInt(canvas.height * 450 / 1080, canvas.height - (canvas.height * 450 / 1080)), // Randomize the coin's y-coordinate
    radius: canvas.width * 30 / 1080, // Adjusted size of the coin
  };
  coins.push(coin);
}

// Determines the star spawning location
function addStar() {
  var star = {
    x: canvas.width, // Spawn the star at the right edge of the canvas
    y: getRandomInt(canvas.height * 450 / 1080, canvas.height  - (canvas.height * 450 / 1080)), // Randomize the star's y-coordinate
    radius: canvas.width * 45 / 1080, // Adjusted size of the star
  };
  stars.push(star);
}

// Determines the ghost spawning location
function addGhost() {
  var ghost = {
    x: canvas.width, // Spawn the ghost at the right edge of the canvas
    y: getRandomInt(canvas.height * 450 / 1080, canvas.height - (canvas.height * 450 / 1080)), // Randomize the ghost's y-coordinate
    radius: canvas.width * 45 / 1080, // Adjusted size of the ghost
  };
  ghosts.push(ghost);
}

// Determines the size spawning location
function addSize() {
  var size = {
    x: canvas.width, // Spawn the size at the right edge of the canvas
    y: getRandomInt(canvas.height * 450 / 1080, canvas.height - (canvas.height * 450 / 1080)), // Randomize the size's y-coordinate
    radius: canvas.width * 45 / 1080, // Adjusted size of the size
  };
  sizes.push(size);
}

// Determines the reduceGap spawning location
function addReduceGap() {
  var reduceGap = {
    x: canvas.width, // Spawn the reduceGap at the right edge of the canvas
    y: getRandomInt(canvas.height * 450 / 1080, canvas.height - (canvas.height * 450 / 1080)), // Randomize the reduceGap's y-coordinate
    radius: canvas.width * 45 / 1080, // Adjusted size of the reduceGap
  };
  reduceGaps.push(reduceGap);
}


// Updates the coin spawning, coin collecting and hitbox
function updateCoins() {
  for (var i = 1; i < coins.length; i++) {
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
  for (var i = 0; i < stars.length; i++) {
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
  for (var i = 0; i < ghosts.length; i++) {
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
      ghostSpeedMultiplier = 1.05;
      ghostPowerUpEndTime = Date.now() + ghostPowerUpDuration;
      // Apply power-up effects
      ghostSound.play();
      clearInterval(ghostIntervalId);
      ghostIntervalId = setInterval (addGhost, generateGhostSpawnRate());
      }
  }
}

// Updates the star spawning, star collecting and hitbox
function updateSizes() {
  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i];
    size.x -= PIPE_SPEED * (speed + STAR_SPEED); // Move the coin with the pipes

    // Draw the coin image
    var sizeImage = document.getElementById("sizeImage"); // Get the coin image element
    ctx.drawImage(sizeImage, size.x - size.radius, size.y - size.radius, size.radius * COIN_SIZE, size.radius * COIN_SIZE);

    // Check if the bird collects the coin
    if (bird.x + COIN_HITBOX + bird.width > size.x - size.radius &&
        bird.x < COIN_HITBOX + size.x + size.radius &&
        bird.y + COIN_HITBOX + bird.height > size.y - size.radius &&
        bird.y < COIN_HITBOX + size.y + size.radius) {
      sizes.splice(i, 1); // Remove the collected coin from the array
      isSize = true;
      sizePowerUpEndTime = Date.now() + sizePowerUpDuration;
      // Apply power-up effects
      sizeSound.play();
      clearInterval(sizeIntervalId);
      sizeIntervalId = setInterval (addSize, generateSizeSpawnRate());
      }
  }
}

// Updates the star spawning, star collecting and hitbox
function updateReduceGaps() {
  for (var i = 0; i < reduceGaps.length; i++) {
    var reduceGap = reduceGaps[i];
    reduceGap.x -= PIPE_SPEED * (speed + STAR_SPEED); // Move the coin with the pipes

    // Draw the coin image
    var reduceGapImage = document.getElementById("reduceGapImage"); // Get the coin image element
    ctx.drawImage(reduceGapImage, reduceGap.x - reduceGap.radius, reduceGap.y - reduceGap.radius, reduceGap.radius * COIN_SIZE, reduceGap.radius * COIN_SIZE);

    // Check if the bird collects the coin
    if (bird.x + COIN_HITBOX + bird.width > reduceGap.x - reduceGap.radius &&
        bird.x < COIN_HITBOX + reduceGap.x + reduceGap.radius &&
        bird.y + COIN_HITBOX + bird.height > reduceGap.y - reduceGap.radius &&
        bird.y < COIN_HITBOX + reduceGap.y + reduceGap.radius) {
      reduceGaps.splice(i, 1); // Remove the collected coin from the array
      isReduceGap = true;
      reduceGapPowerUpEndTime = Date.now() + reduceGapPowerUpDuration;
      reduceGapSpeedMultiplier = 0.96;
      // Apply power-up effects
      reduceGapSound.play();
      clearInterval(reduceGapIntervalId);
      reduceGapIntervalId = setInterval (addReduceGap, generateReduceGapSpawnRate());
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

// Draw score and image on the top left of the screen
function drawCollectedCoins() {
  ctx.fillStyle = "orange";
  ctx.strokeStyle = "black";
  
  // Calculate scaling factors based on the current canvas resolution and the initial resolution
  var widthScale = canvas.width / 2560 * secondResolutionAdjust;
  var heightScale = canvas.height / 1080 * secondResolutionAdjust;
  
  // Adjust line width and font size based on the scaling factors
  ctx.lineWidth = Math.ceil(widthScale * heightScale * 3);
  ctx.font = "bolder " + Math.ceil(widthScale * heightScale * 60) + "px Arial";
  
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";

  var savedCoins = localStorage.getItem("coins");
  if (savedCoins) {
    collectedCoins = parseInt(savedCoins); // Update the collectedCoins variable with the saved value
  }

  // Calculate the new width and maintain the aspect ratio
  var newWidth = Math.ceil(widthScale * heightScale * 200);
  var aspectRatio = image.width / image.height;
  var newHeight = Math.ceil(newWidth / aspectRatio);

  // Draw the image with the new width and height
  var imageX = Math.ceil(widthScale * 20 / resolutionAdjust); // Adjust the x position as needed
  var imageY = Math.ceil(heightScale * -9);
  ctx.drawImage(image, imageX, imageY, newWidth, newHeight);

  var textX = Math.ceil(widthScale * 160 / secondResolutionAdjust); // Adjust the x position as needed
  var textY = Math.ceil(heightScale * 45 / secondResolutionAdjust);
  ctx.fillText(collectedCoins, textX, textY);
  ctx.strokeText(collectedCoins, textX, textY);

  var xSymbolX = Math.ceil(widthScale * 120 / secondResolutionAdjust); // Adjust the x position as needed
  var xSymbolY = Math.ceil(heightScale * 41 / secondResolutionAdjust);
  ctx.fillText("x", xSymbolX, xSymbolY);
  ctx.strokeText("x", xSymbolX, xSymbolY);
}

// Saves the collected coins to local storage
function saveCollectedCoins(collectedCoins) {
  localStorage.setItem("coins", collectedCoins)
}

function drawFPS() {
  if (showFPS === "true") {
    var text = "FPS: " + fps * 10; // Create the FPS text string

    ctx.font = "bold " + Math.ceil(canvas.width / 70) + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText(
      text,
      canvas.width - Math.ceil(canvas.width * resolutionAdjust / 100),
      Math.ceil(canvas.width / 100)
    );
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.ceil(canvas.width / 1500);
    ctx.strokeText(
      text,
      canvas.width - Math.ceil(canvas.width * resolutionAdjust / 100),
      Math.ceil(canvas.width / 100)
    );
  }
}
// Draw score on the top of the screen
function drawScore() {
  if (isGameOver) {
    return;
  }
  var text = score.toString(); // Convert the score to a string

  ctx.font = "bolder " + Math.ceil(canvas.width / 28) + "px Arial";
  ctx.textAlign = "end";
  ctx.textBaseline = "middle";

  // Set the stroke style (black border)
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.ceil(canvas.width / 220);
  ctx.strokeText(text, canvas.width - Math.ceil(canvas.width / 2.1), Math.ceil(canvas.width / 55));

  // Set the fill style (white text)
  ctx.fillStyle = "white";
  ctx.fillText(text, canvas.width - Math.ceil(canvas.width / 2.1), Math.ceil(canvas.width / 55));
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
  button.style.width = Math.ceil(canvas.width * resolutionAdjust / 32) + "px";
  button.style.height = Math.ceil(canvas.width * resolutionAdjust / 32) + "px";

  // Retrieve the previous state from local storage or default to true
  var isMusicOn = localStorage.getItem("isMusicOn") === "true";

  // Set the initial button appearance based on the state
  setButtonAppearance();

  // Add event listener to handle button click
  button.addEventListener("click", function() {
    buttonSound.play();
    isMusicOn = !isMusicOn; // Toggle the state
    setButtonAppearance(); // Update the button appearance

    // Store the updated state in local storage
    localStorage.setItem("isMusicOn", isMusicOn.toString());
  });

  // Function to update the button appearance based on the state
  function setButtonAppearance() {
    if (isMusicOn) {
      button.style.backgroundImage = "url('assets/musicButton.png')";
      // Resume playing the background music
      backgroundMusic.volume = 1;
    } else {
      button.style.backgroundImage = "url('assets/musicOffButton.png')";
      // Pause the background music
      backgroundMusic.volume = 0;
    }
  }

  // Append the button to the body element
  document.body.appendChild(button);
}

createMusicButton();


// Creates the button to turn the sound effects on or off
function createSfxButton() {
  var button = document.createElement("button");
  button.id = "sfxButton";
  button.style.backgroundImage = "url('assets/sfxButton.png')";
  button.style.backgroundSize = "cover";
  button.style.width = Math.ceil(canvas.width * resolutionAdjust / 32) + "px";
  button.style.height = Math.ceil(canvas.width * resolutionAdjust / 32) + "px";

  // Retrieve the previous state from local storage or default to true
  var isSfxOn = localStorage.getItem("isSfxOn") === "true";

  // Set the initial button appearance based on the state
  setButtonAppearance();

  // Add event listener to handle button click
  button.addEventListener("click", function() {
    buttonSound.play();
    initializeFlapSounds();
    initializeCoinSounds();
    isSfxOn = !isSfxOn; // Toggle the state
    setButtonAppearance(); // Update the button appearance

    // Store the updated state in local storage
    localStorage.setItem("isSfxOn", isSfxOn.toString());

    // Adjust volume based on the state
    adjustVolume();
  });

  // Function to update the button appearance based on the state
  function setButtonAppearance() {
    if (isSfxOn) {
      button.style.backgroundImage = "url('assets/sfxButton.png')";
    } else {
      button.style.backgroundImage = "url('assets/sfxOffButton.png')";
    }
  }

  // Function to initialize or update the volume of flapSounds and coinSounds based on the state
  function initializeSoundVolume(soundArray, volume) {
    for (var i = 0; i < soundArray.length; i++) {
      soundArray[i].volume = volume;
    }
  }

  // Function to adjust the volume of sound effects based on the state
  function adjustVolume() {
    var volume = isSfxOn ? 1 : 0;
    initializeSoundVolume(flapSounds, volume);
    initializeSoundVolume(coinSounds, volume);
    deathSound.volume = volume;
    startSound.volume = volume;
    ghostSound.volume = volume;
    sizeSound.volume = volume;
    reduceGapSound.volume = volume;
    starSound.volume = volume;
  }

  // Append the button to the body element
  document.body.appendChild(button);

  // Call adjustVolume() initially to set the volume based on the stored state
  adjustVolume();

  // Additional logic to ensure flapSounds and coinSounds are muted correctly on page reload
  if (!isSfxOn) {
    initializeFlapSounds();
    initializeCoinSounds();
    adjustVolume();
  }
}

createSfxButton();



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
  var gapPosition = getRandomInt(Math.ceil(canvas.height * 0.093), canvas.height - PIPE_GAP  - Math.ceil(canvas.height * 0.37));
  
  var pipeWidth = Math.ceil(canvas.width * 0.06);
  var pipeHeightTop = gapPosition + Math.ceil(canvas.height * 0.089);
  var pipeHeightBottom = canvas.height - (gapPosition + gapSize - Math.ceil(canvas.height * 0.32));

  pipes.push({
    x: canvas.width,
    y: 0,
    width: pipeWidth,
    height: pipeHeightTop,
    top: true,
    passed: false,
  });

  pipes.push({
    x: canvas.width,
    y: gapPosition + gapSize,
    width: pipeWidth,
    height: pipeHeightBottom,
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

    // Calculate adjusted sizes and positions based on canvas resolution
    var adjustedX = Math.round(p.x * (canvas.width * resolutionAdjust / 2560));
    var adjustedY = Math.round(p.y * (canvas.height * resolutionAdjust / 1080));
    var adjustedWidth = Math.round(p.width * (canvas.width / 2560 * resolutionAdjust));
    var adjustedHeight = Math.round(p.height * (canvas.height / 1080 * resolutionAdjust));
    var adjustedGap = Math.round(PIPE_GAP * (canvas.width / 2560 * resolutionAdjust));

    // Calculate adjusted image dimensions based on the respective pipe heights
    var adjustedImageWidth;
    var adjustedImageHeight;
    var adjustedImageY;
    if (resolutionAdjust === 1 && !isReduceGap) {
      adjustedImageWidth = Math.round((p.width + 85) * (canvas.width / 2560));
      adjustedImageHeight = Math.round((p.height + 100) * (canvas.height / 1080));
      adjustedImageY = Math.round(90 * (canvas.height / 1080));
    } else if (resolutionAdjust === 2 && !isReduceGap) {
      adjustedImageWidth = Math.round((p.width + 95) * (canvas.width / 2560 * 1.4));
      adjustedImageHeight = Math.round((p.height + 45) * (canvas.height / 1080 * resolutionAdjust));
      adjustedImageY = Math.round(175 * (canvas.height / 1080));
    } else if (resolutionAdjust === 4 && !isReduceGap) {
      adjustedImageWidth = Math.round((p.width + 85) * (canvas.width / 2560 * 2));
      adjustedImageHeight = Math.round((p.height + 23) * (canvas.height / 1080 * resolutionAdjust));
      adjustedImageY = Math.round(340 * (canvas.height / 1080));
    }  else if (resolutionAdjust === 1 && isReduceGap) {
      adjustedImageWidth = Math.round((p.width + 85) * (canvas.width / 2560));
      adjustedImageHeight = Math.round((p.height + 10) * (canvas.height / 1080));
      adjustedImageY = Math.round(5 * (canvas.height / 1080));
    } else if (resolutionAdjust === 2 && isReduceGap) {
      adjustedImageWidth = Math.round((p.width + 95) * (canvas.width / 2560 * 1.4));
      adjustedImageHeight = Math.round((p.height + 5) * (canvas.height / 1080 * resolutionAdjust));
      adjustedImageY = Math.round(10 * (canvas.height / 1080));
    } else if (resolutionAdjust === 4 && isReduceGap) {
      adjustedImageWidth = Math.round((p.width + 85) * (canvas.width / 2560 * 2));
      adjustedImageHeight = Math.round((p.height + 2) * (canvas.height / 1080 * resolutionAdjust));
      adjustedImageY = Math.round(10 * (canvas.height / 1080));
    } 

    // Draw top pipe
    ctx.fillStyle = PIPE_COLOR_TOP;
    ctx.fillRect(adjustedX, adjustedY, adjustedWidth, adjustedHeight);

    // Draw bottom pipe
    ctx.fillStyle = PIPE_COLOR_BOTTOM;
    var bottomPipeHeight = canvas.height - (p.height + adjustedGap);
    ctx.fillRect(adjustedX, adjustedHeight + adjustedGap, adjustedWidth, bottomPipeHeight);

    // Check if the showTextures option is selected (button is red)
    if (showTextures && pipeTextureButton.classList.contains("selected")) {
      // Render picture on top of the pipes
      ctx.drawImage(
        pipeImage,
        adjustedX - Math.round(40 * (canvas.width / 2560)),
        adjustedY - Math.round(adjustedImageY / resolutionAdjust),
        adjustedImageWidth,
        adjustedImageHeight
      );
    }
  }
}

function drawReadyMessage() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.round(6 * (canvas.width/ 2560));
  ctx.font = "bolder " + Math.round(160 * (canvas.width / 2560)) + "px Arial";
  ctx.textAlign = "start";
  ctx.textBaseline = "middle";
  ctx.fillText("READY", canvas.width / 2 - Math.round(245 * (canvas.width / 2560)), canvas.height / 2 - Math.round(350 * (canvas.height / 1080)));
  ctx.strokeText("READY", canvas.width / 2 - Math.round(245 * (canvas.width / 2560)), canvas.height / 2 - Math.round(350 * (canvas.height / 1080)));
}

function drawGoMessage() {
  if (!isGameOver) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.round(6 * (canvas.width / 2560));
    ctx.font = "bolder " + Math.round(220 * (canvas.width / 2560)) + "px Arial";
    ctx.textAlign = "start";
    ctx.textBaseline = "middle";
    ctx.fillText("GO", canvas.width / 2 - Math.round(140 * (canvas.width / 2560)), canvas.height / 2 - Math.round(350 * (canvas.height / 1080)));
    ctx.strokeText("GO", canvas.width / 2 - Math.round(140 * (canvas.width / 2560)), canvas.height / 2 - Math.round(350 * (canvas.height / 1080)));
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
    bird.y -= JUMP * speed / resolutionAdjust;
    birdUp.y = bird.y; // Update birdUp's position
  } else {
    bird.y += GRAVITY * speed / resolutionAdjust;
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

// Set up event listeners
document.addEventListener("mouseup", moveDown);
document.getElementById("startButton").addEventListener("mousedown", moveUp);


// Function to move the bird up when a mouse button is pressed
function moveUp(event) {
  if (event.type === "mousedown") {
    handleMoveUp();
  }
}

// Function to move the bird up when a touch event is triggered
function touchMoveUp(event) {
  if (event.type === "touchstart") {
    handleMoveUp();
  }
}

// Function to move the bird down when a touch event ends
function touchEnd(event) {
  if (event.target === "touchend") {
    isMovingUp = false;
  }
}

// Function to move the bird down when the key is released
function moveDown(event) {
  if (event.type === "mouseup") {
    isMovingUp = false;
  }
}

// Common function to handle move up logic
function handleMoveUp() {
  if (isGameOver) {
    return;
  }
  isMovingUp = true;
  if (!isGameStarted && canStartGame) {
    isGameStarted = true;
    startVerticalMovementTimeout();
    buttonSound.play();
    startSound.play();
    startGame();
    pipes = [];
    isGhost = false;
    isInvincible = false;
    isSize = false;
    document.getElementById("startButton").removeEventListener("mousedown", moveUp);

    // Remove existing event listeners
    document.removeEventListener("mousedown", moveUp);
    document.removeEventListener("touchstart", touchMoveUp);

    // Add event listeners based on chosen input only when the start button is pressed
    if (chosenInput === "mouse") {
      document.addEventListener("mousedown", moveUp);
    } else if (chosenInput === "touch") {
      document.addEventListener("touchstart", touchMoveUp);
    }

    // Start the initial star interval with a random spawn rate
    starIntervalId = setInterval(addStar, generateStarSpawnRate());
    ghostIntervalId = setInterval(addGhost, generateGhostSpawnRate());
    coinIntervalId = setInterval(addCoin, AMOUNT_OF_COINS);
    sizeIntervalId = setInterval(addSize, generateSizeSpawnRate());
    reduceGapIntervalId = setInterval(addReduceGap, generateReduceGapSpawnRate());
  }
  // Check if the game is in progress and pipes are actively moving
  if (isGameStarted && pipes.length > 0 && speed > 0 && enableVerticalMovement && isMovingUp) {
    // Play the flap sound
    playFlapSound();
    document.getElementById("backgroundMusic").play();
  }
}

// Set a flag when the game loads indicating that the start button can trigger the game
var canStartGame = false;

// Start the game with a single click when the game loads
document.addEventListener("DOMContentLoaded", function() {
  canStartGame = true;
});

// Set a flag when the start button is pressed
var startButtonPressed = false;
document.getElementById("startButton").addEventListener("click", function() {
  startButtonPressed = true;
});

// Add event listener to prevent game start when clicking on the mouse option
mouseButton.addEventListener("click", function(event) {
  event.stopPropagation();
  startButtonPressed = false; // Reset the start button flag to prevent game start
});

// Add event listener to start the game only when the start button is clicked
document.addEventListener("click", function(event) {
  if (event.target.id === "startButton" && startButtonPressed) {
    canStartGame = true; // Set the game start condition
    startButtonPressed = false; // Reset the start button flag
    handleMoveUp(); // Start the game
  } else {
    canStartGame = false; // Prevent game start
  }
});

/**
 * Starts the game by resetting necessary variables and game state.
 */
function startGame() {
  isGameOver = false;
  bird.y = Math.round(400 * (canvas.height / 1080)); // Reset the bird's position
  pipes = []; // Clear the pipes array
  coins = []; // Clear the coins array
  stars = []; // Clear the stars array
  ghosts = [];
  sizes = [];
  reduceGaps = [];
  clearInterval(reduceGapIntervalId);
  clearInterval(sizeIntervalId);
  clearInterval(starIntervalId);
  clearInterval(ghostIntervalId);
  clearInterval(coinIntervalId);
  score = 0; // Reset the score
  // Hide the logo
  logo.style.display = "none";
  // Display "ready?" message for the first second
  update();
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
    bird.y = 400 * (canvas.height / 1080);
    bird.x = 700 * (canvas.width / 2560);
    birdUp.y = 400 * (canvas.height / 1080);
    birdUp.x = 700 * (canvas.width / 2560);
    birdDown.y = 400 * (canvas.height / 1080);
    birdDown.x = 700 * (canvas.width / 2560);
    birdUp.width = 250 * (canvas.width * resolutionAdjust / 2560);
    birdUp.height = 250 * (canvas.height * resolutionAdjust / 1080);
    birdDown.width = 250 * (canvas.width * resolutionAdjust / 2560);
    birdDown.height = 250 * (canvas.height * resolutionAdjust / 1080);
    HITBOX_RIGHT = -40 * (canvas.width / 2560);
    HITBOX_TOP = -75 * (canvas.height / 1080); 
    HITBOX_BOTTOM = -10 * (canvas.height / 1080); 
    HITBOX_LEFT = 140 * (canvas.width / 2560); 
    pipes = [];
    coins = [];
    isSize = false;
    isReduceGap = false;
    GRAVITY = 0.9 * secondResolutionAdjust
    PIPE_SPEED = 2 / secondResolutionAdjust
    PIPE_GAP = 320 * (canvas.width / 2560);
    gapSize = 500 * (canvas.height / 1080);
    GROUND_SPEED = 2.1 / secondResolutionAdjust
    skyboxSpeed = 2 / resolutionAdjust;
    secondSkyboxSpeed = 16 / resolutionAdjust;
    JUMP = 1.2 * secondResolutionAdjust
    pipeStartSkip = 24;
    sfxButton.style.display = "block";
    musicButton.style.display = "block";
    
    
    // Start the game
    startGame();
  }
}

let isBirdFalling = true;

// Draw the animated bird based on up or down position
function drawDeathAnimation() {
  let birdImage = isBirdFalling ? birdDownImg : birdUpImg;
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
        GRAVITY = 1.6 * secondResolutionAdjust;
        PIPE_SPEED = 0.5 / secondResolutionAdjust;
        GROUND_SPEED = 0.55 / secondResolutionAdjust;
        skyboxSpeed = 0.4 / resolutionAdjust;
        secondSkyboxSpeed = 3 / resolutionAdjust;
        JUMP = -1.6 * secondResolutionAdjust;
        isBirdFalling = true;

        return true; // Collision detected
      }
    }
  }
  return false; // No collision detected
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

var skybox = {
  x: 0,
  y: 0,
  width: Math.round(11486 * (canvas.width / 2560)),
  height: Math.round(1080 * (canvas.height / 1080)),
};

// Preload skybox texture
var skyboxImg = new Image();
skyboxImg.src = 'assets/skybox.png'; 


// Draws the skybox
function drawSkybox() {
  ctx.drawImage(skyboxImg, skybox.x, skybox.y, skybox.width, skybox.height);
  ctx.drawImage(skyboxImg, skybox.x + skybox.width, skybox.y, skybox.width, skybox.height);
}

// Draws the second skybox
var secondSkybox = {
  x: 0,
  y: 750 * (canvas.width / 2560),
  width: Math.round(4000 * (canvas.width / 2560)),
  height: Math.round(600 * (canvas.height / 1080)),
}

var secondSkyboxImg = new Image();
secondSkyboxImg.src = 'assets/second-background.png';

function drawSecondSkybox() {
  ctx.drawImage(secondSkyboxImg, secondSkybox.x, secondSkybox.y, secondSkybox.width, secondSkybox.height);
  ctx.drawImage(secondSkyboxImg, secondSkybox.x + secondSkybox.width, secondSkybox.y, secondSkybox.width, secondSkybox.height);
}

function drawBird() {
  clearTimeout(drawTimeout); // Clear any previously scheduled draw

  if (isMovingUp && bird.y > 0 && !isSize) {
    ctx.drawImage(
      birdUpImg,
      birdUp.x * (canvas.width * resolutionAdjust / 2560),
      birdUp.y * (canvas.height * resolutionAdjust / 1080),
      birdUp.width * (canvas.width / 2560),
      birdUp.height * (canvas.height / 1080)
    );
  } else if (!isMovingUp && bird.y <= canvas.height - bird.height && !isGhost && !isSize) {
    ctx.drawImage(
      birdDownImg,
      birdDown.x * (canvas.width * resolutionAdjust / 2560),
      birdDown.y * (canvas.height * resolutionAdjust / 1080),
      birdDown.width * (canvas.width / 2560),
      birdDown.height * (canvas.height / 1080)
    );
  } else if (isMovingUp && bird.y > 0 && isSize) {
    birdUp.width = 125 * (canvas.width / 2560);
    birdUp.height = 125 * (canvas.height / 1080);
    HITBOX_TOP = -60 * secondResolutionAdjust  * (canvas.height / 1080);
    HITBOX_LEFT = 145/ secondResolutionAdjust * (canvas.width / 2560);
    HITBOX_RIGHT = -120/ secondResolutionAdjust * (canvas.width / 2560);
    if (!isReduceGap){
      HITBOX_BOTTOM = -80 / secondResolutionAdjust * (canvas.height / 1080);
    } else {
      HITBOX_BOTTOM = -150 / secondResolutionAdjust * (canvas.height / 1080);
    }
    ctx.drawImage(
      birdUpImg,
      (birdUp.x + 20) * (canvas.width  / 2560 * resolutionAdjust),
      (birdUp.y + 10) * (canvas.height  / 1080 * resolutionAdjust),
      birdUp.width,
      birdUp.height
    );
  } else if (!isMovingUp && bird.y <= canvas.height - bird.height && isSize && !isGhost) {
    birdDown.width = 125 * (canvas.width / 2560);
    birdDown.height = 125 * (canvas.height / 1080);
    HITBOX_LEFT = 200 / secondResolutionAdjust * (canvas.width  / 2560);
    HITBOX_RIGHT = -120 / secondResolutionAdjust * (canvas.width / 2560);
    HITBOX_TOP = -60 / secondResolutionAdjust * (canvas.height / 1080);
    if (!isReduceGap){
      HITBOX_BOTTOM = -80 / secondResolutionAdjust * (canvas.height / 1080);
    } else {
      HITBOX_BOTTOM = -150 / secondResolutionAdjust * (canvas.height / 1080);
    }

    ctx.drawImage(
      birdDownImg,
      (birdDown.x + 20) * (canvas.width / 2560 * resolutionAdjust),
      (birdDown.y + 10) * (canvas.height / 1080 * resolutionAdjust),
      birdDown.width,
      birdDown.height
    );
  }
}


let isBirdUp = true;

// Draw the animated bird based on up or down position
function drawAnimatedBird() {
  let birdImage = isBirdUp ? birdUpImg : birdDownImg;
  ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

  // Change bird.y position based on isBirdUp
  if (isBirdUp) {
    bird.y -= 8 * (canvas.height / 1080);
  } else {
    bird.y += 6 * (canvas.height / 1080);
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
  document.removeEventListener("mousedown", restartGame);

  // Calculate the width and height of the borderBox
  var borderBoxWidth = 900 * (canvas.width / 2560);
  var borderBoxHeight = 590 * (canvas.height / 1080);

  // Calculate the position of the borderBox
  var borderBoxX = canvas.width / 2 - borderBoxWidth / 2;
  var borderBoxY = canvas.height / 1.81 - borderBoxHeight / 1.81;

  // Display game over message, score, and highscore
  ctx.drawImage(borderBox, borderBoxX, borderBoxY, borderBoxWidth, borderBoxHeight);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black"; // Set the border color
  ctx.lineWidth = Math.round(8 * (canvas.width / 2560)); // Set the border width
  ctx.font = `bolder ${Math.round(80 * (canvas.width / 2560))}px Helvetica`;

  ctx.strokeText(score, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 - (160 * (canvas.height / 1080)));
  ctx.strokeText(matchCoins, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 - (75 * (canvas.height / 1080)));
  ctx.strokeText(`${previousHighscore}`, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 + (15 * (canvas.height / 1080)));
  ctx.strokeText(collectedCoins, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 + (100 * (canvas.height / 1080)));
  ctx.strokeText(`${difficulty}`, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 + (190 * (canvas.height / 1080)));
  ctx.fillText(score, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 - (160 * (canvas.height / 1080)));
  ctx.fillText(matchCoins, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 - (75 * (canvas.height / 1080)));
  ctx.fillText(`${previousHighscore}`, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 + (15 * (canvas.height / 1080)));
  ctx.fillText(collectedCoins, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 + (100 * (canvas.height / 1080)));
  ctx.fillText(`${difficulty}`, canvas.width / 2 + (60 * (canvas.width / 2560)), canvas.height / 2 + (190 * (canvas.height / 1080)));
  // Disable the button temporarily using a timer
var buttonEnabled = false;
setTimeout(function() {
    buttonEnabled = true;
    document.removeEventListener("touchstart", touchMoveUp);
    document.removeEventListener("mousedown", moveUp);
    document.addEventListener("mousedown", restartGame); // Press to continue to main menu
    document.getElementById("startButton").addEventListener("mousedown", moveUp);
    ctx.font = `bolder ${Math.round(70 * (canvas.width / 2560))}px Helvetica`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black"; // Set the border color
    ctx.lineWidth = Math.round(8 * (canvas.width / 2560)); // Set the border width
    ctx.strokeText("Tap screen to restart", canvas.width / 2 - (340 * (canvas.width / 2560)), canvas.height / 2 + (400 * (canvas.height / 1080)));
    ctx.fillText("Tap screen to restart", canvas.width / 2 - (340 * (canvas.width / 2560)), canvas.height / 2 + (400 * (canvas.height / 1080)));
  }, 200); // Change the duration (in milliseconds) to your desired delay
}

//Plays the death sound effect.
function playDeathSound() {
  if (isGameOver) {
    var deathSound = document.getElementById("deathSound");
    deathSound.play();
  }
}


// function playMenuMusic() {
//   var menuMusic = document.getElementById("menuMusic");
//   menuMusic.play();
// }

// Load in the buttons and background. Start background animation.
window.onload = function() {
  drawCollectedCoins();
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

// Reset skybox position when it goes off-screen
if (secondSkybox.x <= -secondSkybox.width) {
  secondSkybox.x = 0;
}

  // Move the ground
  ground.x -= groundSpeed;

  // Move the ceiling
  ceiling.x -= groundSpeed;

  // Move the skybox
  skybox.x -= skyboxSpeed;

  // Move the skybox
  secondSkybox.x -= secondSkyboxSpeed;

  // Check for collision with top border
  if (bird.y < 10 / resolutionAdjust) {
    isGameOver = true; // Set the game over state
    deathSound.play();
    drawBird();
    JUMP = -1.6 
    GRAVITY = 1.6 * secondResolutionAdjust
    document.removeEventListener("mousedown", moveUp)
    document.removeEventListener("touchstart", touchMoveUp)
  }
  
  // Check for collision with bottom border
  if (bird.y + bird.height > canvas.height + 40 / resolutionAdjust) {
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

  if (currentTime > sizePowerUpEndTime) {
    // Power-up has expired, reset effects
    HITBOX_RIGHT = -40 * (canvas.width / 2560);
    HITBOX_TOP = -75 * (canvas.height / 1080); 
    HITBOX_BOTTOM = -10 * (canvas.height / 1080); 
    HITBOX_LEFT = 140 * (canvas.width / 2560); 
    birdUp.width = 250 * (canvas.width * resolutionAdjust / 2560);
    birdUp.height = 250 * (canvas.height * resolutionAdjust / 1080);
    birdDown.width = 250 * (canvas.width * resolutionAdjust / 2560);
    birdDown.height = 250 * (canvas.height * resolutionAdjust / 1080);
    isSize = false;
  }

  if (currentTime > reduceGapPowerUpEndTime && !isSize) {
    PIPE_GAP = 320 * (canvas.height / 1080);
    isReduceGap = false;
    reduceGapSpeedMultiplier = 1;
    HITBOX_BOTTOM = -10 * (canvas.height / 1080);
  }

  if (currentTime > reduceGapPowerUpEndTime && isSize) {
    PIPE_GAP = 320 * (canvas.height / 1080);
  isReduceGap = false;
  reduceGapSpeedMultiplier = 1;
  HITBOX_BOTTOM = -80 * (canvas.height / 1080);
  }


  if (isInvincible) {
    speed = speed * starSpeedMultiplier;
    pipeStartSkip = 0;
    pipes = [];
  }

  if (isGhost) {
    speed = speed * ghostSpeedMultiplier;
  }

  if (isReduceGap && !isSize) {
    PIPE_GAP = 450 * (canvas.height / 1080);
    speed = speed * reduceGapSpeedMultiplier;
    HITBOX_BOTTOM = -80 * (canvas.height / 1080);
  }

  if (isReduceGap && isSize){
    PIPE_GAP = 450 * (canvas.height / 1080);
    speed = speed * reduceGapSpeedMultiplier;
    HITBOX_BOTTOM = -80 * (canvas.height / 1080);
    HITBOX_BOTTOM = -150 / secondResolutionAdjust * (canvas.height / 1080);
    }

  // Check for collision with pipes
  if (checkCollision()) {
    deathSound.play()
    backgroundMusic.pause()
    isGameOver = true; // Set the game over state
}  

   // Clear canvas before drawing new elements each frame
   ctx.clearRect(0, 0, canvas.width * resolutionAdjust, canvas.height * resolutionAdjust);

    // Check if the game is started
    if (!isGameStarted) {
      // Display the logo and buttons
      logo.style.display = "block";
      difficultyButtons.style.display = "block";
      storeButton.style.display = "block";
      startButton.style.display = "block";
      settingsButton.style.display = "block"
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
      settingsButton.style.display = "none"
    }

  // Draw skybox
  drawSkybox();

  // Draw second skybox
  drawSecondSkybox();

  //Spawn in coins
  updateCoins();

  //Spawn in stars
  updateStars();

  //Spawn in ghosts
  updateGhosts();

  //Spawn in Sizes
  updateSizes();

  //Spawn in reduce gap
  updateReduceGaps();

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
  isMovingUp = false;
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
    adjustSpeed();
    if (isGameStarted && !enableVerticalMovement){
    adjustPipeSpawnRate();
    }
    // console.log("fps: " + fps + " (update)")
    // console.log("speed: " + speed + " (update)")
    // console.log("pipe: " + pipeSpawnRate + " (update)")
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

// Start the game
startGame();