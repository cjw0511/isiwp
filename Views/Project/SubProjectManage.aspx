<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectManage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/SubProjectManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.project.SubProjectManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west', split:true, minWidth: 550, maxWidth: 830" style="width: 570px;
            border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px;">
            <div id="panel">
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north', border: false">
                        <div class="datagrid-toolbar">
                            &nbsp;&nbsp;实施状态：<select id="selProgressKey1" style="width: 120px;"></select>
                            &nbsp;&nbsp;子项目名称：<input style="width: 150px;" type="text" id="txtName1" />
                            <br />
                            &nbsp;&nbsp;所处阶段：<select id="selStageType1" style="width: 120px;"></select>
                            &nbsp;&nbsp; 父项目名称：<select id="selProjectKey1" style="width: 150px;"></select>
                            <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">
                                查询</a> <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">
                                    清空</a>
                        </div>
                    </div>
                    <div data-options="region: 'center', border: false">
                        <table id="Grid">
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div data-options="region:'center'" style="border-top-width: 0px; border-bottom-width: 0px;">
            <div class="easyui-panel" data-options="title: '投标信息基本资料',fit:true,border:false">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'north', border: false" style="overflow: hidden;">
                    </div>
                    <div data-options="region:'center',border: false">
                        <div class="div_center">
                            <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                                <legend class="panel-title">子项目项目组成员：</legend>
                                <table class="tablecss" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="table_td_left">
                                            子项目名称：
                                        </td>
                                        <td colspan="3">
                                            <input type="text" name="Name" disabled="disabled" style="width: 620px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            编号：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="Code" disabled="disabled" />
                                        </td>
                                        <td class="table_td_left">
                                            所属父项目：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="ProjectKey" disabled="disabled" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            计划启动时间：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="StartDate" disabled="disabled" />
                                        </td>
                                        <td class="table_td_left">
                                            计划结束时间：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="StopDate" disabled="disabled" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            实际启动时间：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="RealStartDate" disabled="disabled" />
                                        </td>
                                        <td class="table_td_left">
                                            实际结束时间：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="RealStopDate" disabled="disabled" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            实施状态：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="ProgressKey" disabled="disabled" />
                                        </td>
                                         <td class="table_td_left">
                                            项目类型：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="TypeKey" disabled="disabled" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            子项目内容描述：
                                        </td>
                                        <td colspan="3">
                                            <input type="text" name="Name" disabled="disabled" style="width: 620px;" />
                                        </td>
                                    </tr>
                                </table>
                            </fieldset>
                        </div>
                        <div class="div_center">
                            <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                                <legend class="panel-title">子项目项目组成员：</legend>
                                <table class="tablecss" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="table_td_left">
                                            测评组组长：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="Name" disabled="disabled" />
                                        </td>
                                        <td class="table_td_left">
                                            测评组副组长：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="Name" disabled="disabled" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            管理测评组：
                                        </td>
                                        <td colspan="3">
                                            <input type="text" name="Name" disabled="disabled" style="width: 620px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            技术测评组：
                                        </td>
                                        <td colspan="3">
                                            <input type="text" name="Name" disabled="disabled" style="width: 620px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            测评评审组：
                                        </td>
                                        <td colspan="3">
                                            <input type="text" name="Name" disabled="disabled" style="width: 620px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            质量监督员：
                                        </td>
                                        <td colspan="3">
                                            <input type="text" name="Name" disabled="disabled" style="width: 620px;" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">
                                            文案组：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="Name" disabled="disabled" />
                                        </td>
                                        <td class="table_td_left">
                                            商务组：
                                        </td>
                                        <td class="table_td_right">
                                            <input type="text" name="Name" disabled="disabled" />
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
