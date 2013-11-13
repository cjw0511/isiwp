/*
==============================================================================
//  在ContractManage.aspx页面合同信息添加页面 ShowContractAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ShowContractAdd_aspx) { window.business.ShowContractAdd_aspx = new Object(); }
    window.business.ShowContractAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName2", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'FullName'
            });

            $("#txtCode2", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'ajaxAddValid["编号","Services/Business/ContractService.asmx/ajaxAddValid","Code"]']
            });



            $("#txtCustomer2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#CustomerKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#CustomerKey2").val(selections[0].Key);
                            $("#txtCustomer2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showCustomerSelector(onEnterClick, selected);
                }
            });
            $("#txtCustomer2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtCustomer2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtCustomer2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });




            $("#txtPlanProject2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#PlanProjectKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#PlanProjectKey2").val(selections[0].Key);
                            $("#txtPlanProject2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showPlanProjectSelector(onEnterClick, selected);
                }
            });
            $("#txtPlanProject2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtPlanProject2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtPlanProject2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });



            //            $("#txtBidding", ajaxContainerSelector).searchbox({
            //                searcher: function (value) {
            //                    var selected = $("#BiddingKey").val();
            //                    var onEnterClick = function (datagrid, selections) {
            //                        if (selections.length > 0) {
            //                            $("#BiddingKey").val(selections[0].Key);
            //                            $("#txtBidding").searchbox("setValue", selections[0].Name);
            //                        } else {
            //                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
            //                            return false;
            //                        }
            //                    };
            //                    window.business.showBiddingSelector(onEnterClick, selected);
            //                }
            //            });
            //            $("#txtBidding", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            //            $("#txtBidding", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            //            $("#txtBidding", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

            $("#txtBidding2", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'number'
            });




            $("#txtEmployee2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#EmployeeKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#EmployeeKey2").val(selections[0].Key);
                            $("#txtEmployee2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtEmployee2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtEmployee2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtEmployee2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });



            $("#txtIntoFileCode2", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'ajaxAddValid["编号","Services/Business/ContractService.asmx/ajaxAddValid","Code"]']
            });


            $("#txtIntoFileDate2", ajaxContainerSelector).datebox({
                required: true,
                validType: 'shortDate'
            });


            $("#selContractType2", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 43 }
            });
            $("#selContractType2", ajaxContainerSelector).combobox("setValue", 0);

            $("#txtContractSum2", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'number'
            });


            $("#txtWriter2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#WritersKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#WritersKey2").val(selections[0].Key);
                            $("#txtWriter2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtWriter2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtWriter2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtWriter2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });



            $("#txtSigner2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#SignKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#SignKey2").val(selections[0].Key);
                            $("#txtSigner2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtSigner2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtSigner2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtSigner2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });



            $("#txtSignDate2", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });


            $("#txtSignTotal2", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'number'
            });



            $("#txtTransfer2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#TransferKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#TransferKey2").val(selections[0].Key);
                            $("#txtTransfer2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtTransfer2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtTransfer2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtTransfer2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

            $("#txtReceive2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#ReceiveKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#ReceiveKey2").val(selections[0].Key);
                            $("#txtReceive2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtReceive2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtReceive2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtReceive2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });


            $("#txtAudit2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#AuditKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#AuditKey2").val(selections[0].Key);
                            $("#txtAudit2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtAudit2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtAudit2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtAudit2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });


            $("#txtStartDate2", ajaxContainerSelector).datebox({
                required: true,
                validType: 'shortDate'
            });

            $("#txtOffDate2", ajaxContainerSelector).datebox({
                required: true,
                validType: 'shortDate'
            });

            $("#txtSignTotal2", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'number'
            });

            $("#selIsValid2", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 49 }
            });
            $("#selIsValid2", ajaxContainerSelector).combobox("setValue", 0);


            $("#selIsArchive2", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 50 }
            });
            $("#selIsArchive2", ajaxContainerSelector).combobox("setValue", 0);


            $("#txtSummary2", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });

        };
        var _bindButtonEvent = function () {
            //            $("#btnUpload", ajaxContainerSelector).click(function () {
            //                $("#upload", ajaxContainerSelector).click();
            //            });
            $("#a_clear").click(function () {
                $("#CustomerKey2", ajaxContainerSelector).val('0');
                $("#txtCustomer2", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#b_clear").click(function () {
                $("#PlanProjectKey2", ajaxContainerSelector).val('0');
                $("#txtPlanProject2", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#c_clear").click(function () {
                $("#BiddingKey2", ajaxContainerSelector).val('0');
                $("#txtBidding2", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#d_clear").click(function () {
                $("#EmployeeKey2", ajaxContainerSelector).val('0');
                $("#txtEmployee2", ajaxContainerSelector).searchbox("setValue", "");
            });


            $("#e_clear").click(function () {
                $("#WritersKey2", ajaxContainerSelector).val('0');
                $("#txtWriter2", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#f_clear").click(function () {
                $("#SignKey2", ajaxContainerSelector).val('0');
                $("#txtSigner2", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#g_clear").click(function () {
                $("#TransferKey2", ajaxContainerSelector).val('0');
                $("#txtTransfer2", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#h_clear").click(function () {
                $("#ReceiveKey2", ajaxContainerSelector).val('0');
                $("#txtReceive2", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#i_clear").click(function () {
                $("#AuditKey2", ajaxContainerSelector).val('0');
                $("#txtAudit2", ajaxContainerSelector).searchbox("setValue", "");
            });

        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);