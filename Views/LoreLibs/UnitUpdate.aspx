<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="UnitUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.UnitUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/LoreLibs/Views/UnitUpdate.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.lorelibs.UnitUpdate_aspx.initPage(ajaxContainerSelector, key);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">单元信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">名称：</td><td colspan="3"><input type="text" id="txtName2" name="Name" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">选择类别：</td><td class="table_td_right"><select id="selCategory" name="Category"></select></td>
            <td class="table_td_left">选择级别：</td><td class="table_td_right"><select id="selGrade" name="Grade"></select></td>
        </tr>
        <tr>
            <td class="table_td_left" style="vertical-align: top;padding-top:5px;">测评单元描述：</td>
            <td colspan="3" style="padding-top:5px;"><textarea id="txtDescription" name="Description" rows="3" maxlength="200" ></textarea></td>
        </tr>
        <tr>
            <td class="table_td_left" style="vertical-align: top;padding-top:7px;">测评方式：</td>
            <td colspan="3" style="padding-top:7px;"><textarea id="txtMode" name="Mode" rows="3" maxlength="200"></textarea></td>
        </tr>
        <tr>
            <td class="table_td_left" style="vertical-align: top;padding-top:7px;">测评对象：</td>
            <td colspan="3" style="padding-top:7px;"><textarea id="txtTarget" name="Target" rows="3" maxlength="200"></textarea></td>
        </tr>
        </table>
    </fieldset>
</div>
</asp:Content>
