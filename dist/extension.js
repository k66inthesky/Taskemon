/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ./src/extension.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let taskemonState = {
    name: 'Shapoo',
    level: 1,
    personality: '忠誠但害怕主人拋棄，請主人勿隨意拋棄。',
    mood: '開心',
    tasks: []
};
// Taskemon ASCII 藝術
const taskemonArt = `
| \\--/\\
| @ @  \\
|       _ _ _
   | | | |
`;
// 插件配置
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
    name: 'Taskemon',
    description: '療癒系ToDo夥伴',
    version: '0.0.1',
    commands: [
        {
            name: 'taskemon.start',
            description: '啟動 Taskemon',
            run: async () => {
                return showMainInterface();
            }
        },
        {
            name: 'taskemon.viewTasks',
            description: '查看任務狀態',
            run: async () => {
                return handleViewTasks();
            }
        },
        {
            name: 'taskemon.organizeThoughts',
            description: '整理雜亂思緒',
            run: async () => {
                return handleOrganizeThoughts();
            }
        },
        {
            name: 'taskemon.needMotivation',
            description: '我提不起勁',
            run: async () => {
                return handleNeedMotivation();
            }
        },
        {
            name: 'taskemon.doBackflip',
            description: '我想看你後空翻',
            run: async () => {
                return handleDoBackflip();
            }
        },
        {
            name: 'taskemon.mintNFT',
            description: '將成就鑄成NFT',
            run: async () => {
                return handleMintNFT();
            }
        }
    ]
});
// 顯示主界面
function showMainInterface() {
    return {
        type: 'markdown',
        content: `
-------------------------------
                    名稱:${taskemonState.name}
                     LV:${taskemonState.level}
                    個性:${taskemonState.personality}
${taskemonArt}
--------------------------------

請選擇以下功能：
1. 查看我的任務狀態
2. 整理雜亂思緒
3. 我提不起勁
4. 我想看你後空翻
5. 將我的成就鑄成NFT留念
`,
        buttons: [
            { label: '查看任務狀態', command: 'taskemon.viewTasks' },
            { label: '整理雜亂思緒', command: 'taskemon.organizeThoughts' },
            { label: '我提不起勁', command: 'taskemon.needMotivation' },
            { label: '我想看你後空翻', command: 'taskemon.doBackflip' },
            { label: '將成就鑄成NFT', command: 'taskemon.mintNFT' }
        ]
    };
}
// 處理各種功能
async function handleViewTasks() {
    const taskList = taskemonState.tasks.map(task => `- [${task.status === 'completed' ? 'x' : ' '}] ${task.title}`).join('\n');
    return {
        type: 'markdown',
        content: `
# 目前的任務
${taskList || '還沒有任何任務呢！要不要開始規劃一下？'}

${taskemonArt}
`,
        buttons: [
            { label: '返回主選單', command: 'taskemon.start' },
            { label: '添加新任務', command: 'taskemon.organizeThoughts' }
        ]
    };
}
async function handleOrganizeThoughts() {
    return {
        type: 'markdown',
        content: `
讓我幫你整理一下思緒吧！
告訴我你現在腦中的想法，我會幫你規劃成清晰的任務。

${taskemonArt}
`,
        buttons: [
            { label: '返回主選單', command: 'taskemon.start' }
        ]
    };
}
async function handleNeedMotivation() {
    return {
        type: 'markdown',
        content: `
別擔心，我陪著你！
要不要聊聊是什麼讓你提不起勁呢？

${taskemonArt}
`,
        buttons: [
            { label: '返回主選單', command: 'taskemon.start' }
        ]
    };
}
async function handleDoBackflip() {
    const frames = [
        `
   O
  /|\\
  / \\
`,
        `
    O
   /|\\
   / \\
`,
        `
     o
    /|\\
    / \\
`,
        `
  \\o/
   |
  / \\
`,
        `
   O
  /|\\
  / \\
`
    ];
    return {
        type: 'markdown',
        content: `
看我的厲害！

${frames[0]}

(動畫製作中...)
`,
        buttons: [
            { label: '返回主選單', command: 'taskemon.start' },
            { label: '再來一次', command: 'taskemon.doBackflip' }
        ]
    };
}
async function handleMintNFT() {
    return {
        type: 'markdown',
        content: `
準備將你的成就鑄造成獨一無二的 NFT！
請選擇要鑄造的成就：

1. 完成第一個任務
2. 連續工作突破 30 分鐘
3. 克服拖延症成功！

${taskemonArt}
`,
        buttons: [
            { label: '返回主選單', command: 'taskemon.start' }
        ]
    };
}

var __webpack_exports__default = __webpack_exports__["default"];
export { __webpack_exports__default as default };

//# sourceMappingURL=extension.js.map