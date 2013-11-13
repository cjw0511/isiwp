//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.role) { window.platform.role = new Object(); }

    window.platform.role.getTreeDataOfRole = function (callback) {
        $.post(window.resolveUrl("Services/Platform/RoleService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = [{ id: '0', text: '角色', children: treedata}];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.role.getComboBoxOfRole = function (callback) {
        $.post(window.resolveUrl("Services/Platform/RoleService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = [treedata];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.role.getGridDataOfRole = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/RoleService.asmx/LoadGridData"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var role = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, role); }
        });
    }

    window.platform.role.getRoleByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/RoleService.asmx/GetRoleByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var role = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, role); }
        });
    }

    window.platform.role.addRole = function (roleObj, callback) {
        $.post(window.resolveUrl("Services/Platform/RoleService.asmx/AddRole"), roleObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.role.updateRole = function (roleObj, callback) {
        $.post(window.resolveUrl("Services/Platform/RoleService.asmx/UpdateRole"), roleObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.role.deleteRole = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/RoleService.asmx/DeleteRole"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.role.moveNode = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/RoleService.asmx/MoveNode"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);





