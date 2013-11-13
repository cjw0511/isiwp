<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubRectificationTemplateAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubRectificationTemplateAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Views/SubRectificationTemplateAdd.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        window.project.SubRectificationTemplateAdd_aspx.initPage(ajaxContainerSelector);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
    <legend class="panel-title">整改方案信息：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr>
            <td class="table_td_left">整改方案标题<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtTitle1" name="Title" maxlength="32" />(限制：32字)</td>
            <td class="table_td_left">排序号<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtSort1" name="Sort" maxlength="5" /></td>
        </tr>
        <tr>
            <td height="80" class="table_td_left">方案描述：</td><td class="table_td_right" colspan="4"><textarea id="txtDescription" name="Description" rows="4" style="width:620px" maxlength="1000"></textarea></td>
        </tr>
        </table>
    </fieldset>
</div>
</asp:Content>