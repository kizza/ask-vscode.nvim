(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["askVscode"] = factory();
	else
		root["askVscode"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common.ts":
/*!***********************!*\
  !*** ./src/common.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.attempt = (promise, attempts, delay = 0) => new Promise((resolve, reject) => {\n    const retry = (count) => {\n        promise()\n            .then(resolve)\n            .catch(() => {\n            if (count === 0) {\n                reject();\n            }\n            else {\n                exports.wait(delay).then(() => retry(count - 1));\n            }\n        });\n    };\n    retry(attempts);\n});\nexports.wait = (timeout) => new Promise((resolve, _) => {\n    setTimeout(resolve, timeout);\n});\nexports.promiseSerial = (funcs) => funcs.reduce((promise, func) => promise.then(result => func().then(() => exports.wait(1).then(Array.prototype.concat.bind(result)))), Promise.resolve([]));\nvar RequestType;\n(function (RequestType) {\n    RequestType[\"CodeAction\"] = \"CODE_ACTION\";\n    RequestType[\"ChangeWorkspace\"] = \"CHANGE_WORKSPACE\";\n    RequestType[\"Ping\"] = \"PING\";\n})(RequestType = exports.RequestType || (exports.RequestType = {}));\nvar ResponseType;\n(function (ResponseType) {\n    ResponseType[\"CodeAction\"] = \"CODE_ACTION\";\n    ResponseType[\"WrongWorkspace\"] = \"WRONG_WORKSPACE\";\n    ResponseType[\"Pong\"] = \"PONG\";\n})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));\nexports.isCodeActionResponse = (response) => response.type === ResponseType.CodeAction;\n\n\n//# sourceURL=webpack://askVscode/./src/common.ts?");

/***/ }),

