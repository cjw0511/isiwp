<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="TradeNormManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.LoreLibs.TradeNormManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/LoreLibs/Libs/normlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/LoreLibs/Views/TradeNormManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.lorelibs.TradeNormManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true, minWidth: 270, maxWidth: 430"  style="width:270px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;" >
            <div class="easyui-panel" data-options="title:'层面管理',fit:true,border:false" >
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north', border: false" style="overflow:hidden">
                        <div class="datagrid-toolbar" style="height:27px;line-height:26px;">
                            <span style="vertical-align:top">&nbsp;选择行业：</span>
                            <select id="selTrade" style="width: 175px;">
                            </select>
                        </div>
                        <div class="datagrid-toolbar">
                            <a id="a_tradeManage" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-create'">行业管理</a>
                            <a id="a_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
                            <a id="a_upload" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-export'">默认文档上传</a>
                        </div>
                        <div class="datagrid-toolbar">
                            <a id="a_copy" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-repeat'">复制单元和要求项</a>
                        </div>
                    </div>
                    <div data-options="region: 'center', border: false">
                        <ul id="TierTree">         
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div data-options="region:'center'" style="width:270px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'west',split:true, minWidth: 270, maxWidth: 430"  style="width:270px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;" >
                    <div class="easyui-panel" data-options="title:'单元管理',fit:true,border:false" >
                        <div class="easyui-layout" data-options="border:false,fit:true">
                            <div data-options="region: 'north', border: false" style="overflow:hidden">
                                <div class="datagrid-toolbar" style="height:27px;line-height:26px;">
                                    <span style="vertical-align:top">&nbsp;选择级别：</span>
                                    <select id="selGrade" style="width: 175px;">
                                    </select>
                                </div>
                                <div class="datagrid-toolbar">
                                <a id="unit_add" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-create'">添加</a>
                                <a id="unit_update" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">编辑</a>
                                <a id="unit_del" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'">删除</a>
                                <a id="unit_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a><br />
                                <a id="unit_up" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-up'">上移</a>
                                <a id="unit_down" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-down'">下移</a>
                                </div>
                            </div>
                            <div data-options="region: 'center', border: false">
                                <ul id="UnitTree">         
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-options="region:'center'" style="width:270px;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
                    <table id="Grid"></table>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
