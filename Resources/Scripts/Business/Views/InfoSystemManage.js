/*
==============================================================================
//  信息系统管理页面 InfoStystemManage.aspx 的页面控制层代码。
==============================================================================
//*/

(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.InfoSystemManage_aspx) { window.business.InfoSystemManage_aspx = new Object(); }
    window.business.InfoSystemManage_aspx.initPage = function (ajaxContainerSelector) {
        window.business.InfoSystemManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {

            $("#selInfoSystemType1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name"
            });

            var infoSystemTypedata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 35 });
            infoSystemTypedata.unshift({ Key: -1, Name: '全部' });

            $("#selInfoSystemType1", ajaxContainerSelector).combobox("loadData", infoSystemTypedata).combobox("setValue", -1);

            var _infoSysFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 35 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }

            var _plFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 42 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }

            var _customerFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Business/CustomerService.asmx/GetAllCustomer", null);
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) { return sexdata[i].Name; }
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
                url: window.resolveUrl('Services/Business/InfoSystemService.asmx/LoadGridDataOfInfoSystemManage'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    InfoSystemType: function () { return $("#selInfoSystemType1", ajaxContainerSelector).combobox("getValue"); },
                    Name: function () { return $("#txtName1", ajaxContainerSelector).val().trim(); }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '名称', width: 130, sortable: true}]],
                columns: [[
                { field: 'ProtectionLevel', title: '等保级别', width: 90, sortable: true, formatter: _plFormatter },
                { field: 'CustomerKey', title: '所属客户', width: 110, sortable: true, formatter: _customerFormatter },
                { field: 'Manager', title: '客户方负责人', width: 110, sortable: true },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.InfoSystemManage_aspx.delInfoSystem(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(delspan);
                        return div.html();
                    }
                }
			]],
                animate: true,
                onSelect: function (rowIndex, rowData) {
                        window.business.infoSystem.getInfoSystemByKey(rowData.Key, function (infoSystem) {
                            $(ajaxContainerSelector).form('loadData', infoSystem);
                            // 回显编辑页面的客户
                            $("#CustomerKey", ajaxContainerSelector).val(infoSystem.CustomerKey);
                            if (infoSystem.CustomerKey != '0' && infoSystem.CustomerKey != undefined) {
                                window.business.customer.getCustomerByKey(infoSystem.CustomerKey, function (customer) {
                                    if (customer)
                                        $("#txtCustomer", ajaxContainerSelector).searchbox("setValue", customer.Name);
                                    $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                                });
                            }
                            });
                        _bindRecordInit(rowData.Key, rowData.Name);
                        $("#txtName", ajaxContainerSelector).validatebox({
                            required: true,
                            validType: ['name', 'updateValidate["名称","Services/Business/InfoSystemService.asmx/AjaxValidate","Name",' + rowData.Key + ']']
                        });
//                        $("#txtCode", ajaxContainerSelector).validatebox({
//                            required: true,
//                            validType: ['code', 'updateValidate["编号","Services/Business/InfoSystemService.asmx/AjaxValidate","Code",' + rowData.Key + ']']
//                        });
                },
                sortName: 'CreateDate',
                sortOrder: 'desc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.InfoSystemManage_aspx.delInfoSystem(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加新信息系统",
                            href: "Views/Business/InfoSystemAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var infoSystem = $(dialog).form('getData');
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加信息系统成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加信息系统失败。");
                                    };
                                };
                                window.business.infoSystem.addInfoSystem(infoSystem, _callback);
                            },
                            width: 900,
                            height: 400
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
                            window.business.InfoSystemManage_aspx.delInfoSystem(ids.join(','), names.join(','));
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
        };

        /// 定义编辑验证规则
        $("#txtShortName", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#selInfoSystemType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 35 },
            panelHeight: 100
        });

        $("#selBusiSafeLevel", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 40 },
            panelHeight: 100,
            onSelect: function (rowIndex, rowData) {
                _bindSel(rowIndex, rowData);
            }
        });

        $("#selSystemSafeLevel", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 41 },
            panelHeight: 100,
            onSelect: function (rowIndex, rowData) {
                _bindSel(rowIndex, rowData);
            }
        });

        $("#selProtectionLevel", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 42 },
            panelHeight: 100,
            onSelect: function (rowIndex, rowData) {
                _bindSel(rowIndex, rowData);
            }
        });

        // 验证客户
        $("#txtCustomer", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#CustomerKey").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#CustomerKey").val(selections[0].Key);
                        $("#txtCustomer").searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.business.showCustomerSelector(onEnterClick, selected);
            }
        });
        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });


        // 验证等保级别
        var _bindSel = function (rowIndex, rowData) {
            var busiSafeData = $("#selBusiSafeLevel", ajaxContainerSelector).combobox("getValue");
            var busiSafeData2 = window.platform.getDataDictionarySingleRecord({ MainKey: 40, Key: busiSafeData });
            var busiSafe = parseInt(busiSafeData2.Value);
            var systemSafeData = $("#selSystemSafeLevel", ajaxContainerSelector).combobox("getValue");
            var systemSafeData2 = window.platform.getDataDictionarySingleRecord({ MainKey: 41, Key: systemSafeData });
            var systemSafe = parseInt(systemSafeData2.Value);
            if (busiSafe >= systemSafe) {
                $("#selProtectionLevel", ajaxContainerSelector).combobox("setValue", busiSafeData);
            } else {
                $("#selProtectionLevel", ajaxContainerSelector).combobox("setValue", systemSafeData);
            }
        }

       // 初始测试列表
        var optionsRecord = {
            fit: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            border: false,
            rownumbers: true,
            nowrap: true,
            frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'EvaluateType', title: '测评类型', width: 120, sortable: true}]],
            columns: [[
                { field: 'EvaluateLevel', title: '测评定级', width: 100, sortable: true },
                { field: 'EvaluateDate', title: '测评时间', width: 100, sortable: true },
                { field: 'opt', title: '操作', width: 80, align: 'center' }
			]],
            toolbar: [{
                text: '添加',
                iconCls: 'icon-create'

            }, '-', {
                text: '删除',
                iconCls: 'icon-no'
            }, '-', {
                id: 'btnrefresh',
                text: '刷新',
                iconCls: 'icon-refresh',
                handler: function () {
                    $("#GridRecord", ajaxContainerSelector).datagrid('reload');
                }
            }]
        };
        $("#GridRecord", ajaxContainerSelector).datagrid(optionsRecord);

        // 测试记录表格
        var _bindRecordInit = function (key, name) {
            var _evalFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 38 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }
            var _levelFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 39 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }
            var InitRecord = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Business/InfoSystemService.asmx/LoadGridDataOfEvaluateRecord'),
                queryParams: {
                    InfoSystemKey: key
                },

                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'EvaluateType', title: '测评类型', width: 120, sortable: true, formatter: _evalFormatter}]],
                columns: [[
                { field: 'EvaluateLevel', title: '测评定级', width: 80, sortable: true, formatter: _levelFormatter },
                { field: 'EvaluateDate', title: '测评时间', width: 100, sortable: true, formatter: function (value) { return value.toDate().format() }},
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.InfoSystemManage_aspx.editInfoSystemEvaluateRecord(\'' + rowData.Key + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.InfoSystemManage_aspx.delInfoSystemEvaluateRecord(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan);
                        return div.html();
                    }
                }
			]],
                sortName: 'CreateDate',
                sortOrder: 'desc',
                pagination: true,
                rowContextMenus: [
                    { text: function (e, rowIndex, rowData, eventData) {
                        return "编辑：" + rowData.Name;
                    },
                        iconCls: "icon-edit",
                        handler: function (e, rowIndex, rowData, eventData) {
                            window.business.InfoSystemManage_aspx.editInfoSystemEvaluateRecord(rowData.Key);
                        }
                    },
                    { text: function (e, rowIndex, rowData, eventData) {
                        return "删除：" + rowData.Name;
                    },
                        iconCls: "icon-no",
                        handler: function (e, rowIndex, rowData, eventData) {
                            window.business.InfoSystemManage_aspx.delInfoSystemEvaluateRecord(rowData.Key, rowData.Name);
                        }
                    }
                ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加测评记录",
                            href: "Views/Business/InfoSystemEvaluateRecordAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var infoSystem = $(dialog).form('getData');
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加测评记录成功。");
                                        $("#GridRecord", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加测评记录失败。");
                                    };
                                };
                                window.business.infoSystem.addInfoSystemEvaluateRecord(infoSystem, _callback);
                            },
                            width: 920,
                            height: 420
                        });
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var ids = [];
                        var names = [];
                        var rows = $('#GridRecord', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].Key);
                                names.push(rows[i].Name);
                            }
                            window.business.InfoSystemManage_aspx.delInfoSystemEvaluateRecord(ids.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#GridRecord", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            };
            $("#GridRecord", ajaxContainerSelector).datagrid(InitRecord);

        };

        var _bindButtonEvent = function () {
            $("#panel", ajaxContainerSelector).panel({
                title: '信息系统记录',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#divLayout", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });
            $("#clear_Customer", ajaxContainerSelector).click(function () {
                $("#txtCustomer", ajaxContainerSelector).searchbox('setValue', '');
                $("#CustomerKey", ajaxContainerSelector).val('');
            });
            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtName1", ajaxContainerSelector).val('');
                $("#selInfoSystemType1", ajaxContainerSelector).combobox("setValue", "-1");
            });

            // 保存修改信息系统
            $("#btnSave", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form('validate');
                if (!verifyResult) { return false; }
                var infoSystem = $(ajaxContainerSelector).form('getData');
                var row = $("#Grid", ajaxContainerSelector).datagrid("getSelected");
                if (!row) {
                    $.plugin.showMessage("请在左边表格选择信息系统!");
                    return;
                }
                $.extend(infoSystem, { Key: row.Key });
                var _callback = function (success) {
                    if (success) {
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                        $.plugin.showMessage("修改信息系统信息成功！");

                    } else {
                        $.plugin.showMessage("修改信息系统信息失败！");
                    }
                };
                window.business.infoSystem.updateInfoSystem(infoSystem, _callback);
            });

            // 刷新修改信息系统
            $("#btnRefresh", ajaxContainerSelector).click(function () {
                var row = $("#Grid", ajaxContainerSelector).datagrid("getSelected");
                if (!row){
                    $.plugin.showMessage("请在左边表格选择信息系统!");
                    return;
                }
                window.business.infoSystem.getInfoSystemByKey(row.Key, function (infoSystem) {
                    $(ajaxContainerSelector).form('loadData', infoSystem);
                    // 回显编辑页面的客户
                    $("#CustomerKey", ajaxContainerSelector).val(infoSystem.CustomerKey);
                    if (infoSystem.CustomerKey != '0' && infoSystem.CustomerKey != undefined) {
                        window.business.customer.getCustomerByKey(infoSystem.CustomerKey, function (customer) {
                            if (customer)
                                $("#txtCustomer", ajaxContainerSelector).searchbox("setValue", customer.Name);
                            $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                        });
                    }
                });
            });
        };

        _bindControl();
        _bindButtonEvent();

        window.business.InfoSystemManage_aspx.delInfoSystem = function (keys, names) {
            $.plugin.messager.confirm("提示", "该操作将会同时删除相关的测评记录，点击确定将删除<b>" + names + "</b><br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除信息系统成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                            $("#GridRecord", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除信息系统失败。");
                        }
                    };
                    window.business.infoSystem.deleteInfoSystem(keys, _callback);
                }
            });
        }

        window.business.InfoSystemManage_aspx.editInfoSystemEvaluateRecord = function (key) {
            $.plugin.showDialog({
                title: "编辑测评记录",
                href: "Views/Business/InfoSystemEvaluateRecordUpdate.aspx?key=" + key,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var infoSystem = $(dialog).form('getData');
                    $.extend(infoSystem, { Key: key });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改测评记录成功。");
                            $("#GridRecord", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("修改测评记录失败。");
                        }
                    };
                    window.business.infoSystem.updateInfoSystemEvaluateRecord(infoSystem, _callback);
                },
                width: 920,
                height: 420
            });
        }

        window.business.InfoSystemManage_aspx.delInfoSystemEvaluateRecord = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除<b>此条测评记录</b><br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除测评记录成功。");
                            $("#GridRecord", ajaxContainerSelector).datagrid('clearSelections');
                            $("#GridRecord", ajaxContainerSelector).datagrid('clearChecked');
                            $("#GridRecord", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除测评记录失败。");
                        }
                    };
                    window.business.infoSystem.deleteInfoSystemEvaluateRecord(keys, _callback);
                }
            });
        }
    };
})(jQuery);
