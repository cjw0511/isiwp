<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/SubProjectUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%=this.Request["key"] %>';
            var progkey = '<%=this.Request["progresskey"] %>';
            window.project.SubProjectUpdate_aspx.initPage(ajaxContainerSelector, key,progkey);

        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="easyui-layout" data-options="fit:true">
    <div data-options="region:'north',split:true" style="height:270px;border-top-width:0px;border-left-width:0px;border-right-width:0px;">
        <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">修改子项目：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            子项目名称<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtName4" name="Name" maxlength="32" />
                        </td>
                        <td class="table_td_left">
                            子项目编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtCode4" name="Code" maxlength="20" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            主项目名称<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtProjName4" disabled="disabled" /><input type="hidden" id="ProjectKey4" name="ProjectKey" />
                        </td>
                        <td class="table_td_left">
                            子项目类型<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selType4" name="TypeKey">
                                
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            项目进度<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selProgress4" name="ProgressKey" disabled="disabled">
                            </select><a id="btnImplement" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">实施审核</a>
                        </td>
                        <td class="table_td_left">
                            所处阶段<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <select id="selStageType4" name="StageType" disabled="disabled">
                                
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_td_left">
                            计划启动时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStartDate4" name="StartDate" />
                        </td>
                        <td class="table_td_left">
                            计划结束时间<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtStopDate4" name="StopDate" />
                        </td>
                    </tr>
   
                    <tr>
                        <td class="table_td_left" style="vertical-align: top">
                            项目描述：
                        </td>
                        <td colspan="3" style="padding-top:5px;"><textarea id="txtRemark4" name="Remark" rows="3" maxlength="500"></textarea></td>
                    </tr>
                </table>
            </fieldset>
        </div>
    </div>
    
    <div data-options="region:'center'" style="border-bottom-width:0px;border-left-width:0px;border-right-width:0px;">
         
         <div class="div_center">
            <fieldset id="aa" class="datebox-button" style="padding-left: 8px;padding-bottom:30px;height:250px;text-align: left;">
                <legend class="panel-title">参与子项目的项目角色与成员：</legend>
                <table id="dg" style="height:250px;" class="tablecss" cellpadding="0" cellspacing="0">
                    
                </table>
            </fieldset>
        </div>
             
    </div>

</div>
</asp:Content>
