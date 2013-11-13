<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="ContactManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.ContactManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Libs/Contactlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/ContactManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.ContactManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <table>
        <tr><td>&nbsp;&nbsp;姓名：</td>
        <td><input type="text" id="txtName" />
        </td><td>&nbsp;&nbsp;性别：</td>
        <td><select id="selSexSearch" ></select> 
        </td><td>&nbsp;&nbsp;<a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
        </td></tr>
    </table>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <table id="Grid"></table>
</asp:Content>
