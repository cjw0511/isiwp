<%@ Page Language="C#"  MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="BiddingUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.BiddingUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/biddinglib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/BiddingUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.business.BiddingUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="datagrid-toolbar"><a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a></div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">投标信息登记：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        投标信息名称<span class="required">*</span>：
                    </td>
                    <td colspan="3">
                        <input type="text" id="txtName" name="Name" style="width: 620px;" maxlength="50" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        编码：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtCode" name="Code" />
                    </td>
                    <td class="table_td_left">
                        对应计划项目：
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
                </tr>
                <tr>
                    <td class="table_td_left">
                        投标时间：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtBiddingDate" name="BiddingDate" />
                    </td>
                     <td class="table_td_left">
                        投标负责人：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input id="txtEmployee" /><input type="hidden" id="EmployeeKey" name="EmployeeKey" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        投标状态：
                    </td>
                    <td class="table_td_right">
                        <select id="selBiddingStatus" name="BiddingStatus">
                        </select>
                    </td>
                    <td class="table_td_left">
                        投标金额：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtBiddingTotal" name="BiddingTotal" />
                    </td>
                </tr>
                <tr>
                     <td class="table_td_left">
                        对应招标信息：
                    </td>
                    <td class="table_td_right">
                         <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input id="txtTenderInfo" /><input type="hidden" id="TenderKey" name="TenderKey" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>                       
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        投标地点：
                    </td>
                    <td colspan="3">
                        <input type="text" id="txtBiddingAddress" name="BiddingAddress" style="width: 620px;" maxlength="100" />
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
