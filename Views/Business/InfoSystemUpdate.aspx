﻿<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="InfoSystemUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.InfoSystemUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/customerlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/infoSystemlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/InfoSystemUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.business.InfoSystemUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="datagrid-toolbar"><a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a></div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">信息系统信息：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        信息系统名称<span class="required">*</span>：
                    </td>
                    <td colspan="3">
                        <input type="text" id="txtName" name="Name" style="width: 620px;" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        简称：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtShortName" name="ShortName" />
                    </td>
                    <td class="table_td_left">
                        信息系统编码<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtCode" name="Code" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        所属客户：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input id="txtCustomer" /><input type="hidden" id="CustomerKey" name="CustomerKey" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                     <td class="table_td_left">
                        信息系统类型：
                    </td>
                    <td class="table_td_right">
                        <select id="selInfoSystemType" name="InfoSystemType">
                        </select>
                    </td>
                </tr>
                 <tr>
                    <td class="table_td_left">
                        业务信息等级：
                    </td>
                    <td class="table_td_right">
                        <select id="selBusiSafeLevel" name="BusiSafeLevel">
                        </select>
                    </td>
                     <td class="table_td_left">
                        系统服务等级：
                    </td>
                    <td class="table_td_right">
                        <select id="selSystemSafeLevel" name="SystemSafeLevel">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        等保级别：
                    </td> 
                    <td class="table_td_right">
                                               <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <select id="selProtectionLevel" name="ProtectionLevel" disabled="disabled"> </select>&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-help',plain:true"
                                    title="由业务信息等级与系统服务等级两者中取高所得">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="table_td_left">
                        客户方负责人：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtManager" name="Manager" />
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        用途描述：
                    </td>
                    <td colspan="3">
                        <input type="text" id="txtDescription" name="Description" style="width: 620px;" />
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">信息系统说明：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left" style="vertical-align: top">
                        其他说明：
                    </td>
                    <td>
                        <textarea rows="1" cols="1" id="txtSummary" name="Summary" style="overflow: auto;
                            height: 60px; width: 620px;"></textarea>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
