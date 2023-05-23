const express = require('express');
const routes = express.Router();
const recipesFunctions = require('../controllers/recipes');
const { isAuthenticated } = require('../helpers/authenticate');

routes.get('/', isAuthenticated, recipesFunctions.getAll_recipes);
routes.get('/:id', isAuthenticated, recipesFunctions.getSingle_recipes);
routes.get('/:recipe_title', isAuthenticated, recipesFunctions.getSingle_recipes_by_recipe_title);
routes.post('/', isAuthenticated, recipesFunctions.post_recipes);
routes.put('/:id', isAuthenticated, recipesFunctions.update_recipes);
routes.delete('/:id', isAuthenticated, recipesFunctions.delete_recipes);

module.exports = routes;
