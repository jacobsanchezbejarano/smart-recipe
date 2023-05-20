const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
var options = {
    customCss: '.swagger-ui .topbar { display: none }'
};

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = routes;