// ============================
// Treasure King - Script
// Matches folder structure:
// ./assets/products/p1.jpeg ... p10.jpeg
// ============================

const STORE_ADDRESS = "228-05 Linden Blvd, Jamaica, NY 11411";
const GMAPS_DEST = encodeURIComponent(STORE_ADDRESS);

// Build directions links
const gmapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${GMAPS_DEST}&travelmode=driving`;

// Elements
const yearEl = document.getElementById("year");
const dealsGrid = document.getElementById("dealsGrid");
const directionsBtn = document.getElementById("directionsBtn");
const floatNav = document.getElementById("floatNav");

const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

// Footer year
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Inject 10 product cards (p1..p10)
const products = Array.from({ length: 10 }, (_, i) => ({
  name: `Product deal ${i + 1}`,
  src: `./assets/products/p${i + 1}.jpeg`
}));

if (dealsGrid) {
  dealsGrid.innerHTML = products.map((p) => `
    <div class="deal-card">
      <img src="${p.src}" alt="${p.name}" loading="lazy" />
      <div class="deal-caption">${p.name}</div>
    </div>
  `).join("");
}

// Directions buttons
function openDirections() {
  window.open(gmapsRouteUrl, "_blank", "noopener");
}

if (directionsBtn) {
  directionsBtn.href = gmapsRouteUrl;
  directionsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openDirections();
  });
}

if (floatNav) {
  floatNav.href = gmapsRouteUrl;
  floatNav.addEventListener("click", (e) => {
    e.preventDefault();
    openDirections();
    // Auto-hide after first tap
    floatNav.style.display = "none";
    localStorage.setItem("tk_nav_clicked", "1");
  });
}

// Show floating nav on mobile, hide when in location section
function isMobile() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function updateFloatingNavVisibility() {
  if (!floatNav) return;

  // If user already clicked once, keep hidden
  if (localStorage.getItem("tk_nav_clicked") === "1") {
    floatNav.style.display = "none";
    return;
  }

  if (!isMobile()) {
    floatNav.style.display = "none";
    return;
  }

  const locationSection = document.getElementById("location");
  if (!locationSection) {
    floatNav.style.display = "block";
    return;
  }

  const rect = locationSection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.25;

  // Hide if viewing location section, otherwise show
  floatNav.style.display = inView ? "none" : "block";
}

// Pulse animation the first time it appears
function addPulseOnce() {
  if (!floatNav) return;
  if (localStorage.getItem("tk_nav_pulsed") === "1") return;

  floatNav.animate(
    [
      { transform: "scale(1)", boxShadow: "0 18px 45px rgba(0,0,0,.55)" },
      { transform: "scale(1.06)", boxShadow: "0 22px 60px rgba(0,0,0,.70)" },
      { transform: "scale(1)", boxShadow: "0 18px 45px rgba(0,0,0,.55)" }
    ],
    { duration: 900, iterations: 2 }
  );

  localStorage.setItem("tk_nav_pulsed", "1");
}

// On scroll/resize
window.addEventListener("scroll", () => {
  const before = floatNav?.style.display;
  updateFloatingNavVisibility();
  const after = floatNav?.style.display;
  if (before !== "block" && after === "block") addPulseOnce();
});

window.addEventListener("resize", () => {
  updateFloatingNavVisibility();
});

// Initial
updateFloatingNavVisibility();
setTimeout(() => {
  if (floatNav && floatNav.style.display === "block") addPulseOnce();
}, 400);

// Mobile nav toggle
if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.style.display === "block";
    mobileNav.style.display = isOpen ? "none" : "block";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.setAttribute("aria-hidden", String(isOpen));
  });

  // close menu when clicking a link
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.style.display = "none";
      navToggle.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
    });
  });
}
