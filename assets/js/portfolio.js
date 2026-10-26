"use strict";

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  mobileNav.hidden = true;
  menuButton.querySelector("span").textContent = "＋";
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  mobileNav.hidden = !open;
  menuButton.querySelector("span").textContent = open ? "−" : "＋";
});
mobileNav.addEventListener("click", event => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !mobileNav.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia("(min-width: 821px)").addEventListener("change", event => {
  if (event.matches) closeMenu();
});

// Keep navigation state in sync without hiding content when JavaScript is absent.
const navLinks = [...document.querySelectorAll(".desktop-nav a")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
  }, { rootMargin: "-15% 0px -65% 0px" });
  document.querySelectorAll("#home, #selected-work, #experience, #portfolio, #skills, #contact").forEach(section => observer.observe(section));
}

const dialog = document.querySelector("#image-dialog");
const galleryImage = document.querySelector("#dialog-image");
const galleryCaption = document.querySelector("#image-caption");
const galleryCount = document.querySelector("#image-count");
const previousButton = document.querySelector(".gallery-prev");
const nextButton = document.querySelector(".gallery-next");
let galleryItems = [];
let galleryIndex = 0;
let galleryTrigger;
function renderGallery() {
  const item = galleryItems[galleryIndex];
  galleryImage.src = item.dataset.src;
  galleryImage.alt = item.dataset.caption;
  galleryCaption.textContent = item.dataset.caption;
  galleryCount.textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
  previousButton.disabled = galleryIndex === 0;
  nextButton.disabled = galleryIndex === galleryItems.length - 1;
}
function openGallery(group, trigger, item) {
  galleryItems = [...document.querySelectorAll("[data-gallery]")].filter(node => node.dataset.gallery === group);
  if (!galleryItems.length) return;
  galleryIndex = Math.max(0, galleryItems.indexOf(item));
  galleryTrigger = trigger;
  renderGallery();
  dialog.showModal();
  document.body.classList.add("dialog-open");
  document.querySelector(".dialog-close").focus();
}
document.querySelectorAll("[data-gallery]").forEach(button => {
  button.addEventListener("click", () => openGallery(button.dataset.gallery, button, button));
});
document.querySelectorAll("[data-open-gallery]").forEach(button => {
  button.addEventListener("click", () => openGallery(button.dataset.openGallery, button));
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
previousButton.addEventListener("click", () => { if (galleryIndex > 0) { galleryIndex--; renderGallery(); } });
nextButton.addEventListener("click", () => { if (galleryIndex < galleryItems.length - 1) { galleryIndex++; renderGallery(); } });
dialog.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" && galleryIndex > 0) { event.preventDefault(); galleryIndex--; renderGallery(); }
  if (event.key === "ArrowRight" && galleryIndex < galleryItems.length - 1) { event.preventDefault(); galleryIndex++; renderGallery(); }
});
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  galleryImage.removeAttribute("src");
  galleryTrigger?.focus({ preventScroll: true });
});

// Open the detailed experience for a complete PDF, then restore the reader's state.
let previouslyOpen;
window.addEventListener("beforeprint", () => {
  previouslyOpen = new Set([...document.querySelectorAll("details[open]")]);
  document.querySelectorAll("details").forEach(detail => { detail.open = true; });
});
window.addEventListener("afterprint", () => {
  if (!previouslyOpen) return;
  document.querySelectorAll("details").forEach(detail => { detail.open = previouslyOpen.has(detail); });
  previouslyOpen = undefined;
});
document.querySelector(".print-button").addEventListener("click", () => window.print());
