<%@ Page Language="C#"  MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="WebForm_LinqTest.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.WebForm_LinqTest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script type="text/javascript" language="javascript">
    var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";

    /////// TreeGrid
    $("#treegrid", ajaxContainerSelector).treegrid({
        title: '关于treegrid测试',
        idField: 'Key',
        treeField: 'Name',
        fit: true,
        animate: true,
        rownumbers: true,
        fitColumns: true,
        border: false,
        url: window.resolveUrl("Services/Project/MappingService.asmx/LoadLoreLibs"),
        columns: [[
            { title: '名称', field: 'Name' }
        ]]
    });
    

</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <table id="dg"></table>
    </asp:Content>
    <asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <table id="treegrid"></table>
</asp:Content>
