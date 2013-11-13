/*
==============================================================================
//  投标信息管理管理页面 BiddingManage.aspx 的页面控制层代码。
==============================================================================
//*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.BiddingManage_aspx) { window.business.BiddingManage_aspx = new Object(); }
    window.business.BiddingManage_aspx.initPage = function (ajaxContainerSelector) {
        window.business.BiddingManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {

//            $("#selBiddingStatus1", ajaxContainerSelector).combobox({
//                valueField: 'Key',
//                textField: "Name"
//            });
//            var biddingStatusdata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 47 });
//            biddingStatusdata.unshift({ Key: -1, Name: '全部' });
//            $("#selBiddingStatus1", ajaxContainerSelector).combobox("loadData", biddingStatusdata).combobox("setValue", -1);

            var _BSFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 47 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }

            var _PTFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 36 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }

            var employeedata = $.plugin.getJsonDataRequestWebService("Services/Platform/UserService.asmx/GetAllUser", null);
            var _employeeFormatter = function (value) {
                for (var i = 0; i < employeedata.length; i++) {
                    if (employeedata[i].Key == value) { return employeedata[i].Name; }
                }
                return value;
            }

            $("#selPlanProjectKey1", ajaxContainerSelector).combogrid({
                title: '选择项目名称',
                fit: true,
                border: true,
                singleSelect: true,
                rownumbers: true,
                panelWidth: 430,
                panelHeight: 340,
                idField: 'Key',
                textField: 'Name',
                url: window.resolveUrl('Services/Business/PlanProjectService.asmx/LoadGridData'),
                queryParams: {
                    name: ""
                },
                columns: [[
                { field: 'Name', title: '计划项目名称', width: 250, sortable: true },
                { field: 'ProjectType', title: '项目类型', width: 50, sortable: true, formatter: _PTFormatter }
			    ]],
                sortName: 'CreateDate',
                sortOrder: 'desc',
                pagination: true
            });

            var options = {
                fit: true,
                fitColumns: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Business/BiddingService.asmx/LoadGridDataOfBidding'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
//                    BiddingStatus: function () { return $("#selBiddingStatus1", ajaxContainerSelector).combobox("getValue"); },
                    BiddingStatus: -1,
                    PlanProjectKey: function () { var key = $("#selPlanProjectKey1", ajaxContainerSelector).combotree("getValue"); if (key.isNullOrWhiteSpace()) { key = -1 } return key },
                    Name: function () { return $("#txtName1", ajaxContainerSelector).val().trim(); }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '名称', width: 150, sortable: true}]],
                columns: [[
                { field: 'BiddingDate', title: '投标时间', width: 90, sortable: true, formatter: function (value) { return value.toDate().format() } },
                { field: 'EmployeeKey', title: '投标负责人', width: 80, sortable: true, formatter: _employeeFormatter },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.BiddingManage_aspx.delBidding(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(delspan);
                        return div.html();
                    }
                }
			]],
                animate: true,
                onSelect: function (rowIndex, rowData) {
                    window.business.bidding.getBiddingByKey(rowData.Key, function (bidding) {
                        $("#PlanProjectKey", ajaxContainerSelector).val(bidding.PlanProjectKey);
                        if (bidding.PlanProjectKey != '0' && bidding.PlanProjectKey != undefined) {
                            window.business.planProject.getPlanProjectByKey(bidding.PlanProjectKey, function (planProject) {
                                if (planProject)
                                    $("#txtPlanProject", ajaxContainerSelector).searchbox("setValue", planProject.Name);
                            });
                        }
                        $("#EmployeeKey", ajaxContainerSelector).val(bidding.EmployeeKey);
                        if (bidding.EmployeeKey != '0' && bidding.EmployeeKey != undefined) {
                            window.platform.user.getUserByKey(bidding.EmployeeKey, function (employee) {
                                if (employee)
                                    $("#txtEmployee", ajaxContainerSelector).searchbox("setValue", employee.Name);
                            });
                        }
                        $("#TenderKey", ajaxContainerSelector).val(bidding.TenderKey);
                        if (bidding.TenderKey != '0' && bidding.TenderKey != undefined) {
                            window.business.tenderInfo.getTenderInfoByKey(bidding.TenderKey, function (tenderInfo) {
                                if (tenderInfo)
                                    $("#txtTenderInfo", ajaxContainerSelector).searchbox("setValue", tenderInfo.Name);
                            });
                        }
                        $(ajaxContainerSelector).form('loadData', bidding);

                        $("#txtName", ajaxContainerSelector).validatebox({
                            required: true,
                            validType: ['name', 'updateValidate["名称","Services/Business/BiddingService.asmx/AjaxValidate","Name",' + rowData.Key + ']']
                        });
                        $("#txtCode", ajaxContainerSelector).validatebox({
                            required: true,
                            validType: ['code', 'updateValidate["编号","Services/Business/BiddingService.asmx/AjaxValidate","Code",' + rowData.Key + ']']
                        });
                    });
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
                        window.business.BiddingManage_aspx.delBidding(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加新投标信息",
                            href: "Views/Business/BiddingAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var tenderInfo = $(dialog).form('getData');
                                $.extend(tenderInfo, { BiddingStatus: 1 });
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加投标信息成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加投标信息失败。");
                                    };
                                };
                                window.business.bidding.addBidding(tenderInfo, _callback);
                            },
                            width: 900,
                            height: 440
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
                            window.business.BiddingManage_aspx.delBidding(ids.join(','), names.join(','));
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

        $("#txtCode", ajaxContainerSelector).validatebox({
            // validType: ['code', 'updateValidate["编号","Services/Business/BiddingService.asmx/AjaxValidate","Code",' + rowData.Key + ']']
        });
        $("#txtBiddingDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });

        $("#txtBiddingTotal", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

//        $("#selBiddingStatus", ajaxContainerSelector).combobox({
//            valueField: 'Key',
//            textField: "Name",
//            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
//            queryParams: { MainKey: 47 },
//            panelHeight: 100
//        });

        $("#txtBiddingAddress", ajaxContainerSelector).validatebox({
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
        $("#txtPlanProject", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

        $("#txtEmployee", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#EmployeeKey").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#EmployeeKey").val(selections[0].Key);
                        $("#txtEmployee").searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.platform.showUserSelector(onEnterClick, selected);
            }
        });
        $("#txtEmployee", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtEmployee", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

        $("#txtTenderInfo", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#TenderKey").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#TenderKey").val(selections[0].Key);
                        $("#txtTenderInfo").searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.business.showTenderInfoSelector(onEnterClick, selected);
            }
        });
        $("#txtTenderInfo", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtTenderInfo", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtTenderInfo", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

        var _bindButtonEvent = function () {
            $("#panel", ajaxContainerSelector).panel({
                title: '投标信息记录',
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
            $("#clear_Employee", ajaxContainerSelector).click(function () {
                $("#txtEmployee", ajaxContainerSelector).searchbox('setValue', '');
                $("#EmployeeKey", ajaxContainerSelector).val('');
            });
            $("#clear_TenderInfo", ajaxContainerSelector).click(function () {
                $("#txtTenderInfo", ajaxContainerSelector).searchbox('setValue', '');
                $("#TenderKey", ajaxContainerSelector).val('');
            });

            // 保存编辑
            $("#btnSave", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form('validate');
                if (!verifyResult) { return false; }
                var bidding = $(ajaxContainerSelector).form('getData');
                var row = $("#Grid", ajaxContainerSelector).datagrid("getSelected");
                if (!row) {
                    $.plugin.showMessage("请在左边表格选择投标信息!");
                    return;
                }
                $.extend(bidding, { BiddingStatus: 1 });
                $.extend(bidding, { Key: row.Key });
                var _callback = function (success) {
                    if (success) {
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                        $.plugin.showMessage("修改投标信息成功！");

                    } else {
                        $.plugin.showMessage("修改投标信息失败！");
                    }
                };
                window.business.bidding.updateBidding(bidding, _callback);
            });

            // 刷新编辑
            $("#btnRefresh", ajaxContainerSelector).click(function () {
                var row = $("#Grid", ajaxContainerSelector).datagrid("getSelected");
                if (!row) {
                    $.plugin.showMessage("请在左边表格选择投标信息!");
                    return;
                }
                window.business.bidding.getBiddingByKey(row.Key, function (bidding) {
                    $(ajaxContainerSelector).form('loadData', bidding);
                    $("#PlanProjectKey", ajaxContainerSelector).val(bidding.PlanProjectKey);
                    if (bidding.PlanProjectKey != '0' && bidding.PlanProjectKey != undefined) {
                        window.business.planProject.getPlanProjectByKey(bidding.PlanProjectKey, function (planProject) {
                            if (planProject)
                                $("#txtPlanProject", ajaxContainerSelector).searchbox("setValue", planProject.Name);
                            $("#txtPlanProject", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                        });
                    }
                    $("#EmployeeKey", ajaxContainerSelector).val(bidding.EmployeeKey);
                    if (bidding.EmployeeKey != '0' && bidding.EmployeeKey != undefined) {
                        window.business.employee.getEmployeeByKey(bidding.EmployeeKey, function (employee) {
                            if (employee)
                                $("#txtEmployee", ajaxContainerSelector).searchbox("setValue", employee.Name);
                        });
                    }
                    $("#TenderKey", ajaxContainerSelector).val(bidding.TenderKey);
                    if (bidding.TenderKey != '0' && bidding.TenderKey != undefined) {
                        window.business.tenderInfo.getTenderInfoByKey(bidding.TenderKey, function (tenderInfo) {
                            if (tenderInfo)
                                $("#txtTenderInfo", ajaxContainerSelector).searchbox("setValue", tenderInfo.Name);
                        });
                    }
                });
            });

            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtName1", ajaxContainerSelector).val('');
//                $("#selBiddingStatus1", ajaxContainerSelector).combobox("setValue", "-1");
                $("#selPlanProjectKey1", ajaxContainerSelector).combogrid("clear");
            });
        };

        _bindControl();
        _bindButtonEvent();

        window.business.BiddingManage_aspx.delBidding = function (keys, names) {
            $.plugin.messager.confirm("提示", "该操作将会同时删除相关的合同信息，点击确定将删除<b>" + names + "</b><br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除投标信息成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除投标信息失败。");
                        }
                    };
                    window.business.bidding.deleteBidding(keys, _callback);
                }
            });
        }
    };
})(jQuery);
