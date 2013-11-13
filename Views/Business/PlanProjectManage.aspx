<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="PlanProjectManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.PlanProjectManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">

<script src="Resources/Scripts/Business/Libs/customerlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>

<script src="Resources/Scripts/Business/Libs/planprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/PlanProjectManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";

            window.business.PlanProjectManage_aspx.initPage(ajaxContainerSelector);
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
            padding:3px 0 0 0;
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
<div id="ProjectLayout" class="easyui-layout" data-options="fit:true"> 
    <div data-options="region:'west',split:true, minWidth: 300, maxWidth: 600" style="width:530px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
        <div id="ProjectPanel" >
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'north',border:false">
                    <div class="datagrid-toolbar" style="height:54px;">
                        &nbsp;&nbsp;客户：<select id="selCustomer"></select>
                            &nbsp;&nbsp;类型：<select id="selProjectType"></select><br />
                            &nbsp;&nbsp;项目名称：<input type="text" id="txtProjectName" /> 
                            <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>                           
                            <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                    </div>
                </div>
                <div data-options="region:'center',border:false">
                    <table id="Grid">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div data-options="region:'center',border:false">
            <div class="easyui-layout" data-options="border: false, fit: true">
            
            <div data-options="region: 'center'" style="border-top-width:0px;border-right-width:0px;">
            <div class="easyui-panel" data-options="title: '计划项目详情',fit:true,border:false">
            <div id="tool" class="easyui-panel datagrid-toolbar">
                <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                <a id="btnRefresh" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
            </div>
            <div class="div_center">
                <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                    <legend class="panel-title">计划项目资料：</legend>
                    <ul class="liform">
                    <li><div class="liright">计划项目名称<span class="required">*</span>：</div><div><input type="text" id="txtName" name="Name" maxlength="50" /></div></li>
                    <%--<li><div class="liright">编号<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtCode" name="Code" maxlength="50" /></div></li>--%>
                    <li><div class="liright">项目简称：</div><div class="lileft"><input type="text" id="txtShortName" name="ShortName" maxlength="50" /></div></li>
                    <li><div class="liright">客户方负责人：</div><div class="lileft"><input type="text" id="Text1" name="Manager" /></div></li>
                    <li><div class="liright">关联客户<span class="required">*</span>：</div><div class="lileft"><input id="txtCustomer7" /><input type="hidden" id="CustomerKey7" name="CustomerKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>
                    <li><div class="liright">商务负责人<span class="required">*</span>：</div><div class="lileft"><input id="txtEmployee7" /><input type="hidden" id="EmployeeKey7" name="EmployeeKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="b_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>
                    <li><div class="liright">项目类型：</div><div class="lileft"><select id="selProjectType1" name="ProjectType"></select></div></li>
                    <li class="lirow"><div class="liright">项目概述：</div><div class="lidouble"><textarea id="txtSummary" name="Summary" rows="3" style="width:100%;" maxlength="500" ></textarea></div></li>
                    </ul>
                </fieldset>
            </div>
            </div>
            </div>
            <div data-options="region:'south',split:true,minHeight:200,maxHeight:400" style="height: 200px; border-bottom-width: 0px; border-right-width: 0px;">
                <div class="easyui-tabs" data-options="fit:true,border:false">
                    <div title="合同信息">
                        <table id="ContractGrid">
                        </table>
                    </div>
                    <div title="项目计划书">
                        <table id="PlanFileGrid">
                        </table>
                    </div>

                    <div title="商务跟进">
                        <table id="BusinessFollowGrid">
                        </table>
                    </div>

                    <div title="招标信息">
                        <table id="TenderGrid">
                        </table>
                    </div>

                    <div title="投标信息">
                        <table id="BiddingGrid">
                        </table>
                    </div>

                </div>
            </div>
            </div>
        </div>
    </div>
</asp:Content>
