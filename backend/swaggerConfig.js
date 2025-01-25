// swaggerConfig.js
import  swaggerJSDoc  from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API Documentation for your project',
    },
  },
  apis: ['./routes/*.js'], // Paths to your route files with JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };