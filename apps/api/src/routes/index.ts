import { Router } from "express";
import healthRouter from "./health";
import swaggerRouter from "./swagger";
import { authRouter } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/users";
import { categoryRoutes } from "../modules/categories";
import { courseRoutes } from "../modules/courses";
import { learningUnitRoutes } from "../modules/learning-units";
import { mediaRoutes } from "../modules/media";
import { learningEngineRoutes } from "../modules/learning-engine";

const router = Router();

// Expose API documentation outside global prefix versioning rules
router.use("/", swaggerRouter);

// Expose root health checking routes
router.use("/", healthRouter);

// A placeholder for modular routes (v1 namespace)
const apiV1Router = Router();

// Mount auth module routes
apiV1Router.use("/auth", authRouter);

// Mount user module routes
apiV1Router.use("/users", userRoutes);

// Mount content domain routes
apiV1Router.use("/categories", categoryRoutes);
apiV1Router.use("/courses", courseRoutes);
apiV1Router.use("/learning-units", learningUnitRoutes);
apiV1Router.use("/media", mediaRoutes);
apiV1Router.use("/learning-engine", learningEngineRoutes);

// Mount v1 endpoints
apiV1Router.use("/", healthRouter);
router.use("/api/v1", apiV1Router);

export default router;
