<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="DepartmentManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.DepartmentManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/partitionlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/departmentlib.js" type="text/javascript"></script> 
    <script src="Resources/Scripts/Platform/Views/DepartmentManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.DepartmentManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true, minWidth: 270, maxWidth: 430" style="width:270px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
            <div class="easyui-panel" data-options="title:'部门档案管理',fit:true,border:false" >
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north', border: false" style="overflow:hidden">
                    <div class="datagrid-toolbar" style="height:27px;line-height:26px;">
                        <span style="vertical-align:top">&nbsp;选择机构：</span>
                        <select id="selPartition" style="width: 175px;">
                        </select>
                    </div>
                    <div class="datagrid-toolbar" style="height:27px;">
                        <a id="a_add" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-create'">添加</a>
                        <a id="a_del" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'">删除</a>
                        <a id="a_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
                    </div>
                    </div>
                    <div data-options="region: 'center', border: false">
                        <ul id="Tree"></ul>
                    </div>
                </div>
            </div>
        </div>  
        <div data-options="region:'center'" style="width:270px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
            <div id="Tab" class="easyui-tabs" data-options="fit:true,border:false">
                <div title="添加部门" data-options="href:'Views/Platform/DepartmentAdd.aspx'"></div>
                <div title="修改部门"></div>    
            </div>
        </div>
    </div>
</asp:Content>