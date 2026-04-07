const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Journey Tales API',
      version: '1.0.0',
      description: 'API documentation for Journey Tales backend',
    },
    servers: [
      {
        url: 'http://localhost:7011',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/api-docs/*.js'], // Path to the Swagger spec files
};

module.exports = options;

