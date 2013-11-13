/*
==============================================================================
//  新信息系统添加页面 InfoSystemAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.InfoSystemAdd_aspx) { window.business.InfoSystemAdd_aspx = new Object(); }
    window.business.InfoSystemAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'insertValidate["名称","Services/Business/InfoSystemService.asmx/AjaxValidate","Name"]']
        });
        $("#txtShortName", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

//        $("#txtCode", ajaxContainerSelector).validatebox({
//            required: true,
//            validType: ['code', 'insertValidate["编号","Services/Business/InfoSystemService.asmx/AjaxValidate","Code"]']
//        });

        $("#selInfoSystemType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 35 },
            panelHeight: 100
        });
        $("#selInfoSystemType", ajaxContainerSelector).combobox("setValue", 0);

        $("#selBusiSafeLevel", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 40 },
            panelHeight: 100,
            onSelect: function (rowIndex, rowData) {
                _bindSel(rowIndex, rowData);
            }
        });
        $("#selBusiSafeLevel", ajaxContainerSelector).combobox("setValue", 0);

        $("#selSystemSafeLevel", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 41 },
            panelHeight: 100,
            onSelect: function (rowIndex, rowData) {
                _bindSel(rowIndex, rowData);
            }
        });

        $("#selSystemSafeLevel", ajaxContainerSelector).combobox("setValue", 0);

        $("#selProtectionLevel", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 42 },
            panelHeight: 100,
            onSelect: function (rowIndex, rowData) {
                _bindSel(rowIndex, rowData);
            }
        });
        $("#selProtectionLevel", ajaxContainerSelector).combobox("setValue", 0);

        $("#txtManager", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtCustomer", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#CustomerKey", ajaxContainerSelector).val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#CustomerKey", ajaxContainerSelector).val(selections[0].Key);
                        $("#txtCustomer", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.business.showCustomerSelector(onEnterClick, selected);
            }
        });
        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
        $("#a_clear").click(function () {
            $("#CustomerKey", ajaxContainerSelector).val('0');
            $("#txtCustomer", ajaxContainerSelector).searchbox("setValue", "");
        });

        var _bindSel = function (rowIndex, rowData) {
            var busiSafeData = $("#selBusiSafeLevel", ajaxContainerSelector).combobox("getValue");
            var busiSafeData2 = window.platform.getDataDictionarySingleRecord({ MainKey: 40, Key: busiSafeData });
            var busiSafe = parseInt(busiSafeData2.Value);
            var systemSafeData = $("#selSystemSafeLevel", ajaxContainerSelector).combobox("getValue");
            var systemSafeData2 = window.platform.getDataDictionarySingleRecord({ MainKey: 41, Key: systemSafeData });
            var systemSafe = parseInt(systemSafeData2.Value);
            if (busiSafe >= systemSafe) {
                $("#selProtectionLevel", ajaxContainerSelector).combobox("setValue", busiSafeData);
            } else {
                $("#selProtectionLevel", ajaxContainerSelector).combobox("setValue", systemSafeData);
            }
        }

    };

})(jQuery);


