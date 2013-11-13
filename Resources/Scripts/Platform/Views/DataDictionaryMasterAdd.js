/*
==============================================================================
//  添加数据字典类别页面 DataDictionaryMasterAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.DataDictionaryMasterAdd_aspx) { window.platform.DataDictionaryMasterAdd_aspx = new Object(); }
    window.platform.DataDictionaryMasterAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则  
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'insertValidate["数据字典类别名称","Services/Platform/DataDictionaryService.asmx/AjaxValidateMaster","Name"]']
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['code', 'insertValidate["数据字典类别编号","Services/Platform/DataDictionaryService.asmx/AjaxValidateMaster","Code"]']
        });
        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
    };
})(jQuery);