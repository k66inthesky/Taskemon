import OpenAI from 'openai';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加載 .env 文件，指定路徑為 server 資料夾
dotenv.config({ path: './server/.env' });

if (!process.env.DEEPSEEK_API_KEY || !process.env.DEEPSEEK_API_URL) {
    console.error('環境變數未正確設置，請檢查 .env 文件');
    console.log('DEEPSEEK_API_URL:', process.env.DEEPSEEK_API_URL|| 'https://api.deepseek.ai/v1');
    console.log('DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY || "sk-2ace821221534078b5846f5be5054944");
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// 確保環境變數正確應用
const openai = new OpenAI({
    baseURL: process.env.DEEPSEEK_API_URL,
    apiKey: process.env.DEEPSEEK_API_KEY
});

if (!openai.baseURL || !openai.apiKey) {
    console.error('OpenAI 初始化失敗，請檢查環境變數 DEEPSEEK_API_URL 和 DEEPSEEK_API_KEY');
    process.exit(1);
}

app.use(express.json());

// 提供靜態檔案
app.use(express.static(path.join(__dirname, '../')));

// DeepSeek API 代理端點
app.post('/api/deepseek', async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
    }

    try {
        const completion = await openai.chat.completions.create({
            model: 'deepseek-chat',
            messages
        });

        res.json(completion.choices[0].message.content);
    } catch (error) {
        console.error('DeepSeek API 錯誤:', error.response?.data || error.message);
        res.status(500).json({ error: '無法連接到 DeepSeek API' });
    }
});

app.get('/api/deepseek/quota', async (req, res) => {
    try {
        const quotaResponse = await openai.quota.retrieve(); // 假設 DeepSeek 提供額度查詢 API
        res.json(quotaResponse);
    } catch (error) {
        console.error('無法檢查 DeepSeek 額度:', error.response?.data || error.message);
        res.status(500).json({ error: '無法檢查 DeepSeek 額度' });
    }
});

// 創建 HTTP 伺服器
const server = createServer(app);

// 創建 WebSocket 伺服器，並附加到 HTTP 伺服器
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('用戶已連接');

    ws.on('message', async (message) => {
        // 堅持不在後台即使開發環境中記錄用戶敏感訊息，讓用戶感到安全
        // 如果需要調試，可以取消註解下面這行
        // console.log('收到訊息:', message.toString());

        try {
            const completion = await openai.chat.completions.create({
                model: 'deepseek-chat',
                messages: [
                    { role: 'user', content: message.toString() }
                ]
            });

            if (!completion || !completion.choices || completion.choices.length === 0) {
                throw new Error('API 回應無效或缺少 choices');
            }

            const response = completion.choices[0]?.message?.content;
            if (!response) {
                throw new Error('API 回應中缺少 message content');
            }

            ws.send(`<div class='deepseek-message'><img src='/logo.svg' alt='DeepSeek Logo' class='chat-logo'><div class='deepseek-text'>${response}</div></div>`);
        } catch (error) {
            console.error('DeepSeek API 錯誤:', error.response?.data || error.message);

            if (error.response?.status === 404) {
                ws.send('抱歉，找不到相關資源。請確認您的請求內容是否正確。');
            } else if (error.response?.status === 500) {
                ws.send('伺服器內部錯誤，請稍後再試。');
            } else {
                ws.send('抱歉，目前無法處理您的請求。');
            }
        }
    });

    ws.on('close', () => {
        console.log('用戶已斷開連接');
    });
});

// 啟動 HTTP 和 WebSocket 伺服器
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});