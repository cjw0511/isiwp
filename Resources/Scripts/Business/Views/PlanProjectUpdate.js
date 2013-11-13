/*
==============================================================================
//  计划项目修改页面 PlanProjectUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.PlanProjectUpdate_aspx) { window.business.PlanProjectUpdate_aspx = new Object(); }
    window.business.PlanProjectUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName1", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["计划项目名称","Services/Business/PlanProjectService.asmx/ajaxAddValid","Name",' + key + ']']
            });


            $("#txtCode1", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["编号","Services/Business/PlanProjectService.asmx/ajaxAddValid","Code",' + key + ']']
            });

            $("#txtShortName1", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });


            $("#txtManager1", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });


            $("#selProjectType1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 36 }
            });
            $("#selProjectType1", ajaxContainerSelector).combobox("setValue", 0);

            $("#txtSummary1", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
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
//            $("#txtCustomer1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });




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
//            $("#txtEmployee1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });



            window.business.planProject.getPlanProjectByKey(key, function (planProject) {

                $("#CustomerKey1", ajaxContainerSelector).val(planProject.CustomerKey);
                if (planProject.CustomerKey != '0' && planProject.CustomerKey != undefined) {
                    window.business.customer.getCustomerByKey(planProject.CustomerKey, function (customer) {
                        if (customer)
                            $("#txtCustomer1", ajaxContainerSelector).searchbox("setValue", customer.Name);
                            $("#txtCustomer1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true,validType:'FullName' });
                    });
                }

                $("#EmployeeKey1", ajaxContainerSelector).val(planProject.EmployeeKey);
                if (planProject.EmployeeKey != '0' && planProject.EmployeeKey != undefined) {
                    window.platform.employee.getEmployeeByKey(planProject.EmployeeKey, function (employee) {
                        if (employee)
                            $("#txtEmployee1", ajaxContainerSelector).searchbox("setValue", employee.Name);
                            $("#txtEmployee1", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true,validType:'FullName' });
                    });
                }


                $(ajaxContainerSelector).form('loadData', planProject);


                //                $("#txtName", ajaxContainerSelector).val(planProject.Name);
                //                $("#txtCode", ajaxContainerSelector).val(planProject.Code);
                //                $("#txtShortName", ajaxContainerSelector).val(planProject.ShortName);
                //                $("#txtManager", ajaxContainerSelector).val(planProject.Manager);
                //                $("#selProjectType", ajaxContainerSelector).combobox("setValue", planProject.ProjectType);
                //                $("#txtSummary", ajaxContainerSelector).val(planProject.Summary);


            });




        };
        var _bindButtonEvent = function () {

            $("#a_clear").click(function () {
                $("#CustomerKey1", ajaxContainerSelector).val('0');
                $("#txtCustomer1", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#b_clear").click(function () {
                $("#EmployeeKey1", ajaxContainerSelector).val('0');
                $("#txtEmployee1", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#CustomerKey1", ajaxContainerSelector).val();
            $("#EmployeeKey1", ajaxContainerSelector).val();
            $("#btnSave", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form('validate');
                if (!verifyResult) { return false; }
                var planProject = $(ajaxContainerSelector).form('getData');

                $.extend(planProject, { Key: key });

                var _callback = function (success) {
                    if (success) {
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                        $.plugin.showMessage("修改计划项目信息成功！");
                        
                    } else {
                        $.plugin.showMessage("修改计划项目信息失败！");
                    }
                };
                window.business.planProject.updatePlanProject(planProject, _callback);
            });


        }
        _bindControl();
        _bindButtonEvent();







    };
})(jQuery);
