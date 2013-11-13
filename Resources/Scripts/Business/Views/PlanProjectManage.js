/*
==============================================================================
//  计划项目管理页面 PlanProjectManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.PlanProjectManage_aspx) { window.business.PlanProjectManage_aspx = new Object(); }
    window.business.PlanProjectManage_aspx.initPage = function (ajaxContainerSelector) {
        var cusdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 37 });
        var _cusFormatter = function (value) {
            for (var i = 0; i < cusdata.length; i++) {
                if (cusdata[i].Value == value) return cusdata[i].Name;
            }
            return value;
        }

        ////搜索条件选择客户单位///////////////////////////////////////////
        $("#selCustomer", ajaxContainerSelector).combogrid({
            title: '选择客户单位',
            fit: true,
            fitColumns: true,
            border: true,
            singleSelect: true,
            rownumbers: true,
            panelWidth: 430,
            panelHeight: 340,
            idField: 'Key',
            textField: 'Name',
            url: window.resolveUrl('Services/Business/CustomerService.asmx/LoadGridData'),
            queryParams: {
                Name: ""
            },
            columns: [[
                { field: 'Name', title: '客户名称', width: 250, sortable: true },
                { field: 'CustomerType', title: '客户类型', width: 50, sortable: true, formatter: _cusFormatter }
			    ]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true

        });

        $("#selProjectType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name"
        });

        var data = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 36 });
        data.unshift({ Key: -1, Name: '全部' });
        $("#selProjectType", ajaxContainerSelector).combobox("loadData", data).combobox("setValue", -1);


        $("#selActiveStatus", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name"
        });

        var activedata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 51 });
        activedata.unshift({ Key: -1, Name: '全部' });
        $("#selActiveStatus", ajaxContainerSelector).combobox("loadData", activedata).combobox("setValue", -1);

        var _bindControl = function () {

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

            var statusdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 51 });
            var _activeStatusFormatter = function (value) {
                for (var i = 0; i < statusdata.length; i++) {
                    if (statusdata[i].Key == value) { return statusdata[i].Name; }
                }
                return value;
            }

            var options = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Business/PlanProjectService.asmx/LoadGridDataOfProjectManage'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    Name: function () { return $("#txtProjectName", ajaxContainerSelector).val().trim(); },
                    Type: function () { return $("#selProjectType", ajaxContainerSelector).combotree("getValue"); },
                    CustKey: function () { var key = $("#selCustomer", ajaxContainerSelector).combotree("getValue"); if (key.isNullOrWhiteSpace()) { key = -1 } return key; },
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '项目名称', width: 150, sortable: true}]],
                columns: [[
				{ field: 'CustomerKey', title: '项目所属客户', width: 150, sortable: true, formatter: _customerFormatter },
				{ field: 'ProjectType', title: '项目类型', width: 90, sortable: true, formatter: _projectTypeFormatter },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {

                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.PlanProjectManage_aspx.delPlanProject(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(delspan);
                        return div.html();
                    }
                }

			]],
                sortName: 'CreateDate',
                sortOrder: 'desc',
                pagination: true,

                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.PlanProjectManage_aspx.editPlanProject(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.PlanProjectManage_aspx.delPlanProject(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加新计划项目",
                            href: "Views/Business/PlanProjectAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var planProject = $(dialog).form('getData');

                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加计划项目信息成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加计划项目信息失败。");
                                    };
                                };
                                window.business.planProject.addPlanProject(planProject, _callback);
                            },
                            width: 900,
                            height: 350
                        });
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var ids = [];
                        var names = [];
                        var rows = $('#Grid', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].Key);
                                names.push(rows[i].Name);
                            }
                            window.business.PlanProjectManage_aspx.delPlanProject(ids.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                    }
                }],
                animate: true,
                onSelect: function (rowIndex, rowData) {
                    window.business.planProject.getPlanProjectByKey(rowData.Key, function (planProject) {
                        $("#txtName", ajaxContainerSelector).validatebox({
                            required: true,
                            validType: ['name', 'updateValidate["计划项目名称","Services/Business/PlanProjectService.asmx/ajaxAddValid","Name",' + rowData.Key + ']']
                        });
                        $("#txtCode", ajaxContainerSelector).validatebox({
                            required: true,
                            validType: ['code', 'updateValidate["编号","Services/Business/PlanProjectService.asmx/ajaxAddValid","Code",' + rowData.Key + ']']
                        });
                        $("#CustomerKey7", ajaxContainerSelector).val(planProject.CustomerKey);
                        if (planProject.CustomerKey != '0' && planProject.CustomerKey != undefined) {
                            window.business.customer.getCustomerByKey(planProject.CustomerKey, function (customer) {
                                if (customer)
                                    $("#txtCustomer7", ajaxContainerSelector).searchbox("setValue", customer.Name);
                                $("#txtCustomer7", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }
                        $("#EmployeeKey7", ajaxContainerSelector).val(planProject.EmployeeKey);
                        if (planProject.EmployeeKey != '0' && planProject.EmployeeKey != undefined) {
                            window.platform.user.getUserByKey(planProject.EmployeeKey, function (employee) {
                                if (employee)
                                    $("#txtEmployee7", ajaxContainerSelector).searchbox("setValue", employee.Name);
                                $("#txtEmployee7", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                            });
                        }
                        $(ajaxContainerSelector).form('loadData', planProject);
                        _InitContract(rowData.Key);
                        _InitPlanFile(rowData.Key);
                        _InitBusinessFollow(rowData.Key);
                        _InitTender(rowData.Key);
                        _InitBidding(rowData.Key);

                    });
                }
            };
            $("#Grid", ajaxContainerSelector).datagrid(options);

            /******表单验证 start******/
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["计划项目名称","Services/Business/PlanProjectService.asmx/ajaxAddValid","Name"]']
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["编号","Services/Business/PlanProjectService.asmx/ajaxAddValid","Code"]']
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });
            $("#txtManager", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });
            $("#selProjectType1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 36 }
            });
            $("#selProjectType1", ajaxContainerSelector).combobox("setValue", 0);
