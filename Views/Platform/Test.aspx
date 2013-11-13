<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Test.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.Test" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../Resources/Plugins/jquery-easyui-1.3.2/themes/default/easyui.css" rel="stylesheet" type="text/css" />
    <link href="../../Resources/Plugins/jquery-easyui-1.3.2/themes/icon.css" rel="stylesheet" type="text/css" />
    
    <script src="../../Resources/Plugins/jquery-easyui-1.3.2/jquery-1.8.0.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="../../Resources/Plugins/jquery-easyui-1.3.2/jquery.easyui.min.js"></script>
    <link href="../../Resources/Plugins/jquery-easyui-1.3.2/plugins/jquery-easyui-portal/portal.css" rel="stylesheet" type="text/css" />
    <script src="../../Resources/Plugins/jquery-easyui-1.3.2/plugins/jquery-easyui-portal/jquery.portal.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            $("#pp").portal({
                border: false
            });
        });
    </script>
</head>
<body>

<div class="datagrid-toolbar" style="height: 28px;">
        <a id="a_set" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-create'">设置</a>
        <a id="a_expand" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">展开</a>
        <a id="a_collapse" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'">折叠</a>
        <a id="a_refresh" href="javascript:void(0)" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'">刷新</a>
    </div> 
    <div id="pp">
        <div style="width:30%;">
            <div title="我的任务" data-options="height: 220,collapsible: true,closable: true"></div>
            <div title="我的任务" data-options="height: 220,collapsible: true,closable: true"></div>
            <div title="我的任务" data-options="height: 220,collapsible: true,closable: true"></div>
        </div>
        <div style="width:30%;"></div>
        <div style="width:30%;"></div>
	</div>

</body>
</html>
