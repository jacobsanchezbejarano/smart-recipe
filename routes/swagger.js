const routes = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));
// var options = {
//     customCss: '.swagger-ui .topbar { display: none }'
// };

// routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = routes;
