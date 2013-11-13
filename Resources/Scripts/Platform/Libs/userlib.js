//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.user) { window.platform.user = new Object(); }

    window.platform.user.getUserByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/UserService.asmx/GetUserByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var User = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, User); }
        });
    };

    window.platform.user.addUser = function (userObj, callback) {
        $.post(window.resolveUrl("Services/Platform/UserService.asmx/AddUser"), userObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };

    window.platform.user.updateUser = function (userObj, callback) {
        $.post(window.resolveUrl("Services/Platform/UserService.asmx/UpdateUser"), userObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };

    window.platform.user.deleteUser = function (keys, callback) {
        $.post(window.resolveUrl("Services/Platform/UserService.asmx/DeleteUser"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };

    window.platform.user.resetUserPassword = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/UserService.asmx/ResetUserPassword"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };

})(jQuery);





