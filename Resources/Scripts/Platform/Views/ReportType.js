/*
==============================================================================
//  报表类别页面 ReportType.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.ReportType_aspx) { window.platform.ReportType_aspx = new Object(); }
    window.platform.ReportType_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            $("#Grid", ajaxContainerSelector).datagrid({
                url: window.resolveUrl('Services/Platform/WorkSpaceService.asmx/LoadData'),
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                idField: 'id',
                columns: [[
                { field: 'ck', checkbox: true },
                { field: 'id', hidden: true },
                { field: 'title', title: '面板名称', width: 300,
                    formatter: function (value, rowData, rowIndex) {
                        return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + value + '</div><div class="panel-icon ' + rowData.iconCls + '"></div></div>';
                    }
                },
                { field: 'href', title: '链接地址', width: 400 },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.platform.WorkSpaceManage_aspx.editPanel(\'' + rowData.id + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.platform.WorkSpaceManage_aspx.delPanel(\'' + rowData.id + '\',\'' + rowData.title + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan);
                        return div.html();
                    }
                }
			]],
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.title;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.ReportType_aspx.editPanel(rowData.id);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.title;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.ReportType_aspx.delPanel(rowData.id, rowData.title);
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
                            href: "Views/Platform/WorkSpacePanelAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var panel = {
                                    title: dialog.find("#txtTitle").val(),
                                    iconCls: dialog.find("#selIcon").combobox("getValue"),
                                    height: dialog.find("#txtHeight").val(),
                                    href: dialog.find("#txtNavigateUrl").combobox("getValue"),
                                    iniframe: dialog.find("#IsIframe").combobox("getValue")
                                };
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加主页面板成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加主页面板失败。");
                                    }
                                };
                                window.platform.workspace.addWorkSpacePanel(panel, _callback);
                            },
                            width: 500,
                            height: 275
                        });
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var ids = [];
                        var names = [];
                        var rows = $("#Grid", ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].id);
                                names.push(rows[i].title);
                            }
                            window.platform.ReportType_aspx.delPanel(ids.join(','), names.join(','));
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

        window.platform.ReportType_aspx.editPanel = function (id) {
            $.plugin.showDialog({
                title: "编辑面板",
                href: "Views/Platform/WorkSpacePanelUpdate.aspx?id=" + id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var panel = {
                        id: id,
                        title: dialog.find("#txtTitle").val(),
                        iconCls: dialog.find("#selIcon").combobox("getValue"),
                        height: dialog.find("#txtHeight").val(),
                        href: dialog.find("#txtNavigateUrl").combobox("getValue"),
                        iniframe: dialog.find("#IsIframe").combobox("getValue")
                    };
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("编辑主页面板成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("编辑主页面板失败。");
                        }
                    };
                    window.platform.workspace.updateWorkSpacePanel(panel, _callback);
                },
                width: 500,
                height: 275
            });
        }
        window.platform.ReportType_aspx.delPanel = function (ids, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除主页面板成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除主页面板失败。");
                        }
                    };
                    window.platform.workspace.delWorkSpacePanel(ids, _callback);
                }
            });
        }
    };
})(jQuery);