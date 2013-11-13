<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="WebForm7_ShowDialog.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.WebForm7_ShowDialog" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            $("#btn1", ajaxContainerSelector).click(function () {
                var pos = $(this).offset();
                $.extend(pos, { top: pos.top + 10, left: pos.left + 10 });
                var opts = {
                    onSave: function (dialog) {
                        var opts = $(dialog).panel("options");
                        alert(opts.height);
                    },
                    autoCenter: false
                };
                var dialog = $.plugin.showDialog(opts);
                $(dialog.dialog).panel("move", pos);
            });
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <input id="btn1" type="button" value="ShowDialog" />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />
    asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfas<br />asdfasddddd11
</asp:Content>
