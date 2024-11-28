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
      const card = document.createElement("section");
      card.classList.add("grid");
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership Level:</strong> ${member.membership_level}</p>
        <p>${member.description}</p>
      `;
      memberList.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

// Fetch members when page loads
document.addEventListener("DOMContentLoaded", fetchMembers);
