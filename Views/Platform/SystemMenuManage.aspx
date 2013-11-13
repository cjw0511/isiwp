<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SystemMenuManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.SystemMenuManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/menulib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/SystemMenuManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.SystemMenuManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="divLayout" class="easyui-layout" data-options="fit:true">
    <div data-options="region:'west',split:true, minWidth: 300, maxWidth: 1000" style="width:300px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
        <div class="easyui-panel" data-options="title:'系统菜单管理',fit:true,border:false" >
            <div class="easyui-layout" data-options="border:false,fit:true">
                <div data-options="region: 'north', border: false" style="overflow:hidden">
                    <div class="datagrid-toolbar" style="height:27px">
                        <a id="a_add" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-create'">添加</a>
                        <a id="a_edit" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">编辑</a>
                        <a id="a_del" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'">删除</a>
                        <a id="a_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
                    </div>
                </div>
                <div data-options="region: 'center', border: false">
                    <ul id="Tree">
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div data-options="region:'center'" style="border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
        <div class="easyui-panel" data-options="title:'收藏夹管理',fit:true,border:false" >
            <table id="Grid"></table>
        </div>
    </div>
</div>
</asp:Content>