<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="jeasyui-jdirk-dialog-demo2.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.jeasyui_jdirk_test.jeasyui_jdirk_dialog_demo2" %>

    <script type="text/javascript">
        $(function () {
            $("#Button31").click(function () {
                var dia = $.easyui.showDialog({
                    modal: false,
                    href: "WebForm1.aspx",
                    iniframe: true
                });
            });

            $("#Button32").click(function () { alert($("#Text1").val()); });
            $("#Button33").click(function () { alert($("#Text1").validatebox("isValid")); });
        });
    </script>

    <input id="Button31" type="button" value="ShowDialog" />
    <hr />
    Text1: <input id="Text1" type="text" class="easyui-validatebox" data-options="prompt: '请输入...', required: true" />
    <span style="display: block;">asdfasdf</span>
    <br /><br />
    Text2: <input id="Text2" type="text" /><br /><br />
    Text3: <input id="Text3" type="text" /><br /><br />
    Text4: <input id="Text4" type="text" /><br /><br />
    <hr />
    <input id="Button32" type="button" value="GetText1Value" />
    <input id="Button33" type="button" value="ValidateText1Value" />
