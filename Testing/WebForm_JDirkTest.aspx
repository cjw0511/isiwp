<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm_JDirkTest.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.WebForm_JDirkTest" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>WebForm JDirk Test</title>
    <link href="../Resources/Plugins/jquery-easyui-1.3.3/themes/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="../Resources/Plugins/jquery-easyui-1.3.3/themes/icon.css" rel="stylesheet" type="text/css" />
    <link href="../Resources/Styles/easyui-icons.css" rel="stylesheet" type="text/css" />

    <script src="../Resources/Plugins/jquery/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery.jdirk.js" type="text/javascript"></script>

    <script src="../Resources/Plugins/jquery-easyui-1.3.3/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../Resources/Plugins/jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.js" type="text/javascript"></script>

    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.menu.js" type="text/javascript"></script>

    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.validatebox.js" type="text/javascript"></script>
    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.panel.js" type="text/javascript"></script>
    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.window.js" type="text/javascript"></script>
    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.dialog.js" type="text/javascript"></script>

    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.datagrid.js" type="text/javascript"></script>

    <script type="text/javascript" language="javascript">
        $(function () {
            var form = $("#form1");
            var elements = $("*", form).add(form);
            elements.each(function () {
                //alert($(this).attr($.util.uniqueIdName));
            });

            $("#btn1").click(function () { $("#win1").parent().shine(); });

            $("#btn2").click(function () {
                var array = $("*", "#win1").add("#win1").serializeArray();
                alert(array.length);
                $.each(array, function () {
                    var html = $("#TextArea1").html();
                    $("#TextArea1").append("<br />" + this.name + ":" + this.value);
                });
            });

            $("#btn3").click(function () {
                var width = $("#Text1").val();
                var height = $("#Text2").val();
                var left = $("#Text3").val();
                var top = $("#Text4").val();
                $.util.windowSize(parseInt(width), parseInt(height));

                $.each($.util.windowPosition(), function (name, value) {
                    $("#TextArea1").append("<br />" + name + ":" + value);
                });
            });

            $("#btn4").click(function () {
                $("#win1").window("destroy");
            });

            $("#btn5").click(function () {
                alert($("#win1").dialog("options").height);
            });

            $("#btn6").click(function () {
                alert($("#win1").dialog("options").width);
            });

            $("#btn7").click(function () {
                alert($("#TextArea1").validatebox("isValid"));
            });

            $("#btn9").bind("contextmenu click", function (e) {
                $("#dg1").datagrid("setColumnTitle", { field: "Code", title: "新编号" });
            });
            $("#btn10").bind("contextmenu click", function (e) {
                $("#dg1").datagrid("sort", { sortName: "Name", sortOrder: "asc" });
            });
            $("#btn11").bind("contextmenu click", function (e) {
                $("#dg1").datagrid("sort", { sortName: "Name", sortOrder: "desc" });
            });

            $("#btn12").bind("contextmenu click", function (e) {
                dg.datagrid("exportExcel");
            });

            $("#btn13").bind("contextmenu click", function (e) {
                alert(dg.datagrid("getColumnOption", "Name").width);
            });

            $("#btn14").bind("contextmenu click", function (e) {
                dg.datagrid("setColumnFilter", {});
            });

            $("#btn15").bind("contextmenu click", function (e) {
                dg.datagrid("setColumnFilter", { panelHeight: 120,
                    position: "bottom",
                    columns: [
                        { field: "Code", type: "checkbox" },
                        { field: "Name", type: "checkbox" },
                        { field: "CreateDate", type: "checkbox" }
                    ]
                });
            });

            $("#btn16").bind("contextmenu click", function (e) {
                dg.datagrid("columnFilterSelect", true);
            });

            $("#btn17").bind("contextmenu click", function (e) {
                dg.datagrid("columnFilterSelect", false);
            });

            $("#btn18").bind("contextmenu click", function (e) {
                dg.datagrid("columnFilterSelect", { field: $("#TextField").val(), value: $("#TextValue").val(), selected: true });
            });

            $("#btn19").bind("contextmenu click", function (e) {
                dg.datagrid("columnFilterSelect", { field: $("#TextField").val(), value: $("#TextValue").val(), selected: false });
            });


            var dg = $("#dg1");
            var options = {
                title: "test datagrid",
                ionCls: "save",
                width: 900,
                height: 400,
                //noheader: true,
                maximizable: true,
                //fitColumns: true,
                rownumbers: true,
                singleSelect: true,
                pageList: [3, 5, 10, 20, 50, 100],
                //url: "../Services/Platform/DepartmentService.asmx/LoadGridData",
                data: { "total": 12, "rows": [{ "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22" }, { "ID": 2, "Key": 1, "Code": "001", "Name": "经理办", "ShortName": "jlb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 3, "Sort": 6, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:37:02.980", "ModifyUser": 1, "Remark": "sdf" }, { "ID": 4, "Key": 3, "Code": "003", "Name": "测评部", "ShortName": "cpb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 2, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "2", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:46.737", "ModifyUser": 1, "Remark": "" }, { "ID": 5, "Key": 4, "Code": "004", "Name": "商务部", "ShortName": "rjb", "ParentKey": 3, "Level": 1, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 4, "Sort": 1, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "4", "CreateUser": 0, "ModifyDate": "2013/05/27 02:36:53.817", "ModifyUser": 1, "Remark": "" }, { "ID": 6, "Key": 5, "Code": "005", "Name": "商务部", "ShortName": "swb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 2, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "1", "CreateUser": 0, "ModifyDate": "2013/05/27 02:19:58.303", "ModifyUser": 1, "Remark": "" }, { "ID": 7, "Key": 6, "Code": "006", "Name": "储运部", "ShortName": "cyb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 3, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "5", "CreateUser": 0, "ModifyDate": "2013/05/27 02:23:03.450", "ModifyUser": 1, "Remark": "" }, { "ID": 10, "Key": 7, "Code": "007", "Name": "培训部", "ShortName": "pxb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 1, "HeadEmpKey": 1, "Sort": 4, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "10", "CreateUser": 0, "ModifyDate": "2013/05/27 02:22:49.100", "ModifyUser": 1, "Remark": "1" }, { "ID": 17, "Key": 8, "Code": "008", "Name": "财务部", "ShortName": "cwb", "ParentKey": 0, "Level": 0, "OrganKey": 1, "LinkManKey": 2, "HeadEmpKey": 3, "Sort": 5, "Type": 0, "Flag": 0, "Status": 0, "CreateDate": "11", "CreateUser": 1, "ModifyDate": "2013/05/27 12:55:24.317", "ModifyUser": 1, "Remark": "22"}] },
                queryParams: {
                    name: ""
                },
                idField: 'Key',
                sortName: 'Code',
                sortOrder: 'asc',
                frozenColumns: [[
                    { field: 'ck', checkbox: true },
                    { field: 'Code', title: '编号', width: 80, sortable: true },
                    { field: 'Name', title: '名称', width: 120, sortable: true, editor: "text" }
                ]],
                columns: [[
                    { field: 'CreateDate', title: '创建日期', rowspan: 2, width: 100, sortable: true, formatter: function (value, row, index) { return value.left(10); } },
                    { field: 'ParentDepartmentName', title: '父级部门', width: 100, sortable: false, editor: "text" },
                    { field: 'OrganName', title: '组织机构', width: 120, sortable: false, editor: "text" },
                    { field: "Employee", title: "成员", width: 240, hidden: true }
                ]],
                pagination: true,
                remotePaging: false,
                minHeight: 300,
                columnFilter: {
                    panelHeight: 120,
                    position: "top",
                    columns: [
                        { field: "Code", type: "checkbox" },
                        { field: "Name", type: "checkbox" },
                        { field: "CreateDate", type: "sliderLower", precision: 0.1 },
                        { field: "ParentDepartmentName", type: "sliderLower", precision: 1 }
                    ]
                }
                //                ,
                //                offset: { width: -100, height: -600 },
            };
            dg.datagrid(options);

            //            var array = [0, 1, 1, 2, 2, 3, 3, 4, 2, 5, 10, 30, 1, 3];
            //            alert($.array.min(array));
            //            alert($.array.max(array));
        });
    </script>
    <style type="text/css">
    </style>
    
</head>
<body>
    <form id="form1" runat="server">
    <input id="ck1" type="checkbox" checked="checked" style="vertical-align: middle; overflow:auto; white-space: nowrap;" />
    <label for="ck1">ck1</label>
    <hr />
    Code: <input id="TextField" type="text" />
    Value: <input id="TextValue" type="text" />
    <hr />
    <input id="Text5" class="easyui-validatebox" name="txt1" type="text" data-options="required: true, prompt: '请输入...', validType: 'length[3, 6]'" />
    <textarea id="TextArea1" cols="20" rows="3" class="easyui-validatebox" data-options="required: true, prompt: '请输入...', validType: 'length[3, 6]'" ></textarea>
    <hr />
    <input class="easyui-slider" data-options="height: 100, mode: 'v', showTip: true, min: 0, max: 100, step: 1" />
    <hr />
    <input id="btn1" type="button" value="shine-window" />
    <input id="btn2" type="button" value="serializeArray" />
    <input id="btn3" type="button" value="windowOffset" />
    <input id="btn4" type="button" value="destroyWindow" />
    <input id="btn5" type="button" value="showWindowHeight" />
    <input id="btn6" type="button" value="showWindowWidth" />
    <input id="btn7" type="button" value="validatebox" />
    <input id="btn8" type="button" value="showMenu" />
    <input id="btn9" type="button" value="setColumnTitle" />
    <input id="btn10" type="button" value="sortNameASC" />
    <input id="btn11" type="button" value="sortNameDESC" />
    <a id="btn12" class="easyui-linkbutton" data-options="selected: false, iconCls: 'icon-ok', iconAlign: 'right', plain: true" >export</a>
    <input id="btn13" type="button" value="showColumnNameWidth" />
    <input id="btn14" type="button" value="disableColumnFilter" />
    <input id="btn15" type="button" value="enableColumnFilter" />
    <input id="btn16" type="button" value="columnFilter-selectAll" />
    <input id="btn17" type="button" value="columnFilter-unselectAll" />
    <input id="btn18" type="button" value="columnFilter-select" />
    <input id="btn19" type="button" value="columnFilter-unselect" />

    <hr />
    <textarea id="TextArea2" cols="100" rows="10"></textarea>

    <table id='dg1'></table>


    <hr />
    <div id="win1" class="easyui-dialog" data-options="closed: true, maximizable: true, modal: true, width: 600, height: 400, minWidth: 200, maxWidth: 1000, maxHeight: 800, minHeight: 100, resizable: true, draggable: true" >
        <input id="Text1" name="txt1" type="text" />
        <input id="Text2" name="txt2" type="text" />
        <input id="Text3" name="txt3" type="text" />
        <input id="Text4" name="txt4" type="text" />
        <hr />
        <iframe width="1200px" height="500px" src="WebForm_JDiskTest_Iframe.aspx"></iframe>
    </div>
    </form>
</body>
</html>
