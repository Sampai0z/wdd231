// Toggle button functionality
const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");
const memberList = document.getElementById("member-list");

// When the "Grid View" button is clicked
gridButton.addEventListener("click", () => {
  // Add grid view class, remove list view class
  memberList.classList.add("grid");
  memberList.classList.remove("list");

  // Make the grid button active
  gridButton.classList.add("active");
  listButton.classList.remove("active");
});

// When the "List View" button is clicked
listButton.addEventListener("click", () => {
  // Add list view class, remove grid view class
  memberList.classList.add("list");
  memberList.classList.remove("grid");

  // Make the list button active
  listButton.classList.add("active");
  gridButton.classList.remove("active");
});

// Function to fetch member data
async function fetchMembers() {
  try {
    const response = await fetch("data/members.json"); // Change path if needed
    const members = await response.json();

    // Render member cards
    members.forEach((member) => {
      console.log(member.name);
      const card = document.createElement("section");
      card.classList.add("grid");
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
       `;
      memberList.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

// Fetch members when page loads
document.addEventListener("DOMContentLoaded", fetchMembers);

// Discover Page
const currentTime = Date.now(); // Tempo atual em milissegundos
const lastVisit = localStorage.getItem("lastVisit"); // Recupera o valor do localStorage
const sidebar = document.querySelector(".sidebar");
let message;

if (!lastVisit) {
  // Caso seja a primeira visita
  message = "Welcome! Let us know if you have any questions.";
  localStorage.setItem("lastVisit", currentTime); // Armazena o horário atual
} else {
  // Calcula os dias desde a última visita
  const daysSinceLastVisit = Math.floor(
    (currentTime - lastVisit) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceLastVisit < 1) {
    message = "Back so soon! Awesome!";
  } else {
    message = `You last visited ${daysSinceLastVisit} day${
      daysSinceLastVisit > 1 ? "s" : ""
    } ago.`;
  }

  // Atualiza o horário da última visita no localStorage
  localStorage.setItem("lastVisit", currentTime);
}

// Adicione a mensagem ao início da sidebar
const messageDiv = document.createElement("div");
messageDiv.textContent = message;
messageDiv.style.marginBottom = "1rem";
sidebar.insertBefore(messageDiv, sidebar.firstChild);
