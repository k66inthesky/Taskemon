# Taskemon
療癒系ToDo夥伴

> 你有拖延症，你不是不行，你只是沒人理解你，讓Taskemon來陪你把事情做完!
<img width="1437" alt="image" src="https://github.com/user-attachments/assets/5c23c957-ec40-4a7c-889a-c3a4a76c750e" />

[Youtube](https://youtu.be/M3RDVTMVDpE)
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
本項目正在參加0gXFlowXTinTinLand贊助的AI agent黑客松競賽開發中。

## Install 安裝方式
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

## 使用方法
這是一個AI agent chrome plugin
當你事情做不完感到焦慮，和Taskemon聊天，讓它陪你完成任務，完成任務這麼棒的你，來紀念一下吧！Taskemon幫你一鍵鑄造NFT。
