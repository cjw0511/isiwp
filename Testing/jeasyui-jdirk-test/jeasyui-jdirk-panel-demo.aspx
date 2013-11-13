<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jeasyui-jdirk-panel-demo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.jeasyui_jdirk_test.jeasyui_jdirk_panel_demo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>jeasyui-jdirk-panel-demo</title>
    <link href="../../Resources/Plugins/jquery-easyui-1.3.3/themes/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="../../Resources/Plugins/jquery-easyui-1.3.3/themes/icon.css" rel="stylesheet" type="text/css" />
    <link href="../../Resources/Styles/easyui-icons.css" rel="stylesheet" type="text/css" />

    <script src="../../Resources/Plugins/jquery/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="../../Resources/Plugins/jquery-easyui-1.3.3/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../../Resources/Plugins/jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>

    <script src="../../Resources/Scripts/Common/jquery-easyui-plugins/jquery.jdirk.js" type="text/javascript"></script>
    <script src="../../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.js" type="text/javascript"></script>
    <script src="../../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.menu.js" type="text/javascript"></script>
    <script src="../../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.panel.js" type="text/javascript"></script>
    <script src="../../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.dialog.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(function () {
            $("#Button1").click(function () {
                var panel = $("#p1").panel({
                    title: "test panel",
                    width: 600,
                    height: 400,
                    iconCls: "icon-save",
                    iniframe: true,
                    //href: "jeasyui-jdirk-datagrid-demo.aspx",
                    href: "http://www.baidu.com",
                    tools: [
                    { iconCls: "icon-refresh", handler: function () { panel.panel("refresh", "http://www.baidu.com"); } },
                    { iconCls: "icon-ok", handler: function () { alert(panel.panel("iframe").length); } }
                ]
                });
            });

            $("#Button2").click(function () {
                var p = $("#p1"), opts = p.panel("options");
                p.panel($.extend({}, opts, { iconCls: opts.icon ? opts.icon : undefined }));
            });
        });
    </script>
</head>
<body style="margin: 0px; padding: 0px;">
    <input id="Button1" type="button" value="InitPanel" />
    <input id="Button2" type="button" value="InitPanel2" />
    <hr />
    <div id="p1">
    </div>
</body>
</html>
