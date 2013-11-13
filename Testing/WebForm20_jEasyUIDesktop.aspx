<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="WebForm20_jEasyUIDesktop.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.WebForm20_jEasyUIDesktop" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script type="text/javascript" language="javascript">
        $(function () {
            
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="A1" class="easyui-linkbutton" data-options="plain: true, iconCls: 'icon-save'" >测试按钮1</a>
    <a id="A2" class="easyui-linkbutton" data-options="plain: true, iconCls: 'icon-save'" >测试按钮2</a>
    <a id="A3" class="easyui-linkbutton" data-options="plain: true, iconCls: 'icon-save'" >测试按钮3</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="cc" class="easyui-deskapp">
    </div>
</asp:Content>
