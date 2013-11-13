<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ProjectUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.ProjectUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">

<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/projectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/ProjectUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%=this.Request["key"] %>';
            
            window.project.ProjectUpdate_aspx.initPage(ajaxContainerSelector, key);

        });
    </script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="datagrid-toolbar">
                <%--<a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>--%>
                <a id="btnVerify" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">有效审核</a>
                <a id="btnForbidden" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">禁用</a>
                <a id="btnImpleVerify" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">实施审核</a>
                </div>
<div class="div_center">
                <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                    <legend class="panel-title">项目启动详情：</legend>
                    <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            项目名称<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtName1" name="Name" maxlength="32"/>
                        </td>
                        <td class="table_td_left">
                            项目编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtCode1" name="Code" maxlength="20"/>
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
                                        <input id="txtPlanProject9" /><input type="hidden" id="PlanProject9" name="PlanProjKey"  />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="b_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
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
                                        <input id="txtManager11" /><input type="hidden" id="Manager11" name="ManagerKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="c_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
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
                                        <input id="txtBusiMgr11" /><input type="hidden" id="BusiMgr11" name="BusiMgrKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="e_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        
                        <td class="table_td_left">
                            项目进度<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selProgress1" name="ProgressKey" disabled="disabled">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            计划启动时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStartDate1" name="StartDate" />
                        </td>
                        <td class="table_td_left">
                            计划结束时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStopDate1" name="StopDate" />
                        </td>
                    </tr>

                    <tr>
                        <td class="table_td_left">
                            审核状态：
                        </td>
                        <td class="table_td_right">
                            <select id="selIsApproval" name="IsApproval" disabled="disabled">
                                
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
                        <td colspan="3" style="padding-top:5px;"><textarea id="txtDescription" name="Description" rows="3" maxlength="500"></textarea></td>
                    </tr>
                </table>
                </fieldset>
            </div>
   


</asp:Content>
