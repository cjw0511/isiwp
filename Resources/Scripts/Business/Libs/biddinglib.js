﻿//
//================================================================================
//  该文件提供 Business 平台项目的商务处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.bidding) { window.business.bidding = new Object(); }

    // 投标管理
    window.business.bidding.getBiddingByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/BiddingService.asmx/GetBiddingByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var bidding = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, bidding); }
        });
    }

    window.business.bidding.addBidding = function (biddingObj, callback) {
        $.post(window.resolveUrl("Services/Business/BiddingService.asmx/AddBidding"), biddingObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.bidding.updateBidding = function (biddingObj, callback) {
        $.post(window.resolveUrl("Services/Business/BiddingService.asmx/UpdateBidding"), biddingObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.bidding.deleteBidding = function (keys, callback) {
        $.post(window.resolveUrl("Services/Business/BiddingService.asmx/DeleteBidding"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);
