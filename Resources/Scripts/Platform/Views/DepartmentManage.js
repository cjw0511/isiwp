/*
==============================================================================
//  部门档案管理信息页面 DepartmentManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.DepartmentManage_aspx) { window.platform.DepartmentManage_aspx = new Object(); }
    window.platform.DepartmentManage_aspx.initPage = function (ajaxContainerSelector) {
        window.platform.DepartmentManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {
            $("#Tree", ajaxContainerSelector).tree({
                autoToggle: false,
                animate: true,
                onSelect: function (node) {
                    if (node.id == $(this).tree('getRoot').id) {
                        $(this).tree("toggle", node.target);
                        return;
                    }
                    var url = 'Views/Platform/DepartmentUpdate.aspx?key=' + node.id;
                    $("#Tab", ajaxContainerSelector).tabs('enableTab', '修改部门');
                    $("#Tab", ajaxContainerSelector).tabs('select', '修改部门');
                    $("#Tab", ajaxContainerSelector).tabs('getTab', '修改部门').panel("refresh", url);
                },
                moveMenu: true,
                onBeforeMove: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    if (node.id == $(this).tree('getRoot').id) {
                        return false;
                    }
                },
                onDrop: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    _move(node.id, source.id, point);
                }
            });
            $("#selPartition", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/PartitionService.asmx/LoadComboBoxData"),
                onChange: function (newValue, oldValue) {
                    if (oldValue == '')
                        return;
                    _loadData();
                }
            });
            window.platform.getCurrentUser(function (user) {
                window.platform.department.getDepartmentByKey(user.DepartmentKey, function (department) {
                    $("#selPartition", ajaxContainerSelector).combobox("setValue", department.OrganKey);
                    //装载部门树
                    _loadData();
                });
            });
        };

        var _bindButtonEvent = function () {
            $("#a_add", ajaxContainerSelector).click(_add);
            $("#a_del", ajaxContainerSelector).click(function () {
                var node = $("#Tree", ajaxContainerSelector).tree('getSelected');
                _del(node);
            });
            $("#a_refresh", ajaxContainerSelector).click(_loadData);

        };
        var _loadData = function () {
            var va = $("#selPartition", ajaxContainerSelector).combobox("getValue");
            if (va == '') { return; }
            window.platform.department.getTreeDataOfDepartmentByPartition({ partitionKey: va }, function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
            });
        };
        ///添加部门
        var _add = function () {
            $("#Tab", ajaxContainerSelector).tabs('select', '添加部门');
            var tg = $("#Tree", ajaxContainerSelector).tree('getSelected');
            $("#Tab", ajaxContainerSelector).tabs('getTab', '添加部门').panel("refresh", "Views/Platform/DepartmentAdd.aspx?key=" + tg.id);
        }
        ///删除部门
        var _del = function (node) {
            if (!node || node.id == $("#Tree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除部门成功。");
                            window.platform.DepartmentManage_aspx.refreshAfterDelete();
                        } else {
                            $.plugin.showMessage("删除部门失败。");
                        }
                    };
                    window.platform.department.deleteDepartment(node.id, _callback);
                }
            });
        }
        ///移动机构
        var _move = function (targetId, sourseId, point) {
            var obj = {
                Target: targetId,
                Sourse: sourseId,
                Point: point
            };
            window.platform.department.moveNode(obj);
        }
        _bindControl();
        _bindButtonEvent();

        window.platform.DepartmentManage_aspx.refreshAfterAdd = function () {
            var oldnode = $("#Tree", ajaxContainerSelector).tree('getSelected');
            var va = $("#selPartition", ajaxContainerSelector).combobox("getValue");
            if (va != '') {
                window.platform.department.getTreeDataOfDepartmentByPartition({ partitionKey: va }, function (data) {
                    $("#Tree", ajaxContainerSelector).tree("loadData", data);
                    if (oldnode) {
                        var node = $("#Tree", ajaxContainerSelector).tree('find', oldnode.id);
                        $("#Tree", ajaxContainerSelector).tree('select', node.target);
                    }
                });
            };
        }

        window.platform.DepartmentManage_aspx.refreshAfterDelete = function () {
            var va = $("#selPartition", ajaxContainerSelector).combobox("getValue");
            if (va != '') {
                window.platform.department.getTreeDataOfDepartmentByPartition({ partitionKey: va }, function (data) {
                    $("#Tree", ajaxContainerSelector).tree("loadData", data);
                });
            };
            $("#Tab", ajaxContainerSelector).tabs('select', '添加部门');
            $("#Tab", ajaxContainerSelector).tabs('disableTab', '修改部门');
        }
    };
})(jQuery);
