<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ContractManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.ContractManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">

<script src="Resources/Scripts/Business/Libs/customerlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/planprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/biddinglib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/userlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Platform/Common/comlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/contractlib.js" type="text/javascript"></script>

    <script src="Resources/Scripts/Business/Views/ContractManage.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";

            window.business.ContractManage_aspx.initPage(ajaxContainerSelector);
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
<%--<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
</asp:Content>--%>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">





<div id="ContractLayout" class="easyui-layout" data-options="fit:true"> 
    <div data-options="region:'west',split:true, minWidth: 530, maxWidth: 570" style="width:530px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
        <div id="ContractPanel" >
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'north',border:false">
                    <div class="datagrid-toolbar" style="height:54px;">
                        &nbsp;客户：<select id="selCustomer2"></select>
                           &nbsp;合同类型：<select id="selContractType2"></select>
                            &nbsp;合同名称：<input type="text" id="txtContractName2" />
                            <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                            <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                    </div>
                </div>
                <div data-options="region:'center',border:false">
                    <table id="ContractGrid">
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div data-options="region:'center'" style="border-top-width:0px;border-bottom-width:0px;">
        <div class="easyui-panel" data-options="title: '合同信息详情',fit:true,border:false">
            <div class="easyui-layout" data-options="border: false, fit: true">
            <div data-options="region: 'north', border: false" style="overflow: hidden;">
                <div class="datagrid-toolbar">
                
                <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
                
                </div>
            </div>
            <div data-options="region: 'center', border: false">
            <div class="div_center">
                <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <legend class="panel-title">合同资料：</legend>
                <ul class="liform">
                    <li class="lirow"><div class="liright">合同名称<span class="required">*</span>：</div><div class="lidouble"><input type="text" id="txtName1" name="Name" style="width:100%" maxlength="50" /></div></li>
                    <li><div class="liright">编号<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtCode1" name="Code" maxlength="50" /></div></li>
                    <%--<li><div class="liright">关联客户<span class="required">*</span>：</div><div class="lileft"><input id="txtCustomer5" /><input type="hidden" id="CustomerKey5" name="CustomerKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="a_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>--%>
                    <%--<li><div class="liright">关联计划项目<span class="required">*</span>：</div><div class="lileft"><input id="txtPlanProject5" /><input type="hidden" id="PlanProjectKey5" name="PlanProjectKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="b_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>--%>
                    <li><div class="liright">关联投标<span class="required">*</span>：</div><div class="lileft"><input id="txtBidding5" /><input type="hidden" id="BiddingKey5" name="BiddingKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="j_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>
                    <li><div class="liright">我方负责人<span class="required">*</span>：</div><div class="lileft"><input id="txtEmployee5" /><input type="hidden" id="EmployeeKey5" name="EmployeeKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="d_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>
                    <li><div class="liright">入档编号：</div><div class="lileft"><input type="text" id="txtIntoFileCode1" name="IntoFileCode" maxlength="50" /></div></li>
                    <li><div class="liright">入档时间<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtIntoFileDate1" name="IntoFileDate" /></div></li>
                    <li><div class="liright">合同类型<span class="required">*</span>：</div><div class="lileft"><select id="selContractType1" name="ContractType"></select></div></li>
                    <li><div class="liright">合同原件数量<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtContractSum1" name="ContractSum" /></div></li>
                    <li><div class="liright">撰写人<span class="required">*</span>：</div><div class="lileft"><input id="txtWriter1" /><input type="hidden" id="WritersKey1" name="WritersKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="e_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>
                    <li><div class="liright">签订人<span class="required">*</span>：</div><div class="lileft"><input id="txtSigner1" /><input type="hidden" id="SignKey1" name="SignKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="f_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>
                    <li><div class="liright">签订时间<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtSignDate1" name="SignDate" /></div></li>
                    <li><div class="liright">签订金额<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtSignTotal1" name="SignTotal" /></div></li>
                    <li><div class="liright">合同移交人<span class="required">*</span>：</div><div class="lileft"><input id="txtTransfer1" /><input type="hidden" id="TransferKey1" name="TransferKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="g_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>
                    <li><div class="liright">合同接收人<span class="required">*</span>：</div><div class="lileft"><input id="txtReceive1" /><input type="hidden" id="ReceiveKey1" name="ReceiveKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="h_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>
                    <li><div class="liright">审核人<span class="required">*</span>：</div><div class="lileft"><input id="txtAudit1" /><input type="hidden" id="AuditKey1" name="AuditKey" /></div>
                    <div class="lileft"><a href="javascript:void(0)" class="easyui-linkbutton" id="i_clear" data-options="iconCls:'icon-undo',plain:true" title="点击按钮，清空所选项"></a></div></li>
                    <li><div class="liright">合同生效日期<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtStartDate1" name="StartDate" /></div></li>
                    <li><div class="liright">合同有效期<span class="required">*</span>：</div><div class="lileft"><input type="text" id="txtOffDate1" name="OffDate" /></div></li>
                    <li><div class="liright">合同是否有效<span class="required">*</span>：</div><div class="lileft"><select id="selIsValid1" name="IsValid"></select></div></li>
                    <li><div class="liright">合同是否存档<span class="required">*</span>：</div><div class="lileft"><select id="selIsArchive1" name="IsArchive"></select></div></li>
                    <li class="lirow"><div class="liright">合同基本内容：</div><div class="lidouble"><textarea id="txtSummary1" name="Summary" rows="3" style="width:100%"></textarea></div></li>
                    <li class="lirow"><div class="liright">合同信息简介：</div><div class="lidouble"><textarea id="txtRemark1" name="Remark" rows="3" style="width:100%"></textarea></div></li>
                </ul>
            </fieldset>
            </div>
            </div>
            <%--<div data-options="region:'south',split:true,minHeight:180,maxHeight:230" style="height: 180px; border-bottom-width: 0px; border-right-width: 0px;">
                <div class="easyui-tabs" data-options="fit:true,border:false">
                    <div title="关联合同信息">
                        <table id="ContractGrid">
                        </table>
                    </div>
                    <div title="关联项目计划书">
                        <table id="PlanFileGrid">
                        </table>
                    </div>
                </div>
            </div>--%>
            </div>
        </div>

        
            
    </div>





