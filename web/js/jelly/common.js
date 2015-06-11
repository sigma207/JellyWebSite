/**
 * Created by user on 2015/6/5.
 */
var quote1;
var quote2;
var forexMetalData;
var stockData;
var logo;
var langSelect;
var currentLang = "";
var currentContentUrl = "";
$(document).ready(function () {
    currentLang = $.browser.lang;
    currentContentUrl = contentUrl.index;
    langSelect = $("#langSelect");
    langSelect.change(function (e) {
        currentLang = $(this).val();
        changeLang(currentLang);
    });
    logo = $(".logo");
    logo.on("click", logoClick);
    init();
    loadContentUrl();
});

function loadContentUrl() {
    $(".content").load(currentContentUrl, contentLoad);
}

function contentLoad() {
    if (currentContentUrl == contentUrl.index) {
        onIndexLoad();
    }
    langSelect.val(currentLang).change();
}

function changeLang(lang) {
    console.log("lang=" + lang);
    var option = {resGetPath: "locales/" + lang + "/jelly.json"};
    i18n.init(option, function (t) {
        document.title = t("main.pageTitle");
        $(".container").i18n();
        quote1.changeLangClass(currentLang);
        quote2.changeLangClass(currentLang);
        onLangChange();
    });
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

function loadBulletin() {
    var sendData = {};
    sendData.action = CONFIG.LIST_ACTION;
    $.post(CONFIG.BULLETIN_ACTION_URL, sendData, onBulletinsLoad, "json");

    function onBulletinsLoad(data, status, jqXHR) {
        if(data.success){
            var bulletinList = JSON.parse(data.data);
            var news = $(".news");
            for (var i = 0; i < bulletinList.length; i++) {
                news.append("<div>" + bulletinList[i].content + "</div>")
            }
        }else{
            console.log(data.msg);
        }
    }
}