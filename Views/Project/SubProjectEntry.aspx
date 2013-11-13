<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectEntry.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectEntry" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">

<script src="Resources/Scripts/Project/Views/SubProjectEntry.js" type="text/javascript"></script>
    <script src="Resources/Plugins/jquery-easyui-datagridview/datagrid-detailview.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%=this.Request["key"] %>';
            var name = '<%=this.Request["name"] %>';
            window.project.SubProjectEntry_aspx.initPage(ajaxContainerSelector, key,name);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<table id="SubProjectGrid"></table>
</asp:Content>
