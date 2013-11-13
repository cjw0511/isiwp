<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="WorkSpace.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.WorkSpace" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/workSpacelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/portletslib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/WorkSpace.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.WorkSpace_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="a_set" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-create'">设置</a>
    <a id="a_expand" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">展开</a>
    <a id="a_collapse" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">折叠</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="layout_portal" class="easyui-panel" data-options="fit:true,border:false"></div>
</asp:Content>