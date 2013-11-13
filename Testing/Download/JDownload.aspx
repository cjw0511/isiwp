<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="JDownload.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.Download.JDownload" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <link href="JDownload/jDownload-master/jDownload-master/jquery.jdownload.css" rel="stylesheet"type="text/css" />
    <script src="JDownload/jDownload-master/jDownload-master/jquery.jdownload.js" type="text/javascript"></script>
    <script src="JDownload/jDownload-master/jDownload-master/jquery.jdownload.min.js"type="text/javascript"></script>

    
    <script type="text/javascript" language="javascript">
        $('.download').jDownload({
            event: 'hover',
            dialogWidth: 300,
            dialogHeight: 150
        });
        
    </script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">   
<div class="easyui-propertygrid" data-options="region: 'center', border: false" >
                        <table id="Grid"></table>
    <a href="">1</a>
</div>
</asp:Content>

