<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="DocumentTemplateManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.DocumentTemplateManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Project/Common/officeHelp.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/DocumentTemplateManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.project.DocumentTemplateManage_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<table id="Grid" ></table>
</asp:Content>
