document.addEventListener("DOMContentLoaded", () => {
  const gamesContainer = document.getElementById("games-container");

  // Função para buscar e exibir jogos
  async function fetchGames() {
    try {
      const response = await fetch("data/games.json"); // Caminho para o arquivo JSON
      const data = await response.json(); // Converte a resposta para JSON
      displayGames(data.games); // Passa os jogos para a função de exibição
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  // Função para exibir os jogos na página
  function displayGames(games) {
    games.forEach((game) => {
      const gameElement = document.createElement("div");
      gameElement.className = "game-card";
      gameElement.innerHTML = `
       <img src="${game.image}" alt="${game.title}" />
       <h3>${game.title}</h3>
       <p>${game.description}</p>
       <p class="price">
         <span class="original-price">$${game.original_price}</span>
         <span class="discount-price">$${game.discount_price}</span>
       </p>
       <button>Add to Cart</button>
     `;
      gamesContainer.appendChild(gameElement);
    });
  }

  // Chama a função para buscar e exibir os jogos
  fetchGames();
});
