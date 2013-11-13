<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="TenderInfoAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.TenderInfoAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Libs/tenderInfolib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/TenderInfoAdd.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.TenderInfoAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">招标信息登记：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        招标项目名称<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtName" name="Name" maxlength="50" />
                    </td>
                    <td class="table_td_left">
                        对应计划项目<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                         <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input id="txtPlanProject" /><input type="hidden" id="PlanProjectKey" name="PlanProjectKey" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <%--<td class="table_td_left">
                        编号<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtCode" name="Code" maxlength="50" />
                    </td>--%>
                </tr>
                <tr>
                    <td class="table_td_left">
                        招标类型<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <select id="selTenderType" name="TenderType"></select>
                    </td>
                    <td class="table_td_left">
                        报名截止时间<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtOffDate" name="OffDate" />
                    </td>
                </tr>
                <tr>
                     <td class="table_td_left">
                        开标时间<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtBidOpenDate" name="BidOpenDate" />
                    </td>
                                        <td class="table_td_left">
                        招标金额：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtTenderTotal" name="TenderTotal" />
                    </td>

                </tr>
                <%--<tr>
                    <td class="table_td_left">
                        招标状态：
                    </td>
                    <td class="table_td_right">
                        <select id="selTenderStatus" name="TenderStatus">
                        </select>
                    </td>
                     <td class="table_td_left">
                        招标类型：
                    </td>
                    <td class="table_td_right">
                        <select id="selTenderType" name="TenderType">
                        </select>
                    </td>
                </tr>--%>
                <tr>
                    <td class="table_td_left">
                        招标部门：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtTenderCenter" name="TenderCenter" maxlength="50" />
                    </td>
                     <td class="table_td_left">
                        代理机构：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtProxyOran" name="ProxyOran" maxlength="50" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        招标联系人：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtContactName" name="ContactName" maxlength="50" />
                    </td>
                     <td class="table_td_left">
                        联系方式：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                     <input type="text" id="txtContactMode" name="ContactMode"/>&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton easyui-tooltip" data-options="iconCls:'icon-help',plain:true"
                                    title="可以填联系电话、邮箱或传真">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <%--<tr>
                    <td class="table_td_left">
                        附件：
                    </td>
                    <td class="table_td_right" colspan="4">
                        <input type="file" id="txtTenderKey" name="TenderKey" />
                    </td>
                </tr>--%>
                <tr>
                    <td class="table_td_left">
                        招标地点：
                    </td>
                    <td colspan="3">
                        <input type="text" id="txtTenderAddress" name="TenderAddress" style="width: 620px;" maxlength="100" />
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">招标内容说明：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left" style="vertical-align: top">
                        信息说明：
                    </td>
                    <td>
                        <textarea rows="1" cols="1" id="txtSummary" name="Summary" style="overflow: auto;
                            height: 60px; width: 620px;" maxlength="500"></textarea>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>

