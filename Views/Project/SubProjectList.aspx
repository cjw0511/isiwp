<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectList.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Libs/projectlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Views/SubProjectList.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        window.project.SubProjectList_aspx.initPage(ajaxContainerSelector);
    });
</script>
    <style type="text/css">
        .liform
        {
            margin:10px 0 10px 0;
            padding:0;
            list-style-type:none;
            min-width:480px;
            max-width:750px;
        }
        .liform li
        {
            margin:0 0 2px 0;
            padding:0;
            list-style-type:none;
            float:left;
            width:340px;
        }
        .liform li.lirow
        {
            margin:0 0 5px 0;
            padding:0;
            list-style-type:none;
            float:left;
            width:650px;
        }
        .lileft
        {
            float:left; 
            text-align:left;
            height:25px;
            padding:6px 0 0 0;
        }
        .liright
        {
            width:90px; 
            text-align:right; 
            float:left;
            margin:6px 0 0 0;
        }
        .lidouble
        {
            float:left; 
            text-align:left;
            width:540px;
            padding:3px 0 0 0;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="divLayout" class="easyui-layout" data-options="fit:true"> 
    <div data-options="region:'west',split:true, minWidth: 600,maxWidth:800" style="width:700px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
        <div id="panel" >
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'north',border:false">
                    <div class="datagrid-toolbar" style="height:55px;">
                        &nbsp;&nbsp;实施状态：<select id="selProgressKey" style="width: 120px;"></select>
                        &nbsp;&nbsp;子项目名称：<input style="width: 150px;" type="text" id="txtN" /><br />
                        &nbsp;&nbsp;所处阶段：<select id="selStageType" style="width: 120px;"></select>
                        &nbsp;&nbsp;父项目名称：<input style="width: 150px;" type="text" id="txtProjectName" />
                        <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                        <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                    </div>
                </div>
                <div data-options="region:'center',border:false">
                    <table id="SubProjectGrid">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div data-options="region:'center'" style="border-top-width:0px;border-bottom-width:0px;">
        <div class="easyui-panel" data-options="title:'子项目信息',border:false,fit:true">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'north',split:'true'" style="height:300px;border-top-width:0px;border-left-width:0px;border-right-width:0px;">
                    <div class="div_center">
                        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                        <legend class="panel-title">子项目信息：</legend>
                        <ul class="liform">
                            <li><div class="liright">名称：</div><div class="lileft"><span id="txtName" name="Name" ></span></div></li>
                            <li><div class="liright">编码：</div><div class="lileft"><span id="txtCode" name="Code" ></span></div></li>
                            <li><div class="liright">所属项目：</div><div class="lileft"><span id="txtMainProj" ></span></div></li>
                            <li><div class="liright">子项目类型：</div><div class="lileft"><span id="txtType" ></span></div></li>
                            <li><div class="liright">计划启动时间：</div><div class="lileft"><span id="txtStartDate" ></span></div></li>
                            <li><div class="liright">计划结束时间：</div><div class="lileft"><span id="txtStopDate" ></span></div></li>
                        </ul>
                        </fieldset>
                    </div>
                </div>
                <div data-options="region:'center'" style="border-bottom-width:0px;border-left-width:0px;border-right-width:0px;" >
                    <table id="MenberGrid"></table>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>