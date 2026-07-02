import { Router, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger";

const router = Router();

// Expose Swagger UI html documentation playground
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Expose raw OpenAPI JSON schema endpoint
router.get("/swagger.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

export default router;
