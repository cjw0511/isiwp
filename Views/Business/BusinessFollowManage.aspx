<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="BusinessFollowManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.BusinessFollowManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Libs/businessFollowlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Views/BusinessFollowManage.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        window.business.BusinessFollowManage_aspx.initPage(ajaxContainerSelector);

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
    <div data-options="region:'west',split:true, minWidth: 530, maxWidth: 800" style="width:530px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
        <div id="panel" >
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'north',border:false">
                    <div class="datagrid-toolbar" style="height:auto;">
                        &nbsp;客户单位：<select id="selCustomer1" ></select>
                        &nbsp;计划项目：<select id="selProject1" ></select>
                        <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                        <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                    </div>
                </div>
                <div data-options="region:'center',border:false">
                    <table id="BusinessFollowGrid">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div data-options="region:'center'" style="border-top-width:0px;border-bottom-width:0px;">
        <div class="easyui-panel" data-options="title: '商务跟进记录',fit:true,border:false">
        <div class="easyui-layout" data-options="border: false, fit: true">
            <div data-options="region: 'north', border: false" style="overflow: hidden;">
                <div class="datagrid-toolbar">
                <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                </div>
            </div>
            <div data-options="region: 'center', border: false">
            <div class="div_center">
                <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                    <legend class="panel-title">商务跟进记录：</legend>
                    <ul class="liform">
                        <li><div class="liright">客户单位<span class="required">*</span>：</div><div class="lileft"><select id="selCustomer" name="CustomerKey"></select></div></li>
                        <li><div class="liright">计划项目：</div><div class="lileft"><select id="selProject" name="ProjectKey"></select></div></li>
                        <li><div class="liright">接洽时间<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtContactDate" name="ContactDate" /></div></li>
                        <li><div class="liright">商务形式：</div><div class="lileft"><select id="selBusinessForms" name="BusinessForms"></select></div></li>
                        <li><div class="liright">客户接洽人员：</div><div class="lileft"><input type="text" id="txtContactMan" name="ContactMan" maxlength="50" /></div></li>
                        <li><div class="liright">所属部门：</div><div class="lileft"><input type="text" id="txtContactDept" name="ContactDept" maxlength="50" /></div></li>
                        <li><div class="liright">商务人员<span class="required">*</span>：</div><div class="lileft"><input id="txtBusiEmployee" name="BusiEmployee" /><input type="hidden" id="BusiEmployeeKey" name="BusiEmployeeKey" /></div>
                        <div class="lileft"><a id="clear_BusiEmployee" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'"></a></div></li>
                        <li><div class="liright">技术人员：</div><div class="lileft"><input id="txtTechnicalEmployee" name="TechnicalEmployee" /><input type="hidden" id="TechnicalEmployeeKey" name="TechnicalEmployeeKey" value="0" /></div>
                        <div class="lileft"><a id="clear_TechnicalEmployee" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'"></a></div></li>
                        <li class="lirow"><div class="liright">商务进度：</div><div class="lidouble"><textarea id="txtBusinessProgress" class="easyui-ckeditor" data-options="required:true" name="BusinessProgress" rows="3" style="width:540px;" maxlength="500" ></textarea></div></li>
                        <li class="lirow"><div class="liright">需求分析要素：</div><div class="lidouble"><textarea id="txtRequire" name="Require" rows="3" style="width: 100%;" maxlength="500" ></textarea></div></li>
                        <li class="lirow"><div class="liright">推进难点：</div><div class="lidouble"><textarea id="txtDifficulties" name="Difficulties" rows="3" style="width: 100%;" maxlength="500" ></textarea></div></li>
                        <li class="lirow"><div class="liright">竞争对手：</div><div class="lidouble"><input type="text" id="txtCompetitors" name="Competitors" style="width: 100%;" maxlength="100" /></div></li>
                        <li class="lirow"><div class="liright">竞争情况：</div><div class="lidouble"><textarea id="txtCompetitiveConditions" name="CompetitiveConditions" rows="3" style="width: 100%;" maxlength="500" ></textarea></div></li>
                    </ul>
                </fieldset>
            </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>