<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectReport.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Project/Common/officeHelp.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Libs/reportlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Libs/workInstructionlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/SubProjectReport.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.project.SubProjectReport_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="easyui-layout" data-options="border: false, fit: true">
    <div data-options="region: 'north',title:'报告编制', border: false" style="height:55px;overflow:hidden;">
        <div class="datagrid-toolbar">
            <a id="btnSubmit" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true">阶段完结确认</a>
        </div>
    </div>
    <div data-options="region: 'center'" style="border-left-width:0px;border-bottom-width:0px;border-right-width:0px;">
        <div class="easyui-tabs" data-options="fit:true,border:false,splitline:false">
            <div title="问题分析">
                <div class="easyui-layout" data-options="border:false, fit: true">
                    <div data-options="region:'west',split:true" style="width:450px;border-top-width:0px;border-bottom-width:0px;border-left-width:0px;">
                        <table id="WorkInstrGrid">
                        </table>
                    </div>
                    <div data-options="region: 'center'" style="border-top-width:0px;border-bottom-width:0px;border-right-width:0px;">
                        <table id="WorkInstrTree"></table>
                    </div>
                </div>
            </div>
            <div title="资产管理">
                <div class="easyui-layout" data-options="border:false, fit: true">
                    <div data-options="region:'north',split:true" style="height:60px;border-top-width:0px;border-left-width:0px;border-right-width:0px;overflow:hidden;">
                        <div style="padding:15px;">
                            选择系统：<select id="selSys1" ></select>&nbsp;&nbsp;
                            <a id="btnImportProperty" class="easyui-linkbutton" data-options="iconCls:'icon-create'">导入资产</a>
                        </div>
                    </div>
                    <div data-options="region: 'center'" style="border-left-width:0px;border-bottom-width:0px;border-right-width:0px;">
                        <table id="PropertyGird"></table>
                    </div>
                </div>
            </div>
            <div title="资产关联">
                <div class="easyui-layout" data-options="border:false, fit: true">
                    <div data-options="region:'north',split:true" style="height:60px;border-top-width:0px;border-left-width:0px;border-right-width:0px;overflow:hidden;">
                        <div style="padding:15px;">
                            选择系统：<select id="selSys2" ></select>&nbsp;&nbsp;
                            <a id="btnImportProblem" class="easyui-linkbutton" data-options="iconCls:'icon-create'">导入问题描述</a>
                        </div>
                    </div>
                    <div data-options="region:'west',split:true" style="width:600px;border-left-width:0px;border-bottom-width:0px;overflow:hidden;">
                        <table id="ProblemGrid"></table>
                    </div>
                    <div data-options="region: 'center'" style="border-bottom-width:0px;border-right-width:0px;">
                        <table id="ProblemPropertyGrid"></table>
                    </div>
                </div>
            </div>
            <div title="测评报告">
                <div class="easyui-layout" data-options="border:false, fit: true">
                    <div data-options="region:'north',split:true" style="height:105px;border-top-width:0px;border-left-width:0px;border-right-width:0px;overflow:hidden;">
                        <div class="div_center">
                        <table class="tablecss" cellpadding="0" cellspacing="0">
                        <tr>
                            <td>报告编号：</td><td class="table_td_right"><input type="text" id="txtReportCode" maxlength="40" /></td>
                            <td>文件编号：</td><td class="table_td_right"><input type="text" id="txtDocumentCode" maxlength="40" /></td>
                        </tr>
                         <tr>
                            <td>选择系统：</td><td class="table_td_right"><select id="selSystem" ></select></td>
                            <td>备案编号：</td><td class="table_td_right"><input type="text" id="txtRecordCode" maxlength="40" /></td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <a id="btnCreateReport" class="easyui-linkbutton" data-options="iconCls:'icon-create'">生成测评报告</a>
                            </td>
                        </tr>
                        </table>
                        </div>
                    </div>
                    <div data-options="region: 'center'" style="border-left-width:0px;border-bottom-width:0px;border-right-width:0px;">
                        <table id="reportTable"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>

