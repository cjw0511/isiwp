<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="UserBaseInfo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.UserBaseInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/UserBaseInfo.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.UserBaseInfo_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
            <legend class="panel-title">用户信息：</legend>
            <table class="tablecss">
                <tr>
                    <td class="table_td_left">
                        用户编号<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtUserCode" name="Code" maxlength="8" />
                    </td>
                    <td class="table_td_left">
                        自定义登录名：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtLoginCode" name="LoginCode" maxlength="15" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        用户名称<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtUserName" name="Name" maxlength="15" />
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
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
            <legend class="panel-title">详细信息：</legend>
            <table class="tablecss">
                <tr>
                    <td class="table_td_left">
                        所属用户组<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;">
                                    <input id="txtUserGroup" name="UserGroupName" /><input type="hidden" id="UserGroupKey" name="UserGroupKey" />&nbsp;
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
                                    <input id="txtRole" name="RoleName" /><input type="hidden" id="RoleKey" name="RoleKey" />&nbsp;
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
                                    <input id="txtDepartment" name="DepartmentName" /><input type="hidden" id="DepartmentKey" name="DepartmentKey" />&nbsp;
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
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
            <legend class="panel-title">用户状态：</legend>
            <table class="tablecss">
                <tr>
                    <td class="table_td_left">
                        用户状态：
                    </td>
                    <td class="table_td_right">
                        <select id="IsValid" name="IsValid" class="easyui-combobox" data-options="disabled:true">
                            <option value="1">有效</option>
                            <option value="0">无效</option>
                        </select>
                    </td>
                    <td class="table_td_left">
                        是否锁定：
                    </td>
                    <td class="table_td_right">
                        <select id="IsLocked" name="IsLocked" class="easyui-combobox" data-options="disabled:true">
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        <span class="gray">被锁定时间：</span>
                    </td>
                    <td class="table_td_right">
                        <span id="spnLockDate" class="gray"></span>
                    </td>
                    <td class="table_td_left">
                        <span class="gray">锁定操作人：</span>
                    </td>
                    <td class="table_td_right">
                        <span id="spnLockUser" name="" class="gray"></span>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>