<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ManoGuzman/raffle-app">
    <img src="https://img.icons8.com/?size=100&id=sUfFbVqyPaVG&format=png&color=000000" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Raffle App</h3>

  <p align="center">
    A web application to manage a 200-number raffle with online purchase and admin dashboard.
    <br />
    <a href="https://github.com/ManoGuzman/raffle-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ManoGuzman/raffle-app">View Demo</a>
    &middot;
    <a href="https://github.com/ManoGuzman/raffle-app/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/ManoGuzman/raffle-app/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A full-stack web application for managing a raffle with 200 numbers. Features include:

- **Public Landing Page**: Display all 200 raffle numbers in a visual grid
- **Online Purchase**: Buyers can select and purchase available numbers
- **Admin Dashboard**: Secure admin panel to manage tickets and view statistics
- **Authentication**: JWT-based authentication for admin access

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Vue][Vue.js]][Vue-url]
* [![Vite][Vite.dev]][Vite-url]
* [![Node.js][Node.js]][Node-url]
* [![Express][Express.js]][Express-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![JWT][JWT.io]][JWT-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **pnpm** (recommended) or npm
- **Docker** and **Docker Compose** (for PostgreSQL)
- **PostgreSQL** 14+ (or use Docker)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ManoGuzman/raffle-app.git
   ```

2. Install dependencies using pnpm (recommended)
   ```sh
   pnpm install
   ```

3. Start PostgreSQL using Docker
   ```sh
   docker-compose up -d
   ```

4. Create the database (first time only)
   ```sh
   psql -h localhost -U postgres -c "CREATE DATABASE raffle;"
   ```

5. Configure environment variables

   Create `server/.env`:
   ```bash
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/raffle
   JWT_SECRET=your-super-secret-key-change-in-production
   JWT_EXPIRES_IN=24h
   ```

   Create `client/.env`:
   ```bash
   VITE_API_URL=http://localhost:3000/api
   ```

6. Run the development servers
   ```sh
   pnpm dev
   ```

   This will start:
   - Server at http://localhost:3000
   - Client at http://localhost:5173

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE -->
## Usage

### Public Endpoints

| Route              | Description                       |
| ------------------ | --------------------------------- |
| `/`                | Landing page with 200-number grid |
| `/comprar/:numero` | Purchase form for selected number |

### Admin Endpoints

| Route            | Description              |
| ---------------- | ------------------------ |
| `/admin/login`   | Admin login page         |
| `/admin`         | Main admin dashboard     |
| `/admin/tickets` | Ticket management        |
| `/admin/stats`   | Statistics and analytics |

### API Endpoints

**Auth**
| Method | Endpoint             | Description                     |
| ------ | -------------------- | ------------------------------- |
| POST   | `/api/auth/login`    | Admin login                     |
| POST   | `/api/auth/register` | Create first admin              |
| GET    | `/api/auth/me`       | Get current user (JWT required) |

**Tickets (Public)**
| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | `/api/tickets`           | List all tickets       |
| GET    | `/api/tickets/available` | List available tickets |
| GET    | `/api/tickets/:id`       | Get ticket details     |
| POST   | `/api/tickets/purchase`  | Purchase a ticket      |

**Tickets (Admin)**
| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| POST   | `/api/admin/tickets`         | Create ticket       |
| PUT    | `/api/admin/tickets/:id`     | Update ticket       |
| DELETE | `/api/admin/tickets/:id`     | Release ticket      |
| POST   | `/api/admin/tickets/reserve` | Reserve ticket      |
| GET    | `/api/admin/stats`           | Get statistics      |
| POST   | `/api/admin/tickets/bulk`    | Bulk create tickets |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- PROJECT STRUCTURE -->
## Project Structure

```
raffle-app/
├── client/                    # Vue.js frontend
│   ├── src/
│   │   ├── assets/styles/     # Global styles
│   │   ├── features/          # Feature-based modules
│   │   │   ├── tickets/       # Ticket purchase feature
│   │   │   ├── admin/         # Admin dashboard feature
│   │   │   └── auth/          # Authentication feature
│   │   ├── shared/            # Shared components & composables
│   │   ├── router/            # Vue Router config
│   │   ├── App.vue
│   │   └── main.ts
│   ├── tests/                 # Unit, integration, e2e tests
│   ├── Dockerfile
│   └── vite.config.ts
├── server/                    # Node.js/Express API
│   ├── src/
│   │   ├── features/          # Feature-based modules
│   │   │   ├── auth/          # Auth feature
│   │   │   └── tickets/       # Tickets feature
│   │   ├── shared/            # Config, middleware, models, utils
│   │   └── index.ts
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml         # PostgreSQL setup
├── .github/workflows/          # GitHub Actions CI/CD
├── pnpm-workspace.yaml        # pnpm workspace config
└── README.md
```

<p align="right">(<a href="#readme-top">back to top)</a></p>



<!-- ROADMAP -->
## Roadmap

- [x] Project setup and configuration
- [ ] Database schema design
- [ ] API endpoints implementation
- [ ] Frontend structure and routing
- [ ] Authentication (JWT)
- [ ] Landing page with ticket grid
- [ ] Purchase flow
- [ ] Admin dashboard
- [ ] Statistics and analytics
- [ ] Unit tests (Vitest)
- [ ] Integration tests
- [ ] E2E tests (Playwright)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Deployment (Dokploy)

See the [open issues](https://github.com/ManoGuzman/raffle-app/issues) for a full list of proposed features.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors

<a href="https://github.com/ManoGuzman/raffle-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ManoGuzman/raffle-app" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mano Guzman - [@ManoGuzman](https://twitter.com/ManoGuzman) - email@email.com

Project Link: [https://github.com/ManoGuzman/raffle-app](https://github.com/ManoGuzman/raffle-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Vue.js](https://vuejs.org/)
* [Vite](https://vitejs.dev/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Vitest](https://vitest.dev/)
* [Playwright](https://playwright.dev/)
* [Dokploy](https://dokploy.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ManoGuzman/raffle-app.svg?style=for-the-badge
[contributors-url]: https://github.com/ManoGuzman/raffle-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ManoGuzman/raffle-app.svg?style=for-the-badge
[forks-url]: https://github.com/ManoGuzman/raffle-app/network/members
[stars-shield]: https://img.shields.io/github/stars/ManoGuzman/raffle-app.svg?style=for-the-badge
[stars-url]: https://github.com/ManoGuzman/raffle-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/ManoGuzman/raffle-app.svg?style=for-the-badge
[issues-url]: https://github.com/ManoGuzman/raffle-app/issues
[license-shield]: https://img.shields.io/github/license/ManoGuzman/raffle-app.svg?style=for-the-badge
[license-url]: https://github.com/ManoGuzman/raffle-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/manuel-guzmán-b87b841bb/

<!-- Shields.io badges -->
[Vue.js]: https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white
[Vue-url]: https://vuejs.org/
[Vite.dev]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[JWT.io]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white
[JWT-url]: https://jwt.io/
