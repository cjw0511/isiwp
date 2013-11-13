/*
==============================================================================
//  合同管理页面 ContractManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ContractManage_aspx) { window.business.ContractManage_aspx = new Object(); }
    window.business.ContractManage_aspx.initPage = function (ajaxContainerSelector) {
        var cusdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 37 });
        var _cusFormatter = function (value) {
            for (var i = 0; i < cusdata.length; i++) {
                if (cusdata[i].Value == value) return cusdata[i].Name;
            }
            return value;
        }

        ////搜索条件选择客户单位///////////////////////////////////////////
        $("#selCustomer2", ajaxContainerSelector).combogrid({
            title: '选择客户单位',
            fit: true,
            fitColumns: true,
            border: true,
            singleSelect: true,
            rownumbers: true,
            panelWidth: 430,
            panelHeight: 340,
            idField: 'Key',
            textField: 'Name',
            url: window.resolveUrl('Services/Business/CustomerService.asmx/LoadGridData'),
            queryParams: {
                Name: ""
            },
            columns: [[
                { field: 'Name', title: '客户名称', width: 250, sortable: true },
                { field: 'CustomerType', title: '客户类型', width: 50, sortable: true, formatter: _cusFormatter }
			    ]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true

        });

        $("#selContractType2", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name"
        });

        var data = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 43 });
        data.unshift({ Key: -1, Name: '全部' });
        $("#selContractType2", ajaxContainerSelector).combobox("loadData", data).combobox("setValue", -1);

        var _bindControl = function () {

            var typedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 43 });
            var _contractTypeFormatter = function (value) {
                for (var i = 0; i < typedata.length; i++) {
                    if (typedata[i].Key == value) { return typedata[i].Name; }
                }
                return value;
            }

            var biddingdata = $.plugin.getJsonDataRequestWebService("Services/Business/BiddingService.asmx/GetAllBidding", null);
            var _biddingFormatter = function (value) {
                for (var i = 0; i < biddingdata.length; i++) {
                    if (biddingdata[i].Key == value) { return biddingdata[i].Name; }
                }
                return value;
            }

            var projectdata = $.plugin.getJsonDataRequestWebService("Services/Business/PlanProjectService.asmx/GetAllPlanProject", null);
            var _projectFormatter = function (value) {
                for (var i = 0; i < projectdata.length; i++) {
                    if (projectdata[i].Key == value) { return projectdata[i].Name; }
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
                url: window.resolveUrl('Services/Business/ContractService.asmx/LoadGridDataOfContractManage'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    Name: function () { return $("#txtContractName2", ajaxContainerSelector).val().trim(); },
                    Type: function () { return $("#selContractType2", ajaxContainerSelector).combotree("getValue"); },
                    CustKey: function () { var key = $("#selCustomer2", ajaxContainerSelector).combotree("getValue"); if (key.isNullOrWhiteSpace()) { key = -1 } return key; }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '合同名称', width: 150, sortable: true }]],
                columns: [[
				{ field: 'BiddingKey', title: '关联投标', width: 150, sortable: true, formatter: _biddingFormatter },
				{ field: 'ContractType', title: '合同类型', width: 90, sortable: true, formatter: _contractTypeFormatter },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {

                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.ContractManage_aspx.delContract(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(delspan);
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
                        window.business.ContractManage_aspx.editContract(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.ContractManage_aspx.delContract(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加合同信息",
                            href: "Views/Business/ContractAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var contract = $(dialog).form('getData');

                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加合同信息成功。");
                                        $("#ContractGrid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加合同信息失败。");
                                    };
                                };
                                window.business.contract.addContract(contract, _callback);
                            },
                            width: 920,
                            height: 650
                        });

                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var ids = [];
                        var names = [];
                        var rows = $('#ContractGrid', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].Key);
                                names.push(rows[i].Name);
                            }
                            window.business.ContractManage_aspx.delContract(ids.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#ContractGrid", ajaxContainerSelector).datagrid('reload');
                    }
                }],
                onSelect: function (rowIndex, rowData) {
                    window.business.contract.getContractByKey(rowData.Key, function (contract) {

                        $("#txtName1", ajaxContainerSelector).validatebox({
                            required: true,
                            validType: ['name', 'updateValidate["合同名称","Services/Business/ContractService.asmx/ajaxAddValid","Name",' + rowData.Key + ']']
                        });

                        $("#txtCode1", ajaxContainerSelector).validatebox({
                            required: true,
                            validType: ['code', 'updateValidate["编号","Services/Business/ContractService.asmx/ajaxAddValid","Code",' + rowData.Key + ']']
                        });

//                        $("#CustomerKey5", ajaxContainerSelector).val(contract.CustomerKey);
//                        if (contract.CustomerKey != '0' && contract.CustomerKey != undefined) {
//                            window.business.customer.getCustomerByKey(contract.CustomerKey, function (customer) {
//                                if (customer)
//                                    $("#txtCustomer5", ajaxContainerSelector).searchbox("setValue", customer.Name);
//                                $("#txtCustomer5", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
//                            });
//                        }
//                        $("#PlanProjectKey5", ajaxContainerSelector).val(contract.PlanProjectKey);
//                        if (contract.PlanProjectKey != '0' && contract.PlanProjectKey != undefined) {
//                            window.business.planProject.getPlanProjectByKey(contract.PlanProjectKey, function (planProject) {
//                                if (planProject)
//                                    $("#txtPlanProject5", ajaxContainerSelector).searchbox("setValue", planProject.Name);
//                                $("#txtPlanProject5", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
//                            });
//                        }

                        $("#BiddingKey5", ajaxContainerSelector).val(contract.BiddingKey);
                        if (contract.BiddingKey != '0' && contract.BiddingKey != undefined) {
                            window.business.bidding.getBiddingByKey(contract.BiddingKey, function (bidding) {
                                if (bidding)
                                    $("#txtBidding5", ajaxContainerSelector).searchbox("setValue", bidding.Name);
                                $("#txtBidding5", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }

                        $("#EmployeeKey5", ajaxContainerSelector).val(contract.EmployeeKey);
                        if (contract.EmployeeKey != '0' && contract.EmployeeKey != undefined) {
                            window.platform.user.getUserByKey(contract.EmployeeKey, function (employee) {
                                if (employee)
                                    $("#txtEmployee5", ajaxContainerSelector).searchbox("setValue", employee.Name);
                                $("#txtEmployee5", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }

                        $("#WritersKey1", ajaxContainerSelector).val(contract.WritersKey);
                        if (contract.WritersKey != '0' && contract.WritersKey != undefined) {
                            window.platform.user.getUserByKey(contract.WritersKey, function (employee) {
                                if (employee)
                                    $("#txtWriter1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                                $("#txtWriter1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }

                        $("#SignKey1", ajaxContainerSelector).val(contract.SignKey);
                        if (contract.SignKey != '0' && contract.SignKey != undefined) {
                            window.platform.user.getUserByKey(contract.SignKey, function (employee) {
                                if (employee)
                                    $("#txtSigner1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                                $("#txtSigner1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }

                        $("#TransferKey1", ajaxContainerSelector).val(contract.TransferKey);
                        if (contract.TransferKey != '0' && contract.TransferKey != undefined) {
                            window.platform.user.getUserByKey(contract.TransferKey, function (employee) {
                                if (employee)
                                    $("#txtTransfer1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                                $("#txtTransfer1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }

                        $("#ReceiveKey1", ajaxContainerSelector).val(contract.ReceiveKey);
                        if (contract.ReceiveKey != '0' && contract.ReceiveKey != undefined) {
                            window.platform.user.getUserByKey(contract.ReceiveKey, function (employee) {
                                if (employee)
                                    $("#txtReceive1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                                $("#txtReceive1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }

                        $("#AuditKey1", ajaxContainerSelector).val(contract.AuditKey);
                        if (contract.AuditKey != '0' && contract.AuditKey != undefined) {
                            window.platform.user.getUserByKey(contract.AuditKey, function (employee) {
                                if (employee)
                                    $("#txtAudit1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                                $("#txtAudit1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }
                        $(ajaxContainerSelector).form('loadData', contract);
                    });
                }
            };
            $("#ContractGrid", ajaxContainerSelector).datagrid(options);

            ///定义验证规则
            $("#txtName1", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["合同名称","Services/Business/ContractService.asmx/ajaxAddValid","Name"]']
            });

            $("#txtCode1", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["编号","Services/Business/ContractService.asmx/ajaxAddValid","Code"]']
            });

//            $("#txtCustomer5", ajaxContainerSelector).searchbox({
//                searcher: function (value) {
//                    var selected = $("#CustomerKey5").val();
//                    var onEnterClick = function (datagrid, selections) {
//                        if (selections.length > 0) {
//                            $("#CustomerKey5").val(selections[0].Key);
//                            $("#txtCustomer5").searchbox("setValue", selections[0].Name);
//                        } else {
//                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                            return false;
//                        }
//                    };
//                    window.business.showCustomerSelector(onEnterClick, selected);
//                }
//            });
//            $("#txtCustomer5", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//            $("#txtCustomer5", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            $("#txtPlanProject5", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#PlanProjectKey5").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#PlanProjectKey5").val(selections[0].Key);
                            $("#txtPlanProject5").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showPlanProjectSelector(onEnterClick, selected);
                }
            });
            $("#txtPlanProject5", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtPlanProject5", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            $("#txtBidding5", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#BiddingKey5").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#BiddingKey5").val(selections[0].Key);
                            $("#txtBidding5").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showBiddingSelector(onEnterClick, selected);
                }
            });
            $("#txtBidding5", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtBidding5", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            $("#txtEmployee5", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#EmployeeKey5").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#EmployeeKey5").val(selections[0].Key);
                            $("#txtEmployee5").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtEmployee5", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtEmployee5", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            $("#txtIntoFileCode1", ajaxContainerSelector).validatebox({
//                required: true,
                validType: ['code', 'ajaxAddValid["编号","Services/Business/ContractService.asmx/ajaxAddValid","Code"]']
            });

            $("#txtIntoFileDate1", ajaxContainerSelector).datebox({
                required: true,
                validType: 'shortDate'
            });

            $("#selContractType1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 43 }
            });
            $("#selContractType1", ajaxContainerSelector).combobox("setValue", 0);

            $("#txtContractSum1", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'number'
            });

            $("#txtWriter1", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#WritersKey1").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#WritersKey1").val(selections[0].Key);
                            $("#txtWriter1").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtWriter1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtWriter1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            $("#txtSigner1", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#SignKey1").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#SignKey1").val(selections[0].Key);
                            $("#txtSigner1").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtSigner1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtSigner1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            $("#txtSignDate1", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });

            $("#txtSignTotal1", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'number'
            });

            $("#txtTransfer1", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#TransferKey1").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#TransferKey1").val(selections[0].Key);
                            $("#txtTransfer1").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtTransfer1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtTransfer1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            $("#txtReceive1", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#ReceiveKey1").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#ReceiveKey1").val(selections[0].Key);
                            $("#txtReceive1").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtReceive1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtReceive1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            $("#txtAudit1", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#AuditKey1").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#AuditKey1").val(selections[0].Key);
                            $("#txtAudit1").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtAudit1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtAudit1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            $("#txtStartDate1", ajaxContainerSelector).datebox({
                required: true,
                validType: 'shortDate'
            });

            $("#txtOffDate1", ajaxContainerSelector).datebox({
                required: true,
                validType: 'shortDate'
            });

            $("#txtSignTotal1", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'number'
            });

            $("#selIsValid1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 49 }
            });
            $("#selIsValid1", ajaxContainerSelector).combobox("setValue", 0);

            $("#selIsArchive1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 50 }
            });
            $("#selIsArchive1", ajaxContainerSelector).combobox("setValue", 0);

            $("#txtSummary1", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
        };
        var _bindButtonEvent = function () {
            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtContractName2", ajaxContainerSelector).val('');
                $("#selCustomer2", ajaxContainerSelector).combogrid("clear");
                $("#selContractType2", ajaxContainerSelector).combogrid("clear");
            });

            $("#ContractPanel, ajaxContainerSelector").panel({
                title: '合同信息管理',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#ContractLayout", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });

//            $("#a_clear", ajaxContainerSelector).click(function () {
//                $("#CustomerKey5", ajaxContainerSelector).val('0');
//                $("#txtCustomer5", ajaxContainerSelector).searchbox("setValue", "");
//            });
//            $("#b_clear", ajaxContainerSelector).click(function () {
//                $("#PlanProjectKey5", ajaxContainerSelector).val('0');
//                $("#txtPlanProject5", ajaxContainerSelector).searchbox("setValue", "");
//            });
            $("#c_clear", ajaxContainerSelector).click(function () {
                $("#BiddingKey5", ajaxContainerSelector).val('0');
                $("#txtBidding5", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#d_clear", ajaxContainerSelector).click(function () {
                $("#EmployeeKey5", ajaxContainerSelector).val('0');
                $("#txtEmployee5", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#e_clear", ajaxContainerSelector).click(function () {
                $("#WritersKey1", ajaxContainerSelector).val('0');
                $("#txtWriter1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#f_clear", ajaxContainerSelector).click(function () {
                $("#SignKey1", ajaxContainerSelector).val('0');
                $("#txtSigner1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#g_clear", ajaxContainerSelector).click(function () {
                $("#TransferKey1", ajaxContainerSelector).val('0');
                $("#txtTransfer1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#h_clear", ajaxContainerSelector).click(function () {
                $("#ReceiveKey1", ajaxContainerSelector).val('0');
                $("#txtReceive1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#i_clear", ajaxContainerSelector).click(function () {
                $("#AuditKey1", ajaxContainerSelector).val('0');
                $("#txtAudit1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#j_clear", ajaxContainerSelector).click(function () {
                $("#BiddingKey5", ajaxContainerSelector).val('0');
                $("#txtBidding5", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#btnSave", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form("validate");
                if (!verifyResult) { return false };

                var contract = $(ajaxContainerSelector).form('getData');
                var row = $("#ContractGrid", ajaxContainerSelector).datagrid("getSelected");
                if (!row) {
                    $.plugin.showMessage("请在左边表格选择跟进记录!");
                    return;
                }
                $.extend(contract, { Key: row.Key });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改合同信息成功。");
                        $("#ContractGrid", ajaxContainerSelector).datagrid('reload');
                    } else {
                        $.plugin.showMessage("修改合同信息失败。");
                    }
                };
                window.business.contract.updateContract(contract, _callback);
            });
        };
        _bindControl();
        _bindButtonEvent();

        window.business.ContractManage_aspx.editContract = function (key) {
            window.business.contract.getContractByKey(key, function (contract) {
                $("#txtName1", ajaxContainerSelector).validatebox({
                    required: true,
                    validType: ['name', 'updateValidate["合同名称","Services/Business/ContractService.asmx/ajaxAddValid","Name",' + key+ ']']
                });

                $("#txtCode1", ajaxContainerSelector).validatebox({
                    required: true,
                    validType: ['code', 'updateValidate["编号","Services/Business/ContractService.asmx/ajaxAddValid","Code",' + key + ']']
                });

//                $("#CustomerKey5", ajaxContainerSelector).val(contract.CustomerKey);
//                if (contract.CustomerKey != '0' && contract.CustomerKey != undefined) {
//                    window.business.customer.getCustomerByKey(contract.CustomerKey, function (customer) {
//                        if (customer)
//                            $("#txtCustomer5", ajaxContainerSelector).searchbox("setValue", customer.Name);
//                        $("#txtCustomer5", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
//                    });
//                }

//                $("#PlanProjectKey5", ajaxContainerSelector).val(contract.PlanProjectKey);
//                if (contract.PlanProjectKey != '0' && contract.PlanProjectKey != undefined) {
//                    window.business.planProject.getPlanProjectByKey(contract.PlanProjectKey, function (planProject) {
//                        if (planProject)
//                            $("#txtPlanProject5", ajaxContainerSelector).searchbox("setValue", planProject.Name);
//                        $("#txtPlanProject5", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
//                    });
//                }

                $("#BiddingKey5", ajaxContainerSelector).val(contract.BiddingKey);
                if (contract.BiddingKey != '0' && contract.BiddingKey != undefined) {
                    window.business.bidding.getBiddingByKey(contract.BiddingKey, function (bidding) {
                        if (bidding)
                            $("#txtBidding5", ajaxContainerSelector).searchbox("setValue", bidding.Name);
                        $("#txtBidding5", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }

                $("#EmployeeKey5", ajaxContainerSelector).val(contract.EmployeeKey);
                if (contract.EmployeeKey != '0' && contract.EmployeeKey != undefined) {
                    window.platform.user.getUserByKey(contract.EmployeeKey, function (employee) {
                        if (employee)
                            $("#txtEmployee5", ajaxContainerSelector).searchbox("setValue", employee.Name);
                        $("#txtEmployee5", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }

                $("#WritersKey1", ajaxContainerSelector).val(contract.WritersKey);
                if (contract.WritersKey != '0' && contract.WritersKey != undefined) {
                    window.platform.user.getUserByKey(contract.WritersKey, function (employee) {
                        if (employee)
                            $("#txtWriter1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                        $("#txtWriter1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }

                $("#SignKey1", ajaxContainerSelector).val(contract.SignKey);
                if (contract.SignKey != '0' && contract.SignKey != undefined) {
                    window.platform.user.getUserByKey(contract.SignKey, function (employee) {
                        if (employee)
                            $("#txtSigner1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                        $("#txtSigner1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }

                $("#TransferKey1", ajaxContainerSelector).val(contract.TransferKey);
                if (contract.TransferKey != '0' && contract.TransferKey != undefined) {
                    window.platform.user.getUserByKey(contract.TransferKey, function (employee) {
                        if (employee)
                            $("#txtTransfer1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                        $("#txtTransfer1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }

                $("#ReceiveKey1", ajaxContainerSelector).val(contract.ReceiveKey);
                if (contract.ReceiveKey != '0' && contract.ReceiveKey != undefined) {
                    window.platform.user.getUserByKey(contract.ReceiveKey, function (employee) {
                        if (employee)
                            $("#txtReceive1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                        $("#txtReceive1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }

                $("#AuditKey1", ajaxContainerSelector).val(contract.AuditKey);
                if (contract.AuditKey != '0' && contract.AuditKey != undefined) {
                    window.platform.user.getUserByKey(contract.AuditKey, function (employee) {
                        if (employee)
                            $("#txtAudit1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                        $("#txtAudit1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }

                $(ajaxContainerSelector).form('loadData', contract);
            });
        }
        window.business.ContractManage_aspx.delContract = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除<b><span style='color:red'>" + names + "</span></b><br /><br/>是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除合同成功。");
                            $("#ContractGrid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#ContractGrid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#ContractGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除合同失败。");
                        }
                    };
                    window.business.contract.deleteContract(keys, _callback);
                }
            });
        }
    };
})(jQuery);