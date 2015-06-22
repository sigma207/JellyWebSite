/**
 * Created by user on 2015/4/28.
 */
var downloadDialog;
var contentUrl = {
    index: "jelly/Index.html",
    menu1: "jelly/Introduction.html",
    menu2: "jelly/Catalog.html",
    menu3: "jelly/Charge.html",
    menu4: "jelly/Support.html",
    menu5: "jelly/Contact.html"
};

function init() {
    if ($.browser.mobile) {
        window.location.href = "Mobile.html";
    }
    downloadDialog = $(".downloadDialog");
    downloadDialog.dialog({
        autoOpen: false
    });
    $("#downloadButton").on("click",downloadClick);
    initMenu();
}

function initMenu() {
    $(".menuImgItem").on("click", menuClick);
}

function menuClick(e) {
    var menuItem = $(e.currentTarget);
    var menuIndex = menuItem.parent().index();//div -parent--> li
    if (!menuItem.hasClass("")) {
        goMenuImg(menuIndex);
    }
}
function goMenuImg(menuIndex) {
    var allMenu = $(".menuImgItem");

    allMenu.each(function (index) {
        if (index == menuIndex) {
            $(this).removeClass("menu" + (index + 1));
            $(this).addClass("menu" + (index + 1) + "Selected");
        } else {
            $(this).removeClass("menu" + (index + 1) + "Selected");
            $(this).addClass("menu" + (index + 1));
        }
    });
    currentContentUrl = contentUrl["menu" + (menuIndex + 1)];
    loadContentUrl();
}

function goMenu(menuIndex) {
    var allMenu = $(".menuItem");
    allMenu.addClass("menu").removeClass("menuDisable");
    var menuItem = allMenu.eq(menuIndex);
    menuItem.removeClass("menu");
    menuItem.addClass("menuDisable");
    currentContentUrl = contentUrl["menu" + (menuIndex + 1)];
    loadContentUrl();
}

function logoClick(e) {
    var allMenu = $(".menuImgItem");
    allMenu.each(function (index) {
        $(this).removeClass("menu" + (index + 1) + "Selected");
        $(this).addClass("menu" + (index + 1));
    });
    //$(".menuItem").addClass("menu").removeClass("menuDisable");
    currentContentUrl = contentUrl.index;
    loadContentUrl();
}

function onIndexLoad() {
    console.log("onIndexLoad");
    loadBulletin();
    quote1 = DragTable.createNew("quote1");
    quote2 = DragTable.createNew("quote2");
    forexMetalData = generateForexData();
    stockData = generateStockData();
    quote1.setDataSource(forexMetalData);
    quote2.setDataSource(stockData);

    var rowData = forexMetalData[0];
    generateValueList(rowData);
    if (document.createElement('canvas').getContext) {//support canvas
        $(document).on("rowClick", tableRowClick);
        rangeChartInit("value", "volume", "time");
        runChart(rowData);
    } else {
        $(".quoteContainer").css("width", "960px");
        $(".quoteItem").css("width", "479px");
        $(".canvasContainer").hide();
        $(".oddEven>tbody>tr:odd").addClass("oddTr");
        $(".oddEven>tbody>tr:even").addClass("evenTr");
    }
}

function tableRowClick(e, tr, tableClass, rowIndex, rowData) {
    if (typeof(rowData.valueList) == "undefined") {
        generateValueList(rowData);
    }
    runChart(rowData);
}

function openDownload(){
    downloadDialog.dialog("open");
}

function downloadClick(e) {
    var sendData = {};
    sendData.password = $("#downloadPassword").val();
    $.post(CONFIG.JELLY_ACTION_URL, sendData, onCheckPdfPassword, "json");

    function onCheckPdfPassword(data, status, jqXHR) {
        if(data.success){
            document.getElementById("downloadPdf").click();
            downloadDialog.dialog("close");
        }else{
            alert(i18n.t("main.passwordWrong"));
        }
    }
}

function onLangChange() {
    downloadDialog.dialog("option", "title", i18n.t("main.downloadTitle"));
    $("#downloadButton").attr("value", i18n.t("main.download"));
    $("#downloadPasswordLabel").html(i18n.t("main.password") + ":");
}