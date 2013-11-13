/*
==============================================================================
//  工作台页面 WorkSpace.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.WorkSpace_aspx) { window.platform.WorkSpace_aspx = new Object(); }
    window.platform.WorkSpace_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            _loadData();
        };
        var _bindButtonEvent = function () {
            $("#a_set", ajaxContainerSelector).click(function () {
                var pos = $(this).offset();
                $.extend(pos, { top: pos.top + 35, left: pos.left + 5 });
                var opts = {
                    title: "个人主页设置",
                    href: "Views/Platform/WorkSpaceSetting.aspx",
                    modal: true,
                    height: 400,
                    width: 265,
                    autoCenter: false,
                    collapsible: false,
                    maximizable: false,
                    enableSaveButton: false,
                    enableApplyButton: false,
                    enableCloseButton: false
                };
                var dialog = $.plugin.showDialog(opts);
                $(dialog.dialog).panel("move", pos);
            });

            $("#a_expand", ajaxContainerSelector).click(function () {
                $("#p1").prev().find(".panel-tool").hide();
                var panels = $("#layout_portal_portal", ajaxContainerSelector).portal("getPanels");
                for (var i = 0; i < panels.length; i++) {
                    panels[i].panel("expand", true);
                }
            });
            $("#a_collapse", ajaxContainerSelector).click(function () {
                var panels = $("#layout_portal_portal", ajaxContainerSelector).portal("getPanels");
                for (var i = 0; i < panels.length; i++) {
                    panels[i].panel("collapse", true);
                }
            });
        };
        var _loadData = function () {
            window.platform.workspace.getUserPortlets(function (data) {
                _addPortalPanels(data);
            });
        }
        var _addPortalPanels = function (data) {
            var colCount = data.length;
            _clearPortal(colCount); ///清空portal
            $("#layout_portal_portal", ajaxContainerSelector).portal({
                border: false,
                fit: true,
                onStateChange: function () {
                    var aa = [];
                    for (var columnIndex = 0; columnIndex < colCount; columnIndex++) {
                        var cc = [];
                        var panels = $("#layout_portal_portal", ajaxContainerSelector).portal('getPanels', columnIndex);
                        for (var i = 0; i < panels.length; i++) {
                            cc.push(panels[i].panel("options").Key);
                        }
                        aa.push(cc.join(','));
                    }
                    var states = aa.join(':');
                    if (states != window.platform.WorkSpace_aspx.states) {
                        window.platform.WorkSpace_aspx.states = states;
                        window.platform.workspace.moveUserPortlets({ States: states }, function (success) {
                            if (!success) {
                                $.plugin.showMessage("拖动失败，系统发生异常。");
                            }
                        });
                    }
                }
            });
            _clearPanels(); ///重置panels
            for (var col = 0; col < data.length; col++) {
                for (var i = 0; i < data[col].length; i++) {
                    var options = $.extend([], $.fn.panel.defaults, data[col][i]);
                    _panelFormat(options); ///格式化panel参数
                    var p = $('<div/>').attr('id', options.id).appendTo("body");
                    p.panel(options);
                    $('#layout_portal_portal', ajaxContainerSelector).portal("add", {
                        panel: p,
                        columnIndex: col
                    });
                }
            }
            $("#layout_portal_portal", ajaxContainerSelector).portal("resize");
        };
        ///清空portal
        var _clearPortal = function (colCount) {
            $("#layout_portal", ajaxContainerSelector).html("");
            $('<div id="layout_portal_portal" style="position:relative;"></div>').appendTo("#layout_portal", ajaxContainerSelector);
            for (var i = 0; i < colCount; i++) {
                $("<div><div/>").appendTo("#layout_portal_portal", ajaxContainerSelector);
            };
        };
        ///重置panels
        var _clearPanels = function () {
            var panels = $("#layout_portal_portal", ajaxContainerSelector).portal('getPanels');
            for (var i = 0; i < panels.length; i++) {
                $("#layout_portal_portal", ajaxContainerSelector).portal("remove", panels[i]);
            }
        };
        ///格式化panel参数
        var _panelFormat = function (options) {
            var guid = window.guid().replaceAll("-", "").left(12);
            $.extend(options, { id: "easyui_portlet_" + guid, Key: options.Key, title: options.Title, iconCls: options.IconKey, height: options.Height, href: options.Href, iniframe: options.Iniframe, collapsible: true, closable: true, tools: [{ iconCls: 'icon-reload', handler: function () { $("#" + options.id, ajaxContainerSelector).panel("refresh"); } }] });
            options.onMove = function (left, top) { };
            var _onOpen = options.onOpen;
            options.onOpen = function () {
                _onOpen.apply(this, arguments);
                var header = $(this).panel("header");
                var tool = $(this).panel("header").find(".panel-tool");
                tool.hide();
                header.hover(function () { $(tool).show(); }, function () { $(tool).hide(); });
            };
            var _onClose = options.onClose;
            options.onClose = function () {
                _onClose.apply(this, arguments);
                var key = $(this).panel("options").Key;
                window.platform.workspace.delUserPortlets({ Key: key }, function (success) {
                    if (success) {
                        window.platform.workspace.getUserPortlets(_addPortalPanels);
                        $.plugin.showMessage("删除成功。");
                    }
                    else {
                        $.plugin.showMessage("删除失败。");
                    }
                });
                $(this).panel("destroy");
            };
        };

        _bindControl();
        _bindButtonEvent();

        window.platform.WorkSpace_aspx.setUserWorkSpaceCols = function (cols) {
            window.platform.workspace.setUserWorkSpaceCols({ Cols: cols }, function (success) {
                if (success) {
                    window.platform.workspace.getUserPortlets(_addPortalPanels);
                    $.plugin.showMessage("设置成功。");
                }
                else {
                    $.plugin.showMessage("设置失败。");
                }
            });
        };
        window.platform.WorkSpace_aspx.addPortlets = function (key) {
            window.platform.workspace.addUserPortlets({ Key: key }, function (success) {
                if (success) {
                    $.plugin.showMessage("添加面板成功。");
                    var _callback = function (data) {
                        var options = $.extend([], $.fn.panel.defaults, data);
                        _panelFormat(options);   ///格式化panel参数
                        var p = $('<div/>').attr('id', options.id).appendTo("body");
                        p.panel(options);
                        $('#layout_portal_portal', ajaxContainerSelector).portal("add", {
                            panel: p,
                            columnIndex: 0
                        });
                    };
                    window.platform.portlets.getPortletsByKey({ Key: key }, _callback);
                }
                else {
                    $.plugin.showMessage("添加面板失败，该面板已经添加。");
                }
            });

        };
    };
})(jQuery);