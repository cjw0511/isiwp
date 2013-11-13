<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="LogonConfigUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.LogonConfigUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/logonConfiglib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/LogonConfigUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var id = '<%= this.Request["id"] %>';
            window.platform.LogonConfigUpdate_aspx.initPage(ajaxContainerSelector, id);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">安全策略信息：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">安全策略名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName" /></td>
            <td class="table_td_left">安全策略编码<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtCode" /></td></tr>
            <tr><td class="table_td_left">安全策略键<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtKey" /></td>
            <td class="table_td_left">安全策略值<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtValue" /></td></tr>
            <tr><td class="table_td_left" style="vertical-align:top;padding-top:8px;">安全策略描述：</td><td colspan="3" style="padding-top:5px;">
                <textarea rows="1" cols="1" id="txtDescription" style="overflow:auto;height:60px;width:620px;" ></textarea></td>
            </tr>
    </table>
    </fieldset>
</div>
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">安全策略简介：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
    <tr><td class="table_td_left" style="vertical-align:top">安全策略简介：</td><td><textarea id="txtSummary" rows="4" ></textarea></td></tr>
    </table>
    </fieldset>
</div>
</asp:Content>