/*
==============================================================================
//  登录安全策略页面 LogonConfig.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.LogonConfig_aspx) { window.platform.LogonConfig_aspx = new Object(); }
    window.platform.LogonConfig_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            var options = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Platform/LogonConfigService.asmx/LoadGridData'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); }
                },
                idField: 'ID',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '名称', width: 150, sortable: true },
                { field: 'Code', title: '编号', width: 150, sortable: true },
				{ field: 'Key', title: '键', width: 150, sortable: true },
                { field: 'Value', title: '值', width: 150, sortable: true },
				{ field: 'Description', title: '描述', width: 150, sortable: true },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.platform.LogonConfig_aspx.editConfig(\'' + rowData.ID + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.platform.LogonConfig_aspx.delConfig(\'' + rowData.ID + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan);
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
                        window.platform.LogonConfig_aspx.editConfig(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.LogonConfig_aspx.delConfig(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加登录安全策略",
                            href: "Views/Platform/LogonConfigAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var logonconfig = {
                                    Name: dialog.find("#txtName").val(),
                                    Code: dialog.find("#txtCode").val(),
                                    Key: dialog.find("#txtKey").val(),
                                    Value: dialog.find("#txtValue").val(),
                                    Description: dialog.find("#txtDescription").val(),
                                    Summary: dialog.find("#txtSummary").val()
                                };
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加安全策略成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid("reload");
                                    } else {
                                        $.plugin.showMessage("添加安全策略失败。");
                                    }
                                };
                                window.platform.logonConfig.addLogonConfig(logonconfig, _callback);
                            },
                            width: 900,
                            height: 350
                        });
                    }
                }, '-', {
                    id: 'btncut',
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
                            window.platform.LogonConfig_aspx.delConfig(ids.join(','), names.join(','));
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
        var _bindButtonEvent = function () {
            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtName", ajaxContainerSelector).val('');
            });
        };   
        _bindControl();
        _bindButtonEvent();

        window.platform.LogonConfig_aspx.editConfig = function (id) {
            $.plugin.showDialog({
                title: "编辑登录安全策略",
                href: "Views/Platform/LogonConfigUpdate.aspx?id=" + id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var logonconfig = {
                        ID: id,
                        Name: dialog.find("#txtName").val(),
                        Code: dialog.find("#txtCode").val(),
                        Key: dialog.find("#txtKey").val(),
                        Value: dialog.find("#txtValue").val(),
                        Description: dialog.find("#txtDescription").val(),
                        Summary: dialog.find("#txtSummary").val()
                    };
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改安全策略成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("修改安全策略失败。");
                        }
                    };
                    window.platform.logonConfig.updateLogonConfig(logonconfig, _callback);
                },
                width: 900,
                height: 350
            });
        }
        window.platform.LogonConfig_aspx.delConfig = function (ids, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除安全策略成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除安全策略失败。");
                        }
                    };
                    window.platform.logonConfig.deleteLogonConfig(ids, _callback);
                }
            });
        }
    };
})(jQuery);