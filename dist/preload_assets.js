function preload() {
  // Show the splash screen
  showSplashScreen();
  startButton.style.display = "none";
  backgroundMusic.pause();

  // Load the skybox image
  skyboxImg = new Image();
  skyboxImg.src = 'assets/skybox.png';

  // Load the second skybox image
  secondSkyboxImg = new Image();
  secondSkyboxImg.src = 'assets/second-background.png';

  // Load the pipe texture image
  pipeImage = new Image();
  pipeImage.src = 'assets/pipeTexture.png';

  // Load the coin box image
  image = new Image();
  image.src = 'assets/coin-box.png';

  // Load the border box image
  borderBox = new Image();
  borderBox.src = 'assets/borderBox.png';

  // Load the coin image
  coinImage = new Image();
  coinImage.src = 'assets/coin.png';

  // Load the star image
  starImage = new Image();
  starImage.src = 'assets/star.png';

  // Load the ghost image
  ghostImage = new Image();
  ghostImage.src = 'assets/ghost.png';

  // Load the size image
  sizeImage = new Image();
  sizeImage.src = 'assets/size.png';

  // Load the reduce gap image
  reduceGapImage = new Image();
  reduceGapImage.src = 'assets/reduceGap.png';

  // Load the audio elements for game sounds
  coinSound = new Audio ('assets/coin-sound.mp3');
  levelSound = new Audio('assets/level-sound.mp3');
  backgroundMusic = new Audio('assets/background-music.mp3');
  storeMusic = new Audio('assets/store-music.mp3');
  deathSound = new Audio('assets/death-sound.mp3');
  starSound = new Audio('assets/star-sound.mp3');
  ghostSound = new Audio('assets/ghost-sound.mp3');
  sizeSound = new Audio('assets/size-sound.mp3');
  reduceGapSound = new Audio('assets/reduce-gap-sound.mp3');
  
  // Check if all the assets are loaded
  var assetsLoaded = 0;
  var totalAssets = 19; 

  function checkAllAssetsLoaded() {
    assetsLoaded++;
    if (assetsLoaded === totalAssets) {
      hideSplashScreen();
    }
  }

  // Check if the skybox image is loaded
  skyboxImg.addEventListener('load', checkAllAssetsLoaded);

  // Check if the second skybox image is loaded
  secondSkyboxImg.addEventListener('load', checkAllAssetsLoaded);

  // Check if the pipe texture image is loaded
  pipeImage.addEventListener('load', checkAllAssetsLoaded);

  // Check if the coin box image is loaded
  image.addEventListener('load', checkAllAssetsLoaded);

  // Check if the border box image is loaded
  borderBox.addEventListener('load', checkAllAssetsLoaded);

  // Check if the coin image is loaded
  coinImage.addEventListener('load', checkAllAssetsLoaded);

  // Check if the star image is loaded
  starImage.addEventListener('load', checkAllAssetsLoaded);

  // Check if the ghost image is loaded
  ghostImage.addEventListener('load', checkAllAssetsLoaded);

  // Check if the size image is loaded
  sizeImage.addEventListener('load', checkAllAssetsLoaded);

  // Check if the reduce gap image is loaded
  reduceGapImage.addEventListener('load', checkAllAssetsLoaded);

  // Check if the audio elements are loaded
  coinSound.addEventListener('loadeddata', checkAllAssetsLoaded);
  levelSound.addEventListener('loadeddata', checkAllAssetsLoaded);
  backgroundMusic.addEventListener('loadeddata', checkAllAssetsLoaded);
  storeMusic.addEventListener('loadeddata', checkAllAssetsLoaded);
  deathSound.addEventListener('loadeddata', checkAllAssetsLoaded);
  starSound.addEventListener('loadeddata', checkAllAssetsLoaded);
  ghostSound.addEventListener('loadeddata', checkAllAssetsLoaded);
  sizeSound.addEventListener('loadeddata', checkAllAssetsLoaded);
  reduceGapSound.addEventListener('loadeddata', checkAllAssetsLoaded);
}

// Function to show the splash screen
function showSplashScreen() {
  // Create and style the splash screen element
  var splashScreen = document.createElement('div');
  splashScreen.id = 'splash-screen';
  splashScreen.style.position = 'fixed';
  splashScreen.style.top = '0';
  splashScreen.style.left = '0';
  splashScreen.style.width = '100%';
  splashScreen.style.height = '100%';
  splashScreen.style.background = 'black';
  splashScreen.style.color = 'white';
  splashScreen.style.display = 'flex';
  splashScreen.style.justifyContent = 'bottom';
  splashScreen.style.alignItems = 'center';

  // Append the splash screen to the document body
  document.body.appendChild(splashScreen);
}

// Function to hide the splash screen
function hideSplashScreen() {
  setTimeout(function() {
    var splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      splashScreen.remove();
      startButton.style.display = "block";
    }
  }, 0); // Set the timeout duration in milliseconds (3 seconds in this case)
}


