//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.position) { window.platform.position = new Object(); }

    window.platform.position.getTreeDataOfPosition = function (callback) {
        $.post(window.resolveUrl("Services/Platform/PositionService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = [{ id: '0', text: '岗位', children: treedata}];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.position.getComboBoxOfPosition = function (callback) {
        $.post(window.resolveUrl("Services/Platform/PositionService.asmx/LoadComboBoxData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = [treedata];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.position.getPositionByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/PositionService.asmx/GetPositionByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.position.addPosition = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PositionService.asmx/AddPosition"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.position.updatePosition = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PositionService.asmx/UpdatePosition"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.position.deletePosition = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/PositionService.asmx/DeletePosition"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.position.moveNode = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PositionService.asmx/MoveNode"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);





