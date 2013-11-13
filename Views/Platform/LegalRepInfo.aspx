<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="LegalRepInfo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.LegalRepInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/companylib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/LegalRepInfo.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.LegalRepInfo_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">法人代表信息：</legend>
    <table class="tablecss" cellpadding="0" cellspacing="0">
            <tr><td class="table_td_left">名称<span class="required">*</span>：</td><td class="table_td_right"><input  type="text" id="txtName" name="Name" /></td>
            <td class="table_td_left">职务：</td><td class="table_td_right"><input type="text" id="txtPost" name="Post" /></td></tr>
        <tr><td class="table_td_left">任免机构：</td><td colspan="3"><input type="text" id="txtAuthorizeOrgan" name="AuthorizeOrgan" style="width:620px;" /></td></tr>
        <tr><td class="table_td_left">证件类型：</td><td class="table_td_right">
            <select id="selCretifType" name="CretifType" ></select></td>
            <td class="table_td_left">证件号码：</td><td class="table_td_right"><input type="text" id="txtCretifCode" name="CretifCode" /></td></tr>
        <tr><td class="table_td_left">联系电话：</td><td class="table_td_right"><input type="text" id="txtTel" name="Tel" /></td>
            <td class="table_td_left">手机号码：</td><td class="table_td_right"><input type="text" id="txtPhone" name="Phone" /></td></tr>
        <tr><td class="table_td_left">电子邮箱：</td><td colspan="3"><input type="text" id="txtEmail" name="Email" style="width:620px;" /></td></tr>
        <tr><td class="table_td_left">联系地址：</td><td colspan="3"><input type="text" id="txtAddress" name="Address" style="width:620px;" /></td></tr>
        <tr><td class="table_td_left" style="vertical-align:baseline;padding-top:7px;">备注信息：</td><td colspan="3" style="padding-top:5px;">
            <textarea id="txtRemark" name="Remark" style="overflow:auto;height:60px;width:620px;" ></textarea>
            </td>
        </tr>
    </table>
    </fieldset>
</div>
</asp:Content>
