<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="PasswordUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.PasswordUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/securityInfolib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/PasswordUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.PasswordUpdate_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">修改密码：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
    <tr><td class="table_td_left">原密码<span class="required">*</span>：</td><td class="table_td_right"><input id="txtOldPwd" name="OldPwd" type="password"" /></td></tr>
    <tr><td class="table_td_left">新密码<span class="required">*</span>：</td><td class="table_td_right"><input id="txtNewPwd" name="NewPwd" type="password" /></td></tr>
    <tr><td class="table_td_left">密码确认<span class="required">*</span>：</td><td class="table_td_right"><input id="txtRePwd" type="password" /></td></tr>
    </table>
    </fieldset>
</div>
</asp:Content>