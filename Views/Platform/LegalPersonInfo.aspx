<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="LegalPersonInfo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.LegalPersonInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/companylib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/LegalPersonInfo.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.LegalPersonInfo_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">法人信息：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
            <tr><td class="table_td_left">法人机构名称<span class="required">*</span>：</td><td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="100" /></td>
                <td class="table_td_left">法人机构简称：</td><td class="table_td_right"><input type="text" id="txtShortName" name="ShortName" maxlength="50" /></td></tr>
            <tr><td class="table_td_left">法人代码：</td><td class="table_td_right"><input type="text" id="txtCode" name="Code" maxlength="30" /></td>
                <td class="table_td_left">法人类型：</td><td class="table_td_right">
                <select id="selLegalPersonType" name="LegalPersonType" ></select></td></tr>
            <tr><td class="table_td_left">登记号：</td><td class="table_td_right"><input type="text" id="txtRegisterCode" name="RegisterCode"  maxlength="30" /></td>
                <td class="table_td_left">颁发单位：</td><td class="table_td_right"><input type="text" id="txtIssuedOrgan" name="IssuedOrgan" maxlength="50" /></td></tr>
            <tr><td class="table_td_left">法人代表：</td><td class="table_td_right"><input id="txtLegalRepInfo" /></td>
                <td class="table_td_left">有效期限：</td><td class="table_td_right"><input id="txtValidityBegin" name="ValidityBegin" style="width:93px" /> 至 <input id="txtValidityEnd" name="ValidityEnd" style="width:93px" /></td></tr>
            <tr><td class="table_td_left">法人机构地址：</td><td colspan="3"><input type="text" id="txtAddress" name="Address" style="width:620px;" maxlength="100" /></td></tr>
        </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">法人简介：</legend>
       <table class="tablecss" cellpadding="0" cellspacing="0">
         <tr><td class="table_td_left" style="vertical-align:top">法人简介：</td>
            <td><textarea id="txtSummary" name="Summary" style="overflow:auto;height:60px;width:620px;" maxlength="500" ></textarea></td></tr>
        </table>
        </fieldset>
    </div>
</asp:Content>

