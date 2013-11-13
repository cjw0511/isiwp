<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="MenuFavorites.aspx.cs" Inherits="ISIWP.Platform.WebClient.MenuFavorites" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a class="easyui-linkbutton" href="javascript:void(0)" data-options="iconCls: 'icon-edit', plain: true">重命名</a>
    <a class="easyui-linkbutton" href="javascript:void(0)" data-options="iconCls: 'icon-cancel', plain: true">删除</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <ul class="easyui-tree">
        <li>
            <span>node1</span>
            <ul>
                <li>node11</li>
                <li>node12</li>
                <li>node13</li>
            </ul>
        </li>
        <li>node2</li>
        <li>node3</li>
    </ul>
</asp:Content>
