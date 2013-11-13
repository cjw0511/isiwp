<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="FunctionRangeSetting.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.FunctionRangeSetting" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/departmentlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/FunctionRangeSetting.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.platform.FunctionRangeSetting_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="easyui-layout" data-options="fit:true">
    <div data-options="region:'north',border:false">
        <div class="datagrid-toolbar">       
        <a href="javascript:void(0)" id="menu_expand" onclick="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain: true">展开</a>
        <a href="javascript:void(0)" id="menu_collapse" onclick="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain: true">折叠</a>
        </div>
    </div>
    <div data-options="region:'center',border:false">
        <ul id="Tree"></ul>
    </div>
</div>
</asp:Content>
