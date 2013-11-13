/*
==============================================================================
//  新员工添加页面 ContactUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ContactUpdate_aspx) { window.business.ContactUpdate_aspx = new Object(); }
    window.business.ContactUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'FullName'
            });
//            $("#txtCode", ajaxContainerSelector).validatebox({
//                required: true,
//                validType: ['code', 'updateValidate["编号","Services/Business/ContactService.asmx/AjaxValidate","Code",' + key + ']']
//            });
            $("#txtBirthday", ajaxContainerSelector).datebox({
                //                required: true,
                validType: 'shortDate'
            });

            //        $("#txtCustomerKey", ajaxContainerSelector).validatebox({
            //            validType: 'ajaxUpdateValid["关联用户","Services/Platform/ContactService.asmx/ajaxUpdateValid","Name"]'
            //        });
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
                required: true,
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 4 }
            });
            //            $('#selSex').combobox('select', '0');
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
        window.business.contact.getContactByKey(key, function (contact) {
            $(ajaxContainerSelector).form('loadData', contact);
            //                $("#txtName", ajaxContainerSelector).val(contact.Name);
            //                $("#txtCode", ajaxContainerSelector).val(contact.Code);
            //                $("#txtBirthday", ajaxContainerSelector).datebox('setValue', contact.Birthday.toDate().format());
            if (contact.Birthday == "") {
                $("#txtBirthday", ajaxContainerSelector).datebox('setValue', '');
            }

            $("#CustomerKey", ajaxContainerSelector).val(contact.CustomerKey);
            if (contact.CustomerKey != '0' && contact.CustomerKey != undefined) {
                window.business.customer.getCustomerByKey(contact.CustomerKey, function (username) {
                    if (username)
                        $("#txtCustomerKey", ajaxContainerSelector).searchbox("setValue", username.Name);
                });
            }
            //                $("#txtDepartment", ajaxContainerSelector).val(contact.Department);
            //                $("#txtPosition", ajaxContainerSelector).val(contact.Position);
            //                $("#txtTel", ajaxContainerSelector).val(contact.Tel);
            //                $("#txtPhone", ajaxContainerSelector).val(contact.Phone);
            //                $("#txtEmail", ajaxContainerSelector).val(contact.Email);
            //                $("#txtZipCode", ajaxContainerSelector).val(contact.ZipCode);
            //                $("#txtAddress", ajaxContainerSelector).val(contact.Address);
            //                $("#txtQQ", ajaxContainerSelector).val(contact.QQ);
            //                $("#txtMSN", ajaxContainerSelector).val(contact.MSN);
            //                $("#txtRemark", ajaxContainerSelector).val(contact.Remark);
        });
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