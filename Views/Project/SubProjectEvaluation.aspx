<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectEvaluation.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectEvaluation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Common/officeHelp.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/workInstructionlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Views/SubProjectEvaluation.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.project.SubProjectEvaluation_aspx.initPage(ajaxContainerSelector, key);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="easyui-panel" data-options="border:false,title:'现场测评',fit:true">
        <div class="easyui-layout" data-options="border: false, fit: true">
            <div data-options="region: 'north', border: false" style="overflow: hidden;">
                <div class="datagrid-toolbar">
                    <a id="btnSubmit" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true">阶段完结确认</a>
                </div>
            </div>
            <div id="containerPanel" data-options="region: 'center', border: false">
                <div id="divLayout2" class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'west',split:true, minWidth: 300,maxWidth:800,title:'作业指导书列表'" style="width: 450px; border-bottom-width: 0px;">
                        <table id="WorkInstrGrid"></table>
                    </div>
                    <div data-options="region:'center'" style="border-top-width: 0px; border-bottom-width: 0px;">
                        <table id="WorkInstrTree"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
