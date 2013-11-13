<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="EmployeeUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.EmployeeUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/EmployeeUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.platform.EmployeeUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="_panel" class="easyui-tabs" data-options="border:false, fit: true,enableConextMenu:false,defaultEnableRefresh:false">
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
                            <input type="text" id="txtName" name="Name" maxlength="50" />
                        </td>
                        <td class="table_td_left">
                            编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtCode" name="Code" maxlength="20" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            姓氏：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtLastName" name="LastName" maxlength="20" />
                        </td>
                        <td class="table_td_left">
                            名：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtFirstName" name="FirstName" maxlength="20" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            曾用名：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtFormerName" name="FormerName" maxlength="50" />
                        </td>
                        <td></td>
                        <td rowspan="5" class="table_td_right">
                        <img id="imgPhoto" alt="" title="个人照片" src="" width="100px" height="120px" /><br />
                        <div style="margin-top: 10px;">
                            <a id="btnUpload" class="easyui-splitbutton" href="javascript:void(0)" data-options="menu:'#mm2',plain:false">上传照片</a>
                            <div id="mm2" style="width: 130px;">
                                <div id="btnClear" onclick="javascript:window.platform.EmployeeUpdate_aspx.deletePhoto();" data-options="iconCls:'icon-no'">删除照片</div>
                            </div>
                        </div>
                </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            性别：
                        </td>
                        <td class="table_td_right">
                            <select id="selSex" name="SexKey">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            出生日期<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtBirtyday" name="Birtyday" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            身份证号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtIDcard" name="IDcard" maxlength="18" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            关联用户<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtUser" name="UserName" /><input type="hidden" id="UserKey" name="UserKey" />&nbsp;
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
                            国籍<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selCountryKey" name="AreaKey" >
                            </select>
                        </td>
                        <td class="table_td_left">
                            民族<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selNationKey" name="NationKey" >
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            籍贯省份<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selProvinceKey" name="ProvinceKey">
                            </select>
                        </td>
                        <td class="table_td_left">
                            籍贯城市<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selCityKey" name="CityKey">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            邮政编码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtZipCode" name="ZipCode" maxlength="6" />
                        </td>
                        <td class="table_td_left">
                            婚姻状况：
                        </td>
                        <td class="table_td_right">
                            <select id="selMartalStatusKey" name="MartalStatusKey">
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            政治面貌：
                        </td>
                        <td class="table_td_right">
                            <select id="selPoliticalStatusKey" name="PoliticalStatusKey">
                            </select>
                        </td>
                        <td class="table_td_left">
                            政治面貌获得时间：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtPoliticalStatusDate" name="PoliticalStatusDate" />
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
                            <input type="text" id="txtPhone" name="Phone" maxlength="11" />
                        </td>
                        <td class="table_td_left">
                            电话号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtTel" name="Tel" maxlength="20" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            QQ号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtQQ" name="QQ" maxlength="20" />
                        </td>
                        <td class="table_td_left">
                            MSN号码：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtMSN" name="MSN" maxlength="50" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            电子邮箱：
                        </td>
                        <td colspan="3">
                            <input type="text" id="txtEmail" name="Email" style="width: 620px;" maxlength="50" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            联系地址：
                        </td>
                        <td colspan="3">
                            <input type="text" id="txtAddress" name="Address" style="width: 620px;" maxlength="100" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            家庭电话：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtHomeTel" name="HomeTel" maxlength="20" />
                        </td>
                        <td class="table_td_left">
                            家庭地址邮编：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtHomeZipCode" name="HomeZipCode" maxlength="6" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            家庭地址：
                        </td>
                        <td colspan="3">
                            <input type="text" id="txtHomeAddress" name="HomeAddress" style="width: 620px;" maxlength="100" />
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
                            <textarea id="txtSummary" name="Summary" rows="4" maxlength="500" ></textarea>
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
                            <span id="labEmployeeName" name="Name"></span>
                        </td>
                        <td class="table_td_left">
                            档案挂靠单位：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtArchiveUnitName" name="ArchiveUnitName" maxlength="100" />
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
                            <select id="selPostType" name="PostType">
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
                                <option value="0">否</option>
                                <option value="1">是</option>
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
                            <input type="text" id="txtWageBankAccount" name="WageBankAccount" maxlength="20" />
                        </td>
                        <td class="table_td_left">
                            工资银行开户行：
                        </td>
                        <td class="table_td_right">
                            <select id="selWageBankKey" name="WageBankKey">
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