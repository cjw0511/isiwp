/*
==============================================================================
//  招标信息编辑页面 TenderInfoUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.TenderInfoUpdate_aspx) { window.business.TenderInfoUpdate_aspx = new Object(); }
    window.business.TenderInfoUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'ajaxUpdateValid["名称","Services/Business/TenderInfoService.asmx/ajaxUpdateValid","Name",' + key + ']']
        });

        $("#txtCode", ajaxContainerSelector).validatebox({
            validType: ['code', 'ajaxUpdateValid["编号","Services/Business/TenderInfoService.asmx/ajaxUpdateValid","Code",' + key + ']']
        });

        $("#txtOffDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });

        $("#txtBidOpenDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtTenderTotal", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });


        $("#selTenderStatus", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 45 },
            panelHeight: 100
        });

        $("#selTenderType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 46 },
            panelHeight: 100
        });

        $("#txtTenderCenter", ajaxContainerSelector).validatebox({
            validType: 'name'
        });

        $("#txtProxyOran", ajaxContainerSelector).validatebox({
            required: true,
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
                var selected = $("#PlanProjectKey").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#PlanProjectKey").val(selections[0].Key);
                        $("#txtPlanProject").searchbox("setValue", selections[0].Name);
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

        window.business.tenderInfo.getTenderInfoByKey(key, function (tenderInfo) {
            $(ajaxContainerSelector).form('loadData', tenderInfo);

            // 回显计划项目名称
            $("#PlanProjectKey", ajaxContainerSelector).val(tenderInfo.PlanProjectKey);
            if (tenderInfo.PlanProjectKey != '0' && tenderInfo.PlanProjectKey != undefined) {
                window.business.planProject.getPlanProjectByKey(tenderInfo.PlanProjectKey, function (tenderInfo) {
                    if (tenderInfo)
                        $("#txtPlanProject", ajaxContainerSelector).searchbox("setValue", tenderInfo.Name);
                });
            }
        });

        $("#btnSave", ajaxContainerSelector).click(function () {
            var verifyResult = $(ajaxContainerSelector).form('validate');
            if (!verifyResult) { return false; }
            var tenderInfo = $(ajaxContainerSelector).form('getData');
            $.extend(tenderInfo, { Key: key });
            var _callback = function (success) {
                if (success) {
                    $("#Grid", ajaxContainerSelector).datagrid('reload');
                    $.plugin.showMessage("修改招标信息成功！");

                } else {
                    $.plugin.showMessage("修改招标信息失败！");
                }
            };
            window.business.tenderInfo.updateTenderInfo(tenderInfo, _callback);
        });
    };

})(jQuery);
