<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="TierAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.TierAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/LoreLibs/Libs/normlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Views/TierAdd.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.lorelibs.TierAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
            <legend class="panel-title">层面信息：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="50" /></td>
                    <td class="table_td_left">父节点<span class="required">*</span>：</td>
                    <td class="table_td_right"><select id="txtParentKey" name="ParentKey" class="easyui-combotree" data-options="required:true,editable:false,panelHeight:'auto'"></select></td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
