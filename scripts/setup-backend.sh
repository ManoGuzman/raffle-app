#!/bin/bash
# Setup Backend Node.js + Express + Prisma + PostgreSQL + JWT
set -e

echo "Creating backend folder..."
mkdir -p ../backend
cd ../backend || exit

echo "Initializing npm..."
npm init -y

echo "Installing dependencies..."
npm install express cors jsonwebtoken bcryptjs express-validator dotenv pg

echo "Installing dev dependencies..."
npm install -D prisma nodemon @types/node @types/express ts-node typescript

echo "Initializing Prisma..."
npx prisma init

echo "Configuring .env file..."
cat > .env <<EOL
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/raffle_db?schema=public"
JWT_SECRET="your_jwt_secret_key"
PORT=3000
EOL

echo "Updating package.json scripts..."
npm set-script dev "nodemon src/index.ts"
npm set-script start "node dist/index.js"
npm set-script build "tsc"

echo "Creating folder structure..."
mkdir -p src/controllers src/middleware src/routes src/services src/utils

echo "Creating basic src/index.ts..."
cat > src/index.ts <<EOL
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API backend rifa funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Servidor corriendo en puerto \${PORT}\`);
});
EOL

echo "Setup complete! Remember to update .env with your DB credentials and JWT secret."
echo "Then run 'npx prisma migrate dev --name init' and 'npm run dev' inside the backend folder."
