import express from "express";
import {
    handleGenerateNewShortURL,
    handleRedirectToOriginalURL,
    handleAnalyticsForShortURL,
} from "../controllers/url.js";

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectToOriginalURL);
router.post("/analytics/", handleAnalyticsForShortURL);

export default router;