//            $("#selActiveStatus1", ajaxContainerSelector).combobox({
//                valueField: 'Key',
//                textField: "Name",
//                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
//                queryParams: { MainKey: 51 }
//            });
//            $("#selActiveStatus1", ajaxContainerSelector).combobox("setValue", 0);
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            $("#txtCustomer7", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#CustomerKey7").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#CustomerKey7").val(selections[0].Key);
                            $("#txtCustomer7").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showCustomerSelector(onEnterClick, selected);
                }
            });
            $("#txtCustomer7", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtCustomer7", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            
            $("#txtEmployee7", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#EmployeeKey7").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#EmployeeKey7").val(selections[0].Key);
                            $("#txtEmployee7").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtEmployee7", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtEmployee7", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        };

        var _bindButtonEvent = function () {
            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtProjectName", ajaxContainerSelector).val('');
                $("#selCustomer", ajaxContainerSelector).combogrid("clear");
                $("#selProjectType", ajaxContainerSelector).combobox("setValue", "-1");
                $("#selActiveStatus", ajaxContainerSelector).combobox("setValue", "-1");
            });
            $("#ProjectPanel, ajaxContainerSelector").panel({
                title: '计划项目管理',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#ProjectLayout", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });

            $("#a_clear", ajaxContainerSelector).click(function () {
                $("#CustomerKey7", ajaxContainerSelector).val('0');
                $("#txtCustomer7", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#b_clear", ajaxContainerSelector).click(function () {
                $("#EmployeeKey7", ajaxContainerSelector).val('0');
                $("#txtEmployee7", ajaxContainerSelector).searchbox("setValue", "");
            });
            $("#CustomerKey7", ajaxContainerSelector).val();
            $("#EmployeeKey7", ajaxContainerSelector).val();

            $("#btnSave", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form("validate");
                if (!verifyResult) { return false };

                var planProject = $(ajaxContainerSelector).form('getData');
                var row = $("#Grid", ajaxContainerSelector).datagrid("getSelected");
                if (!row) {
                    $.plugin.showMessage("请在左边表格选择跟进记录!");
                    return;
                }
                $.extend(planProject, { Key: row.Key });

                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改计划项目信息成功。");
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                    } else {
                        $.plugin.showMessage("修改计划项目信息失败。");
                    }
                };
                window.business.planProject.updatePlanProject(planProject, _callback);
            });
        };
        _bindControl();
        _bindButtonEvent();

        window.business.PlanProjectManage_aspx.editPlanProject = function (key) {
            window.business.planProject.getPlanProjectByKey(key, function (planProject) {
                $("#txtName", ajaxContainerSelector).validatebox({
                    required: true,
                    validType: ['name', 'updateValidate["计划项目名称","Services/Business/PlanProjectService.asmx/ajaxAddValid","Name",' + key + ']']
                });
                $("#txtCode", ajaxContainerSelector).validatebox({
                    required: true,
                    validType: ['code', 'updateValidate["编号","Services/Business/PlanProjectService.asmx/ajaxAddValid","Code",' + key + ']']
                });
                $("#CustomerKey", ajaxContainerSelector).val(planProject.CustomerKey);
                if (planProject.CustomerKey != '0' && planProject.CustomerKey != undefined) {
                    window.business.customer.getCustomerByKey(planProject.CustomerKey, function (customer) {
                        if (customer)
                            $("#txtCustomer", ajaxContainerSelector).searchbox("setValue", customer.Name);
                        $("#txtCustomer", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }

                $("#EmployeeKey", ajaxContainerSelector).val(planProject.EmployeeKey);
                if (planProject.EmployeeKey != '0' && planProject.EmployeeKey != undefined) {
                    window.platform.employee.getEmployeeByKey(planProject.EmployeeKey, function (employee) {
                        if (employee)
                            $("#txtEmployee", ajaxContainerSelector).searchbox("setValue", employee.Name);
                        $("#txtEmployee", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }
                $(ajaxContainerSelector).form('loadData', planProject);

                _InitContract(key);
                _InitPlanFile(key);
                _InitBusinessFollow(key);
                _InitTender(key);
                _InitBidding(key);
            });
        }

        window.business.PlanProjectManage_aspx.delPlanProject = function (keys, names) {
            $.plugin.messager.confirm("提示", "该操作将会同时删除相关的项目计划书、招标信息、商务跟进，点击确定将删除<b><span style='color:red'>" + names + "</span></b><br /><br/>是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除计划项目成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("您需要先删除与所选计划项目相关的已启动项目，删除计划项目失败。");
                        }
                    };
                    window.business.planProject.deletePlanProject(keys, _callback);
                }
            });
        }

        //首次加载合同信息
        var typedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 43 });
        var _contractTypeFormatter = function (value) {
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

        var projectdata = $.plugin.getJsonDataRequestWebService("Services/Business/PlanProjectService.asmx/GetAllPlanProject", null);
        var _projectFormatter = function (value) {
            for (var i = 0; i < projectdata.length; i++) {
                if (projectdata[i].Key == value) { return projectdata[i].Name; }
            }
            return value;
        }
        var options = {
            fit: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            border: false,
            rownumbers: true,
            nowrap: true,
            idField: 'Key',
            frozenColumns: [[{ field: 'ck', checkbox: true },
			{ field: 'Name', title: '合同名称', width: 150, sortable: true }]],
            columns: [[
			{ field: 'ContractType', title: '合同类型', width: 80, sortable: true, formatter: _contractTypeFormatter },
            { field: 'opt', title: '操作', width: 60, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    var editbtn = $("<a title='点击按钮，该记录将关联到合同信息管理'></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.PlanProjectManage_aspx.editContract(\'' + rowData.Key + '\');');
                    var div = $("<div></div>").append(editbtn);
                    return div.html();
                }
            }
            ]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true
        }
        $("#ContractGrid", ajaxContainerSelector).datagrid(options);

        var _employeeFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/EmployeeService.asmx/GetAllEmployee", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) return data[i].Name;
            }
            return value;
        }
        var _customerFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Business/CustomerService.asmx/GetAllCustomer", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) { return data[i].Name; }
            }
            return value;
        }
        var _planprojectFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Business/PlanProjectService.asmx/GetAllPlanProject", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) { return data[i].Name; }
            }
            return value;
        }
        var _reviewstatusFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 44 });
            for (var i = 0; i < data.length; i++) {
                if (data[i].Value == value) return data[i].Name;
            }
            return value;
        }
        var options = {
            fit: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            border: false,
            rownumbers: true,
            nowrap: true,
            idField: 'Key',
            frozenColumns: [[{ field: 'ck', checkbox: true },
			{ field: 'Name', title: '项目计划书名称', width: 150, sortable: true}]],
            columns: [[
            { field: 'EmployeeKey', title: '负责人', width: 80, sortable: true, formatter: _employeeFormatter },
			{ field: 'ReviewStatus', title: '评审状态', width: 80, sortable: true, formatter: _reviewstatusFormatter },
            { field: 'opt', title: '操作', width: 60, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    var editbtn = $("<a title='点击按钮，该记录将关联到项目计划书管理'></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.PlanProjectManage_aspx.editPlanFile(\'' + rowData.Key + '\');');
                    var div = $("<div></div>").append(editbtn);
                    return div.html();
                }
            }
            ]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true
        }
        $("#PlanFileGrid", ajaxContainerSelector).datagrid(options);

        //首次加载商务跟进信息
        var _planprojectFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Business/PlanProjectService.asmx/GetAllPlanProject", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) { return data[i].Name; }
            }
            return value;
        }
        var _employeeFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/UserService.asmx/GetAllUser", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) return data[i].Name;
            }
            return value;
        }

        var _businessFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 48 });
            for (var i = 0; i < data.length; i++) {
                if (data[i].Value == value) return data[i].Name;
            }
            return value;
        }
        var options = {
            fit: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            border: false,
            rownumbers: true,
            nowrap: true,
            idField: 'Key',
            frozenColumns: [[{ field: 'ck', checkbox: true }
            ]],
            columns: [[
			{ field: 'ContactDate', title: '接洽时间', width: 100, sortable: true, formatter: function (value) { return value.toDate().format() } },
            { field: 'BusinessForms', title: '商务形式', width: 80, sortable: true, formatter: _businessFormatter },
            { field: 'ContactMan', title: '接洽人员', width: 80, sortable: true },
            { field: 'BusiEmployeeKey', title: '商务人员', width: 80, sortable: true, formatter: _employeeFormatter },
            { field: 'TechnicalEmployeeKey', title: '技术人员', width: 80, sortable: true, formatter: _employeeFormatter },
            { field: 'opt', title: '操作', width: 60, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    var editbtn = $("<a title='点击按钮，该记录将关联到商务跟进管理'></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.PlanProjectManage_aspx.editBusinessFollow(\'' + rowData.Key + '\');');
                    var div = $("<div></div>").append(editbtn);
                    return div.html();
                }
            }
			]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true
        }
        $("#BusinessFollowGrid", ajaxContainerSelector).datagrid(options);

        //首次加载招标信息
        var _planprojectFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Business/PlanProjectService.asmx/GetAllPlanProject", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) { return data[i].Name; }
            }
            return value;
        }


        var _statusFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 45 });
            for (var i = 0; i < data.length; i++) {
                if (data[i].Value == value) return data[i].Name;
            }
            return value;
        }

        var _tendTypeFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 46 });
            for (var i = 0; i < data.length; i++) {
                if (data[i].Value == value) return data[i].Name;
            }
            return value;
        }

        var options = {
            fit: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            border: false,
            rownumbers: true,
            nowrap: true,
            idField: 'Key',
            frozenColumns: [[{ field: 'ck', checkbox: true },
			{ field: 'Name', title: '招标名称', width: 120, sortable: true }
            ]],
            columns: [[
            { field: 'OffDate', title: '报名截止时间', width: 120, sortable: true, formatter: function (value) { return value.toDate().format() } },
            { field: 'TenderType', title: '招标类型', width: 80, sortable: true, formatter: _tendTypeFormatter },
            { field: 'opt', title: '操作', width: 60, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    var editbtn = $("<a title='点击按钮，该记录将关联到招标信息管理'></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.PlanProjectManage_aspx.editTender(\'' + rowData.Key + '\');');
                    var div = $("<div></div>").append(editbtn);
                    return div.html();
                }
            }
			]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true
        }
        $("#TenderGrid", ajaxContainerSelector).datagrid(options);

        //首次加载投标信息
        var _projectFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Business/PlanProjectService.asmx/GetAllPlanProject", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) { return data[i].Name; }
            }
            return value;
        }


        var _bidStatusFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 47 });
            for (var i = 0; i < data.length; i++) {
                if (data[i].Value == value) return data[i].Name;
            }
            return value;
        }

        var _employeeFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/UserService.asmx/GetAllUser", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) return data[i].Name;
            }
            return value;
        }

        var options = {
            fit: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            border: false,
            rownumbers: true,
            nowrap: true,
            idField: 'Key',
            frozenColumns: [[{ field: 'ck', checkbox: true },
			{ field: 'Name', title: '投标名称', width: 120, sortable: true }
            ]],
            columns: [[
            { field: 'BiddingDate', title: '投标时间', width: 90, sortable: true, formatter: function (value) { return value.toDate().format() } },
            { field: 'EmployeeKey', title: '投标负责人', width: 100, sortable: true, formatter: _employeeFormatter },
            { field: 'opt', title: '操作', width: 60, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    var editbtn = $("<a title='点击按钮，该记录将关联到投标信息管理'></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.PlanProjectManage_aspx.editBidding(\'' + rowData.Key + '\');');
                    var div = $("<div></div>").append(editbtn);
                    return div.html();
                }
            }
			]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true
        }
        $("#BiddingGrid", ajaxContainerSelector).datagrid(options);

        //加载合同信息
        var _InitContract = function (key) {
            var param = { Key: function () { return key; } };
            $("#ContractGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Business/ContractService.asmx/LoadGridDataOfContractManageByKey');
            $("#ContractGrid", ajaxContainerSelector).datagrid('load', param);
        };
        window.business.PlanProjectManage_aspx.editContract = function (key) {
            window.addTab({ title: "合同信息管理", href: "Views/Business/ContractManage.aspx", iconCls: '', closable: true, selected: true });
        }
        //加载项目计划书
        var _InitPlanFile = function (key) {
            var param = { Key: function () { return key; } };
            $("#PlanFileGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Business/ProjectPlanFileService.asmx/LoadGridDataOfRecordManageByPlanProjectKey');
            $("#PlanFileGrid", ajaxContainerSelector).datagrid('load', param);
        };

        window.business.PlanProjectManage_aspx.editPlanFile = function (key) {
            window.addTab({ title: "项目计划书管理", href: "Views/Business/ProjectPlanFileManage.aspx", iconCls: '', closable: true, selected: true });
        }

        //加载商务跟进
        var _InitBusinessFollow = function (key) {
            var param = { Key: function () { return key; } };
            $("#BusinessFollowGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Business/BusinessFollowService.asmx/LoadGridDataOfBFByProjectKey');
            $("#BusinessFollowGrid", ajaxContainerSelector).datagrid('load', param);
        };

        window.business.PlanProjectManage_aspx.editBusinessFollow = function (key) {
            window.addTab({ title: "商务跟进管理", href: "Views/Business/BusinessFollowManage.aspx", iconCls: '', closable: true, selected: true });
        }

        //加载招标信息
        var _InitTender = function (key) {
            var param = { PlanProjectKey: function () { return key; } };
            $("#TenderGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Business/TenderInfoService.asmx/LoadGridDataOfTenderInfoByPlanProjectKey');
            $("#TenderGrid", ajaxContainerSelector).datagrid('load', param);
        };

        window.business.PlanProjectManage_aspx.editTender = function (key) {
            window.addTab({ title: "招标信息登记", href: "Views/Business/TenderInfoManage.aspx", iconCls: '', closable: true, selected: true });
        }

        //加载投标信息
        var _InitBidding = function (key) {
            var param = { PlanProjectKey: function () { return key; } };
            $("#BiddingGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Business/BiddingService.asmx/LoadGridDataOfBiddingByPlanProjectKey');
            $("#BiddingGrid", ajaxContainerSelector).datagrid('load', param);
        };

        window.business.PlanProjectManage_aspx.editBidding = function (key) {
            window.addTab({ title: "投标管理", href: "Views/Business/BiddingManage.aspx", iconCls: '', closable: true, selected: true });
        }
    };
})(jQuery);
