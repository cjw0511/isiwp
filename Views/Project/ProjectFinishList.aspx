<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ProjectFinishList.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.ProjectFinishList" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Libs/employeelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
<%--<script src="Resources/Scripts/Business/Libs/customerlib.js" type="text/javascript"></script>--%>
<script src="Resources/Scripts/Business/Libs/planprojectlib.js" type="text/javascript"></script>    
<script src="Resources/Scripts/Project/Libs/projectlib.js" type="text/javascript"></script>    
<script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>    
<script src="Resources/Scripts/Project/Views/ProjectFinishList.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        window.project.ProjectFinishList_aspx.initPage(ajaxContainerSelector);
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
<div id="cc" class="easyui-layout" data-options="fit:true">
    <div data-options="region:'west',split:true,minWidth:600,maxWidth:700" style="width: 600px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px;">
        <div id="tt" class="easyui-panel" data-options="title:'项目信息列表',fit:true,border:false">
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region: 'north',border:false">
                    <div class="datagrid-toolbar" style="height: auto;">
                    &nbsp;项目名称：<input type="text" id="txtNameSearch" />
                    &nbsp;项目状态：<select id="selProgressKey"></select>
                    <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                    <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                    <a id="btnHelp" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-help',plain:true" title="该处只显示有效的项目">帮助</a>
                </div>
                </div>
                <div data-options="region: 'center',border:false">
                    <div id="di"></div>
                    <table id="Grid">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div data-options="region: 'center'" style="border-bottom-width: 0px; border-right-width: 0px; border-top-width: 0px;">
        <div class="easyui-panel" data-options="fit:true,border:false">
            <div id="dd" class="easyui-layout" data-options="fit:true">
                <div data-options="region: 'center'" style="border-left-width: 0px; border-right-width: 0px; border-top-width: 0px;">
                    <div class="easyui-panel" data-options="title:'项目基本信息',fit:true,border:false">
                        <div id="projectdiv" class="easyui-panel" data-options="border:false">
                            <fieldset id="projectfd" class="datebox-button" style="padding: 8px; margin: 10px;
                                height: auto; text-align: left;">
                                <legend class="panel-title">项目基本资料：</legend>
                                <ul class="liform">
                                    <li><div class="liright">项目名称：</div><div class="lileft"><label id="txtName" name="Name" /></div></li>
                                    <li><div class="liright">项目编号：</div><div class="lileft"><label id="txtCode" name="Code" /></div></li>
                                    <li><div class="liright">所属计划项目：</div><div class="lileft"><label id="txtPlanProject" name="PlanProject" /></div></li>
                                    <li><div class="liright">商务负责人：</div><div class="lileft"><label id="txtBusiMgr" name="BusiMgr" /></div></li>
                                    <li><div class="liright">是否有效项目：</div><div class="lileft"><label id="selIsApproval" name="IsApproval" /></div></li>
                                    <li><div class="liright">项目进度：</div><div class="lileft"><label id="selProjectStatus" name="ProjectStatusKey" /></div></li>
                                    <li><div class="liright">计划启动时间：</div><div class="lileft"><label id="txtStartDate" name="StartDate" /></div></li>
                                    <li><div class="liright">计划结束时间：</div><div class="lileft"><label id="txtStopDate" name="StopDate" /></div></li>
                                    <li><div class="liright">项目描述：</div><div class="lileft"><label id="txtDescription" name="Description" /></div></li>
                                    <li><div class="liright">备注信息：</div><div class="lileft"><label id="txtRemark" name="Remark" /></div></li>
                                    <li><div class="liright">项目经理：</div><div class="lileft"><label id="txtManager" name="Manager" /></div></li>
                                </ul>
                            </fieldset>
                        </div>
                        <%--<div id="subprojectdiv" class="easyui-panel" data-options="closed:true,border:false">
                <fieldset id="subprojectfd" class="datebox-button" style="padding: 8px; margin:10px; height: auto; text-align: left;">
                    <legend class="panel-title">子项目基本资料：</legend>
                    <table class="tablecss" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="table_td_left">
                                子项目名称<span class="required">*</span>：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtSubName" name="SubName" />
                            </td>
                            <td class="table_td_left">
                                子项目编号<span class="required">*</span>：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtSubCode" name="SubCode" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                所属主项目<span class="required">*</span>：
                            </td>
                            <td class="table_td_right">
                                <table cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding-top: 4px;">
                                            <input type="text" id="txtProjectKey" name="Project" /><input type="hidden" id="ProjectKey" name="ProjectKey" value="-1" />&nbsp;
                                        </td>
                                        <td>
                                            <a href="javascript:void(0)" class="easyui-linkbutton" id="a3" data-options="iconCls:'icon-undo',plain:true">
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td class="table_td_left">
                                子项目类型<span class="required">*</span>：
                            </td>
                            <td class="table_td_right">
                                <select id="selProjectType" name="ProjectTypeKey">
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                子项目阶段<span class="required">*</span>：</td>
                            <td class="table_td_right">
                                <select id="selProjectStage" name="ProjectStage">
                                </select>
                            </td>
                            <td class="table_td_left">
                                子项目进度<span class="required">*</span>：</td>
                            <td class="table_td_right">
                                <select id="selSubProjectStatus" name="SubProjectStatusKey">
                                </select></td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                计划启动时间：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtSubStartDate" name="SubStartDate" />
                            </td>
                            <td class="table_td_left">
                                计划结束时间：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtSubStopDate" name="SubStopDate" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                实际启动时间：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtSubRealStartDate" name="SubRealStartDate" />
                            </td>
                            <td class="table_td_left">
                                实际结束时间：
                            </td>
                            <td class="table_td_right">
                                <input type="text" id="txtSubRealStopDate" name="SubRealStopDate" />
                            </td>
                        </tr>
                        <tr>
                            <td height="60" class="table_td_left">
                                备注信息：
                            </td>
                            <td class="table_td_right" colspan="4">
                                <textarea id="txtSubRemark" name="SubRemark" rows="3" style="overflow: auto; width: 620px;"></textarea>
                            </td>
                        </tr>
                    </table>
                </fieldset>
                </div>--%>
                    </div>
                </div>
                <div data-options="region: 'south',border:false,minHeight:200,maxHeight:400" style="height: 250px; border-bottom-width: 0px; border-right-width: 0px; border-left-width: 0px;">
                    <div id="pp" class="easyui-panel" data-options="title:'子项目信息列表',fit:true,border:false">
                        <div id="disub"></div>
                        <table id="SubGrid">
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
