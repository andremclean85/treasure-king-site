const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const drawerClose = document.getElementById("drawerClose");
const toast = document.getElementById("toast");

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function openDrawer(){
  drawer.classList.add("isOpen");
  drawer.setAttribute("aria-hidden", "false");
  menuBtn.setAttribute("aria-expanded", "true");
}
function closeDrawer(){
  drawer.classList.remove("isOpen");
  drawer.setAttribute("aria-hidden", "true");
  menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn?.addEventListener("click", () => {
  if(drawer.classList.contains("isOpen")) closeDrawer();
  else openDrawer();
});

drawerClose?.addEventListener("click", closeDrawer);
drawer?.addEventListener("click", (e) => {
  if(e.target === drawer) closeDrawer();
});

/* Close drawer when clicking a link */
document.querySelectorAll(".drawer__link").forEach(a => {
  a.addEventListener("click", closeDrawer);
});

/* Smooth scroll for same-page links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    const el = document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* Demo form handlers */
document.getElementById("join")?.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Welcome to the Treasure List 👑");
  e.target.reset();
});

document.getElementById("contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Message sent. We’ll reach out shortly.");
  e.target.reset();
});

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();
