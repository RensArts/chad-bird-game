// Default skin paths
var birdUpImg = new Image();
birdUpImg.src = "assets/birdUp.png";
var birdDownImg = new Image();
birdDownImg.src = "assets/birdDown.png";

var equippedSkin = localStorage.getItem("equippedSkin");

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

let isBirdFalling = true;

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

let isBirdUp = true;

// Draw the animated bird based on up or down position
function drawAnimatedBird() {
  let birdImage = isBirdUp ? birdUpImg : birdDownImg;
  ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

  // Change bird.y position based on isBirdUp
  if (isBirdUp) {
    bird.y -= 6 * (canvas.width / 2560);
  } else {
    bird.y += 6 * (canvas.width / 2560);
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


var drawTimeout = null;

// Call this function to enable vertical movement after a timeout
function enableVerticalMovementAfterTimeout() {
  enableVerticalMovement = true;
}

// Call this function when you want to start the timeout
function startVerticalMovementTimeout() {
  enableVerticalMovement = false; // Disable vertical movement initially
  setTimeout(enableVerticalMovementAfterTimeout, countDown); // Enable vertical movement after 1 second
}

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