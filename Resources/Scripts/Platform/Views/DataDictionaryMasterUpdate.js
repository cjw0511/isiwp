/*
==============================================================================
//  编辑数据字典类别页面 DataDictionaryMasterUpdate.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.DataDictionaryMasterUpdate_aspx) { window.platform.DataDictionaryMasterUpdate_aspx = new Object(); }
    window.platform.DataDictionaryMasterUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        window.platform.DataDictionaryMasterUpdate_aspx.isFrozen = false;
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'updateValidate["数据字典类别名称","Services/Platform/DataDictionaryService.asmx/AjaxValidateMaster","Name",' + key + ']']
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['code', 'updateValidate["数据字典类别编号","Services/Platform/DataDictionaryService.asmx/AjaxValidateMaster","Code",' + key + ']']
        });
        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.platform.datadictionary.getMasterDataByKey(key, function (datadictionary) {
            $(ajaxContainerSelector).form('loadData', datadictionary);
            window.platform.DataDictionaryMasterUpdate_aspx.isFrozen = datadictionary.IsFrozen;
        });
    };
})(jQuery);