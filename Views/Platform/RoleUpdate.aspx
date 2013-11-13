<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="RoleUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.RoleUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/rolelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/RoleUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.platform.RoleUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">角色信息：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">角色名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="50" /></td>
            <td class="table_td_left">角色简称：</td><td class="table_td_right"><input type="text" id="txtShortName" name="ShortName" maxlength="30" /></td></tr>
        <tr><td class="table_td_left">角色编码<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtCode" name="Code" maxlength="20" /></td>
            <td></td><td></td></tr>
    </table>
    </fieldset>
</div>
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">角色简介：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
    <tr><td class="table_td_left" style="vertical-align:top">角色简介：</td><td><textarea rows="1" cols="1" id="txtSummary" name="Summary" rows="4" maxlength="500" ></textarea></td></tr>
    </table>
    </fieldset>
</div>
</asp:Content>