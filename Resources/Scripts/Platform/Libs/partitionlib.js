//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.partition) { window.platform.partition = new Object(); }

    window.platform.partition.getTreeDataOfPartition = function (callback) {
        $.post(window.resolveUrl("Services/Platform/PartitionService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            window.platform.getCompanyName(function (companyName) {
                var returndata = [{ id: '0', text: companyName, children: treedata}];
                if ($.isFunction(callback)) { callback.call(this, returndata); } 
            });
        });
    }

    window.platform.partition.getComboBoxOfPartition = function (callback) {
        $.post(window.resolveUrl("Services/Platform/PartitionService.asmx/LoadComboBoxData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = treedata;
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.partition.getGridDataOfPartition = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/PartitionService.asmx/LoadGridData"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.partition.getPartitionByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/PartitionService.asmx/GetPartitionByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.partition.addPartition = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PartitionService.asmx/AddPartition"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.partition.updatePartition = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PartitionService.asmx/UpdatePartition"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.partition.deletePartition = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/PartitionService.asmx/DeletePartition"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.partition.moveNode = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/PartitionService.asmx/MoveNode"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);





