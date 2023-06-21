var difficulty = "normal"; // Default difficulty level

function initializeGame() {
  const selectedDifficulty = getDifficulty();
  if (selectedDifficulty === 'normal') {
    document.getElementById('normalButton').click();
  } else if (selectedDifficulty === 'hard') {
    document.getElementById('hardButton').click();
  }
}

// Get the selected difficulty from localStorage
function getDifficulty() {
    return localStorage.getItem('selectedDifficulty');
  }
  
  function setDifficulty(selectedDifficulty) {
    localStorage.setItem('selectedDifficulty', selectedDifficulty);
    difficulty = selectedDifficulty;
  
    // Clear the existing coin interval
    clearInterval(coinIntervalId);
  
    // Remove the selected class from the previously selected button
    if (selectedButton) {
      selectedButton.classList.remove('selected');
      buttonSound.play();
    }
  
    // Adjust the game constants based on the selected difficulty level
    switch (selectedDifficulty) {
      case "normal":
        speed = speedNormal;
        pipeSpawnRate = pipeSpawnNormal;
        AMOUNT_OF_COINS = 3000; // Set the appropriate value for normal difficulty
        coinIntervalId = setInterval(addCoin, AMOUNT_OF_COINS);
        selectedButton = document.getElementById('normalButton');
        break;
      case "hard":
        speed = speedHard;
        pipeSpawnRate = pipeSpawnHard;
        AMOUNT_OF_COINS = 1500; // Set the appropriate value for hard difficulty
        coinIntervalId = setInterval(addCoin, AMOUNT_OF_COINS);
        selectedButton = document.getElementById('hardButton');
        break;
      // Add additional cases for other difficulty levels if desired
    }
  
    // Add the selected class to the newly selected button
    selectedButton.classList.add('selected');
  }
  
  function initializeGame() {
    const selectedDifficulty = getDifficulty();
    if (selectedDifficulty === 'normal') {
      document.getElementById('normalButton').click();
    } else if (selectedDifficulty === 'hard') {
      document.getElementById('hardButton').click();
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
  });