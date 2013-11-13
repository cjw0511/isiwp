/*
==============================================================================
//  信息系统测评记录编辑页面 InfoSystemEvaluateRecordUpdate.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.InfoSystemEvaluateRecordUpdate_aspx) { window.business.InfoSystemEvaluateRecordUpdate_aspx = new Object(); }
    window.business.InfoSystemEvaluateRecordUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则

        $("#txtCode", ajaxContainerSelector).validatebox({
            validType: ['code', 'updateValidate["编号","Services/Business/InfoSystemService.asmx/AjaxEvaluateRecordValidate","Code",' + key + ']']
        });

        $("#selEvaluateType", ajaxContainerSelector).combobox({
            required: true,
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 38 },
            panelHeight: 100
        });

        $("#selEvaluateLevel", ajaxContainerSelector).combobox({
            required: true,
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 39 },
            panelHeight: 100
        });

        $("#txtEvaluateDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });

        $("#txtOrganization", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtEvaluateContent", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtRectifContent", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtFiling", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        })
         
        $("#txtInfoSystem", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#InfoSystemKey").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#InfoSystemKey").val(selections[0].Key);
                        $("#txtInfoSystem").searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.business.showInfoSystemSelector(onEnterClick, selected);
            }
        });
        $("#txtInfoSystem", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtInfoSystem", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

        var rowData = $("#Grid", window.business.InfoSystemManage_aspx.ajaxContainerSelector).datagrid("getSelected");
        $("#txtInfoSystem").searchbox("setValue", rowData.Name);
        $("#InfoSystemKey").val(rowData.Key);

        window.business.infoSystem.getInfoSystemEvaluateRecordByKey(key, function (infoSystem) {
            $(ajaxContainerSelector).form('loadData', infoSystem);
        });

        $("#btnSave", ajaxContainerSelector).click(function () {
            var verifyResult = $(ajaxContainerSelector).form('validate');
            if (!verifyResult) { return false; }
            var infoSystem = $(ajaxContainerSelector).form('getData');
            $.extend(infoSystem, { Key: key });
            var _callback = function (success) {
                if (success) {
                    $("#Grid", ajaxContainerSelector).datagrid('reload');
                    $.plugin.showMessage("修改信息系统信息成功！");

                } else {
                    $.plugin.showMessage("修改信息系统信息失败！");
                }
            };
            window.business.infoSystem.updateInfoSystemEvaluateRecord(infoSystem, _callback);
        });
    };

})(jQuery);
