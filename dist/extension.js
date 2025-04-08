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
    energy: 100,
    happiness: 80,
    achievements: [],
    tasks: []
};
// Taskemon表情動畫集
const taskemonEmotions = {
    happy: `
  \\(^ω^)/
   |_____|
    |   |
    |___|
`,
    excited: `
  \\(★ω★)/
   |_____|
    |   |
    |___|
`,
    tired: `
   (￣～￣)
   |_____|
    |   |
    |___|
`,
    sleeping: `
   (︶｡︶✽)
   |_____|
    |   |
    |___|
`,
    working: `
   (｀_ゝ´)
   |_____|
    |   |
    |___|
`
};
// 隨機鼓勵語句
const encouragements = [
    "你做得真棒！要不要休息一下？",
    "慢慢來，我會一直陪著你！",
    "太厲害了！這個任務完成得很漂亮！",
    "累了嗎？我們可以聊聊天~",
    "每完成一個任務都是一個小進步呢！"
];
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
    const currentEmotion = taskemonState.energy > 80 ? 'excited' :
        taskemonState.energy > 50 ? 'happy' :
            taskemonState.energy > 30 ? 'tired' : 'sleeping';
    const statusBars = `
能量: ${'▮'.repeat(Math.floor(taskemonState.energy / 10))}${'▯'.repeat(10 - Math.floor(taskemonState.energy / 10))}
心情: ${'♥'.repeat(Math.floor(taskemonState.happiness / 10))}${'♡'.repeat(10 - Math.floor(taskemonState.happiness / 10))}
`;
    return {
        type: 'markdown',
        content: `
✨ ${taskemonState.name} 的小天地 ✨
          Lv.${taskemonState.level}
${statusBars}
${taskemonEmotions[currentEmotion]}
${getRandomEncouragement()}

今天想做什麼呢？
🎯 查看任務進度
💭 整理思緒
🌟 需要打氣
🎪 看特技表演
🏆 成就殿堂
`,
        buttons: [
            {
                label: '📋 查看任務進度',
                command: 'taskemon.viewTasks',
                style: 'primary'
            },
            {
                label: '✏️ 整理思緒',
                command: 'taskemon.organizeThoughts',
                style: 'secondary'
            },
            {
                label: '💪 需要打氣',
                command: 'taskemon.needMotivation',
                style: 'warning'
            },
            {
                label: '🎪 看特技表演',
                command: 'taskemon.doBackflip',
                style: 'info'
            },
            {
                label: '🏆 成就殿堂',
                command: 'taskemon.mintNFT',
                style: 'success'
            }
        ]
    };
}
function getRandomEncouragement() {
    return encouragements[Math.floor(Math.random() * encouragements.length)];
}
async function handleViewTasks() {
    const pendingTasks = taskemonState.tasks.filter(t => t.status === 'pending');
    const completedTasks = taskemonState.tasks.filter(t => t.status === 'completed');
    const formatTask = (task) => {
        const difficultySymbol = {
            easy: '🟢',
            medium: '🟡',
            hard: '🔴'
        }[task.difficulty];
        return `${difficultySymbol} ${task.title} ${task.tags.map(t => `#${t}`).join(' ')}`;
    };
    const taskList = `
📝 進行中的任務:
${pendingTasks.length ? pendingTasks.map(task => formatTask(task)).join('\n') : '目前沒有進行中的任務~'}

✅ 已完成的任務:
${completedTasks.length ? completedTasks.map(task => formatTask(task)).join('\n') : '還沒有完成的任務，加油！'}
`;
    return {
        type: 'markdown',
        content: `
# 🎯 任務面板

${taskList}

${taskemonEmotions[taskemonState.energy > 50 ? 'working' : 'tired']}
${getRandomEncouragement()}
`,
        buttons: [
            {
                label: '➕ 新增任務',
                command: 'taskemon.organizeThoughts',
                style: 'primary'
            },
            {
                label: '🏠 返回主頁',
                command: 'taskemon.start',
                style: 'secondary'
            }
        ]
    };
}
async function handleOrganizeThoughts() {
    return {
        type: 'markdown',
        content: `
# ✨ 思緒整理時間 ✨

讓我幫你把想法變成清晰的任務！
可以告訴我：
1️⃣ 想完成什麼？
2️⃣ 預計花多少時間？
3️⃣ 有什麼特別注意的地方嗎？

${taskemonEmotions['excited']}
準備好聆聽你的想法了！
`,
        buttons: [
            {
                label: '🏠 返回主頁',
                command: 'taskemon.start',
                style: 'secondary'
            }
        ]
    };
}
async function handleNeedMotivation() {
    // 隨機選擇一個鼓勵方式
    const motivationTypes = [
        {
            title: '✨ 正能量時刻 ✨',
            content: '記住，每個人都有低潮的時候，重要的是我們一起度過它！'
        },
        {
            title: '🌟 小小回顧 🌟',
            content: `讓我們看看你已經完成了多少任務：
${taskemonState.tasks.filter(t => t.status === 'completed').length} 個任務！
真是了不起呢！`
        },
        {
            title: '💪 動力補給站 💪',
            content: '要不要先做個簡單的任務，找回成就感？'
        }
    ];
    const motivation = motivationTypes[Math.floor(Math.random() * motivationTypes.length)];
    return {
        type: 'markdown',
        content: `
# ${motivation.title}

${motivation.content}

${taskemonEmotions['happy']}
記住，我永遠支持你！

`,
        buttons: [
            {
                label: '💪 我準備好了',
                command: 'taskemon.viewTasks',
                style: 'success'
            },
            {
                label: '🏠 返回主頁',
                command: 'taskemon.start',
                style: 'secondary'
            }
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