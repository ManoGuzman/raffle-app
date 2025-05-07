# 🎉 Raffle App - RJ Arquidiocesis

A web application to manage a raffle of 200 numbers (₡5000 each), where users can reserve or buy numbers without registration. Only administrators have full management access.

---

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API - Endpoints](#api---endpoints)
- [Testing](#testing)
- [Deploy (CI/CD)](#deploy-cicd)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features

- 200 available numbers to buy or reserve.
- Payment methods: Cash or SINPE mobile.
- Downloadable digital tickets.
- Reserve/buy numbers without registration (user info required after selecting).
- Admin panel to manage the raffle.
- Authentication for admins (JWT).
- PostgreSQL database with Prisma ORM.
- Automated tests (E2E, unit, integration).
- Automatic deploy with CI/CD.

---

## ⚙️ Tech Stack

| Technology | Role |
|------------|------|
| **React** + React Hooks | Frontend |
| **Node.js + Express** | Backend |
| **PostgreSQL + Prisma ORM** | Database |
| **JWT** | Authentication (Admins) |
| **Playwright** | Testing (E2E + unit + integration) |
| **GitHub Actions** | CI/CD |
| **Render** / **Railway** / **Vercel** | Deploy backend / frontend |

---

## 🛠️ Installation

### Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 14.x
- Git

### Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
