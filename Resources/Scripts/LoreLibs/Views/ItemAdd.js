/*
==============================================================================
//  要求项添加页面 ItemAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.ItemAdd_aspx) { window.lorelibs.ItemAdd_aspx = new Object(); }
    window.lorelibs.ItemAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
//        $("#txtName4", ajaxContainerSelector).validatebox({
//            required: true,
//            //            validType: 'name'
//            validType: ['name', 'insertValidate["要求项名称","Services/LoreLibs/NormService.asmx/AjaxValidateItem","Name"]']
//        });

    };
})(jQuery);