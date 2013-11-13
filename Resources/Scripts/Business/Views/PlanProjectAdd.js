/*
==============================================================================
//  计划项目添加页面 PlanProjectAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.PlanProjectAdd_aspx) { window.business.PlanProjectAdd_aspx = new Object(); }
    window.business.PlanProjectAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName1", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["计划项目名称","Services/Business/PlanProjectService.asmx/ajaxAddValid","Name"]']
            });


//            $("#txtCode1", ajaxContainerSelector).validatebox({
//                required: true,
//                validType: ['code', 'insertValidate["编号","Services/Business/PlanProjectService.asmx/ajaxAddValid","Code"]']
//            });

            $("#txtShortName1", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });


            $("#txtManager1", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });


            $("#selProjectType2", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 36 }
            });
            $("#selProjectType2", ajaxContainerSelector).combobox("setValue", 0);


//            $("#selActiveStatus2", ajaxContainerSelector).combobox({
//                valueField: 'Key',
//                textField: "Name",
//                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
//                queryParams: { MainKey: 51 }
//            });
//            $("#selActiveStatus2", ajaxContainerSelector).combobox("setValue", 0);


            $("#txtSummary1", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });




            $("#txtCustomer6", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#CustomerKey1").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#CustomerKey6").val(selections[0].Key);
                            $("#txtCustomer6").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showCustomerSelector(onEnterClick, selected);
                }
            });
            $("#txtCustomer6", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtCustomer6", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtCustomer6", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });




            $("#txtEmployee6", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#EmployeeKey6").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#EmployeeKey6").val(selections[0].Key);
                            $("#txtEmployee6").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtEmployee6", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtEmployee6", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtEmployee6", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

        };
        var _bindButtonEvent = function () {

            $("#a_clear").click(function () {
                $("#CustomerKey6", ajaxContainerSelector).val('0');
                $("#txtCustomer6", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#b_clear").click(function () {
                $("#EmployeeKey6", ajaxContainerSelector).val('0');
                $("#txtEmployee6", ajaxContainerSelector).searchbox("setValue", "");
            });

//            $("#btnSave", ajaxContainerSelector).click(function () {
//                var verifyResult = $(ajaxContainerSelector).form('validate');
//                if (!verifyResult) { return false; }
//                var planProject = $(ajaxContainerSelector).form('getData');
//                
//                var _callback = function (success) {
//                    if (success) {
//                        $.plugin.showMessage("添加计划项目信息成功！");
//                        $("#Grid", ajaxContainerSelector).datagrid('reload');
//                        $(ajaxContainerSelector).form("clear");
//                    } else {
//                        $.plugin.showMessage("添加计划项目信息失败！");
//                    }
//                };
//                window.business.planProject.addPlanProject(planProject, _callback);
//            });


        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);