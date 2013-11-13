//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.project) { window.project = new Object(); }
    if (!window.project.subrectification) { window.project.subrectification = new Object(); }
    //整改方案主表方法
    window.project.subrectification.getSubProjectRectTemplateByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/GetSubProjectRectTemplateByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var role = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, role); }
        });
    }

    window.project.subrectification.addSubProjectRectTemplate = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/AddSubProjectRectTemplate"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subrectification.updateSubProjectRectTemplate = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/UpdateSubProjectRectTemplate"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subrectification.deleteSubProjectRectTemplate = function (keys, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/DeleteSubProjectRectTemplate"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    //整改方案模板方法
    window.project.subrectification.getSubProjectRectMainByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/GetSubProjectRectMainByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var role = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, role); }
        });
    }

    window.project.subrectification.addSubProjectRectMain = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/AddSubProjectRectMain"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subrectification.updateSubProjectRectMain = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/UpdateSubProjectRectMain"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subrectification.deleteSubProjectRectMain = function (keys, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/DeleteSubProjectRectMain"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    //整改方案字段方法
    window.project.subrectification.getSubProjectRectFieldByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/GetSubProjectRectFieldByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var role = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, role); }
        });
    }

    window.project.subrectification.addSubProjectRectField = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/AddSubProjectRectField"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subrectification.updateSubProjectRectField = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/UpdateSubProjectRectField"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.subrectification.deleteSubProjectRectField = function (keys, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/DeleteSubProjectRectField"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    //整改方案内容方法
    window.project.subrectification.addSubProjectRectContent = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/AddSubProjectRectContent"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.subrectification.updateSubProjectRectContent = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/UpdateSubProjectRectContent"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.subrectification.delSubProjectRectContent = function (subprojkey, rowindex, callback) {
        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/DeleteSubProjectRectContent"), { SubProjKey: subprojkey, RowIndex: rowindex }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
//    window.project.subrectification.deleteSubProjectRectContent = function (keys, callback) {
//        $.post(window.resolveUrl("Services/Project/SubRectificationService.asmx/DeleteSubProjectRectContent"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }
})(jQuery);





