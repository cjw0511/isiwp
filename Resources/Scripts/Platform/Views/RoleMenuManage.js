/*
==============================================================================
//  角色菜单管理信息页面 RoleMenuManage.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.RoleMenuManage_aspx) { window.platform.RoleMenuManage_aspx = new Object(); }

    window.platform.RoleMenuManage_aspx.initPage = function (ajaxContainerSelector) {
        ///////////////////////////////////////////
        ///页面左边部分角色树初始化///////////////
        /////////////////////////////////////////
        var _roleTreeInit = function () {

            $("#RoleTree", ajaxContainerSelector).tree({
                animate: true,
                onSelect: function (node) {
                    if (node.id == $("#RoleTree", ajaxContainerSelector).tree('getRoot').id) {
                        return;
                    }
                    var nodes = $("#MenuTree", ajaxContainerSelector).tree("getChecked"); ///取消已选的
                    $.each(nodes, function (index, node) {
                        $("#MenuTree", ajaxContainerSelector).tree("uncheck", node.target)
                    });
                    var param = { RoleKey: node.id };
                    window.platform.menu.getMenuKeyByRoleKey(param, function (keys) {
                        ///选中有权限的菜单
                        if (!$(keys).text().isNullOrWhiteSpace()) {
                            arr = $(keys).text().split(",");
                            $.each(arr, function (index, id) {
                                var _node = $("#MenuTree", ajaxContainerSelector).tree("find", id);
                                if ($("#MenuTree", ajaxContainerSelector).tree("isLeaf", _node.target)) {
                                    $("#MenuTree", ajaxContainerSelector).tree("check", _node.target);
                                }
                            });
                        }
                    });

                    window.platform.menu.getMenuNodeByRoleKey(param, function (data) {
                        ///加载角色树
                        if (data.length > 0) {
                            $("#RoleMenuTree", ajaxContainerSelector).tree("loadData", data);
                            $('#RoleMenuTree', ajaxContainerSelector).tree('collapseAll');
                        }
                        else {
                            $('#RoleMenuTree', ajaxContainerSelector).tree('reload');
                        }
                    });
                    ///加载角色收藏表格
                    $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid('load', param);
                }
            });

            _loadRoleTreeData();
        }

        ///////////////////////////////////////////
        ///页面角色菜单设置菜单树初始化///////////
        /////////////////////////////////////////
        var _menuTreeInit = function () {

            $("#MenuTree", ajaxContainerSelector).tree({
                animate: true,
                checkbox: true
            });
            window.platform.menu.getTreeDataOfMenu(function (data) {
                $("#MenuTree", ajaxContainerSelector).tree("loadData", data);
                $('#MenuTree', ajaxContainerSelector).tree('collapseAll');
            });
        }

        ////////////////////////////////////////////
        ///页面角色收藏夹设置角色菜单树初始化//////
        //////////////////////////////////////////
        var _roleMenuTreeInit = function () {
            $("#RoleMenuTree", ajaxContainerSelector).tree({
                animate: true,
                onLoadSuccess: function (data) {
                    _treeDragInit();
                }
            });
        }

        ////////////////////////////////////////////////
        ///页面角色收藏夹设置角色收藏夹表格初始化//////
        //////////////////////////////////////////////
        var _roleFavoritesGridInit = function () {
            $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid({
                url: window.resolveUrl('Services/Platform/MenuService.asmx/GetShortcutRoleMenuByRoleKey'),
                queryParams: {
                    RoleKey: -1
                },
                border: false,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                fit: true,
                idField: 'MenuKey',
                columns: [[
                { field: 'ck', checkbox: true },
                { field: 'MenuKey', title: '菜单Key', hidden: true },
                { field: 'Name', title: '菜单名称', width: 300,
                    formatter: function (value, rowData, rowIndex) {
                        return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + value + '</div><div class="panel-icon ' + rowData.IconValue + '"></div></div>';
                    }
                },
                { field: 'opt', title: '操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var upbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-move-up" }).attr("onmouseover", "javascript:window.platform.RoleMenuManage_aspx.IsVaildToMoveUp = true;").attr("onmouseout", "javascript:window.platform.RoleMenuManage_aspx.IsVaildToMoveUp = false;");
                        var downspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-move-down" }).attr("onmouseover", "javascript:window.platform.RoleMenuManage_aspx.IsVaildToMoveDown = true;").attr("onmouseout", "javascript:window.platform.RoleMenuManage_aspx.IsVaildToMoveDown = false;");
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-remove" }).attr("onmouseover", "javascript:window.platform.RoleMenuManage_aspx.IsVaildToDeleteRowData = true;").attr("onmouseout", "javascript:window.platform.RoleMenuManage_aspx.IsVaildToDeleteRowData = false;");
                        var div = $("<div></div>").append(upbtn).append(downspan).append(delspan);
                        return div.html();
                    }
                }
			]],
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "上移：" + rowData.Name;
                },
                    iconCls: "icon-move-up",
                    handler: function (e, rowIndex, rowData, eventData) {
                        if (rowIndex == 0) { return; }
                        var rows = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                        var param = {
                            index: rowIndex - 1,
                            "row": rows[rowIndex]
                        };
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "下移：" + rowData.Name;
                },
                    iconCls: "icon-move-down",
                    handler: function (e, rowIndex, rowData, eventData) {
                        var rows = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                        if (rowIndex == rows.length - 1) { return; }
                        var param = {
                            index: rowIndex + 1,
                            "row": rows[rowIndex]
                        };
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "移除：" + rowData.Name;
                },
                    iconCls: "icon-remove",
                    handler: function (e, rowIndex, rowData, eventData) {
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnsave',
                    text: '保存',
                    iconCls: 'icon-save',
                    handler: function () {
                        var curnode = $("#RoleTree", ajaxContainerSelector).tree("getSelected");
                        if (!curnode || curnode.id == $("#RoleTree").tree('getRoot').id) {
                            return;
                        }
                        var nodes = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getData").rows;
                        var arr = new Array();
                        $.each(nodes, function (index, node) {
                            arr.push(node.MenuKey);
                        });
                        var param = {
                            RoleKey: curnode.id,
                            MappingKey: arr.join(",")
                        };
                        var callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("角色收藏设置成功。");
                            } else {
                                $.plugin.showMessage("角色收藏设置失败。");
                            }
                        };
                        window.platform.menu.setShortcutRoleMenuByRoleKey(param, callback);
                    }
                }, {
                    id: 'btndel',
                    text: '移除所选',
                    iconCls: 'icon-remove',
                    handler: function () {
                        var nodes = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getChecked");
                        var arr = new Array();
                        $.each(nodes, function (index, node) {
                            arr.push(node);
                        })
                        $.each(arr, function (index, node) {
                            var index = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getRowIndex", node.MenuKey);
                            $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", index);
                        })
                    }
                }],
                onClickRow: function (rowIndex, rowData) {
                    if (window.platform.RoleMenuManage_aspx.IsVaildToMoveUp == true) {
                        if (rowIndex == 0) { return; }
                        var rows = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                        var param = {
                            index: rowIndex - 1,
                            "row": rows[rowIndex]
                        };
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                        window.platform.RoleMenuManage_aspx.IsVaildToMoveUp = false;
                    }
                    else if (window.platform.RoleMenuManage_aspx.IsVaildToMoveDown == true) {
                        var rows = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                        if (rowIndex == rows.length - 1) { return; }
                        var param = {
                            index: rowIndex + 1,
                            "row": rows[rowIndex]
                        };
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                        window.platform.RoleMenuManage_aspx.IsVaildToMoveDown = false;
                    }
                    else if (window.platform.RoleMenuManage_aspx.IsVaildToDeleteRowData == true) {
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        window.platform.RoleMenuManage_aspx.IsVaildToDeleteRowData = false;
                    }
                },
                onLoadSuccess: function (data) {
                    _gridDropInit();
                    _gridDragInit();
                }
            });

        }

        ////////////////////////////////////////////////
        ///系统收藏夹表格初始化////////////////////////
        //////////////////////////////////////////////
        var _menuFavoritesGridInit = function () {
            $("#MenuFavoritesGrid", ajaxContainerSelector).datagrid({
                url: window.resolveUrl('Services/Platform/MenuService.asmx/GetShortcutMenu'),
                border: false,
                fit: true,
                idField: 'MenuKey',
                columns: [[
            { field: 'MenuKey', title: '菜单Key', width: 80 },
            { field: 'Name', title: '菜单名称', width: 200,
                formatter: function (value, rowData, rowIndex) {
                    return '<div style="width:16px;display:inline-block" class="' + rowData.IconValue + '">&nbsp;</div>' + value;
                }
            }
			]]
            });
        }

        var _bindButtonEvent = function () {
            $("#role_expand", ajaxContainerSelector).click(function () { $("#RoleTree", ajaxContainerSelector).tree("expandAll") });
            $("#role_collapse", ajaxContainerSelector).click(function () { $("#RoleTree", ajaxContainerSelector).tree("collapseAll") });
            $("#role_refresh", ajaxContainerSelector).click(_loadRoleTreeData);
            $("#RoleMenu_expand", ajaxContainerSelector).click(function () { $("#RoleMenuTree", ajaxContainerSelector).tree("expandAll") });
            $("#RoleMenu_collapse", ajaxContainerSelector).click(function () { $("#RoleMenuTree", ajaxContainerSelector).tree("collapseAll") });
            $("#RoleMenu_refresh", ajaxContainerSelector).click(_loadRoleMenuData);
            $("#menu_expand", ajaxContainerSelector).click(function () { $("#MenuTree", ajaxContainerSelector).tree("expandAll") });
            $("#menu_collapse", ajaxContainerSelector).click(function () { $("#MenuTree", ajaxContainerSelector).tree("collapseAll") });
            $("#menu_save", ajaxContainerSelector).click(function () {
                var nodes = $('#MenuTree', ajaxContainerSelector).tree('getChecked');
                var indeterminateNodes = $('#MenuTree', ajaxContainerSelector).tree('getChecked', "indeterminate");
                $.each(indeterminateNodes, function (index, node) {
                    nodes.push(node);
                });
                var keys = '';
                for (var i = 0; i < nodes.length; i++) {
                    if (keys != '') keys += ',';
                    keys += nodes[i].id;
                }
                var curnode = $("#RoleTree", ajaxContainerSelector).tree("getSelected");
                if (!curnode)
                    return;
                var param = {
                    RoleKey: curnode.id,
                    MappingKey: keys
                };
                ///更新角色树 
                var callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("设置角色目录成功。");
                        _loadRoleMenuData();
                    } else {
                        $.plugin.showMessage("设置角色目录失败。");
                    }
                };
                window.platform.menu.setMenuKeyByRoleKey(param, callback);
                ///更新角色收藏表格
                $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid('load', param);
            });
        }
        var _loadRoleMenuData = function () {
            var node = $("#RoleTree", ajaxContainerSelector).tree("getSelected");
            if (!node || node.id == $("#RoleTree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            var param = { RoleKey: node.id };
            window.platform.menu.getMenuNodeByRoleKey(param, function (data) {
                if (data.length > 0) {
                    $("#RoleMenuTree", ajaxContainerSelector).tree("loadData", data);
                    $('#RoleMenuTree', ajaxContainerSelector).tree('collapseAll');
                }
                else {
                    $('#RoleMenuTree', ajaxContainerSelector).tree('reload');
                }
            });
        };
        ////////////////////////////////////////////////
        ///角色树数据载入//////////////////////////////
        //////////////////////////////////////////////
        var _loadRoleTreeData = function () {
            window.platform.role.getTreeDataOfRole(function (data) {
                $("#RoleTree", ajaxContainerSelector).tree("loadData", data);
            });
        };

        ////////////////////////////////////////////////
        ///设置角色树拖动事件///////////////////////////
        ///////////////////////////////////////////////
        var _treeDragInit = function () {
            var RootNodes = $("#RoleMenuTree", ajaxContainerSelector).tree("getRoots");
            $.each(RootNodes, function (index, node) {
                var nodes = $("#RoleMenuTree", ajaxContainerSelector).tree("getChildren", node.target);
                for (i = 0; i < nodes.length; i++) {
                    if ($("#RoleMenuTree", ajaxContainerSelector).tree("isLeaf", nodes[i].target)) {
                        $(nodes[i].target).find(".tree-title").draggable({
                            revert: true,
                            deltaX: 15,
                            deltaY: 15,
                            cursor: 'inherit',
                            proxy: function (source) {
                                var p = $("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
                                p.html($(source).text());
                                p.hide();
                                return p;
                            },
                            onStopDrag: function (e) {
                                try {
                                    $(this).draggable("proxy").hide();
                                }
                                catch (e) {
                                }
                            },
                            onDrag: function (e) {
                                var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
                                var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                                if (d > 5) {
                                    $(this).draggable("proxy").show();
                                }
                                this.pageY = e.pageY;
                            }
                        });
                    }
                }
            })
        }

        ////////////////////////////////////////////////
        ///设置表格容器////////////////////////////////
        ///////////////////////////////////////////////
        var _gridDropInit = function () {
            $("#RoleFavoritesGrid", ajaxContainerSelector).parent(".datagrid-view").droppable({
                accept: ajaxContainerSelector + " .tree-title," + ajaxContainerSelector + " td[field='Name']",
                onDragEnter: function (e, source) {
                    $(".tree-node-proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
                },
                onDragLeave: function (e, source) {
                    $(".tree-node-proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
                },
                onDrop: function (e, source) {
                    if ($(source).is("td")) {
                        var key = $(source).parent().find("td[field='MenuKey']", ajaxContainerSelector).find(".datagrid-cell").text();
                        var insertKey = $(".datagrid-row-over", ajaxContainerSelector).find("td[field='MenuKey']").find(".datagrid-cell").text();
                        if (key == insertKey || insertKey == '')
                            return;
                        else {
                            var index = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getRowIndex", key);
                            var rows = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                            var insertIndex = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getRowIndex", insertKey);
                            var param = {
                                index: insertIndex,
                                "row": rows[index]
                            };
                            $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", index);
                            $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                            $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                            _gridDragInit();
                        }
                    } else {
                        var cid = $(source).parent().attr("node-id");
                        var isExist = $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("getRowIndex", cid);
                        if (isExist > -1)
                            return;
                        var node = $("#RoleMenuTree", ajaxContainerSelector).tree("find", cid);
                        var cicon = node.iconCls;
                        if (cicon == '')
                            cicon = 'tree-file';
                        var ctext = node.text;

                        var param = {
                            "row": { "MenuKey": cid, "IconValue": cicon, "Name": ctext }
                        };
                        $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                        _gridDragInit();
                    }
                }
            })
        }

        /////////////////////////////////////////////////
        ///设置表格拖动事件/////////////////////////////
        ///////////////////////////////////////////////
        var _gridDragInit = function () {
            $("#RoleFavoritesGrid", ajaxContainerSelector).prev(".datagrid-view2").find("td[field='Name']").draggable({
                revert: true,
                deltaX: 15,
                deltaY: 15,
                onDrag: function (e) {
                    var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
                    var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                    if (d > 10) {
                        $(this).draggable("proxy").show();
                    }
                    this.pageY = e.pageY;
                },
                onStopDrag: function (e) {
                    try {
                        $(this).draggable("proxy").hide();
                    }
                    catch (e) {
                    }
                },
                cursor: 'inherit',
                proxy: function (source) {
                    var p = $("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
                    p.html($(source).text()).hide();
                    return p;
                }
            })
        };

        /////////////////////////////////////////////////////////////////////////////////
        _roleTreeInit();
        _menuTreeInit();
        _roleMenuTreeInit();
        _roleFavoritesGridInit();
        _menuFavoritesGridInit();
        _bindButtonEvent();

//        $("#_east", ajaxContainerSelector).prev(".panel-header").attr("style", "border-top-width:0px;border-right-width:0px;");
    };
})(jQuery);