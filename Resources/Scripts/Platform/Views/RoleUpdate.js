/*
==============================================================================
//  角色编辑页面 RoleUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.RoleUpdate_aspx) { window.platform.RoleUpdate_aspx = new Object(); }
    window.platform.RoleUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'updateValidate["角色名称","Services/Platform/RoleService.asmx/AjaxValidate","Name",' + key + ']']
        });
        $("#txtShortName", ajaxContainerSelector).validatebox({
            validType: 'name'
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['code', 'updateValidate["角色编号","Services/Platform/RoleService.asmx/AjaxValidate","Code",' + key + ']']
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.platform.role.getRoleByKey(key, function (role) {
            $(ajaxContainerSelector).form('loadData', role);
        });
    };
})(jQuery);