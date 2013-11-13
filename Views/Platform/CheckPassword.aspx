<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="CheckPassword.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.CheckPassword" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Views/CheckPassword.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.CheckPassword_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">密码验证：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr>
            <td class="table_td_left">输入密码<span class="required">*</span>：</td>
            <td class="table_td_right"><input type="password" id="CheckPwd" name="CheckPwd" class="easyui-validatebox" /></td>
        </tr>
        </table>
    </fieldset>
</div>
</asp:Content>