</div>




<%--<div id="divLayout" class="easyui-layout" data-options="fit:true">
        <div data-options="region:'west',split:true,title:'合同信息管理',minWidth: 560, maxWidth: 570" style="width:560px;border-top-width:0px;border-left-width:0px;border-bottom-width:0px;">
            <div class="easyui-panel" data-options="fit:true,border:false" >
                <div class="easyui-layout" data-options="border:false,fit:true">
                    <div data-options="region: 'north',border: false" style="overflow:hidden">
                        <div class="datagrid-toolbar" style="height:54px">
                            &nbsp;&nbsp;客&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：<select id="selCustomer"></select>
                            &nbsp;&nbsp;合同类型：<select id="selContractType"></select>
                            &nbsp;&nbsp;合同名称：<input type="text" id="txtContractName" />
                            <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                            <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>
                        </div>
                    </div>
                    <div data-options="region:'center',border: false">
                        <table id="ContractGrid"></table>
                    </div>
                </div>
            </div>
        </div>  
        <div data-options="region:'center'" style="width:270px;border-width:0px;border-width:0px;border-width:0px;">
            <div class="easyui-layout" data-options="fit:true">
                <div id="ContractDetails" data-options="region:'center',split:true,title:'合同信息详情',href:'Views/Business/ShowContractAdd.aspx'" style="border-top-width: 0px;"></div>
                <div data-options="region:'south',split:true,minHeight:150,maxHeight:250,title:'合同跟进'" style="height: 200px; border-bottom-width: 0px;">
                    
                </div>
            </div>
        </div>
  </div>--%>







</asp:Content>
