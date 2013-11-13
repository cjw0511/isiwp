<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubRectificationMainUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubRectificationMainUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Views/SubRectificationMainUpdate.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.project.SubRectificationMainUpdate_aspx.initPage(ajaxContainerSelector, key);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<%--<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">整改方案信息：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
    <tr><td class="table_td_left">整改方案：</td>
    <td><table cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <input type="text" id="txtMasterKey" name="Master" /><input type="hidden" id="MasterKey"
                        name="MasterKey" />&nbsp;
                </td>
                <td>
                    <a href="javascript:void(0)" class="easyui-linkbutton" id="aMaster" data-options="iconCls:'icon-select',plain:true"></a>
                </td>
            </tr>
        </table>
    </td></tr>
    </table>
    </fieldset>
</div>--%>
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">整改方案模版信息：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr>
            <td class="table_td_left">模板标题<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtTitle4" name="Title" maxlength="32" />(限制：32字)</td>
            <td class="table_td_left">模板类型<span class="required">*</span>：</td><td class="table_td_right"><select id="selTemplateType" class="easyui-combobox" name="TemplateType" ></select></td>
        </tr>
        <tr>
            <td class="table_td_left">整改方案类型：</td><td class="table_td_right"><select id="selTypeKey" name="TypeKey" ></select></td>
            <td class="table_td_left">排序号：</td><td class="table_td_right"><input type="text" id="txtSort4" name="Sort" maxlength="5" /></td>
        </tr>
    </table>
    </fieldset>
</div>
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">描述：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
    <tr><td class="table_td_left" style="vertical-align:top">模板描述：</td><td><textarea cols="1" id="txtDescription" name="Description" rows="4" maxlength="1000" ></textarea></td></tr>
    </table>
    </fieldset>
</div>
</asp:Content>