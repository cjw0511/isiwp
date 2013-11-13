/*
==============================================================================
//  知识列表页面 LoreList.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreList_aspx) { window.lorelibs.LoreList_aspx = new Object(); }

    window.lorelibs.LoreList_aspx.initPage = function (ajaxContainerSelector, key) {
        var nodekey = key.split("_")[1];
        var _bindControl = function () {

            window.lorelibs.lorefield.getLoreNodeFieldMappingByNodeKey(nodekey, function (data) {
                var _columns = [];
                _columns.push({ field: 'ck', checkbox: true });
                for (var i = 0; i < data.length; i++) {
                    _columns.push({ field: String(data[i].Key), title: String(data[i].MappingName), width: 150, formatter: function (value, rowData, rowIndex) { return "<span title='" + value + "'>" + value + "</span>" } });
                }
                _columns.push({ field: 'opt', title: '操作', width: 120, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var upbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-move-up" }).attr("onclick", 'javascript:window.lorelibs.LoreList_aspx.moveLoreUp(\'' + rowData.Key + '\');');
                        var downspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-move-down" }).attr("onclick", 'javascript:window.lorelibs.LoreList_aspx.moveLoreDown(\'' + rowData.Key + '\');');
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.lorelibs.LoreList_aspx.editLore(\'' + rowData.Key + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.lorelibs.LoreList_aspx.delLore(\'' + rowData.Key + '\');');
                        var div = $("<div></div>").append(upbtn).append(downspan).append(editbtn).append(delspan);
                        return div.html();
                    }
                });
                var options = {
                    border: false,
                    rownumbers: true,
                    singleSelect: true,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    fit: true,
                    nowrap: true,
                    url: window.resolveUrl('Services/LoreLibs/LoreService.asmx/GetPagingData'),
                    pagination: true,
                    queryParams: {
                        NodeKey: nodekey
                    },
                    idField: 'Key',
                    columns: [_columns],
                    sortName: 'Sort',
                    sortOrder: 'asc',
                    rowContextMenus: [
                            { text: function (e, rowIndex, rowData, eventData) {
                                for (var key in rowData) {
                                    return "编辑：" + rowData[key];
                                }
                            },
                                iconCls: "icon-edit",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.lorelibs.LoreList_aspx.editLore(rowData.Key);
                                }
                            },
                            { text: function (e, rowIndex, rowData, eventData) {
                                for (var key in rowData) {
                                    return "删除：" + rowData[key];
                                }
                            },
                                iconCls: "icon-no",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.lorelibs.LoreList_aspx.delLore(rowData.Key);
                                }
                            }
                        ],
                    toolbar: [{
                        id: 'btnadd',
                        text: '添加',
                        iconCls: 'icon-create',
                        handler: function () {
                            $.plugin.showDialog({
                                title: "添加知识",
                                href: "Views/LoreLibs/LoreAdd.aspx?nodekey=" + nodekey,
                                onSave: function (dialog) {
                                    var verifyResult = $(dialog).form("validate");
                                    if (!verifyResult) { return false };
                                    var lore = $(dialog).form('getData');
                                    $.extend(lore, { NodeKey: nodekey });
                                    var con = dialog.find(".combo-f");
                                    for (var i = 0; i < con.length; i++) {
                                        var combo = $(con[i]);
                                        if (combo.combo("options").multiple) {
                                            var cname = combo.attr("comboname");
                                            lore[cname] = String(combo.combo("getValues"));
                                        }
                                    }
                                    var _callback = function (success) {
                                        if (success) {
                                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                                            $.plugin.showMessage("添加知识成功。");

                                        } else {
                                            $.plugin.showMessage("添加知识失败。");
                                        }
                                    };
                                    window.lorelibs.lore.addLore(lore, _callback);
                                },
                                width: 900,
                                height: 120,
                                onLoad: function () {
                                    window.lorelibs.LoreList_aspx.dialog = this;
                                }
                            });
                        }
                    }, '-', {
                        id: 'btncut',
                        text: '删除',
                        iconCls: 'icon-no',
                        handler: function () {
                            var keys = [];
                            var rows = $('#Grid', ajaxContainerSelector).datagrid('getChecked');
                            if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                            else {
                                for (var i = 0; i < rows.length; i++) {
                                    keys.push(rows[i].Key);
                                }
                                window.lorelibs.LoreList_aspx.delLore(keys.join(','));
                            }
                        }
                    }, '-', {
                        id: 'btncut',
                        text: '刷新',
                        iconCls: 'icon-refresh',
                        handler: function () {
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        }
                    }]
                };
                $("#Grid", ajaxContainerSelector).datagrid(options);
            });
        };
        var _bindButtonEvent = function () {

        };
        _bindControl();
        _bindButtonEvent();


        window.lorelibs.LoreList_aspx.editLore = function (key) {
            $.plugin.showDialog({
                title: "编辑知识",
                href: "Views/LoreLibs/LoreUpdate.aspx?key=" + key,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var lore = $(dialog).form('getData');
                    $.extend(lore, { MainKey: key });
                    var con = dialog.find(".combo-f");
                    for (var i = 0; i < con.length; i++) {
                        var combo = $(con[i]);
                        if (combo.combo("options").multiple) {
                            var cname = combo.attr("comboname");
                            lore[cname] = String(combo.combo("getValues"));
                        }
                    }
                    var _callback = function (success) {
                        if (success) {
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                            $.plugin.showMessage("编辑知识成功。");

                        } else {
                            $.plugin.showMessage("编辑知识失败。");
                        }
                    };
                    window.lorelibs.lore.updateLore(lore, _callback);
                },
                width: 920,
                height: 120,
                onLoad: function () {
                    window.lorelibs.LoreList_aspx.dialog = this;
                }
            });
        }

        window.lorelibs.LoreList_aspx.delLore = function (keys) {
            $.plugin.messager.confirm("提示", "点击确定将删除此条记录<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除知识成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除知识失败。");
                        }
                    };
                    window.lorelibs.lore.deleteLore(keys, _callback);
                }
            });
        }

        window.lorelibs.LoreList_aspx.moveLoreUp = function (key) {
            var param = { MainKey: key, Point: 0 };
            window.lorelibs.lore.moveLore(param, function (success) {
                if (success) {
                    $("#Grid", ajaxContainerSelector).datagrid('reload');
                }
            });

        }

        window.lorelibs.LoreList_aspx.moveLoreDown = function (key) {
            var param = { MainKey: key, Point: 1 };
            window.lorelibs.lore.moveLore(param, function (success) {
                if (success) {
                    $("#Grid", ajaxContainerSelector).datagrid('reload');
                }
            });
        }
    };
})(jQuery);