<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="LoreManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.LoreManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/LoreLibs/Libs/lorelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Libs/loretypelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Views/LoreManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.lorelibs.LoreManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true, minWidth: 270, maxWidth: 430"  style="width:270px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;" >
            <div class="easyui-panel" data-options="title:'知识类别',fit:true,border:false" >
                <div class="easyui-layout" data-options="border:false,fit:true" >
                    <div data-options="region: 'north', border: false" style="overflow:hidden">
                        <div class="datagrid-toolbar">
                        <a id="a_expand" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">展开</a>
                        <a id="a_collapse" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">折叠</a>
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
        <div data-options="region:'center'" style="width:270px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
            <div id="Panel" class="easyui-panel" data-options="title:'知识管理',fit:true,border:false" >
            </div>
        </div>
    </div>
</asp:Content>
