<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="AccountSecurityInfo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.AccountSecurityInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <style type="text/css">
        .setok
        {
            font-size: 12px;
            font-weight: bold;
            color: Green;
        }
        .setno
        {
            font-size: 12px;
            font-weight: bold;
            color: Red;
        }
        .div_center_table_1
        {
            margin: 10px 10px 10px 30px;
        }
        .div_center_table_1 tr
        {
            height: 25px;
        }
        .div_center_table_2
        {
            margin: 15px 15px 15px 50px;
        }
    </style>
    <script src="Resources/Scripts/Platform/Libs/securityInfolib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/AccountSecurityInfo.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.AccountSecurityInfo_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="divCenter" style="overflow: auto;">
        <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">账户信息：</legend>
                <table class="div_center_table_1">
                    <tr>
                        <td style="width: 120px" rowspan="4">
                            <img id="ImagePhotoKey" alt="" title="个人照片" src="Resources/Styles/EasyuiIcons/user.ico"
                                width="110px" height="110px" />
                        </td>
                        <td style="width: 120px; text-align: right">
                            登录帐号：
                        </td>
                        <td>
                            <span id="labLoginCode"></span>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 120px; text-align: right">
                            用户名称：
                        </td>
                        <td>
                            <span id="labUserName"></span>
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 120px; text-align: right">
                            安全级别：
                        </td>
                        <td>
                            <img id="ImaSecurityLevel" alt="" title="安全级别" src="" width="80px" height="15px" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left: 60px;" colspan="2">
                            <a id="btnPasswordUpdate" class="easyui-linkbutton" href="javascript:void(0)">修改密码</a>
                        </td>
                    </tr>
                </table>
            </fieldset>
        </div>
        <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">密码保护方式：</legend>
                <table class="div_center_table_2">
                    <tr>
                        <td rowspan="3" style="width: 120px">
                            <img alt="" src="Resources/Styles/EasyuiIcons/IDcard.ico" width="60px" height="60px" />
                        </td>
                        <td>
                            <span id="spnIdCard"><span id="labIdCard"></span>设置身份证号码</span>
                        </td>
                    </tr>
                    <tr id="trIdCard">
                        <td>
                            <span class="gray">身份证号码：<span id="IdCard"></span></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a id="btnIDcardUpdate" class="easyui-linkbutton" href="javascript:void(0)">设置</a>
                            <a id="btnIDcardDelete" class="easyui-linkbutton" href="javascript:void(0)">删除</a>
                        </td>
                    </tr>
                </table>
                <table class="div_center_table_2">
                    <tr>
                        <td rowspan="3" style="width: 120px">
                            <img alt="" src="Resources/Styles/EasyuiIcons/email.ico" width="60px" height="60px" />
                        </td>
                        <td>
                            <span id="spnEmail"><span id="labEmail"></span>设置可用电子邮箱</span>
                        </td>
                    </tr>
                    <tr id="trEmail">
                        <td>
                            <span class="gray">电子邮箱：<span id="Email"></span></span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a id="btnEmailUpdate" class="easyui-linkbutton" href="javascript:void(0)">设置</a>
                            <a id="btnEmailDelete" class="easyui-linkbutton" href="javascript:void(0)">删除</a>
                        </td>
                    </tr>
                </table>
                <table class="div_center_table_2">
                    <tr>
                        <td rowspan="2" style="width: 120px">
                            <img alt="" src="Resources/Styles/EasyuiIcons/lock-doc.ico" width="60px" height="60px" />
                        </td>
                        <td>
                            <span id="spnQuestionProtect"><span id="labQuestionProtect"></span>设置密码保护问题</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a id="btnQuestionProtectUpdate" class="easyui-linkbutton" href="javascript:void(0)">
                                设置</a> <a id="btnQuestionProtectDelete" class="easyui-linkbutton" href="javascript:void(0)">
                                    删除</a>
                        </td>
                    </tr>
                </table>
            </fieldset>
        </div>
    </div>
</asp:Content>
