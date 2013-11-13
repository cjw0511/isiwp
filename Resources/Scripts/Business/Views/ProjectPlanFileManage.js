/*
==============================================================================
//  项目计划书管理页面 ProjectPlanFileManage.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ProjectPlanFileManage_aspx) { window.business.ProjectPlanFileManage_aspx = new Object(); }
    window.business.ProjectPlanFileManage_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            $("#selReviewSearch", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name"
            });
            var data = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 44 });
            data.unshift({ Key: -1, Name: '全部' });
            $("#selReviewSearch", ajaxContainerSelector).combobox("loadData", data).combobox("setValue", -1);

            var _employeeFormatter = function (value) {
                var data = $.plugin.getJsonDataRequestWebService("Services/Platform/UserService.asmx/GetAllUser", null);
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
                url: window.resolveUrl('Services/Business/ProjectPlanFileService.asmx/LoadGridData'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    Name: function () { return $("#txtNameSearch", ajaxContainerSelector).val().trim(); },
                    Status: function () { return $("#selReviewSearch", ajaxContainerSelector).combobox("getValue"); }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '项目计划书名称', width: 180, sortable: true}]],
                columns: [[
                { field: 'PlanProjectKey', title: '所属计划项目', width: 120, sortable: true, formatter: _planprojectFormatter },
                { field: 'EmployeeKey', title: '计划书负责人', width: 110, sortable: true, formatter: _employeeFormatter },
				{ field: 'ReviewStatus', title: '评审状态', width: 90, sortable: true, formatter: _reviewstatusFormatter }
                //                { field: 'opt', title: '操作', width: 80, align: 'center',
                //                    formatter: function (value, rowData, rowIndex) {
                //                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.ProjectPlanFileManage_aspx.editProjectPlanFile(\'' + rowData.Key + '\');');
                //                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.ProjectPlanFileManage_aspx.delProjectPlanFile(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                //                        var div = $("<div></div>").append(editbtn).append(delspan);
                //                        return div.html();
                //                    }
                //                }
			    ]],
                pageSize: 10,
                sortName: 'CreateDate',
                sortOrder: 'desc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.ProjectPlanFileManage_aspx.editProjectPlanFile(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.ProjectPlanFileManage_aspx.delProjectPlanFile(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加新项目计划书",
                            href: "Views/Business/ProjectPlanFileAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var projectPlanFile = $(dialog).form('getData');
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加项目计划书成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加项目计划书失败。");
                                    };
                                };
                                window.business.projectPlanFile.addProjectPlanFile(projectPlanFile, _callback);
                            },
                            width: 920,
                            height: 450
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
                            window.business.ProjectPlanFileManage_aspx.delProjectPlanFile(ids.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            };
            $("#Grid", ajaxContainerSelector).datagrid(options);
            $('#Grid', ajaxContainerSelector).datagrid({
                onSelect: function (rowIndex, rowData) {
                    window.business.ProjectPlanFileManage_aspx.editProjectPlanFile(rowData.Key);
                }
            });
        };
        var _bindButtonEvent = function () {
            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtNameSearch", ajaxContainerSelector).val('');
            });
            $("#tt, ajaxContainerSelector").panel({
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#cc", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });
        };
        _bindControl();
        _bindButtonEvent();

        window.business.ProjectPlanFileManage_aspx.editProjectPlanFile = function (key) {
            InitProjectPlanFile(key);
        }
        window.business.ProjectPlanFileManage_aspx.delProjectPlanFile = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 <strong>" + names + "</strong><br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除项目计划书成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除项目计划书失败。");
                        }
                    };
                    window.business.projectPlanFile.deleteProjectPlanFile(keys, _callback);
                }
            });
        }
        //--------------------------Update验证---------------------------//
        ///定义验证规则

        ///选择评审状态
        $("#selReviewStatus", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 44 }
        });
        $('#selReviewStatus', ajaxContainerSelector).combobox('select', '0');
        //所属计划项目
        $("#txtPlanProjectKey", ajaxContainerSelector).searchbox({
            required: true,
            searcher: function (value) {
                var selected = $("#PlanProjectKey", ajaxContainerSelector).val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#PlanProjectKey", ajaxContainerSelector).val(selections[0].Key);
                        $("#txtPlanProjectKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.business.showPlanProjectSelector(onEnterClick, selected);
            }
        });
        $("#txtPlanProjectKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtPlanProjectKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtPlanProjectKey", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
        //计划项目负责人
        $("#txtEmployeeKey", ajaxContainerSelector).searchbox({
            required: true,
            searcher: function (value) {
                var selected = $("#EmployeeKey", ajaxContainerSelector).val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#EmployeeKey", ajaxContainerSelector).val(selections[0].Key);
                        $("#txtEmployeeKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.platform.showUserSelector(onEnterClick, selected);
            }
        });
        $("#txtEmployeeKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtEmployeeKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtEmployeeKey", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
//        //所属投标项目
//        $("#txtBiddingKey", ajaxContainerSelector).searchbox({
//            searcher: function (value) {
//                var selected = $("#BiddingKey", ajaxContainerSelector).val();
//                var onEnterClick = function (datagrid, selections) {
//                    if (selections.length > 0) {
//                        $("#BiddingKey", ajaxContainerSelector).val(selections[0].Key);
//                        $("#txtBiddingKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
//                    } else {
//                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                        return false;
//                    }
//                };
//                window.business.showBiddingSelector(onEnterClick, selected);
//            }
//        });
//        $("#BiddingKey", ajaxContainerSelector).val("0");
//        $("#txtBiddingKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//        $("#txtBiddingKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//        //所属客户
//        $("#txtCustomerKey", ajaxContainerSelector).searchbox({
//            searcher: function (value) {
//                var selected = $("#CustomerKey", ajaxContainerSelector).val();
//                var onEnterClick = function (datagrid, selections) {
//                    if (selections.length > 0) {
//                        $("#CustomerKey", ajaxContainerSelector).val(selections[0].Key);
//                        $("#txtCustomerKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
//                    } else {
//                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                        return false;
//                    }
//                };
//                window.business.showCustomerSelector(onEnterClick, selected);
//            }
//        });
//        $("#CustomerKey", ajaxContainerSelector).val("0");
//        $("#txtCustomerKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//        $("#txtCustomerKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

        var InitProjectPlanFile = function (key) {
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["名称","Services/Business/ProjectPlanFileService.asmx/AjaxValidate","Name",' + key + ']']
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["编号","Services/Business/ProjectPlanFileService.asmx/AjaxValidate","Code",' + key + ']']
            });

            $('#tool', ajaxContainerSelector).panel('open');
            $('#btnSave', ajaxContainerSelector).unbind("click").bind('click', function () {
                var verifyResult = $(ajaxContainerSelector).form("validate");
                if (!verifyResult) { return false };
                var projectPlanFile = $(ajaxContainerSelector).form('getData');
                $.extend(projectPlanFile, { Key: key });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改项目计划书成功。");
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                    } else {
                        $.plugin.showMessage("修改项目计划书失败。");
                    }
                };
                window.business.projectPlanFile.updateProjectPlanFile(projectPlanFile, _callback);
            });
            window.business.projectPlanFile.getProjectPlanFileByKey(key, function (projectPlanFile) {
                $("#txtName", ajaxContainerSelector).val(projectPlanFile.Name);
                $("#txtCode", ajaxContainerSelector).val(projectPlanFile.Code);
                $("#PlanProjectKey", ajaxContainerSelector).val(projectPlanFile.PlanProjectKey);
                if (projectPlanFile.PlanProjectKey != '0' && projectPlanFile.PlanProjectKey != undefined) {
                    window.business.planProject.getPlanProjectByKey(projectPlanFile.PlanProjectKey, function (planProject) {
                        if (planProject)
                            $("#txtPlanProjectKey", ajaxContainerSelector).searchbox("setValue", planProject.Name);
                    });
                }
                $("#EmployeeKey", ajaxContainerSelector).val(projectPlanFile.EmployeeKey);
                if (projectPlanFile.EmployeeKey != '0' && projectPlanFile.EmployeeKey != undefined) {
                    window.platform.user.getUserByKey(projectPlanFile.EmployeeKey, function (employee) {
                        if (employee)
                            $("#txtEmployeeKey", ajaxContainerSelector).searchbox("setValue", employee.Name);
                    });
                }
//                $("#BiddingKey", ajaxContainerSelector).val(projectPlanFile.BiddingKey);
//                if (projectPlanFile.BiddingKey != '0' && projectPlanFile.BiddingKey != undefined) {
//                    window.business.bidding.getBiddingByKey(projectPlanFile.BiddingKey, function (bidding) {
//                        if (bidding)
//                            $("#txtBiddingKey", ajaxContainerSelector).searchbox("setValue", bidding.Name);
//                    });
//                }
//                $("#CustomerKey", ajaxContainerSelector).val(projectPlanFile.CustomerKey);
//                if (projectPlanFile.CustomerKey != '0' && projectPlanFile.CustomerKey != undefined) {
//                    window.business.customer.getCustomerByKey(projectPlanFile.CustomerKey, function (customer) {
//                        if (customer)
//                            $("#txtCustomerKey", ajaxContainerSelector).searchbox("setValue", customer.Name);
//                    });
//                }
                $("#selReviewStatus", ajaxContainerSelector).combobox("setValue", projectPlanFile.ReviewStatus);
                $("#txtSummary", ajaxContainerSelector).val(projectPlanFile.Summary);
                $("#txtRemark", ajaxContainerSelector).val(projectPlanFile.Remark);
            });
            $("#btnRefresh", ajaxContainerSelector).click(function () {
                window.business.projectPlanFile.getProjectPlanFileByKey(key, function (projectPlanFile) {
                    $("#txtName", ajaxContainerSelector).val(projectPlanFile.Name);
                    $("#txtCode", ajaxContainerSelector).val(projectPlanFile.Code);
                    $("#PlanProjectKey", ajaxContainerSelector).val(projectPlanFile.PlanProjectKey);
                    if (projectPlanFile.PlanProjectKey != '0' && projectPlanFile.PlanProjectKey != undefined) {
                        window.business.planProject.getPlanProjectByKey(projectPlanFile.PlanProjectKey, function (planProject) {
                            if (planProject)
                                $("#txtPlanProjectKey", ajaxContainerSelector).searchbox("setValue", planProject.Name);
                        });
                    }
                    $("#EmployeeKey", ajaxContainerSelector).val(projectPlanFile.EmployeeKey);
                    if (projectPlanFile.EmployeeKey != '0' && projectPlanFile.EmployeeKey != undefined) {
                        window.platform.user.getUserByKey(projectPlanFile.EmployeeKey, function (employee) {
                            if (employee)
                                $("#txtEmployeeKey", ajaxContainerSelector).searchbox("setValue", employee.Name);
                        });
                    }
//                    $("#BiddingKey", ajaxContainerSelector).val(projectPlanFile.BiddingKey);
//                    if (projectPlanFile.BiddingKey != '0' && projectPlanFile.BiddingKey != undefined) {
//                        window.business.bidding.getBiddingByKey(projectPlanFile.BiddingKey, function (bidding) {
//                            if (bidding)
//                                $("#txtBiddingKey", ajaxContainerSelector).searchbox("setValue", bidding.Name);
//                        });
//                    }
//                    $("#CustomerKey", ajaxContainerSelector).val(projectPlanFile.CustomerKey);
//                    if (projectPlanFile.CustomerKey != '0' && projectPlanFile.CustomerKey != undefined) {
//                        window.business.customer.getCustomerByKey(projectPlanFile.CustomerKey, function (customer) {
//                            if (customer)
//                                $("#txtCustomerKey", ajaxContainerSelector).searchbox("setValue", customer.Name);
//                        });
//                    }
                    $("#selReviewStatus", ajaxContainerSelector).combobox("setValue", projectPlanFile.ReviewStatus);
                    $("#txtSummary", ajaxContainerSelector).val(projectPlanFile.Summary);
                    $("#txtRemark", ajaxContainerSelector).val(projectPlanFile.Remark);
                });
            });
        }
    };
})(jQuery);