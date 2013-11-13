<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="CustomerAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.CustomerAdd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/customerlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/CustomerAdd.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.CustomerAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">客户基本资料：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        客户名称<span class="required">*</span>：
                    </td>
                    <td colspan="3" class="table_td_right">
                        <input type="text" id="txtName" name="Name" maxlength="50" style="width:620px;" />
                    </td>
                    <%--<td class="table_td_left">
                        客户编号<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtCode" name="Code" maxlength="50" />
                    </td>--%>
                </tr>
                <tr>
                    <td class="table_td_left">
                        客户简称：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtShortName" name="ShortName" maxlength="50" />
                    </td>
                    <td class="table_td_left">
                        法人代表姓名：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtLegalRepName" name="LegalRepName" maxlength="50" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        行业类型：
                    </td>
                    <td class="table_td_right">
                        <select id="selIndustryType" name="IndustryType">
                        </select>
                    </td>
                    <td class="table_td_left">
                        安全责任部门：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtSecurityDepartment" name="SecurityDepartment" maxlength="50" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        客户类型：
                    </td>
                    <td class="table_td_right">
                        <select id="selCustomerType" name="CustomerType">
                        </select>
                    </td>
                    <td class="table_td_left">
                        联系电话：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtTel" name="Tel" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        邮政编码：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtZipCode" name="ZipCode" />
                    </td>
                    <td class="table_td_left">
                        联系地址：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtAddress" name="Address" maxlength="100" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        传真：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtFax" name="Fax" />
                    </td>
                    <td class="table_td_left">
                        电子邮箱：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtEmail" name="Email" />
                    </td>
                </tr>
                <tr>
                    <td height="60" class="table_td_left">
                        客户信息说明：
                    </td>
                    <td class="table_td_right" colspan="4">
                        <textarea id="txtSummary" name="Summary" rows="3" style="overflow: auto; width: 620px;" maxlength="500"></textarea>
                    </td>
                </tr>
                <tr>
                    <td height="60" class="table_td_left">
                        客户信息描述：
                    </td>
                    <td class="table_td_right" colspan="4">
                        <textarea id="txtDescription" name="Description" rows="3" style="overflow: auto; width: 620px;" maxlength="500"></textarea>
                    </td>
                </tr>
                <tr>
                    <td height="60" class="table_td_left">
                        备注信息：
                    </td>
                    <td class="table_td_right" colspan="4">
                        <textarea id="txtRemark" name="Remark" rows="3" style="overflow: auto; width: 620px;" maxlength="500"></textarea>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
