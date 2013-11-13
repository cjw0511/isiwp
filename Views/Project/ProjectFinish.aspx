<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ProjectFinish.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.ProjectFinish" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Libs/employeelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
<%--<script src="Resources/Scripts/Business/Libs/customerlib.js" type="text/javascript"></script>--%>
<script src="Resources/Scripts/Business/Libs/planprojectlib.js" type="text/javascript"></script>  
<script src="Resources/Scripts/Project/Views/ProjectFinishList.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Views/ProjectFinish.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.project.ProjectFinish_aspx.initPage(ajaxContainerSelector, key);
    });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <fieldset id="projectfd" class="datebox-button" style="padding: 8px; margin: 10px;
        height: auto; text-align: left;">
        <legend class="panel-title">项目基本资料：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
            <%--<tr>
                <td class="table_td_left">
                    项目名称<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtName" name="Name" />
                </td>
                <td class="table_td_left">
                    项目编号<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtCode" name="Code" />
                </td>
            </tr>
            <tr>
                <td class="table_td_left">
                    所属计划项目<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding-top: 4px;">
                                <input type="text" id="txtPlanProj" name="PlanProj" /><input type="hidden"
                                    id="PlanProjKey" name="PlanProjKey" value="-1" />&nbsp;
                            </td>
                            <td>
                                <a href="javascript:void(0)" class="easyui-linkbutton" id="a1" data-options="iconCls:'icon-undo',plain:true">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="table_td_left">
                    所属客户<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding-top: 4px;">
                                <input type="text" id="txtCustomer" name="Customer" /><input type="hidden" id="CustomerKey"
                                    name="CustomerKey" value="-1" />&nbsp;
                            </td>
                            <td>
                                <a href="javascript:void(0)" class="easyui-linkbutton" id="a2" data-options="iconCls:'icon-undo',plain:true">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="table_td_left">
                    技术负责人<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding-top: 4px;">
                                <input type="text" id="txtTechMgr" name="TechMgr" /><input type="hidden" id="TechMgrKey"
                                    name="TechMgrKey" value="-1" />&nbsp;
                            </td>
                            <td>
                                <a href="javascript:void(0)" class="easyui-linkbutton" id="a4" data-options="iconCls:'icon-undo',plain:true">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="table_td_left">
                    商务负责人<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding-top: 4px;">
                                <input type="text" id="txtBusiMgr" name="BusiMgr" /><input type="hidden" id="BusiMgrKey"
                                    name="BusiMgrKey" value="-1" />&nbsp;
                            </td>
                            <td>
                                <a href="javascript:void(0)" class="easyui-linkbutton" id="a5" data-options="iconCls:'icon-undo',plain:true">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="table_td_left">
                    项目经理<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="padding-top: 4px;">
                                <input type="text" id="txtManager" name="Manager" /><input type="hidden" id="ManagerKey"
                                    name="ManagerKey" value="-1" />&nbsp;
                            </td>
                            <td>
                                <a href="javascript:void(0)" class="easyui-linkbutton" id="a6" data-options="iconCls:'icon-undo',plain:true">
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
                <td class="table_td_left">
                    客户负责人<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtCustomerMgr" name="CustomerMgr" />
                </td>
            </tr>
            <tr>
                <td class="table_td_left">
                    是否有效项目<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <input type="checkbox" id="ckIsApproval" name="IsApproval" value="1" />
                </td>
                <td class="table_td_left">
                    项目进度<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <select id="selProgressKey" name="ProgressKey">
                    </select>
                </td>
            </tr>
            <tr>
                <td class="table_td_left">
                    计划启动时间：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtStartDate" name="StartDate" />
                </td>
                <td class="table_td_left">
                    计划结束时间：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtStopDate" name="StopDate" />
                </td>
            </tr>
            <tr>
                <td class="table_td_left">
                    实际启动时间：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtRealStartDate" name="RealStartDate" />
                </td>
                <td class="table_td_left">
                    实际结束时间：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtRealStopDate" name="RealStopDate" />
                </td>
            </tr>
            <tr>
                <td height="60" class="table_td_left">
                    项目描述：
                </td>
                <td class="table_td_right" colspan="4">
                    <textarea id="txtDescription" name="Description" rows="3" style="overflow: auto; width: 620px;"></textarea>
                </td>
            </tr>
            <tr>
                <td height="60" class="table_td_left">
                    备注信息：
                </td>
                <td class="table_td_right" colspan="4">
                    <textarea id="txtRemark" name="Remark" rows="3" style="overflow: auto; width: 620px;"></textarea>
                </td>
            </tr>--%>
            <tr>
                <td height="60" class="table_td_left">
                    结案说明：
                </td>
                <td class="table_td_right" colspan="4">
                    <textarea id="txtClosedDetail" name="ClosedDetail" rows="5" style="overflow: auto; width: 620px;" maxlength="500"></textarea>
                </td>
            </tr>
        </table>
    </fieldset>
</asp:Content>
