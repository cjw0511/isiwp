<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="PositionUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.PositionUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/positionlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/PositionUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.platform.PositionUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
    <a id="btnDelete" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'">删除</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">岗位信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
            <tr><td class="table_td_left">岗位名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="50" /></td>
                <td class="table_td_left">岗位简称：</td><td class="table_td_right"><input type="text" id="txtShortName" name="ShortName" maxlength="20" /></td></tr>
            <tr><td class="table_td_left">岗位编码<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtCode" name="Code" maxlength="20" /></td>
                <td></td><td></td></tr>
        </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">岗位简介：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left" style="vertical-align:top">岗位简介：</td>
            <td><textarea id="txtSummary" name="Summary" rows="4" maxlength="500" ></textarea></td></tr>
        </table>
        </fieldset>
    </div>
</asp:Content>
