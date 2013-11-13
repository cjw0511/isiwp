<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="PersonalRecordInfo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.PersonalRecordInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/PersonalRecordInfo.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.PersonalRecordInfo_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="_panel" class="easyui-tabs" data-options="tabPosition:'left',fit:true,headerWidth:120,enableConextMenu:false,defaultEnableRefresh:false,border:false ">
        <div title="基本资料">
            <div class="datagrid-toolbar">
                <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
            </div>
            <div class="div_center">
                <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                    <legend class="panel-title">基本资料：</legend>
                    <table class="tablecss" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="table_td_left">
                                职员姓名：
                            </td>
                            <td class="table_td_right">
                                <span id="labEmployeeName" name="Name"></span>
                            </td>
                            <td class="table_td_left">
                                档案挂靠单位：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtArchiveUnitName" name="ArchiveUnitName" maxlength="50" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                参加工作时间：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtWorkDate" name="WorkDate" />
                            </td>
                            <td class="table_td_left">
                                岗位编制类型：
                            </td>
                            <td class="table_td_right">
                                <select id="selPostType" name="PostType" >
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                岗位入编时间：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtPostEntryDate" name="PostEntryDate" />
                            </td>
                            <td class="table_td_left">
                                人事报道时间：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtPostReportDate" name="PostReportDate" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                现任岗位：
                            </td>
                            <td class="table_td_right">
                                <select id="selPostKey" name="PostKey" >
                                </select>
                            </td>
                            <td class="table_td_left">
                                现任岗位入职时间：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtPostIntoDate" name="PostIntoDate" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                是否已聘任：
                            </td>
                            <td class="table_td_right">
                                <select id="IsEmployment" name="IsEmployment" class="easyui-combobox" data-options="editable:false,panelHeight:'auto'">
                                    <option value="1">是</option>
                                    <option value="0">否</option>
                                </select>
                            </td>
                            <td class="table_td_left">
                                聘任时间：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtEmploymentDate" name="EmploymentDate" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                工资银行帐号：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtWageBankAccount" name="WageBankAccount" maxlength="50" />
                            </td>
                            <td class="table_td_left">
                                工资银行开户行：
                            </td>
                            <td class="table_td_right">
                                <select id="selWageBankKey" name="WageBankKey" >
                                </select>
                            </td>
                        </tr>
                    </table>
                </fieldset>
            </div>
        </div>
        <div title="家庭成员">
            <table id="familyMemberGrid">
            </table>
        </div>
        <div title="学习及工作经历">
            <table id="experienceGrid">
            </table>
        </div>
        <div title="获得证书">
            <table id="certificateGrid">
            </table>
        </div>
    </div>
</asp:Content>
