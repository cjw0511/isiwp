<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="RoleMenuManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.RoleMenuManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/menulib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/rolelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/RoleMenuManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.RoleMenuManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="divLayout" class="easyui-layout" data-options="fit:true"> 
    <div data-options="region:'west',split:true, minWidth: 270, maxWidth: 430" style="width:270px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
        <div class="easyui-panel" data-options="title:'角色树',fit:true,border:false" >
            <div class="easyui-layout" data-options="border:false,fit:true">
                <div data-options="region: 'north', border: false" style="overflow:hidden">
                    <div class="datagrid-toolbar">
                        <a id="role_expand" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">展开</a>
                        <a id="role_collapse" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">折叠</a>
                        <a id="role_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
                    </div>
                    </div>
                    <div data-options="region: 'center', border: false">
                        <ul id="RoleTree">
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div data-options="region:'center'" style="border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
        <div id="tabs" class="easyui-tabs" data-options="fit:true,border:false">
            <div title="角色菜单设置">
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north', border: false" style="overflow:hidden">
                        <div class="datagrid-toolbar">
                            <a id="menu_save" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                            <a id="menu_expand" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">展开</a>
                            <a id="menu_collapse" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">折叠</a>
                        </div>
                    </div>
                    <div data-options="region: 'center', border: false">
                        <ul id="MenuTree">
                        </ul>
                    </div>
                </div>
            </div>
            <div title="角色收藏夹设置">
                <div id="divLayoutInTab" class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'west',split:true, minWidth: 300, maxWidth: 430" style="width:300px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
                        <div class="easyui-panel" data-options="title:'角色菜单',fit:true,border:false" >
                            <div class="easyui-layout" data-options="border:false,fit:true">
                                <div data-options="region: 'north', border: false" style="overflow:hidden">
                                    <div class="datagrid-toolbar" style="height:27px">
                                        <a id="RoleMenu_expand" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">展开</a>
                                        <a id="RoleMenu_collapse" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">折叠</a>
                                        <a id="RoleMenu_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>                  
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
                        <div class="easyui-panel" data-options="title:'角色收藏夹',fit:true,border:false">
                            <table id="RoleFavoritesGrid"  ></table>
                        </div>
                    </div>
                    <div id="_east" data-options="region:'east',split:true, minWidth: 300, maxWidth: 430,title:'系统收藏夹' " style="width:300px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
                            <div class="easyui-layout" data-options="fit:true">
                                <div data-options="region:'north',border:false">
                                    <div class="datagrid-toolbar" style="height:27px">下列收藏菜单将默认显示
                                    </div>
                                </div>
                                <div data-options="region:'center',border:false">
                                    <table id="MenuFavoritesGrid"></table>
                                </div>
                            </div>     
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>