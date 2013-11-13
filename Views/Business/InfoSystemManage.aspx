<%@ Page Language="C#"  MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="InfoSystemManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.InfoSystemManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/Customerlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/infoSystemlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/InfoSystemManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.InfoSystemManage_aspx.initPage(ajaxContainerSelector);
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
        <div data-options="region:'west', split:true, minWidth: 300, maxWidth: 830" style="width:530px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
            <div id="panel" >
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north', border: false">
                        <div class="datagrid-toolbar" style="height:auto">
                            &nbsp;&nbsp;信息系统类型：<select id="selInfoSystemType1" style="width: 120px;"></select>
                            &nbsp;&nbsp;信息系统名称：<input style="width: 150px;" type="text"  id="txtName1" />
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
        <div data-options="region:'center'" style="border-top-width: 0px; border-bottom-width: 0px;">
            <div class="easyui-panel" data-options="title: '信息系统基本资料',fit:true,border:false">
                <div class="easyui-layout" data-options="fit:true">
                    <div data-options="region:'north', border: false" style="overflow: hidden;">
                        <div class="datagrid-toolbar">
                        <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                            <a id="btnRefresh" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
                        </div>
                    </div>
                    <div id="reGet" data-options="region: 'center', border: false">
                        <div class="div_center">
                            <fieldset class="datebox-button" style="padding: 8px; height: auto; text-align: left;">
                                <legend class="panel-title">信息系统信息：</legend>
                                <ul class="liform">
                                <li><div class="liright">信息系统名称<span class="required">*</span>：</div><div><input type="text" id="txtName" name="Name" maxlength="50" /></div></li>
                                <%--<li><div class="liright">信息系统编号<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtCode" name="Code" maxlength="50" /></div></li>--%>
                                <li><div class="liright">简称：</div><div class="lileft"><input type="text" id="txtShortName" name="ShortName" maxlength="50" /></div></li>
                                <li><div class="liright">所属客户<span class="required">*</span>：</div><div class="lileft"><input id="txtCustomer" /><input type="hidden" id="CustomerKey" name="CustomerKey" /></div>
                                <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="clear_Customer" data-options="iconCls:'icon-undo',plain:true"></a></div></li>
                                <li><div class="liright">信息系统类型：</div><div class="lileft"><select id="selInfoSystemType" name="InfoSystemType"></select></div></li>
                                <li><div class="liright">业务信息等级：</div><div class="lileft"><select id="selBusiSafeLevel" name="BusiSafeLevel"></select></div></li>
                                <li><div class="liright">系统服务等级：</div><div class="lileft"><select id="selSystemSafeLevel" name="SystemSafeLevel"></select></div></li>
                                <li><div class="liright">等保级别：</div><div class="lileft"><select id="selProtectionLevel" name="ProtectionLevel" disabled="disabled"></select></div>
                                <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton easyui-tooltip" data-options="iconCls:'icon-help',plain:true" title="由业务信息等级与系统服务等级两者中取高所得"></a></div></li>
                                <li><div class="liright">客户方负责人：</div><div class="lileft"><input type="text" id="txtManager" name="Manager" maxlength="50" /></div></li>
                                <li class="lirow"><div class="liright">用途描述：</div><div class="lidouble"><input type="text" id="txtDescription" name="Description" style="width: 100%;" maxlength="500" /></div></li>
                                </ul>
                            </fieldset>
                            <fieldset class="datebox-button" style="padding: 8px; margin:5px 0 0 0; height: auto; text-align: left;">
                                <legend class="panel-title">信息系统说明：</legend>
                                <ul class="liform">
                                <li class="lirow"><div class="liright">其他说明：</div><div class="lidouble"><textarea rows="3" id="txtSummary" name="Summary" style="overflow: auto; width: 100%;" maxlength="500"></textarea></div></li>
                                </ul>
                            </fieldset>
                        </div>
                        
                        </div>
                        <div data-options="region:'south',split:true,minHeight:230,maxHeight:450" style="height: 230px;
                            border-bottom-width: 0px; border-left-width: 0px; border-right-width: 0px;">
                            <div id="Tab" class="easyui-panel" data-options="title:'测评记录',fit:true,border:false">
                                <table id="GridRecord">
                                </table>
                           </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</asp:Content>


