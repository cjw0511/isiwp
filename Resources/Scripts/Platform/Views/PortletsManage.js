/*
==============================================================================
//  主页portlets管理页面 PortletsManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PortletsManage_aspx) { window.platform.PortletsManage_aspx = new Object(); }
    window.platform.PortletsManage_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            $("#Grid", ajaxContainerSelector).datagrid({
                fit: true,
                url: window.resolveUrl('Services/Platform/PortletsService.asmx/GetPagingData'),
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                idField: 'Key',
                columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Key', hidden: true },
                { field: 'Title', title: '面板名称', width: 300,
                    formatter: function (value, rowData, rowIndex) {
                        return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + value + '</div><div class="panel-icon ' + rowData.iconCls + '"></div></div>';
                    }
                },
                { field: 'Href', title: '链接地址', width: 400 },
                { field: 'opt', title: '操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a title='编辑'></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.platform.PortletsManage_aspx.editPortlets(\'' + rowData.Key + '\');');
                        var delspan = $("<a title='删除'></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.platform.PortletsManage_aspx.delPortlets(\'' + rowData.Key + '\',\'' + rowData.Title + '\');');
                        var rolebtn = $("<a title='角色'></a>").linkbutton({ plain: true, iconCls: "icon-select" }).attr("onclick", 'javascript:window.platform.PortletsManage_aspx.setPortletsRoles(\'' + rowData.Key + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan).append(rolebtn);
                        return div.html();
                    }
                }
			]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.Title;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.PortletsManage_aspx.editPortlets(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Title;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.PortletsManage_aspx.delPortlets(rowData.Key, rowData.Title);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加面板",
                            href: "Views/Platform/PortletsAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var portlets = $(dialog).form('getData');
                                $.extend(portlets, { Href: dialog.find("#txtNavigateUrl").combobox("getText") });
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加主页面板成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加主页面板失败。");
                                    }
                                };
                                window.platform.portlets.addPortlets(portlets, _callback);
                            },
                            width: 600,
                            height: 340
                        });
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var keys = [];
                        var titles = [];
                        var rows = $("#Grid", ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                keys.push(rows[i].Key);
                                titles.push(rows[i].Title);
                            }
                            window.platform.PortletsManage_aspx.delPortlets(keys.join(','), titles.join(','));
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
            });

        };
        var _bindButtonEvent = function () {


        };
        _bindControl();
        _bindButtonEvent();

        window.platform.PortletsManage_aspx.editPortlets = function (key) {
            $.plugin.showDialog({
                title: "编辑面板",
                href: "Views/Platform/PortletsUpdate.aspx?key=" + key,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var portlets = $(dialog).form('getData');
                    $.extend(portlets, { Key: key, Href: dialog.find("#txtNavigateUrl").combobox("getText") });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("编辑主页面板成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("编辑主页面板失败。");
                        }
                    };
                    window.platform.portlets.updatePortlets(portlets, _callback);
                },
                width: 600,
                height: 340
            });
        }
        window.platform.PortletsManage_aspx.delPortlets = function (keys, titles) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + titles + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除主页面板成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除主页面板失败。");
                        }
                    };
                    window.platform.portlets.delPortlets(keys, _callback);
                }
            });
        }
        window.platform.PortletsManage_aspx.setPortletsRoles = function (key) {
            var selected = [];
            window.platform.portlets.getPortletsRoles({ PortletKey: key }, function (data) {
                var nodes = data.split(",");
                $.each(nodes, function (i, n) {
                    selected.push(n);
                });
                var onEnterClick = function (datagrid, selections) {
                    var roles = [];
                    for (var i = 0; i < selections.length; i++) {
                        roles.push(selections[i].Key);
                    }
                    window.platform.portlets.setPortletsRoles({ PortletKey: key, RoleKeys: roles.join(",") }, function (success) {
                        if (success) {
                            $.plugin.showMessage("设置角色权限成功。");
                        } else {
                            $.plugin.showMessage("设置角色权限失败。");
                        }
                    });
                };
                window.platform.showRoleMultipleSelector(onEnterClick, selected);
            });
        }
    };
})(jQuery);