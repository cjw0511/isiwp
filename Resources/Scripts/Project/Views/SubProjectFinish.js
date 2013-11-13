/*
==============================================================================
//  子项目编辑页面 SubProjectFinish.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectFinish_aspx) { window.project.SubProjectFinish_aspx = new Object(); }
    window.project.SubProjectFinish_aspx.initPage = function (ajaxContainerSelector, key) {
        window.project.subProject.getSubProjectByKey(key, function (subproject) {
            $("subprojectfd", ajaxContainerSelector).form('loadData', subproject);
            $("#txtClosedDetail", ajaxContainerSelector).val(subproject.ClosedDetail);
        });
        var _roleTreeInit = function () {
            $("#Tree", ajaxContainerSelector).tree({
                animate: true,
                onSelect: function (node) {
                    if (node.id == $(this).tree('getRoot').id) {
                        return;
                    }
                    //                    var data = $(this).tree("getData", node.target);
                    window.project.SubProjectFinish_aspx.ShowRoleEmployeeGrid(node.id, key);
                },
                moveMenu: { up: true, upLevel: false, down: true, downLevel: false },
                onBeforeMove: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    if (node.id == $(this).tree('getRoot').id) {
                        return false;
                    }
                }
            });
            _loadRoleTreeData();
        }

        var _loadRoleTreeData = function (callback) {
            window.project.role.getTreeDataOfRole(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                if ($.isFunction(callback)) { callback.call(this); }
            });
        };
        $("#btnSelect", ajaxContainerSelector).click(function () {
            window.project.SubProjectFinish_aspx.SelectRoleEmployee();
        });

        window.project.SubProjectFinish_aspx.ShowRoleEmployeeGrid = function (rolekey, projkey) {
            var employeesdata = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectService.asmx/GetSubProjRoleEmpBySubProjKey", { RoleKey: rolekey, SubProjKey: projkey });
            var employeedata = $.plugin.getJsonDataRequestWebService("Services/Platform/EmployeeService.asmx/GetAllEmployee", null);
            var employees = "";
            for (var i = 0; i < employeesdata.length; i++) {
                var emstr = employeesdata[i].Key;
                for (var j = 0; j < employeedata.length; j++) {
                    if (employeesdata[i].Key == employeedata[j].Key) {
                        emstr = employeedata[i].Name;
                        break;
                    }
                }
                employees += "," + emstr;
            }
            if (employees != "") {
                employees = employees.substring(1);
            }
            var employeeskey = "";
            for (var i = 0; i < employeesdata.length; i++) {
                employeeskey += "," + employeesdata[i].Key;
            }
            if (employeeskey != "") {
                employeeskey = employeeskey.substring(1);
            }
            $("#txtEmployees", ajaxContainerSelector).val(employees);
            $("#hdEmployeesKey", ajaxContainerSelector).val(employeeskey);
        }

        window.project.SubProjectFinish_aspx.SelectRoleEmployee = function () {
            var selected = [];
            var nodes = $("#hdEmployeesKey", ajaxContainerSelector).val().split(",");
            $.each(nodes, function (i, n) {
                selected.push(n);
            });
            var onEnterClick = function (datagrid, selections) {
                var employees = "";
                var employeeskey = "";
                for (var i = 0; i < selections.length; i++) {
                    employees += "," + selections[i].Name;
                    employeeskey += "," + selections[i].Key;
                }
                if (employees != "") {
                    employees = employees.substring(1);
                }
                if (employeeskey != "") {
                    employeeskey = employeeskey.substring(1);
                }
                $("#txtEmployees", ajaxContainerSelector).val(employees);
                $("#hdEmployeesKey", ajaxContainerSelector).val(employeeskey);

            };
            window.project.showSubProjRoleEmpMultipleSelector(onEnterClick, selected);
        }

        window.project.SubProjectFinish_aspx.ModifyRoleEmployee = function (SubProjKey) {
            
        }
        window.project.SubProjectFinish_aspx.DelRoleEmployee = function (SubProjKey) {
            
        }
//        _roleTreeInit();
    };

})(jQuery);
