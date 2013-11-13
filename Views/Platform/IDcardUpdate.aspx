<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="IDcardUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.IDcardUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/securityInfolib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/IDcardUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.IDcardUpdate_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">修改身份证号：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">原身份证号<span class="required">*</span>：</td><td class="table_td_right"><span id="OldIDcard" name="IDcard" ></span></td></tr>
        <tr><td class="table_td_left">新身份证号<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="NewIDcard" name="NewIDcard" /></td></tr>
        <tr><td class="table_td_left">密码验证<span class="required">*</span>：</td><td class="table_td_right"><input type="password" id="CheckPwd" name="CheckPwd"  /></td></tr>
        </table>
    </fieldset>
</div>
</asp:Content>
