<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="DataDictionaryDetailUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.DataDictionaryDetailUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/dataDictionarylib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/DataDictionaryDetailUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var id = '<%= this.Request["id"] %>';
            window.platform.DataDictionaryDetailUpdate_aspx.initPage(ajaxContainerSelector, id);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">数据字典信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">主表<span class="required">*</span>：</td><td colspan="3"><select id="selMainKey" name="MainKey" style="width:623px;" ></select></td></tr>
        <tr><td class="table_td_left">名称<span class="required">*</span>：</td><td colspan="3"><input type="text" id="txtName" name="Name" style="width:620px;" maxlength="100" /></td></tr>
        <tr><td class="table_td_left">标签：</td><td colspan="3"><input type="text" id="txtLabel" name="Label" style="width:620px;" maxlength="100" /></td></tr>
        <tr><td class="table_td_left">编号：</td><td class="table_td_right"><input type="text" id="txtCode" name="Code" maxlength="50" /></td>
                <td class="table_td_left">Key：</td><td class="table_td_right"><span id="txtKey" name="Key" ></span></td></tr>
        <tr><td class="table_td_left">值：</td><td class="table_td_right"><input type="text" id="txtValue" name="Value" maxlength="100" /></td>
                <td class="table_td_left">值对应的int值：</td><td class="table_td_right"><span id="txtIntValue" name="IntValue" maxlength="6" ></span></td></tr>
        <tr><td class="table_td_left">附加值1：</td><td class="table_td_right"><input type="text" id="txtValue1" name="Value1" maxlength="500" /></td>
                <td class="table_td_left">附加值2：</td><td class="table_td_right"><input type="text" id="txtValue2" name="Value2" maxlength="500" /></td></tr>
        <tr><td class="table_td_left">附加值3：</td><td class="table_td_right"><input type="text" id="txtValue3" name="Value3" maxlength="500" /></td>
                <td class="table_td_left">附加值4：</td><td class="table_td_right"><input type="text" id="txtValue4" name="Value4" maxlength="500" /></td></tr>
        <tr><td class="table_td_left">值附加5：</td><td class="table_td_right"><input type="text" id="txtValue5" name="Value5" maxlength="500" /></td>
                <td class="table_td_left">附加值6：</td><td class="table_td_right"><input type="text" id="txtValue6" name="Value6" maxlength="500" /></td></tr>
        <tr><td class="table_td_left">描述：</td><td colspan="3"><input type="text" id="txtDescription" name="Description" style="width:620px;" maxlength="200" /></td></tr>
        <tr><td class="table_td_left">备注：</td><td colspan="3"><input type="text" id="txtRemark" name="Remark" style="width:620px;" maxlength="500" /></td></tr>
        <tr><td class="table_td_left" style="vertical-align:baseline;padding-top:5px;">简介：</td><td colspan="3" style="padding-top:3px;"><textarea id="txtSummary" name="Summary" rows="4" maxlength="500" ></textarea></td></tr>
        </table>
    </fieldset>
</div>
</asp:Content>