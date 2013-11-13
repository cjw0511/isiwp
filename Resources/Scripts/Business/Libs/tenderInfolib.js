//
//================================================================================
//  该文件提供 Business 平台项目的商务处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.tenderInfo) { window.business.tenderInfo = new Object(); }

    // 招标信息管理
    window.business.tenderInfo.getTenderInfoByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/TenderInfoService.asmx/GetTenderInfoByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var tenderInfo = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, tenderInfo); }
        });
    }

    window.business.tenderInfo.addTenderInfo = function (tenderInfoObj, callback) {
        $.post(window.resolveUrl("Services/Business/TenderInfoService.asmx/AddTenderInfo"), tenderInfoObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.tenderInfo.updateTenderInfo = function (tenderInfoObj, callback) {
        $.post(window.resolveUrl("Services/Business/TenderInfoService.asmx/UpdateTenderInfo"), tenderInfoObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.tenderInfo.deleteTenderInfo = function (keys, callback) {
        $.post(window.resolveUrl("Services/Business/TenderInfoService.asmx/DeleteTenderInfo"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);
