import { Router } from "express";
import healthRouter from "./health";
import swaggerRouter from "./swagger";
import { authRouter } from "../modules/auth/auth.routes";

const router = Router();

// Expose API documentation outside global prefix versioning rules
router.use("/", swaggerRouter);

// Expose root health checking routes
router.use("/", healthRouter);

// A placeholder for modular routes (v1 namespace)
const apiV1Router = Router();

// Mount auth module routes
apiV1Router.use("/auth", authRouter);

// Mount v1 endpoints
apiV1Router.use("/", healthRouter);
router.use("/api/v1", apiV1Router);

export default router;
