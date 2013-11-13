<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="DataDictionaryMasterAdd.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.DataDictionaryMasterAdd" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <style type="text/css">
    .tleft
    {
        text-align:right;
        width:70px;
    }
    </style> 
    <script src="Resources/Scripts/Platform/Libs/dataDictionarylib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/DataDictionaryMasterAdd.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.DataDictionaryMasterAdd_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
<div class="div_center">
    <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">数据字典类别：</legend>
        <table class="tablecss" cellpadding="0" cellspacing="0">
        <tr><td class="tleft">名称<span class="required">*</span>：</td><td><input type="text" id="txtName" name="Name" style="width:400px" maxlength="50" /></td></tr>
        <tr><td class="tleft">编号<span class="required">*</span>：</td><td><input type="text" id="txtCode" name="Code" style="width:400px" maxlength="20" /></td></tr>
        <tr><td class="tleft">描述：</td><td><input type="text" id="txtDescription" name="Description" style="width:400px" maxlength="200" /></td></tr>
        <tr><td class="tleft" style="vertical-align:baseline;padding-top:5px;">简介：</td><td style="padding-top:3px;">
            <textarea id="txtSummary" name="Summary" rows="4" style="width:400px" maxlength="500"></textarea></td></tr>
        </table>
    </fieldset>
</div>
</asp:Content>