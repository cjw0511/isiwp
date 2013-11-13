//
//================================================================================
//  该文件提供 project 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.project) { window.project = new Object(); }
    if (!window.project.role) { window.project.role = new Object(); }

    window.project.role.getTreeDataOfRole = function (callback) {
        $.post(window.resolveUrl("Services/Project/RoleService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.project.convert.toTreeData(json);
            var returndata = [{ id: '0', text: '角色', children: treedata}];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.project.role.addProjRole = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/RoleService.asmx/AddRole"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.role.updateProjRole = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/RoleService.asmx/UpdateRole"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.role.getProjRoleByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/RoleService.asmx/GetRoleByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.project.role.deleteProjRole = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/RoleService.asmx/DeleteRole"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.role.getTreeDataOfPower = function (callback) {
        $.post(window.resolveUrl("Services/Project/PowerService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.project.convert.toTreeData(json);
            var returndata = treedata;
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.project.role.getProjRolePowerMappingByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/RoleService.asmx/GetRolePowerMappingByKey"), { RoleKey: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.project.role.getProjPowerByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/PowerService.asmx/GetPowerByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.project.role.getRolePowers = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/RoleService.asmx/GetRolePowers"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            if ($.isFunction(callback)) { callback.call(this, result); }
        });
    }

    window.project.role.setRolePowers = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/RoleService.asmx/SetRolePowers"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }


})(jQuery);





