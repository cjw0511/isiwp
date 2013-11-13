<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectEvaluationPreparation.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectEvaluationPreparation" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Project/Common/officeHelp.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/SubProjectEvaluationPreparation.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Libs/surveytabelib.js" type="text/javascript"></script>
    <style type="text/css">
    .stTable
    {
        font-size: 12px;
        border-collapse:collapse;
        border-right:1px solid #000;
        border-bottom:1px solid #000;
    }
    .stTable thead tr
    {
        background-color:#D9D9D9;
    }
    .stTable tr
    {
        height:30px;
    }
    .stTable td
    {
        border-left:1px solid #000;
        border-top:1px solid #000;
    }
    
    input[type='text'],input[type='text']:hover,input[type="text"]:focus
    {
        width:100%;
        border:none;
        background:transparent;
    }
    textarea[type='text'],textarea[type='text']:hover,textarea[type="text"]:focus
    {
        width:100%;
        height:100px;
        border:none;
        background:transparent;
    }
    </style>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.project.SubProjectEvaluationPreparation_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="easyui-layout" data-options="border: false, fit: true">
        <div data-options="region: 'north',title:'测评准备', border: false" style="height:56px;">
            <div class="datagrid-toolbar">
                <a id="btnDown" class="easyui-linkbutton" data-options="iconCls:'icon-down',plain:true">调查表模版下载</a>
                <a id="btnImport" class="easyui-linkbutton" data-options="iconCls:'icon-export',plain:true">调查表导入</a>
                <a id="btnSubmit" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true">阶段完结确认</a>
            </div>
        </div>
        <div data-options="region: 'center', border: false">
           <div class="easyui-tabs" data-options="tabPosition:'top',scrollIncrement:200,fit:true,border:false,splitline:true,headerWidth:170">
               <div title="单位基本情况">
               <div class="datagrid-toolbar">
               <a id="btnSaveUnitBaseInfo" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table class="stTable" style="width:1000px;">
               <tr>
               <td style="width:100px;text-align:center">单位全称</td><td colspan="8"><input id="UnitFullName" type="text" /></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center">上级主管部门</td><td colspan="8"><input id="SuperiorDept" type="text" /></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center;height:100px;">单位情况简介</td><td colspan="8"><textarea id="UnitSummary" type="text" /></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center">单位详细地址</td><td colspan="3"><input id="UnitAddress" type="text" /></td>
               <td style="width:100px;text-align:center">单位网址</td><td><input id="UnitWebSite" type="text" /></td>
               <td style="width:100px;text-align:center">邮政编码</td><td><input id="ZipCode" type="text" /></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center">责任单位/部门</td><td colspan="3"><input id="ResponsibleDept" type="text" /></td>
               <td style="width:100px;text-align:center">办公地址</td><td colspan="3"><input id="OfficeAddress" type="text" /></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center">单位负责人</td><td><input id="UnitMgr" type="text" /></td>
               <td style="width:100px;text-align:center">职务</td><td><input id="UnitMgrPosition" type="text" /></td>
               <td style="width:100px;text-align:center">办公电话</td><td><input id="UnitMgrTel" type="text" /></td>
               <td style="width:100px;text-align:center">手  机</td><td><input id="UnitMgrPhone" type="text" /></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center">信息化管理负责人</td><td><input id="InfoMgr" type="text" /></td>
               <td style="width:100px;text-align:center">职务</td><td><input id="InfoMgrPosition" type="text" /></td>
               <td style="width:100px;text-align:center">办公电话</td><td><input id="InfoMgrTel" type="text" /></td>
               <td style="width:100px;text-align:center">手  机</td><td><input id="InfoMgrPhone" type="text" /></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center;height:100px;">责任单位/部门职能简介</td><td colspan="8"><textarea id="ResponsibleDeptSummary" type="text" /></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center">部门负责人</td><td><input id="DeptMgr" type="text" /></td>
               <td style="width:100px;text-align:center">办公电话</td><td><input id="DeptMgrTel" type="text" /></td>
               <td style="width:100px;text-align:center">手  机</td><td><input id="DeptMgrPhone" type="text" /></td>
               <td style="width:100px;text-align:center">电子邮件</td><td><input id="DeptMgrEmail" type="text" /></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center">等保工作负责人</td><td><input id="WorkMgr" type="text" /></td>
               <td style="width:100px;text-align:center">办公电话</td><td><input id="WorkMgrTel" type="text" /></td>
               <td style="width:100px;text-align:center">手  机</td><td><input id="WorkMgrPhone" type="text" /></td>
               <td style="width:100px;text-align:center">电子邮件</td><td><input id="WorkMgrEmail" type="text" /></td>
               </tr>
               </table>
               </div>
               </div>
               <div title="信息系统安全管理情况">
               <div class="datagrid-toolbar">
               <a id="btnSaveInfoSystemSafeManageSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="InfoSystemSafeManageSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center" rowspan="2">信息系统名称</td>
               <td style="width:100px;text-align:center" rowspan="2">等保级别</td>
               <td style="width:100px;text-align:center" rowspan="2">业务信息安全保护等级</td>
               <td style="width:100px;text-align:center" rowspan="2">系统服务安全保护等级</td>
               <td style="width:100px;text-align:center" rowspan="2">系统安全管理责任部门</td>
               <td style="text-align:center" colspan="3">系统服务对象范围</td>
               <td style="width:100px;text-align:center" rowspan="2">包含子系统</td>
               <td style="width:100px;text-align:center" rowspan="2"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,9)">添加行</a></td>
               </tr>
               <tr>
               <td style="width:100px;text-align:center">系统建设管理</td>
               <td style="width:100px;text-align:center">系统运维管理</td>
               <td style="width:100px;text-align:center">系统使用管理</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="系统运维安全管理人员情况">
               <div class="datagrid-toolbar">
               <a id="btnSaveInfoSystemSafeManagePersonSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="InfoSystemSafeManagePersonSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center">系统名称</td>
               <td style="width:100px;text-align:center">单位/部门</td>
               <td style="width:100px;text-align:center">姓 名</td>
               <td style="width:100px;text-align:center">工作内容</td>
               <td style="width:100px;text-align:center">职务</td>
               <td style="width:100px;text-align:center">办公电话</td>
               <td style="width:100px;text-align:center">手  机</td>
               <td style="width:100px;text-align:center">邮  箱</td>
               <td style="width:100px;text-align:center">备  注</td>
               <td style="width:100px;text-align:center"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,9)">添加行</a></td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="物理环境情况">
               <div class="datagrid-toolbar">
               <a id="btnSavePhysicalEnvironmentSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="PhysicalEnvironmentSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center">物理环境名称</td>
               <td style="width:100px;text-align:center">物理位置</td>
               <td style="width:100px;text-align:center">涉及信息系统</td>
               <td style="width:100px;text-align:center"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,3)">添加行</a></td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="网络拓扑图">
               <div class="datagrid-toolbar">
               <a id="btnSaveNetTopology" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="NetTopology" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center">网络名称</td>
               <td style="width:100px;text-align:center">备注</td>
               <td style="width:100px;text-align:center"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,2)">添加行</a></td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="网络结构（环境）情况调查">
               <div class="datagrid-toolbar">
               <a id="btnSaveNetStructureSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="NetStructureSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center">网络区域名称</td>
               <td style="width:100px;text-align:center">主要功能和作用描述</td>
               <td style="width:100px;text-align:center">IP网段地址</td>
               <td style="width:100px;text-align:center">服务器数量</td>
               <td style="width:100px;text-align:center">终端数量</td>
               <td style="width:100px;text-align:center">与其连接的其它网络区域</td>
               <td style="width:100px;text-align:center">网络区域之间的边界设备（互联设备）</td>
               <td style="width:100px;text-align:center">管理部门</td>
               <td style="width:100px;text-align:center">备  注</td>
               <td style="width:100px;text-align:center"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,9)">添加行</a></td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="网络区域边界情况调查">
               <div class="datagrid-toolbar">
               <a id="btnSaveNetRegionBoundarySituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="NetRegionBoundarySituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center">区域名称</td>
               <td style="width:100px;text-align:center">边界设备名称及型号</td>
               <td style="width:100px;text-align:center">边界设备IP地址</td>
               <td style="width:100px;text-align:center">所联网络区域</td>
               <td style="width:100px;text-align:center">连接线路种类</td>
               <td style="width:100px;text-align:center">线路带宽</td>
               <td style="width:100px;text-align:center">备  注</td>
               <td style="width:100px;text-align:center"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,7)">添加行</a></td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="网络设备情况调查">
               <div class="datagrid-toolbar">
               <a id="btnSaveNetDevSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="NetDevSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center" rowspan="2">网络设备名称</td>
               <td style="width:100px;text-align:center" rowspan="2">型号</td>
               <td style="width:100px;text-align:center" rowspan="2">IP地址/掩码/网关</td>
               <td style="width:100px;text-align:center" rowspan="2">主要用途</td>
               <td style="width:100px;text-align:center" rowspan="2">所属网络区域</td>
               <td style="width:100px;text-align:center" rowspan="2">管理方式</td>
               <td style="width:100px;text-align:center" rowspan="2">物理位置</td>
               <td style="width:100px;text-align:center" rowspan="2">是否热备</td>
               <td style="text-align:center" colspan="3">重要程度</td>
               <td style="width:100px;text-align:center" rowspan="2"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,11)">添加行</a></td>
               </tr>
               <tr>
               <td style="width:50px;text-align:center">C</td>
               <td style="width:50px;text-align:center">I</td>
               <td style="width:50px;text-align:center">A</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="网络安全设备(软件)情况调查">
               <div class="datagrid-toolbar">
               <a id="btnSaveNetSafeDevSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="NetSafeDevSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center" rowspan="2">网络安全设备名称</td>
               <td style="width:100px;text-align:center" rowspan="2">型号(软件/硬件)</td>
               <td style="width:100px;text-align:center" rowspan="2">IP地址/掩码/网关</td>
               <td style="width:100px;text-align:center" rowspan="2">主要用途</td>
               <td style="width:100px;text-align:center" rowspan="2">物理位置</td>
               <td style="width:100px;text-align:center" rowspan="2">所属网络区域</td>
               <td style="width:100px;text-align:center" rowspan="2">管理方式</td>
               <td style="width:100px;text-align:center" rowspan="2">是否热备</td>
               <td style="text-align:center" colspan="3">重要程度</td>
               <td style="width:100px;text-align:center" rowspan="2"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,11)">添加行</a></td>
               </tr>
               <tr>
               <td style="width:50px;text-align:center">C</td>
               <td style="width:50px;text-align:center">I</td>
               <td style="width:50px;text-align:center">A</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="服务器设备情况调查">
               <div class="datagrid-toolbar">
               <a id="btnSaveServerDevSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="ServerDevSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center" rowspan="2">服务器设备名称</td>
               <td style="width:100px;text-align:center" rowspan="2">型号</td>
               <td style="width:100px;text-align:center" rowspan="2">IP地址/掩码/网关</td>
               <td style="width:100px;text-align:center" rowspan="2">操作系统版本/补丁</td>
               <td style="width:100px;text-align:center" rowspan="2">数据库版本/补丁</td>
               <td style="width:100px;text-align:center" rowspan="2">承载的主要业务应用</td>
               <td style="width:100px;text-align:center" rowspan="2">涉及业务数据</td>
               <td style="width:100px;text-align:center" rowspan="2">物理位置</td>
               <td style="width:100px;text-align:center" rowspan="2">所属网络区域</td>
               <td style="width:100px;text-align:center" rowspan="2">是否热备</td>
               <td style="text-align:center" colspan="3">重要程度</td>
               <td style="width:100px;text-align:center" rowspan="2"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,13)">添加行</a></td>
               </tr>
               <tr>
               <td style="width:50px;text-align:center">C</td>
               <td style="width:50px;text-align:center">I</td>
               <td style="width:50px;text-align:center">A</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="管理终端设备情况调查">
               <div class="datagrid-toolbar">
               <a id="btnSaveTerminalDevSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="TerminalDevSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center" rowspan="2">终端设备名称</td>
               <td style="width:100px;text-align:center" rowspan="2">型号</td>
               <td style="width:100px;text-align:center" rowspan="2">IP地址/掩码/网关</td>
               <td style="width:100px;text-align:center" rowspan="2">操作系统</td>
               <td style="width:100px;text-align:center" rowspan="2">主要用途</td>
               <td style="width:100px;text-align:center" rowspan="2">物理位置</td>
               <td style="width:100px;text-align:center" rowspan="2">所属网络区域</td>
               <td style="text-align:center" colspan="3">重要程度</td>
               <td style="width:100px;text-align:center" rowspan="2"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,10)">添加行</a></td>
               </tr>
               <tr>
               <td style="width:50px;text-align:center">C</td>
               <td style="width:50px;text-align:center">I</td>
               <td style="width:50px;text-align:center">A</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="业务数据情况调查">
               <div class="datagrid-toolbar">
               <a id="btnSaveBusinessDataSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="BusinessDataSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center" rowspan="2">业务数据名称</td>
               <td style="width:100px;text-align:center" rowspan="2">涉及业务应用</td>
               <td style="width:100px;text-align:center" rowspan="2">数据总量及日增量</td>
               <td style="width:100px;text-align:center" rowspan="2">数据存放设备</td>
               <td style="width:100px;text-align:center" rowspan="2">备份方法（在线/离线）</td>
               <td style="width:100px;text-align:center" rowspan="2">备份方式（增量/差异/总量）</td>
               <td style="width:100px;text-align:center" rowspan="2">备份周期</td>
               <td style="width:100px;text-align:center" rowspan="2">是否异地保存</td>
               <td style="text-align:center" colspan="3">重要程度</td>
               <td style="width:100px;text-align:center" rowspan="2">备注</td>
               <td style="width:100px;text-align:center" rowspan="2"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,12)">添加行</a></td>
               </tr>
               <tr>
               <td style="width:50px;text-align:center">C</td>
               <td style="width:50px;text-align:center">I</td>
               <td style="width:50px;text-align:center">A</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="应用系统情况调查">
               <div class="datagrid-toolbar">
               <a id="btnSaveApplicationSystemSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="ApplicationSystemSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center" rowspan="2">应用系统名称</td>
               <td style="width:100px;text-align:center" rowspan="2">处理的业务数据</td>
               <td style="width:100px;text-align:center" rowspan="2">主要用途</td>
               <td style="width:100px;text-align:center" rowspan="2">软件名称</td>
               <td style="width:100px;text-align:center" rowspan="2">中间件名称/版本</td>
               <td style="width:100px;text-align:center" rowspan="2">开发商</td>
               <td style="width:100px;text-align:center" rowspan="2">C/S或B/S模式</td>
               <td style="width:100px;text-align:center" rowspan="2">是否24小时运行</td>
               <td style="width:100px;text-align:center" rowspan="2">现有用户数量</td>
               <td style="text-align:center" colspan="3">重要程度</td>
               <td style="width:100px;text-align:center" rowspan="2"><a href="javascript:void(0)" style="color:Blue;" onclick="window.project.SubProjectEvaluationPreparation_aspx.addRow(this,12)">添加行</a></td>
               </tr>
               <tr>
               <td style="width:50px;text-align:center">C</td>
               <td style="width:50px;text-align:center">I</td>
               <td style="width:50px;text-align:center">A</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="管理类文档情况调查">
               <div class="datagrid-toolbar">
               <a id="btnSaveManageDocumentSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="ManageDocumentSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center">管理类文档要求</td>
               <td style="width:100px;text-align:center">相关文档名称</td>
               <td style="width:100px;text-align:center">备注</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="记录类文档情况">
               <div class="datagrid-toolbar">
               <a id="btnSaveRecordDocumentSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="RecordDocumentSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center">管理类文档要求</td>
               <td style="width:100px;text-align:center">实际记录文件名称</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
               <div title="证据类文档情况">
               <div class="datagrid-toolbar">
               <a id="btnSaveEvidenceDocumentSituation" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true">保存</a>
               </div>
               <div style="padding:10px;">
               <table id="EvidenceDocumentSituation" class="stTable" style="width:1000px;">
               <thead>
               <tr>
               <td style="width:100px;text-align:center">证据类文档要求</td>
               <td style="width:100px;text-align:center">实际证据文件名称</td>
               </tr>
               </thead>
               <tbody>
               </tbody>
               </table>
               </div>
               </div>
           </div>
        </div>
    </div>
</asp:Content>
