const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    try {
        // Lakukan permintaan ke api.xnd.me
        const response = await axios.get('https://web-app-bot-489f88bd8283.herokuapp.com/stats');
        const data = response.data.os;

        // Format ulang data sesuai kebutuhan
        const formattedData = {
            CPUs: data.CPUs,
            model: data.model,
            uptime: data.uptime,
            totalMemory: data.totalMemory,
            freeMemory: data.freeMemory,
            speed: data.speed
        };

        // Kirim data ke www.xinzuo.xyz
        res.json(formattedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
