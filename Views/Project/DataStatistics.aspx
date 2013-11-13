<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="DataStatistics.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.DataStatistics" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">


    <script src="Resources/Scripts/Project/Libs/subprojectlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Project/Views/DataStatistics.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%=this.Request["key"] %>';
            window.project.DataStatistics_aspx.initPage(ajaxContainerSelector,key);
        });
    </script>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">

        <%--<div class="div_center">
            <fieldset class="datebox-button" style="padding-left:8px;padding-right:8px;padding-top:8px;padding-bottom:70px;height:250px;width:745px;text-align: left;">
                <legend class="panel-title">符合情况信息：</legend>
                <table id="WorkInstrTree" style="height:250px;width:745px;" class="tablecss" cellpadding="0" cellspacing="0">
                    

                </table>
            </fieldset>
        </div>--%>



        <div class="div_center">
            <fieldset class="datebox-button" style="padding-left:8px;padding-right:8px;padding-top:8px;padding-bottom:60px;height:100px;width:745px;text-align: left;">
                <legend class="panel-title">统计结果：</legend>
                <table id="Result" style="height:150px;width:745px;" class="tablecss" cellpadding="0" cellspacing="0">
                    
                </table>
            </fieldset>
        </div>


</asp:Content>
