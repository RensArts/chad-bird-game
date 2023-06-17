const canvas = document.getElementById("storeCanvas");
const video = document.getElementById("storeVideo");

// Create Audio objects for each sound
const buttonSound = new Audio("assets/button-sound.mp3");

// Function to resize the video and canvas
function resizeElements() {
  // Resize the video
  video.style.width = canvas.clientWidth + "px";
  video.style.height = canvas.clientHeight + "px";

  // Resize the canvas
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

// Resize the video and canvas on window resize
window.addEventListener("resize", resizeElements);

// Starts the video once the store is opened
window.onload = function() {
  resizeElements();
  video.src = "assets/hell.mp4";
  video.play();

  // Check if there are purchased skins in local storage
  const purchasedSkins = JSON.parse(localStorage.getItem("purchasedSkins")) || [];
  const equippedSkin = localStorage.getItem("equippedSkin");

  // Find all the purchase buttons
  const purchaseButtons = document.querySelectorAll(".purchase-button");

  // Loop through each purchase button
  purchaseButtons.forEach(function(button) {
    const skinName = button.parentNode.querySelector("img").alt;

    if (purchasedSkins.includes(skinName)) {
      // Skin is purchased but not equipped
      button.innerText = "Equip";
      button.disabled = false;

      if (equippedSkin === skinName) {
        // Skin is equipped
        button.classList.add("equipped");
        button.disabled = false;
        button.innerText = "Remove";
      }
    }
  });

  // Update the coin count display
  const availableCoins = parseInt(localStorage.getItem("coins")) || 0;
  updateCoinCount(availableCoins);
};

// Button to go back to the game
document.getElementById("backButton").addEventListener("click", goBackToIndex);

function goBackToIndex() {
  window.location.href = "../dist/index.html";
}

// Get all purchase buttons on the page
const purchaseButtons = document.querySelectorAll(".purchase-button");

// Loop through each purchase button
purchaseButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    buttonSound.play();
    // Get the price and skin name
    const skinPrice = parseInt(this.parentNode.querySelector("p").innerText.split("$")[1]);
    const skinName = this.parentNode.querySelector("img").alt;

    // Check if the player has already purchased the skin
    var purchasedSkins = JSON.parse(localStorage.getItem("purchasedSkins")) || [];
    if (purchasedSkins.includes(skinName)) {
      // Skin is already purchased, so toggle its equipped status
      if (this.classList.contains("equipped")) {
        // Skin is currently equipped, so unequip it
        localStorage.removeItem("equippedSkin");
        this.innerText = "Equip";
        this.classList.remove("equipped");
        this.disabled = false;
      } else {
        // Skin is not equipped, so equip it
        const prevEquippedSkinButton = document.querySelector(".equipped");
        if (prevEquippedSkinButton) {
          // Unequip the previously equipped skin
          const prevEquippedSkinName = prevEquippedSkinButton.parentNode.querySelector("img").alt;
          prevEquippedSkinButton.innerText = "Equip";
          prevEquippedSkinButton.classList.remove("equipped");
          purchasedSkins.push(prevEquippedSkinName);
        }

        localStorage.setItem("equippedSkin", skinName);
        this.innerText = "Remove";
        this.classList.add("equipped");
        this.disabled = false; // Enable the button to allow unequipping
      }
    } else {
      // Skin is not purchased yet, proceed with the purchase logic

      // Check if the player has enough coins
      let availableCoins = parseInt(localStorage.getItem("coins")) || 0;
      if (availableCoins >= skinPrice) {
        // Purchase the skin
        // Subtract the price from the available coins
        availableCoins -= skinPrice;
        // Save the updated coins to local storage
        localStorage.setItem("coins", availableCoins);
        // Update the coin count display
        updateCoinCount(availableCoins);
        // Display a success message
        showAlert("Purchased successfully!", "success");

        // Add the skin to the purchased skins array
        purchasedSkins.push(skinName);
        // Save the updated purchased skins to local storage
        localStorage.setItem("purchasedSkins", JSON.stringify(purchasedSkins));

        // Change the button text to "Equip" and enable it
        this.innerText = "Equip";
        this.disabled = false;

        // Save the equipped skin to local storage if it's equipped
        if (this.classList.contains("equipped")) {
          localStorage.setItem("equippedSkin", skinName);
        }
      } else {
        // Display an alert that the player doesn't have enough funds
        showAlert("Not enough coins!", "error");
      }
    }
  });
});

function updateCoinCount(count) {
  const coinCountElement = document.getElementById("coinCount");
  coinCountElement.innerText = count;
}

function showAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.innerText = message;
  alertBox.classList.add("alert");

  if (type) {
    alertBox.classList.add(type);
  }

  const alertContainer = document.getElementById("alertContainer");
  alertContainer.appendChild(alertBox);

  setTimeout(function() {
    alertBox.remove();
  }, 3000);
}
