/*
==============================================================================
//  知识库字段维护页面 LorefieldManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.platform = new Object(); }
    if (!window.lorelibs.LoreFieldManage_aspx) { window.lorelibs.LoreFieldManage_aspx = new Object(); }
    window.lorelibs.LoreFieldManage_aspx.initPage = function (ajaxContainerSelector) {
        window.lorelibs.LoreFieldManage_aspx.ajaxContainerSelector = ajaxContainerSelector;

        var _bindControl = function () {
            var dataType = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 33 });
            var _dataTypeFormatter = function (value) {
                for (var i = 0; i < dataType.length; i++) {
                    if (dataType[i].Key == value) return dataType[i].Name;
                }
                return value;
            }
            var options = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/LoreLibs/LoreFieldService.asmx/GetPagingData'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); }
                },
                idField: 'Key',
                columns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '名称', width: 100, sortable: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
				{ field: 'DataType', title: '数据类型', width: 100, sortable: true, formatter: _dataTypeFormatter },
				{ field: 'ValidType', title: '验证类型', width: 100, sortable: true },
                { field: 'Description', title: '描述', width: 150, sortable: true },
                { field: 'Summary', title: '简介', width: 150, sortable: true },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.lorelibs.LoreFieldManage_aspx.editLoreField(\'' + rowData.Key + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.lorelibs.LoreFieldManage_aspx.delLoreField(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
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
                        window.lorelibs.LoreFieldManage_aspx.editLoreField(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.lorelibs.LoreFieldManage_aspx.delLoreField(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加字段",
                            href: "Views/LoreLibs/LoreFieldAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var lorefield = $(dialog).form('getData');
                                $.extend(lorefield, { ValidType: dialog.find("#selValidType").combobox("getText") });
                                if (String.isNullOrWhiteSpace(lorefield.MaxLength)) { lorefield.MaxLength = 0; };
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加字段成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加字段失败。");
                                    };
                                };
                                window.lorelibs.lorefield.addLoreField(lorefield, _callback);
                            },
                            width: 920,
                            height: 380
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
                            window.lorelibs.LoreFieldManage_aspx.delLoreField(ids.join(','), names.join(','));
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

        }

        _bindControl();
        _bindButtonEvent();

        window.lorelibs.LoreFieldManage_aspx.editLoreField = function (key) {
            $.plugin.showDialog({
                title: "编辑字段",
                href: "Views/LoreLibs/LoreFieldUpdate.aspx?key=" + key,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var lorefield = $(dialog).form('getData');
                    $.extend(lorefield, { Key: key, ValidType: dialog.find("#selValidType").combobox("getText") });
                    if (String.isNullOrWhiteSpace(lorefield.MaxLength)) { lorefield.MaxLength = 0; };
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("编辑字段成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("编辑字段失败。");
                        }
                    };
                    window.lorelibs.lorefield.updateLoreField(lorefield, _callback);
                },
                width: 920,
                height: 380
            });
        }
        window.lorelibs.LoreFieldManage_aspx.delLoreField = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除字段成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除字段失败。");
                        }
                    };
                    window.lorelibs.lorefield.deleteLoreField(keys, _callback);
                }
            });
        }
    }
})(jQuery);