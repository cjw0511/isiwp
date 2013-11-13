<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ExperienceUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.ExperienceUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/ExperienceUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var id = '<%= this.Request["id"] %>';
            window.platform.ExperienceUpdate_aspx.initPage(ajaxContainerSelector, id);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">经历信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">开始时间<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtBeginDate" name="BeginDate" /></td>
            <td class="table_td_left">结束时间<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtEndDate" name="EndDate" /></td></tr>
        <tr><td class="table_td_left">经历名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="50" /></td>
            <td class="table_td_left">所在地：</td><td class="table_td_right"><input type="text" id="txtLocation" name="Location" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">经历类型：</td><td colspan="3">
            <select id="selExperienceType" name="ExperienceType"></select></td></tr>
        <tr><td class="table_td_left" style="vertical-align:baseline;padding-top:7px;">简介：</td><td colspan="3" style="padding-top:5px;"><textarea id="txtSummary" name="Summary" rows="4" maxlength="500"></textarea></td></tr>
        </table>
    </fieldset>
</div>
</asp:Content>
