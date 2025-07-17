🎟️ Rifa Iglesia - Frontend (React + Vite + Tailwind)

Este es el frontend de la aplicación de rifa digital para la iglesia. Muestra una grilla interactiva con 200 números, y permite a los usuarios ver su disponibilidad, seleccionar, reservar y confirmar números.

⚙️ Tecnologías usadas

React

Vite

Tailwind CSS

React Router

Fetch API

📦 Requisitos

Node.js v18 o superior (ideal v20+)

npm v9 o superior

🚀 Instalación y ejecución

Clona el repositorio y entra al directorio del frontend:

git clone https://github.com/tu-usuario/rifa-app.git
cd rifa-app/client

Instala las dependencias:

npm install

Crea un archivo .env en la raíz de client/ con el siguiente contenido:

VITE_API_BASE_URL=http://localhost:3000/api

Reemplaza la URL si tu backend corre en otro puerto o entorno.

Levanta el servidor de desarrollo:

npm run dev

Abre tu navegador en http://localhost:5173

🧲 Otros comandos útiles

npm run build # Compila el proyecto para producción
npm run preview # Corre el build localmente

📁 Estructura del Proyecto

src/
├── components/
│ ├── Header.jsx
│ ├── NumberCard.jsx
│ └── NumberGrid.jsx
├── pages/
│ ├── HomePage.jsx
│ └── AdminPage.jsx
├── services/
│ └── api.js
├── App.jsx
├── main.jsx
└── index.css

✅ Funcionalidades actuales

Visualización de 200 números con colores dinámicos:

🟩 Disponible (green)

🟨 Reservado (yellow)

🔴 Vendido (red)

Lógica de selección por click

Página de inicio (/)

Página de administración básica (/admin)

Consumo de API REST con fetch

📌 Pendientes y mejoras futuras

Modal de reserva con formulario (nombre, cantidad, método de pago)

Validación de SINPE (ingreso de número de teléfono)

Generación y descarga de acción digital

Confirmación visual de reserva o compra

Autenticación básica para admin

Acciones desde panel de administración (validar pagos, liberar números, ver usuarios)

📚 Recursos útiles

Tailwind Cheat Sheet: https://nerdcave.com/tailwind-cheat-sheet

React Router: https://reactrouter.com/en/main

Vite Docs: https://vitejs.dev/guide/

🧑‍💻 Desarrollado por

[Tu nombre o equipo]

🕊️ Licencia

MIT
