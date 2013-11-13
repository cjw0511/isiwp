<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ContactAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.ContactAdd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/contactlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/ContactAdd.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.ContactAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">基本资料：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        姓名<span class="required">*</span>：
                    </td>
                    <td colspan="3" class="table_td_right">
                        <input type="text" id="txtName" name="Name" maxlength="50" style="width:620px;" />
                    </td>
                    <%--<td class="table_td_left">
                        联系人编号<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtCode" name="Code" maxlength="50" />
                    </td>--%>
                </tr>
                <tr>
                    <td class="table_td_left">
                        性别<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <select id="selSex" name="SexKey">
                        </select>
                    </td>
                    <td class="table_td_left">
                        生日：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtBirthday" name="Birthday" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        关联客户：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input type="text" id="txtCustomerKey" name="Customer" /><input type="hidden" id="CustomerKey"
                                        name="CustomerKey" />&nbsp;
                                </td>
                                <td>
                                    <a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="table_td_left">
                        所在部门：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtDepartment" name="Department" maxlength="50" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        职位：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtPosition" name="Position" maxlength="50" />
                    </td>
                    <td class="table_td_left">
                        办公电话：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtTel" name="Tel" />
                    </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            手机号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtPhone" name="Phone" />
                        </td>
                        <td class="table_td_left">
                            电子邮箱：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtEmail" name="Email" />
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
                        QQ帐号：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtQQ" name="QQ" />
                    </td>
                    <td class="table_td_left">
                        MSN帐号：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtMSN" name="MSN" />
                    </td>
                </tr>
                <tr>
                        <td height="70" class="table_td_left">
                            备注信息：
                        </td>
                        <td class="table_td_right" colspan="4">
                            <textarea id="txtRemark" name="Remark" style="overflow: auto; height: 60px; width: 620px;"></textarea>
                        </td>
                    </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
