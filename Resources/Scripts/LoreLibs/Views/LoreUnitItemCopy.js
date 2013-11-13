/*
==============================================================================
//  单元要求项复制页面 LoreUnitItemCopy.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreUnitItemCopy_aspx) { window.lorelibs.LoreUnitItemCopy_aspx = new Object(); }
    window.lorelibs.LoreUnitItemCopy_aspx.initPage = function (ajaxContainerSelector, key) {
        window.lorelibs.norm.getLevelTier(key, function (data) {
            $("#selSourceKey", ajaxContainerSelector).combotree("loadData", data);
        });
    };
})(jQuery);