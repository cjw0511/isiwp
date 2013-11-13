(function ($) {

    window.homePageTitle = "主页";
    window.homePageUrl = window.resolveUrl("./Views/Platform/WorkSpace.aspx");
    window.blankTabUrl = window.resolveUrl("./BlankTab.aspx");
    window.mainTabsId = "#mainTabs";
    window.menuTabsId = "#menuTabs";
    window.callbackDisableList = [
        window.resolveUrl("./MainForm.aspx"),
        window.resolveUrl("./Login.aspx"),
        window.resolveUrl("./Welcome.aspx"),
        window.resolveUrl("./MenuMain.aspx"),
    ];
    window.nowTimeLabelId = "#nowTime";

    //刷新屏幕右上角的当前时间显示的标签。
    window.beginAutoRefreshNowTimeLabel = function () {
        var refresh = function () { $(window.nowTimeLabelId).text(new Date().toLongDateTimeString()); };
        refresh();
        window.setInterval(refresh, 1000);
    };

    //绑定菜单导航栏面板大小调整时自动重新布局的事件。
    window.bindMainLayoutWestPanelOnResize = function () {
        var panel = $("#mainLayout").layout("panel", "west");
        var opts = panel.panel("options");
        var _onResize = opts.onResize;
        opts.onResize = function (width, height) {
            _onResize.apply(this, arguments);
            var options = $(this).panel("options");
            var split = 27;
            var diff = 63;
            var menuLength = $("#westLayoutCenterPanel ul li").length;
            if (menuLength < 1) { menuLength = 1; }
            var nothPanel = $("#westLayoutNorthPanel");
            var northPanelHeight = height - (menuLength * split + diff);
            if (northPanelHeight < 150) { northPanelHeight = 150; }
            var northPanelHeightOptions = nothPanel.panel("options");
            northPanelHeightOptions.minHeight = northPanelHeight;
            northPanelHeightOptions.maxHeight = height - (split * 3) - diff;
            nothPanel.panel("resize", { height: northPanelHeight });
        };
    };

    //重新设置整体窗口布局。
    window.ResizeLayout = function () { $("#mainLayout").layout("resize"); };

    //绑定屏幕大小调整时自动重新刷新页面布局的事件
    window.bindWindowResizeEvent = function () {
        window.bindMainLayoutWestPanelOnResize();
        $(window).resize(window.ResizeLayout);
    };


    //判断指定标题名称或索引号的选项卡是否为主页选项卡。
    window.isHomePageTab = function (which) {
        var opts = $(window.mainTabsId).tabs("getTab", which).panel("options");
        return opts.title == window.homePageTitle;
    };


    //判断指定属性的选项卡是否已经存在。
    //传入的参数 param 为一个 JSON 格式的对象，该对象可包含如下三个属性：
    //  which: 表示选项卡标题名或者索引号(从 0 开始)；
    //  href: 表示选项卡的 href 值；
    //  iconCls: 表示选项卡的 图标。
    //可能的返回结果，0:表示不存在,1:表示完全符合条件的选项卡存在,2:表示仅仅是该标题名符合的选项卡存在
    window.existsTab = function (param) {
        var defaults = { which: 0, href: null, iconCls: null };
        var opts = $.extend(defaults, param);
        var returnValue = 0;
        if ($(window.mainTabsId).tabs("exists", opts.which)) {
            returnValue = 2;
            var opts = $(window.mainTabsId).tabs("getTab", opts.which).panel("options");
            if (opts.href == param.href && opts.iconCls == param.iconCls) { returnValue = 1; }
        }
        return returnValue;
    };


    window.tabDefaultOptions = { title: "新建选项卡", href: window.blankTabUrl, iconCls: "icon-tab", closable: true, selected: true };
    //添加选项卡的根方法，该方法的参数 param 为一个 JSON 格式的对象，该对象包含如下属性：
    //  title:
    //  href:
    //  iconCls:
    //  closable:
    //  selected:
    window.appendTab = function (param) {
        var opts = $.extend({}, window.tabDefaultOptions, param);
        $(window.mainTabsId).tabs("add", opts);
    };

    //选中指定标题名或索引号的选项卡。
    window.selectTab = function (which) {
        $(window.mainTabsId).tabs("select", which);
    };

    //添加指定属性的选项卡，该方法的参数 param 为一个 JSON 格式的对象，该对象包含如下属性：
    //  title:
    //  href:
    //  inIframe:
    //  iconCls:
    //  closable:
    //  selected:
    window.addTab = function (param) {
        var opts = $.extend({}, window.tabDefaultOptions, param);
        if (!String.isNullOrWhiteSpace(opts.href)) { opts.href = window.resolveUrl(opts.href); }
        var exists = window.existsTab($.extend({}, opts, { which: opts.title }));
        switch (exists) {
            case 0:
                window.appendTab(opts);
                break;
            case 1:
                window.selectTab(opts.title);
                break;
            case 2:
                var index = 1;
                while ($(window.mainTabsId).tabs("exists", opts.title + index)) {
                    var param = { which: opts.title + index, href: opts.href, iconCls: opts.iconCls };
                    if (window.existsTab(param) == 1) { window.selectTab(opts.title + index); return; }
                    index++;
                }
                break;
            default:
                window.appendTab(opts);
                break;
        }
    };

    //添加主页选项卡
    window.addHomeTab = function () {
        window.addTab({ title: window.homePageTitle, href: window.homePageUrl, iconCls: "icon-home", closable: false, selected: true, iniframe: false });
    };


    //关闭指定标题名称或索引号的选项卡，如果指定的选项卡的 closable 为 false，则不能被关闭。
    window.closeTab = function (which) {
        $(window.mainTabsId).tabs("closeClosable", which);
    };
    //刷新指定标题名称或索引号的选项卡
    window.refreshTab = function (which) {
        $(window.mainTabsId).tabs("refresh", which);
    };
    //跳转到主页选项卡
    window.jumpHomePageTab = function () {
        $(window.mainTabsId).tabs("select", window.homePageTitle);
        $.plugin.showMessage({ msg: "您已经跳转到\"" + window.homePageTitle + "\"选项卡。" });
    };
    //关闭当前选中的选项卡
    window.closeCurrentTab = function () {
        var currentTab = $(window.mainTabsId).tabs("getSelected");
        var index = $(window.mainTabsId).tabs("getTabIndex", currentTab);
        window.closeTab(index);
    };
    //刷新当前选中的选项卡
    window.refreshCurrentTab = function () {
        var currentTab = $(window.mainTabsId).tabs("getSelected");
        var index = $(window.mainTabsId).tabs("getTabIndex", currentTab);
        window.refreshTab(index);
    };
    //关闭除当前选中选项卡外的其他选项卡
    window.closeOthersTabs = function () {
        var currentTab = $(window.mainTabsId).tabs("getSelected");
        var index = $(window.mainTabsId).tabs("getTabIndex", currentTab);
        $(window.mainTabsId).tabs("closeOthersClosable", index);
    };
    //关闭当前选中选项卡的左侧所有选项卡
    window.closeLeftTabs = function () {
        var currentTab = $(window.mainTabsId).tabs("getSelected");
        var index = $(window.mainTabsId).tabs("getTabIndex", currentTab);
        $(window.mainTabsId).tabs("closeLeftClosable", index)
    };
    //关闭当前选中选项卡的右侧所有选项卡
    window.closeRightTabs = function () {
        var currentTab = $(window.mainTabsId).tabs("getSelected");
        var index = $(window.mainTabsId).tabs("getTabIndex", currentTab);
        $(window.mainTabsId).tabs("closeRightClosable", index);
    };
    //关闭所有选项卡
    window.closeAllTabs = function () {
        $(window.mainTabsId).tabs("closeAllClosable");
    };


    var _confirmMainTabsClose = function (jq, message, callback, eventName, title, index) {
        $.plugin.messager.confirm("操作提醒", message, function (confirm) {
            if (confirm) {
                var opts = $(jq).tabs("options");
                var bc = opts[eventName];
                opts[eventName] = function (title, index) { };
                $(jq).tabs(callback, index);
                opts[eventName] = bc;
            }
        });
        return false;
    };
    //绑定主功能操作区选项卡组件的工具栏按钮事件
    window.bindMainTabsButtonsEvent = function () {
        //主功能区 tabs 选项卡组件工具栏按钮事件以及相配套的触发事件绑定
        var tabsOpts = $(window.mainTabsId).tabs("options");
        $.extend(tabsOpts, {
            onCloseClosable: function (title, index) { $.plugin.showMessage({ msg: "选项卡\"" + title + "\"已经被关闭。" }); },
            onRefresh: function (title, index) { $.plugin.showMessage({ msg: "选项卡\"" + title + "\"已经被刷新。" }); },
            onCloseOthersClosable: function (title, index) { $.plugin.showMessage({ msg: "除当前选项卡\"" + title + "\"外的所有可关闭的选项卡已经被关闭。" }); },
            onCloseLeftClosable: function (title, index) { $.plugin.showMessage({ msg: "当前选项卡\"" + title + "\"的所有左侧可关闭的选项卡已经被关闭。" }); },
            onCloseRightClosable: function (title, index) { $.plugin.showMessage({ msg: "当前选项卡\"" + title + "\"的所有右侧可关闭的选项卡已经被关闭。" }); },
            onCloseAllClosable: function () { $.plugin.showMessage({ msg: "所有可关闭的选项卡已经被关闭。" }); },

            onBeforeCloseOthersClosable: function (title, index) {
                if ($(this).tabs("getOtherClosableTabs", index).length == 0) { return false; };
                return _confirmMainTabsClose(this, "您确定要关闭除选项卡\"" + title + "\"之外的所有可关闭的选项卡？", "closeOthersClosable", "onBeforeCloseOthersClosable", title, index);
            },
            onBeforeCloseLeftClosable: function (title, index) {
                if ($(this).tabs("getLeftClosableTabs", index).length == 0) { return false; };
                return _confirmMainTabsClose(this, "您确定要关闭选项卡\"" + title + "\"左侧的所有可关闭的选项卡？", "closeLeftClosable", "onBeforeCloseLeftClosable", title, index);
            },
            onBeforeCloseRightClosable: function (title, index) {
                if ($(this).tabs("getRightClosableTabs", index).length == 0) { return false; };
                return _confirmMainTabsClose(this, "您确定要关闭选项卡\"" + title + "\"右侧的所有可关闭的选项卡？", "closeRightClosable", "onBeforeCloseRightClosable", title, index);
            },
            onBeforeCloseAllClosable: function () {
                if ($(this).tabs("getAllClosableTabs").length == 0) { return false; };
                return _confirmMainTabsClose(this, "您确定要关闭所有可关闭的选项卡？", "closeAllClosable", "onBeforeCloseAllClosable");
            }
        });
        $("#t1", "#mainTabs_tools").click(function () { window.jumpHomePageTab(); });
        $("#t2", "#mainTabs_tools").click(function () { window.closeCurrentTab(); });
        $("#t3", "#mainTabs_tools").click(function () { window.closeOthersTabs(); });
        $("#t4", "#mainTabs_tools").click(function () { window.refreshCurrentTab(); });
        $("#t5", "#mainTabs_tools").click(function () { window.closeLeftTabs(); });
        $("#t6", "#mainTabs_tools").click(function () { window.closeRightTabs(); });
        $("#t7", "#mainTabs_tools").click(function () { window.closeAllTabs(); });
    };



    //刷新左侧导航栏菜单指定标题名称或索引号的选项卡
    window.refreshMenuTab = function (index) {
        if (index == 0) {
            window.bindMasterMainData();
            return;
        }
        $(window.menuTabsId).tabs("refresh", index);
    };
    //绑定左侧菜单导航栏刷新按钮的事件。
    window.bindWestMenuNavigationBarButtonsEvent = function () {
        $("#menuTabsRefreshButton").click(function () {
            var tab = $(window.menuTabsId).tabs("getSelected");
            var index = $(window.menuTabsId).tabs("getTabIndex", tab);
            window.refreshMenuTab(index);
        });
    };

    //更改系统主题皮肤风格
    window.changeThemeStyle = function (theme) {
        $("link[href$='easyui.css']").attr("href", "Resources/Plugins/jquery-easyui-1.3.2/themes/" + theme + "/easyui.css");
    };
    window.download = function () {
        var url = window.resolveUrl('Services/Project/DocumentService.asmx/DownLoadFileByUrl');
        var param = { Path: "/Upload/Document/用户手册.docx" };
        var targetname = "newWindow";
        var tempForm = document.createElement("form");
        tempForm.id = "tempForm";
        tempForm.method = "post";
        tempForm.action = url;
        tempForm.target = targetname;
        for (var key in param) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = param[key];
            tempForm.appendChild(input);
        }
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);
    }
    //绑定主界面工具栏按钮事件。
    window.bindMainFormButtonBarEvent = function () {
        //
        $("#mainSearchBox").searchbox({
            searcher: function (value, name) {
                $.plugin.showMessage(String.format("您选择和输入的是 {0}: {1}；(-_-!!!搜索按钮功能尚未实现)", name, value));
            }
        });
        //提交Bug
        $("a[name='a_bug']", "#buttonbar").click(function () { window.submitBug(); });
        //主页
        $("a[name='a1']", "#buttonbar").click(function () { window.jumpHomePageTab(); });
        //查看帮助
        $("a[name='a2']", "#buttonbar").click(function () {
            //$.plugin.showMessage("查看帮助");
            var _content = $("<a>下载用户手册</a>").linkbutton({ iconCls: "icon-down" }).attr("onclick", 'javascript:window.download();');
            var _div = $("<div><div/>").css({ "padding": "10px" }).append(_content);
            var dialog = $.plugin.showDialog({
                title: "详细",
                width: 500,
                height: 250,
                autoCenter: true,
                content: _div,
                enableApplyButton: false,
                enableCloseButton: false,
                enableSaveButton: false
            });
        });
        //修改密码
        $("a[name='a3']", "#buttonbar").click(function () {
            $.plugin.showDialog({
                title: "修改密码",
                href: "Views/Platform/PasswordUpdate.aspx",
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var param = $(dialog).form('getData');
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改密码成功。");
                        } else {
                            $.plugin.showMessage("修改密码失败。");
                        }
                    };
                    window.platform.securityinfo.currentUserPasswordUpdate(param, _callback);
                },
                width: 500,
                height: 220
            });
        });
        //退出系统
        $("a[name='a4']", "#buttonbar").click(function () { window.platform.exitSysConfirm(); });
        //注销登录
        $("a[name='a5']", "#buttonbar").click(function () { window.platform.logoutConfirmAndExit(); });
        $.extend($("#mainLayout").layout("panel", "north").panel("options"), {
            onCollapse: function () {
                $("#toolbar").insertBefore("#mainLayout"); $("#toolbar").css("top", 0); $("#btnShowNorth").show();
                $("#buttonbar div:first").css("padding-right", "25px");
            },
            onExpand: function () {
                $("#toolbar").insertAfter("#topbar"); $("#toolbar").css("top", 50); $("#btnShowNorth").hide();
                $("#buttonbar div:first").css("padding-right", "0px");
            }
        });
        //隐藏顶部栏按钮事件
        $("#btnHideNorth").click(function () { $("#mainLayout").layout("collapse", "north"); });
        //显示顶部栏按钮事件
        $("#btnShowNorth").click(function () { $("#mainLayout").layout("expand", "north"); });
        //皮肤风格选择列表事件绑定
        $("#themeSelector").combobox("options").onSelect = function (record) {
            window.changeThemeStyle(record.value);
        };
    };

    //根据指定的根节点菜单 Key 加载子菜单树至 westNorthPanel 位置。
    window.loadMenuMainPanel = function (key) {
        var href = "MenuMain.aspx?key=" + key;
        var panel = $("#westLayoutNorthPanel");
        var opts = panel.panel("options");
        var _onLoad = opts.onLoad;
        var onLoad = function () {
            _onLoad.apply(this, arguments);
            var fn = function () { $("#westLayoutCenterPanel ul li a").removeAttr("disabled"); };
            window.call(fn, 200);
            $(this).panel("options").onLoad = _onLoad;
        };
        opts.onLoad = onLoad;
        panel.panel("refresh", href);
    };

    //在界面菜单数据绑定完后加载默认的菜单树节点内容。
    window.loadDefaultMenuMainData = function () {
        var key = 18;
        var a = $("#westLayoutCenterPanel ul li a[key='" + key + "']");
        if (a.length == 0) { a = $("#westLayoutCenterPanel ul li a:first"); }
        a.removeAttr("disabled").click();
    };

    //设置当前用户加载系统主页面时默认打开的主功能菜单Key值。
    window.setUserDefaultMasterMenuKey = function (key) { };

    //将菜单主项数据绑定至用户界面。
    window.bindMainMenuData = function (data) {
        $("#westLayoutCenterPanel ul").empty();
        for (var i = 0; i < data.length; i++) {
            var m = data[i];
            var iconCls = m.iconCls;
            if (String.isNullOrWhiteSpace(iconCls)) { iconCls = "icon-basic"; }
            $("#westLayoutCenterPanel #ulmenus").append("<li>" +
                "<div class='panel-header panel-header-noborder'><a href='javascript:void(0);' target='_self' key='" + m.id + "' >" +
                "<span style='padding-left: 10px;' ><span class='" + iconCls + "' style='background-position: left center; padding-left: 25px;' >" +
                m.text + "</span></span></a></div></li>");
        }
        $("#westLayoutCenterPanel ul li a").attr("disabled", true);
        $("#westLayoutCenterPanel ul li div.panel-header:last").css("border-width", "0px");
        $("#westLayoutCenterPanel ul").undelegate("li a", "click");
        $("#westLayoutCenterPanel ul").delegate("li a", "click", function () {
            $("#westLayoutCenterPanel ul li a").attr("disabled", true).removeClass("tree-node-selected clicked");
            $(this).addClass("tree-node-selected clicked");
            var key = $(this).attr("key");
            window.setUserDefaultMasterMenuKey(key);
            window.loadMenuMainPanel(key);
        });
        $("#westLayoutCenterPanel ul li a").hover(function () {
            if (!$(this).hasClass("tree-node-selected")) { $(this).addClass("tree-node-selected"); }
        }, function () {
            if (!$(this).hasClass("clicked")) { $(this).removeClass("tree-node-selected"); }
        });
        window.loadDefaultMenuMainData();
    };


    window.bindMasterMainData = function () {
        window.platform.authmenus.getRootMenus(function (data) {
            window.bindMainMenuData(data);
            window.ResizeLayout();
        });
    };

    window.bindInfoBarData = function () {
        window.platform.getCurrentUser(function (user) {
            window.platform.getCurrentLoginCode(function (loginCode) {
                $("#lblLoginCode").text(loginCode);
                $("#lblLoginDepartment").text(user.DepartmentName);
                $("#lblUserName").text(user.Name);
            });
        });
    };

    //绑定界面菜单的数据列表
    window.bindMenuData = function () {
        window.bindMasterMainData();
        window.bindInfoBarData();
    };

    //提交Bug
    window.submitBug = function () {
        var _dialog = {
            title: "Bug提交",
            enableApplyButton: false,
            width: 900,
            height: 360,
            onSave: function (dialog) {
                var verifyResult = $(dialog).form("validate");
                if (!verifyResult) { return false };
                var bug = $(dialog).form('getData');
                $.post(window.resolveUrl("Services/Platform/BugService.asmx/AddBug"), bug, function (data, textStatus, XMLHttpRequest) {
                    var result = $(data).text();
                    var success = (result.toLowerCase() == "true");
                    if (success) {
                        $.plugin.showMessage("提交Bug成功。");
                    } else {
                        $.plugin.showMessage("提交Bug失败。");
                    }
                });
            }
        };
        var _content = '<div class="div_center">' +
                            '<fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">' +
                                '<legend class="panel-title">Bug信息：</legend>' +
                                '<table class="tablecss" cellpadding="0" cellspacing="0">' +
                                '<tr><td class="table_td_left">标题<span class="required">*</span>：</td><td colspan="3"><input id="txtTitle" type="text" name="Title" style="width: 620px;" /></td></tr>' +
                                '<tr><td class="table_td_left" style="vertical-align:baseline;padding-top:7px;">描述：</td><td colspan="3" style="padding-top:5px;"><textarea id="txtDescription" rows="4" name="Description" ></textarea></td></tr>' +
                                '<tr><td class="table_td_left" style="vertical-align:baseline;padding-top:7px;">建议的修复方式：</td><td colspan="3" style="padding-top:5px;"><textarea id="txtRecommend" rows="4" name="Recommend" ></textarea></td></tr>' +
                                '<tr><td class="table_td_left">类型：</td><td colspan="3"><select id="selType" name="Type" ><option value="0" selected="selected" >Bug</option><option value="1">建议</option></select></td></tr>' +
                                '<tr><td class="table_td_left">严重级别：</td><td colspan="3"><select id="selLevel" name="Level" ><option value="0" selected="selected" >0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select><span class="required">(0-4，级别越高表示问题越严重)</span></td></tr>' +
                                '</table>' +
                            '</fieldset>' +
                        '</div>';
        $.extend(_dialog, { content: _content });
        var dialog = $.plugin.showDialog(_dialog);
        var inituploadify = function () {
            $(dialog.dialog).find("#txtTitle").validatebox({ required: true });
            $(dialog.dialog).find("#selType").combobox({});
            $(dialog.dialog).find("#selLevel").combobox({});

        }
        window.setTimeout(inituploadify, 0);
    }

})(jQuery);