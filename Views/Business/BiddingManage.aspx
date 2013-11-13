<%@ Page Language="C#"  MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="BiddingManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.BiddingManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/biddinglib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/planprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/tenderInfolib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/BiddingManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.BiddingManage_aspx.initPage(ajaxContainerSelector);
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
    <div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west', split:true, minWidth: 500, maxWidth: 830" style="width:500px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
            <div id="panel" >
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region: 'north', border: false">
                        <div class="datagrid-toolbar"><%--投标状态：<select id="selBiddingStatus1" style="width: 120px;"></select>--%>
                            &nbsp;投标项目名称：<input style="width: 150px;" type="text"  id="txtName1" />
                            &nbsp;计划项目名称：<select id="selPlanProjectKey1" style="width: 120px;"></select>
                            <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                            <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                        </div>
                    </div>
                    <div data-options="region: 'center', border: false">
                        <table id="Grid"></table>
                    </div>
                </div>
            </div>
        </div>  
        <div data-options="region:'center'"style="border-top-width: 0px; border-bottom-width: 0px;">
        <div class="easyui-panel" data-options="title: '投标信息基本资料',fit:true,border:false">
            <div class="easyui-layout" data-options=" border: false, fit:true">
                  <div data-options="region:'north', border: false" style="overflow: hidden;">
                        <div class="datagrid-toolbar"><a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                        <a id="btnRefresh" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a></div>
                  </div>
                <div data-options="region:'center',border: false">
                <div class="div_center">
                    <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                        <legend class="panel-title">投标信息登记：</legend>
                        <ul class="liform">
                        <li><div class="liright">投标项目名称<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtName" name="Name" maxlength="50" /></div></li>
                        <li><div class="liright">对应计划项目<span class="required">*</span>：</div><div class="lileft"><input id="txtPlanProject" /><input type="hidden" id="PlanProjectKey" name="PlanProjectKey" /></div>
                        <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="clear_PlanProject" data-options="iconCls:'icon-undo',plain:true"></a></div></li>
                        <li><div class="liright">投标时间<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtBiddingDate" name="BiddingDate" /></div></li>
                        <li><div class="liright">投标负责人<span class="required">*</span>：</div><div class="lileft"><input id="txtEmployee" /><input type="hidden" id="EmployeeKey" name="EmployeeKey" /></div>
                        <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="clear_Employee" data-options="iconCls:'icon-undo',plain:true"></a></div></li>
                        <li><div class="liright">投标金额：</div><div class="lileft"><input type="text" id="txtBiddingTotal" name="BiddingTotal" /></div></li>
                        <li><div class="liright">对应招标信息<span class="required">*</span>：</div><div class="lileft"><input id="txtTenderInfo" /><input type="hidden" id="TenderKey" name="TenderKey" /></div>
                        <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="clear_TenderInfo" data-options="iconCls:'icon-undo',plain:true"></a></div></li>
                        <li class="lirow"><div class="liright">投标地点：</div><div class="lidouble"><input type="text" id="txtBiddingAddress" name="BiddingAddress" style="width: 100%;" maxlength="100" /></div></li>
                        </ul>
                    </fieldset>
                </div>
                    <div class="div_center">
                        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                            <legend class="panel-title">投标内容说明：</legend>
                            <ul class="liform">
                            <li class="lirow"><div class="liright">信息说明：</div><div class="lidouble"><textarea rows="3" id="txtSummary" name="Summary" style="overflow: auto; width:100%;" maxlength="500"></textarea></div></li>
                            </ul>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
     </div>
   </div>
        
</asp:Content>

