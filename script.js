const GOOGLE_MAPS_API_KEY = "";
const earlyAccessUrl = "https://forms.gle/bTEC9vrXeWaLYDYK7";
const watchDemoButton = document.querySelector("[data-watch-demo]");
const demoModal = document.querySelector("[data-demo-modal]");
const demoVideo = document.querySelector("[data-demo-video]");
const demoCloseButtons = document.querySelectorAll("[data-demo-close]");

const animatedItems = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

animatedItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 36, 180)}ms`;
  observer.observe(item);
});

document.querySelectorAll("[data-email-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.open(earlyAccessUrl, "_blank", "noopener");
  });
});

function openDemoModal() {
  if (!demoModal) return;
  demoModal.classList.add("is-open");
  demoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  demoVideo?.play().catch(() => {});
}

function closeDemoModal() {
  if (!demoModal) return;
  demoModal.classList.remove("is-open");
  demoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (demoVideo) {
    demoVideo.pause();
    demoVideo.currentTime = 0;
  }
}

watchDemoButton?.addEventListener("click", openDemoModal);
demoCloseButtons.forEach((button) => {
  button.addEventListener("click", closeDemoModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDemoModal();
});

const demoState = {
  tab: "property",
  service: "Land Clearing",
};

const services = {
  "Land Clearing": { acreage: "4.8 ac", equipment: "Dozer + loader", title: "Property Analysis" },
  "Forestry Mulching": { acreage: "4.8 ac", equipment: "Mulcher + skid steer", title: "Property Analysis" },
  "Dirt Work": { acreage: "4.8 ac", equipment: "Dozer + compact loader", title: "Property Analysis" },
};

const pages = {
  property: { label: "Property", title: "Turn Any Property Into a Professional Quote." },
  outline: { label: "Outline", title: "Turn Any Property Into a Professional Quote." },
  "land-clearing": { label: "Land Clearing", title: "Turn Any Property Into a Professional Quote." },
  mulching: { label: "Mulching", title: "Turn Any Property Into a Professional Quote." },
  fencing: { label: "Fencing", title: "Turn Any Property Into a Professional Quote." },
  "house-pad": { label: "House Pad", title: "Turn Any Property Into a Professional Quote." },
  driveway: { label: "Driveway", title: "Turn Any Property Into a Professional Quote." },
  drainage: { label: "Drainage", title: "Turn Any Property Into a Professional Quote." },
  proposal: { label: "Proposal", title: "Turn Any Property Into a Professional Quote." },
};

const tabButtons = document.querySelectorAll("[data-demo-tab]");
const serviceButtons = document.querySelectorAll("[data-service]");
const resetButton = document.querySelector("[data-panel-reset]");

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function renderDemo() {
  const page = pages[demoState.tab] || pages.property;
  const service = services[demoState.service];

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.demoTab === demoState.tab);
  });

  serviceButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.service === demoState.service);
  });

  setText("[data-demo-page]", page.label);
  setText("[data-toolbar-page]", page.label);
  setText("[data-panel-title]", service.title);
  setText("[data-service-name]", demoState.service);
  setText("[data-acreage-value]", service.acreage);
  setText("[data-equipment-value]", service.equipment);
  setText("[data-hero-title]", page.title);
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    demoState.tab = button.dataset.demoTab;
    renderDemo();
  });
});

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    demoState.service = button.dataset.service;
    renderDemo();
  });
});

resetButton?.addEventListener("click", () => {
  demoState.tab = "property";
  demoState.service = "Land Clearing";
  renderDemo();
});

renderDemo();
