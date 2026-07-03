import { Router } from "express";
import healthRouter from "./health";
import swaggerRouter from "./swagger";

const router = Router();

// Expose API documentation outside global prefix versioning rules
router.use("/", swaggerRouter);

// Expose root health checking routes
router.use("/", healthRouter);

// A placeholder for modular routes (v1 namespace)
const apiV1Router = Router();
// Here we will load: apiV1Router.use("/auth", authRouter); etc.

// Mount v1 endpoints
apiV1Router.use("/", healthRouter);
router.use("/api/v1", apiV1Router);

export default router;
