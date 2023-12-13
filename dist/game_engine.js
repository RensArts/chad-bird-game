function adjustSpeed() {
  var targetFPS = 7.5; // Define your target FPS
  var minFPS = minimumFpsValue; // Minimum FPS value
  var targetSpeed = difficulty === 'hard' ? speedHard : speedNormal; // Define the base speed for the difficulty level
  var adjustedSpeed = targetSpeed * (targetFPS / Math.max(fps));
  
  var scoreBasedSpeedAdjustment = Math.floor(score / 50); // Increase speed by 10% for every 50 points
  
  var maxSpeedChange = adjustedSpeed * 2.4; // Maximum 10% speed change per frame
  var maxAdjustedSpeed = targetSpeed + maxSpeedChange + scoreBasedSpeedAdjustment;
  var minAdjustedSpeed = targetSpeed - maxSpeedChange + scoreBasedSpeedAdjustment;
  
  adjustedSpeed += (adjustedSpeed * 0.1 * scoreBasedSpeedAdjustment);
  
  // Clamp the adjusted speed within the maximum and minimum limits
  adjustedSpeed = Math.max(minAdjustedSpeed, Math.min(maxAdjustedSpeed, adjustedSpeed));
  
  speed = adjustedSpeed;
}

function adjustPipeSpawnRate() {
  var targetFPS = 7.5; // Define your target FPS
  var minFPS = minimumFpsValue; // Minimum FPS value
  var targetFrameRate = difficulty === 'hard' ? pipeSpawnHard : pipeSpawnNormal; // Define the base speed for the difficulty level
  var adjustedFrameRate = targetFrameRate
  var scoreBasedFrameRateAdjustment = Math.floor(score / 50); // Increase frame rate by 10% for every 50 points

  adjustedFrameRate += (adjustedFrameRate * 0.1 * scoreBasedFrameRateAdjustment);

  pipeSpawnRate = adjustedFrameRate;
}

function adjustSkyboxSpeed() {
  if (difficulty === "hard") {
    skybox.x -= skyboxSpeed * 1.3 * (6 / fps); // Increase the speed for hard difficulty
    secondSkybox.x -= secondSkyboxSpeed * 1.3 * (6 / fps); // Increase the speed for hard difficulty
    } else {
    skybox.x -= skyboxSpeed * (6 / fps);
    secondSkybox.x -= secondSkyboxSpeed * (6 / fps);
    }
}

let isPipesCleared = false;
let stableFpsCounter = 0;

const hideLoadingElement = () => {
  const loadingElement = document.getElementById('loading-element');
  loadingElement.style.display = 'none';
};

function waitForStableFPS(fps, threshold) {
  return new Promise((resolve) => {
    let stable = false;

    const showLoadingElement = () => {
      const loadingElement = document.getElementById('loading-element');
      loadingElement.style.display = 'block';
    };

    const checkFPS = () => {
      if ((fps * 10) >= threshold) {
        stableFpsCounter++;
        if (stableFpsCounter >= 500) {
          stable = true;
          console.log("Fps is stable");
          hideLoadingElement();
          resolve();
          location.reload();
          isFirstLaunch = 1;
          localStorage.setItem("isFirstLaunch", isFirstLaunch.toString());
          console.log("Updated isFirstLaunch in localStorage:", isFirstLaunch);
        }
      } else {
        stableFpsCounter--;
        setTimeout(checkFPS, 100);
        showLoadingElement();
        reloadPage();
        console.log("current counter value: " + stableFpsCounter)
      }
    };

    console.log("fps counter: " + stableFpsCounter)

    timer = setTimeout(() => {
      isFirstLaunch = 0;
      localStorage.setItem("isFirstLaunch", isFirstLaunch.toString());
      location.reload();
    }, 10000);
    
    checkFPS();
  });
}

var thresholdIsSet = false;
let threshold = 0;

