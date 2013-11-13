<%@ Page Language="C#"  MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="WorkSpaceBusinessFollow.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.WorkSpaceBusinessFollow" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Libs/businessFollowlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/WorkSpaceBusinessFollow.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.WorkSpaceBusinessFollow_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:content id="Content2" contentplaceholderid="ContentBody" runat="server">
    <table id="Grid"></table>
</asp:content>
