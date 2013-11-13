<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="QuestionProtectUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.QuestionProtectUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/securityInfolib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/QuestionProtectUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.QuestionProtectUpdate_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">修改密保问题：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">密码保护问题一<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtQuestion1" name="Question1" style="width:240px;" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">密码保护答案一<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtAnswer1" name="Answer1" style="width:240px;" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">密码保护问题二<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtQuestion2" name="Question2" style="width:240px;" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">密码保护答案二<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtAnswer2" name="Answer2" style="width:240px;" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">密码保护问题三<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtQuestion3" name="Question3" style="width:240px;" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">密码保护答案三<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtAnswer3" name="Answer3" style="width:240px;" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">密码验证<span class="required">*</span>：</td><td class="table_td_right"><input type="password" id="CheckPwd" name="CheckPwd" style="width:240px;" /></td></tr>
        </table>
    </fieldset>
</div>
</asp:Content>
