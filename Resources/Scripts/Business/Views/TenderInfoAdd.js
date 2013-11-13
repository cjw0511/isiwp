/*
==============================================================================
//  新招标信息添加页面 TenderInfoAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.TenderInfoAdd_aspx) { window.business.TenderInfoAdd_aspx = new Object(); }
    window.business.TenderInfoAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'insertValidate["名称","Services/Business/TenderInfoService.asmx/AjaxValidate","Name"]']
        });

//        $("#txtCode", ajaxContainerSelector).validatebox({
//            required: true,
//            validType: ['code', 'insertValidate["编号","Services/Business/TenderInfoService.asmx/AjaxValidate","Code"]']
//        });

        $("#txtOffDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });

        $("#txtBidOpenDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtTenderTotal", ajaxContainerSelector).validatebox({
            validType: 'number'
        });
        $("#txtTenderTotal", ajaxContainerSelector).val(0);

//        $("#selTenderStatus", ajaxContainerSelector).combobox({
//            valueField: 'Key',
//            textField: "Name",
//            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
//            queryParams: { MainKey: 45 },
//            panelHeight: 100
//        });
//        $("#selTenderStatus", ajaxContainerSelector).combobox("setValue", 0);

        $("#selTenderType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 46 },
            panelHeight: 100
        });
        $("#selTenderType", ajaxContainerSelector).combobox("setValue", 0);

        $("#txtTenderCenter", ajaxContainerSelector).validatebox({
            validType: 'name'
        });

        $("#txtProxyOran", ajaxContainerSelector).validatebox({
            validType: 'name'
        });

        $("#txtContactName", ajaxContainerSelector).validatebox({
            validType: 'name'
        });

        $("#txtContactMode", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtTenderAddress", ajaxContainerSelector).validatebox({
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
    };

})(jQuery);


