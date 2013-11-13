/*
==============================================================================
//  合同信息添加页面 ContractAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ContractAdd_aspx) { window.business.ContractAdd_aspx = new Object(); }
    window.business.ContractAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["合同名称","Services/Business/ContractService.asmx/ajaxAddValid","Name"]']
            });

            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["编号","Services/Business/ContractService.asmx/ajaxAddValid","Code"]']
            });



//            $("#txtCustomer4", ajaxContainerSelector).searchbox({
//                searcher: function (value) {
//                    var selected = $("#CustomerKey4").val();
//                    var onEnterClick = function (datagrid, selections) {
//                        if (selections.length > 0) {
//                            $("#CustomerKey4").val(selections[0].Key);
//                            $("#txtCustomer4").searchbox("setValue", selections[0].Name);
//                        } else {
//                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                            return false;
//                        }
//                    };
//                    window.business.showCustomerSelector(onEnterClick, selected);
//                }
//            });
//            $("#txtCustomer4", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//            $("#txtCustomer4", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtCustomer4", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });




//            $("#txtPlanProject4", ajaxContainerSelector).searchbox({
//                searcher: function (value) {
//                    var selected = $("#PlanProjectKey4").val();
//                    var onEnterClick = function (datagrid, selections) {
//                        if (selections.length > 0) {
//                            $("#PlanProjectKey4").val(selections[0].Key);
//                            $("#txtPlanProject4").searchbox("setValue", selections[0].Name);
//                        } else {
//                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                            return false;
//                        }
//                    };
//                    window.business.showPlanProjectSelector(onEnterClick, selected);
//                }
//            });
//            $("#txtPlanProject4", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//            $("#txtPlanProject4", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtPlanProject4", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });



            $("#txtBidding4", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#BiddingKey4").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#BiddingKey4").val(selections[0].Key);
                            $("#txtBidding4").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showBiddingSelector(onEnterClick, selected);
                }
            });
            $("#txtBidding4", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtBidding4", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtBidding4", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });


            



            $("#txtEmployee4", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#EmployeeKey4").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#EmployeeKey4").val(selections[0].Key);
                            $("#txtEmployee4").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtEmployee4", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtEmployee4", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtEmployee4", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });



            $("#txtIntoFileCode", ajaxContainerSelector).validatebox({
//                required: true,
                validType: ['code', 'ajaxAddValid["编号","Services/Business/ContractService.asmx/ajaxAddValid","Code"]']
            });


            $("#txtIntoFileDate", ajaxContainerSelector).datebox({
                required:true,
                validType: 'shortDate'
            });


            $("#selContractType", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 43 }
            });
            $("#selContractType", ajaxContainerSelector).combobox("setValue", 0);

            $("#txtContractSum", ajaxContainerSelector).validatebox({
                required:true,
                validType: 'number'
            });


            $("#txtWriter", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#WritersKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#WritersKey").val(selections[0].Key);
                            $("#txtWriter").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtWriter", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtWriter", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtWriter", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });



            $("#txtSigner", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#SignKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#SignKey").val(selections[0].Key);
                            $("#txtSigner").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtSigner", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtSigner", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtSigner", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });



            $("#txtSignDate", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });


            $("#txtSignTotal", ajaxContainerSelector).validatebox({
                required:true,
                validType: 'number'
            });



            $("#txtTransfer", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#TransferKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#TransferKey").val(selections[0].Key);
                            $("#txtTransfer").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtTransfer", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtTransfer", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtTransfer", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

            $("#txtReceive", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#ReceiveKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#ReceiveKey").val(selections[0].Key);
                            $("#txtReceive").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtReceive", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtReceive", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtReceive", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });


            $("#txtAudit", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#AuditKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#AuditKey").val(selections[0].Key);
                            $("#txtAudit").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtAudit", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtAudit", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtAudit", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });


            $("#txtStartDate", ajaxContainerSelector).datebox({
                required:true,
                validType: 'shortDate'
            });

            $("#txtOffDate", ajaxContainerSelector).datebox({
                required:true,
                validType: 'shortDate'
            });

            $("#txtSignTotal", ajaxContainerSelector).validatebox({
                required:true,
                validType: 'number'
            });

            $("#selIsValid", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 49 }
            });
            $("#selIsValid", ajaxContainerSelector).combobox("setValue", 0);


            $("#selIsArchive", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 50 }
            });
            $("#selIsArchive", ajaxContainerSelector).combobox("setValue", 0);

            
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });

        };
        var _bindButtonEvent = function () {
//            $("#btnUpload", ajaxContainerSelector).click(function () {
//                $("#upload", ajaxContainerSelector).click();
//            });
//            $("#a_clear").click(function () {
//                $("#CustomerKey4", ajaxContainerSelector).val('0');
//                $("#txtCustomer4", ajaxContainerSelector).searchbox("setValue", "");
//            });
//            $("#b_clear").click(function () {
//                $("#PlanProjectKey4", ajaxContainerSelector).val('0');
//                $("#txtPlanProject4", ajaxContainerSelector).searchbox("setValue", "");
//            });
            $("#c_clear").click(function () {
                $("#BiddingKey4", ajaxContainerSelector).val('0');
                $("#txtBidding4", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#d_clear").click(function () {
                $("#EmployeeKey4", ajaxContainerSelector).val('0');
                $("#txtEmployee4", ajaxContainerSelector).searchbox("setValue", "");
            });


            $("#e_clear").click(function () {
                $("#WritersKey", ajaxContainerSelector).val('0');
                $("#txtWriter", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#f_clear").click(function () {
                $("#SignKey", ajaxContainerSelector).val('0');
                $("#txtSigner", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#g_clear").click(function () {
                $("#TransferKey", ajaxContainerSelector).val('0');
                $("#txtTransfer", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#h_clear").click(function () {
                $("#ReceiveKey", ajaxContainerSelector).val('0');
                $("#txtReceive", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#i_clear").click(function () {
                $("#AuditKey", ajaxContainerSelector).val('0');
                $("#txtAudit", ajaxContainerSelector).searchbox("setValue", "");
            });


            $("#j_clear").click(function () {
                $("#BiddingKey4", ajaxContainerSelector).val('0');
                $("#txtBidding4", ajaxContainerSelector).searchbox("setValue", "");
            });
        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);