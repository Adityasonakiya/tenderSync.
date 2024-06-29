import express from "express";
import {
  deleteTender,
  getAllTenders,
  getMyTenders,
  getSingleTender,
  postTender,
  updateTender,
} from "../controllers/tenderController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllTenders);
router.post("/post", isAuthenticated, postTender);
router.get("/getmytenders", isAuthenticated, getMyTenders);
router.put("/update/:id", isAuthenticated, updateTender);
router.delete("/delete/:id", isAuthenticated, deleteTender);
router.get("/:id", isAuthenticated, getSingleTender);

export default router;
