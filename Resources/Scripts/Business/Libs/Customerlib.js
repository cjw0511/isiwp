//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.customer) { window.business.customer = new Object(); }

    window.business.customer.getCustomerByUserKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/CustomerService.asmx/GetCustomerByUserKey"), { UserKey: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var customer = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, customer); }
        });
    }
    window.business.customer.getCustomerByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/CustomerService.asmx/GetCustomerByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var customer = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, customer); }
        });
    }
    window.business.customer.addCustomer = function (customerObj, callback) {
        $.post(window.resolveUrl("Services/Business/CustomerService.asmx/AddCustomer"), customerObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.customer.updateCustomer = function (customerObj, callback) {
//        for (var key in customerObj) {
//            alert(key);
//        }
        $.post(window.resolveUrl("Services/Business/CustomerService.asmx/UpdateCustomer"), customerObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.business.customer.deleteCustomer = function (keys, callback) {
        $.post(window.resolveUrl("Services/Business/CustomerService.asmx/DeleteCustomer"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);





