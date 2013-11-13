<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="LoreFieldAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.LoreFieldAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/LoreLibs/Libs/lorefieldlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Views/LoreFieldAdd.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.lorelibs.LoreFieldAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">知识库字段信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
            <tr><td class="table_td_left">字段名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="50" /></td>
                <td class="table_td_left">字段编码<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtCode" name="Code" maxlength="20" /></td>
            </tr>
            <tr>
                <td class="table_td_left">数据类型：</td><td class="table_td_right">
                    <select id="selDataType" name="DataType" ></select>
                </td>
                <td class="table_td_left">数据最大长度：</td><td class="table_td_right"><input type="text" id="txtMaxLength" name="MaxLength" class="easyui-numberspinner" data-options="min:0" /></td>
            </tr>
            <tr><td class="table_td_left">验证类型：</td><td class="table_td_right"><select id="selValidType" ></select></td>
                <td class="table_td_left">是否可为空：</td><td class="table_td_right"><select id="IsNullable" class="easyui-combobox" name="IsNullable" ><option value="1" selected="selected">是</option><option value="0">否</option></select></td>
            </tr>
            <tr><td class="table_td_left">控件行数：</td><td class="table_td_right"><input type="text" id="txtRows" name="Rows" class="easyui-numberspinner" data-options="min:1,max:10,required:true" value="1" /></td>
                <td class="table_td_left">控件占位列：</td><td class="table_td_right"><select id="selCols" class="easyui-combobox" name="Cols" ><option value="1" selected="selected">1</option><option value="2">2</option></select></td>
            </tr>
            <tr>
                <td class="table_td_left">描述：</td>
                <td colspan="3"><input type="text" id="txtDescription" name="Description" style="width: 620px;" maxlength="200" /></td>
            </tr>
        </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">知识库字段简介：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left" style="vertical-align:top">简介：</td>
            <td><textarea rows="4" id="txtSummary" name="Summary" maxlength="500"></textarea></td></tr>
        </table>
        </fieldset>
    </div>
</asp:Content>
