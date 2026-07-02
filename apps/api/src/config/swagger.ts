import swaggerJSDoc from "swagger-jsdoc";
import { config } from "./index";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PragyaOS Core API Documentation",
      version: "1.0.0",
      description: "Production-ready backend services documentation for PragyaOS LXP platform.",
      contact: {
        name: "Antigravity Engineering Support",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v1`,
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter Access Token (JWT) to authenticate requests.",
        },
      },
    },
  },
  // Paths to files containing OpenAPI specifications/comments
  apis: [
    "./src/routes/*.ts",
    "./src/modules/**/*.ts",
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
