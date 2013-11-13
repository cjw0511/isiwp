<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="TestToolLogin_6.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.TestToolLogin.TestToolLogin_6" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div style="height:100%;width:100%;position: absolute;">
    <img alt="" src="Resources/Images/Platform/blackground/bg_login.jpg" style="height:100%;width:100%;vertical-align:top;" />
</div>
<div style="height:100%;width:100%;position: relative;background:url('Resources/Images/Platform/blackground/login.png') no-repeat center;">
    <div style="position:absolute;left:50%;top:50%;margin-left:-290px; margin-top:-165px ">
        <div style="background:url('Resources/Images/Platform/blackground/triangle.png') no-repeat;color:#fff;font-size:20px;font-weight:bolder;padding-left:20px;">IBM Rational Appscan 8.0</div>
        <div style="height:210px;width:523px;padding:25px 20px 30px 20px;">
            <div style="float:left;width:250px;">
                <div>
                <img alt="" src="Resources/Images/Platform/blackground/lock.png" />
                <img alt="" src="Resources/Images/Platform/blackground/userlogin.png" />
                </div>
                <div id="loginForm">
                    <table style="color:#4989A4;padding-left:15px;font-weight:bolder;" cellspacing="5px;">
                    <tr><td>用 户 名</td>
                        <td colspan="2"><input id="txtLoginCode" name="loginCode" class="easyui-validatebox" data-options="required:true,missingMessage:'请在此处输入您的登录名'" type="text" style="width: 150px;" maxlength="32" /></td></tr>
                    <tr><td>密 &emsp; 码</td>
                        <td colspan="2"><input id="txtPassword" name="password" class="easyui-validatebox" data-options="required:true,missingMessage:'请在此处输入您的登录密码'" type="password" style="width: 150px;" maxlength="32" /></td></tr>
                    
                    </table>
                </div>
                <div style="padding:15px;text-align:center">
                    <a id="loginButton" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" href="javascript:void(0);" title="点击此按钮验证您输入的用户名、密码和验证码并进行登录操作">登陆</a>
                    <a id="resetButton" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" href="javascript:void(0);" title="点击此按钮将用户名、密码和验证码输入框值清空并刷新验证码">重置</a>
                </div>
            </div>
            <div style="float:left">
                <div style="height:185px;width:250px;border:1px solid #A5B8C9;padding:5px;background-color:#fff;">
                    <table>
                    <tr>
                        <td style="color:#4989A4;font-weight:bolder;font-size:13px;">
                            被测对象地址
                        </td>
                    </tr>
                    <tr>
                        <td><input type="text" /></td>
                    </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
