/*
==============================================================================
//  用户组添加页面 UserGroupAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.UserGroupAdd_aspx) { window.platform.UserGroupAdd_aspx = new Object(); }

    window.platform.UserGroupAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["用户组名称","Services/Platform/UserGroupService.asmx/AjaxValidate","Name"]']
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["用户组编号","Services/Platform/UserGroupService.asmx/AjaxValidate","Code"]']
            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var usergroup = $(ajaxContainerSelector).form('getData');
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("添加用户组成功。");
                        window.platform.UserGroupManage_aspx.refreshAfterAdd();
                        $(ajaxContainerSelector).form("clear");
                    } else {
                        $.plugin.showMessage("添加用户组失败。");
                    }
                };
                window.platform.usergroup.addUserGroup(usergroup, _callback);
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);