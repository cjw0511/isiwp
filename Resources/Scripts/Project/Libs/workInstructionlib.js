//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.project) { window.project = new Object(); }
    if (!window.project.workInstr) { window.project.workInstr = new Object(); }

    window.project.workInstr.getSurtableMainByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/WorkInstructionService.asmx/GetSurtableMainByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var role = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, role); }
        });
    }


    window.project.workInstr.loadWorkInstr = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/WorkInstructionService.asmx/LoadWorkInstr"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var data = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, data); }
        });
    }

    window.project.workInstr.saveSubProjectItem = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/WorkInstructionService.asmx/SaveSubProjectItem"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.workInstr.getWorkReportByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Project/WorkInstructionService.asmx/GetWorkReportByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var project = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, project); }
        });
    }
    /// 保存报告编制编辑
    window.project.workInstr.saveReportSubProjectItem = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/WorkInstructionService.asmx/SaveReportSubProjectItem"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    /// 设置报告是否提供下载
    window.project.workInstr.setReportStatus = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/WorkInstructionService.asmx/SetReportStatus"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);