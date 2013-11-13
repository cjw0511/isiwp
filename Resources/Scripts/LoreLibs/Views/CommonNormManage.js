/*
==============================================================================
//  通用指标管理页面 CommonNormManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.CommonNormManage_aspx) { window.lorelibs.CommonNormManage_aspx = new Object(); }
    window.lorelibs.CommonNormManage_aspx.initPage = function (ajaxContainerSelector) {
        window.lorelibs.CommonNormManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var tempTier = 0;
        var _bindControl = function () {
            $("#selGrade", ajaxContainerSelector).combobox({
                valueField: 'Value',
                textField: "Name",
                onChange: function (newValue, oldValue) {
                    _loadUnitData();
                }
            });
            var gradedata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 39 });
            gradedata.unshift({ Value: -1, Name: '不限' });
            $("#selGrade", ajaxContainerSelector).combobox("loadData", gradedata).combobox("setValue", -1);

            $("#TierTree", ajaxContainerSelector).tree({
                animate: true,
                onSelect: function (node) {
                    _loadUnitData();
                }
            });

            _loadTierData();

            $("#UnitTree", ajaxContainerSelector).tree({
                moveMenu: { up: true, upLevel: false, down: true, downLevel: false },
                animate: true,
                onBeforeSelect: function (node) {
                    if (!$(this).tree("isLeaf", node.target)) {
                        return false;
                    }
                },
                onSelect: function (node) {
                    if (node.id == $(this).tree('getRoot').id) {
                        return;
                    }
                    var param = { UnitKey: node.id };
                    $("#Grid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/LoreLibs/NormService.asmx/GetPagingData');
                    $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                    $("#Grid", ajaxContainerSelector).datagrid('load', param);
                },
                onDrop: function (target, source, point) {
                    var t = $(this);
                    var node = t.tree("getNode", target);
                    _moveUnit(node.id, source.id);
                    var n = t.tree("find", source.id);
                    t.tree("select", n.target);
                }
            });

            $("#Grid", ajaxContainerSelector).datagrid({
                title: '要求项管理',
                fitColumns: true,
                border: false,
                rownumbers: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                fit: true,
                nowrap: false,
                pagination: true,
                idField: 'Key',
                columns: [[
                        { field: 'ck', checkbox: true },
                        { field: 'Name', title: '要求项', width: 100 },
                        { field: 'Process', title: '实施过程', width: 200 },
                        { field: 'Result', title: '预期结果', width: 200 }
                        ]],
                sortName: 'Sort',
                sortOrder: 'asc',
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        var unitNode = $("#UnitTree", ajaxContainerSelector).tree("getSelected");
                        if (!unitNode) {
                            $.plugin.showMessage("请选择单元!");
                            return;
                        }
                        $.plugin.showDialog({
                            title: "添加要求项",
                            href: "Views/LoreLibs/ItemAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var item = $(dialog).form('getData');
                                $.extend(item, { UnitKey: unitNode.id });
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加要求项成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加要求项失败。");
                                    }
                                };
                                window.lorelibs.norm.addItem(item, _callback);
                            },
                            width: 900,
                            height: 320
                        });
                    }
                }, '-', {
                    id: 'btnedit',
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        var rows = $('#Grid', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length != 1) { $.plugin.showMessage("请勾选表格中的一项进行编辑!"); return; }
                        var unitNode = $("#UnitTree", ajaxContainerSelector).tree("getSelected");
                        if (!unitNode) {
                            $.plugin.showMessage("请选择单元!");
                            return;
                        }
                        $.plugin.showDialog({
                            title: "编辑要求项",
                            href: "Views/LoreLibs/ItemUpdate.aspx?key=" + rows[0].Key,
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var item = $(dialog).form('getData');
                                $.extend(item, { Key: rows[0].Key, UnitKey: unitNode.id });
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("修改要求项成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("修改要求项失败。");
                                    }
                                };
                                window.lorelibs.norm.updateItem(item, _callback);
                            },
                            width: 900,
                            height: 320
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
                            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                                if (fn) {
                                    var callback = function (success) {
                                        if (success) {
                                            $.plugin.showMessage("删除要求项成功。");
                                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                                        } else {
                                            $.plugin.showMessage("删除要求项失败。");
                                        }
                                    };
                                    window.lorelibs.norm.deleteItem(ids.join(','), callback);
                                }
                            });
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
            });

        }

        var _bindButtonEvent = function () {
            $("#a_add", ajaxContainerSelector).click(_addTier);
            $("#a_update", ajaxContainerSelector).click(function () {
                var node = $("#TierTree", ajaxContainerSelector).tree('getSelected');
                _editTier(node);
            });
            $("#a_del", ajaxContainerSelector).click(function () {
                var node = $("#TierTree", ajaxContainerSelector).tree('getSelected');
                _delTier(node);
            });
            $("#a_refresh", ajaxContainerSelector).click(_loadTierData);

            $("#unit_add", ajaxContainerSelector).click(_addUnit);
            $("#unit_update", ajaxContainerSelector).click(function () {
                var node = $("#UnitTree", ajaxContainerSelector).tree('getSelected');
                _editUnit(node);
            });
            $("#unit_del", ajaxContainerSelector).click(function () {
                var node = $("#UnitTree", ajaxContainerSelector).tree('getSelected');
                _delUnit(node);
            });
            $("#unit_refresh", ajaxContainerSelector).click(_loadUnitData);
            $("#unit_up", ajaxContainerSelector).click(function () {
                var unitNode = $("#UnitTree", ajaxContainerSelector).tree("getSelected");
                if (!unitNode) {
                    $.plugin.showMessage("请选择单元!");
                    return;
                }
                var prevNode = $("#UnitTree", ajaxContainerSelector).tree("prevNode", unitNode.target);
                if (!prevNode) {
                    $.plugin.showMessage("该节点上面无节点，移动失败!");
                    return;
                }
                var param = {
                    source: unitNode.target,
                    target: prevNode.target,
                    point: "top"

                }
                $("#UnitTree", ajaxContainerSelector).tree("move", param);
            });
            $("#unit_down", ajaxContainerSelector).click(function () {
                var unitNode = $("#UnitTree", ajaxContainerSelector).tree("getSelected");
                if (!unitNode) {
                    $.plugin.showMessage("请选择单元!");
                    return;
                }
                var nextNode = $("#UnitTree", ajaxContainerSelector).tree("nextNode", unitNode.target);
                if (!nextNode) {
                    $.plugin.showMessage("该节点下面无节点，移动失败!");
                    return;
                }
                var param = {
                    source: unitNode.target,
                    target: nextNode.target,
                    point: "bottom"

                }
                $("#UnitTree", ajaxContainerSelector).tree("move", param);
            });
            $("#a_copy", ajaxContainerSelector).click(
                function () {
                    var tierNode = $("#TierTree", ajaxContainerSelector).tree("getSelected");
                    if (!tierNode) {
                        $.plugin.showMessage("请选择需要复制的层面!");
                        return;
                    }
                    else {
                        $.plugin.showDialog({
                            title: "复制单元和要求项",
                            href: "Views/LoreLibs/LoreUnitItemCopy.aspx?key=" + tierNode.id,
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var lorefield = $(dialog).form('getData');
                                $.extend(lorefield, { Key: tierNode.id });
                                $.extend(lorefield, { TradeKey: 0 });
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("复制成功。");
                                        _loadUnitData();
                                    } else {
                                        $.plugin.showMessage("复制失败。");
                                    };
                                };
                                window.lorelibs.norm.copyUnitItem(lorefield, _callback);
                            },
                            width: 500,
                            height: 130
                        });
                    }
                }
            )
        }
        //移动单元项
        var _moveUnit = function (targetId, sourseId) {
            var obj = {
                Target: targetId,
                Sourse: sourseId
            };
            window.lorelibs.norm.moveUnit(obj);
        }

        var _loadTierData = function () {
            var oldnode = $("#TierTree", ajaxContainerSelector).tree('getSelected');
            window.lorelibs.norm.getAllTier(function (data) {
                $("#TierTree", ajaxContainerSelector).tree("loadData", data);
                if (oldnode) {
                    var node = $("#TierTree", ajaxContainerSelector).tree('find', oldnode.id);
                    $("#TierTree", ajaxContainerSelector).tree('select', node.target);
                }
            });
        };

        var _loadUnitData = function () {
            var tierNode = $("#TierTree", ajaxContainerSelector).tree("getSelected");
            if (!tierNode || !$("#TierTree", ajaxContainerSelector).tree("isLeaf", tierNode.target)) {
                return;
            }
            var gradeKey = $("#selGrade", ajaxContainerSelector).combobox("getValue");
            tempTier = tierNode.id;
            var param = { TradeKey: 0, TierKey: tempTier, Grade: gradeKey };
            window.lorelibs.norm.getUnitByTradeKeyAndTierKey(param, function (data) {
                $("#UnitTree", ajaxContainerSelector).tree("loadData", data);
            });
        };

        var _addTier = function () {
            $.plugin.showDialog({
                title: "添加指标层面",
                href: "Views/LoreLibs/TierAdd.aspx",
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var tier = $(dialog).form('getData');
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("添加指标层面成功。");
                            _loadTierData();
                        } else {
                            $.plugin.showMessage("添加指标层面失败。");
                        }
                    };
                    window.lorelibs.norm.addTier(tier, _callback);
                },
                width: 900,
                height: 180
            });
        }

        var _editTier = function (node) {
            var ids = [];
            var roots = $("#TierTree", ajaxContainerSelector).tree('getRoots');
            for (var i = 0; i < roots.length; i++) {
                ids.push(roots[i].id);
            }
            if (!node || ids.contains(node.id)) {
                return;
            }
            $.plugin.showDialog({
                title: "编辑指标层面分类",
                href: "Views/LoreLibs/TierUpdate.aspx?key=" + node.id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var tier = $(dialog).form('getData');
                    $.extend(tier, { Key: node.id });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改指标层面成功。");
                            _loadTierData();
                        } else {
                            $.plugin.showMessage("修改指标层面失败。");
                        }
                    };
                    window.lorelibs.norm.updateTier(tier, _callback);
                },
                width: 900,
                height: 180
            });
        }

        var _delTier = function (node) {
            if (!node || node.id == $("#TierTree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + " 及该层面下所有单元和要求项<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除指标层面成功。");
                            window.lorelibs.norm.getAllTier(function (data) {
                                $("#TierTree", ajaxContainerSelector).tree("loadData", data);
                            });
                            tempTier = 0;
                            $("#UnitTree", ajaxContainerSelector).tree("reload");
                            $("#Grid", ajaxContainerSelector).datagrid("options").url = "";
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('load');
                        } else {
                            $.plugin.showMessage("删除指标层面失败。");
                        }
                    };
                    window.lorelibs.norm.deleteTier(node.id, _callback);
                }
            });
        }

        var _addUnit = function () {
            if (tempTier == 0) {
                return;
            }
            $.plugin.showDialog({
                title: "添加单元",
                href: "Views/LoreLibs/UnitAdd.aspx",
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var unit = $(dialog).form('getData');
                    $.extend(unit, { TradeKey: 0, TierKey: tempTier });
                    //                    alert(JSON.stringify(unit));
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("添加单元成功。");
                            var gradeKey = $("#selGrade", ajaxContainerSelector).combobox("getValue");
                            var param = { TradeKey: 0, TierKey: tempTier, Grade: gradeKey };
                            window.lorelibs.norm.getUnitByTradeKeyAndTierKey(param, function (data) {
                                $("#UnitTree", ajaxContainerSelector).tree("loadData", data);
                            });
                        } else {
                            $.plugin.showMessage("添加单元失败。");
                        }
                    };
                    window.lorelibs.norm.addUnit(unit, _callback);
                },
                width: 900,
                height: 350
            });
        }

        var _editUnit = function (node) {
            if (!node || node.id == $("#UnitTree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            if (tempTier == 0) {
                return;
            }
            $.plugin.showDialog({
                title: "编辑单元",
                href: "Views/LoreLibs/UnitUpdate.aspx?key=" + node.id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var unit = $(dialog).form('getData');
                    $.extend(unit, { Key: node.id, TradeKey: 0, TierKey: tempTier });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改单元成功。");
                            var gradeKey = $("#selGrade", ajaxContainerSelector).combobox("getValue");
                            var param = { TradeKey: 0, TierKey: tempTier, Grade: gradeKey };
                            window.lorelibs.norm.getUnitByTradeKeyAndTierKey(param, function (data) {
                                $("#UnitTree", ajaxContainerSelector).tree("loadData", data);
                            });
                        } else {
                            $.plugin.showMessage("修改单元失败。");
                        }
                    };
                    window.lorelibs.norm.updateUnit(unit, _callback);
                },
                width: 900,
                height: 350
            });
        }
        var _delUnit = function (node) {
            if (!node || node.id == $("#UnitTree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + " 及该单元下所有要求项<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除单元成功。");
                            _loadUnitData();
                            $("#Grid", ajaxContainerSelector).datagrid("options").url = "";
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('load');
                        } else {
                            $.plugin.showMessage("删除单元失败。");
                        }
                    };
                    window.lorelibs.norm.deleteUnit(node.id, _callback);
                }
            });
        }

        _bindControl();
        _bindButtonEvent();

    }
})(jQuery);