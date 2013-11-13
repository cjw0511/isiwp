/*
==============================================================================
//  登录安全策略添加页面 LogonConfigAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.LogonConfigAdd_aspx) { window.platform.LogonConfigAdd_aspx = new Object(); }
    window.platform.LogonConfigAdd_aspx.initPage = function () {
        ///定义验证规则
        $("#txtName").validatebox({
            required: true,
            validType: ['name', 'ajaxAddValid["安全策略名称","Services/Platform/LogonConfigService.asmx/ajaxAddValid","Name"]']
        });
        $("#txtCode").validatebox({
            required: true,
            validType: ['code', 'ajaxAddValid["安全策略编号","Services/Platform/LogonConfigService.asmx/ajaxAddValid","Code"]']
        });
        $("#txtKey").validatebox({
            required: true,
            validType: 'code'
        });
        $("#txtValue").validatebox({
            required: true,
            validType: 'code'
        });
        $("#txtDescription").validatebox({
            validType: 'unnormal'
        });
        $("#txtSummary").validatebox({
            validType: 'unnormal'
        });
    };
})(jQuery);