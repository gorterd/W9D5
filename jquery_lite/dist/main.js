/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n    constructor(arrayHtml) {\n        this.arrayHtml = arrayHtml;\n\n    }\n\n    html(str){\n        if (str !== undefined){\n            for (let i = 0; i < this.arrayHtml.length; i++){\n                this.arrayHtml[i].innerHTML = str;\n            }\n        } else {\n            return this.arrayHtml[0].innerHTML;\n        }\n    }\n    \n    empty(){\n        for (let i = 0; i < this.arrayHtml.length; i++){\n            this.arrayHtml[i].innerHTML = \"\";\n        }\n    }\n\n    append(child){\n        let string = \"\";\n\n        if (child instanceof DOMNodeCollection) {\n            for (let i = 0; i < child.length; i++){\n                string += child[i].outerHTML;\n            }\n        } else if (child instanceof HTMLElement) {\n            string += child.outerHTML;\n        } else { //string\n            string = child;\n        }\n\n        for (let i = 0; i < this.arrayHtml.length; i++){\n            this.arrayHtml[i].innerHTML += string; \n        }\n\n    };\n\n\n    attr(key,val) {\n        if (val !== undefined){\n            for (let i = 0; i < this.arrayHtml.length; i++) {\n                this.arrayHtml[i].setAttribute(key, val);\n            }\n        } else {\n            return this.arrayHtml[0].getAttribute(key);\n        }\n    }\n\n\n    addClass(str) {\n        for (let i = 0; i < this.arrayHtml.length; i++) {\n            this.arrayHtml[i].className += (\" \" + str);\n        }\n    }\n\n    removeClass(str) {\n        for (let i = 0; i < this.arrayHtml.length; i++) {\n            this.arrayHtml[i].classList.remove(str);\n        }\n    }\n\n    children() {\n        let childArray = [];\n        for (let i = 0; i < this.arrayHtml.length; i++){\n            let childNodes = this.arrayHtml[i].children;\n            childArray = childArray.concat(Array.from(childNodes));\n            // debugger\n        }\n        const domNodes = new DOMNodeCollection(childArray);\n        return domNodes;\n    }\n\n    parent() {\n        let parentArray = [];\n        for (let i = 0; i < this.arrayHtml.length; i++){\n            let parentnodes = this.arrayHtml[i].parentNode;\n            if (!parentArray.includes(parentnodes)) {\n                parentArray.push(parentnodes);\n            }\n        }\n        const domNodes = new DOMNodeCollection(parentArray);\n        return domNodes;\n    }\n\n    find(selector) {\n        let found = [];\n        for (let i = 0; i < this.arrayHtml.length; i++) {\n            found = found.concat(Array.from(this.arrayHtml[i].querySelectorAll(selector)));\n        }\n\n        const domNodes = new DOMNodeCollection(found);\n        return domNodes;\n    }\n\n    remove() {\n        for (let i = 0; i < this.arrayHtml.length; i++) {\n            this.arrayHtml[i].remove();\n        }\n    }\n\n    on(action, cb){        \n        for (let i = 0; i < this.arrayHtml.length; i++){\n            let node = this.arrayHtml[i];\n            node.callbacks = node.callbacks || {};\n            node.callbacks[action] = cb;\n            node.addEventListener(action, cb);\n        }\n    }\n\n\n    off(action){\n        for (let i = 0; i < this.arrayHtml.length; i++){\n            let node = this.arrayHtml[i];\n            node.removeEventListener(action, node.callbacks[action]);\n            delete node.callbacks[action];\n        }\n    }\n\n\n}\n\n\n// node.callbacks = node.callbacks || {}\n\n// node.callbacks[action].push(cb)\n\n// node.callbacks[action].forEach( (cb) => node.removeEventListener(action, cb))\n\n\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\n\n\nwindow.$1 = (arg) => {\n\n    if (typeof arg === 'string') {\n        const nodes = document.querySelectorAll(arg);\n        const arrayNodes = Array.from(nodes);\n        const domCollection = new DOMNodeCollection(arrayNodes);\n        return domCollection;\n    } else if (arg instanceof HTMLElement){\n        const array = [];\n        array.push(arg);\n        const domCollection = new DOMNodeCollection(array);\n        return domCollection;\n    } else if (arg instanceof Function){\n        window.$1.queue.push(arg);\n    }\n\n\n\n}\n\nwindow.$1.queue = [];\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    for (let i = 0; i < window.$1.queue.length; i++) {\n        window.$1.queue[i]();\n    }\n})\n\nwindow.$1.extend = (...args) => {\n    const superObj = args[0];\n    for(let i = 1; i < args.length; i++) {\n        let obj = args[i];\n        for(key in obj) { superObj[key] = obj[key]};\n    }\n    return superObj;\n}\n\nwindow.$1.ajax = (options) => {\n    let defaults = {\n        method: 'GET',\n        url: '/',\n        success: () => {},\n        errors: () => {},//(errors) => {console.log(errors)},\n        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n        dataType: 'json',\n        data: '',\n    }\n    window.$1.extend(defaults, options);\n    \n\n    const xhr = new XMLHttpRequest();\n    xhr.open(defaults.method, defaults.url);\n    xhr.onload = function () {\n        defaults.success(JSON.parse(xhr.response));\n        console.log(\"success\")\n    }\n\n    xhr.onerror = function () {   \n        console.log(\"error\")\n        defaults.errors(JSON.parse(xhr.status));\n    }\n\n    xhr.setRequestHeader(\"Content-Type\", defaults.contentType);\n\n    xhr.send(defaults.data);\n}\n\n\n// request skel\n// const xhr = new XMLHttpRequest();\n\n// // step 2 - specify path and verb\n// xhr.open('POST', 'api/path/to/resource');\n\n// // step 3 - register a callback\n// xhr.onload = function () {\n//     console.log(xhr.status) // for status info\n//     console.log(xhr.responseType) //the type of data that was returned\n//     console.log(xhr.response) //the actual response. For JSON api calls, this will be a JSON string\n// }\n\n// // step 4 - send off the request with optional data\n// const optionalData = { name: \"User1\", password: \"123456\" };\n// xhr.send(optionalData);\n\n\n\n// $1(() => alert(\"the document is ready\"));\n// $1(() => alert(\"ANOTHER ALERT\"));\n// $1(() => alert(\"IS IT WORKING?\"));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });