//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.department) { window.platform.department = new Object(); }

    window.platform.department.getTreeDataOfDepartment = function (callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = treedata;
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.department.getTreeDataOfDepartmentByPartition = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/LoadTreeDataOfDepartmentByPartition"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            window.platform.partition.getPartitionByKey(param.partitionKey, function (partition) {
                var returndata = window.platform.convert.toTreeNode(partition);
                returndata.id = 0;
                returndata.children = treedata;
                if ($.isFunction(callback)) { callback.call(this, [returndata]); }
            });
        });
    }

    window.platform.department.getComboBoxOfDepartment = function (callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.department.getGridDataOfDepartment = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/LoadGridData"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.department.getDepartmentByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/GetDepartmentByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.department.addDepartment = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/AddDepartment"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.department.updateDepartment = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/UpdateDepartment"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.department.deleteDepartment = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/DeleteDepartment"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.department.setFunctionRange = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/SetFunctionRange"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.department.getFunctionRange = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/GetFunctionRange"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            if ($.isFunction(callback)) { callback.call(this, result); }
        });
    }

    window.platform.department.moveNode = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/DepartmentService.asmx/MoveNode"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);





