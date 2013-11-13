<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="PortletsUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.PortletsUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/portletslib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/PortletsUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.platform.PortletsUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">面板信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left">面板标题<span class="required">*</span>：</td><td><input type="text" id="txtTitle" name="Title" style="width:300px" maxlength="50" /></td></tr>
        <tr><td class="table_td_left">面板图标：</td><td><select id="selIcon" name="IconKey" style="width:304px" ></select></td></tr>
        <tr><td class="table_td_left">面板高度(px)：</td><td><input type="text" id="txtHeight" name="Height" value="200" style="width:300px" maxlength="5" /></td></tr>
        <tr><td class="table_td_left">链接地址：</td><td><select id="txtNavigateUrl" style="width:304px" /></td></tr>    
        <tr><td class="table_td_left">是否内嵌框架：</td><td>
            <select id="IsIframe" name="Iniframe" class="easyui-combobox" style="width:304px">
                <option value="1">是</option>
                <option value="0" selected="selected">否</option>
            </select></td></tr>
        <tr><td class="table_td_left" style="vertical-align:baseline;padding-top:7px;">描述：</td><td colspan="3" style="padding-top:5px;"><textarea id="txtDescription" name="Description" rows="4" style="width:300px;" maxlength="200"></textarea></td></tr>
        </table>
    </fieldset>
</div>
</asp:Content>
