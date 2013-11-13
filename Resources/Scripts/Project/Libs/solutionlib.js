//
//================================================================================
//  该文件提供 Project 平台项目的商务处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.solution) { window.project.solution = new Object(); }

    window.project.solution.getSystemRelationTree = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/GetSystemRelationTree"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, json); }
        });
    }

    
    window.project.solution.getSelectTierTreeData = function (callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/GetSelectTierTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var returndata = window.platform.convert.toTreeData(json);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.project.solution.setSystemRelation = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/SetSystemRelation"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.solution.setSelectObject = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/SetSelectObject"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.solution.deleteSystemRelation = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/DeleteSystemRelation"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.solution.deleteSelectObject = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/DeleteSelectObject"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.solution.getSubProjectSolution = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/GetSubProjectSolution"), obj, function (data, textStatus, XMLHttpRequest) {
            if ($.isFunction(callback)) { callback.call(this, $.plugin.parseSOADataToJSON(data)) }
        });
    }

    window.project.solution.createSolution = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/CreateSolution"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.project.solution.deleteSolution = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/DeleteSolution"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.solution.createWorkInstru = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/CreateWorkInstru"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.project.solution.deleteWorkInstru = function (obj, callback) {
        $.post(window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/DeleteWorkInstru"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);