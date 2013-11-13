<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="InfoSystemEvaluateRecordUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.InfoSystemEvaluateRecordUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/infoSystemlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/InfoSystemEvaluateRecordUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.business.InfoSystemEvaluateRecordUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">等级保护测评记录：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        信息系统名称<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input id="txtInfoSystem" /><input type="hidden" id="InfoSystemKey" name="InfoSystemKey" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>
                     </td>
                     <td class="table_td_left">
                        测评记录编号<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtCode" name="Code" maxlength="50" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        测评类型：
                    </td>
                    <td class="table_td_right">
                        <select id="selEvaluateType" name="EvaluateType">
                        </select>
                    </td>
                     <td class="table_td_left">
                        测评定级：
                    </td>
                    <td class="table_td_right">
                        <select id="selEvaluateLevel" name="EvaluateLevel">
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        测评时间：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtEvaluateDate" name="EvaluateDate" />
                    </td>
                     <td class="table_td_left">
                        测评机构名称：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtOrganization" name="Organization" maxlength="50" />
                    </td>
                    
                </tr>
            </table>
            <table class="tablecss" style="padding: 2px;" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left" style="vertical-align: top">
                        安全评估内容：
                    </td>
                    <td colspan="3">
                        <textarea rows="1" cols="1" id="txtEvaluateContent" name="EvaluateContent" style="overflow: auto;
                            height: 45px; width: 618px;" maxlength="500"></textarea>
                    </td>
                </tr>
            </table>
            <table class="tablecss" style="padding: 2px; height: auto; text-align: left;" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left" style="vertical-align: top">
                        建设整改内容：
                    </td>
                    <td colspan="3">
                        <textarea rows="1" cols="1" id="txtRectifContent" name="RectifContent" style="overflow: auto;
                            height: 45px; width: 618px;" maxlength="500"></textarea>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">安全评估说明：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left" style="vertical-align: top">
                        备案信息：
                    </td>
                    <td>
                        <textarea rows="1" cols="1" id="txtFiling" name="Filing" style="overflow: auto;
                            height: 60px; width: 620px;" maxlength="500"></textarea>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>

