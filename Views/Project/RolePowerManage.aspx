<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="RolePowerManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.RolePowerManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Project/Common/projconverter.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Libs/projrolelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/RolePowerManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.project.RolePowerManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true, minWidth: 270, maxWidth: 430"  style="width:270px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;" >
            <div class="easyui-panel" data-options="title:'项目角色权限管理',fit:true,border:false" >
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
            <div class="easyui-panel" data-options="title:'角色基本资料',fit:true,border:false">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'north', border: false" style="overflow: hidden;">
                        <div class="datagrid-toolbar">
                            <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                            <a id="btnRefresh" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>  
                            <a id="btnDelete" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'">删除</a> 
                        </div>
                    </div>
                    <div data-options="region: 'center', border: false">
                        <div class="div_center">
                            <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                                <legend class="panel-title">项目角色信息：</legend>
                                <table class="tablecss" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="table_td_left">
                                            角色名称<span class="required">*</span>：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" id="txtName" name="Name" maxlength="32" />(限制：32字)
                                        </td>
                                        <td class="table_td_left">
                                            角色编码<span class="required">*</span>：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" id="txtCode" name="Code" maxlength="20" />(限制：20字符)
                                        </td>
                                    </tr>
                                </table>
                            </fieldset>
                        </div>
                        <div class="div_center">
                            <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                                <legend class="panel-title">角色简介：</legend>
                                <table class="tablecss" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="table_td_left" style="vertical-align: top">
                                            角色简介：
                                        </td>
                                        <td>
                                            <textarea rows="1" cols="1" id="txtRemark" name="Remark" style="overflow: auto; height: 60px;
                                                width: 620px;" maxlength="300"></textarea>(限制：300字)
                                        </td>
                                    </tr>
                                </table>
                            </fieldset>
                        </div>
                        <div class="div_center">
                            <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                                <legend class="panel-title">角色权限信息： 
                                </legend>
                                <table class="tablecss" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="table_td_left">
                                            权限简介：
                                        </td>
                                        <td class="table_td_right">
                                            <ul id="PowerTree"></ul>
                                        </td>
                                    </tr>
                                     <tr>
                                        <td class="table_td_left">
                                            <a id="setPower" class="easyui-linkbutton easyui-tooltip" data-options="iconCls:'icon-save',plain:true" title="进行设置此角色权限">保存 &nbsp;</a>
                                        </td>
                                        <td class="table_td_right">
                                        </td>
                                    </tr>
                                </table>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
</asp:Content>
