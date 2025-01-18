const API_URL = process.env.API_URL || "https://api.siputzx.my.id/api/d";

async function fetchMedia() {
    const query = document.getElementById("search").value;
    if (!query) {
        alert("Please enter a search term or YouTube URL");
        return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("video-preview").style.display = "none";

    try {
        const response = await fetch(`${API_URL}/ytmp4?url=${encodeURIComponent(query)}`);
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
    const query = document.getElementById("search").value;
    if (!query) {
        alert("Please enter a search term or YouTube URL");
        return;
    }

    const format = type === "audio" ? "audio/mpeg" : "video/mp4";
    const downloadUrl = `${API_URL}/ytmp4?url=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(downloadUrl);
        const data = await response.json();
        
        if (data.data) {
            const link = document.createElement("a");
            link.href = data.data.dl;
            link.download = `download.${type === "audio" ? "mp3" : "mp4"}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("Failed to generate download link");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Download failed");
    }
}
