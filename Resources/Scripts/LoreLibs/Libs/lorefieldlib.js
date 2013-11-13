//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.lorefield) { window.lorelibs.lorefield = new Object(); }


    window.lorelibs.lorefield.getFieldDataType = function (callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/GetFieldDataType"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    };


    window.lorelibs.lorefield.getLoreFieldByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/GetLoreFieldByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.lorefield.getAllLoreField = function (callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/GetAllLoreField"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.lorefield.addLoreField = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/AddLoreField"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.lorefield.updateLoreField = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/UpdateLoreField"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.lorefield.deleteLoreField = function (keys, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/DeleteLoreField"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.lorefield.getLoreNodeFieldMappingByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/GetLoreNodeFieldMappingByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.lorefield.getLoreNodeFieldMappingByNodeKey = function (nodekey, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/GetLoreNodeFieldMappingByNodeKey"), { NodeKey: nodekey }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.lorefield.addLoreNodeFieldMapping = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/AddLoreNodeFieldMapping"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.lorefield.updateLoreNodeFieldMapping = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/UpdateLoreNodeFieldMapping"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.lorefield.deleteLoreNodeFieldMapping = function (keys, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/DeleteLoreNodeFieldMapping"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);