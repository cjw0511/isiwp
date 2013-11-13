<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="PlanProjectAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.PlanProjectAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/planprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/PlanProjectAdd.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.PlanProjectAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>

<%--<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
</asp:Content>--%>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">


<%--<div id="_panel" class="easyui-tabs" data-options="border:false, fit: true,enableConextMenu:false,defaultEnableRefresh:false">
   <div title="计划项目信息">--%>
         <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">计划项目资料：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left">
                            计划项目名称<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtName1" name="Name" maxlength="50" />
                        </td>
                        <td class="table_td_left">
                            项目简称：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtShortName1" name="ShortName" maxlength="50" />
                        </td>
                    </tr>
                    <%--<tr>
                        <td class="table_td_left">
                            编号<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtCode1" name="Code" maxlength="50" />
                        </td>
                        <td class="table_td_left">
                            项目简称：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtShortName1" name="ShortName" maxlength="50" />
                        </td>
                    </tr>--%>
                    
                    
                    
                    <tr>
                        <td class="table_td_left">
                            客户方负责人：
                        </td>
                        <td class="table_td_right">
                            <input type="text" id="txtManager1" name="Manager" />
                        </td>
                        <td class="table_td_left">
                            关联客户<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtCustomer6" /><input type="hidden" id="CustomerKey6" name="CustomerKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>



                    </tr>


                    <tr>
                        <td class="table_td_left">
                            我方商务负责人<span class="required">*</span>：
                        </td>
                        <td class="table_td_right">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding-top: 4px;">
                                        <input id="txtEmployee6" /><input type="hidden" id="EmployeeKey6" name="EmployeeKey" />&nbsp;
                                    </td>
                                    <td>
                                        <a href="javascript:void(0)" class="easyui-linkbutton" id="b_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项">
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td class="table_td_left">
                            项目类型：
                        </td>
                        <td class="table_td_right">
                            <select id="selProjectType2" name="ProjectType">
                            
                            </select>
                        </td>

                        <%--<td class="table_td_left">
                            活动类型：
                        </td>
                        <td class="table_td_right">
                            <select id="selActiveStatus2" name="Status">
                            
                            </select>
                        </td>--%>


                    </tr>




                </table>
            </fieldset>
        </div>
        
        
        <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">项目简介：</legend>
                <table class="tablecss" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="table_td_left" style="vertical-align: top">
                            项目概述：
                        </td>
                        <td>
                            <textarea id="txtSummary" name="Summary" style="overflow: auto; height: 40px; width: 620px;" maxlength="500"></textarea>
                        </td>
                    </tr>
                    


                </table>
            </fieldset>
        </div>
    <%--</div>
    
</div>--%>



</asp:Content>
