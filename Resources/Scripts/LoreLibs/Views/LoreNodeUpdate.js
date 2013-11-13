/*
==============================================================================
//  知识库类别编辑页面 LoreNodeUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreNodeUpdate_aspx) { window.lorelibs.LoreNodeUpdate_aspx = new Object(); }

    window.lorelibs.LoreNodeUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var nodekey = key.split("_")[1];
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        window.lorelibs.LoreNodeUpdate_aspx.isFrozen = false;
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["名称","Services/LoreLibs/LoreTypeService.asmx/AjaxValidateNode","Name",' + nodekey + ']']
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["编号","Services/LoreLibs/LoreTypeService.asmx/AjaxValidateNode","Code",' + nodekey + ']']
            });
//            $("#txtDescription", ajaxContainerSelector).validatebox({
//                validType: 'unnormal'
//            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            window.lorelibs.loretype.getAllLoreType(function (data) {
                $("#txtParentKey", ajaxContainerSelector).combotree("loadData", data);
            });
            window.lorelibs.loretype.getLoreNodeByKey(nodekey, function (lorenode) {
                $(ajaxContainerSelector).form('loadData', lorenode);
                window.lorelibs.LoreNodeUpdate_aspx.isFrozen = lorenode.IsFrozen;
                ///知识节点字段表格
                var options = {
                    border: false,
                    rownumbers: true,
                    singleSelect: true,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    fit: true,
                    nowrap: true,
                    remoteSort: false,
                    url: window.resolveUrl('Services/LoreLibs/LoreFieldService.asmx/GetPagingDataOfLoreNodeFieldMapping'),
                    pagination: true,
                    queryParams: {
                        NodeKey: lorenode.Key
                    },
                    idField: 'Key',
                    columns: [[
                            { field: 'ck', checkbox: true },
                            { field: 'MappingName', title: '名称', width: 300, sortable: true },
                            { field: 'opt', title: '操作', width: 80, align: 'center',
                                formatter: function (value, rowData, rowIndex) {
                                    var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.lorelibs.LoreNodeUpdate_aspx.editField(\'' + rowData.Key + '\');');
                                    var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.lorelibs.LoreNodeUpdate_aspx.delField(\'' + rowData.Key + '\',\'' + rowData.MappingName + '\');');
                                    var div = $("<div></div>").append(editbtn).append(delspan);
                                    return div.html();
                                }
                            }
                    	]],
                    rowContextMenus: [
                            { text: function (e, rowIndex, rowData, eventData) {
                                return "编辑：" + rowData.MappingName;
                            },
                                iconCls: "icon-edit",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.lorelibs.LoreNodeUpdate_aspx.editField(rowData.Key);
                                }
                            },
                            { text: function (e, rowIndex, rowData, eventData) {
                                return "删除：" + rowData.MappingName;
                            },
                                iconCls: "icon-no",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.lorelibs.LoreNodeUpdate_aspx.delField(rowData.Key, rowData.MappingName);
                                }
                            }
                        ],
                    toolbar: [{
                        id: 'btnadd',
                        text: '添加字段',
                        iconCls: 'icon-create',
                        handler: function () {
                            $.plugin.showDialog({
                                title: "添加字段",
                                href: "Views/LoreLibs/LoreNodeFieldMappingAdd.aspx",
                                onSave: function (dialog) {
                                    var verifyResult = $(dialog).form("validate");
                                    if (!verifyResult) { return false };
                                    var lorenodefield = $(dialog).form('getData');
                                    $.extend(lorenodefield, { NodeKey: nodekey });
                                    if (lorenodefield.FieldType == "0" && lorenodefield.MappingFieldKey.trim().length == 0) { return false; }
                                    if (lorenodefield.FieldType == "1" && lorenodefield.MappingNodeKey.trim().length == 0) { return false; }
                                    if (lorenodefield.MappingFieldKey.trim().length == 0) {
                                        lorenodefield.MappingFieldKey = 0;
                                    }
                                    if (lorenodefield.MappingNodeKey.trim().length == 0) {
                                        lorenodefield.MappingNodeKey = 0;
                                    }
                                    else {
                                        lorenodefield.MappingNodeKey = lorenodefield.MappingNodeKey.split("_")[1];
                                    }
                                    if (lorenodefield.MappingName.trim().length == 0) {
                                        if (lorenodefield.FieldType == "0")
                                            lorenodefield.MappingName = dialog.find("#selMappingField").combobox("getText");
                                        else {
                                            lorenodefield.MappingName = dialog.find("#selMappingNode").combobox("getText");
                                        }
                                    }
                                    var _callback = function (success) {
                                        if (success) {
                                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                                            $.plugin.showMessage("添加字段成功。");

                                        } else {
                                            $.plugin.showMessage("添加字段失败。");
                                        }
                                    };
                                    window.lorelibs.lorefield.addLoreNodeFieldMapping(lorenodefield, _callback);
                                },
                                width: 900,
                                height: 305
                            });
                        }
                    }, '-', {
                        id: 'btncut',
                        text: '删除字段',
                        iconCls: 'icon-no',
                        handler: function () {
                            var keys = [];
                            var names = [];
                            var rows = $('#Grid', ajaxContainerSelector).datagrid('getChecked');
                            if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                            else {
                                for (var i = 0; i < rows.length; i++) {
                                    keys.push(rows[i].Key);
                                    names.push(rows[i].MappingName);
                                }
                                window.lorelibs.LoreNodeUpdate_aspx.delField(keys.join(','), names.join(','));
                            }
                        }
                    }]
                };
                $("#Grid", ajaxContainerSelector).datagrid(options);
            });
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                if (window.lorelibs.LoreNodeUpdate_aspx.isFrozen) {
                    $.plugin.showMessage("该节点被冻结，不允许编辑!");
                }
                var lorenode = $(ajaxContainerSelector).form('getData');
                $.extend(lorenode, { Key: nodekey });
                $.extend(lorenode, { Description: "" });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("编辑类别成功。");
                        window.lorelibs.LoreTypeManage_aspx.refreshAfterAdd();
                    } else {
                        $.plugin.showMessage("编辑类别失败。");
                    }
                };
                window.lorelibs.loretype.updateLoreNode(lorenode, _callback);

            });
            $("#btnDelete", ajaxContainerSelector).click(function () {
                if (window.lorelibs.LoreNodeUpdate_aspx.isFrozen) {
                    $.plugin.showMessage("该节点被冻结，不允许删除!");
                }
                var node = $("#Tree", window.lorelibs.LoreTypeManage_aspx.ajaxContainerSelector).tree('find', key);
                $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除类别成功。");
                                window.lorelibs.LoreTypeManage_aspx.refreshAfterDelete();
                            } else {
                                $.plugin.showMessage("删除类别失败。");
                            }
                        };
                        window.lorelibs.loretype.deleteLoreNode(nodekey, _callback);
                    }
                });
            });
        };
        _bindControl();
        _bindButtonEvent();

        window.lorelibs.LoreNodeUpdate_aspx.editField = function (key) {
            $.plugin.showDialog({
                title: "编辑字段",
                href: "Views/LoreLibs/LoreNodeFieldMappingUpdate.aspx?key=" + key,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var lorenodefield = $(dialog).form('getData');
                    $.extend(lorenodefield, { Key: key });
                    if (lorenodefield.FieldType == "0" && lorenodefield.MappingFieldKey.trim().length == 0) { $.plugin.showMessage("请选择知识库字段类型。"); return false; }
                    if (lorenodefield.FieldType == "1" && lorenodefield.MappingNodeKey.trim().length == 0) { $.plugin.showMessage("请选择知识节点类型。"); return false; }
                    if (lorenodefield.MappingFieldKey.trim().length == 0) {
                        lorenodefield.MappingFieldKey = 0;
                    }
                    if (lorenodefield.MappingNodeKey.trim().length == 0) {
                        lorenodefield.MappingNodeKey = 0;
                    }
                    else {
                        lorenodefield.MappingNodeKey = lorenodefield.MappingNodeKey.split("_")[1];
                    }
                    if (lorenodefield.MappingName.trim().length == 0) {
                        if (lorenodefield.FieldType == "0")
                            lorenodefield.MappingName = dialog.find("#selMappingField").combobox("getText");
                        else {
                            lorenodefield.MappingName = dialog.find("#selMappingNode").combobox("getText");
                        }
                    }
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("编辑字段成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');

                        } else {
                            $.plugin.showMessage("编辑字段失败。");
                        }
                    };
                    window.lorelibs.lorefield.updateLoreNodeFieldMapping(lorenodefield, _callback);
                },
                width: 900,
                height: 305
            });
        };
        window.lorelibs.LoreNodeUpdate_aspx.delField = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除字段成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除字段失败。");
                        }
                    };
                    window.lorelibs.lorefield.deleteLoreNodeFieldMapping(keys, _callback);
                }
            });
        }
    };
})(jQuery);