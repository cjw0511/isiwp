<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true"
    CodeBehind="UserAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.UserAdd" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/UserAdd.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.UserAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">用户信息：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        用户编号<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtUserCode" name="Code" maxlength="20" />
                    </td>
                    <td class="table_td_left">
                        自定义登录名：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtLoginCode" name="LoginCode" maxlength="30" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        用户名称<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtUserName" name="Name" maxlength="30" />
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">详细信息：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        所属用户组<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input id="txtUserGroup" /><input type="hidden" id="UserGroupKey" name="UserGroupKey" />&nbsp;
                                </td>
                                <td>
                                    <a id="clear_UserGroup" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td class="table_td_left">
                        所属角色<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input id="txtRole" /><input type="hidden" id="RoleKey" name="RoleKey" />&nbsp;
                                </td>
                                <td>
                                    <a id="clear_Role" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        所属部门<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input id="txtDepartment" /><input type="hidden" id="DepartmentKey" name="DepartmentKey" />&nbsp;
                                </td>
                                <td>
                                    <a id="clear_Department" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'">
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
            <legend class="panel-title">用户状态：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        用户状态：
                    </td>
                    <td class="table_td_right">
                        <select id="IsValid" name="IsValid" class="easyui-combobox">
                            <option value="1" selected="selected">有效</option>
                            <option value="0">无效</option>
                        </select>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
