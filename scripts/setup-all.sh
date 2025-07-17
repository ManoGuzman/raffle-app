#!/bin/bash
# Setup completo frontend + backend para rifa-app

set -e

echo "=== Iniciando setup frontend ==="
bash ./setup-frontend.sh

echo "=== Setup frontend completado ==="
echo ""

echo "=== Iniciando setup backend ==="
bash ./setup-backend.sh

echo "=== Setup backend completado ==="
echo ""

echo "Setup total completado. Ahora puedes entrar a las carpetas y correr los comandos dev."
echo "Frontend: cd ../client && npm run dev"
echo "Backend: cd ../backend && npm run dev"
