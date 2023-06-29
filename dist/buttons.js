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
  
  

  
  