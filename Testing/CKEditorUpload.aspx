<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="CKEditorUpload.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.CKEditorUpload" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script type="text/javascript">
    $(function () {
        //        CKEDITOR.appendTo('ap', null, "sa");
        //                CKEDITOR.replace("editor2");
        //        CKEDITOR.replace('editor1', {
        //            uiColor: '#14B8C4',
        //            toolbarCanCollapse: true,
        //            toolbar: 'Basic'
        //        });

        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        CKEDITOR.appendTo($('#ap', ajaxContainerSelector)[0]);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="ap" >

</div>
</asp:Content>
