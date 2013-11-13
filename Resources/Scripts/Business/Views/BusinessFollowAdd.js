/*
==============================================================================
//  商务跟进记录添加BusinessFollowAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.BusinessFollowAdd_aspx) { window.business.BusinessFollowAdd_aspx = new Object(); }
    window.business.BusinessFollowAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        var _bindControl = function () {
            var khlxdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 37 });
            var _khlxFormatter = function (value) {
                for (var i = 0; i < khlxdata.length; i++) {
                    if (khlxdata[i].Value == value) return khlxdata[i].Name;
                }
                return value;
            }

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
                sortName: 'Code',
                sortOrder: 'asc',
                pagination: true,
                onSelect: function (rowIndex, rowData) {
                    var param = { CustKey: rowData.Key, Name: "", Type: -1, ActiveStatus: -1 };
                    $("#selProject", ajaxContainerSelector).combogrid("grid").datagrid("options").url = window.resolveUrl('Services/Business/PlanProjectService.asmx/LoadGridDataOfProjectManage');
                    $("#selProject", ajaxContainerSelector).combogrid("grid").datagrid('load', param);
                }
            });


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
                sortName: 'Code',
                sortOrder: 'asc',
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
//            $("#txtTechnicalEmployee", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
        }

        var _bindButtonEvent = function () {
            $("#clear_BusiEmployee", ajaxContainerSelector).click(function () {
                $("#txtBusiEmployee", ajaxContainerSelector).searchbox('setValue', '');
                $("#BusiEmployeeKey", ajaxContainerSelector).val('');
            });
            $("#clear_TechnicalEmployee", ajaxContainerSelector).click(function () {
                $("#txtTechnicalEmployee", ajaxContainerSelector).searchbox('setValue', '');
                $("#TechnicalEmployeeKey", ajaxContainerSelector).val('0');
            });
        };

        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);