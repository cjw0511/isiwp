//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.logonConfig) { window.platform.logonConfig = new Object(); }

    window.platform.logonConfig.getLogonConfigByID = function (id, callback) {
        $.post(window.resolveUrl("Services/Platform/LogonConfigService.asmx/GetLogonConfigByID"), { ID: id }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var logonconfig = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, logonconfig); }
        });
    }

    window.platform.logonConfig.addLogonConfig = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/LogonConfigService.asmx/AddLogonConfig"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.logonConfig.updateLogonConfig = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/LogonConfigService.asmx/UpdateLogonConfig"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.logonConfig.deleteLogonConfig = function (ids, callback) {
        $.post(window.resolveUrl("Services/Platform/LogonConfigService.asmx/DeleteLogonConfig"), { IDs: ids }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);