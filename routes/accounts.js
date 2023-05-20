const express = require('express');
const routes = express.Router();
const accountsFunctions = require('../controllers/accounts');
const { isAuthenticated } = require("../helpers/authenticate");

routes.get('/', isAuthenticated, accountsFunctions.getAll);
routes.get('/:id', isAuthenticated, accountsFunctions.getSingle_account);
routes.post('/', isAuthenticated, accountsFunctions.post_account);
routes.put('/:id', isAuthenticated, accountsFunctions.update_account);
routes.delete('/:id', isAuthenticated, accountsFunctions.delete_account);

module.exports = routes;