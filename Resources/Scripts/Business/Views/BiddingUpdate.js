/*
==============================================================================
//  投标信息编辑页面 BiddingUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.BiddingUpdate_aspx) { window.business.BiddingUpdate_aspx = new Object(); }
    window.business.BiddingUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'ajaxUpdateValid["名称","Services/Business/BiddingService.asmx/ajaxUpdateValid","Name",' + key + ']']
        });

        $("#txtCode", ajaxContainerSelector).validatebox({
            validType: ['code', 'ajaxUpdateValid["编号","Services/Business/BiddingService.asmx/ajaxUpdateValid","Code",' + key + ']']
        });

        $("#txtBiddingDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });

        $("#txtBiddingTotal", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#selBiddingStatus", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 47 },
            panelHeight: 100
        });

        $("#txtBiddingAddress", ajaxContainerSelector).validatebox({
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

        $("#txtEmployee", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#EmployeeKey").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#EmployeeKey").val(selections[0].Key);
                        $("#txtEmployee").searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.platform.showEmployeeSelector(onEnterClick, selected);
            }
        });
        $("#txtEmployee", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtEmployee", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

        $("#txtTenderInfo", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#TenderKey").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#TenderKey").val(selections[0].Key);
                        $("#txtTenderInfo").searchbox("setValue", selections[0].Name);
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


        window.business.bidding.getBiddingByKey(key, function (bidding) {
            $(ajaxContainerSelector).form('loadData', bidding);
        });

        $("#btnSave", ajaxContainerSelector).click(function () {
            var verifyResult = $(ajaxContainerSelector).form('validate');
            if (!verifyResult) { return false; }
            var bidding = $(ajaxContainerSelector).form('getData');
            $.extend(bidding, { Key: key });
            var _callback = function (success) {
                if (success) {
                    $("#Grid", ajaxContainerSelector).datagrid('reload');
                    $.plugin.showMessage("修改投标信息成功！");

                } else {
                    $.plugin.showMessage("修改投标信息失败！");
                }
            };
            window.business.bidding.updateBidding(bidding, _callback);
        });
    };

})(jQuery);
