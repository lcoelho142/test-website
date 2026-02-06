const desktopSource = document.getElementById("desktop-source");
const imgEl = document.getElementById("website-img");
const errorMsg = document.getElementById("desktop-error-msg"); // Move this to the top

const validIDs = [
  "home-figma", "about-figma", "contact-figma", "blog-figma", "delete-data-figma", "privacy-figma", "terms-figma", "home-revised-01", "about-revised-01", "v1-home-01", "v1-home-02", "v1-home-03", "v1-about-01", "v1-about-02", "v1-about-03", "v1-contact-01", "v1-contact-02",
  "v1-blog-01", "v1-blog-02", "v1-delete-data-01", "v1-delete-data-02",
  "v1-privacy-01", "v1-privacy-02", "v1-terms-01", "v1-terms-02"
];

// --- Default on refresh ---
const defaultBtn = document.getElementById("home-figma");
const defaultParent = document.querySelector('.parent-btn[data-target="draft-3"]');
const defaultContainer = document.getElementById("draft-3");

if (defaultBtn) defaultBtn.classList.add("active");
if (defaultParent) defaultParent.classList.add("active");
if (defaultContainer) defaultContainer.classList.remove("hidden");

// Initial Image Setup
imgEl.src = "./images/home-figma.png";
if (desktopSource) {
  desktopSource.srcset = "./images/home-figma-desktop.png";
}

// Event Listener
document.addEventListener("click", (e) => {
  // 1. Parent Button Logic
  if (e.target.classList.contains("parent-btn")) {
    const targetId = e.target.getAttribute("data-target");
    const targetContainer = document.getElementById(targetId);

    const isAlreadyActive = e.target.classList.contains("active");

    document.querySelectorAll(".child-buttons").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll(".parent-btn").forEach(btn => btn.classList.remove("active"));

    if (!isAlreadyActive && targetContainer) {
      targetContainer.classList.remove("hidden");
      e.target.classList.add("active");
    }

    return;
  }

  // 2. Child Button Logic
  if (validIDs.includes(e.target.id)) {
    const id = e.target.id;

    // Reset error message on every new click
    if (errorMsg) errorMsg.classList.add("hidden");

    // Update Mobile Image
    imgEl.src = `./images/${id}.png`;

    // Update Desktop Image with Error Handling
    if (desktopSource) {
      const desktopUrl = `./images/${id}-desktop.png`;
      const tempImg = new Image();
      
      tempImg.onload = () => {
        desktopSource.srcset = desktopUrl;
        if (errorMsg) errorMsg.classList.add("hidden");
      };

      tempImg.onerror = () => {
        desktopSource.srcset = ""; // Clears desktop so it falls back to mobile img
        // Only show error if the user is actually on a desktop-sized screen
        if (window.innerWidth >= 768 && errorMsg) {
          errorMsg.classList.remove("hidden");
        }
      };

      tempImg.src = desktopUrl; // Trigger the load
    }

    // Active State for Child Buttons
    document.querySelectorAll(".child-buttons button").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
  }
});