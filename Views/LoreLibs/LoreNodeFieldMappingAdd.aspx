<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="LoreNodeFieldMappingAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.LoreNodeFieldMappingAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/LoreLibs/Libs/lorefieldlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/LoreLibs/Views/LoreNodeFieldMappingAdd.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.lorelibs.LoreNodeFieldMappingAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">字段信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">知识节点类型：</td><td class="table_td_right"><input id="fieldtype1" type="radio" checked="checked" name="FieldType" value="0" /><label for="fieldtype1">知识库字段</label><input id="fieldtype2" type="radio" name="FieldType" value="1" /><label for="fieldtype2">知识节点</label></td>
            <td class="table_td_left">别名：</td><td class="table_td_right"><input type="text" id="txtMappingName" name="MappingName" maxlength="50" /></td>
        </tr>
        <tr>
            <td class="table_td_left">知识库字段：</td><td class="table_td_right"><select id="selMappingField" name="MappingFieldKey" ></select></td>
        </tr>
        <tr><td class="table_td_left">编号：</td><td class="table_td_right"><span id="spnCode"></span></td>
            <td class="table_td_left">数据类型：</td><td class="table_td_right"><span id="spnDataType"></span></td>
        </tr>
        <tr>
            <td class="table_td_left">是否可为空：</td><td class="table_td_right"><span id="spnIsNullable"></span></td>
            <td class="table_td_left">验证类型：</td><td class="table_td_right"><span id="spnValidType"></span></td>
        </tr>
        <tr><td class="table_td_left">描述：</td>
            <td colspan="3"><span id="spnDescription"></span></td>
        </tr>
        <tr><td class="table_td_left">简介：</td>
            <td colspan="3"><span id="spnSummary"></span></td>
        </tr>
        <tr style="display:none;">
            <td class="table_td_left">知识节点：</td><td class="table_td_right"><select id="selMappingNode" name="MappingNodeKey" ></select></td>
            <td class="table_td_left">显示方式：</td><td class="table_td_right"><select id="selShowType" class="easyui-combobox" name="ShowType" ><option value="0" selected="selected">下拉项</option><option value="1">下拉表格</option></select></td>
        </tr>
        <tr style="display:none;">
            <td class="table_td_left">是否可多选：</td><td class="table_td_right"><select id="IsMultiple" class="easyui-combobox" name="IsMultiple" ><option value="0" selected="selected">单选</option><option value="1">多选</option></select></td>
            <td class="table_td_left">是否可为空：</td><td class="table_td_right"><select id="IsNullable" class="easyui-combobox" name="IsNullable" ><option value="1" selected="selected">是</option><option value="0">否</option></select></td>
        </tr>
        <tr style="display:none;">
            <td class="table_td_left">控件占位列：</td><td class="table_td_right"><select id="selCols" class="easyui-combobox" name="Cols" ><option value="1" selected="selected">1</option><option value="2">2</option></select></td>
        </tr>
        </table>
    </fieldset>
</div>
</asp:Content>
