# Words Battle

Words Battle est un jeu de devinette de mots dans un univers fantasy-egyptien. Le principe est simple : deviner le mot secret lettre par lettre, avec un nombre d'erreurs limite selon la difficulte.

## Le jeu en bref

- Mode "pendu" moderne : deviner un mot en testant des lettres.
- Indice + categorie disponibles (optionnel).
- 3 niveaux de difficulte (FACILE, MOYEN, DIFFICILE) avec 6/4/2 erreurs autorisees.
- Score calcule selon la difficulte, les erreurs et l'utilisation de l'indice.
- Compte joueur + profil avec stats et historique des parties.
- Espace admin pour gerer le dictionnaire de mots.

## Stack technique

- Frontend : Next.js
- API : GraphQL (Apollo + Fastify)
- Base de donnees : PostgreSQL (TypeORM)
- Auth : JWT stocke dans un cookie HTTP-only

## Installation avec Docker

### 1) Prerequis

- Docker + Docker Compose (v2)

### 3) Lancer l'application

```
docker compose up --build
```

Alternative (script d'installation) :

```
./Install.sh
```

### 4) Acces

- Frontend : http://localhost:3000
- API GraphQL : http://localhost:4000

## Commandes utiles

Initialiser/reinitialiser les donnees (apres demarrage des conteneurs) :

```
docker compose exec backend npm run resetDB
```

Arreter les conteneurs :

```
docker compose down
```
