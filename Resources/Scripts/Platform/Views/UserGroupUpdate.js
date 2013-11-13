/*
==============================================================================
//  用户组编辑页面 UserGroupUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.UserGroupUpdate_aspx) { window.platform.UserGroupUpdate_aspx = new Object(); }

    window.platform.UserGroupUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["用户组名称","Services/Platform/UserGroupService.asmx/AjaxValidate","Name",' + key + ']']
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["用户组编号","Services/Platform/UserGroupService.asmx/AjaxValidate","Code",' + key + ']']
            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            window.platform.usergroup.getUserGroupByKey(key, function (usergroup) {
                $(ajaxContainerSelector).form('loadData', usergroup);
            });
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var usergroup = $(ajaxContainerSelector).form('getData');
                $.extend(usergroup, { Key: key });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改用户组成功。");
                        window.platform.UserGroupManage_aspx.refreshAfterAdd();
                    } else {
                        $.plugin.showMessage("修改用户组失败。");
                    }
                };
                window.platform.usergroup.updateUserGroup(usergroup, _callback);
            });
            $("#btnDelete", ajaxContainerSelector).click(function () {
                var node = $("#Tree", window.platform.UserGroupManage_aspx.ajaxContainerSelector).tree('find', key);
                if (!$("#Tree", window.platform.UserGroupManage_aspx.ajaxContainerSelector).tree('isLeaf', node.target)) {
                    $.plugin.showMessage("提示", node.text + " 有子节点，请先删除!");
                    return;
                }
                $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除用户组成功。");
                                window.platform.UserGroupManage_aspx.refreshAfterDelete();
                            } else {
                                $.plugin.showMessage("删除用户组失败。");
                            }
                        };
                        window.platform.usergroup.deleteUserGroup(key, _callback);
                    }
                });
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);