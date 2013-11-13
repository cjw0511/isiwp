(function ($) {
    var _tabPanelResize = function (panel) {
        $("div.ajaxTabContainer:first", panel).panel("resize");
    };
    var _initTabPanelOnloadEvent = function (panel) {
        var opts = panel.panel("options");
        if (!opts.isSetLoadCallbackEvent) {
            var onResize = opts.onResize;
            opts.onResize = function (width, height) {
                onResize.call(this, width, height);
                _tabPanelResize($(this));
            };
            opts.isSetLoadCallbackEvent = true;
        }
    };
    var _tabOnSelectBak = $.fn.tabs.defaults.onSelect;
    var _tabOnSelect = function (title, index) {
        _tabOnSelectBak.apply(this, arguments);
        var thisTab = $(this).tabs("getTab", title);
        _tabPanelResize(thisTab);
        _initTabPanelOnloadEvent(thisTab);
    };
    var _tabOnUpdateBak = $.fn.tabs.defaults.onUpdate;
    var _tabOnUpdate = function (title, index) {
        _tabOnUpdateBak.apply(this, arguments);
        var thisTab = $(this).tabs("getTab", title);
        _initTabPanelOnloadEvent(thisTab);
    };
    var _tabOnLoadBak = $.fn.tabs.defaults.onLoad;
    var _tabOnLoad = function (panel) {
        _tabOnLoadBak.apply(this, arguments);
        _tabPanelResize(panel);
        _initTabPanelOnloadEvent(panel);
    };

    //    var _tabsDefaults = { onSelect: _tabOnSelect, onUpdate: _tabOnUpdate, onLoad: _tabOnLoad };
    //    $.extend($.fn.tabs.defaults, _tabsDefaults);


    $.fn.extend({
        ////////////////////////////////////////////////////////////
        /// 获取当前选择器所指对象的最近一级父级 easyui-panel 对象。
        ////////////////////////////////////////////////////////////
        getCurrentPanel: function () {
            return $(this).parents(".panel-body:first");
        },

        ////////////////////////////////////////////////////////////
        /// 绑定或者触发当前选择器所指对象所在的最近一级父级 easyui-panel 的 onResize 事件。
        ////////////////////////////////////////////////////////////
        panelResize: function (callback) {
            var panel = $(this).getCurrentPanel();
            if (panel.length == 0) { return; }
            var opts = panel.panel("options");
            if (arguments.length == 0) {
                var fn = function () { opts.onResize.call(panel, opts.width, opts.height); };
                window.call(fn);
                return;
            }
            if ($.isFunction(callback)) {
                var resize = opts.onResize;
                opts.onResize = function (width, height) { resize.apply(this, arguments); callback.apply(this, arguments); };
            }
        },

        ////////////////////////////////////////////////////////////
        /// 获取当前选择器所指对象的最近一级父级 easyui-tabs 对象。
        ////////////////////////////////////////////////////////////
        getCurrentTabs: function () { return $(this).parents(".tabs-container:first"); },

        ////////////////////////////////////////////////////////////
        /// 获取当前选择器所指对象的最近一级父级 easyui-tabs 对象的 ID。
        ////////////////////////////////////////////////////////////
        getCurrentTabsId: function () {
            var tabs = $(this).getCurrentTabs();
            var id = tabs.attr("id");
            if (String.isNullOrWhiteSpace(id)) { id = tabs.tabs("options").id; }
            return id;
        },

        ////////////////////////////////////////////////////////////
        /// 获取当前选择器所指对象所在最近一级父级 easyui-tabs 中的 tabs 的索引号。
        ////////////////////////////////////////////////////////////
        getCurrentTabIndex: function () {
            var tabs = $(this).getCurrentTabs();
            if (tabs.length == 0) { $.error("当前对象不处在 easyui-tabs 的 tab-panel 中。"); }
            var panels = tabs.children(".tabs-panels").children(".panel");
            var panel = $(this);
            if (panel.length == 0) { return -1; };
            for (var i = 0; i < panels.length; i++) { if ($.contains(panels[i], panel[0])) { return i; } }
            return -1;
        },

        ////////////////////////////////////////////////////////////
        /// 获取当前选择器所指对象所在最近一级父级 easyui-tabs 中的 tabs 所对应的 easyui-panel 对象。
        ////////////////////////////////////////////////////////////
        getCurrentTabPanel: function () {
            var tabs = $(this).getCurrentTabs();
            if (tabs.length == 0) { $.error("当前对象不处在 easyui-tabs 的 tab-panel 中。"); }
            var index = $(this).getCurrentTabIndex();
            if (index == -1) { return null; }
            return tabs.tabs("getTab", index);
        },

        ////////////////////////////////////////////////////////////
        /// 获取当前选择器所指对象所在最近一级父级 easyui-tabs 中的 tabs 所对应的 title 属性。
        ////////////////////////////////////////////////////////////
        getCurrentTabTitle: function () {
            var panel = $(this).getCurrentTabPanel();
            if (window.isEmptyObjectOrNull(panel)) { $.error("当前对象不处在 easyui-tabs 的 tab-panel 中。"); }
            return panel.panel("options").title;
        },

        ////////////////////////////////////////////////////////////
        /// 绑定或者触发当前选择器所指对象所在的最近一级父级 easyui-tabs 中所对应的 easyui-panel 的 onResize 事件。
        ////////////////////////////////////////////////////////////
        tabResize: function (callback) {
            var panel = $(this).getCurrentTabPanel();
            if (window.isEmptyObjectOrNull(panel)) { return; }
            var opts = panel.panel("options");
            if (arguments.length == 0) {
                var fn = function () { opts.onResize.call(panel, opts.width, opts.height); };
                window.call(fn);
                return;
            }
            if ($.isFunction(callback)) {
                var resize = opts.onResize;
                opts.onResize = function (width, height) { resize.apply(this, arguments); callback.apply(this, arguments); };
            }
        }
    });

})(jQuery);