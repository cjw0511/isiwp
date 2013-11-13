<%@ Page Title="主功能页面" Language="C#" MasterPageFile="~/ValidateLoginStatus.Master" AutoEventWireup="true" CodeBehind="MainForm.aspx.cs" Inherits="ISIWP.Platform.WebClient.MainForm" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentFeatured" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentHead" runat="server">
    <link rel="Stylesheet" type="text/css" href="Resources/Styles/Platform/MainForm.css" />
    <script type="text/javascript" language="javascript" src="Resources/Scripts/Platform/mainForm.js"></script>
    <script type="text/javascript" language="javascript" src="Resources/Scripts/Platform/Common/authmenus.js"></script>
    <script type="text/javascript" language="javascript">
        $(function () {
            window.beginAutoRefreshNowTimeLabel();
            window.addHomeTab();

            window.bindMainTabsButtonsEvent();
            window.bindMainFormButtonBarEvent();
            window.bindWestMenuNavigationBarButtonsEvent();
            window.bindMenuData();
            window.bindWindowResizeEvent();

            window.onerror = function () {
                $.plugin.messager.progress("close");
            };
            //            window.onbeforeunload = function () {
            //                return "您确定要重新加载或离开本页面？\n如果您选择重新加载或者离开本页面，则您当前未保存的数据将会丢失.";
            //            };
        });
    </script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
