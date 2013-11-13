﻿//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.business) { window.business = new Object(); }
    if (!window.business.planProject) { window.business.planProject = new Object(); }

    window.business.planProject.getPlanProjectByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/PlanProjectService.asmx/GetPlanProjectByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var planProject = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, planProject); }
        });
    }



    window.business.planProject.addPlanProject = function (planProjectObj, callback) {
        $.post(window.resolveUrl("Services/Business/PlanProjectService.asmx/AddPlanProject"), planProjectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.planProject.updatePlanProject = function (planProjectObj, callback) {
        $.post(window.resolveUrl("Services/Business/PlanProjectService.asmx/UpdatePlanProject"), planProjectObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }


    window.business.planProject.deletePlanProject = function (keys, callback) {
        
        $.post(window.resolveUrl("Services/Business/PlanProjectService.asmx/DeletePlanProject"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);





