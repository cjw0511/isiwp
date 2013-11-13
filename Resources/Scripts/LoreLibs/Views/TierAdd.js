/*
==============================================================================
//  通用指标层面添加页面 TireAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.TierAdd_aspx) { window.lorelibs.TierAdd_aspx = new Object(); }
    window.lorelibs.TierAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
//            validType: 'name'
            validType: ['name', 'insertValidate["层面名称","Services/LoreLibs/NormService.asmx/AjaxValidateTier","Name"]']
        });

        $("#txtUrl", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        window.lorelibs.norm.getAllTier(function (data) {
            $("#txtParentKey", ajaxContainerSelector).combotree("loadData", data);
            var check = 1;
            var tierNode = $("#TierTree", window.lorelibs.CommonNormManage_aspx.ajaxContainerSelector).tree("getSelected");
            if (tierNode) {
                check = tierNode.id;
            }
            $("#txtParentKey", ajaxContainerSelector).combotree("setValue", check);
        });

    }

})(jQuery);