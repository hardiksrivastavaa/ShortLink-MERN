import Url from "../models/url.js";
import { nanoid } from "nanoid";

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;

  try {
    if (!body.url) return res.status(400).json({ error: "Url is required" });

    let shortId = nanoid(8);

    await Url.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleRedirectToOriginalURL = async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId: shortId });
    if (!url) return res.status(404).json({ error: "No URL found" });
    url.visitHistory.push({ timestamps: Date.now() });
    await url.save();
    return res.redirect(url.redirectUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleAnalyticsForShortURL = async (req, res) => {
  try {
    const { shortUrl } = req.body;

    if (!shortUrl) {
      return res.status(400).json({ error: "Shortened URL is required" });
    }

    let shortId;
    try {
      const parsed = new URL(shortUrl);
      shortId = parsed.pathname.split("/").pop().trim();
    } catch (err) {
      shortId = shortUrl.split("/").pop().trim();
    }

    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: "No URL found for the given short link" });
    }

    const formattedHistory = url.visitHistory.map((entry) => ({
      "Visit ID": entry._id,
      "Visit Date": new Date(entry.timestamps).toLocaleString(),
    }));

    return res.json({
      shortId,
      totalClicks: url.visitHistory.length,
      visitHistory: formattedHistory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export {
  handleGenerateNewShortURL,
  handleRedirectToOriginalURL,
  handleAnalyticsForShortURL,
};




