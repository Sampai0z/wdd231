// Function to fetch member data and display it on the page
async function fetchMembers() {
  try {
    const response = await fetch("data/members.json"); // Ensure path is correct
    const members = await response.json();

    const memberList = document.getElementById("member-list"); // Container for members

    // Clear the container before adding new content
    memberList.innerHTML = "";

    // Loop through each member and create HTML to display it
    members.forEach((member) => {
      // Create a container for each member's card
      const memberCard = document.createElement("div");
      memberCard.classList.add("member-card");

      // Add content to the member card
      memberCard.innerHTML = `
             <img src="images/${member.image}" alt="${
        member.name
      } logo" class="member-logo" />
             <h3>${member.name}</h3>
             <p><strong>Address:</strong> ${member.address}</p>
             <p><strong>Phone:</strong> ${member.phone}</p>
             <p><strong>Website:</strong> <a href="${
               member.website
             }" target="_blank">${member.website}</a></p>
             <p><strong>Membership Level:</strong> ${getMembershipLevel(
               member.membership_level
             )}</p>
             <p><strong>Description:</strong> ${member.description}</p>
         `;

      // Append the card to the member list
      memberList.appendChild(memberCard);
    });
  } catch (error) {
    console.error("Error fetching member data:", error);
  }
}

// Helper function to convert membership level to text
function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return "Member";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "Unknown";
  }
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", fetchMembers);
