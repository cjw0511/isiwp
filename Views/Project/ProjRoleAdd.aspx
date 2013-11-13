<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ProjRoleAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.ProjRoleAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Project/Libs/projrolelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/ProjRoleAdd.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.project.ProjRoleAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content  ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">项目角色信息：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
               <tr>
                    <td class="table_td_left">角色名称<span class="required">*</span>：</td>
                    <td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="32" />(限制：32字)</td>
                    <td class="table_td_left">角色编码<span class="required">*</span>：</td>
                    <td class="table_td_right"><input type="text" id="txtCode" name="Code" maxlength="20" />(限制：20字符)</td>
                </tr>
            </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">角色简介：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left" style="vertical-align: top">
                        角色简介：
                    </td>
                    <td>
                        <textarea rows="1" cols="1" id="txtRemark" name="Remark" style="overflow: auto;height: 60px; width: 620px;" maxlength="300"></textarea>(限制：300字符)
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
        <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">角色权限信息： </legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                      权限默认：
                    </td>
                    <td class="table_td_right">
                       查看  <a href="javascript:void(0)" class="easyui-linkbutton easyui-tooltip" data-options="iconCls:'icon-help',plain:true,position: 'right'"
                                        title="权限默认设置可以查看，进行设置请修改角色"></a>
                    </td>
                </tr>
            </table>
            
        </fieldset>
    </div>
</asp:Content>

