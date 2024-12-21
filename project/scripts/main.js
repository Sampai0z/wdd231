document.addEventListener("DOMContentLoaded", () => {
  const mainHeading = document.querySelector("main h1");
  if (mainHeading) {
    mainHeading.textContent = "Welcome to the Ultimate Video Game Store";
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Example of fetching data from a local JSON file
  async function fetchGames() {
    try {
      const response = await fetch("data/data.json");
      const games = await response.json();
      displayGames(games);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  // Example of displaying games dynamically
  function displayGames(games) {
    const gamesContainer = document.getElementById("games-container");
    games.forEach((game) => {
      const gameElement = document.createElement("div");
      gameElement.className = "game";
      gameElement.innerHTML = `
       <h2>${game.title}</h2>
       <p>${game.description}</p>
       <p>Price: $${game.price}</p>
       <button>Add to Cart</button>
     `;
      gamesContainer.appendChild(gameElement);
    });
  }

  fetchGames();
});
