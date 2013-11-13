<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="BusinessFollowAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.BusinessFollowAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Business/Views/BusinessFollowAdd.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        window.business.BusinessFollowAdd_aspx.initPage(ajaxContainerSelector);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">商务跟进记录：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr>
            <td class="table_td_left">客户单位<span class="required">*</span>：</td><td class="table_td_right"><select id="selCustomer" name="CustomerKey"></select></td>
            <td class="table_td_left">计划项目：</td><td class="table_td_right"><select id="selProject" name="ProjectKey"></select></td>
        </tr>
        <tr>
            <td class="table_td_left">接洽时间<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtContactDate" name="ContactDate" /></td>
            <td class="table_td_left">商务形式：</td><td class="table_td_right"><select id="selBusinessForms" name="BusinessForms"></select></td>
        </tr>
        <tr>
            <td class="table_td_left">客户接洽人员：</td><td class="table_td_right"><input type="text" id="txtContactMan" name="ContactMan" maxlength="50" /></td>
            <td class="table_td_left">所属部门：</td><td class="table_td_right"><input type="text" id="txtContactDept" name="ContactDept" maxlength="50" /></td>
        </tr>
        <tr>
            <td class="table_td_left">商务人员<span class="required">*</span>：</td><td class="table_td_right">
                <table cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding-top: 4px;"><input id="txtBusiEmployee" name="BusiEmployee" /><input type="hidden" id="BusiEmployeeKey" name="BusiEmployeeKey" />&nbsp;</td>
                        <td><a id="clear_BusiEmployee" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'"></a></td>
                    </tr>
                </table>
            </td>
            <td class="table_td_left">技术人员：</td><td class="table_td_right">
                <table cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="padding-top: 4px;"><input id="txtTechnicalEmployee" name="TechnicalEmployee" /><input type="hidden" id="TechnicalEmployeeKey" name="TechnicalEmployeeKey" value="0" />&nbsp;</td>
                        <td><a id="clear_TechnicalEmployee" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'"></a></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td class="table_td_left" style="vertical-align: top;padding-top:5px;">商务进度：</td>
            <td colspan="3" style="padding-top:5px;"><textarea id="txtBusinessProgress" class="easyui-ckeditor" name="BusinessProgress" rows="3" maxlength="500" ></textarea></td>
        </tr>
        <tr>
            <td class="table_td_left" style="vertical-align: top;padding-top:7px;">需求分析要素：</td>
            <td colspan="3" style="padding-top:7px;"><textarea id="txtRequire" name="Require" rows="3" maxlength="500" ></textarea></td>
        </tr>
        <tr>
            <td class="table_td_left" style="vertical-align: top;padding-top:7px;">推进难点：</td>
            <td colspan="3" style="padding-top:7px;"><textarea id="txtDifficulties" name="Difficulties" rows="3" maxlength="500" ></textarea></td>
        </tr>
        <tr>
            <td class="table_td_left" style="padding-top:5px;">竞争对手：</td>
            <td colspan="3" style="padding-top:5px;"><input type="text" id="txtCompetitors" name="Competitors" style="width: 620px;" maxlength="100" /></td>
        </tr>
        <tr>
            <td class="table_td_left" style="vertical-align: top;padding-top:5px;">竞争情况：</td>
            <td colspan="3" style="padding-top:5px;"><textarea id="txtCompetitiveConditions" name="CompetitiveConditions" rows="3" maxlength="500" ></textarea></td>
        </tr>
        </table>
    </fieldset>
</div>
</asp:Content>
