<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="DevReportShow.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.DevReportShow" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Testing/DevReportShow.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '21';
            var tradekey = '0';
            window.DevReportShow_aspx.initPage(ajaxContainerSelector, key, tradekey);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <a href="Testing/WebForm1.aspx" target="_blank" id="btnShowReport" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true">显示报表1</a>
    <a id="testcopy" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true">复制单元和要求项</a>
</asp:Content>
