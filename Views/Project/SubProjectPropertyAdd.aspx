<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectPropertyAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectPropertyAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Project/Views/SubProjectPropertyAdd.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var subkey = '<%= this.Request["key"] %>';
            var syskey = '<%= this.Request["syskey"] %>';
            window.project.SubProjectPropertyAdd_aspx.initPage(ajaxContainerSelector, subkey, syskey);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">问题分析关联资产：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">资产名称<span class="required">*</span>：</td>
                    <td class="table_td_right" colspan="3"><input id="txtName" name="Name" type="text" style=" width:567px;" /></td>
                </tr>
                <tr>
                    <td class="table_td_left">重要性C<span class="required">*</span>：</td>
                    <td class="table_td_right"><input id="txtImportanceC" name="ImportanceC" type="text" value="" /></td>
                    <td class="table_td_left">重要性I<span class="required">*</span>：</td>
                    <td class="table_td_right"><input id="txtImportanceI" name="ImportanceI" type="text" value="" /></td>
                </tr>
                <tr>
                    <td class="table_td_left">重要性A<span class="required">*</span>：</td>
                    <td class="table_td_right"><input id="txtImportanceA" name="ImportanceA" type="text" value="" /></td>
                    <td class="table_td_left"></td>
                    <td class="table_td_right"></td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
