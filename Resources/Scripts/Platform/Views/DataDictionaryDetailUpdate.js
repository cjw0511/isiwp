/*
==============================================================================
//  编辑数据字典页面 DataDictionaryDetailUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.DataDictionaryDetailUpdate_aspx) { window.platform.DataDictionaryDetailUpdate_aspx = new Object(); }
    window.platform.DataDictionaryDetailUpdate_aspx.initPage = function (ajaxContainerSelector, id) {
        ///定义验证规则
        window.platform.DataDictionaryDetailUpdate_aspx.isFrozen = false;
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
//            validType: 'unnormal'
//            validType: ['name', 'updateValidate["数据字典条目名称","Services/Platform/DataDictionaryService.asmx/AjaxValidateDetail","Name",' + id + ']']
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            validType: 'code'
//            validType: ['code', 'updateValidate["数据字典条目编号","Services/Platform/DataDictionaryService.asmx/AjaxValidateDetail","Code",' + id + ']']
        });
        $("#selMainKey", ajaxContainerSelector).combobox({
            required: true,
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/LoadMasterComboBoxData"),
            panelHeight: 300
        });
        window.platform.datadictionary.getDetailDataById(id, function (datadictionary) {
            $(ajaxContainerSelector).form('loadData', datadictionary);
            window.platform.DataDictionaryDetailUpdate_aspx.isFrozen = datadictionary.IsFrozen;
        });
    };
})(jQuery);