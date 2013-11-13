//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.business) { window.business = new Object(); }
    if (!window.business.businessfollow) { window.business.businessfollow = new Object(); }

    window.business.businessfollow.getBusinessFollowByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/BusinessFollowService.asmx/GetBusinessFollowByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.business.businessfollow.addBusinessFollow = function (obj, callback) {
        $.post(window.resolveUrl("Services/Business/BusinessFollowService.asmx/AddBusinessFollow"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.businessfollow.updateBusinessFollow = function (obj, callback) {
        $.post(window.resolveUrl("Services/Business/BusinessFollowService.asmx/UpdateBusinessFollow"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.businessfollow.deleteBusinessFollow = function (keys, callback) {
        $.post(window.resolveUrl("Services/Business/BusinessFollowService.asmx/DeleteBusinessFollow"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);