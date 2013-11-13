/*
==============================================================================
//  
==============================================================================
*/
(function ($) {
    if (!window) { window.lorelibs = new Object(); }
    if (!window.DevReportShow_aspx) { window.DevReportShow_aspx = new Object(); }
    window.DevReportShow_aspx.initPage = function (ajaxContainerSelector, key, tradekey) {
        $("#testcopy", ajaxContainerSelector).click(
            function () {
                $.plugin.showDialog({
                    title: "复制单元和要求项",
                    href: "Views/LoreLibs/LoreUnitItemCopy.aspx?key=" + key,
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var lorefield = $(dialog).form('getData');
                        $.extend(lorefield, { Key: key });
                        $.extend(lorefield, { TradeKey: tradekey });
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("复制成功。");
                            } else {
                                $.plugin.showMessage("复制失败。");
                            };
                        };
                        window.lorelibs.lorefield.addLoreField(lorefield, _callback);
                    },
                    width: 500,
                    height: 130
                });
            }
        )
    };
})(jQuery);