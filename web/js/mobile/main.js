/**
 * Created by user on 2015/6/2.
 */
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

function init() {
    initMenu();
}

function initMenu(){
    menuContainer = $(".menuContainer");
    menuButton = $(".menuButton");
    menuItemList = $(".menuItem");
    menuContainer.hide();
    $(document).on("click", pageClick);
    menuButton.on("click", menuClick);
    menuItemList.each(function (index) {
        $(this).on("click", menuItemClick);
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

function onIndexLoad() {
    console.log("onIndexLoad");
    loadBulletin();
    canvasContainer = $(".canvasContainer");
    var c = $("#canvas");
    c.attr("width", $(window).width());
    c.attr("height", 250);
    canvasContainer.css("left", ($(window).width() - c.width()) / 2 + "px");
    canvasContainer.hide();

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
        $(".canvasContainer").hide();
    }
    var rowData = forexMetalData[0];
    generateValueList(rowData);
    runChart(rowData);
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