/***/ "./src/const.ts":
/*!**********************!*\
  !*** ./src/const.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.PLUGIN = \"vim_ask_vscode\";\nexports.LAST_CODE_ACTION_RESPONSE_KEY = `${exports.PLUGIN}_last_codeaction_response`;\nexports.POPUP_MENU_ITEMS = `${exports.PLUGIN}_popup_items`;\n\n\n//# sourceURL=webpack://askVscode/./src/const.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! ./common */ \"./src/common.ts\");\nconst const_1 = __webpack_require__(/*! ./const */ \"./src/const.ts\");\nconst index_spec_1 = __webpack_require__(/*! ./test/index.spec */ \"./src/test/index.spec.ts\");\nconst vim_1 = __webpack_require__(/*! ./vim */ \"./src/vim.ts\");\nconst vscode_1 = __webpack_require__(/*! ./vscode */ \"./src/vscode.ts\");\nconst requestCodeAction = (plugin) => (request) => __awaiter(this, void 0, void 0, function* () {\n    const { confirm, error, openPopupMenu, setStatus } = vim_1.vim(plugin);\n    return setStatus(\"Asking vscode...\")\n        .then(() => vscode_1.sendToVscode(request))\n        .then((response) => {\n        if (common_1.isCodeActionResponse(response)) {\n            return setStatus(response.status)\n                .then(() => plugin.nvim.setVar(const_1.LAST_CODE_ACTION_RESPONSE_KEY, JSON.stringify(response)))\n                .then(() => openPopupMenu(response.actions.map(vim_1.actionToPopupItem)));\n        }\n        switch (response.type) {\n            case common_1.ResponseType.WrongWorkspace:\n                confirm(\"Change vscode to correct workspace?\").then(yes => {\n                    if (yes) {\n                        vscode_1.changeWorkspace(request.rootPath)\n                            .then((response) => setStatus(response.status))\n                            .then(() => vscode_1.executeAfterPing(() => requestCodeAction(plugin)(request), 800))\n                            .catch(e => {\n                            error(\"Vscode took too long\", e);\n                        });\n                    }\n                });\n                break;\n            default:\n                setStatus(response.status);\n        }\n    })\n        .catch((e) => {\n        setStatus(e.message);\n        console.log(\"Error requesting code action\", e);\n    });\n});\nmodule.exports = (plugin) => {\n    const { applyTextChanges, error, openPopupMenu, setStatus } = vim_1.vim(plugin);\n    plugin.setOptions({ dev: false, alwaysInit: false });\n    plugin.registerCommand(\"AskVisualStudioCode\", () => plugin.nvim.command('call AskVisualStudioCodeCallback(getcwd(), expand(\"%\"), join(getline(1, \"$\"), \"\\n\"), line(\".\"), col(\".\"), expand(\"<cword>\"))'));\n    plugin.registerFunction(\"AskVisualStudioCodeCallback\", (args) => {\n        const [rootPath, filePath, buffer, line, offset, word] = args.map(arg => arg.toString());\n        const request = {\n            type: common_1.RequestType.CodeAction,\n            rootPath: rootPath,\n            filePath: filePath,\n            buffer: buffer,\n            line: parseInt(line),\n            offset: parseInt(offset),\n            word: word\n        };\n        requestCodeAction(plugin)(request);\n    });\n    plugin.registerFunction(\"AskVisualStudioCodeSelect\", (a) => plugin.nvim\n        .getVar(const_1.LAST_CODE_ACTION_RESPONSE_KEY)\n        .then(value => {\n        const lastResponse = JSON.parse(value.toString());\n        const index = parseInt(a.toString());\n        const selectedAction = lastResponse.actions[index];\n        return selectedAction && applyTextChanges(selectedAction.textChanges);\n    })\n        .catch(e => {\n        error(\"Error responding to popup\", e);\n    }));\n    //\n    // Test\n    //\n    plugin.registerCommand(\"PingVisualStudioCode\", () => common_1.attempt(vscode_1.pingVscode, 5, 800)\n        .then(() => setStatus(\"Got back pong\"))\n        .catch(() => setStatus(\"No pong\")));\n    plugin.registerCommand(\"TestAskVisualStudioCode\", () => {\n        index_spec_1.test(plugin);\n    });\n    plugin.registerCommand(\"TestPopup\", () => __awaiter(this, void 0, void 0, function* () {\n        const response = {\n            status: \"\",\n            type: common_1.ResponseType.CodeAction,\n            actions: [\n                { title: \"My first code action\", textChanges: [] },\n                { title: \"My second code action\", textChanges: [] }\n            ]\n        };\n        return plugin.nvim\n            .setVar(const_1.LAST_CODE_ACTION_RESPONSE_KEY, JSON.stringify(response))\n            .then(() => openPopupMenu(response.actions.map(vim_1.actionToPopupItem)));\n    }));\n};\n\n\n//# sourceURL=webpack://askVscode/./src/index.ts?");

/***/ }),

/***/ "./src/test/helpers.ts":
/*!*****************************!*\
  !*** ./src/test/helpers.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.describe = (description, test) => {\n    console.log(`Running ${description}`);\n    return test();\n};\nexports.it = (description, test) => exports.describe(description, test);\n\n\n//# sourceURL=webpack://askVscode/./src/test/helpers.ts?");

/***/ }),

