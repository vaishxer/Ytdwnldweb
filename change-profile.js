const { WAConnection } = require('@adiwajshing/baileys');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer to handle image uploads
const upload = multer({ dest: '/tmp/' });

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        // Handle file upload
        const file = req.files.file;
        const filePath = path.join('/tmp/', file.name);
        
        // Save the uploaded image temporarily
        fs.writeFileSync(filePath, file.data);

        // WhatsApp authentication with Baileys
        const conn = new WAConnection();
        
        conn.on('qr', (qr) => {
            res.status(200).json({ qrCode: qr });
        });

        conn.on('open', async () => {
            // Once connected, change profile picture using the uploaded file
            await conn.updateProfilePicture(filePath); // You may need to adjust this part for profile picture update

            // Respond with success
            res.status(200).json({ message: 'Profile picture updated!' });
        });

        await conn.connect();
    } else {
        res.status(404).json({ error: 'Route not found' });
    }
};
