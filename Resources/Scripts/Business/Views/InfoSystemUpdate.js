/*
==============================================================================
//  信息系统编辑页面 InfoSystemUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.InfoSystemUpdate_aspx) { window.business.InfoSystemUpdate_aspx = new Object(); }
    window.business.InfoSystemUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'updateValidate["名称","Services/Business/InfoSystemService.asmx/ajaxUpdateValid","Name",' + key + ']']
        });
        $("#txtShortName", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtCode", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['code', 'updateValidate["编号","Services/Business/InfoSystemService.asmx/ajaxUpdateValid","Code",' + key + ']']
        });

        $("#selInfoSystemType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 35 },
            panelHeight: 100
        });

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

        $("#txtManager", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        // 验证客户
        $("#txtCustomer", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#CustomerKey").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#CustomerKey").val(selections[0].Key);
                        $("#txtCustomer").searchbox("setValue", selections[0].Name);
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

        // 验证等保级别
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

        window.business.infoSystem.getInfoSystemByKey(key, function (infoSystem) {
            $(ajaxContainerSelector).form('loadData', infoSystem);

            // 回显客户名称
            $("#CustomerKey", ajaxContainerSelector).val(infoSystem.CustomerKey);
            if (infoSystem.CustomerKey != '0' && infoSystem.CustomerKey != undefined) {
                window.business.customer.getCustomerByKey(infoSystem.CustomerKey, function (customer) {
                    if (customer)
                        $("#txtCustomer", ajaxContainerSelector).searchbox("setValue", customer.Name);
                });
            }
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
            window.business.infoSystem.updateInfoSystem(infoSystem, _callback);
        });


    };
})(jQuery);

