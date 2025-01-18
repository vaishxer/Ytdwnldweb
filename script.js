const API_URL = process.env.API_URL || "https://api.siputzx.my.id/api/d"; // Fallback if .env not loaded

async function fetchMedia() {
    const query = document.getElementById("query").value;
    if (!query) {
        alert("Please enter a search term or YouTube URL");
        return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("video-preview").style.display = "none";

    try {
        const searchUrl = `${API_URL}/ytmp4?url=${encodeURIComponent(query)}`;
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.data) {
            document.getElementById("video-title").innerText = data.data.title;
            document.getElementById("video-preview").style.display = "block";
        } else {
            alert("Failed to fetch video details");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching data");
    } finally {
        document.getElementById("loading").style.display = "none";
    }
}

async function downloadMedia(type) {
    const query = document.getElementById("query").value;
    if (!query) {
        alert("Please enter a search term or YouTube URL");
        return;
    }

    const apiUrl = type === "audio" ? `${API_URL}/ytmp3?url=${encodeURIComponent(query)}` : `${API_URL}/ytmp4?url=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.data) {
            window.open(data.data.dl, "_blank");
        } else {
            alert("Failed to fetch download link");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while downloading");
    }
}
