//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.project) { window.project = new Object(); }
    if (!window.project.report) { window.project.report = new Object(); }

    window.project.report.createReport = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/CreateReport"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };

    window.project.project.deleteReport = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/DeleteReport"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.report.importProperty = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/ImportProperty"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.report.importProblem = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/ImportProblem"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.report.setProblemValue = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/SetProblemValue"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.report.setProblemPropertyMapping = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/SetProblemPropertyMapping"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.report.deleteProblemPropertyMapping = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/DeleteProblemPropertyMapping"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.report.setThreatenMapping = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/SetThreatenMapping"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.report.getPropertyByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/GetPropertyByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var contact = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, contact); }
        });
    }
    window.project.report.addProperty = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/AddProperty"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.report.updateProperty = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/UpdateProperty"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.report.deleteProperty = function (keys, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectReportService.asmx/DeleteProperty"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);
