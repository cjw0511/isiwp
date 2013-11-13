//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.project) { window.project = new Object(); }
    if (!window.project.project) { window.project.project = new Object(); }

    window.project.project.getProjectByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/ProjectService.asmx/GetProjectByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var project = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, project); }
        });
    }


    window.project.project.addProject = function (projectObj, callback) {
        $.post(window.resolveUrl("Services/Project/ProjectService.asmx/AddProject"), projectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }



    window.project.project.updateProject = function (projectObj, callback) {
        $.post(window.resolveUrl("Services/Project/ProjectService.asmx/UpdateProject"), projectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.project.finishProject = function (projectObj, callback) {
        $.post(window.resolveUrl("Services/Project/ProjectService.asmx/FinishProject"), projectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.project.deleteProject = function (keys, callback) {

        $.post(window.resolveUrl("Services/Project/ProjectService.asmx/DeleteProject"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }



    //子项目管理(增删改查)
    window.project.project.getSubProjectByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/GetSubProjectByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var subProject = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, subProject); }
        });
    }



    window.project.project.getSubProjRoles = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/GetSubProjRoles"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            if ($.isFunction(callback)) { callback.call(this, result); }
        });
    }

    window.project.project.setSubProjRoles = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/SetSubProjRoles"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }



    window.project.project.addSubProject = function (subProjectObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/AddSubProject"), subProjectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.project.updateSubProject = function (subProjectObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/UpdateSubProject"), subProjectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.project.deleteSubProject = function (keys, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/DeleteSubProject"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }



    window.project.project.addSubProjectRoleMapping = function (subProjectRoleMappingObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectRoleMappingService.asmx/AddSubProjectRoleMapping"), subProjectRoleMappingObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.project.updateSubProjectRoleMapping = function (subProjectRoleMappingObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectRoleMappingService.asmx/UpdateSubProjectRoleMapping"), subProjectRoleMappingObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }


    window.project.project.deleteSubProjectRoleMapping = function (keys, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectRoleMappingService.asmx/DeleteSubProjectRoleMapping"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }


})(jQuery);
