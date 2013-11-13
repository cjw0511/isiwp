<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ProjectAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.ProjectAdd1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">

<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Libs/projectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/ProjectAdd.js" type="text/javascript"></script>

    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.project.ProjectAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">


<div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">新项目信息填写：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            项目名称<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtName2" name="Name" maxlength="32" />
                        </td>
                        <td class="table_td_left">
                            项目编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtCode2" name="Code" maxlength="20" />
                        </td>
                    </tr>

                    <tr>
                        <td class="table_td_left">
                            跟进项目<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtPlanProject10" /><input type="hidden" id="PlanProject10" name="PlanProjKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="b2_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>

                        <td class="table_td_left">
                            项目经理<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtManager2" /><input type="hidden" id="Manager2" name="ManagerKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="c2_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            我方商务<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtBusiMgr2" /><input type="hidden" id="BusiMgr2" name="BusiMgrKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="e2_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>

                        <td class="table_td_left">
                            项目进度<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selProgress2" name="ProgressKey" disabled="disabled">
                            </select>
                        </td>

                    </tr>

                    <tr>
                        <td class="table_td_left">
                            计划启动时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStartDate2" name="StartDate" />
                        </td>
                        <td class="table_td_left">
                            计划结束时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStopDate2" name="StopDate" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            审核状态：
                        </td>
                        <td class="table_td_right">
                            <select id="selIsApproval2" name="IsApproval" disabled="disabled">   
                            </select>
                        </td>
                        <td class="table_td_left">

                        </td>
                        <td class="table_td_right">

                        </td>
                    </tr>

                    <tr>
                        <td class="table_td_left" style="vertical-align: top">
                            项目描述：
                        </td>
                        <td colspan="3" style="padding-top:5px;"><textarea id="txtDescription2" name="Description" rows="3" maxlength="500"></textarea></td>
                    </tr>
                </table>
            </fieldset>
        </div>

</asp:Content>
