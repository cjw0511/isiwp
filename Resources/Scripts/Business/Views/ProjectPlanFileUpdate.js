/*
==============================================================================
//  项目计划书添加页面 ProjectPlanFileUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ProjectPlanFileUpdate_aspx) { window.business.ProjectPlanFileUpdate_aspx = new Object(); }
    window.business.ProjectPlanFileUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'FullName'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
//                validType: ['code', 'ajaxUpdateValid["编号","Services/Business/ProjectPlanFileService.asmx/ajaxUpdateValid","Code"]']
            });
            ///选择评审状态
            $("#selReviewStatus", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 44 }
            });
            $('#selReviewStatus').combobox('select', '0');
            //所属计划项目
            $("#txtPlanProjectKey", ajaxContainerSelector).searchbox({
                required: true,
                searcher: function (value) {
                    var selected = $("#PlanProjectKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#PlanProjectKey").val(selections[0].Key);
                            $("#txtPlanProjectKey").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showPlanProjectSelector(onEnterClick, selected);
                }
            });
            $("#txtPlanProjectKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtPlanProjectKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            //计划项目负责人
            $("#txtEmployeeKey", ajaxContainerSelector).searchbox({
                required: true,
                searcher: function (value) {
                    var selected = $("#EmployeeKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#EmployeeKey").val(selections[0].Key);
                            $("#txtEmployeeKey").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtEmployeeKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtEmployeeKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            //所属投标项目
            $("#txtBiddingKey", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#BiddingKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#BiddingKey").val(selections[0].Key);
                            $("#txtBiddingKey").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showBiddingSelector(onEnterClick, selected);
                }
            });
            $("#txtBiddingKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtBiddingKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            //所属客户
            $("#txtCustomerKey", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#CustomerKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#CustomerKey").val(selections[0].Key);
                            $("#txtCustomerKey").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showCustomerSelector(onEnterClick, selected);
                }
            });
            $("#txtCustomerKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtCustomerKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        };
        window.business.projectPlanFile.getProjectPlanFileByKey(key, function (projectPlanFile) {
//            $(ajaxContainerSelector).form('loadData', projectPlanFile);
            $("#txtName", ajaxContainerSelector).val(projectPlanFile.Name);
            $("#txtCode", ajaxContainerSelector).val(projectPlanFile.Code);
            $("#PlanProjectKey", ajaxContainerSelector).val(projectPlanFile.PlanProjectKey);
            if (projectPlanFile.PlanProjectKey != '0' && projectPlanFile.PlanProjectKey != undefined) {
                window.business.planProject.getPlanProjectByKey(projectPlanFile.PlanProjectKey, function (planProject) {
                    if (planProject)
                        $("#txtPlanProjectKey", ajaxContainerSelector).searchbox("setValue", planProject.Name);
                });
            }
            $("#EmployeeKey", ajaxContainerSelector).val(projectPlanFile.EmployeeKey);
            if (projectPlanFile.EmployeeKey != '0' && projectPlanFile.EmployeeKey != undefined) {
                window.platform.employee.getEmployeeByKey(projectPlanFile.EmployeeKey, function (employee) {
                    if (employee)
                        $("#txtEmployeeKey", ajaxContainerSelector).searchbox("setValue", employee.Name);
                });
            }
            $("#CustomerKey", ajaxContainerSelector).val(projectPlanFile.CustomerKey);
            if (projectPlanFile.CustomerKey != '0' && projectPlanFile.CustomerKey != undefined) {
                window.platform.user.getUserByKey(projectPlanFile.CustomerKey, function (username) {
                    if (username)
                        $("#txtCustomerKey", ajaxContainerSelector).searchbox("setValue", username.Name);
                });
            }
            $("#selReviewStatus", ajaxContainerSelector).combobox("setValue", projectPlanFile.ReviewStatus);
            $("#txtSummary", ajaxContainerSelector).val(projectPlanFile.Summary);
            $("#txtRemark", ajaxContainerSelector).val(projectPlanFile.Remark);
        });
        var _bindButtonEvent = function () {
            //            $("#btnUpload", ajaxContainerSelector).click(function () {
            //                $("#upload", ajaxContainerSelector).click();
            //            });
            //            $("#a_clear").click(function () {
            //                $("#CustomerKey", ajaxContainerSelector).val('0');
            //                $("#txtCustomerKey", ajaxContainerSelector).searchbox("setValue", "");
            //            });
        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);