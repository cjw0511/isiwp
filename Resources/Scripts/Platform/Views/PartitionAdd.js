/*
==============================================================================
//  机构添加页面 PartitionAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PartitionAdd_aspx) { window.platform.PartitionAdd_aspx = new Object(); }

    window.platform.PartitionAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["机构名称","Services/Platform/PartitionService.asmx/AjaxValidate","Name"]']
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["机构编号","Services/Platform/PartitionService.asmx/AjaxValidate","Code"]']
            });
            $("#txtTel", ajaxContainerSelector).validatebox({
                validType: 'phone'
            });
            $("#txtEmail", ajaxContainerSelector).validatebox({
                validType: 'email'
            });
            $("#txtAddress", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            //            $("#txtZipCode", ajaxContainerSelector).validatebox({
            //                validType: 'zipCode'
            //            });
            $("#txtBuildDate", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtRemark", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            ///选择联系人
            $("#txtLinkMan", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#LinkManKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#LinkManKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtLinkMan", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
            //机构类型
            $("#txtPartType", ajaxContainerSelector).combobox({
                required: true,
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 32 }
            });
            $("#txtPartType", ajaxContainerSelector).combobox("setValue", 1);
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var partition = $(ajaxContainerSelector).form('getData');
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("添加机构成功。");
                        window.platform.PartitionManage_aspx.refreshAfterAdd();
                        $(ajaxContainerSelector).form("clear");
                    } else {
                        $.plugin.showMessage("添加机构失败。");
                    }
                };
                window.platform.partition.addPartition(partition, _callback);
            });
            $("#clear_LinkMan", ajaxContainerSelector).click(function () {
                $("#txtLinkMan", ajaxContainerSelector).searchbox('setValue', '');
                $("#LinkManKey", ajaxContainerSelector).val('');
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);