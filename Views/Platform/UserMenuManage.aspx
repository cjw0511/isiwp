<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="UserMenuManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.UserMenuManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/menulib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/rolelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/UserMenuManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.UserMenuManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true, minWidth: 270, maxWidth: 430" style="width: 270px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
            <div class="easyui-panel" data-options="title:'个人菜单',fit:true,border:false">
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north', border: false" style="overflow:hidden">
                        <div class="datagrid-toolbar">
                            <a id="rolemenu_expand" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">展开</a>
                            <a id="rolemenu_collapse" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">折叠</a>
                            <a id="rolemenu_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
                        </div> 
                    </div>
                    <div data-options="region: 'center', border: false">
                        <ul id="RoleMenuTree">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div data-options="region:'center'" style="border-top-width:0px;border-bottom-width:0px;">
            <div class="easyui-panel" data-options="title:'个人收藏夹',fit:true,border:false">
                <table id="UserFavoritesGrid"></table>
            </div>
        </div>
        <div id="_east" data-options="region:'east',split:true,title:'系统收藏夹'" style="width: 300px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
            <div id="layout_east" class="easyui-layout" data-options="fit:true">
                <div data-options="region:'north',split:true, minHeight: 200, maxHeight: 500" style="height: 350px;border-top-width:0px;border-left-width:0px;border-right-width:0px;">
                    <table id="MenuFavoritesGrid"></table>
                </div>
                <div data-options="region:'center'" style="border-bottom-width:0px;border-left-width:0px;border-right-width:0px;">
                    <table id="RoleFavoritesGrid"></table>
                </div>
            </div>
        </div>
    </div>
</asp:Content>