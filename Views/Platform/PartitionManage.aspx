<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="PartitionManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.PartitionManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/partitionlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/PartitionManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.PartitionManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true, minWidth: 270, maxWidth: 430"  style="width:270px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;" >
            <div class="easyui-panel" data-options="title:'机构档案管理',fit:true,border:false" >
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north', border: false" style="overflow:hidden">
                        <div class="datagrid-toolbar">
                        <a id="a_add" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-create'">添加</a>
                        <a id="a_del" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'">删除</a>
                        <a id="a_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
                        </div>
                    </div>
                    <div data-options="region: 'center', border: false">
                        <ul id="Tree">              
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div data-options="region:'center'" style="width:270px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
            <div id="Tab" class="easyui-tabs" data-options="fit:true,border:false">
                <div title="添加机构" data-options="href:'Views/Platform/PartitionAdd.aspx'"></div>
                <div title="修改机构"></div>
            </div>
        </div>
    </div>

</asp:Content>