const express = require('express');
const routes = express.Router();
const usersFunctions = require('../controllers/users');
const { isAuthenticated } = require("../helpers/authenticate");

routes.get('/', isAuthenticated, usersFunctions.getAll_users);
routes.get('/:id', isAuthenticated, usersFunctions.getSingle_users);
routes.post('/', isAuthenticated, usersFunctions.post_users);
routes.put('/:id', isAuthenticated, usersFunctions.update_users);
routes.delete('/:id', isAuthenticated, usersFunctions.delete_users);

module.exports = routes;