"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* -------------------------------------------------------------------------- */
/*                                    Utils                                   */
/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};
var resize = function resize(fn) {
  return window.addEventListener('resize', fn);
};
var isIterableArray = function isIterableArray(array) {
  return Array.isArray(array) && !!array.length;
};
var camelize = function camelize(str) {
  var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};
var getData = function getData(el, data) {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};

/* ----------------------------- Colors function ---------------------------- */

var hexToRgb = function hexToRgb(hexValue) {
  var hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue;
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};
var rgbaColor = function rgbaColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};

/* --------------------------------- Colors --------------------------------- */

var getColor = function getColor(name) {
  var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
  return getComputedStyle(dom).getPropertyValue("--falcon-".concat(name)).trim();
};
var getColors = function getColors(dom) {
  return {
    primary: getColor('primary', dom),
    secondary: getColor('secondary', dom),
    success: getColor('success', dom),
    info: getColor('info', dom),
    warning: getColor('warning', dom),
    danger: getColor('danger', dom),
    light: getColor('light', dom),
    dark: getColor('dark', dom)
  };
};
var getSubtleColors = function getSubtleColors(dom) {
  return {
    primary: getColor('primary-bg-subtle', dom),
    secondary: getColor('secondary-bg-subtle', dom),
    success: getColor('success-bg-subtle', dom),
    info: getColor('info-bg-subtle', dom),
    warning: getColor('warning-bg-subtle', dom),
    danger: getColor('danger-bg-subtle', dom),
    light: getColor('light-bg-subtle', dom),
    dark: getColor('dark-bg-subtle', dom)
  };
};
var getGrays = function getGrays(dom) {
  return {
    white: getColor('gray-white', dom),
    100: getColor('gray-100', dom),
    200: getColor('gray-200', dom),
    300: getColor('gray-300', dom),
    400: getColor('gray-400', dom),
    500: getColor('gray-500', dom),
    600: getColor('gray-600', dom),
    700: getColor('gray-700', dom),
    800: getColor('gray-800', dom),
    900: getColor('gray-900', dom),
    1000: getColor('gray-1000', dom),
    1100: getColor('gray-1100', dom),
    black: getColor('gray-black', dom)
  };
};
var hasClass = function hasClass(el, className) {
  !el && false;
  return el.classList.value.includes(className);
};
var addClass = function addClass(el, className) {
  el.classList.add(className);
};
var removeClass = function removeClass(el, className) {
  el.classList.remove(className);
};
var getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};
function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
  return vertInView && horInView;
}
var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};
var getBreakpoint = function getBreakpoint(el) {
  var classes = el && el.classList.value;
  var breakpoint;
  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
      return cls.includes('navbar-expand-');
    }).pop().split('-').pop()];
  }
  return breakpoint;
};

/* --------------------------------- Cookie --------------------------------- */

var setCookie = function setCookie(name, value, expire) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};
var getCookie = function getCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
  return keyValue ? keyValue[2] : keyValue;
};
var settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
};

/* -------------------------- Chart Initialization -------------------------- */

var newChart = function newChart(chart, config) {
  var ctx = chart.getContext('2d');
  return new window.Chart(ctx, config);
};

/* ---------------------------------- Store --------------------------------- */

var getItemFromStore = function getItemFromStore(key, defaultValue) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (_unused) {
    return store.getItem(key) || defaultValue;
  }
};
var setItemToStore = function setItemToStore(key, payload) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  return store.setItem(key, payload);
};
var getStoreSpace = function getStoreSpace() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
  return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};

/* get Dates between */

var getDates = function getDates(startDate, endDate) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 * 60 * 60 * 24;
  var duration = endDate - startDate;
  var steps = duration / interval;
  return Array.from({
    length: steps + 1
  }, function (v, i) {
    return new Date(startDate.valueOf() + interval * i);
  });
};
var getPastDates = function getPastDates(duration) {
  var days;
  switch (duration) {
    case 'week':
      days = 7;
      break;
    case 'month':
      days = 30;
      break;
    case 'year':
      days = 365;
      break;
    default:
      days = duration;
  }
  var date = new Date();
  var endDate = date;
  var startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
  return getDates(startDate, endDate);
};

/* Get Random Number */
var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var utils = {
  docReady: docReady,
  breakpoints: breakpoints,
  resize: resize,
  isIterableArray: isIterableArray,
  camelize: camelize,
  getData: getData,
  hasClass: hasClass,
  addClass: addClass,
  hexToRgb: hexToRgb,
  rgbaColor: rgbaColor,
  getColor: getColor,
  getColors: getColors,
  getSubtleColors: getSubtleColors,
  getGrays: getGrays,
  getOffset: getOffset,
  isScrolledIntoView: isScrolledIntoView,
  getBreakpoint: getBreakpoint,
  setCookie: setCookie,
  getCookie: getCookie,
  newChart: newChart,
  settings: settings,
  getItemFromStore: getItemFromStore,
  setItemToStore: setItemToStore,
  getStoreSpace: getStoreSpace,
  getDates: getDates,
  getPastDates: getPastDates,
  getRandomNumber: getRandomNumber,
  removeClass: removeClass
};

