<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectSolution.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectSolution" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Common/officeHelp.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/solutionlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Views/SubProjectSolution.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.project.SubProjectSolution_aspx.initPage(ajaxContainerSelector, key);
    });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="easyui-layout" data-options="border: false, fit: true">
    <div data-options="region: 'north',title:'方案编制', border: false" style="height:55px;overflow:hidden;">
        <div class="datagrid-toolbar">
            <a id="btnSubmit" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true">阶段完结确认</a>
        </div>
    </div>
    <div data-options="region: 'center'" style="border-left-width:0px;border-bottom-width:0px;border-right-width:0px;">
        <div class="easyui-tabs" data-options="fit:true,border:false,splitline:false">
            <div title="关联关系">
                <div class="easyui-layout" data-options="border:false, fit: true">
                    <div data-options="region:'west',split:true" style="width:300px;border-top-width:0px;border-bottom-width:0px;border-left-width:0px;">
                        <ul id="systemRelationTree"></ul>
                    </div>
                    <div data-options="region: 'center'" style="border-top-width:0px;border-bottom-width:0px;border-right-width:0px;">
                        <table id="objectTable"></table>
                    </div>
                </div>
            </div>
            <div title="测评对象选取">
                <div class="easyui-layout" data-options="border:false, fit: true">
                    <div data-options="region:'west',split:true" style="width:300px;border-top-width:0px;border-bottom-width:0px;border-left-width:0px;">
                        <ul id="tierTree"></ul>
                    </div>
                    <div data-options="region: 'center'" style="border-top-width:0px;border-bottom-width:0px;border-right-width:0px;">
                        <table id="selectObjectTable"></table>
                    </div>
                </div>
            </div>
            <div title="测评方案">
                <div class="easyui-layout" data-options="border:false, fit: true">
                    <div data-options="region:'north',split:true" style="height:80px;border-top-width:0px;border-left-width:0px;border-right-width:0px;">
                        <div class="div_center">
                        <table class="tablecss" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="table_td_left">测评方案文件编号：</td><td class="table_td_right"><input type="text" id="txtDocumentCode" name="DocumentCode" maxlength="40" /></td>
                            <td class="table_td_left">项目类型：</td><td class="table_td_right"><select id="selProjType" name="ProjType" /></td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <a id="btnCreateSolution" class="easyui-linkbutton" data-options="iconCls:'icon-create'">生成测评方案</a>
                            </td>
                        </tr>
                        </table>
                        </div>
                    </div>
                    <div data-options="region: 'center'" style="border-left-width:0px;border-bottom-width:0px;border-right-width:0px;">
                        <table id="solutionTable"></table>
                    </div>
                </div>
            </div>
            <div title="作业指导书">
                <div class="easyui-layout" data-options="border:false, fit: true">
                    <div data-options="region:'north',split:true" style="height:40px;border-top-width:0px;border-left-width:0px;border-right-width:0px;">
                        <div class="div_center">
                            <a id="btnCreateWorkInstru" class="easyui-linkbutton" data-options="iconCls:'icon-create'">生成作业指导书</a>
                        </div>
                    </div>
                    <div data-options="region: 'center'" style="border-left-width:0px;border-bottom-width:0px;border-right-width:0px;">
                        <table id="workInstruTable"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