/***/ "./src/test/index.spec.ts":
/*!********************************!*\
  !*** ./src/test/index.spec.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/*\nimport {\n  one,\n  two,\n  three,\n  four,\n  five,\n  six,\n  seven,\n  eight,\n  nine\n} from \"./file1\";\nimport {\n  foo,\n  bar,\n  ridiculouslyLongFunctionCausingTheImportToWrap\n} from \"./file2\";\n\nconst fakeFunction = s => console.log(s);\nfake_Function(\"temp\");\n\nconsole.log(one, two, three, four, six, seven, eight, nine, ten);\nconsole.log(foo, bar);\n*/\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n//\n// The content above is meant to be fixed via the test code execution below\n// Simply run \":TestAskVisualStudioCode\" and watch\n//\nconst vim_1 = __webpack_require__(/*! ../vim */ \"./src/vim.ts\");\nconst helpers_1 = __webpack_require__(/*! ./helpers */ \"./src/test/helpers.ts\");\nexports.test = (plugin) => helpers_1.describe(\"applyTextChange\", () => __awaiter(this, void 0, void 0, function* () {\n    const { applyTextChanges } = vim_1.vim(plugin);\n    return helpers_1.it(\"`Change spelling to 'fakeFunction'`\", () => applyTextChanges([\n        {\n            start: { line: 20, offset: 1 },\n            end: { line: 20, offset: 14 },\n            newText: \"fakeFunction\"\n        }\n    ]))\n        .then(() => helpers_1.it(\"`Infer parameter types from usage` (for s)\", () => applyTextChanges([\n        {\n            start: {\n                line: 19,\n                offset: 22\n            },\n            end: {\n                line: 19,\n                offset: 22\n            },\n            newText: \"(\"\n        },\n        {\n            start: {\n                line: 19,\n                offset: 23\n            },\n            end: {\n                line: 19,\n                offset: 23\n            },\n            newText: \": any\"\n        },\n        {\n            start: {\n                line: 19,\n                offset: 23\n            },\n            end: {\n                line: 19,\n                offset: 23\n            },\n            newText: \")\"\n        }\n    ])))\n        .then(() => helpers_1.it(\"`Remove decleration for ridiculouslyLongFunctionCausingTheImportToWrap`\", () => applyTextChanges([\n        {\n            start: {\n                line: 15,\n                offset: 6\n            },\n            end: {\n                line: 16,\n                offset: 3\n            },\n            newText: \"\"\n        },\n        {\n            start: {\n                line: 16,\n                offset: 3\n            },\n            end: {\n                line: 17,\n                offset: 1\n            },\n            newText: \"\"\n        }\n    ])))\n        .then(() => helpers_1.it(\"`Add declaration for: 'ten'`\", () => applyTextChanges([\n        {\n            start: { line: 11, offset: 7 },\n            end: { line: 11, offset: 7 },\n            newText: \",\"\n        },\n        {\n            start: { line: 11, offset: 7 },\n            end: { line: 11, offset: 7 },\n            newText: \"\\n  ten\"\n        }\n    ])).then(() => helpers_1.it(\"`Remove declaration for: 'five'`\", () => applyTextChanges([\n        {\n            start: { line: 7, offset: 3 },\n            end: { line: 8, offset: 3 },\n            newText: \"\"\n        }\n    ])).then(() => { })));\n}));\n\n\n//# sourceURL=webpack://askVscode/./src/test/index.spec.ts?");

/***/ }),

