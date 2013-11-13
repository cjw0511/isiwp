<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubRectificationMainManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubRectificationMainManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Project/Libs/subrectificationlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/SubRectificationMainManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.project.SubRectificationMainManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="divLayout" class="easyui-layout" data-options="fit:true"> 
    <div data-options="region:'west',split:true, minWidth: 330,maxWidth:500" style="width:330px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
        <div id="panel" >
            <table id="TemplateGrid">
            </table>
        </div>
    </div>
    <div data-options="region:'center'" style="border-top-width:0px;border-bottom-width:0px;">
        <table id="MainGrid">
        </table>
    </div>
    <div data-options="region:'east',split:true, minWidth: 300,maxWidth:700" style="width:300px;border-top-width:0px;border-bottom-width:0px;">
        <div id="panel1" >
            <table id="FieldGrid">
            </table>
        </div>
    </div>
</div>
</asp:Content>