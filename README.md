# Taskemon
療癒系ToDo夥伴

> 你有拖延症，你不是不行，你只是沒人理解你，讓Taskemon來陪你把事情做完!
<img width="1437" alt="image" src="https://github.com/user-attachments/assets/5c23c957-ec40-4a7c-889a-c3a4a76c750e" />

+ [Demo Video on Youtube](https://youtu.be/M3RDVTMVDpE)


## 介紹

這是一個AI agent chrome plugin
當你事情做不完感到焦慮，和Taskemon聊天，讓它陪你完成任務，為獎勵這麼棒的你，來紀念一下吧！Taskemon幫你一鍵鑄造NFT。


## 主要功能

1. **整理雜亂思緒** - AI助手幫助整理和規劃任務
2. 打印成功勳章 - 鑄造NFT, 目前僅實現testnet terminal，待與button綁定。

3. **我提不起勁** - [待完成]提供情緒支持和動力激勵
4. **陪你放空** - [待完成]互動娛樂功能
5. 請作者喝咖啡 - buy me a coffee!

## 技術實現
- Deepseek API (LLM)
- Flow Cadence (mint NFT)
- Node.js

## LLM選擇
基於成本效益比，選擇使用 **Deepseek** 作為主要LLM引擎。

## 開發狀態
本項目正在參加0gXFlowXTinTinLand贊助的AI agent黑客松競賽開發階段性完成，未來再繼續完善。

## Install 安裝方式

+ 打開chrome瀏覽器
```
chrome://extensions/
```
+ 載入未封裝項目
  
![image](https://github.com/user-attachments/assets/f274bc83-cbd3-4857-a7ee-c601ebbc5387)

+ 出現此畫面表示成功

![image](https://github.com/user-attachments/assets/33cc0b44-5391-4719-99e4-0bbe9084a011)

```
git clone https://github.com/k66inthesky/Taskemon.git
```

server/.env
```
DEEPSEEK_API_URL="https://api.deepseek.com"
DEEPSEEK_API_KEY="" // <-- put your deepseek api key
```

```
npm install
```

## Execution 執行

1st terminal
```
nodemon server/index.js
```

open 2nd terminal
```
nodemon server/NFT.js
```

open 3rd terminal
```
flow emulator start
```

open 4th terminal
```
flow project deploy --network emulator
```

## 理想
> 取自我真實問chatGPT的經驗，它聰明到我認為可以利用來搞一個ai agent專門處理拖延症患者(心理價值+一鍵安排+任務管理+鑄NFT犒賞自己)

![image](https://github.com/user-attachments/assets/b045fb44-a111-481d-bd70-fc0ab75a42db)
![image](https://github.com/user-attachments/assets/7972a383-e5c1-481e-a072-fd1eb0450d01)
![image](https://github.com/user-attachments/assets/ff1dab7d-e327-4ccf-8ca7-de4022e1675c)
![image](https://github.com/user-attachments/assets/cb92883f-de3e-4e3e-b206-a80dfb00d603)
![image](https://github.com/user-attachments/assets/cf87a45e-7f86-40cb-b0f2-34785ba1c3fa)



## 現實
> 當初為了便宜使用DeepSeek API，但蠻後悔因為它沒chatGPT聰明，待改成chatGPT API

![image1](https://github.com/user-attachments/assets/cfeb2a18-b496-4b8a-a159-dc2bd06b3775)
![image2](https://github.com/user-attachments/assets/3ea7f2dd-b8c1-4474-80e7-6854324be2cd)
![image3](https://github.com/user-attachments/assets/28e43d9d-b2b8-4dcd-9bc2-2e16fccfbab6)
![image4](https://github.com/user-attachments/assets/5843e793-2607-4003-a4f1-4f304e31a98f)
