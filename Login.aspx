<%@ Page Title="系统登录" Language="C#" MasterPageFile="~/Generic.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ISIWP.Platform.WebClient.Login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentFeatured" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentHead" runat="server">
    <link href="Resources/Styles/Platform/Login.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="Resources/Scripts/Platform/login.js"></script>
    <script type="text/javascript">
        $(function () {
            window.loginCodeId = "#txtLoginCode";
            window.passwordId = "#txtPassword";
            window.txtVerifyCodeId = "#txtVerifyCode";
            window.imgVerifyCodeId = "#imgVerifyCode";
            window.loginButtonId = "#loginButton";
            window.resetButtonId = "#resetButton";
            window.bindButtonEvent();
            window.refreshVerifyCode();
            $(window.loginCodeId).focus();
        });
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
<div style="height:100%;width:100%;position: absolute;">
    <img alt="" src="Resources/Images/Platform/blackground/bg_login.jpg" style="height:100%;width:100%;vertical-align:top;" />
</div>
<div style="height:100%;width:100%;position: relative;background:url('Resources/Images/Platform/blackground/login.png') no-repeat center;">
    <div style="position:absolute;left:50%;top:50%;margin-left:-290px; margin-top:-165px ">
        <div style="background:url('Resources/Images/Platform/blackground/triangle.png') no-repeat;color:#fff;font-size:20px;font-weight:bolder;padding-left:20px;">信息安全等级保护智能评估系统</div>
        <div style="height:210px;width:523px;padding:25px 20px 30px 20px;">
            <div style="float:left">
                <div style="height:110px;" class="divContain">
                    <table>
                        <tr>
                            <td class="tdHead">
                                公告信息
                            </td>
                            <td align="right" style="vertical-align:top">
                                <a href="http://www.jx-sz.net/news/GG/index.html" target="_blank" style="color:Gray;text-decoration:none;"><span>更多内容..</span></a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img alt="" src="Resources/Images/Platform/blackground/dh.gif" /><a href="http://www.jx-sz.net/news/GG/2010-9/7/20100907102949579.html" target="_blank"><span>江西省工业和信息化委员会信息安全协调处到我中心调研</span></a>
                            </td>
                            <td align="right" style="vertical-align:top">
                                <span>2010.09.07</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img alt="" src="Resources/Images/Platform/blackground/dh.gif" /><a href="http://www.jx-sz.net/news/GG/2009-11/17/20091117111613982.html" target="_blank"><span>庆贺2009年度江西省信息网络安全高级管理员实用技术培训工作顺利圆满完成</span></a>
                            </td>
                            <td align="right" style="vertical-align:top">
                                <span>2009.11.17</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div style="height:65px;margin-top:10px;" class="divContain">
                    <table>
                        <tr>
                            <td class="tdHead">
                                登录须知
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>如果您是第一次使用本系统, 请向主管部门索取您的用户名和密码</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div style="float:left;width:250px;">
                <div>
                <img alt="" src="Resources/Images/Platform/blackground/lock.png" />
                <img alt="" src="Resources/Images/Platform/blackground/userlogin.png" />
                </div>
                <div id="loginForm">
                    <table style="color:#4989A4;padding-left:15px;font-weight:bolder;" cellspacing="4px;">
                    <tr><td>用 户 名</td>
                        <td colspan="2"><input id="txtLoginCode" name="loginCode" class="easyui-validatebox" data-options="required:true,missingMessage:'请在此处输入您的登录名'" type="text" style="width: 150px;" maxlength="32" /></td></tr>
                    <tr><td>密 &emsp; 码</td>
                        <td colspan="2"><input id="txtPassword" name="password" class="easyui-validatebox" data-options="required:true,missingMessage:'请在此处输入您的登录密码'" type="password" style="width: 150px;" maxlength="32" /></td></tr>
                    <tr><td>验 证 码</td>
                        <td><img id="imgVerifyCode" title="输入的值不区分大小写；如果看不清楚？点击此处刷新..." alt="verifyImage" src="" class="verifyImage" /></td>
                        <td><input id="txtVerifyCode" name="verifyCode" class="easyui-validatebox" data-options="required:true,missingMessage:'请在此处输入左边显示的图片字符作为验证码，输入的值不区分大小写'" type="text" style="width: 70px;" maxlength="6" /></td>
                        </tr>
                    </table>
                </div>
                <div style="padding:15px;text-align:center">
                    <a id="loginButton" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" href="javascript:void(0);" title="点击此按钮验证您输入的用户名、密码和验证码并进行登录操作">登陆</a>
                    <a id="resetButton" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" href="javascript:void(0);" title="点击此按钮将用户名、密码和验证码输入框值清空并刷新验证码">重置</a>
                </div>
            </div>
        </div>
        <div style="color:#fff;padding-left:5px;">本产品使用权归：江西科益高新技术有限公司</div>
    </div>
</div>
</asp:Content>
