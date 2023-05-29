const express = require('express');
const routes = express.Router();
const ingredientsFunctions = require('../controllers/ingredients');
const { isAuthenticated } = require('../helpers/authenticate');

routes.get('/', isAuthenticated, ingredientsFunctions.getAll_ingredients);
routes.get('/:id', isAuthenticated, ingredientsFunctions.getSingle_ingredients);
routes.get(
  '/ingredient_name/:ingredient_name',
  isAuthenticated,
  ingredientsFunctions.getSingle_ingredients_by_name
);
routes.post('/', isAuthenticated, ingredientsFunctions.post_ingredients);
routes.put('/:id', isAuthenticated, ingredientsFunctions.update_ingredients);
routes.delete('/:id', isAuthenticated, ingredientsFunctions.delete_ingredients);

module.exports = routes;
