const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Smart Recipe',
    description: 'Team Project'
  },
  host: 'smart-recipe.onrender.com',
  schemes: ['https'],
  // host: 'localhost:3000',
  // schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