/***/ "./src/vim.ts":
/*!********************!*\
  !*** ./src/vim.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! ./common */ \"./src/common.ts\");\nconst const_1 = __webpack_require__(/*! ./const */ \"./src/const.ts\");\nconst { assign } = Object;\nconst escape = (text) => text.replace(/\\\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\");\nconst execute = (keystrokes) => `execute 'normal! ${keystrokes}'`;\nexports.actionToPopupItem = (action, index) => ({\n    word: action.title,\n    user_data: index\n});\nexports.vim = (plugin) => {\n    const log = (message) => console.log(message);\n    const setStatus = (message) => plugin.nvim.command(`echo \"${message}\"`);\n    const error = (message, ...rest) => {\n        console.error(message, ...rest);\n        setStatus(message);\n    };\n    const getBuffer = () => plugin.nvim.commandOutput('echo join(getline(1, \"$\"), \"\\n\")');\n    const confirm = (question) => plugin.nvim\n        .commandOutput(`echo confirm(\"${escape(question)}\", \"&Yes\\n&No\", 1)`)\n        .then((response) => response.split(\"\\n\").pop() === \"1\");\n    const getCharacterStyles = () => Promise.resolve({ letter: \"$\", fg: \"blue\" })\n        .then(context => plugin.nvim\n        .commandOutput(\"echo strcharpart(strpart(getline('.'), col('.') - 1), 0, 1)\")\n        .then((letter) => assign({}, context, { letter })))\n        .then(context => plugin.nvim\n        .commandOutput('echo synIDattr(synID(line(\".\"),col(\".\"),1),\"fg\")')\n        .then((fg) => assign({}, context, { fg })));\n    const openPopupMenu = (items) => __awaiter(this, void 0, void 0, function* () {\n        const styles = yield getCharacterStyles();\n        const buffer = (yield plugin.nvim.createBuffer(false, true));\n        yield plugin.nvim.setVar(const_1.POPUP_MENU_ITEMS, JSON.stringify(items));\n        yield buffer.setLines(styles.letter, {\n            start: 0,\n            end: -1,\n            strictIndexing: false\n        });\n        yield plugin.nvim.openWindow(buffer, true, {\n            relative: \"cursor\",\n            row: 0,\n            col: 0,\n            width: 1,\n            height: 1\n        });\n        yield plugin.nvim.command(`set filetype=popupmenu|syn match vscodecontext \".\"|hi vscodecontext cterm=underline ctermfg=${styles.fg}`);\n    });\n    const confirmTextChange = (action) => __awaiter(this, void 0, void 0, function* () {\n        const { confirm, applyTextChanges } = exports.vim(plugin);\n        const { textChanges } = action;\n        const { start, end } = textChanges[0];\n        const info = ` (${start.line}:${start.offset}, ${end.line}:${end.offset}) x ${textChanges.length}`;\n        return confirm(`${action.title}${info}`).then(yes => {\n            if (yes) {\n                applyTextChanges(action.textChanges);\n            }\n        });\n    });\n    const applyTextChanges = (textChanges) => common_1.promiseSerial(textChanges.reverse().map(textChange => () => applyTextChange(textChange)));\n    const applyTextChange = (textChange) => {\n        const { start, end, newText } = textChange;\n        const sameLine = start.line === end.line;\n        const sameOffset = start.offset === end.offset;\n        if (sameLine && sameOffset) {\n            return insertText(textChange);\n        }\n        else if (newText === \"\") {\n            return deleteText(textChange);\n        }\n        else if (newText !== \"\") {\n            return updateText(textChange);\n        }\n        else {\n            return setStatus(\"Action is not yet supported :(\");\n        }\n    };\n    const copyText = (text) => plugin.nvim.command(`let @v = \"${escape(text)}\"`);\n    const positionCursor = (x, y) => plugin.nvim\n        .commandOutput(`call cursor(${x}, ${y})|echo col(\".\")`)\n        .then(value => parseInt(value));\n    const withinPasteMode = (command) => plugin.nvim\n        .command(\"setlocal paste\")\n        .then(() => plugin.nvim.command(command))\n        .then(() => plugin.nvim.command(\"setlocal nopaste\"));\n    const insertText = ({ start, newText }) => positionCursor(start.line, start.offset).then((column) => __awaiter(this, void 0, void 0, function* () {\n        // _if_ the cursor position is 10, 7 but text only goes to 10, 6... we need to append rather than insert\n        const insertKey = start.offset === column ? \"i\" : \"a\";\n        const pasteText = `call feedkeys(\"${insertKey}\\\\<C-r>v\\\\<esc>\")`;\n        console.log(`insertWithinLine ${pasteText}`);\n        return copyText(newText).then(() => withinPasteMode(pasteText));\n    }));\n    const updateText = ({ start, end, newText }) => {\n        const setCursor = `call cursor(${start.line - 0}, ${start.offset})`;\n        const copyText = `let @v = \"${escape(newText)}\"`;\n        const selectMotion = \"v\";\n        const moveDownBy = end.line - start.line;\n        const moveRightBy = end.offset - 1 - start.offset;\n        const pasteText = `call feedkeys(\"i\\\\<C-r>v\\\\<esc>\")`;\n        const keystrokes = [\n            selectMotion,\n            moveDownBy > 0 ? `${moveDownBy}j` : \"\",\n            moveDownBy > 0 ? \"0\" : \"\",\n            moveRightBy > 0 ? `${moveRightBy}l` : \"\",\n            \"d\"\n        ].filter(Boolean);\n        const executeKeystrokes = execute(keystrokes.join(\"\"));\n        const command = `${setCursor}|${copyText}|${executeKeystrokes}|${pasteText}`;\n        console.log(`updateText ${command}`);\n        return plugin.nvim.command(command);\n    };\n    const deleteText = ({ start, end }) => {\n        const sameLine = start.line === end.line;\n        let moveDownBy = end.line - start.line;\n        let moveRightBy = end.offset - 1 - start.offset;\n        let selectMotion = \"v\";\n        let goToPreviousLine = false;\n        // If end of motion is at 1, don't do down that line\n        if ((!sameLine && end.offset === 1) ||\n            (!sameLine && start.offset === end.offset)) {\n            selectMotion = \"V\";\n            moveDownBy--;\n        }\n        // If we are moving down, reduce the move right\n        if (moveDownBy > 0) {\n            if (end.offset > 3) {\n                moveRightBy = end.offset - 2;\n            }\n            else {\n                moveRightBy = 0;\n                goToPreviousLine = true;\n            }\n        }\n        const keystrokes = [\n            selectMotion,\n            moveDownBy > 0 ? `${moveDownBy}j` : \"\",\n            moveDownBy > 0 ? \"0\" : \"\",\n            moveRightBy > 0 ? `${moveRightBy}l` : \"\",\n            goToPreviousLine === true ? \"k$\" : \"\",\n            \"d\"\n        ].filter(Boolean);\n        const setCursor = `call cursor(${start.line - 0}, ${start.offset})`;\n        const deleteText = execute(keystrokes.join(\"\"));\n        const command = `${setCursor}|${deleteText}`;\n        console.log(`deleteWitinLine ${command}`);\n        return plugin.nvim.command(command);\n    };\n    return {\n        log,\n        error,\n        openPopupMenu,\n        setStatus,\n        getBuffer,\n        confirm,\n        confirmTextChange,\n        applyTextChanges,\n        insertText,\n        deleteText\n    };\n};\n\n\n//# sourceURL=webpack://askVscode/./src/vim.ts?");

