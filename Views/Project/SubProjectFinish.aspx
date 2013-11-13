<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectFinish.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectFinish" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Views/ProjectFinishList.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Views/SubProjectFinish.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/projrolelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Common/projconverter.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.project.SubProjectFinish_aspx.initPage(ajaxContainerSelector, key);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <fieldset id="subprojectfd" class="datebox-button" style="padding: 8px; margin: 10px;
        height: auto; text-align: left;">
        <legend class="panel-title">子项目结案：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
            <%--<tr>
                <td class="table_td_left">
                    子项目名称<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtName" name="Name" />
                </td>
                <td class="table_td_left">
                    子项目编号<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtCode" name="Code" />
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
                                <input type="text" id="txtProjectKey" name="Project" /><input type="hidden" id="ProjectKey"
                                    name="ProjectKey" value="-1" />&nbsp;
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
                    <select id="selType" name="TypeKey">
                    </select>
                </td>
            </tr>
            <tr>
                <td class="table_td_left">
                    子项目阶段<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <select id="selStageType" name="StageType">
                    </select>
                </td>
                <td class="table_td_left">
                    子项目进度<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <select id="selProgress" name="ProgressKey">
                    </select>
                </td>
            </tr>
            <tr>
                <td class="table_td_left">
                    计划启动时间：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtStartDate" name="StartDate" />
                </td>
                <td class="table_td_left">
                    计划结束时间：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtStopDate" name="StopDate" />
                </td>
            </tr>
            <tr>
                <td class="table_td_left">
                    实际启动时间：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtRealStartDate" name="RealStartDate" />
                </td>
                <td class="table_td_left">
                    实际结束时间：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtRealStopDate" name="RealStopDate" />
                </td>
            </tr>
            <tr>
                <td height="60" class="table_td_left">
                    备注信息：
                </td>
                <td class="table_td_right" colspan="4">
                    <textarea id="txtRemark" name="Remark" rows="3" style="overflow: auto; width: 620px;"></textarea>
                </td>
            </tr>--%>
            <tr>
                <td height="60" class="table_td_left">
                    结案说明：
                </td>
                <td class="table_td_right" colspan="4">
                    <textarea id="txtClosedDetail" name="ClosedDetail" rows="5" style="overflow: auto; width: 620px;" maxlength="500"></textarea>
                </td>
            </tr>
        </table>
    </fieldset>
    <%--<fieldset class="datebox-button" style="padding: 8px; margin: 10px;height: 250px;text-align: left;">
        <legend class="panel-title">参与项目的角色成员：</legend>
        <div id="divLayout" class="easyui-layout"data-options="fit:true">
            <div data-options="region:'west',split:true, minWidth: 150, maxWidth: 400" style="width: 200px; border-top-width:0px;border-left-width:0px;border-bottom-width:0px;border-right-width:0px;">
                <div class="easyui-panel" data-options="fit:true,border:false" >
                    <ul id="Tree"></ul>
                </div>
            </div>
            <div data-options="region:'center'" style="border-top-width:0px;border-right-width:0px;border-bottom-width:0px;border-left-width:0px;">
                <div id="pp" class="easyui-panel" data-options="fit:true,border:false" style="margin:10px;" >
                    <table class="tablecss" cellpadding="0" cellspacing="0">
                        <tr>
                            <td height="60" class="table_td_left">
                                角色成员：
                            </td>
                            <td class="table_td_center">
                                 
                                <textarea id="txtEmployees" name="Employees" rows="5" style="overflow: auto; width: 500px;" readonly="True"></textarea><input type="hidden" id="hdEmployeesKey" name="EmployeesKey" />
                            </td>
                        </tr>
                        <tr>
                            <td height="30" class="table_td_left">
                                
                            </td>
                            <td align="right">
                                <a id="btnSelect" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-select',plain:true">选择</a>
                                <a id="btnSave" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </fieldset>--%>
</asp:Content>
