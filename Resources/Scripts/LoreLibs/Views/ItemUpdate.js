/*
==============================================================================
//  要求项编辑页面 ItemUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.ItemUpdate_aspx) { window.lorelibs.ItemUpdate_aspx = new Object(); }
    window.lorelibs.ItemUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
//        $("#txtName5", ajaxContainerSelector).validatebox({
//            required: true,
//            //            validType: 'name'
//            validType: ['name', 'updateValidate["要求项名称","Services/LoreLibs/NormService.asmx/AjaxValidateItem","Name",' + key + ']']
//        });

        window.lorelibs.norm.getItemByKey(key, function (unit) {
            $(ajaxContainerSelector).form('loadData', unit);
        });
    };
})(jQuery);