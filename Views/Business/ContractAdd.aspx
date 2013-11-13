<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ContractAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.ContractAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/contractlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/ContractAdd.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.ContractAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<%--<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
<a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
</asp:Content>--%>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">



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
                        <td class="table_td_right" colspan="3">
                            <input type="text" id="txtName" name="Name" style="width:620px;" maxlength="50" />
                        </td>
                    </tr>

                    <tr>
                        <td class="table_td_left">
                            编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtCode" name="Code" maxlength="50" />
                        </td>
                        <%--<td class="table_td_left">
                            关联客户<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtCustomer4" /><input type="hidden" id="CustomerKey4" name="CustomerKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>--%>
                        <td class="table_td_left">
                            关联投标<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtBidding4" /><input type="hidden" id="BiddingKey4" name="BiddingKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="j_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <%--<tr>
                        

                        <td class="table_td_left">
                            关联计划项目<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtPlanProject4" /><input type="hidden" id="PlanProjectKey4" name="PlanProjectKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="b_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="table_td_left">
                            关联投标<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtBidding4" /><input type="hidden" id="BiddingKey4" name="BiddingKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="j_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>


                    </tr>--%>


                    <tr>
                        <td class="table_td_left">
                            我方负责人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtEmployee4" /><input type="hidden" id="EmployeeKey4" name="EmployeeKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="d_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="table_td_left">
                            入档编号：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtIntoFileCode" name="IntoFileCode" maxlength="50" />
                        </td>
                    </tr>


                    <tr>
                        <td class="table_td_left">
                            入档时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtIntoFileDate" name="IntoFileDate" />
                        </td>
                        <td class="table_td_left">
                            合同类型<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selContractType" name="ContractType">
                            
                            </select>
                        </td>
                    </tr>



                    <tr>
                        <td class="table_td_left">
                            合同原件数量<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtContractSum" name="ContractSum" />
                        </td>
                        <td class="table_td_left">
                            撰写人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">

                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtWriter" /><input type="hidden" id="WritersKey" name="WritersKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="e_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <%--<input type="text" id="txtWritersKey" name="WritersKey" />--%>
                        </td>
                    </tr>


                     <tr>
                        <td class="table_td_left">
                            签订人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtSigner" /><input type="hidden" id="SignKey" name="SignKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="f_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <%--<input type="text" id="txtSignKey" name="SignKey" />--%>
                        </td>
                        <td class="table_td_left">
                            签订时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtSignDate" name="SignDate" />
                        </td>
                    </tr>



                    <tr>
                        <td class="table_td_left">
                            签订金额<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtSignTotal" name="SignTotal" />
                        </td>
                        <td class="table_td_left">
                            合同移交人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtTransfer" /><input type="hidden" id="TransferKey" name="TransferKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="g_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td class="table_td_left">
                            合同接收人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtReceive" /><input type="hidden" id="ReceiveKey" name="ReceiveKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="h_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="table_td_left">
                            审核人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtAudit" /><input type="hidden" id="AuditKey" name="AuditKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="i_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <%--<input type="text" id="txtAuditKey" name="AuditKey" />--%>
                        </td>
                    </tr>
                    

                    <tr>
                        <td class="table_td_left">
                           合同生效日期<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStartDate" name="StartDate" />
                        </td>
                        <td class="table_td_left">
                            合同有效期<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtOffDate" name="OffDate" />
                        </td>
                    </tr>


                    <tr>
                        
                        <td class="table_td_left">
                           合同是否有效<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selIsValid" name="IsValid"></select>
                        </td>
                        <td class="table_td_left">
                           合同是否存档<span class="required">*</span>：
                        </td>
                        <td class="table_td_right" colspan="3">
                            <select id="selIsArchive" name="IsArchive"></select>
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
                            <textarea id="txtSummary" name="Summary" rows="4"></textarea>
                        </td>

                    </tr>
                    <tr></tr>
                    <tr>
                        <td class="table_td_left" style="vertical-align: top">
                            合同信息简介：
                        </td>
                        <td class="table_td_right">
                            <textarea id="txtRemark" name="Remark" rows="4"></textarea>
                        </td>


                    </tr>
                    
                    

                </table>
            </fieldset>
        </div>
    <%--</div>
    
</div>--%>


</asp:Content>
