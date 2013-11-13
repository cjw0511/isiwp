<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="WebForm1_InnerAjaxPageForm.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.WebForm1_InnerAjaxPageForm" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var resize = function (width, height) {
                $("#txtWidth", ajaxContainerSelector).val(width);
                $("#txtHeight", ajaxContainerSelector).val(height);
            };
            var fn = function () {
                $("#txtWidth", ajaxContainerSelector).panelResize(resize);
                $("#txtWidth", ajaxContainerSelector).panelResize();
            };
            window.call(fn);


            $("#btn1", ajaxContainerSelector).click(function () {
                $("#searchbox", ajaxContainerSelector).searchbox("setIcon", "icon-ok");
            });

        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
    <a id="btnClear" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-undo'">清空</a>
    <a id="A1" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-undo'">清空</a>
    <a id="A2" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-undo'">清空</a>
    <a id="A3" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-undo'">清空</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    width: <input id="txtWidth" type="text" /><br />
    height: <input id="txtHeight" type="text" /><br />
    <hr />
    <br />
    
    <input id="searchbox" class="easyui-searchbox" data-options="iconCls:'icon-save'" />
    <input id="btn1" type="button" value="setIcon" />

    <br /><br />
    <hr />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />
    asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadf<br />asdfsadfddd<br />
</asp:Content>
