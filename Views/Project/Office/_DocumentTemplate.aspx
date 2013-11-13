<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="_DocumentTemplate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Project.Office._DocumentTemplate" %>

<%@ Register TagPrefix="sz" Namespace="ISIWP.OfficeControl" Assembly="ISIWP.OfficeControl" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>文档模版</title>
    <link href="style/office.css" rel="stylesheet" type="text/css" />
    <script src="../../../Resources/Plugins/jquery/jquery-2.0.0.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            $("#btnSave").click(function () {
                var _templateKey = new String('<%= this.Request["templateKey"] %>');
                office.save({ templateKey: escape(_templateKey), templateName: escape($("#txtTemplateName").val()) }, function (msg) { alert(msg) });
            });
        });
    </script>
    <script type='text/javascript' for='FramerControl1' event='NotifyCtrlReady'>
        var _templateKey = new String('<%= this.Request["templateKey"] %>');
        office.open({templateKey:_templateKey});
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div >
    <table cellspacing="0" class="tablecss" style="width:100%;">
        <tr>
        <td class="tdLeft" style="width:110px;">标&emsp;题
        </td>
        <td><input id="txtTemplateName" runat="server" type="text" class="in" />
        </td>
        </tr>
        <tr>
        <td class="tdLeft">时&emsp;间
        </td>
        <td><span id="spnDate" runat="server" ></span>
        </td>
        </tr>
        <tr>
        <td class="tdLeft">状&emsp;态
        </td>
        <td><span id="spnState" runat="server" ></span>
        </td>
        </tr>
        <tr>
            <td valign="top" style="width:112px;text-align:center;">
            <span style="color:Red;">[功能菜单]</span><br />
            <input id="btnOpen" class="btnOffice" type="button" value="导入文档" onclick="office.importFile()" /><br />
            <input id="btnSaveAs" class="btnOffice" type="button" value="导出文档" onclick="office.exportFile()" /><br />
            <input id="btnSave" class="btnOffice" type="button" value="保存文档" /><br />
            <input id="btnClose" class="btnOffice" type="button" value="关闭窗口" onclick="office.close();" /><br />
            <br />
            <input id="btnPageSet" class="btnOffice" type="button" value="页面设置" onclick="office.pageSet()" /><br />
            <input id="btnPrePrint" class="btnOffice" type="button" value="打印预览" onclick="office.prePrint()" /><br />
            <input id="btnPrint" class="btnOffice" type="button" value="打印" onclick="office.print()" /><br />
            <br />
            </td>
            <td>
            <sz:Office runat="server" ID="FramerControl1" HandlerUrl="Services/Project/Office/_DocumentTemplateHandler.ashx" style="width: 100%;height: 1000px;" ></sz:Office>
            </td>
        </tr>
    </table>
    </div>
    </form>
</body>
</html>
