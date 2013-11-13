<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="LoreTypeAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.LoreTypeAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/LoreLibs/Libs/loretypelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Views/LoreTypeAdd.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.lorelibs.LoreTypeAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
            <legend class="panel-title">类别信息：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">名称<span class="required">*</span>：</td>
                    <td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="50" /></td>
                    <td class="table_td_left">编号<span class="required">*</span>：</td>
                    <td class="table_td_right"><input type="text" id="txtCode" name="Code" maxlength="20" /></td>
                </tr>
                <tr>
                    <td class="table_td_left">节点类型：</td>
                    <td class="table_td_right"><select id="txtType" name="Type" class="easyui-combobox" ><option value="1" selected="selected">目录节点</option><option value="2">知识节点</option></select></td>
                    <td class="table_td_left">所属节点：</td>
                    <td class="table_td_right"><select id="txtParentKey" name="ParentKey" class="easyui-combotree" data-options="required:true,editable:false,panelHeight:'auto',panelWidth:300"></select></td>
                </tr>
                <%--<tr>
                    <td class="table_td_left">描述：</td>
                    <td colspan="3"><input type="text" id="txtDescription" name="Description" style="width: 620px;" maxlength="200"  /></td>
                </tr>--%>
            </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">类别简介：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left" style="vertical-align: top">简介：</td>
                    <td><textarea id="txtSummary" name="Summary" rows="4" maxlength="500"></textarea></td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
