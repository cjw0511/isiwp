<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="WebForm_My97DatePicker.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.WebForm_My97DatePicker" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script type="text/javascript" language="javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";

            $("#A1", ajaxContainerSelector).click(function () {
                $("#my97", ajaxContainerSelector).my97("validate");
            });

            $("#A2", ajaxContainerSelector).click(function () {
                alert($("#my97", ajaxContainerSelector).my97("isValid"));
            });

            $("#A3", ajaxContainerSelector).click(function () {
                $("#my97", ajaxContainerSelector).my97("enable");
            });

            $("#A4", ajaxContainerSelector).click(function () {
                $("#my97", ajaxContainerSelector).my97("disable");
            });

            $("#A5", ajaxContainerSelector).click(function () {
                $("#my97", ajaxContainerSelector).my97("clear");
            });

            $("#A6", ajaxContainerSelector).click(function () {
                alert($("#my97", ajaxContainerSelector).my97("getValue"));
            });

            $("#A7", ajaxContainerSelector).click(function () {
                $("#my97", ajaxContainerSelector).my97("setValue", "2001-01-01");
            });

            $("#A8", ajaxContainerSelector).click(function () {
                $("#my97", ajaxContainerSelector).my97("resize", 300);
            });


            $("#A9", ajaxContainerSelector).click(function () {
                $("#Text1", ajaxContainerSelector).datebox("validate");
            });

            $("#A10", ajaxContainerSelector).click(function () {
                alert($("#Text1", ajaxContainerSelector).datebox("isValid"));
            });

            $("#A11", ajaxContainerSelector).click(function () {
                $("#Text1", ajaxContainerSelector).datebox("enable");
            });

            $("#A12", ajaxContainerSelector).click(function () {
                $("#Text1", ajaxContainerSelector).datebox("disable");
            });

            $("#A13", ajaxContainerSelector).click(function () {
                $("#Text1", ajaxContainerSelector).datebox("clear");
            });

            $("#A14", ajaxContainerSelector).click(function () {
                alert($("#Text1", ajaxContainerSelector).datebox("getValue"));
            });

            $("#A15", ajaxContainerSelector).click(function () {
                $("#Text1", ajaxContainerSelector).datebox("setValue", "2001-01-01");
            });

            $("#A16", ajaxContainerSelector).click(function () {
                $("#Text1", ajaxContainerSelector).datebox("resize", 300);
            });

            $("#A17", ajaxContainerSelector).click(function () {
                var rows = $("#dg", ajaxContainerSelector).datagrid("getRows");
                $.each(rows, function () {
                    var value = this.Employee;
                    if (value == null || value == undefined || !value.length) { return; }
                    alert(value);
                });
            });



            //////////////////////////////////////
            var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
            var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
            var dg = $("#dg", ajaxContainerSelector);

            var editIndex = undefined;
            var isEditor = false;
            var onClickRow = function (index) {
                if (editIndex == index && isEditor == true) {
                    dg.datagrid("endEdit", index);
                    isEditor = false;
                } else {
                    if (isEditor == true) {
                        dg.datagrid("endEdit", editIndex);
                    }
                    dg.datagrid("beginEdit", index);
                    isEditor = true;
                }
                editIndex = index;
            };

            var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";

            var url = window.resolveUrl('Services/Platform/EmployeeService.asmx/LoadGridData');
            var data = $.plugin.getJsonDataRequestWebService(url, { name: "", pageSize: 10, pageIndex: 0, orderby: null });

            var options = {
                title: "my97 test datagrid",
                ionCls: "save",
                width: 1100,
                height: 400,
                fitColumns: true,
                rownumbers: true,
                singleSelect: true,
                url: window.resolveUrl("Services/Platform/DepartmentService.asmx/LoadGridData"),
                toolbar: toolbar,
                queryParams: {
                    name: ""
                },
                idField: 'Key',
                sortName: 'Code',
                sortOrder: 'asc',
                onClickRow: onClickRow,
                columns: [[
                    { field: 'ck', checkbox: true },
                    { field: 'Code', title: '编号', width: 80, sortable: true },
                    { field: 'Name', title: '名称', width: 200, sortable: true, editor: "text" },

                    { field: 'CreateDate', title: '创建日期', width: 100, sortable: true, editor: { type: "my97", options: { required: true} },
                        formatter: function (value, row, index) { return value.left(10); }
                    },

                    { field: 'ParentDepartmentName', title: '父级部门', width: 120, sortable: true, editor: "text" },
                    {
                        field: 'OrganName', title: '组织机构', width: 120, sortable: true,
                        editor: {
                            type: "numberbox", options: {
                                min: 0,
                                precision: 1
                            }
                        }
                    },
                    { field: "Employee", title: "成员", width: 240, formatter: function (value, rowData, rowIndex) {
                        if (value == null || value == undefined || !value.length) { return null; }
                        var rows = data.rows;
                        var array = [];
                        for (var i = 0; i < rows.length; i++) {
                            var item = rows[i];
                            for (var j = 0; j < value.length; j++) {
                                if (item.Key == value[j]) { array.push(item.Name); }
                            }
                        }
                        return array.join(", ");
                    },
                        editor: {
                            type: "combogrid",
                            options: {
                                title: '选择成员名称',
                                fit: true,
                                fitColumns: true,
                                border: true,
                                multiple: true,
                                rownumbers: true,
                                panelWidth: 350,
                                panelHeight: 250,
                                idField: 'Key',
                                textField: 'Name',
                                data: data,
                                queryParams: { name: "" },
                                columns: [[
                                { field: 'Code', title: '员工编号', width: 100, sortable: true },
                                { field: 'Name', title: '员工名称', width: 100, sortable: true }
                                ]],
                                sortName: 'Code',
                                sortOrder: 'asc',
                                pagination: true,
                                required: true
                            }
                        }
                    }
                ]],
                pagination: true
            };
            dg.datagrid(options);
            $("#" + btnId, dg).click(function () {
                var name = $("#" + txtId, dg).val();
                dg.datagrid("load", { name: name });
            });
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="A1" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >validate</a>
    <a id="A2" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >isValid</a>
    <a id="A3" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >enable</a>
    <a id="A4" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >disable</a>
    <a id="A5" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >clear</a>
    <a id="A6" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >getValue</a>
    <a id="A7" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >setValue</a>
    <a id="A8" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >resize</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <input id="my97" class="easyui-my97" type="text" data-options="dateFmt: 'yyyy-MM', required: true, value: '2012-01-01', iconCls: 'icon-ok', doubleCalendar: false, minDate: '#F{$(\'#Text1\').my97(\'getValue\');}'"/>
    <hr />
    <input id="Text1" class="easyui-datebox" type="text" data-options="validType: ['shortDate'], required: true, value: '2012-01-01'"/>
    <hr />
    <input id="Text2" type="text" onfocus="WdatePicker()" />
    <div class="datagrid-toolbar">
        <a id="A9" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >validate</a>
        <a id="A10" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >isValid</a>
        <a id="A11" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >enable</a>
        <a id="A12" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >disable</a>
        <a id="A13" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >clear</a>
        <a id="A14" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >getValue</a>
        <a id="A15" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >setValue</a>
        <a id="A16" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >resize</a>
    </div>
    <hr />
    自定义 jeasyui-combo 的 iconCls：<br /><br />
    <input id="Text3" class="easyui-combobox" type="text" data-options="iconCls: 'icon-ok'" />
    <hr />
    <a id="A17" class="easyui-linkbutton" data-options="iconCls: 'icon-ok', plain: true" >查看值</a>
    <hr />
    <table id="dg"></table>
</asp:Content>
