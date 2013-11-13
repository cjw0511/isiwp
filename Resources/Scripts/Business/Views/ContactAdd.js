/*
==============================================================================
//  新员工添加页面 ContactAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ContactAdd_aspx) { window.business.ContactAdd_aspx = new Object(); }
    window.business.ContactAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'FullName'
            });
//            $("#txtCode", ajaxContainerSelector).validatebox({
//                required: true,
//                validType: ['code', 'insertValidate["编号","Services/Business/ContactService.asmx/AjaxValidate","Code"]']
//            });
            $("#txtBirthday", ajaxContainerSelector).datebox({
//                required: true,
                validType: 'shortDate'
            });
            $("#txtZipCode", ajaxContainerSelector).validatebox({
                validType: 'zipCode'
            });
            $("#txtPhone", ajaxContainerSelector).validatebox({
                validType: 'mobile'
            });
            $("#txtTel", ajaxContainerSelector).validatebox({
                validType: 'tel'
            });
            $("#txtQQ", ajaxContainerSelector).validatebox({
                validType: 'qq'
            });
            $("#txtMSN", ajaxContainerSelector).validatebox({
                validType: 'msn'
            });
            $("#txtEmail", ajaxContainerSelector).validatebox({
                validType: 'email'
            });
            $("#txtAddress", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            ///选择性别
            $("#selSex", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 4 }
            });
            $('#selSex', ajaxContainerSelector).combobox('select', '0');

            //所属客户
            $("#txtCustomerKey", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#CustomerKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#CustomerKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtCustomerKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showCustomerSelector(onEnterClick, selected);
                }
            });
            $("#CustomerKey", ajaxContainerSelector).val("0");
            $("#txtCustomerKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtCustomerKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        };
        var _bindButtonEvent = function () {
            $("#btnUpload", ajaxContainerSelector).click(function () {
                $("#upload", ajaxContainerSelector).click();
            });
            $("#a_clear").click(function () {
                $("#CustomerKey", ajaxContainerSelector).val('0');
                $("#txtCustomerKey", ajaxContainerSelector).searchbox("setValue", "");
            });
        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);