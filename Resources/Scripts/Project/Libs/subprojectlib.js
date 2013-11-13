//
//================================================================================
//  该文件提供 Project 平台项目的商务处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.subProject) { window.project.subProject = new Object(); }


    window.project.subProject.getSubProjectByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/GetSubProjectByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var subProject = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, subProject); }
        });
    }

    window.project.subProject.addSubProject = function (subProjectObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/AddSubProject"), subProjectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subProject.updateSubProject = function (subProjectObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/UpdateSubProject"), subProjectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }


    //子项目阶段完结确认
    window.project.subProject.confirmStageFinish = function (subProjectObj, callback) {

        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/ConfirmStageFinish"), subProjectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });

    }



    window.project.subProject.finishSubProject = function (subProjectObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/FinishSubProject"), subProjectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subProject.deleteSubProject = function (keys, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/DeleteSubProject"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }





    window.project.subProject.getSubProjRoleEmp = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/GetSubProjRoleEmp"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            if ($.isFunction(callback)) { callback.call(this, result); }
        });
    }

    window.project.subProject.setSubProjRoleEmp = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/SetSubProjRoleEmp"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }






    //    window.project.subProject.getSubProjectRoleEmployeeMappingByKey = function (key, callback) {
    //        $.post(window.resolveUrl("Services/Project/SubProjectService.asmx/GetSubProjectByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
    //            var result = $(data).text();
    //            var subProject = $.parseJSON(result);
    //            if ($.isFunction(callback)) { callback.call(this, subProject); }
    //        });
    //    }


    window.project.subProject.addSubProjectRoleEmployeeMapping = function (subProjectRoleEmployeeMappingObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectRoleEmployeeMappingService.asmx/AddSubProjectRoleEmployeeMapping"), subProjectRoleEmployeeMappingObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subProject.updateSubProjectRoleEmployeeMapping = function (subProjectRoleEmployeeMappingObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectRoleEmployeeMappingService.asmx/UpdateSubProjectRoleEmployeeMapping"), subProjectRoleEmployeeMappingObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }


    window.project.subProject.deleteSubProjectRoleEmployeeMapping = function (keys, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectRoleEmployeeMappingService.asmx/DeleteSubProjectRoleEmployeeMapping"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }




    window.project.subProject.addSubProjectRoleMapping = function (subProjectRoleMappingObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectRoleMappingService.asmx/AddSubProjectRoleMapping"), subProjectRoleMappingObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subProject.updateSubProjectRoleMapping = function (subProjectRoleMappingObj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectRoleMappingService.asmx/UpdateSubProjectRoleMapping"), subProjectRoleMappingObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }


    window.project.subProject.deleteSubProjectRoleMapping = function (key, key1, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectRoleMappingService.asmx/DeleteSubProjectRoleMapping"), { Key: key,Key1:key1}, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }




    window.project.subProject.loadWorkInstr = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/MappingService.asmx/LoadWorkInstr"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var data = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, data); }
        });
    }



})(jQuery);
