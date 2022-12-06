import { Router } from "express";
import { createReview, reviews } from "../controllers/review.controller";

const router = Router();

router.get("/", reviews);

router.post("/create", createReview);

export default router;
