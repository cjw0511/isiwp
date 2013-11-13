/*
==============================================================================
//  新员工添加页面 CustomerAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.CustomerAdd_aspx) { window.business.CustomerAdd_aspx = new Object(); }
    window.business.CustomerAdd_aspx.initPage = function (ajaxContainerSelector) {
        $.extend($.fn.validatebox.defaults.rules, {
            telephone: {
                validator: function (value) {
                    return (/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value) || /^(13|15|18)\d{9}$/i.test(value))
                },
                message: '输入的格式必须为固话或手机号码！'
            }
        })
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["名称","Services/Business/CustomerService.asmx/AjaxValidate","Name"]']
            });
//            $("#txtCode", ajaxContainerSelector).validatebox({
//                required: true,
//                validType: ['code', 'insertValidate["编号","Services/Business/CustomerService.asmx/AjaxValidate","Code"]']
//            });
            $("#txtZipCode", ajaxContainerSelector).validatebox({
                validType: 'zipCode'
            });
            $("#txtTel", ajaxContainerSelector).validatebox({
                validType: 'telephone'
            });
            $("#txtEmail", ajaxContainerSelector).validatebox({
                validType: 'email'
            });
            $("#txtAddress", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            ///选择行业类型
            $("#selIndustryType", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTrade")
            });
            $("#selIndustryType", ajaxContainerSelector).combobox("setValue", 1);
            $("#selCustomerType", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 1 }
            });
            $('#selCustomerType', ajaxContainerSelector).combobox('select', '0');
        };
        var _bindButtonEvent = function () {
//            $("#btnSave", ajaxContainerSelector).click(function () {
//                var verifyResult = $(ajaxContainerSelector).form('validate');
//                if (!verifyResult) { return false; }
//                var customer = $(ajaxContainerSelector).form('getData');
//                var _callback = function (success) {
//                    if (success) {
//                        $.plugin.showMessage("添加客户资料成功。");
//                        $("#CusGrid", ajaxContainerSelector).datagrid('reload');
//                        $(ajaxContainerSelector).form("clear");
//                    } else {
//                        $.plugin.showMessage("添加客户资料失败。");
//                    }
//                };
//                window.business.customer.addCustomer(customer, _callback);
//            });
        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);