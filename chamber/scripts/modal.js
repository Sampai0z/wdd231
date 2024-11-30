document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".membership-cards a");
  const closeButtons = document.querySelectorAll(".modal .close");

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetModal = document.querySelector(link.getAttribute("href"));
      if (targetModal) {
        targetModal.style.display = "block";
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  window.addEventListener("click", function (event) {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});
