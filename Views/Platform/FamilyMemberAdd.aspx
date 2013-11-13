<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="FamilyMemberAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.FamilyMemberAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/FamilyMemberAdd.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.FamilyMemberAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">家庭成员信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">姓名<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="20" /></td>
        <td class="table_td_left">性别：</td><td class="table_td_right"><select id="selSex" name="SexKey" ></select></td></tr>
        <tr><td class="table_td_left">成员关系：</td><td class="table_td_right">
            <select id="selFamilyMemberType" name="FamilyMemberType" ></select></td>
            <td class="table_td_left">联系方式：</td><td class="table_td_right"><input type="text" id="txtContact" name="Contact" maxlength="20" /></td></tr>
        <tr><td class="table_td_left">工作单位：</td><td colspan="3"><input type="text" id="txtWorkUnit" name="WorkUnit" maxlength="50" /></td></tr>
        <tr><td class="table_td_left" style="vertical-align:baseline;padding-top:7px;">简介：</td><td colspan="3" style="padding-top:5px;">
            <textarea id="txtSummary" name="Summary" rows="4" maxlength="200" ></textarea></td></tr>
        </table>
    </fieldset>
</div>
</asp:Content>