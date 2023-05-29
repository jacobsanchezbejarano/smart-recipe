const express = require('express');
const routes = express.Router();
const meal_plansFunctions = require('../controllers/meal_plans');
const { isAuthenticated } = require('../helpers/authenticate');

routes.get('/', isAuthenticated, meal_plansFunctions.getAll_meal_plans);
routes.get('/:id', isAuthenticated, meal_plansFunctions.getSingle_meal_plans);
routes.get('/recipe/:recipe', isAuthenticated, meal_plansFunctions.getSingle_meal_plans_by_recipe_name);
routes.post('/', isAuthenticated, meal_plansFunctions.post_meal_plans);
routes.put('/:id', isAuthenticated, meal_plansFunctions.update_meal_plans);
routes.delete('/:id', isAuthenticated, meal_plansFunctions.delete_meal_plans);

module.exports = routes;
