<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="WorkSpaceLore.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.WorkSpaceLore" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Views/WorkSpaceLore.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.WorkSpaceLore_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
 <div data-options="region:'center',split:true" style="height:100%;border-top-width:0px;border-left-width:0px;border-right-width:0px; overflow:hidden;">
        <div id="panel" class="datagrid-toolbar" style=" height:100%;">
    <table class="tablecss"  cellpadding="0" cellspacing="0" width="100%">
        <br />
        <tr>
            <td width="50%" class="table_td_left" >知识库字段维护</td>
             <td width="10%"></td>
            <td width="40%" class="table_td_right"><a id="btnProcess1"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'" >操作更多</a></td>
        </tr>
        <tr>
            <td class="table_td_left">知识库类别管理</td>
              <td></td>
            <td class="table_td_right"><a id="btnProcess2" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'" >操作更多</a></td>
        </tr>
        <tr>
            <td class="table_td_left">知识管理</td>
             <td></td>
            <td class="table_td_right"><a id="btnProcess3" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'" >操作更多</a></td>
        </tr>
        <tr>
            <td class="table_td_left">通用指标管理</td>
             <td></td>
            <td class="table_td_right"><a id="btnProcess4" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'" >操作更多</a></td>
        </tr>
        <tr>
            <td class="table_td_left" >行业指标管理</td>
             <td></td>
            <td class="table_td_right"><a id="btnProcess5" href="javascript:void(0);" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'" >操作更多</a></td>
        </tr>
    </table>
    </div>
    </div>
</asp:Content>


