////
////================================================================================
////  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
////  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
////================================================================================
////

//(function ($) {

//    if (!window.project) { window.project = new Object(); }
//    if (!window.project.surtable) { window.project.surtable = new Object(); }

//    window.project.surtable.getSurtableMainByKey = function (key, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/GetSurtableMainByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var role = $.parseJSON(result);
//            if ($.isFunction(callback)) { callback.call(this, role); }
//        });
//    }

//    window.project.surtable.addSurtableMain = function (obj, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/AddSurtableMain"), obj, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.updateSurtableMain = function (obj, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/UpdateSurtableMain"), obj, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.deleteSurtableMain = function (keys, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/DeleteSurtableMain"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.getSurtableDetailByKey = function (key, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/GetSurtableDetailByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var role = $.parseJSON(result);
//            if ($.isFunction(callback)) { callback.call(this, role); }
//        });
//    }

//    window.project.surtable.addSurtableDetail = function (obj, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/AddSurtableDetail"), obj, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.updateSurtableDetail = function (obj, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/UpdateSurtableDetail"), obj, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.deleteSurtableDetail = function (keys, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/DeleteSurtableDetail"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.getSurtableDetailBySubProjectSurtableMapping = function (key, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/GetSurtableDetailBySubProjectSurtableMapping"), { MappingKey: key }, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var returndata = $.parseJSON(result);
//            if ($.isFunction(callback)) { callback.call(this, returndata); }
//        });
//    }

//    window.project.surtable.addSurtableMappingOfSubProject = function (obj, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/AddSurtableMappingOfSubProject"), obj, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }
//    window.project.surtable.deleteSurtableMappingOfSubProject = function (obj, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/DeleteSurtableMappingOfSubProject"), obj, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.addSubProjectSurtable = function (obj, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/AddSubProjectSurtable"), obj, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.updateSubProjectSurtable = function (obj, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/UpdateSubProjectSurtable"), obj, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.deleteSubProjectSurtable = function (key, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/DeleteSubProjectSurtable"), { MasterKey: key }, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var success = (result.toLowerCase() == "true");
//            if ($.isFunction(callback)) { callback.call(this, success); }
//        });
//    }

//    window.project.surtable.getSubProjectSurtableDetailBySubProjectSurtableMapping = function (key, callback) {
//        $.post(window.resolveUrl("Services/Project/SubProjectSurtableService.asmx/GetSubProjectSurtableDetailBySubProjectSurtableMapping"), { MappingKey: key }, function (data, textStatus, XMLHttpRequest) {
//            var result = $(data).text();
//            var returndata = $.parseJSON(result);
//            if ($.isFunction(callback)) { callback.call(this, returndata); }
//        });
//    }

//    window.project.surtable.showSubtableSelector = function (key, onEnterClick, selected) {
//        var templatedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 58 });
//        var _templateFormatter = function (value) {
//            for (var i = 0; i < templatedata.length; i++) {
//                if (templatedata[i].Key == value) return templatedata[i].Name;
//            }
//            return value;
//        }
//        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
//        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
//        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
//        var options = {
//            title: '请选择调查表',
//            fitColumns: true,
//            rownumbers: true,
//            singleSelect: false,
//            url: window.resolveUrl('Services/Project/SubProjectSurtableService.asmx/GetPagingDataOfSubtableSelector'),
//            toolbar: toolbar,
//            queryParams: {
//                SubProjectKey: key,
//                name: ""
//            },
//            idField: 'Key',
//            columns: [[
//                            { field: 'ck', checkbox: true },
//                            { field: 'Code', title: '编号', width: 60, sortable: true },
//                            { field: 'Name', title: '名称', width: 120, sortable: true },
//                            { field: 'TypeKey', title: '模版类型', width: 90, sortable: true, formatter: _templateFormatter }
//                        ]],
//            pagination: true,
//            onEnterClick: onEnterClick
//        };
//        if (selected) {
//            $.extend(options, { selected: selected });
//        }
//        var selector = $.plugin.showSingleDataGridSelector(options);
//        $(selector.toolbar).find("#" + btnId).click(function () {
//            var name = selector.toolbar.find("#" + txtId).val();
//            selector.datagrid.datagrid("load", { SubProjectKey: key, name: name });
//        });
//    };

//})(jQuery);





