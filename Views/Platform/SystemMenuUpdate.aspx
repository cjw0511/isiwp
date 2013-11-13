<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SystemMenuUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.SystemMenuUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Common/menulib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/menulib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/SystemMenuUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.platform.SystemMenuUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">菜单信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="tleft">菜单名称<span class="required">*</span>：</td><td><input type="text" id="txtName" name="Name" style="width:400px" maxlength="50" /></td></tr>
        <tr><td class="tleft">菜单编号<span class="required">*</span>：</td><td><input type="text" id="txtCode" name="Code" style="width:400px" maxlength="20" /></td></tr>
        <tr><td class="tleft">菜单图标：</td><td><select id="selIcon" name="IconKey" style="width:404px" ></select></td></tr>
        <tr><td class="tleft">链接地址：</td><td><select id="txtNavigateUrl" style="width:404px" /></td></tr>
        <tr><td class="tleft">父级菜单：</td><td>
            <select id="selParentKey" name="ParentKey" class="easyui-combotree" data-options="required:true,editable:false,panelHeight:120" style="width:404px">
            </select></td></tr>
        <tr><td class="tleft">菜单布局类型：</td><td><select id="selLayoutType" name="LayoutType" style="width:404px"></select></td></tr>
        <tr><td class="tleft" style="vertical-align:baseline;padding-top:5px">简介：</td><td style="padding-top:3px;">
            <textarea id="txtSummary" name="Summary" rows="4" style="width:400px;" maxlength="500" ></textarea></td></tr>
        </table>
    </fieldset>
</div>
</asp:Content>