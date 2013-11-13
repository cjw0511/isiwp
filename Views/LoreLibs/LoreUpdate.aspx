<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="LoreUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.LoreUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/LoreLibs/Libs/lorelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Libs/lorefieldlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Views/LoreUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.lorelibs.LoreUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">知识信息：</legend>
        <table id="fieldtable" class="tablecss" cellpadding="0" cellspacing="0">
        </table>
        </fieldset>
    </div>
</asp:Content>
