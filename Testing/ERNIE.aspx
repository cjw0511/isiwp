<%@ Page Title="" Language="C#" MasterPageFile="~/Generic.Master" AutoEventWireup="true" CodeBehind="ERNIE.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.ERNIE" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentFeatured" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentHead" runat="server">
    <style type="text/css">
        body
        {
             font-size: 20px;
             background-color: #ffffef;
        }
        .center
        {
            padding: 0px; margin: 0 auto 0 auto;
        }
        #numberList li
        {
            float: left; height: 35px; line-height: 35px; padding: 0px 20px 0px 0px;
            list-style-type: none;
        }
        #numberList li .numberContainer
        {
            width: 100px;
        }
        .numberArea, .btnArea
        {
            width: 100%;
            text-align: center;
        }
        .btnArea
        {
            padding-top: 10px;
        }
        .divNumber
        {
            width: 160px; height: 200px; border-style: solid; border-width: 1px; border-color: #B5B8C8;
            margin: 4px; text-align: center; vertical-align: middle; line-height: 200px;
            font-size: 200px;
        }
        .btnArea input[type="button"]
        {
            width: 160px; height: 80px; font-size: larger; font-weight: bold;
        }
        td
        {
            width: 210px;
        }
    </style>
    <script type="text/javascript">
        $(function () {
            var buildNumberList = function (number) {
                $("#numberList").empty();
                for (var i = 1; i <= number; i++) {
                    $("<li><div class='numberContainer'><input id='ck" + i + "' type='checkbox' value='" + i + "' /><label for='ck" + i + "'>号码" + i + "</label></div></li>").appendTo("#numberList");
                }
            };
            $("#btnBuildNumberList").click(function () {
                if ($("#alternateNumberList").form("validate")) {
                    var number = parseInt($("#txtNumber").val());
                    buildNumberList(number);
                }
            });
            $("#txtNumber").keydown(function (e) {
                if (e.keyCode == 13) { $("#btnBuildNumberList").focus(); e.preventDefault(); }
            });

            $("#btn1").click(function () { $(":checkbox", "#numberList").each(function () { this.checked = true; }); });
            $("#btn2").click(function () { $(":checkbox", "#numberList").each(function () { this.checked = false; }); });
            $("#btn3").click(function () { $(":checkbox", "#numberList").each(function () { this.checked = !this.checked; }); });

            var _run = false;
            var _random = function (array) {
                var r = Math.floor(Math.random() * array.length);
                return array[r];
            };
            var _valueGet = function (value, index, len) {
                var str = value.toString();
                while (str.length < len) { str = "0" + str; }
                return str[index];
            };
            var run = function (array) {
                var set = function () {
                    if (_run) {
                        var value = _random(array);
                        var v1 = _valueGet(value, 0, 3);
                        var v2 = _valueGet(value, 1, 3);
                        var v3 = _valueGet(value, 2, 3);
                        $("#value1").text(v1);
                        $("#value2").text(v2);
                        $("#value3").text(v3);
                        var again = function () { run(array) };
                        if (_run) { window.setTimeout(again, 10); }
                    }
                };
                if (_run) { window.setTimeout(set, 10); }
            };
            var start = function (array) {
                _run = true;
                run(array);
            };
            $("#btnStart").click(function () {
                var cks = $(":checkbox", "#numberList");
                if (cks.length == 0) { alert("请先生成备选号码列表"); return; }
                var ckeds = new Array();
                cks.each(function () { if (this.checked) { ckeds.push(this.value); } });
                if (ckeds.length < 2) { alert("请至少选择两个备选号码"); return; }
                $(":button").each(function () { this.disabled = true; });
                $("#btnStop").each(function () { this.disabled = false; });
                start(ckeds);
            });
            $("#btnStop").click(function () {
                _run = false;
                var set = function () {
                    var v1 = $("#value1").text();
                    var v2 = $("#value2").text();
                    var v3 = $("#value3").text();
                    var num = v1 + v2 + v3;
                    if (num.isNumeric("i")) {
                        num = parseInt(num);
                        $(":checkbox[id='ck" + num + "']", "#numberList").each(function () {
                            this.checked = false;
                        });
                        //alert("恭喜 " + num + " 号选手，您中奖了！");
                    }
                };
                $(":button").each(function () { this.disabled = false; });
                window.setTimeout(set, 50);
            });
        });    
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
<div style="padding-left: 20px; padding-right: 20px;">
    <div>Powerd by: <a href="http://www.chenjianwei.org" target="_blank">陈建伟</a></div>
    <h1 style="font-size: 50px; text-align: center; margin: 0px; padding: 0px;">抽&nbsp;&nbsp;&nbsp;&nbsp;号</h1>
    <fieldset>
        <legend>请在此处设置参与抽号的备选号码</legend>
        <div id="alternateNumberList" class="center">
            请输入需要生成备选号码的数量：
            <input id="txtNumber" class="easyui-validatebox" data-options="required:true,validType:'rangeInteger[2, 999]'" style="width: 120px; height: 20px;" />
            <input id="btnBuildNumberList" type="button" value="生成备选号码列表" style="margin-left: 200px;" />
            <hr />
            <ul id="numberList">
            </ul>
            <div style="float: right;">
                <input id="btn1" type="button" value="全选" />
                <input id="btn2" type="button" value="全清" />
                <input id="btn3" type="button" value="反选" />
            </div>
        </div>
    </fieldset>
    <fieldset>
        <legend>摇号区</legend>
        <table cellpadding="0" cellspacing="0" width="500px" class="center" >
            <tr>
                <td><div id="value1" class="divNumber"></div></td>
                <td><div id="value2" class="divNumber"></div></td>
                <td><div id="value3" class="divNumber"></div></td>
            </tr>
        </table>
    </fieldset>
    <div class="btnArea">
        <input id="btnStart" type="button" value="开始滚号" />
        <input id="btnStop" type="button" value="停止"  />
    </div>
</div>
</asp:Content>
