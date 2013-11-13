<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubRectificationFieldUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubRectificationFieldUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Views/SubRectificationFieldUpdate.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var MasterKey = '<%= this.Request["MasterKey"] %>';
        var key = '<%= this.Request["key"] %>';
        window.project.SubRectificationFieldUpdate_aspx.initPage(ajaxContainerSelector, key, MasterKey);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<%--<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">整改方案模板信息：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
    <tr><td class="table_td_left">整改方案模板：</td>
    <td><table cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <input type="text" id="txtTemplateKey" name="Template" /><input type="hidden" id="TemplateKey"
                        name="TemplateKey" />&nbsp;
                </td>
                <td>
                    <a href="javascript:void(0)" class="easyui-linkbutton" id="aTemplate" data-options="iconCls:'icon-select',plain:true"></a>
                </td>
            </tr>
        </table>
    </td></tr>
    </table>
    </fieldset>
</div>--%>
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">整改方案字段信息：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr>
            <td class="table_td_left">字段名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName6" name="Name" maxlength="32" />(限制：32字)</td>
            <td class="table_td_left">排序号<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtSort6" name="Sort" maxlength="5" /></td>
        </tr>
        <tr>
            <td height="80" class="table_td_left">字段描述：</td><td class="table_td_right" colspan="4"><textarea id="txtDescription" name="Description" rows="4" style="width:620px" maxlength="1000"></textarea></td>
        </tr>
        </table>
    </fieldset>
</div>
</asp:Content>

