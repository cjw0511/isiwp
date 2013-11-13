/*
==============================================================================
//  新投标信息添加页面 BiddingAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.BiddingAdd_aspx) { window.business.BiddingAdd_aspx = new Object(); }
    window.business.BiddingAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'insertValidate["名称","Services/Business/BiddingService.asmx/AjaxValidate","Name"]']
        });

        $("#txtCode", ajaxContainerSelector).validatebox({
            validType: ['code', 'insertValidate["编号","Services/Business/BiddingService.asmx/AjaxValidate","Code"]']
        });

        $("#txtBiddingDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });

        $("#txtBiddingTotal", ajaxContainerSelector).validatebox({
            validType: 'number'
        });
        $("#txtBiddingTotal", ajaxContainerSelector).val(0);

//        $("#selBiddingStatus", ajaxContainerSelector).combobox({
//            valueField: 'Key',
//            textField: "Name",
//            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
//            queryParams: { MainKey: 47 },
//            panelHeight: 100
//        });
//        $("#selBiddingStatus", ajaxContainerSelector).combobox("setValue", 0);

        $("#txtBiddingAddress", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtPlanProject", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#PlanProjectKey", ajaxContainerSelector).val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#PlanProjectKey", ajaxContainerSelector).val(selections[0].Key);
                        $("#txtPlanProject", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
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
                var selected = $("#EmployeeKey", ajaxContainerSelector).val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#EmployeeKey", ajaxContainerSelector).val(selections[0].Key);
                        $("#txtEmployee", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
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
        $("#txtEmployee", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

        $("#txtTenderInfo", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#TenderKey", ajaxContainerSelector).val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#TenderKey", ajaxContainerSelector).val(selections[0].Key);
                        $("#txtTenderInfo", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
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
    };
})(jQuery);



