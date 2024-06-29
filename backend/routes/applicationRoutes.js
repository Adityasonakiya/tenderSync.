import express from "express";
import {
  tendermanagerGetAllApplications,
  bidderDeleteApplication,
  bidderGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/tendermanager/getall", isAuthenticated, tendermanagerGetAllApplications);
router.get("/bidder/getall", isAuthenticated, bidderGetAllApplications);
router.delete("/delete/:id", isAuthenticated, bidderDeleteApplication);

export default router;
