<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ProjectPlanFileAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.ProjectPlanFileAdd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/projectPlanFilelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/ProjectPlanFileAdd.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.ProjectPlanFileAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">项目计划书基本资料：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        项目计划书名称<span class="required">*</span>：
                    </td>
                    <td class="table_td_right" colspan="3">
                        <input type="text" id="txtName" name="Name" style="width:620px;" maxlength="50" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        项目计划书编号<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtCode" name="Code" maxlength="50" />
                    </td>
                    <td class="table_td_left">
                        所属计划项目<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input type="text" id="txtPlanProjectKey" name="PlanProject" /><input type="hidden" id="PlanProjectKey" name="PlanProjectKey" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" id="a3" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        计划书负责人<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input type="text" id="txtEmployeeKey" name="Employee" /><input type="hidden" id="EmployeeKey" name="EmployeeKey" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" id="a1" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="table_td_left">
                        评审状态：
                    </td>
                    <td class="table_td_right">
                        <select id="selReviewStatus" name="ReviewStatusKey">
                        </select>
                    </td>
                    <%--<td class="table_td_left">
                        所属投标项目：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input type="text" id="txtBiddingKey" name="Bidding" /><input type="hidden" id="BiddingKey" name="BiddingKey" value="0" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" id="a2" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>--%>
                </tr>
                <%--<tr>
                    <td class="table_td_left">
                        评审状态：
                    </td>
                    <td class="table_td_right">
                        <select id="selReviewStatus" name="ReviewStatusKey">
                        </select>
                    </td>
                    <td class="table_td_left">
                        所属客户：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input type="text" id="txtCustomerKey" name="Customer" /><input type="hidden" id="CustomerKey" name="CustomerKey" value="0" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>--%>
                <%--<tr>
                    <td class="table_td_left">
                        附件：
                    </td>
                    <td class="table_td_right" colspan="4">
                        <input type="file" id="upProjectPlanFile" name="ProjectPlanFileKey" />
                    </td>
                </tr>--%>
                <tr>
                    <td height="60" class="table_td_left">
                        项目计划书说明：
                    </td>
                    <td class="table_td_right" colspan="4">
                        <textarea id="txtSummary" name="Summary" rows="3" style="overflow: auto; width: 613px;" maxlength="500"></textarea>
                    </td>
                </tr>
                <tr>
                    <td height="60" class="table_td_left">
                        备注信息：
                    </td>
                    <td class="table_td_right" colspan="4">
                        <textarea id="txtRemark" name="Remark" rows="3" style="overflow: auto; width: 613px;" maxlength="500"></textarea>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
