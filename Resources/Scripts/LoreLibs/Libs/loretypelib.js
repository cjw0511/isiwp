//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.loretype) { window.lorelibs.loretype = new Object(); }

    window.lorelibs.loretype.getAllLoreType = function (callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/GetAllLoreType"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = [{ id: 0, text: '知识库类别', children: treedata}];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.loretype.getLoreTypeByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/GetLoreTypeByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.loretype.addLoreType = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/AddLoreType"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.loretype.updateLoreType = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/UpdateLoreType"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.loretype.deleteLoreType = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/DeleteLoreType"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    ///////////////LoreNode相关方法////////////////
    window.lorelibs.loretype.getAllLoreNode = function (callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/GetAllLoreNode"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = treedata;
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.loretype.getLoreNodeByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/GetLoreNodeByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.lorelibs.loretype.addLoreNode = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/AddLoreNode"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.loretype.updateLoreNode = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/UpdateLoreNode"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.loretype.deleteLoreNode = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/LoreTypeService.asmx/DeleteLoreNode"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);