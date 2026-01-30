const buttons = document.querySelectorAll("header > button");
const validIDs = ["home-01","home-02","home-03","about-01","about-02","about-03",
  "contact-01","contact-02","blog-01","blog-02","delete-data-01","delete-data-02",
  "privacy-01","privacy-02","terms-01","terms-02"];

const imgEl = document.getElementById("website-img");

document.addEventListener("click", (e) => {
  if (!validIDs.includes(e.target.id)) return;

  // Update image
  imgEl.src = `./images/${e.target.id}.png`;

  // Clear previous active
  buttons.forEach(btn => btn.classList.remove("active"));

  // Set new active
  e.target.classList.add("active");
});