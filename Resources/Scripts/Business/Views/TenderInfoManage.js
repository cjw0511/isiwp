/*
==============================================================================
//  招标信息管理管理页面 TenderInfoManage.aspx 的页面控制层代码。
==============================================================================
//*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.TenderInfoManage_aspx) { window.business.TenderInfoManage_aspx = new Object(); }
    window.business.TenderInfoManage_aspx.initPage = function (ajaxContainerSelector) {
        window.business.TenderInfoManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {

            $("#selTenderStatus1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name"
            });
            var tenderTypedata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 45 });
            tenderTypedata.unshift({ Key: -1, Name: '全部' });
            $("#selTenderStatus1", ajaxContainerSelector).combobox("loadData", tenderTypedata).combobox("setValue", -1);

            var _TSFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 45 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }

            $("#selTenderType1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name"
            });
            var tenderTypedata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 46 });
            tenderTypedata.unshift({ Key: -1, Name: '全部' });
            $("#selTenderType1", ajaxContainerSelector).combobox("loadData", tenderTypedata).combobox("setValue", -1);

            var _TTFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 46 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
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
                url: window.resolveUrl('Services/Business/TenderInfoService.asmx/LoadGridDataOfTenderInfo'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    TenderStatus: function () { return $("#selTenderStatus1", ajaxContainerSelector).combobox("getValue"); },
                    TenderType: function () { return $("#selTenderType1", ajaxContainerSelector).combobox("getValue"); },
                    ProxyOran: function () { return $("#txtProxyOran1", ajaxContainerSelector).val().trim(); },
                    Name: function () { return $("#txtName1", ajaxContainerSelector).val().trim(); }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '名称', width: 150, sortable: true}]],
                columns: [[
                { field: 'OffDate', title: '报名截止时间', width: 120, sortable: true, formatter: function (value) { return value.toDate().format() } },
                { field: 'TenderType', title: '招标类型', width: 90, sortable: true, formatter: _TTFormatter },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.TenderInfoManage_aspx.delTenderInfo(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(delspan);
                        return div.html();
                    }
                }
			]],
                animate: true,
                onSelect: function (rowIndex, rowData) {
                    window.business.tenderInfo.getTenderInfoByKey(rowData.Key, function (tenderInfo) {
                        $(ajaxContainerSelector).form('loadData', tenderInfo);
                        // 回显编辑页面的计划项目
                        $("#PlanProjectKey", ajaxContainerSelector).val(tenderInfo.PlanProjectKey);
                        if (tenderInfo.PlanProjectKey != '0' && tenderInfo.PlanProjectKey != undefined) {
                            window.business.planProject.getPlanProjectByKey(tenderInfo.PlanProjectKey, function (planProject) {
                                if (planProject)
                                    $("#txtPlanProject", ajaxContainerSelector).searchbox("setValue", planProject.Name);
                                $("#txtPlanProject", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }
                    });
                    _bindRecordInit(rowData.Key, rowData.Name);
                    $("#txtName", ajaxContainerSelector).validatebox({
                        required: true,
                        validType: ['name', 'updateValidate["名称","Services/Business/TenderInfoService.asmx/AjaxValidate","Name",' + rowData.Key + ']']
                    });
//                    $("#txtCode", ajaxContainerSelector).validatebox({
//                        validType: ['code', 'updateValidate["编号","Services/Business/TenderInfoService.asmx/AjaxValidate","Code",' + rowData.Key + ']']
//                    });
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
                        window.business.TenderInfoManage_aspx.delTenderInfo(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加新招标信息",
                            href: "Views/Business/TenderInfoAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var tenderInfo = $(dialog).form('getData');
                                $.extend(tenderInfo, { TenderType: 0 });
                                $.extend(tenderInfo, { TenderStatus: 0 });
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加招标信息成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加招标信息失败。");
                                    };
                                };
                                window.business.tenderInfo.addTenderInfo(tenderInfo, _callback);
                            },
                            width: 900,
                            height: 500
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
                            window.business.TenderInfoManage_aspx.delTenderInfo(ids.join(','), names.join(','));
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
        ///定义编辑验证规则
        $("#txtOffDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtBidOpenDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtTenderTotal", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
//        $("#selTenderStatus", ajaxContainerSelector).combobox({
//            valueField: 'Key',
//            textField: "Name",
//            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
//            queryParams: { MainKey: 45 },
//            panelHeight: 100
//        });

        $("#selTenderType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 46 },
            panelHeight: 100
        });

        $("#txtTenderCenter", ajaxContainerSelector).validatebox({
            validType: 'name'
        });
        $("#txtProxyOran", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'name'
        });
        $("#txtContactName", ajaxContainerSelector).validatebox({
            validType: 'name'
        });
        $("#txtContactMode", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtTenderAddress", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtPlanProject", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#PlanProjectKey").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#PlanProjectKey").val(selections[0].Key);
                        $("#txtPlanProject").searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.business.showPlanProjectSelector(onEnterClick, selected);
            }
        });
        $("#txtPlanProject", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtPlanProject", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        
        // 初始投标列表
        var optionsRecord = {
            fit: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            border: false,
            rownumbers: true,
            nowrap: true,
            frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '投标项目名称', width: 120, sortable: true}]],
            columns: [[
                { field: 'BiddingStatus', title: '投标状态', width: 120, sortable: true },
                { field: 'BiddingDate', title: '投标时间', width: 150, sortable: true, formatter: function (value) { return value.toDate().format() } },
                { field: 'EmployeeKey', title: '我方负责人', width: 100, sortable: true },
                { field: 'opt', title: '操作', width: 80, align: 'center' }
			]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            toolbar: [{
                id: 'btnrefresh',
                text: '刷新',
                iconCls: 'icon-refresh',
                handler: function () {
                    $("#GridRecord", ajaxContainerSelector).datagrid('reload');
                }
            }]
        };
        $("#GridRecord", ajaxContainerSelector).datagrid(optionsRecord);
       

        // 投标列表
        var _bindRecordInit = function (key, name) {
            var _BSFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 47 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }
            var employeedata = $.plugin.getJsonDataRequestWebService("Services/Platform/EmployeeService.asmx/GetAllEmployee", null);
            var _employeeFormatter = function (value) {
                for (var i = 0; i < employeedata.length; i++) {
                    if (employeedata[i].Key == value) { return employeedata[i].Name; }
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
                url: window.resolveUrl('Services/Business/BiddingService.asmx/LoadGridDataOfBiddingByTenderKey'),
                queryParams: {
                    TenderKey: key
                },

                idField: 'Key',
                ffrozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '投标项目名称', width: 150, sortable: true}]],
                columns: [[
                { field: 'BiddingStatus', title: '投标状态', width: 120, sortable: true, formatter: _BSFormatter },
                { field: 'BiddingDate', title: '投标时间', width: 150, sortable: true },
                { field: 'EmployeeKey', title: '我方负责人', width: 100, sortable: true, formatter: _employeeFormatter },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.TenderInfoManage_aspx.editBidding(\'' + rowData.Key + '\');');
                        var div = $("<div></div>").append(editbtn);
                        return div.html();
                    }
                }
			]],
                pagination: true,
                toolbar: [{
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
        window.business.TenderInfoManage_aspx.editBidding = function (key) {
            window.addTab({ title: "投标管理", href: "Views/Business/BiddingManage.aspx?key=" + key, iconCls: '', closable: true, selected: true });
        }

        var _bindButtonEvent = function () {
            $("#panel", ajaxContainerSelector).panel({
                title: '招标信息记录',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#divLayout", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });

            $("#clear_PlanProject", ajaxContainerSelector).click(function () {
                $("#txtPlanProject", ajaxContainerSelector).searchbox('setValue', '');
                $("#PlanProjectKey", ajaxContainerSelector).val('');
            });

            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtName1", ajaxContainerSelector).val('');
                $("#txtProxyOran1", ajaxContainerSelector).val('');
                $("#selTenderStatus1", ajaxContainerSelector).combobox("setValue", "-1");
                $("#selTenderType1", ajaxContainerSelector).combobox("setValue", "-1");
            });

            // 编辑panel保存按钮
            $("#btnSave", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form('validate');
                if (!verifyResult) { return false; }
                var tenderInfo = $(ajaxContainerSelector).form('getData');
                var row = $("#Grid", ajaxContainerSelector).datagrid("getSelected");
                if (!row) {
                    $.plugin.showMessage("请在左边表格选择招标信息记录!");
                    return;
                }
                $.extend(tenderInfo, { Key: row.Key });
                $.extend(tenderInfo, { TenderType: 0 });
                $.extend(tenderInfo, { TenderStatus: 0 });
                var _callback = function (success) {
                    if (success) {
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                        $.plugin.showMessage("修改招标信息成功！");

                    } else {
                        $.plugin.showMessage("修改招标信息失败！");
                    }
                };
                window.business.tenderInfo.updateTenderInfo(tenderInfo, _callback);
            });

            // 编辑panel刷新按钮
            $("#btnRefresh", ajaxContainerSelector).click(function () {
                var row = $("#Grid", ajaxContainerSelector).datagrid("getSelected");
                if (!row) {
                    $.plugin.showMessage("请在左边表格选择招标信息记录!");
                    return;
                }
                window.business.tenderInfo.getTenderInfoByKey(row.Key, function (tenderInfo) {
                    $(ajaxContainerSelector).form('loadData', tenderInfo);
                    $("PlanProjectKey", ajaxContainerSelector).val(tenderInfo.PalnProjectKey);
                    if (tenderInfo.PlanProjectKey != '0' && tenderInfo.PlanProjectKey != undefined) {
                        window.business.planProject.getPlanProjectByKey(tenderInfo.PlanProjectKey, function (planProject) {
                            if (planProject)
                                $("#txtPlanProject", ajaxContainerSelector).searchbox("setValue", planProject.Name);
                            $("#txtPlanProject", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                        });
                    }
                });
            });
        };

        _bindControl();
        _bindButtonEvent();

        window.business.TenderInfoManage_aspx.delTenderInfo = function (keys, names) {
            $.plugin.messager.confirm("提示", "该操作将会同时删除相关的投标信息，点击确定将删除<b>" + names + "</b><br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除招标信息成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除招标信息失败。");
                        }
                    };
                    window.business.tenderInfo.deleteTenderInfo(keys, _callback);
                }
            });
        }

    };

})(jQuery);
