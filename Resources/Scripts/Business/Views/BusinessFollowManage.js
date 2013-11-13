/*
==============================================================================
//  商务跟进页面 BusinessFollowManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.BusinessFollowManage_aspx) { window.business.BusinessFollowManage_aspx = new Object(); }

    window.business.BusinessFollowManage_aspx.initPage = function (ajaxContainerSelector) {
        window.business.BusinessFollowManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {
            var khlxdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 1 });
            var _khlxFormatter = function (value) {
                for (var i = 0; i < khlxdata.length; i++) {
                    if (khlxdata[i].Value == value) return khlxdata[i].Name;
                }
                return value;
            }

            var _BFFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 48 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }

            ////搜索条件选择客户单位///////////////////////////////////////////
            $("#selCustomer1", ajaxContainerSelector).combogrid({
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
                { field: 'CustomerType', title: '客户类型', width: 50, sortable: true, formatter: _khlxFormatter }
			    ]],
                sortName: 'CreateDate',
                sortOrder: 'desc',
                pagination: true,
                onSelect: function (rowIndex, rowData) {
                    var param = { CustKey: rowData.Key, Name: "", Type: -1, ActiveStatus: -1 };
                    $("#selProject1", ajaxContainerSelector).combogrid("grid").datagrid("options").url = window.resolveUrl('Services/Business/PlanProjectService.asmx/LoadGridDataOfProjectManage');
                    $("#selProject1", ajaxContainerSelector).combogrid("grid").datagrid('load', param);
                }
            });

            ////搜索条件选择计划项目///////////////////////////////////////////
            $("#selProject1", ajaxContainerSelector).combogrid({
                title: '选择计划项目',
                fit: true,
                fitColumns: true,
                border: true,
                singleSelect: true,
                rownumbers: true,
                panelWidth: 430,
                panelHeight: 340,
                idField: 'Key',
                textField: 'Name',
                columns: [[
                { field: 'Name', title: '项目名称', width: 130, sortable: true },
                { field: 'Code', title: '项目编号', width: 50, sortable: true }
			    ]],
                sortName: 'CreateDate',
                sortOrder: 'desc',
                pagination: true
            });

            ////跟进记录表格///////////////////////////////////////////
            var businessFollow_options = {
                fit: true,
                fitColumns: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Business/BusinessFollowService.asmx/GetPagingData'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    CustomerKey: function () { var key = $("#selCustomer1", ajaxContainerSelector).combogrid("getValue"); if (key.isNullOrWhiteSpace()) { key = -1 } return key; },
                    ProjectKey: function () { var key = $("#selProject1", ajaxContainerSelector).combogrid("getValue"); if (key.isNullOrWhiteSpace()) { key = -1 } return key; }
                },
                idField: 'Key',
                columns: [[{ field: 'ck', checkbox: true },
				{ field: 'ContactDate', title: '接洽时间', width: 100, sortable: true, formatter: function (value) { return value.toDate().format() } },
                { field: 'BusinessForms', title: '商务形式', width: 100, sortable: true, formatter: _BFFormatter },
                { field: 'ContactMan', title: '接洽人员', width: 100, sortable: true },
                //                { field: 'BusiEmployeeKey', title: '商务人员', width: 100, sortable: true },
                //                { field: 'TechnicalEmployeeKey', title: '技术人员', width: 100, sortable: true },
                {field: 'opt', title: '操作', width: 100, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    var delspan = $("<a title='删除'></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.BusinessFollowManage_aspx.delBusinessFollow(\'' + rowData.Key + '\');');
                    var div = $("<div></div>").append(delspan);
                    return div.html();
                }
            }
			    ]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true,
            onSelect: function (rowIndex, rowData) {
                window.business.businessfollow.getBusinessFollowByKey(rowData.Key, function (businessFollow) {
                    window.platform.user.getUserByKey(businessFollow.BusiEmployeeKey, function (user) {
                        $("#txtBusiEmployee", ajaxContainerSelector).searchbox("setValue", user.Name);
                    });
                    window.platform.user.getUserByKey(businessFollow.TechnicalEmployeeKey, function (user) {
                        $("#txtTechnicalEmployee", ajaxContainerSelector).searchbox("setValue", user.Name);
                    });
                    $(ajaxContainerSelector).form('loadData', businessFollow);
                    $("#selCustomer", ajaxContainerSelector).combogrid('setValue', businessFollow.CustomerKey);
                    $("#selProject", ajaxContainerSelector).combogrid('setValue', businessFollow.ProjectKey);
                });
            },
            toolbar: [{
                id: 'btnadd',
                text: '添加',
                iconCls: 'icon-create',
                handler: function () {
                    $.plugin.showDialog({
                        title: "添加跟进记录",
                        href: "Views/Business/BusinessFollowAdd.aspx",
                        onSave: function (dialog) {
                            var verifyResult = $(dialog).form("validate");
                            if (!verifyResult) { return false };
                            var businessFollow = $(dialog).form('getData');
                            $.extend(businessFollow, { BusinessProgress: escape($(dialog).find("#txtBusinessProgress").ckeditor("getValue")) });
                            var _callback = function (success) {
                                if (success) {
                                    $.plugin.showMessage("添加跟进记录成功。");
                                    $("#BusinessFollowGrid", ajaxContainerSelector).datagrid('reload');
                                } else {
                                    $.plugin.showMessage("添加跟进记录失败。");
                                }
                            };
                            window.business.businessfollow.addBusinessFollow(businessFollow, _callback);
                        },
                        width: 900,
                        height: 500
                    });
                }
            }, '-', {
                id: 'btncut',
                text: '删除',
                iconCls: 'icon-no',
                handler: function () {
                    var keys = [];
                    var rows = $("#BusinessFollowGrid", ajaxContainerSelector).datagrid('getChecked');
                    if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                    else {
                        for (var i = 0; i < rows.length; i++) {
                            keys.push(rows[i].Key);
                        }
                        window.business.BusinessFollowManage_aspx.delBusinessFollow(keys.join(','));
                    }
                }
            }, '-', {
                id: 'btnrefresh',
                text: '刷新',
                iconCls: 'icon-refresh',
                handler: function () {
                    $("#BusinessFollowGrid", ajaxContainerSelector).datagrid('reload');
                }
            }]
        };
        $("#BusinessFollowGrid", ajaxContainerSelector).datagrid(businessFollow_options);

        ////修改记录选择客户单位///////////////////////////////////////////
        $("#selCustomer", ajaxContainerSelector).combogrid({
            required: true,
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
                { field: 'CustomerType', title: '客户类型', width: 50, sortable: true, formatter: _khlxFormatter }
			    ]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true,
            onSelect: function (rowIndex, rowData) {
                var param = { CustKey: rowData.Key, Name: "", Type: -1, ActiveStatus: -1 };
                $("#selProject", ajaxContainerSelector).combogrid("grid").datagrid("options").url = window.resolveUrl('Services/Business/PlanProjectService.asmx/LoadGridDataOfProjectManage');
                $("#selProject", ajaxContainerSelector).combogrid("grid").datagrid('load', param);
            }
        });

        ////修改记录选择计划项目///////////////////////////////////////////
        $("#selProject", ajaxContainerSelector).combogrid({
            title: '选择计划项目',
            fit: true,
            fitColumns: true,
            border: true,
            singleSelect: true,
            rownumbers: true,
            panelWidth: 430,
            panelHeight: 340,
            idField: 'Key',
            textField: 'Name',
            columns: [[
                { field: 'Name', title: '项目名称', width: 130, sortable: true },
                { field: 'Code', title: '项目编号', width: 50, sortable: true }
			    ]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true
        });
        $("#selProject", ajaxContainerSelector).combogrid('setValue', '0');

        $("#txtContactDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#selBusinessForms", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 48 },
            panelHeight: 100
        });
        $("#selBusinessForms", ajaxContainerSelector).combobox("setValue", 0);

        $("#txtBusiEmployee", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#BusiEmployeeKey", ajaxContainerSelector).val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#BusiEmployeeKey", ajaxContainerSelector).val(selections[0].Key);
                        $("#txtBusiEmployee", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.platform.showUserSelector(onEnterClick, selected);
            }
        });
        $("#txtBusiEmployee", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtBusiEmployee", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtBusiEmployee", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

        $("#txtTechnicalEmployee", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#TechnicalEmployeeKey", ajaxContainerSelector).val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#TechnicalEmployeeKey", ajaxContainerSelector).val(selections[0].Key);
                        $("#txtTechnicalEmployee", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.platform.showUserSelector(onEnterClick, selected);
            }
        });
        $("#txtTechnicalEmployee", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtTechnicalEmployee", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
//        $("#txtTechnicalEmployee", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });


    };
    var _bindButtonEvent = function () {
        $("#panel", ajaxContainerSelector).panel({
            title: '商务跟进记录',
            fit: true,
            border: false,
            tools: [{
                iconCls: 'layout-button-left',
                handler: function () { $("#divLayout", ajaxContainerSelector).layout("collapse", "west") }
            }]
        });
        $("#clear_BusiEmployee", ajaxContainerSelector).click(function () {
            $("#txtBusiEmployee", ajaxContainerSelector).searchbox('setValue', '');
            $("#BusiEmployeeKey", ajaxContainerSelector).val('');
        });
        $("#clear_TechnicalEmployee", ajaxContainerSelector).click(function () {
            $("#txtTechnicalEmployee", ajaxContainerSelector).searchbox('setValue', '');
            $("#TechnicalEmployeeKey", ajaxContainerSelector).val('0');
        });
        $("#btnReset", ajaxContainerSelector).click(function () {
            $("#selCustomer1", ajaxContainerSelector).combogrid("clear");
            $("#selProject1", ajaxContainerSelector).combogrid("clear");
        });

        ////保存修改跟进记录///////////////////////////////////////////
        $("#btnSave", ajaxContainerSelector).click(function () {
            var verifyResult = $(ajaxContainerSelector).form("validate");
            if (!verifyResult) { return };
            var businessFollow = $(ajaxContainerSelector).form('getData');
            $.extend(businessFollow, { BusinessProgress: escape($("#txtBusinessProgress", ajaxContainerSelector).ckeditor("getValue")) });
//            $.extend(businessFollow, { Require: escape($("#txtRequire", ajaxContainerSelector).ckeditor("getValue")) });
//            $.extend(businessFollow, { Difficulties: escape($("#txtDifficulties", ajaxContainerSelector).ckeditor("getValue")) });
//            $.extend(businessFollow, { CompetitiveConditions: escape($("#txtCompetitiveConditions", ajaxContainerSelector).ckeditor("getValue")) });

            var row = $("#BusinessFollowGrid", ajaxContainerSelector).datagrid("getSelected");
            if (!row) {
                $.plugin.showMessage("请在左边表格选择跟进记录!");
                return;
            }
            $.extend(businessFollow, { Key: row.Key });
            var _callback = function (success) {
                if (success) {
                    $.plugin.showMessage("编辑跟进记录成功。");
                    $("#BusinessFollowGrid", ajaxContainerSelector).datagrid('reload');
                } else {
                    $.plugin.showMessage("编辑跟进记录失败。");
                }
            };
            window.business.businessfollow.updateBusinessFollow(businessFollow, _callback);
        });

    };

    _bindControl();
    _bindButtonEvent();

    window.business.BusinessFollowManage_aspx.delBusinessFollow = function (keys) {
        $.plugin.messager.confirm("提示", "点击确定将删除跟进记录<br />是否执行此操作？", function (fn) {
            if (fn) {
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("删除跟进记录成功。");
                        $("#BusinessFollowGrid", ajaxContainerSelector).datagrid('clearSelections');
                        $("#BusinessFollowGrid", ajaxContainerSelector).datagrid('clearChecked');
                        $("#BusinessFollowGrid", ajaxContainerSelector).datagrid('reload');
                    } else {
                        $.plugin.showMessage("删除跟进记录失败。");
                    }
                };
                window.business.businessfollow.deleteBusinessFollow(keys, _callback);
            }
        });
    }

};
})(jQuery);