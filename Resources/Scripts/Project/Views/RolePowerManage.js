/*
==============================================================================
//  项目角色管理页面 RolePowerManage.aspx 的页面控制层代码。
==============================================================================
//*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.RolePowerManage_aspx) { window.project.RolePowerManage_aspx = new Object(); }
    window.project.RolePowerManage_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        window.project.RolePowerManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {
            $("#Tree", ajaxContainerSelector).tree({
                animate: true,
                onSelect: function (node) {
                    
                    // 定义编辑验证规则
                    $("#txtName", ajaxContainerSelector).validatebox({
                        required: true,
                        validType: ['name', 'updateValidate["角色名称","Services/Project/RoleService.asmx/ajaxAddValid","Name",' +node.id+ ']']
                    });

                    $("#txtCode", ajaxContainerSelector).validatebox({
                        required:true,
                        validType: ['code', 'updateValidate["角色编号","Services/Project/RoleService.asmx/ajaxAddValid","Code",' +node.id + ']']
                    });

                    $("#txtRemark", ajaxContainerSelector).validatebox({
                        validType: 'unnormal'
                    });

                    if (node.id == $(this).tree('getRoot').id) {
                        return;
                    }
                    window.project.role.getProjRoleByKey(node.id, function (role) {
                        $(ajaxContainerSelector).form('loadData', role);
                        // 显示权限设置
                        $("#PowerTree", ajaxContainerSelector).tree({
                            checkbox: true,
                            cascadeCheck: false,
                            toggleMenu: false,
                            onCheck: function (node) {
                                if (node.id == 0) {
                                    $(this).tree('uncheck', node.target);
                                }
                            }
                        });
                        window.project.role.getTreeDataOfPower(function (data) {
                            $("#PowerTree", ajaxContainerSelector).tree("loadData", data);
                            var param = {
                                RoleKey: node.id
                            };
                            window.project.role.getRolePowers(param, function (keys) {
                                if (!keys.isNullOrWhiteSpace()) {
                                    var nodes = keys.split(",");
                                    $.each(nodes, function (i, n) {
                                        var node = $("#PowerTree", ajaxContainerSelector).tree('find', n);
                                        $("#PowerTree", ajaxContainerSelector).tree("check", node.target);
                                    });
                                }
                            });
                        });
                    });
                },
                toggleMenu: false,
                nodeContextMenus: [
                        { text: "添加", iconCls: "icon-create", handler: _add },
                        { text: function (e, tree, node) { return "删除 " + node.text; }, iconCls: "icon-no", handler: function (e, tree, node) { _del(node); } },
                        { text: "刷新", iconCls: "icon-refresh", handler: _loadData }
                    ],
                onDrop: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    _moveRole(node.id, source.id);
                },
                onBeforeMove: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    if (node.id == $(this).tree('getRoot').id) {
                        return false;
                    }
                }
            });
            _loadData();
        };

        // 定义编辑验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'insertValidate["角色名称","Services/Project/RoleService.asmx/ajaxAddValid","Name"]']
        });

        $("#txtCode", ajaxContainerSelector).validatebox({
            required:true,
            validType: ['code', 'insertValidate["角色编号","Services/Project/RoleService.asmx/ajaxAddValid","Code"]']

        });

        $("#txtRemark", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        var _bindButtonEvent = function () {
            $("#a_add", ajaxContainerSelector).click(_add);
            $("#a_del", ajaxContainerSelector).click(function () {
                var node = $("#Tree", ajaxContainerSelector).tree('getSelected');
                _del(node);
            });
            $("#a_refresh", ajaxContainerSelector).click(_loadData);

            //修改角色保存按钮
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var role = $(ajaxContainerSelector).form('getData');
                var row = $("#Tree", ajaxContainerSelector).tree("getSelected");
                $.extend(role, { Key: row.id });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改角色成功。");
                        window.project.RolePowerManage_aspx.refreshAfterAdd();
                    } else {
                        $.plugin.showMessage("修改角色失败。");
                    }
                };
                window.project.role.updateProjRole(role, _callback);
            });
            // 修改角色刷新按钮
            $("#btnRefresh", ajaxContainerSelector).click(function () {
                var row = $("#Tree", ajaxContainerSelector).tree("getSelected");
                window.project.role.getProjRoleByKey(row.id, function (role) {
                    $(ajaxContainerSelector).form('loadData', role);
                    // 显示权限设置
                    $("#PowerTree", ajaxContainerSelector).tree({
                        checkbox: true,
                        cascadeCheck: false,
                        toggleMenu: false,
                        onCheck: function (node) {
                            if (node.id == 0) {
                                $(this).tree('uncheck', node.target);
                            }
                        }
                    });
                    window.project.role.getTreeDataOfPower(function (data) {
                        $("#PowerTree", ajaxContainerSelector).tree("loadData", data);
                        var param = {
                            RoleKey: row.id
                        };
                        window.project.role.getRolePowers(param, function (keys) {
                            if (!keys.isNullOrWhiteSpace()) {
                                var nodes = keys.split(",");
                                $.each(nodes, function (i, n) {
                                    var node = $("#PowerTree", ajaxContainerSelector).tree('find', n);
                                    $("#PowerTree", ajaxContainerSelector).tree("check", node.target);
                                });
                            }
                        });
                    });
                });
            });

            //修改角色删除按钮
            $("#btnDelete", ajaxContainerSelector).click(function () {
                var row = $("#Tree", ajaxContainerSelector).tree("getSelected");
                var node = $("#Tree", window.project.RolePowerManage_aspx.ajaxContainerSelector).tree('find', row.id);
                if (!$("#Tree", window.project.RolePowerManage_aspx.ajaxContainerSelector).tree('isLeaf', node.target)) {
                    $.plugin.messager.alert("提示", node.text + " 有子节点，请先删除!", "warning");
                    return;
                }
                $.plugin.messager.confirm("提示", "点击确定将删除<b> " + node.text + "</b><br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除角色成功。");
                                window.project.RolePowerManage_aspx.refreshAfterDelete();
                            } else {
                                $.plugin.showMessage("删除角色失败。");
                            }
                        };
                        window.project.role.deleteProjRole(row.id, _callback);
                    }
                });
            });

            // 设置角色权限
            $("#setPower", ajaxContainerSelector).click(function () {
                var nodes = $("#PowerTree").tree("getChecked");
                var row = $("#Tree", ajaxContainerSelector).tree("getSelected");
                var keys = '';
                for (var i = 0; i < nodes.length; i++) {
                    if (keys != '') keys += ',';
                    keys += nodes[i].id;
                }
                var param = {
                    RoleKey: row.id,
                    PowerKeys: keys
                };
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("角色权限设置成功。");
                    } else {
                        $.plugin.showMessage("角色权限设置失败。");
                    }
                };
                window.project.role.setRolePowers(param, _callback);
            });

        };
        var _loadData = function (callback) {
            window.project.role.getTreeDataOfRole(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                if ($.isFunction(callback)) { callback.call(this); }
            });
        }
        // 添加角色
        var _add = function () {
            // $("#Tab", ajaxContainerSelector).tabs('select', '添加角色');
            $.plugin.showDialog({
                title: "添加角色",
                href: "Views/Project/ProjRoleAdd.aspx",
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var role = $(dialog).form('getData');
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("添加角色成功。");
                            var oldnode = $("#Tree", ajaxContainerSelector).tree('getSelected');
                            _loadData(function () {
                                if (oldnode) {
                                    var node = $("#Tree", ajaxContainerSelector).tree('find', oldnode.id);
                                    $("#Tree", ajaxContainerSelector).tree('select', node.target);
                                }
                            });
                        } else {
                            $.plugin.showMessage("添加角色失败。");
                        }
                    };
                    window.project.role.addProjRole(role, _callback);
                },
                width: 900,
                height: 350
            });
        }
        ///删除角色
        var _del = function (node) {
            if (!node || node.id == $("#Tree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            $.plugin.messager.confirm("提示", "点击确定将删除<b> " + node.text + "</b><br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除角色成功。");
                            window.project.RolePowerManage_aspx.refreshAfterDelete();
                        } else {
                            $.plugin.showMessage("删除角色失败。");
                        }
                    };
                    window.project.role.deleteProjRole(node.id, _callback);
                }
            });
        }

        _bindControl();
        _bindButtonEvent();

        window.project.RolePowerManage_aspx.refreshAfterAdd = function () {
            var oldnode = $("#Tree", ajaxContainerSelector).tree('getSelected');
            window.project.role.getTreeDataOfRole(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                if (oldnode) {
                    var node = $("#Tree", ajaxContainerSelector).tree('find', oldnode.id);
                    $("#Tree", ajaxContainerSelector).tree('select', node.target);
                }
            });
        }

        window.project.RolePowerManage_aspx.refreshAfterDelete = function () {
            window.project.role.getTreeDataOfRole(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
            });
            $("#Tab", ajaxContainerSelector).tabs('select', '添加角色');
            $("#Tab", ajaxContainerSelector).tabs('disableTab', '修改角色');
        }
    }

})(jQuery);
