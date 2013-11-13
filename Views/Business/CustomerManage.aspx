<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true"
    CodeBehind="CustomerManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.CustomerManage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Libs/Customerlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/CustomerManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.business.CustomerManage_aspx.initPage(ajaxContainerSelector);
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
<div id="cc" class="easyui-layout" data-options="fit:true">
    <div data-options="region:'west',split:true,minWidth:500,maxWidth:750" style="width: 500px; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px;">
        <div id="tt" class="easyui-panel" data-options="title:'客户信息管理',fit:true,border:false" >
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region: 'north',border:false">
                    <div class="datagrid-toolbar" style="height: 27px;">
                        &nbsp;客户名称：<input type="text" id="txtNameSearch" />
                        <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a> 
                        <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                    </div>
                </div>
                <div data-options="region: 'center',border:false">
                    <table id="CusGrid">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div data-options="region: 'center',border:false">
        <div id="pp" class="easyui-layout" data-options="fit:true" >
            <div data-options="region:'center'" style="border-top-width: 0px; border-right-width: 0px;">
                <div class="easyui-panel" data-options="title:'客户基本资料',fit:true,border:false" >
                    <div id="tool" class="easyui-panel datagrid-toolbar" data-options="closed:true"><a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                    <a id="btnRefresh" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a> </div>
                    <fieldset id="customertab" class="datebox-button" style="padding: 8px; margin:10px; height: auto; text-align: left;">
                        <legend class="panel-title">客户基本资料：</legend>
                        <ul class="liform">
                        <li class="lirow"><div class="liright">客户名称<span class="required">*</span>：</div><div class="lidouble"><input type="text" id="txtName" name="Name" maxlength="50" style=" width: 100%;" /></div></li>
                        <%--<li><div class="liright">客户编号<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtCode" name="Code" maxlength="50" /></div></li>--%>
                        <li><div class="liright">客户简称：</div><div class="lileft"><input type="text" id="txtShortName" name="ShortName" maxlength="50" /></div></li>
                        <li><div class="liright">法人代表姓名：</div><div class="lileft"><input type="text" id="txtLegalRepName" name="LegalRepName" maxlength="50" /></div></li>
                        <li><div class="liright">行业类型：</div><div class="lileft"><select id="selIndustryType" name="IndustryType"></select></div></li>
                        <li><div class="liright">安全责任部门：</div><div class="lileft"><input type="text" id="txtSecurityDepartment" name="SecurityDepartment" maxlength="50" /></div></li>
                        <li><div class="liright">客户类型：</div><div class="lileft"><select id="selCustomerType" name="CustomerType"></select></div></li>
                        <li><div class="liright">联系电话：</div><div class="lileft"><input type="text" id="txtTel" name="Tel" /></div></li>
                        <li><div class="liright">邮政编码：</div><div class="lileft"><input type="text" id="txtZipCode" name="ZipCode" /></div></li>
                        <li><div class="liright">联系地址：</div><div class="lileft"><input type="text" id="txtAddress" name="Address" maxlength="100" /></div></li>
                        <li><div class="liright">传真：</div><div class="lileft"><input type="text" id="txtFax" name="Fax" /></div></li>
                        <li><div class="liright">电子邮箱：</div><div class="lileft"><input type="text" id="txtEmail" name="Email" /></div></li>
                        <li class="lirow"><div class="liright">客户信息说明：</div><div class="lidouble"><textarea id="txtSummary" name="Summary" rows="3" style="overflow: auto; width: 100%;" maxlength="500"></textarea></div></li>
                        <li class="lirow"><div class="liright">客户信息描述：</div><div class="lidouble"><textarea id="txtDescription" name="Description" rows="3" style="overflow: auto; width: 100%;" maxlength="500"></textarea></div></li>
                        <li class="lirow"><div class="liright">备注信息：</div><div class="lidouble"><textarea id="txtRemark" name="Remark" rows="3" style="overflow: auto; width: 100%;" maxlength="500"></textarea></div></li>
                        </ul>
                    </fieldset>                
                </div>
            </div>
            <div data-options="region:'south',split:true,minHeight:200,maxHeight:400" style="height: 200px; border-bottom-width: 0px; border-right-width: 0px;">
                <div class="easyui-tabs" data-options="fit:true,border:false">
                    <div title="客户联系人">
                        <table id="ConGrid">
                        </table>
                    </div>
                    <div title="客户信息系统">
                        <table id="InfGrid">
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
