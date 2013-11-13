//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.usergroup) { window.platform.usergroup = new Object(); }

    window.platform.usergroup.getTreeDataOfUserGroup = function (callback) {
        $.post(window.resolveUrl("Services/Platform/UserGroupService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = [{ id: '0', text: '用户组', children: treedata}];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.usergroup.getComboBoxOfUserGroup = function (callback) {
        $.post(window.resolveUrl("Services/Platform/UserGroupService.asmx/LoadTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = [treedata];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.usergroup.getUserGroupByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/UserGroupService.asmx/GetUserGroupByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var usergroupdata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, usergroupdata); }
        });
    }

    window.platform.usergroup.addUserGroup = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/UserGroupService.asmx/AddUserGroup"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.usergroup.updateUserGroup = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/UserGroupService.asmx/UpdateUserGroup"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.usergroup.deleteUserGroup = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/UserGroupService.asmx/DeleteUserGroup"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.usergroup.moveNode = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/UserGroupService.asmx/MoveNode"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);





