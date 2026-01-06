# 🖼️ Image Editor Web App

A **responsive, mobile-friendly image editor** built with **HTML, CSS, and Vanilla JavaScript**, featuring **real-time canvas-based filters**, **touch gesture support**, and a **clean, production-ready UI**.

No frameworks. No libraries. Just fast, modern web APIs.

---

## ✨ Features

* 🎨 **Real-time image editing**

  * Brightness
  * Contrast
  * Saturation
  * Hue rotation
  * Rotation
  * Blur
  * Grayscale
  * Sepia
  * Opacity
  * Invert

* 📱 **Mobile gesture support**

  * Two-finger rotate on canvas
  * Touch-optimized sliders

* 🖥️ **Responsive design**

  * Desktop: side-by-side layout
  * Mobile & tablet: stacked layout

* 🧠 **Smart UX**

  * Sliders disabled until image upload
  * “No image selected” placeholder on empty canvas
  * Filters apply only after user interaction
  * Instant preview (zero perceptible delay)

* 🎛️ **Presets**

  * Cool Summer
  * Vintage
  * Old School
  * Drama
  * Moody

---

## 🛠️ Tech Stack

* **HTML5**
* **CSS3**

  * CSS Variables (`:root`)
  * Flexbox
  * Media Queries
* **JavaScript (ES6+)**

  * Canvas API
  * Touch Events
  * Dynamic DOM creation
* **Remix Icons**

---

## 📂 Project Structure

```
image-editor/
├── index.html   # App structure
├── style.css    # Styling & responsive layout
├── script.js    # Canvas logic, filters & gestures
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/image-editor.git
```

### Run the app

Open `index.html` in any modern browser.

> No build step. No server required.

---

## 📸 How It Works

1. Click **Choose Image**
2. Upload an image
3. Adjust sliders to apply filters in real time
4. (Mobile) Use two fingers to rotate the image
5. Apply presets for quick edits
6. Click **Download** to save the edited image

---

## ⚡ Performance Notes

* Uses **Canvas filters** instead of CSS filters
* No unnecessary re-renders
* No artificial delays or debouncing
* Optimized for mouse and touch input

---

## 📌 Future Improvements

* Pinch-to-zoom scaling
* Undo / redo history
* Crop & resize tools
* Histogram visualization
* PWA support
* WebGL acceleration

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## 👤 Author

**Abhijay Dhar**

Built with a focus on **performance**, **UX clarity**, and **clean engineering**.
