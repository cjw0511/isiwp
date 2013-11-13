//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.securityinfo) { window.platform.securityinfo = new Object(); }

    window.platform.securityinfo.getCurrentUserSecurityInfo = function (callback) {
        $.post(window.resolveUrl("Services/Platform/SecurityInfoService.asmx/GetCurrentUserSecurityInfo"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var securityinfo = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, securityinfo); }
        });
    }

    window.platform.securityinfo.currentUserPasswordUpdate = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/SecurityInfoService.asmx/CurrentUserPasswordUpdate"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.securityinfo.currentUserSecurityInfoIDcardUpdate = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/SecurityInfoService.asmx/CurrentUserSecurityInfoIDcardUpdate"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.securityinfo.currentUserSecurityInfoIDcardDelete = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/SecurityInfoService.asmx/CurrentUserSecurityInfoIDcardDelete"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.securityinfo.currentUserSecurityInfoEmailUpdate = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/SecurityInfoService.asmx/CurrentUserSecurityInfoEmailUpdate"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.securityinfo.currentUserSecurityInfoEmailDelete = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/SecurityInfoService.asmx/CurrentUserSecurityInfoEmailDelete"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.securityinfo.currentUserSecurityInfoQuestionProtectUpdate = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/SecurityInfoService.asmx/CurrentUserSecurityInfoQuestionProtectUpdate"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.securityinfo.currentUserSecurityInfoQuestionProtectDelete = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/SecurityInfoService.asmx/CurrentUserSecurityInfoQuestionProtectDelete"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);