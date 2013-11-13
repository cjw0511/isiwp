//
//================================================================================
(function ($) {

    if (!window.business) { window.business = new Object(); }
    if (!window.business.projectPlanFile) { window.business.projectPlanFile = new Object(); }

    window.business.projectPlanFile.getProjectPlanFileByUserKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/ProjectPlanFileService.asmx/GetProjectPlanFileByUserKey"), { UserKey: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var projectPlanFile = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, projectPlanFile); }
        });
    }

    window.business.projectPlanFile.getProjectPlanFileByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/ProjectPlanFileService.asmx/GetProjectPlanFileByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var projectPlanFile = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, projectPlanFile); }
        });
    }

    window.business.projectPlanFile.addProjectPlanFile = function (projectPlanFileObj, callback) {
        //        for (var key in projectPlanFileObj) {
        //            alert(key);
        //        }
        $.post(window.resolveUrl("Services/Business/ProjectPlanFileService.asmx/AddProjectPlanFile"), projectPlanFileObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.projectPlanFile.updateProjectPlanFile = function (projectPlanFileObj, callback) {
//                for (var key in projectPlanFileObj) {
//                    alert(key);
//                }
        $.post(window.resolveUrl("Services/Business/ProjectPlanFileService.asmx/UpdateProjectPlanFile"), projectPlanFileObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.business.projectPlanFile.deleteProjectPlanFile = function (keys, callback) {
        $.post(window.resolveUrl("Services/Business/ProjectPlanFileService.asmx/DeleteProjectPlanFile"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);
