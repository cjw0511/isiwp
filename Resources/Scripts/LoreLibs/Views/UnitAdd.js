/*
==============================================================================
//  单元添加页面 UnitAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.UnitAdd_aspx) { window.lorelibs.UnitAdd_aspx = new Object(); }
    window.lorelibs.UnitAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
//        $("#txtName2", ajaxContainerSelector).validatebox({
//            required: true,
//            //            validType: 'name'
//            validType: ['name', 'insertValidate["单元名称","Services/LoreLibs/NormService.asmx/AjaxValidateUnit","Name"]']
//        });


        $("#selCategory", ajaxContainerSelector).combobox({
            valueField: 'Name',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 52 }
        });
        $("#selCategory", ajaxContainerSelector).combobox("setValue", 'G');

        $("#selGrade", ajaxContainerSelector).combobox({
            valueField: 'Name',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 53 }
        });
        $("#selGrade", ajaxContainerSelector).combobox("setValue", 1);

    };
})(jQuery);