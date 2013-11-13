/*
==============================================================================
//  登录安全策略编辑页面 LogonConfigUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.LogonConfigUpdate_aspx) { window.platform.LogonConfigUpdate_aspx = new Object(); }
    window.platform.LogonConfigUpdate_aspx.initPage = function (ajaxContainerSelector, id) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'ajaxUpdateValid["安全策略名称","Services/Platform/LogonConfigService.asmx/ajaxUpdateValid","Name",' + id + ']']
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['code', 'ajaxUpdateValid["安全策略编号","Services/Platform/LogonConfigService.asmx/ajaxUpdateValid","Code",' + id + ']']
        });
        $("#txtKey", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'code'
        });
        $("#txtValue", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'code'
        });
        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.platform.logonConfig.getLogonConfigByID(id, function (logonconfig) {
            $("#txtName", ajaxContainerSelector).val(logonconfig.Name);
            $("#txtCode", ajaxContainerSelector).val(logonconfig.Code);
            $("#txtKey", ajaxContainerSelector).val(logonconfig.Key);
            $("#txtValue", ajaxContainerSelector).val(logonconfig.Value);
            $("#txtDescription", ajaxContainerSelector).val(logonconfig.Description);
            $("#txtSummary", ajaxContainerSelector).val(logonconfig.Summary);
        });
    };
})(jQuery);