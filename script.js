const canvas = document.getElementById("image-canvas");
const ctx = canvas.getContext("2d");
const imgInput = document.getElementById("image-input");
const resetBtn = document.getElementById("reset-btn");
const downloadBtn = document.getElementById("download-btn");
const filtersContainer = document.getElementById("filters-container");

canvas.width = 600;
canvas.height = 580;

let img = new Image();
let imageLoaded = false;
let filtersApplied = false;

/* ================= PLACEHOLDER ================= */

function drawPlaceholder() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#666";
  ctx.font = "18px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("No image selected", canvas.width / 2, canvas.height / 2);
}

drawPlaceholder();

/* ================= FILTER CONFIG ================= */

const filters = {
  brightness: { value: 100, unit: "%" },
  contrast: { value: 100, unit: "%" },
  saturation: { value: 100, unit: "%" },
  hue: { value: 0, unit: "deg" },
  rotate: { value: 0, unit: "deg" },
  blur: { value: 0, unit: "px" },
  grayscale: { value: 0, unit: "%" },
  sepia: { value: 0, unit: "%" },
  opacity: { value: 100, unit: "%" },
  invert: { value: 0, unit: "%" }
};

/* ================= SLIDER CONTROL ================= */

function disableSliders() {
  document.querySelectorAll("input[type=range]").forEach(s => s.disabled = true);
}

function enableSliders() {
  document.querySelectorAll("input[type=range]").forEach(s => s.disabled = false);
}

/* ================= CREATE FILTER UI ================= */

function createFilterElement(name, key) {
  const wrap = document.createElement("div");
  wrap.className = "filter-group";

  const label = document.createElement("label");
  label.innerHTML = `<span>${name}</span><span>${filters[key].value}${filters[key].unit}</span>`;

  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = 0;
  slider.max = 200;
  slider.value = filters[key].value;
  slider.disabled = true;

  slider.addEventListener("input", () => {
    if (!imageLoaded) return;
    filtersApplied = true;
    filters[key].value = slider.value;
    label.children[1].textContent = slider.value + filters[key].unit;
    applyFilters();
  });

  wrap.append(label, slider);
  filtersContainer.appendChild(wrap);
}

/* ================= APPLY FILTERS ================= */

function applyFilters() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.filter = `
    brightness(${filters.brightness.value}%)
    contrast(${filters.contrast.value}%)
    saturate(${filters.saturation.value}%)
    hue-rotate(${filters.hue.value}deg)
    blur(${filters.blur.value}px)
    grayscale(${filters.grayscale.value}%)
    sepia(${filters.sepia.value}%)
    opacity(${filters.opacity.value}%)
    invert(${filters.invert.value}%)
  `;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(filters.rotate.value * Math.PI / 180);
  ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
  ctx.restore();
}

/* ================= IMAGE LOAD ================= */

imgInput.addEventListener("change", () => {
  const file = imgInput.files[0];
  if (!file) return;

  img.src = URL.createObjectURL(file);
  img.onload = () => {
    imageLoaded = true;
    filtersApplied = false;
    ctx.filter = "none";
    enableSliders();
    applyFilters();
  };
});

/* ================= RESET ================= */

resetBtn.addEventListener("click", () => {
  Object.keys(filters).forEach(k => filters[k].value = 100);
  filters.rotate.value = 0;
  document.querySelectorAll("input[type=range]").forEach(s => s.value = 100);
  filtersApplied = false;
  if (imageLoaded) applyFilters();
});

/* ================= DOWNLOAD ================= */

downloadBtn.addEventListener("click", () => {
  if (!imageLoaded) return;
  const a = document.createElement("a");
  a.download = "edited-image.png";
  a.href = canvas.toDataURL();
  a.click();
});

/* ================= TOUCH GESTURES ================= */

let lastDistance = null;

canvas.addEventListener("touchmove", e => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (lastDistance) {
      filters.rotate.value += (distance - lastDistance) * 0.05;
      applyFilters();
    }
    lastDistance = distance;
  }
});

canvas.addEventListener("touchend", () => {
  lastDistance = null;
});

/* ================= PRESETS ================= */

const presets = {
  CoolSummer: { saturation: 130, hue: 110 },
  Vintage: { sepia: 120, contrast: 90 },
  OldSchool: { grayscale: 150 },
  Drama: { contrast: 140 },
  Moody: { brightness: 90, contrast: 130 }
};

const presetContainer = document.getElementById("preset-container");

Object.keys(presets).forEach(name => {
  const btn = document.createElement("button");
  btn.className = "btn";
  btn.textContent = name;

  btn.onclick = () => {
    if (!imageLoaded) return;
    filtersApplied = true;
    Object.keys(presets[name]).forEach(k => filters[k].value = presets[name][k]);
    applyFilters();
  };

  presetContainer.appendChild(btn);
});

/* ================= INIT ================= */

Object.keys(filters).forEach(key => {
  createFilterElement(key.charAt(0).toUpperCase() + key.slice(1), key);
});

disableSliders();
