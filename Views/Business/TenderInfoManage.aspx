<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="TenderInfoManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.TenderInfoManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/planprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/tenderInfolib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/TenderInfoManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.TenderInfoManage_aspx.initPage(ajaxContainerSelector);
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
            margin:0 0 8px 0;
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
        <div data-options="region:'west',split:true, minWidth: 450, maxWidth: 830" style="width:520px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
            <div id="panel" >
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north', border: false" >
                        <div class="datagrid-toolbar">
                             &nbsp;&nbsp;招标状态：<select id="selTenderStatus1" style="width: 120px;"></select>
                             &nbsp;&nbsp;代理机构：<input style="width: 150px;" type="text"  id="txtProxyOran1" />
                             <br />
                             &nbsp;&nbsp;招标类型：<select id="selTenderType1" style="width: 120px;"></select>
                             &nbsp;&nbsp;项目名称：<input style="width: 150px;" type="text"  id="txtName1"/>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
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
        <div data-options="region:'center'" style="border-top-width: 0px; border-right-width: 0px;">
            <div class="easyui-panel" data-options="title: '招标项目基本资料',fit:true,border:false">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'north', border: false" style="overflow: hidden;">
                        <div class="datagrid-toolbar">
                            <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">
                                保存</a> <a id="btnRefresh" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">
                                    刷新</a>
                        </div>
                        </div>
                    <div data-options="region:'center',border: false">
                    <div class="div_center">
                        <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                            <legend class="panel-title">招标信息登记：</legend>
                            <ul class="liform">
                            <li><div class="liright">招标项目名称<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtName" name="Name" maxlength="50" /></div></li>
                            <%--<li><div class="liright">编号<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtCode" name="Code" maxlength="50" /></div></li>--%>
                            <li><div class="liright">对应计划项目<span class="required">*</span>：</div><div class="lileft"><input id="txtPlanProject" /><input type="hidden" id="PlanProjectKey" name="PlanProjectKey" /></div>
                            <li><div class="liright">招标类型<span class="required">*</span>：</div><div class="lileft"><select id="selTenderType" name="TenderType"></select></div>
                            <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="clear_PlanProject" data-options="iconCls:'icon-undo',plain:true"></a></div></li>
                            <li><div class="liright">报名截止时间<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtOffDate" name="OffDate" /></div></li>
                            <li><div class="liright">开标时间<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtBidOpenDate" name="BidOpenDate" /></div></li>
                            <li><div class="liright">招标金额：</div><div class="lileft"><input type="text" id="txtTenderTotal" name="TenderTotal" /></div></li>
                            <li><div class="liright">招标部门：</div><div class="lileft"><input type="text" id="txtTenderCenter" name="TenderCenter" maxlength="50" /></div></li>
                            <li><div class="liright">代理机构：</div><div class="lileft"><input type="text" id="txtProxyOran" name="ProxyOran" maxlength="50" /></div></li>
                            <li><div class="liright">招标联系人：</div><div class="lileft"><input type="text" id="txtContactName" name="ContactName" maxlength="50" /></div></li>
                            <li><div class="liright">联系方式：</div><div class="lileft"><input type="text" id="txtContactMode" name="ContactMode" maxlength="50" /></div>
                            <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton easyui-tooltip" data-options="iconCls:'icon-help',plain:true" title="可以填联系电话、邮箱或传真"></a></div></li>
                            <li class="lirow"><div class="liright">招标地点：</div><div class="lidouble"><input type="text" id="txtTenderAddress" name="TenderAddress" style="width: 100%;" maxlength="100" /></div></li>
                            </ul>
                        </fieldset>
                        <fieldset class="datebox-button" style="padding: 8px; margin:5px 0 0 0; height: auto; text-align: left;">
                            <legend class="panel-title">招标内容说明：</legend>
                            <ul class="liform">
                            <li class="lirow"><div class="liright">信息说明：</div><div class="lidouble"><textarea rows="3" id="txtSummary" name="Summary" style="overflow: auto; width: 100%;" maxlength="500"></textarea></div></li>
                            </ul>
                        </fieldset>
                    </div>
                    </div>
                    <div data-options="region:'south',split:true,minHeight:210,maxHeight:450" style="height: 210px;border-bottom-width: 0px;border-right-width: 0px; border-left-width: 0px;">
                        <div id="Tab" class="easyui-panel" data-options="title:'投标信息',fit:true,border:false">
                            <table id="GridRecord">
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</asp:Content>


