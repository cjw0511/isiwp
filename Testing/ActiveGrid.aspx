<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ActiveGrid.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.ActiveGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Platform/Libs/departmentlib.js" type="text/javascript"></script>
<script type="text/javascript" language="javascript">
    var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
    var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
    var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
    var dg = $("#dg", ajaxContainerSelector);
    var editIndex = undefined;
    var isEditor = false;
    var onClickRow = function (rowIndex, rowData) {
        if (editIndex == rowIndex && isEditor == true) {
            dg.datagrid("endEdit", rowIndex);
            isEditor = false;
        } else {
            if (isEditor == true) {
                dg.datagrid("endEdit", editIndex);
                //更新到数据库
                var department;
                $.extend(department, { Key: editIndex });
                $.extend(department, { Code: rowData.Code });
                $.extend(department, { Name: rowData.Name });
                $.extend(department, { CreateDate: rowData.CreateDate });
                $.extend(department, { ParentDepartmentName: rowData.ParentDepartmentName });
                $.extend(department, { OrganName: rowData.OrganName });
                var _callback = function (success) {
                    if (success) {
                        window.platform.department.updateDepartment(department, _callback);
                    }
                };
            }
            dg.datagrid("beginEdit", rowIndex);
            isEditor = true;
        }
        editIndex = rowIndex;
    };
    var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
    var options = {
        title: "my97 test datagrid",
        ionCls: "save",
        width: 800,
        height: 600,
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
            { field: 'OrganName', title: '组织机构', width: 120, sortable: true, editor: "text" }
        ]],
        pageSize: 20,
        pagination: true
    };
    dg.datagrid(options);
    $("#" + btnId, dg).click(function () {
        var name = $("#" + txtId, dg).val();
        dg.datagrid("load", { name: name });
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <table id="dg"></table>
</asp:Content>
