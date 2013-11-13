<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="WebForm19_FullCalendar.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.WebForm19_FullCalendar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a class="easyui-linkbutton" data-options="iconCls: 'icon-save', plain: true" >测试按钮-save</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="easyui-fullCalendar" data-options="width: 600, height: 380, fit: true"></div>
</asp:Content>
