<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.jeasyui_jdirk_test.WebForm2" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>jeasyui-jdirk-dialog-demo</title>
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
    <script src="../../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.window.js" type="text/javascript"></script>
    <script src="../../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.dialog.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(function () {
            $("#Button1").click(function () {
                $.easyui.showDialog({
                    modal: false,
                    href: "WebForm2.aspx",
                    iniframe: true
                });
            });

            $("#Button11").click(function () { $.easyui.parent.$("#Text1").val($("#Text1").val()); });

            $("#Button12").click(function () { $.easyui.parent.$("#Text2").val($("#Text2").val()); });

            $("#Button13").click(function () { $.easyui.parent.$("#Text3").val($("#Text3").val()); });

            $("#Button14").click(function () { $.easyui.parent.$("#Text4").val($("#Text4").val()); });
        });
    </script>
</head>
<body>
    Text1: <input id="Text1" type="text" /><input id="Button11" type="button" value="setValue1" /><br /><br />
    Text2: <input id="Text2" type="text" /><input id="Button12" type="button" value="setValue2" /><br /><br />
    Text3: <input id="Text3" type="text" /><input id="Button13" type="button" value="setValue3" /><br /><br />
    Text4: <input id="Text4" type="text" /><input id="Button14" type="button" value="setValue4" />
    <hr />
    <input id="Button1" type="button" value="ShowDialog" />
</body>
</html>
