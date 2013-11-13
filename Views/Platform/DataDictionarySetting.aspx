<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="DataDictionarySetting.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.DataDictionarySetting" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/dataDictionarylib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/DataDictionarySetting.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.DataDictionarySetting_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true, minWidth: 270, maxWidth: 500" style="width:270px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
            <div class="easyui-panel" data-options="title:'数据字典主表',fit:true,border:false" >
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north', border: false" style="overflow:hidden">
                        <div class="datagrid-toolbar">      
                            <a id="a_add" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-create'">添加</a>
                            <a id="a_update" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">编辑</a>
                            <a id="a_del" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'">删除</a>
                            <a id="a_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
                        </div>
                    </div>
                    <div data-options="region: 'center', border: false">
                        <ul id="Tree"></ul>
                    </div>
                </div>
             </div>
        </div>
        <div data-options="region:'center'" style="border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
            <div class="easyui-panel" data-options="title:'数据字典',fit:true,border:false" >
                <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'north',border:false">
                    <div class="datagrid-toolbar">
                        <div style="padding:2px;">&nbsp;&nbsp;条目名称：<input type="text" id="txtName" />
                        <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a></div>
                    </div>
                </div>
                <div data-options="region:'center',border:false">
                    <table id="Grid"></table>
                </div>
                </div>
             </div>
        </div>
    </div>
</asp:Content>