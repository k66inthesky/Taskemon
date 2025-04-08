// 監聽安裝事件
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Taskemon 已安裝');
    // 初始化存储
    chrome.storage.local.get('taskemonState', (result) => {
      if (!result.taskemonState) {
        const initialState = {
          name: 'Shapoo',
          level: 1,
          personality: '忠誠但害怕主人拋棄，請主人勿隨意拋棄。',
          mood: '開心',
          tasks: []
        };
        chrome.storage.local.set({ taskemonState: initialState });
      }
    });
  }
});

// 初始化 Google Sign-In
function initGoogleAuth() {
  const manifest = chrome.runtime.getManifest();
  return new Promise((resolve, reject) => {
    try {
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: manifest.oauth2.client_id,
          scope: 'profile email'
        }).then(
          (auth2) => resolve(auth2),
          (error) => {
            console.error('Google Auth Initialization Error:', error);
            reject(new Error('Failed to initialize Google Auth. Please check the client_id configuration.'));
          }
        );
      });
    } catch (error) {
      console.error('Unexpected Error during Google Auth Initialization:', error);
      reject(new Error('Unexpected error occurred during Google Auth initialization.'));
    }
  });
}

// 監聽來自彈出窗口的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'updateTaskemonState') {
    chrome.storage.local.set({ taskemonState: request.state }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'getAuthToken') {
    initGoogleAuth()
      .then(auth2 => {
        return auth2.signIn();
      })
      .then(googleUser => {
        const id_token = googleUser.getAuthResponse().id_token;
        sendResponse({ token: id_token });
      })
      .catch(error => {
        console.error('Auth Error:', error);
        sendResponse({ error: error.message });
      });
    return true;
  }
  
  return false;
});