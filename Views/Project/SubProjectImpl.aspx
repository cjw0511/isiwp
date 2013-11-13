<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectImpl.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectImpl" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/customerlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/employeelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/planprojectlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/projectlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Views/SubProjectImpl.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.project.SubProjectImpl_aspx.initPage(ajaxContainerSelector, key);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="divLayout" class="easyui-layout" data-options="fit:true"> 
    <div data-options="region:'north',minHeight:125,maxHeight:125,border:false,split:true,title:'项目进度信息'" style="height:125px;overflow:hidden;border-bottom-width:1px;">
        <div class="datagrid-toolbar" style="padding:10px;">
            <table>
                <tr>
                    <td rowspan="2">
                    <a id="btn1" href="javascript:void(0);" class="easyui-linkbutton" data-options="disabled:true" >测评准备</a><span class="icon-next" style="width:25px;display:inline-block;">&nbsp;</span>
                    </td><td rowspan="2">
                    <a id="btn2" href="javascript:void(0);" class="easyui-linkbutton" data-options="disabled:true" >方案编制</a><span class="icon-next" style="width:25px;display:inline-block;">&nbsp;</span>
                    </td><td rowspan="2">
                    <a id="btn3" href="javascript:void(0);" class="easyui-linkbutton" data-options="disabled:true" >现场测评</a><span class="icon-next" style="width:25px;display:inline-block;">&nbsp;</span>
                    </td>
                    <td>
                    <a id="btn4" href="javascript:void(0);" class="easyui-linkbutton" data-options="disabled:true" >报告编制</a>
                    </td>
                    <td rowspan="2">
                    <span class="icon-next" style="width:25px;display:inline-block;">&nbsp;</span>
                    <a id="btn6" href="javascript:void(0);" class="easyui-linkbutton" data-options="disabled:true" >子项目结案</a>
                    </td>
                </tr>
                <tr>
                    <td>
                    <a id="btn5" href="javascript:void(0);" class="easyui-linkbutton" data-options="disabled:true" >整改方案</a>
                    </td>
                </tr>
                <tr><td colspan="5">当前项目所处阶段：<span id="spnStage"></span></td></tr>
            </table>
        </div>
    </div>
    <div data-options="region:'center'" style="border-left-width:0px;border-right-width:0px;border-bottom-width:0px;">
        <div id="StagePanel" class="easyui-panel" data-options="fit: true,border: false">
             <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'west',split:true, minWidth: 650,maxWidth:750" style="width: 700px;border-top-width: 0px; border-left-width: 0px; border-bottom-width: 0px;">
                        <div class="easyui-panel" data-options="title:'子项目信息',fit:true,border:false">
                            <div class="div_center">
                                <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                                <legend class="panel-title">子项目信息：</legend>
                                <table class="tablecss" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="table_td_left">名称：</td><td class="table_td_right"><span id="subName" ></span></td>
                                        <td class="table_td_left">编码：</td><td class="table_td_right"><span id="subCode" ></span></td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">所属项目：</td><td class="table_td_right"><span id="subMainProj" ></span></td>
                                        <td class="table_td_left">子项目类型：</td><td class="table_td_right"><span id="subType" ></span></td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">计划启动时间：</td><td class="table_td_right"><span id="subStartDate" ></span></td>
                                        <td class="table_td_left">计划结束时间：</td><td class="table_td_right"><span id="subStopDate" ></span></td>
                                    </tr>
                                </table>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div data-options="region:'center'" style="border-top-width: 0px; border-bottom-width: 0px;">
                        <div class="easyui-panel" data-options="title:'项目信息',fit:true,border:false">
                            <div class="div_center">
                                <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                                    <legend class="panel-title">项目信息：</legend>
                                    <table class="tablecss" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="table_td_left">项目名称：</td>
                                        <td class="table_td_right"><span id="spnName" ></span></td>
                                        <td class="table_td_left"> 项目编号：</td>
                                        <td class="table_td_right"><span id="spnCode" ></span></td>
                                    </tr>
                                    <tr>
                                       <%-- <td class="table_td_left">客户档案：</td>
                                        <td class="table_td_right"><span id="spnCustomer" ></span></td>--%>
                                        <td class="table_td_left">计划项目：</td>
                                        <td class="table_td_right"><span id="spnPlanProject" ></span></td>

                                        <td class="table_td_left">项目经理：</td>
                                        <td class="table_td_right"><span id="Span1" ></span></td>
                                    </tr>
                                    <%--<tr>
                                        <td class="table_td_left">项目经理：</td>
                                        <td class="table_td_right"><span id="spnManager" ></span></td>
                                        <td class="table_td_left">我方技术负责人：</td>
                                        <td class="table_td_right"><span id="spnTechMgr" ></span></td>
                                    </tr>--%>
                                    <tr>
                                        <td class="table_td_left">审核状态：</td>
                                        <td class="table_td_right"><span id="spnApproval" ></span></td>
                                        <td class="table_td_left">项目进度：</td>
                                        <td class="table_td_right"><span id="spnProgress" ></span></td>
                                    </tr>
                                    <tr>
                                        <td class="table_td_left">计划启动时间：</td>
                                        <td class="table_td_right"><span id="spnStartDate" ></span></td>
                                        <td class="table_td_left">计划结束时间：</td>
                                        <td class="table_td_right"><span id="spnStopDate" ></span></td>
                                    </tr>
                                    <%--<tr>
                                        <td class="table_td_left">实际启动时间：</td>
                                        <td class="table_td_right"><span id="spnRealStartDate" ></span></td>
                                        <td class="table_td_left">实际结束时间：</td>
                                        <td class="table_td_right"><span id="spnRealStopDate" ></span></td>
                                    </tr>--%>
                                    <tr>
                                        <td class="table_td_left">我方商务负责人：</td>
                                        <td class="table_td_right"><span id="spnBusiMgr" ></span></td>
                                        <td class="table_td_left"></td>
                                        <td class="table_td_right"></td>
                                    </tr>

                                    <tr>
                                        <td class="table_td_left">项目描述：</td>
                                        <td colspan="3"><span id="spnDescription" ></span></td>
                                    </tr>
                                </table>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>

</asp:Content>
