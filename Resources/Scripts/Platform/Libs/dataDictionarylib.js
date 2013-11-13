//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.datadictionary) { window.platform.datadictionary = new Object(); }

    window.platform.datadictionary.getMasterTreeData = function (callback) {

        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/LoadMasterTreeData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = [{ id: '0', text: '类别', children: treedata}];
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.datadictionary.getMasterComboBoxData = function (callback) {

        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/LoadMasterComboBoxData"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            var returndata = treedata;
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }

    window.platform.datadictionary.getMasterDataByKey = function (key, callback) {

        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetMasterDataByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var datadictionary = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, datadictionary); }
        });
    }

    window.platform.datadictionary.addMasterData = function (obj, callback) {

        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/AddMasterData"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.datadictionary.updateMasterData = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/UpdateMasterData"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.datadictionary.deleteMasterData = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/DeleteMasterData"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.datadictionary.moveMasterData = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/MoveMasterData"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.datadictionary.getDetailDataById = function (id, callback) {
        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataById"), { Id: id }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var datadictionary = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, datadictionary); }
        });
    }

    window.platform.datadictionary.addDetailData = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/AddDetailData"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.datadictionary.updateDetailData = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/UpdateDetailData"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.datadictionary.deleteDetailData = function (ids, callback) {
        $.post(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/DeleteDetailData"), { Ids: ids }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);





