/*
==============================================================================
//  部门添加页面 DepartmentAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.DepartmentAdd_aspx) { window.platform.DepartmentAdd_aspx = new Object(); }

    window.platform.DepartmentAdd_aspx.initPage = function (ajaxContainerSelector, key) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["部门名称","Services/Platform/DepartmentService.asmx/AjaxValidate","Name"]']
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["部门编号","Services/Platform/DepartmentService.asmx/AjaxValidate","Code"]']
            });
            $("#txtRemark", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            ///选择联系人
            $("#txtLinkMan", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#LinkManKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#LinkManKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtLinkMan", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
            ///选择负责人
            $("#txtHeadEmp", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#HeadEmpKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#HeadEmpKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtHeadEmp", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtHeadEmp", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtHeadEmp", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtHeadEmp", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
            ///选择机构
            $("#selPartition", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/PartitionService.asmx/LoadComboBoxData"),
                onChange: function (newValue, oldValue) {
                    window.platform.department.getTreeDataOfDepartmentByPartition({ partitionKey: newValue }, function (data) {
                        $("#selDepartment", ajaxContainerSelector).combotree("loadData", data);
                        $("#selDepartment", ajaxContainerSelector).combotree("setValue", '');
                    });
                }
            });
            ///设置默认为当前用户所在机构及部门
            window.platform.getCurrentUser(function (user) {
                window.platform.department.getDepartmentByKey(user.DepartmentKey, function (department) {
                    $("#selPartition", ajaxContainerSelector).combobox("setValue", department.OrganKey);
                    var va = $("#selPartition", ajaxContainerSelector).combobox("getValue");
                    window.platform.department.getTreeDataOfDepartmentByPartition({ partitionKey: va }, function (data) {
                        $("#selDepartment", ajaxContainerSelector).combotree("loadData", data);
                        if (key != "") {
                            window.platform.department.getDepartmentByKey(key, function (department) {
                                $("#selDepartment", ajaxContainerSelector).combotree("setValue", department.ParentKey);
                            });
                        }
                    });
                });
            });
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var department = $(ajaxContainerSelector).form('getData');
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("添加部门成功。");
                        window.platform.DepartmentManage_aspx.refreshAfterAdd();
                        $(ajaxContainerSelector).form("clear");
                    } else {
                        $.plugin.showMessage("添加部门失败。");
                    }
                };
                window.platform.department.addDepartment(department, _callback);
            });
            $("#clear_LinkMan", ajaxContainerSelector).click(function () {
                $("#txtLinkMan", ajaxContainerSelector).searchbox('setValue', '');
                $("#LinkManKey", ajaxContainerSelector).val('');
            });
            $("#clear_HeadEmp", ajaxContainerSelector).click(function () {
                $("#txtHeadEmp", ajaxContainerSelector).searchbox('setValue', '');
                $("#HeadEmpKey", ajaxContainerSelector).val('');
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);