/*
==============================================================================
//  通用指标层面编辑页面 TierUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.TierUpdate_aspx) { window.lorelibs.TierUpdate_aspx = new Object(); }
    window.lorelibs.TierUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            //            validType: 'name'
            validType: ['name', 'updateValidate["层面名称","Services/LoreLibs/NormService.asmx/AjaxValidateTier","Name",' + key + ']']
        });

        window.lorelibs.norm.getAllTier(function (data) {
            $("#txtParentKey", ajaxContainerSelector).combotree("loadData", data);
            $("#txtParentKey", ajaxContainerSelector).combotree("setValue", 1);
        });

        window.lorelibs.norm.getTierByKey(key, function (tier) {
            $(ajaxContainerSelector).form('loadData', tier);
        });

    }

})(jQuery);