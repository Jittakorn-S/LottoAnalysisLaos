# 🎯 Lotto Analysis Laos

A Rust-based web application that scrapes, analyzes, and visualizes Laos lottery results using statistical models. The backend is powered by `actix-web`, while the frontend leverages lightweight HTML and JavaScript.

---

## 🧩 Introduction

**Lotto Analysis Laos** is designed to scrape real-time Laos lottery results, apply statistical analysis (mean, median, normal distribution), and display the data through a user-friendly web interface.

---

## ✨ Features

- 🧮 Statistical analysis: mean, median, min, max, and normal distribution
- 📈 Real-time scraping of Laos lottery results
- 🖥️ Interactive web interface with HTML and JavaScript
- 🚀 Fast Rust backend using `actix-web`
- 🐳 Docker support for containerized deployment

---

## ⚙️ Installation

### Prerequisites

- Rust (edition 2021 or later)
- Cargo
- Node.js (optional, for frontend development)
- Docker (optional)

### Local Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/LottoAnalysisLaos.git
cd LottoAnalysisLaos

# Build and run the server
cargo build --release
cargo run
````

Visit the app at: [http://localhost:8080](http://localhost:8080)

---

## 🚀 Usage

1. Open `http://localhost:8080` in your browser.
2. Click the **Scrape** button to collect the latest lottery results.
3. View analysis output (mean, median, etc.) in the results table.

---

## ⚙️ Configuration

* **Backend logic**: `src/main.rs`
* **HTML Template**: `templates/index.html`
* **JavaScript UI**: `static/app.js`
* **Docker settings**: `Dockerfile`
* **Render deployment**: `render.yaml`

---

## 🧪 Example Output

| Draw Date  | Numbers   | Mean | Median | Max | Min |
| ---------- | --------- | ---- | ------ | --- | --- |
| 2025-07-14 | 5, 13, 28 | 15.3 | 13     | 28  | 5   |

---

## 📦 Dependencies

From `Cargo.toml`:

* `actix-web`, `actix-files`
* `serde`, `serde_json`
* `scraper`, `reqwest`
* `chrono`, `rand`
* `statrs`, `lazy_static`
* `tokio`

---

## 🐳 Docker Support

### Build & Run with Docker

```bash
# Build Docker image
docker build -t lotto-analysis-laos .

# Run container
docker run -p 8080:8080 lotto-analysis-laos
```

Uses a multi-stage build to optimize image size.

---

## 🛠️ Troubleshooting

* **Port conflicts**: Ensure port 8080 is available.
* **Scraping fails**: Check internet access or site structure changes.
* **Build errors**: Update Rust toolchain with `rustup update`.

---
