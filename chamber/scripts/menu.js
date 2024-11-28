document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("menu").classList.toggle("show");
});

function toggleView() {
  const memberList = document.getElementById("member-list");
  if (memberList.classList.contains("grid-view")) {
    memberList.classList.remove("grid-view");
    memberList.classList.add("list-view");
  } else {
    memberList.classList.remove("list-view");
    memberList.classList.add("grid-view");
  }
}
