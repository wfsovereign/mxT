/**
 * Created by wfsovereign on 15-7-8.
 */

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var config = {
    id: "show-time"
};

var DatePlugin = (function (config) {
    var id = config.id;
    var Dates = {};
    var globalYear = year, globalMonth = month;
    var lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];



    Dates.getTargetJQueryId = function (id) {
        var className = "." + id;
        return  $(className)
    };


    var targetJqueryId = Dates.getTargetJQueryId(id);
    var frameName = "date-box";
    var frameJQuery = Dates.getTargetJQueryId(frameName);


    Dates.isBissextile = function (year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    Dates.getMonthTotalDays = function (year, month) {
        var monthTotalDays = lastDay[month - 1];
        return (Dates.isBissextile(year) && month === 2) ? monthTotalDays + 1 : monthTotalDays
    };

    Dates.getThisWeekDay = function (year, month, day) {
        return new Date(year, month - 1, day).getDay();
    };


    Dates.addViewTableHeader = function () {
        var viewTableHtml = "";
        viewTableHtml += "<td colspan='6'>" + year + "年" + month + "月" + day + "日</td><td><button id='plugin-close'>"
        + "关闭"
        + "</button></td></tr><tr>";
        return viewTableHtml
    };

    Dates.addViewTableYMSelector = function () {
        var viewTableHtml = "";
        viewTableHtml += "<td><button id='last-month'><-</button></td>";
        viewTableHtml += "<td colspan='5'><select id='year'>";
        for (var i = 1900; i < 2099; i++) {
            viewTableHtml += "<option value=" + i + ">" + i + "</option>"
        }
        viewTableHtml += "</select>年<select id='month'>";
        for (var j = 1; j < 13; j++) {
            viewTableHtml += "<option value=" + j + ">" + j + "</option>"
        }
        viewTableHtml += "</select>月</td><td><button id='next-month'>-></button></td></tr><tr>";
        return viewTableHtml
    };


    Dates.addViewTableWeeks = function () {
        var viewTableHtml = "";
        var weeks = ['日', '一', '二', '三', '四', '五', '六'];
        _.each(weeks, function (item) {
            viewTableHtml += "<td>" + item + "</td>"
        });
        viewTableHtml += "</tr><tr>";
        return viewTableHtml
    };

    Dates.addViewTableBlankDay = function (year, month) {
        var viewTableHtml = "";
        var thisMonthFirstDay = Dates.getThisWeekDay(year, month, 1);
        for (var i = 0; i < thisMonthFirstDay; i++) {
            viewTableHtml += "<td></td>"
        }
        return viewTableHtml

    };

    Dates.addViewTableThisMonthDay = function (year, month) {
        var viewTableHtml = "";
        var thisMonthDay = Dates.getMonthTotalDays(year, month);
        for (var i = 1; i < thisMonthDay + 1; i++) {
            viewTableHtml += "<td>" + i + "</td>";
            if (Dates.getThisWeekDay(year, month, i) === 6) {
                viewTableHtml += "</tr><tr>"
            }
        }
        return viewTableHtml
    };

    Dates.viewTable = function (year, month) {
        var viewTableHtml = "";
        viewTableHtml += "<table class='date-plugin'><tr>";

        viewTableHtml += Dates.addViewTableHeader();
        viewTableHtml += Dates.addViewTableYMSelector();
        viewTableHtml += Dates.addViewTableWeeks();
        viewTableHtml += Dates.addViewTableBlankDay(year, month);
        viewTableHtml += Dates.addViewTableThisMonthDay(year, month);

        viewTableHtml += "</tr></table>";


        return viewTableHtml
    };

    //Dates.setCurrentTime(Dates.getCurrentDate)
    Dates.addListenerToDay = function () {
        $("tr:gt(2) td").on('click',function (e){
            var year = $('#year').val();
            var month = $('#month').val();
            var day = this.innerText || day;
            console.log(year + "-" + month + "-" + day);
            console.log('-----');
            //console.log(year + "-" + month + "-" + day);

            targetJqueryId.val(year + "-" + month + "-" + day)
        });
        $('.show-time').keydown(function (e) {
            if (e.keyCode === 13) {
                console.log(year + "-" + month + "-" + day);
                //Dates.setTodayDate(Dates.getTodayDate());
                targetJqueryId.val(year + "-" + month + "-" + day)
            }
        });
        targetJqueryId.focus(function (e) {
            Dates.run()
        });

        targetJqueryId.blur(function (e) {
            Dates.closeDatePlugin();

        });

    };
    Dates.addListenerToButton = function () {
        $('#last-month').on('click', function (e){
            if (globalMonth === 1) {
                globalYear -= 1;
                globalMonth = 12
            } else {
                globalMonth -= 1
            }

            //Dates.closeDatePlugin();
            //Dates.run();
            $('.date-plugin').remove();
            Dates.showDate();
        });
        $('#next-month').on('click', function (e){
            if (globalMonth === 12) {
                globalYear += 1;
                globalMonth = 1
            } else {
                globalMonth += 1
            }
            $('.date-plugin').remove();
            Dates.showDate();

        });
        $('#plugin-close').on('click', function (e){
            $('.date-plugin').remove();

        });
    };


    Dates.addListenerToPlugin = function () {
        $('#last-month').on('click', Dates.lastMonth);
        $('#next-month').on('click', Dates.nextMonth);
        $('#plugin-close').on('click', Dates.closeDatePlugin);
        $("tr:gt(2) td").on('click', Dates.setCurrentTime(Dates.getCurrentDate));
        targetJqueryId.keydown(function (e) {
            if (e.keyCode === 13) {
                console.log(year + "-" + month + "-" + day);
                //Dates.setTodayDate();
                targetJqueryId.val(year + "-" + month + "-" + day)


            }
        });
        targetJqueryId.focus(function (e) {
            Dates.run()
        });

        targetJqueryId.blur(function (e) {
            Dates.closeDatePlugin();

        });

    };


    Dates.lastMonth = function () {
        if (globalMonth === 1) {
            globalYear -= 1;
            globalMonth = 12
        } else {
            globalMonth -= 1
        }

        //Dates.closeDatePlugin();
        //Dates.run();
        $('.date-plugin').remove();
        Dates.showDate();
    };

    Dates.nextMonth = function () {
        if (globalMonth === 12) {
            globalYear += 1;
            globalMonth = 1
        } else {
            globalMonth += 1
        }

        Dates.closeDatePlugin();
        Dates.run();

    };

    Dates.setCurrentTime = function (currentDate) {
        console.log('setCurrentTime');
        targetJqueryId.val(currentDate)
    };

    Dates.getCurrentDate = function () {
        var year = $('#year').val();
        var month = $('#month').val();
        //var day = this.innerText || day;
        console.log(year + "-" + month + "-" + day);
        return (year + "-" + month + "-" + day)

    };

    Dates.setTodayDate = function (date) {
        targetJqueryId.val(date)
    };

    Dates.getTodayDate = function () {

        console.log(year + "-" + month + "-" + day);
        return (year + "-" + month + "-" + day)

    };

    Dates.initYM = function () {
        var year = $('#year'), month = $('#month');
        year.val(globalYear);
        month.val(globalMonth);

    };

    Dates.showDate = function () {
        $('.my').append(Dates.viewTable(globalYear, globalMonth));
        Dates.addListenerToDay();
        Dates.addListenerToButton();
        Dates.initYM();
    };

    Dates.closeDatePlugin = function () {
        console.log('0000');
        var test = $('#date-box');
        if(test){
            test.remove()
        }
    };

    Dates.getDatePluginHtml = function () {
        var datePluginHtml="";
        datePluginHtml += "<div class='" + frameName + "'>";
        datePluginHtml += Dates.viewTable(globalYear,globalMonth);
        datePluginHtml += "</div>";
        return datePluginHtml
    };

    Dates.getFramePosition = function () {

        var inputFrameTop = targetJqueryId.position().top;
        var inputFrameLeft = targetJqueryId.position().left;
        var inputFrameHeight = targetJqueryId.outerHeight();

        return {
            'top': (inputFrameTop + inputFrameHeight) + 'px',
            'left': inputFrameLeft + 'px',
            'display':'block'
        }

    };


    Dates.addCSSToFrame = function (){
        frameJQuery.css(Dates.getFramePosition());
    };



    Dates.run = function () {
        $('body').append(Dates.getDatePluginHtml());

        Dates.addCSSToFrame();
        //Dates.addListenerToPlugin();

        Dates.addListenerToButton();
        Dates.addListenerToDay();
        Dates.initYM();
    };

    return Dates
}(config));



