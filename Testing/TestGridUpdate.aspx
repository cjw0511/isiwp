<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="TestGridUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.TestGridUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Testing/TestGridUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.platform.EmployeeUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="_panel" class="easyui-tabs" fit="true" data-options="border:false, fit: true,enableConextMenu:false,defaultEnableRefresh:false">
   <div title="个人基本信息">
         <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">基本资料：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            职员姓名<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtName" />
                        </td>
                        <td class="table_td_left">
                            编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtCode" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            姓氏：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtLastName" />
                        </td>
                        <td class="table_td_left">
                            名：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtFirstName" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            曾用名：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtFormerName" />
                        </td>
                        <td></td>
                        <td rowspan="5" class="table_td_right">
                    <img id="imgPhoto" alt="" title="个人照片" src="../../Resources/Images/Platform/icons/user.ico" width="110px" height="110px" /><br />
                    <div style="margin-top: 10px; padding-left: 5px;">
                        <a id="btnUpload" class="easyui-splitbutton" href="javascript:void(0)" data-options="menu:'#mm2',plain:false">上传照片</a>
                        <div id="mm2" style="width: 130px;">
                            <div id="btnClear" data-options="iconCls:'icon-no'">删除照片</div>
                        </div>
                        <input id="upload" type="file" style="display: none" />
                    </div>
                </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            性别：
                        </td>
                        <td class="table_td_right">
                            <select id="selSex">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            出生日期：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtBirtyday" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            身份证号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtIDcard" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            关联用户：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtUser" /><input type="hidden" id="UserKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </fieldset>
        </div>
        <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">个人资料：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            国籍：
                        </td>
                        <td class="table_td_right">
                            <select id="selCountryKey">
                            </select>
                        </td>
                        <td class="table_td_left">
                            名族：
                        </td>
                        <td class="table_td_right">
                            <select id="selNationKey">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            籍贯省份：
                        </td>
                        <td class="table_td_right">
                            <select id="selProvinceKey">
                            </select>
                        </td>
                        <td class="table_td_left">
                            籍贯城市：
                        </td>
                        <td class="table_td_right">
                            <select id="selCityKey">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            邮政编码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtZipCode" />
                        </td>
                        <td class="table_td_left">
                            婚姻状况：
                        </td>
                        <td class="table_td_right">
                            <select id="selMartalStatusKey">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            政治面貌：
                        </td>
                        <td class="table_td_right">
                            <select id="selPoliticalStatusKey">
                            </select>
                        </td>
                        <td class="table_td_left">
                            政治面貌获得时间：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtPoliticalStatusDate" />
                        </td>
                    </tr>
                </table>
            </fieldset>
        </div>
        <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">联系资料：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            手机号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtPhone" />
                        </td>
                        <td class="table_td_left">
                            电话号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtTel" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            QQ号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtQQ" />
                        </td>
                        <td class="table_td_left">
                            MSN号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtMSN" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            电子邮箱：
                        </td>
                        <td colspan="3">
                            <input type="text" id="txtEmail" style="width: 620px;" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            联系地址：
                        </td>
                        <td colspan="3">
                            <input type="text" id="txtAddress" style="width: 620px;" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            家庭电话：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtHomeTel" />
                        </td>
                        <td class="table_td_left">
                            家庭地址邮编：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtHomeZipCode" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            家庭地址：
                        </td>
                        <td colspan="3">
                            <input type="text" id="txtHomeAddress" style="width: 620px;" />
                        </td>
                    </tr>
                </table>
            </fieldset>
        </div>
        <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">员工简介：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left" style="vertical-align: top">
                            员工简介：
                        </td>
                        <td>
                            <textarea id="txtSummary" style="overflow: auto; height: 60px; width: 620px;"></textarea>
                        </td>
                    </tr>
                </table>
            </fieldset>
        </div>
    </div>
    <div title="人事档案信息">
        <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">基本资料：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            职员姓名：
                        </td>
                        <td class="table_td_right">
                            <span id="labEmployeeName"></span>
                        </td>
                        <td class="table_td_left">
                            档案挂靠单位：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtArchiveUnitName" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            参加工作时间：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtWorkDate" />
                        </td>
                        <td class="table_td_left">
                            岗位编制类型：
                        </td>
                        <td class="table_td_right">
                            <select id="selPostType">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            岗位入编时间：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtPostEntryDate" />
                        </td>
                        <td class="table_td_left">
                            人事报道时间：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtPostReportDate" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            现任岗位：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtPostKey" />
                        </td>
                        <td class="table_td_left">
                            现任岗位入职时间：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtPostIntoDate" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            是否已聘任：
                        </td>
                        <td class="table_td_right">
                            <select id="IsEmployment" class="easyui-combobox" data-options="editable:false,panelHeight:'auto'">
                                <option value="1">是</option>
                                <option value="0">否</option>
                            </select>
                        </td>
                        <td class="table_td_left">
                            聘任时间：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtEmploymentDate" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            工资银行帐号：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtWageBankAccount" />
                        </td>
                        <td class="table_td_left">
                            工资银行开户行：
                        </td>
                        <td class="table_td_right">
                            <select id="selWageBankKey">
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
