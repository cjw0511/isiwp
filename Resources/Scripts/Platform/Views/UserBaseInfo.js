/*
==============================================================================
//  用户基本信息页面 UserBasicInfo.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.UserBaseInfo_aspx) { window.platform.UserBaseInfo_aspx = new Object(); }

    window.platform.UserBaseInfo_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            window.platform.getCurrentUser(function (user) {
                $("#txtUserCode", ajaxContainerSelector).validatebox({
                    required: true,
                    validType: ['code', 'updateValidate["编号","Services/Platform/UserService.asmx/AjaxValidate","Code",' + user.Key + ']']
                });
                $("#txtLoginCode", ajaxContainerSelector).validatebox({
                    validType: ['name', 'updateValidate["登录名","Services/Platform/UserService.asmx/AjaxValidate","LoginCode",' + user.Key + ']']
                });
                $("#txtUserName", ajaxContainerSelector).validatebox({
                    required: true,
                    validType: ['name', 'updateValidate["用户名称","Services/Platform/UserService.asmx/AjaxValidate","Name",' + user.Key + ']']
                });

                ///选择用户组 
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
                $("#txtUserGroup", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

                ///选择角色
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
                $("#txtRole", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

                ///选择部门
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
                $("#txtDepartment", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

                $(ajaxContainerSelector).form('loadData', user);
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

            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                window.platform.getCurrentUserKey(function (userKey) {
                    var user = $(ajaxContainerSelector).form('getData');
                    $.extend(user, { Key: userKey });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改用户基本信息成功。");
                        } else {
                            $.plugin.showMessage("修改用户基本信息失败。");
                        }
                    };
                    window.platform.user.updateUser(user, _callback);
                });
            });

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
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);
