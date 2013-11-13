/*
==============================================================================
//  合同信息修改页面 ContractUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ContractUpdate_aspx) { window.business.ContractUpdate_aspx = new Object(); }
    window.business.ContractUpdate_aspx.initPage = function (ajaxContainerSelector,key) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName1", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["合同名称","Services/Business/ContractService.asmx/ajaxAddValid","Name",' + key + ']']
            });

            $("#txtCode1", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["编号","Services/Business/ContractService.asmx/ajaxAddValid","Code",' + key + ']']   
            });



            $("#txtCustomer1", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#CustomerKey1").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#CustomerKey1").val(selections[0].Key);
                            $("#txtCustomer1").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showCustomerSelector(onEnterClick, selected);
                }
            });
            $("#txtCustomer1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtCustomer1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtCustomer1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ validType:'FullName' });




            $("#txtPlanProject1", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#PlanProjectKey1").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#PlanProjectKey1").val(selections[0].Key);
                            $("#txtPlanProject1").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showPlanProjectSelector(onEnterClick, selected);
                }
            });
            $("#txtPlanProject1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtPlanProject1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtPlanProject1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required:true,validType: 'FullName' });



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

            $("#txtBidding1", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'number'
            });




            $("#txtEmployee1", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#EmployeeKey1").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#EmployeeKey1").val(selections[0].Key);
                            $("#txtEmployee1").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtEmployee1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtEmployee1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtEmployee1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ validType: 'FullName' });



            $("#txtIntoFileCode1", ajaxContainerSelector).validatebox({
                required: true,
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
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtWriter1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtWriter1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtWriter1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ validType: 'FullName' });



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
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtSigner1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtSigner1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtSigner1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ validType: 'FullName' });



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
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtTransfer1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtTransfer1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtTransfer1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ validType: 'FullName' });

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
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtReceive1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtReceive1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtReceive1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ validType: 'FullName' });


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
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtAudit1", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtAudit1", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            $("#txtAudit1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ validType: 'FullName' });


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




            window.business.contract.getContractByKey(key, function (contract) {

                $("#CustomerKey1", ajaxContainerSelector).val(contract.CustomerKey);
                if (contract.CustomerKey != '0' && contract.CustomerKey != undefined) {
                    window.business.customer.getCustomerByKey(contract.CustomerKey, function (customer) {
                        if (customer)
                            $("#txtCustomer1", ajaxContainerSelector).searchbox("setValue", customer.Name);
                            $("#txtCustomer1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required:true,validType: 'FullName' });
                    });
                }


                $("#PlanProjectKey1", ajaxContainerSelector).val(contract.PlanProjectKey1);
                if (contract.PlanProjectKey != '0' && contract.PlanProjectKey != undefined) {
                    window.business.planProject.getPlanProjectByKey(contract.PlanProjectKey, function (planProject) {
                        if (planProject)
                            $("#txtPlanProject1", ajaxContainerSelector).searchbox("setValue", planProject.Name);
                            $("#txtPlanProject1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }


                $("#EmployeeKey1", ajaxContainerSelector).val(contract.EmployeeKey);
                if (contract.EmployeeKey != '0' && contract.EmployeeKey != undefined) {
                    window.platform.employee.getEmployeeByKey(contract.EmployeeKey, function (employee) {
                        if (employee)
                            $("#txtEmployee1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                            $("#txtEmployee1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required:true,validType: 'FullName' });
                    });
                }



                $("#WritersKey1", ajaxContainerSelector).val(contract.WritersKey);
                if (contract.WritersKey != '0' && contract.WritersKey != undefined) {
                    window.platform.employee.getEmployeeByKey(contract.WritersKey, function (employee) {
                        if (employee)
                            $("#txtWriter1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                            $("#txtWriter1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required:true,validType: 'FullName' });
                    });
                }



                $("#SignKey1", ajaxContainerSelector).val(contract.SignKey);
                if (contract.SignKey != '0' && contract.SignKey != undefined) {
                    window.platform.employee.getEmployeeByKey(contract.SignKey, function (employee) {
                        if (employee)
                            $("#txtSigner1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                            $("#txtSigner1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required:true,validType: 'FullName' });
                    });
                }

                $("#TransferKey1", ajaxContainerSelector).val(contract.TransferKey);
                if (contract.TransferKey != '0' && contract.TransferKey != undefined) {
                    window.platform.employee.getEmployeeByKey(contract.TransferKey, function (employee) {
                        if (employee)
                            $("#txtTransfer1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                            $("#txtTransfer1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required:true,validType: 'FullName' });
                    });
                }

                $("#ReceiveKey1", ajaxContainerSelector).val(contract.ReceiveKey);
                if (contract.ReceiveKey != '0' && contract.ReceiveKey != undefined) {
                    window.platform.employee.getEmployeeByKey(contract.ReceiveKey, function (employee) {
                        if (employee)
                            $("#txtReceive1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                            $("#txtReceive1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required:true,validType: 'FullName' });
                    });
                }

                $("#AuditKey1", ajaxContainerSelector).val(contract.AuditKey);
                if (contract.AuditKey != '0' && contract.AuditKey != undefined) {
                    window.platform.employee.getEmployeeByKey(contract.AuditKey, function (employee) {
                        if (employee)
                            $("#txtAudit1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                            $("#txtAudit1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required:true,validType: 'FullName' });
                    });
                }



                $(ajaxContainerSelector).form('loadData', contract);

            });



        };
        var _bindButtonEvent = function () {
            //            $("#btnUpload", ajaxContainerSelector).click(function () {
            //                $("#upload", ajaxContainerSelector).click();
            //            });
            $("#a_clear").click(function () {
                $("#CustomerKey1", ajaxContainerSelector).val('0');
                $("#txtCustomer1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#b_clear").click(function () {
                $("#PlanProjectKey1", ajaxContainerSelector).val('0');
                $("#txtPlanProject1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#c_clear").click(function () {
                $("#BiddingKey1", ajaxContainerSelector).val('0');
                $("#txtBidding1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#d_clear").click(function () {
                $("#EmployeeKey1", ajaxContainerSelector).val('0');
                $("#txtEmployee1", ajaxContainerSelector).searchbox("setValue", "");
            });


            $("#e_clear").click(function () {
                $("#WritersKey1", ajaxContainerSelector).val('0');
                $("#txtWriter1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#f_clear").click(function () {
                $("#SignKey1", ajaxContainerSelector).val('0');
                $("#txtSigner1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#g_clear").click(function () {
                $("#TransferKey1", ajaxContainerSelector).val('0');
                $("#txtTransfer1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#h_clear").click(function () {
                $("#ReceiveKey1", ajaxContainerSelector).val('0');
                $("#txtReceive1", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#i_clear").click(function () {
                $("#AuditKey1", ajaxContainerSelector).val('0');
                $("#txtAudit1", ajaxContainerSelector).searchbox("setValue", "");
            });



            $("#btnSave", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form('validate');
                if (!verifyResult) { return false; }
                var contract = $(ajaxContainerSelector).form('getData');

                $.extend(contract, { Key: key });

                var _callback = function (success) {
                    if (success) {
                        $("#ContractGrid", ajaxContainerSelector).datagrid('reload');
                        $.plugin.showMessage("修改合同信息成功！");

                    } else {
                        $.plugin.showMessage("修改合同信息失败！");
                    }
                };
                window.business.contract.updateContract(contract, _callback);
            });




        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);