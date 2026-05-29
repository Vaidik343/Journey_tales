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
        url: 'https://journey-tales.onrender.com',
        description: 'Production server',
      },
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

  // KEEP YOUR OLD PATH
  apis: ['./src/api-docs/*.js'],
};

module.exports = options;