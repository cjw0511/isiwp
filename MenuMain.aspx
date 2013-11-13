<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="MenuMain.aspx.cs" Inherits="ISIWP.Platform.WebClient.MenuMain" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script type="text/javascript" src="Resources/Scripts/Platform/menuman.js"></script>
    <script type="text/javascript">
        $(function () {
            var key = window.parseInt("<%= this.Key %>", 10);
            if (key == 0) { $.plugin.messager.alert("操作提醒", "获取菜单 Key 值失败，如果重复出现此问题，请联系您的系统管理员。", "warning"); }
            window.platform.menumain.loadTreeData(key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a href="javascript:void(0)" onclick="javascript:window.platform.menumain.expandCurrent();" class="easyui-splitbutton" data-options="menu:'#menuMainTree_splitbuttonMenu',iconCls:'icon-add'">展开</a>
    <a href="javascript:void(0)" onclick="javascript:window.platform.menumain.addfavo();" class="easyui-linkbutton" data-options="iconCls:'icon-favo-add',plain: true">收藏</a>
    <a href="javascript:void(0)" onclick="javascript:window.platform.menumain.editMenuName();" class="easyui-linkbutton" data-options="iconCls:'icon-edit',plain: true">重命名</a>
    <div id="menuMainTree_splitbuttonMenu" class="easyui-menu" style="width:155px; display: none;">
		<div onclick="window.platform.menumain.collapseCurrent()" data-options="iconCls:'icon-remove'">折叠当前</div>
		<div class="menu-sep" />
        <div onclick="window.platform.menumain.expand()" data-options="iconCls:'icon-add'">展开当前及所有子节点</div>
        <div onclick="window.platform.menumain.collapse()" data-options="iconCls:'icon-remove'">折叠当前及所有子节点</div>
        <div class="menu-sep" />
		<div onclick="window.platform.menumain.expandAll()" data-options="iconCls:'icon-add'">展开所有节点</div>
		<div onclick="window.platform.menumain.collapseChildren()" data-options="iconCls:'icon-remove'">折叠所有节点</div>
        <div onclick="window.platform.menumain.unselect()" data-options="iconCls:'icon-remove'">取消选择</div>
	</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="menuMainTreeContainer" style="padding-top: 2px; padding-bottom: 2px;">
        <ul id="menuMainTree" />
    </div>
</asp:Content>
