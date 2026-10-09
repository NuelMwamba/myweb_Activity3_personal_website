/* ICT251 Activity 3 interactive features.
   Main features: mobile navigation, photo gallery, project search,
   theme toggle, and contact form validation/preview. */

// Responsive mobile navigation
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navIcon = document.getElementById("navIcon");

if (navToggle && navLinks && navIcon) {
  navToggle.addEventListener("click", function () {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navIcon.textContent = open ? "✕" : "☰";
  });
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navIcon.textContent = "☰";
    });
  });
}

// Gallery data: update these paths/captions if you change your photos.
const galleryPhotos = [
  { src: "images/photo1.jpg", alt: "A photograph from my part-time modelling journey", caption: "My journey as a part-time model." },
  { src: "images/photo2.jpg", alt: "A personal photograph showing a moment from my life", caption: "One of my favourite hobbies." },
  { src: "images/photo3.jpg", alt: "A photograph representing someone I admire", caption: "People with good manners." }
];
const galleryImage = document.getElementById("galleryImage");
const galleryCaption = document.getElementById("galleryCaption");
const galleryCounter = document.getElementById("galleryCounter");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
let currentPhotoIndex = 0;

function showGalleryPhoto(index) {
  // Wrap around: Previous on the first photo shows the last photo, and vice versa.
  currentPhotoIndex = (index + galleryPhotos.length) % galleryPhotos.length;
  const photo = galleryPhotos[currentPhotoIndex];
  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  galleryCaption.textContent = photo.caption;
  galleryCounter.textContent = `Photo ${currentPhotoIndex + 1} of ${galleryPhotos.length}`;
}
if (galleryImage && galleryCaption && galleryCounter && galleryPrev && galleryNext) {
  galleryPrev.addEventListener("click", () => showGalleryPhoto(currentPhotoIndex - 1));
  galleryNext.addEventListener("click", () => showGalleryPhoto(currentPhotoIndex + 1));
  showGalleryPhoto(0);
}

// Project/skills search, reset, and no-results feedback.
const projectSearch = document.getElementById("projectSearch");
const clearSearch = document.getElementById("clearSearch");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const searchStatus = document.getElementById("searchStatus");
const noProjectsMessage = document.getElementById("noProjectsMessage");

function filterProjects() {
  const query = projectSearch.value.trim().toLowerCase();
  let visibleCount = 0;
  projectCards.forEach(function (card) {
    const searchable = (card.textContent + " " + (card.dataset.search || "")).toLowerCase();
    const matches = searchable.includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });
  searchStatus.textContent = query
    ? `Showing ${visibleCount} of ${projectCards.length} items for "${query}".`
    : `Showing all ${projectCards.length} items.`;
  noProjectsMessage.hidden = visibleCount !== 0;
}
if (projectSearch && clearSearch && searchStatus && noProjectsMessage) {
  projectSearch.addEventListener("input", filterProjects);
  clearSearch.addEventListener("click", function () {
    projectSearch.value = "";
    filterProjects();
    projectSearch.focus();
  });
  filterProjects();
}

// Light/dark theme switch. Saving the preference is optional.
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

function applyTheme(isLight) {
  document.body.classList.toggle("light-theme", isLight);
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeIcon.textContent = isLight ? "☀️" : "🌙";
  themeLabel.textContent = isLight ? "Light mode" : "Dark mode";
}
if (themeToggle && themeIcon && themeLabel) {
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("nuelPortfolioTheme"); } catch (error) {}
  applyTheme(savedTheme === "light");
  themeToggle.addEventListener("click", function () {
    const useLight = !document.body.classList.contains("light-theme");
    applyTheme(useLight);
    try { localStorage.setItem("nuelPortfolioTheme", useLight ? "light" : "dark"); } catch (error) {}
  });
}

// Contact form: validate locally and preview the message without reloading/sending.
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value;
    const message = document.getElementById("message").value.trim();
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const feedback = document.getElementById("formFeedback");
    const preview = document.getElementById("messagePreview");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    feedback.textContent = "";
    preview.hidden = true;

    let valid = true;
    if (name === "") { nameError.textContent = "Please enter your name."; valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      valid = false;
    }
    if (message === "") { messageError.textContent = "Please enter a message."; valid = false; }
    if (!valid) {
      feedback.textContent = "Please correct the errors above.";
      return;
    }

    // textContent treats user entries as text instead of HTML.
    document.getElementById("previewName").textContent = name;
    document.getElementById("previewEmail").textContent = email;
    document.getElementById("previewTopic").textContent = topic || "Not specified";
    document.getElementById("previewMessage").textContent = message;
    preview.hidden = false;
    feedback.textContent = "Your information was validated successfully. This is only a browser preview; nothing has been sent.";
    preview.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
