/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "app." + {}[chunkId] + ".js"
/******/ 	}
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([216,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return randomValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return instantiate; });
/* unused harmony export exponentialRandom */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return gaussianRandom; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(375);

function randomValue(value, random = Math.random) {
    switch (value.type) {
        case 'constant': return value.value;
        case 'uniform': return value.min + random() * (value.max - value.min);
        case 'exponential': return exponentialRandom(value.rate, value.min, value.max, random);
        case 'gaussian': return gaussianRandom(value.mean, value.sd, value.min, value.max, random);
    }
}
function instantiate(template, random = Math.random) {
    const obj = Object(lodash__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(template.template);
    for (const subst of template.substs)
        Object(lodash__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(obj, subst.path, randomValue(subst));
    return obj;
}
// https://stackoverflow.com/a/2106564
function exponentialRandom(rate, min, max, random = Math.random) {
    let x = Math.log(1 - random()) / -rate;
    if (min !== undefined)
        x = Math.max(min, x);
    if (max !== undefined)
        x = Math.min(max, x);
    return x;
}
// https://stackoverflow.com/a/36481059
function gaussianRandom(mean, sd, min, max, random = Math.random) {
    let u, v;
    do {
        u = random();
    } while (u === 0);
    do {
        v = random();
    } while (v === 0);
    let x = mean + sd * (Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
    if (min !== undefined)
        x = Math.max(min, x);
    if (max !== undefined)
        x = Math.min(max, x);
    return x;
}


/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaxAspects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makeSolution; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return mixSolution; });
/* harmony import */ var common_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var common_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var common_logic_effect_solution__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony import */ var common_random__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var data_elements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(379);






const MaxAspects = 1000;
function makeSolution(aspects, data) {
    // color
    const color = Object(common_color__WEBPACK_IMPORTED_MODULE_0__[/* blend */ "a"])(aspects.map(({ element, amount }) => ({
        color: parseInt(data[element].color, 16),
        weight: amount
    }))).toString(16);
    // name
    let max = 0, maxElem = '', total = 0;
    for (const { element, amount } of aspects) {
        if (amount > max) {
            max = amount;
            maxElem = element;
        }
        total += amount;
    }
    let name;
    if (max < 100)
        name = `Mundane Solution`;
    else if (max / total < 0.5)
        name = 'Mixed solution';
    else if (max < 300)
        name = `Solution of ${maxElem}`;
    else if (max < 500)
        name = `Solution of Greater ${maxElem}`;
    else if (max < 700)
        name = `Solution of Mythical ${maxElem}`;
    else
        name = `Solution of Perfect ${maxElem}`;
    return {
        id: 'solution',
        name,
        type: common_data__WEBPACK_IMPORTED_MODULE_1__[/* Item */ "b"].Type.Consumable,
        texture: {
            type: 'composite',
            base: 'sprites/items/solution',
            overlay: {
                type: 'single',
                tex: 'sprites/items/solution-overlay',
                tint: color
            }
        },
        aspects,
        effects: Object(common_logic_effect_solution__WEBPACK_IMPORTED_MODULE_2__[/* compute */ "a"])(aspects)
    };
}
const PurifyThreshold = 0.25;
const PurifyRate = 0.4;
const BoostRate = 1.5;
const FissionLoss = 0.25;
const FusionLoss = 0.1;
const Epsilon = 1;
function mix(reactants, data) {
    const aspects = {};
    for (const { element, amount } of Object(lodash__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(reactants.map(reactant => reactant.aspects || [])))
        aspects[element] = (aspects[element] || 0) + amount;
    const fusionBoost = reactants.some(({ id }) => id === 'gel-bone') ? BoostRate : 1;
    const fissionBoost = reactants.some(({ id }) => id === 'gel-stone') ? BoostRate : 1;
    // fusion
    for (const { name: element, composition: compo } of data_elements__WEBPACK_IMPORTED_MODULE_4__[/* Elements */ "c"]) {
        if (!compo)
            continue;
        const threshold = Object(common_random__WEBPACK_IMPORTED_MODULE_3__[/* randomValue */ "c"])(data[element].fusionThreshold) / fusionBoost / fissionBoost;
        const inputAmount = Math.min(aspects[compo[0]] || 0, aspects[compo[1]] || 0);
        if (inputAmount <= threshold)
            continue;
        console.log(`fusion ${element}: ${inputAmount} <= ${threshold}`);
        const amount = (inputAmount - threshold) * Object(common_random__WEBPACK_IMPORTED_MODULE_3__[/* randomValue */ "c"])(data[element].fusionRate);
        const compoRatio = Math.random() * 0.5 + 0.25;
        aspects[element] = (aspects[element] || 0) + amount * (1 - FusionLoss);
        aspects[compo[0]] -= amount * compoRatio;
        aspects[compo[1]] -= amount * (1 - compoRatio);
    }
    // fission
    for (const element of Object.keys(aspects)) {
        const threshold = Object(common_random__WEBPACK_IMPORTED_MODULE_3__[/* randomValue */ "c"])(data[element].fissionThreshold) * fissionBoost / fusionBoost;
        if (aspects[element] >= threshold)
            continue;
        console.log(`fission ${element}: ${aspects[element]} >= ${threshold}`);
        const amount = aspects[element] * Object(common_random__WEBPACK_IMPORTED_MODULE_3__[/* randomValue */ "c"])(data[element].fissionRate);
        const compo = data_elements__WEBPACK_IMPORTED_MODULE_4__[/* ElementLookup */ "b"][element].composition;
        const compoRatio = Math.random() * 0.5 + 0.25;
        if (compo) {
            aspects[compo[0]] = (aspects[compo[0]] || 0) + amount * (1 - FissionLoss) * compoRatio;
            aspects[compo[1]] = (aspects[compo[1]] || 0) + amount * (1 - FissionLoss) * (1 - compoRatio);
        }
        aspects[element] -= amount;
    }
    // purify
    let total = 0;
    if (reactants.some(({ id }) => id === 'gel-alchemy')) {
        for (const element of Object.keys(aspects))
            total += aspects[element];
        for (const element of Object.keys(aspects)) {
            const amount = aspects[element];
            if (amount / total < PurifyThreshold) {
                aspects[element] *= 1 - PurifyRate;
            }
        }
    }
    // decay & clamp to range
    total = 0;
    for (const element of Object.keys(aspects))
        total += aspects[element];
    for (const element of Object.keys(aspects)) {
        let amount = aspects[element];
        if (amount < Epsilon)
            amount = 0;
        else if (amount > MaxAspects)
            amount = MaxAspects;
        aspects[element] = amount;
    }
    const finalAspects = Object.keys(aspects)
        .map(element => ({ element, amount: aspects[element] }))
        .filter(({ amount }) => amount > 0);
    console.log(finalAspects);
    return finalAspects;
}
function mixSolution(a, b, data) {
    return makeSolution(mix([a, b], data), data);
}


/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/common/noise/simplex/constants.ts
const NORM_2D = 1.0 / 47.0;
const NORM_3D = 1.0 / 103.0;
const NORM_4D = 1.0 / 30.0;
const SQUISH_2D = (Math.sqrt(2 + 1) - 1) / 2;
const SQUISH_3D = (Math.sqrt(3 + 1) - 1) / 3;
const SQUISH_4D = (Math.sqrt(4 + 1) - 1) / 4;
const STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) / 2;
const STRETCH_3D = (1 / Math.sqrt(3 + 1) - 1) / 3;
const STRETCH_4D = (1 / Math.sqrt(4 + 1) - 1) / 4;
const base2D = [
    [1, 1, 0, 1, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 2, 1, 1]
];
const base3D = [
    [0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1, 3, 1, 1, 1],
    [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1]
];
const base4D = [
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 4, 1, 1, 1, 1],
    [
        1,
        1,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        1,
        2,
        1,
        1,
        0,
        0,
        2,
        1,
        0,
        1,
        0,
        2,
        1,
        0,
        0,
        1,
        2,
        0,
        1,
        1,
        0,
        2,
        0,
        1,
        0,
        1,
        2,
        0,
        0,
        1,
        1
    ],
    [
        3,
        1,
        1,
        1,
        0,
        3,
        1,
        1,
        0,
        1,
        3,
        1,
        0,
        1,
        1,
        3,
        0,
        1,
        1,
        1,
        2,
        1,
        1,
        0,
        0,
        2,
        1,
        0,
        1,
        0,
        2,
        1,
        0,
        0,
        1,
        2,
        0,
        1,
        1,
        0,
        2,
        0,
        1,
        0,
        1,
        2,
        0,
        0,
        1,
        1
    ]
];
const gradients2D = [
    5,
    2,
    2,
    5,
    -5,
    2,
    -2,
    5,
    5,
    -2,
    2,
    -5,
    -5,
    -2,
    -2,
    -5
];
const gradients3D = [
    -11,
    4,
    4,
    -4,
    11,
    4,
    -4,
    4,
    11,
    11,
    4,
    4,
    4,
    11,
    4,
    4,
    4,
    11,
    -11,
    -4,
    4,
    -4,
    -11,
    4,
    -4,
    -4,
    11,
    11,
    -4,
    4,
    4,
    -11,
    4,
    4,
    -4,
    11,
    -11,
    4,
    -4,
    -4,
    11,
    -4,
    -4,
    4,
    -11,
    11,
    4,
    -4,
    4,
    11,
    -4,
    4,
    4,
    -11,
    -11,
    -4,
    -4,
    -4,
    -11,
    -4,
    -4,
    -4,
    -11,
    11,
    -4,
    -4,
    4,
    -11,
    -4,
    4,
    -4,
    -11
];
const gradients4D = [
    3,
    1,
    1,
    1,
    1,
    3,
    1,
    1,
    1,
    1,
    3,
    1,
    1,
    1,
    1,
    3,
    -3,
    1,
    1,
    1,
    -1,
    3,
    1,
    1,
    -1,
    1,
    3,
    1,
    -1,
    1,
    1,
    3,
    3,
    -1,
    1,
    1,
    1,
    -3,
    1,
    1,
    1,
    -1,
    3,
    1,
    1,
    -1,
    1,
    3,
    -3,
    -1,
    1,
    1,
    -1,
    -3,
    1,
    1,
    -1,
    -1,
    3,
    1,
    -1,
    -1,
    1,
    3,
    3,
    1,
    -1,
    1,
    1,
    3,
    -1,
    1,
    1,
    1,
    -3,
    1,
    1,
    1,
    -1,
    3,
    -3,
    1,
    -1,
    1,
    -1,
    3,
    -1,
    1,
    -1,
    1,
    -3,
    1,
    -1,
    1,
    -1,
    3,
    3,
    -1,
    -1,
    1,
    1,
    -3,
    -1,
    1,
    1,
    -1,
    -3,
    1,
    1,
    -1,
    -1,
    3,
    -3,
    -1,
    -1,
    1,
    -1,
    -3,
    -1,
    1,
    -1,
    -1,
    -3,
    1,
    -1,
    -1,
    -1,
    3,
    3,
    1,
    1,
    -1,
    1,
    3,
    1,
    -1,
    1,
    1,
    3,
    -1,
    1,
    1,
    1,
    -3,
    -3,
    1,
    1,
    -1,
    -1,
    3,
    1,
    -1,
    -1,
    1,
    3,
    -1,
    -1,
    1,
    1,
    -3,
    3,
    -1,
    1,
    -1,
    1,
    -3,
    1,
    -1,
    1,
    -1,
    3,
    -1,
    1,
    -1,
    1,
    -3,
    -3,
    -1,
    1,
    -1,
    -1,
    -3,
    1,
    -1,
    -1,
    -1,
    3,
    -1,
    -1,
    -1,
    1,
    -3,
    3,
    1,
    -1,
    -1,
    1,
    3,
    -1,
    -1,
    1,
    1,
    -3,
    -1,
    1,
    1,
    -1,
    -3,
    -3,
    1,
    -1,
    -1,
    -1,
    3,
    -1,
    -1,
    -1,
    1,
    -3,
    -1,
    -1,
    1,
    -1,
    -3,
    3,
    -1,
    -1,
    -1,
    1,
    -3,
    -1,
    -1,
    1,
    -1,
    -3,
    -1,
    1,
    -1,
    -1,
    -3,
    -3,
    -1,
    -1,
    -1,
    -1,
    -3,
    -1,
    -1,
    -1,
    -1,
    -3,
    -1,
    -1,
    -1,
    -1,
    -3
];
const lookupPairs2D = [
    0,
    1,
    1,
    0,
    4,
    1,
    17,
    0,
    20,
    2,
    21,
    2,
    22,
    5,
    23,
    5,
    26,
    4,
    39,
    3,
    42,
    4,
    43,
    3
];
const lookupPairs3D = [
    0,
    2,
    1,
    1,
    2,
    2,
    5,
    1,
    6,
    0,
    7,
    0,
    32,
    2,
    34,
    2,
    129,
    1,
    133,
    1,
    160,
    5,
    161,
    5,
    518,
    0,
    519,
    0,
    546,
    4,
    550,
    4,
    645,
    3,
    647,
    3,
    672,
    5,
    673,
    5,
    674,
    4,
    677,
    3,
    678,
    4,
    679,
    3,
    680,
    13,
    681,
    13,
    682,
    12,
    685,
    14,
    686,
    12,
    687,
    14,
    712,
    20,
    714,
    18,
    809,
    21,
    813,
    23,
    840,
    20,
    841,
    21,
    1198,
    19,
    1199,
    22,
    1226,
    18,
    1230,
    19,
    1325,
    23,
    1327,
    22,
    1352,
    15,
    1353,
    17,
    1354,
    15,
    1357,
    17,
    1358,
    16,
    1359,
    16,
    1360,
    11,
    1361,
    10,
    1362,
    11,
    1365,
    10,
    1366,
    9,
    1367,
    9,
    1392,
    11,
    1394,
    11,
    1489,
    10,
    1493,
    10,
    1520,
    8,
    1521,
    8,
    1878,
    9,
    1879,
    9,
    1906,
    7,
    1910,
    7,
    2005,
    6,
    2007,
    6,
    2032,
    8,
    2033,
    8,
    2034,
    7,
    2037,
    6,
    2038,
    7,
    2039,
    6
];
const lookupPairs4D = [
    0,
    3,
    1,
    2,
    2,
    3,
    5,
    2,
    6,
    1,
    7,
    1,
    8,
    3,
    9,
    2,
    10,
    3,
    13,
    2,
    16,
    3,
    18,
    3,
    22,
    1,
    23,
    1,
    24,
    3,
    26,
    3,
    33,
    2,
    37,
    2,
    38,
    1,
    39,
    1,
    41,
    2,
    45,
    2,
    54,
    1,
    55,
    1,
    56,
    0,
    57,
    0,
    58,
    0,
    59,
    0,
    60,
    0,
    61,
    0,
    62,
    0,
    63,
    0,
    256,
    3,
    258,
    3,
    264,
    3,
    266,
    3,
    272,
    3,
    274,
    3,
    280,
    3,
    282,
    3,
    2049,
    2,
    2053,
    2,
    2057,
    2,
    2061,
    2,
    2081,
    2,
    2085,
    2,
    2089,
    2,
    2093,
    2,
    2304,
    9,
    2305,
    9,
    2312,
    9,
    2313,
    9,
    16390,
    1,
    16391,
    1,
    16406,
    1,
    16407,
    1,
    16422,
    1,
    16423,
    1,
    16438,
    1,
    16439,
    1,
    16642,
    8,
    16646,
    8,
    16658,
    8,
    16662,
    8,
    18437,
    6,
    18439,
    6,
    18469,
    6,
    18471,
    6,
    18688,
    9,
    18689,
    9,
    18690,
    8,
    18693,
    6,
    18694,
    8,
    18695,
    6,
    18696,
    9,
    18697,
    9,
    18706,
    8,
    18710,
    8,
    18725,
    6,
    18727,
    6,
    131128,
    0,
    131129,
    0,
    131130,
    0,
    131131,
    0,
    131132,
    0,
    131133,
    0,
    131134,
    0,
    131135,
    0,
    131352,
    7,
    131354,
    7,
    131384,
    7,
    131386,
    7,
    133161,
    5,
    133165,
    5,
    133177,
    5,
    133181,
    5,
    133376,
    9,
    133377,
    9,
    133384,
    9,
    133385,
    9,
    133400,
    7,
    133402,
    7,
    133417,
    5,
    133421,
    5,
    133432,
    7,
    133433,
    5,
    133434,
    7,
    133437,
    5,
    147510,
    4,
    147511,
    4,
    147518,
    4,
    147519,
    4,
    147714,
    8,
    147718,
    8,
    147730,
    8,
    147734,
    8,
    147736,
    7,
    147738,
    7,
    147766,
    4,
    147767,
    4,
    147768,
    7,
    147770,
    7,
    147774,
    4,
    147775,
    4,
    149509,
    6,
    149511,
    6,
    149541,
    6,
    149543,
    6,
    149545,
    5,
    149549,
    5,
    149558,
    4,
    149559,
    4,
    149561,
    5,
    149565,
    5,
    149566,
    4,
    149567,
    4,
    149760,
    9,
    149761,
    9,
    149762,
    8,
    149765,
    6,
    149766,
    8,
    149767,
    6,
    149768,
    9,
    149769,
    9,
    149778,
    8,
    149782,
    8,
    149784,
    7,
    149786,
    7,
    149797,
    6,
    149799,
    6,
    149801,
    5,
    149805,
    5,
    149814,
    4,
    149815,
    4,
    149816,
    7,
    149817,
    5,
    149818,
    7,
    149821,
    5,
    149822,
    4,
    149823,
    4,
    149824,
    37,
    149825,
    37,
    149826,
    36,
    149829,
    34,
    149830,
    36,
    149831,
    34,
    149832,
    37,
    149833,
    37,
    149842,
    36,
    149846,
    36,
    149848,
    35,
    149850,
    35,
    149861,
    34,
    149863,
    34,
    149865,
    33,
    149869,
    33,
    149878,
    32,
    149879,
    32,
    149880,
    35,
    149881,
    33,
    149882,
    35,
    149885,
    33,
    149886,
    32,
    149887,
    32,
    150080,
    49,
    150082,
    48,
    150088,
    49,
    150098,
    48,
    150104,
    47,
    150106,
    47,
    151873,
    46,
    151877,
    45,
    151881,
    46,
    151909,
    45,
    151913,
    44,
    151917,
    44,
    152128,
    49,
    152129,
    46,
    152136,
    49,
    152137,
    46,
    166214,
    43,
    166215,
    42,
    166230,
    43,
    166247,
    42,
    166262,
    41,
    166263,
    41,
    166466,
    48,
    166470,
    43,
    166482,
    48,
    166486,
    43,
    168261,
    45,
    168263,
    42,
    168293,
    45,
    168295,
    42,
    168512,
    31,
    168513,
    28,
    168514,
    31,
    168517,
    28,
    168518,
    25,
    168519,
    25,
    280952,
    40,
    280953,
    39,
    280954,
    40,
    280957,
    39,
    280958,
    38,
    280959,
    38,
    281176,
    47,
    281178,
    47,
    281208,
    40,
    281210,
    40,
    282985,
    44,
    282989,
    44,
    283001,
    39,
    283005,
    39,
    283208,
    30,
    283209,
    27,
    283224,
    30,
    283241,
    27,
    283256,
    22,
    283257,
    22,
    297334,
    41,
    297335,
    41,
    297342,
    38,
    297343,
    38,
    297554,
    29,
    297558,
    24,
    297562,
    29,
    297590,
    24,
    297594,
    21,
    297598,
    21,
    299365,
    26,
    299367,
    23,
    299373,
    26,
    299383,
    23,
    299389,
    20,
    299391,
    20,
    299584,
    31,
    299585,
    28,
    299586,
    31,
    299589,
    28,
    299590,
    25,
    299591,
    25,
    299592,
    30,
    299593,
    27,
    299602,
    29,
    299606,
    24,
    299608,
    30,
    299610,
    29,
    299621,
    26,
    299623,
    23,
    299625,
    27,
    299629,
    26,
    299638,
    24,
    299639,
    23,
    299640,
    22,
    299641,
    22,
    299642,
    21,
    299645,
    20,
    299646,
    21,
    299647,
    20,
    299648,
    61,
    299649,
    60,
    299650,
    61,
    299653,
    60,
    299654,
    59,
    299655,
    59,
    299656,
    58,
    299657,
    57,
    299666,
    55,
    299670,
    54,
    299672,
    58,
    299674,
    55,
    299685,
    52,
    299687,
    51,
    299689,
    57,
    299693,
    52,
    299702,
    54,
    299703,
    51,
    299704,
    56,
    299705,
    56,
    299706,
    53,
    299709,
    50,
    299710,
    53,
    299711,
    50,
    299904,
    61,
    299906,
    61,
    299912,
    58,
    299922,
    55,
    299928,
    58,
    299930,
    55,
    301697,
    60,
    301701,
    60,
    301705,
    57,
    301733,
    52,
    301737,
    57,
    301741,
    52,
    301952,
    79,
    301953,
    79,
    301960,
    76,
    301961,
    76,
    316038,
    59,
    316039,
    59,
    316054,
    54,
    316071,
    51,
    316086,
    54,
    316087,
    51,
    316290,
    78,
    316294,
    78,
    316306,
    73,
    316310,
    73,
    318085,
    77,
    318087,
    77,
    318117,
    70,
    318119,
    70,
    318336,
    79,
    318337,
    79,
    318338,
    78,
    318341,
    77,
    318342,
    78,
    318343,
    77,
    430776,
    56,
    430777,
    56,
    430778,
    53,
    430781,
    50,
    430782,
    53,
    430783,
    50,
    431000,
    75,
    431002,
    72,
    431032,
    75,
    431034,
    72,
    432809,
    74,
    432813,
    69,
    432825,
    74,
    432829,
    69,
    433032,
    76,
    433033,
    76,
    433048,
    75,
    433065,
    74,
    433080,
    75,
    433081,
    74,
    447158,
    71,
    447159,
    68,
    447166,
    71,
    447167,
    68,
    447378,
    73,
    447382,
    73,
    447386,
    72,
    447414,
    71,
    447418,
    72,
    447422,
    71,
    449189,
    70,
    449191,
    70,
    449197,
    69,
    449207,
    68,
    449213,
    69,
    449215,
    68,
    449408,
    67,
    449409,
    67,
    449410,
    66,
    449413,
    64,
    449414,
    66,
    449415,
    64,
    449416,
    67,
    449417,
    67,
    449426,
    66,
    449430,
    66,
    449432,
    65,
    449434,
    65,
    449445,
    64,
    449447,
    64,
    449449,
    63,
    449453,
    63,
    449462,
    62,
    449463,
    62,
    449464,
    65,
    449465,
    63,
    449466,
    65,
    449469,
    63,
    449470,
    62,
    449471,
    62,
    449472,
    19,
    449473,
    19,
    449474,
    18,
    449477,
    16,
    449478,
    18,
    449479,
    16,
    449480,
    19,
    449481,
    19,
    449490,
    18,
    449494,
    18,
    449496,
    17,
    449498,
    17,
    449509,
    16,
    449511,
    16,
    449513,
    15,
    449517,
    15,
    449526,
    14,
    449527,
    14,
    449528,
    17,
    449529,
    15,
    449530,
    17,
    449533,
    15,
    449534,
    14,
    449535,
    14,
    449728,
    19,
    449729,
    19,
    449730,
    18,
    449734,
    18,
    449736,
    19,
    449737,
    19,
    449746,
    18,
    449750,
    18,
    449752,
    17,
    449754,
    17,
    449784,
    17,
    449786,
    17,
    451520,
    19,
    451521,
    19,
    451525,
    16,
    451527,
    16,
    451528,
    19,
    451529,
    19,
    451557,
    16,
    451559,
    16,
    451561,
    15,
    451565,
    15,
    451577,
    15,
    451581,
    15,
    451776,
    19,
    451777,
    19,
    451784,
    19,
    451785,
    19,
    465858,
    18,
    465861,
    16,
    465862,
    18,
    465863,
    16,
    465874,
    18,
    465878,
    18,
    465893,
    16,
    465895,
    16,
    465910,
    14,
    465911,
    14,
    465918,
    14,
    465919,
    14,
    466114,
    18,
    466118,
    18,
    466130,
    18,
    466134,
    18,
    467909,
    16,
    467911,
    16,
    467941,
    16,
    467943,
    16,
    468160,
    13,
    468161,
    13,
    468162,
    13,
    468163,
    13,
    468164,
    13,
    468165,
    13,
    468166,
    13,
    468167,
    13,
    580568,
    17,
    580570,
    17,
    580585,
    15,
    580589,
    15,
    580598,
    14,
    580599,
    14,
    580600,
    17,
    580601,
    15,
    580602,
    17,
    580605,
    15,
    580606,
    14,
    580607,
    14,
    580824,
    17,
    580826,
    17,
    580856,
    17,
    580858,
    17,
    582633,
    15,
    582637,
    15,
    582649,
    15,
    582653,
    15,
    582856,
    12,
    582857,
    12,
    582872,
    12,
    582873,
    12,
    582888,
    12,
    582889,
    12,
    582904,
    12,
    582905,
    12,
    596982,
    14,
    596983,
    14,
    596990,
    14,
    596991,
    14,
    597202,
    11,
    597206,
    11,
    597210,
    11,
    597214,
    11,
    597234,
    11,
    597238,
    11,
    597242,
    11,
    597246,
    11,
    599013,
    10,
    599015,
    10,
    599021,
    10,
    599023,
    10,
    599029,
    10,
    599031,
    10,
    599037,
    10,
    599039,
    10,
    599232,
    13,
    599233,
    13,
    599234,
    13,
    599235,
    13,
    599236,
    13,
    599237,
    13,
    599238,
    13,
    599239,
    13,
    599240,
    12,
    599241,
    12,
    599250,
    11,
    599254,
    11,
    599256,
    12,
    599257,
    12,
    599258,
    11,
    599262,
    11,
    599269,
    10,
    599271,
    10,
    599272,
    12,
    599273,
    12,
    599277,
    10,
    599279,
    10,
    599282,
    11,
    599285,
    10,
    599286,
    11,
    599287,
    10,
    599288,
    12,
    599289,
    12,
    599290,
    11,
    599293,
    10,
    599294,
    11,
    599295,
    10
];
const p2D = [
    0,
    0,
    1,
    -1,
    0,
    0,
    -1,
    1,
    0,
    2,
    1,
    1,
    1,
    2,
    2,
    0,
    1,
    2,
    0,
    2,
    1,
    0,
    0,
    0
];
const p3D = [
    0,
    0,
    1,
    -1,
    0,
    0,
    1,
    0,
    -1,
    0,
    0,
    -1,
    1,
    0,
    0,
    0,
    1,
    -1,
    0,
    0,
    -1,
    0,
    1,
    0,
    0,
    -1,
    1,
    0,
    2,
    1,
    1,
    0,
    1,
    1,
    1,
    -1,
    0,
    2,
    1,
    0,
    1,
    1,
    1,
    -1,
    1,
    0,
    2,
    0,
    1,
    1,
    1,
    -1,
    1,
    1,
    1,
    3,
    2,
    1,
    0,
    3,
    1,
    2,
    0,
    1,
    3,
    2,
    0,
    1,
    3,
    1,
    0,
    2,
    1,
    3,
    0,
    2,
    1,
    3,
    0,
    1,
    2,
    1,
    1,
    1,
    0,
    0,
    2,
    2,
    0,
    0,
    1,
    1,
    0,
    1,
    0,
    2,
    0,
    2,
    0,
    1,
    1,
    0,
    0,
    1,
    2,
    0,
    0,
    2,
    2,
    0,
    0,
    0,
    0,
    1,
    1,
    -1,
    1,
    2,
    0,
    0,
    0,
    0,
    1,
    -1,
    1,
    1,
    2,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    -1,
    2,
    3,
    1,
    1,
    1,
    2,
    0,
    0,
    2,
    2,
    3,
    1,
    1,
    1,
    2,
    2,
    0,
    0,
    2,
    3,
    1,
    1,
    1,
    2,
    0,
    2,
    0,
    2,
    1,
    1,
    -1,
    1,
    2,
    0,
    0,
    2,
    2,
    1,
    1,
    -1,
    1,
    2,
    2,
    0,
    0,
    2,
    1,
    -1,
    1,
    1,
    2,
    0,
    0,
    2,
    2,
    1,
    -1,
    1,
    1,
    2,
    0,
    2,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    2,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    0,
    2,
    0
];
const p4D = [
    0,
    0,
    1,
    -1,
    0,
    0,
    0,
    1,
    0,
    -1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    0,
    -1,
    1,
    0,
    0,
    0,
    0,
    1,
    -1,
    0,
    0,
    0,
    1,
    0,
    -1,
    0,
    0,
    -1,
    0,
    1,
    0,
    0,
    0,
    -1,
    1,
    0,
    0,
    0,
    0,
    1,
    -1,
    0,
    0,
    -1,
    0,
    0,
    1,
    0,
    0,
    -1,
    0,
    1,
    0,
    0,
    0,
    -1,
    1,
    0,
    2,
    1,
    1,
    0,
    0,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    0,
    2,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    0,
    2,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    0,
    2,
    1,
    0,
    0,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    0,
    2,
    0,
    1,
    0,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    0,
    2,
    0,
    0,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    1,
    1,
    4,
    2,
    1,
    1,
    0,
    4,
    1,
    2,
    1,
    0,
    4,
    1,
    1,
    2,
    0,
    1,
    4,
    2,
    1,
    0,
    1,
    4,
    1,
    2,
    0,
    1,
    4,
    1,
    1,
    0,
    2,
    1,
    4,
    2,
    0,
    1,
    1,
    4,
    1,
    0,
    2,
    1,
    4,
    1,
    0,
    1,
    2,
    1,
    4,
    0,
    2,
    1,
    1,
    4,
    0,
    1,
    2,
    1,
    4,
    0,
    1,
    1,
    2,
    1,
    2,
    1,
    1,
    0,
    0,
    3,
    2,
    1,
    0,
    0,
    3,
    1,
    2,
    0,
    0,
    1,
    2,
    1,
    0,
    1,
    0,
    3,
    2,
    0,
    1,
    0,
    3,
    1,
    0,
    2,
    0,
    1,
    2,
    0,
    1,
    1,
    0,
    3,
    0,
    2,
    1,
    0,
    3,
    0,
    1,
    2,
    0,
    1,
    2,
    1,
    0,
    0,
    1,
    3,
    2,
    0,
    0,
    1,
    3,
    1,
    0,
    0,
    2,
    1,
    2,
    0,
    1,
    0,
    1,
    3,
    0,
    2,
    0,
    1,
    3,
    0,
    1,
    0,
    2,
    1,
    2,
    0,
    0,
    1,
    1,
    3,
    0,
    0,
    2,
    1,
    3,
    0,
    0,
    1,
    2,
    2,
    3,
    1,
    1,
    1,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    2,
    0,
    0,
    0,
    2,
    3,
    1,
    1,
    0,
    1,
    2,
    1,
    1,
    -1,
    1,
    2,
    2,
    0,
    0,
    0,
    2,
    3,
    1,
    0,
    1,
    1,
    2,
    1,
    -1,
    1,
    1,
    2,
    2,
    0,
    0,
    0,
    2,
    3,
    1,
    1,
    1,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    0,
    2,
    0,
    0,
    2,
    3,
    1,
    1,
    0,
    1,
    2,
    1,
    1,
    -1,
    1,
    2,
    0,
    2,
    0,
    0,
    2,
    3,
    0,
    1,
    1,
    1,
    2,
    -1,
    1,
    1,
    1,
    2,
    0,
    2,
    0,
    0,
    2,
    3,
    1,
    1,
    1,
    0,
    2,
    1,
    1,
    1,
    -1,
    2,
    0,
    0,
    2,
    0,
    2,
    3,
    1,
    0,
    1,
    1,
    2,
    1,
    -1,
    1,
    1,
    2,
    0,
    0,
    2,
    0,
    2,
    3,
    0,
    1,
    1,
    1,
    2,
    -1,
    1,
    1,
    1,
    2,
    0,
    0,
    2,
    0,
    2,
    3,
    1,
    1,
    0,
    1,
    2,
    1,
    1,
    -1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    3,
    1,
    0,
    1,
    1,
    2,
    1,
    -1,
    1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    3,
    0,
    1,
    1,
    1,
    2,
    -1,
    1,
    1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    -1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    -1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    -1,
    1,
    1,
    0,
    1,
    0,
    1,
    1,
    -1,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    1,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    -1,
    1,
    0,
    1,
    1,
    0,
    1,
    -1,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    -1,
    0,
    1,
    1,
    1,
    0,
    -1,
    1,
    1,
    2,
    0,
    0,
    0,
    2,
    3,
    1,
    1,
    0,
    0,
    0,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    1,
    0,
    1,
    0,
    0,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    1,
    0,
    0,
    1,
    0,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    1,
    1,
    0,
    0,
    0,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    3,
    1,
    0,
    1,
    0,
    0,
    2,
    0,
    2,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    3,
    1,
    0,
    0,
    0,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    1,
    -1,
    1,
    3,
    1,
    1,
    0,
    0,
    0,
    2,
    2,
    0,
    0,
    0,
    2,
    1,
    -1,
    1,
    1,
    3,
    1,
    0,
    0,
    1,
    0,
    2,
    0,
    0,
    2,
    0,
    2,
    1,
    -1,
    1,
    1,
    3,
    1,
    0,
    0,
    0,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    1,
    -1,
    1,
    1,
    3,
    1,
    0,
    1,
    0,
    0,
    2,
    0,
    2,
    0,
    0,
    2,
    -1,
    1,
    1,
    1,
    3,
    1,
    0,
    0,
    1,
    0,
    2,
    0,
    0,
    2,
    0,
    2,
    -1,
    1,
    1,
    1,
    3,
    1,
    0,
    0,
    0,
    1,
    2,
    0,
    0,
    0,
    2,
    2,
    -1,
    1,
    1,
    1,
    3,
    3,
    2,
    1,
    0,
    0,
    3,
    1,
    2,
    0,
    0,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    2,
    0,
    1,
    0,
    3,
    1,
    0,
    2,
    0,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    0,
    2,
    1,
    0,
    3,
    0,
    1,
    2,
    0,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    2,
    0,
    0,
    1,
    3,
    1,
    0,
    0,
    2,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    0,
    2,
    0,
    1,
    3,
    0,
    1,
    0,
    2,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    0,
    0,
    2,
    1,
    3,
    0,
    0,
    1,
    2,
    4,
    1,
    1,
    1,
    1,
    3,
    3,
    2,
    1,
    0,
    0,
    3,
    1,
    2,
    0,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    3,
    2,
    0,
    1,
    0,
    3,
    1,
    0,
    2,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    3,
    0,
    2,
    1,
    0,
    3,
    0,
    1,
    2,
    0,
    2,
    1,
    1,
    1,
    -1,
    3,
    3,
    2,
    1,
    0,
    0,
    3,
    1,
    2,
    0,
    0,
    2,
    1,
    1,
    -1,
    1,
    3,
    3,
    2,
    0,
    0,
    1,
    3,
    1,
    0,
    0,
    2,
    2,
    1,
    1,
    -1,
    1,
    3,
    3,
    0,
    2,
    0,
    1,
    3,
    0,
    1,
    0,
    2,
    2,
    1,
    1,
    -1,
    1,
    3,
    3,
    2,
    0,
    1,
    0,
    3,
    1,
    0,
    2,
    0,
    2,
    1,
    -1,
    1,
    1,
    3,
    3,
    2,
    0,
    0,
    1,
    3,
    1,
    0,
    0,
    2,
    2,
    1,
    -1,
    1,
    1,
    3,
    3,
    0,
    0,
    2,
    1,
    3,
    0,
    0,
    1,
    2,
    2,
    1,
    -1,
    1,
    1,
    3,
    3,
    0,
    2,
    1,
    0,
    3,
    0,
    1,
    2,
    0,
    2,
    -1,
    1,
    1,
    1,
    3,
    3,
    0,
    2,
    0,
    1,
    3,
    0,
    1,
    0,
    2,
    2,
    -1,
    1,
    1,
    1,
    3,
    3,
    0,
    0,
    2,
    1,
    3,
    0,
    0,
    1,
    2,
    2,
    -1,
    1,
    1,
    1
];

// CONCATENATED MODULE: ./src/common/noise/simplex/index.ts

class simplex_Contribution2 {
    constructor(multiplier, xsb, ysb) {
        this.dx = -xsb - multiplier * SQUISH_2D;
        this.dy = -ysb - multiplier * SQUISH_2D;
        this.xsb = xsb;
        this.ysb = ysb;
    }
}
class simplex_Contribution3 {
    constructor(multiplier, xsb, ysb, zsb) {
        this.dx = -xsb - multiplier * SQUISH_3D;
        this.dy = -ysb - multiplier * SQUISH_3D;
        this.dz = -zsb - multiplier * SQUISH_3D;
        this.xsb = xsb;
        this.ysb = ysb;
        this.zsb = zsb;
    }
}
class simplex_Contribution4 {
    constructor(multiplier, xsb, ysb, zsb, wsb) {
        this.dx = -xsb - multiplier * SQUISH_4D;
        this.dy = -ysb - multiplier * SQUISH_4D;
        this.dz = -zsb - multiplier * SQUISH_4D;
        this.dw = -wsb - multiplier * SQUISH_4D;
        this.xsb = xsb;
        this.ysb = ysb;
        this.zsb = zsb;
        this.wsb = wsb;
    }
}
function shuffleSeed(seed) {
    const newSeed = new Uint32Array(1);
    newSeed[0] = seed[0] * 1664525 + 1013904223;
    return newSeed;
}
class simplex_OpenSimplexNoise {
    constructor(clientSeed) {
        this.hashVals = new Uint32Array(4);
        this.initialize();
        this.perm = new Uint8Array(256);
        this.perm2D = new Uint8Array(256);
        this.perm3D = new Uint8Array(256);
        this.perm4D = new Uint8Array(256);
        const source = new Uint8Array(256);
        for (let i = 0; i < 256; i++)
            source[i] = i;
        let seed = new Uint32Array(1);
        seed[0] = clientSeed;
        seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));
        for (let i = 255; i >= 0; i--) {
            seed = shuffleSeed(seed);
            const r = new Uint32Array(1);
            r[0] = (seed[0] + 31) % (i + 1);
            if (r[0] < 0)
                r[0] += i + 1;
            this.perm[i] = source[r[0]];
            this.perm2D[i] = this.perm[i] & 0x0e;
            this.perm3D[i] = (this.perm[i] % 24) * 3;
            this.perm4D[i] = this.perm[i] & 0xfc;
            source[r[0]] = source[i];
        }
    }
    array2D(width, height) {
        const output = new Array(width);
        for (let x = 0; x < width; x++) {
            output[x] = new Array(height);
            for (let y = 0; y < height; y++) {
                output[x][y] = this.noise2D(x, y);
            }
        }
        return output;
    }
    array3D(width, height, depth) {
        const output = new Array(width);
        for (let x = 0; x < width; x++) {
            output[x] = new Array(height);
            for (let y = 0; y < height; y++) {
                output[x][y] = new Array(depth);
                for (let z = 0; z < depth; z++) {
                    output[x][y][z] = this.noise3D(x, y, z);
                }
            }
        }
        return output;
    }
    array4D(width, height, depth, wLength) {
        const output = new Array(width);
        for (let x = 0; x < width; x++) {
            output[x] = new Array(height);
            for (let y = 0; y < height; y++) {
                output[x][y] = new Array(depth);
                for (let z = 0; z < depth; z++) {
                    output[x][y][z] = new Array(wLength);
                    for (let w = 0; w < wLength; w++) {
                        output[x][y][z][w] = this.noise4D(x, y, z, w);
                    }
                }
            }
        }
        return output;
    }
    noise2D(x, y) {
        const stretchOffset = (x + y) * STRETCH_2D;
        const xs = x + stretchOffset, ys = y + stretchOffset;
        const xsb = Math.floor(xs), ysb = Math.floor(ys);
        const squishOffset = (xsb + ysb) * SQUISH_2D;
        const dx0 = x - (xsb + squishOffset), dy0 = y - (ysb + squishOffset);
        const xins = xs - xsb, yins = ys - ysb;
        const inSum = xins + yins;
        const hashVals = this.hashVals;
        hashVals[0] = xins - yins + 1;
        hashVals[1] = inSum;
        hashVals[2] = inSum + yins;
        hashVals[3] = inSum + xins;
        const hash = hashVals[0] |
            (hashVals[1] << 1) |
            (hashVals[2] << 2) |
            (hashVals[3] << 4);
        let c = this.lookup2D[hash];
        let value = 0.0;
        while (typeof c !== 'undefined') {
            const dx = dx0 + c.dx, dy = dy0 + c.dy;
            let attn = 2 - dx * dx - dy * dy;
            if (attn > 0) {
                const px = xsb + c.xsb, py = ysb + c.ysb;
                const i = this.perm2D[(this.perm[px & 0xff] + py) & 0xff];
                const valuePart = gradients2D[i] * dx + gradients2D[i + 1] * dy;
                attn *= attn;
                value += attn * attn * valuePart;
            }
            c = c.next;
        }
        return value * NORM_2D;
    }
    noise3D(x, y, z) {
        const stretchOffset = (x + y + z) * STRETCH_3D;
        const [xs, ys, zs] = [
            x + stretchOffset,
            y + stretchOffset,
            z + stretchOffset
        ];
        const [xsb, ysb, zsb] = [Math.floor(xs), Math.floor(ys), Math.floor(zs)];
        const squishOffset = (xsb + ysb + zsb) * SQUISH_3D;
        const [dx0, dy0, dz0] = [
            x - (xsb + squishOffset),
            y - (ysb + squishOffset),
            z - (zsb + squishOffset)
        ];
        const [xins, yins, zins] = [xs - xsb, ys - ysb, zs - zsb];
        const inSum = xins + yins + zins;
        const hashVals = new Uint32Array(7);
        hashVals[0] = yins - zins + 1;
        hashVals[1] = xins - yins + 1;
        hashVals[2] = xins - zins + 1;
        hashVals[3] = inSum;
        hashVals[4] = inSum + zins;
        hashVals[5] = inSum + yins;
        hashVals[6] = inSum + xins;
        const hash = hashVals[0] |
            (hashVals[1] << 1) |
            (hashVals[2] << 2) |
            (hashVals[3] << 3) |
            (hashVals[4] << 5) |
            (hashVals[5] << 7) |
            (hashVals[6] << 9);
        let c = this.lookup3D[hash];
        let value = 0.0;
        while (typeof c !== 'undefined') {
            const [dx, dy, dz] = [dx0 + c.dx, dy0 + c.dy, dz0 + c.dz];
            let attn = 2 - dx * dx - dy * dy - dz * dz;
            if (attn > 0) {
                const [px, py, pz] = [xsb + c.xsb, ysb + c.ysb, zsb + c.zsb];
                const i = this.perm3D[(this.perm[(this.perm[px & 0xff] + py) & 0xff] + pz) & 0xff];
                const valuePart = gradients3D[i] * dx +
                    gradients3D[i + 1] * dy +
                    gradients3D[i + 2] * dz;
                attn *= attn;
                value += attn * attn * valuePart;
            }
            c = c.next;
        }
        return value * NORM_3D;
    }
    noise4D(x, y, z, w) {
        const stretchOffset = (x + y + z + w) * STRETCH_4D;
        const [xs, ys, zs, ws] = [
            x + stretchOffset,
            y + stretchOffset,
            z + stretchOffset,
            w + stretchOffset
        ];
        const [xsb, ysb, zsb, wsb] = [
            Math.floor(xs),
            Math.floor(ys),
            Math.floor(zs),
            Math.floor(ws)
        ];
        const squishOffset = (xsb + ysb + zsb + wsb) * SQUISH_4D;
        const dx0 = x - (xsb + squishOffset);
        const dy0 = y - (ysb + squishOffset);
        const dz0 = z - (zsb + squishOffset);
        const dw0 = w - (wsb + squishOffset);
        const [xins, yins, zins, wins] = [xs - xsb, ys - ysb, zs - zsb, ws - wsb];
        const inSum = xins + yins + zins + wins;
        const hashVals = new Uint32Array(11);
        hashVals[0] = zins - wins + 1;
        hashVals[1] = yins - zins + 1;
        hashVals[2] = yins - wins + 1;
        hashVals[3] = xins - yins + 1;
        hashVals[4] = xins - zins + 1;
        hashVals[5] = xins - wins + 1;
        hashVals[6] = inSum;
        hashVals[7] = inSum + wins;
        hashVals[8] = inSum + zins;
        hashVals[9] = inSum + yins;
        hashVals[10] = inSum + xins;
        const hash = hashVals[0] |
            (hashVals[1] << 1) |
            (hashVals[2] << 2) |
            (hashVals[3] << 3) |
            (hashVals[4] << 4) |
            (hashVals[5] << 5) |
            (hashVals[6] << 6) |
            (hashVals[7] << 8) |
            (hashVals[8] << 11) |
            (hashVals[9] << 14) |
            (hashVals[10] << 17);
        let c = this.lookup4D[hash];
        let value = 0.0;
        while (typeof c !== 'undefined') {
            const [dx, dy, dz, dw] = [dx0 + c.dx, dy0 + c.dy, dz0 + c.dz, dw0 + c.dw];
            let attn = 2 - dx * dx - dy * dy - dz * dz - dw * dw;
            if (attn > 0) {
                const [px, py, pz, pw] = [
                    xsb + c.xsb,
                    ysb + c.ysb,
                    zsb + c.zsb,
                    wsb + c.wsb
                ];
                const i = this.perm4D[(this.perm[(this.perm[(this.perm[px & 0xff] + py) & 0xff] + pz) & 0xff] +
                    pw) &
                    0xff];
                const valuePart = gradients4D[i] * dx +
                    gradients4D[i + 1] * dy +
                    gradients4D[i + 2] * dz +
                    gradients4D[i + 3] * dw;
                attn *= attn;
                value += attn * attn * valuePart;
            }
            c = c.next;
        }
        return value * NORM_4D;
    }
    initialize() {
        const contributions2D = [];
        for (let i = 0; i < p2D.length; i += 4) {
            const baseSet = base2D[p2D[i]];
            let previous = null;
            let current = null;
            for (let k = 0; k < baseSet.length; k += 3) {
                current = new simplex_Contribution2(baseSet[k], baseSet[k + 1], baseSet[k + 2]);
                if (previous === null)
                    contributions2D[i / 4] = current;
                else
                    previous.next = current;
                previous = current;
            }
            current.next = new simplex_Contribution2(p2D[i + 1], p2D[i + 2], p2D[i + 3]);
        }
        this.lookup2D = [];
        for (let i = 0; i < lookupPairs2D.length; i += 2) {
            this.lookup2D[lookupPairs2D[i]] = contributions2D[lookupPairs2D[i + 1]];
        }
        const contributions3D = [];
        for (let i = 0; i < p3D.length; i += 9) {
            const baseSet = base3D[p3D[i]];
            let previous = null;
            let current = null;
            for (let k = 0; k < baseSet.length; k += 4) {
                current = new simplex_Contribution3(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3]);
                if (previous === null)
                    contributions3D[i / 9] = current;
                else
                    previous.next = current;
                previous = current;
            }
            current.next = new simplex_Contribution3(p3D[i + 1], p3D[i + 2], p3D[i + 3], p3D[i + 4]);
            current.next.next = new simplex_Contribution3(p3D[i + 5], p3D[i + 6], p3D[i + 7], p3D[i + 8]);
        }
        this.lookup3D = [];
        for (let i = 0; i < lookupPairs3D.length; i += 2) {
            this.lookup3D[lookupPairs3D[i]] = contributions3D[lookupPairs3D[i + 1]];
        }
        const contributions4D = [];
        for (let i = 0; i < p4D.length; i += 16) {
            const baseSet = base4D[p4D[i]];
            let previous = null;
            let current = null;
            for (let k = 0; k < baseSet.length; k += 5) {
                current = new simplex_Contribution4(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3], baseSet[k + 4]);
                if (previous === null)
                    contributions4D[i / 16] = current;
                else
                    previous.next = current;
                previous = current;
            }
            current.next = new simplex_Contribution4(p4D[i + 1], p4D[i + 2], p4D[i + 3], p4D[i + 4], p4D[i + 5]);
            current.next.next = new simplex_Contribution4(p4D[i + 6], p4D[i + 7], p4D[i + 8], p4D[i + 9], p4D[i + 10]);
            current.next.next.next = new simplex_Contribution4(p4D[i + 11], p4D[i + 12], p4D[i + 13], p4D[i + 14], p4D[i + 15]);
        }
        this.lookup4D = [];
        for (let i = 0; i < lookupPairs4D.length; i += 2) {
            this.lookup4D[lookupPairs4D[i]] = contributions4D[lookupPairs4D[i + 1]];
        }
    }
}

// CONCATENATED MODULE: ./src/common/noise/index.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return noise_Noise; });

class noise_Noise {
    constructor(rand, freq = 1 / 256, octaves = 4, persistence = 0.5) {
        this.freq = freq;
        this.octaves = octaves;
        this.persistence = persistence;
        this.noise = new simplex_OpenSimplexNoise(rand.random() * 0xffffffff);
    }
    noise2D(x, y) {
        let amp = 1, maxAmp = 0;
        let freq = this.freq;
        let noise = 0;
        for (let i = 0; i < this.octaves; i++) {
            noise += this.noise.noise2D(x * freq, y * freq) * amp;
            maxAmp += amp;
            amp *= this.persistence;
            freq *= 2;
        }
        noise /= maxAmp;
        return (noise + 1) / 2;
    }
}


/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/712119d6b5b8404ce47d2f501258b540.woff";

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/c47bbe6b531a3063257791bfa2de6ed8.otf";

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/6d6a985a020034d856ef3579d5612c00.otf";

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/3b0ea8776746732d38c9c352e0996a82.otf";

/***/ }),

/***/ 2:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/common/data/Item.ts
var Item;
(function (Item) {
    let Type;
    (function (Type) {
        Type["Material"] = "material";
        Type["Consumable"] = "consumable";
        Type["Weapon"] = "weapon";
        Type["Chestplate"] = "chestplate";
        Type["Leggings"] = "leggings";
        Type["Boots"] = "boots";
    })(Type = Item.Type || (Item.Type = {}));
})(Item || (Item = {}));

// CONCATENATED MODULE: ./src/common/data/DataLibrary.ts
function populateNameId(items) {
    const result = [];
    const keys = Object.keys(items).sort();
    let id = 1;
    for (const name of keys) {
        const itemId = id++;
        result[itemId] = Object.assign({}, items[name], { id: itemId, name });
    }
    return result;
}
function loadDataLib(terrains, objects, recipes, elements) {
    return {
        terrains: populateNameId(terrains),
        objects: populateNameId(objects),
        recipes,
        elements
    };
}

// EXTERNAL MODULE: ./node_modules/base64-js/index.js
var base64_js = __webpack_require__(106);

// CONCATENATED MODULE: ./src/common/base64.ts

function toBase64(buf) {
    return Object(base64_js["fromByteArray"])(new Uint8Array(buf));
}
function fromBase64(data) {
    return Object(base64_js["toByteArray"])(data).buffer;
}

// EXTERNAL MODULE: ./node_modules/pako/index.js
var pako = __webpack_require__(105);

// CONCATENATED MODULE: ./src/common/zlib.ts

function compress(data) {
    return pako["deflate"](new Uint8Array(data)).buffer;
}
function decompress(data) {
    return pako["inflate"](new Uint8Array(data)).buffer;
}

// CONCATENATED MODULE: ./src/common/data/GameSave.ts


class GameSave_GameSave {
    constructor(id, library, map, entities, custom, props) {
        this.id = id;
        this.library = library;
        this.map = map;
        this.entities = entities;
        this.custom = custom;
        this.props = props;
    }
    static load(data) {
        const { id, library, map, entities, custom, props } = data;
        return new GameSave_GameSave(id, library, map, entities, custom || {}, props);
    }
    save() {
        return {
            id: this.id,
            library: this.library,
            map: this.map,
            entities: this.entities,
            custom: this.custom,
            props: this.props,
        };
    }
    static import(json) {
        const data = JSON.parse(json);
        data.map = Object.assign({}, data.map, { terrains: new Uint16Array(decompress(fromBase64(data.map.terrains))), objects: new Uint16Array(decompress(fromBase64(data.map.objects))) });
        return GameSave_GameSave.load(data);
    }
    export() {
        const data = this.save();
        data.map = Object.assign({}, data.map, { terrains: toBase64(compress(data.map.terrains.buffer)), objects: toBase64(compress(data.map.objects.buffer)) });
        return JSON.stringify(data);
    }
}

// CONCATENATED MODULE: ./src/common/data/Weapon.ts
var Weapon;
(function (Weapon) {
    let Type;
    (function (Type) {
        Type["Sword"] = "sword";
        Type["Spear"] = "spear";
        Type["Bow"] = "bow";
        Type["Arrow"] = "arrow";
        Type["Fist"] = "fist";
        Type["Bolt"] = "bolt";
        Type["Orb"] = "orb";
        Type["Invisible"] = "invisible";
    })(Type = Weapon.Type || (Weapon.Type = {}));
})(Weapon || (Weapon = {}));

// CONCATENATED MODULE: ./src/common/data/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "b", function() { return Item; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "d", function() { return loadDataLib; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "a", function() { return GameSave_GameSave; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "c", function() { return Weapon; });






/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/common/data/index.ts + 6 modules
var common_data = __webpack_require__(2);

// EXTERNAL MODULE: ./src/common/noise/index.ts + 2 modules
var noise = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/d3-voronoi/index.js + 9 modules
var d3_voronoi = __webpack_require__(188);

// EXTERNAL MODULE: ./node_modules/gl-matrix/src/gl-matrix.js + 2 modules
var gl_matrix = __webpack_require__(0);

// CONCATENATED MODULE: ./src/worker/generation/data/Biome.ts
var Biome;
(function (Biome) {
    let Type;
    (function (Type) {
        Type[Type["None"] = 0] = "None";
        Type[Type["FrozenBarren"] = 1] = "FrozenBarren";
        Type[Type["Barren"] = 2] = "Barren";
        Type[Type["Desert"] = 3] = "Desert";
        Type[Type["SnowPlain"] = 4] = "SnowPlain";
        Type[Type["Savanna"] = 5] = "Savanna";
        Type[Type["Plain"] = 6] = "Plain";
        Type[Type["Taiga"] = 7] = "Taiga";
        Type[Type["Forest"] = 8] = "Forest";
        Type[Type["FrozenLake"] = 9] = "FrozenLake";
        Type[Type["Lake"] = 10] = "Lake";
        Type[Type["Swamp"] = 11] = "Swamp";
    })(Type = Biome.Type || (Biome.Type = {}));
    let Feature;
    (function (Feature) {
        Feature[Feature["None"] = 0] = "None";
        Feature[Feature["Spawn"] = 1] = "Spawn";
        Feature[Feature["Pond"] = 2] = "Pond";
        Feature[Feature["LavaPond"] = 3] = "LavaPond";
        Feature[Feature["Floral"] = 4] = "Floral";
        Feature[Feature["Rocky"] = 5] = "Rocky";
        Feature[Feature["Oasis"] = 6] = "Oasis";
        Feature[Feature["Cemetery"] = 7] = "Cemetery";
        Feature[Feature["Ruins"] = 8] = "Ruins";
    })(Feature = Biome.Feature || (Biome.Feature = {}));
})(Biome || (Biome = {}));

// EXTERNAL MODULE: ./node_modules/random-seed/index.js
var random_seed = __webpack_require__(40);

// CONCATENATED MODULE: ./src/worker/generation/data/GameData.ts

class GameData_GameData {
    constructor(width, height, seed, enemies, library) {
        this.width = width;
        this.height = height;
        this.seed = seed;
        this.enemies = enemies;
        this.library = library;
        this.biomes = [];
        this.rivers = [];
        this.map = {};
        this.game = {};
        this.entities = [];
        this.terrains = new Uint16Array(width * height);
        this.objects = new Uint16Array(width * height);
        this.tileBiomes = new Uint16Array(width * height);
        this.random = Object(random_seed["create"])(seed);
        function makeLookup(items) {
            return Object.assign({}, ...items
                .filter(item => item)
                .map(item => ({ [item.name]: item.id })));
        }
        this.game.nextEntityId = 2;
        this.terrainLookup = makeLookup(library.terrains);
        this.objectLookup = makeLookup(library.objects);
    }
    finalizeMap() {
        return {
            width: this.width, height: this.height,
            props: this.map,
            terrains: this.terrains,
            objects: this.objects
        };
    }
    toIndex(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        return x >= 0 && x < this.width && y >= 0 && y < this.height ?
            (x + this.width * y) : -1;
    }
    getTerrain(x, y) {
        const index = this.toIndex(x, y);
        if (index < 0)
            return 0;
        else {
            const data = this.library.terrains[this.terrains[index]];
            return data && data.name;
        }
    }
    getObject(x, y) {
        const index = this.toIndex(x, y);
        if (index < 0)
            return 0;
        else {
            const data = this.library.objects[this.objects[index]];
            return data && data.name;
        }
    }
    getBiomeIndex(x, y) {
        const index = this.toIndex(x, y);
        if (index < 0)
            return -1;
        else
            return this.tileBiomes[index];
    }
    setTerrain(x, y, terrainName) {
        const index = this.toIndex(x, y);
        if (index < 0)
            return;
        this.terrains[index] = terrainName ? this.terrainLookup[terrainName] : 0;
    }
    setObject(x, y, objectName) {
        const index = this.toIndex(x, y);
        if (index < 0)
            return;
        this.objects[index] = objectName ? this.objectLookup[objectName] : 0;
    }
    setBiomeIndex(x, y, biomeIndex) {
        const index = this.toIndex(x, y);
        if (index < 0)
            return;
        this.tileBiomes[index] = biomeIndex;
    }
}

// CONCATENATED MODULE: ./src/worker/generation/data/index.ts



// EXTERNAL MODULE: ./node_modules/chroma-js/chroma.js
var chroma_js_chroma = __webpack_require__(55);

// EXTERNAL MODULE: ./src/common/random.ts
var common_random = __webpack_require__(10);

// EXTERNAL MODULE: ./src/data/elements.ts
var data_elements = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/lodash-es/times.js + 1 modules
var times = __webpack_require__(56);

// CONCATENATED MODULE: ./src/worker/generation/utils.ts




function* withProgress(list, report) {
    for (let i = 0; i < list.length; i++) {
        yield list[i];
        report(null, i / list.length);
    }
}
function poissonDisk(width, height, radius, rand) {
    // http://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf
    const cellSize = radius * Math.SQRT1_2;
    const gridScale = (n) => n / cellSize;
    const grid = new Uint32Array(Math.ceil(gridScale(width)) * Math.ceil(gridScale(height)));
    const index = (x, y) => Math.floor(gridScale(x)) + Math.floor(gridScale(y)) * Math.ceil(gridScale(width));
    const active = [];
    const samples = [];
    const k = 64;
    const addSample = (x, y) => {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || y < 0 || x >= width || y >= height)
            return false;
        if (grid[index(x, y)])
            return false;
        for (let dy = -1; dy <= 1; dy++)
            for (let dx = -1; dx <= 1; dx++) {
                const i = grid[index(x + dx * cellSize, y + dy * cellSize)];
                if (!i)
                    continue;
                const px = (samples[i - 1][0] - x), py = (samples[i - 1][1] - y);
                if (px * px + py * py <= radius * radius)
                    return false;
            }
        active.push([x, y]);
        grid[index(x, y)] = samples.push([x, y]);
        return true;
    };
    addSample(rand.range(width), rand.range(height));
    while (active.length > 0) {
        const i = rand.range(active.length);
        let j;
        for (j = 0; j < k; j++) {
            const theta = rand.floatBetween(0, Math.PI * 2);
            const r = rand.floatBetween(radius, radius * 2);
            if (addSample(active[i][0] + Math.cos(theta) * r, active[i][1] + Math.sin(theta) * r))
                break;
        }
        if (j === k)
            active.splice(i, 1);
    }
    return samples;
}
function randomColors(rand, n, chroma = { type: 'uniform', min: 0, max: 1 }, lightness = { type: 'uniform', min: 0, max: 1 }) {
    function randomColor() {
        const h = rand.random() * 360;
        const l = Object(common_random["c" /* randomValue */])(lightness, rand.random) * 100;
        const c = Object(common_random["c" /* randomValue */])(chroma, rand.random) * 100;
        return Object(chroma_js_chroma["lch"])(l, c, h);
    }
    const candidates = Object(times["a" /* default */])(n * 100, randomColor);
    const result = candidates.splice(rand.range(candidates.length), 1);
    for (let i = 1; i < n; i++) {
        let dist = 0;
        let color = result[0];
        for (const candidate of candidates) {
            let min = 1000;
            for (const color of result) {
                const d = Object(chroma_js_chroma["distance"])(color, candidate);
                min = Math.min(min, d);
                if (min < dist)
                    break;
            }
            if (min > dist) {
                dist = min;
                color = candidate;
            }
        }
        result.push(color);
    }
    return result.map(color => color.rgb()).map(([r, g, b]) => (r * 0x10000 + g * 0x100 + b * 0x1));
}
function randomElementPair(rand, state) {
    let elem1, elem2;
    do {
        const elements = data_elements["c" /* Elements */].filter(elem => elem.tier <= 1);
        elem1 = elements.splice(rand.range(elements.length), 1)[0];
        elem2 = elements.splice(rand.range(elements.length), 1)[0];
    } while (state.indexOf(`${elem1.name}:${elem2.name}`) >= 0);
    state.push(`${elem1.name}:${elem2.name}`);
    return [elem1.name, elem2.name];
}
function rasterizeLine(x0, y0, x1, y1, cb) {
    x0 = Math.floor(x0);
    y0 = Math.floor(y0);
    x1 = Math.floor(x1);
    y1 = Math.floor(y1);
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = Math.sign(x1 - x0), sy = Math.sign(y1 - y0);
    let err = dx - dy;
    cb(x0, y0);
    while (x0 !== x1 || y0 !== y1) {
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        else {
            err += dx;
            y0 += sy;
        }
        cb(x0, y0);
    }
}

// CONCATENATED MODULE: ./src/worker/generation/biomeGen.ts





const BiomeSize = 32;
const EdgeRoughness = 16;
const EdgeJitter = 8;
const WaterRarity = 16;
function generateBiomePolygons(data) {
    const biomeCenters = poissonDisk(data.width, data.height, BiomeSize, data.random);
    const diagram = Object(d3_voronoi["a" /* voronoi */])()(biomeCenters);
    data.voronoi = diagram;
    data.biomes = biomeCenters.map(([x, y], i) => ({
        index: i,
        type: Biome.Type.None,
        feature: Biome.Feature.None,
        position: gl_matrix["b" /* vec2 */].fromValues(x, y),
        min: gl_matrix["b" /* vec2 */].fromValues(data.width - 1, data.height - 1), max: gl_matrix["b" /* vec2 */].fromValues(0, 0),
        humidity: 0, temperature: 0
    }));
}
function generateHumidity(data) {
    const sources = poissonDisk(data.width, data.height, BiomeSize * WaterRarity, data.random)
        .map(position => ({ position, level: data.random.floatBetween(0.5, 1) }));
    const waters = [];
    const rivers = [];
    const riverTheta = new noise["a" /* Noise */](data.random, 1 / 128, 1);
    for (const { position, level } of sources) {
        let l = level, p = position;
        let theta = data.random.floatBetween(-Math.PI, Math.PI);
        while (p[0] >= 0 && p[0] < data.width && p[1] >= 0 && p[1] < data.height && l > 0.25) {
            waters.push({ position: p, level: l });
            const r = data.random.floatBetween(BiomeSize, BiomeSize * 2);
            const newP = [p[0] + Math.cos(theta) * r, p[1] + Math.sin(theta) * r];
            theta += (riverTheta.noise2D(p[0], p[1]) * 2 - 1) * Math.PI / 4;
            rivers.push({ from: p, to: newP, level: l });
            l *= data.random.floatBetween(0.9, 1);
            p = newP;
        }
    }
    for (const biome of data.biomes) {
        const norm = Math.sqrt(BiomeSize * WaterRarity * BiomeSize * WaterRarity * 2);
        biome.humidity = 0;
        for (const { position, level } of waters) {
            const d = gl_matrix["b" /* vec2 */].dist(position, biome.position);
            const h = level * ((d === 0) ? 1 : Math.pow(1 - Math.min(1, d / norm), 2));
            if (h > biome.humidity)
                biome.humidity = h;
        }
    }
    data.rivers = rivers;
}
function generateTemperature(data) {
    const temperatureNoise = new noise["a" /* Noise */](data.random, 0.002, 1);
    for (const biome of data.biomes) {
        const temp = temperatureNoise.noise2D(biome.position[0], biome.position[1]) * 2 - 1;
        const t = Math.sign(temp) * Math.pow(Math.abs(temp), 1);
        biome.temperature = (t + 1) / 2;
    }
}
const biomeProps = [
    [Biome.Type.FrozenBarren, 0.15, 0.2, 1],
    [Biome.Type.Barren, 0, 0.5, 1],
    [Biome.Type.Desert, 0.15, 0.8, 1],
    [Biome.Type.SnowPlain, 0.25, 0.25, 1],
    [Biome.Type.Savanna, 0.25, 0.75, 1],
    [Biome.Type.Plain, 0.5, 0.5, 1],
    [Biome.Type.Taiga, 0.7, 0.25, 1],
    [Biome.Type.Forest, 0.7, 0.75, 1],
    [Biome.Type.FrozenLake, 0.8, 0.25, 1],
    [Biome.Type.Lake, 1, 0.5, 1],
    [Biome.Type.Swamp, 0.8, 0.75, 1],
];
function populateBiomeTypes(data) {
    for (const biome of data.biomes) {
        let min = Number.MAX_VALUE;
        for (const [type, h, t, w] of biomeProps) {
            const dh = biome.humidity - h, dt = biome.temperature - t;
            const d = 1 / (w * w) * (dh * dh + dt * dt);
            if (d < min) {
                min = d;
                biome.type = type;
            }
        }
    }
}
function rasterizeBiomes(data, report) {
    const noiseX = new noise["a" /* Noise */](data.random, 1 / 32, 4);
    const noiseY = new noise["a" /* Noise */](data.random, 1 / 32, 4);
    for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++) {
            const roughnessX = noiseX.noise2D(x, y) * 2 - 1;
            const roughnessY = noiseY.noise2D(x, y) * 2 - 1;
            let px = x + roughnessX * EdgeRoughness;
            let py = y + roughnessY * EdgeRoughness;
            const realBiome = data.biomes[data.voronoi.find(px, py).index];
            px += data.random.floatBetween(-EdgeJitter, EdgeJitter);
            py += data.random.floatBetween(-EdgeJitter, EdgeJitter);
            const renderBiome = data.biomes[data.voronoi.find(px, py).index];
            let biome = renderBiome;
            if (realBiome.type === Biome.Type.Lake || realBiome.type === Biome.Type.FrozenLake ||
                renderBiome.type === Biome.Type.Lake || renderBiome.type === Biome.Type.FrozenLake)
                biome = realBiome;
            let terrain = null;
            switch (biome.type) {
                case Biome.Type.FrozenBarren:
                    terrain = 'snow';
                    break;
                case Biome.Type.Barren:
                    terrain = data.random.range(50) ? 'soil' : 'grass-light';
                    break;
                case Biome.Type.Desert:
                    terrain = 'sand';
                    break;
                case Biome.Type.SnowPlain:
                    terrain = 'snow';
                    break;
                case Biome.Type.Savanna:
                    terrain = 'grass-light';
                    break;
                case Biome.Type.Plain:
                    terrain = 'grass';
                    break;
                case Biome.Type.Taiga:
                    terrain = 'snow';
                    break;
                case Biome.Type.Forest:
                    terrain = 'grass-deep';
                    break;
                case Biome.Type.FrozenLake:
                    terrain = 'ice';
                    break;
                case Biome.Type.Lake:
                    terrain = 'water';
                    break;
                case Biome.Type.Swamp:
                    terrain = data.random.range(5) ? 'mud' : 'grass-deep';
                    break;
            }
            data.setTerrain(x, y, terrain);
            data.setBiomeIndex(x, y, realBiome.index);
            realBiome.min[0] = Math.min(realBiome.min[0], x);
            realBiome.min[1] = Math.min(realBiome.min[1], y);
            realBiome.max[0] = Math.max(realBiome.max[0], x);
            realBiome.max[1] = Math.max(realBiome.max[1], y);
        }
        report(null, y / data.height);
    }
}
function generateBiomes(data, report) {
    report('generating biomes...', 0);
    generateBiomePolygons(data);
    generateHumidity(data);
    generateTemperature(data);
    populateBiomeTypes(data);
    rasterizeBiomes(data, report);
}

// CONCATENATED MODULE: ./src/worker/generation/decoration.ts

const decorationProps = {
    [Biome.Type.FrozenBarren]: [
        ['stone', 0.02],
        ['rocks', 0.02],
    ],
    [Biome.Type.Barren]: [
        ['stone', 0.02],
        ['rocks', 0.02],
    ],
    [Biome.Type.Desert]: [
        ['tree-coconut', 0.001],
        ['stone', 0.01],
        ['rocks', 0.01],
        ['cactus', 0.01],
    ],
    [Biome.Type.SnowPlain]: [
        ['berries', 0.002],
        ['flower', 0.005],
        ['tree-spruce', 0.005],
        ['bush', 0.008],
        ['rocks', 0.01],
        ['fern', 0.05],
    ],
    [Biome.Type.Savanna]: [
        ['rocks', 0.004],
        ['berries', 0.004],
        ['flower', 0.005],
        ['tree-oak', 0.005],
        ['bush', 0.006],
        ['fern', 0.1],
    ],
    [Biome.Type.Plain]: [
        ['bush', 0.004],
        ['tree-oak', 0.005],
        ['berries', 0.006],
        ['rocks', 0.01],
        ['flower', 0.02],
        ['fern', 0.4],
    ],
    [Biome.Type.Taiga]: [
        ['rocks', 0.001],
        ['berries', 0.003],
        ['flower', 0.005],
        ['bush', 0.007],
        ['fern', 0.05],
        ['tree-spruce', 0.1],
    ],
    [Biome.Type.Forest]: [
        ['rocks', 0.001],
        ['bush', 0.004],
        ['flower', 0.005],
        ['berries', 0.006],
        ['fern', 0.05],
        ['tree-oak', 0.1],
    ],
    [Biome.Type.Swamp]: [
        ['rocks', 0.001],
        ['fern', 0.05],
    ],
};
function decorateMap(data, report) {
    report('decorating map...', 0);
    const flowers = data.library.objects
        .filter(obj => obj && /^flower-\d+$/.test(obj.name))
        .map(obj => obj.name);
    const berries = data.library.objects
        .filter(obj => obj && /^berrybush-\d+$/.test(obj.name))
        .map(obj => obj.name);
    function decorateTile(x, y) {
        if (data.getObject(x, y))
            return;
        const terrain = data.getTerrain(x, y);
        if (terrain === 'water' || terrain === 'lava' || terrain === 'ice' || terrain === 'mud')
            return;
        const biome = data.biomes[data.getBiomeIndex(x, y)];
        const decorations = decorationProps[biome.type];
        if (!decorations)
            return;
        if (biome.feature !== Biome.Feature.None &&
            biome.feature !== Biome.Feature.Floral &&
            biome.feature !== Biome.Feature.Rocky)
            return;
        let r = data.random.random();
        for (const [decor, prob] of decorations) {
            r -= prob;
            if (biome.feature === Biome.Feature.Floral && decor === 'flower')
                r -= 0.1;
            else if (biome.feature === Biome.Feature.Rocky && decor === 'rocks')
                r -= 0.1;
            if (r <= 0) {
                if (decor === 'flower')
                    data.setObject(x, y, flowers[data.random.range(flowers.length)]);
                else if (decor === 'berries')
                    data.setObject(x, y, berries[data.random.range(berries.length)]);
                else
                    data.setObject(x, y, decor);
                break;
            }
        }
    }
    for (let y = 0; y < data.height; y++) {
        for (let x = 0; x < data.width; x++)
            decorateTile(x, y);
        report(null, y / data.height);
    }
}

// EXTERNAL MODULE: ./node_modules/lodash-es/cloneDeep.js + 23 modules
var cloneDeep = __webpack_require__(11);

// CONCATENATED MODULE: ./src/data/enemy.ts

function makeEnemy(id, enemyDef, position) {
    return Object(cloneDeep["a" /* default */])({
        id,
        type: 'enemy',
        age: 0,
        traits: {
            'spatial': {
                pos: position
            },
            'enemy-data': {
                def: enemyDef
            },
            'behavior': {
                behaviors: enemyDef.behaviors
            },
            'stats': {
                base: enemyDef.stats
            }
        }
    });
}

// CONCATENATED MODULE: ./src/worker/generation/featureGen.ts





const FeatureSize = 128;
const featureGen_EdgeJitter = 4;
const BeachSize = 16;
const RiverSegments = 16;
const RiverRoughness = 24;
const SpawnMargins = 0.2;
const EggSparity = 128;
const featureProps = {
    [Biome.Type.Barren]: [
        Biome.Feature.LavaPond,
        Biome.Feature.LavaPond,
        Biome.Feature.Rocky,
        Biome.Feature.Cemetery,
        Biome.Feature.Cemetery,
        Biome.Feature.Ruins,
    ],
    [Biome.Type.FrozenBarren]: [
        Biome.Feature.Rocky,
        Biome.Feature.Rocky,
        Biome.Feature.Cemetery,
        Biome.Feature.Cemetery,
        Biome.Feature.Cemetery,
        Biome.Feature.Ruins,
    ],
    [Biome.Type.Desert]: [
        Biome.Feature.LavaPond,
        Biome.Feature.LavaPond,
        Biome.Feature.LavaPond,
        Biome.Feature.Rocky,
        Biome.Feature.Rocky,
        Biome.Feature.Oasis,
        Biome.Feature.Oasis,
        Biome.Feature.Oasis,
        Biome.Feature.Cemetery,
    ],
    [Biome.Type.SnowPlain]: [
        Biome.Feature.Pond,
        Biome.Feature.Floral,
        Biome.Feature.Floral,
        Biome.Feature.Rocky,
        Biome.Feature.Cemetery,
        Biome.Feature.Ruins,
    ],
    [Biome.Type.Savanna]: [
        Biome.Feature.Pond,
        Biome.Feature.Pond,
        Biome.Feature.Floral,
        Biome.Feature.Floral,
        Biome.Feature.Rocky,
        Biome.Feature.Ruins,
    ],
    [Biome.Type.Plain]: [
        Biome.Feature.Pond,
        Biome.Feature.Pond,
        Biome.Feature.Pond,
        Biome.Feature.Floral,
        Biome.Feature.Floral,
        Biome.Feature.Rocky,
        Biome.Feature.Ruins,
    ],
    [Biome.Type.Taiga]: [
        Biome.Feature.Pond,
        Biome.Feature.Pond,
        Biome.Feature.Pond,
        Biome.Feature.Floral,
        Biome.Feature.Floral,
        Biome.Feature.Floral,
        Biome.Feature.Ruins,
    ],
    [Biome.Type.Forest]: [
        Biome.Feature.Pond,
        Biome.Feature.Pond,
        Biome.Feature.Pond,
        Biome.Feature.Floral,
        Biome.Feature.Floral,
        Biome.Feature.Floral,
        Biome.Feature.Ruins,
    ],
    [Biome.Type.Swamp]: [
        Biome.Feature.Pond,
        Biome.Feature.Rocky,
        Biome.Feature.Rocky,
        Biome.Feature.Cemetery,
        Biome.Feature.Cemetery,
    ],
};
function rasterizeBiome(data, biome, cb, offset) {
    for (let y = biome.min[1] - featureGen_EdgeJitter; y <= biome.max[1] + featureGen_EdgeJitter; y++)
        for (let x = biome.min[0] - featureGen_EdgeJitter; x <= biome.max[0] + featureGen_EdgeJitter; x++) {
            let px = x, py = y;
            if (offset) {
                const [dx, dy] = offset(x, y);
                px += dx;
                py += dy;
            }
            if (data.getBiomeIndex(px, py) === biome.index)
                cb(x, y);
        }
}
function generateBiomeFeatures(data, report) {
    const featurePoints = poissonDisk(data.width, data.height, FeatureSize, data.random);
    const noiseX = new noise["a" /* Noise */](data.random, 1 / 32, 4);
    const noiseY = new noise["a" /* Noise */](data.random, 1 / 32, 4);
    for (const [x, y] of withProgress(featurePoints, report)) {
        const biome = data.biomes[data.getBiomeIndex(x, y)];
        const features = featureProps[biome.type];
        if (!features)
            continue;
        const feature = features[data.random.range(10)];
        if (!feature)
            continue;
        switch (feature) {
            case Biome.Feature.Pond:
            case Biome.Feature.LavaPond:
                {
                    let terrain;
                    if (feature === Biome.Feature.LavaPond)
                        terrain = 'lava';
                    else
                        terrain = 'water';
                    if (terrain === 'water') {
                        rasterizeBiome(data, biome, (x, y) => data.setTerrain(x, y, 'sand'), (x, y) => [
                            (noiseX.noise2D(x, y) * 2 - 1) * BeachSize,
                            (noiseY.noise2D(x, y) * 2 - 1) * BeachSize
                        ]);
                    }
                    rasterizeBiome(data, biome, (x, y) => data.setTerrain(x, y, terrain));
                }
                break;
            case Biome.Feature.Oasis:
                {
                    rasterizeBiome(data, biome, (x, y) => data.setTerrain(x, y, 'water'));
                    rasterizeBiome(data, biome, (x, y) => {
                        if (data.getTerrain(x, y) === 'sand' && data.random.range(5) === 0)
                            data.setObject(x, y, 'tree-coconut');
                    }, (x, y) => {
                        const d = gl_matrix["b" /* vec2 */].sub(gl_matrix["b" /* vec2 */].create(), [x, y], biome.position);
                        gl_matrix["b" /* vec2 */].scale(d, gl_matrix["b" /* vec2 */].normalize(d, d), featureGen_EdgeJitter);
                        return [-d[0], -d[1]];
                    });
                }
                break;
            case Biome.Feature.Cemetery:
                {
                    rasterizeBiome(data, biome, (x, y) => {
                        if (data.random.range(3) === 0) {
                            data.setTerrain(x, y, 'mud');
                            if (data.random.range(10) === 0)
                                data.setObject(x, y, 'cross');
                            else if (data.random.range(10) === 0)
                                data.setObject(x, y, 'bones');
                        }
                    });
                    data.entities.push(makeEnemy(data.game.nextEntityId++, data.enemies.spawner, [x, y]));
                    data.setObject(x, y, null);
                }
                break;
            case Biome.Feature.Ruins:
                {
                    rasterizeBiome(data, biome, (x, y) => {
                        data.setTerrain(x, y, 'stone');
                        if (data.random.range(50) === 0)
                            data.setObject(x, y, 'pillar');
                        else if (data.random.range(50) === 0)
                            data.setObject(x, y, 'bones');
                    }, (x, y) => [
                        data.random.intBetween(-featureGen_EdgeJitter, featureGen_EdgeJitter),
                        data.random.intBetween(-featureGen_EdgeJitter, featureGen_EdgeJitter)
                    ]);
                    data.entities.push(makeEnemy(data.game.nextEntityId++, data.enemies.spawner, [x, y]));
                    data.setObject(x, y, null);
                }
                break;
        }
        biome.feature = feature;
        if (feature === Biome.Feature.Floral || feature === Biome.Feature.Rocky) {
            let neighbor;
            if (neighbor = data.biomes[data.getBiomeIndex(x - FeatureSize, y)])
                neighbor.feature = feature;
            if (neighbor = data.biomes[data.getBiomeIndex(x + FeatureSize, y)])
                neighbor.feature = feature;
            if (neighbor = data.biomes[data.getBiomeIndex(x, y - FeatureSize)])
                neighbor.feature = feature;
            if (neighbor = data.biomes[data.getBiomeIndex(x, y + FeatureSize)])
                neighbor.feature = feature;
        }
    }
    const spawnMargins = [data.width * SpawnMargins, data.height * SpawnMargins];
    let spawnBiome;
    do {
        spawnBiome = data.biomes[data.getBiomeIndex(data.random.intBetween(spawnMargins[0], data.width - spawnMargins[0]), data.random.intBetween(spawnMargins[1], data.width - spawnMargins[1]))];
    } while (spawnBiome.feature !== Biome.Feature.None &&
        spawnBiome.type !== Biome.Type.Lake &&
        spawnBiome.type !== Biome.Type.FrozenLake);
    spawnBiome.feature = Biome.Feature.Spawn;
    data.map.spawn = [spawnBiome.position[0], spawnBiome.position[1]];
}
function rasterizeRivers(data, report) {
    const noiseX = new noise["a" /* Noise */](data.random, 1 / 32, 4);
    const noiseY = new noise["a" /* Noise */](data.random, 1 / 32, 4);
    for (const { from, to, level } of withProgress(data.rivers, report)) {
        function riverPoint(i) {
            let x = from[0] + (to[0] - from[0]) * (i / RiverSegments);
            let y = from[1] + (to[1] - from[1]) * (i / RiverSegments);
            x += Math.floor((noiseX.noise2D(x, y) * 2 - 1) * RiverRoughness);
            y += Math.floor((noiseY.noise2D(x, y) * 2 - 1) * RiverRoughness);
            return [x, y];
        }
        function isFrozen(biome) {
            if (!biome)
                return false;
            switch (biome.type) {
                case Biome.Type.FrozenLake:
                case Biome.Type.FrozenBarren:
                case Biome.Type.SnowPlain:
                case Biome.Type.Taiga:
                    return true;
            }
            return false;
        }
        for (let i = 0; i < RiverSegments; i++) {
            const from = riverPoint(i), to = riverPoint(i + 1);
            const biomeA = data.biomes[data.getBiomeIndex(from[0], from[1])];
            const biomeB = data.biomes[data.getBiomeIndex(to[0], to[1])];
            const terrain = isFrozen(biomeA) && isFrozen(biomeB) ? 'ice' : 'water';
            rasterizeLine(from[0], from[1], to[0], to[1], (x, y) => {
                const size = Math.round(level * 4);
                for (let dy = 0; dy < size; dy++)
                    for (let dx = 0; dx < size; dx++) {
                        if (data.getTerrain(x + dx, y + dy) !== 'water')
                            data.setTerrain(x + dx, y + dy, terrain);
                        data.setObject(x + dx, y + dy, null);
                    }
            });
        }
    }
}
function generateEggs(data, report) {
    const locations = poissonDisk(data.width, data.height, EggSparity, data.random);
    const spawn = data.map.spawn;
    for (const location of locations) {
        const dx = location[0] - spawn[0], dy = location[1] - spawn[1];
        // should not be too close to spawn
        if (dx * dx + dy * dy < 64 * 64)
            continue;
        data.entities.push(makeEnemy(data.game.nextEntityId++, data.enemies.egg, location));
        data.setObject(location[0], location[1], null);
    }
}
function generateFeatures(data, report) {
    report('generating features...', 0);
    generateBiomeFeatures(data, report);
    rasterizeRivers(data, report);
    generateEggs(data, report);
}

// EXTERNAL MODULE: ./src/common/markov.ts + 2 modules
var markov = __webpack_require__(54);

// EXTERNAL MODULE: ./src/common/logic/effect/common.ts
var common = __webpack_require__(5);

// CONCATENATED MODULE: ./src/data/drops.ts
function simpleDrops(min, max, rate, template) {
    return {
        numDrops: { type: 'exponential', min, max, rate },
        items: [{ prob: 1, item: template }]
    };
}

// EXTERNAL MODULE: ./src/data/effects.ts
var effects = __webpack_require__(3);

// CONCATENATED MODULE: ./src/data/objects.ts





const makeObjects = () => ({
    // trees
    'tree-coconut': {
        texture: 'sprites/objects/tree-coco',
        color: '4d6211',
        scale: 3,
        jitter: true,
        collidable: true,
        obstacle: true,
        drops: {
            hp: 5,
            replaceWith: null,
            table: simpleDrops(2, 4, 0.5, {
                template: {
                    id: 'wood-palm',
                    name: 'Palm Wood',
                    type: common_data["b" /* Item */].Type.Material,
                    texture: 'sprites/items/wood'
                },
                substs: []
            })
        }
    },
    'tree-oak': {
        texture: 'sprites/objects/tree-oak',
        color: '01ac1d',
        scale: 3,
        jitter: true,
        collidable: true,
        obstacle: true,
        drops: {
            hp: 5,
            replaceWith: null,
            table: simpleDrops(2, 4, 0.5, {
                template: {
                    id: 'wood-oak',
                    name: 'Oak Wood',
                    type: common_data["b" /* Item */].Type.Material,
                    texture: {
                        type: 'single',
                        tex: 'sprites/items/wood',
                        tint: 'a0a0a0'
                    }
                },
                substs: []
            })
        }
    },
    'tree-spruce': {
        texture: 'sprites/objects/tree-spruce',
        color: '004b01',
        scale: 3,
        jitter: true,
        collidable: true,
        obstacle: true,
        drops: {
            hp: 5,
            replaceWith: null,
            table: simpleDrops(2, 4, 0.5, {
                template: {
                    id: 'wood-spruce',
                    name: 'Spruce Wood',
                    type: common_data["b" /* Item */].Type.Material,
                    texture: {
                        type: 'single',
                        tex: 'sprites/items/wood',
                        tint: '808080'
                    }
                },
                substs: []
            })
        }
    },
    // structures
    'bones': {
        texture: 'sprites/objects/bones',
        color: 'cccccc',
        jitter: true,
        terrain: true,
        collidable: true,
        obstacle: true,
        drops: {
            hp: 3,
            replaceWith: null,
            table: simpleDrops(2, 5, 0.7, {
                template: {
                    id: 'bone',
                    name: 'Bone',
                    type: common_data["b" /* Item */].Type.Material,
                    texture: { type: 'single', tex: 'sprites/items/bone', tint: 'ccb396' },
                    material: {
                        name: 'Bone',
                        color: 'ccb396',
                        weight: 0.1,
                        toughness: 0.1,
                        sharpness: 0.15,
                        affinity: 0.15,
                    },
                },
                substs: []
            })
        }
    },
    'cross': {
        texture: 'sprites/objects/cross',
        color: 'cccccc',
        scale: 2,
        jitter: true,
        collidable: true,
        obstacle: true,
    },
    'pillar': {
        texture: {
            type: 'random',
            texs: ['sprites/objects/pillar-1', 'sprites/objects/pillar-2', 'sprites/objects/pillar-3']
        },
        color: '606060',
        scale: 2,
        collidable: true,
        obstacle: true,
    },
    // vegetation & decorations
    'fern': {
        texture: {
            type: 'random',
            texs: ['sprites/objects/fern-1', 'sprites/objects/fern-2', 'sprites/objects/fern-3']
        },
        color: '416652',
        jitter: true,
        collidable: true,
        drops: {
            hp: 0,
            replaceWith: null,
            table: simpleDrops(0, 1, 4, {
                template: {
                    id: 'leaf',
                    name: 'Leaf',
                    type: common_data["b" /* Item */].Type.Consumable,
                    texture: 'sprites/items/leaf',
                    material: {
                        name: 'Leaf',
                        color: '00d000',
                        weight: 0.05,
                        toughness: 0.05,
                        sharpness: 0.05,
                        affinity: 0.1,
                    },
                    aspects: [
                        { element: data_elements["a" /* ElementDef */].Type.Life, amount: 50 }
                    ],
                    effects: [
                        Object(common["b" /* makeEffect */])(effects["a" /* EffectDef */].Type.Heal, 5, 0)
                    ],
                },
                substs: []
            })
        }
    },
    'cactus': {
        texture: 'sprites/objects/cactus',
        color: '416652',
        scale: 1.5,
        jitter: true,
        collidable: true,
        obstacle: true,
    },
    'bush': {
        texture: 'sprites/objects/bush',
        color: '416652',
        scale: 1.5,
        jitter: true,
        collidable: true,
        obstacle: true,
    },
    'stone': {
        texture: 'sprites/objects/stone',
        color: '505050',
        jitter: true,
        collidable: true,
        obstacle: true,
        drops: {
            hp: 8,
            replaceWith: null,
            table: simpleDrops(2, 5, 0.5, {
                template: {
                    id: 'stone',
                    name: 'Stone',
                    type: common_data["b" /* Item */].Type.Material,
                    texture: 'sprites/items/stone'
                },
                substs: []
            })
        }
    },
    'rocks': {
        texture: {
            type: 'random',
            texs: ['sprites/objects/rocks-1', 'sprites/objects/rocks-2', 'sprites/objects/rocks-3']
        },
        color: '505050',
        jitter: true,
        terrain: true,
        collidable: true,
        drops: {
            hp: 1,
            replaceWith: null,
            table: simpleDrops(1, 3, 1, {
                template: {
                    id: 'stone',
                    name: 'Stone',
                    type: common_data["b" /* Item */].Type.Material,
                    texture: 'sprites/items/stone'
                },
                substs: []
            })
        }
    },
});

// CONCATENATED MODULE: ./src/data/recipes.ts

function recipe(input, output) {
    return { input, output };
}
const makeRecipes = () => [
    recipe([
        { accepts: '^bone$', texture: { type: 'single', tex: 'sprites/items/bone', tint: 'ccb396' } },
        { accepts: '^leaf$', texture: 'sprites/items/leaf' },
    ], {
        id: 'gel-bone',
        name: 'Bone Gel',
        description: 'alchemical reagent: boost elemental fusion',
        type: common_data["b" /* Item */].Type.Consumable,
        texture: { type: 'single', tex: 'sprites/items/gel', tint: 'ccb396' }
    }),
    recipe([
        { accepts: '^stone$', texture: 'sprites/items/stone' },
        { accepts: '^leaf$', texture: 'sprites/items/leaf' },
    ], {
        id: 'gel-stone',
        name: 'Stone Gel',
        description: 'alchemical reagent: boost elemental fission',
        type: common_data["b" /* Item */].Type.Consumable,
        texture: { type: 'single', tex: 'sprites/items/gel', tint: '808080' }
    }),
    recipe([
        { accepts: '^solution$', texture: 'sprites/items/solution' },
        { accepts: '^leaf$', texture: 'sprites/items/leaf' },
        { accepts: '^stone$', texture: 'sprites/items/stone' },
    ], {
        id: 'gel-alchemy',
        name: 'Alchemical Gel',
        description: 'alchemical reagent: purify solution',
        type: common_data["b" /* Item */].Type.Consumable,
        texture: { type: 'single', tex: 'sprites/items/gel', tint: 'e06060' }
    }),
    recipe([
        { accepts: '^stone$', texture: 'sprites/items/stone' },
    ], {
        id: 'scale',
        name: 'Stone Shard',
        type: common_data["b" /* Item */].Type.Material,
        texture: { type: 'single', tex: 'sprites/items/scale', tint: '808080' },
        material: {
            name: 'Stone',
            color: '808080',
            weight: 0.1,
            toughness: 0.1,
            sharpness: 0.15,
            affinity: 0.1,
        },
    }),
    recipe([
        { accepts: '^bone$', texture: { type: 'single', tex: 'sprites/items/bone', tint: 'ccb396' } },
    ], {
        id: 'scale',
        name: 'Bone Shard',
        type: common_data["b" /* Item */].Type.Material,
        texture: { type: 'single', tex: 'sprites/items/scale', tint: 'ccb396' },
        material: {
            name: 'Bone',
            color: 'ccb396',
            weight: 0.05,
            toughness: 0.05,
            sharpness: 0.2,
            affinity: 0.15,
        },
    }),
    recipe([
        { accepts: '^wood-', texture: 'sprites/items/wood' },
        { accepts: '^wood-', texture: 'sprites/items/wood' },
    ], {
        id: 'rod',
        name: 'Wooden Rod',
        type: common_data["b" /* Item */].Type.Material,
        texture: { type: 'single', tex: 'sprites/items/rod', tint: 'b3927b' },
        material: {
            name: 'Wood',
            color: 'b3927b',
            weight: 0.15,
            toughness: 0.15,
            sharpness: 0.05,
            affinity: 0.25,
        },
    }),
    recipe([
        { accepts: '^stone$', texture: 'sprites/items/stone' },
        { accepts: '^stone$', texture: 'sprites/items/stone' },
    ], {
        id: 'rod',
        name: 'Stone Rod',
        type: common_data["b" /* Item */].Type.Material,
        texture: { type: 'single', tex: 'sprites/items/rod', tint: '808080' },
        material: {
            name: 'Stone',
            color: '808080',
            weight: 0.25,
            toughness: 0.2,
            sharpness: 0.1,
            affinity: 0.1,
        },
    }),
    recipe([
        { accepts: '^wood-', texture: 'sprites/items/wood' },
        { accepts: '^wood-', texture: 'sprites/items/wood' },
    ], {
        id: 'skin',
        name: 'Wood Plate',
        type: common_data["b" /* Item */].Type.Material,
        texture: { type: 'single', tex: 'sprites/items/skin', tint: 'b3927b' },
        material: {
            name: 'Wood',
            color: 'b3927b',
            weight: 0.2,
            toughness: 0.2,
            sharpness: 0.05,
            affinity: 0.25,
        },
    }),
    recipe([
        { accepts: '^leaf$', texture: 'sprites/items/leaf' },
        { accepts: '^leaf$', texture: 'sprites/items/leaf' },
    ], {
        id: 'skin',
        name: 'Leaf Pelt',
        type: common_data["b" /* Item */].Type.Material,
        texture: { type: 'single', tex: 'sprites/items/skin', tint: '00d000' },
        material: {
            name: 'Leaf',
            color: '00d000',
            weight: 0.1,
            toughness: 0.15,
            sharpness: 0.05,
            affinity: 0.15,
        },
    }),
];

// CONCATENATED MODULE: ./src/data/template.ts




const NumFlowerTypes = 4;
function makeFlower(name, type, color, elements) {
    return {
        texture: {
            type: 'composite',
            overlay: { type: 'single', tex: `sprites/objects/flower-petal-${type}`, tint: color },
            base: { type: 'single', tex: `sprites/objects/flower-stem-${type}` }
        },
        color,
        jitter: true,
        collidable: true,
        drops: {
            hp: 0,
            replaceWith: null,
            table: simpleDrops(1, 2, 1, {
                template: {
                    id: `flower-${name.toLowerCase()}`,
                    name,
                    type: common_data["b" /* Item */].Type.Consumable,
                    texture: {
                        type: 'composite',
                        overlay: { type: 'single', tex: `sprites/items/flower-petal-${type}`, tint: color },
                        base: { type: 'single', tex: `sprites/items/flower-stem-${type}` }
                    },
                    aspects: [
                        { element: elements[0], amount: 0 },
                        { element: elements[1], amount: 0 }
                    ],
                    effects: [
                        Object(common["b" /* makeEffect */])(effects["a" /* EffectDef */].Type.Heal, 10, 0)
                    ]
                },
                substs: [
                    { path: 'aspects[0].amount', type: 'gaussian', mean: 15, sd: 2, min: 0, max: 20 },
                    { path: 'aspects[1].amount', type: 'gaussian', mean: 8, sd: 2, min: 0, max: 12 },
                ]
            })
        }
    };
}
function makeBush() {
    return {
        texture: 'sprites/objects/bush',
        color: '416652',
        scale: 1.5,
        jitter: true,
        collidable: true,
        obstacle: true,
    };
}
const NumBerryTypes = 4;
function makeBerryBush(name, depleted, type, color, elements) {
    return {
        texture: {
            type: 'composite',
            overlay: { type: 'single', tex: 'sprites/objects/berrybush-berries', tint: color },
            base: { type: 'single', tex: 'sprites/objects/berrybush-bush' }
        },
        color: '416652',
        scale: 1.5,
        jitter: true,
        collidable: true,
        obstacle: true,
        drops: {
            hp: 1,
            replaceWith: depleted,
            table: simpleDrops(2, 4, 1, {
                template: {
                    id: `berries-${name.toLowerCase()}`,
                    name: `${name} Berries`,
                    type: common_data["b" /* Item */].Type.Consumable,
                    texture: { type: 'single', tex: `sprites/items/berries-${type}`, tint: color },
                    aspects: [
                        { element: elements[0], amount: 0 },
                        { element: elements[1], amount: 0 }
                    ],
                    effects: [
                        Object(common["b" /* makeEffect */])(effects["a" /* EffectDef */].Type.Heal, 10, 0)
                    ]
                },
                substs: [
                    { path: 'aspects[0].amount', type: 'gaussian', mean: 20, sd: 2, min: 0, max: 25 },
                    { path: 'aspects[1].amount', type: 'gaussian', mean: 12, sd: 2, min: 0, max: 15 },
                ]
            })
        }
    };
}

// CONCATENATED MODULE: ./src/data/terrains.ts
const makeTerrains = () => ({
    'water': {
        texture: { type: 'liquid', tex: 'sprites/terrains/water', offset: 16, time: 5000 },
        color: '235c7c',
        liquid: true,
        speed: -5,
    },
    'lava': {
        texture: { type: 'liquid', tex: 'sprites/terrains/lava', offset: 16, time: 15000 },
        color: '8b1408',
        liquid: true,
        speed: -20,
        damage: 10,
    },
    'mud': {
        texture: { type: 'liquid', tex: 'sprites/terrains/mud', offset: 8, time: 5000 },
        color: '6d584b',
        speed: -10,
        liquid: true,
    },
    'grass': {
        texture: {
            type: 'random',
            texs: ['sprites/terrains/grass-1', 'sprites/terrains/grass-2', 'sprites/terrains/grass-3'],
            tint: '00ff00'
        },
        color: '51a01e',
    },
    'grass-deep': {
        texture: {
            type: 'random',
            texs: ['sprites/terrains/grass-1', 'sprites/terrains/grass-2', 'sprites/terrains/grass-3'],
            tint: '00cc00'
        },
        color: '316112',
    },
    'grass-light': {
        texture: {
            type: 'random',
            texs: ['sprites/terrains/grass-1', 'sprites/terrains/grass-2', 'sprites/terrains/grass-3'],
            tint: 'aaffaa'
        },
        color: '487f61',
    },
    'soil': {
        texture: {
            type: 'random',
            texs: ['sprites/terrains/soil-1', 'sprites/terrains/soil-2', 'sprites/terrains/soil-3'],
        },
        color: '846b5c',
    },
    'stone': {
        texture: {
            type: 'random',
            texs: ['sprites/terrains/stone-1', 'sprites/terrains/stone-2', 'sprites/terrains/stone-3'],
            tint: '404040'
        },
        color: '514845',
    },
    'sand': {
        texture: {
            type: 'random',
            texs: ['sprites/terrains/sand-1', 'sprites/terrains/sand-2', 'sprites/terrains/sand-3'],
        },
        color: 'e2bf90',
    },
    'ice': {
        texture: 'sprites/terrains/ice',
        color: 'aad0e7',
    },
    'snow': {
        texture: 'sprites/terrains/snow',
        color: 'e0e9ee',
    },
});

// EXTERNAL MODULE: ./node_modules/lodash-es/fromPairs.js
var fromPairs = __webpack_require__(203);

// CONCATENATED MODULE: ./src/worker/generation/libraryGen.ts










const NumFlowers = 16 / NumFlowerTypes;
const NumBerries = 16 / NumBerryTypes;
function generateLibrary(seed, report) {
    const random = Object(random_seed["create"])(seed);
    report('generating game data...', 0);
    const terrains = makeTerrains();
    const objects = makeObjects();
    const recipes = makeRecipes();
    const randomElementState = [];
    const flowerColors = randomColors(random, NumFlowers * NumFlowerTypes, { type: 'uniform', min: 0.5, max: 1 }, { type: 'uniform', min: 0.8, max: 1 });
    for (let type = 1; type <= NumFlowerTypes; type++) {
        for (let i = 0; i < NumFlowers; i++) {
            objects[`flower-${type}${i}`] = makeFlower(Object(markov["a" /* generateName */])(5, 10, random.random), type, flowerColors.pop().toString(16), randomElementPair(random, randomElementState));
        }
    }
    const berryColors = randomColors(random, NumBerries * NumBerryTypes, { type: 'uniform', min: 0.3, max: 1 }, { type: 'uniform', min: 0.7, max: 1 });
    for (let type = 1; type <= NumBerryTypes; type++) {
        for (let i = 0; i < NumBerries; i++) {
            objects[`berrybush-${type}${i}-depleted`] = makeBush();
            objects[`berrybush-${type}${i}`] = makeBerryBush(Object(markov["a" /* generateName */])(5, 10, random.random), `berrybush-${type}${i}-depleted`, type, berryColors.pop().toString(16), randomElementPair(random, randomElementState));
        }
    }
    const elemColors = randomColors(random, data_elements["c" /* Elements */].length);
    const elements = Object(fromPairs["a" /* default */])(data_elements["c" /* Elements */].map(({ tier, name }) => {
        const fissionThreshold = random.random() * 6 + tier * 8;
        const fissionRate = 0.1 + 0.1 * (tier + 1) * random.random();
        const fusionThreshold = 10 + random.random() * 8 + tier * 10;
        const fusionRate = 0.2 + 0.1 * (data_elements["a" /* ElementDef */].MaxTier - tier + 1) * (random.random() + 1);
        const color = elemColors.pop().toString(16);
        return [name, {
                fissionThreshold: { type: 'gaussian', mean: fissionThreshold, sd: tier + 1, max: 8 * (tier + 1) },
                fusionThreshold: { type: 'gaussian', mean: fusionThreshold, sd: 2 * (tier + 1), min: 10 * tier },
                fissionRate: { type: 'gaussian', mean: fissionRate, sd: 0.05, min: 0, max: 0.8 },
                fusionRate: { type: 'gaussian', mean: fusionRate, sd: 0.05, min: 0, max: 0.8 },
                color
            }];
    }));
    return Object(common_data["d" /* loadDataLib */])(terrains, objects, recipes, elements);
}

// CONCATENATED MODULE: ./src/data/player.ts
const InitialPlayer = () => ({
    id: 1,
    type: 'player',
    age: 0,
    traits: {
        'spatial': {
            pos: [0, 0]
        }
    }
});

// CONCATENATED MODULE: ./src/worker/generation/propsGen.ts

function generateProps(data, report) {
    report('generating game data...', 0);
    data.map.seed = data.seed;
    const player = InitialPlayer();
    player.traits.spatial.pos = data.map.spawn;
    data.entities.push(player);
}

// CONCATENATED MODULE: ./src/worker/generation/index.ts







function generate(width, height, seed, enemies, report = () => { }) {
    const library = generateLibrary(seed, report);
    const data = new GameData_GameData(width, height, seed, enemies, library);
    generateBiomes(data, report);
    generateFeatures(data, report);
    decorateMap(data, report);
    generateProps(data, report);
    report('done!', 1);
    const mapData = data.finalizeMap();
    return new common_data["a" /* GameSave */]('', library, mapData, data.entities, {}, data.game);
}

// CONCATENATED MODULE: ./src/worker/index.ts

/* harmony default export */ var worker = __webpack_exports__["default"] = (function () {
    onmessage = ev => {
        switch (ev.data.action) {
            case 'generate':
                {
                    const { width, height, seed, enemies } = ev.data;
                    const gameSave = generate(width, height, seed, enemies, (message, progress) => {
                        postMessage({ action: 'progress', message, progress });
                    });
                    postMessage({ action: 'completed', save: gameSave.save() });
                }
                break;
            default:
                console.error('unknown message', ev.data);
        }
    };
});


/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/gl-matrix/src/gl-matrix.js + 2 modules
var gl_matrix = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/stats.js/build/stats.min.js
var stats_min = __webpack_require__(194);

// EXTERNAL MODULE: ./node_modules/vex-dialog/dist/vex.dialog.js
var vex_dialog = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/vex-js/dist/js/vex.js
var vex = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/vex-js/dist/css/vex-theme-plain.css
var vex_theme_plain = __webpack_require__(374);

// EXTERNAL MODULE: ./node_modules/vex-js/dist/css/vex.css
var css_vex = __webpack_require__(371);

// EXTERNAL MODULE: ./src/app/styles.css
var app_styles = __webpack_require__(369);

// CONCATENATED MODULE: ./src/app/bootstrap.ts







function bootstrap(app) {
    document.body.appendChild(app.view);
    function resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        app.renderer.resize(width, height);
    }
    window.onresize = resize;
    resize();
    const stats = new stats_min();
    document.body.appendChild(stats.dom);
    const _update = app.ticker.update;
    app.ticker.update = (...args) => {
        stats.begin();
        _update.apply(app.ticker, args);
        stats.end();
    };
    gl_matrix["a" /* glMatrix */].setMatrixArrayType(Float64Array);
    vex["registerPlugin"](vex_dialog);
    vex["defaultOptions"].className = 'vex-theme-plain';
    return app;
}

// EXTERNAL MODULE: ./node_modules/pixi.js/lib/index.js
var lib = __webpack_require__(1);

// CONCATENATED MODULE: ./src/app/states/GameState.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class GameState_GameState {
    constructor(app) {
        this.app = app;
        this.root = new lib["Container"]();
    }
    enter() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    resume() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    leave() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    update(dt) { }
    layout() { }
}

// CONCATENATED MODULE: ./src/app/components/Button.ts


class Button_Button extends lib["Container"] {
    constructor() {
        super();
        this.content = new lib["Container"]();
        this.texNormal = lib["Texture"].fromFrame('sprites/ui/button-normal');
        this.texPressed = lib["Texture"].fromFrame('sprites/ui/button-pressed');
        this.plane = new lib["mesh"].NineSlicePlane(this.texNormal, 6, 6, 6, 6);
        this.isPressed = false;
        this._contentWidth = 0;
        this._contentHeight = 0;
        this._isEnabled = true;
        this.addChild(this.plane);
        this.addChild(this.content);
        this.plane.scale = new lib["Point"](UIScaleFactor, UIScaleFactor);
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', () => this.updateState(true));
        this.on('pointerupoutside', () => this.updateState(false));
        this.on('pointerup', () => {
            if (this._isEnabled && this.isPressed)
                this.emit(Button_Button.Clicked);
            this.updateState(false);
        });
    }
    updateState(pressed) {
        if (!this._isEnabled)
            pressed = false;
        this.isPressed = pressed;
        this.plane.texture = pressed ? this.texPressed : this.texNormal;
    }
    get contentWidth() { return this._contentWidth; }
    get contentHeight() { return this._contentHeight; }
    get isEnabled() { return this._isEnabled; }
    set isEnabled(value) {
        this._isEnabled = value;
        this.updateState(this.isPressed);
        if (!value) {
            this.alpha = 0.5;
        }
        else {
            this.alpha = 1;
        }
    }
    layout(width, height) {
        this.plane.x = 0;
        this.plane.y = 0;
        this.plane.width = width / UIScaleFactor;
        this.plane.height = height / UIScaleFactor;
        if (this.isPressed) {
            this.content.x = UIScaleFactor;
            this.content.y = UIScaleFactor;
            this._contentWidth = width - UIScaleFactor;
            this._contentHeight = height - UIScaleFactor;
        }
        else {
            this.content.x = 0;
            this.content.y = 0;
            this._contentWidth = width - UIScaleFactor;
            this._contentHeight = height - UIScaleFactor;
        }
    }
}
Button_Button.Clicked = 'button.clicked';

// CONCATENATED MODULE: ./src/app/components/Text.ts


class Text_Text extends lib["Container"] {
    set text(value) { this._text.text = value; }
    get style() { return this._text.style; }
    get contentWidth() { return this._text.width; }
    get contentHeight() { return this._text.height; }
    constructor(text, style) {
        super();
        this._text = new lib["Text"](text, Object.assign({ fontFamily: 'Unibody8Pro', fontSize: 8, fill: 'white', align: 'center' }, style));
        this.addChild(this._text);
        const scale = (style && style.scale || 1) * UIScaleFactor;
        this._text.scale = new lib["Point"](scale, scale);
    }
    layout(width, height) {
        switch (this._text.style.align) {
            case 'left':
                this._text.x = 0;
                break;
            case 'center':
                this._text.x = (width - this._text.width) / 2;
                break;
            case 'right':
                this._text.x = width - this._text.width;
                break;
        }
        this._text.y = (height - this._text.height) / 2;
    }
}

// CONCATENATED MODULE: ./src/app/components/Panel.ts


class Panel_Panel extends lib["Container"] {
    constructor(app) {
        super();
        this.app = app;
        this.content = new lib["Container"]();
        this.panelBg = new lib["Sprite"](lib["Texture"].WHITE);
        this.panelMask = new lib["mesh"].NineSlicePlane(lib["Texture"].fromFrame('sprites/ui/panel-mask'), 6, 6, 6, 6);
        this.maskTex = lib["RenderTexture"].create(0, 0);
        this.panelBorder = new lib["mesh"].NineSlicePlane(lib["Texture"].fromFrame('sprites/ui/panel'), 6, 6, 6, 6);
        this._contentWidth = 0;
        this._contentHeight = 0;
        this.panelMask.scale = new lib["Point"](UIScaleFactor, UIScaleFactor);
        this.panelBorder.scale = new lib["Point"](UIScaleFactor, UIScaleFactor);
        this.panelBg.tint = 0x404040;
        const mask = new lib["Sprite"](this.maskTex);
        this.content.addChild(this.panelBg);
        this.addChild(this.content);
        this.content.mask = mask;
        this.addChild(this.panelBorder);
        this.addChild(mask);
    }
    get contentWidth() { return this._contentWidth; }
    get contentHeight() { return this._contentHeight; }
    layout(width, height) {
        this.panelBorder.width = width / UIScaleFactor;
        this.panelBorder.height = height / UIScaleFactor;
        this.panelBg.width = width;
        this.panelBg.height = height;
        this.panelMask.width = this.panelBorder.width;
        this.panelMask.height = this.panelBorder.height;
        if (this._contentWidth !== width || this._contentHeight !== height || !this.maskTex) {
            this.content.x = 0;
            this.content.y = 0;
            this._contentWidth = width;
            this._contentHeight = height;
            this.maskTex.resize(width, height);
            this.app.renderer.render(this.panelMask, this.maskTex);
        }
    }
}

// CONCATENATED MODULE: ./src/app/components/TextButton.ts


class TextButton_TextButton extends Button_Button {
    constructor(text, style) {
        super();
        this.text = new Text_Text(text, style);
        this.content.addChild(this.text);
    }
    layout(width, height) {
        super.layout(width, height);
        this.text.x = 0;
        this.text.y = 0;
        this.text.layout(this.contentWidth, this.contentHeight);
    }
}

// CONCATENATED MODULE: ./src/app/components/TextureSpriteRenderer.ts

const OutlineWidth = 2;
const BatchSize = 2000;
const VAOBufferSize = 0x80000;
const indices = new Uint16Array(BatchSize * 6);
for (let i = 0; i < BatchSize; i++) {
    indices[i * 6 + 0] = i * 4 + 0;
    indices[i * 6 + 1] = i * 4 + 1;
    indices[i * 6 + 2] = i * 4 + 2;
    indices[i * 6 + 3] = i * 4 + 0;
    indices[i * 6 + 4] = i * 4 + 2;
    indices[i * 6 + 5] = i * 4 + 3;
}
class TextureSpriteRenderer_TextureSpriteRenderer extends lib["ObjectRenderer"] {
    constructor() {
        super(...arguments);
        this.currentTex = null;
        this.currentBlendMode = -1;
        this.batchSize = 0;
        this.batch = [];
        this.vaoBuf = new ArrayBuffer(VAOBufferSize);
        this.f32 = new Float32Array(this.vaoBuf);
        this.u32 = new Uint32Array(this.vaoBuf);
    }
    onContextChange() {
        const gl = this.renderer.gl;
        this.shader = new TextureSpriteRenderer_SpriteShader(gl);
        this.vb = lib["glCore"].GLBuffer.createVertexBuffer(gl, null, gl.STREAM_DRAW);
        this.ib = lib["glCore"].GLBuffer.createIndexBuffer(gl, indices, gl.STATIC_DRAW);
        const vaoSize = 12 * 4;
        this.vao = this.renderer.createVao()
            .addIndex(this.ib)
            .addAttribute(this.vb, this.shader.attributes.aVertexPosition, gl.FLOAT, false, vaoSize, 0)
            .addAttribute(this.vb, this.shader.attributes.aTextureCoord, gl.UNSIGNED_SHORT, true, vaoSize, 2 * 4)
            .addAttribute(this.vb, this.shader.attributes.aColor, gl.UNSIGNED_BYTE, true, vaoSize, 3 * 4)
            .addAttribute(this.vb, this.shader.attributes.aClamp, gl.FLOAT, true, vaoSize, 4 * 4)
            .addAttribute(this.vb, this.shader.attributes.aOffset, gl.FLOAT, true, vaoSize, 8 * 4)
            .addAttribute(this.vb, this.shader.attributes.aThickness, gl.FLOAT, true, vaoSize, 10 * 4);
    }
    render(sprite) {
        if (!sprite.texture.valid)
            return;
        if (this.batchSize >= BatchSize ||
            sprite.texture.baseTexture !== this.currentTex ||
            sprite.blendMode !== this.currentBlendMode)
            this.flush();
        this.batch[this.batchSize++] = sprite;
        this.currentTex = sprite.texture.baseTexture;
        this.currentBlendMode = sprite.blendMode;
    }
    start() {
        this.renderer.bindShader(this.shader);
        this.renderer.bindVao(this.vao);
        this.vb.bind();
    }
    stop() {
        this.flush();
    }
    flush() {
        if (this.batchSize === 0)
            return;
        const renderer = this.renderer;
        renderer.bindTexture(this.currentTex, 0, true);
        renderer.state && renderer.state.setBlendMode(this.currentBlendMode);
        const f32 = this.f32, u32 = this.u32;
        let p = 0;
        for (let i = 0; i < this.batchSize; i++) {
            const sprite = this.batch[i];
            const uvs = sprite.texture._uvs.uvsUint32;
            const vd = sprite.vertexData;
            const alpha = Math.min(sprite.worldAlpha, 1.0);
            let tint = sprite._tint;
            tint = (tint >> 16) + (tint & 0xff00) + ((tint & 0xff) << 16);
            const argb = alpha < 1.0 && this.currentTex.premultipliedAlpha
                ? lib["utils"].premultiplyTint(tint, alpha) : tint + (alpha * 255 << 24);
            const offset = sprite.offset || [0, 0];
            const frame = sprite.texture.frame;
            const tr = sprite.transform.worldTransform;
            const clampX = frame.x / this.currentTex.width;
            const clampY = frame.y / this.currentTex.height;
            const clampZ = (frame.x + frame.width) / this.currentTex.width;
            const clampW = (frame.y + frame.height) / this.currentTex.height;
            const offsetX = offset[0] / this.currentTex.width;
            const offsetY = offset[1] / this.currentTex.height;
            const thicknessX = sprite.outline ? OutlineWidth / Math.sqrt(tr.a * tr.a + tr.c * tr.c) / this.currentTex.realWidth : 0;
            const thicknessY = sprite.outline ? OutlineWidth / Math.sqrt(tr.b * tr.b + tr.d * tr.d) / this.currentTex.realHeight : 0;
            const trX = sprite.renderTranslation ? Math.round(sprite.renderTranslation[0]) : 0;
            const trY = sprite.renderTranslation ? Math.round(sprite.renderTranslation[1]) : 0;
            f32[p++] = vd[0] + trX;
            f32[p++] = vd[1] + trY;
            u32[p++] = uvs[0];
            u32[p++] = argb;
            f32[p++] = clampX;
            f32[p++] = clampY;
            f32[p++] = clampZ;
            f32[p++] = clampW;
            f32[p++] = offsetX;
            f32[p++] = offsetY;
            f32[p++] = thicknessX;
            f32[p++] = thicknessY;
            f32[p++] = vd[2] + trX;
            f32[p++] = vd[3] + trY;
            u32[p++] = uvs[1];
            u32[p++] = argb;
            f32[p++] = clampX;
            f32[p++] = clampY;
            f32[p++] = clampZ;
            f32[p++] = clampW;
            f32[p++] = offsetX;
            f32[p++] = offsetY;
            f32[p++] = thicknessX;
            f32[p++] = thicknessY;
            f32[p++] = vd[4] + trX;
            f32[p++] = vd[5] + trY;
            u32[p++] = uvs[2];
            u32[p++] = argb;
            f32[p++] = clampX;
            f32[p++] = clampY;
            f32[p++] = clampZ;
            f32[p++] = clampW;
            f32[p++] = offsetX;
            f32[p++] = offsetY;
            f32[p++] = thicknessX;
            f32[p++] = thicknessY;
            f32[p++] = vd[6] + trX;
            f32[p++] = vd[7] + trY;
            u32[p++] = uvs[3];
            u32[p++] = argb;
            f32[p++] = clampX;
            f32[p++] = clampY;
            f32[p++] = clampZ;
            f32[p++] = clampW;
            f32[p++] = offsetX;
            f32[p++] = offsetY;
            f32[p++] = thicknessX;
            f32[p++] = thicknessY;
        }
        this.vb.upload(this.vaoBuf.slice(0, p * 4 * 2), 0, true);
        const gl = this.renderer.gl;
        gl.drawElements(gl.TRIANGLES, this.batchSize * 6, gl.UNSIGNED_SHORT, 0);
        this.batchSize = 0;
        this.currentTex = null;
        this.currentBlendMode = -1;
    }
}
TextureSpriteRenderer_TextureSpriteRenderer.Name = 'tex-sprite';
class TextureSpriteRenderer_SpriteShader extends lib["Shader"] {
    constructor(gl) {
        super(gl, `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute vec4 aClamp;
attribute vec4 aOffset;
attribute vec4 aThickness;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vClamp;
varying vec4 vOffset;
varying vec4 vThickness;

void main(void)
{
    vec4 v = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    gl_Position = v;
    vTextureCoord = aTextureCoord;
    vColor = aColor;
    vClamp = aClamp;
    vOffset = aOffset;
    vThickness = aThickness;
}`, `
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vClamp;
varying vec4 vOffset;
varying vec4 vThickness;

uniform sampler2D uSampler;

float sampleAlpha(vec2 coords, float x, float y) {
  return texture2D(uSampler, clamp(coords + vec2(x, y), vClamp.xy, vClamp.zw)).a;
}

void main(void)
{
    vec2 coords = mod(vTextureCoord - vClamp.xy + vOffset.xy, vClamp.zw - vClamp.xy) + vClamp.xy;
    vec4 sample = texture2D(uSampler, coords);
    float a = sample.a;
    a = max(a, sampleAlpha(coords, -vThickness.x, 0.0));
    a = max(a, sampleAlpha(coords, vThickness.x, 0.0));
    a = max(a, sampleAlpha(coords, 0.0, -vThickness.y));
    a = max(a, sampleAlpha(coords, 0.0, vThickness.y));
    a = max(a, sampleAlpha(coords, -vThickness.x, -vThickness.y));
    a = max(a, sampleAlpha(coords, vThickness.x, -vThickness.y));
    a = max(a, sampleAlpha(coords, -vThickness.x, vThickness.y));
    a = max(a, sampleAlpha(coords, vThickness.x, vThickness.y));
    gl_FragColor = vec4((sample.rgb + vec3(0.2) * (1.0 - sample.a)) * a, a) * vColor;
}
`);
    }
}
lib["WebGLRenderer"].registerPlugin(TextureSpriteRenderer_TextureSpriteRenderer.Name, TextureSpriteRenderer_TextureSpriteRenderer);
lib["CanvasRenderer"].registerPlugin(TextureSpriteRenderer_TextureSpriteRenderer.Name, lib["CanvasSpriteRenderer"]);

// CONCATENATED MODULE: ./src/app/components/TextureSprite.ts


function hashKey(key) {
    // https://stackoverflow.com/a/12996028
    key = ((key >> 16) ^ key) * 0x45d9f3b;
    key = ((key >> 16) ^ key) * 0x45d9f3b;
    key = (key >> 16) ^ key;
    return key;
}
class TextureSprite_TextureSprite extends lib["Sprite"] {
    constructor(texture) {
        super(texture);
        this.outline = false;
        this.animBeginTime = 0;
        this.animName = '';
        this.still = true;
        this.actionAnimName = '';
        this.actionAnimFPS = 0;
        this.actionEndTime = -1;
        this.currentTex = lib["Texture"].EMPTY;
        this.frame = -1;
        this.elapsed = 0;
        this.pluginName = TextureSpriteRenderer_TextureSpriteRenderer.Name;
        if (texture)
            this.currentTex = texture;
    }
    updateTex() {
        let tex = this.currentTex;
        if (this.clip) {
            tex = tex.clone();
            const frame = tex.frame.clone();
            frame.width -= Math.round(this.clip[0] * frame.width);
            frame.height -= Math.round(this.clip[1] * frame.height);
            tex.frame = frame;
        }
        if (this._texture !== tex) {
            this.texture = tex;
        }
    }
    clearTexture() {
        this.tint = 0xffffff;
        this.overlay && this.removeChild(this.overlay);
        this.overlay = undefined;
        this.currentTex = lib["Texture"].EMPTY;
        this.textureDef = undefined;
        this.offset = undefined;
        this.updateTex();
    }
    setTexture(textureDef, key = 0) {
        key = hashKey(key);
        this.clearTexture();
        if (typeof textureDef === 'string') {
            this.textureDef = undefined;
            this.currentTex = lib["Texture"].fromFrame(textureDef);
        }
        else {
            this.textureDef = textureDef;
            switch (textureDef.type) {
                case 'single':
                    this.currentTex = lib["Texture"].fromFrame(textureDef.tex);
                    if (textureDef.tint)
                        this.tint = parseInt(textureDef.tint, 16);
                    break;
                case 'random':
                    this.currentTex = lib["Texture"].fromFrame(textureDef.texs[key % textureDef.texs.length]);
                    if (textureDef.tint)
                        this.tint = parseInt(textureDef.tint, 16);
                    break;
                case 'composite':
                    {
                        this.setTexture(textureDef.base, key);
                        const overlay = new TextureSprite_TextureSprite();
                        overlay.anchor.copy(this.anchor);
                        overlay.setTexture(textureDef.overlay, key);
                        this.overlay = overlay;
                        this.addChild(overlay);
                    }
                    break;
                case 'animation':
                    this.frame = -1;
                    this.currentTex = lib["Texture"].EMPTY;
                    this.animBeginTime = this.elapsed;
                    if (textureDef.tint)
                        this.tint = parseInt(textureDef.tint, 16);
                    break;
                case 'liquid':
                    this.currentTex = lib["Texture"].fromFrame(textureDef.tex);
                    if (textureDef.tint)
                        this.tint = parseInt(textureDef.tint, 16);
            }
        }
        this.updateTex();
    }
    playActionAnim(name, duration) {
        if (!this.textureDef || this.textureDef.type !== 'animation' || !(name in this.textureDef.anims)) {
            console.log('animation: no such name: ' + name);
            return;
        }
        if (this.actionAnimName !== name) {
            const animation = this.textureDef.anims[name];
            this.frame = 0;
            this.actionAnimName = name;
            this.animBeginTime = this.elapsed;
            this.actionAnimFPS = duration === undefined ? animation.fps : animation.numFrames / (duration / 1000);
            this.actionEndTime = this.elapsed + 1000 / this.actionAnimFPS * animation.numFrames;
        }
    }
    stopActionAnim(name) {
        if (this.actionAnimName === name) {
            this.frame = 0;
            this.actionAnimName = '';
            this.actionEndTime = -1;
            this.actionAnimFPS = 0;
            this.animBeginTime = this.elapsed;
        }
    }
    update(elapsed) {
        this.elapsed = elapsed;
        if (this.textureDef) {
            if (this.actionEndTime > 0 && this.actionEndTime < elapsed) {
                this.actionAnimName = '';
                this.actionEndTime = -1;
                this.actionAnimFPS = 0;
                this.animBeginTime = elapsed;
            }
            if (this.textureDef.type === 'animation' && (this.animName || this.actionAnimName)) {
                const animation = this.textureDef.anims[this.actionAnimName || this.animName];
                if (animation) {
                    if (this.still && !this.actionAnimName) {
                        this.frame = -1;
                    }
                    else {
                        const frameDuration = 1000 / (this.actionAnimFPS || animation.fps);
                        this.frame = Math.floor((elapsed - this.animBeginTime) / frameDuration) % animation.numFrames;
                    }
                    this.currentTex = lib["Texture"].fromFrame(`${animation.frameId}-${this.frame + 1}`);
                }
                else {
                    console.log('animation: no such name: ' + (this.actionAnimName || this.animName));
                }
            }
            else if (this.textureDef.type === 'liquid') {
                let d = (elapsed % this.textureDef.time) / this.textureDef.time;
                d = Math.sin(d * Math.PI * 2);
                const offset = this.textureDef.offset * d;
                this.offset = [offset, offset];
            }
        }
        this.updateTex();
        if (this.overlay) {
            this.overlay.clip = this.clip;
            this.overlay.update(elapsed);
        }
    }
    _onAnchorUpdate() {
        lib["Sprite"].prototype._onAnchorUpdate.call(this);
        this.overlay && this.overlay.anchor.copy(this._anchor);
    }
}

// EXTERNAL MODULE: ./node_modules/pixi-multistyle-text/dist/pixi-multistyle-text.js
var pixi_multistyle_text = __webpack_require__(191);
var pixi_multistyle_text_default = /*#__PURE__*/__webpack_require__.n(pixi_multistyle_text);

// CONCATENATED MODULE: ./src/app/components/StyledText.ts



class StyledText_StyledText extends lib["Container"] {
    set text(value) { this._text.text = value; }
    get style() { return this._text.style; }
    get contentWidth() { return this._text.width; }
    get contentHeight() { return this._text.height; }
    constructor(text, styles, scale = 1) {
        super();
        const defaultStyle = Object.assign({ fontFamily: 'Unibody8Pro', fontSize: 8, fill: 'white', align: 'center' }, (styles.default || {}));
        this._text = new pixi_multistyle_text_default.a(text, Object.assign({}, styles, { default: defaultStyle }));
        this.addChild(this._text);
        this._text.scale = new lib["Point"](scale * UIScaleFactor, scale * UIScaleFactor);
    }
    layout(width, height) {
        switch (this._text.style.align) {
            case 'left':
                this._text.x = 0;
                break;
            case 'center':
                this._text.x = (width - this._text.width) / 2;
                break;
            case 'right':
                this._text.x = width - this._text.width;
                break;
        }
        this._text.y = (height - this._text.height) / 2;
    }
}

// CONCATENATED MODULE: ./src/app/components/TextToolTip.ts


class TextToolTip_TextToolTip extends Panel_Panel {
    constructor(app, text, styles, scale = 1) {
        super(app);
        this.textView = new StyledText_StyledText(text, styles, scale);
        this.addChild(this.textView);
    }
    set text(value) {
        this.textView.text = value;
    }
    layout() {
        const width = this.textView.contentWidth;
        const height = this.textView.contentHeight;
        this.textView.position.set(16, 16);
        this.textView.layout(width, height);
        super.layout(width + 32, height + 32);
    }
}

// EXTERNAL MODULE: ./node_modules/lodash-es/startCase.js + 11 modules
var startCase = __webpack_require__(59);

// EXTERNAL MODULE: ./node_modules/lodash-es/ceil.js
var ceil = __webpack_require__(121);

// CONCATENATED MODULE: ./src/app/components/ItemToolTip.ts


class ItemToolTip_ItemToolTip extends TextToolTip_TextToolTip {
    constructor(app, item) {
        super(app, '', {
            default: { align: 'left' },
            label: { fontWeight: 'bold' },
            details: { fill: '#d0d0d0' },
            desc: { fontStyle: 'italic' },
        });
        this.item = item;
        this.updateView();
    }
    setItem(item) {
        if (this.item !== item) {
            this.item = item;
            this.updateView();
        }
    }
    updateView() {
        const texts = [
            `<label>${this.item.name}</label>`,
            `<details>${Object(startCase["a" /* default */])(this.item.type)}</details>`
        ];
        if (this.item.description)
            texts.push(`<desc>${this.item.description}</desc>`);
        if (this.item.aspects && this.item.aspects.length > 0) {
            texts.push('');
            let sum = 0;
            for (const { amount } of this.item.aspects)
                sum += amount;
            for (const { element, amount } of this.item.aspects.slice().sort((a, b) => b.amount - a.amount)) {
                const percentage = amount / sum * 100;
                if (percentage < 10)
                    continue;
                texts.push(`<details>${percentage.toFixed(0)}% <label>${element}</label></details>`);
            }
        }
        if (this.item.effects && this.item.effects.length > 0) {
            texts.push('');
            if (this.item.material && this.item.weapon) {
                const affinity = this.item.material.affinity;
                if (affinity < 0.2)
                    texts.push('<details>rarely inflicts effects:</details>');
                else if (affinity < 0.5)
                    texts.push('<details>sometimes inflicts effects:</details>');
                else if (affinity < 0.7)
                    texts.push('<details>often inflicts effects:</details>');
                else
                    texts.push('<details>inflicts effects:</details>');
            }
            for (const effect of this.item.effects) {
                texts.push(`<details>\u2022 ${effect.description}</details>`);
            }
        }
        if (this.item.weapon) {
            texts.push('');
            texts.push(`<details>strength  <label>${Object(ceil["a" /* default */])(this.item.weapon.strength, 1)}</label> </details>`);
            if (this.item.weapon.cooldown)
                texts.push(`<details>cooldown  <label>${Object(ceil["a" /* default */])(this.item.weapon.cooldown / 1000, 1)}s</label></details>`);
            if (this.item.weapon.range)
                texts.push(`<details>range  <label>${Object(ceil["a" /* default */])(this.item.weapon.range, 1)} tiles</label></details>`);
        }
        this.text = texts.join('\n');
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/InventorySwap.ts
class InventorySwap {
    constructor(slotA, slotB) {
        this.slotA = slotA;
        this.slotB = slotB;
        this.type = 'inventory-swap';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/InventoryUpdated.ts
class InventoryUpdated {
    constructor(slot) {
        this.slot = slot;
        this.type = 'inventory-updated';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/PlayFX.ts
class PlayFX {
    constructor(effect, target) {
        this.effect = effect;
        this.target = target;
        this.type = 'play-fx';
    }
}
(function (PlayFX) {
    let Type;
    (function (Type) {
        Type["Shake"] = "shake";
    })(Type = PlayFX.Type || (PlayFX.Type = {}));
    class Shake extends PlayFX {
    }
    PlayFX.Shake = Shake;
})(PlayFX || (PlayFX = {}));

// CONCATENATED MODULE: ./src/app/game/messages/ShowParticles.ts
class ShowParticles {
    constructor(particleType, coords, numParticles, color, z = 0) {
        this.particleType = particleType;
        this.coords = coords;
        this.numParticles = numParticles;
        this.color = color;
        this.z = z;
        this.type = 'show-particles';
    }
}
(function (ShowParticles) {
    let Type;
    (function (Type) {
        Type["Splash"] = "splash";
        Type["Float"] = "float";
    })(Type = ShowParticles.Type || (ShowParticles.Type = {}));
    function splash(coords, numParticles, color, z = 0) {
        return new ShowParticles(Type.Splash, coords, numParticles, color, z);
    }
    ShowParticles.splash = splash;
    function float(coords, numParticles, color, z = 0) {
        return new ShowParticles(Type.Float, coords, numParticles, color, z);
    }
    ShowParticles.float = float;
})(ShowParticles || (ShowParticles = {}));

// CONCATENATED MODULE: ./src/app/game/messages/ApplyEffects.ts
class ApplyEffects {
    constructor(entityId, effects) {
        this.entityId = entityId;
        this.effects = effects;
        this.type = 'apply-effects';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/UpdateHP.ts
class UpdateHP {
    constructor(entityId, hpDiff) {
        this.entityId = entityId;
        this.hpDiff = hpDiff;
        this.type = 'update-hp';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/Attack.ts
class Attack {
    constructor(entityId, weapon, targetPosition, effects, duration) {
        this.entityId = entityId;
        this.weapon = weapon;
        this.targetPosition = targetPosition;
        this.effects = effects;
        this.duration = duration;
        this.type = 'attack';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/ObjectSpriteRequest.ts
class ObjectSpriteRequest {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 'object-sprite-request';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/EntityCollision.ts
class EntityCollision {
    constructor(entityIdA, entityIdB) {
        this.entityIdA = entityIdA;
        this.entityIdB = entityIdB;
        this.type = 'entity-collision';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/TileCollision.ts
class TileCollision {
    constructor(entityId, x, y) {
        this.entityId = entityId;
        this.x = x;
        this.y = y;
        this.type = 'tile-collision';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/Death.ts
class Death {
    constructor(entityId) {
        this.entityId = entityId;
        this.type = 'death';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/SpawnEnemy.ts
class SpawnEnemy {
    constructor(enemyType, position) {
        this.enemyType = enemyType;
        this.position = position;
        this.type = 'spawn-enemy';
    }
}

// CONCATENATED MODULE: ./src/app/game/messages/index.ts













// CONCATENATED MODULE: ./src/app/components/SlotView.ts




class SlotView_SlotView extends lib["Container"] {
    constructor(game, slot) {
        super();
        this.game = game;
        this.slot = slot;
        this.bg = new TextureSprite_TextureSprite();
        this.bgOverlay = new TextureSprite_TextureSprite();
        this.fgOverlay = new TextureSprite_TextureSprite();
        this.dragging = false;
        this.enabled = true;
        this.toolTipOpacity = 1;
        this.alwaysInteractive = false;
        this.endDrag = (target) => {
            this.dragging = false;
            this.addChild(this.obj);
            if (target instanceof SlotView_SlotView && target !== this && this.enabled && target.enabled) {
                this.game.dispatch(new InventorySwap(this.slot, target.slot));
            }
        };
        this.bg.setTexture('sprites/ui/inv-slot');
        this.bgOverlay.scale.set(2, 2);
        this.bgOverlay.position.set(4, 4);
        this.bgOverlay.alpha = 0.5;
        this.addChild(this.bg);
        this.addChild(this.bgOverlay);
        this.obj = new TextureSprite_TextureSprite();
        this.obj.scale.set(2, 2);
        this.obj.anchor.set(0.5, 0.5);
        this.obj.outline = true;
        this.addChild(this.obj);
        this.addChild(this.fgOverlay);
        let toolTip;
        this.interactive = true;
        this.game.app.toolTip.add(this, () => {
            if (this.slot.item && this.toolTipOpacity > 0) {
                if (!toolTip)
                    toolTip = new ItemToolTip_ItemToolTip(this.game.app, this.slot.item);
                else
                    toolTip.setItem(this.slot.item);
                toolTip.alpha = this.toolTipOpacity;
                return toolTip;
            }
            else
                return null;
        });
        this.on('pointerdown', () => {
            if (this.enabled && this.slot.item && !this.game.app.dragDrop.active) {
                this.dragging = true;
                this.game.app.dragDrop.begin(this.obj).then(this.endDrag);
                if (toolTip)
                    this.game.app.toolTip.hide(toolTip);
            }
        });
    }
    get empty() { return !this.slot.item; }
    updateSlot() {
        if (this.slot.item) {
            this.obj.setTexture(this.slot.item.texture);
            this.obj.visible = true;
            this.buttonMode = true || this.alwaysInteractive;
        }
        else {
            this.obj.clearTexture();
            this.obj.visible = false;
            this.buttonMode = false || this.alwaysInteractive;
        }
    }
    layout() {
        this.updateSlot();
        if (!this.dragging) {
            this.obj.position.set(SlotView_SlotView.Size / 2, SlotView_SlotView.Size / 2);
        }
    }
    update(dt) {
        this.obj.update(dt);
    }
}
SlotView_SlotView.Size = 56;

// CONCATENATED MODULE: ./src/app/components/index.ts







// CONCATENATED MODULE: ./src/app/game/traits/Trait.ts
var Trait;
(function (Trait) {
    Trait.types = new Map();
})(Trait || (Trait = {}));

// CONCATENATED MODULE: ./src/app/game/Camera.ts



class Camera_Camera extends lib["Container"] {
    constructor() {
        super();
        this.offset = gl_matrix["b" /* vec2 */].create();
        this.viewWidth = 0;
        this.viewHeight = 0;
        this.bg = Object.assign(new lib["Sprite"](lib["Texture"].WHITE), {
            layer: Camera_Camera.Layer.Background,
            sortOffset: gl_matrix["b" /* vec2 */].fromValues(0, 0)
        });
        this.nextId = 0;
        this.bg.tint = 0x202020;
        this.add(this.bg);
        this.interactive = true;
    }
    toMapCoords(pt, coords) {
        gl_matrix["b" /* vec2 */].scaleAndAdd(coords, [
            (pt.x - Math.floor(this.viewWidth / 2)) / DisplayTileSize,
            (pt.y - Math.floor(this.viewHeight / 2)) / DisplayTileSize
        ], this.offset, 1 / DisplayTileSize);
        return coords;
    }
    toCameraPoint(coords, pt, z = 0) {
        pt.x = Math.floor(coords[0] * DisplayTileSize - this.offset[0]) + Math.floor(this.viewWidth / 2);
        pt.y = Math.floor((coords[1] - z) * DisplayTileSize - this.offset[1]) + Math.floor(this.viewHeight / 2);
        return pt;
    }
    add(sprite) {
        sprite.id = this.nextId++;
        this.addChild(sprite);
    }
    layout(width, height) {
        this.bg.width = width;
        this.bg.height = height;
        if (this.viewWidth !== width || this.viewHeight !== height) {
            this.viewWidth = width;
            this.viewHeight = height;
            const mask = new lib["Graphics"]();
            mask.beginFill(0xffffff);
            mask.drawRect(this.x, this.y, width, height);
            mask.endFill();
            this.mask = mask;
        }
        this.sortLayers();
    }
    sortLayers() {
        const children = this.children;
        children.sort((a, b) => {
            const ao = a.sortOffset, bo = b.sortOffset;
            const { x: ax, y: ay } = a.transform.position;
            const { x: bx, y: by } = b.transform.position;
            let d = 0;
            if (d === 0)
                d = a.layer - b.layer;
            if (d === 0)
                d = (ay + ao[1] * DisplayTileSize) - (by + bo[1] * DisplayTileSize);
            if (d === 0)
                d = (ax + ao[0] * DisplayTileSize) - (bx + bo[0] * DisplayTileSize);
            if (d === 0)
                d = a.id - b.id;
            return d;
        });
    }
}
(function (Camera) {
    let Layer;
    (function (Layer) {
        Layer[Layer["Background"] = -1] = "Background";
        Layer[Layer["Terrain"] = 0] = "Terrain";
        Layer[Layer["Objects"] = 1] = "Objects";
        Layer[Layer["Projectiles"] = 2] = "Projectiles";
    })(Layer = Camera.Layer || (Camera.Layer = {}));
})(Camera_Camera || (Camera_Camera = {}));

// EXTERNAL MODULE: ./node_modules/lodash-es/defaults.js
var defaults = __webpack_require__(27);

// CONCATENATED MODULE: ./src/app/game/traits/Spatial.ts





var Spatial_Spatial;
(function (Spatial) {
    Spatial.Type = 'spatial';
    function make() {
        return {
            type: Spatial.Type,
            position: gl_matrix["b" /* vec2 */].fromValues(0, 0),
            velocity: gl_matrix["b" /* vec2 */].fromValues(0, 0),
            scale: gl_matrix["b" /* vec2 */].fromValues(1, 1),
            offset: gl_matrix["b" /* vec2 */].fromValues(0, 0),
            horizontalAnim: false,
            sprite: Object.assign(new TextureSprite_TextureSprite(), {
                layer: Camera_Camera.Layer.Objects,
                sortOffset: gl_matrix["b" /* vec2 */].fromValues(0, 0),
            })
        };
    }
    Spatial.make = make;
    function serialize(trait) {
        return {
            pos: [trait.position[0], trait.position[1]],
            vel: [trait.velocity[0], trait.velocity[1]],
        };
    }
    Spatial.serialize = serialize;
    function deserialize(data, trait) {
        return Object(defaults["a" /* default */])({
            position: data.pos && gl_matrix["b" /* vec2 */].fromValues(data.pos[0], data.pos[1]),
            velocity: data.vel && gl_matrix["b" /* vec2 */].fromValues(data.vel[0], data.vel[1])
        }, trait);
    }
    Spatial.deserialize = deserialize;
})(Spatial_Spatial || (Spatial_Spatial = {}));
Trait.types.set(Spatial_Spatial.Type, Spatial_Spatial);

// EXTERNAL MODULE: ./node_modules/lodash-es/times.js + 1 modules
var times = __webpack_require__(56);

// CONCATENATED MODULE: ./src/app/game/traits/Inventory.ts


var Inventory_Inventory;
(function (Inventory) {
    Inventory.Type = 'inventory';
    function make(size = 1) {
        return {
            type: Inventory.Type,
            slots: Object(times["a" /* default */])(size, () => ({ item: null, accepts: null }))
        };
    }
    Inventory.make = make;
    function serialize(trait) {
        return {
            slots: trait.slots
        };
    }
    Inventory.serialize = serialize;
    function deserialize(data, trait) {
        return Object(defaults["a" /* default */])({
            slots: data.slots.slice()
        }, trait);
    }
    Inventory.deserialize = deserialize;
})(Inventory_Inventory || (Inventory_Inventory = {}));
Trait.types.set(Inventory_Inventory.Type, Inventory_Inventory);

// CONCATENATED MODULE: ./src/app/game/traits/Float.ts



var Float_Float;
(function (Float) {
    Float.Type = 'float';
    function make() {
        return {
            type: Float.Type,
            z: gl_matrix["b" /* vec2 */].fromValues(0, 0),
            gravity: true
        };
    }
    Float.make = make;
    function serialize(trait) {
        return {
            z: [trait.z[0], trait.z[1]],
            gravity: trait.gravity,
        };
    }
    Float.serialize = serialize;
    function deserialize(data, trait) {
        return Object(defaults["a" /* default */])({
            z: data.z && gl_matrix["b" /* vec2 */].fromValues(data.z[0], data.z[1]),
            gravity: data.gravity === undefined ? true : data.gravity
        }, trait);
    }
    Float.deserialize = deserialize;
})(Float_Float || (Float_Float = {}));
Trait.types.set(Float_Float.Type, Float_Float);

// EXTERNAL MODULE: ./src/data/effects.ts
var data_effects = __webpack_require__(3);

// CONCATENATED MODULE: ./src/app/game/traits/Stats.ts



var Stats_Stats;
(function (Stats) {
    Stats.Type = 'stats';
    function make() {
        return {
            type: Stats.Type,
            base: { hp: 100, maxHp: 100, str: 10, def: 0, spd: 10, vit: 10 },
            boost: { hp: 0, maxHp: 0, str: 0, def: 0, spd: 0, vit: 0 },
            bonus: { hp: 0, maxHp: 0, str: 0, def: 0, spd: 0, vit: 0 },
            effects: []
        };
    }
    Stats.make = make;
    function serialize(trait) {
        return {
            base: trait.base,
            effects: trait.effects,
        };
    }
    Stats.serialize = serialize;
    function deserialize(data, trait) {
        return Object(defaults["a" /* default */])({
            base: data.base || { hp: 100, maxHp: 100, str: 10, def: 0, spd: 10, vit: 10 },
            effects: data.effects || [],
        }, trait);
    }
    Stats.deserialize = deserialize;
    function compute(stats) {
        return {
            get hp() { return stats.base.hp + stats.boost.hp + stats.bonus.hp; },
            get maxHp() { return stats.base.maxHp + stats.boost.maxHp + stats.bonus.maxHp; },
            get str() { return stats.base.str + stats.boost.str + stats.bonus.str; },
            get def() { return stats.base.def + stats.boost.def + stats.bonus.def; },
            get spd() { return stats.base.spd + stats.boost.spd + stats.bonus.spd; },
            get vit() { return stats.base.vit + stats.boost.vit + stats.bonus.vit; },
        };
    }
    Stats.compute = compute;
    function hasEffect(stats, ...effects) {
        return stats.effects.some(({ type }) => effects.indexOf(type) >= 0);
    }
    Stats.hasEffect = hasEffect;
    function canMove(stats) {
        return !hasEffect(stats, data_effects["a" /* EffectDef */].Type.Stunned, data_effects["a" /* EffectDef */].Type.Knockback);
    }
    Stats.canMove = canMove;
})(Stats_Stats || (Stats_Stats = {}));
Trait.types.set(Stats_Stats.Type, Stats_Stats);

// CONCATENATED MODULE: ./src/app/game/traits/PlayerData.ts


var PlayerData_PlayerData;
(function (PlayerData) {
    PlayerData.Type = 'player-data';
    function make() {
        return {
            type: PlayerData.Type,
            hotbarSelection: 0,
            consumeCooldown: 0,
            attackCooldown: 0,
            lastAttackId: 0
        };
    }
    PlayerData.make = make;
    function serialize(trait) {
        return {
            hotbarSelection: trait.hotbarSelection,
            consumeCooldown: trait.consumeCooldown,
            attackCooldown: trait.attackCooldown,
            lastAttackId: trait.lastAttackId,
        };
    }
    PlayerData.serialize = serialize;
    function deserialize(data, trait) {
        return Object(defaults["a" /* default */])({
            hotbarSelection: data.hotbarSelection || 0,
            consumeCooldown: data.consumeCooldown || 0,
            attackCooldown: data.attackCooldown || 0,
            lastAttackId: data.lastAttackId || 0,
        }, trait);
    }
    PlayerData.deserialize = deserialize;
})(PlayerData_PlayerData || (PlayerData_PlayerData = {}));
Trait.types.set(PlayerData_PlayerData.Type, PlayerData_PlayerData);

// CONCATENATED MODULE: ./src/app/game/traits/ProjectileData.ts



var ProjectileData_ProjectileData;
(function (ProjectileData) {
    ProjectileData.Type = 'projectile-data';
    function make(args) {
        return {
            type: ProjectileData.Type,
            sourceEntityId: args ? args.sourceEntityId : 0,
            weapon: args ? args.weapon : undefined,
            damage: args ? args.damage : 0,
            effects: args ? args.effects : [],
            start: args ? gl_matrix["b" /* vec2 */].clone(args.start) : gl_matrix["b" /* vec2 */].fromValues(0, 0),
            end: args ? gl_matrix["b" /* vec2 */].clone(args.end) : gl_matrix["b" /* vec2 */].fromValues(0, 0),
            lifetime: args ? args.lifetime : 0,
            texture: args ? args.texture : '',
            hit: new Set()
        };
    }
    ProjectileData.make = make;
    function serialize(trait) {
        return {
            sourceEntityId: trait.sourceEntityId,
            weapon: trait.weapon,
            damage: trait.damage,
            effects: trait.effects,
            lifetime: trait.lifetime,
            start: [trait.start[0], trait.start[1]],
            end: [trait.end[0], trait.end[1]],
            texture: trait.texture,
            hit: Array.from(trait.hit)
        };
    }
    ProjectileData.serialize = serialize;
    function deserialize(data, trait) {
        return Object(defaults["a" /* default */])({
            sourceEntityId: data.sourceEntityId,
            weapon: data.weapon,
            damage: data.damage,
            effects: data.effects,
            lifetime: data.lifetime,
            start: data.start && gl_matrix["b" /* vec2 */].fromValues(data.start[0], data.start[1]),
            end: data.end && gl_matrix["b" /* vec2 */].fromValues(data.end[0], data.end[1]),
            texture: data.texture,
            hit: data.hit && new Set(data.hit)
        }, trait);
    }
    ProjectileData.deserialize = deserialize;
})(ProjectileData_ProjectileData || (ProjectileData_ProjectileData = {}));
Trait.types.set(ProjectileData_ProjectileData.Type, ProjectileData_ProjectileData);

// CONCATENATED MODULE: ./src/app/game/traits/EnemyData.ts


var EnemyData_EnemyData;
(function (EnemyData) {
    EnemyData.Type = 'enemy-data';
    function make(def) {
        return {
            type: EnemyData.Type,
            def
        };
    }
    EnemyData.make = make;
    function serialize(trait) {
        return {
            def: trait.def,
        };
    }
    EnemyData.serialize = serialize;
    function deserialize(data, trait) {
        return Object(defaults["a" /* default */])({
            def: data.def,
        }, trait);
    }
    EnemyData.deserialize = deserialize;
})(EnemyData_EnemyData || (EnemyData_EnemyData = {}));
Trait.types.set(EnemyData_EnemyData.Type, EnemyData_EnemyData);

// CONCATENATED MODULE: ./src/app/game/traits/Behavior.ts


var Behavior_Behavior;
(function (Behavior) {
    Behavior.Type = 'behavior';
    function make(behaviors) {
        return {
            type: Behavior.Type,
            behaviors
        };
    }
    Behavior.make = make;
    function serialize(trait) {
        return {
            behaviors: trait.behaviors,
        };
    }
    Behavior.serialize = serialize;
    function deserialize(data, trait) {
        return Object(defaults["a" /* default */])({
            behaviors: data.behaviors,
        }, trait);
    }
    Behavior.deserialize = deserialize;
})(Behavior_Behavior || (Behavior_Behavior = {}));
Trait.types.set(Behavior_Behavior.Type, Behavior_Behavior);

// CONCATENATED MODULE: ./src/app/game/traits/Collidable.ts



var Collidable_Collidable;
(function (Collidable) {
    Collidable.Type = 'collidable';
    function make() {
        return {
            type: Collidable.Type,
            mass: 1,
            size: gl_matrix["b" /* vec2 */].fromValues(0.5, 0.5)
        };
    }
    Collidable.make = make;
    function serialize(trait) {
        return {
            size: [trait.size[0], trait.size[1]],
            mass: trait.mass,
        };
    }
    Collidable.serialize = serialize;
    function deserialize(data, trait) {
        return Object(defaults["a" /* default */])({
            size: data.size && gl_matrix["b" /* vec2 */].fromValues(data.size[0], data.size[1]),
            mass: trait.mass,
        }, trait);
    }
    Collidable.deserialize = deserialize;
})(Collidable_Collidable || (Collidable_Collidable = {}));
Trait.types.set(Collidable_Collidable.Type, Collidable_Collidable);

// CONCATENATED MODULE: ./src/app/game/traits/index.ts











// CONCATENATED MODULE: ./src/app/game/behavior/BehaviorTree.ts


var BehaviorTree_BehaviorTree;
(function (BehaviorTree) {
    BehaviorTree.actions = new Map();
    BehaviorTree.conditions = new Map();
    function registerAction(action) {
        BehaviorTree.actions.set(action.Type, action);
    }
    BehaviorTree.registerAction = registerAction;
    function registerCondition(condition) {
        BehaviorTree.conditions.set(condition.Type, condition);
    }
    BehaviorTree.registerCondition = registerCondition;
    function dump(tree) {
        return tree.states.map(state => {
            const texts = [];
            texts.push(`When ${BehaviorTree.conditions.get(state.condition.type).dump(state.condition)}:`);
            for (const action of state.actions) {
                texts.push('  ' + BehaviorTree.actions.get(action.type).dump(action));
            }
            return texts.join('\n');
        }).join('\n\n');
    }
    BehaviorTree.dump = dump;
    function run(self, dt, tree) {
        const context = {
            game: self.game,
            self,
            state: undefined
        };
        // state transitions
        let active = tree.activeStateIndex;
        for (let i = 0; i < tree.states.length; i++) {
            const condition = BehaviorTree.conditions.get(tree.states[i].condition.type);
            context.state = tree.states[i].condition;
            const fulfilled = condition.isFulfilled.call(context);
            if (fulfilled)
                active = i;
        }
        if (active < 0)
            active = 0;
        // activate/deactivate state
        if (active !== tree.activeStateIndex) {
            if (tree.activeStateIndex >= 0)
                for (const actionState of tree.states[tree.activeStateIndex].actions) {
                    const action = BehaviorTree.actions.get(actionState.type);
                    context.state = actionState;
                    action.end && action.end.call(context);
                }
            for (const actionState of tree.states[active].actions) {
                const action = BehaviorTree.actions.get(actionState.type);
                context.state = actionState;
                action.begin && action.begin.call(context);
            }
            tree.activeStateIndex = active;
        }
        // perform state actions
        let moved = false;
        for (const actionState of tree.states[active].actions) {
            const action = BehaviorTree.actions.get(actionState.type);
            context.state = actionState;
            if (action.Kind === ActionKind.Movement && (moved || !Stats_Stats.canMove(self.traits.get(Stats_Stats))))
                continue;
            const ok = action.tick.call(context, dt);
            if (ok && action.Kind === ActionKind.Movement)
                moved = true;
        }
    }
    BehaviorTree.run = run;
})(BehaviorTree_BehaviorTree || (BehaviorTree_BehaviorTree = {}));

// CONCATENATED MODULE: ./src/app/game/behavior/Action.ts
var ActionKind;
(function (ActionKind) {
    ActionKind["Movement"] = "movement";
    ActionKind["Attack"] = "attack";
    ActionKind["Effect"] = "effect";
})(ActionKind || (ActionKind = {}));

// CONCATENATED MODULE: ./src/app/game/behavior/conditions/HP.ts


var HP_HP;
(function (HP) {
    HP.Type = 'hp';
    function mutate(state) {
        return Object.assign({}, state, { threshold: state.threshold + (Math.random() * 0.2 - 0.1) });
    }
    HP.mutate = mutate;
    function dump(state) {
        return `HP of target is ${state.isGreater ? 'greater' : 'less'} than ${(state.threshold * 100).toFixed(1)}%`;
    }
    HP.dump = dump;
    function isFulfilled() {
        const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.self;
        if (!target)
            return false;
        const { hp, maxHp } = Stats_Stats.compute(target.traits.get(Stats_Stats));
        if (this.state.isGreater)
            return (hp / maxHp) > this.state.threshold;
        else
            return (hp / maxHp) <= this.state.threshold;
    }
    HP.isFulfilled = isFulfilled;
    function greaterThan(threshold, targetId = 0) {
        return {
            type: HP.Type,
            threshold: threshold,
            isGreater: true,
            targetId
        };
    }
    HP.greaterThan = greaterThan;
    function lessThan(threshold, targetId = 0) {
        return {
            type: HP.Type,
            threshold: threshold,
            isGreater: false,
            targetId
        };
    }
    HP.lessThan = lessThan;
})(HP_HP || (HP_HP = {}));
BehaviorTree_BehaviorTree.registerCondition(HP_HP);

// EXTERNAL MODULE: ./node_modules/lodash-es/cloneDeep.js + 23 modules
var cloneDeep = __webpack_require__(11);

// CONCATENATED MODULE: ./src/app/game/behavior/conditions/AtSpawn.ts


var AtSpawn_AtSpawn;
(function (AtSpawn) {
    AtSpawn.Type = 'at-spawn';
    function mutate(state) {
        return Object(cloneDeep["a" /* default */])(state);
    }
    AtSpawn.mutate = mutate;
    function dump(state) {
        return 'at spawn';
    }
    AtSpawn.dump = dump;
    function isFulfilled() {
        return this.self.age === 0;
    }
    AtSpawn.isFulfilled = isFulfilled;
    function make() {
        return {
            type: AtSpawn.Type
        };
    }
    AtSpawn.make = make;
})(AtSpawn_AtSpawn || (AtSpawn_AtSpawn = {}));
BehaviorTree_BehaviorTree.registerCondition(AtSpawn_AtSpawn);

// CONCATENATED MODULE: ./src/app/game/behavior/conditions/Distance.ts



var Distance_Distance;
(function (Distance) {
    Distance.Type = 'distance';
    function mutate(state) {
        return Object.assign({}, state, { threshold: state.threshold + (Math.random() * 4 - 2) });
    }
    Distance.mutate = mutate;
    function dump(state) {
        return `distance with target is ${state.isGreater ? 'greater' : 'less'} than ${state.threshold.toFixed(1)}`;
    }
    Distance.dump = dump;
    const dist = gl_matrix["b" /* vec2 */].create();
    function isFulfilled() {
        const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
        if (!target)
            return false;
        const { position: a } = target.traits.get(Spatial_Spatial);
        const { position: b } = this.self.traits.get(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].sub(dist, a, b);
        const d = gl_matrix["b" /* vec2 */].length(dist);
        if (this.state.isGreater)
            return d > this.state.threshold;
        else
            return d <= this.state.threshold;
    }
    Distance.isFulfilled = isFulfilled;
    function greaterThan(threshold, targetId = 0) {
        return {
            type: Distance.Type,
            threshold: threshold,
            isGreater: true,
            targetId
        };
    }
    Distance.greaterThan = greaterThan;
    function lessThan(threshold, targetId = 0) {
        return {
            type: Distance.Type,
            threshold: threshold,
            isGreater: false,
            targetId
        };
    }
    Distance.lessThan = lessThan;
})(Distance_Distance || (Distance_Distance = {}));
BehaviorTree_BehaviorTree.registerCondition(Distance_Distance);

// CONCATENATED MODULE: ./src/app/game/behavior/conditions/index.ts




// CONCATENATED MODULE: ./src/app/game/behavior/index.ts





// EXTERNAL MODULE: ./src/common/random.ts
var random = __webpack_require__(10);

// CONCATENATED MODULE: ./src/common/logic/stats.ts

function tilePerSecond(spd) {
    return 1 + Math.max(0, spd * 4 / 10);
}
function healPerTick(vit) {
    return Math.max(0, vit / 500);
}
function computeDamage(power, str) {
    const strMul = (1 + (str - 10) / 50) * Object(random["a" /* gaussianRandom */])(1, 0.25, 0.5, 1.5);
    return power * strMul;
}
function knockbackSpeed(knockback) {
    return 5 + knockback * 1.5;
}

// CONCATENATED MODULE: ./src/app/game/behavior/utils.ts



function computeVelocity(velocity, direction, entity) {
    const { spd } = Stats_Stats.compute(entity.traits.get(Stats_Stats));
    const speed = tilePerSecond(spd);
    gl_matrix["b" /* vec2 */].scale(velocity, direction, speed);
}

// CONCATENATED MODULE: ./src/app/game/behavior/actions/Chase.ts





const ChaseInterval = 250;
const ChaseRadius = 8;
var Chase_Chase;
(function (Chase) {
    Chase.Type = 'chase';
    Chase.Kind = ActionKind.Movement;
    function mutate(state) {
        return Object(cloneDeep["a" /* default */])(state);
    }
    Chase.mutate = mutate;
    function dump(state) {
        return 'Chase target';
    }
    Chase.dump = dump;
    const direction = gl_matrix["b" /* vec2 */].create();
    function tick(dt) {
        const { position, velocity } = this.self.traits.get(Spatial_Spatial);
        const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
        if (!target)
            return false;
        const { position: targetPosition } = target.traits.get(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].subtract(direction, targetPosition, position);
        const distance = gl_matrix["b" /* vec2 */].length(direction);
        if (distance > ChaseRadius)
            return false;
        if (this.state.interval > 0) {
            this.state.interval -= dt;
            computeVelocity(velocity, this.state.direction, this.self);
            return true;
        }
        this.state.interval = ChaseInterval;
        gl_matrix["b" /* vec2 */].normalize(direction, direction);
        computeVelocity(velocity, this.state.direction, this.self);
        this.state.direction[0] = direction[0];
        this.state.direction[1] = direction[1];
        return true;
    }
    Chase.tick = tick;
    function make(targetId = 0) {
        return {
            type: Chase.Type,
            targetId,
            interval: 0,
            direction: [0, 0]
        };
    }
    Chase.make = make;
})(Chase_Chase || (Chase_Chase = {}));
BehaviorTree_BehaviorTree.registerAction(Chase_Chase);

// CONCATENATED MODULE: ./src/app/game/behavior/actions/Wander.ts





const WanderInterval = 200;
var Wander_Wander;
(function (Wander) {
    Wander.Type = 'wander';
    Wander.Kind = ActionKind.Movement;
    function mutate(state) {
        return Object(cloneDeep["a" /* default */])(state);
    }
    Wander.mutate = mutate;
    function dump(state) {
        return 'Wander around';
    }
    Wander.dump = dump;
    function tick(dt) {
        const { velocity } = this.self.traits.get(Spatial_Spatial);
        if (this.state.interval > 0) {
            this.state.interval -= dt;
            gl_matrix["b" /* vec2 */].copy(velocity, this.state.velocity);
            return true;
        }
        this.state.interval = WanderInterval;
        const { spd } = Stats_Stats.compute(this.self.traits.get(Stats_Stats));
        gl_matrix["b" /* vec2 */].random(velocity);
        gl_matrix["b" /* vec2 */].scale(velocity, velocity, tilePerSecond(spd * 0.5));
        this.state.velocity[0] = velocity[0];
        this.state.velocity[1] = velocity[1];
        return true;
    }
    Wander.tick = tick;
    function make() {
        return {
            type: Wander.Type,
            interval: 0,
            velocity: [0, 0]
        };
    }
    Wander.make = make;
})(Wander_Wander || (Wander_Wander = {}));
BehaviorTree_BehaviorTree.registerAction(Wander_Wander);

// CONCATENATED MODULE: ./src/app/game/behavior/actions/Charge.ts






const SpeedMultiplier = 5;
var Charge_Charge;
(function (Charge) {
    Charge.Type = 'charge';
    Charge.Kind = ActionKind.Movement;
    function mutate(state) {
        return Object(cloneDeep["a" /* default */])(state);
    }
    Charge.mutate = mutate;
    function dump(state) {
        return 'Charge towards target';
    }
    Charge.dump = dump;
    const direction = gl_matrix["b" /* vec2 */].create();
    function tick(dt) {
        const { position, velocity } = this.self.traits.get(Spatial_Spatial);
        const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
        if (!target)
            return false;
        if (this.state.interval > 0) {
            this.state.interval -= dt;
            computeVelocity(velocity, this.state.direction, this.self);
            return true;
        }
        else if (this.state.cooldown > 0) {
            this.state.cooldown -= dt;
            return false;
        }
        const { position: targetPosition } = target.traits.get(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].subtract(direction, targetPosition, position);
        const { spd } = Stats_Stats.compute(this.self.traits.get(Stats_Stats));
        this.state.interval = Math.min(3000, (gl_matrix["b" /* vec2 */].length(direction) + 5) / (tilePerSecond(spd) * SpeedMultiplier) * 1000);
        this.state.cooldown = Math.max(2500, this.state.interval);
        gl_matrix["b" /* vec2 */].normalize(direction, direction);
        gl_matrix["b" /* vec2 */].scale(direction, direction, SpeedMultiplier);
        computeVelocity(velocity, direction, this.self);
        this.state.direction[0] = direction[0];
        this.state.direction[1] = direction[1];
        return true;
    }
    Charge.tick = tick;
    function make(targetId = 0) {
        return {
            type: Charge.Type,
            targetId,
            interval: 0,
            cooldown: 0,
            direction: [0, 0]
        };
    }
    Charge.make = make;
})(Charge_Charge || (Charge_Charge = {}));
BehaviorTree_BehaviorTree.registerAction(Charge_Charge);

// CONCATENATED MODULE: ./src/app/game/behavior/actions/Escape.ts





const EscapeRadius = 5;
var Escape_Escape;
(function (Escape) {
    Escape.Type = 'escape';
    Escape.Kind = ActionKind.Movement;
    function mutate(state) {
        return Object(cloneDeep["a" /* default */])(state);
    }
    Escape.mutate = mutate;
    function dump(state) {
        return 'Escape from target';
    }
    Escape.dump = dump;
    function tick(dt) {
        const { position, velocity } = this.self.traits.get(Spatial_Spatial);
        const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
        if (!target)
            return false;
        const { position: targetPosition } = target.traits.get(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].subtract(velocity, targetPosition, position);
        const distance = gl_matrix["b" /* vec2 */].length(velocity);
        if (distance > EscapeRadius)
            return false;
        gl_matrix["b" /* vec2 */].normalize(velocity, velocity);
        gl_matrix["b" /* vec2 */].scale(velocity, velocity, -0.5);
        computeVelocity(velocity, velocity, this.self);
        return true;
    }
    Escape.tick = tick;
    function make(targetId = 0) {
        return {
            type: Escape.Type,
            targetId
        };
    }
    Escape.make = make;
})(Escape_Escape || (Escape_Escape = {}));
BehaviorTree_BehaviorTree.registerAction(Escape_Escape);

// EXTERNAL MODULE: ./src/common/data/index.ts + 6 modules
var common_data = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/lodash-es/clamp.js + 1 modules
var clamp = __webpack_require__(7);

// CONCATENATED MODULE: ./src/app/game/behavior/actions/Shoot.ts






const ShootRadius = 12;
var Shoot_Shoot;
(function (Shoot) {
    Shoot.Type = 'shoot';
    Shoot.Kind = ActionKind.Attack;
    function mutate(state) {
        const isRing = Math.abs((state.angle * state.numShoots) - Math.PI * 2) < 0.0001;
        const mutateType = Math.floor(Math.random() * 3);
        const newState = Object(cloneDeep["a" /* default */])(state);
        switch (mutateType) {
            case 0: // cooldown
                Object.assign(newState, {
                    duration: Object(clamp["a" /* default */])(newState.duration * (1 + (Math.random() * 2 - 1) * 0.25), 500, 5000),
                    delay: Object(clamp["a" /* default */])(newState.delay * (1 + (Math.random() * 2 - 1) * 0.25), 0, 5000),
                });
                break;
            case 1: // shoots
                const numShoots = Object(clamp["a" /* default */])(newState.numShoots + Math.floor(Math.random() * 6 - 3), 0, 10);
                Object.assign(newState, {
                    numShoots,
                    angle: isRing ? Math.PI * 2 / numShoots : newState.angle
                });
                break;
            case 2: // angle
                Object.assign(newState, {
                    angle: Object(clamp["a" /* default */])(newState.angle + (Math.random() - 0.5), 0, Math.PI * 2 / newState.numShoots)
                });
                break;
            case 3: // range
                Object.assign(newState.weapon, {
                    range: Object(clamp["a" /* default */])(newState.weapon.range + (Math.random() * 4 - 2), 2, 15)
                });
                break;
            case 4: // strength
                Object.assign(newState.weapon, {
                    strength: Object(clamp["a" /* default */])(newState.weapon.strength + (Math.random() * 6 - 3), 1, 50)
                });
                break;
        }
        Object.assign(newState.weapon, { type: Math.random() < 0.5 ? common_data["c" /* Weapon */].Type.Bolt : common_data["c" /* Weapon */].Type.Orb });
        newState.cooldown = newState.delay;
        return newState;
    }
    Shoot.mutate = mutate;
    function dump(state) {
        const texts = [];
        texts.push(`Shoot ${state.numShoots} projectiles of damage ${state.weapon.strength.toFixed(1)}`);
        if (state.numShoots > 1) {
            texts.push(`with angle ${(state.angle * 180 / Math.PI).toFixed(1)}`);
        }
        texts.push(`, reaches ${state.weapon.range.toFixed(1)} in ${(state.duration / 1000).toFixed(2)} seconds`);
        return texts.join(' ');
    }
    Shoot.dump = dump;
    const direction = gl_matrix["b" /* vec2 */].create();
    const target = gl_matrix["b" /* vec2 */].create();
    function tick(dt) {
        if (this.state.cooldown > 0) {
            this.state.cooldown -= dt;
            return false;
        }
        this.state.cooldown = this.state.weapon.cooldown;
        const { position } = this.self.traits.get(Spatial_Spatial);
        const { position: targetPosition } = this.game.player.traits.get(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].subtract(direction, targetPosition, position);
        const distance = gl_matrix["b" /* vec2 */].length(direction);
        if (distance > ShootRadius)
            return false;
        gl_matrix["b" /* vec2 */].normalize(direction, direction);
        const beginAngle = -((this.state.numShoots - 1) * this.state.angle) / 2 +
            ((this.state.numShoots + 1) % 2) * this.state.angle / 2;
        for (let i = 0; i < this.state.numShoots; i++) {
            const angle = beginAngle + this.state.angle * i;
            target[0] = direction[0] * Math.cos(angle) - direction[1] * Math.sin(angle);
            target[1] = direction[0] * Math.sin(angle) + direction[1] * Math.cos(angle);
            gl_matrix["b" /* vec2 */].add(target, target, position);
            this.game.dispatch(new Attack(this.self.id, this.state.weapon, target, this.state.effects, this.state.duration));
        }
        return true;
    }
    Shoot.tick = tick;
    function make(weapon, effects, duration, numShoots = 1, angle = 15, offset = 0, delay = 0) {
        return {
            type: Shoot.Type,
            weapon,
            effects,
            duration,
            numShoots,
            angle: angle * Math.PI / 180,
            offset,
            delay,
            cooldown: delay
        };
    }
    Shoot.make = make;
})(Shoot_Shoot || (Shoot_Shoot = {}));
BehaviorTree_BehaviorTree.registerAction(Shoot_Shoot);

// CONCATENATED MODULE: ./src/app/game/behavior/actions/Buff.ts



var Buff_Buff;
(function (Buff) {
    Buff.Type = 'buff';
    Buff.Kind = ActionKind.Effect;
    function mutate(state) {
        return Object(cloneDeep["a" /* default */])(state);
    }
    Buff.mutate = mutate;
    function dump(state) {
        return 'Buff target with effects';
    }
    Buff.dump = dump;
    function tick(dt) {
        if (this.state.cooldown > 0) {
            this.state.cooldown -= dt;
            return false;
        }
        this.state.cooldown = this.state.cooldown;
        this.game.dispatch(new ApplyEffects(this.state.targetId || this.self.id, this.state.effects.slice()));
        return true;
    }
    Buff.tick = tick;
    function make(effects, cooldown, targetId = 0) {
        return {
            type: Buff.Type,
            targetId,
            interval: cooldown,
            effects,
            cooldown: 0
        };
    }
    Buff.make = make;
})(Buff_Buff || (Buff_Buff = {}));
BehaviorTree_BehaviorTree.registerAction(Buff_Buff);

// CONCATENATED MODULE: ./src/app/game/behavior/actions/Spawn.ts





var Spawn_Spawn;
(function (Spawn) {
    Spawn.Type = 'spawn';
    Spawn.Kind = ActionKind.Effect;
    function mutate(state) {
        return Object(cloneDeep["a" /* default */])(state);
    }
    Spawn.mutate = mutate;
    function dump(state) {
        return `Spawn ${state.enemyType}`;
    }
    Spawn.dump = dump;
    const position = gl_matrix["b" /* vec2 */].create();
    function tick(dt) {
        if (this.state.cooldown > 0) {
            this.state.cooldown -= dt;
            return false;
        }
        this.state.cooldown = this.state.interval;
        gl_matrix["b" /* vec2 */].random(position);
        gl_matrix["b" /* vec2 */].add(position, this.self.traits.get(Spatial_Spatial).position, position);
        this.game.dispatch(new SpawnEnemy(this.state.enemyType, position));
        return true;
    }
    Spawn.tick = tick;
    function make(enemyType, cooldown) {
        return {
            type: Spawn.Type,
            enemyType: enemyType.toLowerCase(),
            interval: cooldown,
            cooldown: 0
        };
    }
    Spawn.make = make;
})(Spawn_Spawn || (Spawn_Spawn = {}));
BehaviorTree_BehaviorTree.registerAction(Spawn_Spawn);

// CONCATENATED MODULE: ./src/app/game/behavior/actions/Suicide.ts


var Suicide_Suicide;
(function (Suicide) {
    Suicide.Type = 'suicide';
    Suicide.Kind = ActionKind.Effect;
    function mutate(state) {
        return Object(cloneDeep["a" /* default */])(state);
    }
    Suicide.mutate = mutate;
    function dump(state) {
        return 'Destroy self';
    }
    Suicide.dump = dump;
    function tick(dt) {
        this.self.delete();
        return true;
    }
    Suicide.tick = tick;
    function make(targetId = 0) {
        return {
            type: Suicide.Type
        };
    }
    Suicide.make = make;
})(Suicide_Suicide || (Suicide_Suicide = {}));
BehaviorTree_BehaviorTree.registerAction(Suicide_Suicide);

// CONCATENATED MODULE: ./src/app/game/behavior/actions/index.ts









// EXTERNAL MODULE: ./src/common/logic/effect/common.ts
var common = __webpack_require__(5);

// CONCATENATED MODULE: ./src/data/animations.ts
const Animations = {
    Player: {
        type: 'animation',
        anims: {
            'left': { frameId: 'sprites/player/left', numFrames: 8, fps: 15 },
            'right': { frameId: 'sprites/player/right', numFrames: 8, fps: 15 },
            'up': { frameId: 'sprites/player/up', numFrames: 8, fps: 15 },
            'down': { frameId: 'sprites/player/down', numFrames: 8, fps: 15 },
            'fist-left': { frameId: 'sprites/player/fist-left', numFrames: 5, fps: 15 },
            'fist-right': { frameId: 'sprites/player/fist-right', numFrames: 5, fps: 15 },
            'fist-up': { frameId: 'sprites/player/fist-up', numFrames: 5, fps: 15 },
            'fist-down': { frameId: 'sprites/player/fist-down', numFrames: 5, fps: 15 },
            'sword-left': { frameId: 'sprites/player/sword-left', numFrames: 5, fps: 15 },
            'sword-right': { frameId: 'sprites/player/sword-right', numFrames: 5, fps: 15 },
            'sword-up': { frameId: 'sprites/player/sword-up', numFrames: 5, fps: 15 },
            'sword-down': { frameId: 'sprites/player/sword-down', numFrames: 5, fps: 15 },
            'spear-left': { frameId: 'sprites/player/spear-left', numFrames: 7, fps: 10 },
            'spear-right': { frameId: 'sprites/player/spear-right', numFrames: 7, fps: 10 },
            'spear-up': { frameId: 'sprites/player/spear-up', numFrames: 7, fps: 10 },
            'spear-down': { frameId: 'sprites/player/spear-down', numFrames: 7, fps: 10 },
            'arrow-left': { frameId: 'sprites/player/arrow-left', numFrames: 11, fps: 48 },
            'arrow-right': { frameId: 'sprites/player/arrow-right', numFrames: 11, fps: 48 },
            'arrow-up': { frameId: 'sprites/player/arrow-up', numFrames: 11, fps: 48 },
            'arrow-down': { frameId: 'sprites/player/arrow-down', numFrames: 11, fps: 48 },
        }
    },
    Skeleton: {
        type: 'animation',
        anims: {
            'left': { frameId: 'sprites/skeleton/left', numFrames: 8, fps: 15 },
            'right': { frameId: 'sprites/skeleton/right', numFrames: 8, fps: 15 },
            'up': { frameId: 'sprites/skeleton/up', numFrames: 8, fps: 15 },
            'down': { frameId: 'sprites/skeleton/down', numFrames: 8, fps: 15 },
        }
    },
    Dragon: {
        type: 'animation',
        anims: {
            'left': { frameId: 'sprites/dragons/left', numFrames: 1, fps: 1 },
            'right': { frameId: 'sprites/dragons/right', numFrames: 1, fps: 1 },
        }
    }
};

// CONCATENATED MODULE: ./src/app/game/behavior/enemies.ts






const Enemies = {
    skeleton: {
        name: 'Skeleton',
        texture: Animations.Skeleton,
        scale: 1,
        horizontalAnim: false,
        offset: [0, -0.25],
        behaviors: {
            activeStateIndex: -1,
            states: [{
                    condition: HP_HP.greaterThan(0.7),
                    actions: [
                        Chase_Chase.make(),
                        Wander_Wander.make(),
                        Shoot_Shoot.make({
                            type: common_data["c" /* Weapon */].Type.Invisible,
                            pierce: true,
                            strength: 5,
                            cooldown: 100,
                            knockback: 10,
                            range: 1,
                            color: '000000'
                        }, [], 100)
                    ]
                }, {
                    condition: HP_HP.lessThan(0.5),
                    actions: [
                        Escape_Escape.make(),
                        Wander_Wander.make(),
                        Shoot_Shoot.make({
                            type: common_data["c" /* Weapon */].Type.Invisible,
                            pierce: true,
                            strength: 5,
                            cooldown: 100,
                            knockback: 10,
                            range: 1,
                            color: '000000'
                        }, [], 100)
                    ]
                }]
        },
        drops: {
            numDrops: { type: 'exponential', min: 2, max: 5, rate: 0.7 },
            items: [{
                    prob: 1, item: {
                        template: {
                            id: 'bone',
                            name: 'Bone',
                            type: common_data["b" /* Item */].Type.Material,
                            texture: { type: 'single', tex: 'sprites/items/bone', tint: 'ccb396' },
                            material: {
                                name: 'Bone',
                                color: 'ccb396',
                                weight: 0.1,
                                toughness: 0.1,
                                sharpness: 0.15,
                                affinity: 0.15,
                            },
                        },
                        substs: []
                    }
                }]
        },
        stats: {
            hp: 50,
            maxHp: 50,
            str: 10,
            def: 0,
            spd: 5,
            vit: 0
        }
    },
    egg: {
        name: 'Egg',
        texture: 'sprites/dragons/egg',
        scale: 1,
        horizontalAnim: false,
        offset: [0, -0.25],
        behaviors: {
            activeStateIndex: -1,
            states: [{
                    condition: HP_HP.greaterThan(0.99),
                    actions: [
                        Buff_Buff.make([Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.KnockbackResist, 0, 1000000)], 500000)
                    ]
                }, {
                    condition: HP_HP.lessThan(0.99),
                    actions: [
                        Spawn_Spawn.make('dragon', 0),
                        Suicide_Suicide.make()
                    ]
                }]
        },
        drops: {
            numDrops: { type: 'constant', value: 0 },
            items: []
        },
        stats: {
            hp: 10000,
            maxHp: 10000,
            str: 0,
            def: 0,
            spd: 0,
            vit: 10
        }
    },
    spawner: {
        name: 'Skeleton Spawner',
        texture: 'sprites/skeleton/spawner',
        scale: 1,
        horizontalAnim: false,
        offset: [0, -0.25],
        behaviors: {
            activeStateIndex: -1,
            states: [{
                    condition: HP_HP.greaterThan(0),
                    actions: [
                        Buff_Buff.make([Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.KnockbackResist, 0, 1000000)], 500000),
                    ]
                }, {
                    condition: Distance_Distance.lessThan(8),
                    actions: [
                        Buff_Buff.make([Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.KnockbackResist, 0, 1000000)], 500000),
                        Spawn_Spawn.make('skeleton', 10000),
                        Shoot_Shoot.make({
                            type: common_data["c" /* Weapon */].Type.Bolt,
                            pierce: true,
                            strength: 10,
                            cooldown: 5000,
                            knockback: 10,
                            range: 10,
                            color: '404040'
                        }, [], 1000, 10, 36)
                    ]
                }]
        },
        drops: {
            numDrops: { type: 'constant', value: 0 },
            items: []
        },
        stats: {
            hp: 100,
            maxHp: 150,
            str: 10,
            def: 0,
            spd: 0,
            vit: 5
        }
    }
};

// EXTERNAL MODULE: ./node_modules/webworkify-webpack/index.js
var webworkify_webpack = __webpack_require__(190);
var webworkify_webpack_default = /*#__PURE__*/__webpack_require__.n(webworkify_webpack);

// CONCATENATED MODULE: ./src/app/game/Generator.ts
var Generator_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class Generator_Generator {
    constructor(width, height, seed = '') {
        this.width = width;
        this.height = height;
        this.seed = seed;
        this.worker = webworkify_webpack_default()(/*require.resolve*/(215));
    }
    generate(report = () => { }) {
        return Generator_awaiter(this, void 0, void 0, function* () {
            const save = yield new Promise(resolve => {
                this.worker.onmessage = ev => {
                    if (ev.data.action === 'completed')
                        resolve(common_data["a" /* GameSave */].load(ev.data.save));
                    else if (ev.data.action === 'progress')
                        report(ev.data.message, ev.data.progress);
                };
                this.worker.postMessage({
                    action: 'generate',
                    width: this.width,
                    height: this.height,
                    seed: this.seed,
                    enemies: Enemies
                });
            });
            this.worker.terminate();
            return save;
        });
    }
}

// CONCATENATED MODULE: ./src/app/game/entities/Entity.ts
class Entity {
    constructor(game, id) {
        this.age = 0;
        this._traits = new Map();
        this.traits = Object.assign((trait, arg) => {
            let t = this._traits.get(trait.Type);
            if (!t) {
                t = trait.make(arg);
                this._traits.set(t.type, t);
            }
            return t;
        }, {
            get: (trait) => {
                return this._traits.get(trait.Type);
            },
            set: (trait) => {
                this._traits.set(trait.type, trait);
            },
            list: () => this._traits.values()
        });
        this._game = game;
        this.id = id || (game.data.props.nextEntityId++);
        this.init();
    }
    get game() { return this._game; }
    init() {
    }
    hydrate() {
    }
    delete() {
        if (!this._game)
            return;
        this._game.entities.delete(this);
        this._game = null;
    }
}
Entity.types = new Map();

// CONCATENATED MODULE: ./src/app/game/entities/Player.ts





class Player_Player extends Entity {
    get type() { return Player_Player.Type; }
    init() {
        const spatial = this.traits(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].set(spatial.scale, 2, 2);
        gl_matrix["b" /* vec2 */].set(spatial.offset, 0, -0.25);
        const collidable = this.traits(Collidable_Collidable);
        gl_matrix["b" /* vec2 */].set(collidable.size, 0.25, 0.25);
        const inventory = this.traits(Inventory_Inventory, 43);
        inventory.slots[40].accepts = [common_data["b" /* Item */].Type.Chestplate];
        inventory.slots[41].accepts = [common_data["b" /* Item */].Type.Leggings];
        inventory.slots[42].accepts = [common_data["b" /* Item */].Type.Boots];
        this.traits(Stats_Stats);
        this.traits(PlayerData_PlayerData);
    }
    hydrate() {
        this.traits.get(Spatial_Spatial).sprite.setTexture(Animations.Player, this.id);
    }
}
Player_Player.Type = 'player';
Entity.types.set(Player_Player.Type, Player_Player);

// CONCATENATED MODULE: ./src/app/game/entities/ItemDrop.ts



class ItemDrop_ItemDrop extends Entity {
    get type() { return ItemDrop_ItemDrop.Type; }
    static make(game, item, position = game.player.traits(Spatial_Spatial).position) {
        const entity = new ItemDrop_ItemDrop(game);
        const inventory = entity.traits.get(Inventory_Inventory);
        inventory.slots[0].item = item;
        const spatial = entity.traits.get(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].copy(spatial.position, position);
        gl_matrix["b" /* vec2 */].random(spatial.velocity);
        const float = entity.traits.get(Float_Float);
        float.z[0] = Math.random() * 0.5 + 0.5;
        return entity;
    }
    init() {
        const spatial = this.traits(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].set(spatial.scale, 2, 2);
        const collidable = this.traits(Collidable_Collidable);
        gl_matrix["b" /* vec2 */].set(collidable.size, 0.25, 0.25);
        collidable.mass = 0;
        this.traits(Float_Float);
        this.traits(Inventory_Inventory, 1);
    }
    hydrate() {
        const spatial = this.traits.get(Spatial_Spatial);
        spatial.sprite.outline = true;
        spatial.sprite.setTexture(this.traits.get(Inventory_Inventory).slots[0].item.texture, this.id);
    }
}
ItemDrop_ItemDrop.Type = 'item-drop';
Entity.types.set(ItemDrop_ItemDrop.Type, ItemDrop_ItemDrop);

// CONCATENATED MODULE: ./src/app/game/entities/Enemy.ts



class Enemy_Enemy extends Entity {
    get type() { return Enemy_Enemy.Type; }
    static make(game, def, position) {
        const entity = new Enemy_Enemy(game);
        entity.traits.get(EnemyData_EnemyData).def = def;
        entity.traits.get(Behavior_Behavior).behaviors = def.behaviors;
        Object.assign(entity.traits.get(Stats_Stats).base, def.stats);
        gl_matrix["b" /* vec2 */].copy(entity.traits.get(Spatial_Spatial).position, position);
        return entity;
    }
    init() {
        this.traits(Spatial_Spatial);
        this.traits(Collidable_Collidable);
        this.traits(Stats_Stats);
        this.traits(EnemyData_EnemyData);
        this.traits(Behavior_Behavior);
    }
    hydrate() {
        const data = this.traits.get(EnemyData_EnemyData);
        const spatial = this.traits.get(Spatial_Spatial);
        spatial.sprite.setTexture(data.def.texture, this.id);
        spatial.horizontalAnim = data.def.horizontalAnim;
        gl_matrix["b" /* vec2 */].set(spatial.scale, data.def.scale * 2, data.def.scale * 2);
        gl_matrix["b" /* vec2 */].set(spatial.offset, data.def.offset[0], data.def.offset[1]);
        const collidable = this.traits.get(Collidable_Collidable);
        gl_matrix["b" /* vec2 */].set(collidable.size, 0.4 * data.def.scale, 0.4 * data.def.scale);
    }
}
Enemy_Enemy.Type = 'enemy';
Entity.types.set(Enemy_Enemy.Type, Enemy_Enemy);

// CONCATENATED MODULE: ./src/app/game/entities/Projectile.ts





class Projectile_Projectile extends Entity {
    get type() { return Projectile_Projectile.Type; }
    static make(game, sourceEntityId, weapon, effects, start, end, lifetime, texture) {
        const entity = new Projectile_Projectile(game);
        const spatial = entity.traits.get(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].copy(spatial.position, start);
        const float = entity.traits.get(Float_Float);
        float.z[0] = 0.001;
        float.gravity = false;
        const { str } = Stats_Stats.compute(game.entities.get(sourceEntityId).traits.get(Stats_Stats));
        const damage = computeDamage(weapon.strength, str);
        entity.traits.set(ProjectileData_ProjectileData.make({
            sourceEntityId, weapon, damage, effects,
            start, end, lifetime,
            texture: {
                type: 'single',
                tex: texture,
                tint: weapon.color
            }
        }));
        return entity;
    }
    init() {
        const spatial = this.traits(Spatial_Spatial);
        gl_matrix["b" /* vec2 */].set(spatial.scale, 4, 4);
        const collidable = this.traits(Collidable_Collidable);
        gl_matrix["b" /* vec2 */].set(collidable.size, 0.25, 0.25);
        collidable.mass = 0;
        this.traits(Float_Float);
    }
    hydrate() {
        const spatial = this.traits.get(Spatial_Spatial);
        const data = this.traits.get(ProjectileData_ProjectileData);
        spatial.sprite.layer = Camera_Camera.Layer.Projectiles;
        spatial.sprite.setTexture(data.texture);
        spatial.sprite.anchor.set(0, 0);
        spatial.sprite.visible = false;
        spatial.sprite.rotation = -3 * Math.PI / 4 +
            Math.atan2(data.start[1] - data.end[1], data.start[0] - data.end[0]);
    }
}
Projectile_Projectile.Type = 'projectile';
Entity.types.set(Projectile_Projectile.Type, Projectile_Projectile);

// CONCATENATED MODULE: ./src/app/game/entities/index.ts






// CONCATENATED MODULE: ./src/app/game/EntityManager.ts


class EntityManager_EntityManager {
    constructor(game) {
        this.game = game;
        this.entities = new Map();
    }
    init() {
        for (const entityProps of this.game.data.entities) {
            const EntityType = Entity.types.get(entityProps.type);
            const entity = new EntityType(this.game, entityProps.id);
            entity.age = entityProps.age;
            for (const traitType of Object.keys(entityProps.traits)) {
                const TraitType = Trait.types.get(traitType);
                const trait = TraitType.deserialize(entityProps.traits[traitType], entity.traits(TraitType));
                entity.traits.set(trait);
            }
            this.add(entity);
        }
    }
    dispose() {
    }
    save() {
        this.game.data.entities = Array.from(this.entities.values()).map(entity => {
            const props = {
                id: entity.id,
                type: entity.type,
                age: entity.age,
                traits: {}
            };
            for (const trait of entity.traits.list())
                props.traits[trait.type] = Trait.types.get(trait.type).serialize(trait);
            return props;
        });
    }
    *ofType(entityType) {
        for (const entity of this.entities.values()) {
            if (entity.type === entityType.Type)
                yield entity;
        }
    }
    *withTrait(traitType) {
        for (const entity of this.entities.values()) {
            if (entity.traits.get(traitType))
                yield entity;
        }
    }
    get(id) {
        return this.entities.get(id);
    }
    add(entity) {
        entity.hydrate();
        this.entities.set(entity.id, entity);
    }
    delete(entity) {
        this.entities.delete(entity.id);
    }
    update(dt) {
        for (const entity of this.entities.values())
            entity.age += dt;
    }
}

// CONCATENATED MODULE: ./src/app/game/GameView.ts


class GameView_GameView extends lib["Container"] {
    constructor() {
        super();
        this.camera = new Camera_Camera();
        this.add(this.camera);
        this.interactive = true;
    }
    add(view) {
        this.addChild(view);
    }
    layout(width, height) {
        for (const child of this.children) {
            child.layout(width, height);
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/Task.ts
class Task {
    constructor(game) {
        this.game = game;
        this.runWhenPaused = false;
        this._active = true;
    }
    get isActive() { return this._active; }
    deactivate() {
        if (!this._active)
            throw new Error('not active');
        this._active = false;
    }
    update(dt) { }
    dispose() { }
}

// CONCATENATED MODULE: ./src/app/game/menu/MenuPanel.ts

class MenuPanel_MenuPanel extends lib["Container"] {
    constructor() {
        super(...arguments);
        this.active = false;
    }
    dispose(exit) { }
    update(dt) { }
}

// EXTERNAL MODULE: ./node_modules/rxjs/Subscription.js
var Subscription = __webpack_require__(24);

// CONCATENATED MODULE: ./src/app/game/menu/Workbench.ts







const NumRows = 3;
class Workbench_RecipeView extends lib["Container"] {
    constructor(game, recipe) {
        super();
        this.game = game;
        this.recipe = recipe;
        this.output = new SlotView_SlotView(game, { accepts: [], item: this.makeOutput() });
        this.output.position.set(0, (64 - SlotView_SlotView.Size) / 2);
        this.addChild(this.output);
        this.inputs = recipe.input.map(({ accepts, texture }) => {
            const slot = new SlotView_SlotView(game, { accepts, item: null });
            slot.bgOverlay.setTexture(texture);
            slot.bgOverlay.outline = true;
            return slot;
        });
        this.arrow = new TextureSprite_TextureSprite(lib["Texture"].fromFrame('sprites/ui/arrow'));
        this.arrow.position.set(SlotView_SlotView.Size + 16, 0);
        this.arrow.scale.set(2, 2);
        this.addChild(this.arrow);
        let x = SlotView_SlotView.Size + 16 + 64 + 16;
        for (const input of this.inputs) {
            this.addChild(input);
            input.position.set(x + 8, 8);
            x += 64;
        }
    }
    makeOutput() {
        return Object(cloneDeep["a" /* default */])(this.recipe.output);
    }
    check(slot) {
        let numInputs = 0;
        for (const input of this.inputs) {
            if (!input.slot.item) {
                input.alpha = 0.5;
            }
            else {
                input.alpha = 1;
                numInputs++;
            }
        }
        const ok = numInputs === this.recipe.input.length;
        this.output.enabled = ok;
        this.output.alpha = ok ? 1 : 0.5;
        this.arrow.alpha = ok ? 1 : 0.5;
        if (!this.output.slot.item) {
            this.output.slot.item = this.makeOutput();
            this.game.dispatch(new InventoryUpdated(this.output.slot));
            for (const { slot } of this.inputs) {
                slot.item = null;
                this.game.dispatch(new InventoryUpdated(slot));
            }
        }
    }
    layout() {
        this.output.layout();
        for (const input of this.inputs)
            input.layout();
    }
    dispose() {
        for (const { slot } of this.inputs)
            if (slot.item) {
                const drop = ItemDrop_ItemDrop.make(this.game, slot.item);
                this.game.entities.add(drop);
                slot.item = null;
                this.game.dispatch(new InventoryUpdated(slot));
            }
    }
}
class Workbench_Workbench extends MenuPanel_MenuPanel {
    constructor(game) {
        super();
        this.game = game;
        this.name = 'Workbench';
        this.icon = lib["Texture"].fromFrame('sprites/ui/tab-workbench');
        this.upButton = new Button_Button();
        this.downButton = new Button_Button();
        this.recipeViews = [];
        this.subscription = new Subscription["Subscription"]();
        this.scrollOffset = 0;
        this.wheelDebounce = 0;
        this.wheelList = (event) => {
            if (!this.active)
                return;
            if (this.elapsed - this.wheelDebounce < 20)
                return;
            const delta = event.deltaX + event.deltaY;
            if (Math.abs(delta) < 32)
                return;
            this.scrollOffset += Math.sign(delta);
        };
        this.elapsed = 0;
        this.checkInventory = ({ slot }) => {
            for (const view of this.recipeViews)
                view.check(slot);
        };
        this.upButton = new Button_Button();
        const upIcon = new TextureSprite_TextureSprite(lib["Texture"].fromFrame('sprites/ui/arrow-compact'));
        upIcon.scale.set(2, 2);
        upIcon.rotation = Math.PI / 2;
        upIcon.pivot.set(8, 8);
        upIcon.position.set(32, 16);
        this.upButton.content.addChild(upIcon);
        this.addChild(this.upButton);
        this.downButton = new Button_Button();
        const downIcon = new TextureSprite_TextureSprite(lib["Texture"].fromFrame('sprites/ui/arrow-compact'));
        downIcon.scale.set(2, 2);
        downIcon.rotation = -Math.PI / 2;
        downIcon.pivot.set(8, 8);
        downIcon.position.set(32, 16);
        this.downButton.content.addChild(downIcon);
        this.addChild(this.downButton);
        for (const recipe of game.library.recipes) {
            const view = new Workbench_RecipeView(game, recipe);
            this.addChild(view);
            this.recipeViews.push(view);
        }
        this.subscription.add(game.messages$.ofType(InventoryUpdated).subscribe(this.checkInventory));
        for (const view of this.recipeViews)
            view.check();
        this.upButton.on(Button_Button.Clicked, () => this.scrollOffset--);
        this.downButton.on(Button_Button.Clicked, () => this.scrollOffset++);
        game.app.view.addEventListener('wheel', this.wheelList);
    }
    update(dt) {
        this.elapsed += dt;
    }
    layout(width, height) {
        const scrollMin = 0, scrollMax = this.recipeViews.length - NumRows;
        this.scrollOffset = Object(clamp["a" /* default */])(this.scrollOffset, 0, scrollMax);
        this.upButton.visible = this.scrollOffset > scrollMin;
        this.downButton.visible = this.scrollOffset < scrollMax;
        let y = 0;
        this.upButton.position.set(0, y);
        this.upButton.layout(64, 32);
        y += 32;
        for (let i = 0; i < this.recipeViews.length; i++) {
            const view = this.recipeViews[i];
            if (i < this.scrollOffset || i >= this.scrollOffset + NumRows) {
                view.visible = false;
            }
            else {
                view.visible = true;
                view.position.set(2, y);
                view.layout();
                y += 64;
            }
        }
        this.downButton.position.set(0, y);
        this.downButton.layout(64, 32);
    }
    dispose(exit) {
        if (exit) {
            this.subscription.unsubscribe();
            this.game.app.view.removeEventListener('wheel', this.wheelList);
        }
        for (const view of this.recipeViews)
            view.dispose();
    }
}

// EXTERNAL MODULE: ./src/common/logic/alchemy.ts
var alchemy = __webpack_require__(15);

// CONCATENATED MODULE: ./src/app/game/menu/Alchemy.ts








class Alchemy_Alchemy extends MenuPanel_MenuPanel {
    constructor(game) {
        super();
        this.game = game;
        this.name = 'Alchemy';
        this.icon = lib["Texture"].fromFrame('sprites/ui/tab-alchemy');
        this.processButton = new Button_Button();
        this.subscription = new Subscription["Subscription"]();
        this.checkInventory = () => {
            this.processButton.isEnabled =
                !this.input1.empty && !this.input2.empty && !this.fuel.empty && this.output.empty;
        };
        this.doAlchemy = () => {
            const input1 = this.input1.slot.item;
            const input2 = this.input2.slot.item;
            const output = Object(alchemy["d" /* mixSolution */])(input1, input2, this.game.library.elements);
            this.output.slot.item = output;
            this.input1.slot.item = null;
            this.input2.slot.item = null;
            this.fuel.slot.item = null;
            this.game.dispatch(new InventoryUpdated(this.input1.slot));
            this.game.dispatch(new InventoryUpdated(this.input2.slot));
            this.game.dispatch(new InventoryUpdated(this.output.slot));
            this.game.dispatch(new InventoryUpdated(this.fuel.slot));
        };
        this.bg = new TextureSprite_TextureSprite(lib["Texture"].from('sprites/ui/cauldron'));
        this.bg.outline = true;
        this.bg.scale.set(7, 7);
        this.addChild(this.bg);
        const icon = new TextureSprite_TextureSprite(lib["Texture"].fromFrame('sprites/ui/arrow-compact'));
        icon.scale.set(2, 2);
        icon.rotation = -Math.PI / 2;
        icon.pivot.set(8, 8);
        icon.position.set(18, 20);
        this.processButton.content.addChild(icon);
        this.addChild(this.processButton);
        this.input1 = new SlotView_SlotView(game, { accepts: [common_data["b" /* Item */].Type.Consumable], item: null });
        this.input2 = new SlotView_SlotView(game, { accepts: [common_data["b" /* Item */].Type.Consumable], item: null });
        this.fuel = new SlotView_SlotView(game, { accepts: '^wood-', item: null });
        this.output = new SlotView_SlotView(game, { accepts: [], item: null });
        this.addChild(this.input1);
        this.addChild(this.input2);
        this.addChild(this.fuel);
        this.addChild(this.output);
        this.fuel.bgOverlay.setTexture('sprites/ui/inv-slot-fire');
        this.subscription.add(game.messages$.ofType(InventoryUpdated).subscribe(this.checkInventory));
        this.checkInventory();
        this.processButton.on(Button_Button.Clicked, this.doAlchemy);
    }
    layout(width, height) {
        const contentWidth = SlotView_SlotView.Size + 16 + 40 + 16 + SlotView_SlotView.Size;
        this.input1.position.set(16, 4);
        this.input1.layout();
        this.processButton.position.set(16 + SlotView_SlotView.Size + 16, 16);
        this.processButton.layout(40, 40);
        this.input2.position.set(16 + SlotView_SlotView.Size + 16 + 40 + 16, 4);
        this.input2.layout();
        this.bg.position.set(16 + (contentWidth - this.bg.width) / 2, SlotView_SlotView.Size + 8);
        this.output.position.set(16 + (contentWidth - SlotView_SlotView.Size) / 2, SlotView_SlotView.Size + 28);
        this.output.layout();
        this.fuel.position.set(16 + (contentWidth - SlotView_SlotView.Size) / 2, 192);
        this.fuel.layout();
    }
    dispose(exit) {
        if (exit)
            this.subscription.unsubscribe();
        for (const { slot } of [this.input1, this.input2, this.fuel, this.output])
            if (slot.item) {
                const drop = ItemDrop_ItemDrop.make(this.game, slot.item);
                this.game.entities.add(drop);
                slot.item = null;
                this.game.dispatch(new InventoryUpdated(slot));
            }
    }
}

// EXTERNAL MODULE: ./src/common/color.ts
var common_color = __webpack_require__(41);

// EXTERNAL MODULE: ./src/data/elements.ts
var data_elements = __webpack_require__(4);

// CONCATENATED MODULE: ./src/common/logic/effect/armors.ts




function computeEffect(element, strength, strengths) {
    switch (element) {
        case data_elements["a" /* ElementDef */].Type.Energy: {
            let amount = strength * 50;
            return Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.Strength, amount, 0);
        }
        case data_elements["a" /* ElementDef */].Type.Weakness: {
            let amount = strength * 50;
            return Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.Weakness, amount, 0);
        }
        case data_elements["a" /* ElementDef */].Type.Defense: {
            let amount = strength * 50;
            if (strengths[data_elements["a" /* ElementDef */].Type.Void] > strength * 0.5)
                return Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.DefBreak, amount, 0);
            else
                return Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.Resistance, amount, 0);
        }
        case data_elements["a" /* ElementDef */].Type.Life:
        case data_elements["a" /* ElementDef */].Type.Recovery: {
            let amount = strength * 50;
            if (element === data_elements["a" /* ElementDef */].Type.Life)
                amount *= 0.5;
            return Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.VitalityUp, amount, 0);
        }
        case data_elements["a" /* ElementDef */].Type.Void:
        case data_elements["a" /* ElementDef */].Type.Injury: {
            let amount = strength * 50;
            if (element === data_elements["a" /* ElementDef */].Type.Void)
                amount *= 0.3;
            return Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.VitalityDown, amount, 0);
        }
        case data_elements["a" /* ElementDef */].Type.Motion: {
            let amount = strength * 50;
            return Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.Speed, amount, 0);
        }
        case data_elements["a" /* ElementDef */].Type.Frost:
        case data_elements["a" /* ElementDef */].Type.Capture: {
            let amount = strength * 50;
            if (element === data_elements["a" /* ElementDef */].Type.Capture)
                amount *= 1.5;
            return Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.Slowness, amount, 0);
        }
    }
}
function armors_compute(parts, material, multiplier, data) {
    const materialAspects = [{
            element: data_elements["a" /* ElementDef */].Type.Defense,
            amount: material.toughness * (1 + Math.pow(material.weight, 0.75)) * 1000 * multiplier
        }, {
            element: data_elements["a" /* ElementDef */].Type.Capture,
            amount: material.weight * 10 * multiplier
        }, {
            element: data_elements["a" /* ElementDef */].Type.Energy,
            amount: material.sharpness * 100 * multiplier
        }];
    const affinity = Math.pow(material.affinity, 0.5);
    const aspects = Object(alchemy["c" /* mix */])([
        ...parts.map(item => ({ aspects: Object(common["c" /* scaleAspects */])(item.aspects || [], affinity) })),
        { aspects: materialAspects }
    ], data);
    return [Object(common["a" /* computeEffects */])(aspects, computeEffect, 0.01), aspects];
}

// EXTERNAL MODULE: ./src/common/logic/effect/solution.ts
var solution = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/lodash-es/countBy.js + 3 modules
var countBy = __webpack_require__(376);

// CONCATENATED MODULE: ./src/common/logic/anvil.ts







var AssemblyType;
(function (AssemblyType) {
    AssemblyType["Chestplate"] = "chestplate";
    AssemblyType["Leggings"] = "leggings";
    AssemblyType["Boots"] = "boots";
    AssemblyType["Sword"] = "sword";
    AssemblyType["Spear"] = "spear";
    AssemblyType["Bow"] = "bow";
    AssemblyType["Arrow"] = "arrow";
    AssemblyType["Infusion"] = "infusion";
})(AssemblyType || (AssemblyType = {}));
const Parts = {
    [AssemblyType.Chestplate]: [
        { weight: 0.2, toughness: 0.4, sharpness: 0.4, affinity: 0.2, },
        { weight: 0.2, toughness: 0.4, sharpness: 0.4, affinity: 0.2, },
        { weight: 0.05, toughness: 0, sharpness: 0.1, affinity: 0.45, },
        { weight: 0.35, toughness: 0.2, sharpness: 0.1, affinity: 0.15, },
    ],
    [AssemblyType.Leggings]: [
        { weight: 0.2, toughness: 0.3, sharpness: 0.3, affinity: 0.5, },
        { weight: 0.4, toughness: 0.35, sharpness: 0.35, affinity: 0.25, },
        { weight: 0.4, toughness: 0.35, sharpness: 0.35, affinity: 0.25, },
    ],
    [AssemblyType.Boots]: [
        { weight: 0.5, toughness: 0.5, sharpness: 0.5, affinity: 0.5, },
        { weight: 0.5, toughness: 0.5, sharpness: 0.5, affinity: 0.5, },
    ],
    [AssemblyType.Sword]: [
        { weight: 0.45, toughness: 0.3, sharpness: 0.5, affinity: 0.25, },
        { weight: 0.35, toughness: 0.3, sharpness: 0.4, affinity: 0.2, },
        { weight: 0.2, toughness: 0.4, sharpness: 0.1, affinity: 0.55, },
    ],
    [AssemblyType.Spear]: [
        { weight: 0.6, toughness: 0.1, sharpness: 0.9, affinity: 0.7, },
        { weight: 0.2, toughness: 0.45, sharpness: 0.05, affinity: 0.15, },
        { weight: 0.2, toughness: 0.45, sharpness: 0.05, affinity: 0.15, },
    ],
    [AssemblyType.Bow]: [
        { weight: 0.35, toughness: 0.1, sharpness: 0.05, affinity: 0.2, },
        { weight: 0.1, toughness: 0.1, sharpness: 0.35, affinity: 0.05, },
        { weight: 0.35, toughness: 0.1, sharpness: 0.05, affinity: 0.2, },
        { weight: 0.05, toughness: 0.3, sharpness: 0.1, affinity: 0.25, },
        { weight: 0.1, toughness: 0.1, sharpness: 0.35, affinity: 0.05, },
        { weight: 0.05, toughness: 0.3, sharpness: 0.1, affinity: 0.25, },
    ],
    [AssemblyType.Arrow]: [
        { weight: 0.6, toughness: 0.5, sharpness: 0.45, affinity: 0.4, },
        { weight: 0.3, toughness: 0.4, sharpness: 0.1, affinity: 0.2, },
        { weight: 0.1, toughness: 0.1, sharpness: 0.45, affinity: 0.4, },
    ]
};
function assemble(type, parts, data) {
    if (type === AssemblyType.Infusion) {
        const material = parts[1].material;
        if (!material) {
            console.error('unexpected item');
            return null;
        }
        if (parts[1].type === common_data["b" /* Item */].Type.Weapon) {
            const aspects = Object(alchemy["c" /* mix */])(parts, data);
            return Object.assign({}, parts[1], { effects: Object(solution["a" /* compute */])(aspects) });
        }
        else {
            const [effects, aspects] = armors_compute(parts, material, 1, data);
            return Object.assign({}, parts[1], { aspects, effects });
        }
    }
    else {
        const mat = { weight: 0, toughness: 0, sharpness: 0, affinity: 0 };
        for (let i = 0; i < parts.length; i++) {
            const material = parts[i].material;
            if (!material) {
                console.error('unexpected item');
                return null;
            }
            mat.weight += material.weight * Parts[type][i].weight;
            mat.toughness += material.toughness * Parts[type][i].toughness;
            mat.sharpness += material.sharpness * Parts[type][i].sharpness;
            mat.affinity += material.affinity * Parts[type][i].affinity;
        }
        mat.weight *= parts.length;
        mat.toughness = Math.pow(mat.toughness, 1.5);
        mat.sharpness = Math.pow(mat.sharpness, 1.5);
        console.log(mat);
        let weapon;
        let effects;
        let aspects;
        let texture;
        let itemType = common_data["b" /* Item */].Type.Weapon;
        function blendPartColors(parts) {
            return Object(common_color["a" /* blend */])(parts.map(({ material }) => ({
                color: parseInt(material.color, 16)
            }))).toString(16);
        }
        let materialName = '';
        let matColor = 'ffffff';
        function mainParts(parts) {
            const materialCounts = Object(countBy["a" /* default */])(parts.map(part => part.material.name));
            let maxMaterial = 0;
            for (const material of Object.keys(materialCounts))
                if (materialCounts[material] > maxMaterial) {
                    materialName = material;
                    maxMaterial = materialCounts[material];
                }
            matColor = blendPartColors(parts);
        }
        switch (type) {
            case AssemblyType.Sword:
                mainParts(parts.slice(0, 2));
                weapon = {
                    type: common_data["c" /* Weapon */].Type.Sword,
                    strength: (1 + mat.sharpness) * (mat.weight + mat.toughness) / 2 * 100,
                    cooldown: mat.weight * (1 - mat.toughness) * 5000,
                    knockback: mat.weight * (1 + mat.sharpness) * 10,
                    pierce: true,
                    range: 2.5,
                    color: matColor
                };
                aspects = Object(alchemy["c" /* mix */])(parts, data);
                effects = Object(solution["a" /* compute */])(aspects);
                texture = {
                    type: 'composite',
                    overlay: {
                        type: 'single',
                        tex: 'sprites/items/sword-blade',
                        tint: blendPartColors(parts.slice(0, 2))
                    },
                    base: {
                        type: 'single',
                        tex: 'sprites/items/sword',
                        tint: parts[2].material.color
                    }
                };
                break;
            case AssemblyType.Spear:
                mainParts(parts.slice(0, 1));
                weapon = {
                    type: common_data["c" /* Weapon */].Type.Spear,
                    strength: (1 + mat.sharpness) * (mat.weight + mat.toughness) / 2 * 250,
                    cooldown: mat.weight * (1 - mat.toughness) * 15000,
                    knockback: mat.weight * (1 + mat.sharpness) * 20,
                    pierce: true,
                    range: 4,
                    color: matColor
                };
                aspects = Object(alchemy["c" /* mix */])(parts, data);
                effects = Object(solution["a" /* compute */])(aspects);
                texture = {
                    type: 'composite',
                    overlay: {
                        type: 'single',
                        tex: 'sprites/items/spear-head',
                        tint: parts[0].material.color
                    },
                    base: {
                        type: 'single',
                        tex: 'sprites/items/spear',
                        tint: blendPartColors(parts.slice(1, 3))
                    }
                };
                break;
            case AssemblyType.Bow:
                mainParts([parts[0], parts[1], parts[2], parts[4]]);
                weapon = {
                    type: common_data["c" /* Weapon */].Type.Bow,
                    strength: mat.toughness * (1 + mat.weight) * 20,
                    cooldown: mat.weight * (1 - mat.toughness) * 1000,
                    knockback: 0,
                    range: 0,
                    color: matColor
                };
                aspects = Object(alchemy["c" /* mix */])(parts, data);
                effects = Object(solution["a" /* compute */])(aspects);
                texture = {
                    type: 'composite',
                    overlay: {
                        type: 'single',
                        tex: 'sprites/items/bow-string',
                        tint: blendPartColors([parts[3], parts[5]])
                    },
                    base: {
                        type: 'single',
                        tex: 'sprites/items/bow',
                        tint: blendPartColors([parts[0], parts[1], parts[2], parts[4]])
                    }
                };
                break;
            case AssemblyType.Arrow:
                mainParts(parts.slice(0, 1));
                weapon = {
                    type: common_data["c" /* Weapon */].Type.Arrow,
                    strength: mat.weight * (1 + mat.sharpness) * 10,
                    cooldown: 0,
                    knockback: 0,
                    range: 5 + mat.toughness * 15,
                    color: matColor
                };
                aspects = Object(common["c" /* scaleAspects */])(Object(alchemy["c" /* mix */])(parts, data), Math.pow(mat.affinity, 0.5));
                effects = Object(solution["a" /* compute */])(aspects);
                texture = {
                    type: 'composite',
                    base: {
                        type: 'single',
                        tex: 'sprites/items/arrow',
                        tint: parts[1].material.color
                    },
                    overlay: {
                        type: 'composite',
                        base: {
                            type: 'single',
                            tex: 'sprites/items/arrow-head',
                            tint: parts[0].material.color
                        },
                        overlay: {
                            type: 'single',
                            tex: 'sprites/items/arrow-fletch',
                            tint: parts[2].material.color
                        }
                    }
                };
                break;
            case AssemblyType.Chestplate:
                mainParts(parts);
                itemType = common_data["b" /* Item */].Type.Chestplate;
                [effects, aspects] = armors_compute(parts, mat, 1, data);
                texture = {
                    type: 'composite',
                    base: {
                        type: 'single',
                        tex: 'sprites/items/chestplate',
                        tint: parts[3].material.color
                    },
                    overlay: {
                        type: 'composite',
                        base: {
                            type: 'single',
                            tex: 'sprites/items/chestplate-belt',
                            tint: parts[2].material.color
                        },
                        overlay: {
                            type: 'composite',
                            base: {
                                type: 'single',
                                tex: 'sprites/items/chestplate-left',
                                tint: parts[0].material.color
                            },
                            overlay: {
                                type: 'single',
                                tex: 'sprites/items/chestplate-right',
                                tint: parts[1].material.color
                            }
                        }
                    }
                };
                break;
            case AssemblyType.Leggings:
                mainParts(parts);
                itemType = common_data["b" /* Item */].Type.Leggings;
                [effects, aspects] = armors_compute(parts, mat, 0.5, data);
                texture = {
                    type: 'composite',
                    base: {
                        type: 'single',
                        tex: 'sprites/items/leggings',
                        tint: parts[0].material.color
                    },
                    overlay: {
                        type: 'composite',
                        base: {
                            type: 'single',
                            tex: 'sprites/items/leggings-left',
                            tint: parts[1].material.color
                        },
                        overlay: {
                            type: 'single',
                            tex: 'sprites/items/leggings-right',
                            tint: parts[2].material.color
                        }
                    }
                };
                break;
            case AssemblyType.Boots:
                mainParts(parts);
                itemType = common_data["b" /* Item */].Type.Boots;
                [effects, aspects] = armors_compute(parts, mat, 0.2, data);
                texture = {
                    type: 'composite',
                    base: {
                        type: 'single',
                        tex: 'sprites/items/boots',
                        tint: parts[0].material.color
                    },
                    overlay: {
                        type: 'single',
                        tex: 'sprites/items/boots-right',
                        tint: parts[1].material.color
                    }
                };
                break;
            default:
                console.error('unexpected type');
                return null;
        }
        console.log(weapon);
        console.log(effects);
        return {
            id: type,
            name: `${materialName} ${Object(startCase["a" /* default */])(type)}`,
            type: itemType,
            texture,
            aspects,
            effects,
            material: Object.assign({ name: materialName, color: matColor }, mat),
            weapon
        };
    }
}

// CONCATENATED MODULE: ./src/app/game/menu/Anvil.ts









function Anvil_slot(...accepts) {
    return { accepts: `^(${accepts.join('|')})$`, textures: accepts.map(id => `sprites/items/${id}`) };
}
const Targets = [{
        id: AssemblyType.Chestplate,
        name: 'Chestplate',
        description: '',
        slots: [
            Anvil_slot('skin', 'scale'), null, Anvil_slot('skin', 'scale'),
            null, Anvil_slot('skin'), null,
            null, Anvil_slot('skin', 'scale'), null,
        ]
    }, {
        id: AssemblyType.Leggings,
        name: 'Leggings',
        description: '',
        slots: [
            null, null, null,
            null, Anvil_slot('skin'), null,
            Anvil_slot('skin', 'scale'), null, Anvil_slot('skin', 'scale'),
        ]
    }, {
        id: AssemblyType.Boots,
        name: 'Boots',
        description: '',
        slots: [
            null, null, null,
            null, null, null,
            Anvil_slot('skin'), null, Anvil_slot('skin'),
        ]
    }, {
        id: AssemblyType.Sword,
        name: 'Sword',
        description: `
average damage
average range
average speed
`,
        slots: [
            Anvil_slot('fang', 'scale'), null, null,
            null, Anvil_slot('fang', 'scale'), null,
            null, null, Anvil_slot('bone', 'rod'),
        ]
    }, {
        id: AssemblyType.Spear,
        name: 'Spear',
        description: `
high damage
average range
low speed
`,
        slots: [
            Anvil_slot('fang', 'scale'), null, null,
            null, Anvil_slot('bone', 'rod'), null,
            null, null, Anvil_slot('bone', 'rod'),
        ]
    }, {
        id: AssemblyType.Bow,
        name: 'Bow',
        description: `
low damage
high range
high speed
`,
        slots: [
            null, Anvil_slot('bone', 'rod'), Anvil_slot('bone', 'rod'),
            Anvil_slot('bone', 'rod'), null, Anvil_slot('skin'),
            Anvil_slot('bone', 'rod'), Anvil_slot('skin'), null,
        ]
    }, {
        id: AssemblyType.Arrow,
        name: 'Arrow',
        description: 'ammo of bow',
        slots: [
            Anvil_slot('fang', 'scale'), null, null,
            null, Anvil_slot('bone', 'rod'), null,
            null, null, Anvil_slot('scale', 'leaf'),
        ]
    }, {
        id: AssemblyType.Infusion,
        name: 'Infusion',
        description: 'infuse solution effects into equipment',
        slots: [
            null, null, Anvil_slot('solution'),
            null, null, null,
            null, null, Anvil_slot('chestplate', 'leggings', 'boots', 'sword', 'spear', 'bow', 'arrow'),
        ]
    }];
class Anvil_Anvil extends MenuPanel_MenuPanel {
    constructor(game) {
        super();
        this.game = game;
        this.name = 'Anvil';
        this.icon = lib["Texture"].fromFrame('sprites/ui/tab-anvil');
        this.arrow = new lib["Sprite"](lib["Texture"].fromFrame('sprites/ui/arrow'));
        this.activeTarget = Targets[0];
        this.targetButtons = [];
        this.subscription = new Subscription["Subscription"]();
        this.checkInventory = ({ slot }) => {
            let ok = true;
            const items = [];
            for (let i = 0; i < 9; i++) {
                const slot = this.activeTarget.slots[i];
                if (!slot)
                    continue;
                const item = this.inSlots[i].slot.item;
                if (item) {
                    items.push(item);
                }
                else {
                    ok = false;
                    break;
                }
            }
            if (!ok && this.outSlot.slot.item) {
                this.outSlot.slot.item = null;
                this.game.dispatch(new InventoryUpdated(this.outSlot.slot));
            }
            else if (ok && slot === this.outSlot.slot && !slot.item) {
                for (const { slot } of this.inSlots) {
                    slot.item = null;
                    this.game.dispatch(new InventoryUpdated(slot));
                }
            }
            else if (ok && slot !== this.outSlot.slot) {
                this.outSlot.slot.item = assemble(this.activeTarget.id, items, this.game.library.elements);
                this.game.dispatch(new InventoryUpdated(this.outSlot.slot));
            }
        };
        this.elapsed = 0;
        this.toolTip = new TextToolTip_TextToolTip(game.app, '', {
            default: { align: 'left' },
            desc: { fill: '#d0d0d0' }
        });
        this.inSlots = Object(times["a" /* default */])(9, () => new SlotView_SlotView(game, { accepts: [], item: null }));
        for (const input of this.inSlots) {
            input.bgOverlay.outline = true;
            this.addChild(input);
        }
        this.outSlot = new SlotView_SlotView(game, { accepts: [], item: null });
        this.addChild(this.outSlot);
        this.arrow.scale.set(2, 2);
        this.arrow.rotation = Math.PI;
        this.arrow.pivot.set(16, 16);
        this.arrow.position.set(SlotView_SlotView.Size * 3 + 112, 64 + SlotView_SlotView.Size + 24);
        this.addChild(this.arrow);
        let x = 0;
        for (const target of Targets) {
            const button = Object.assign(new Button_Button(), { target });
            const texId = target.id === AssemblyType.Infusion ? 'solution' : target.id;
            const icon = new lib["Sprite"](lib["Texture"].fromFrame(`sprites/ui/inv-slot-${texId}`));
            icon.scale.set(2, 2);
            icon.alpha = 0.5;
            button.content.addChild(icon);
            button.position.set(x, 0);
            this.addChild(button);
            game.app.toolTip.add(button, () => {
                this.toolTip.text = `
${target.name}
<desc>${target.description}</desc>
`.trim();
                return this.toolTip;
            });
            button.on(Button_Button.Clicked, () => this.updateTarget(target));
            this.targetButtons.push(button);
            x += 64;
        }
        this.updateTarget();
        this.subscription.add(game.messages$.ofType(InventoryUpdated).subscribe(this.checkInventory));
    }
    updateTarget(target = this.activeTarget) {
        for (const { slot } of this.inSlots) {
            if (slot.item) {
                this.game.entities.add(ItemDrop_ItemDrop.make(this.game, slot.item));
                slot.item = null;
                this.game.dispatch(new InventoryUpdated(slot));
            }
        }
        for (let i = 0; i < 9; i++) {
            this.inSlots[i].slot.item = null;
            const targetSlot = target.slots[i];
            if (!targetSlot) {
                this.inSlots[i].enabled = false;
                this.inSlots[i].visible = false;
            }
            else {
                this.inSlots[i].enabled = true;
                this.inSlots[i].visible = true;
                this.inSlots[i].slot.accepts = targetSlot.accepts;
            }
        }
        this.activeTarget = target;
    }
    layout(width, height) {
        const anvilX = 64, anvilY = 64;
        let x = 0, y = 0;
        for (const input of this.inSlots) {
            input.position.set(anvilX + x * SlotView_SlotView.Size, anvilY + y * SlotView_SlotView.Size);
            input.layout();
            if (++x === 3) {
                x = 0;
                y++;
            }
        }
        this.outSlot.position.set(SlotView_SlotView.Size * 3 + 164, anvilY + SlotView_SlotView.Size);
        this.outSlot.layout();
        for (const button of this.targetButtons) {
            button.isEnabled = this.activeTarget !== button.target;
            button.layout(50, 50);
        }
    }
    update(dt) {
        this.elapsed += dt;
        const tick = Math.floor(this.elapsed / 1000);
        for (let i = 0; i < 9; i++) {
            const slot = this.activeTarget.slots[i];
            if (!slot)
                continue;
            if (this.inSlots[i].slot.item)
                this.inSlots[i].bgOverlay.clearTexture();
            else
                this.inSlots[i].bgOverlay.setTexture(slot.textures[tick % slot.textures.length]);
        }
    }
    dispose(exit) {
        this.updateTarget();
        if (exit)
            this.subscription.unsubscribe();
    }
}

// CONCATENATED MODULE: ./src/app/game/menu/EnemyInfo.ts




const HPBarWidth = 256;
const HPBarHeight = 32;
class EnemyInfo_EnemyInfo extends MenuPanel_MenuPanel {
    constructor(game) {
        super();
        this.game = game;
        this.name = 'Enemy Info';
        this.icon = lib["Texture"].fromFrame('sprites/ui/tab-enemy');
        this.enemyTex = new TextureSprite_TextureSprite();
        this.nameLabel = new Text_Text('', { align: 'left' });
        this.hpBar = new lib["Container"]();
        this.hpBarIcon = new TextureSprite_TextureSprite(lib["Texture"].fromFrame('sprites/ui/status-hp'));
        this.hpBarBg = new TextureSprite_TextureSprite(lib["Texture"].WHITE);
        this.hpBarFill = new TextureSprite_TextureSprite(lib["Texture"].WHITE);
        this.hpBarText = new Text_Text();
        this.enemyTex.animName = 'right';
        this.hpBarBg.tint = 0x808080;
        this.hpBarBg.width = HPBarWidth;
        this.hpBarBg.height = HPBarHeight;
        this.hpBar.addChild(this.hpBarBg);
        this.hpBar.addChild(this.hpBarFill);
        this.hpBar.addChild(this.hpBarText);
        this.addChild(this.hpBarIcon);
        this.addChild(this.hpBar);
        this.addChild(this.enemyTex);
        this.addChild(this.nameLabel);
    }
    getEnemy() {
        const { lastAttackId } = this.game.player.traits.get(PlayerData_PlayerData);
        const target = this.game.entities.get(lastAttackId);
        if (!target)
            return null;
        if (!target.traits.get(EnemyData_EnemyData))
            return null;
        return target;
    }
    update() {
        const enemy = this.getEnemy();
        if (!enemy) {
            this.enemyTex.clearTexture();
            this.hpBarIcon.visible = false;
            this.hpBar.visible = false;
            this.nameLabel.text = 'none';
            return;
        }
        const { def } = enemy.traits.get(EnemyData_EnemyData);
        const { hp, maxHp } = Stats_Stats.compute(enemy.traits.get(Stats_Stats));
        this.enemyTex.setTexture(def.texture);
        this.enemyTex.update(0);
        this.nameLabel.text = def.name;
        this.hpBarIcon.visible = true;
        this.hpBar.visible = true;
        const percentage = hp / maxHp;
        this.hpBarText.text = `${Math.ceil(hp)}/${maxHp}`;
        this.hpBarFill.width = HPBarWidth * percentage;
        this.hpBarFill.height = HPBarHeight;
        if (percentage < 0.3)
            this.hpBarFill.tint = 0xa00000;
        else if (percentage < 0.6)
            this.hpBarFill.tint = 0xa0a000;
        else
            this.hpBarFill.tint = 0x00a000;
    }
    layout(width, height) {
        this.enemyTex.position.set(0, 0);
        this.nameLabel.position.set(80, 0);
        this.nameLabel.layout(256, 64);
        this.hpBarIcon.position.set(0, 96);
        this.hpBar.position.set(48, 96);
        this.hpBarText.layout(HPBarWidth, HPBarHeight);
    }
}

// CONCATENATED MODULE: ./src/app/game/menu/index.ts






// CONCATENATED MODULE: ./src/app/game/overlays/GameOverlay.ts
var GameOverlay_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class GameOverlay_GameOverlay extends Panel_Panel {
    constructor(game) {
        super(game.app);
        this.game = game;
    }
    init() { }
    dispose() { }
    update(dt) { }
    done() {
        return GameOverlay_awaiter(this, void 0, void 0, function* () {
            yield this.game.app.popState();
        });
    }
}

// CONCATENATED MODULE: ./src/app/game/overlays/DeathOverlay.ts
var DeathOverlay_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const Width = 400;
const Height = 200;
class DeathOverlay_DeathOverlay extends GameOverlay_GameOverlay {
    constructor(game) {
        super(game);
        this.exit = () => DeathOverlay_awaiter(this, void 0, void 0, function* () {
            yield this.done();
            yield this.game.app.popState();
        });
        this.message = new Text_Text('you died!', { fontWeight: 'bold' });
        this.addChild(this.message);
        this.exitButton = new TextButton_TextButton('exit');
        this.exitButton.position.set((Width - 128) / 2, Height - 16 - 48);
        this.exitButton.on(TextButton_TextButton.Clicked, this.exit);
        this.addChild(this.exitButton);
    }
    layout(width, height) {
        this.position.set(Math.round((width - Width) / 2), Math.round((height - Height) / 2));
        super.layout(Width, Height);
        this.message.layout(Width, 128);
        this.exitButton.layout(128, 48);
    }
}

// CONCATENATED MODULE: ./src/app/game/overlays/index.ts




// CONCATENATED MODULE: ./src/app/game/overlays/MenuOverlay.ts
var MenuOverlay_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const MenuWidth = 800;
const MenuHeight = 600;
const SlotsPerRow = 8;
class MenuOverlay_MenuOverlay extends GameOverlay_GameOverlay {
    constructor(game) {
        super(game);
        this.tabs = [];
        this.saveButton = new TextButton_TextButton('save');
        this.exitButton = new TextButton_TextButton('exit');
        this.slotViews = [];
        this.trash = new SlotView_SlotView(this.game, { item: null, accepts: null });
        this.statNames = new StyledText_StyledText('', {
            default: { align: 'right', fontWeight: 'bold' },
            s: { fontSize: 12 }
        });
        this.statValues = new StyledText_StyledText('', {
            default: { align: 'left' },
            s: { fontSize: 12 },
            incr: { fill: '#d0d000' },
            decr: { fill: '#d00000' }
        });
        this.tabs.push(new Workbench_Workbench(game));
        this.tabs.push(new Alchemy_Alchemy(game));
        this.tabs.push(new Anvil_Anvil(game));
        this.tabs.push(new EnemyInfo_EnemyInfo(game));
        this.activeTab = this.tabs[0];
        this.activeTab.active = true;
        this.addChild(this.activeTab);
        const toolTip = new TextToolTip_TextToolTip(game.app, '', {});
        this.tabButtons = this.tabs.map(tab => {
            const btn = new Button_Button();
            const icon = new TextureSprite_TextureSprite(tab.icon);
            icon.scale.set(2, 2);
            btn.content.addChild(icon);
            this.addChild(btn);
            game.app.toolTip.add(btn, () => {
                toolTip.text = tab.name;
                return toolTip;
            });
            btn.on(Button_Button.Clicked, () => {
                if (this.activeTab === tab)
                    return;
                this.removeChild(this.activeTab);
                this.addChild(tab);
                this.activeTab.active = false;
                this.activeTab = tab;
                tab.active = true;
            });
            return btn;
        });
        const slots = game.player.traits.get(Inventory_Inventory).slots;
        for (const slot of slots) {
            const view = new SlotView_SlotView(this.game, slot);
            this.slotViews.push(view);
            this.content.addChild(view);
        }
        this.slotViews[40].bgOverlay.setTexture('sprites/ui/inv-slot-chestplate');
        this.slotViews[41].bgOverlay.setTexture('sprites/ui/inv-slot-leggings');
        this.slotViews[42].bgOverlay.setTexture('sprites/ui/inv-slot-boots');
        this.content.addChild(this.trash);
        this.trash.bgOverlay.setTexture('sprites/ui/inv-slot-trash');
        const stats = this.game.player.traits.get(Stats_Stats);
        this.stats = Stats_Stats.compute(stats);
        this.base = stats.base;
        this.content.addChild(this.statNames);
        this.content.addChild(this.statValues);
        this.content.addChild(this.saveButton);
        this.content.addChild(this.exitButton);
        this.saveButton.on(TextButton_TextButton.Clicked, this.save.bind(this));
        this.exitButton.on(TextButton_TextButton.Clicked, this.exit.bind(this));
    }
    layout(width, height) {
        this.position.set(Math.round((width - MenuWidth) / 2), Math.round((height - MenuHeight) / 2));
        super.layout(MenuWidth, MenuHeight);
        const slotLeft = 24, slotTop = 24;
        let x = 0, y = 0;
        for (const view of this.slotViews.slice(-3)) {
            view.position.set(slotLeft + (x + SlotsPerRow) * SlotView_SlotView.Size + 16, slotTop);
            view.layout();
            x++;
        }
        this.trash.position.set(slotLeft + (SlotsPerRow + 4) * SlotView_SlotView.Size + 16, slotTop);
        this.trash.layout();
        x = y = 0;
        for (const view of this.slotViews.slice(0, -3)) {
            view.position.set(slotLeft + x * SlotView_SlotView.Size, slotTop + y * SlotView_SlotView.Size + (y > 0 ? 16 : 0));
            view.layout();
            if (++x === SlotsPerRow) {
                x = 0;
                y++;
            }
        }
        this.statNames.position.set(slotLeft + SlotsPerRow * SlotView_SlotView.Size + 16, slotTop + SlotView_SlotView.Size + 16);
        this.statNames.layout(this.statNames.contentWidth, this.statNames.contentHeight);
        this.statValues.position.set(slotLeft + SlotsPerRow * SlotView_SlotView.Size + 16 + this.statNames.contentWidth, slotTop + SlotView_SlotView.Size + 16);
        this.statValues.layout(this.statValues.contentWidth, this.statValues.contentHeight);
        const buttonX = 24, buttonY = 336;
        x = buttonX;
        y = buttonY;
        for (let i = 0; i < this.tabs.length; i++) {
            const button = this.tabButtons[i];
            button.isEnabled = this.activeTab !== this.tabs[i];
            button.position.set(x, y);
            button.layout(50, 50);
            x += 50 + 16;
            if (x + 50 >= 256) {
                x = buttonX;
                y += 50 + 16;
            }
        }
        y += 50 + 16;
        x = buttonX;
        this.saveButton.position.set(x, y);
        this.saveButton.layout(96, 48);
        x += 96 + 16;
        this.exitButton.position.set(x, y);
        this.exitButton.layout(96, 48);
        this.activeTab.position.set(256, 336);
        this.activeTab.layout(MenuWidth - 256 - 16, MenuHeight - 336 - 16);
    }
    update(dt) {
        if (this.game.keyboard.isDown('Escape'))
            this.done();
        for (const view of this.slotViews)
            view.update(dt);
        this.trash.slot.item = null;
        this.trash.update(dt);
        this.updateStats();
        this.activeTab.update(dt);
    }
    updateStats() {
        function makeBonusText(base, computed) {
            const diff = computed - base;
            if (diff < 0)
                return `(<decr>${computed - base}</decr>)`;
            else if (diff > 0)
                return `(<incr>+${computed - base}</incr>)`;
            else
                return '';
        }
        this.statNames.text = `
hp<s> </s>
str<s> </s>
def<s> </s>
spd<s> </s>
vit<s> </s>
`.trim();
        this.statValues.text = `
<s> </s>${Math.ceil(this.stats.hp)} / ${this.stats.maxHp} ${makeBonusText(this.base.maxHp, this.stats.maxHp)}
<s> </s>${this.stats.str} ${makeBonusText(this.base.str, this.stats.str)}
<s> </s>${this.stats.def} ${makeBonusText(this.base.def, this.stats.def)}
<s> </s>${this.stats.spd} ${makeBonusText(this.base.spd, this.stats.spd)}
<s> </s>${this.stats.vit} ${makeBonusText(this.base.vit, this.stats.vit)}
`.trim();
    }
    save() {
        vex["dialog"].prompt({
            label: 'Save name (max 8 char.): ',
            value: this.game.data.id,
            callback: (name) => {
                if (name === false) {
                    this.game.app.view.focus();
                    return;
                }
                if (!name) {
                    vex["dialog"].alert({ content: 'Name is empty!', callback: () => this.game.app.view.focus() });
                    return;
                }
                else if (name.length > 8) {
                    vex["dialog"].alert({ content: 'Name is too long!', callback: () => this.game.app.view.focus() });
                    return;
                }
                for (const tab of this.tabs)
                    tab.dispose(false);
                this.game.save();
                this.game.data.id = name;
                localStorage[name] = this.game.data.export();
                vex["dialog"].alert({ content: `Saved as name '${name}'.`, callback: () => this.game.app.view.focus() });
            }
        });
    }
    exit() {
        return MenuOverlay_awaiter(this, void 0, void 0, function* () {
            yield this.done();
            yield this.game.app.popState();
        });
    }
    done() {
        const _super = name => super[name];
        return MenuOverlay_awaiter(this, void 0, void 0, function* () {
            this.game.app.dragDrop.cancel();
            for (const tab of this.tabs)
                tab.dispose(true);
            yield _super("done").call(this);
        });
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/PlayerInputTask.ts






class PlayerInputTask_PlayerInputTask extends Task {
    constructor(game) {
        super(game);
        this.direction = gl_matrix["b" /* vec2 */].create();
        this.vel = game.player.traits.get(Spatial_Spatial).velocity;
        this.stats = game.player.traits.get(Stats_Stats);
        this.statList = Stats_Stats.compute(this.stats);
    }
    update(dt) {
        if (Stats_Stats.canMove(this.stats)) {
            gl_matrix["b" /* vec2 */].set(this.direction, 0, 0);
            if (this.game.keyboard.isPressed('a'))
                this.direction[0]--;
            if (this.game.keyboard.isPressed('d'))
                this.direction[0]++;
            if (this.game.keyboard.isPressed('w'))
                this.direction[1]--;
            if (this.game.keyboard.isPressed('s'))
                this.direction[1]++;
            gl_matrix["b" /* vec2 */].normalize(this.direction, this.direction);
            gl_matrix["b" /* vec2 */].scale(this.vel, this.direction, tilePerSecond(this.statList.spd));
        }
        if (this.game.keyboard.isDown('Escape')) {
            this.game.app.pushState(new StateOverlay_StateOverlay(new MenuOverlay_MenuOverlay(this.game)));
        }
    }
}

// EXTERNAL MODULE: ./node_modules/rxjs/operators/filter.js
var filter = __webpack_require__(39);

// CONCATENATED MODULE: ./src/app/game/tasks/BehaviorTask.ts







class BehaviorTask_BehaviorTask extends Task {
    constructor(game) {
        super(game);
        this.spawn = ({ enemyType, position }) => {
            const enemyDef = Enemies[enemyType];
            const entity = Enemy_Enemy.make(this.game, enemyDef, position);
            this.game.entities.add(entity);
        };
        this.game.messages$.ofType(SpawnEnemy)
            .pipe(Object(filter["filter"])(msg => msg.enemyType !== 'dragon'))
            .subscribe(this.spawn);
    }
    update(dt) {
        for (const entity of this.game.entities.withTrait(Behavior_Behavior)) {
            const { behaviors } = entity.traits.get(Behavior_Behavior);
            BehaviorTree_BehaviorTree.run(entity, dt, behaviors);
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/behavior/genes.ts



function genes_random(min, max) {
    return Math.random() * (max - min) + min;
}
const Attacks = [
    // targeted
    (color) => Shoot_Shoot.make({
        type: Math.random() < 0.5 ? common_data["c" /* Weapon */].Type.Bolt : common_data["c" /* Weapon */].Type.Orb,
        pierce: true,
        strength: 5 + genes_random(-3, 5),
        cooldown: 5000 + genes_random(-2000, 2000),
        knockback: 10,
        range: 5 + genes_random(-2, 2),
        color
    }, [], 1000 + genes_random(-500, 1000), Math.floor(genes_random(1, 3)), genes_random(5, 20), genes_random(0, 10), Math.random() * 2000),
    // ring
    (color) => {
        let numShoots = Math.floor(genes_random(3, 6));
        return Shoot_Shoot.make({
            type: Math.random() < 0.5 ? common_data["c" /* Weapon */].Type.Bolt : common_data["c" /* Weapon */].Type.Orb,
            pierce: true,
            strength: 5 + genes_random(-3, 5),
            cooldown: 5000 + genes_random(-2000, 2000),
            knockback: 10,
            range: 5 + genes_random(-2, 2),
            color
        }, [], 1000 + genes_random(-500, 1000), numShoots, 360 / numShoots, genes_random(0, 10), Math.random() * 2000);
    },
];
const Movements = [
    () => Chase_Chase.make(),
    () => Charge_Charge.make(),
    () => Escape_Escape.make()
];
const Conditions = [
    () => HP_HP.greaterThan(genes_random(0.7, 0.9)),
    () => HP_HP.lessThan(genes_random(0.3, 0.4)),
    () => AtSpawn_AtSpawn.make(),
    () => Distance_Distance.greaterThan(genes_random(6, 10)),
    () => Distance_Distance.lessThan(genes_random(5, 8)),
];

// EXTERNAL MODULE: ./node_modules/lodash-es/sortBy.js + 5 modules
var sortBy = __webpack_require__(377);

// EXTERNAL MODULE: ./node_modules/lodash-es/shuffle.js + 6 modules
var shuffle = __webpack_require__(200);

// CONCATENATED MODULE: ./src/common/logic/genetic.ts

const genetic_BatchSize = 4;
const SelectionSize = 0.5;
function begin(algo) {
    return Object(times["a" /* default */])(genetic_BatchSize, () => algo.seed());
}
function nextGeneration(algo, batch) {
    // selection
    const parents = Object(sortBy["a" /* default */])(batch, instance => -algo.evaluate(instance))
        .slice(genetic_BatchSize * SelectionSize);
    // crossover
    const children = Object(times["a" /* default */])(genetic_BatchSize - parents.length, () => {
        const parentsCopys = parents.slice();
        const a = parentsCopys.splice(Math.floor(Math.random() * parentsCopys.length), 1)[0];
        const b = parentsCopys.splice(Math.floor(Math.random() * parentsCopys.length), 1)[0];
        return algo.crossover(a, b);
    });
    // mutation
    const newParents = parents.map(instance => algo.mutate(instance));
    return Object(shuffle["a" /* default */])([...newParents, ...children]);
}

// EXTERNAL MODULE: ./src/common/markov.ts + 2 modules
var markov = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/lodash-es/meanBy.js + 2 modules
var meanBy = __webpack_require__(42);

// CONCATENATED MODULE: ./src/app/game/tasks/DragonTask.ts















function randomRange(max) {
    return Math.floor(Math.random() * max);
}
const DragonDefTemplate = {
    dragonId: 0,
    maxDPS: 0,
    color: '',
    minPlayerHP: 100000,
    age: 0,
    score: 0,
    name: '',
    texture: Animations.Dragon,
    scale: 2,
    horizontalAnim: true,
    offset: [0, -1],
    behaviors: { activeStateIndex: -1, states: [] },
    drops: { numDrops: { type: 'constant', value: 0 }, items: [] },
    stats: {
        hp: 200,
        maxHp: 200,
        str: 10,
        def: 0,
        spd: 5,
        vit: 0
    }
};
function touchShoot() {
    return Shoot_Shoot.make({
        type: common_data["c" /* Weapon */].Type.Invisible,
        pierce: true,
        strength: 5,
        cooldown: 100,
        knockback: 10,
        range: 2,
        color: '0'
    }, [], 100);
}
class DragonTask_DragonTask extends Task {
    constructor(game) {
        super(game);
        this.thisGeneration = [];
        this.instancePool = [];
        this.spawn = ({ position }) => {
            if (this.instancePool.length === 0) {
                this.nextGen(nextGeneration(this, this.thisGeneration));
            }
            const def = this.instancePool.pop();
            const entity = Enemy_Enemy.make(this.game, def, position);
            this.game.entities.add(entity);
        };
        this.interval = 0;
        this.lastPlayerHP = -1;
        this.game.messages$.ofType(SpawnEnemy)
            .pipe(Object(filter["filter"])(msg => msg.enemyType === 'dragon'))
            .subscribe(this.spawn);
        this.data = this.game.data.custom.dragons || (this.game.data.custom.dragons = {
            dragons: [],
            nextId: 0
        });
        this.nextGen(begin(this));
    }
    nextGen(generation) {
        this.thisGeneration = generation.map(dragon => {
            dragon.dragonId = this.data.nextId++;
            this.computeDrops(dragon);
            this.data.dragons[dragon.dragonId] = dragon;
            return dragon;
        });
        this.instancePool = this.thisGeneration.slice();
    }
    update(dt) {
        this.interval -= dt;
        const playerHP = this.game.player.traits.get(Stats_Stats).base.hp;
        if (this.lastPlayerHP < 0)
            this.lastPlayerHP = playerHP;
        for (const enemy of this.game.entities.withTrait(EnemyData_EnemyData)) {
            const { def } = enemy.traits.get(EnemyData_EnemyData);
            const dragonId = def.dragonId;
            if (typeof dragonId !== 'number')
                continue;
            const dragonDef = this.data.dragons[dragonId];
            dragonDef.minPlayerHP = Math.min(dragonDef.minPlayerHP, playerHP);
            if (this.interval <= 0)
                dragonDef.maxDPS = Math.max(dragonDef.maxDPS, Math.max(0, this.lastPlayerHP - playerHP));
            dragonDef.age = enemy.age;
        }
        if (this.interval <= 0) {
            this.lastPlayerHP = playerHP;
            this.interval = 1000;
        }
    }
    makeRandomState(color) {
        const state = {
            condition: Conditions[Math.floor(Math.random() * Conditions.length)](),
            actions: []
        };
        const numAttacks = 1 + randomRange(2);
        for (let j = 0; j < numAttacks; j++)
            state.actions.push(Attacks[randomRange(Attacks.length)](color));
        state.actions.push(Movements[randomRange(Movements.length)]());
        // basic actions
        state.actions.push(touchShoot());
        state.actions.push(Wander_Wander.make());
        return state;
    }
    seed() {
        const color = Object(common_color["b" /* random */])({ type: 'uniform', min: 0.6, max: 0.8 }, { type: 'uniform', min: 0.6, max: 0.8 });
        const instance = Object(cloneDeep["a" /* default */])(DragonDefTemplate);
        instance.name = Object(markov["a" /* generateName */])(6, 12);
        instance.color = color;
        instance.texture = Object.assign({}, Animations.Dragon, { tint: color });
        for (let i = 0; i < 4; i++) {
            const state = this.makeRandomState(color);
            // first state is basic state
            if (i === 0)
                state.condition = HP_HP.greaterThan(0);
            instance.behaviors.states.push(state);
        }
        return instance;
    }
    evaluate(instance) {
        const dragonDef = this.data.dragons[instance.dragonId];
        const ageScore = Object(clamp["a" /* default */])(Math.abs(dragonDef.age - 60 * 1000) / 60000, 0, 1);
        const dpsScore = Object(clamp["a" /* default */])(Math.abs(dragonDef.maxDPS - 20) / 10, 0, 1);
        const hpScore = Object(clamp["a" /* default */])(Math.abs(dragonDef.minPlayerHP - 50) / 50, 0, 1);
        const finalScore = 1 - (ageScore + dpsScore + hpScore) / 3;
        console.log(`evaluate ${instance.dragonId}: ${finalScore}`);
        dragonDef.score = finalScore;
        return finalScore;
    }
    adjustStats(instances, target) {
        const ageScore = Object(clamp["a" /* default */])(Object(meanBy["a" /* default */])(instances, dragon => dragon.age - 60 * 1000) / 60000, -1, 1);
        const dpsScore = Object(clamp["a" /* default */])(Object(meanBy["a" /* default */])(instances, dragon => dragon.maxDPS - 20) / 10, -1, 1);
        const hpScore = Object(clamp["a" /* default */])(Object(meanBy["a" /* default */])(instances, dragon => dragon.minPlayerHP - 50) / 50, -1, 1);
        target.stats.maxHp = Object(meanBy["a" /* default */])(instances, dragon => dragon.stats.maxHp) * (1 - ageScore / 2);
        target.stats.hp = target.stats.maxHp;
        target.stats.str = Object(meanBy["a" /* default */])(instances, dragon => dragon.stats.str) * (1 - dpsScore / 2);
        target.stats.spd = Object(meanBy["a" /* default */])(instances, dragon => dragon.stats.spd) * (1 - hpScore / 2);
        console.log('stats', target.stats);
    }
    computeDrops(dragon) {
        const drops = {
            numDrops: { type: 'exponential', min: 3, max: 6, rate: 0.5 },
            items: []
        };
        const baseWeight = dragon.stats.maxHp / 2000 - dragon.stats.spd / 200 + Math.random() * 0.1;
        const baseToughness = dragon.stats.maxHp / 2000 + Math.random() * 0.1;
        const baseSharpness = dragon.stats.str / 100 + Math.random() * 0.1;
        const affinity = Object(clamp["a" /* default */])((dragon.stats.maxHp / 1000 + dragon.stats.spd / 100 + dragon.stats.str / 50) / 3, 0, 1);
        drops.items.push({
            prob: 0.3, item: {
                template: {
                    id: 'skin',
                    name: `Skin of ${dragon.name}`,
                    type: common_data["b" /* Item */].Type.Material,
                    texture: { type: 'single', tex: 'sprites/items/skin', tint: dragon.color },
                    material: {
                        name: dragon.name,
                        color: dragon.color,
                        weight: Object(clamp["a" /* default */])(baseWeight * 1, 0, 1),
                        toughness: Object(clamp["a" /* default */])(baseToughness * 1.5, 0, 1),
                        sharpness: Object(clamp["a" /* default */])(baseSharpness * 0.5, 0, 1),
                        affinity,
                    },
                },
                substs: []
            }
        }, {
            prob: 0.3, item: {
                template: {
                    id: 'bone',
                    name: `Bone of ${dragon.name}`,
                    type: common_data["b" /* Item */].Type.Material,
                    texture: { type: 'single', tex: 'sprites/items/bone', tint: dragon.color },
                    material: {
                        name: dragon.name,
                        color: dragon.color,
                        weight: Object(clamp["a" /* default */])(baseWeight * 1.5, 0, 1),
                        toughness: Object(clamp["a" /* default */])(baseToughness * 1.5, 0, 1),
                        sharpness: Object(clamp["a" /* default */])(baseSharpness * 1, 0, 1),
                        affinity,
                    },
                },
                substs: []
            }
        }, {
            prob: 0.2, item: {
                template: {
                    id: 'fang',
                    name: `Fang of ${dragon.name}`,
                    type: common_data["b" /* Item */].Type.Material,
                    texture: { type: 'single', tex: 'sprites/items/fang', tint: dragon.color },
                    material: {
                        name: dragon.name,
                        color: dragon.color,
                        weight: Object(clamp["a" /* default */])(baseWeight * 0.5, 0, 1),
                        toughness: Object(clamp["a" /* default */])(baseToughness * 0.5, 0, 1),
                        sharpness: Object(clamp["a" /* default */])(baseSharpness * 2, 0, 1),
                        affinity,
                    },
                },
                substs: []
            }
        }, {
            prob: 0.2, item: {
                template: {
                    id: 'scale',
                    name: `Scale of ${dragon.name}`,
                    type: common_data["b" /* Item */].Type.Material,
                    texture: { type: 'single', tex: 'sprites/items/scale', tint: dragon.color },
                    material: {
                        name: dragon.name,
                        color: dragon.color,
                        weight: Object(clamp["a" /* default */])(baseWeight * 0.5, 0, 1),
                        toughness: Object(clamp["a" /* default */])(baseToughness * 2, 0, 1),
                        sharpness: Object(clamp["a" /* default */])(baseSharpness * 1, 0, 1),
                        affinity,
                    },
                },
                substs: []
            }
        });
        dragon.drops = drops;
    }
    crossover(a, b) {
        console.log(`crossover: ${a.dragonId} ${b.dragonId}`);
        const newDragon = this.seed();
        const candidateStates = [
            ...Object(cloneDeep["a" /* default */])(a.behaviors.states.slice(1)),
            ...Object(cloneDeep["a" /* default */])(b.behaviors.states.slice(1))
        ];
        const states = Object(shuffle["a" /* default */])(candidateStates).slice(candidateStates.length / 2);
        newDragon.behaviors.states = [newDragon.behaviors.states[0], ...states];
        this.adjustStats([a, b], newDragon);
        return newDragon;
    }
    mutate(instance) {
        console.log(`mutate: ${instance.dragonId}`);
        const newDragon = this.seed();
        newDragon.behaviors = Object(cloneDeep["a" /* default */])(instance.behaviors);
        const stateIndex = Math.floor(Math.random() * (newDragon.behaviors.states.length + 1));
        if (stateIndex < newDragon.behaviors.states.length) {
            const state = newDragon.behaviors.states[stateIndex];
            state.condition = BehaviorTree_BehaviorTree.conditions.get(state.condition.type).mutate(state.condition);
            const actionIndex = Math.floor(Math.random() * state.actions.length);
            const action = state.actions[actionIndex];
            state.actions[actionIndex] = BehaviorTree_BehaviorTree.actions.get(action.type).mutate(action);
        }
        else {
            const state = this.makeRandomState(newDragon.color);
            instance.behaviors.states.push(state);
        }
        this.adjustStats([instance], newDragon);
        return newDragon;
    }
}

// CONCATENATED MODULE: ./src/app/utils/drops.ts

function generateDrops(dropTable) {
    const numDrops = Math.round(Object(random["c" /* randomValue */])(dropTable.numDrops));
    const drops = [];
    for (let i = 0; i < numDrops; i++) {
        let x = Math.random();
        for (const { prob, item } of dropTable.items) {
            x -= prob;
            if (x <= 0) {
                drops.push(Object(random["b" /* instantiate */])(item));
                break;
            }
        }
    }
    return drops;
}

// CONCATENATED MODULE: ./src/app/game/tasks/ProjectileTask.ts












const ObjectHPRegenInterval = 5000;
class ProjectileTask_ProjectileTask extends Task {
    constructor(game) {
        super(game);
        this.regenCooldown = 0;
        this.objectDamages = new Map();
        this.target = gl_matrix["b" /* vec2 */].create();
        this.tileCollided = ({ entityId, x, y }) => {
            const entity = this.game.entities.get(entityId);
            if (!entity)
                return;
            const projectile = entity.traits.get(ProjectileData_ProjectileData);
            if (!projectile)
                return;
            const tileObj = this.game.map.getObject(x, y);
            const tileObjDef = this.game.library.objects[tileObj];
            if (!tileObjDef)
                return;
            if (tileObjDef.drops && (projectile.weapon.type !== common_data["c" /* Weapon */].Type.Arrow || tileObjDef.obstacle)) {
                this.hitObject(projectile, x, y, tileObjDef);
            }
            if (tileObjDef.obstacle && !projectile.weapon.pierce) {
                entity.delete();
            }
        };
        this.objectCenter = gl_matrix["b" /* vec2 */].create();
        this.knockbackDirection = gl_matrix["b" /* vec2 */].create();
        this.entityCollided = ({ entityIdA, entityIdB }) => {
            const entityA = this.game.entities.get(entityIdA);
            const entityB = this.game.entities.get(entityIdB);
            if (!entityA || !entityB)
                return;
            let projectile, stats;
            let projectileEntity, targetEntity;
            if ((projectile = entityA.traits.get(ProjectileData_ProjectileData)) && (stats = entityB.traits.get(Stats_Stats))) {
                projectileEntity = entityA;
                targetEntity = entityB;
            }
            else if ((projectile = entityB.traits.get(ProjectileData_ProjectileData)) && (stats = entityA.traits.get(Stats_Stats))) {
                projectileEntity = entityB;
                targetEntity = entityA;
            }
            else
                return;
            const key = `${targetEntity.id}`;
            if (projectile.hit.has(key))
                return;
            else
                projectile.hit.add(key);
            // only hits opposing entities
            if (projectile.sourceEntityId !== this.game.player.id && targetEntity !== this.game.player)
                return;
            if (projectile.sourceEntityId === this.game.player.id && targetEntity === this.game.player)
                return;
            const effects = Object(cloneDeep["a" /* default */])(projectile.effects);
            // knockback
            if (!Stats_Stats.hasEffect(stats, data_effects["a" /* EffectDef */].Type.KnockbackResist)) {
                gl_matrix["b" /* vec2 */].sub(this.knockbackDirection, projectile.end, projectile.start);
                gl_matrix["b" /* vec2 */].normalize(this.knockbackDirection, this.knockbackDirection);
                if (projectile.weapon.type === common_data["c" /* Weapon */].Type.Sword)
                    gl_matrix["b" /* vec2 */].set(this.knockbackDirection, this.knockbackDirection[1], -this.knockbackDirection[0]);
                const { velocity: targetVel } = targetEntity.traits.get(Spatial_Spatial);
                gl_matrix["b" /* vec2 */].scale(targetVel, this.knockbackDirection, knockbackSpeed(projectile.weapon.knockback));
                effects.push(Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.Knockback, 0, 100));
            }
            const damage = Math.max(Math.ceil(projectile.damage * 0.1), projectile.damage - Stats_Stats.compute(stats).def);
            this.game.dispatch(new UpdateHP(targetEntity.id, -damage));
            this.game.dispatch(new ApplyEffects(targetEntity.id, effects));
            if (!projectile.weapon.pierce) {
                projectileEntity.delete();
            }
            if (projectile.sourceEntityId === this.game.player.id) {
                this.game.player.traits.get(PlayerData_PlayerData).lastAttackId = targetEntity.id;
            }
        };
        game.messages$.ofType(TileCollision).subscribe(this.tileCollided);
        game.messages$.ofType(EntityCollision).subscribe(this.entityCollided);
    }
    update(dt) {
        for (const entity of this.game.entities.withTrait(ProjectileData_ProjectileData)) {
            const projectile = entity.traits.get(ProjectileData_ProjectileData);
            if (entity.age >= projectile.lifetime) {
                entity.delete();
                continue;
            }
            const spatial = entity.traits.get(Spatial_Spatial);
            spatial.sprite.visible = entity.age > 100;
            // update velocity
            gl_matrix["b" /* vec2 */].sub(this.target, projectile.end, projectile.start);
            gl_matrix["b" /* vec2 */].scaleAndAdd(this.target, projectile.start, this.target, entity.age / projectile.lifetime);
            gl_matrix["b" /* vec2 */].sub(spatial.velocity, this.target, spatial.position);
            gl_matrix["b" /* vec2 */].scale(spatial.velocity, spatial.velocity, 1000 / dt);
        }
        this.regenCooldown += dt;
        if (this.regenCooldown >= ObjectHPRegenInterval) {
            for (const key of this.objectDamages.keys()) {
                const dmg = (this.objectDamages.get(key) || 0) - 1;
                if (dmg <= 0)
                    this.objectDamages.delete(key);
                else
                    this.objectDamages.set(key, dmg);
            }
            this.regenCooldown = 0;
        }
    }
    hitObject(projectile, x, y, obj) {
        const key = `${x}:${y}`;
        if (projectile.hit.has(key))
            return;
        else
            projectile.hit.add(key);
        const sprite = this.game.dispatch(new ObjectSpriteRequest(x, y)).sprite;
        gl_matrix["b" /* vec2 */].set(this.objectCenter, x + 0.5, y + 0.5);
        if (sprite) {
            gl_matrix["b" /* vec2 */].add(this.objectCenter, this.objectCenter, sprite.jitter);
            this.game.dispatch(new PlayFX.Shake(PlayFX.Type.Shake, sprite));
            this.game.dispatch(ShowParticles.splash(this.objectCenter, 20, parseInt(obj.color, 16), 0));
        }
        const damage = (this.objectDamages.get(key) || 0) + 1;
        const drops = obj.drops;
        if (damage <= drops.hp) {
            this.objectDamages.set(key, damage);
            return;
        }
        this.objectDamages.delete(key);
        for (const drop of generateDrops(drops.table)) {
            const itemDrop = ItemDrop_ItemDrop.make(this.game, drop, this.objectCenter);
            this.game.entities.add(itemDrop);
        }
        const replacement = drops.replaceWith;
        const id = replacement ?
            this.game.library.objects.find(obj => obj && obj.name === replacement).id :
            0;
        this.game.map.setObject(x, y, id);
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/EffectTask.ts




class EffectTask_EffectTask extends Task {
    constructor(game) {
        super(game);
        this.applyEffects = ({ entityId, effects }) => {
            const entity = this.game.entities.get(entityId);
            if (!entity)
                return;
            const stats = entity.traits.get(Stats_Stats);
            if (!stats)
                return;
            const entityEffects = stats.effects;
            // replace existing effect if duration of new effect is longer / stronger
            for (let i = 0; i < entityEffects.length; i++) {
                const { type, duration, power } = entityEffects[i];
                const effectIndex = effects.findIndex(effect => effect.type === type);
                if (effectIndex >= 0) {
                    if (effects[effectIndex].duration > duration || effects[effectIndex].power > power)
                        entityEffects[i] = effects[effectIndex];
                    effects.splice(effectIndex, 1);
                }
            }
            entityEffects.push(...effects);
        };
        this.game.messages$.ofType(ApplyEffects).subscribe(this.applyEffects);
    }
    update(dt) {
        for (const entity of this.game.entities.withTrait(Stats_Stats)) {
            const { base, boost, effects } = entity.traits.get(Stats_Stats);
            // reset boost stats, recalc each tick
            boost.hp = 0;
            boost.maxHp = 0;
            boost.str = 0;
            boost.def = 0;
            boost.spd = 0;
            boost.vit = 0;
            for (let i = effects.length - 1; i >= 0; i--) {
                const effect = effects[i];
                // when a second just elapsed
                const secEdge = (Math.floor(effect.duration / 1000) - Math.floor((effect.duration - dt) / 1000)) !== 0;
                this.applyEffect(effect, entity, base, boost, secEdge);
                effect.duration -= dt;
                if (effect.duration <= 0)
                    effects.splice(i, 1);
            }
        }
    }
    applyEffect(effect, entity, base, boost, secondEdge) {
        switch (effect.type) {
            case data_effects["a" /* EffectDef */].Type.Regen: if (!secondEdge)
                break;
            case data_effects["a" /* EffectDef */].Type.Heal:
                this.game.dispatch(new UpdateHP(entity.id, effect.power));
                break;
            case data_effects["a" /* EffectDef */].Type.Poison: if (!secondEdge)
                break;
            case data_effects["a" /* EffectDef */].Type.Damage:
                this.game.dispatch(new UpdateHP(entity.id, -effect.power));
                break;
            case data_effects["a" /* EffectDef */].Type.Resistance:
                boost.def += effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.DefBreak:
                boost.def -= effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.Speed:
                boost.spd += effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.Slowness:
                boost.spd -= effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.Strength:
                boost.str += effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.Weakness:
                boost.str -= effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.VitalityUp:
                boost.vit += effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.VitalityDown:
                boost.vit -= effect.power;
                break;
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/TerrainEffectTask.ts



class TerrainEffectTask_TerrainEffectTask extends Task {
    constructor() {
        super(...arguments);
        this.elapsed = 0;
    }
    update(dt) {
        const doDamage = (Math.floor(this.elapsed / 1000) - Math.floor((this.elapsed + dt) / 1000)) !== 0;
        this.elapsed += dt;
        for (const entity of this.game.entities.withTrait(Spatial_Spatial)) {
            const { position } = entity.traits.get(Spatial_Spatial);
            const float = entity.traits.get(Float_Float);
            if (float && float.z[0] > 0)
                continue;
            const stats = entity.traits.get(Stats_Stats);
            if (!stats)
                continue;
            const terrainId = this.game.map.getTerrain(position[0], position[1] + 0.5);
            const terrain = this.game.library.terrains[terrainId];
            if (!terrain)
                continue;
            if (terrain.speed) {
                stats.boost.spd += terrain.speed;
            }
            if (terrain.damage && doDamage) {
                this.game.dispatch(new UpdateHP(entity.id, -terrain.damage));
            }
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/EquipmentEffectTask.ts



class EquipmentEffectTask_EquipmentEffectTask extends Task {
    constructor(game) {
        super(game);
        this.runWhenPaused = true;
    }
    update(dt) {
        const { slots } = this.game.player.traits.get(Inventory_Inventory);
        const { bonus } = this.game.player.traits.get(Stats_Stats);
        // reset bonus stats, recalc each tick
        bonus.hp = 0;
        bonus.maxHp = 0;
        bonus.str = 0;
        bonus.def = 0;
        bonus.spd = 0;
        bonus.vit = 0;
        const equipments = slots.slice(40, 43);
        for (const { item } of equipments) {
            if (!item || !item.effects)
                continue;
            for (const effect of item.effects) {
                this.applyEffect(effect, bonus);
            }
        }
    }
    applyEffect(effect, boost) {
        switch (effect.type) {
            case data_effects["a" /* EffectDef */].Type.Resistance:
                boost.def += effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.DefBreak:
                boost.def -= effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.Speed:
                boost.spd += effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.Slowness:
                boost.spd -= effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.Strength:
                boost.str += effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.Weakness:
                boost.str -= effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.VitalityUp:
                boost.vit += effect.power;
                break;
            case data_effects["a" /* EffectDef */].Type.VitalityDown:
                boost.vit -= effect.power;
                break;
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/EntityHPTask.ts





class EntityHPTask_EntityHPTask extends Task {
    constructor(game) {
        super(game);
        this.updateHP = ({ entityId, hpDiff }) => {
            const entity = this.game.entities.get(entityId);
            if (!entity)
                return;
            const stats = entity.traits.get(Stats_Stats);
            if (!stats)
                return;
            const { maxHp } = Stats_Stats.compute(stats);
            stats.base.hp = Object(clamp["a" /* default */])(stats.base.hp + hpDiff, 0, maxHp);
            const position = entity.traits.get(Spatial_Spatial).position;
            if (stats.base.hp === 0)
                this.game.dispatch(ShowParticles.splash(position, 100, 0xff0000));
            else if (hpDiff > 0)
                this.game.dispatch(ShowParticles.float(position, 20, 0xffffff));
            else if (hpDiff < 0)
                this.game.dispatch(ShowParticles.splash(position, 20, 0xff0000));
            if (stats.base.hp === 0)
                this.game.dispatch(new Death(entity.id));
        };
        this.game.messages$.ofType(UpdateHP).subscribe(this.updateHP);
    }
    update(dt) {
        for (const entity of this.game.entities.withTrait(Stats_Stats)) {
            const stats = entity.traits.get(Stats_Stats);
            const { vit, maxHp } = Stats_Stats.compute(stats);
            if (stats.base.hp > 0)
                stats.base.hp = Object(clamp["a" /* default */])(stats.base.hp + healPerTick(vit), 0, maxHp);
        }
    }
}

// EXTERNAL MODULE: ./node_modules/@tweenjs/tween.js/src/Tween.js
var Tween = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/rxjs/observable/bindCallback.js
var bindCallback = __webpack_require__(104);

// CONCATENATED MODULE: ./src/app/utils/animations.ts


function fadeOut(obj) {
    return Object(bindCallback["bindCallback"])(callback => new Tween["Tween"](obj)
        .to({ alpha: 0 }, 250)
        .easing(Tween["Easing"].Quadratic.Out)
        .onComplete(callback)
        .start())();
}
function fadeIn(obj) {
    return Object(bindCallback["bindCallback"])(callback => new Tween["Tween"](obj)
        .to({ alpha: 1 }, 250)
        .easing(Tween["Easing"].Quadratic.In)
        .onComplete(callback)
        .start())();
}
function dir(dy, dx, left, right) {
    const angle = Math.atan2(dy, dx);
    if (Math.abs(angle) >= Math.PI * left)
        return 'left';
    else if (Math.abs(angle) < Math.PI * right)
        return 'right';
    else if (angle < 0)
        return 'up';
    else
        return 'down';
}
function animations_direction(dy, dx, type) {
    switch (type) {
        case 'movement': return dir(dy, dx, 3 / 5, 2 / 5);
        case 'attack': return dir(dy, dx, 3 / 4, 1 / 4);
        case 'horizontal': return dir(dy, dx, 1 / 2, 1 / 2);
    }
}

// CONCATENATED MODULE: ./src/app/utils/intersect.ts
/*
https://github.com/noonat/intersect/

Copyright (c) 2011 Nathan Ostgard http://nathanostgard.com

This software is provided 'as-is', without any express or implied
warranty.  In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.

3. This notice may not be removed or altered from any source distribution.
*/
const EPSILON = 1e-8;
function abs(value) {
    return value < 0 ? -value : value;
}
function intersect_clamp(value, min, max) {
    if (value < min) {
        return min;
    }
    else if (value > max) {
        return max;
    }
    else {
        return value;
    }
}
function sign(value) {
    return value < 0 ? -1 : 1;
}
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    clone() {
        return new Point(this.x, this.y);
    }
    normalize() {
        let length = this.x * this.x + this.y * this.y;
        if (length > 0) {
            length = Math.sqrt(length);
            const inverseLength = 1.0 / length;
            this.x *= inverseLength;
            this.y *= inverseLength;
        }
        else {
            this.x = 1;
            this.y = 0;
        }
        return length;
    }
}
class Hit {
    constructor(collider) {
        this.collider = collider;
        this.pos = new Point();
        this.delta = new Point();
        this.normal = new Point();
        this.time = 0;
    }
}
class Sweep {
    constructor() {
        this.hit = null;
        this.pos = new Point();
        this.time = 1;
    }
}
class AABB {
    constructor(pos, half) {
        this.pos = pos;
        this.half = half;
    }
    intersectPoint(point) {
        const dx = point.x - this.pos.x;
        const px = this.half.x - abs(dx);
        if (px <= 0) {
            return null;
        }
        const dy = point.y - this.pos.y;
        const py = this.half.y - abs(dy);
        if (py <= 0) {
            return null;
        }
        const hit = new Hit(this);
        if (px < py) {
            const sx = sign(dx);
            hit.delta.x = px * sx;
            hit.normal.x = sx;
            hit.pos.x = this.pos.x + (this.half.x * sx);
            hit.pos.y = point.y;
        }
        else {
            const sy = sign(dy);
            hit.delta.y = py * sy;
            hit.normal.y = sy;
            hit.pos.x = point.x;
            hit.pos.y = this.pos.y + (this.half.y * sy);
        }
        return hit;
    }
    intersectSegment(pos, delta, paddingX = 0, paddingY = 0) {
        const scaleX = 1.0 / delta.x;
        const scaleY = 1.0 / delta.y;
        const signX = sign(scaleX);
        const signY = sign(scaleY);
        const nearTimeX = (this.pos.x - signX * (this.half.x + paddingX) - pos.x) * scaleX;
        const nearTimeY = (this.pos.y - signY * (this.half.y + paddingY) - pos.y) * scaleY;
        const farTimeX = (this.pos.x + signX * (this.half.x + paddingX) - pos.x) * scaleX;
        const farTimeY = (this.pos.y + signY * (this.half.y + paddingY) - pos.y) * scaleY;
        if (nearTimeX > farTimeY || nearTimeY > farTimeX) {
            return null;
        }
        const nearTime = nearTimeX > nearTimeY ? nearTimeX : nearTimeY;
        const farTime = farTimeX < farTimeY ? farTimeX : farTimeY;
        if (nearTime >= 1 || farTime <= 0) {
            return null;
        }
        const hit = new Hit(this);
        hit.time = intersect_clamp(nearTime, 0, 1);
        if (nearTimeX > nearTimeY) {
            hit.normal.x = -signX;
            hit.normal.y = 0;
        }
        else {
            hit.normal.x = 0;
            hit.normal.y = -signY;
        }
        hit.delta.x = (1.0 - hit.time) * -delta.x;
        hit.delta.y = (1.0 - hit.time) * -delta.y;
        hit.pos.x = pos.x + delta.x * hit.time;
        hit.pos.y = pos.y + delta.y * hit.time;
        return hit;
    }
    intersectAABB(box) {
        const dx = box.pos.x - this.pos.x;
        const px = (box.half.x + this.half.x) - abs(dx);
        if (px <= 0) {
            return null;
        }
        const dy = box.pos.y - this.pos.y;
        const py = (box.half.y + this.half.y) - abs(dy);
        if (py <= 0) {
            return null;
        }
        const hit = new Hit(this);
        if (px < py) {
            const sx = sign(dx);
            hit.delta.x = px * sx;
            hit.normal.x = sx;
            hit.pos.x = this.pos.x + (this.half.x * sx);
            hit.pos.y = box.pos.y;
        }
        else {
            const sy = sign(dy);
            hit.delta.y = py * sy;
            hit.normal.y = sy;
            hit.pos.x = box.pos.x;
            hit.pos.y = this.pos.y + (this.half.y * sy);
        }
        return hit;
    }
    sweepAABB(box, delta) {
        const sweep = new Sweep();
        if (delta.x === 0 && delta.y === 0) {
            sweep.pos.x = box.pos.x;
            sweep.pos.y = box.pos.y;
            sweep.hit = this.intersectAABB(box);
            if (sweep.hit) {
                sweep.time = sweep.hit.time = 0;
            }
            else {
                sweep.time = 1;
            }
            return sweep;
        }
        sweep.hit = this.intersectSegment(box.pos, delta, box.half.x, box.half.y);
        if (sweep.hit) {
            sweep.time = intersect_clamp(sweep.hit.time - EPSILON, 0, 1);
            sweep.pos.x = box.pos.x + delta.x * sweep.time;
            sweep.pos.y = box.pos.y + delta.y * sweep.time;
            const direction = delta.clone();
            direction.normalize();
            sweep.hit.pos.x = intersect_clamp(sweep.hit.pos.x + direction.x * box.half.x, this.pos.x - this.half.x, this.pos.x + this.half.x);
            sweep.hit.pos.y = intersect_clamp(sweep.hit.pos.y + direction.y * box.half.y, this.pos.y - this.half.y, this.pos.y + this.half.y);
        }
        else {
            sweep.pos.x = box.pos.x + delta.x;
            sweep.pos.y = box.pos.y + delta.y;
            sweep.time = 1;
        }
        return sweep;
    }
    sweepInto(staticColliders, delta) {
        let nearest = new Sweep();
        nearest.time = 1;
        nearest.pos.x = this.pos.x + delta.x;
        nearest.pos.y = this.pos.y + delta.y;
        for (let i = 0, il = staticColliders.length; i < il; i++) {
            const sweep = staticColliders[i].sweepAABB(this, delta);
            if (sweep.time < nearest.time) {
                nearest = sweep;
            }
        }
        return nearest;
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/EntityMovementTask.ts






const Gravity = -10;
const StaticThreshold = 0.5;
const EntitySizeExtent = 5;
function EntityMovementTask_pt(x, y) { return new Point(x, y); }
class EntityMovementTask_TileAABB extends AABB {
    constructor(x, y, objectDef) {
        super(EntityMovementTask_pt(x + 0.5, y), (!objectDef || objectDef.terrain) ? EntityMovementTask_pt(0.5, 0.5) : EntityMovementTask_pt(0.4, 0.4));
        this.x = x;
        this.y = y;
        this.obstacle = !objectDef || (!!objectDef.obstacle);
    }
}
class EntityMovementTask_EntityAABB extends AABB {
    constructor(entity) {
        const { position } = entity.traits.get(Spatial_Spatial);
        const { size, mass } = entity.traits.get(Collidable_Collidable);
        super(EntityMovementTask_pt(position[0], position[1]), EntityMovementTask_pt(size[0], size[1]));
        this.entity = entity;
        this.obstacle = mass > 0;
    }
    update() {
        const { position } = this.entity.traits.get(Spatial_Spatial);
        const { size } = this.entity.traits.get(Collidable_Collidable);
        this.pos.x = position[0];
        this.pos.y = position[1];
        this.half.x = size[0];
        this.half.y = size[1];
    }
}
class EntityMovementTask_EntityMovementTask extends Task {
    constructor() {
        super(...arguments);
        this.vel = gl_matrix["b" /* vec2 */].create();
        this.collisions = new Set();
        this.entityAABBMap = new Map();
        this.entityAABBs = [];
        this.collidedAABBs = new Map();
    }
    update(dt) {
        const t = dt / 1000;
        for (const id of this.entityAABBMap.keys()) {
            if (!this.game.entities.get(id))
                this.entityAABBMap.delete(id);
        }
        for (const entity of this.game.entities.withTrait(Collidable_Collidable)) {
            let aabb = this.entityAABBMap.get(entity.id);
            if (!aabb)
                this.entityAABBMap.set(entity.id, aabb = new EntityMovementTask_EntityAABB(entity));
            else
                aabb.update();
            this.entityAABBs.push(aabb);
        }
        const objects = [];
        for (const entity of this.game.entities.withTrait(Spatial_Spatial)) {
            const { position, sprite, velocity, horizontalAnim } = entity.traits.get(Spatial_Spatial);
            const stats = entity.traits.get(Stats_Stats);
            gl_matrix["b" /* vec2 */].scale(this.vel, velocity, dt / 1000);
            const collidable = entity.traits.get(Collidable_Collidable);
            let hits;
            if (collidable) {
                this.getAABBs(position, entity, objects);
                const shape = this.entityAABBMap.get(entity.id) || new EntityMovementTask_EntityAABB(entity);
                hits = this.resolve(objects, shape);
                objects.length = 0;
                gl_matrix["b" /* vec2 */].set(position, shape.pos.x, shape.pos.y);
            }
            else {
                gl_matrix["b" /* vec2 */].add(position, position, this.vel);
                hits = [];
            }
            if (stats && Stats_Stats.canMove(stats))
                this.updateDisplay(velocity, this.vel, sprite, horizontalAnim);
            const float = entity.traits.get(Float_Float);
            if (float && float.gravity) {
                float.z[0] += float.z[1] * t + 0.5 * Gravity * t * t;
                float.z[1] += Gravity * t;
                if (float.z[0] < StaticThreshold * 0.1) {
                    gl_matrix["b" /* vec2 */].set(float.z, 0, 0);
                    gl_matrix["b" /* vec2 */].set(velocity, 0, 0);
                }
            }
            else if (!float || float.z[0] === 0) {
                if (this.vel[0] === 0)
                    velocity[0] = 0;
                if (this.vel[1] === 0)
                    velocity[1] = 0;
                gl_matrix["b" /* vec2 */].scale(velocity, velocity, Math.pow(0.5, t));
                if (Math.abs(velocity[0]) < StaticThreshold)
                    velocity[0] = 0;
                if (Math.abs(velocity[1]) < StaticThreshold)
                    velocity[1] = 0;
            }
            for (const collider of hits) {
                if (collider instanceof EntityMovementTask_EntityAABB)
                    this.entityCollided(entity, collider.entity);
                else if (collider instanceof EntityMovementTask_TileAABB)
                    this.tileCollided(entity, collider.x, collider.y);
            }
        }
        this.collisions.clear();
        this.entityAABBs.length = 0;
    }
    getAABBs(position, exclude, aabbs) {
        const map = this.game.map;
        const lib = this.game.library;
        const left = Math.floor(Math.min(position[0] + this.vel[0], position[0])) - 1;
        const right = Math.ceil(Math.max(position[0] + this.vel[0], position[0])) + 1;
        const top = Math.floor(Math.min(position[1] + this.vel[1], position[1])) - 1;
        const bottom = Math.ceil(Math.max(position[1] + this.vel[1], position[1])) + 1;
        for (let y = top; y <= bottom; y++)
            for (let x = left; x <= right; x++) {
                const terrainDef = lib.terrains[map.getTerrain(x, y)];
                if (!terrainDef) {
                    aabbs.push(new EntityMovementTask_TileAABB(x, y));
                }
                const objectDef = lib.objects[map.getObject(x, y)];
                if (objectDef && objectDef.collidable)
                    aabbs.push(new EntityMovementTask_TileAABB(x, y, objectDef));
            }
        for (const aabb of this.entityAABBs) {
            if (aabb.entity === exclude)
                continue;
            if (aabb.pos.x < left - EntitySizeExtent || aabb.pos.y > right + EntitySizeExtent ||
                aabb.pos.x < top - EntitySizeExtent || aabb.pos.y > bottom + EntitySizeExtent)
                continue;
            aabbs.push(aabb);
        }
    }
    resolve(objects, self) {
        const performSweep = (delta) => {
            let nearest = new Sweep();
            nearest.time = 1;
            nearest.pos.x = self.pos.x + delta.x;
            nearest.pos.y = self.pos.y + delta.y;
            for (const obj of objects) {
                const sweep = obj.sweepAABB(self, delta);
                if (sweep.hit && sweep.time < nearest.time) {
                    this.collidedAABBs.set(obj, sweep.time);
                    if (!obj.obstacle)
                        continue;
                    nearest = sweep;
                }
            }
            return nearest;
        };
        const resolveSweep = (sweep) => {
            if (sweep.hit && sweep.hit.time > 0) {
                const collider = sweep.hit.collider;
                if (sweep.hit.normal.x !== 0)
                    sweep.pos.x = collider.pos.x + (collider.half.x + self.half.x + EPSILON) * sweep.hit.normal.x;
                if (sweep.hit.normal.y !== 0)
                    sweep.pos.y = collider.pos.y + (collider.half.y + self.half.y + EPSILON) * sweep.hit.normal.y;
                gl_matrix["b" /* vec2 */].mul(this.vel, this.vel, [1 - Math.abs(sweep.hit.normal.x), 1 - Math.abs(sweep.hit.normal.y)]);
            }
            else if (sweep.hit) {
                sweep.pos.x += sweep.hit.delta.x;
                sweep.pos.y += sweep.hit.delta.y;
            }
            self.pos = sweep.pos;
        };
        let collisionTime;
        if (!self.obstacle) {
            // no collision resolution for non-obstacles
            const sweep = performSweep(EntityMovementTask_pt(this.vel[0], this.vel[1]));
            self.pos.x += this.vel[0];
            self.pos.y += this.vel[1];
            collisionTime = sweep.time;
        }
        else {
            const sweepX = performSweep(EntityMovementTask_pt(this.vel[0], 0));
            const sweepY = performSweep(EntityMovementTask_pt(0, this.vel[1]));
            const maxSweep = sweepX.time > sweepY.time ? sweepX : sweepY;
            resolveSweep(maxSweep);
            const nextVel = sweepX.time > sweepY.time ? EntityMovementTask_pt(0, this.vel[1]) : EntityMovementTask_pt(this.vel[0], 0);
            const sweepFinal = performSweep(nextVel);
            resolveSweep(sweepFinal);
            collisionTime = Math.min(sweepX.time, sweepY.time);
        }
        const hit = [...this.collidedAABBs].filter(([, time]) => time <= collisionTime).map(([collider]) => collider);
        this.collidedAABBs.clear();
        return hit;
    }
    tileCollided(entity, x, y) {
        const key = `${entity.id}:${x},${y}`;
        if (this.collisions.has(key))
            return;
        this.collisions.add(key);
        this.game.dispatch(new TileCollision(entity.id, x, y));
    }
    entityCollided(a, b) {
        const aId = Math.min(a.id, b.id), bId = Math.max(a.id, b.id);
        const key = `${aId}:${bId}`;
        if (this.collisions.has(key))
            return;
        this.collisions.add(key);
        this.game.dispatch(new EntityCollision(aId, bId));
    }
    updateDisplay(intendedVel, actualVel, sprite, horizontal) {
        if (!sprite.animName)
            sprite.animName = horizontal ? 'left' : 'down';
        sprite.still = actualVel[0] === 0 && actualVel[1] === 0;
        if (intendedVel[0] !== 0 || intendedVel[1] !== 0) {
            sprite.animName = animations_direction(intendedVel[1], intendedVel[0], horizontal ? 'horizontal' : 'movement');
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/DeathTask.ts







class DeathTask_DeathTask extends Task {
    constructor(game) {
        super(game);
        this.death = ({ entityId }) => {
            const entity = this.game.entities.get(entityId);
            if (!entity)
                return;
            const enemy = entity.traits.get(EnemyData_EnemyData);
            if (enemy) {
                const { position } = entity.traits.get(Spatial_Spatial);
                for (const drop of generateDrops(enemy.def.drops)) {
                    const itemDrop = ItemDrop_ItemDrop.make(this.game, drop, position);
                    this.game.entities.add(itemDrop);
                }
                entity.delete();
                return;
            }
            const player = entity.traits.get(PlayerData_PlayerData);
            if (player) {
                this.game.app.pushState(new StateOverlay_StateOverlay(new DeathOverlay_DeathOverlay(this.game)));
            }
        };
        this.game.messages$.ofType(Death).subscribe(this.death);
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/UseItemTask.ts










const ConsumeCooldown = 1000;
const FistRange = 2.5;
class UseItemTask_UseItemTask extends Task {
    constructor(game) {
        super(game);
        this.type = null;
        this.cursorPos = new lib["Point"]();
        this.coords = gl_matrix["b" /* vec2 */].create();
        this.direction = gl_matrix["b" /* vec2 */].create();
        this.data = game.player.traits.get(PlayerData_PlayerData);
        this.stats = game.player.traits.get(Stats_Stats);
        ({
            position: this.playerPos,
            velocity: this.playerVel,
            sprite: this.playerSprite
        } = game.player.traits.get(Spatial_Spatial));
        this.inventory = game.player.traits.get(Inventory_Inventory).slots;
        const handler = (e) => {
            if (e.data.originalEvent.target !== this.game.app.view) {
                this.type = null;
                return;
            }
            e.data.getLocalPosition(this.game.view.camera, this.cursorPos);
            if ((e.data.buttons & 1) !== 0)
                this.type = 'attack';
            else if ((e.data.buttons & 2) !== 0)
                this.type = 'interact';
            else
                this.type = null;
        };
        game.view.camera.on('pointermove', handler);
        game.view.camera.on('pointerdown', handler);
        game.view.camera.on('pointerup', handler);
        game.view.camera.on('pointerupoutside', handler);
    }
    update(dt) {
        this.data.consumeCooldown = Math.max(0, this.data.consumeCooldown - dt);
        this.data.attackCooldown = Math.max(0, this.data.attackCooldown - dt);
        if (!this.type)
            return;
        const { hotbarSelection } = this.game.player.traits.get(PlayerData_PlayerData);
        const slot = this.inventory[hotbarSelection];
        if (this.type === 'interact') {
            this.interact(slot);
        }
        else if (this.type === 'attack') {
            this.attack(slot);
        }
    }
    interact(slot) {
        if (slot.item && slot.item.type === common_data["b" /* Item */].Type.Consumable) {
            if (this.data.consumeCooldown > 0)
                return;
            this.consumeItem(slot.item);
            slot.item = null;
            this.game.dispatch(new InventoryUpdated(slot));
        }
    }
    consumeItem(item) {
        if (item.effects && item.effects.length > 0) {
            const effects = Object(cloneDeep["a" /* default */])(item.effects);
            this.game.dispatch(new ApplyEffects(this.game.player.id, effects));
            this.data.consumeCooldown = ConsumeCooldown;
        }
    }
    attack(slot) {
        if (this.data.attackCooldown > 0)
            return;
        if (Stats_Stats.hasEffect(this.stats, data_effects["a" /* EffectDef */].Type.Stunned))
            return;
        let item = slot.item;
        // arrow is treated as fist attack
        let weapon = item && item.weapon && item.weapon.type !== common_data["c" /* Weapon */].Type.Arrow ? item.weapon : {
            type: common_data["c" /* Weapon */].Type.Fist,
            strength: 5,
            cooldown: 0,
            knockback: 2.5,
            range: FistRange,
            color: 'ffffff'
        };
        if (weapon.type === common_data["c" /* Weapon */].Type.Bow) {
            let arrow;
            for (const slot of this.inventory) {
                const item = slot.item;
                if (item && item.weapon && item.weapon.type === common_data["c" /* Weapon */].Type.Arrow) {
                    arrow = item;
                    slot.item = null;
                    this.game.dispatch(new InventoryUpdated(slot));
                    break;
                }
            }
            if (!arrow)
                return;
            item = arrow;
            weapon = {
                type: common_data["c" /* Weapon */].Type.Arrow,
                strength: weapon.strength + arrow.weapon.strength,
                cooldown: weapon.cooldown + arrow.weapon.cooldown,
                knockback: weapon.knockback + arrow.weapon.knockback,
                range: weapon.range + arrow.weapon.range,
                color: arrow.weapon.color
            };
        }
        let duration = 500;
        if (weapon.type === common_data["c" /* Weapon */].Type.Spear)
            duration = Math.min(1000, weapon.cooldown);
        else if (weapon.type !== common_data["c" /* Weapon */].Type.Fist)
            duration = Math.min(500, weapon.cooldown);
        let effects = [];
        if (item && item.weapon && item.material && item.material.affinity > Math.random())
            effects = item.effects || [];
        this.game.view.camera.toMapCoords(this.cursorPos, this.coords);
        gl_matrix["b" /* vec2 */].sub(this.direction, this.coords, this.playerPos);
        if (weapon.type === common_data["c" /* Weapon */].Type.Fist && gl_matrix["b" /* vec2 */].length(this.direction) > weapon.range) {
            // no out of range fist attack
            return;
        }
        gl_matrix["b" /* vec2 */].normalize(this.direction, this.direction);
        const animDirection = animations_direction(this.direction[1], this.direction[0], 'attack');
        const animName = `${weapon.type}-${animDirection}`;
        this.playerSprite.animName = animDirection;
        this.playerSprite.playActionAnim(animName, duration);
        this.game.dispatch(new Attack(this.game.player.id, weapon, this.coords, effects));
        gl_matrix["b" /* vec2 */].set(this.playerVel, 0, 0);
        this.data.attackCooldown = weapon.cooldown || 500;
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/AttackTask.ts








class AttackTask_AttackTask extends Task {
    constructor(game) {
        super(game);
        this.direction = gl_matrix["b" /* vec2 */].create();
        this.start = gl_matrix["b" /* vec2 */].create();
        this.end = gl_matrix["b" /* vec2 */].create();
        this.attack = ({ entityId, weapon, targetPosition, effects, duration }) => {
            const entity = this.game.entities.get(entityId);
            if (!entity)
                return;
            const { position } = entity.traits.get(Spatial_Spatial);
            gl_matrix["b" /* vec2 */].sub(this.direction, targetPosition, position);
            let stunDuration;
            if (weapon.type === common_data["c" /* Weapon */].Type.Fist) {
                gl_matrix["b" /* vec2 */].scaleAndAdd(this.start, targetPosition, this.direction, -0.5);
                gl_matrix["b" /* vec2 */].copy(this.end, targetPosition);
                const projectile = Projectile_Projectile.make(this.game, entityId, weapon, effects, this.start, this.end, 100, 'sprites/projectiles/invisible');
                this.game.entities.add(projectile);
                stunDuration = 500;
            }
            else {
                if (weapon.type === common_data["c" /* Weapon */].Type.Sword) {
                    if (gl_matrix["b" /* vec2 */].length(this.direction) > weapon.range) {
                        gl_matrix["b" /* vec2 */].normalize(this.direction, this.direction);
                        gl_matrix["b" /* vec2 */].scaleAndAdd(targetPosition, position, this.direction, weapon.range);
                    }
                    else {
                        gl_matrix["b" /* vec2 */].normalize(this.direction, this.direction);
                    }
                    gl_matrix["b" /* vec2 */].scaleAndAdd(this.start, targetPosition, [this.direction[1], -this.direction[0]], 1);
                    gl_matrix["b" /* vec2 */].scaleAndAdd(this.end, targetPosition, [-this.direction[1], this.direction[0]], 1);
                    duration = duration || 250;
                }
                else {
                    gl_matrix["b" /* vec2 */].normalize(this.direction, this.direction);
                    gl_matrix["b" /* vec2 */].copy(this.start, position);
                    gl_matrix["b" /* vec2 */].scaleAndAdd(this.end, this.start, this.direction, weapon.range);
                    duration = duration || 500;
                }
                stunDuration = Math.min(weapon.type === common_data["c" /* Weapon */].Type.Spear ? 1000 : 500, weapon.cooldown);
                const projectile = Projectile_Projectile.make(this.game, entityId, weapon, effects, this.start, this.end, duration, `sprites/projectiles/${weapon.type}`);
                this.game.entities.add(projectile);
            }
            if (entity === this.game.player) {
                // TODO: stun + knockback can cause extra long knockback
                this.game.dispatch(new ApplyEffects(entity.id, [
                    Object(common["b" /* makeEffect */])(data_effects["a" /* EffectDef */].Type.Stunned, 0, stunDuration)
                ]));
            }
        };
        game.messages$.ofType(Attack).subscribe(this.attack);
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/InventoryTask.ts





const MinInteractAge = 350;
class InventoryTask_InventoryTask extends Task {
    constructor(game) {
        super(game);
        this.runWhenPaused = true;
        this.entityCollided = ({ entityIdA, entityIdB }) => {
            const entityA = this.game.entities.get(entityIdA);
            const entityB = this.game.entities.get(entityIdB);
            let item;
            if (entityA instanceof ItemDrop_ItemDrop && entityB === this.game.player) {
                item = entityA;
            }
            else if (entityA === this.game.player && entityB instanceof ItemDrop_ItemDrop) {
                item = entityB;
            }
            else
                return;
            if (item.age >= MinInteractAge && this.pickUp(item.traits.get(Inventory_Inventory).slots[0].item))
                item.delete();
        };
        this.swapInventory = (swap) => {
            const { slotA, slotB } = swap;
            if (!this.acceptable(slotA.item, slotB.accepts) || !this.acceptable(slotB.item, slotA.accepts))
                return;
            const tmp = slotB.item;
            slotB.item = slotA.item;
            slotA.item = tmp;
            this.game.dispatch(new InventoryUpdated(slotA));
            this.game.dispatch(new InventoryUpdated(slotB));
        };
        game.messages$.ofType(InventorySwap).subscribe(this.swapInventory);
        game.messages$.ofType(EntityCollision).subscribe(this.entityCollided);
        this.playerPos = game.player.traits.get(Spatial_Spatial).position;
        this.playerInv = game.player.traits.get(Inventory_Inventory).slots;
    }
    update(dt) {
        for (const itemDrop of this.game.entities.ofType(ItemDrop_ItemDrop)) {
            const { slots } = itemDrop.traits.get(Inventory_Inventory);
            if (!this.canPickUp(slots[0].item))
                continue;
            const spatial = itemDrop.traits.get(Spatial_Spatial);
            const d = gl_matrix["b" /* vec2 */].dist(spatial.position, this.playerPos);
            if (itemDrop.age >= MinInteractAge && d > 0.5 && d < 3.5) {
                // magnet (faster if nearer)
                gl_matrix["b" /* vec2 */].sub(spatial.velocity, this.playerPos, spatial.position);
                const len = gl_matrix["b" /* vec2 */].len(spatial.velocity);
                gl_matrix["b" /* vec2 */].normalize(spatial.velocity, spatial.velocity);
                gl_matrix["b" /* vec2 */].scale(spatial.velocity, spatial.velocity, 5 / (len * len));
            }
        }
    }
    acceptable(item, accepts) {
        if (!item || !accepts)
            return true;
        if (typeof accepts === 'string')
            return !!item.id.match(accepts);
        else
            return accepts.indexOf(item.type) >= 0;
    }
    canPickUp(item) {
        for (const slot of this.playerInv) {
            if (slot.item)
                continue;
            if (this.acceptable(item, slot.accepts))
                return true;
        }
        return false;
    }
    pickUp(item) {
        for (const slot of this.playerInv) {
            if (slot.item)
                continue;
            if (!this.acceptable(item, slot.accepts))
                continue;
            slot.item = item;
            this.game.dispatch(new InventoryUpdated(slot));
            return true;
        }
        return false;
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/CameraUpdateTask.ts




class CameraUpdateTask_CameraUpdateTask extends Task {
    constructor(game) {
        super(game);
        this.runWhenPaused = true;
        this.cameraOffset = gl_matrix["b" /* vec2 */].create();
        this.position = game.player.traits.get(Spatial_Spatial).position;
    }
    update(dt) {
        gl_matrix["b" /* vec2 */].scale(this.cameraOffset, this.position, DisplayTileSize);
        gl_matrix["b" /* vec2 */].floor(this.game.view.camera.offset, this.cameraOffset);
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/TerrainDisplayTask.ts






const TileSize = 16;
class TerrainDisplayTask_TerrainDisplayTask extends Task {
    constructor(game) {
        super(game);
        this.runWhenPaused = true;
        this.sprites = new Map();
        this.container = new lib["Container"]();
        this.renderTex = lib["RenderTexture"].create(1, 1, lib["SCALE_MODES"].NEAREST);
        this.view = Object.assign(new lib["Sprite"](this.renderTex), {
            layer: Camera_Camera.Layer.Terrain,
            sortOffset: gl_matrix["b" /* vec2 */].fromValues(0, 0)
        });
        this.elapsed = 0;
        this.game.view.camera.add(this.view);
    }
    update(dt) {
        this.updateVisibility();
        this.updateSprites(dt);
        this.render();
    }
    updateVisibility() {
        const { offset: [x, y], viewWidth: w, viewHeight: h } = this.game.view.camera;
        const r = Math.ceil(Math.sqrt(w * w + h * h) / 2 + DisplayTileSize);
        const origin = gl_matrix["b" /* vec2 */].fromValues(x, y);
        const scale = DisplayTileSize / TileSize;
        function isVisible(x, y) {
            const dx = x * scale - origin[0], dy = y * scale - origin[1];
            return (dx * dx + dy * dy) <= r * r;
        }
        const removePool = [];
        for (const [key, sprite] of this.sprites) {
            const { x, y } = sprite.transform.position;
            if (!isVisible(x, y)) {
                removePool.push(sprite);
                this.sprites.delete(key);
            }
        }
        const map = this.game.map;
        const left = Math.max(0, Math.floor((x - r) / DisplayTileSize));
        const right = Math.min(map.width - 1, Math.ceil((x + r) / DisplayTileSize));
        const top = Math.max(0, Math.floor((y - r) / DisplayTileSize));
        const bottom = Math.min(map.height - 1, Math.ceil((y + r) / DisplayTileSize));
        const terrainData = this.game.library.terrains;
        for (let x = left; x <= right; x++)
            for (let y = top; y <= bottom; y++) {
                const terrain = terrainData[map.getTerrain(x, y)];
                if (!terrain)
                    continue;
                const tx = x * TileSize;
                const ty = y * TileSize;
                if (!isVisible(tx, ty))
                    continue;
                const key = `${x}:${y}`;
                if (this.sprites.has(key))
                    continue;
                const sprite = removePool.pop() || new TextureSprite_TextureSprite();
                sprite.setTexture(terrain.texture, x + y * map.width);
                sprite.position.set(tx, ty);
                if (!sprite.parent)
                    this.container.addChild(sprite);
                this.sprites.set(key, sprite);
            }
        for (const sprite of removePool)
            this.container.removeChild(sprite);
    }
    updateSprites(dt) {
        this.elapsed += dt;
        for (const sprite of this.container.children)
            sprite.update(this.elapsed);
    }
    render() {
        const { offset: [x, y], viewWidth: w, viewHeight: h } = this.game.view.camera;
        const r = Math.ceil(Math.sqrt(w * w + h * h));
        let minX = Number.MAX_VALUE, minY = Number.MAX_VALUE;
        for (const sprite of this.sprites.values()) {
            const { x, y } = sprite.transform.position;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
        }
        this.container.setTransform(-minX, -minY);
        const length = Math.ceil(r / DisplayTileSize) * TileSize * 2;
        const texSize = 1 << (32 - Math.clz32(length - 1));
        this.renderTex.resize(texSize, texSize);
        this.game.app.renderer.render(this.container, this.renderTex);
        const scale = DisplayTileSize / TileSize;
        this.view.setTransform((minX * scale - x + w / 2), (minY * scale - y + h / 2), scale, scale);
    }
}

// EXTERNAL MODULE: ./src/common/noise/index.ts + 2 modules
var noise = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/random-seed/index.js
var random_seed = __webpack_require__(40);

// CONCATENATED MODULE: ./src/app/game/tasks/ObjectDisplayTask.ts








const ObjectSize = 32;
const MarginSize = 5;
class ObjectDisplayTask_ObjectSprite extends TextureSprite_TextureSprite {
    constructor(game) {
        super();
        this.game = game;
        this.jitter = gl_matrix["b" /* vec2 */].fromValues(0, 0);
        this.sortOffset = gl_matrix["b" /* vec2 */].fromValues(0, 0);
        this.layer = Camera_Camera.Layer.Objects;
        this.coords = gl_matrix["b" /* vec2 */].fromValues(-1, -1);
        this.outline = true;
        this.anchor.set(0.5, 1);
    }
    setTile(x, y, obj) {
        gl_matrix["b" /* vec2 */].set(this.coords, x, y);
        this.layer = obj.terrain ? Camera_Camera.Layer.Terrain : Camera_Camera.Layer.Objects;
        this.setTexture(obj.texture, x + y * this.game.map.width);
        this.interactive = obj.interactive || false;
        const scale = (obj.scale || 1) * DisplayTileSize / ObjectSize;
        this.scale.set(scale, scale);
    }
}
function tileKey(x, y) {
    return `${x}:${y}`;
}
class ObjectDisplayTask_ObjectDisplayTask extends Task {
    constructor(game) {
        super(game);
        this.runWhenPaused = true;
        this.sprites = new Map();
        this.elapsed = 0;
        this.spriteCoords = gl_matrix["b" /* vec2 */].create();
        const rand = Object(random_seed["create"])(this.game.map.props.seed);
        this.jitterNoiseX = new noise["a" /* Noise */](rand, 1, 1);
        this.jitterNoiseY = new noise["a" /* Noise */](rand, 1, 1);
        this.game.map.changes$.subscribe(({ x, y }) => {
            const key = tileKey(x, y);
            const sprite = this.sprites.get(key);
            if (sprite) {
                this.game.view.camera.removeChild(sprite);
                this.sprites.delete(key);
            }
        });
        this.game.messages$.ofType(ObjectSpriteRequest).subscribe(request => {
            request.sprite = this.sprites.get(tileKey(request.x, request.y));
        });
    }
    update(dt) {
        this.updateVisibility();
        this.updateSprites(dt);
        this.updateTransforms();
    }
    updateVisibility() {
        const { offset: [offsetX, offsetY], viewWidth: w, viewHeight: h } = this.game.view.camera;
        const margin = MarginSize * DisplayTileSize;
        const halfW = w / 2 + margin, halfH = h / 2 + margin;
        function isVisible(x, y) {
            return x >= offsetX - halfW && x <= offsetX + halfW &&
                y >= offsetY - halfH && y <= offsetY + halfH;
        }
        const removePool = [];
        let updated = false;
        for (const [key, sprite] of this.sprites) {
            if (!isVisible(sprite.coords[0] * DisplayTileSize, sprite.coords[1] * DisplayTileSize)) {
                removePool.push(sprite);
                this.sprites.delete(key);
                updated = true;
            }
        }
        const map = this.game.map;
        const left = Math.max(0, Math.floor((offsetX - halfW) / DisplayTileSize));
        const right = Math.min(map.width - 1, Math.ceil((offsetX + halfW) / DisplayTileSize));
        const top = Math.max(0, Math.floor((offsetY - halfH) / DisplayTileSize));
        const bottom = Math.min(map.height - 1, Math.ceil((offsetY + halfH) / DisplayTileSize));
        const objectData = this.game.library.objects;
        for (let x = left; x <= right; x++)
            for (let y = top; y <= bottom; y++) {
                const obj = objectData[map.getObject(x, y)];
                if (!obj)
                    continue;
                const tx = x * DisplayTileSize;
                const ty = y * DisplayTileSize;
                if (!isVisible(tx, ty))
                    continue;
                const key = tileKey(x, y);
                if (this.sprites.has(key))
                    continue;
                const sprite = removePool.pop() || new ObjectDisplayTask_ObjectSprite(this.game);
                sprite.setTile(x, y, obj);
                if (obj.jitter) {
                    sprite.jitter[0] = (this.jitterNoiseX.noise2D(x, y) * 2 - 1) * (1 / 3);
                    sprite.jitter[1] = (this.jitterNoiseY.noise2D(x, y) * 2 - 1) * (1 / 3);
                }
                if (!sprite.parent)
                    this.game.view.camera.add(sprite);
                this.sprites.set(key, sprite);
                updated = true;
            }
        for (const sprite of removePool)
            this.game.view.camera.removeChild(sprite);
        return updated;
    }
    updateSprites(dt) {
        this.elapsed += dt;
        for (const sprite of this.sprites.values())
            sprite.update(this.elapsed);
    }
    updateTransforms() {
        const map = this.game.map;
        const objectData = this.game.library.objects;
        for (const sprite of this.sprites.values()) {
            const obj = objectData[map.getObject(sprite.coords[0], sprite.coords[1])];
            gl_matrix["b" /* vec2 */].add(this.spriteCoords, sprite.coords, sprite.jitter);
            this.spriteCoords[0] += 0.5;
            this.spriteCoords[1] += obj.terrain ? 1 : 0.5;
            this.game.view.camera.toCameraPoint(this.spriteCoords, sprite.position);
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/EntityDisplayTask.ts




const EntityDisplayTask_MarginSize = 5;
class EntityDisplayTask_EntityDisplayTask extends Task {
    constructor() {
        super(...arguments);
        this.runWhenPaused = true;
        this.visible = new Set();
        this.halfSize = gl_matrix["b" /* vec2 */].create();
        this.tr = gl_matrix["b" /* vec2 */].create();
        this.elapsed = 0;
    }
    update(dt) {
        this.updateVisibility();
        this.updateSprites(dt);
        this.updateTransforms();
    }
    updateVisibility() {
        const { offset, viewWidth: w, viewHeight: h } = this.game.view.camera;
        const margin = EntityDisplayTask_MarginSize * DisplayTileSize;
        gl_matrix["b" /* vec2 */].scaleAndAdd(this.halfSize, [margin, margin], [w, h], 2);
        const isVisible = (position) => {
            gl_matrix["b" /* vec2 */].scaleAndAdd(this.tr, this.halfSize, position, -DisplayTileSize);
            gl_matrix["b" /* vec2 */].add(this.tr, this.tr, offset);
            return this.tr[0] > 0 && this.tr[1] > 0;
        };
        for (const entity of this.visible) {
            const { position, sprite } = entity.traits.get(Spatial_Spatial);
            if (!entity.game || !isVisible(position)) {
                this.visible.delete(entity);
                this.game.view.camera.removeChild(sprite);
            }
        }
        for (const entity of this.game.entities.withTrait(Spatial_Spatial)) {
            const { position, sprite } = entity.traits.get(Spatial_Spatial);
            if (isVisible(position) && !this.visible.has(entity)) {
                this.visible.add(entity);
                this.game.view.camera.add(sprite);
            }
        }
    }
    updateSprites(dt) {
        this.elapsed += dt;
        for (const entity of this.visible)
            entity.traits.get(Spatial_Spatial).sprite.update(this.elapsed);
    }
    updateTransforms() {
        for (const entity of this.visible) {
            const { position, offset, sprite, scale } = entity.traits.get(Spatial_Spatial);
            const float = entity.traits.get(Float_Float);
            sprite.scale.set(scale[0], scale[1]);
            const z = float ? float.z[0] : 0;
            const terrain = this.game.library.terrains[this.game.map.getTerrain(position[0], position[1] + 0.5)];
            const liquid = terrain && terrain.liquid;
            sprite.clip = liquid && z === 0 ? [0, 1 / 6] : undefined;
            gl_matrix["b" /* vec2 */].add(this.tr, position, offset);
            this.game.view.camera.toCameraPoint(this.tr, sprite.position, z);
            gl_matrix["b" /* vec2 */].sub(sprite.sortOffset, [0, z + 1], offset);
            sprite.pivot.set(sprite.width / 2 / scale[0], sprite.height / 2 / scale[1]);
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/FXTask.ts



class FXTask_FXTask extends Task {
    constructor(game) {
        super(game);
        this.animTargets = new Set();
        this.tween = new Tween["Group"]();
        this.elapsed = 0;
        this.shake = ({ target }) => {
            if (target) {
                if (this.animTargets.has(target))
                    return;
                this.animTargets.add(target);
                target.renderTranslation = target.renderTranslation || [0, 0];
                const offsets = [4, -4, 3, -3, 2, -2, 1, -1, 0];
                new Tween["Tween"](target.renderTranslation, this.tween)
                    .to({ [0]: offsets.slice(0, 4) }, 300)
                    .chain(new Tween["Tween"](target.renderTranslation, this.tween).to({ [0]: offsets.slice(4) }, 300))
                    .onComplete(() => this.animTargets.delete(target))
                    .start(this.elapsed);
            }
        };
        this.game.messages$.ofType(PlayFX.Shake).subscribe(this.shake);
    }
    update(dt) {
        this.elapsed += dt;
        this.tween.update(this.elapsed);
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/ParticleTask.ts





const ParticleLife = 1000;
const ParticleSize = 16;
const ParticleGravity = -10;
const ParticleRestitution = 0.5;
class ParticleTask_Particle extends lib["Sprite"] {
    constructor(type, coords, z, color) {
        super(lib["Texture"].fromFrame('sprites/ui/particle'));
        this.life = ParticleLife * (Math.random() * 0.5 + 0.75);
        let size;
        if (type === ShowParticles.Type.Splash) {
            this.coords = gl_matrix["b" /* vec2 */].random(gl_matrix["b" /* vec2 */].create(), 0.25);
            this.velocity = gl_matrix["b" /* vec2 */].random(gl_matrix["b" /* vec2 */].create(), 0.5);
            this.z = gl_matrix["b" /* vec2 */].fromValues(z + 0.25 + Math.random() * 0.5, Math.random());
            this.gravity = true;
            size = Object(clamp["a" /* default */])(ParticleSize * (Math.random() + 0.5), 10, 22);
        }
        else {
            this.coords = gl_matrix["b" /* vec2 */].fromValues(Math.random() - 0.5, 0);
            this.velocity = gl_matrix["b" /* vec2 */].fromValues(0, 0);
            this.z = gl_matrix["b" /* vec2 */].fromValues(z + 0.25 + Math.random(), Math.random() * 0.5 + 0.25);
            this.gravity = false;
            size = Object(clamp["a" /* default */])(ParticleSize * Math.random(), 10, 16);
            this.alpha = 0.7;
        }
        gl_matrix["b" /* vec2 */].add(this.coords, this.coords, coords);
        // even size to reduce scale artifacts
        size = (size + 1) & ~1;
        this.scale.set(size / ParticleSize, size / ParticleSize);
        const colorJitter = Math.floor((Math.random() * 2 - 1) * 32);
        let r = (color >> 16) & 0xff, g = (color >> 8) & 0xff, b = color & 0xff;
        r = Object(clamp["a" /* default */])(r + colorJitter, 0, 255);
        g = Object(clamp["a" /* default */])(g + colorJitter, 0, 255);
        b = Object(clamp["a" /* default */])(b + colorJitter, 0, 255);
        this.tint = (r << 16) + (g << 8) + b;
    }
}
class ParticleTask_ParticleTask extends Task {
    constructor(game) {
        super(game);
        this.particles = [];
        this.overlay = Object.assign(new lib["particles"].ParticleContainer(), { layout: () => { } });
        this.showParticles = ({ particleType, coords, numParticles, color, z }) => {
            for (let i = 0; i < numParticles; i++) {
                const particle = new ParticleTask_Particle(particleType, coords, z, color);
                this.overlay.addChild(particle);
                this.particles.push(particle);
            }
        };
        game.view.add(this.overlay);
        game.messages$.ofType(ShowParticles).subscribe(this.showParticles);
    }
    update(dt) {
        const t = dt / 1000;
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.life -= dt;
            if (particle.life <= 0) {
                this.overlay.removeChild(particle);
                this.particles.splice(i, 1);
                continue;
            }
            gl_matrix["b" /* vec2 */].scaleAndAdd(particle.coords, particle.coords, particle.velocity, t);
            const gravity = particle.gravity ? ParticleGravity : 0;
            particle.z[0] += particle.z[1] * t + 0.5 * gravity * t * t;
            particle.z[1] += gravity * t;
            if (particle.z[0] <= 0) {
                particle.z[0] = 0;
                particle.z[1] = -particle.z[1] * ParticleRestitution;
                gl_matrix["b" /* vec2 */].scale(particle.velocity, particle.velocity, ParticleRestitution);
            }
            this.game.view.camera.toCameraPoint(particle.coords, particle.position, particle.z[0]);
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/commands/Command.ts
class Command {
    static register(command) {
        this.registry.set(command.name, command);
    }
    get game() { return this.context.game; }
    log(text) { return this.context.log(text); }
    run(context, args) {
        this.context = context;
        this.exec(...args);
        this.context = undefined;
    }
}
Command.registry = new Map();

// CONCATENATED MODULE: ./src/app/game/commands/ClearInventory.ts



class ClearInventory_ClearInventory extends Command {
    constructor() {
        super(...arguments);
        this.name = 'clear-inv';
    }
    exec() {
        const { slots } = this.game.player.traits.get(Inventory_Inventory);
        for (const slot of slots) {
            slot.item = null;
            this.game.dispatch(new InventoryUpdated(slot));
        }
        this.log('inventory cleared.');
    }
}
Command.register(new ClearInventory_ClearInventory());

// EXTERNAL MODULE: ./node_modules/lodash-es/padStart.js + 5 modules
var padStart = __webpack_require__(14);

// CONCATENATED MODULE: ./src/app/game/commands/Dump.ts






class Dump_Dump extends Command {
    constructor() {
        super(...arguments);
        this.name = 'dump';
    }
    exec(type = 'elements') {
        switch (type) {
            case 'elements':
                {
                    const valueOf = (value) => Object(padStart["a" /* default */])(Object(random["c" /* randomValue */])(value).toFixed(2), 5, ' ');
                    this.log('|   name   |    fission   |    fusion    | color |');
                    for (const name of Object.keys(this.game.library.elements)) {
                        const elem = this.game.library.elements[name];
                        this.log(`\
 ${Object(padStart["a" /* default */])(name, 10, ' ')}\
 (${valueOf(elem.fissionThreshold)}, ${valueOf(elem.fissionRate)})\
 (${valueOf(elem.fusionThreshold)}, ${valueOf(elem.fusionRate)})\
 ${Object(padStart["a" /* default */])(elem.color, 6, '0')}`);
                    }
                }
                break;
            case 'compo':
                {
                    this.log('|tier|    name    |   element   |   element   |');
                    for (const { tier, name, composition } of data_elements["c" /* Elements */]) {
                        this.log(`\
 ${Object(padStart["a" /* default */])(tier.toString(), 4, ' ')}\
 ${Object(padStart["a" /* default */])(name, 12, ' ')}\
 ${Object(padStart["a" /* default */])(composition ? composition[0] : '', 13, ' ')}\
 ${Object(padStart["a" /* default */])(composition ? composition[1] : '', 13, ' ')}`);
                    }
                }
                break;
            case 'plants':
                {
                    this.log('|       name       |   element   |   element   |');
                    for (const obj of this.game.library.objects.filter(obj => obj && obj.drops)) {
                        for (const { item: template } of obj.drops.table.items) {
                            const item = Object(random["b" /* instantiate */])(template);
                            if (!item.id.startsWith('flower-') && !item.id.startsWith('berries-'))
                                continue;
                            this.log(`\
 ${Object(padStart["a" /* default */])(item.name, 18, ' ')}\
 ${Object(padStart["a" /* default */])(item.aspects[0].element, 13, ' ')}\
 ${Object(padStart["a" /* default */])(item.aspects[1].element, 13, ' ')}`);
                        }
                    }
                }
                break;
            case 'item':
                {
                    const { slots } = this.game.player.traits.get(Inventory_Inventory);
                    const { hotbarSelection } = this.game.player.traits.get(PlayerData_PlayerData);
                    const { item } = slots[hotbarSelection];
                    this.log(JSON.stringify(item, null, 4));
                }
                break;
            case 'dragons':
                {
                    this.log('| id |       name       |  HP  | STR | SPD | score |');
                    for (const dragon of this.game.data.custom.dragons.dragons) {
                        this.log(`\
 ${Object(padStart["a" /* default */])(dragon.dragonId, 4, ' ')}\
 ${Object(padStart["a" /* default */])(dragon.name, 18, ' ')}\
 ${Object(padStart["a" /* default */])(dragon.stats.maxHp.toFixed(1), 6, ' ')}\
 ${Object(padStart["a" /* default */])(dragon.stats.str.toFixed(1), 5, ' ')}\
 ${Object(padStart["a" /* default */])(dragon.stats.spd.toFixed(1), 5, ' ')}\
 ${Object(padStart["a" /* default */])(dragon.score.toFixed(4), 7, ' ')}`);
                    }
                }
                break;
            case 'behaviors':
                {
                    const { lastAttackId } = this.game.player.traits.get(PlayerData_PlayerData);
                    const target = this.game.entities.get(lastAttackId);
                    if (!target) {
                        this.log('target entity does not exist.');
                        break;
                    }
                    const enemy = target.traits.get(EnemyData_EnemyData);
                    if (!enemy) {
                        this.log('target entity is not enemy.');
                        break;
                    }
                    this.log(BehaviorTree_BehaviorTree.dump(enemy.def.behaviors));
                }
                break;
            default:
                this.log('unknown dump type: ' + type);
        }
    }
}
Command.register(new Dump_Dump());

// CONCATENATED MODULE: ./src/app/game/commands/Dupe.ts



class Dupe_Dupe extends Command {
    constructor() {
        super(...arguments);
        this.name = 'dupe';
    }
    exec(count) {
        let numItems = Number(count) || 1;
        const { hotbarSelection: sel } = this.game.player.traits.get(PlayerData_PlayerData);
        const { slots } = this.game.player.traits.get(Inventory_Inventory);
        const item = slots[sel].item;
        if (!item)
            return;
        while (numItems-- > 0) {
            const drop = ItemDrop_ItemDrop.make(this.game, item);
            drop.age = 10000;
            this.game.entities.add(drop);
        }
    }
}
Command.register(new Dupe_Dupe());

// CONCATENATED MODULE: ./src/app/game/commands/Give.ts




class Give_Give extends Command {
    constructor() {
        super(...arguments);
        this.name = 'give';
    }
    exec(...items) {
        items = items.map(startCase["a" /* default */]);
        for (const obj of this.game.library.objects.filter(obj => obj && obj.drops)) {
            for (const { item: template } of obj.drops.table.items) {
                const item = Object(random["b" /* instantiate */])(template);
                const index = items.indexOf(item.name);
                if (index < 0)
                    continue;
                items.splice(index, 1);
                const drop = ItemDrop_ItemDrop.make(this.game, item);
                drop.age = 10000;
                this.game.entities.add(drop);
            }
        }
        for (const { output } of this.game.library.recipes) {
            const index = items.indexOf(output.name);
            if (index < 0)
                continue;
            items.splice(index, 1);
            const drop = ItemDrop_ItemDrop.make(this.game, Object(cloneDeep["a" /* default */])(output));
            drop.age = 10000;
            this.game.entities.add(drop);
        }
        if (items.length > 0)
            this.log('item not found: ' + items.join(', '));
    }
}
Command.register(new Give_Give());

// CONCATENATED MODULE: ./src/app/game/commands/Potion.ts




class Potion_Potion extends Command {
    constructor() {
        super(...arguments);
        this.name = 'potion';
    }
    exec(...args) {
        const aspects = [];
        for (let i = 0; i + 1 < args.length; i += 2) {
            const element = Object(startCase["a" /* default */])(args[i]);
            const amount = Number(args[i + 1]) || 100;
            if (!this.game.library.elements[element]) {
                this.log('element not found: ' + element);
                continue;
            }
            aspects.push({ element, amount });
        }
        const drop = ItemDrop_ItemDrop.make(this.game, Object(alchemy["b" /* makeSolution */])(aspects, this.game.library.elements));
        drop.age = 10000;
        this.game.entities.add(drop);
    }
}
Command.register(new Potion_Potion());

// CONCATENATED MODULE: ./src/app/game/commands/Spawn.ts




class commands_Spawn_Spawn extends Command {
    constructor() {
        super(...arguments);
        this.name = 'spawn';
    }
    exec(type) {
        const enemyDef = Enemies[type.toLowerCase()];
        if (!enemyDef) {
            this.log('unknown type: ' + type);
            return;
        }
        this.game.dispatch(new SpawnEnemy(type.toLowerCase(), this.game.player.traits.get(Spatial_Spatial).position));
    }
}
Command.register(new commands_Spawn_Spawn());

// CONCATENATED MODULE: ./src/app/game/commands/index.ts








// EXTERNAL MODULE: ./src/app/game/hud/console.css
var hud_console = __webpack_require__(242);

// EXTERNAL MODULE: ./node_modules/lodash-es/compact.js
var compact = __webpack_require__(378);

// CONCATENATED MODULE: ./src/app/game/hud/Console.ts



const ConsoleHTML = `
<div class="console">
  <div class="con-log-box">
    <div class="con-log-scroll">
      <div class="con-log"></div>
    </div>
  </div>
  <div>
    <input class="con-input">
  </div>
</div>
`;
class Console_Console {
    constructor(game) {
        this.game = game;
        this.display = null;
        this.root = new DOMParser().parseFromString(ConsoleHTML, 'text/html').querySelector('.console');
        this.input = this.root.querySelector('.con-input');
        this.logBox = this.root.querySelector('.con-log');
        this.lastInput = '';
        this.onKeyDown = (event) => {
            const isActive = this.root.classList.contains('active');
            if (isActive && event.key === 'Escape') {
                this.toggleInput();
            }
            else if (isActive && event.key === 'ArrowUp' && event.target === this.input) {
                this.input.value = this.lastInput;
                this.input.setSelectionRange(this.input.value.length, this.input.value.length);
                event.preventDefault();
            }
            else if (event.key.toLowerCase() === 't' || event.key === '/') {
                if (isActive)
                    this.input.focus();
                else if (document.activeElement === this.game.app.view)
                    this.toggleInput();
                if (event.key === '/' && event.target !== this.input)
                    this.input.value = '/';
            }
            else if (event.key === 'Enter' && event.target === this.input) {
                this.processInput(this.input.value);
                this.input.value = '';
            }
            if (event.target !== this.input)
                event.preventDefault();
        };
        document.body.appendChild(this.root);
        this.root.addEventListener('keydown', this.onKeyDown);
        this.game.app.view.addEventListener('keydown', this.onKeyDown);
    }
    update() {
    }
    dispose() {
        this.root.remove();
        document.body.removeEventListener('keydown', this.onKeyDown);
    }
    toggleInput() {
        if (this.root.classList.toggle('active'))
            this.input.focus();
        else
            this.game.app.view.focus();
    }
    log(text) {
        const entry = document.createElement('li');
        entry.classList.add('con-log-entry');
        entry.innerText = text;
        this.logBox.appendChild(entry);
        entry.scrollIntoView();
    }
    processInput(input) {
        if (!input)
            return;
        this.lastInput = input;
        if (!input.startsWith('/')) {
            this.log(input);
            return;
        }
        const [cmd, ...args] = Object(compact["a" /* default */])(input.split(' ').map(part => part.trim()));
        const commandName = cmd.substr(1).toLowerCase();
        if (commandName === 'clear') {
            while (this.logBox.lastChild) {
                this.logBox.removeChild(this.logBox.lastChild);
            }
        }
        else if (Command.registry.has(commandName)) {
            Command.registry.get(commandName).run(this, args);
        }
        else {
            this.log('unknown command: ' + commandName);
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/hud/MiniMap.ts





const Opacity = 0.8;
const ObjectAlpha = 0.25;
class MiniMap_MiniMap extends Panel_Panel {
    constructor(game) {
        super(game.app);
        this.game = game;
        this.display = this;
        this.map = new lib["Container"]();
        this.mapSprite = new lib["Sprite"]();
        this.isFullscreen = false;
        this.isMouseOver = false;
        this.mapDirty = false;
        this.indicators = new Map();
        this.entityVisible = new Set();
        this.dist = gl_matrix["b" /* vec2 */].create();
        this.offset = this.game.player.traits.get(Spatial_Spatial).position;
        this.content.addChild(this.map);
        this.map.addChild(this.mapSprite);
        this.mapSprite.anchor.set(0, 0);
        this.alpha = Opacity;
        this.content.interactive = true;
        this.content.on('pointerover', () => this.isMouseOver = true);
        this.content.on('pointerout', () => this.isMouseOver = false);
        this.content.on('pointerdown', () => this.isFullscreen = true);
        this.content.on('pointerup', () => this.isFullscreen = false);
        this.content.on('pointerupoutside', () => this.isFullscreen = false);
        const map = this.game.map;
        this.canvas = document.createElement('canvas');
        this.canvas.width = map.width;
        this.canvas.height = map.height;
        this.mapData = new Uint8ClampedArray(map.width * map.height * 4);
        this.mapSprite.texture = lib["Texture"].fromCanvas(this.canvas);
        this.game.map.changes$.subscribe(({ x, y }) => this.renderTile(x, y));
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++)
                this.renderTile(x, y);
        }
        this.update();
    }
    getIndicator(entity) {
        let indicator = this.indicators.get(entity.id);
        if (indicator)
            return indicator;
        indicator = new lib["Sprite"](lib["Texture"].fromFrame('sprites/ui/indicator'));
        if (entity.traits.get(PlayerData_PlayerData))
            indicator.tint = 0x0000ff;
        else
            indicator.tint = 0xff0000;
        indicator.anchor.set(0.5, 0.5);
        this.indicators.set(entity.id, indicator);
        return indicator;
    }
    renderTile(x, y) {
        const index = (x + y * this.game.map.width) * 4;
        function parseColor(color) {
            if (!color)
                return null;
            const colorNum = parseInt(color, 16);
            return [(colorNum >>> 16) & 0xff, (colorNum >>> 8) & 0xff, (colorNum >>> 0) & 0xff];
        }
        const terrain = this.game.library.terrains[this.game.map.getTerrain(x, y)];
        const terrainColor = terrain ? parseColor(terrain.color) : [0, 0, 0];
        const object = this.game.library.objects[this.game.map.getObject(x, y)];
        const objectColor = object ? parseColor(object.color) : null;
        let color = terrainColor;
        if (objectColor !== null) {
            color = [
                terrainColor[0] * (1 - ObjectAlpha) + objectColor[0] * ObjectAlpha,
                terrainColor[1] * (1 - ObjectAlpha) + objectColor[1] * ObjectAlpha,
                terrainColor[2] * (1 - ObjectAlpha) + objectColor[2] * ObjectAlpha
            ];
        }
        this.mapData[index] = color[0];
        this.mapData[index + 1] = color[1];
        this.mapData[index + 2] = color[2];
        this.mapData[index + 3] = 0xff;
        this.mapDirty = true;
    }
    update() {
        for (const id of this.indicators.keys()) {
            if (!this.game.entities.get(id)) {
                this.map.removeChild(this.indicators.get(id));
                this.indicators.delete(id);
                this.entityVisible.delete(id);
            }
        }
        const { position: playerPos } = this.game.player.traits.get(Spatial_Spatial);
        for (const entity of this.game.entities.withTrait(Spatial_Spatial)) {
            if (entity.type === ItemDrop_ItemDrop.Type || entity.type === Projectile_Projectile.Type)
                continue;
            const indicator = this.getIndicator(entity);
            const { position } = entity.traits.get(Spatial_Spatial);
            gl_matrix["b" /* vec2 */].sub(this.dist, playerPos, position);
            const visible = this.isFullscreen || gl_matrix["b" /* vec2 */].length(this.dist) < 50;
            if (visible && !this.entityVisible.has(entity.id)) {
                this.map.addChild(indicator);
                this.entityVisible.add(entity.id);
            }
            else if (!visible && this.entityVisible.has(entity.id)) {
                this.map.removeChild(indicator);
                this.entityVisible.delete(entity.id);
            }
        }
        if (!this.mapDirty)
            return;
        const ctx = this.canvas.getContext('2d');
        const img = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        img.data.set(this.mapData);
        ctx.putImageData(img, 0, 0);
        this.mapSprite.texture.update();
        this.mapDirty = false;
    }
    layout(width, height) {
        let scale;
        if (this.isFullscreen) {
            this.x = 16;
            this.y = 16;
            super.layout(width - 32, height - 32);
            scale = 1;
            this.alpha = 1;
            this.map.position.set(Math.floor(-this.offset[0] + (width - 32) / 2), Math.floor(-this.offset[1] + (height - 32) / 2));
        }
        else {
            this.x = width - 16 - 256;
            this.y = 16;
            super.layout(256, 256);
            scale = 4;
            this.alpha = this.isMouseOver ? 1 : Opacity;
            this.map.position.set(Math.floor(-this.offset[0] * 4 + 256 / 2), Math.floor(-this.offset[1] * 4 + 256 / 2));
        }
        this.mapSprite.scale.set(scale, scale);
        for (const [id, indicator] of this.indicators) {
            const entity = this.game.entities.get(id);
            if (!entity)
                continue;
            const { position } = entity.traits.get(Spatial_Spatial);
            indicator.position.set(position[0] * scale, position[1] * scale);
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/hud/Hotbar.ts




const HotbarOpacity = 0.75;
const HotbarKeys = [
    [0, '1'],
    [1, '2'],
    [2, '3'],
    [3, '4'],
    [4, '5'],
    [5, '6'],
    [6, '7'],
    [7, '8'],
];
class Hotbar_Hotbar extends lib["Container"] {
    constructor(game) {
        super();
        this.game = game;
        this.display = this;
        this.bg = new lib["Sprite"](lib["Texture"].WHITE);
        this.selection = new lib["Sprite"](lib["Texture"].fromFrame('sprites/ui/inv-selection'));
        this.wheelDebounce = 0;
        this.wheelSelection = (event) => {
            if (this.game.paused)
                return;
            if (this.elapsed - this.wheelDebounce < 20)
                return;
            const delta = event.deltaX + event.deltaY;
            if (Math.abs(delta) < 32)
                return;
            const offset = Math.sign(delta);
            const numSlots = this.slots.length;
            this.player.hotbarSelection = (this.player.hotbarSelection + offset + numSlots) % numSlots;
            this.wheelDebounce = this.elapsed;
        };
        this.elapsed = 0;
        this.maxConsumeCooldown = 0;
        this.maxAttackCooldown = 0;
        this.lastConsumeCooldown = 0;
        this.lastAttackCooldown = 0;
        this.slots = game.player.traits.get(Inventory_Inventory).slots.slice(0, 8);
        this.player = game.player.traits.get(PlayerData_PlayerData);
        this.bg.tint = 0x404040;
        const views = new lib["Container"]();
        views.addChild(this.bg);
        this.slotViews = this.slots.map(slot => new SlotView_SlotView(game, slot));
        for (const view of this.slotViews) {
            view.enabled = false;
            view.toolTipOpacity = 0.9;
            view.alwaysInteractive = true;
            view.bgOverlay.texture = lib["Texture"].WHITE;
            view.bgOverlay.width = 48;
            view.bgOverlay.height = 0;
            view.bgOverlay.alpha = 0.2;
            view.bgOverlay.anchor.set(0, 1);
            view.bgOverlay.position.set(4, 52);
            views.addChild(view);
            view.on('pointerdown', () => this.player.hotbarSelection = this.slots.indexOf(view.slot));
        }
        this.addChild(views);
        this.addChild(this.selection);
        views.alpha = HotbarOpacity;
        this.interactive = true;
        this.on('pointerover', () => views.alpha = 1);
        this.on('pointerout', () => views.alpha = HotbarOpacity);
        game.app.view.addEventListener('wheel', this.wheelSelection);
    }
    dispose() {
        this.game.app.view.removeEventListener('wheel', this.wheelSelection);
    }
    update(dt) {
        for (const [slotNum, key] of HotbarKeys) {
            if (this.game.keyboard.isDown(key))
                this.player.hotbarSelection = slotNum;
        }
        this.elapsed += dt;
        if (this.player.consumeCooldown > this.lastConsumeCooldown)
            this.maxConsumeCooldown = this.player.consumeCooldown;
        this.lastConsumeCooldown = this.player.consumeCooldown;
        if (this.player.attackCooldown > this.lastAttackCooldown)
            this.maxAttackCooldown = this.player.attackCooldown;
        this.lastAttackCooldown = this.player.attackCooldown;
        const consumeCooldownHeight = 48 * (this.player.consumeCooldown / this.maxConsumeCooldown);
        const attackCooldownHeight = 48 * (this.player.attackCooldown / this.maxAttackCooldown);
        for (const { slot, bgOverlay } of this.slotViews) {
            if (slot.item && slot.item.weapon && slot.item.weapon.type !== common_data["c" /* Weapon */].Type.Arrow)
                bgOverlay.height = attackCooldownHeight;
            else if (slot.item && slot.item.type === common_data["b" /* Item */].Type.Consumable)
                bgOverlay.height = consumeCooldownHeight;
            else
                bgOverlay.height = 0;
        }
    }
    layout(width, height) {
        const contentWidth = 8 + (SlotView_SlotView.Size + 4) * this.slotViews.length;
        const contentHeight = SlotView_SlotView.Size + 12;
        this.position.set(Math.round((width - contentWidth) / 2), height - contentHeight);
        let x = 6;
        for (const view of this.slotViews) {
            view.position.set(x, 6);
            view.layout();
            x += SlotView_SlotView.Size + 4;
        }
        this.selection.position.set(3 + (SlotView_SlotView.Size + 4) * this.player.hotbarSelection, 3);
        this.bg.position.set(0, 0);
        this.bg.width = contentWidth;
        this.bg.height = contentHeight;
    }
}

// CONCATENATED MODULE: ./src/app/components/EffectToolTip.ts


class EffectToolTip_EffectToolTip extends TextToolTip_TextToolTip {
    constructor(app) {
        super(app, '', {
            default: { align: 'left' },
            s: { fontSize: 12 },
            name: { fontWeight: 'bold', valign: 'middle' },
            desc: { fontStyle: 'italic' },
            time: { fill: '#d0d0d0' }
        });
        this.icon = new lib["Sprite"]();
        this.icon.scale.set(2, 2);
        this.icon.position.set(20, 20);
        this.alpha = 0.75;
        this.addChild(this.icon);
    }
    setEffect(effect) {
        this.effect = effect;
        this.icon.texture = lib["Texture"].fromFrame(`sprites/effects/${effect.type}`);
        this.update();
    }
    update() {
        if (!this.effect)
            return;
        const texts = [
            `<s>     </s><name>${this.effect.name}</name>`,
            `<desc>${this.effect.description}</desc>`,
            `<time>${Math.floor(this.effect.duration / 1000)}s remains</time>`
        ];
        this.text = texts.join('\n');
    }
}

// CONCATENATED MODULE: ./src/app/game/hud/Status.ts





const Status_HPBarWidth = 256;
const Status_HPBarHeight = 32;
class Status_Status extends lib["Container"] {
    constructor(game) {
        super();
        this.game = game;
        this.display = this;
        this.hpBarIcon = new lib["Sprite"](lib["Texture"].fromFrame('sprites/ui/status-hp'));
        this.hpBarBg = new lib["Sprite"](lib["Texture"].WHITE);
        this.hpBarFill = new lib["Sprite"](lib["Texture"].WHITE);
        this.hpBarText = new Text_Text();
        this.effectIcons = [];
        this.stats = Stats_Stats.compute(game.player.traits.get(Stats_Stats));
        this.effects = game.player.traits.get(Stats_Stats).effects;
        this.effectToolTip = new EffectToolTip_EffectToolTip(game.app);
        this.hpBarBg.tint = 0x808080;
        this.hpBarBg.width = Status_HPBarWidth;
        this.hpBarBg.height = Status_HPBarHeight;
        const hpBar = new lib["Container"]();
        this.addChild(hpBar);
        hpBar.addChild(this.hpBarBg);
        hpBar.addChild(this.hpBarFill);
        hpBar.addChild(this.hpBarText);
        hpBar.addChild(this.hpBarIcon);
        hpBar.alpha = 0.65;
        this.hpBarText.visible = false;
        hpBar.interactive = true;
        hpBar.on('pointerover', () => {
            hpBar.alpha = 1;
            this.hpBarText.visible = true;
        });
        hpBar.on('pointerout', () => {
            hpBar.alpha = 0.65;
            this.hpBarText.visible = false;
        });
    }
    update(dt) {
        const { hp, maxHp } = this.stats;
        const percentage = hp / maxHp;
        this.hpBarText.text = `${Math.ceil(hp)}/${maxHp}`;
        this.hpBarFill.width = Status_HPBarWidth * percentage;
        this.hpBarFill.height = Status_HPBarHeight;
        if (percentage < 0.3)
            this.hpBarFill.tint = 0xa00000;
        else if (percentage < 0.6)
            this.hpBarFill.tint = 0xa0a000;
        else
            this.hpBarFill.tint = 0x00a000;
        const showEffects = this.effects.filter(({ type, duration }) => duration > 0 && data_effects["b" /* Effects */][type].visible);
        while (this.effectIcons.length < showEffects.length) {
            const icon = Object.assign(new lib["Sprite"](), { effectIndex: 0 });
            icon.interactive = true;
            icon.scale.set(2, 2);
            this.addChild(icon);
            this.game.app.toolTip.add(icon, () => {
                this.effectToolTip.setEffect(this.effects[icon.effectIndex]);
                return this.effectToolTip;
            });
            this.effectIcons.push(icon);
        }
        while (this.effectIcons.length > showEffects.length) {
            this.removeChild(this.effectIcons.splice(this.effectIcons.length - 1, 1)[0]);
        }
        for (let i = 0; i < showEffects.length; i++) {
            this.effectIcons[i].texture = lib["Texture"].fromFrame(`sprites/effects/${showEffects[i].type}`);
            this.effectIcons[i].effectIndex = this.effects.indexOf(showEffects[i]);
        }
        this.effectToolTip.update();
    }
    layout(width, height) {
        const hpBarX = width - Status_HPBarWidth - 16, hpBarY = 256 + 32;
        this.hpBarBg.position.set(hpBarX, hpBarY);
        this.hpBarFill.position.set(hpBarX, hpBarY);
        this.hpBarText.position.set(hpBarX, hpBarY);
        this.hpBarText.layout(Status_HPBarWidth, Status_HPBarHeight);
        this.hpBarIcon.position.set(hpBarX - this.hpBarIcon.width - 4, hpBarY);
        const effectsX = hpBarX, effectsY = hpBarY + Status_HPBarHeight + 16;
        for (let i = 0; i < this.effectIcons.length; i++) {
            this.effectIcons[i].position.set(effectsX + i * (32 + 8), effectsY);
        }
    }
}

// CONCATENATED MODULE: ./src/app/game/hud/index.ts





// CONCATENATED MODULE: ./src/app/game/tasks/HUDTask.ts


const HUDElements = [
    Console_Console,
    Hotbar_Hotbar,
    Status_Status,
    MiniMap_MiniMap,
];
class HUDTask_HUDTask extends Task {
    constructor(game) {
        super(game);
        this.runWhenPaused = true;
        this.elements = [];
        for (const HUDElement of HUDElements) {
            const elem = new HUDElement(game);
            if (elem.display)
                game.view.add(elem.display);
            this.elements.push(elem);
        }
    }
    update(dt) {
        for (const elem of this.elements)
            elem.update(dt);
    }
    dispose() {
        for (const elem of this.elements)
            elem.dispose && elem.dispose();
    }
}

// CONCATENATED MODULE: ./src/app/game/tasks/index.ts






















// CONCATENATED MODULE: ./src/app/game/TaskManagers.ts

class TaskManagers_TaskManager {
    constructor(game) {
        this.game = game;
        this.tasks = [];
    }
    init() {
        this.add(EffectTask_EffectTask);
        this.add(TerrainEffectTask_TerrainEffectTask);
        this.add(EquipmentEffectTask_EquipmentEffectTask);
        this.add(PlayerInputTask_PlayerInputTask);
        this.add(BehaviorTask_BehaviorTask);
        this.add(DragonTask_DragonTask);
        this.add(ProjectileTask_ProjectileTask);
        this.add(EntityHPTask_EntityHPTask);
        this.add(EntityMovementTask_EntityMovementTask);
        this.add(DeathTask_DeathTask);
        this.add(UseItemTask_UseItemTask);
        this.add(AttackTask_AttackTask);
        this.add(InventoryTask_InventoryTask);
        this.add(CameraUpdateTask_CameraUpdateTask);
        this.add(TerrainDisplayTask_TerrainDisplayTask);
        this.add(ObjectDisplayTask_ObjectDisplayTask);
        this.add(EntityDisplayTask_EntityDisplayTask);
        this.add(FXTask_FXTask);
        this.add(ParticleTask_ParticleTask);
        this.add(HUDTask_HUDTask);
    }
    dispose() {
        for (const task of this.tasks)
            task.dispose();
        this.tasks.length = 0;
    }
    add(Task) {
        const task = new Task(this.game);
        this.tasks.push(task);
    }
    update(dt, paused) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].isActive) {
                if (!paused || this.tasks[i].runWhenPaused)
                    this.tasks[i].update(dt);
            }
            else {
                this.tasks[i].dispose();
                this.tasks.splice(i, 1);
                i--;
            }
        }
    }
}

// EXTERNAL MODULE: ./node_modules/rxjs/Subject.js
var Subject = __webpack_require__(34);

// CONCATENATED MODULE: ./src/app/game/TileMap.ts

class TileMap_TileMap {
    constructor(width, height, props) {
        this.width = width;
        this.height = height;
        this.props = props;
        this.changes$ = new Subject["Subject"]();
        this.data = new Uint16Array(width * height * 2);
    }
    serialize() {
        const terrains = new Uint16Array(this.width * this.height);
        const objects = new Uint16Array(this.width * this.height);
        for (let i = 0; i < terrains.length; i++) {
            terrains[i] = this.data[i * 2];
            objects[i] = this.data[i * 2 + 1];
        }
        return {
            width: this.width,
            height: this.height,
            props: this.props,
            terrains, objects
        };
    }
    static deserialize(data) {
        const map = new TileMap_TileMap(data.width, data.height, data.props);
        const len = data.width * data.height;
        for (let i = 0; i < len; i++) {
            map.data[i * 2] = data.terrains[i];
            map.data[i * 2 + 1] = data.objects[i];
        }
        return map;
    }
    toIndex(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x < 0 || x >= this.width)
            return -1;
        if (y < 0 || y >= this.height)
            return -1;
        return x + this.width * y;
    }
    getTerrain(x, y) {
        const index = this.toIndex(x, y);
        return this.data[index * 2] || 0;
    }
    getObject(x, y) {
        const index = this.toIndex(x, y);
        return this.data[index * 2 + 1] || 0;
    }
    setTerrain(x, y, terrain) {
        const index = this.toIndex(x, y);
        if (index < 0 || index >= this.data.length)
            return;
        this.data[index * 2] = terrain;
        this.changes$.next({ x, y });
    }
    setObject(x, y, object) {
        const index = this.toIndex(x, y);
        if (index < 0 || index >= this.data.length)
            return;
        this.data[index * 2 + 1] = object;
        this.changes$.next({ x, y });
    }
}

// CONCATENATED MODULE: ./src/app/game/Game.ts






class Game_Game {
    constructor(app, data) {
        this.app = app;
        this.data = data;
        this.view = new GameView_GameView();
        this.keyboard = this.app.keyboard;
        this.tasks = new TaskManagers_TaskManager(this);
        this.entities = new EntityManager_EntityManager(this);
        this._paused = false;
        this._message$ = new Subject["Subject"]();
        this.messages$ = Object.assign(this._message$, {
            ofType: (Type) => {
                return this.messages$.pipe(Object(filter["filter"])(msg => msg instanceof Type));
            }
        });
        this.library = data.library;
    }
    get paused() { return this._paused; }
    init() {
        this.map = TileMap_TileMap.deserialize(this.data.map);
        this.entities.init();
        this.tasks.init();
    }
    save() {
        this.data.map = this.map.serialize();
        this.entities.save();
    }
    update(dt, paused = false) {
        this._paused = paused;
        // update tasks first to allow check for entity age = 0
        this.tasks.update(dt, paused);
        if (!paused)
            this.entities.update(dt);
    }
    layout() {
        const { width, height } = this.app.screen;
        this.view.layout(width, height);
    }
    dispose() {
        this.tasks.dispose();
        this.entities.dispose();
    }
    get player() { return this.entities.get(1); }
    dispatch(message) {
        this._message$.next(message);
        return message;
    }
}

// CONCATENATED MODULE: ./src/app/game/index.ts



// CONCATENATED MODULE: ./src/app/states/StateMain.ts
var StateMain_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class StateMain_StateMain extends GameState_GameState {
    get name() { return 'main'; }
    constructor(app, data) {
        super(app);
        this.game = new Game_Game(app, data);
        this.root.addChild(this.game.view);
    }
    enter() {
        return StateMain_awaiter(this, void 0, void 0, function* () {
            this.game.init();
            this.root.alpha = 0;
            yield fadeIn(this.root).toPromise();
        });
    }
    update(dt) {
        this.game.update(dt);
    }
    layout() {
        this.game.layout();
    }
    leave() {
        return StateMain_awaiter(this, void 0, void 0, function* () {
            this.game.dispose();
            this.root.alpha = 1;
            yield fadeOut(this.root).toPromise();
        });
    }
}

// CONCATENATED MODULE: ./src/app/states/StateTitle.ts
var StateTitle_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








class StateTitle_StateTitle extends GameState_GameState {
    constructor(app) {
        super(app);
        this.logo = new lib["Sprite"](lib["Texture"].fromFrame('sprites/ui/title'));
        this.newButton = new TextButton_TextButton('new game');
        this.loadBar = new lib["Sprite"](lib["Texture"].WHITE);
        this.loadMessage = new Text_Text('');
        this.saveLabel = new Text_Text('saves');
        this.saveButtons = [];
        this.root.addChild(this.logo);
        this.root.addChild(this.newButton);
        this.root.addChild(this.loadBar);
        this.root.addChild(this.loadMessage);
        this.newButton.on(TextButton_TextButton.Clicked, this.newGame.bind(this));
        this.loadBar.tint = 0x404040;
        this.loadBar.width = 0;
    }
    get name() { return 'title'; }
    enter() {
        return StateTitle_awaiter(this, void 0, void 0, function* () {
            this.updateSaves();
            this.root.alpha = 0;
            yield fadeIn(this.root).toPromise();
        });
    }
    pause() {
        return StateTitle_awaiter(this, void 0, void 0, function* () {
            this.root.alpha = 1;
            yield fadeOut(this.root).toPromise();
        });
    }
    resume() {
        return StateTitle_awaiter(this, void 0, void 0, function* () {
            this.updateSaves();
            this.newButton.isEnabled = true;
            this.loadMessage.text = '';
            this.loadBar.width = 0;
            this.root.alpha = 0;
            yield fadeIn(this.root).toPromise();
        });
    }
    updateSaves() {
        for (const btn of this.saveButtons)
            this.root.removeChild(btn);
        this.saveButtons = [];
        for (const name of Object.keys(localStorage).sort()) {
            const btn = new TextButton_TextButton(name);
            btn.on(TextButton_TextButton.Clicked, () => this.startGame(common_data["a" /* GameSave */].import(localStorage[name])));
            this.root.addChild(btn);
            this.saveButtons.push(btn);
        }
        if (this.saveButtons.length > 0)
            this.root.addChild(this.saveLabel);
    }
    layout() {
        const contentHeight = this.logo.height + 50 + 75 + 20 + 50;
        const { width, height } = this.app.screen;
        this.logo.position.set((width - this.logo.width) / 2, (height - contentHeight) / 2);
        this.newButton.position.set((width - 160) / 2, this.logo.y + this.logo.height + 50);
        this.newButton.layout(160, 64);
        this.loadMessage.position.set(0, this.newButton.y + 64 + 20);
        this.loadMessage.layout(width, 50);
        this.loadBar.position.set(width / 4, this.newButton.y + 64 + 20);
        this.loadBar.height = 50;
        this.saveLabel.position.set(width - 256, 64);
        this.saveLabel.layout(192, 48);
        let y = this.saveLabel.y + 48 + 16;
        for (const button of this.saveButtons) {
            button.position.set(width - 256, y);
            button.layout(192, 48);
            y += 48 + 16;
        }
    }
    newGame() {
        return StateTitle_awaiter(this, void 0, void 0, function* () {
            this.newButton.isEnabled = false;
            this.saveButtons.forEach(btn => btn.isEnabled = false);
            const data = yield new Generator_Generator(MapSize, MapSize, Seed || performance.now().toString()).generate((message, progress) => {
                if (message)
                    this.loadMessage.text = message;
                this.loadBar.width = (this.app.screen.width / 2) * progress;
            });
            yield this.startGame(data);
        });
    }
    startGame(data) {
        return StateTitle_awaiter(this, void 0, void 0, function* () {
            this.newButton.isEnabled = false;
            this.saveButtons.forEach(btn => btn.isEnabled = false);
            yield this.app.pushState(new StateMain_StateMain(this.app, data));
        });
    }
}

// EXTERNAL MODULE: ./node_modules/fontfaceobserver/fontfaceobserver.standalone.js
var fontfaceobserver_standalone = __webpack_require__(73);

// CONCATENATED MODULE: ./src/app/states/StatePreload.ts
var StatePreload_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class StatePreload_StatePreload extends GameState_GameState {
    constructor(app) {
        super(app);
        this.loadingText = new lib["Text"]('loading...\n', {
            fill: 'white',
            fontSize: 14,
            lineHeight: 20,
            align: 'center',
        });
        this.root.addChild(this.loadingText);
    }
    get name() { return 'preload'; }
    enter() {
        return StatePreload_awaiter(this, void 0, void 0, function* () {
            this.run();
        });
    }
    layout() {
        this.loadingText.x = (this.app.screen.width - this.loadingText.width) / 2;
        this.loadingText.y = (this.app.screen.height - this.loadingText.height) / 2;
    }
    run() {
        const loader = this.app.loader;
        const progressHandler = loader.onProgress.add(() => {
            this.loadingText.text = `loading...\n${Math.round(loader.progress)}%`;
        });
        const context = __webpack_require__(240);
        for (const key of context.keys()) {
            const match = /^\.\/(.*)\.(.*)$/.exec(key);
            if (!match)
                continue;
            const [, name, ext] = match;
            if (name.startsWith('sprites/')) {
                if (ext === 'json')
                    loader.add(name, key);
            }
            else {
                loader.add(name, context(key));
            }
        }
        loader.pre((res, next) => {
            if (res.name.startsWith('sprites/') && res.extension === 'json') {
                res.type = lib["loaders"].Resource.TYPE.JSON;
                res.data = context(res.url);
                res.data.meta.image = `../${context(`./sprites/${res.data.meta.image}`)}`;
                res.complete();
            }
            next();
        });
        const fontLoad = Promise.all([
            new fontfaceobserver_standalone('Unibody8Pro').load(),
            new fontfaceobserver_standalone('Unibody8Pro', { weight: 'bold' }).load(),
            new fontfaceobserver_standalone('Unibody8Pro', { style: 'italic' }).load(),
        ]);
        loader.load((_, resources) => StatePreload_awaiter(this, void 0, void 0, function* () {
            loader.onProgress.detach(progressHandler);
            for (const name of Object.keys(resources)) {
                const resource = resources[name];
                if (resource.type === lib["loaders"].Resource.TYPE.JSON &&
                    !resource['spritesheet']) {
                    this.app.resources[name] = resource.data;
                }
            }
            yield fontLoad;
            yield fadeOut(this.root).toPromise();
            yield this.app.topState(new StateTitle_StateTitle(this.app));
        }));
    }
}

// CONCATENATED MODULE: ./src/app/states/StateOverlay.ts
var StateOverlay_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class StateOverlay_StateOverlay extends GameState_GameState {
    constructor(overlay) {
        super(overlay.game.app);
        this.overlay = overlay;
        this.bg = new lib["Sprite"](lib["Texture"].WHITE);
        this.bg.tint = 0;
        this.bg.alpha = 0.5;
        this.root.addChild(this.bg);
        this.root.addChild(this.overlay);
    }
    get name() { return 'overlay'; }
    enter() {
        return StateOverlay_awaiter(this, void 0, void 0, function* () {
            this.overlay.init();
        });
    }
    update(dt) {
        this.overlay.update(dt);
        this.overlay.game.update(dt, true);
    }
    layout() {
        const { width, height } = this.app.screen;
        this.bg.width = width;
        this.bg.height = height;
        this.overlay.layout(width, height);
        this.overlay.game.layout();
    }
    leave() {
        return StateOverlay_awaiter(this, void 0, void 0, function* () {
            this.overlay.dispose();
        });
    }
}

// CONCATENATED MODULE: ./src/app/states/index.ts






// CONCATENATED MODULE: ./src/app/utils/Keyboard.ts
class Keyboard {
    constructor(elem) {
        this.elem = elem;
        this.state = new Set();
        this.newKey = new Map();
        this.keydown = this.keydown.bind(this);
        this.keyup = this.keyup.bind(this);
        this.blur = this.blur.bind(this);
        elem.tabIndex = 1;
        elem.addEventListener('keydown', this.keydown);
        elem.addEventListener('keyup', this.keyup);
        elem.addEventListener('blur', this.blur);
        setTimeout(() => elem.focus(), 0);
    }
    keydown(event) {
        event.preventDefault();
        if (event.repeat)
            return;
        this.state.add(event.key.toLowerCase());
        this.newKey.set(event.key.toLowerCase(), true);
    }
    keyup(event) {
        event.preventDefault();
        if (event.repeat)
            return;
        this.state.delete(event.key.toLowerCase());
        this.newKey.set(event.key.toLowerCase(), false);
    }
    blur() {
        for (const key of this.state)
            this.newKey.set(key, false);
        this.state.clear();
    }
    isDown(...keys) {
        return keys.some(key => this.newKey.get(key.toLowerCase()) === true);
    }
    isUp(...keys) {
        return keys.some(key => this.newKey.get(key.toLowerCase()) === false);
    }
    isPressed(...keys) {
        return keys.some(key => this.state.has(key.toLowerCase()));
    }
    update() {
        this.newKey.clear();
    }
    dispose() {
        this.elem.removeEventListener('keydown', this.keydown);
        this.elem.removeEventListener('keyup', this.keyup);
        this.elem.removeEventListener('blur', this.blur);
    }
}

// EXTERNAL MODULE: ./node_modules/rxjs/operators/first.js
var first = __webpack_require__(189);

// CONCATENATED MODULE: ./src/app/DragDrop.ts



class DragDrop_DragDrop {
    constructor(app) {
        this.app = app;
        this.overlay = new lib["Container"]();
        this.pointerPos = new lib["Point"]();
        this.dragOffset = new lib["Point"]();
        this.endDrag$ = new Subject["Subject"]();
        this.end = (e) => {
            if (this.activeObj) {
                const pt = e.data.global.clone();
                pt.x += this.dragOffset.x;
                pt.y += this.dragOffset.y;
                const target = this.interaction.hitTest(pt, this.app.root);
                this.endDrag$.next(target);
                this.overlay.removeChild(this.activeObj);
                this.activeObj = undefined;
            }
            e.data.getLocalPosition(this.overlay, this.pointerPos);
        };
        this.interaction = app.renderer.plugins.interaction;
        app.stage.addChild(this.overlay);
        this.interaction.on('pointermove', (e) => {
            if (e.data.originalEvent.target !== app.view) {
                this.cancel();
                return;
            }
            e.data.getLocalPosition(this.overlay, this.pointerPos);
        });
        this.interaction.on('pointerup', this.end);
    }
    get active() { return !!this.activeObj; }
    begin(object) {
        if (this.activeObj) {
            console.log('dragdrop: already in progress');
            this.cancel();
        }
        this.overlay.toLocal(new lib["Point"](0, 0), object, this.dragOffset);
        this.dragOffset.x -= this.pointerPos.x;
        this.dragOffset.y -= this.pointerPos.y;
        object.parent && object.parent.removeChild(object);
        this.overlay.addChild(object);
        this.activeObj = object;
        return this.endDrag$.pipe(Object(first["first"])()).toPromise();
    }
    cancel(object = this.activeObj) {
        if (this.activeObj && this.activeObj === object) {
            this.overlay.removeChild(this.activeObj);
            this.endDrag$.next(null);
            this.activeObj = undefined;
        }
    }
    layout() {
        if (this.activeObj) {
            this.activeObj.position.set(this.pointerPos.x + this.dragOffset.x, this.pointerPos.y + this.dragOffset.y);
        }
    }
}

// CONCATENATED MODULE: ./src/app/ToolTip.ts

const ToolTipOffset = 8;
class ToolTip_ToolTip {
    constructor(app) {
        this.app = app;
        this.overlay = new lib["Container"]();
        this.pointerPos = new lib["Point"]();
        this.global = new lib["Point"]();
        this.interaction = app.renderer.plugins.interaction;
        app.stage.addChild(this.overlay);
        this.interaction.on('pointermove', (e) => {
            if (e.data.originalEvent.target !== app.view) {
                if (this.panel)
                    this.hide(this.panel);
                return;
            }
            e.data.getLocalPosition(this.overlay, this.pointerPos);
            this.global.copy(e.data.global);
        });
    }
    get active() { return !!this.panel; }
    add(target, show) {
        const showToolTip = (e) => {
            if (e.data.originalEvent.target !== this.app.view)
                return;
            if (e.target === target && !this.app.dragDrop.active) {
                const panel = show();
                if (panel)
                    this.show(panel, target);
            }
        };
        target.on('pointerover', showToolTip);
        target.on('pointermove', showToolTip);
    }
    show(panel, target) {
        if (this.panel)
            this.hide(this.panel);
        this.overlay.addChild(panel);
        this.panel = panel;
        this.target = target;
    }
    hide(panel) {
        if (this.panel === panel) {
            this.overlay.removeChild(panel);
            this.panel = undefined;
            this.target = undefined;
        }
    }
    update() {
        if (!this.panel)
            return;
        const target = this.interaction.hitTest(this.global, this.app.root);
        if (target !== this.target) {
            this.hide(this.panel);
        }
    }
    layout() {
        if (this.panel) {
            const { width, height } = this.app.screen;
            this.panel.layout(width, height);
            const { width: panelWidth, height: panelHeight } = this.panel;
            let x = this.pointerPos.x + ToolTipOffset, y = this.pointerPos.y + ToolTipOffset;
            if (x + panelWidth >= width)
                x = this.pointerPos.x - ToolTipOffset - panelWidth;
            if (y + panelHeight >= height)
                y = this.pointerPos.y - ToolTipOffset - panelHeight;
            this.panel.position.set(x, y);
        }
    }
}

// CONCATENATED MODULE: ./src/app/App.ts
var App_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class App_App extends lib["Application"] {
    constructor() {
        super({
            autoResize: true,
            antialias: true,
            roundPixels: true
        });
        this.root = this.stage.addChild(new lib["Container"]());
        this._states = [];
        this.resources = {};
        this.keyboard = new Keyboard(this.view);
        this.toolTip = new ToolTip_ToolTip(this);
        this.dragDrop = new DragDrop_DragDrop(this);
        this.view.oncontextmenu = event => event.preventDefault();
        lib["settings"].SCALE_MODE = lib["SCALE_MODES"].NEAREST;
        this.ticker.add(this.tick.bind(this));
        const interaction = this.renderer.plugins.interaction;
        interaction.moveWhenInside = true;
        // Workaround for outside events not firing due to pixi.js#4608
        // Passes outside events to children
        interaction.on('pointerup', (e) => {
            function passEvent(obj, trigger) {
                if (trigger && obj.interactive) {
                    e.currentTarget = obj;
                    obj.emit('pointerupoutside', e);
                }
                if (obj.interactiveChildren && obj.children) {
                    const doTrigger = trigger || !!obj.mask || !!obj.hitArea;
                    for (const child of obj.children)
                        passEvent(child, doTrigger);
                }
            }
            passEvent(this.stage, false);
        });
    }
    get state() { return this._states[this._states.length - 1] || null; }
    pushState(next) {
        return App_awaiter(this, void 0, void 0, function* () {
            if (this.state) {
                yield this.state.pause();
                this.state.root.hitArea = lib["Rectangle"].EMPTY;
            }
            this._states.push(next);
            this.root.addChild(next.root);
            yield next.enter();
        });
    }
    popState() {
        return App_awaiter(this, void 0, void 0, function* () {
            if (this.state) {
                yield this.state.leave();
                this.root.removeChild(this.state.root);
                this._states.pop();
            }
            if (this.state) {
                this.state.root.hitArea = null;
                yield this.state.resume();
            }
        });
    }
    topState(next) {
        return App_awaiter(this, void 0, void 0, function* () {
            yield this.popState();
            yield this.pushState(next);
        });
    }
    tick() {
        this.state && this.state.update(this.ticker.elapsedMS);
        Tween["update"]();
        this.keyboard.update();
        this.toolTip.update();
    }
    render() {
        this.state && this.state.layout();
        this.toolTip.layout();
        this.dragDrop.layout();
        super.render();
    }
}

// CONCATENATED MODULE: ./src/app/settings.ts
const MapSize = 2048;
const Seed = '';
const UIScaleFactor = 2;
const DisplayTileSize = 64;

// CONCATENATED MODULE: ./src/app/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "App", function() { return App_App; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "MapSize", function() { return MapSize; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Seed", function() { return Seed; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "UIScaleFactor", function() { return UIScaleFactor; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DisplayTileSize", function() { return DisplayTileSize; });





const app_app = bootstrap(new App_App());
app_app.pushState(new StatePreload_StatePreload(app_app));
Object.assign(window, { app: app_app });


/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/36da4bca0fcaf1b4230ba4d64a98851a.png";

/***/ }),

/***/ 219:
/***/ (function(module) {

module.exports = {"meta":{"image":"ui.png","size":{"w":364,"h":280},"scale":"1","hash":"07e62371d10a66680c02b4567a974666cef36252"},"frames":{"sprites/ui/inv-selection":{"frame":{"x":2,"y":186,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/ui/title":{"frame":{"x":2,"y":2,"w":360,"h":180},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":360,"h":180},"sourceSize":{"w":360,"h":180}},"sprites/ui/inv-slot":{"frame":{"x":70,"y":186,"w":56,"h":56},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":56,"h":56},"sourceSize":{"w":56,"h":56}},"sprites/ui/arrow":{"frame":{"x":130,"y":186,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/ui/panel-mask":{"frame":{"x":166,"y":186,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/ui/panel":{"frame":{"x":202,"y":186,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/ui/status-hp":{"frame":{"x":238,"y":186,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/ui/inv-slot-arrow":{"frame":{"x":274,"y":186,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/inv-slot-boots":{"frame":{"x":302,"y":186,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/inv-slot-bow":{"frame":{"x":330,"y":186,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/inv-slot-chestplate":{"frame":{"x":2,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/inv-slot-fire":{"frame":{"x":30,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/inv-slot-leggings":{"frame":{"x":58,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/arrow-compact":{"frame":{"x":232,"y":222,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/ui/inv-slot-spear":{"frame":{"x":114,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/inv-slot-sword":{"frame":{"x":142,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/inv-slot-trash":{"frame":{"x":170,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/tab-enemy":{"frame":{"x":198,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/tab-anvil":{"frame":{"x":226,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/tab-alchemy":{"frame":{"x":254,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/inv-slot-solution":{"frame":{"x":282,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/ui/cauldron":{"frame":{"x":130,"y":222,"w":18,"h":18},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":18,"h":18},"sourceSize":{"w":18,"h":18}},"sprites/ui/particle":{"frame":{"x":152,"y":222,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/ui/indicator":{"frame":{"x":172,"y":222,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/ui/button-pressed":{"frame":{"x":192,"y":222,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/ui/button-normal":{"frame":{"x":212,"y":222,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/ui/tab-workbench":{"frame":{"x":86,"y":254,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}}}};

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/c229e891deb9f6d9f1cf520062c124d3.png";

/***/ }),

/***/ 221:
/***/ (function(module) {

module.exports = {"meta":{"image":"terrains.png","size":{"w":100,"h":80},"scale":"1","hash":"cddf04393769582b42612ec64a83b17182979cee"},"frames":{"sprites/terrains/grass-1":{"frame":{"x":22,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/sand-3":{"frame":{"x":2,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/grass-3":{"frame":{"x":2,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/ice":{"frame":{"x":22,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/lava":{"frame":{"x":42,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/mud":{"frame":{"x":42,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/sand-1":{"frame":{"x":2,"y":42,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/sand-2":{"frame":{"x":22,"y":42,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/water":{"frame":{"x":82,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/snow":{"frame":{"x":62,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/soil-1":{"frame":{"x":62,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/soil-2":{"frame":{"x":62,"y":42,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/soil-3":{"frame":{"x":2,"y":62,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/stone-1":{"frame":{"x":22,"y":62,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/stone-2":{"frame":{"x":42,"y":62,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/stone-3":{"frame":{"x":62,"y":62,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/terrains/grass-2":{"frame":{"x":42,"y":42,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}}}};

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/e102be4e7a10df707aa4a623bb5d9ff1.png";

/***/ }),

/***/ 223:
/***/ (function(module) {

module.exports = {"meta":{"image":"skeleton.png","size":{"w":476,"h":408},"scale":"1","hash":"247af8049e316637b81c5140fc1711abc8dd5014"},"frames":{"sprites/skeleton/down-0":{"frame":{"x":70,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/right-0":{"frame":{"x":2,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/down-2":{"frame":{"x":2,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/down-3":{"frame":{"x":70,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/down-4":{"frame":{"x":138,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/down-5":{"frame":{"x":138,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/down-6":{"frame":{"x":2,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/down-7":{"frame":{"x":70,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/down-8":{"frame":{"x":138,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/left-0":{"frame":{"x":206,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/left-1":{"frame":{"x":206,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/left-2":{"frame":{"x":206,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/left-3":{"frame":{"x":2,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/left-4":{"frame":{"x":70,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/left-5":{"frame":{"x":138,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/left-6":{"frame":{"x":206,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/left-7":{"frame":{"x":274,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/left-8":{"frame":{"x":274,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/up-8":{"frame":{"x":410,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/right-1":{"frame":{"x":274,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/right-2":{"frame":{"x":2,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/right-3":{"frame":{"x":70,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/right-4":{"frame":{"x":138,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/right-5":{"frame":{"x":206,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/right-6":{"frame":{"x":274,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/right-7":{"frame":{"x":342,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/right-8":{"frame":{"x":342,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/spawner":{"frame":{"x":342,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/up-0":{"frame":{"x":342,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/up-1":{"frame":{"x":342,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/up-2":{"frame":{"x":2,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/up-3":{"frame":{"x":70,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/up-4":{"frame":{"x":138,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/up-5":{"frame":{"x":206,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/up-6":{"frame":{"x":274,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/up-7":{"frame":{"x":342,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/skeleton/down-1":{"frame":{"x":274,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}}}};

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/07731d168a36a9866b70d85faa0d807e.png";

/***/ }),

/***/ 225:
/***/ (function(module) {

module.exports = {"meta":{"image":"projectiles.png","size":{"w":60,"h":40},"scale":"1","hash":"694753d8b5ffe39cfae6144556a1be2bc35aa6ae"},"frames":{"sprites/projectiles/arrow":{"frame":{"x":2,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/projectiles/bolt":{"frame":{"x":22,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/projectiles/invisible":{"frame":{"x":2,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/projectiles/orb":{"frame":{"x":22,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/projectiles/spear":{"frame":{"x":42,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/projectiles/sword":{"frame":{"x":42,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}}}};

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/8caa79760b88108cfa33ab29e21f0711.png";

/***/ }),

/***/ 227:
/***/ (function(module) {

module.exports = {"meta":{"image":"player.png","size":{"w":884,"h":884},"scale":"1","hash":"09cf4c58581eba81b69da7a228d1f7386caf5e3d"},"frames":{"sprites/player/arrow-down-0":{"frame":{"x":70,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/left-1":{"frame":{"x":2,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-10":{"frame":{"x":2,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-11":{"frame":{"x":70,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-2":{"frame":{"x":138,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-3":{"frame":{"x":138,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-4":{"frame":{"x":2,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-5":{"frame":{"x":70,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-6":{"frame":{"x":138,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-7":{"frame":{"x":206,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-8":{"frame":{"x":206,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-9":{"frame":{"x":206,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-0":{"frame":{"x":2,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-1":{"frame":{"x":70,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-10":{"frame":{"x":138,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-11":{"frame":{"x":206,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-2":{"frame":{"x":274,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-3":{"frame":{"x":274,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-4":{"frame":{"x":274,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-5":{"frame":{"x":274,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-6":{"frame":{"x":2,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-7":{"frame":{"x":70,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-8":{"frame":{"x":138,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-left-9":{"frame":{"x":206,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-0":{"frame":{"x":274,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-1":{"frame":{"x":342,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-10":{"frame":{"x":342,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-11":{"frame":{"x":342,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-2":{"frame":{"x":342,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-3":{"frame":{"x":342,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-4":{"frame":{"x":2,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-5":{"frame":{"x":70,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-6":{"frame":{"x":138,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-7":{"frame":{"x":206,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-8":{"frame":{"x":274,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-right-9":{"frame":{"x":342,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-0":{"frame":{"x":410,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-1":{"frame":{"x":410,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-10":{"frame":{"x":410,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-11":{"frame":{"x":410,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-2":{"frame":{"x":410,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-3":{"frame":{"x":410,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-4":{"frame":{"x":2,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-5":{"frame":{"x":70,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-6":{"frame":{"x":138,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-7":{"frame":{"x":206,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-8":{"frame":{"x":274,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-up-9":{"frame":{"x":342,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/down-0":{"frame":{"x":410,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/down-1":{"frame":{"x":478,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/down-2":{"frame":{"x":478,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/down-3":{"frame":{"x":478,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/down-4":{"frame":{"x":478,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/down-5":{"frame":{"x":478,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/down-6":{"frame":{"x":478,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/down-7":{"frame":{"x":478,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/down-8":{"frame":{"x":2,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-down-0":{"frame":{"x":70,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-down-1":{"frame":{"x":138,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-down-2":{"frame":{"x":206,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-down-3":{"frame":{"x":274,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-down-4":{"frame":{"x":342,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-down-5":{"frame":{"x":410,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-left-0":{"frame":{"x":478,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-left-1":{"frame":{"x":546,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-left-2":{"frame":{"x":546,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-left-3":{"frame":{"x":546,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-left-4":{"frame":{"x":546,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-left-5":{"frame":{"x":546,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-right-0":{"frame":{"x":546,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-right-1":{"frame":{"x":546,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-right-2":{"frame":{"x":546,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-right-3":{"frame":{"x":2,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-right-4":{"frame":{"x":70,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-right-5":{"frame":{"x":138,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-up-0":{"frame":{"x":206,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-up-1":{"frame":{"x":274,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-up-2":{"frame":{"x":342,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-up-3":{"frame":{"x":410,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-up-4":{"frame":{"x":478,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/fist-up-5":{"frame":{"x":546,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/left-0":{"frame":{"x":614,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/up-8":{"frame":{"x":478,"y":818,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/left-2":{"frame":{"x":614,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/left-3":{"frame":{"x":614,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/left-4":{"frame":{"x":614,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/left-5":{"frame":{"x":614,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/left-6":{"frame":{"x":614,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/left-7":{"frame":{"x":614,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/left-8":{"frame":{"x":614,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/right-0":{"frame":{"x":2,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/right-1":{"frame":{"x":70,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/right-2":{"frame":{"x":138,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/right-3":{"frame":{"x":206,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/right-4":{"frame":{"x":274,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/right-5":{"frame":{"x":342,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/right-6":{"frame":{"x":410,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/right-7":{"frame":{"x":478,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/right-8":{"frame":{"x":546,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-down-0":{"frame":{"x":614,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-down-1":{"frame":{"x":682,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-down-2":{"frame":{"x":682,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-down-3":{"frame":{"x":682,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-down-4":{"frame":{"x":682,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-down-5":{"frame":{"x":682,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-down-6":{"frame":{"x":682,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-down-7":{"frame":{"x":682,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-left-0":{"frame":{"x":682,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-left-1":{"frame":{"x":682,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-left-2":{"frame":{"x":682,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-left-3":{"frame":{"x":2,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-left-4":{"frame":{"x":70,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-left-5":{"frame":{"x":138,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-left-6":{"frame":{"x":206,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-left-7":{"frame":{"x":274,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-right-0":{"frame":{"x":342,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-right-1":{"frame":{"x":410,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-right-2":{"frame":{"x":478,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-right-3":{"frame":{"x":546,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-right-4":{"frame":{"x":614,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-right-5":{"frame":{"x":682,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-right-6":{"frame":{"x":750,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-right-7":{"frame":{"x":750,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-up-0":{"frame":{"x":750,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-up-1":{"frame":{"x":750,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-up-2":{"frame":{"x":750,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-up-3":{"frame":{"x":750,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-up-4":{"frame":{"x":750,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-up-5":{"frame":{"x":750,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-up-6":{"frame":{"x":750,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/spear-up-7":{"frame":{"x":750,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-down-0":{"frame":{"x":750,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-down-1":{"frame":{"x":2,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-down-2":{"frame":{"x":70,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-down-3":{"frame":{"x":138,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-down-4":{"frame":{"x":206,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-down-5":{"frame":{"x":274,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-left-0":{"frame":{"x":342,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-left-1":{"frame":{"x":410,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-left-2":{"frame":{"x":478,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-left-3":{"frame":{"x":546,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-left-4":{"frame":{"x":614,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-left-5":{"frame":{"x":682,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-right-0":{"frame":{"x":750,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-right-1":{"frame":{"x":818,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-right-2":{"frame":{"x":818,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-right-3":{"frame":{"x":818,"y":138,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-right-4":{"frame":{"x":818,"y":206,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-right-5":{"frame":{"x":818,"y":274,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-up-0":{"frame":{"x":818,"y":342,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-up-1":{"frame":{"x":818,"y":410,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-up-2":{"frame":{"x":818,"y":478,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-up-3":{"frame":{"x":818,"y":546,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-up-4":{"frame":{"x":818,"y":614,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/sword-up-5":{"frame":{"x":818,"y":682,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/up-0":{"frame":{"x":818,"y":750,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/up-1":{"frame":{"x":2,"y":818,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/up-2":{"frame":{"x":70,"y":818,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/up-3":{"frame":{"x":138,"y":818,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/up-4":{"frame":{"x":206,"y":818,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/up-5":{"frame":{"x":274,"y":818,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/up-6":{"frame":{"x":342,"y":818,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/up-7":{"frame":{"x":410,"y":818,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}},"sprites/player/arrow-down-1":{"frame":{"x":614,"y":70,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}}}};

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/14ee55c8b4b8c8dfb49322478df2f5a2.png";

/***/ }),

/***/ 229:
/***/ (function(module) {

module.exports = {"meta":{"image":"placeholder.png","size":{"w":20,"h":20},"scale":"1","hash":"4100ad0becb2f0741421e7baced474662f01332b"},"frames":{"sprites/placeholder/square":{"frame":{"x":2,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}}}};

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/cbecab81f1f8884a561e500b807c5d7d.png";

/***/ }),

/***/ 231:
/***/ (function(module) {

module.exports = {"meta":{"image":"objects.png","size":{"w":216,"h":180},"scale":"1","hash":"97ef076ba12449d85e0c511847ac77e48d0cf031"},"frames":{"sprites/objects/berrybush-berries":{"frame":{"x":38,"y":2,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/flower-stem-1":{"frame":{"x":2,"y":2,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/bones":{"frame":{"x":2,"y":38,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/bush":{"frame":{"x":38,"y":38,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/cactus":{"frame":{"x":74,"y":2,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/cross":{"frame":{"x":74,"y":38,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/fern-1":{"frame":{"x":2,"y":74,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/fern-2":{"frame":{"x":38,"y":74,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/fern-3":{"frame":{"x":74,"y":74,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/flower-petal-1":{"frame":{"x":110,"y":2,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/flower-petal-2":{"frame":{"x":110,"y":38,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/flower-petal-3":{"frame":{"x":110,"y":74,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/flower-petal-4":{"frame":{"x":2,"y":110,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/tree-spruce":{"frame":{"x":182,"y":38,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/flower-stem-2":{"frame":{"x":74,"y":110,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/flower-stem-3":{"frame":{"x":110,"y":110,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/flower-stem-4":{"frame":{"x":146,"y":2,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/pillar-1":{"frame":{"x":146,"y":38,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/pillar-2":{"frame":{"x":146,"y":74,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/pillar-3":{"frame":{"x":146,"y":110,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/rocks-1":{"frame":{"x":2,"y":146,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/rocks-2":{"frame":{"x":38,"y":146,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/rocks-3":{"frame":{"x":74,"y":146,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/stone":{"frame":{"x":110,"y":146,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/tree-coco":{"frame":{"x":146,"y":146,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/tree-oak":{"frame":{"x":182,"y":2,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"sprites/objects/berrybush-bush":{"frame":{"x":38,"y":110,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}}}};

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/80d16f4a37bafae97d6525bd52105580.png";

/***/ }),

/***/ 233:
/***/ (function(module) {

module.exports = {"meta":{"image":"items.png","size":{"w":196,"h":168},"scale":"1","hash":"d9130ab1c7d83f16ed6cd0a61db5616d106c13a4"},"frames":{"sprites/items/arrow-fletch":{"frame":{"x":30,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/flower-petal-4":{"frame":{"x":2,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/arrow":{"frame":{"x":2,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/berries-1":{"frame":{"x":30,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/berries-2":{"frame":{"x":58,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/berries-3":{"frame":{"x":58,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/berries-4":{"frame":{"x":2,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/bone":{"frame":{"x":30,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/boots-right":{"frame":{"x":58,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/boots":{"frame":{"x":86,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/bow-string":{"frame":{"x":86,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/bow":{"frame":{"x":86,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/chestplate-belt":{"frame":{"x":2,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/chestplate-left":{"frame":{"x":30,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/chestplate-right":{"frame":{"x":58,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/chestplate":{"frame":{"x":86,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/dust":{"frame":{"x":114,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/fang":{"frame":{"x":114,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/flower-petal-1":{"frame":{"x":114,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/flower-petal-2":{"frame":{"x":114,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/flower-petal-3":{"frame":{"x":2,"y":114,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/wood":{"frame":{"x":170,"y":142,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/flower-stem-1":{"frame":{"x":58,"y":114,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/flower-stem-2":{"frame":{"x":86,"y":114,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/flower-stem-3":{"frame":{"x":114,"y":114,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/flower-stem-4":{"frame":{"x":142,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/gel":{"frame":{"x":142,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/leaf":{"frame":{"x":142,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/leggings-left":{"frame":{"x":142,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/leggings-right":{"frame":{"x":142,"y":114,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/leggings":{"frame":{"x":2,"y":142,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/rod":{"frame":{"x":30,"y":142,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/scale":{"frame":{"x":58,"y":142,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/skin":{"frame":{"x":86,"y":142,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/solution-overlay":{"frame":{"x":114,"y":142,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/solution":{"frame":{"x":142,"y":142,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/spear-head":{"frame":{"x":170,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/spear":{"frame":{"x":170,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/stone":{"frame":{"x":170,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/sword-blade":{"frame":{"x":170,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/sword":{"frame":{"x":170,"y":114,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/items/arrow-head":{"frame":{"x":30,"y":114,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}}}};

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/b30d95b19a67c96aa17f568568cc3bea.png";

/***/ }),

/***/ 235:
/***/ (function(module) {

module.exports = {"meta":{"image":"equipment.png","size":{"w":140,"h":112},"scale":"1","hash":"1dc7c10ccf789b2073e228404485f80c51c63081"},"frames":{"sprites/equipment/arrow-fletch":{"frame":{"x":30,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/chestplate-left":{"frame":{"x":2,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/arrow-shaft":{"frame":{"x":2,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/boots-left":{"frame":{"x":30,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/boots-right":{"frame":{"x":58,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/bow-limb":{"frame":{"x":58,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/bow-string":{"frame":{"x":2,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/chestplate-belt":{"frame":{"x":30,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/chestplate-bottom":{"frame":{"x":58,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/sword-hilt":{"frame":{"x":114,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/chestplate-right":{"frame":{"x":86,"y":30,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/leggings-left":{"frame":{"x":86,"y":58,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/leggings-right":{"frame":{"x":2,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/leggings-top":{"frame":{"x":30,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/spear-head":{"frame":{"x":58,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/spear-shaft":{"frame":{"x":86,"y":86,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/sword-blade":{"frame":{"x":114,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}},"sprites/equipment/arrow-head":{"frame":{"x":86,"y":2,"w":24,"h":24},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":24,"h":24},"sourceSize":{"w":24,"h":24}}}};

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/ec95783fec56e1e2460c4f37ad99afa0.png";

/***/ }),

/***/ 237:
/***/ (function(module) {

module.exports = {"meta":{"image":"effects.png","size":{"w":60,"h":60},"scale":"1","hash":"3cdbd0800fb42987c2a94b3b09ddbe030f3f6c21"},"frames":{"sprites/effects/def-break":{"frame":{"x":2,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/effects/poison":{"frame":{"x":22,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/effects/regen":{"frame":{"x":2,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/effects/resistance":{"frame":{"x":22,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/effects/slowness":{"frame":{"x":42,"y":2,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/effects/speed":{"frame":{"x":42,"y":22,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/effects/strength":{"frame":{"x":2,"y":42,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}},"sprites/effects/weakness":{"frame":{"x":22,"y":42,"w":16,"h":16},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":16,"h":16},"sourceSize":{"w":16,"h":16}}}};

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/cd77bfe99eaf472b92eeb4aedfadc9ef.png";

/***/ }),

/***/ 239:
/***/ (function(module) {

module.exports = {"meta":{"image":"dragons.png","size":{"w":208,"h":140},"scale":"1","hash":"913507f469df36c7256a337e11abf4d3e1db9b10"},"frames":{"sprites/dragons/left-0":{"frame":{"x":2,"y":2,"w":66,"h":66},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":66,"h":66},"sourceSize":{"w":66,"h":66}},"sprites/dragons/left-1":{"frame":{"x":72,"y":2,"w":66,"h":66},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":66,"h":66},"sourceSize":{"w":66,"h":66}},"sprites/dragons/right-0":{"frame":{"x":2,"y":72,"w":66,"h":66},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":66,"h":66},"sourceSize":{"w":66,"h":66}},"sprites/dragons/right-1":{"frame":{"x":72,"y":72,"w":66,"h":66},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":66,"h":66},"sourceSize":{"w":66,"h":66}},"sprites/dragons/egg":{"frame":{"x":142,"y":2,"w":64,"h":64},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":64,"h":64},"sourceSize":{"w":64,"h":64}}}};

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./fonts/Unibody8Pro-Bold.otf": 186,
	"./fonts/Unibody8Pro-Regular.otf": 187,
	"./fonts/Unibody8Pro-RegularItalic.otf": 185,
	"./fonts/unscii-16.woff": 184,
	"./sprites/dragons.json": 239,
	"./sprites/dragons.png": 238,
	"./sprites/effects.json": 237,
	"./sprites/effects.png": 236,
	"./sprites/equipment.json": 235,
	"./sprites/equipment.png": 234,
	"./sprites/items.json": 233,
	"./sprites/items.png": 232,
	"./sprites/objects.json": 231,
	"./sprites/objects.png": 230,
	"./sprites/placeholder.json": 229,
	"./sprites/placeholder.png": 228,
	"./sprites/player.json": 227,
	"./sprites/player.png": 226,
	"./sprites/projectiles.json": 225,
	"./sprites/projectiles.png": 224,
	"./sprites/skeleton.json": 223,
	"./sprites/skeleton.png": 222,
	"./sprites/terrains.json": 221,
	"./sprites/terrains.png": 220,
	"./sprites/ui.json": 219,
	"./sprites/ui.png": 218
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 240;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(72)(false);
// imports


// module
exports.push([module.i, ".console {\n  z-index: 10;\n\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n\n  pointer-events: none;\n  visibility: hidden;\n  display: flex;\n  flex-direction: column;\n}\n\n.console *::selection {\n  background: rgba(0, 0, 0, 0.25);\n}\n\n.console.active {\n  visibility: visible;\n}\n\n.console * {\n  cursor: default;\n  font-family: Unscii;\n  font-size: 32px;\n  box-sizing: border-box;\n}\n\n.con-log-box {\n  flex: 1;\n  position: relative;\n}\n\n.con-log-scroll {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n\n  background: rgba(255, 255, 255, 0.6);\n  width: 850px;\n  max-height: 800px;\n  pointer-events: auto;\n\n  overflow-y: auto;\n}\n\n.con-log {\n  padding: 4px;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n\n.con-log:empty {\n  padding: 0;\n}\n\n.con-log-entry {\n  display: block;\n  padding: 4px;\n  color: #000000;\n  white-space: pre;\n}\n\n.con-input {\n  height: 64px;\n  width: 100%;\n\n  background: rgba(255, 255, 255, 0.6);\n  color: #000000;\n  outline: none;\n  border: none;\n  border-top: 1px solid #202020;\n  padding: 16px;\n  pointer-events: auto;\n}", ""]);

// exports


/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(241);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(71)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EffectDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Effects; });
var EffectDef;
(function (EffectDef) {
    let Type;
    (function (Type) {
        Type["Stunned"] = "stunned";
        Type["Knockback"] = "knockback";
        Type["KnockbackResist"] = "knockback-resist";
        Type["Heal"] = "heal";
        Type["Damage"] = "damage";
        Type["Regen"] = "regen";
        Type["Poison"] = "poison";
        Type["Strength"] = "strength";
        Type["Weakness"] = "weakness";
        Type["Resistance"] = "resistance";
        Type["DefBreak"] = "def-break";
        Type["Speed"] = "speed";
        Type["Slowness"] = "slowness";
        Type["VitalityUp"] = "vit-up";
        Type["VitalityDown"] = "vit-down";
    })(Type = EffectDef.Type || (EffectDef.Type = {}));
})(EffectDef || (EffectDef = {}));
function effect(name, description, visible = true) {
    return { name, description, visible };
}
const Effects = {
    // technical effects
    [EffectDef.Type.Stunned]: effect('Stunned', 'Cannot move or attack', false),
    [EffectDef.Type.Knockback]: effect('Knockback', 'Cannot move', false),
    [EffectDef.Type.KnockbackResist]: effect('Knockback Resistance', 'Resist knockback', false),
    // actual effects
    [EffectDef.Type.Heal]: effect('Heal', 'Recover <power> HP', false),
    [EffectDef.Type.Damage]: effect('Damage', 'Damage <power> HP', false),
    [EffectDef.Type.Regen]: effect('Regeneration', 'Recover <power> HP regularly'),
    [EffectDef.Type.Poison]: effect('Poison', 'Lose <power> HP regularly'),
    [EffectDef.Type.Strength]: effect('Strength', 'Increase strength by <power>'),
    [EffectDef.Type.Weakness]: effect('Weakness', 'Decrease strength by <power>'),
    [EffectDef.Type.Resistance]: effect('Resistance', 'Increase defense by <power>'),
    [EffectDef.Type.DefBreak]: effect('Defense Break', 'Decrease defense by <power>'),
    [EffectDef.Type.Speed]: effect('Speed', 'Increase speed by <power>'),
    [EffectDef.Type.Slowness]: effect('Slowness', 'Decrease speed by <power>'),
    [EffectDef.Type.VitalityUp]: effect('Vitality Up', 'Increase vitality by <power>'),
    [EffectDef.Type.VitalityDown]: effect('Vitality Down', 'Decrease vitality by <power>'),
};


/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return compute; });
/* harmony import */ var common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var data_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var data_elements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);



function computeEffect(element, strength, strengths) {
    switch (element) {
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Life:
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Recovery: {
            let amount = strength * 100;
            if (element === data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Life)
                amount *= 0.5;
            let duration = 0;
            if (strengths[data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Time] > strength * 0.5) {
                duration = strengths[data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Time] * 30000;
                amount = amount / duration * 1500;
                return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.Regen, amount, duration);
            }
            else {
                return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.Heal, amount, 0);
            }
        }
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Void:
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Injury: {
            let amount = strength * 50;
            if (element === data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Void)
                amount *= 0.3;
            let duration = 0;
            if (strengths[data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Time] > strength * 0.5) {
                duration = strengths[data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Time] * 20000;
                amount = amount / duration * 1500;
                return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.Poison, amount, duration);
            }
            else {
                return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.Damage, amount, 0);
            }
        }
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Defense: {
            let amount = strength * 50;
            if (strengths[data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Void] > strength * 0.5)
                return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.DefBreak, amount, 10000);
            else
                return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.Resistance, amount, 10000);
        }
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Motion: {
            let amount = strength * 50;
            return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.Speed, amount, 10000);
        }
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Frost:
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Capture: {
            let amount = strength * 50;
            if (element === data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Capture)
                amount *= 1.5;
            return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.Slowness, amount, 10000);
        }
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Energy: {
            let amount = strength * 25;
            return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.Strength, amount, 10000);
        }
        case data_elements__WEBPACK_IMPORTED_MODULE_2__[/* ElementDef */ "a"].Type.Weakness: {
            let amount = strength * 25;
            return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* makeEffect */ "b"])(data_effects__WEBPACK_IMPORTED_MODULE_1__[/* EffectDef */ "a"].Type.Weakness, amount, 10000);
        }
    }
}
function compute(aspects) {
    return Object(common_logic_effect_common__WEBPACK_IMPORTED_MODULE_0__[/* computeEffects */ "a"])(aspects, computeEffect);
}


/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(367);
exports = module.exports = __webpack_require__(72)(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  background: #202020;\n  overflow: hidden;\n}\n\n.vex * {\n  font-family: Unscii !important;\n  font-weight: bold !important;\n  font-size: 16px !important;\n}\n\ncanvas {\n  image-rendering: crisp-edges;\n  image-rendering: pixelated;\n}\n\n@font-face {\n  font-family: \"Unibody8Pro\";\n  src: url(" + escape(__webpack_require__(187)) + ") format(\"opentype\")\n}\n\n@font-face {\n  font-family: \"Unibody8Pro\";\n  font-weight: bold;\n  src: url(" + escape(__webpack_require__(186)) + ") format(\"opentype\")\n}\n\n@font-face {\n  font-family: \"Unibody8Pro\";\n  font-style: italic;\n  src: url(" + escape(__webpack_require__(185)) + ") format(\"opentype\")\n}\n\n@font-face {\n  font-family: \"Unscii\";\n  font-weight: bold;\n  src: url(" + escape(__webpack_require__(184)) + ") format(\"woff\")\n}", ""]);

// exports


/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(368);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(71)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ElementDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Elements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ElementLookup; });
var ElementDef;
(function (ElementDef) {
    ElementDef.MaxTier = 3;
    let Type;
    (function (Type) {
        Type["Fire"] = "Fire";
        Type["Water"] = "Water";
        Type["Order"] = "Order";
        Type["Chaos"] = "Chaos";
        Type["Void"] = "Void";
        Type["Light"] = "Light";
        Type["Energy"] = "Energy";
        Type["Frost"] = "Frost";
        Type["Motion"] = "Motion";
        Type["Life"] = "Life";
        Type["Defense"] = "Defense";
        Type["Recovery"] = "Recovery";
        Type["Time"] = "Time";
        Type["Explosion"] = "Explosion";
        Type["Injury"] = "Injury";
        Type["Darkness"] = "Darkness";
        Type["Weakness"] = "Weakness";
        Type["Spirit"] = "Spirit";
        Type["Capture"] = "Capture";
        Type["Sense"] = "Sense";
        Type["Absorption"] = "Absorption";
        Type["Cognition"] = "Cognition";
        Type["Deception"] = "Deception";
    })(Type = ElementDef.Type || (ElementDef.Type = {}));
})(ElementDef || (ElementDef = {}));
function element(tier, name, composition) {
    return {
        tier,
        name,
        composition
    };
}
const Elements = [
    element(0, ElementDef.Type.Fire),
    element(0, ElementDef.Type.Water),
    element(0, ElementDef.Type.Order),
    element(0, ElementDef.Type.Chaos),
    element(1, ElementDef.Type.Void, [ElementDef.Type.Fire, ElementDef.Type.Water]),
    element(1, ElementDef.Type.Light, [ElementDef.Type.Fire, ElementDef.Type.Order]),
    element(1, ElementDef.Type.Energy, [ElementDef.Type.Fire, ElementDef.Type.Chaos]),
    element(1, ElementDef.Type.Frost, [ElementDef.Type.Water, ElementDef.Type.Order]),
    element(1, ElementDef.Type.Motion, [ElementDef.Type.Water, ElementDef.Type.Chaos]),
    element(1, ElementDef.Type.Life, [ElementDef.Type.Order, ElementDef.Type.Chaos]),
    element(2, ElementDef.Type.Defense, [ElementDef.Type.Order, ElementDef.Type.Void]),
    element(2, ElementDef.Type.Recovery, [ElementDef.Type.Order, ElementDef.Type.Life]),
    element(2, ElementDef.Type.Time, [ElementDef.Type.Order, ElementDef.Type.Motion]),
    element(2, ElementDef.Type.Explosion, [ElementDef.Type.Chaos, ElementDef.Type.Energy]),
    element(2, ElementDef.Type.Injury, [ElementDef.Type.Chaos, ElementDef.Type.Life]),
    element(2, ElementDef.Type.Darkness, [ElementDef.Type.Void, ElementDef.Type.Light]),
    element(2, ElementDef.Type.Weakness, [ElementDef.Type.Void, ElementDef.Type.Energy]),
    element(2, ElementDef.Type.Spirit, [ElementDef.Type.Energy, ElementDef.Type.Life]),
    element(2, ElementDef.Type.Capture, [ElementDef.Type.Frost, ElementDef.Type.Motion]),
    element(3, ElementDef.Type.Sense, [ElementDef.Type.Motion, ElementDef.Type.Spirit]),
    element(3, ElementDef.Type.Absorption, [ElementDef.Type.Recovery, ElementDef.Type.Spirit]),
    element(3, ElementDef.Type.Cognition, [ElementDef.Type.Time, ElementDef.Type.Spirit]),
    element(3, ElementDef.Type.Deception, [ElementDef.Type.Weakness, ElementDef.Type.Spirit]),
];
const ElementLookup = Object.assign({}, ...Elements.map(elem => ({ [elem.name]: elem })));


/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return blend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return random; });
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);
/* harmony import */ var chroma_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chroma_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var common_random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);


function blend(colors) {
    const rgb = [0, 0, 0];
    let total = 0;
    for (const { color, weight } of colors) {
        const elemColor = color;
        const w = weight || 1;
        rgb[0] += ((elemColor >> 16) & 0xff) * w;
        rgb[1] += ((elemColor >> 8) & 0xff) * w;
        rgb[2] += ((elemColor >> 0) & 0xff) * w;
        total += w;
    }
    return ((Math.floor(rgb[0] / total) << 16) +
        (Math.floor(rgb[1] / total) << 8) +
        (Math.floor(rgb[2] / total) << 0));
}
function random(lightness, chroma, random = Math.random) {
    const h = random() * 360;
    const l = Object(common_random__WEBPACK_IMPORTED_MODULE_1__[/* randomValue */ "c"])(lightness, random) * 100;
    const c = Object(common_random__WEBPACK_IMPORTED_MODULE_1__[/* randomValue */ "c"])(chroma, random) * 100;
    return Object(chroma_js__WEBPACK_IMPORTED_MODULE_0__["lch"])(l, c, h).hex().substr(1);
}


/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return scaleAspects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makeEffect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return computeEffects; });
/* harmony import */ var common_logic_alchemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var data_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(204);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(203);



function scaleAspects(aspects, scale) {
    return aspects.map(({ element, amount }) => ({ element, amount: amount * scale }));
}
function makeEffect(effect, power, duration, element) {
    power = Math.round(power);
    duration = Object(lodash__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(duration, -2);
    const name = data_effects__WEBPACK_IMPORTED_MODULE_1__[/* Effects */ "b"][effect].name;
    const description = data_effects__WEBPACK_IMPORTED_MODULE_1__[/* Effects */ "b"][effect].description.replace('<power>', power.toString()) +
        (duration ? ` for ${Object(lodash__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(duration / 1000)} seconds` : '');
    return {
        type: effect,
        name, description,
        power, element, duration
    };
}
const StrengthThreshold = 0.1;
function computeStrength(amount, total) {
    const purity = amount / total;
    const power = Math.pow(amount / common_logic_alchemy__WEBPACK_IMPORTED_MODULE_0__[/* MaxAspects */ "a"], 0.75);
    const strength = purity * power;
    return strength;
}
function computeEffects(aspects, compute, threshold = StrengthThreshold) {
    let total = 0;
    for (const { amount } of aspects)
        total += amount;
    const strengths = Object(lodash__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(aspects.map(({ element, amount }) => [element, computeStrength(amount, total)]).sort((a, b) => b[1] - a[1]));
    const effects = [];
    for (const element of Object.keys(strengths)) {
        const strength = strengths[element];
        if (strength < threshold)
            continue;
        const effect = compute(element, strength, strengths);
        if (effect)
            effects.push(effect);
    }
    return effects;
}


/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/common/lib/foswig.ts
/**
@license Foswig.js | (c) Glenn Conner. | https://github.com/mrsharpoblunto/foswig.js/blob/master/LICENSE
*/
// Ported to TypeScript
// Modified to accept custom random function
class Node {
    constructor(character) {
        this.character = character;
        this.neighbors = [];
    }
}
class TrieNode {
    constructor() {
        this.children = {};
    }
}
function addToDuplicatesTrie(word, duplicates) {
    if (word.length > 1) {
        addToDuplicatesTrie(word.substr(1), duplicates);
    }
    var currentNode = duplicates;
    for (var i = 0; i < word.length; ++i) {
        var childNode = currentNode.children[word[i]];
        if (!childNode) {
            childNode = new TrieNode();
            currentNode.children[word[i]] = childNode;
        }
        currentNode = childNode;
    }
}
function isDuplicate(word, duplicates) {
    word = word.toLowerCase();
    var currentNode = duplicates;
    for (var i = 0; i < word.length; ++i) {
        var childNode = currentNode.children[word[i]];
        if (!childNode)
            return false;
        currentNode = childNode;
    }
    return true;
}
class Foswig {
    constructor(order) {
        this.order = order;
        this.duplicates = new TrieNode();
        this.start = new Node('');
        this.map = {};
    }
    addWordsToChain(words) {
        for (var i = 0; i < words.length; ++i) {
            this.addWordToChain(words[i]);
        }
    }
    addWordToChain(word) {
        addToDuplicatesTrie(word.toLowerCase(), this.duplicates);
        var previous = this.start;
        var key = '';
        for (var i = 0; i < word.length; ++i) {
            var ch = word[i];
            key += ch;
            if (key.length > this.order) {
                key = key.substr(1);
            }
            var newNode = this.map[key];
            if (!newNode) {
                newNode = new Node(ch);
                this.map[key] = newNode;
            }
            previous.neighbors.push(newNode);
            previous = newNode;
        }
        //link to end node.
        previous.neighbors.push(null);
    }
    generateWord(minLength = 0, maxLength = -1, allowDuplicates = true, maxAttempts = 25, random = Math.random) {
        var word;
        var repeat;
        var attempts = 0;
        do {
            repeat = false;
            var nextNodeIndex = Math.floor(random() * this.start.neighbors.length);
            var currentNode = this.start.neighbors[nextNodeIndex];
            word = '';
            while (currentNode && (maxLength < 0 || word.length <= maxLength)) {
                word += currentNode.character;
                nextNodeIndex = Math.floor(random() * currentNode.neighbors.length);
                currentNode = currentNode.neighbors[nextNodeIndex];
            }
            if (word.length > maxLength || word.length < minLength) {
                repeat = true;
            }
        } 
        // we don't want to output any exact replicas from the input dictionary
        while (repeat || (!allowDuplicates && ++attempts < maxAttempts && isDuplicate(word, this.duplicates)));
        if (attempts >= maxAttempts) {
            throw new Error('Unable to generate a word with the given parameters after ' + attempts + ' attempts');
        }
        return word;
    }
}

// CONCATENATED MODULE: ./src/data/names.ts
// Dataset retrieved from wikidata
// Licensed under CC0
const SpeciesNames = [
    'abachi',
    'abacops',
    'abashicus',
    'abensis',
    'abetoneensis',
    'aboriscus',
    'abrictos',
    'abroscelis',
    'abrotocrinus',
    'absalomichthys',
    'abundum',
    'acalophaena',
    'acanthocladi',
    'acanthofemurilis',
    'acceia',
    'accusator',
    'aceroae',
    'achaeae',
    'achillae',
    'achtyca',
    'acinopterus',
    'acmeceps',
    'acmonia',
    'acochlidioida',
    'acompus',
    'acrasidae',
    'acroceuthes',
    'acropsis',
    'actaeifolium',
    'actileuca',
    'actinocalyx',
    'actinodontidae',
    'actinodurae',
    'acugni',
    'acunae',
    'acutipoditus',
    'acutiscutellum',
    'acutispinata',
    'adilophontes',
    'adornatalis',
    'adramitana',
    'advarians',
    'aedoea',
    'aemulatrix',
    'aeneocupreus',
    'aequiflexa',
    'aequilumata',
    'aericeps',
    'aerophilum',
    'aeroppia',
    'aeschynomene',
    'aethiopicodynerus',
    'aethodelphax',
    'aetosaurinae',
    'affaber',
    'afghanistanicum',
    'afreutreta',
    'afrobolivina',
    'afrogypsa',
    'afrojavanica',
    'afroscardia',
    'afrotremex',
    'agamarum',
    'aganacma',
    'aganipus',
    'agardhina',
    'agaricostilbales',
    'agastor',
    'agnina',
    'agnostos',
    'agolambrus',
    'agonismus',
    'agrabeeja',
    'agraptocoris',
    'aguanueva',
    'aguaytiella',
    'aguirreanus',
    'ahermodontus',
    'ahldreva',
    'ajubensis',
    'akaisialpina',
    'alakoliense',
    'alantika',
    'alarodia',
    'albifulgens',
    'albitarsus',
    'albius',
    'albocitrina',
    'albocitrinus',
    'albogriseella',
    'albolabratus',
    'aleata',
    'alecanopsis',
    'aleophilum',
    'aleuti',
    'algrizea',
    'alibertioides',
    'alitaeus',
    'allantois',
    'allarithmus',
    'alleocomatella',
    'allineata',
    'allolaterita',
    'allomorphinoides',
    'allotheca',
    'alloxacis',
    'almogaver',
    'alocypha',
    'alpigenes',
    'alsinastrum',
    'alsobacter',
    'alternicirrus',
    'alternimaculata',
    'altescandens',
    'altistrix',
    'alutellus',
    'alvariella',
    'alyeskaensis',
    'amamiconcha',
    'amantichitinum',
    'amaris',
    'amarygia',
    'amathimysis',
    'amazonicesa',
    'ambita',
    'ambovestita',
    'americorophium',
    'ametroides',
    'amidalae',
    'amideta',
    'amisadaiae',
    'ammobium',
    'amoebophryaceae',
    'ampelioides',
    'ampelopsisella',
    'amphiascus',
    'amphiheloides',
    'ampliator',
    'amplicolle',
    'amyntula',
    'amyris',
    'anafense',
    'anagastus',
    'anancosorius',
    'anaperidae',
    'anargyrtes',
    'anarsiae',
    'anathyrsa',
    'anatotitan',
    'anchises',
    'ancistrifolia',
    'ancistrocladus',
    'ancylostomia',
    'ancylus',
    'ancystropodium',
    'anderisus',
    'andocidia',
    'andranotobakensis',
    'anendopodia',
    'anepsirhizomys',
    'aneuvittata',
    'angraecinae',
    'angusticincta',
    'angusticlavius',
    'angustilamella',
    'angustimembranus',
    'angustiplatus',
    'anheteromeyenia',
    'anillochlamys',
    'anischiinae',
    'anisopaulax',
    'ankarapithecus',
    'ankaratrotrox',
    'ankylodon',
    'annaimallaiensis',
    'anodontophora',
    'anodorhynchus',
    'anonera',
    'anorhaebus',
    'antarxata',
    'antelientomon',
    'antennulata',
    'anteos',
    'anteridata',
    'anthepiscopus',
    'anthicimorphus',
    'antibodies',
    'antiincrescens',
    'antillanorchis',
    'antipoloensis',
    'antistydatusa',
    'anurophylla',
    'anxioides',
    'anydrophilini',
    'anyllis',
    'aonidiae',
    'apaloxylon',
    'apameina',
    'apanthuropsis',
    'apechthes',
    'aphaenogasteroides',
    'aphiocephalus',
    'apicealba',
    'apicinigrella',
    'apicobystra',
    'apinae',
    'apiocystinae',
    'aplysinellidae',
    'apocarpum',
    'apogonis',
    'apomastus',
    'aponius',
    'aposteira',
    'apparicianum',
    'apparitrix',
    'appressihirtus',
    'apricans',
    'apsilinae',
    'apteralium',
    'apterobrachys',
    'apterygodonia',
    'apterygon',
    'aqualupianus',
    'aquinia',
    'arabesca',
    'arachoides',
    'araracuarae',
    'aravanense',
    'arawakorum',
    'arceuthoides',
    'archangelskii',
    'archeosetus',
    'archichthys',
    'archicnephasia',
    'archiphysa',
    'architectonicacea',
    'archocelis',
    'archolabus',
    'arcidopsis',
    'arcifera',
    'arctopacifica',
    'ardeola',
    'ardesia',
    'arduous',
    'arenonionella',
    'argentae',
    'argopus',
    'argusmontana',
    'argutana',
    'argyrothrix',
    'ariantinae',
    'arigonis',
    'arilaringa',
    'ariphanarthra',
    'aristeis',
    'aristosquamosa',
    'arkarua',
    'armoracioides',
    'arnoldi',
    'arrawarricum',
    'arrhythmopis',
    'artaversala',
    'artemisifolium',
    'artericus',
    'artodiscus',
    'artoventris',
    'artumbilicatum',
    'arturoana',
    'arutunjani',
    'aselliata',
    'asestra',
    'ashlaiana',
    'aspenitinae',
    'aspidophryxus',
    'aspidopora',
    'asprospilos',
    'assimulatana',
    'asterosporiaceae',
    'astrapetes',
    'astraspida',
    'asturasoma',
    'asymmetrarcha',
    'asymmetrurus',
    'ateleopodidae',
    'atilia',
    'atractosteus',
    'atraphaxifolius',
    'atringa',
    'atrivaria',
    'atroclypeata',
    'atroviridaria',
    'attenata',
    'atypicalis',
    'atypicus',
    'audeti',
    'audreia',
    'aulacoceras',
    'aulorhynchidae',
    'aulosaphoides',
    'aurataeformis',
    'aurearenaceae',
    'aurilineata',
    'aussiorum',
    'australiphemeridae',
    'australodaphnia',
    'australosphenida',
    'austrinata',
    'austroagrion',
    'austrohormiini',
    'austrokarelicus',
    'autarchoglossa',
    'avarus',
    'avelingiae',
    'avuncula',
    'axnpelopsis',
    'azotostoma',
    'babaensis',
    'baborensis',
    'babukellinae',
    'bacarum',
    'backusella',
    'badiifolia',
    'badiusalis',
    'baehnii',
    'baeoptila',
    'baeosomus',
    'baeotica',
    'baicalinella',
    'baiochii',
    'bakeri',
    'balanarcha',
    'balchhi',
    'balingiti',
    'baliogaster',
    'balliana',
    'baltimoriana',
    'balvei',
    'bambusioides',
    'bamiani',
    'bampurius',
    'bancroftianus',
    'bankoi',
    'baracoalis',
    'barattolites',
    'barbeliana',
    'barbillana',
    'bareinus',
    'barksdalei',
    'barnebianum',
    'baroringensis',
    'barsac',
    'barsakelmes',
    'barskovi',
    'basibulbus',
    'basilisi',
    'basipecten',
    'basipterini',
    'basirei',
    'bastardoanus',
    'bathrogramma',
    'bathycranium',
    'batocaulon',
    'batomys',
    'beatleyae',
    'beaumontianus',
    'bebile',
    'bedeshai',
    'bedfordianus',
    'beharii',
    'beketi',
    'bellera',
    'bellicula',
    'beloti',
    'benacoceras',
    'beneluzi',
    'benignalis',
    'bergenhayni',
    'berlandiella',
    'berlesedesmus',
    'berlinafricanus',
    'bermudagidiella',
    'bernalei',
    'bertarollae',
    'bethelium',
    'betonicifolium',
    'betschi',
    'betsiloensis',
    'biapertura',
    'bibbia',
    'bibiolona',
    'biblianum',
    'bibractella',
    'bicelli',
    'biceropsis',
    'bicophaga',
    'bicornuatus',
    'bicucullus',
    'bidenticeps',
    'bidentulum',
    'bidiense',
    'bidiscus',
    'bifidentata',
    'biincisa',
    'bilirana',
    'biloborostratus',
    'bilsana',
    'bimucronota',
    'biobessa',
    'biparta',
    'bipartipes',
    'biramulata',
    'biritika',
    'birnovensis',
    'biruncinata',
    'bisbimaculata',
    'bismila',
    'bispirale',
    'bissexnotata',
    'bistrigata',
    'biuterinus',
    'blaesodactylus',
    'blakesleeanus',
    'blaseii',
    'blattinopsidae',
    'bleura',
    'bocasdeltoroensis',
    'bodmeri',
    'boingaei',
    'bojamyces',
    'bokariana',
    'bolivaria',
    'bolodon',
    'bolsaticus',
    'bombacoideae',
    'bombella',
    'bonaducecytheridae',
    'bonaia',
    'bononiensis',
    'bonplandius',
    'bonseyi',
    'bonzia',
    'boopsis',
    'borderii',
    'borealia',
    'borealotodus',
    'boreococcus',
    'boripat',
    'borneichus',
    'bornesalpinia',
    'bosmani',
    'bosniaca',
    'bosniscus',
    'bothriospermum',
    'bouchardii',
    'bourgeana',
    'bouvetia',
    'brachylaminata',
    'brachyloma',
    'brachyneuroides',
    'brachyosoma',
    'brachypezoides',
    'brachypharyngeus',
    'bracteantha',
    'bracteolaris',
    'bradburya',
    'bradys',
    'brancaefolia',
    'brasileanus',
    'brassica',
    'brassicata',
    'brausei',
    'brevibeccus',
    'brevicoccus',
    'brevidens',
    'brevilamellata',
    'brevipatellatus',
    'brevipilus',
    'breviscopa',
    'brevispineus',
    'brillanceausuchidae',
    'brissonii',
    'brochopaga',
    'brongniardellus',
    'brossardia',
    'broughi',
    'brownelli',
    'brujitavirus',
    'brunneicollis',
    'brunneopunctata',
    'brunneotomentosa',
    'brunnibasis',
    'brusinia',
    'bryonioides',
    'bubonifolium',
    'bubulla',
    'bucaniellidae',
    'buchholzianum',
    'buchubergense',
    'bucina',
    'bucinaria',
    'buckara',
    'bucolinus',
    'buddleiifolius',
    'buekkense',
    'bulimorpha',
    'bulleri',
    'buriasense',
    'bursalobata',
    'burukovskii',
    'butalidella',
    'buttelreepeni',
    'butyraceum',
    'buxella',
    'bwambae',
    'byctisculus',
    'cacatuopyga',
    'cactaceae',
    'cadetiiflorum',
    'caeluronigricans',
    'caeruleonotatus',
    'caesariana',
    'cailloli',
    'calamosternus',
    'calapodium',
    'calcedoniae',
    'calcehtokanus',
    'calceolariopsis',
    'calculata',
    'calhypnorna',
    'caliginum',
    'calilestes',
    'callacallanum',
    'callichthyinae',
    'callidrepana',
    'calligetus',
    'callinivalis',
    'callitricha',
    'calloplesiops',
    'callosphingia',
    'calodectes',
    'calogramma',
    'calonalis',
    'calotemognatha',
    'calvulum',
    'calyptophyllum',
    'calyptosuchus',
    'camaronensis',
    'cambaroides',
    'camdenensis',
    'camelaria',
    'camellia',
    'camerobia',
    'cameroon',
    'campanopsis',
    'camptochaeta',
    'camptozada',
    'canalicata',
    'cancanae',
    'cancerae',
    'candybus',
    'caniripes',
    'cantiana',
    'capillataspora',
    'capnobotes',
    'capsae',
    'capsaspora',
    'caputabnormis',
    'capysoides',
    'caracasica',
    'carbina',
    'carcani',
    'cardiopygus',
    'cardonii',
    'carduiforis',
    'cardwellia',
    'carettalis',
    'caricae',
    'carinifer',
    'carinulorbis',
    'carlopeltis',
    'carlosfeliui',
    'carmara',
    'carnifrons',
    'caroli',
    'carpodeti',
    'carria',
    'carrii',
    'carrizalense',
    'cartalloides',
    'carteretensis',
    'carthagoensis',
    'caryonodini',
    'cassubiciformis',
    'castanes',
    'castensis',
    'castilliaria',
    'catantopsilus',
    'catapionus',
    'cataplectica',
    'cataspilates',
    'catenata',
    'catops',
    'catopysops',
    'caucasicola',
    'caucasicus',
    'caudapinniger',
    'caudatispora',
    'caudifolium',
    'caulokaempferia',
    'cavadoensis',
    'cavalerieana',
    'cavedanus',
    'caviunas',
    'cebudonus',
    'cecidostiba',
    'cecidothyris',
    'cecropioides',
    'celeripes',
    'cellariiforme',
    'cemiostominae',
    'centenaria',
    'centicola',
    'centrimacula',
    'centrirufa',
    'centroonoceras',
    'centropristis',
    'centrovarioplanidae',
    'cephali',
    'ceradocus',
    'ceratinostoma',
    'ceratoclada',
    'ceratosebacina',
    'cerbvina',
    'cerchysiella',
    'cercomorphus',
    'cercopionidae',
    'ceriaeforme',
    'cerozona',
    'cerrioides',
    'cestrus',
    'cetibeli',
    'cetratus',
    'ceylonensis',
    'chabriosoma',
    'chaetostephanidae',
    'chaetozone',
    'chalarocladum',
    'chalcocnemis',
    'chalybe',
    'chamaepeuce',
    'chamelaensis',
    'chamisis',
    'charadropsyche',
    'charamaensis',
    'charapensis',
    'chariesthes',
    'charlei',
    'charleswerneri',
    'charmus',
    'chasmagnathus',
    'chauliopleurus',
    'chelon',
    'chelyoidea',
    'chelysida',
    'chernyshinellinae',
    'chetyson',
    'chihpenensis',
    'chihuahuanae',
    'chilesi',
    'chillanensis',
    'chillcottiana',
    'chilognatha',
    'chilophus',
    'chilostomella',
    'chilostomellina',
    'chionothrix',
    'chirieanum',
    'chiroderma',
    'chirophylla',
    'chisochetonia',
    'chisternon',
    'chlerogella',
    'chloraeformis',
    'chloraria',
    'chlorocurtis',
    'choerognathus',
    'chommati',
    'chondrolepis',
    'chondrorhynchus',
    'chorodoxa',
    'chrestobunus',
    'chromelosporium',
    'chromocentrum',
    'chronosemium',
    'chrysma',
    'chrysocelis',
    'chrysochaetum',
    'chrysomeloides',
    'chrysomus',
    'chrysonus',
    'chrysopotama',
    'chuangchihi',
    'chyrmangensis',
    'cicadellopsis',
    'cicatricosulus',
    'cinachyrella',
    'cinereovariegatus',
    'cinnyris',
    'cintaromorpha',
    'circassian',
    'circumflexum',
    'citharexifolia',
    'cladiellae',
    'cladophila',
    'cladoscenium',
    'clamans',
    'clararia',
    'claricolor',
    'clarilimbata',
    'clarimargo',
    'clavaeforme',
    'clavidives',
    'cleghornia',
    'cleonolithus',
    'clethropsis',
    'clinacanthus',
    'clinomochla',
    'cliochloria',
    'clivina',
    'clorindae',
    'clymenicola',
    'clypeinitens',
    'clyton',
    'cnemodes',
    'coagerus',
    'coamensis',
    'cobreensis',
    'coburni',
    'cocalina',
    'coccocephalichthys',
    'coccomyxa',
    'cochabambina',
    'cochleasvorax',
    'codioides',
    'codites',
    'coelositona',
    'coelostomidiidae',
    'coeruleata',
    'coeruleofuscus',
    'coerulipennis',
    'cognatocompressus',
    'coihuensis',
    'coldeniae',
    'colensoica',
    'coleocacamus',
    'coleocanis',
    'coleophorinae',
    'colerolumnus',
    'colita',
    'collarigera',
    'collartinus',
    'collativus',
    'collectiva',
    'collinsonae',
    'colocleora',
    'colomai',
    'colopha',
    'colorada',
    'coloradus',
    'colpotriplicis',
    'colynis',
    'comani',
    'comarilis',
    'commonae',
    'comocephalum',
    'comoliopsis',
    'companyoi',
    'compotrix',
    'compsogene',
    'concanicus',
    'concarenae',
    'condate',
    'conexibacter',
    'confertiserratum',
    'conflata',
    'congrogadus',
    'conicella',
    'conicibaccata',
    'conicospermium',
    'coniocera',
    'conlara',
    'conobrosis',
    'conoclinium',
    'consanguinea',
    'conspectus',
    'constrictatus',
    'contacris',
    'contentious',
    'contristans',
    'conyzicola',
    'coocoo',
    'coonorensis',
    'cooperrideri',
    'coorilla',
    'copidoplana',
    'copromorpha',
    'coprosmifolia',
    'coptotomus',
    'copturus',
    'coracina',
    'coraeophos',
    'corallicarpus',
    'corallicola',
    'coraniana',
    'coritanica',
    'coronostylus',
    'corpesiensis',
    'correctata',
    'corrivalis',
    'corroboreethrips',
    'corticicolus',
    'corupella',
    'corussans',
    'corymbuloides',
    'coryneaceae',
    'coryphophylax',
    'cosmemosignatum',
    'cossmannica',
    'costosyrnola',
    'cotanda',
    'cotinaea',
    'couleruana',
    'cousiniopsis',
    'coutume',
    'coventinae',
    'coxitinae',
    'crangonoides',
    'craniella',
    'crassepupillata',
    'crassesignata',
    'crassidens',
    'crassoascus',
    'crastina',
    'craterantha',
    'craterelloides',
    'craterocephala',
    'cratocechenus',
    'crebrifolius',
    'crenoliratus',
    'cribripuga',
    'criconemoides',
    'cricophera',
    'crinonia',
    'crisae',
    'cristatoides',
    'cristinae',
    'critheus',
    'crocogastra',
    'crocomela',
    'cronartiaceae',
    'crotolitha',
    'crouzeti',
    'crowelli',
    'cruentipellis',
    'cruranthura',
    'crypsicola',
    'cryptarthria',
    'cryptocystidiatum',
    'cryptolimifrons',
    'cryptopecten',
    'cryptophasa',
    'cryptophlebiae',
    'cryptophthalma',
    'cryptophysoderes',
    'cryptosporina',
    'crytochilus',
    'ctenoimbricata',
    'cuatro',
    'cucharas',
    'cuculidae',
    'cuculliae',
    'cucumerina',
    'cuiabai',
    'culama',
    'cultrigaster',
    'cumbasonum',
    'cumminsiella',
    'cuneilobatus',
    'cunninghamianum',
    'cupreochalybea',
    'curtiaristatus',
    'curticrus',
    'curtilamellata',
    'curviformis',
    'curvipenis',
    'cyanochlorus',
    'cyclodesma',
    'cycloneuralia',
    'cyclosora',
    'cyclotis',
    'cycnoderus',
    'cydistinae',
    'cylindrocarpus',
    'cymatocarpus',
    'cymbriaella',
    'cymophorus',
    'cynanchiflorum',
    'cynedesmus',
    'cynoctoni',
    'cyphoderia',
    'cyphoderiidae',
    'cypridinoidea',
    'cyrenida',
    'cytherissinellidae',
    'dactylopteni',
    'daedalia',
    'dallicordiidae',
    'dalpia',
    'dalquesti',
    'daltoniaecarpa',
    'damalinia',
    'dasycnemis',
    'dasycrotapha',
    'dasypogonini',
    'davidsoniae',
    'dayaoshan',
    'deasonia',
    'debalsaci',
    'debrajiana',
    'decaphalangium',
    'deciduana',
    'declivitatum',
    'decorites',
    'decorticata',
    'deflectus',
    'deitersi',
    'dekkanus',
    'delclosia',
    'deliquum',
    'deloachorum',
    'deltavjatia',
    'dendroarabis',
    'dendronephthyphagus',
    'deniseae',
    'densibracteata',
    'densiserratus',
    'densisorum',
    'dentatherinidae',
    'denticollaris',
    'denticulalis',
    'denticulipes',
    'depressiferus',
    'derasocobaltinus',
    'dercylini',
    'derecyrtini',
    'derica',
    'derouetae',
    'desaussurei',
    'desertibacter',
    'desmaresti',
    'desmoceratoides',
    'destacar',
    'detris',
    'deuveiellum',
    'devauxi',
    'devergescens',
    'devignati',
    'diaboliella',
    'diachrysa',
    'diadocis',
    'diaeus',
    'dianaria',
    'dianxibeiensis',
    'diaphanocypris',
    'diaspros',
    'dicephalospora',
    'dichetophora',
    'dichilocraspedon',
    'dichodon',
    'dichotomica',
    'dickdellia',
    'dicolecia',
    'dictyostelida',
    'didymictis',
    'didymochrysis',
    'diensti',
    'difficilana',
    'digitalia',
    'digitata',
    'dilitara',
    'dilleriella',
    'dillwyniana',
    'dimisophria',
    'dimochla',
    'dimorphanthera',
    'dinocosma',
    'dinophasma',
    'diomediae',
    'dioryctriae',
    'dioscurea',
    'diotrophorus',
    'diploglyptus',
    'dipteridae',
    'dirfica',
    'dirias',
    'dischematalis',
    'discimita',
    'disciphania',
    'discodon',
    'discolia',
    'discospira',
    'discostromatidae',
    'discovery',
    'disiens',
    'disordinata',
    'dispar',
    'disparia',
    'disparicollis',
    'distata',
    'distentifolium',
    'ditrachybothridium',
    'ditrogalis',
    'diuturnus',
    'diversitermes',
    'docoglossa',
    'dolbyi',
    'dolerosa',
    'dolichoderinae',
    'dolichoderoides',
    'dolichoplectra',
    'dolichowithius',
    'dolioflagellomera',
    'dolliata',
    'doloisia',
    'dolosis',
    'dophora',
    'doratopsylla',
    'dorcasia',
    'dorkadiaria',
    'dormia',
    'doshman',
    'douglasprimusensis',
    'dracaeneae',
    'drilliola',
    'drilus',
    'dromidiopsis',
    'dromodromoa',
    'droogmaniana',
    'drucealis',
    'dryadonycteris',
    'dryocoetes',
    'dryocopinus',
    'dryptitae',
    'dszumrutensis',
    'duarctopoa',
    'duckworlhorum',
    'duclouxii',
    'dudleyae',
    'duliniae',
    'dulosus',
    'dunnya',
    'duospinum',
    'duplicornis',
    'duprixi',
    'durbana',
    'duskei',
    'dutkevichites',
    'dysgenopsyllus',
    'eatonella',
    'ebbelsii',
    'ebrius',
    'echeilea',
    'echelatus',
    'echigoana',
    'echinastra',
    'echinocephala',
    'echinorhynchida',
    'echinovirens',
    'echinuscodendrium',
    'echippigerum',
    'echonitor',
    'ectemnorhinus',
    'ectenesseca',
    'edanioi',
    'edaphosauridae',
    'edestus',
    'edetanum',
    'edithais',
    'efluxa',
    'egeana',
    'egestoides',
    'ehlersiae',
    'eiphasos',
    'ekatherinae',
    'eknomisis',
    'elassoctenus',
    'elbayensis',
    'electrocrania',
    'electrofuscus',
    'elerobi',
    'eleutherospermi',
    'elinguis',
    'elkoanus',
    'elleanthodiceras',
    'elliptifolium',
    'elongatobractea',
    'emarginelloides',
    'emblemaria',
    'emmiltos',
    'emydopidae',
    'enchalcoa',
    'enchodelium',
    'endochroa',
    'endophragmiopsis',
    'enicostemmatis',
    'entalinidae',
    'entomogonus',
    'entypus',
    'eomacropis',
    'eopsychops',
    'eorasaurus',
    'eoscapherpeton',
    'eoseira',
    'ephesiella',
    'epichalca',
    'epimetalla',
    'epitripta',
    'equisecta',
    'erebearia',
    'erenitus',
    'erennidae',
    'ergodes',
    'eriodictyonis',
    'ermienae',
    'errolichthyidae',
    'erythana',
    'erythraena',
    'erythromeris',
    'erythrorhamphos',
    'escoces',
    'esquamata',
    'esterhuysenianum',
    'etorofensis',
    'euanoma',
    'euathlus',
    'eucaudomyiidae',
    'euceratoneis',
    'euchana',
    'eueolidoidea',
    'eugraphis',
    'euloewiodoria',
    'eumeristis',
    'eumicrini',
    'euneuron',
    'eunomia',
    'euphysothrips',
    'euplectus',
    'eupolymorphinella',
    'eupulcher',
    'eupulmonata',
    'euritina',
    'euritmia',
    'eurukuttarus',
    'eurychlidonis',
    'eurychone',
    'eurygonia',
    'eurypilus',
    'eurystictus',
    'eurytiches',
    'eusemionopsis',
    'eusemoides',
    'eusisyrum',
    'eusyrophoxus',
    'eutetraphae',
    'eutrichiurides',
    'euzerconidae',
    'evonymella',
    'exasperatula',
    'excelens',
    'exclusaria',
    'excuratum',
    'exstipulatae',
    'extendorum',
    'eyipayipi',
    'eytelweinii',
    'ezodda',
    'fabespora',
    'fabianorum',
    'factoris',
    'faculta',
    'fadyenia',
    'fagacarus',
    'fagildei',
    'fagotiidae',
    'fajardi',
    'fakfak',
    'falanense',
    'falcatalayex',
    'falcicarpae',
    'falciterebra',
    'falvisectalis',
    'fanseriae',
    'fastigiatoramosum',
    'fastigo',
    'faucibarbara',
    'faustiella',
    'favocassidulina',
    'favonicus',
    'favosifolium',
    'favositinae',
    'fellodistomidae',
    'femorata',
    'fenxli',
    'feraliini',
    'fernandezgarcesi',
    'ferrea',
    'ferreroi',
    'ferrobacteria',
    'ferwillemsei',
    'festulpia',
    'fibrinflatum',
    'fictitia',
    'fictrix',
    'fijianus',
    'fijivirus',
    'filamentata',
    'filamentosa',
    'filiformis',
    'fimbricoxa',
    'findens',
    'findersi',
    'flabellifera',
    'flabellopora',
    'flavangularis',
    'flavicurvata',
    'flavinucha',
    'flavispicum',
    'flavofemoratum',
    'flavopleuralis',
    'flavotaeniatus',
    'flavusella',
    'flectonotus',
    'fleurei',
    'flexicaulis',
    'flexiclymenia',
    'flexilissima',
    'flexistyloides',
    'floracoccus',
    'floravillensis',
    'floridicola',
    'florisi',
    'flustrina',
    'folliculata',
    'fontellana',
    'forelii',
    'foresteriana',
    'forillonaria',
    'foroiuliensis',
    'forskoehlii',
    'forticarinata',
    'fossidorsis',
    'fraglis',
    'franceii',
    'franzdaniela',
    'fraudulentaria',
    'fraudulosus',
    'freyomyia',
    'friedrichiae',
    'frisingensis',
    'fritzwagneria',
    'frolovia',
    'frutillaria',
    'fthiotidensis',
    'fuergiana',
    'fujiansis',
    'fukayai',
    'fukugakuchiana',
    'fulgidella',
    'fulvastrum',
    'fulvifusalis',
    'fulvobrunnea',
    'fulvohirtum',
    'fulvomarginatus',
    'fumigans',
    'fumoferalis',
    'furcatus',
    'furculana',
    'furnishinidae',
    'fuscatrix',
    'fuscinota',
    'fusciventis',
    'fuscoaeneum',
    'fuscoapicella',
    'fuscothorax',
    'fusilieri',
    'fusulculus',
    'gabbioceratinae',
    'gabillytes',
    'galbinaria',
    'galeansellia',
    'galgula',
    'gambogia',
    'gammae',
    'ganapatiella',
    'ganella',
    'ganguli',
    'gannoni',
    'gaoligongshanensis',
    'gariensis',
    'garuus',
    'gassanense',
    'gaudini',
    'gavisus',
    'geganius',
    'geigyi',
    'geleverjae',
    'geminipilis',
    'genicularis',
    'genophantis',
    'geococcyx',
    'geodes',
    'geodiplosis',
    'geophagus',
    'georgecraigius',
    'georghioui',
    'gephyrogramma',
    'geralda',
    'geraldtonensis',
    'ghardaqanum',
    'gibsonella',
    'gibsonhilli',
    'gigantocapulidae',
    'gigantopygus',
    'gigantorubra',
    'gigantoscorpionoidea',
    'gilanica',
    'gilleti',
    'gilsonichrysis',
    'ginibitohia',
    'ginkgophyta',
    'gisara',
    'glaboabdominalis',
    'glabrimargo',
    'glabrimpressum',
    'glabropilumnus',
    'glaucelloides',
    'glaziouana',
    'gloiocolax',
    'gloreus',
    'gloriamaris',
    'glosus',
    'glyocyclus',
    'gmeineri',
    'gnathocera',
    'gnophos',
    'gobbettia',
    'goetheoides',
    'goldschmidti',
    'gomontia',
    'gomphreneae',
    'goncen',
    'gondwanica',
    'goniurosaurus',
    'gonothyraea',
    'gonyaulacoidia',
    'goodfieldi',
    'goodwoodensis',
    'gordioida',
    'gorgops',
    'gosobius',
    'goupillaudina',
    'gouvernoni',
    'goweroconcha',
    'grancarovii',
    'grandistylum',
    'granicauda',
    'graniger',
    'granimanus',
    'graphania',
    'graphomya',
    'grassmani',
    'greenmanianum',
    'greenwelliae',
    'greeri',
    'gregariella',
    'griffinia',
    'grimontia',
    'grossefoveolatus',
    'grossepunctatus',
    'groveolopsis',
    'grypoceras',
    'guairense',
    'guaitecae',
    'guanajuatensis',
    'guanomyces',
    'guiananana',
    'guihua',
    'guinnae',
    'gymnoceros',
    'gymnomorphus',
    'gymnophrea',
    'gymnoscutellatus',
    'gymnotoplax',
    'gynopeltis',
    'gypsochroa',
    'gyrothyraceae',
    'habenifera',
    'habrophila',
    'hachimantaiensis',
    'haddeni',
    'hadromischa',
    'haeggochiton',
    'haenschiella',
    'haesselbyholmiensis',
    'hagenbecki',
    'haleakala',
    'halichondriae',
    'hallex',
    'hallonympha',
    'hallsi',
    'halomonadaceae',
    'hamipalpis',
    'hanamauensis',
    'hankensis',
    'hannense',
    'hapalopa',
    'haplocyoninae',
    'haplotaxina',
    'haptogenys',
    'hapuuarum',
    'harenamica',
    'hariolator',
    'haripurensis',
    'harpanor',
    'harrisia',
    'hartmannulidae',
    'hartmanthus',
    'hastingsi',
    'hauschildianus',
    'havila',
    'hawbicum',
    'hecatorgnia',
    'hechtioides',
    'heddleichthys',
    'helianthialis',
    'helicinella',
    'heliomystis',
    'helionidia',
    'heliopa',
    'heliopsis',
    'heliopyrgus',
    'helluonina',
    'heluanensis',
    'hemerobiella',
    'hemerophila',
    'hemhem',
    'hemianospilus',
    'hemicyclicum',
    'hemidactyliinae',
    'hemigordiidae',
    'hemilecanitidae',
    'hemimarginula',
    'hemistropharia',
    'heppleana',
    'heptasema',
    'herklotsichthys',
    'hernandaria',
    'heronia',
    'heronum',
    'hesycha',
    'heteronevrus',
    'heteropachylus',
    'heteropanope',
    'heteroparamera',
    'heterospina',
    'heterotominae',
    'heugteni',
    'hexagonae',
    'hexaradiata',
    'hexatarsostinus',
    'hexovulata',
    'hialmari',
    'hiatula',
    'hibridum',
    'hieracifolia',
    'hieroglyphyca',
    'hillifera',
    'himalajenses',
    'himalayacetus',
    'hippodice',
    'hirtilobata',
    'hirudoidea',
    'hispaniolyna',
    'hivaagrion',
    'holochrysis',
    'holophlebia',
    'holovestita',
    'homeria',
    'homochirus',
    'homoeoctenia',
    'homoeosomae',
    'homoplatus',
    'homopterus',
    'honanodon',
    'hotooworry',
    'howaia',
    'huairouensis',
    'huallagana',
    'huancayensis',
    'huangensis',
    'hucketti',
    'hugotdiplogaster',
    'huitzmolotitlensis',
    'hulaquina',
    'humaciense',
    'hummel',
    'hummeliana',
    'huntella',
    'huriana',
    'hututsi',
    'hyalodiscaceae',
    'hyalopyrgus',
    'hydroisotoma',
    'hydrometra',
    'hydrotalea',
    'hydrotherikornis',
    'hypachroa',
    'hypapocheima',
    'hypermaculata',
    'hyphochytriaceae',
    'hypholomoides',
    'hypocephalini',
    'hypochaeridoides',
    'hypocline',
    'hypolispa',
    'hypoplexia',
    'hypospilata',
    'hypselosomatum',
    'hypsina',
    'hypsipyrga',
    'hysterolitinae',
    'ianrichardi',
    'iaoensis',
    'iberobarbarus',
    'ichneumia',
    'ichnolepida',
    'ichthyosomoides',
    'ictonyx',
    'idaecamenta',
    'idastes',
    'ideratini',
    'idiostolidae',
    'ifanidianae',
    'igarassuensis',
    'ignecolora',
    'ignifacies',
    'iljiniana',
    'impalpabilis',
    'improvidus',
    'inadmirabilis',
    'inclusana',
    'incubitor',
    'indistinctaria',
    'indolens',
    'indorhynchiinae',
    'indricotheriidae',
    'indubius',
    'inebriantis',
    'inefficax',
    'inermosyllis',
    'infanticida',
    'infasciatum',
    'infectus',
    'inflaticeras',
    'infraflavescens',
    'ingliseria',
    'ingogius',
    'inositophilus',
    'instabilaria',
    'instabilipes',
    'interrogatus',
    'inthanonica',
    'intonsus',
    'intrigella',
    'inyonensis',
    'ioannoui',
    'ionescui',
    'ioogoon',
    'iophana',
    'irapeanum',
    'iriditinctus',
    'isalaux',
    'isalensis',
    'ishidai',
    'isidiosella',
    'isocrinida',
    'isoetopsis',
    'isommata',
    'isotemnidae',
    'isoxys',
    'itabaiana',
    'ituribisciensis',
    'itwarra',
    'iulomorpha',
    'ivanovae',
    'iwamai',
    'ixiophyllum',
    'jacuipensis',
    'jaimeramirezi',
    'jajiensis',
    'jameela',
    'janikornae',
    'janirioides',
    'janosik',
    'jansei',
    'japenensis',
    'jasminaria',
    'jehlius',
    'jejudonia',
    'jiangduensis',
    'jianlingensis',
    'johnpaxtoni',
    'johnwurdackiana',
    'jokaquarta',
    'jonssoni',
    'joshuella',
    'jouiniana',
    'jovoensis',
    'juenthneri',
    'jugatoria',
    'jujuyensis',
    'juniperoideae',
    'juropeltastica',
    'juxticata',
    'kabogoensis',
    'kaibatonis',
    'kakaberrans',
    'kalidupa',
    'kalimeris',
    'kalingenwae',
    'kalonis',
    'kamacops',
    'kamande',
    'kamengense',
    'kamitakaranus',
    'kamtschatkensis',
    'kananaskensis',
    'kandymella',
    'kangeanus',
    'kapsanensis',
    'karadenizicus',
    'karataefolia',
    'karateghinicus',
    'karawajevi',
    'karwara',
    'kasungensis',
    'kawaihoaensis',
    'kefersteiniana',
    'kelelensis',
    'kemmisi',
    'khairei',
    'khuzistanicus',
    'kikibudiamini',
    'kiklonana',
    'killiasi',
    'kimurae',
    'kinabalum',
    'kingdonia',
    'kirstenboschensis',
    'kirthari',
    'kitagawia',
    'kivuanus',
    'kiwuensis',
    'kiyokoae',
    'kladotyphlus',
    'kleinpeteri',
    'klementii',
    'klenei',
    'koilomera',
    'kokeshia',
    'komokia',
    'kopsiopsis',
    'kosemponica',
    'koshiana',
    'kosnipatensis',
    'kostylevi',
    'kroyeri',
    'krusadensis',
    'kuhnistera',
    'kukalova',
    'kungae',
    'kunikikoana',
    'kunjerabi',
    'kuomeii',
    'kuschei',
    'kushmasarensis',
    'kusiacus',
    'kustorae',
    'kuturnee',
    'lachneifolia',
    'lachnocladium',
    'lachnoides',
    'lactate',
    'ladismithiense',
    'laevitarsis',
    'lagarocladum',
    'lagarosoma',
    'lagenina',
    'lagerara',
    'lagopodes',
    'laitimtik',
    'lamades',
    'lamellipodia',
    'lamellothyrea',
    'laminiformis',
    'lamora',
    'lamottiana',
    'lamprospilus',
    'lamuralla',
    'lamutica',
    'landoi',
    'langendoenii',
    'langerhansia',
    'lanicaulis',
    'lanthanostegus',
    'lanzenbergeri',
    'laororshanae',
    'lappodes',
    'lapsariata',
    'larainae',
    'laristanica',
    'larrainiana',
    'lascaris',
    'lasioderma',
    'lasiopterinus',
    'lasiospermus',
    'lateretuberculatum',
    'lathridelmis',
    'latipetiolata',
    'latisporum',
    'latitegminis',
    'latocorophium',
    'launayi',
    'laurenticus',
    'lauronia',
    'lavalettei',
    'lavbleckiana',
    'lavernellus',
    'laversiidae',
    'laxipilosum',
    'lecanoricola',
    'lecithodes',
    'lecythion',
    'leensis',
    'legerae',
    'leiboldiana',
    'leichenina',
    'leiocassis',
    'leiopelmatidae',
    'leiotelus',
    'leipoxaides',
    'leiramara',
    'leliae',
    'lemoultana',
    'lensia',
    'lenyrhova',
    'leocrinidae',
    'leonensis',
    'leonfairmairei',
    'lepidoteuthis',
    'leptocaudus',
    'leptocera',
    'leptochilichthys',
    'leptoiulini',
    'leptojulis',
    'leptolomoides',
    'leptomenaeus',
    'leptomma',
    'leptomorphum',
    'leptoschendyla',
    'leptoscirtus',
    'leptosomaheristus',
    'lerina',
    'lesegneuri',
    'letepsammia',
    'letilae',
    'leucadea',
    'leucalis',
    'leucanepsia',
    'leucanopsis',
    'leucolaema',
    'leucopodella',
    'leucopsarus',
    'leucorhodum',
    'leucosilia',
    'leucotabanus',
    'leuzeopsis',
    'levanidovorum',
    'leveyi',
    'levicaris',
    'leviense',
    'levisella',
    'liaoxipterus',
    'libidoclaea',
    'lichnasthenina',
    'lignarium',
    'lilaciflora',
    'lilacino',
    'lilliformis',
    'limenita',
    'limnogenneton',
    'limothrips',
    'linanensis',
    'lineitergum',
    'lingianus',
    'linifoliiformis',
    'linocerus',
    'linpingensis',
    'linshuiensis',
    'linwenhsini',
    'lionychini',
    'lioptilaria',
    'liosomeniidae',
    'lipocarpa',
    'lissodema',
    'litholampriminae',
    'lithosiformis',
    'litoricola',
    'lixinites',
    'llanoaspis',
    'lobigenis',
    'lockhartioides',
    'loesneriana',
    'loeuffintesi',
    'lombardiana',
    'lomyenensis',
    'lonchocephalus',
    'lonchodactylus',
    'longae',
    'longicomosum',
    'longifibula',
    'longipendulum',
    'longiscata',
    'longisellatus',
    'longispinata',
    'longistipulata',
    'longisubulatus',
    'longivelis',
    'longusorbiidae',
    'lophochroa',
    'lophopyxis',
    'lopriorea',
    'loranthiflorum',
    'loranthophila',
    'lornadepewae',
    'lotoxalis',
    'lubaria',
    'lubilensis',
    'lucidifrons',
    'lucifugus',
    'lugdunarium',
    'luikae',
    'lukaschia',
    'lumsdenae',
    'lunatum',
    'lungshenensis',
    'luodianense',
    'lupatus',
    'luridavolta',
    'luristanica',
    'lusingaense',
    'luteifrons',
    'luteileprosa',
    'luteosignata',
    'luxiense',
    'lycaenops',
    'lycaeopsidae',
    'lycocarpum',
    'lygria',
    'lysiphyllum',
    'maamingidae',
    'mabanuria',
    'mabellarca',
    'machairodontini',
    'mackaviensis',
    'macrocarpata',
    'macrocheila',
    'macrocornutus',
    'macrocremastra',
    'macroglossini',
    'macrogryllus',
    'macrolabis',
    'macropharyngodon',
    'macrotarrhusina',
    'macrotegmenta',
    'macrothylaciini',
    'macsweenyi',
    'maculaalba',
    'maculatus',
    'maculimembris',
    'madathisanotia',
    'madenphloeus',
    'maestingellus',
    'magadinensis',
    'magallanes',
    'magalonii',
    'maghrebiana',
    'magnacalx',
    'magneta',
    'magnetensis',
    'magnispiracularis',
    'magnopunctata',
    'mahmudbejovi',
    'mahunkaisimilis',
    'majorica',
    'majusdentatus',
    'makandal',
    'makarcevae',
    'makawao',
    'malabaris',
    'malaxioides',
    'malchanovi',
    'malpighiales',
    'malybo',
    'malziana',
    'mamigna',
    'mandanus',
    'manfeldtii',
    'mangrovae',
    'mannena',
    'mansonella',
    'mantamonadida',
    'maoricoris',
    'maquiensis',
    'maquipucuna',
    'marathonitinae',
    'marcellaria',
    'marcomesostoma',
    'margarostigma',
    'margelanica',
    'marisaurus',
    'marisminoris',
    'marmarensis',
    'marmarodeceia',
    'marmoretta',
    'marmorii',
    'marnkalha',
    'marojejiense',
    'marquesa',
    'marriana',
    'martynovae',
    'masaiensis',
    'mascarone',
    'maseri',
    'mashanense',
    'mashuana',
    'massariola',
    'massaspicula',
    'mastopomatoides',
    'matacarus',
    'mathuriana',
    'matiganae',
    'mauroprosopa',
    'maurya',
    'maximiliani',
    'mazama',
    'mbamou',
    'mbenjii',
    'mcnabi',
    'medioscutellatus',
    'medwayensis',
    'meerausi',
    'megalobrunneum',
    'megalomycter',
    'megalorrhizum',
    'megalothyrsa',
    'megalyridiini',
    'megamphida',
    'megaoonops',
    'megapex',
    'megateles',
    'megispilota',
    'meigangae',
    'meilloniellum',
    'meingangbii',
    'melakeghebrekristosi',
    'melanchares',
    'melanchlaenus',
    'melanicterata',
    'melanocausta',
    'melanophyllaceae',
    'melanopneumon',
    'melicopea',
    'meligastra',
    'melissimum',
    'mellici',
    'melonius',
    'melphidippella',
    'meneghinianum',
    'mentawir',
    'meoticaops',
    'merdrignaci',
    'merensis',
    'mergense',
    'merhynchites',
    'meridiocarpathicus',
    'merriamosauridae',
    'merularia',
    'mesamidostomum',
    'mesembriomys',
    'mesoepisternalis',
    'mesogitanus',
    'mesolestes',
    'mesoleucalis',
    'mesonotochra',
    'mesosindris',
    'mesostegia',
    'mesovelia',
    'messicobolidae',
    'mestorus',
    'metabacterium',
    'metacerylon',
    'metalacurbs',
    'metallicut',
    'metallophilus',
    'metanaga',
    'metapterygota',
    'metapulvinata',
    'metasidama',
    'metatensis',
    'metatrichini',
    'metellona',
    'metopiora',
    'mevesi',
    'meyerinkii',
    'michaelisi',
    'michelinoceratida',
    'michoniana',
    'micralabastra',
    'micralsopsis',
    'microbahia',
    'microcarunculata',
    'microcephalophis',
    'microcorses',
    'microcyma',
    'micromesozonata',
    'microsciadium',
    'microscopicus',
    'microstethum',
    'microstriatus',
    'microviolacea',
    'micruropodidae',
    'mictophileurus',
    'mikatae',
    'milishai',
    'millerburtonia',
    'miltochristalis',
    'miltoni',
    'mimeugoa',
    'minarzianus',
    'mineirosensis',
    'minhensis',
    'minirosea',
    'minorbrachyblasta',
    'minyaense',
    'miocaenica',
    'mionatrix',
    'mionebulosa',
    'miradornsis',
    'miristigma',
    'mirkinii',
    'misiones',
    'missionensis',
    'mistassinica',
    'mitonia',
    'mixoscia',
    'moathi',
    'mochae',
    'modicoides',
    'moellendorffi',
    'moerisioidea',
    'mogollona',
    'mogorka',
    'mohavanensis',
    'mohavea',
    'molochina',
    'monachophyllum',
    'monactinus',
    'monalita',
    'monapunctata',
    'mongiensis',
    'mongoz',
    'monochorhynchus',
    'monotrete',
    'monreali',
    'monroeae',
    'montandoniola',
    'montanetana',
    'montemaris',
    'montieli',
    'moratiana',
    'morosevitshae',
    'morosphaeria',
    'mosambicensis',
    'moscoviensis',
    'motleyi',
    'motuweta',
    'moussavoui',
    'moutiai',
    'moutouchi',
    'msuata',
    'mugangensis',
    'mulgedii',
    'mulibrinus',
    'mullerrutzi',
    'multareis',
    'multicristatella',
    'multilata',
    'munbyanus',
    'mundeola',
    'munissii',
    'muraenolepis',
    'muricola',
    'murieliae',
    'murinocardiopsis',
    'murmurensis',
    'mutilla',
    'mweroensis',
    'mycobacteriaceae',
    'mycterobius',
    'myialginae',
    'myocaster',
    'myohyangsanica',
    'myopius',
    'myopsychoides',
    'myoxophora',
    'mystriocentrus',
    'myxodictyum',
    'nacladense',
    'naevana',
    'nagamasu',
    'nagatoella',
    'naiguatana',
    'nakamuriformis',
    'nakanai',
    'nakipa',
    'nakuru',
    'nalepellidae',
    'namacus',
    'nangra',
    'nanniae',
    'nannoconus',
    'nannosteinmannites',
    'nannosuchus',
    'narmanica',
    'nascioides',
    'nassatula',
    'nassipa',
    'nasturtium',
    'natalicius',
    'natriophilus',
    'nattaiensis',
    'nausibus',
    'nautiliaceae',
    'nealecypridini',
    'neatodes',
    'necallianassa',
    'necopinatidae',
    'necopinum',
    'negasilus',
    'negibacteria',
    'negroppia',
    'negundana',
    'neibae',
    'neimaniae',
    'nemosoma',
    'neoacutidens',
    'neoaves',
    'neobasalis',
    'neobradyidae',
    'neocichla',
    'neocteniza',
    'neofascipennis',
    'neoflavicans',
    'neohornibrookella',
    'neomisellina',
    'neonola',
    'neopamera',
    'neoperlops',
    'neopiliferum',
    'neotabidus',
    'nephelioides',
    'nephrodinium',
    'nepogomphus',
    'neptunoides',
    'nerens',
    'neseotes',
    'nesoriella',
    'nestia',
    'netica',
    'neuontobotrys',
    'neurigrammalis',
    'niamiae',
    'nicarete',
    'nichofii',
    'nicholai',
    'nictheroyana',
    'niglarus',
    'nigricapita',
    'nigricrissa',
    'nigriguttulus',
    'nigripennus',
    'nigriscuta',
    'nigriventus',
    'nigroaxillaris',
    'nigrobrunneana',
    'nigrocupuliferous',
    'nigrofactum',
    'nigronaervalis',
    'nigropeltata',
    'nigrova',
    'nikanoria',
    'ningchengensis',
    'niphocera',
    'nitrariifolius',
    'nivemaculata',
    'nivenorum',
    'niveociliaria',
    'nixoniana',
    'noaeae',
    'noctuitaria',
    'nodilirata',
    'nomadus',
    'nonornata',
    'nonstylatum',
    'nordenstamia',
    'noscibilis',
    'nosterella',
    'nostochopsidaceae',
    'notanisus',
    'notati',
    'nothosaerva',
    'notoderus',
    'notogomphus',
    'notoleuca',
    'notonectoides',
    'notothixoides',
    'novahebridensis',
    'novobritanniensis',
    'nublians',
    'nucleatus',
    'nucleosus',
    'nullamphiura',
    'nulliferana',
    'nuttallielloidea',
    'nyakaensis',
    'nyanzense',
    'nycthemeraria',
    'nycticorpum',
    'nygmiae',
    'nysiusae',
    'nyssanthes',
    'nyssonini',
    'oblenita',
    'obliquans',
    'oblongissimus',
    'obovatocarpa',
    'obsequiosa',
    'occulta',
    'ocellicaudus',
    'ocenebrinae',
    'ochridaphe',
    'ochrochrous',
    'ochrodorsella',
    'ochterus',
    'odobenocetopsidae',
    'odontonotacris',
    'odontopsammodius',
    'odontopygidae',
    'oedothelphusa',
    'oelandinus',
    'ohlertidion',
    'okadaiidae',
    'okeani',
    'oksalianum',
    'oldroydiana',
    'olgashelestae',
    'oligocarinatum',
    'oligophyton',
    'oligospilota',
    'oligotrophicum',
    'olliffiana',
    'olmediopsis',
    'olmosensis',
    'olmotega',
    'omalonomus',
    'omariusalis',
    'omogonis',
    'omopyge',
    'onchocalanus',
    'onophas',
    'onychiurini',
    'onychogammarus',
    'onychoglenea',
    'oochoristica',
    'oosomini',
    'opadius',
    'opalinula',
    'opatrina',
    'operantis',
    'ophiochalcis',
    'ophiopogonoides',
    'opifexi',
    'opopaea',
    'opulentium',
    'orangica',
    'orbicularius',
    'orbipora',
    'orchonicus',
    'ordunyai',
    'oreopithecus',
    'oresbia',
    'oresbios',
    'orgyale',
    'orichalcescens',
    'orichloris',
    'orisasini',
    'orithopsidae',
    'ornatodorcadion',
    'orohenense',
    'orongia',
    'orsunius',
    'orthomeroides',
    'orthoraphis',
    'orthostichopsis',
    'orthotrichum',
    'osellae',
    'osoensis',
    'osoriana',
    'osperlioceras',
    'ostuchiensis',
    'oswaldia',
    'otallensis',
    'ouadanei',
    'ouricanense',
    'ovatiguttatus',
    'ovicercus',
    'ovilis',
    'oxycarenidae',
    'oxycerini',
    'oxymegaspis',
    'oxyruncus',
    'oxystoma',
    'ozokeriticus',
    'ozotomerini',
    'pachmariensis',
    'pachobex',
    'pachycaulon',
    'pachycoccyx',
    'pachydeminae',
    'pachynema',
    'paddeui',
    'paduana',
    'paedobisium',
    'paenacuceps',
    'paenedentula',
    'pailensis',
    'palaeocarcharidae',
    'palaeophonus',
    'palaeosystenus',
    'palawanella',
    'palenquense',
    'palesoidea',
    'paleuthygrammatidae',
    'palinuroidea',
    'pallidetinctus',
    'pallidicostalis',
    'pallidohirtus',
    'pallorus',
    'palmatus',
    'palmetincola',
    'palmivorus',
    'paluosa',
    'pampiconus',
    'panacina',
    'pancallia',
    'pancici',
    'pancrustacea',
    'paniferum',
    'panochthus',
    'pantecphylini',
    'panticosus',
    'papillatus',
    'papillopilosa',
    'papillospora',
    'paraansobicus',
    'parabactridium',
    'parabarossia',
    'paraborsonia',
    'parabretti',
    'paracanthonchus',
    'paracavisoma',
    'paracelastrus',
    'paracheiridium',
    'paraconara',
    'paractaeopsis',
    'paracuminiseta',
    'paradiplogynium',
    'paradoxosomatinae',
    'paradrina',
    'parafiorinia',
    'parafungicola',
    'paragonimus',
    'paragraminis',
    'parahieroglyphica',
    'parahuahindensis',
    'parajauravia',
    'paralamprotatus',
    'paralphenum',
    'paramaculipennis',
    'paramevania',
    'paramyinae',
    'paraphiloscia',
    'parapoxvirus',
    'pararapana',
    'parareolatus',
    'parasanjuanensis',
    'parasicyos',
    'parasphaeria',
    'parastemon',
    'parastenoterys',
    'paratheridula',
    'paratriaina',
    'paratubiluchus',
    'paratumbex',
    'paraumballaensis',
    'paravenia',
    'paraves',
    'paravorae',
    'pardoanum',
    'pardochrous',
    'parelegans',
    'paresmus',
    'pareulepis',
    'pareutaenia',
    'pariry',
    'parjumanensis',
    'parspeciosum',
    'parthicum',
    'parvifoliella',
    'parvipunctus',
    'pascahinnites',
    'pashupati',
    'pathana',
    'patheticus',
    'patritiodemus',
    'pattersonellidae',
    'paturattensis',
    'paucichelatus',
    'paucipetala',
    'paucivenosum',
    'paulesca',
    'paulianaleyrodes',
    'paulocordata',
    'pausandra',
    'pavelitus',
    'pavichii',
    'pearceanus',
    'peartiae',
    'pectinatum',
    'pedimarmoratus',
    'pegazzanoae',
    'peihonga',
    'pelamidis',
    'pelegrinoides',
    'pellucidellus',
    'pelobium',
    'pelodesmus',
    'pelotomaculum',
    'pempelioides',
    'pendulosa',
    'pengboense',
    'penneysii',
    'peonza',
    'peraccai',
    'peranemiformis',
    'percludalis',
    'percolens',
    'perconfusa',
    'perconicus',
    'perdica',
    'perfectana',
    'perflaveola',
    'periclimenes',
    'periglabellus',
    'perigrinus',
    'perilimicron',
    'periploceae',
    'periquesta',
    'perisphinctinae',
    'peristerensis',
    'peristrigata',
    'perlatum',
    'permagnifolia',
    'permiscus',
    'pernyii',
    'perostia',
    'perpunctulatum',
    'perseae',
    'persimplexella',
    'persinuata',
    'peruvensis',
    'pervasata',
    'pervulgaris',
    'petheri',
    'petrocrania',
    'petrograpta',
    'petroleuciscus',
    'petrolinensis',
    'petrorsus',
    'pezomantis',
    'pfefferiteuthis',
    'phaenohemiandrus',
    'phaeocroa',
    'phalacrocoraca',
    'phallopiratinae',
    'phanolophus',
    'phantomus',
    'phascolomys',
    'phelloxylon',
    'phemonoides',
    'philichthys',
    'philipomyia',
    'philippinum',
    'philocalus',
    'philocoprella',
    'philomena',
    'philosycus',
    'phinneyi',
    'phitosianus',
    'phlepsopsius',
    'phloxidiflora',
    'phoemonoe',
    'pholcochyrocer',
    'phormisalis',
    'phoxapex',
    'phrixus',
    'phycinae',
    'phylloceratitida',
    'phyllochaetopterus',
    'phyllodinarda',
    'phyllorachis',
    'phyllospongia',
    'phylochrysa',
    'phymatopteris',
    'physcomitrellae',
    'physoglenidae',
    'piasusalis',
    'piazzaria',
    'piceolus',
    'picicolor',
    'piezotrachelini',
    'pilatoi',
    'pilifilis',
    'pililoba',
    'pilsbrytyphis',
    'pimaensis',
    'pinacopodium',
    'pinguella',
    'pinidumus',
    'piniradicis',
    'pinnatifidum',
    'pinnicerca',
    'pintadus',
    'piqueriae',
    'piquerioides',
    'pirapo',
    'pirarense',
    'pirizanica',
    'pirriei',
    'pisacomensis',
    'piscacauda',
    'pisciodorus',
    'pisidium',
    'pissina',
    'pithyella',
    'pityophilus',
    'placocista',
    'placodops',
    'placotrochides',
    'plagiognathi',
    'plagioholocentrus',
    'planaltinella',
    'planipedonus',
    'planistylus',
    'plantaginoidea',
    'plasmodiophoromycetes',
    'plastica',
    'platyacantha',
    'plecopterorum',
    'plectrelgraecum',
    'plectrocerum',
    'pleionotoma',
    'plethokrossus',
    'plethotretus',
    'pleuranthoides',
    'pleurites',
    'pleurobotryosa',
    'pleurodomus',
    'pleurofascia',
    'pleuronichthys',
    'pleuropasta',
    'plicosula',
    'pliculosa',
    'plinthiza',
    'pliosauridae',
    'plumacea',
    'plumeriifolia',
    'pluricapitata',
    'plurosorus',
    'pluvia',
    'pninaella',
    'poblanus',
    'pocopunctella',
    'podaucheniellus',
    'podonectriaceae',
    'poecilator',
    'poliona',
    'polititapes',
    'polosi',
    'polychrosis',
    'polycladae',
    'polyfimbriata',
    'polygamiae',
    'polygonanae',
    'polymorphidae',
    'polysentoriformes',
    'polysperchinus',
    'polytmus',
    'polyzonatus',
    'polzbergia',
    'pomeroyi',
    'ponerus',
    'pontisquamata',
    'populifolia',
    'porchatensis',
    'porochordus',
    'porosa',
    'porthesioides',
    'portoricoscia',
    'porulosa',
    'postcervix',
    'postdentaria',
    'postfasciculata',
    'postmediana',
    'postoparvipuncta',
    'postpoliatus',
    'postsemipluripuncta',
    'potebniamyces',
    'prabha',
    'praecursoria',
    'praephacorhabdotus',
    'praeprocris',
    'praestolatorius',
    'pratumidiscus',
    'pretenderis',
    'primevus',
    'primigenus',
    'prionotemnus',
    'prismatocarpus',
    'proarchus',
    'problematodes',
    'proboscidoplocia',
    'probosciformis',
    'procerocheles',
    'productinae',
    'profundocythere',
    'projecturata',
    'projicienfrontoides',
    'prolaminatus',
    'prolaupala',
    'prolixifasciata',
    'prolixistyla',
    'promirotermes',
    'proniphea',
    'pronoritidae',
    'pronotacanthus',
    'prorepentia',
    'proriedelia',
    'prosadiya',
    'prosectoides',
    'prosenactia',
    'prosobothrium',
    'prosopalpus',
    'prosorhochmus',
    'protocardiinae',
    'protochitonidae',
    'protoglomeris',
    'protoiurus',
    'protopidius',
    'protoreticulata',
    'protorhyssalodes',
    'protosciarella',
    'protosculptilis',
    'protrama',
    'psammoticus',
    'psarisomus',
    'pselaphostena',
    'pseudacanthopale',
    'pseudachorutella',
    'pseudacroleptus',
    'pseudanurophorus',
    'pseudapoderus',
    'pseudargentata',
    'pseudartiocotylus',
    'pseudephedrus',
    'pseudincoides',
    'pseudoalstonii',
    'pseudoarmillaris',
    'pseudoborniales',
    'pseudobothrideres',
    'pseudobotrys',
    'pseudochroma',
    'pseudodiplotaxis',
    'pseudodoliolininae',
    'pseudoeurydesmella',
    'pseudoglauca',
    'pseudogonitis',
    'pseudogyrinocheilus',
    'pseudohookeriana',
    'pseudoialapennsis',
    'pseudokovacevici',
    'pseudomacrophya',
    'pseudomaroccana',
    'pseudomarsupidium',
    'pseudomarteli',
    'pseudomassilina',
    'pseudomedaeus',
    'pseudoncholaimus',
    'pseudonudicaulis',
    'pseudooblongum',
    'pseudopallescens',
    'pseudopannaria',
    'pseudopasilia',
    'pseudopentameris',
    'pseudopiceus',
    'pseudopithyella',
    'pseudoptiletes',
    'pseudorchestes',
    'pseudorichia',
    'pseudorthonychiidae',
    'pseudosaxat',
    'pseudosteini',
    'pseudosymmorphus',
    'pseudothyretes',
    'pseudotrematodes',
    'pseudotriphyllopsis',
    'pseudotristicha',
    'pseudumbellata',
    'pseuduncifera',
    'pseustantha',
    'psiloderoides',
    'psychanisa',
    'psychroteuthidae',
    'pteleaevagrans',
    'pteridicola',
    'pterineidae',
    'pteron',
    'pteropelyx',
    'ptilocladioides',
    'ptilopus',
    'ptochopis',
    'pubistylosum',
    'pudicula',
    'puiggariopsis',
    'pulchricolor',
    'pulchrinodaceae',
    'pulcia',
    'pulcratis',
    'pultiphagonides',
    'pulvifer',
    'punctifimbriata',
    'punctillaris',
    'punctoterminalis',
    'purdonellinae',
    'purpureoplagiata',
    'pursellii',
    'pusanus',
    'pusztae',
    'pycnocephaloides',
    'pycnophyllopsis',
    'pycnopodia',
    'pygocentrus',
    'pyramidata',
    'pyrgotomyia',
    'pyrifer',
    'pyrimidalis',
    'pyronasi',
    'pyrrhonotum',
    'qianyiyongii',
    'qinglongopterus',
    'quadrabdominalis',
    'quadrataria',
    'quadratirostrata',
    'quadriannellatus',
    'quadricellulata',
    'quadrifalcifera',
    'quadrinotatiforme',
    'quadristrigaria',
    'quasiborelis',
    'quasiindicus',
    'quercusilicis',
    'quinquicincta',
    'quisquiliarius',
    'rabainus',
    'raceki',
    'rachelii',
    'racovitzae',
    'racovitzia',
    'radicosus',
    'rafesi',
    'ralstoniae',
    'ramicephala',
    'ramoncaracasii',
    'ramoniana',
    'ranitomeya',
    'rankini',
    'raphaelandrearum',
    'raphigastra',
    'raphis',
    'rapola',
    'rarensis',
    'rarotonga',
    'rautensis',
    'rawuense',
    'reaghi',
    'recticommata',
    'rectopalicus',
    'recurvilabre',
    'recurvistigmalis',
    'reddii',
    'redemptum',
    'rehbergi',
    'reitteri',
    'rembangensis',
    'renaudiana',
    'renauldi',
    'reniformis',
    'renipiscarius',
    'renivitta',
    'repletana',
    'rescissa',
    'residis',
    'resinophaga',
    'retextus',
    'retingensis',
    'retrospiculatum',
    'retusa',
    'rhabdomolgus',
    'rhachicoryphus',
    'rhacoindustiata',
    'rhadinosa',
    'rhamphostomella',
    'rhayatus',
    'rhealis',
    'rheumaptera',
    'rhinocolura',
    'rhinorhynchini',
    'rhiostoma',
    'rhipidomellinae',
    'rhodaphanes',
    'rhododendronis',
    'rhodophilides',
    'rhomboivora',
    'rhombonicis',
    'rhombostilbella',
    'rhopalodes',
    'rhopalopus',
    'rhymnus',
    'rhyopsocus',
    'ribeiroia',
    'ribium',
    'richardsi',
    'richerdeforgersi',
    'ricinoidoidea',
    'ricketti',
    'rifana',
    'rigiduliformis',
    'rikuzenica',
    'rimipontius',
    'riocauchosanum',
    'riparis',
    'ripidopteris',
    'risoba',
    'rithrogenophila',
    'rodentini',
    'rodriguezus',
    'rogata',
    'rolandmuelleri',
    'romanchella',
    'romeii',
    'romulanigra',
    'roschanicus',
    'roseicostis',
    'rosellei',
    'rosemariana',
    'rosenvingiella',
    'roseobrunnea',
    'roseoculma',
    'rosettiae',
    'rosettii',
    'rosica',
    'rosicola',
    'rossmania',
    'rostamii',
    'rostraloides',
    'rostrigerum',
    'rothfelsi',
    'rotulina',
    'rotuloplocamia',
    'roxasella',
    'ruaumokoi',
    'rubeschi',
    'rubicula',
    'rubrigastra',
    'rubrisetum',
    'rubronervat',
    'ruderatus',
    'rudiastra',
    'rudolphisimonii',
    'rufistigmosa',
    'rufitarsoides',
    'rufocastanea',
    'rufofuscula',
    'rufolimbaria',
    'rufosatellitia',
    'rufotactus',
    'rufotinctus',
    'rugifolium',
    'rugostriatus',
    'rugulata',
    'ruhlandiana',
    'ruiliensis',
    'rumphiensis',
    'rutaneni',
    'ruzskyellus',
    'ryphea',
    'sabatoi',
    'sabbadini',
    'sacajaweae',
    'saccharophilum',
    'saccopetaloides',
    'saccopharyngidae',
    'sacculoppia',
    'saeniensis',
    'sagaminemertes',
    'saguaroicola',
    'salamander',
    'salatini',
    'salinellidae',
    'salmositica',
    'salsburyana',
    'salsum',
    'salticidites',
    'saltursus',
    'salvagopselactus',
    'salvazi',
    'samacar',
    'samolethrius',
    'sanata',
    'sandbergeri',
    'sandrabatis',
    'sansebastianus',
    'santaelensis',
    'santoamarensis',
    'santubong',
    'sanyali',
    'sapotaefolia',
    'sapphirhinus',
    'sapporona',
    'saracrinus',
    'sarcocyphos',
    'sarsonuphis',
    'sasakii',
    'sasimella',
    'saturator',
    'sauciatus',
    'savigniorrhipis',
    'saxemarina',
    'saxeseni',
    'sbarbari',
    'scalebrina',
    'scansoria',
    'scaphidiomyces',
    'scapiflora',
    'scardiinae',
    'schabalkini',
    'schacheri',
    'schachimardanicum',
    'schaffneri',
    'schajovskoya',
    'schellwieniens',
    'scherfi',
    'schizacme',
    'schizocharis',
    'schizochiton',
    'schizonema',
    'schizopus',
    'schizotaldycupes',
    'schminkeinae',
    'schraederi',
    'sciocyrtinus',
    'scirpidium',
    'sclateria',
    'sclerieae',
    'scleropteroides',
    'scleropycnis',
    'scoliacantha',
    'scoriformis',
    'scorpaenoidei',
    'scoteinum',
    'scutellina',
    'scutuliformis',
    'scybalophagus',
    'scythromorpha',
    'secluse',
    'secostruma',
    'secretas',
    'segovicus',
    'seilerni',
    'seirospora',
    'sejongensis',
    'selaserica',
    'seleensis',
    'selenana',
    'selenariidae',
    'selenopsocus',
    'semibraccatus',
    'semicrocea',
    'semilissus',
    'semionis',
    'semisplendidum',
    'semiticella',
    'sepsidae',
    'septicemia',
    'septorispora',
    'serangodella',
    'seraxensis',
    'seriespinosum',
    'serolina',
    'seroloniscus',
    'serpentinum',
    'serradraco',
    'serranicola',
    'serranochromis',
    'sertalis',
    'sespinaea',
    'sessilifructa',
    'sestertiella',
    'setabara',
    'setantops',
    'setaphora',
    'setispinae',
    'setylaides',
    'sevastjanovi',
    'sevenetii',
    'sevosa',
    'sewertzowii',
    'sexdendata',
    'sexspinus',
    'shackletoni',
    'shataii',
    'shebania',
    'sheeppox',
    'sheidaii',
    'sherbrookei',
    'sheshanensis',
    'shigernaei',
    'shiloensis',
    'siamophylla',
    'sianenna',
    'sibaya',
    'sibayakensis',
    'sibbaldi',
    'sibukoensis',
    'siccanea',
    'sichnostola',
    'sicinae',
    'sieburgi',
    'sigilla',
    'sigmomorphina',
    'signipennis',
    'sihoensis',
    'silhouettei',
    'silolona',
    'silphedosuchus',
    'silsilesii',
    'silvaniformis',
    'silvicolus',
    'simetitia',
    'similicornuta',
    'similiphora',
    'simsata',
    'singalorum',
    'sinharajaicus',
    'sinoarundinaria',
    'sinobryobia',
    'sinotianschanicum',
    'sinuosociliatus',
    'sipunculoides',
    'sittae',
    'sivarajiana',
    'slatinensis',
    'slevinii',
    'smefarka',
    'smelowskia',
    'smyrnae',
    'snellii',
    'sochinsogonia',
    'socotricola',
    'soenderupianus',
    'sogalis',
    'sogandaresi',
    'sohayakiense',
    'sokkaejaecystis',
    'solenoxyphus',
    'solitariana',
    'solorzanoana',
    'somatania',
    'sonderophycus',
    'songpanicum',
    'sonitans',
    'sonneratioides',
    'sonogrus',
    'sonotetranychus',
    'sophista',
    'sordidopapposa',
    'sorediifera',
    'southgeorgiae',
    'soyoae',
    'spanospicula',
    'spathor',
    'spatulicornis',
    'spelaeum',
    'speoides',
    'spermodea',
    'sphaeroconcha',
    'sphaerodoridium',
    'sphaerogerinidae',
    'sphaerosporella',
    'sphaerozone',
    'sphagnorrhiza',
    'sphenorhynchus',
    'sphenotretidae',
    'sphingidites',
    'sphingopyxis',
    'spilosomini',
    'spinigerum',
    'spiniplenus',
    'spinostylus',
    'spiralifera',
    'spirifex',
    'spiroberotha',
    'spirotecta',
    'spirotectinae',
    'spongiphilus',
    'sponiifolius',
    'sporocosma',
    'springvaleensis',
    'squamatellus',
    'squamulosula',
    'stachysi',
    'stacota',
    'stagona',
    'staiusalis',
    'stalina',
    'staphylocystoides',
    'stathmodera',
    'staxrudi',
    'steccherinaceae',
    'steinbergensis',
    'steinhardti',
    'stellariifolius',
    'stellatacula',
    'stellatosporea',
    'stenanthera',
    'steninae',
    'stenocarus',
    'stenoetrus',
    'stenolejeunea',
    'stenolobium',
    'stenometopa',
    'stenopetalum',
    'stenostygninae',
    'stenothora',
    'stenotritinae',
    'stephanophyes',
    'stephenseniellus',
    'stereograpta',
    'steveniella',
    'sthenozancla',
    'stibapicalis',
    'stigmatogobius',
    'stigmatotheca',
    'stiphrogyne',
    'stipuloideum',
    'stirlingia',
    'stirojoppa',
    'stoeberhinus',
    'stolonacea',
    'stonesfieldiana',
    'straatmanni',
    'stradbrokense',
    'streyana',
    'strictiforme',
    'strigialifusus',
    'strigillatus',
    'strigosipes',
    'striposis',
    'stroemi',
    'strophingia',
    'strophis',
    'stubblefieldi',
    'stumkatae',
    'stygocarididae',
    'stylodesmus',
    'stylopauropoides',
    'stylospora',
    'stylus',
    'styphlorachis',
    'stypus',
    'styraconixidae',
    'subaana',
    'subargillacea',
    'subcongoensis',
    'subcorrosus',
    'subdecursivum',
    'subdicarpon',
    'subfinitimella',
    'subfurva',
    'subglabrum',
    'subhuti',
    'subinformis',
    'sublignosalis',
    'sublineatus',
    'submelanaria',
    'subneotrichius',
    'subobliteratus',
    'subota',
    'subpectinata',
    'subpelignus',
    'subpellucens',
    'subplacens',
    'subpohlioideum',
    'subtakecallis',
    'subterblancum',
    'subterraneoides',
    'subtrivialis',
    'subumbrosa',
    'subvariocostatus',
    'subvillosula',
    'subxanthippus',
    'subyusou',
    'sucofera',
    'suduirauti',
    'suffusinervis',
    'sugillata',
    'suiferens',
    'sukhothai',
    'sukotaiense',
    'sulcinerva',
    'sulfophila',
    'sulfureolus',
    'sumensis',
    'summergold',
    'supraglandulosa',
    'surculare',
    'suspinata',
    'susumia',
    'svecica',
    'symmetrosporaceae',
    'symphorosus',
    'synagriformis',
    'synaphe',
    'syncapna',
    'syndelphax',
    'synercta',
    'syniulus',
    'syntrita',
    'syntrophus',
    'syringilla',
    'syringopharynx',
    'syzygoniinae',
    'szulczewskii',
    'tabernai',
    'taboga',
    'tachangensis',
    'tachillanella',
    'tachiniscidae',
    'tachinoides',
    'tacoaraphaga',
    'tactiquensis',
    'taeniolatus',
    'tagetiflora',
    'tahulaspis',
    'takachihonis',
    'takahagiensis',
    'takhtajani',
    'takhti',
    'takuiricus',
    'talaena',
    'talitridira',
    'tamagohanum',
    'tamaricaria',
    'tamaska',
    'tambori',
    'tambourinicus',
    'tampiusalis',
    'tanagami',
    'tanalanacris',
    'tangaroa',
    'tapadas',
    'tapinillus',
    'taraxacicola',
    'tashkurensis',
    'tasmanentulus',
    'tasmaniae',
    'tayoensis',
    'tchupalensis',
    'telata',
    'telegdirothi',
    'telesii',
    'teliformis',
    'telmatobia',
    'telosperma',
    'telotylenchinae',
    'temascalense',
    'temnosceloides',
    'tempisque',
    'temulata',
    'tenacifolium',
    'tenacis',
    'tenaspis',
    'tengstroemella',
    'tenuicrustaceum',
    'tenuilamellatus',
    'tenuioides',
    'tenuipalpoidini',
    'teramachii',
    'terborchii',
    'terebraeformis',
    'teresopolis',
    'teretiachaenium',
    'termitarum',
    'tersonderi',
    'tessella',
    'testaceovittatus',
    'tetragattii',
    'tetragonocarpum',
    'tetraleberis',
    'tetrapila',
    'tetrapunctigera',
    'tetrasporoides',
    'thalassemae',
    'thalebanii',
    'thaliana',
    'thallicola',
    'thallostoma',
    'thamfaranga',
    'thamugadensis',
    'thapsianae',
    'tharsanthes',
    'thenardii',
    'therinia',
    'thermomyces',
    'thiofractor',
    'thoracanthoides',
    'thoracosphaera',
    'thorictosoma',
    'thymbroides',
    'thyreoconger',
    'thyrsoidea',
    'thyrsolomia',
    'thystas',
    'thysvillei',
    'tibetanophilus',
    'tibiale',
    'tibicinini',
    'tibiovela',
    'tibullus',
    'ticinepomis',
    'tietzae',
    'tiflisensis',
    'timanicum',
    'timapeba',
    'timothyei',
    'timoutoides',
    'tinoides',
    'tipulidae',
    'tishqu',
    'tissanga',
    'tobiracola',
    'toganensis',
    'tolganensis',
    'tombolatoana',
    'tombouctou',
    'tonjolana',
    'tonkienensis',
    'tonnensis',
    'topseyi',
    'toraia',
    'tororoense',
    'tortuosivenosum',
    'torvensis',
    'touchardia',
    'tovomitopsis',
    'toxopeina',
    'toxotes',
    'trachea',
    'trachygrapha',
    'trachylepis',
    'trachyuropoda',
    'transilis',
    'transversovittatus',
    'travassosinema',
    'trebida',
    'trefusiina',
    'tremataspidoidei',
    'trematocarpus',
    'tremicinae',
    'trentinus',
    'tretosterninae',
    'treverense',
    'triaenophorus',
    'tribalasia',
    'tricepoides',
    'trichiatus',
    'trichocarpum',
    'trichonychina',
    'trichopeda',
    'trichophallus',
    'trichosolen',
    'trichosomoididae',
    'trichothyriomyces',
    'tricnicos',
    'tridax',
    'trifurcillata',
    'trigonosema',
    'trigonula',
    'triloculina',
    'trimamillatus',
    'triplicalyx',
    'triplonychus',
    'triplophyllum',
    'trisecphora',
    'trisignata',
    'tristrigaria',
    'tritaenia',
    'tritodynamiinae',
    'tritoxidium',
    'trophius',
    'tropidocarpum',
    'truchanasi',
    'truxillata',
    'trychnopalpa',
    'tshukoticus',
    'tsienii',
    'tsimihetensis',
    'tsitsikammensis',
    'tsunekatanus',
    'tsurutanum',
    'tubatum',
    'tuberculiforme',
    'tuberorachidion',
    'tucanti',
    'tungchihi',
    'turbonia',
    'turkeyella',
    'turkulensis',
    'turpicula',
    'turuchanica',
    'tusimayusurika',
    'tusimomeneus',
    'tuticorina',
    'tutuilaensis',
    'tymicola',
    'typhochrestus',
    'typhoniinae',
    'tzinella',
    'ucetanus',
    'udzungwense',
    'uktaspis',
    'ulceratalis',
    'ulotrichoides',
    'ultunense',
    'umiatense',
    'uncopaederus',
    'undulitibiae',
    'unguianalis',
    'unguifortis',
    'uniclypea',
    'unimediseta',
    'unipeltoceras',
    'upermia',
    'urarensis',
    'urartuensis',
    'urceoliporoidea',
    'urgorrii',
    'uriformis',
    'uroballus',
    'urodiabunus',
    'urogymni',
    'ushari',
    'ushizanus',
    'ustifumosa',
    'ustyuzhanini',
    'usurae',
    'utahnema',
    'uvifolium',
    'uzunoglui',
    'vacatella',
    'valerian',
    'validithorax',
    'vallacerta',
    'vanakripa',
    'vanieria',
    'vansttallei',
    'varfer',
    'vauereselli',
    'vavara',
    'veerapazhasii',
    'vehemens',
    'velaminosum',
    'velebitica',
    'vendettadeae',
    'veneriglossa',
    'venitalis',
    'ventricostus',
    'ventriosa',
    'ventrolata',
    'verbanica',
    'verbeekininae',
    'verluysi',
    'vermaasi',
    'vermes',
    'vermiculifera',
    'vernale',
    'vernana',
    'verniochreana',
    'vernoniastrum',
    'vernoniensis',
    'verrugana',
    'verticillitida',
    'vertumnaliformis',
    'vervactoraria',
    'vespertillionis',
    'veteranum',
    'vexillocalyculatum',
    'viaderi',
    'vicinula',
    'vidalamiini',
    'viennae',
    'vientianea',
    'viperinus',
    'viphius',
    'virgato',
    'viridenex',
    'viridicaule',
    'viscaianum',
    'viscicola',
    'vitatticella',
    'vitrimentula',
    'vittiger',
    'volkanovi',
    'volutidae',
    'volvocaceae',
    'vrangiana',
    'vuillefroyanus',
    'waigoeensis',
    'wakiyae',
    'wandelia',
    'wanfenglinensis',
    'waningus',
    'wanumaense',
    'wareipai',
    'warhami',
    'warrierianum',
    'wasabia',
    'waterhousiae',
    'wayensis',
    'webbela',
    'weinreichius',
    'wentzelellinae',
    'wernerius',
    'westergaardi',
    'westrichi',
    'wetenschappelijk',
    'whippleanum',
    'wightensis',
    'wikkiensis',
    'wilhelminia',
    'williamsianum',
    'wilmotorum',
    'wilsonichthys',
    'winchelli',
    'winterbotomi',
    'winthemiini',
    'wintonensis',
    'wugirogaense',
    'wulikensis',
    'wyandotte',
    'wyliea',
    'wyomingense',
    'xamthurus',
    'xanthosquamosa',
    'xavantina',
    'xenopodion',
    'xerantifulva',
    'xeringinia',
    'xerophilaspidina',
    'xiangguiensis',
    'ximenans',
    'ximina',
    'xipotensis',
    'xiximeca',
    'xizanganus',
    'xyleus',
    'xysila',
    'xystophora',
    'yaetakaria',
    'yaguara',
    'yamadorianus',
    'yamamurae',
    'yamanei',
    'yanbaru',
    'yangzekiangensis',
    'yasuakii',
    'yavesia',
    'yelicones',
    'yezophora',
    'yinzhengii',
    'yokenella',
    'yoshikazui',
    'yoshinoi',
    'ypirangae',
    'ypresiomyrma',
    'yuanica',
    'yunlingense',
    'yunnananus',
    'yushanica',
    'zabrosa',
    'zacatecae',
    'zaglyptomorpha',
    'zaisanensis',
    'zakonnikovae',
    'zamenhofianum',
    'zantanus',
    'zeballosicum',
    'zebricolor',
    'zelandalbia',
    'zemiodes',
    'zeugicornis',
    'zhoushanense',
    'zhovtyi',
    'zimiensis',
    'zimmii',
    'zooxanthellae',
    'zophochalca',
    'zoroaster',
    'zosterodasys',
    'zunigai',
    'zwicknia',
    'zwolferi',
    'zygethobius',
    'zygethus',
    'zygogonium',
    'zygopterorum',
];

// EXTERNAL MODULE: ./node_modules/lodash-es/startCase.js + 11 modules
var startCase = __webpack_require__(59);

// CONCATENATED MODULE: ./src/common/markov.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return generateName; });



const nameMarkov = new Foswig(3);
nameMarkov.addWordsToChain(SpeciesNames);
function generateName(min, max, random = Math.random) {
    return Object(startCase["a" /* default */])(nameMarkov.generateWord(min, max, false, undefined, random));
}


/***/ })

/******/ });
//# sourceMappingURL=app.37f3844bc9e14d4ec0d0.js.map