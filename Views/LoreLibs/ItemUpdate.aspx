<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ItemUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.ItemUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/LoreLibs/Views/ItemUpdate.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.lorelibs.ItemUpdate_aspx.initPage(ajaxContainerSelector, key);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">单元信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">名称：</td><td colspan="3"><input type="text" id="txtName3" name="Name" style="width: 620px;" maxlength="200"/></td></tr>
        <tr>
            <td class="table_td_left" style="vertical-align: top;padding-top:5px;">实施过程：</td>
            <td colspan="3" style="padding-top:5px;"><textarea id="txtProcess" name="Process" rows="5" maxlength="500"></textarea></td>
        </tr>
        <tr>
            <td class="table_td_left" style="vertical-align: top;padding-top:7px;">预期结果：</td>
            <td colspan="3" style="padding-top:7px;"><textarea id="txtResult" name="Result" rows="5" maxlength="500"></textarea></td>
        </tr>
        </table>
    </fieldset>
</div>
</asp:Content>
