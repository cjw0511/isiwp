﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jeasyui-jdirk-datagrid-demo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.jeasyui_jdirk_test.jeasyui_jdirk_datagrid_demo" %>


    <link href="../../Resources/Plugins/jquery-easyui-1.3.3/demo/demo.css" rel="stylesheet" type="text/css" />

    <script src="../../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.datagrid.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(function () {
            var columnFilter = {
                panelHeight: 100,
                position: "top",
                columns: [
                            { field: "Code", type: "checkbox" },
                            { field: "Name", type: "checkbox" },
                            { field: "Height", type: "sliderCaps", precision: 0 },
                            { field: "Weight", type: "sliderLower", precision: 2 },
                            { field: "CreateDate", type: "none" }
                        ]
            };
            var columns = [
                        { field: 'ck', checkbox: true },
                        { field: 'ID', title: 'ID', width: 80, sortable: true },
                        { field: 'Code', title: '编号(Code)', width: 120, sortable: true },
                        { field: 'Name', title: '名称(Name)', width: 140, sortable: true, hidable: false },
                        { field: 'Age', title: '年龄(Age)', width: 120, sortable: true, disabledFilter: true },
                        { field: 'Height', title: '身高(Height)', width: 140, sortable: true },
                        { field: 'Weight', title: '体重(Weight)', width: 140, sortable: true },
                        { field: 'CreateDate', title: '创建日期(CreateDate)', width: 180, sortable: true },
                        { field: 'undefined', title: '测试(不存在的字段)', width: 150, sortable: true }
                    ];
            var data = [{ ID: 1, Code: 1, Name: "汤小祥", Age: 45, Height: 141, Weight: 60.67, CreateDate: "2007-03-28" }, { ID: 2, Code: 2, Name: "况文娟", Age: 63, Height: 146, Weight: 72.82, CreateDate: "2006-04-16" }, { ID: 3, Code: 3, Name: "李洪敏", Age: 60, Height: 187, Weight: 51.66, CreateDate: "2004-04-04" }, { ID: 4, Code: 4, Name: "彭成华", Age: 59, Height: 164, Weight: 73.50, CreateDate: "2005-10-12" }, { ID: 5, Code: 5, Name: "余梦恬", Age: 31, Height: 180, Weight: 72.61, CreateDate: "2003-03-16" }, { ID: 6, Code: 6, Name: "陈文斌", Age: 42, Height: 169, Weight: 71.85, CreateDate: "2008-09-25" }, { ID: 7, Code: 7, Name: "叶俊兰", Age: 24, Height: 192, Weight: 66.09, CreateDate: "2004-02-10" }, { ID: 8, Code: 8, Name: "武红梅", Age: 23, Height: 153, Weight: 73.95, CreateDate: "2009-04-25" }, { ID: 9, Code: 9, Name: "曾小莉", Age: 34, Height: 190, Weight: 47.28, CreateDate: "2005-12-18" }, { ID: 10, Code: 10, Name: "刘清", Age: 33, Height: 179, Weight: 53.40, CreateDate: "2006-12-29" }, { ID: 11, Code: 11, Name: "杨文乐", Age: 25, Height: 180, Weight: 71.78, CreateDate: "2001-01-13" }, { ID: 12, Code: 12, Name: "简立娟", Age: 64, Height: 153, Weight: 50.64, CreateDate: "2004-12-07" }, { ID: 13, Code: 13, Name: "丁海林", Age: 20, Height: 158, Weight: 60.48, CreateDate: "2008-05-13" }, { ID: 14, Code: 14, Name: "胡金路", Age: 18, Height: 182, Weight: 56.41, CreateDate: "2010-10-06" }, { ID: 15, Code: 15, Name: "虞洪生", Age: 59, Height: 166, Weight: 51.85, CreateDate: "2010-08-27" }, { ID: 16, Code: 16, Name: "郭柏梅", Age: 28, Height: 182, Weight: 72.84, CreateDate: "2008-01-22" }, { ID: 17, Code: 17, Name: "蔡显智　", Age: 35, Height: 174, Weight: 47.90, CreateDate: "2008-08-30" }, { ID: 18, Code: 18, Name: "范志强", Age: 27, Height: 149, Weight: 48.04, CreateDate: "2005-04-02" }, { ID: 19, Code: 19, Name: "范琴", Age: 24, Height: 170, Weight: 51.69, CreateDate: "2006-10-08" }, { ID: 20, Code: 20, Name: "颜辉辉", Age: 22, Height: 144, Weight: 40.15, CreateDate: "2006-08-03" }, { ID: 21, Code: 21, Name: "马远江", Age: 55, Height: 197, Weight: 41.03, CreateDate: "2010-07-27" }, { ID: 22, Code: 22, Name: "徐衍雄", Age: 45, Height: 163, Weight: 47.43, CreateDate: "2007-04-22" }, { ID: 23, Code: 23, Name: "肖璧", Age: 54, Height: 142, Weight: 57.44, CreateDate: "2004-05-24" }, { ID: 24, Code: 24, Name: "刘羚", Age: 46, Height: 150, Weight: 73.83, CreateDate: "2002-02-02" }, { ID: 25, Code: 25, Name: "李骏", Age: 29, Height: 163, Weight: 77.08, CreateDate: "2010-10-19" }, { ID: 26, Code: 26, Name: "谢蔷薇", Age: 21, Height: 145, Weight: 63.72, CreateDate: "2003-11-10" }, { ID: 27, Code: 27, Name: "汪洋", Age: 57, Height: 140, Weight: 64.88, CreateDate: "2005-06-24" }, { ID: 28, Code: 28, Name: "胡小平", Age: 38, Height: 170, Weight: 70.55, CreateDate: "2007-06-26" }, { ID: 29, Code: 29, Name: "龙文芳", Age: 15, Height: 189, Weight: 49.86, CreateDate: "2010-07-02" }, { ID: 30, Code: 30, Name: "刘盛", Age: 62, Height: 183, Weight: 78.23, CreateDate: "2007-02-18" }, { ID: 31, Code: 31, Name: "徐　飞", Age: 58, Height: 150, Weight: 58.45, CreateDate: "2002-11-28" }, { ID: 32, Code: 32, Name: "施珍峰", Age: 39, Height: 195, Weight: 46.63, CreateDate: "2008-01-19" }, { ID: 33, Code: 33, Name: "谢观发", Age: 26, Height: 178, Weight: 63.44, CreateDate: "2007-09-23" }, { ID: 34, Code: 34, Name: "涂凯", Age: 48, Height: 172, Weight: 56.08, CreateDate: "2006-12-06" }, { ID: 35, Code: 35, Name: "游伟伟", Age: 63, Height: 187, Weight: 64.29, CreateDate: "2008-06-29" }, { ID: 36, Code: 36, Name: "谌明", Age: 20, Height: 153, Weight: 66.66, CreateDate: "2007-04-05" }, { ID: 37, Code: 37, Name: "封涛", Age: 62, Height: 140, Weight: 47.85, CreateDate: "2001-12-31" }, { ID: 38, Code: 38, Name: "刘宁", Age: 26, Height: 154, Weight: 59.12, CreateDate: "2010-09-29" }, { ID: 39, Code: 39, Name: "曾苏", Age: 27, Height: 147, Weight: 63.35, CreateDate: "2006-08-23" }, { ID: 40, Code: 40, Name: "程靓", Age: 60, Height: 169, Weight: 64.38, CreateDate: "2002-06-27" }, { ID: 41, Code: 41, Name: "李巧玲", Age: 45, Height: 179, Weight: 52.20, CreateDate: "2009-03-18" }, { ID: 42, Code: 42, Name: "辜锋", Age: 50, Height: 142, Weight: 69.27, CreateDate: "2003-11-11" }, { ID: 43, Code: 43, Name: "郭晓林", Age: 50, Height: 151, Weight: 57.86, CreateDate: "2009-09-23" }, { ID: 44, Code: 44, Name: "许力威", Age: 35, Height: 148, Weight: 70.32, CreateDate: "2005-05-27" }, { ID: 45, Code: 45, Name: "王洋", Age: 38, Height: 186, Weight: 58.77, CreateDate: "2003-12-27" }, { ID: 46, Code: 46, Name: "李建钢", Age: 21, Height: 174, Weight: 45.03, CreateDate: "2005-11-16" }, { ID: 47, Code: 47, Name: "陈星延", Age: 63, Height: 146, Weight: 65.77, CreateDate: "2005-02-03" }, { ID: 48, Code: 48, Name: "李肖姗", Age: 28, Height: 192, Weight: 77.91, CreateDate: "2008-03-08" }, { ID: 49, Code: 49, Name: "于凤丽", Age: 38, Height: 163, Weight: 49.38, CreateDate: "2004-12-07" }, { ID: 50, Code: 50, Name: "缪金生", Age: 39, Height: 146, Weight: 79.06, CreateDate: "2001-01-01"}];

            var dg = $("#grid").datagrid({
                title: "test datagrid",
                ionCls: "save",
                width: 1200,
                height: 480,
                maximizable: true,
                rownumbers: true,
                remoteSort: false,
                pageList: [3, 5, 10, 20, 50, 100],
                data: data,
                idField: 'Key',
                striped: true,
                columns: [columns],
                rowContextMenu: [
                    { text: "mm1", iconCls: "icon-ok", disabled: function () { return false; }, handler: function (e, rowIndex, rowData, eventData) { } },
                    { text: function (e, rowIndex, rowData, eventData) { return rowData.Name; }, iconCls: "icon-search", handler: function (e, rowIndex, rowData, eventData) { } },
                    { text: "导出excel", iconCls: "icon-save", handler: function (e, rowIndex, rowData, eventData) { } },
                    { text: "设置列\"名称\"的标题", iconCls: "icon-edit", handler: function () { dg.datagrid("setColumnTitle", { field: "Name", title: "测试列名称" }); } },
                    { text: "设置列\"年龄\"的宽度", iconCls: "icon-edit", handler: function () { dg.datagrid("setColumnWidth", { field: "Age", width: 200 }); } }
                ],
                singeSelectOnRowContextMenu: true,
                hideDisabledMenu: false,
                pagination: false,
                enableHighlightColumn: false,
                columnFilter: columnFilter
            });

            $("#Button1").click(function () { dg.datagrid("setColumnFilter", columnFilter); });

            $("#Button2").click(function () { dg.datagrid("setColumnFilter", null); });

            $("#Button3").click(function () { dg.datagrid("setColumnFilter", $.extend({}, columnFilter, { position: "top" })); });

            $("#Button4").click(function () { dg.datagrid("setColumnFilter", $.extend({}, columnFilter, { position: "bottom" })); });

            $("#Button5").click(function () { dg.datagrid("columnFilterSelect", true); });

            $("#Button6").click(function () { dg.datagrid("columnFilterSelect", false); });

            $("#Button7").click(function () {
                var fields = dg.datagrid("getColumnFields"), t1 = $("#Text1"), t2 = $("#Text2"), field = t1.val(), value = t2.val();
                if (!$.array.contains(fields, field)) { $.easyui.messager.show("操作提醒", "请输入当前控件中存在的 field 值", "warning", "bottomCenter"); t1.focus(); }
                dg.datagrid("columnFilterSelect", { field: field, value: value, selected: true })
            });

            $("#Button8").click(function () {
                var fields = dg.datagrid("getColumnFields"), t3 = $("#Text3"), t4 = $("#Text4"), field = t3.val(), value = t4.val();
                if (!$.array.contains(fields, field)) { $.easyui.messager.show("操作提醒", "请输入当前控件中存在的 field 值", "warning", "bottomCenter"); t3.focus(); }
                dg.datagrid("columnFilterSelect", { field: field, value: value, selected: false })
            });

            $("#Button9").click(function () { dg.datagrid("columnFilterSelect", { field: "Code", value: [1, 2, 3, 4, 5], selected: true }); });

            $("#Button10").click(function () { dg.datagrid("columnFilterSelect", { field: "Name", value: ["汤小祥", "况文娟", "余梦恬", "陈文斌", "曾小莉"], selected: false }); });

            $("#Button11").click(function () {
                $.easyui.showDialog({ href: "http://www.baidu.com", iniframe: true });
            });
        });
    </script>

    <h2>jQuery EasyUI DataGrid Extensions</h2>
	<div class="demo-info">
	    jQuery EasyUI DataGrid Extensions ：该扩展基于 easyui-datagrid ，实现 datagrid 表格列头过滤器 UI 组件显示及其过滤效果(本地数据过滤)。
	</div>
    <hr />
    <table id='grid'></table>
    <hr />
    <input id="Button1" type="button" value="编程方式：启用表头过滤器功能" />
    <input id="Button2" type="button" value="编程方式：禁用表头过滤器功能" />
    <hr />
    <input id="Button3" type="button" value="编程方式：将表头的过滤器组件设置到列标题上方" />
    <input id="Button4" type="button" value="编程方式：将表头的过滤器组件设置到列标题下方" />
    <hr />
    <input id="Button5" type="button" value="编程方式：全部选择" />
    <input id="Button6" type="button" value="编程方式：全部不选" />
    <hr />
    <input id="Button7" type="button" value="编程方式：选择指定的字段中指定的值" />
    请输入字段的 Field 值:<input id="Text1" type="text" />
    请输入要操作的值:<input id="Text2" type="text" />
    <hr />
    <input id="Button8" type="button" value="编程方式：不选指定的字段中指定的值" />
    请输入字段的 Field 值:<input id="Text3" type="text" />
    请输入要操作的值:<input id="Text4" type="text" />
    <hr />
    <input id="Button9" type="button" value="编程方式：选中多个值" />
    该按钮点击后选中 Code 列的 "1, 2, 3, 4, 5"
    <hr />
    <input id="Button10" type="button" value="编程方式：不选多个值" />
    该按钮点击后不选 Name 列的 "汤小祥, 况文娟, 余梦恬, 陈文斌, 曾小莉"
    <hr />
    <input id="Button11" type="button" value="编程方式：ShowDialog" />
