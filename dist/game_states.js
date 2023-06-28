  // Set a flag when the game loads indicating that the start button can trigger the game
  var canStartGame = false;
  
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
  });

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


  // Common function to handle move up logic and start the game
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
          GRAVITY = 1.2 * secondResolutionAdjust;
          PIPE_SPEED = 1.5 / secondResolutionAdjust;
          GROUND_SPEED = 1.5 / secondResolutionAdjust;
          skyboxSpeed = 1.5 / resolutionAdjust;
          secondSkyboxSpeed = 8 / resolutionAdjust;
          JUMP = -1.6 * secondResolutionAdjust;
          isBirdFalling = true;
  
          return true; // Collision detected
        }
      }
    }
    return false; // No collision detected
  }

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

function restartGame(event) {
    if (event.type === "mousedown") {
      // Remove the event listener
      document.removeEventListener("mousedown", restartGame);
      // Reset game variables and state
      isMovingUp = false;
      isGameOver = false;
      isGameStarted = false;
      isSize = false;
      isReduceGap = false;
      isInvincible = false;
      isGhost = false;
      isSize = false;
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
      GRAVITY = 0.9 * secondResolutionAdjust
      PIPE_SPEED = 2 / secondResolutionAdjust
      PIPE_GAP = 320 * (canvas.width / 2560);
      gapSize = 500 * (canvas.height / 1080);
      GROUND_SPEED = 2.1 / secondResolutionAdjust
      skyboxSpeed = 2 / resolutionAdjust;
      secondSkyboxSpeed = 8 / resolutionAdjust;
      JUMP = 1.2 * secondResolutionAdjust
      sfxButton.style.display = "block";
      musicButton.style.display = "block";
      pipeStartSkip = 16;
      pipeSpawnNormal = 0.15;
      pipeSpawnHard = 0.26;
      startGame();
      ghostSpeedMultiplier = 1;
      starSpeedMultiplier = 1;
      reduceGapSpeedMultiplier = 1;
    }
  }

