<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ContractUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.ContractUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Business/Libs/customerlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/planprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/contractlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/ContractUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%=this.Request["key"] %>';
            window.business.ContractUpdate_aspx.initPage(ajaxContainerSelector,key);
        });
    </script>
</asp:Content>
<%--<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
<a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
</asp:Content>--%>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">

<div class="datagrid-toolbar">
                <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存修改</a>
</div>


<%--<div id="_panel" class="easyui-tabs" data-options="border:false, fit: true,enableConextMenu:false,defaultEnableRefresh:false">
   <div title="合同信息">--%>
         <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">合同资料：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            合同名称<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtName1" name="Name" />
                        </td>
                        <td class="table_td_left">
                            编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtCode1" name="Code" />
                        </td>
                    </tr>

                    <tr>
                        <td class="table_td_left">
                            关联客户<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtCustomer1" /><input type="hidden" id="CustomerKey1" name="CustomerKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="table_td_left">
                            关联计划项目<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtPlanProject1" /><input type="hidden" id="PlanProjectKey1" name="PlanProjectKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="b_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <%--<td class="table_td_left">
                            关联投标<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtBidding" /><input type="hidden" id="BiddingKey" name="BiddingKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="c_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>--%>

                        <td class="table_td_left">
                            关联投标<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtBidding1" name="BiddingKey" />
                        </td>


                        <td class="table_td_left">
                            我方负责人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtEmployee1" /><input type="hidden" id="EmployeeKey1" name="EmployeeKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="d_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td class="table_td_left">
                            入档编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtIntoFileCode1" name="IntoFileCode" />
                        </td>
                        <td class="table_td_left">
                            入档时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtIntoFileDate1" name="IntoFileDate" />
                        </td>
                    </tr>


                    <tr>
                        <td class="table_td_left">
                            合同类型<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selContractType1" name="ContractType">
                            
                            </select>
                        </td>
                        <td class="table_td_left">
                            合同原件数量<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtContractSum1" name="ContractSum" />
                        </td>
                    </tr>



                    <tr>
                        <td class="table_td_left">
                            撰写人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">

                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtWriter1" /><input type="hidden" id="WritersKey1" name="WritersKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="e_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <%--<input type="text" id="txtWritersKey" name="WritersKey" />--%>
                        </td>
                        <td class="table_td_left">
                            签订人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtSigner1" /><input type="hidden" id="SignKey1" name="SignKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="f_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <%--<input type="text" id="txtSignKey" name="SignKey" />--%>
                        </td>
                    </tr>


                     <tr>
                        <td class="table_td_left">
                            签订时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtSignDate1" name="SignDate" />
                        </td>
                        <td class="table_td_left">
                            签订金额<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtSignTotal1" name="SignTotal" />
                        </td>
                    </tr>



                    <tr>
                        <td class="table_td_left">
                            合同移交人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtTransfer1" /><input type="hidden" id="TransferKey1" name="TransferKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="g_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="table_td_left">
                            合同接收人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtReceive1" /><input type="hidden" id="ReceiveKey1" name="ReceiveKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="h_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td class="table_td_left">
                            审核人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtAudit1" /><input type="hidden" id="AuditKey1" name="AuditKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="i_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <%--<input type="text" id="txtAuditKey" name="AuditKey" />--%>
                        </td>
                        <td class="table_td_left">
                           合同生效日期<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStartDate1" name="StartDate" />
                        </td>
                    </tr>
                    

                    <tr>
                        <td class="table_td_left">
                            合同有效期<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtOffDate1" name="OffDate" />
                        </td>
                        <td class="table_td_left">
                           合同是否有效<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selIsValid1" name="IsValid"></select>
                        </td>
                    </tr>


                    <tr>
                        
                        <td class="table_td_left">
                           合同是否存档<span class="required">*</span>：
                        </td>
                        <td class="table_td_right" colspan="3">
                            <select id="selIsArchive1" name="IsArchive"></select>
                        </td>
                    </tr>


                    




                </table>
            </fieldset>
        </div>
        
        


        






        <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">合同简介：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">

                    
                        
                    <tr>
                        <td class="table_td_left" style="vertical-align: top">
                            合同基本内容：
                        </td>
                        <td class="table_td_right">
                            <textarea id="txtSummary1" name="Summary" rows="4"></textarea>
                        </td>

                    </tr>
                    <tr></tr>
                    <tr>
                        <td class="table_td_left" style="vertical-align: top">
                            合同信息简介：
                        </td>
                        <td class="table_td_right">
                            <textarea id="txtRemark1" name="Remark" rows="4"></textarea>
                        </td>


                    </tr>
                    
                    

                </table>
            </fieldset>
        </div>
    <%--</div>
    
</div>--%>


</asp:Content>
