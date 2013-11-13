<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="LogonConfig.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.LogonConfig" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/logonConfiglib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/LogonConfig.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.LogonConfig_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'north',border:false">
            <div class="datagrid-toolbar">
                <table>
                <tr><td>&nbsp;&nbsp;名称：</td><td><input type="text" id="txtName" />
                </td><td>&nbsp;&nbsp;<a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                        <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                </td></tr>
                </table>
            </div>
        </div>
        <div data-options="region:'center',border:false">
            <table id="Grid"></table>
        </div>
    </div>
</asp:Content>