<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="BlankTab.aspx.cs" Inherits="ISIWP.Platform.WebClient.BlankTab" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var fn = function () {
                $(".easyui-layout:first", ajaxContainerSelector).panelResize(function (width, height) {
                    $("#tabWidth", ajaxContainerSelector).val(width);
                    $("#tabHeight", ajaxContainerSelector).val(height);
                });
                $(".easyui-layout:first", ajaxContainerSelector).panelResize();
            };
            window.call(fn);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="easyui-layout" data-options="fit: true, border: false">
        <div data-options="region: 'north', noheader: true, border: false">
            你好<%= this.MasterAjaxContainerID%><br />
            这是一个默认的新建选项卡"BlankTab.aspx";
            <br /><br />
            当前tab宽度：<input id="tabWidth" type="text" /><br /><br />
            当前tab高度：<input id="tabHeight" type="text" /><br /><br />
        </div>
        <div data-options="region: 'center', noheader: true, border: false">
            <div class="easyui-layout" data-options="fit: true">
                <div data-options="region: 'north', title: 'north', split: true, minHeight: 50, maxHeight: 300" style="height: 100px;"></div>
                <div data-options="region: 'west', title: 'west', split: true, minWidth: 50, maxWidth: 300" style="width: 100px;"></div>
                <div region="center" title="center"></div>
                <div region="east" title="east" split="true" style="width: 100px;"></div>
                <div region="south" title="south" split="true" style="height: 100px;"></div>
            </div>
        </div>
    </div>
</asp:Content>
