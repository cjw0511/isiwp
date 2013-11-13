<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="FinishSubProject.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.FinishSubProject" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Views/FinishSubProject.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Views/SubProjectFinish.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/projrolelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>    
<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Common/projconverter.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.project.FinishSubProject_aspx.initPage(ajaxContainerSelector, key);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="easyui-panel" data-options="border:false,title:'项目结案',fit:true">
        <div class="datagrid-toolbar">
            <a id="btnSubmit" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true">子项目结案确认</a>
        </div>
        <div class="easyui-panel" data-options="border:false,title:'',fit:true">
            <div id="disub"></div>
            <fieldset id="subprojectfd" class="datebox-button" style="padding: 8px; margin:10px; height: auto; text-align: left;">
                    <legend class="panel-title">子项目基本资料：</legend>
                    <table class="tablecss" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="table_td_left">
                                子项目名称<span class="required">*</span>：
                            </td>
                            <td class="table_td_right">
                                <label id="txtSubName" name="SubName" />
                            </td>
                            <td class="table_td_left">
                                子项目编号<span class="required">*</span>：
                            </td>
                            <td class="table_td_right">
                                <label id="txtSubCode" name="SubCode" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                所属主项目<span class="required">*</span>：
                            </td>
                            <td class="table_td_right">
                                <label id="txtProjectKey" name="Project" />
                            </td>
                            <td class="table_td_left">
                                子项目类型<span class="required">*</span>：
                            </td>
                            <td class="table_td_right">
                                <label id="selProjectType" name="ProjectTypeKey" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                子项目阶段<span class="required">*</span>：</td>
                            <td class="table_td_right">
                                <label id="selProjectStage" name="ProjectStage" />
                            </td>
                            <td class="table_td_left">
                                子项目进度<span class="required">*</span>：</td>
                            <td class="table_td_right">
                                <label id="selSubProjectStatus" name="SubProjectStatusKey" /><input type="hidden" id="hdProjectStatusKey" name="SubProjectStatus" />
                            </td>
                        </tr>
                        <tr>
                            <td class="table_td_left">
                                计划启动时间：
                            </td>
                            <td class="table_td_right">
                                <label id="txtSubStartDate" name="SubStartDate" />
                            </td>
                            <td class="table_td_left">
                                计划结束时间：
                            </td>
                            <td class="table_td_right">
                                <label id="txtSubStopDate" name="SubStopDate" />
                            </td>
                        </tr>
                        <%--<tr>
                            <td class="table_td_left">
                                实际启动时间：
                            </td>
                            <td class="table_td_right">
                                <label id="txtSubRealStartDate" name="SubRealStartDate" />
                            </td>
                            <td class="table_td_left">
                                实际结束时间：
                            </td>
                            <td class="table_td_right">
                                <label id="txtSubRealStopDate" name="SubRealStopDate" />
                            </td>
                        </tr>--%>
                        <tr>
                            <td height="60" class="table_td_left">
                                备注信息：
                            </td>
                            <td class="table_td_right" colspan="4">
                                <label id="txtSubRemark" name="SubRemark" />
                            </td>
                        </tr>
                    </table>
                </fieldset>
        </div>
    </div>
</asp:Content>
