/*
==============================================================================
//  系统菜单管理信息页面 SystemMenuManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.SystemMenuManage_aspx) { window.platform.SystemMenuManage_aspx = new Object(); }
    window.platform.SystemMenuManage_aspx.initPage = function (ajaxContainerSelector) {
        var _menuTreeInit = function () {
            $("#Tree", ajaxContainerSelector).tree({
                animate: true,
                moveMenu: { up: true, upLevel: true, down: true, downLevel: true },
                nodeContextMenus: [
                        { text: "添加至收藏", iconCls: "icon-favo-add", handler: function (e, tree, node) {
                            if (!$("#Tree", ajaxContainerSelector).tree("isLeaf", node.target)) {
                                return;
                            }
                            var cid = node.id;
                            var isExist = $("#Grid", ajaxContainerSelector).datagrid("getRowIndex", cid);
                            if (isExist > -1) { return; }
                            var cicon = node.iconCls;
                            if (cicon == '') { cicon = 'tree-file'; }
                            var ctext = node.text;
                            var param = { "row": { "MenuKey": cid, "IconValue": cicon, "Name": ctext} };
                            $("#Grid", ajaxContainerSelector).datagrid("insertRow", param);
                            _gridDragInit();
                        }
                        },
                        { text: "添加菜单", iconCls: "icon-create", handler: _addMenu },
                        { text: function (e, tree, node) { return "编辑 " + node.text; }, iconCls: "icon-edit", handler: function (e, tree, node) { _editMenu(node); } },
                        { text: function (e, tree, node) { return "删除 " + node.text; }, iconCls: "icon-no", handler: function (e, tree, node) { _delMenu(node); } },
                        { text: "刷新", iconCls: "icon-refresh", handler: _loadMenuTreeData }
                    ],
                onDrop: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    _moveMenu(node.id, source.id, point);
                }
            });
            //装载菜单树
            _loadMenuTreeData();
        };
        var _gridInit = function () {
            $("#Grid", ajaxContainerSelector).datagrid({
                url: window.resolveUrl('Services/Platform/MenuService.asmx/GetShortcutMenu'),
                border: false,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                fit: true,
                idField: 'MenuKey',
                columns: [[
                { field: 'ck', checkbox: true },
                { field: 'MenuKey', title: '菜单Key', width: 80, hidden: true },
                { field: 'Name', title: '菜单名称', width: 300,
                    formatter: function (value, rowData, rowIndex) {
                        return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + value + '</div><div class="panel-icon ' + rowData.IconValue + '"></div></div>';
                    }
                },
                { field: 'opt', title: '操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var upbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-move-up" }).attr("onmouseover", "javascript:window.platform.SystemMenuManage_aspx.IsVaildToMoveUp = true;").attr("onmouseout", "javascript:window.platform.SystemMenuManage_aspx.IsVaildToMoveUp = false;");
                        var downspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-move-down" }).attr("onmouseover", "javascript:window.platform.SystemMenuManage_aspx.IsVaildToMoveDown = true;").attr("onmouseout", "javascript:window.platform.SystemMenuManage_aspx.IsVaildToMoveDown = false;");
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-remove" }).attr("onmouseover", "javascript:window.platform.SystemMenuManage_aspx.IsVaildToDeleteRowData = true;").attr("onmouseout", "javascript:window.platform.SystemMenuManage_aspx.IsVaildToDeleteRowData = false;");
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
                        var rows = $("#Grid", ajaxContainerSelector).datagrid("getRows");
                        var param = {
                            index: rowIndex - 1,
                            "row": rows[rowIndex]
                        };
                        $("#Grid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#Grid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#Grid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "下移：" + rowData.Name;
                },
                    iconCls: "icon-move-down",
                    handler: function (e, rowIndex, rowData, eventData) {
                        var rows = $("#Grid", ajaxContainerSelector).datagrid("getRows");
                        if (rowIndex == rows.length - 1) { return; }
                        var param = {
                            index: rowIndex + 1,
                            "row": rows[rowIndex]
                        };
                        $("#Grid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#Grid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#Grid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "移除：" + rowData.Name;
                },
                    iconCls: "icon-remove",
                    handler: function (e, rowIndex, rowData, eventData) {
                        $("#Grid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnsave',
                    text: '保存',
                    iconCls: 'icon-save',
                    handler: function () {
                        var nodes = $("#Grid", ajaxContainerSelector).datagrid("getData").rows;
                        var arr = new Array();
                        $.each(nodes, function (index, node) {
                            arr.push(node.MenuKey);
                        })
                        var param = { MappingKey: arr.join(",") };
                        var callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("设置系统收藏成功。");
                            } else {
                                $.plugin.showMessage("设置系统收藏失败。");
                            }
                        };
                        window.platform.menu.setShortcutMenu(param, callback);
                    }
                }, {
                    id: 'btndel',
                    text: '移除所选',
                    iconCls: 'icon-remove',
                    handler: function () {
                        var nodes = $("#Grid").datagrid("getChecked");
                        var arr = new Array();
                        $.each(nodes, function (index, node) {
                            arr.push(node);
                        })
                        $.each(arr, function (index, node) {
                            var index = $("#Grid", ajaxContainerSelector).datagrid("getRowIndex", node.MenuKey);
                            $("#Grid", ajaxContainerSelector).datagrid("deleteRow", index);
                        })
                    }
                }],
                onClickRow: function (rowIndex, rowData) {
                    if (window.platform.SystemMenuManage_aspx.IsVaildToMoveUp == true) {
                        if (rowIndex == 0) { return; }
                        var rows = $("#Grid", ajaxContainerSelector).datagrid("getRows");
                        var param = {
                            index: rowIndex - 1,
                            "row": rows[rowIndex]
                        };
                        $("#Grid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#Grid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#Grid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                        window.platform.SystemMenuManage_aspx.IsVaildToMoveUp = false;
                    }
                    else if (window.platform.SystemMenuManage_aspx.IsVaildToMoveDown == true) {
                        var rows = $("#Grid", ajaxContainerSelector).datagrid("getRows");
                        if (rowIndex == rows.length - 1) { return; }
                        var param = {
                            index: rowIndex + 1,
                            "row": rows[rowIndex]
                        };
                        $("#Grid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        $("#Grid", ajaxContainerSelector).datagrid("insertRow", param);
                        $("#Grid", ajaxContainerSelector).datagrid("selectRow", param.index);
                        _gridDragInit();
                        window.platform.SystemMenuManage_aspx.IsVaildToMoveDown = false;
                    }
                    else if (window.platform.SystemMenuManage_aspx.IsVaildToDeleteRowData == true) {
                        $("#Grid", ajaxContainerSelector).datagrid("deleteRow", rowIndex);
                        window.platform.SystemMenuManage_aspx.IsVaildToDeleteRowData = false;
                    }
                },
                onLoadSuccess: function (data) {
                    _gridDropInit();
                    _gridDragInit();
                }
            });

        };
        var _loadMenuTreeData = function () {
            window.platform.menu.getTreeDataOfMenu(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                $('#Tree', ajaxContainerSelector).tree('collapseAll');
                var root = $('#Tree', ajaxContainerSelector).tree('getRoot');
                $('#Tree', ajaxContainerSelector).tree('expand', root.target);
                _treeDragInit();
            });
        };
        var _treeDragInit = function () {
            var RootNodes = $("#Tree", ajaxContainerSelector).tree("getRoots");
            $.each(RootNodes, function (index, node) {
                nodes = $("#Tree", ajaxContainerSelector).tree("getChildren", node.target);
                for (i = 0; i < nodes.length; i++) {
                    if ($("#Tree", ajaxContainerSelector).tree("isLeaf", nodes[i].target)) {
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
        ///设置表格容器事件
        ///////////////////////////////////////////////
        var _gridDropInit = function () {

            $("#Grid", ajaxContainerSelector).parent(".datagrid-view").droppable({
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
                        if (key == insertKey || insertKey == '') { return; }
                        else {
                            var index = $("#Grid", ajaxContainerSelector).datagrid("getRowIndex", key);
                            var rows = $("#Grid", ajaxContainerSelector).datagrid("getRows");
                            var insertIndex = $("#Grid", ajaxContainerSelector).datagrid("getRowIndex", insertKey);
                            var param = {
                                index: insertIndex,
                                "row": rows[index]
                            };
                            $("#Grid", ajaxContainerSelector).datagrid("deleteRow", index);
                            $("#Grid", ajaxContainerSelector).datagrid("insertRow", param);
                            $("#Grid", ajaxContainerSelector).datagrid("selectRow", param.index);
                            _gridDragInit();
                        }
                    } else {
                        var cid = $(source).parent().attr("node-id");
                        var isExist = $("#Grid", ajaxContainerSelector).datagrid("getRowIndex", cid);
                        if (isExist > -1) { return; }
                        var node = $("#Tree", ajaxContainerSelector).tree("find", cid);
                        var cicon = node.iconCls;
                        if (cicon == '') { cicon = 'tree-file'; }
                        var ctext = node.text;
                        var param = {
                            "row": { "MenuKey": cid, "IconValue": cicon, "Name": ctext }
                        };
                        $("#Grid", ajaxContainerSelector).datagrid("insertRow", param);
                        _gridDragInit();
                    }
                }
            })
        }
        ////////////////////////////////////////////////
        ///设置表格拖动事件
        ///////////////////////////////////////////////
        var _gridDragInit = function () {
            $("#Grid", ajaxContainerSelector).prev(".datagrid-view2").find("td[field='Name']").draggable({
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
                    catch (e) { }
                },
                cursor: 'inherit',
                proxy: function (source) {
                    var p = $("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
                    p.html($(source).text()).hide();
                    return p;
                }
            })
        };
        var _bindButtonEvent = function () {
            $("#a_add", ajaxContainerSelector).click(_addMenu);
            $("#a_edit", ajaxContainerSelector).click(function () {
                var node = $("#Tree", ajaxContainerSelector).tree('getSelected');
                _editMenu(node);
            });
            $("#a_del", ajaxContainerSelector).click(function () {
                var node = $("#Tree", ajaxContainerSelector).tree('getSelected');
                _delMenu(node);
            });
            $("#a_refresh", ajaxContainerSelector).click(_loadMenuTreeData);
        }
        var _addMenu = function () {
            var tg = $("#Tree", ajaxContainerSelector).tree('getSelected');
            var fid = "0";
            if (tg != null) {
                fid = tg.id;
            }
            $.plugin.showDialog({
                title: "添加菜单",
                href: "Views/Platform/SystemMenuAdd.aspx?key=" + fid,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var menu = $(dialog).form('getData');
                    $.extend(menu, { NavigateUrl: dialog.find("#txtNavigateUrl").combobox("getText") });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("添加菜单成功。");
                            _loadMenuTreeData();
                        } else {
                            $.plugin.showMessage("添加菜单失败。");
                        }
                    };
                    window.platform.menu.addMenu(menu, _callback);

                },
                width: 700,
                height: 370
            });
        }
        var _editMenu = function (node) {
            var ids = [];
            var roots = $("#Tree", ajaxContainerSelector).tree('getRoots');
            for (var i = 0; i < roots.length; i++) {
                ids.push(roots[i].id);
            }
            if (!node || ids.contains(node.id)) {
                return;
            }
            $.plugin.showDialog({
                title: "编辑菜单",
                href: "Views/Platform/SystemMenuUpdate.aspx?key=" + node.id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var menu = $(dialog).form('getData');
                    $.extend(menu, { Key: node.id, NavigateUrl: dialog.find("#txtNavigateUrl").combobox("getText") });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("编辑菜单成功。");
                            _loadMenuTreeData();
                        } else {
                            $.plugin.showMessage("编辑菜单失败。");
                        }
                    };
                    window.platform.menu.updateMenu(menu, _callback);
                },
                width: 700,
                height: 370
            });
        }
        var _delMenu = function (node) {
            if (!node)
                return;
            if (!$("#Tree", ajaxContainerSelector).tree('isLeaf', node.target)) {
                $.plugin.showMessage(node.text + " 有子节点，请先删除!");
                return;
            }
            $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var param = { Key: node.id };
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除菜单成功。");
                            _loadMenuTreeData();
                        } else {
                            $.plugin.showMessage("删除菜单失败。");
                        }
                    };
                    window.platform.menu.deleteMenu(param, _callback);
                }
            });
        }
        var _moveMenu = function (targetId, sourseId, point) {
            var obj = {
                Target: targetId,
                Sourse: sourseId,
                Point: point
            };
            window.platform.menu.moveNode(obj);
        }
        /////////////////////////////////////////////////////////////////////////////////
        _menuTreeInit();
        _gridInit();
        _bindButtonEvent();

    };
})(jQuery);