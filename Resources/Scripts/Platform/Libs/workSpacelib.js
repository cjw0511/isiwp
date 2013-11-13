//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.workspace) { window.platform.workspace = new Object(); }

    window.platform.workspace.getUserPortlets = function (callback) {
        $.post(window.resolveUrl("Services/Platform/WorkSpaceService.asmx/GetUserPortlets"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text(); 
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.workspace.getPortletsForAdd = function (callback) {
        $.post(window.resolveUrl("Services/Platform/WorkSpaceService.asmx/GetPortletsForAdd"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.workspace.setUserWorkSpaceCols = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/WorkSpaceService.asmx/SetUserWorkSpaceCols"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.workspace.getUserWorkSpaceCols = function (callback) {
        $.post(window.resolveUrl("Services/Platform/WorkSpaceService.asmx/GetUserWorkSpaceCols"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            if ($.isFunction(callback)) { callback.call(this, result); }
        });
    }

    window.platform.workspace.addUserPortlets = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/WorkSpaceService.asmx/AddUserPortlets"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.workspace.editUserPortlets = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/WorkSpaceService.asmx/EditUserPortlets"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.workspace.delUserPortlets = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/WorkSpaceService.asmx/DelUserPortlets"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.workspace.moveUserPortlets = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/WorkSpaceService.asmx/MoveUserPortlets"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);