/*
==============================================================================
//  指标知识库行业管理页面 TradeManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.TradeManage_aspx) { window.lorelibs.TradeManage_aspx = new Object(); }
    window.lorelibs.TradeManage_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        var _bindControl = function () {
            $("#selTrade_1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/LoreLibs/NormService.asmx/GetAllTrade")
            });
            $("#selTrade_1", ajaxContainerSelector).combobox("setValue", 0);
            $("#selTrade_2", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTrade")
            });
            $("#selTrade_3", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTrade")
            });
            $("#selTrade_4", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTrade")
            });
            $("#selTrade_5", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/LoreLibs/NormService.asmx/GetAllTrade")
            });
            $("#selTrade_5", ajaxContainerSelector).combobox("setValue", 0);
        }

        var _bindButtonEvent = function () {
            $("#a_add", ajaxContainerSelector).click(function () {
                var name = $("#txtName_1").val();
                var tradeSourseKey = $("#selTrade_1", ajaxContainerSelector).combobox("getValue");
                var param = { Name: name, TradeSourseKey: tradeSourseKey };
                if (name.isNullOrWhiteSpace()) {
                    $.plugin.showMessage("请输入行业名称!");
                    return;
                }
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("添加行业成功。");
                    } else {
                        $.plugin.showMessage("该行业名称已存在，添加失败。");
                    }
                };
                window.lorelibs.norm.addTrade(param, _callback);
            });
            $("#a_rename", ajaxContainerSelector).click(function () {
                var tradeKey = $("#selTrade_2", ajaxContainerSelector).combobox("getValue");
                var name = $("#txtName_2").val();
                var param = { TradeKey: tradeKey, Name: name };
                if (String(tradeKey).isNullOrWhiteSpace()) {
                    $.plugin.showMessage("请选择行业!");
                    return;
                }
                if (name.isNullOrWhiteSpace()) {
                    $.plugin.showMessage("请输入行业名称!");
                    return;
                }
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("重命名行业成功。");
                    } else {
                        $.plugin.showMessage("该行业名称已存在，重命名失败。");
                    }
                };
                window.lorelibs.norm.renameTrade(param, _callback);
            });
            $("#a_delete", ajaxContainerSelector).click(function () {
                var tradeKey = $("#selTrade_3", ajaxContainerSelector).combobox("getValue");
                if (String(tradeKey).isNullOrWhiteSpace()) {
                    $.plugin.showMessage("请选择行业!");
                    return;
                }
                var param = { TradeKey: tradeKey };
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("删除行业成功。");
                    } else {
                        $.plugin.showMessage("删除行业失败。");
                    }
                };
                window.lorelibs.norm.deleteTrade(param, _callback);
            });
            $("#a_update", ajaxContainerSelector).click(function () {
                var tradeKey = $("#selTrade_4", ajaxContainerSelector).combobox("getValue");
                var tradeSourseKey = $("#selTrade_5", ajaxContainerSelector).combobox("getValue");
                if (String(tradeKey).isNullOrWhiteSpace()) {
                    $.plugin.showMessage("请选择行业!");
                    return;
                }
                var param = { TradeKey: tradeKey, TradeSourseKey: tradeSourseKey };
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("更新行业成功。");
                    } else {
                        $.plugin.showMessage("更新行业失败。");
                    }
                };
                window.lorelibs.norm.updateTrade(param, _callback);
            });
        }

        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);