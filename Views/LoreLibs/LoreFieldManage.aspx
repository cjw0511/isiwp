<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="LoreFieldManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.LoreFieldManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/LoreLibs/Libs/lorefieldlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Views/LoreFieldManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.lorelibs.LoreFieldManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <div style="padding:2px;">&nbsp;&nbsp;名称：<input type="text" id="txtName" />
    <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a></div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <table id="Grid"></table>
</asp:Content>
