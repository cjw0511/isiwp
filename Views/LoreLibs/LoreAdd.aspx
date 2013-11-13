<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="LoreAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.LoreAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/LoreLibs/Libs/lorelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Libs/lorefieldlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Views/LoreAdd.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var nodekey = '<%= this.Request["nodekey"] %>';
            window.lorelibs.LoreAdd_aspx.initPage(ajaxContainerSelector, nodekey);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center" >
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">知识信息：</legend>
        <table id="fieldtable" class="tablecss" cellpadding="0" cellspacing="0">
        </table>
        </fieldset>
    </div>
</asp:Content>
