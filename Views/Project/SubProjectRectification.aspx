<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SubProjectRectification.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.SubProjectRectification" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script src="Resources/Scripts/Project/Views/SubProjectRectification.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/projrolelib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Libs/subrectificationlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Common/projcomlib.js" type="text/javascript"></script>
<script src="Resources/Scripts/Project/Common/projconverter.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function () {
        var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
        var key = '<%= this.Request["key"] %>';
        window.project.SubProjectRectification_aspx.initPage(ajaxContainerSelector, key);
    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="easyui-panel" data-options="border:false,title:'整改方案',fit:true">
        <div class="easyui-layout" data-options="border: false, fit: true">
            <div data-options="region: 'north', border: false" style="overflow: hidden;">
                <div class="datagrid-toolbar">
                    <a id="btnAdd" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-create',plain:true">整改方案模板选择</a><input type="hidden" name="TemplateKey" id="TemplateKey" value="-1" />
                    <a id="btnDown" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-down',plain:true">整改方案生成下载</a>
                    <%--<a id="btnView" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-window',plain:true">整改方案预览</a>--%>
                    <a id="btnSubmit" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true">阶段完结确认</a>
                </div>
            </div>
            <div id="containerPanel" data-options="region: 'center', border: false">
                <div id="divLayout2" class="easyui-layout" data-options="fit:true">
                    <div id="WestMainGrid" data-options="region:'west',split:true, minWidth: 300,maxWidth:800" style="width: 650px; border-left-width: 0px; border-bottom-width: 0px;">
                        <table id="MainGrid">
                        </table>
                    </div>
                    <div id="EastMainGrid" data-options="region:'center'" style=" border-bottom-width: 0px;">
                        <table id="FieldGrid"></table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