/* eslint-disable */
var getPosition = function getPosition(pos, params, dom, rect, size) {
  return {
    top: pos[1] - size.contentSize[1] - 10,
    left: pos[0] - size.contentSize[0] / 2
  };
};
var echartSetOption = function echartSetOption(chart, userOptions, getDefaultOptions) {
  var themeController = document.body;
  // Merge user options with lodash
  chart.setOption(window._.merge(getDefaultOptions(), userOptions));
  themeController.addEventListener('clickControl', function (_ref) {
    var control = _ref.detail.control;
    if (control === 'theme') {
      chart.setOption(window._.merge(getDefaultOptions(), userOptions));
    }
  });
};
var tooltipFormatter = function tooltipFormatter(params) {
  var tooltipItem = "";
  params.forEach(function (el) {
    tooltipItem = tooltipItem + "<div class='ms-1'>\n        <h6 class=\"text-700\"><span class=\"fas fa-circle me-1 fs--2\" style=\"color:".concat(el.borderColor ? el.borderColor : el.color, "\"></span>\n          ").concat(el.seriesName, " : ").concat(_typeof(el.value) === 'object' ? el.value[1] : el.value, "\n        </h6>\n      </div>");
  });
  return "<div>\n            <p class='mb-2 text-600'>\n              ".concat(window.dayjs(params[0].axisValue).isValid() ? window.dayjs(params[0].axisValue).format('MMMM DD') : params[0].axisValue, "\n            </p>\n            ").concat(tooltipItem, "\n          </div>");
};




function createTableWithInnerHTML(data) {
  let tableHTML = '<table class="table mb-0 fs--1 border-200 table-borderless"><tr>';

  Object.keys(data[0]).forEach(key => {
      tableHTML += `<th class="bg-light">${key}</th>`;
  });

  tableHTML += '</tr>';


  const lastItem = data[data.length - 1]
  
  document.getElementById('totaltn').innerText = lastItem["CANTIDAD"]
  
  console.log(lastItem["CANTIDAD"])
  console.log(data.length)

   for (let i = 0; i < data.length - 1; i++) {
    tableHTML += `<tr>`
    Object.values(data[i]).forEach(value => {
          
          if (typeof value == "string") {
              tableHTML += `<td class="align-middle fw-medium ">${value}</td>`;
          } else {
              tableHTML += `<td style="text-align:right;"  class="align-middle">${value}</td>`;
          }
          
          
      });
      tableHTML += '</tr>';


    } 
    tableHTML += `<tr class="bg-light"><td>TOTAL</td><td>${lastItem["CANTIDAD"]}</td><td>${lastItem["PORCENTAJE"]}</td>`;
    tableHTML += '</tr>';

    tableHTML += '</table>';

   return tableHTML;
}


function getAjax(url, data=null) {
  let result = null  
  $.ajax({
      url: url,
      type: "get",
      dataType: "json",
      contentType: "application/json; charset=utf-8", 
      async: false,
  }).done(function(response){
      result = response
  }).fail(function(error){
      console.log(error)
  })
  return result
}

var mostLeadsInit = function mostLeadsInit() {

        let datajson = getAjax("Methods/InformeCementoporTipoJson")
        let tableData = getAjax("Methods/InformeCementoporTipoTbl")

        var divContainer = document.getElementById("CantporTipo");
        divContainer.innerHTML = createTableWithInnerHTML(tableData);
        
        

        console.log (tableData)

    var ECHART_MOST_LEADS = '.echart-most-leads';
    var $echartMostLeads = document.querySelector(ECHART_MOST_LEADS);
    if ($echartMostLeads) {
      var userOptions = utils.getData($echartMostLeads, 'options');
      var chart = window.echarts.init($echartMostLeads);
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: [utils.getColors().primary, utils.rgbaColor(utils.getColors().primary, 0.5), utils.getColors().warning, utils.rgbaColor(utils.getColors().primary, 0.7)],
          tooltip: {
            trigger: 'item',
            padding: [7, 10],
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['200'],
            textStyle: {
              color: utils.getColors().dark
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: function formatter(params) {
              return "<strong>".concat(params.data.name, ":</strong> ").concat(params.percent, "%");
            }
          },
          position: function position(pos, params, dom, rect, size) {
            return getPosition(pos, params, dom, rect, size);
          },
          legend: {
            show: false
          },
          series: [{
            type: 'pie',
            radius: ['100%', '57%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            itemStyle: {
              borderWidth: 2,
              borderColor: utils.getColor('gray-100')
            },
            label: {
              normal: {
                show: false,
                position: 'center',
                textStyle: {
                  fontSize: '20',
                  fontWeight: '500',
                  color: utils.getGrays()['700']
                }
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: datajson 
          }]
        };
      };
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  docReady(mostLeadsInit);  