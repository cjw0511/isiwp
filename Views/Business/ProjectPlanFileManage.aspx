<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ProjectPlanFileManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.ProjectPlanFileManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Libs/customerlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Libs/biddinglib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Libs/planProjectlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Libs/projectPlanFilelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/ProjectPlanFileManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.ProjectPlanFileManage_aspx.initPage(ajaxContainerSelector);
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
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="cc" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true,minWidth:400,maxWidth:900" style="width: 550px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px;">
            <div id="tt" class="easyui-panel" data-options="title:'项目计划书管理',fit:true,border:false" >
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region: 'north',border:false">
                        <div class="datagrid-toolbar" style="height: auto;">
                            &nbsp;项目计划书名称：<input type="text" id="txtNameSearch" />&nbsp;&nbsp;评审状态：<select id="selReviewSearch" style="width: 150px;"></select> 
                            <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                            <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                        </div>
                    </div>
                    <div data-options="region: 'center',border:false">
                        <table id="Grid">
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div data-options="region: 'center'" style=" border-bottom-width: 0px; border-right-width: 0px; border-top-width: 0px;">
            <div id="pp" class="easyui-panel" data-options="title:'项目计划书基本信息',fit:true,border:false" >
                <div id="tool" class="easyui-panel datagrid-toolbar" data-options="closed:true"><a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                <a id="btnRefresh" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a></div>
                <fieldset class="datebox-button" style="padding: 8px; margin:10px; height: auto; text-align: left;">
                    <legend class="panel-title">项目计划书基本资料：</legend>
                    <ul class="liform">
                        <li class="lirow"><div class="liright">计划书名称<span class="required">*</span>：</div><div class="lidouble"><input type="text" id="txtName" name="Name" style="width:100%;" maxlength="50" /></div></li>
                        <li><div class="liright">计划书编号<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtCode" name="Code" maxlength="50" /></div></li>
                        <li><div class="liright">所属计划项目<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtPlanProjectKey" name="PlanProject" /><input type="hidden" id="PlanProjectKey" name="PlanProjectKey" /></div>
                        <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="a3" data-options="iconCls:'icon-undo',plain:true"></a></div></li>
                        <li><div class="liright">计划书负责人<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtEmployeeKey" name="Employee" /><input type="hidden" id="EmployeeKey" name="EmployeeKey" /></div>
                        <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="a1" data-options="iconCls:'icon-undo',plain:true"></a></div></li>
                        <%--<li><div class="liright">所属投标项目：</div><div class="lileft"><input type="text" id="txtBiddingKey" name="Bidding" /><input type="hidden" id="BiddingKey" name="BiddingKey" value="-1" /></div>
                        <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="a2" data-options="iconCls:'icon-undo',plain:true"></a></div></li>
                        <li><div class="liright">所属客户：</div><div class="lileft"><input type="text" id="txtCustomerKey" name="Customer" /><input type="hidden" id="CustomerKey" name="CustomerKey" value="-1" /></div>
                        <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true"></a></div></li>--%>
                        <li><div class="liright">评审状态：</div><div class="lileft"><select id="selReviewStatus" name="ReviewStatusKey"></select></div></li>
                        <li class="lirow"><div class="liright">计划书说明：</div><div class="lidouble"><textarea id="txtSummary" name="Summary" rows="3" style="overflow: auto; width: 100%;" maxlength="500"></textarea></div></li>
                        <li class="lirow"><div class="liright">备注信息：</div><div class="lidouble"><textarea id="txtRemark" name="Remark" rows="3" style="overflow: auto; width: 100%;" maxlength="500"></textarea></div></li>
                    </ul>
                </fieldset>
            </div>
        </div>
    </div>
</asp:Content>
