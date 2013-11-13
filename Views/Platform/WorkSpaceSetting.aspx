<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="WorkSpaceSetting.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.WorkSpaceSetting" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/workSpacelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/portletslib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/WorkSpaceSetting.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.WorkSpaceSetting_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <div style="padding-left: 10px;">
        修改首页排版
        <select id="selCols" class="easyui-combobox" style="width: 80px;">
            <option value="1">1列</option>
            <option value="2">2列</option>
            <option value="3">3列</option>
            <option value="4">4列</option>
            <option value="5">5列</option>
        </select>
        <a id="a_apply" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'">应用</a>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <table id="panellist"></table>
</asp:Content>