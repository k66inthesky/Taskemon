document.addEventListener('DOMContentLoaded', async function() {
    const themeToggle = document.getElementById('themeToggle');
    const googleSignIn = document.getElementById('googleSignIn');
    const htmlElement = document.documentElement;
    
    // 從 localStorage 獲取主題設置
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'light' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
    });

    // 載入配置文件並初始化 Google Sign In
    async function initializeGoogleSignIn() {
        try {
            const response = await fetch('config.json');
            const config = await response.json();
            
            // 等待 Google Identity Services 腳本加載完成
            await new Promise((resolve) => {
                if (window.google && window.google.accounts && window.google.accounts.id) {
                    resolve();
                } else {
                    // 監聽腳本加載完成事件
                    const checkGoogleScript = setInterval(() => {
                        if (window.google && window.google.accounts && window.google.accounts.id) {
                            clearInterval(checkGoogleScript);
                            resolve();
                        }
                    }, 100);
                }
            });

            // 初始化 Google Sign In
            window.google.accounts.id.initialize({
                client_id: config.google.client_id,
                callback: handleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true
            });

            // 設置自定義按鈕點擊事件
            if (googleSignIn) {
                googleSignIn.addEventListener('click', () => {
                    window.google.accounts.id.prompt((notification) => {
                        if (notification.isNotDisplayed()) {
                            console.error('顯示錯誤:', notification.getNotDisplayedReason());
                        } else if (notification.isSkippedMoment()) {
                            console.error('跳過原因:', notification.getSkippedReason());
                        }
                    });
                });
            }
        } catch (error) {
            console.error('初始化失敗:', error);
            showError('初始化 Google 登入失敗');
        }
    }

    // 啟動初始化
    initializeGoogleSignIn();

    // 處理 Google 登入回調
    function handleCredentialResponse(response) {
        if (response.credential) {
            const token = response.credential;
            handleSignedIn(token);
        } else {
            console.error('登入失敗: 未獲取到憑證');
            showError('登入失敗：未獲取到授權令牌');
        }
    }

    // 處理登入成功
    function handleSignedIn(token) {
        console.log('處理登入成功');
        document.body.classList.add('logged-in');
        getUserInfo(token);
    }

    // 獲取用戶信息
    function getUserInfo(token) {
        console.log('正在獲取用戶信息...');
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('獲取用戶信息失敗：' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('成功獲取用戶信息:', data);
            chrome.storage.local.set({ 
                userInfo: {
                    name: data.name,
                    email: data.email,
                    picture: data.picture
                }
            }, function() {
                if (chrome.runtime.lastError) {
                    console.error('保存用戶信息失敗:', chrome.runtime.lastError);
                } else {
                    console.log('用戶信息已保存');
                }
            });
            updateUIWithUserInfo(data);
        })
        .catch(error => {
            console.error('獲取用戶信息時出錯:', error);
            showError(error.message);
        });
    }

    // 更新界面顯示用戶信息
    function updateUIWithUserInfo(userInfo) {
        console.log('更新界面顯示用戶信息');
        const taskemonInfo = document.querySelector('.taskemon-info p');
        if (taskemonInfo) {
            taskemonInfo.textContent = `歡迎回來，${userInfo.name}`;
        }
    }

    // 顯示錯誤信息
    function showError(message) {
        console.error('顯示錯誤:', message);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #721c24;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            padding: 8px;
            border-radius: 4px;
            margin-top: 8px;
            font-size: 14px;
            text-align: center;
        `;
        
        const loginContainer = document.querySelector('.login-container');
        const existingError = loginContainer.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        loginContainer.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}); 