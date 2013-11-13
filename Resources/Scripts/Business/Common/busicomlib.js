//
//================================================================================
//  该文件提供 Business 平台项目的公共 javascript 函数库，例如登录、验证、提取菜单、权限、拉取角色菜单等。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js 和 jq.extent.easyui.js 构建。
//================================================================================
//
(function ($) {
    if (!window.business) { window.business = new Object(); }


    //选择客户，传入的参数为一个回调函数
    window.business.showCustomerSelector = function (onEnterClick, selected) {
        var _khlxFormatter = function (value) {
            var khlxdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 1 });
            for (var i = 0; i < khlxdata.length; i++) {
                if (khlxdata[i].Value == value) return khlxdata[i].Name;
            }
            return value;
        }
        var _khhyFormatter = function (value) {
            var khhydata = $.plugin.getJsonDataRequestWebService("Services/LoreLibs/NormService.asmx/GetTrade");
            for (var i = 0; i < khhydata.length; i++) {
                if (khhydata[i].Key == value) return khhydata[i].Name;
            }
            return value;
        }
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >客户名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择客户',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Business/CustomerService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                Name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'Name', title: '客户名称', width: 300, sortable: true },
                { field: 'IndustryType', title: '行业类型', sortable: true, width: 100, formatter: _khhyFormatter },
                { field: 'CustomerType', title: '客户类型', sortable: true, width: 100, formatter: _khlxFormatter },
                { field: 'Tel', title: '联系电话', width: 200, sortable: true }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { Name: name });
        });
    };

    //选择信息系统，传入的参数为一个回调函数
    window.business.showInfoSystemSelector = function (onEnterClick, selected) {

        var _infoSysFormatter = function (value) {
            var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 35 });
            for (var i = 0; i < sexdata.length; i++) {
                if (sexdata[i].Key == value) return sexdata[i].Name;
            }
            return value;
        }

        var customerdata = $.plugin.getJsonDataRequestWebService("Services/Business/CustomerService.asmx/GetAllCustomer", null);
        var _customerFormatter = function (value) {
            for (var i = 0; i < customerdata.length; i++) {
                if (customerdata[i].Key == value) { return customerdata[i].Name; }
            }
            return value;
        }

        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >信息系统名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        
        var options = {
            title: '请选择信息系统',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Business/InfoSystemService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'Name', title: '信息系统名称', width: 300, sortable: true },
                { field: 'CustomerKey', title: '所属客户', width: 200, sortable: true, formatter: _customerFormatter },
                { field: 'InfoSystemType', title: '信息系统类型', sortable: true, width: 100, formatter: _infoSysFormatter },
                { field: 'Manager', title: '客户方负责人', sortable: true, width: 100 },
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };


    //选择计划项目，传入的参数为一个回调函数
    window.business.showPlanProjectSelector = function (onEnterClick, selected) {

        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >计划项目名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";

        var typedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 36 });
        var _projectTypeFormatter = function (value) {
            for (var i = 0; i < typedata.length; i++) {
                if (typedata[i].Key == value) { return typedata[i].Name; }
            }
            return value;
        }


        var customerdata = $.plugin.getJsonDataRequestWebService("Services/Business/CustomerService.asmx/GetAllCustomer", null);
        var _customerFormatter = function (value) {
            for (var i = 0; i < customerdata.length; i++) {
                if (customerdata[i].Key == value) { return customerdata[i].Name; }
            }
            return value;
        }

        var pstatusdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 51 });
        var _pstatusFormatter = function (value) {
            for (var i = 0; i < pstatusdata.length; i++) {
                if (pstatusdata[i].Key == value) { return pstatusdata[i].Name; }
            }
            return value;
        }

        var options = {
            title: '请选择计划项目',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Business/PlanProjectService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name:""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Name', title: '项目名称', width: 150, sortable: true },
                { field: 'Code', title: '项目编号', width: 50, sortable: true},
				{ field: 'CustomerKey', title: '项目所属客户', width: 150, sortable: true, formatter: _customerFormatter },
				{ field: 'ProjectType', title: '项目类型', width: 100, sortable: true, formatter: _projectTypeFormatter },
                { field: 'Status', title: '项目状态', width: 100, sortable: true, formatter:_pstatusFormatter}
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };

    //选择招标信息，传入的参数为一个回调函数
    window.business.showTenderInfoSelector = function (onEnterClick, selected) {

        var _TSFormatter = function (value) {
            var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 45 });
            for (var i = 0; i < sexdata.length; i++) {
                if (sexdata[i].Key == value) return sexdata[i].Name;
            }
            return value;
        }
        var _TTFormatter = function (value) {
            var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 46 });
            for (var i = 0; i < sexdata.length; i++) {
                if (sexdata[i].Key == value) return sexdata[i].Name;
            }
            return value;
        }

        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >招标项目名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";

        var options = {
            title: '请选择招标项目',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Business/TenderInfoService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                Name: "",
                Type: -1,
                CustKey: -1
            },
            idField: 'Key',
            sortName: 'TenderStatus',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Name', title: '名称', width: 150, sortable: true },
                { field: 'TenderStatus', title: '招标状态', width: 50, sortable: true, formatter: _TSFormatter },
				{ field: 'TenderType', title: '招标类型', width: 150, sortable: true, formatter: _TTFormatter },
				{ field: 'BidOpenDate', title: '开标时间', width: 100, sortable: true }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { Name: name });
        });
    };



    //选择投标信息，传入的参数为一个回调函数
    window.business.showBiddingSelector = function (onEnterClick, selected) {

        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >投标名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var _BSFormatter = function (value) {
            var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 47 });
            for (var i = 0; i < sexdata.length; i++) {
                if (sexdata[i].Key == value) return sexdata[i].Name;
            }
            return value;
        }
        var employeedata = $.plugin.getJsonDataRequestWebService("Services/Platform/UserService.asmx/GetAllUser", null);
        var _employeeFormatter = function (value) {
            for (var i = 0; i < employeedata.length; i++) {
                if (employeedata[i].Key == value) { return employeedata[i].Name; }
            }
            return value;
        }
        var options = {
            title: '请选择投标项目',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Business/BiddingService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name: "",
                Type: -1,
                CustKey: -1
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Name', title: '名称', width: 150, sortable: true },
                { field: 'BiddingStatus', title: '投标状态', width: 100, sortable: true, formatter: _BSFormatter },
                { field: 'BiddingDate', title: '投标时间', width: 90, sortable: true },
                { field: 'EmployeeKey', title: '投标负责人', width: 100, sortable: true, formatter: _employeeFormatter }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };




})(jQuery);





