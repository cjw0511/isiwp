//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.portlets) { window.platform.portlets = new Object(); }

    window.platform.portlets.getPortletsByKey = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PortletsService.asmx/GetPortletsByKey"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.portlets.getPortletsRoles = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PortletsService.asmx/GetPortletsRoles"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            if ($.isFunction(callback)) { callback.call(this, result); }
        });
    }

    window.platform.portlets.setPortletsRoles = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PortletsService.asmx/SetPortletsRoles"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.portlets.addPortlets = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PortletsService.asmx/AddPortlets"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.portlets.updatePortlets = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PortletsService.asmx/UpdatePortlets"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.portlets.delPortlets = function (keys, callback) {
        $.post(window.resolveUrl("Services/Platform/PortletsService.asmx/DeletePortlets"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);