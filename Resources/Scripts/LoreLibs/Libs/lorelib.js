//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.lore) { window.lorelibs.lore = new Object(); }

    window.lorelibs.lore.getLoreMasterByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreService.asmx/GetLoreMasterByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.lore.getLoreByMainKey = function (mainKey, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreService.asmx/GetLoreByMainKey"), { MainKey: mainKey }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.lore.addLore = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreService.asmx/AddLore"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.lore.updateLore = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreService.asmx/UpdateLore"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.lore.deleteLore = function (keys, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreService.asmx/DeleteLore"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.lore.moveLore = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreService.asmx/MoveLore"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);