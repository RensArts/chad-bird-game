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
  } else {
    button.classList.add("0.5");
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
var showFPS = localStorage.getItem("showFPS") || "true";
showFPSButton.setAttribute("data-value", showFPS);
if (showFPS === "true") {
  showFPSButton.classList.add("selected");
} else {
  showFPSButton.classList.remove("selected");
}

// Set the initial state of the "pipeTexture" button
var showTextures = localStorage.getItem("pipeTexture") || "true";
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
    document.removeEventListener("mouseup", moveDown)
    document.addEventListener("touchstart", touchMoveUp);
    document.addEventListener("touchend", moveDown)
    
  } else if (chosenInput === "mouse") {
    document.removeEventListener("touchstart", touchMoveUp);
    document.removeEventListener("touchend", moveDown)
    document.addEventListener("mousedown", moveUp);
    document.addEventListener("mouseup", moveDown)
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

