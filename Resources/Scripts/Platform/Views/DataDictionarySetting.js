/*
==============================================================================
//  数据字典设置页面 DataDictionarySetting.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.DataDictionarySetting_aspx) { window.platform.DataDictionarySetting_aspx = new Object(); }
    
    window.platform.DataDictionarySetting_aspx.initPage = function (ajaxContainerSelector) {
        window.platform.DataDictionarySetting_aspx.ajaxContainerSelector = ajaxContainerSelector;
        ///////////////////////////////////////////////////////////////////
        var _treeInit = function () {
            $("#Tree", ajaxContainerSelector).tree({
                nowrap: true,
                animate: true,
                onSelect: function (node) {
                    var param = {
                        name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); },
                        masterKey: function () {
                            if (node.id == $("#Tree", ajaxContainerSelector).tree('getRoot').id) {
                                return '-1';
                            }
                            return node.id;
                        }
                    };
                    $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                    $("#Grid", ajaxContainerSelector).datagrid('load', param);
                },
                moveMenu: { up: true, upLevel: false, down: true, downLevel: false },
                nodeContextMenus: [
                        { text: "添加", iconCls: "icon-create", handler: _addMaster },
                        { text: function (e, tree, node) { return "编辑 " + node.text; }, iconCls: "icon-edit", handler: function (e, tree, node) { _editMaster(node); } },
                        { text: function (e, tree, node) { return "删除 " + node.text; }, iconCls: "icon-no", handler: function (e, tree, node) { _delMaster(node); } },
                        { text: "刷新", iconCls: "icon-refresh", handler: _loadTreeData }
                    ],
                onDrop: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    _moveMaster(node.id, source.id);
                }
            });
            _loadTreeData();
        };
        var typedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/LoadMasterTreeData");
        var _typeFormatter = function (value) {
            for (var i = 0; i < typedata.length; i++) {
                if (typedata[i].Key == value) return typedata[i].Name;
            }
            return "";
        }
        var _gridInit = function () {
            $("#Grid", ajaxContainerSelector).datagrid({
                border: false,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                fit: true,
                rownumbers: true,
                fitColumns: true,
                nowrap: true,
                url: window.resolveUrl('Services/Platform/DataDictionaryService.asmx/LoadDetailGridData'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); },
                    masterKey: '-1'
                },
                idField: 'ID',
                columns: [[
                { field: 'ck', checkbox: true },
				{ field: 'Name', title: '名称', width: 150, sortable: true },
                { field: 'Code', title: '编号', width: 150, sortable: true },
                { field: 'Label', title: '标签', width: 150, sortable: true },
                { field: 'Value', title: '值', width: 150, sortable: true },
                { field: 'MainKey', title: '类别', width: 150, sortable: true, formatter: _typeFormatter },
                { field: 'IntValue', title: '对应的int值', width: 150, sortable: true,hidden:true },
                { field: 'Description', title: '描述', width: 150, sortable: true },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.platform.DataDictionarySetting_aspx.editDetail(\'' + rowData.ID + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.platform.DataDictionarySetting_aspx.delDetail(\'' + rowData.ID + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan);
                        return div.html();
                    }
                }
			]],
                sortName: 'Sort',
                sortOrder: 'asc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.DataDictionarySetting_aspx.editDetail(rowData.ID);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.DataDictionarySetting_aspx.delDetail(rowData.ID, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加数据字典",
                            href: "Views/Platform/DataDictionaryDetailAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var datadictionary = $(dialog).form('getData');
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加数据字典成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加数据字典失败。");
                                    }
                                };
                                window.platform.datadictionary.addDetailData(datadictionary, _callback);
                            },
                            width: 900,
                            height: 460
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
                                ids.push(rows[i].ID);
                                names.push(rows[i].Name);
                            }
                            window.platform.DataDictionarySetting_aspx.delDetail(ids.join(','), names.join(','));
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
            $("#a_add", ajaxContainerSelector).click(_addMaster);
            $("#a_update", ajaxContainerSelector).click(function () {
                var node = $("#Tree", ajaxContainerSelector).tree('getSelected');
                _editMaster(node);
            });
            $("#a_del", ajaxContainerSelector).click(function () {
                var node = $("#Tree", ajaxContainerSelector).tree('getSelected');
                _delMaster(node);
            });
            $("#a_refresh", ajaxContainerSelector).click(_loadTreeData);
        }
        var _loadTreeData = function (callback) {
            window.platform.datadictionary.getMasterTreeData(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                if ($.isFunction(callback)) { callback.call(this); }
            });
        };
        var _addMaster = function () {
            $.plugin.showDialog({
                title: "添加数据字典类别",
                href: "Views/Platform/DataDictionaryMasterAdd.aspx",
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var datadictionary = $(dialog).form('getData');
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("添加数据字典类别成功。");
                            var oldnode = $("#Tree", ajaxContainerSelector).tree('getSelected');
                            _loadTreeData(function () {
                                if (oldnode) {
                                    var node = $("#Tree", ajaxContainerSelector).tree('find', oldnode.id);
                                    $("#Tree", ajaxContainerSelector).tree('select', node.target);
                                }
                            });
                        } else {
                            $.plugin.showMessage("添加数据字典类别失败。");
                        }
                    };
                    window.platform.datadictionary.addMasterData(datadictionary, _callback);
                },
                width: 650,
                height: 275
            });
        }
        var _editMaster = function (node) {
            if (!node || node.id == $("#Tree").tree('getRoot').id) { return; }
            $.plugin.showDialog({
                title: "编辑数据字典类别",
                href: "Views/Platform/DataDictionaryMasterUpdate.aspx?key=" + node.id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    if (window.platform.DataDictionaryMasterUpdate_aspx.isFrozen) {
                        $.plugin.showMessage("该数据字典类别被冻结，不允许编辑!");
                    }
                    var datadictionary = $(dialog).form('getData');
                    $.extend(datadictionary, { Key: node.id });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("编辑数据字典类别成功。");
                            var oldnode = $("#Tree", ajaxContainerSelector).tree('getSelected');
                            _loadTreeData(function () {
                                if (oldnode) {
                                    var node = $("#Tree", ajaxContainerSelector).tree('find', oldnode.id);
                                    $("#Tree", ajaxContainerSelector).tree('select', node.target);
                                }
                            });

                        } else {
                            $.plugin.showMessage("编辑数据字典类别失败。");
                        }
                    };
                    window.platform.datadictionary.updateMasterData(datadictionary, _callback);
                },
                width: 650,
                height: 305
            });
        }
        var _delMaster = function (node) {
//            if (window.platform.DataDictionaryMasterUpdate_aspx.isFrozen) {
//                $.plugin.showMessage("该数据字典类别被冻结，不允许删除!");
//            }
            if (!node || node.id == $("#Tree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除数据字典类别成功。");
                            _loadTreeData();
                        } else {
                            //                            $.plugin.showMessage("删除数据字典类别失败。");
                            $.plugin.showMessage("请先删除该字典类型下的所有字典条目，再删除该字典类型！");
                        }
                    };
                    window.platform.datadictionary.deleteMasterData(node.id, _callback);
                }
            });
        }

        var _moveMaster = function (targetId, sourseId, point) {
            var obj = {
                Target: targetId,
                Sourse: sourseId
            };
            window.platform.datadictionary.moveMasterData(obj);
        }
        _gridInit();
        _treeInit();
        _bindButtonEvent();


        window.platform.DataDictionarySetting_aspx.editDetail = function (id) {
            $.plugin.showDialog({
                title: "编辑数据字典",
                href: "Views/Platform/DataDictionaryDetailUpdate.aspx?id=" + id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    if (window.platform.DataDictionaryDetailUpdate_aspx.isFrozen) {
                        $.plugin.showMessage("该数据字典被冻结，不允许编辑!");
                    }
                    var datadictionary = $(dialog).form('getData');
                    $.extend(datadictionary, { Id: id });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("编辑数据字典成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("编辑数据字典失败。");
                        }
                    };
                    window.platform.datadictionary.updateDetailData(datadictionary, _callback);
                },
                width: 900,
                height: 490
            });
        }
        window.platform.DataDictionarySetting_aspx.delDetail = function (ids, names) {
//            if (window.platform.DataDictionaryDetailUpdate_aspx.isFrozen) {
//                $.plugin.showMessage("该数据字典被冻结，不允许删除!");
//            }
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除数据字典成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除数据字典失败。");
                        }
                    };
                    window.platform.datadictionary.deleteDetailData(ids, _callback);
                }
            });
        }

    };
})(jQuery);