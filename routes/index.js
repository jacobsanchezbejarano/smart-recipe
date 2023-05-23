const express = require('express');
const routes = express.Router();
const passport = require('passport');

routes.use('/users', require('./users'));
routes.use('/recipes', require('./recipes'));
routes.use('/ingredients', require('./ingredients'));
routes.use('/meal_plans', require('./meal_plans'));

routes.use('/', require('./swagger'));

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = routes;
