<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm_jEasyUIDesktop.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.WebForm_jEasyUIDesktop" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Resources/Plugins/jquery-easyui-1.3.3/themes/icon.css" rel="stylesheet" type="text/css" />
    <link href="../Resources/Plugins/jquery-easyui-1.3.3/themes/default/easyui.css" rel="stylesheet" type="text/css" />
    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/utilitybootstrap.js" type="text/javascript"></script>
    <%--<script src="../Resources/Plugins/jquery/jquery-2.0.0.js" type="text/javascript"></script>--%>
    <script src="../Resources/Plugins/jquery/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="../Resources/Plugins/jquery-easyui-1.3.3/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../Resources/Scripts/Common/jquery-easyui-plugins/jquery-easyui-desktop/jquery.deskapp.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript">
        var _equalsCompare = function (item1, item2) { return item1 == item2; };
        ////////////////////////////////////////////////
        /// 确认两个 javascript 对象是否等值，该函数定义如下参数:
        ///     item1: 待比较的对象1；
        ///     item2: 待比较的对象2，用于和对象1进行比较；
        ///     compare: 用于比较运算的函数，该函数用于比较 item1 是否与 item2 等值；该函数返回一个 bool 值；这是一个可选参数。
        ///         该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
        ///         如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
        /// 返回值：如果 item1 与 item2 等值，则返回 true，否则返回 false。
        ////////////////////////////////////////////////
        Object.equals = function (item1, item2, compare) {
            var isFunc = window.isFunction(compare);
            if (!isFunc) { compare = _equalsCompare; }
            return compare.call(this, item1, item2) == true;
        };

        Object.compare = function (item1, item2, compare) {
            var isFunc = window.isFunction(compare);
            if (!isFunc) { compare = _numericCompare; }
            return compare.call(this, item1, item2);
        };

        $(function () {
            'use strict';
            var a = new Date("2010/01/01");
            var b = new Date("2010/05/01");
            //            alert(a);
            //            alert(b);
            //            alert(b - a);

            var c = new Date("2010-05-01");
            var array1 = new Array();
            var array2 = [];
            var array3 = [1, 2, 3, 4];
            alert(array1.push == array3.push);
            alert(window.type([]));
        });
    </script>
</head>
<body style="padding: 0px; margin: 0px;" class="easyui-layout" data-options="fit: true">
    <div data-options="region: 'north', border: false">
        <div class="datagrid-toolbar">
            <a id="A1" class="easyui-linkbutton" data-options="plain: true, iconCls: 'icon-save'" >测试按钮1</a>
            <a id="A2" class="easyui-linkbutton" data-options="plain: true, iconCls: 'icon-save'" >测试按钮2</a>
            <a id="A3" class="easyui-linkbutton" data-options="plain: true, iconCls: 'icon-save'" >测试按钮3</a>
        </div>
    </div>
    <div data-options="region: 'center', border: false">
        <div id="d" class="easyui-deskapp" data-options="fit: true" >
            
        </div>
    </div>

</body>
</html>
