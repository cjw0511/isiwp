<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="DocumentManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.DocumentManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Common/officeHelp.js" type="text/javascript"></script>
<script src="Resources/Scripts/LoreLibs/Views/DocumentManage.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var tradeKey = '<%= this.Request["tradeKey"] %>';
        var tierKey = '<%= this.Request["tierKey"] %>';
        window.lorelibs.DocumentManage_aspx.initPage(ajaxContainerSelector, tradeKey, tierKey);

    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="easyui-layout" data-options="fit:true">
    <div data-options="region:'north',border:false">
        <div class="datagrid-toolbar" style="height:35px;">
            &nbsp;&nbsp;指标级别：<select id="selGrade" style="width: 175px;"></select>
            &nbsp;&nbsp;<a id="a_upload" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-export'">上传文档</a>
        </div>
    </div>
    <div data-options="region:'center',border:false">
        <table id="DocumentGrid">
        </table>
    </div>
</div>
</asp:Content>
