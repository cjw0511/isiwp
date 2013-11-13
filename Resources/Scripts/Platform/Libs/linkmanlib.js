//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.linkman) { window.platform.linkman = new Object(); }

    window.platform.linkman.getLinkManByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/LinkManService.asmx/GetLinkManByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.linkman.addLinkMan = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/LinkManService.asmx/AddLinkMan"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.linkman.updateLinkMan = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/LinkManService.asmx/UpdateLinkMan"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.linkman.deleteLinkMan = function (keys, callback) {
        $.post(window.resolveUrl("Services/Platform/LinkManService.asmx/DeleteLinkMan"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);