/***/ }),

/***/ "./src/vscode.ts":
/*!***********************!*\
  !*** ./src/vscode.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst net = __webpack_require__(/*! net */ \"net\");\nconst common_1 = __webpack_require__(/*! ./common */ \"./src/common.ts\");\nlet connected = false;\nconst createClient = () => {\n    const client = new net.Socket();\n    client.on(\"connect\", () => {\n        connected = true;\n    });\n    client.on(\"close\", () => {\n        connected = false;\n    });\n    return client;\n};\nexports.pingVscode = () => new Promise((resolve, reject) => {\n    exports.sendToVscode({ type: common_1.RequestType.Ping })\n        .then((response) => {\n        if (response.type === common_1.ResponseType.Pong) {\n            resolve();\n        }\n        else {\n            reject();\n        }\n    })\n        .catch(_ => reject());\n});\nexports.changeWorkspace = (rootPath) => exports.sendToVscode({\n    type: common_1.RequestType.ChangeWorkspace,\n    rootPath: rootPath\n});\nexports.executeAfterPing = (fun, delay = 800) => common_1.wait(delay).then(() => common_1.attempt(exports.pingVscode, 10, 800).then(() => fun()));\nexports.sendToVscode = (message) => new Promise((resolve, reject) => {\n    const client = createClient();\n    const rejected = (message, e) => {\n        console.error(\"sendToVscode rejected:\", message, e);\n        reject(new Error(message));\n    };\n    client.connect(5004, \"127.0.0.1\", () => {\n        client.write(JSON.stringify(message));\n    });\n    client.on(\"data\", (buffer) => {\n        try {\n            console.log(\"Got data\", buffer.toString());\n            const data = JSON.parse(buffer.toString());\n            console.log(\"Parsed data\", data);\n            resolve(data);\n        }\n        catch (e) {\n            rejected(\"Error parsing vscode response\", e);\n        }\n        finally {\n            client.destroy();\n        }\n    });\n    client.on(\"timeout\", () => {\n        rejected(\"Connection timed out\");\n    });\n    client.on(\"error\", (e) => {\n        connected\n            ? rejected(\"An error occurred\", e)\n            : rejected(\"Could not connect to vscode (is it open, with the server plugin running?)\");\n    });\n});\n\n\n//# sourceURL=webpack://askVscode/./src/vscode.ts?");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"net\");\n\n//# sourceURL=webpack://askVscode/external_%22net%22?");

/***/ })

/******/ });
});