var skyboxImg = new Image();
skyboxImg.src = 'assets/skybox.png'; 

var secondSkyboxImg = new Image();
secondSkyboxImg.src = 'assets/second-background.png';

var pipeImage = new Image();
pipeImage.src = 'assets/pipeTexture.png';

  
var image = new Image();
image.src = "assets/coin-box.png"; 

var borderBox = new Image();
borderBox.src = "assets/borderBox.png";  

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

if (image.complete) {
    // The image is already loaded, call drawCollectedCoins immediately
    drawCollectedCoins();
  } else {
    // Wait for the image to load
    image.addEventListener("load", function() {
      drawCollectedCoins();
    });
  }

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
  
function drawSecondSkybox() {
    ctx.drawImage(secondSkyboxImg, secondSkybox.x, secondSkybox.y, secondSkybox.width, secondSkybox.height);
    ctx.drawImage(secondSkyboxImg, secondSkybox.x + secondSkybox.width, secondSkybox.y, secondSkybox.width, secondSkybox.height);
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