//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.business) { window.business = new Object(); }
    if (!window.business.contract) { window.business.contract = new Object(); }

    window.business.contract.getContractByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/ContractService.asmx/GetContractByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var contract = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, contract); }
        });
    }



    window.business.contract.addContract = function (contractObj, callback) {
        $.post(window.resolveUrl("Services/Business/ContractService.asmx/AddContract"), contractObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.contract.updateContract = function (contractObj, callback) {
        $.post(window.resolveUrl("Services/Business/ContractService.asmx/UpdateContract"), contractObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }


    window.business.contract.deleteContract = function (keys, callback) {

        $.post(window.resolveUrl("Services/Business/ContractService.asmx/DeleteContract"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);





