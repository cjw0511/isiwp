//
//================================================================================
//  该文件提供 Business 平台项目的商务处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.infoSystem) { window.business.infoSystem = new Object(); }

    window.business.infoSystem.getInfoSystemByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/InfoSystemService.asmx/GetInfoSystemByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var infoSystem = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, infoSystem); }
        });
    }

    window.business.infoSystem.addInfoSystem = function (infoSystemObj, callback) {
        $.post(window.resolveUrl("Services/Business/InfoSystemService.asmx/AddInfoSystem"), infoSystemObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.infoSystem.updateInfoSystem = function (infoSystemObj, callback) {
        $.post(window.resolveUrl("Services/Business/InfoSystemService.asmx/UpdateInfoSystem"), infoSystemObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.infoSystem.deleteInfoSystem = function (keys, callback) {
        $.post(window.resolveUrl("Services/Business/InfoSystemService.asmx/DeleteInfoSystem"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    // 测评记录管理

    window.business.infoSystem.getInfoSystemEvaluateRecordByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/InfoSystemService.asmx/GetInfoSystemEvaluateRecordByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var infoSystem = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, infoSystem); }
        });
    }

    window.business.infoSystem.addInfoSystemEvaluateRecord = function (infoSystemObj, callback) {
        $.post(window.resolveUrl("Services/Business/InfoSystemService.asmx/AddInfoSystemEvaluateRecord"), infoSystemObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.infoSystem.updateInfoSystemEvaluateRecord = function (infoSystemObj, callback) {
        $.post(window.resolveUrl("Services/Business/InfoSystemService.asmx/UpdateInfoSystemEvaluateRecord"), infoSystemObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.infoSystem.deleteInfoSystemEvaluateRecord = function (keys, callback) {
        $.post(window.resolveUrl("Services/Business/InfoSystemService.asmx/DeleteInfoSystemEvaluateRecord"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);