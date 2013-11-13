<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm_JDiskTest_Iframe.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.WebForm_JDiskTest_Iframe" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>WebForm JDirk Test</title>
    <link href="../Resources/Plugins/jquery-easyui-1.3.3/themes/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="../Resources/Plugins/jquery-easyui-1.3.3/themes/icon.css" rel="stylesheet" type="text/css" />

    <script src="../Resources/Plugins/jquery/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery.jdirk.js" type="text/javascript"></script>

    <script src="../Resources/Plugins/jquery-easyui-1.3.3/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../Resources/Plugins/jquery-easyui-1.3.3/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-extensions/jeasyui.extensions.js" type="text/javascript"></script>

    <script type="text/javascript" language="javascript">
        $(function () {
            var form = $("#form1");
            var elements = $("*", form).add(form);
            elements.each(function () {
                //alert($(this).attr($.util.uniqueIdName));
            });

            $("#btn1").click(function () { $("#win1").parent().shine(); });

            $("#btn2").click(function () {
                var array = $("*", "#win1").add("#win1").serializeArray();
                alert(array.length);
                $.each(array, function () {
                    var html = $("#TextArea1").html();
                    $("#TextArea1").append("<br />" + this.name + ":" + this.value);
                });
            });

            $("#btn3").click(function () {
                var width = $("#Text1").val();
                var height = $("#Text2").val();
                var left = $("#Text3").val();
                var top = $("#Text4").val();
                $.util.windowSize(parseInt(width), parseInt(height));

                $.each($.util.windowPosition(), function (name, value) {
                    $("#TextArea1").append("<br />" + name + ":" + value);
                });
            });

            $("#btn4").click(function () { $.messager.show("你好"); });


            $("#btn5").click(function () {
                $.ajax({
                    url: "../Services/Project/MappingService.asmx/GetSubProjRoleEmpBySubProjKey"
                });
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <input id="ck1" type="checkbox" checked="checked" />
    <label for="ck1">ck1</label>
    <hr />
    <input id="btn1" type="button" value="shine-window" />
    <input id="btn2" type="button" value="serializeArray" />
    <input id="btn3" type="button" value="windowOffset" />
    <input id="btn4" type="button" value="showMessage" />
    <input id="btn5" type="button" value="jQueryAjaxTest" />
    <hr />
    <textarea id="TextArea1" cols="100" rows="10"></textarea>
    <div id="win1" class="easyui-window" data-options="width: 300, height: 200" >
        <input id="Text1" name="txt1" type="text" />
        <input id="Text2" name="txt2" type="text" />
        <input id="Text3" name="txt3" type="text" />
        <input id="Text4" name="txt4" type="text" />
    </div>
    </form>
</body>
</html>
