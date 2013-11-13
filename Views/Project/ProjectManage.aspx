<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="ProjectManage.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.ProjectManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    
<script src="Resources/Scripts/Project/Libs/employeelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/planprojectlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/projectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/ProjectManage.js" type="text/javascript"></script>
    <script src="Resources/Plugins/jquery-easyui-datagridview/datagrid-detailview.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";

            window.project.ProjectManage_aspx.initPage(ajaxContainerSelector);
        });
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div id="ProjLayout" class="easyui-layout" data-options="fit:true"> 
    
        <div id="ProjPanel" >
            <div class="easyui-layout" data-options="fit:true">
                <div data-options="region:'north',border:false">
                    <div class="datagrid-toolbar" style="height:27px;">
                        &nbsp;&nbsp;项目名称：<input type="text" id="txtName" style="width: 170px;" />
                        &nbsp;&nbsp;项目进度：<select id="selProgress" style="width: 170px;"></select>
                        <a id="btnSearch" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">查询</a>
                        <a id="btnReset" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true">清空</a>  
                    </div>
                </div>
                <div data-options="region:'center',border:false">
                    <table id="ProjGrid">
                    </table>
                </div>
            </div>
        </div>
    
</div>
</asp:Content>