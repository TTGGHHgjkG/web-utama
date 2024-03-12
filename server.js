const rateLimit = require('express-rate-limit');
const express = require('express');
const axios = require('axios');
const os = require('os');
const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'ejs');
app.set('json spaces', 2);
app.use(express.static('views'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimal 100 requests per 15 menit
  message: "Terlalu banyak permintaan, silahkan coba lagi setelah 15 menit.",
});
app.use(limiter);

app.get('/', async (req, res) => {
    let data;
    try {
        const response = await axios.get('https://web-app-bot-489f88bd8283.herokuapp.com/get-api');
        data = response.data.bot;
    } catch (error) {
        console.error('Error:', error);
        data = {
            chatpc: 'server error', // Atur menjadi nilai default jika data tidak dapat diambil
            user: 'server error',
            hit: 'server error',
            uptime: 'server error'
        };
    }
    res.render('index', {
        chatpc: data.chatpc,
        user: data.user,
        hit: data.hit,
        uptime: data.uptime
    });
});

app.get("/stats", async (req, res) => {
  try {
    const cpuInfo = os.cpus()[0];
    console.log('CPU Speed:', cpuInfo.speed);
    
    const serverInfo = {
      os: {
        cpuCore: os.cpus().length,
        cpuModel: cpuInfo.model,
        uptime: os.uptime(),
        totalMemory: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
        freeMemory: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + " GB",
        speed: (cpuInfo.speed / 1000).toFixed(2) + " GHz",
      }
    };
    res.json(serverInfo);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server utama telah mati' });
  }
});

app.get('/server-bot', async (req, res) => {
    try {
        const response = await axios.get('https://web-app-bot-489f88bd8283.herokuapp.com/');
        const data = response.data.os;

        const formattedData = {
            CPUs: data.CPUs,
            model: data.model,
            uptime: data.uptime,
            totalMemory: data.totalMemory,
            freeMemory: data.freeMemory,
            speed: data.speed
        };

        res.json(formattedData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
