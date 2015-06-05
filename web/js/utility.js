/**
 * Created by user on 2015/4/27.
 */

$.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
$.browser.safari = /safari/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase()) || !!navigator.userAgent.match(/Trident.*rv\:11\./);
//$.browser.mobile = !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)||!!navigator.userAgent.match(/AppleWebKit/);
$.browser.mobile = (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i));
$.browser.lang = window.navigator.userLanguage || window.navigator.language;
console.log(navigator.userAgent.toLowerCase());
console.log($.browser);
var JsonTool = {
    length: function (obj) {
        var count = 0;
        for (var key in obj) {
            count++;
        }
        return count;
    },
    sortString: function (json, property, order) {
        json.sort(function (a, b) {
            if (order == "" || order == "asc") {
                return a[property].localeCompare(b[property]);
            } else {
                return b[property].localeCompare(a[property]);
            }
        });
    },
    sort: function (json, property, order) {
        json.sort(function (a, b) {
            if (order == "" || order == "asc") {
                return a[property] - b[property];
            } else {
                return b[property] - a[property];
            }
        });
    },
    isInt: function (n) {
        return Number(n) === n && n % 1 === 0;
    },
    formatFloat: function (num, pos) {
        var size = Math.pow(10, pos);
        return Math.round(num * size) / size;
    },
    random: function (min, max) {
        return Math.random() * (max - min) + min;
    },
    randomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};

var DomTool = {
    /**
     * http://stackoverflow.com/questions/8034918/jquery-switch-elements-in-dom
     * pure dom element swap
     * @param elm1
     * @param elm2
     */
    swapElements: function (elm1, elm2) {
        var parent1, next1,
            parent2, next2;

        parent1 = elm1.parentNode;
        next1 = elm1.nextSibling;
        parent2 = elm2.parentNode;
        next2 = elm2.nextSibling;

        parent1.insertBefore(elm2, next1);
        parent2.insertBefore(elm1, next2);
    }
};