
//Arrays
var flapSounds = [];
var coinSounds = [];
var coins = [];
var pipes = [];
var stars = [];
var ghosts = [];
var sizes = [];
var reduceGaps = [];

// Constants
const PIPE_PASSED = canvas.width * resolutionAdjust * 0.0781;
const PIPE_WIDTH = canvas.width * resolutionAdjust * 0.0508;
const PIPE_COLOR_TOP = "black";
const PIPE_COLOR_BOTTOM = "black";
const COIN_SIZE = canvas.width * resolutionAdjust * 0.0006;
const COIN_SPEED = 2.5 / secondResolutionAdjust; // Adjust the speed of the coin
const STAR_SPEED = 3 / secondResolutionAdjust; // Adjust the speed of the stars
const countDown = 2950; // time before game starts in ms

// Variables
let selectedButton = null;
let coinIntervalId;
let powerUpCoinIntervalId;
let starIntervalId;
let ghostIntervalId;
let sizeIntervalId;
let reduceGapIntervalId;

var HITBOX_RIGHT = -40 * (canvas.width / 2560);
var HITBOX_TOP = -75 * (canvas.height / 1080); 
var HITBOX_BOTTOM = -10 * (canvas.height / 1080); 
var HITBOX_LEFT = 140 * (canvas.width / 2560); 
var COIN_HITBOX = 0;

var PIPE_SPEED = 2 / secondResolutionAdjust; //Adjust the speed of the pipes
var skyboxSpeed = 4 / resolutionAdjust; // Adjust the speed of the skybox
var secondSkyboxSpeed = 15 / resolutionAdjust; // Adjust the speed of the second skybox
var speed = 7 / secondResolutionAdjust; // Variable to increment speed in function Update();
var speedNormal = 7 / secondResolutionAdjust; // set this value if changing the speed of normal difficulty in function
var speedHard = 9 / secondResolutionAdjust; // set this value if changing the speed of hard difficulty in function

var JUMP = 1.2 * secondResolutionAdjust;// Adjust the value of upward momentum
var GRAVITY = 0.9 * secondResolutionAdjust; // Adjust this value to control the downward speed of the bird

var pipeStartSkip = 16; // amount of pipes that won't be rendered at the start (2 = 1 pipe)
var pipeSpawnRate = 0.3; // set spawn rate for the pipes (higher = more pipes)
var pipeSpawnNormal = 0.15; // set this value if changing the pipespawnrate of hard difficulty in function
var pipeSpawnHard = 0.26; // set this value if changing the pipe spawn rate of normal difficulty in function
var PIPE_GAP = 320 * (canvas.height / 1080); // Adjust this value to control the gap of the spawn pipes
var gapSize = 500 * (canvas.height / 1080); // Consistent gap size

var score = 0; // Variable to keep track of the score
var collectedCoins = 0; // Variable to keep track of collected coins
var matchCoins = 0; // Variable to keep track of coins collected in single match
var groundSpeed = 0; // Track the speed of the ground movement

var AMOUNT_OF_COINS = 3000; // Adjust the amount of coins spawned
var powerUpCoinSpawnRate = 300; // Spawn rate of coins during power-up (in milliseconds)
var minStarSpawn = 8000; // Minimum spawn rate in milliseconds (20 seconds)
var maxStarSpawn = 35000; // Maximum spawn rate in milliseconds (40 seconds)
var minGhostSpawn = 10000; // Minimum spawn rate in milliseconds (20 seconds)
var maxGhostSpawn = 30000; // Maximum spawn rate in milliseconds (40 seconds)
var minSizeSpawn = 10000; // Minimum spawn rate in milliseconds (20 seconds)
var maxSizeSpawn = 32000; // Maximum spawn rate in milliseconds (40 seconds)
var minReduceGapSpawn = 10000; // Minimum spawn rate in milliseconds (20 seconds)
var maxReduceGapSpawn = 35000; // Maximum spawn rate in milliseconds (40 seconds)

var starPowerUpDuration = 5000; // Duration of power-ups in milliseconds 
var ghostPowerUpDuration = 5000;  // Duration of power-ups in milliseconds
var sizePowerUpDuration = 10000; // Duration of power-ups in milliseconds
var reduceGapPowerUpDuration = 5000; // duration of the power up

var starSpeedMultiplier = 1; // Initial speed multiplier
var ghostSpeedMultiplier = 1;
var reduceGapSpeedMultiplier = 1;

var isInvincible = false; // Initial invincibility state
var isGhost = false; // Initial ghost state
var isSize = false; // Initial size state
var isReduceGap = false; // initial gap size state

var starPowerUpEndTime = 0; // Time when the current power-up will end
var ghostPowerUpEndTime = 0; // Time when the current power-up will end
var sizePowerUpEndTime = 0; // Time when the current power-up will end
var reduceGapPowerUpEndTime = 0; // Time when the current power up will end

var isMovingUp = false; // Track if bird is moving up
var isGameStarted = false;
var isGameOver = false; // Track if the game is over
var isMusicOn = true; // Initial state of the background music
var isSfxOn = true; // Initial state of the SFX

var frameCounter = 0; // set counter for pipe update interval
var framesPerPipe = 0; // set default value for pipe update interval 1ps/75fps
var minFramesPerPipe = 0.1; // set minimum spawn time for the pipes 200ms/30fps

var minimumFpsValue = 3; // if framerate drops below 30fps, it will register as 30fps
var frameCount = 0; // set counter for game speed update interval
var fps = 0; // set default value for game speed update interval
var lastTime = performance.now(); // counts frames in update
var elapsedTime = 0; // set counter for game speed update interval

var logo = document.getElementById("logo");

// Create a flag to track whether the assets have been loaded
var assetsLoaded = false;

// Load in the buttons and background. Start background animation.
window.onload = function() {

  if (!assetsLoaded) {
    preload();
    assetsLoaded = true;
  }

  createMusicButton();
  createSfxButton();

  const video = document.getElementById("gameVideo");
  video.src = "assets/hell.mp4";
  video.muted = true; // Mute the video
  video.preload = "auto"; // Preload the video

  video.onloadeddata = function() {
    video.play();
    drawCollectedCoins();
  };
};

function saveHighscore(score, difficulty) {
  localStorage.setItem(`highscore_${difficulty}`, score);
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



