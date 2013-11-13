<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="TradeManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.TradeManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/LoreLibs/Views/TradeManage.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        window.lorelibs.TradeManage_aspx.initPage(ajaxContainerSelector);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">行业添加：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">名称：</td><td class="table_td_right"><input type="text" id="txtName_1" /></td>
            <td class="table_td_left">复制来源：</td><td class="table_td_right"><select id="selTrade_1" ></select></td>
            <td style="width:100px;"><a id="a_add" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-create'">添加</a></td>
        </tr>
        </table>
    </fieldset>
</div>
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">行业重命名：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">选择行业：</td><td class="table_td_right"><select id="selTrade_2" ></select></td>
            <td class="table_td_left">重命名：</td><td class="table_td_right"><input type="text" id="txtName_2" /></td>
            <td style="width:100px;"><a id="a_rename" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">确定</a></td>
        </tr>
        </table>
    </fieldset>
</div>
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">行业删除：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">选择行业：</td><td class="table_td_right"><select id="selTrade_3" ></select></td>
            <td class="table_td_left"></td><td class="table_td_right"></td>
            <td style="width:100px;"><a id="a_delete" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-no'">删除</a></td>
        </tr>
        </table>
    </fieldset>
</div>
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">行业更新：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">选择行业：</td><td class="table_td_right"><select id="selTrade_4" ></select></td>
            <td class="table_td_left">更新来源：</td><td class="table_td_right"><select id="selTrade_5" ></select></td>
            <td style="width:100px;"><a id="a_update" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">更新</a></td>
        </tr>
        </table>
    </fieldset>
</div>
</asp:Content>
