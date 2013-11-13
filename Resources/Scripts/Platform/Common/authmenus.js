(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.authmenus) { window.platform.authmenus = new Object(); }

    var _resolveUrl = window.resolveUrl;


    window.platform.authmenus.getRootMenus = function (callback) {
        $.post(_resolveUrl("./Services/Platform/AuthMenusService.asmx/GetCurrentUserMenuViews"), function (data, textStatus, XMLHttpRequest) {
            var json = $.plugin.parseSOADataToJSON(data);
            var menus = window.platform.convert.toTreeArray(json);
            if ($.isFunction(callback)) { callback.call(this, menus); }
        });
    };

    window.platform.authmenus.getMenus = function (menuKey, callback) {
        $.post(_resolveUrl("./Services/Platform/AuthMenusService.asmx/GetCurrentUserChildrenMenuViews"), { menuKey: menuKey }, function (data, textStatus, XMLHttpRequest) {
            var json = $.plugin.parseSOADataToJSON(data);
            var menus = window.platform.convert.toTreeData(json);
            if ($.isFunction(callback)) { callback.call(this, menus); }
        });
    };

    window.platform.authmenus.getMenu = function (menuKey, callback) {
        $.post(_resolveUrl("./Services/Platform/AuthMenusService.asmx/GetCurrentUserMenuView"), { menuKey: menuKey }, function (data, textStatus, XMLHttpRequest) {
            var json = $.plugin.parseSOADataToJSON(data);
            var menu = window.platform.convert.toTreeNode(json);
            if ($.isFunction(callback)) { callback.call(this, menu); }
        });
    };


})(jQuery);