/*
==============================================================================
//  添加数据字典页面 DataDictionaryDetailAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.DataDictionaryDetailAdd_aspx) { window.platform.DataDictionaryDetailAdd_aspx = new Object(); }
    window.platform.DataDictionaryDetailAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则  
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
//            validType: 'unnormal'
//            validType: ['name', 'insertValidate["数据字典条目名称","Services/Platform/DataDictionaryService.asmx/AjaxValidateDetail","Name"]']
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            validType: 'code'
//            validType: ['code', 'insertValidate["数据字典条目编号","Services/Platform/DataDictionaryService.asmx/AjaxValidateDetail","Code"]']
        });
        $("#selMainKey", ajaxContainerSelector).combobox({
            required: true,
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/LoadMasterComboBoxData"),
            panelHeight: 300,
            onLoadSuccess: function () {
                var _node = $("#Tree", window.platform.DataDictionarySetting_aspx.ajaxContainerSelector).tree('getSelected');
                if (_node && _node.id != 0) {
                    $(this).combobox("setValue", _node.id);
                }
            }
        });
    };
})(jQuery);