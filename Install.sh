#!/bin/bash

echo -e "Lancement de Words Battle...\n"
echo -e "Vérification de Docker...\n"
if ! command -v docker >/dev/null 2>&1; then
    echo -e "Docker n'est pas installé ou n'est pas dans le PATH.\n"
    echo -e "Veuillez installer Docker Desktop (Windows/macOS) ou Docker Engine (Linux), puis relancer ce script.\n"
    exit 1
fi
DOCKER_VERSION_OUTPUT="$(docker -v 2>/dev/null)"
if [[ -z "$DOCKER_VERSION_OUTPUT" ]]; then
    echo -e "Impossible d'obtenir la version de Docker.\n"
    echo -e "Vérifiez l'installation de Docker puis relancez ce script.\n"
    exit 1
fi
echo -e "Docker détecté : $DOCKER_VERSION_OUTPUT\n"
echo -e "Vérification des fichiers de configuration...\n"
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo -e "Fichier backend/.env créé à partir de backend/.env.example\n"
fi
if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo -e "Fichier frontend/.env créé à partir de frontend/.env.example\n"
fi
echo -e "La connection au site se fera par défaut via http://localhost:3000\n"

echo -e "Tout est ok.\nLancement des conteneurs...\n"
docker compose up --build
