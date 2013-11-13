<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="LoreUnitItemCopy.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.LoreUnitItemCopy" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/LoreLibs/Views/LoreUnitItemCopy.js" type="text/javascript"></script>
<script src="Resources/Scripts/LoreLibs/Libs/normlib.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.lorelibs.LoreUnitItemCopy_aspx.initPage(ajaxContainerSelector, key);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <table class="tablecss" cellpadding="0" cellspacing="0">
    <tr><td class="table_td_left">复制源：</td><td colspan="3"><select id="selSourceKey" name="SourceKey" class="easyui-combotree" data-options="required:true,editable:false,panelHeight:'auto'"></select></td></tr>
    </table>
    </fieldset>
</asp:Content>
