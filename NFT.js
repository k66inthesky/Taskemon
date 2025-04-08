// 檢查 fcl 是否正確加載
if (typeof fcl === 'undefined') {
    console.error('fcl 未正確加載，請檢查 fcl.min.js 是否完整或加載順序是否正確。');
} else {
    console.log('fcl 已正確加載。');
}

// 移除 import，改用全局變量
// Web3 和 fcl 已通過 script 標籤引入

// 配置 Flow SDK
fcl.config()
  .put("accessNode.api", "https://rest-testnet.onflow.org") // Testnet 節點
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn") // Lilico 錢包
  .put("app.detail.title", "Taskemon DApp")
  .put("app.detail.icon", "https://example.com/icon.png");

document.addEventListener('DOMContentLoaded', () => {
    const mintNFTButton = document.getElementById('mintNFT');
    const connectWalletButton = document.createElement('button');
    connectWalletButton.textContent = '連結 MetaMask 錢包';
    connectWalletButton.className = 'action-button';
    document.querySelector('.button-group').appendChild(connectWalletButton);

    let userAddress = null;

    const isMetaMaskInstalled = () => {
        return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
    };

    connectWalletButton.addEventListener('click', async () => {
        if (isMetaMaskInstalled()) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                userAddress = accounts[0];
                alert(`已連結 MetaMask 錢包: ${userAddress}`);
            } catch (error) {
                console.error('連結 MetaMask 錢包失敗:', error);
                alert('連結 MetaMask 錢包失敗，請稍後再試。');
            }
        } else {
            alert('未檢測到 MetaMask，請確認已安裝並啟用 MetaMask 擴充套件。');
        }
    });

    if (mintNFTButton) {
        mintNFTButton.addEventListener('click', async () => {
            if (!userAddress) {
                alert('請先連結 MetaMask 錢包。');
                return;
            }

            try {
                const web3 = new Web3(window.ethereum);
                const contractABI = [
                    // ...智能合約的 ABI...
                ];
                const contractAddress = 'YOUR_CONTRACT_ADDRESS';
                const contract = new web3.eth.Contract(contractABI, contractAddress);

                const tokenURI = 'https://example.com/metadata.json'; // NFT 的元數據 URI
                const result = await contract.methods.mintNFT(userAddress, tokenURI).send({
                    from: userAddress,
                });

                console.log('NFT 鑄造成功:', result);
                alert('NFT 鑄造成功！');
            } catch (error) {
                console.error('鑄造 NFT 時發生錯誤:', error);
                alert('鑄造 NFT 失敗，請稍後再試。');
            }
        });
    }

    // 新增日夜切換按鈕功能
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const htmlElement = document.documentElement;
        const currentTheme = localStorage.getItem('theme') || 'light';
        htmlElement.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'light' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
        });
    }

    // 新增回主頁按鈕功能
    const homeButton = document.getElementById('homeButton');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.href = 'popup.html';
        });
    }

    // 連結 Lilico 錢包
    const connectLilicoWalletButton = document.createElement("button");
    connectLilicoWalletButton.textContent = "連結 Lilico 錢包";
    connectLilicoWalletButton.className = "action-button";
    document.querySelector(".button-group").appendChild(connectLilicoWalletButton);

    connectLilicoWalletButton.addEventListener("click", async () => {
        try {
            const user = await fcl.authenticate();
            userAddress = user.addr;
            alert(`已連結錢包: ${userAddress}`);
        } catch (error) {
            console.error("連結錢包失敗:", error);
            alert("連結錢包失敗，請稍後再試。");
        }
    });

    // 鑄造 NFT
    const mintLilicoNFTButton = document.createElement("button");
    mintLilicoNFTButton.textContent = "鑄造 NFT";
    mintLilicoNFTButton.className = "action-button";
    document.querySelector(".button-group").appendChild(mintLilicoNFTButton);

    mintLilicoNFTButton.addEventListener("click", async () => {
        if (!userAddress) {
            alert("請先連結錢包。");
            return;
        }

        try {
            const transactionId = await fcl.mutate({
                cadence: `
                    transaction {
                        prepare(acct: AuthAccount) {
                            log("鑄造 NFT 成功！")
                        }
                    }
                `,
                proposer: fcl.currentUser().authorization,
                payer: fcl.currentUser().authorization,
                authorizations: [fcl.currentUser().authorization],
                limit: 100,
            });

            alert(`交易已提交，ID: ${transactionId}`);
        } catch (error) {
            console.error("鑄造 NFT 失敗:", error);
            alert("鑄造 NFT 失敗，請稍後再試。");
        }
    });
});