
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const express = require('express');
const routes = express.Router();
const functions = require('../controllers/');
const passport = require('passport');

routes.use('/accounts', require('./accounts'));
routes.use('/transactions', require('./transactions'));
routes.use('/', require('./swagger'));

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });




module.exports = routes;