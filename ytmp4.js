module.exports = async (req, res) => {
  const url = req.query.url;  // URL passed from the frontend

  try {
    const response = await fetch(`${process.env.YT_API_MP4_URL}?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data.data) {
      return res.status(200).json(data);
    } else {
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  } catch (error) {
    console.error("Error fetching MP4 data:", error);
    return res.status(500).json({ error: "An error occurred while fetching MP4 data" });
  }
};
