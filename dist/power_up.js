  function generateStarSpawnRate() {
    return Math.random() * (maxStarSpawn - minStarSpawn) + minStarSpawn;
  }

  function generateGhostSpawnRate() {
    return Math.random() * (maxGhostSpawn - minGhostSpawn) + minGhostSpawn;
  }
  
  function generateSizeSpawnRate() {
    return Math.random() * (maxSizeSpawn - minSizeSpawn) + minSizeSpawn;
  }

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
        starSpeedMultiplier = 2.5;
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
      ctx.drawImage(ghostImage, ghost.x - ghost.radius, ghost.y - ghost.radius, ghost.radius * COIN_SIZE, ghost.radius * COIN_SIZE);
  
      // Check if the bird collects the coin
      if (bird.x + COIN_HITBOX + bird.width > ghost.x - ghost.radius &&
          bird.x < COIN_HITBOX + ghost.x + ghost.radius &&
          bird.y + COIN_HITBOX + bird.height > ghost.y - ghost.radius &&
          bird.y < COIN_HITBOX + ghost.y + ghost.radius) {
        ghosts.splice(i, 1); // Remove the collected coin from the array
        isGhost = true;
        ghostSpeedMultiplier = 1.45;
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
      ctx.drawImage(reduceGapImage, reduceGap.x - reduceGap.radius, reduceGap.y - reduceGap.radius, reduceGap.radius * COIN_SIZE, reduceGap.radius * COIN_SIZE);
  
      // Check if the bird collects the coin
      if (bird.x + COIN_HITBOX + bird.width > reduceGap.x - reduceGap.radius &&
          bird.x < COIN_HITBOX + reduceGap.x + reduceGap.radius &&
          bird.y + COIN_HITBOX + bird.height > reduceGap.y - reduceGap.radius &&
          bird.y < COIN_HITBOX + reduceGap.y + reduceGap.radius) {
        reduceGaps.splice(i, 1); // Remove the collected coin from the array
        isReduceGap = true;
        reduceGapPowerUpEndTime = Date.now() + reduceGapPowerUpDuration;
        reduceGapSpeedMultiplier = 0.83;
        // Apply power-up effects
        reduceGapSound.play();
        clearInterval(reduceGapIntervalId);
        reduceGapIntervalId = setInterval (addReduceGap, generateReduceGapSpawnRate());
        }
    }
  }