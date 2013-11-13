/*
==============================================================================
//  角色添加页面 RoleAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.RoleAdd_aspx) { window.platform.RoleAdd_aspx = new Object(); }
    window.platform.RoleAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'insertValidate["角色名称","Services/Platform/RoleService.asmx/AjaxValidate","Name"]']
        });
        $("#txtShortName", ajaxContainerSelector).validatebox({
            validType: 'name'
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['code', 'insertValidate["角色编号","Services/Platform/RoleService.asmx/AjaxValidate","Code"]']
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
    };
})(jQuery);