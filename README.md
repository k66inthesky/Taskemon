# Taskemon
療癒系ToDo夥伴

> 你有拖延症，你不是不行，你只是沒人理解你，讓Taskemon來陪你把事情做完!

## 主要功能

1. **查看我的任務狀態** - 顯示當前任務進度和Taskemon的狀態
2. **整理雜亂思緒** - AI助手幫助整理和規劃任務
3. **我提不起勁** - 提供情緒支持和動力激勵
4. **我想看你後空翻** - 互動娛樂功能
5. **將我的成就鑄成NFT留念** - 基於Flow區塊鏈的成就NFT系統

## 技術實現
- Cursor Plugin API
- Gemini Pro API (主要LLM引擎)
- Flow區塊鏈 (NFT功能)
- TypeScript + React
- ASCII Art動畫

## LLM選擇
| LLM模型 | 輸入價格(/1K tokens) | 輸出價格(/1K tokens) | 特點 |
|---------|---------------------|---------------------|------|
| Gemini Pro | $0.00025 | $0.0005 | 最經濟實惠、性能優良 |
| GPT-3.5-Turbo | $0.0005 | $0.0015 | 穩定性好、生態完整 |
| Claude 2.1 | $0.008 | $0.024 | 長文本處理優秀 |
| GPT-4-Turbo | $0.01 | $0.03 | 性能最強、價格最高 |

基於成本效益比，我們選擇使用 **Gemini Pro** 作為主要LLM引擎。

## 開發狀態
本項目正在參加0gXFlow贊助的AI agent黑客松競賽開發中。

## 安裝方式
[開發中]

## 使用方法
[開發中]
這是一個AI agent chrome plugin
聊天部分，用戶的回答交給Gemini Pro作為LLM
使用flow blockchain鑄造NFT