$(function () {
    var goal = $('.my');

    DatePlugin.showDate();

    //goal.append(DatePlugin.viewTable(year, month));
    //goal.show();
    //DatePlugin.initYM();
    //DatePlugin.addListenerToDay();
    //DatePlugin.addListenerToButton();

    //DatePlugin(config);
    //DatePlugin.run();
    //DatePlugin.addCSSToFrame();
    //DatePlugin.addListenerToPlugin();
    //DatePlugin.initYM();
    //console.log(DatePlugin.getFramePosition());
    //console.log(DatePlugin.getDatePluginHtml());

    //DatePlugin.closeDatePlugin();




    //console.log(   DatePlugin.viewTable(year,month));

    //
    //var inputFrame = $('.show-time');
    //inputFrame.focus(function (e) {
    //    DatePlugin.showDate();
    //});
    //
    //inputFrame.blur(function (e) {
    //    DatePlugin.closeDatePlugin();
    //
    //});
    //
    //
    //var inputFrameTop = inputFrame.position().top;
    //var inputFrameLeft = inputFrame.position().left;
    //var inputFrameHeight = inputFrame.outerHeight();
    //console.log(inputFrameTop);
    //console.log(inputFrameHeight);
    //var addCss = {
    //    'top': (inputFrameTop + inputFrameHeight) + 'px',
    //    'left': inputFrameLeft + 'px'
    //};
    //
    //var html = "<div class='date-box'></div>";
    //
    //$('body').after(html);
    //$('.date-box').css(addCss);



    //goal.append(DatePlugin.addListenerToButton());

    //$('#plugin-close').on('click',goal.hide())
});