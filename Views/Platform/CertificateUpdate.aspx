<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="CertificateUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.CertificateUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/CertificateUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var id = '<%= this.Request["id"] %>';
            window.platform.CertificateUpdate_aspx.initPage(ajaxContainerSelector, id);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">证书信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">获得日期<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtGetDate" name="GetDate" /></td>
            <td class="table_td_left">所获证书/资历名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">颁发机构<span class="required">*</span>：</td><td colspan="3"><input type="text" id="txtIssuingUnit" name="IssuingUnit" maxlength="50" /></td></tr>
        <tr><td class="table_td_left" style="vertical-align:baseline;padding-top:7px;">简介：</td><td colspan="3" style="padding-top:5px;"><textarea id="txtSummary" name="Summary" rows="4" maxlength="500" ></textarea></td></tr>
        </table>
    </fieldset>
</div>
</asp:Content>
