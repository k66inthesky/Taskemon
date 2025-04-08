document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const loginContainer = document.querySelector('.login-container');
    
    // 主題切換
    if (themeToggle) {
        const htmlElement = document.documentElement;
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
    }

    if (loginContainer) {
        loginContainer.innerHTML = ''; // 移除按鈕和其他內容
    }

    const coffeeButton = document.querySelector('.action-button:nth-child(6)'); // 第六個按鈕
    if (coffeeButton) {
        coffeeButton.addEventListener('click', function() {
            window.open('https://buymeacoffee.com/k66inthesky', '_blank');
        });
    }

    const deepSeekButton = document.querySelector('.action-button:nth-child(2)'); // 第二個按鈕
    if (deepSeekButton) {
        deepSeekButton.addEventListener('click', function() {
            window.location.href = './organize.html'; // 跳轉到 organize.html
        });
    }

    const nftButton = document.querySelector('.action-button:nth-child(7)'); // 第七個按鈕
    if (nftButton) {
        nftButton.addEventListener('click', function() {
            window.location.href = './NFT.html'; // 跳轉到 NFT.html
        });
    }

    document.querySelector('.action-button:nth-child(5)').addEventListener('click', function() {
        window.location.href = './NFT.html';
    });
});