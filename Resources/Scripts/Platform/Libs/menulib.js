//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.menu) { window.platform.menu = new Object(); }

    window.platform.menu.getTreeDataOfMenu = function (callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = [{ id: '0', text: "菜单目录", children: treedata}];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    window.platform.menu.getMenuByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/GetMenuByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    window.platform.menu.addMenu = function (menuObj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/AddMenu"), menuObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.menu.updateMenu = function (menuObj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/UpdateMenu"), menuObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.menu.deleteMenu = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/DeleteMenu"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.menu.moveNode = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/MoveNode"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.menu.setShortcutMenu = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/SetShortcutMenu"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.menu.getMenuKeyByRoleKey = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/GetMenuKeyByRoleKey"), obj, function (data, textStatus, XMLHttpRequest) {
            if ($.isFunction(callback)) { callback.call(this, data); }
        });
    }
    window.platform.menu.getMenuNodeByRoleKey = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/GetMenuByRoleKey"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = treedata;
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    window.platform.menu.setMenuKeyByRoleKey = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/SetMenuKeyByRoleKey"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.menu.setShortcutRoleMenuByRoleKey = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/SetShortcutRoleMenuByRoleKey"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.menu.setShortcutUserMenuByUserKey = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/MenuService.asmx/SetShortcutUserMenuByUserKey"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);