//Updates the game state every frame.
function update() {

  // Reset first launch to true to engage loading
  // isFirstLaunch = 0;
  //     localStorage.setItem("isFirstLaunch", isFirstLaunch.toString());
  //     console.log("Updated isFirstLaunch in localStorage:", isFirstLaunch);

  function defineThreshold() {
    return new Promise((resolve) => {
      setTimeout(() => {
          const newThreshold = (fps * 10 - 20)
          resolve(newThreshold);
      }, 5000);
    });
   }
  
  if (isFirstLaunch === 0) {
    defineThreshold().then((newThreshold) => {
      if (threshold === 0 && !thresholdIsSet){
        threshold = newThreshold;
        thresholdIsSet = true;
      }
    });
  }

  console.log("fps: " + (fps * 10))
  console.log ("fps threshold: " + threshold)

  if (threshold > 1 && isFirstLaunch === 0) {
   waitForStableFPS(fps, threshold).then(() => {
   });
  }
  
  adjustSkyboxSpeed();
  
  // Reset skybox position when it goes off-screen
  if (skybox.x <= -skybox.width) {
    skybox.x = 0;
  }
  
  // Reset skybox position when it goes off-screen
  if (secondSkybox.x <= -secondSkybox.width) {
    secondSkybox.x = 0;
  }

  handleVerticalMovement();
  
    // Check for collision with top border
    if (bird.y < 0 / resolutionAdjust) {
      isGameOver = true; // Set the game over state
      drawBird();
      gameOver(); // Call the game over function
      deathSound.play();
      JUMP = -1.6 
      GRAVITY = 1.2 * secondResolutionAdjust
      document.removeEventListener("mousedown", moveUp)
      document.removeEventListener("touchstart", touchMoveUp)
    }
    
    // Check for collision with bottom border
    if (bird.y + bird.height > canvas.height + 80 / resolutionAdjust) {
      gameOver();
      if (userStartedGame && score > 1){
        deathSound.play();
      }
      if (userStartedGame){
        return;
      }
    }

    // Check for collision with pipes
    if (checkCollision()) {
      if (userStartedGame){
        deathSound.play()
      }
      backgroundMusic.pause()
      isGameOver = true; // Set the game over state
  }  
    
    // Check if the current power-up has expired
    var currentTime = Date.now();
    if (currentTime > starPowerUpEndTime) {
      // Power-up has expired, reset effects
      starSpeedMultiplier = 1;
      secondSkyboxSpeed = 15 / resolutionAdjust;
      skyboxSpeed = 4 / resolutionAdjust;
      isInvincible = false;
      clearInterval(powerUpCoinIntervalId); // Clear the current coin interval
    }
    
    if (currentTime > ghostPowerUpEndTime) {
      // Power-up has expired, reset effects
      isGhost = false;
      ghostSpeedMultiplier = 1;
      secondSkyboxSpeed = 15 / resolutionAdjust;
      skyboxSpeed = 4 / resolutionAdjust;
      pipeSpawnNormal = 0.15;
      pipeSpawnHard = 0.26;
    }

    if (currentTime > reduceGapPowerUpEndTime && !isSize) {
      PIPE_GAP = 320 * (canvas.height / 1080);
      isReduceGap = false;
      reduceGapSpeedMultiplier = 1;
      secondSkyboxSpeed = 15 / resolutionAdjust;
      skyboxSpeed = 4 / resolutionAdjust;
      HITBOX_BOTTOM = -10 * (canvas.height / 1080);
    }
  
    if (currentTime > reduceGapPowerUpEndTime && isSize) {
      PIPE_GAP = 320 * (canvas.height / 1080);
    isReduceGap = false;
    reduceGapSpeedMultiplier = 1;
    HITBOX_BOTTOM = -80 * (canvas.height / 1080);
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
  
    if (isInvincible) {
      speed = speed * starSpeedMultiplier;
      secondSkyboxSpeed = 28 / resolutionAdjust;
      skyboxSpeed = 7 / resolutionAdjust;
      pipeStartSkip = 0;
      pipes = [];
      ghosts = [];
      sizes = [];
      reduceGaps = [];
    }
  
    if (isGhost) {
      speed = speed * ghostSpeedMultiplier;
      secondSkyboxSpeed = 21 / resolutionAdjust;
      skyboxSpeed = 6 / resolutionAdjust;
      pipeSpawnNormal = 0.22;
      pipeSpawnHard = 0.42;
        stars = [];
        sizes = [];
        reduceGaps = [];
    }

    if (isSize) {
      stars = [];
      ghosts = [];
      reduceGaps = [];
    }

    if (isReduceGap){
      stars = [];
      ghosts = [];
      sizes = [];
    }
  
    if (isReduceGap && !isSize) {
      PIPE_GAP = 450 * (canvas.height / 1080);
      speed = speed * reduceGapSpeedMultiplier;
      HITBOX_BOTTOM = -80 * (canvas.height / 1080);
      secondSkyboxSpeed = 13 / resolutionAdjust;
      skyboxSpeed = 3.5 / resolutionAdjust;
    }
  
    if (isReduceGap && isSize){
      PIPE_GAP = 450 * (canvas.height / 1080);
      speed = speed * reduceGapSpeedMultiplier;
      HITBOX_BOTTOM = -80 * (canvas.height / 1080);
      HITBOX_BOTTOM = -150 / secondResolutionAdjust * (canvas.height / 1080);
      secondSkyboxSpeed = 13 / resolutionAdjust;
      skyboxSpeed = 3.5 / resolutionAdjust;
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
        return;
        
      } 
      if (isGameStarted && userStartedGame) {
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

    // Draw Bird
    if (enableVerticalMovement && !isGameOver) 
      drawBird();
    if (isGameOver) {
      drawDeathAnimation(); // Call the drawing function when collision is detected
    }
  
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
  
    // Draw the score counter
    if (userStartedGame){
      drawScore();
    }
    
    // Place the video above the game canvas upon game launch
    placeVideoAboveCanvas();

    // Call the drawFPS function
    drawFPS();
    
    // Draw the coin counter
    drawCollectedCoins();
    
    // Draw the message before vertical movement starts and start flying animation
    if (!enableVerticalMovement && isGameStarted){
    drawAnimatedBird();
    isMovingUp = false;
    if (userStartedGame){
      drawReadyMessage();
      }
    }

    var level = score / 50;
    var skyboxSpeedAdjustment = 0.11 * level;
    skyboxSpeed += skyboxSpeed * skyboxSpeedAdjustment;
    secondSkyboxSpeed += secondSkyboxSpeed * skyboxSpeedAdjustment;

    if (score > 0 && score % 50 === 0){
      var displayLevel = Math.floor(level) + 1;
      drawGameSpeedIncreaseMessage(displayLevel);
      playLevelSound();
      adjustSpeed();
    }

    if (score > 0 && score % 50 === 0) {
      if (!isPipesCleared) {
        pipes = [];
        pipeStartSkip = 0;
        isPipesCleared = true;
      }
    } else {
      isPipesCleared = false;
    }
    
    // Check if bird passes pipe and add score
    checkScore();
  
    var currentTime = performance.now();
    var deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    if (!enableVerticalMovement){
        adjustSpeed();
      }
      if (isInvincible || isGhost || isReduceGap || !userStartedGame){
        adjustSpeed();
      }
  
    // Accumulate the elapsed time
    elapsedTime += deltaTime;
  
    // Calculate frames per 100ms
    frameCount++;
    if (elapsedTime >= 100) {
      var framesPer100ms = frameCount / (elapsedTime / 100);
      fps = framesPer100ms.toFixed(1); // Convert framesPer100ms to a string with one decimal place
      frameCount = 0;
      elapsedTime = 0;
      adjustPipeSpawnRate();
      // console.log("speed" + speed)
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

  requestAnimationFrame(update);
  }