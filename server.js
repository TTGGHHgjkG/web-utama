const express = require('express');
const axios = require('axios');
const PORT = 3000;

const app = express();
const server = http.createServer(app);
  app.set('view engine', 'ejs');
  app.set('json spaces', 2);
  app.use(express.static('views'));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://web-app-bot-489f88bd8283.herokuapp.com/get');
        const data = response.data.bot;
        res.render('index', {
           chatpc: data.chatpc
           user: data.user
           hit: data.hit
           uptime: data.uptime
      };
    };
  });

app.get('/tes', async (req, res) => {
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
