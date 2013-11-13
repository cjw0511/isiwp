/*
==============================================================================
//  用户编辑页面 UserUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.UserUpdate_aspx) { window.platform.UserUpdate_aspx = new Object(); }
    window.platform.UserUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtUserCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["编号","Services/Platform/UserService.asmx/AjaxValidate","Code",' + key + ']']
            });
            $("#txtLoginCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["登录名","Services/Platform/UserService.asmx/AjaxValidate","LoginCode",' + key + ']']
            });
            $("#txtUserName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["用户名称","Services/Platform/UserService.asmx/AjaxValidate","Name",' + key + ']']
            });
            $("#txtUserGroup", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#UserGroupKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#UserGroupKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtUserGroup", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserGroupSelector(onEnterClick, selected);
                }
            });
            $("#txtUserGroup", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtUserGroup", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtRole", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#RoleKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#RoleKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtRole", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showRoleSelector(onEnterClick, selected);
                }
            });
            $("#txtRole", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtRole", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtDepartment", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#DepartmentKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#DepartmentKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtDepartment", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showDepartmentSelector(onEnterClick, selected);
                }
            });
            $("#txtDepartment", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtDepartment", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            ////绑定数据信息
            window.platform.user.getUserByKey(key, function (user) {
                $(ajaxContainerSelector).form('loadData', user);
                window.platform.usergroup.getUserGroupByKey(user.UserGroupKey, function (emp) {
                    $("#txtUserGroup", ajaxContainerSelector).searchbox("setValue", emp.Name);
                    $("#txtUserGroup", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
                });
                window.platform.role.getRoleByKey(user.RoleKey, function (emp) {
                    $("#txtRole", ajaxContainerSelector).searchbox("setValue", emp.Name);
                    $("#txtRole", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
                });
                window.platform.department.getDepartmentByKey(user.DepartmentKey, function (emp) {
                    $("#txtDepartment", ajaxContainerSelector).searchbox("setValue", emp.Name);
                    $("#txtDepartment", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
                });
                if (user.IsLocked) {
                    $("#spnLockDate", ajaxContainerSelector).text(user.LockDate.toDate().format());
                    window.platform.user.getUserByKey(user.LockUser, function (lockuser) {
                        $("#spnLockUser", ajaxContainerSelector).text(lockuser.Name);
                    });
                }
                else {
                    $("#spnLockDate", ajaxContainerSelector).text('');
                    $("#spnLockUser", ajaxContainerSelector).text('');
                }
            });
        };
        var _bindButtonEvent = function () {
            $("#clear_UserGroup", ajaxContainerSelector).click(function () {
                $("#txtUserGroup", ajaxContainerSelector).searchbox('setValue', '');
                $("#UserGroupKey", ajaxContainerSelector).val('');
            });
            $("#clear_Role", ajaxContainerSelector).click(function () {
                $("#txtRole", ajaxContainerSelector).searchbox('setValue', '');
                $("#RoleKey", ajaxContainerSelector).val('');
            });
            $("#clear_Department", ajaxContainerSelector).click(function () {
                $("#txtDepartment", ajaxContainerSelector).searchbox('setValue', '');
                $("#DepartmentKey", ajaxContainerSelector).val('');
            });
        }
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);