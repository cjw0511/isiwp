//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.company) { window.platform.company = new Object(); }

    window.platform.company.getCompanyInfo = function (callback) {
        $.post(window.resolveUrl("Services/Platform/CompanyService.asmx/GetCompany"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var info = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, info); }
        });
    }

    window.platform.company.updateCompanyInfo = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/CompanyService.asmx/UpdateCompany"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.company.getLegalPersonInfo = function (callback) {
        $.post(window.resolveUrl("Services/Platform/CompanyService.asmx/GetLegalPerson"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var info = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, info); }
        });
    }

    window.platform.company.updateLegalPersonInfo = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/CompanyService.asmx/UpdateLegalPerson"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.company.getLegalRepInfo = function (callback) {
        $.post(window.resolveUrl("Services/Platform/CompanyService.asmx/GetLegalRep"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var info = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, info); }
        });
    }
    window.platform.company.updateLegalRepInfo = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/CompanyService.asmx/UpdateLegalRep"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);