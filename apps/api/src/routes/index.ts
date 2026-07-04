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
import { instructorStudioRoutes } from "../modules/instructor-studio";
import { paymentRoutes } from "../modules/commerce/payment/payment.routes";
import { credentialRoutes } from "../modules/credentials";
import { notificationRoutes } from "../modules/notifications";
import { searchRoutes } from "../modules/search";

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
apiV1Router.use("/instructor-studio", instructorStudioRoutes);
apiV1Router.use("/payments", paymentRoutes);

// Mount identity & credential routes
apiV1Router.use("/credentials", credentialRoutes);

// Mount notification & communication routes
apiV1Router.use("/notifications", notificationRoutes);

// Mount search & discovery routes
apiV1Router.use("/search", searchRoutes);

// Mount v1 endpoints
apiV1Router.use("/", healthRouter);
router.use("/api/v1", apiV1Router);

export default router;
