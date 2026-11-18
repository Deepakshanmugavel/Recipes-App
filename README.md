# Recipes App

A CRUD REST API for managing recipes, built with **Node.js**, **Express.js** and **Mongoose (MongoDB)** using the **MVC pattern**. API documentation is provided as a Postman collection.

## Features
- Create, read (all / by ID), update and delete recipes
- MVC structure: `models`, `views`, `controllers` (plus `routes` and `middleware`)
- Mongoose schema validation and centralized error handling
- Postman collection with sample requests and responses

## Project structure
```
recipes-app/
├── config/db.js                  # MongoDB connection
├── models/Recipe.js              # Mongoose schema (Model)
├── controllers/recipeController.js  # CRUD logic (Controller)
├── routes/recipeRoutes.js        # Route definitions
├── middleware/                   # ID validation + error handling
├── views/index.html              # Landing page (View)
├── postman/Recipes-API.postman_collection.json
└── server.js                     # App entry point
```

## Getting started
```bash
npm install
cp .env.example .env     # then set MONGO_URI
npm run dev              # or: npm start
```
Server runs on `http://localhost:5000`.

## Environment variables
| Variable | Description |
|---|---|
| `PORT` | Port to run on (default 5000) |
| `MONGO_URI` | MongoDB connection string |

## API endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/recipes` | createRecipe |
| GET | `/api/recipes` | getAllRecipes |
| GET | `/api/recipes/:id` | getRecipeById |
| PUT | `/api/recipes/:id` | updateRecipe |
| DELETE | `/api/recipes/:id` | deleteRecipe |

### Recipe fields
| Field | Type | Notes |
|---|---|---|
| `title` | String | required, 3-100 chars |
| `description` | String | optional, max 500 |
| `ingredients` | [String] | required, at least 1 |
| `instructions` | String | required |
| `cookingTime` | Number | minutes, min 1 |
| `servings` | Number | min 1, default 1 |
| `difficulty` | String | `easy` / `medium` / `hard` (default `easy`) |
| `category` | String | optional |

### Sample request: POST /api/recipes
```json
{
  "title": "Paneer Butter Masala",
  "ingredients": ["Paneer", "Butter", "Tomato puree", "Cream"],
  "instructions": "Saute spices, add tomato puree, simmer, add paneer and cream.",
  "cookingTime": 40,
  "servings": 4,
  "difficulty": "medium"
}
```

### Error responses
| Status | When |
|---|---|
| 400 | Validation failed, invalid ID, invalid JSON |
| 404 | Recipe or route not found |
| 500 | Unexpected server error |

## Postman documentation
Import `postman/Recipes-API.postman_collection.json` into Postman. Set the `baseUrl` variable to your local or deployed URL. Every request includes a description and saved example responses.

## Deployment (Render)
1. Create a free MongoDB Atlas cluster and copy the connection string (allow network access from `0.0.0.0/0`).
2. Create a new **Web Service** on Render from this GitHub repo.
3. Build command: `npm install` | Start command: `npm start`
4. Add the environment variable `MONGO_URI`.
