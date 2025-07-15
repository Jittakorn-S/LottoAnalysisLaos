# 🎯 Lotto Analysis Laos

A Rust-based web application that scrapes, analyzes, and visualizes Laos lottery results using statistical models. This project leverages `actix-web` for the backend and a lightweight HTML/JS frontend for user interaction.

---

## 📚 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Example](#example)
- [Dependencies](#dependencies)
- [Docker Support](#docker-support)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## 🧩 Introduction

**Lotto Analysis Laos** is designed to help users explore historical lottery results and apply statistical methods such as mean, median, and normal distribution analysis. The system scrapes real-time lottery data and offers insights via a user-friendly web interface.

---

## ✨ Features

- 🧮 Statistical analysis (mean, median, max, min, normal distribution)
- 🕸️ Real-time scraping of Laos lottery results
- 📊 Dynamic display with JavaScript-driven interactivity
- 🌐 Web interface built with HTML, CSS, and JS
- 🐳 Dockerized for ease of deployment

---

## ⚙️ Installation

### Prerequisites

- Rust (edition 2021 or later)
- Cargo
- Node.js (optional, for frontend dev)
- Docker (optional, for containerized deployment)

### Local Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/LottoAnalysisLaos.git
cd LottoAnalysisLaos

# Build the project
cargo build --release

# Run the server
cargo run
