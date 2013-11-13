/*
==============================================================================
//  项目编辑页面 ProjectFinish.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.ProjectFinish_aspx) { window.project.ProjectFinish_aspx = new Object(); }
    window.project.ProjectFinish_aspx.initPage = function (ajaxContainerSelector, key) {
//        ///定义验证规则
//        $("#txtName", ajaxContainerSelector).validatebox({
//            required: true
//        });
//        $("#txtCode", ajaxContainerSelector).validatebox({
//            required: true
//        });
//        ///项目进度
//        $("#selProgressKey", ajaxContainerSelector).combobox({
//            valueField: 'Key',
//            textField: "Name",
//            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
//            queryParams: { MainKey: 56 }
//        });
//        $('#selProgressKey', ajaxContainerSelector).combobox('select', '0');
//        //        ///是否有效
//        //        $("#selIsApproval", ajaxContainerSelector).combobox({
//        //            valueField: 'Key',
//        //            textField: "Name",
//        //            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
//        //            queryParams: { MainKey: 57 }
//        //        });
//        //        $('#selIsApproval', ajaxContainerSelector).combobox('select', '0');
//        //        $("#ckIsApproval", ajaxContainerSelector).val({
//        //            valueField: 'Key',
//        //            textField: "Name",
//        //            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
//        //            queryParams: { MainKey: 57 }
//        //        });
//        //所属计划项目

//        $("#txtPlanProj", ajaxContainerSelector).searchbox({
//            required: true,
//            searcher: function (value) {
//                var selected = $("#PlanProjKey", ajaxContainerSelector).val();
//                var onEnterClick = function (datagrid, selections) {
//                    if (selections.length > 0) {
//                        $("#PlanProjKey", ajaxContainerSelector).val(selections[0].Key);
//                        $("#txtPlanProj", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
//                    } else {
//                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                        return false;
//                    }
//                };
//                window.business.showPlanProjectSelector(onEnterClick, selected);
//            }
//        });
//        $("#txtPlanProj", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//        $("#txtPlanProj", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//        //所属客户
//        $("#txtCustomer", ajaxContainerSelector).searchbox({
//            searcher: function (value) {
//                var selected = $("#CustomerKey", ajaxContainerSelector).val();
//                var onEnterClick = function (datagrid, selections) {
//                    if (selections.length > 0) {
//                        $("#CustomerKey", ajaxContainerSelector).val(selections[0].Key);
//                        $("#txtCustomer", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
//                    } else {
//                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                        return false;
//                    }
//                };
//                window.business.showCustomerSelector(onEnterClick, selected);
//            }
//        });
//        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//        //技术负责人
//        $("#txtTechMgr", ajaxContainerSelector).searchbox({
//            searcher: function (value) {
//                var selected = $("#TechMgrKey", ajaxContainerSelector).val();
//                var onEnterClick = function (datagrid, selections) {
//                    if (selections.length > 0) {
//                        $("#TechMgrKey", ajaxContainerSelector).val(selections[0].Key);
//                        $("#txtTechMgrKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
//                    } else {
//                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                        return false;
//                    }
//                };
//                window.platform.showEmployeeSelector(onEnterClick, selected);
//            }
//        });
//        $("#txtTechMgr", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//        $("#txtTechMgr", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//        //商务负责人
//        $("#txtBusiMgr", ajaxContainerSelector).searchbox({
//            searcher: function (value) {
//                var selected = $("#BusiMgrKey", ajaxContainerSelector).val();
//                var onEnterClick = function (datagrid, selections) {
//                    if (selections.length > 0) {
//                        $("#BusiMgrKey", ajaxContainerSelector).val(selections[0].Key);
//                        $("#txtBusiMgr", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
//                    } else {
//                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                        return false;
//                    }
//                };
//                window.platform.showEmployeeSelector(onEnterClick, selected);
//            }
//        });
//        $("#txtBusiMgr", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//        $("#txtBusiMgr", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//        //项目经理
//        $("#txtManager", ajaxContainerSelector).searchbox({
//            searcher: function (value) {
//                var selected = $("#ManagerKey", ajaxContainerSelector).val();
//                var onEnterClick = function (datagrid, selections) {
//                    if (selections.length > 0) {
//                        $("#ManagerKey", ajaxContainerSelector).val(selections[0].Key);
//                        $("#txtManager", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
//                    } else {
//                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                        return false;
//                    }
//                };
//                window.platform.showEmployeeSelector(onEnterClick, selected);
//            }
//        });
//        $("#txtManager", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//        $("#txtManager", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

        window.project.project.getProjectByKey(key, function (project) {
            $("projectfd", ajaxContainerSelector).form('loadData', project);
//            $("#txtName", ajaxContainerSelector).val(project.Name);
//            $("#txtCode", ajaxContainerSelector).val(project.Code);
//            $("#PlanProjKey", ajaxContainerSelector).val(project.PlanProjKey);
//            if (project.PlanProjKey != '0' && project.PlanProjKey != undefined) {
//                window.business.planProject.getPlanProjectByKey(project.PlanProjKey, function (project) {
//                    if (project)
//                        $("#txtPlanProj", ajaxContainerSelector).searchbox("setValue", project.Name);
//                });
//            }
//            $("#CustomerKey", ajaxContainerSelector).val(project.CustomerKey);
//            if (project.CustomerKey != '0' && project.CustomerKey != undefined) {
//                window.business.customer.getCustomerByKey(project.CustomerKey, function (project) {
//                    if (project)
//                        $("#txtCustomer", ajaxContainerSelector).searchbox("setValue", project.Name);
//                });
//            }
//            $("#TechMgrKey", ajaxContainerSelector).val(project.TechMgrKey);
//            if (project.TechMgrKey != '0' && project.TechMgrKey != undefined) {
//                window.business.employee.getEmployeeByKey(project.TechMgrKey, function (project) {
//                    if (project)
//                        $("#txtTechMgr", ajaxContainerSelector).searchbox("setValue", project.Name);
//                });
//            }
//            $("#BusiMgrKey", ajaxContainerSelector).val(project.BusiMgrKey);
//            if (project.BusiMgrKey != '0' && project.BusiMgrKey != undefined) {
//                window.business.employee.getEmployeeByKey(project.BusiMgrKey, function (project) {
//                    if (project)
//                        $("#txtBusiMgr", ajaxContainerSelector).searchbox("setValue", project.Name);
//                });
//            }
//            $("#ManagerKey", ajaxContainerSelector).val(project.ManagerKey);
//            if (project.ManagerKey != '0' && project.ManagerKey != undefined) {
//                window.business.employee.getEmployeeByKey(project.ManagerKey, function (project) {
//                    if (project)
//                        $("#txtManager", ajaxContainerSelector).searchbox("setValue", project.Name);
//                });
//            }
//            $("#txtCustomerMgr", ajaxContainerSelector).val(project.CustomerMgr);
//            $("#ckIsApproval", ajaxContainerSelector).attr("checked", project.IsApproval);
//            $("#selProgressKey", ajaxContainerSelector).combobox("setValue", project.ProgressKey);
//            $("#txtStartDate", ajaxContainerSelector).val(project.StartDate);
//            $("#txtStopDate", ajaxContainerSelector).val(project.StopDate);
//            $("#txtRealStartDate", ajaxContainerSelector).val(project.RealStartDate);
//            $("#txtRealStopDate", ajaxContainerSelector).val(project.RealStopDate);
//            $("#txtDescription", ajaxContainerSelector).val(project.Description);
//            $("#txtRemark", ajaxContainerSelector).val(project.Remark);
            $("#txtClosedDetail", ajaxContainerSelector).val(project.ClosedDetail);
        });
    };

})(jQuery);
