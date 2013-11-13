/*
==============================================================================
//  个人菜单管理信息页面 UserMenuManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.UserMenuManage_aspx) { window.platform.UserMenuManage_aspx = new Object(); }

    window.platform.UserMenuManage_aspx.initPage = function (ajaxContainerSelector) {
        window.platform.UserMenuManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        ///////////////////////////////////////////
        ///个人菜单树初始化///////////////////////
        /////////////////////////////////////////
        var _roleMenuTreeInit = function () {
            $("#RoleMenuTree", ajaxContainerSelector).tree({
                animate: true,
                moveMenu: false
            });
            _loadRoleMenuTreeData();
        }
        var _loadRoleMenuTreeData = function () {

            //获取当前用户角色拥有权限的所有菜单
            window.platform.getCurrentUser(function (currentUser) {
                var param = { RoleKey: currentUser.RoleKey };
                window.platform.menu.getMenuNodeByRoleKey(param, function (data) {
                    if (data.length > 0) {
                        $("#RoleMenuTree", ajaxContainerSelector).tree("loadData", data);
                        $('#RoleMenuTree', ajaxContainerSelector).tree('collapseAll');
                        _treeDragInit();
                    }
                });

            });
        };
        ///////////////////////////////////////////
        ///个人收藏夹表格初始化///////////////////
        /////////////////////////////////////////
        var _userFavoritesGridInit = function () {
            window.platform.getCurrentUserKey(function (currentUserKey) {
                $("#UserFavoritesGrid", ajaxContainerSelector).datagrid({
                    url: window.resolveUrl('Services/Platform/MenuService.asmx/GetShortcutUserMenuByUserKey'),
                    queryParams: {
                        UserKey: function () {
                            return currentUserKey;
                        }
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
                        var upbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-move-up" }).attr("onmouseover", "javascript:window.platform.UserMenuManage_aspx.IsVaildToMoveUp = true;").attr("onmouseout", "javascript:window.platform.UserMenuManage_aspx.IsVaildToMoveUp = false;");
                        var downspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-move-down" }).attr("onmouseover", "javascript:window.platform.UserMenuManage_aspx.IsVaildToMoveDown = true;").attr("onmouseout", "javascript:window.platform.UserMenuManage_aspx.IsVaildToMoveDown = false;");
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-remove" }).attr("onmouseover", "javascript:window.platform.UserMenuManage_aspx.IsVaildToDeleteRowData = true;").attr("onmouseout", "javascript:window.platform.UserMenuManage_aspx.IsVaildToDeleteRowData = false;");
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
                        var rows = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                        var param = {
                            index: rowIndex - 1,
                            "row": rows[rowIndex]
                        };
                        $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "下移：" + rowData.Name;
                },
                    iconCls: "icon-move-down",
                    handler: function (e, rowIndex, rowData, eventData) {
                        var rows = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                        if (rowIndex == rows.length - 1) { return; }
                        var param = {
                            index: rowIndex + 1,
                            "row": rows[rowIndex]
                        };
                        $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "移除：" + rowData.Name;
                },
                    iconCls: "icon-remove",
                    handler: function (e, rowIndex, rowData, eventData) {
                        $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                    }
                }
            ],
                    toolbar: [{
                        id: 'btnsave',
                        text: '保存',
                        iconCls: 'icon-save',
                        handler: function () {
                            var nodes = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getData").rows;
                            var arr = new Array();
                            $.each(nodes, function (index, node) {
                                arr.push(node.MenuKey);
                            });
                            window.platform.getCurrentUserKey(function (userkey) {
                                var param = {
                                    UserKey: userkey,
                                    MappingKey: arr.join(",")
                                };
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.messager.alert("操作提醒", "个人收藏设置成功。", "info");
                                    } else {
                                        $.plugin.messager.alert("操作提醒", "个人收藏设置失败。", "warning");
                                    }
                                };
                                window.platform.menu.setShortcutUserMenuByUserKey(param, _callback);
                            });
                        }
                    }, {
                        id: 'btndel',
                        text: '移除所选',
                        iconCls: 'icon-remove',
                        handler: function () {
                            var nodes = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getChecked");
                            var arr = new Array();
                            $.each(nodes, function (index, node) {
                                arr.push(node);
                            })
                            $.each(arr, function (index, node) {
                                var index = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getRowIndex", node.MenuKey);
                                $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", index);
                            })
                        }
                    }],
                    onClickRow: function (rowIndex, rowData) {
                        if (window.platform.UserMenuManage_aspx.IsVaildToMoveUp == true) {
                            if (rowIndex == 0) { return; }
                            var rows = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                            var param = {
                                index: rowIndex - 1,
                                "row": rows[rowIndex]
                            };
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                            _gridDragInit();
                            window.platform.UserMenuManage_aspx.IsVaildToMoveUp = false;
                        }
                        else if (window.platform.UserMenuManage_aspx.IsVaildToMoveDown == true) {
                            var rows = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                            if (rowIndex == rows.length - 1) { return; }
                            var param = {
                                index: rowIndex + 1,
                                "row": rows[rowIndex]
                            };
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                            _gridDragInit();
                            window.platform.UserMenuManage_aspx.IsVaildToMoveDown = false;
                        }
                        else if (window.platform.UserMenuManage_aspx.IsVaildToDeleteRowData == true) {
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                            window.platform.UserMenuManage_aspx.IsVaildToDeleteRowData = false;
                        }
                    },
                    onLoadSuccess: function (data) {
                        _gridDropInit();
                        _gridDragInit();
                    }
                });
            });
        }
        ///////////////////////////////////////////
        ///系统收藏夹表格初始化///////////////////
        /////////////////////////////////////////
        var _menuFavoritesGridInit = function () {
            $("#MenuFavoritesGrid", ajaxContainerSelector).datagrid({
                url: window.resolveUrl('Services/Platform/MenuService.asmx/GetShortcutMenu'),
                border: false,
                fit: true,
                fitColumns: true,
                idField: 'MenuKey',
                columns: [[
                { field: 'MenuKey', title: '菜单Key', width: 80 },
                { field: 'Name', title: '菜单名称', width: 200,
                    formatter: function (value, rowData, rowIndex) {
                        return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + value + '</div><div class="panel-icon ' + rowData.IconValue + '"></div></div>';
                    }
                }
			]]
            });
        }
        ///////////////////////////////////////////
        /////角色收藏夹表格初始化/////////////////
        /////////////////////////////////////////
        var _roleFavoritesGridInit = function () {
            window.platform.getCurrentUser(function (currentUser) {
                $("#RoleFavoritesGrid", ajaxContainerSelector).datagrid({
                    title: '角色收藏夹',
                    url: window.resolveUrl('Services/Platform/MenuService.asmx/GetShortcutRoleMenuByRoleKey'),
                    queryParams: {
                        RoleKey: function () {
                            return currentUser.RoleKey;
                        }
                    },
                    border: false,
                    fit: true,
                    fitColumns: true,
                    idField: 'MenuKey',
                    columns: [[
                { field: 'MenuKey', title: '菜单Key', width: 80 },
                { field: 'Name', title: '菜单名称', width: 200,
                    formatter: function (value, rowData, rowIndex) {
                        return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + value + '</div><div class="panel-icon ' + rowData.IconValue + '"></div></div>';
                    }
                },
			    ]]
                });
            });
        }

        var _bindButtonEvent = function () {
            //            $("#rolemenu_expand", ajaxContainerSelector).linkbutton({ plain: true, iconCls: 'icon-add', text: "展开" });
            $("#rolemenu_expand", ajaxContainerSelector).click(function () { $("#RoleMenuTree", ajaxContainerSelector).tree("expandAll") });
            $("#rolemenu_collapse", ajaxContainerSelector).click(function () { $("#RoleMenuTree", ajaxContainerSelector).tree("collapseAll") });
            $("#rolemenu_refresh", ajaxContainerSelector).click(_loadRoleMenuTreeData);
        };

        /////////////////////////////////////////////////
        ///设置个人所属角色菜单树拖动事件///////////////
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
        /////////////////////////////////////////////////
        ///设置个人收藏夹表格容器事件///////////////////
        ///////////////////////////////////////////////
        var _gridDropInit = function () {
            $("#UserFavoritesGrid", ajaxContainerSelector).parent(".datagrid-view").droppable({
                accept: ajaxContainerSelector + " .tree-title," + ajaxContainerSelector + " td[field='Name']",
                onDragEnter: function (e, source) {
                    $(".tree-node-proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
                },
                onDragLeave: function (e, source) {
                    $(".tree-node-proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
                },
                onDrop: function (e, source) {
                    if ($(source).is("td")) {
                        var key = $(source).parent().find("td[field='MenuKey']").find(".datagrid-cell").text();
                        var insertKey = $(".datagrid-row-over", ajaxContainerSelector).find("td[field='MenuKey']").find(".datagrid-cell").text();
                        if (key == insertKey || insertKey == '')
                            return;
                        else {
                            var index = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getRowIndex", key);
                            var rows = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getRows");
                            var insertIndex = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getRowIndex", insertKey);
                            var param = {
                                index: insertIndex,
                                "row": rows[index]
                            };
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("deleteRow", index);
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                            $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("selectRow", param.index);
                            _gridDragInit();
                        }
                    } else {
                        var cid = $(source).parent().attr("node-id");
                        var isExist = $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("getRowIndex", cid);
                        if (isExist > -1)
                            return;
                        var node = $("#RoleMenuTree", ajaxContainerSelector).tree("find", cid);
                        var cicon = node.iconCls;
                        var ctext = node.text;
                        var param = {
                            "row": { "MenuKey": cid, "IconValue": cicon, "Name": ctext }
                        };
                        $("#UserFavoritesGrid", ajaxContainerSelector).datagrid("insertRow", param);
                        _gridDragInit();
                    }
                }
            })
        }
        /////////////////////////////////////////////////
        ///设置个人收藏夹表格拖动事件///////////////////
        ///////////////////////////////////////////////
        var _gridDragInit = function () {

            //            alert($("#UserFavoritesGrid", ajaxContainerSelector).prev(".datagrid-view2").find("td[field='Name']").length);
            $("#UserFavoritesGrid", ajaxContainerSelector).prev(".datagrid-view2").find("td[field='Name']").draggable({
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
        _roleMenuTreeInit();
        _userFavoritesGridInit();
        _menuFavoritesGridInit();
        _roleFavoritesGridInit();
        _bindButtonEvent();

    };
})(jQuery);