<div style="width: 100%; height: 100%; min-width: 900px; min-height: 500px; overflow: hidden;">
<div id="mainLayout" class="easyui-layout" data-options="fit: true">
    <div id="north" data-options="region: 'north'" style="height: 80px; overflow:hidden; border-top-width: 0px; border-left-width: 0px; border-right-width: 0px;">
        <div id="topbar" style="width: 100%; height: 50px;color:#fff;background-image:url('Resources/Images/Platform/blackground/bg_top.jpg');background-position:center;">
            <div id="topbanner" style="position: absolute; top: 0px; left: 0px;width: 800px; height:50px;">
                <span style="font-size: x-large; line-height: 50px; font-weight: bold; padding-left: 10px;">
                    信息安全保护智能评估工作管理系统
                </span>
            </div>
            <div id="divNowTime" style="position: absolute; padding: 5px; right: 5px; z-index: 100;">
                <span>当前时间：</span>
                <label id="nowTime"></label>
            </div>
            <div style="top: 25px; position: absolute; right: 5px; width: 250px;">
                <div>
                    <span>更改皮肤风格：</span>
                    <select id="themeSelector" class="easyui-combobox" name="themeSelector" style="width: 135px;">
                        <option value="default" selected="selected">默认(天空蓝,推荐)</option>
                        <option value="black" >金属黑(推荐)</option>
                        <option value="bootstrap" >银色</option>
                        <option value="gray" >灰霾(推荐)</option>
                        <option value="jquery-easyui-themes/cupertino" >清泉</option>
                        <option value="jquery-easyui-themes/dark-hive" >黑色蜂巢</option>
                        <option value="jquery-easyui-themes/pepper-grinder" >杏黄</option>
                        <option value="jquery-easyui-themes/sunny" >阳光</option>
                        <option value="metro" >磁贴（白）</option>
                        <option value="jquery-easyui-themes-metro/metro-blue" >磁贴（蓝）</option>
                        <option value="jquery-easyui-themes-metro/metro-gray" >磁贴（灰）</option>
                        <option value="jquery-easyui-themes-metro/metro-green" >磁贴（绿）</option>
                        <option value="jquery-easyui-themes-metro/metro-orange" >磁贴（橙）</option>
                        <option value="jquery-easyui-themes-metro/metro-red" >磁贴（红）</option>
                    </select>
                </div>
                <div id="btnHideNorth" class="panel-tool">
                    <a href="javascript:void(0);" class="layout-button-up" title="隐藏顶部栏" ></a>
                </div>
            </div>
        </div>
        <div id="toolbar" class="panel-header" style="position: absolute; font-weight: normal; width: 100%; height: 27px; top: 50px; left: 0px; padding: 0px; padding-top: 1px; margin: 0px; border-left-width: 0px; border-right-width: 0px; z-index: 600;">
            <div id="infobar" style="position: absolute; width: 400px; left: 0px; padding-top: 0px;">
                <span style="padding-left: 5px;">
                    <span class="icon-user" style="background-position: left; padding-left: 15px;">
                        <span id="lblLoginCode" class="infobarspan" title="用户工号(登录编号)">登录编号</span>,
                        <span id="lblLoginDepartment" class="infobarspan" title="所在部门">所在部门</span>,
                        <span id="lblUserName" class="infobarspan" title="用户名称">用户名称</span>,
                        <span class="infobarspan">欢迎您！</span>
                    </span>
                </span>
            </div>
            <%--<div id="searchbar" style="position: absolute; width: 360px; left: 300px; padding-top: 0px;">
                <input id="mainSearchBox" class="easyui-searchbox" data-options="width:350,height:26,prompt:'您输入您要查找的内容关键词',menu:'#searchboxTypeMenu'" />
	            <div id="searchboxTypeMenu" style="width:80px">
		            <div data-options="name:'0', iconCls: 'icon-select'">查询类型</div>
		            <div data-options="name:'1'">测试类型1</div>
                    <div data-options="name:'2'">测试类型2</div>
                    <div data-options="name:'3'">测试类型3</div>
                    <div data-options="name:'4'">测试类型4</div>
	            </div>
            </div>--%>
            <div id="buttonbar" style="position: absolute; width: 600px; float: right; text-align:right; right: 2px; padding-top: 0px;">
                <div>
                    <a name="a_bug" class="easyui-linkbutton" href="javascript:void(0);" data-options="plain:true,iconCls: 'icon-help'" title="Bug提交">Bug提交/建议</a>
                    <a name="a1" class="easyui-linkbutton" href="javascript:void(0);" data-options="plain:true,iconCls: 'icon-home'" title="打开或跳转到主页">主页</a>
                    <a name="a2" class="easyui-linkbutton" href="javascript:void(0);" data-options="plain:true,iconCls: 'icon-help'" title="查看帮助" >查看帮助</a>
                    <a name="a3" class="easyui-linkbutton" href="javascript:void(0);" data-options="plain:true,iconCls: 'icon-edit'" title="修改密码">修改密码</a>
                    <a name="a4" class="easyui-linkbutton" href="javascript:void(0);" data-options="plain:true,iconCls: 'icon-exit'" title="退出系统">退出系统</a>
                    <a name="a5" class="easyui-linkbutton" href="javascript:void(0);" data-options="plain:true,iconCls: 'icon-logout'" title="注销登录">注销登录</a>
                </div>
                <div id="btnShowNorth" class="panel-tool" style="display: none;">
                    <a href="javascript:void(0);" class="layout-button-down" title="显示顶部栏"></a>
                </div>
            </div>
        </div>
    </div>

    <div id="west" data-options="region:'west', title:'菜单导航栏', split:true, iconCls: 'icon-navi', minWidth: 250, maxWidth: 600, border: false" style="width: 250px; padding: 1px; overflow:hidden; border-right-width: 1px;" >
        <div id="menuTabs" class="easyui-tabs" data-options="fit: true, enableConextMenu: false, defaultEnableRefresh: false, tools: '#menuTabs_tools'" >
            <div data-options="iconCls:'icon-menu', title: '导航菜单'">
                <div id="westLayout" class="easyui-layout" data-options="fit: true">
                    <div id="westLayoutNorthPanel" data-options="region: 'north', split: true, border: false" style="height: 220px; border-bottom-width: 1px;">
                    </div>
                    <div id="westLayoutCenterPanel" data-options="region: 'center', border: false" style="border-top-width: 1px;" >
                        <ul id="ulmenus" ></ul>
                    </div>
                </div>
            </div>
            <div data-options="iconCls:'icon-favo', title: '我的收藏', href: 'MenuFavorites.aspx'">
            </div>
        </div>
    </div>

    <div id="center" data-options="region: 'center'" style="padding: 1px; overflow: hidden; border-top-width: 0px; border-bottom-width: 0px;">
        <div id="mainTabs" class="easyui-tabs" <%--title="双击选项卡标题可以关闭选项卡"--%> data-options="fit: true, enableRepeatContextMenu: true, enableNewTabContextMenu: true, defaultHref: 'BlankTab.aspx', tools: '#mainTabs_tools'"></div>
    </div>

    <div id="south" data-options="region: 'south', collapsed: true, iconCls: 'icon-about', title: '关于信息'" style="height: 80px; padding: 0px; background: #efefef;">
        <div style="color: #4e5766; padding: 8px 0px 0px 0px; margin: 0px auto; text-align: center; font-size:12px; font-family:微软雅黑;">
            @2011-2012 Copyright: Shenzhou Information Security Evaluation Center., Jiangxi.&nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="http://www.jx-sz.net/Web_news/ZXJJ/index.html" target="_blank" style="text-decoration: none;">关于神舟</a><br />
            本产品使用权归：江西神舟信息安全测评中心(<a href="http://www.jx-sz.net/Web_news/ZXJJ/index.html" target="_blank" style="text-decoration: none;">关于神舟测评</a>)。
            建议使用&nbsp;
            <a href="http://windows.microsoft.com/zh-CN/internet-explorer/products/ie/home" target="_blank" style="text-decoration: none;">IE(Version 9/10)</a>/
            <a href="https://www.google.com/intl/zh-CN/chrome/browser/" target="_blank" style="text-decoration: none;">Chrome</a>
            &nbsp;系列浏览器。
        </div>
    </div>

    <div id="menuTabs_tools">
        <a id="menuTabsRefreshButton" href="javascript:void(0);" class="easyui-linkbutton" title="刷新当前选项卡" plain="true" iconCls="icon-refresh"></a>
	</div>

    <div id="mainTabs_tools" style="">
        <table cellpadding="0" cellspacing="0">
            <tr style="height: 100%; line-height: 30px;">
                <td><a id="t1" href="javascript:void(0);" class="easyui-linkbutton" title="转到主页" plain="true" iconCls="icon-home"></a></td>
                <td><div class="datagrid-btn-separator" ></div></td>
                <td><a id="t2" href="javascript:void(0);" class="easyui-linkbutton" title="关闭当前选项卡" plain="true" iconCls="icon-close"></a></td>
                <td><a id="t3" href="javascript:void(0);" class="easyui-linkbutton" title="关闭其他选项卡" plain="true" iconCls="icon-close-all"></a></td>
                <td><div class="datagrid-btn-separator" ></div></td>
                <%--<td><a id="t4" href="javascript:void(0);" class="easyui-linkbutton" title="刷新当前选项卡" plain="true" iconCls="icon-refresh"></a></td>
                <td><div class="datagrid-btn-separator" ></div></td>--%>
                <td><a id="t5" href="javascript:void(0);" class="easyui-linkbutton" title="关闭左侧选项卡" plain="true" iconCls="icon-close-left"></a></td>
                <td><a id="t6" href="javascript:void(0);" class="easyui-linkbutton" title="关闭右侧选项卡" plain="true" iconCls="icon-close-right"></a></td>
                <td><a id="t7" href="javascript:void(0);" class="easyui-linkbutton" title="关闭所有选项卡" plain="true" iconCls="icon-cancel"></a></td>
            </tr>
        </table>
        
	</div>
</div>
</div>
</asp:Content>
