fetch(
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Leiria?unitGroup=metric&key=ENJJGWEHVLF7KW7T7R5YSJFGL&contentType=json"
)
  .then((response) => response.json())
  .then((data) => {
    // Current weather information
    const temp = data.currentConditions.temp;
    const description = data.currentConditions.conditions;

    // Display current weather
    document.getElementById(
      "weather-info"
    ).textContent = `Current Temperature: ${temp}°C`;
    document.getElementById(
      "weather-description"
    ).textContent = `Weather: ${description}`;

    // Display 3-day forecast
    const forecast = data.days.slice(0, 3); // Get first 3 days of forecast
    const forecastList = document.getElementById("forecast-list");

    forecast.forEach((day) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
       <strong>${day.datetime}</strong>: 
       High ${day.tempmax}°C, Low ${day.tempmin}°C - ${day.conditions}
     `;
      forecastList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error(error);
    document.getElementById("weather-info").textContent =
      "Unable to fetch weather data.";
  });

// Members

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json"); // Ajuste o caminho, se necessário
    if (!response.ok) {
      throw new Error("Falha ao buscar os dados dos membros");
    }
    const members = await response.json();
    return members;
  } catch (error) {
    console.error(error);
    alert("Não foi possível buscar os dados dos membros.");
    return []; // Retorna um array vazio em caso de erro
  }
}

function getRandomMembers(members, count = 3) {
  const shuffled = members.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function displaySpotlights(spotlightMembers) {
  const spotlightContainer = document.getElementById("spotlight-container");
  spotlightContainer.innerHTML = ""; // Limpar os spotlights existentes

  spotlightMembers.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="images/${member.image}"s alt="${
      member.name
    } Logo" class="spotlight-logo">
      <h3>${member.name}</h3>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${
        member.website
      }" target="_blank">${member.website}</a></p>
      <p><strong>Membership Level:</strong> ${
        member.membership_level === 1
          ? "Gold"
          : member.membership_level === 2
          ? "Silver"
          : "Standard"
      }</p>
      <p><strong>Description:</strong> ${member.description}</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

window.onload = async function () {
  const members = await fetchMembers();
  if (members && members.length > 0) {
    const filteredMembers = members.filter(
      (member) => member.membership_level === 1 || member.membership_level === 2
    );
    if (filteredMembers.length > 0) {
      const spotlightMembers = getRandomMembers(filteredMembers, 3);
      displaySpotlights(spotlightMembers);
    } else {
      console.log("Nenhum membro com nível 'Gold' ou 'Silver' encontrado.");
    }
  } else {
    console.log("Nenhum membro encontrado.");
  }
};
