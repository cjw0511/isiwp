//
//================================================================================
//  该文件提供 Project 平台项目的公共 javascript 函数库，例如登录、验证、提取菜单、权限、拉取角色菜单等。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js 和 jq.extent.easyui.js 构建。
//================================================================================
//
(function ($) {
    if (!window.project) { window.project = new Object(); }


    //选择客户，传入的参数为一个回调函数
    window.project.showCustomerSelector = function (onEnterClick, selected) {

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
                { field: 'IndustryType', title: '行业类型', sortable: true, width: 100 },
                { field: 'CustomerType', title: '客户类型', sortable: true, width: 100 },
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
            selector.datagrid.datagrid("load", { name: name });
        });
    };




    //选择计划项目，传入的参数为一个回调函数
    window.project.showPlanProjectSelector = function (onEnterClick, selected) {

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
                name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Name', title: '项目名称', width: 150, sortable: true },
                { field: 'Code', title: '项目编号', width: 50, sortable: true },
				{ field: 'CustomerKey', title: '项目所属客户', width: 150, sortable: true, formatter: _customerFormatter },
				{ field: 'ProjectType', title: '项目类型', width: 100, sortable: true, formatter: _projectTypeFormatter },
                { field: 'Status', title: '项目状态', width: 100, sortable: true, formatter: _pstatusFormatter }
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


    //选择用户，传入的参数为一个回调函数
    window.project.showUserSelector = function (onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择员工',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Platform/UserService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name: ""
            },
            idField: 'Key',
            sortName: 'Key',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'Name', title: '姓名', width: 300, sortable: true }
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




    //选择职员，传入的参数为一个回调函数
    window.project.showEmployeeSelector = function (onEnterClick, selected) {
        var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 4 });
        var sexFormatter = function (value) {
            for (var i = 0; i < sexdata.length; i++) {
                if (sexdata[i].Key == value) return sexdata[i].Name;
            }
            return value;
        }

        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择职员',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Platform/EmployeeService.asmx/LoadGridData"),
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
                { field: 'Name', title: '姓名', width: 300, sortable: true },
                { field: 'SexKey', title: '性别', sortable: true, width: 100, formatter: sexFormatter }
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



    //选择角色，该方法为多选，传入的参数为一个回调函数
    window.project.showSubProjRoleMultipleSelector = function (onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择角色',
            fitColumns: true,
            rownumbers: true,
            singleSelect: false,
            url: window.resolveUrl("Services/Project/RoleService.asmx/LoadGridDataNoPaging"),
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
                            { field: 'Name', title: '名称', width: 300, sortable: true }
                        ]],
            pagination: false,
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




    //选择员工，该方法为多选，传入的参数为一个回调函数
    window.project.showSubProjRoleEmpMultipleSelector = function (onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择员工',
            fitColumns: true,
            rownumbers: true,
            singleSelect: false,
            url: window.resolveUrl("Services/Platform/EmployeeService.asmx/LoadGridData"),
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
                            { field: 'Name', title: '名称', width: 300, sortable: true }
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


    //选择整改方案，传入的参数为一个回调函数
    window.project.showRectiTemplateSelector = function (onEnterClick, selected) {

        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >整改方案名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择整改方案',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Project/SubRectificationService.asmx/LoadGridDataOfTemplate"),
            toolbar: toolbar,
            queryParams: {
                title: ""
            },
            idField: 'Key',
            sortName: 'Sort',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Title', title: '整改方案标题', width: 150, sortable: true },
                { field: 'Description', title: '方案描述', width: 200, sortable: true }
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

    //选择整改方案模板，传入的参数为一个回调函数
    window.project.showRectiMainSelector = function (onEnterClick, selected, TemplateKey) {
        var templatedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 58 });
        var _templateFormatter = function (value) {
            for (var i = 0; i < templatedata.length; i++) {
                if (templatedata[i].Key == value) return templatedata[i].Name;
            }
            return value;
        }
        var _rectificationFormatter = function (value) {
            if (value == "0") {
                return "文本";
            }
            else if (value == "1") {
                return "一维表";
            }
            else if (value == "2") {
                return "二维表";
            }
        }
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >整改方案模板名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择整改方案模板',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Project/SubRectificationService.asmx/LoadGridDataOfMainByKey"),
            toolbar: toolbar,
            queryParams: {
                title: "",
                templateType: -1,
                key: TemplateKey
            },
            idField: 'Key',
            sortName: 'Sort',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Title', title: '模板标题', width: 150, sortable: true },
                { field: 'TypeKey', title: '方案类型', width: 120, sortable: true, formatter: _templateFormatter },
                { field: 'TemplateType', title: '模版类型', width: 100, sortable: true, formatter: _rectificationFormatter },
                { field: 'Description', title: '模板描述', width: 200, sortable: true }
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
    //选择关联的测评对象，该方法为多选，传入的参数为一个回调函数
    window.project.showRelationObject = function (obj, onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var params = $.extend({}, obj, { name: "" });
        var options = {
            title: '请选择关联的测评对象',
            fitColumns: true,
            rownumbers: true,
            singleSelect: false,
            url: window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/GetRelationObject"),
            toolbar: toolbar,
            queryParams: params,
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                            { field: 'ck', checkbox: true },
                            { field: 'ObjectName', title: '对象名称', width: 200 }
                        ]],
            pagination: false,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            var param = $.extend({}, obj, { name: name });
            selector.datagrid.datagrid("load", param);
        });
    };
    //选择测评对象
    window.project.showSelectObject = function (obj, onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var params = $.extend({}, obj, { name: "" });
        var options = {
            title: '请选择测评对象',
            fitColumns: true,
            rownumbers: true,
            singleSelect: false,
            url: window.resolveUrl("Services/Project/SubProjectSolutionService.asmx/GetSelectObject"),
            toolbar: toolbar,
            queryParams: params,
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                            { field: 'ck', checkbox: true },
                            { field: 'ObjectName', title: '对象名称', width: 200 }
                        ]],
            pagination: false,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            var param = $.extend({}, obj, { name: name });
            selector.datagrid.datagrid("load", param);
        });
    };

    //选择关联资产
    window.project.showRelationProperty = function (obj, onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var params = $.extend({}, obj, { name: "" });
        var options = {
            title: '请选择关联资产',
            fitColumns: true,
            rownumbers: true,
            singleSelect: false,
            url: window.resolveUrl("Services/Project/SubProjectReportService.asmx/GetRelationProperty"),
            toolbar: toolbar,
            queryParams: params,
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                    { field: 'ck', checkbox: true },
                    { field: 'Name', title: '对象名称', width: 200 },
                    { field: 'ImportanceC', title: '重要性C', width: 100 },
                    { field: 'ImportanceI', title: '重要性I', width: 100 },
                    { field: 'ImportanceA', title: '重要性A', width: 100 }
                        ]],
            pagination: false,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            var param = $.extend({}, obj, { name: name });
            selector.datagrid.datagrid("load", param);
        });
    };

    //选择关联威胁
    window.project.showRelationThreaten = function (onEnterClick, selected) {
        var options = {
            title: '请选择关联资产',
            fitColumns: true,
            rownumbers: true,
            singleSelect: false,
            url: window.resolveUrl("Services/Project/SubProjectReportService.asmx/GetRelationThreaten"),
            queryParams: { name: "" },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                            { field: 'ck', checkbox: true },
                            { field: 'Name', title: '威胁名称', width: 200 },
                            { field: 'Type', title: '威胁类型', width: 100 },
                            { field: 'Description', title: '描述', width: 200 },
                            { field: 'Value', title: '威胁可能性', width: 100 }
                        ]],
            pagination: false,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
    };

})(jQuery);