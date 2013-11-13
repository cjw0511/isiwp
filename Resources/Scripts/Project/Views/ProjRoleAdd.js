/*
==============================================================================
//  项目角色添加页面 ProjRoleAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.ProjRoleAdd_aspx) { window.project.ProjRoleAdd_aspx = new Object(); }
    window.project.ProjRoleAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {

            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["角色名称","Services/Project/RoleService.asmx/ajaxAddValid","Name"]']
            });

            $("#txtCode", ajaxContainerSelector).validatebox({
                required:true,
                validType: ['code', 'insertValidate["角色编号","Services/Project/RoleService.asmx/ajaxAddValid","Code"]']
            });
            $("#PowerTree", ajaxContainerSelector).tree({
                animate: true
            });
            window.project.role.getTreeDataOfPower(function (data) {
                $("#PowerTree", ajaxContainerSelector).tree("loadData", data);
            });
        };

        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var role = $(ajaxContainerSelector).form('getData');
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("添加角色成功。");
                        window.project.RolePowerManage_aspx.refreshAfterAdd();
                        $(ajaxContainerSelector).form("clear");
                    } else {
                        $.plugin.showMessage("添加角色失败。");
                    }
                };
                window.project.role.addProjRole(role, _callback);
            });
        };
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);


