<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ManoGuzman/raffle-app">
    <img src="https://img.icons8.com/?size=100&id=sUfFbVqyPaVG&format=png&color=000000" alt="Raffle Logo" width="80" height="80">
  </a>

  <h3 align="center">Raffle App</h3>

  <p align="center">
    A web application to manage a 200-number raffle with online purchasing and admin dashboard.
    <br />
    <a href="https://github.com/ManoGuzman/raffle-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
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
    <li><a href="#api-endpoints">API Endpoints</a></li>
    <li><a href="#frontend-routes">Frontend Routes</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Raffle App is a full-stack web application designed to manage a raffle of 200 numbers with online purchasing capabilities and a comprehensive admin dashboard. Users can view available numbers, purchase tickets, while administrators have full control over ticket management and statistics.

### Key Features

- **Public Ticket Viewing**: Browse all 200 raffle numbers with real-time availability status
- **Online Purchase**: Buy raffle tickets with buyer information collection
- **Admin Dashboard**: Secure admin panel for ticket management and statistics
- **JWT Authentication**: Secure admin authentication with token-based access
- **Responsive Design**: Mobile-friendly interface built with Vue 3

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![Node.js][Node.js]][node-url]
[![Express][Express.js]][express-url]
[![Vue][Vue.js]][vue-url]
[![Vite][Vite.js]][vite-url]
[![PostgreSQL][PostgreSQL]][postgresql-url]
[![pnpm][pnpm]][pnpm-url]
[![Vitest][Vitest]][vitest-url]
[![Playwright][Playwright]][playwright-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- pnpm (recommended) or npm
- Docker & Docker Compose (for PostgreSQL)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/ManoGuzman/raffle-app.git
   cd raffle-app
   ```

2. Install dependencies
   ```sh
   pnpm install
   ```

3. Start PostgreSQL using Docker
   ```sh
   docker-compose up -d
   ```

4. Create the database
   ```sh
   psql -h localhost -U postgres -c "CREATE DATABASE raffle;"
   ```

5. Configure environment variables

   **Server** (`server/.env`):
   ```bash
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/raffle
   JWT_SECRET=your-super-secret-key-change-in-production
   JWT_EXPIRES_IN=24h
   ```

   **Client** (`client/.env`):
   ```bash
   VITE_API_URL=http://localhost:3000/api
   ```

6. Start development servers
   ```sh
   pnpm dev          # Both client and server
   pnpm dev:server   # Server only (http://localhost:3000)
   pnpm dev:client   # Client only (http://localhost:5173)
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE -->
## Usage

### Public Users
- Visit the home page to view all 200 raffle numbers
- Click on available numbers to purchase
- Fill in buyer information and complete purchase

### Admin Users
- Access `/admin/login` to authenticate
- View dashboard with ticket statistics
- Manage tickets (create, update, delete, reserve)
- Monitor buyer information and purchase history

### Useful Commands

```bash
# Development
pnpm dev              # Start all services
pnpm build            # Build for production
pnpm clean            # Clean build artifacts

# Testing
pnpm test             # Unit + Integration tests
pnpm test:unit        # Unit tests only
pnpm test:e2e         # E2E tests (requires running server)
pnpm test:coverage    # With coverage report

# Linting
pnpm lint             # Check for errors
pnpm lint:fix         # Auto-fix errors
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- API ENDPOINTS -->
## API Endpoints

### Authentication (Public)

| Method | Endpoint             | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/login`    | Admin login        |
| POST   | `/api/auth/register` | Create first admin |
| GET    | `/api/auth/me`       | Current user       |

### Tickets (Public)

| Method | Endpoint                 | Description      |
| ------ | ------------------------ | ---------------- |
| GET    | `/api/tickets`           | List all tickets |
| GET    | `/api/tickets/available` | Available only   |
| GET    | `/api/tickets/:id`       | Ticket details   |
| POST   | `/api/tickets/purchase`  | Purchase ticket  |

### Tickets (Admin - JWT Required)

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| POST   | `/api/admin/tickets`         | Create ticket       |
| PUT    | `/api/admin/tickets/:id`     | Update ticket       |
| DELETE | `/api/admin/tickets/:id`     | Delete ticket       |
| POST   | `/api/admin/tickets/reserve` | Reserve ticket      |
| GET    | `/api/admin/stats`           | View statistics     |
| POST   | `/api/admin/tickets/bulk`    | Bulk create tickets |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- FRONTEND ROUTES -->
## Frontend Routes

| Path               | Component        | Description           |
| ------------------ | ---------------- | --------------------- |
| `/`                | HomeView         | Landing + ticket grid |
| `/comprar/:numero` | PurchaseView     | Ticket purchase form  |
| `/admin`           | AdminView        | Dashboard (protected) |
| `/admin/login`     | LoginView        | Admin login           |
| `/admin/tickets`   | AdminTicketsView | Ticket management     |
| `/admin/stats`     | AdminStatsView   | Statistics view       |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Project setup and configuration
- [ ] Database schema and models
- [ ] JWT authentication system
- [ ] Public ticket viewing and purchase
- [ ] Admin dashboard and ticket management
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Unit and integration testing
- [ ] E2E testing with Playwright
- [ ] Dokploy deployment configuration
- [ ] Production SSL configuration

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



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/ManoGuzman/raffle-app](https://github.com/ManoGuzman/raffle-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
* [Vue 3 Documentation](https://vuejs.org/)
* [Node.js Documentation](https://nodejs.org/)
* [PostgreSQL Documentation](https://www.postgresql.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/ManoGuzman/raffle-app.svg?style=for-the-badge
[contributors-url]: https://github.com/ManoGuzman/raffle-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ManoGuzman/raffle-app.svg?style=for-the-badge
[forks-url]: https://github.com/ManoGuzman/raffle-app/network/members
[stars-shield]: https://img.shields.io/github/stars/ManoGuzman/raffle-app.svg?style=for-the-badge
[stars-url]: https://github.com/ManoGuzman/raffle-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/ManoGuzman/raffle-app.svg?style=for-the-badge
[issues-url]: https://github.com/ManoGuzman/raffle-app/issues
[license-shield]: https://img.shields.io/github/license/ManoGuzman/raffle-app.svg?style=for-the-badge
[license-url]: https://github.com/ManoGuzman/raffle-app/blob/master/LICENSE
[node-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/
[vue-shield]: https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white
[vue-url]: https://vuejs.org/
[postgresql-shield]: https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[express-url]: https://expressjs.com/
[express-shield]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[vite-url]: https://vitejs.dev/
[vite-shield]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[pnpm-url]: https://pnpm.io/
[pnpm-shield]: https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white
[vitest-url]: https://vitest.dev/
[vitest-shield]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[playwright-url]: https://playwright.dev/
[playwright-shield]: https://img.shields.io/badge/Playwright-45ba4c?style=for-the-badge&logo=playwright&logoColor=white
