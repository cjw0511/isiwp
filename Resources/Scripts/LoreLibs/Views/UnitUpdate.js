/*
==============================================================================
//  单元编辑页面 UnitUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.UnitUpdate_aspx) { window.lorelibs.UnitUpdate_aspx = new Object(); }
    window.lorelibs.UnitUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
//        $("#txtName3", ajaxContainerSelector).validatebox({
//            required: true,
//            //            validType: 'name'
//            validType: ['name', 'updateValidate["单元名称","Services/LoreLibs/NormService.asmx/AjaxValidateUnit","Name",' + key + ']']
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
        window.lorelibs.norm.getUnitByKey(key, function (unit) {
            $(ajaxContainerSelector).form('loadData', unit);
        });
    };
})(jQuery);