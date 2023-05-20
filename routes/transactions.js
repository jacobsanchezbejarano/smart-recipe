const express = require('express');
const routes = express.Router();
const transactionsFunctions = require('../controllers/transactions');
const { isAuthenticated } = require("../helpers/authenticate");

routes.get('/', isAuthenticated, transactionsFunctions.getAll_transactions);
routes.get('/:id', isAuthenticated, transactionsFunctions.getSingle_transactions);
routes.post('/', isAuthenticated, transactionsFunctions.post_transactions);
routes.put('/:id', isAuthenticated, transactionsFunctions.update_transactions);
routes.delete('/:id', isAuthenticated, transactionsFunctions.delete_transactions);

module.exports = routes;