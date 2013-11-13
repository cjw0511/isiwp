<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="PersonalBaseInfo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.PersonalBaseInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/PersonalBaseInfo.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.PersonalBaseInfo_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
            <legend class="panel-title">基本资料：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">
                        职员姓名<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtName" name="Name" maxlength="15" />
                    </td>
                    <td class="table_td_left">
                        编号<span class="required">*</span>：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtCode" name="Code" maxlength="8" />
                    </td>
                    <td rowspan="5" class="table_td_right">
                        <img id="imgPhoto" alt="" title="个人照片" src="" width="100px"
                            height="120px" /><br />
                        <div style="margin-top: 10px; ">
                            <a id="btnUpload" class="easyui-splitbutton" href="javascript:void(0)" data-options="menu:'#mm2',plain:false">上传照片</a>
                            <div id="mm2" style="width: 130px;">
                                <div id="btnClear" onclick="javascript:window.platform.PersonalBaseInfo_aspx.deletePhoto();" data-options="iconCls:'icon-no'">删除照片</div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        姓氏：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtLastName" name="LastName" maxlength="15" />
                    </td>
                    <td class="table_td_left">
                        名：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtFirstName" name="FirstName" maxlength="15" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        曾用名：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtFormerName" name="FormerName" maxlength="15" />
                    </td>
                    <td class="table_td_left">
                        性别<span class="required">*</span>：
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
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        身份证号码：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtIDcard" name="IDcard" />
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
                            名族<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selNationKey" name="NationKey" >
                            </select>
                        </td>
                        <td class="table_td_right">
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
                            <select id="selCityKey" name="CityKey" >
                            </select>
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
                            婚姻状况<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selMartalStatusKey" name="MartalStatusKey" >
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            政治面貌<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selPoliticalStatusKey" name="PoliticalStatusKey" >
                            </select>
                        </td>
                        <td class="table_td_left">
                            政治面貌获得时间<span class="required">*</span>：
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
                        <input type="text" id="txtPhone" name="Phone" maxlength="20" />
                    </td>
                    <td class="table_td_left">
                        电话号码：
                    </td>
                    <td class="table_td_right">
                        <input type="text" id="txtTel" name="Tel" maxlength="20" />
                    </td>
                    <td class="table_td_right">
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
                        <input type="text" id="txtMSN" name="MSN" maxlength="20" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        电子邮箱：
                    </td>
                    <td colspan="3">
                        <input type="text" id="txtEmail" name="Email" style="width: 620px;" maxlength="20" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        联系地址：
                    </td>
                    <td colspan="3">
                        <input type="text" id="txtAddress" name="Address" style="width: 620px;" maxlength="50" />
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
                        <input type="text" id="txtHomeZipCode" name="HomeZipCode" maxlength="20" />
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        家庭地址：
                    </td>
                    <td colspan="3">
                        <input type="text" id="txtHomeAddress" name="HomeAddress" style="width: 620px;" maxlength="50" />
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
                        <textarea id="txtSummary" name="Summary" rows="4" cols="1" ></textarea>
                    </td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>