<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="WorkSpaceSubProject.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.WorkSpaceSubProject" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/WorkSpaceSubProject.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.WorkSpaceSubProject_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:content id="Content2" contentplaceholderid="ContentToolBar" runat="server">
        <table>
        <tr><%--<td>&nbsp;&nbsp;实施状态：</td>
        <td><select id="selProgressKey" style="width: 120px;"></select>
        </td>--%><td>&nbsp;&nbsp;所处阶段：</td>
        <td><select id="selStageType" style="width: 120px;"></select>
        </td><td>&nbsp;&nbsp;<a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                <a id="btnRefresh" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-refresh',plain:true">刷新</a>
        </td></tr>
    </table>
</asp:content>
<asp:content id="Content3" contentplaceholderid="ContentBody" runat="server">
    <table id="Grid"></table>
</asp:content>
