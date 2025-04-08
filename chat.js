const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// 模擬 WebSocket 或 API 即時通訊
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
    console.log('已連接到伺服器');
};

socket.onmessage = (event) => {
    const message = document.createElement('div');
    message.className = 'deepseek-message';

    // 將接收到的 HTML 回應解析為 DOM 元素
    const parser = new DOMParser();
    const parsedHTML = parser.parseFromString(event.data, 'text/html');
    const logo = parsedHTML.querySelector('img.chat-logo');
    const text = parsedHTML.querySelector('div.deepseek-text');

    if (logo) message.appendChild(logo);
    if (text) message.appendChild(text);

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 確保樣式只插入一次
    if (!document.querySelector('style[data-chat-style]')) {
        const style = document.createElement('style');
        style.setAttribute('data-chat-style', 'true');
        style.textContent = `
            .chat-logo {
                width: 30px;
                height: 30px;
                margin-right: 10px;
                vertical-align: middle;
            }
            .deepseek-message {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
            .deepseek-text {
                flex: 1;
            }
        `;
        document.head.appendChild(style);
    }
};

sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        // 顯示用戶訊息
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = message;
        chatMessages.appendChild(userMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // 發送訊息到伺服器
        socket.send(message);
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

// 新增 organize.html 的按鈕功能邏輯
const homeButton = document.getElementById('homeButton');
const toggleThemeButton = document.getElementById('toggleThemeButton');

if (homeButton) {
    homeButton.addEventListener('click', () => {
        window.location.href = 'popup.html';
    });
}

if (toggleThemeButton) {
    const htmlElement = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    toggleThemeButton.textContent = currentTheme === 'light' ? '☀️' : '🌙';

    toggleThemeButton.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleThemeButton.textContent = newTheme === 'light' ? '☀️' : '🌙';
    });
}