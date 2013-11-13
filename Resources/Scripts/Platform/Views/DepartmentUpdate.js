/*
==============================================================================
//  部门编辑页面 DepartmentUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.DepartmentUpdate_aspx) { window.platform.DepartmentUpdate_aspx = new Object(); }

    window.platform.DepartmentUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        window.platform.DepartmentUpdate_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["部门名称","Services/Platform/DepartmentService.asmx/AjaxValidate","Name",' + key + ']']
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["部门编号","Services/Platform/DepartmentService.asmx/AjaxValidate","Code",' + key + ']']
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

            window.platform.department.getDepartmentByKey(key, function (department) {
                window.platform.department.getTreeDataOfDepartmentByPartition({ partitionKey: department.OrganKey }, function (data) {
                    $("#selDepartment", ajaxContainerSelector).combotree("loadData", data);
                });
                $(ajaxContainerSelector).form('loadData', department);
                window.platform.employee.getEmployeeByKey(department.LinkManKey, function (emp) {
                    $("#txtLinkMan", ajaxContainerSelector).searchbox("setValue", emp.Name);
                    $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
                });
                window.platform.employee.getEmployeeByKey(department.HeadEmpKey, function (emp) {
                    $("#txtHeadEmp", ajaxContainerSelector).searchbox("setValue", emp.Name);
                    $("#txtHeadEmp", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
                });
            });
        };
        var _bindButtonEvent = function () {
            $("#setRange", ajaxContainerSelector).click(function () {
                $.plugin.showDialog({
                    title: "设置职能范围",
                    href: "Views/Platform/FunctionRangeSetting.aspx?key=" + key,
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        var nodes = dialog.find("#Tree").tree('getChecked');
                        var keys = '';
                        for (var i = 0; i < nodes.length; i++) {
                            if (keys != '') keys += ',';
                            keys += nodes[i].id;
                        }
                        var param = {
                            Key: key,
                            MappingKey: keys
                        };
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("职能范围设置成功。");
                            } else {
                                $.plugin.showMessage("职能范围设置失败。");
                            }
                        };
                        window.platform.department.setFunctionRange(param, _callback);
                    },
                    width: 800,
                    height: 500
                });
            });
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var department = $(ajaxContainerSelector).form('getData');
                $.extend(department, { Key: key });
                if (key == department.ParentKey) {
                    $.plugin.showMessage("父级部门不能为当前操作部门。");
                    return;
                }
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改部门成功");
                        window.platform.DepartmentManage_aspx.refreshAfterAdd();
                    } else {
                        $.plugin.showMessage("修改部门失败");
                    }
                };
                window.platform.department.updateDepartment(department, _callback);
            });

            $("#btnDelete", ajaxContainerSelector).click(function () {
                var node = $("#Tree", window.platform.DepartmentManage_aspx.ajaxContainerSelector).tree('find', key);
                if (!$("#Tree", window.platform.DepartmentManage_aspx.ajaxContainerSelector).tree('isLeaf', node.target)) {
                    $.plugin.messager.alert("提示", node.text + " 有子节点，请先删除!", "warning");
                    return;
                }
                $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除部门成功");
                                window.platform.DepartmentManage_aspx.refreshAfterDelete();
                            } else {
                                $.plugin.showMessage("删除部门失败");
                            }
                        };
                        window.platform.department.deleteDepartment(key, _callback);
                    }
                });
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