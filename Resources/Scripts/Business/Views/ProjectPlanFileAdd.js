/*
==============================================================================
//  项目计划书添加页面 ProjectPlanFileAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ProjectPlanFileAdd_aspx) { window.business.ProjectPlanFileAdd_aspx = new Object(); }
    window.business.ProjectPlanFileAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["名称","Services/Business/ProjectPlanFileService.asmx/AjaxValidate","Name"]']
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["编号","Services/Business/ProjectPlanFileService.asmx/AjaxValidate","Code"]']
            });
            ///选择评审状态
            $("#selReviewStatus", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 44 }
            });
            $('#selReviewStatus', ajaxContainerSelector).combobox('select', '0');
            //所属计划项目
            $("#txtPlanProjectKey", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#PlanProjectKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#PlanProjectKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtPlanProjectKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
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
            $("#txtPlanProjectKey", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
            //计划项目负责人
            $("#txtEmployeeKey", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#EmployeeKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#EmployeeKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtEmployeeKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtEmployeeKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtEmployeeKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtEmployeeKey", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
//            //所属投标项目
//            $("#txtBiddingKey", ajaxContainerSelector).searchbox({
//                searcher: function (value) {
//                    var selected = $("#BiddingKey", ajaxContainerSelector).val();
//                    var onEnterClick = function (datagrid, selections) {
//                        if (selections.length > 0) {
//                            $("#BiddingKey", ajaxContainerSelector).val(selections[0].Key);
//                            $("#txtBiddingKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
//                        } else {
//                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                            return false;
//                        }
//                    };
//                    window.business.showBiddingSelector(onEnterClick, selected);
//                }
//            });
//            $("#txtBiddingKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//            $("#txtBiddingKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//            //所属客户
//            $("#txtCustomerKey", ajaxContainerSelector).searchbox({
//                searcher: function (value) {
//                    var selected = $("#CustomerKey", ajaxContainerSelector).val();
//                    var onEnterClick = function (datagrid, selections) {
//                        if (selections.length > 0) {
//                            $("#CustomerKey", ajaxContainerSelector).val(selections[0].Key);
//                            $("#txtCustomerKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
//                        } else {
//                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                            return false;
//                        }
//                    };
//                    window.business.showCustomerSelector(onEnterClick, selected);
//                }
//            });
//            $("#txtCustomerKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//            $("#txtCustomerKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        };
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