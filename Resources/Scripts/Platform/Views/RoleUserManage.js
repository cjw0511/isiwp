/*
==============================================================================
//  角色与用户管理信息页面 RoleUserManage.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.RoleUserManage_aspx) { window.platform.RoleUserManage_aspx = new Object(); }
    window.platform.RoleUserManage_aspx.initPage = function (ajaxContainerSelector) {
        ///////////////////////////////////////////////////////////////////
        var _roleTreeInit = function () {
            $("#Tree", ajaxContainerSelector).tree({
                animate: true,
                onSelect: function (node) {
                    var param = {
                        name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); },
                        RoleKey: function () {
                            if (node.id == $("#Tree", ajaxContainerSelector).tree('getRoot').id) {
                                return '-1';
                            }
                            return node.id;
                        }
                    };
                    $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                    $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                    $("#Grid", ajaxContainerSelector).datagrid('load', param);
                },
                moveMenu: { up: true, upLevel: false, down: true, downLevel: false },
                nodeContextMenus: [
                        { text: "添加", iconCls: "icon-create", handler: _addRole },
                        { text: function (e, tree, node) { return "编辑 " + node.text; }, iconCls: "icon-edit", handler: function (e, tree, node) { _editRole(node); } },
                        { text: function (e, tree, node) { return "删除 " + node.text; }, iconCls: "icon-no", handler: function (e, tree, node) { _delRole(node); } },
                        { text: "刷新", iconCls: "icon-refresh", handler: _loadRoleTreeData }
                    ],
                onDrop: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    _moveRole(node.id, source.id);
                }
            });
            _loadRoleTreeData();
        }
        var departmentdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DepartmentService.asmx/LoadTreeData");
        var _departmentFormatter = function (value) {
            for (var i = 0; i < departmentdata.length; i++) {
                if (departmentdata[i].Key == value) return departmentdata[i].Name;
            }
            return "";
        }
        var roledata = $.plugin.getJsonDataRequestWebService("Services/Platform/RoleService.asmx/LoadTreeData");
        var _roleFormatter = function (value) {
            for (var i = 0; i < roledata.length; i++) {
                if (roledata[i].Key == value) return roledata[i].Name;
            }
            return "";
        }
        var usergroupdata = $.plugin.getJsonDataRequestWebService("Services/Platform/UserGroupService.asmx/LoadTreeData");
        var _usergroupFormatter = function (value) {
            for (var i = 0; i < usergroupdata.length; i++) {
                if (usergroupdata[i].Key == value) return usergroupdata[i].Name;
            }
            return "";
        }
        var _userGridInit = function () {
            var options = {
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                fit: true,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Platform/UserService.asmx/LoadGridDataOfRole'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); },
                    RoleKey: -1
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '名称', width: 100, sortable: true },
                { field: 'Code', title: '编码', width: 100, sortable: true },
				{ field: 'LoginCode', title: '登录编号', width: 100, sortable: true}]],
                columns: [[
				{ field: 'DepartmentKey', title: '所属部门', width: 120, sortable: true, formatter: _departmentFormatter },
				{ field: 'RoleKey', title: '所属角色', width: 120, sortable: true, formatter: _roleFormatter },
				{ field: 'UserGroupKey', title: '用户组', width: 120, sortable: true, formatter: _usergroupFormatter },
                { field: 'IsValid', title: '是否有效', width: 70, sortable: true, formatter: function (value, rowData, rowIndex) { if (value == true) return '是'; else if (value == false) return '否' } },
                { field: 'IsLocked', title: '是否锁定', width: 70, sortable: true, formatter: function (value, rowData, rowIndex) { if (value == true) return '是'; else if (value == false) return '否' } },
                { field: 'opt', title: '操作', width: 90, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var resetbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-key" }).attr("title", "重置密码").attr("onclick", 'javascript:window.platform.RoleUserManage_aspx.resetUserPwd(\'' + rowData.Key + '\');');
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("title", "编辑用户").attr("onclick", 'javascript:window.platform.RoleUserManage_aspx.editUser(\'' + rowData.Key + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除用户").attr("onclick", 'javascript:window.platform.RoleUserManage_aspx.delUser(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(resetbtn).append(editbtn).append(delspan);
                        return div.html();
                    }
                }

			]],
                sortName: 'Code',
                sortOrder: 'asc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.RoleUserManage_aspx.editUser(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.RoleUserManage_aspx.delUser(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加用户",
                            href: "Views/Platform/UserAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var user = $(dialog).form('getData');
                                $.extend(user, { IsLocked: 0 });
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加用户档案信息成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加用户档案信息失败。");
                                    }
                                };
                                window.platform.user.addUser(user, _callback);
                            },
                            width: 900,
                            height: 355
                        });
                    }
                }, '-', {
                    id: 'btnupdate',
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        var rows = $('#Grid', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length != 1) { $.plugin.showMessage("请勾选一项要选择的项!"); }
                        else {
                            window.platform.RoleUserManage_aspx.editUser(rows[0].Key);
                        }
                    }
                }, '-', {
                    id: 'btndel',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var ids = [];
                        var names = [];
                        var rows = $('#Grid', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].Key);
                                names.push(rows[i].Name);
                            }
                            window.platform.RoleUserManage_aspx.delUser(ids.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            };
            $("#Grid", ajaxContainerSelector).datagrid(options);
        }
        var _powerTreeInit = function () {

        }

        var _bindButtonEvent = function () {
            $("#role_add", ajaxContainerSelector).click(_addRole);
            $("#role_update", ajaxContainerSelector).click(function () {
                var node = $("#Tree", ajaxContainerSelector).tree('getSelected');
                _editRole(node);
            });
            $("#role_del", ajaxContainerSelector).click(function () {
                var node = $("#Tree", ajaxContainerSelector).tree('getSelected');
                _delRole(node);
            });
            $("#role_refresh", ajaxContainerSelector).click(_loadRoleTreeData);
        }
        var _loadRoleTreeData = function () {
            window.platform.role.getTreeDataOfRole(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
            });
        };

        var _refreshRoleTree = function () {
            var oldnode = $("#Tree", ajaxContainerSelector).tree('getSelected');
            window.platform.role.getTreeDataOfRole(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                if (oldnode) {
                    var node = $("#Tree", ajaxContainerSelector).tree('find', oldnode.id);
                    $("#Tree", ajaxContainerSelector).tree('select', node.target);
                }
            });
        }
        var _addRole = function () {
            $.plugin.showDialog({
                title: "添加角色",
                href: "Views/Platform/RoleAdd.aspx",
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var role = $(dialog).form('getData');
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("添加角色成功。");
                            _refreshRoleTree();
                        } else {
                            $.plugin.showMessage("添加角色失败。");
                        }
                    };
                    window.platform.role.addRole(role, _callback);
                },
                width: 900,
                height: 280
            });
        }
        var _editRole = function (node) {
            if (!node || node.id == $("#Tree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            $.plugin.showDialog({
                title: "编辑角色",
                href: "Views/Platform/RoleUpdate.aspx?key=" + node.id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var role = $(dialog).form('getData');
                    $.extend(role, { Key: node.id });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改角色成功。");
                            _refreshRoleTree();
                        } else {
                            $.plugin.showMessage("修改角色失败。");
                        }
                    };
                    window.platform.role.updateRole(role, _callback);
                },
                width: 900,
                height: 280
            });
        }
        var _delRole = function (node) {
            if (!node || node.id == $("#Tree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除角色成功。");
                            _loadRoleTreeData();
                            var param = {
                                name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); },
                                RoleKey: -1
                            };
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('load', param);
                        } else {
                            //                            $.plugin.showMessage("删除角色失败。");
                            $.plugin.showMessage("请先删除该角色下所有用户，再删除该角色！");
                        }
                    };
                    window.platform.role.deleteRole(node.id, _callback);
                }
            });
        }
        var _moveRole = function (targetId, sourseId) {
            var obj = {
                Target: targetId,
                Sourse: sourseId
            };
            window.platform.role.moveNode(obj);
        }

        _roleTreeInit();
        _userGridInit();
        _powerTreeInit();
        _bindButtonEvent();

        ///重置用户密码
        window.platform.RoleUserManage_aspx.resetUserPwd = function (key) {
            $.plugin.messager.confirm("提示", "点击确定将密码恢复为用户名<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("重置用户密码成功。");
                        } else {
                            $.plugin.showMessage("重置用户密码失败。");
                        }
                    };
                    window.platform.user.resetUserPassword(key, callback);
                }
            });
        };
        ///编辑用户
        window.platform.RoleUserManage_aspx.editUser = function (key) {
            $.plugin.showDialog({
                title: "编辑用户",
                href: "Views/Platform/UserUpdate.aspx?key=" + key,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var user = $(dialog).form('getData');
                    $.extend(user, { Key: key });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改用户档案信息成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("修改用户档案信息失败。");
                        }
                    };
                    window.platform.user.updateUser(user, _callback);
                },
                width: 900,
                height: 385
            });
        }
        ///删除用户
        window.platform.RoleUserManage_aspx.delUser = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除用户成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除用户失败。");
                        }
                    };
                    window.platform.user.deleteUser(keys, callback);
                }
            });
        }
    };

})(jQuery);