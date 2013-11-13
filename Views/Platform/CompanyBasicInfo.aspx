<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="CompanyBasicInfo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.CompanyBasicInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/companylib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/CompanyBasicInfo.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.CompanyBasicInfo_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
    <a id="btnRefresh" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">单位基本信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
            <tr><td class="table_td_left">企业代码：</td><td class="table_td_right"><input type="text" id="txtCompCode" name="CompCode" maxlength="50" /></td>
                <td class="table_td_left">组织机构代码：</td><td class="table_td_right"><input type="text" id="txtOrgCode" name="OrgCode" maxlength="30" /></td></tr>
            <tr><td class="table_td_left">企业名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtCompName" name="CompName" maxlength="100" /></td>
                <td class="table_td_left">企业简称：</td><td class="table_td_right"><input type="text" id="txtShortName" name="ShortName" maxlength="50" /></td></tr>
            <tr><td class="table_td_left">企业名称英文：</td><td class="table_td_right"><input type="text" id="txtCompEngName" name="CompEngName" maxlength="200" /></td>
                <td class="table_td_left">法人信息：</td><td class="table_td_right"><input id="txtLegalPerson" /></td></tr>
            <tr><td class="table_td_left">企业注册经营地址：</td><td class="table_td_right"><input type="text" id="txtRegAddr" name="RegAddr" maxlength="100" /></td>
                <td class="table_td_left">企业注册地址邮编：</td><td class="table_td_right"><input type="text" id="txtRegAddrZipCode" name="RegAddrZipCode" maxlength="6" /></td></tr>
            <tr><td class="table_td_left">企业经营地址：</td><td class="table_td_right"><input type="text" id="txtAddress" name="Address" maxlength="100" /></td>
                <td class="table_td_left">企业经营地址邮编：</td><td class="table_td_right"><input type="text" id="txtZipCode" name="ZipCode" maxlength="6" /></td></tr>
            <tr><td class="table_td_left">电子邮件：</td><td class="table_td_right"><input type="text" id="txtEmail" name="Email" maxlength="50" /></td>
                <td class="table_td_left">联系电话：</td><td class="table_td_right"><input type="text" id="txtTel" name="Tel" maxlength="20" /></td></tr>
            <tr><td class="table_td_left">营业执照注册号：</td><td class="table_td_right"><input type="text" id="txtBusiCretifCode" name="BusiCretifCode" maxlength="30" /></td>
                <td class="table_td_left">营业执照有效期：</td><td class="table_td_right"><input type="text" id="txtBusiCretifValidity" name="BusiCretifValidity" /></td></tr>
            <tr><td class="table_td_left">税务登记号：</td><td class="table_td_right"><input type="text" id="txtTaxCode" name="TaxCode" maxlength="30" /></td>
                <td class="table_td_left">企业登记注册类型：</td><td class="table_td_right">
                <select id="selEconomicType" name="EconomicType" ></select></td></tr>
            <tr><td class="table_td_left">职工总人数：</td><td class="table_td_right"><input type="text" id="txtEmpCounts" name="EmpCounts" maxlength="6" /></td>
                <td class="table_td_left">技术人员人数：</td><td class="table_td_right"><input type="text" id="txtTechEmpCounts" name="TechEmpCounts" maxlength="6" /></td></tr>
            <tr><td class="table_td_left">企业总资产：</td><td class="table_td_right"><input type="text" id="txtAssetsTotal" name="AssetsTotal" maxlength="10" /></td>
                <td class="table_td_left">固定资产净值：</td><td class="table_td_right"><input type="text" id="txtFixedAssetsTotal" name="FixedAssetsTotal" maxlength="10" /></td></tr>
            <tr><td class="table_td_left">资产负债率：</td><td colspan="3"><input type="text" id="txtDebtAssetRatio" name="DebtAssetRatio" maxlength="10" /></td></tr>
        </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">企业简介：</legend>
       <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="table_td_left"  style="vertical-align:top">企业简介：</td>
        <td><textarea id="txtSummary" name="Summary" cols="1" rows="4" maxlength="1000"></textarea></td></tr>       
        </table>
        </fieldset>
    </div>
</asp:Content>

