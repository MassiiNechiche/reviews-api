const router = require("express").Router();

import userRoutes from "./user.routes";
router.use("/user", userRoutes);

import reviewRoutes from "./review.routes";
router.use("/review", reviewRoutes);

export default router;
