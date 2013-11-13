/*
==============================================================================
//  用户添加页面 UserAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.UserAdd_aspx) { window.platform.UserAdd_aspx = new Object(); }
    window.platform.UserAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtUserCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["编号","Services/Platform/UserService.asmx/AjaxValidate","Code"]']
            });
            $("#txtLoginCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["登录名","Services/Platform/UserService.asmx/AjaxValidate","LoginCode"]']
            });
            $("#txtUserName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["用户名称","Services/Platform/UserService.asmx/AjaxValidate","Name"]']
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
            $("#txtUserGroup", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

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
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);