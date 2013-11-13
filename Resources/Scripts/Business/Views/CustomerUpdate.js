/*
==============================================================================
//  新员工添加页面 CustomerUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.CustomerUpdate_aspx) { window.business.CustomerUpdate_aspx = new Object(); }
    window.business.CustomerUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
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
                validType: 'FullName'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
//                validType: ['code', 'ajaxUpdateValid["编号","Services/Business/CustomerService.asmx/ajaxUpdateValid","Code"]']
            });
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
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 1 }
            });
            $('#selIndustryType', ajaxContainerSelector).combobox('select', '0');
            $("#selCustomerType", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 37 }
            });
            $('#selCustomerType', ajaxContainerSelector).combobox('select', '0');
        };
        window.business.customer.getCustomerByKey(key, function (customer) {
//            $("#txtName", ajaxContainerSelector).val(customer.Name);
//            $("#txtCode", ajaxContainerSelector).val(customer.Code);
//            $("#txtShortName", ajaxContainerSelector).val(customer.ShortName);
//            $("#txtLegalRepName", ajaxContainerSelector).val(customer.LegalRepName);
//            $("#selIndustryType", ajaxContainerSelector).combobox("setValue", customer.IndustryType);
//            $("#txtSecurityDepartment", ajaxContainerSelector).val(customer.SecurityDepartment);
//            $("#selCustomerType", ajaxContainerSelector).combobox("setValue", customer.CustomerType);
//            $("#txtTel", ajaxContainerSelector).val(customer.Tel);
//            $("#txtFax", ajaxContainerSelector).val(customer.Fax);
//            $("#txtZipCode", ajaxContainerSelector).val(customer.ZipCode);
//            $("#txtAddress", ajaxContainerSelector).val(customer.Address);
//            $("#txtEmail", ajaxContainerSelector).val(customer.Email);
//            $("#txtSummary", ajaxContainerSelector).val(customer.Summary);
//            $("#txtDescription", ajaxContainerSelector).val(customer.Description);
//            $("#txtRemark", ajaxContainerSelector).val(customer.Remark);
            $(ajaxContainerSelector).form('loadData', customer);
        });
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form('validate');
                if (!verifyResult) { return false; }
                var customer = $(ajaxContainerSelector).form('getData');
                $.extend(customer, { Key: key });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改客户资料成功。");
                        $("#CusGrid", ajaxContainerSelector).datagrid('reload');
                    } else {
                        $.plugin.showMessage("修改客户资料失败。");
                    }
                };
                window.business.customer.updateCustomer(customer, _callback);
            });
        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);