/**
 * Created by user on 2015/6/2.
 */
var quote1;
var quote2;
var forexMetalData;
var stockData;
var logo;
var langSelect;
var currentLang = "";
var currentContentUrl = "";
var menuContainer;
var menuButton;
var menuItemList;
var canvasContainer;
var contentUrl = {
    index: "mobile/Index.html",
    menu1: "mobile/Introduction.html",
    menu2: "mobile/Catalog.html",
    menu3: "mobile/Charge.html",
    menu4: "mobile/Support.html",
    menu5: "mobile/Contact.html"
};
$(document).ready(function () {
    currentLang = $.browser.lang;
    currentContentUrl = contentUrl.index;
    init();
    loadContentUrl();
});

function init() {
    logo = $(".logo");

    menuContainer = $(".menuContainer");
    menuButton = $(".menuButton");
    menuItemList = $(".menuItem");
    menuContainer.hide();
    $(document).on("click", pageClick);
    menuButton.on("click", menuClick);
    menuItemList.each(function (index) {
        $(this).on("click", menuItemClick);
    });
    logo.on("click", logoClick);
    langSelect = $("#langSelect");
    langSelect.change(function (e) {
        currentLang = $(this).val();
        changeLang(currentLang);
    });
}

function pageClick(e) {
    if (!$(e.target).hasClass("menuButton")) {
        menuContainer.hide();
    }
    if (canvasContainer.css("display") == "block") {
        if (!$(e.target).hasClass("canvas")) {
            canvasContainer.hide();
        }
    }
}

function logoClick(e) {
    menuItemList.removeClass("selectMenu");
    menuItemList.addClass("unSelectMenu");
    currentContentUrl = contentUrl.index;
    loadContentUrl();
}

function menuClick(e) {
    menuContainer.show();
}

function menuItemClick(e) {
    menuContainer.hide();
    var menuItem = $(e.currentTarget);
    var menuIndex = menuItem.index();
    menuItemList.removeClass("selectMenu");
    menuItemList.removeClass("unSelectMenu");
    menuItemList.each(function (index) {
        if (index == menuIndex) {
            $(this).addClass("selectMenu");
        } else {
            $(this).addClass("unSelectMenu");
        }
    });
    currentContentUrl = contentUrl["menu" + (menuIndex + 1)];
    loadContentUrl();
}

function loadContentUrl() {
    $(".content").load(currentContentUrl, contentLoad);
}

function contentLoad() {
    //console.log("currentContentUrl=" + currentContentUrl);
    //$(".bodyContainer").css("backgroundImage", "url('images/banner_bg.png')");//用load之後的css沒用,只好手動設
    if (currentContentUrl == contentUrl.index) {
        onIndexLoad();
    }
    langSelect.val(currentLang).change();
}

function onIndexLoad() {
    console.log("onIndexLoad");
    //if (typeof canvasContainer === typeof undefined) {
    canvasContainer = $(".canvasContainer");
    var c = $("#canvas");
    c.attr("width", $(window).width());
    c.attr("height", 250);
    canvasContainer.css("left", ($(window).width() - c.width()) / 2 + "px");
    //canvasContainer.css("top", ($(window).height() - c.height()) / 2 + "px");
    canvasContainer.hide();
    //}

    quote1 = DragTable.createNew("quote1");
    quote2 = DragTable.createNew("quote2");
    forexMetalData = generateForexData();
    stockData = generateStockData();
    quote1.setDataSource(forexMetalData);
    quote2.setDataSource(stockData);

    if (document.createElement('canvas').getContext) {//support canvas
        $(document).on("rowClick", tableRowClick);
        rangeChartInit("value", "volume", "time");
    } else {
        //$(".quoteContainer").css("width", "960px");
        //$(".quoteItem").css("width", "479px");
        $(".canvasContainer").hide();
        //$(".oddEven>tbody>tr:odd").addClass("oddTr");
        //$(".oddEven>tbody>tr:even").addClass("evenTr");
    }
    var rowData = forexMetalData[0];
    generateValueList(rowData);
    runChart(rowData);
}

function changeLang(lang) {
    console.log("lang=" + lang);
    var option = {resGetPath: "locales/" + lang + "/jelly.json"};
    i18n.init(option, function (t) {
        document.title = t("main.pageTitle");
        $(".container").i18n();
        quote1.changeLangClass(currentLang);
        quote2.changeLangClass(currentLang);
    });
}


function tableRowClick(e, tr, tableClass, rowIndex, rowData) {
    if (typeof(rowData.valueList) == "undefined") {
        generateValueList(rowData);
    }
    runChart(rowData);
    var trOffsetTop = $(tr).offset().top;
    var canvasHeight = $("#canvas").attr("height");
    var headHeight = parseInt($(".header").css("height"));
    canvasContainer.css("top", (trOffsetTop - canvasHeight - headHeight) + "px");
    canvasContainer.show();
}

function generateForexData(option) {
    var data = [];
    var temp;
    for (var i = 0; i < forexMetalName.length; i++) {
        temp = Mock.mock(forexTemplate);
        temp.name = forexMetalName[i];
        temp.decimal = forexMetalDecimal[i] + 1;
        temp.buying = JsonTool.formatFloat(temp.buying, temp.decimal);
        temp.selling = JsonTool.formatFloat(temp.selling, temp.decimal);
        temp.spread = (temp.buying - temp.selling) * (Math.pow(10, forexMetalDecimal[i]));

        data.push(temp);
    }
    return data;
}

function generateStockData(option) {
    var data = [];
    var temp;
    for (var i = 0; i < stockName.length; i++) {
        temp = Mock.mock(stockTemplate);
        temp.name = stockName[i];
        data.push(temp);
    }
    return data;
}