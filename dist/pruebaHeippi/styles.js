(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\vgt8\Desktop\Heippi\pruebaHeippi\src\styles.css */"OmL/");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "OmL/":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "W9N5":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* You can add global styles to this file, and also import other style files */\n\n\n/* position */\n\n\n.toast-center-center {\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n\n\n.toast-top-center {\n    top: 0;\n    right: 0;\n    width: 100%;\n}\n\n\n.toast-bottom-center {\n    bottom: 0;\n    right: 0;\n    width: 100%;\n}\n\n\n.toast-top-full-width {\n    top: 0;\n    right: 0;\n    width: 100%;\n}\n\n\n.toast-bottom-full-width {\n    bottom: 0;\n    right: 0;\n    width: 100%;\n}\n\n\n.toast-top-left {\n    top: 12px;\n    left: 12px;\n}\n\n\n.toast-top-right {\n    top: 12px;\n    right: 12px;\n}\n\n\n.toast-bottom-right {\n    right: 12px;\n    bottom: 12px;\n}\n\n\n.toast-bottom-left {\n    bottom: 12px;\n    left: 12px;\n}\n\n\n/* toast styles */\n\n\n.toast-title {\n    font-weight: bold;\n}\n\n\n.toast-message {\n    word-wrap: break-word;\n}\n\n\n.toast-message a,\n.toast-message label {\n    color: #FFFFFF;\n}\n\n\n.toast-message a:hover {\n    color: #CCCCCC;\n    text-decoration: none;\n}\n\n\n.toast-close-button {\n    position: relative;\n    right: -0.3em;\n    top: -0.3em;\n    float: right;\n    font-size: 20px;\n    font-weight: bold;\n    color: #FFFFFF;\n    text-shadow: 0 1px 0 #ffffff;\n    /* opacity: 0.8; */\n}\n\n\n.toast-close-button:hover,\n.toast-close-button:focus {\n    color: #000000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: 0.4;\n}\n\n\n/*Additional properties for button version\niOS requires the button element instead of an anchor tag.\nIf you want the anchor version, it requires `href=\"#\"`.*/\n\n\nbutton.toast-close-button {\n    padding: 0;\n    cursor: pointer;\n    background: transparent;\n    border: 0;\n}\n\n\n.toast-container {\n    pointer-events: none;\n    position: fixed;\n    z-index: 999999;\n}\n\n\n.toast-container * {\n    box-sizing: border-box;\n}\n\n\n.toast-container .ngx-toastr {\n    position: relative;\n    overflow: hidden;\n    margin: 0 0 6px;\n    padding: 15px 15px 15px 50px;\n    width: 300px;\n    border-radius: 3px 3px 3px 3px;\n    background-position: 15px center;\n    background-repeat: no-repeat;\n    background-size: 24px;\n    box-shadow: 0 0 12px #999999;\n    color: #FFFFFF;\n}\n\n\n.toast-container .ngx-toastr:hover {\n    box-shadow: 0 0 12px #000000;\n    opacity: 1;\n    cursor: pointer;\n}\n\n\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/info-circle.svg */\n\n\n.toast-info {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'%3E%3Cpath fill='rgb(255,255,255)' d='M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z'/%3E%3C/svg%3E\");\n}\n\n\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/times-circle.svg */\n\n\n.toast-error {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'%3E%3Cpath fill='rgb(255,255,255)' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'/%3E%3C/svg%3E\");\n}\n\n\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/check.svg */\n\n\n.toast-success {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'%3E%3Cpath fill='rgb(255,255,255)' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'/%3E%3C/svg%3E\");\n}\n\n\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/exclamation-triangle.svg */\n\n\n.toast-warning {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' width='576' height='512'%3E%3Cpath fill='rgb(255,255,255)' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'/%3E%3C/svg%3E\");\n}\n\n\n.toast-container.toast-top-center .ngx-toastr,\n.toast-container.toast-bottom-center .ngx-toastr {\n    width: 300px;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n\n.toast-container.toast-top-full-width .ngx-toastr,\n.toast-container.toast-bottom-full-width .ngx-toastr {\n    width: 96%;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n\n.ngx-toastr {\n    background-color: #030303;\n    pointer-events: auto;\n}\n\n\n.toast-success {\n    background-color: #51A351;\n}\n\n\n.toast-error {\n    background-color: #BD362F;\n}\n\n\n.toast-info {\n    background-color: #2F96B4;\n}\n\n\n.toast-warning {\n    background-color: #F89406;\n}\n\n\n.toast-progress {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    height: 4px;\n    background-color: #000000;\n    opacity: 0.4;\n}\n\n\n/* Responsive Design */\n\n\n@media all and (max-width: 240px) {\n    .toast-container .ngx-toastr.div {\n        padding: 8px 8px 8px 50px;\n        width: 11em;\n    }\n    .toast-container .toast-close-button {\n        right: -0.2em;\n        top: -0.2em;\n    }\n}\n\n\n@media all and (min-width: 241px) and (max-width: 480px) {\n    .toast-container .ngx-toastr.div {\n        padding: 8px 8px 8px 50px;\n        width: 18em;\n    }\n    .toast-container .toast-close-button {\n        right: -0.2em;\n        top: -0.2em;\n    }\n}\n\n\n@media all and (min-width: 481px) and (max-width: 768px) {\n    .toast-container .ngx-toastr.div {\n        padding: 15px 15px 15px 50px;\n        width: 25em;\n    }\n}", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"AAAA,8EAA8E;;;AAG9E,aAAa;;;AAEb;IACI,QAAQ;IACR,SAAS;IACT,gCAAgC;AACpC;;;AAEA;IACI,MAAM;IACN,QAAQ;IACR,WAAW;AACf;;;AAEA;IACI,SAAS;IACT,QAAQ;IACR,WAAW;AACf;;;AAEA;IACI,MAAM;IACN,QAAQ;IACR,WAAW;AACf;;;AAEA;IACI,SAAS;IACT,QAAQ;IACR,WAAW;AACf;;;AAEA;IACI,SAAS;IACT,UAAU;AACd;;;AAEA;IACI,SAAS;IACT,WAAW;AACf;;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;;AAEA;IACI,YAAY;IACZ,UAAU;AACd;;;AAGA,iBAAiB;;;AAEjB;IACI,iBAAiB;AACrB;;;AAEA;IACI,qBAAqB;AACzB;;;AAEA;;IAEI,cAAc;AAClB;;;AAEA;IACI,cAAc;IACd,qBAAqB;AACzB;;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,WAAW;IACX,YAAY;IACZ,eAAe;IACf,iBAAiB;IACjB,cAAc;IACd,4BAA4B;IAC5B,kBAAkB;AACtB;;;AAEA;;IAEI,cAAc;IACd,qBAAqB;IACrB,eAAe;IACf,YAAY;AAChB;;;AAGA;;wDAEwD;;;AAExD;IACI,UAAU;IACV,eAAe;IACf,uBAAuB;IACvB,SAAS;AACb;;;AAEA;IACI,oBAAoB;IACpB,eAAe;IACf,eAAe;AACnB;;;AAEA;IACI,sBAAsB;AAC1B;;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,eAAe;IACf,4BAA4B;IAC5B,YAAY;IACZ,8BAA8B;IAC9B,gCAAgC;IAChC,4BAA4B;IAC5B,qBAAqB;IACrB,4BAA4B;IAC5B,cAAc;AAClB;;;AAEA;IACI,4BAA4B;IAC5B,UAAU;IACV,eAAe;AACnB;;;AAGA,iHAAiH;;;AAEjH;IACI,qlBAAqlB;AACzlB;;;AAGA,kHAAkH;;;AAElH;IACI,6jBAA6jB;AACjkB;;;AAGA,2GAA2G;;;AAE3G;IACI,wdAAwd;AAC5d;;;AAGA,0HAA0H;;;AAE1H;IACI,soBAAsoB;AAC1oB;;;AAEA;;IAEI,YAAY;IACZ,iBAAiB;IACjB,kBAAkB;AACtB;;;AAEA;;IAEI,UAAU;IACV,iBAAiB;IACjB,kBAAkB;AACtB;;;AAEA;IACI,yBAAyB;IACzB,oBAAoB;AACxB;;;AAEA;IACI,yBAAyB;AAC7B;;;AAEA;IACI,yBAAyB;AAC7B;;;AAEA;IACI,yBAAyB;AAC7B;;;AAEA;IACI,yBAAyB;AAC7B;;;AAEA;IACI,kBAAkB;IAClB,OAAO;IACP,SAAS;IACT,WAAW;IACX,yBAAyB;IACzB,YAAY;AAChB;;;AAGA,sBAAsB;;;AAEtB;IACI;QACI,yBAAyB;QACzB,WAAW;IACf;IACA;QACI,aAAa;QACb,WAAW;IACf;AACJ;;;AAEA;IACI;QACI,yBAAyB;QACzB,WAAW;IACf;IACA;QACI,aAAa;QACb,WAAW;IACf;AACJ;;;AAEA;IACI;QACI,4BAA4B;QAC5B,WAAW;IACf;AACJ","sourcesContent":["/* You can add global styles to this file, and also import other style files */\n\n\n/* position */\n\n.toast-center-center {\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.toast-top-center {\n    top: 0;\n    right: 0;\n    width: 100%;\n}\n\n.toast-bottom-center {\n    bottom: 0;\n    right: 0;\n    width: 100%;\n}\n\n.toast-top-full-width {\n    top: 0;\n    right: 0;\n    width: 100%;\n}\n\n.toast-bottom-full-width {\n    bottom: 0;\n    right: 0;\n    width: 100%;\n}\n\n.toast-top-left {\n    top: 12px;\n    left: 12px;\n}\n\n.toast-top-right {\n    top: 12px;\n    right: 12px;\n}\n\n.toast-bottom-right {\n    right: 12px;\n    bottom: 12px;\n}\n\n.toast-bottom-left {\n    bottom: 12px;\n    left: 12px;\n}\n\n\n/* toast styles */\n\n.toast-title {\n    font-weight: bold;\n}\n\n.toast-message {\n    word-wrap: break-word;\n}\n\n.toast-message a,\n.toast-message label {\n    color: #FFFFFF;\n}\n\n.toast-message a:hover {\n    color: #CCCCCC;\n    text-decoration: none;\n}\n\n.toast-close-button {\n    position: relative;\n    right: -0.3em;\n    top: -0.3em;\n    float: right;\n    font-size: 20px;\n    font-weight: bold;\n    color: #FFFFFF;\n    text-shadow: 0 1px 0 #ffffff;\n    /* opacity: 0.8; */\n}\n\n.toast-close-button:hover,\n.toast-close-button:focus {\n    color: #000000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: 0.4;\n}\n\n\n/*Additional properties for button version\niOS requires the button element instead of an anchor tag.\nIf you want the anchor version, it requires `href=\"#\"`.*/\n\nbutton.toast-close-button {\n    padding: 0;\n    cursor: pointer;\n    background: transparent;\n    border: 0;\n}\n\n.toast-container {\n    pointer-events: none;\n    position: fixed;\n    z-index: 999999;\n}\n\n.toast-container * {\n    box-sizing: border-box;\n}\n\n.toast-container .ngx-toastr {\n    position: relative;\n    overflow: hidden;\n    margin: 0 0 6px;\n    padding: 15px 15px 15px 50px;\n    width: 300px;\n    border-radius: 3px 3px 3px 3px;\n    background-position: 15px center;\n    background-repeat: no-repeat;\n    background-size: 24px;\n    box-shadow: 0 0 12px #999999;\n    color: #FFFFFF;\n}\n\n.toast-container .ngx-toastr:hover {\n    box-shadow: 0 0 12px #000000;\n    opacity: 1;\n    cursor: pointer;\n}\n\n\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/info-circle.svg */\n\n.toast-info {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'%3E%3Cpath fill='rgb(255,255,255)' d='M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z'/%3E%3C/svg%3E\");\n}\n\n\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/times-circle.svg */\n\n.toast-error {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'%3E%3Cpath fill='rgb(255,255,255)' d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'/%3E%3C/svg%3E\");\n}\n\n\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/check.svg */\n\n.toast-success {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='512' height='512'%3E%3Cpath fill='rgb(255,255,255)' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'/%3E%3C/svg%3E\");\n}\n\n\n/* https://github.com/FortAwesome/Font-Awesome-Pro/blob/master/advanced-options/raw-svg/regular/exclamation-triangle.svg */\n\n.toast-warning {\n    background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512' width='576' height='512'%3E%3Cpath fill='rgb(255,255,255)' d='M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z'/%3E%3C/svg%3E\");\n}\n\n.toast-container.toast-top-center .ngx-toastr,\n.toast-container.toast-bottom-center .ngx-toastr {\n    width: 300px;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.toast-container.toast-top-full-width .ngx-toastr,\n.toast-container.toast-bottom-full-width .ngx-toastr {\n    width: 96%;\n    margin-left: auto;\n    margin-right: auto;\n}\n\n.ngx-toastr {\n    background-color: #030303;\n    pointer-events: auto;\n}\n\n.toast-success {\n    background-color: #51A351;\n}\n\n.toast-error {\n    background-color: #BD362F;\n}\n\n.toast-info {\n    background-color: #2F96B4;\n}\n\n.toast-warning {\n    background-color: #F89406;\n}\n\n.toast-progress {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    height: 4px;\n    background-color: #000000;\n    opacity: 0.4;\n}\n\n\n/* Responsive Design */\n\n@media all and (max-width: 240px) {\n    .toast-container .ngx-toastr.div {\n        padding: 8px 8px 8px 50px;\n        width: 11em;\n    }\n    .toast-container .toast-close-button {\n        right: -0.2em;\n        top: -0.2em;\n    }\n}\n\n@media all and (min-width: 241px) and (max-width: 480px) {\n    .toast-container .ngx-toastr.div {\n        padding: 8px 8px 8px 50px;\n        width: 18em;\n    }\n    .toast-container .toast-close-button {\n        right: -0.2em;\n        top: -0.2em;\n    }\n}\n\n@media all and (min-width: 481px) and (max-width: 768px) {\n    .toast-container .ngx-toastr.div {\n        padding: 15px 15px 15px 50px;\n        width: 25em;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map