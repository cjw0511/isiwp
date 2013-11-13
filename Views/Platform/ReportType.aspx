<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ReportType.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.ReportType" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/workSpacelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/ReportType.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.ReportType_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<table id="Grid"></table>
</asp:Content>