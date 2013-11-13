<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Common/projconverter.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Libs/projrolelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/projectlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/SubProjectAdd.js" type="text/javascript"></script>

    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%=this.Request["key"] %>';
            var name = '<%=this.Request["name"] %>';
            window.project.SubProjectAdd_aspx.initPage(ajaxContainerSelector, key, name);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">

<div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">子项目添加：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            子项目名称<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtName3" name="Name" maxlength="32" />
                        </td>
                        <td class="table_td_left">
                            子项目编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtCode3" name="Code" maxlength="20" />
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="table_td_left">
                            主项目名称<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtProjName3" disabled="disabled" /><input type="hidden" id="ProjectKey3" name="ProjectKey" />
                        </td>
                        <td class="table_td_left">
                            子项目类型<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selType3" name="TypeKey">
                                
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            项目进度<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selProgress3" name="ProgressKey" disabled="disabled">
                            </select>
                        </td>
                        <td class="table_td_left">
                            所处阶段<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selStageType3" name="StageType" disabled="disabled">
                                
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            计划启动时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStartDate3" name="StartDate" />
                        </td>
                        <td class="table_td_left">
                            计划结束时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStopDate3" name="StopDate" />
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="table_td_left" style="vertical-align: top">
                            项目描述：
                        </td>
                        <td colspan="3" style="padding-top:5px;"><textarea id="txtRemark3" name="Remark" rows="3" maxlength="500"></textarea></td>
                    </tr>
                </table>
            </fieldset>
        </div>

</asp:Content>
