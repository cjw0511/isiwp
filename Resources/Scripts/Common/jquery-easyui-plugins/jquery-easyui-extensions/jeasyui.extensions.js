﻿/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact us: jeasyui@gmail.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI Generic Plugins Basic Library 1.0 beta
* jQuery EasyUI 通用插件基础库
* jeasyui.extensions.js
* 二次开发 陈建伟
* 最近更新：2013-07-25
*
* 依赖项：jquery.jdirk.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/
(function ($, undefined) {
    var coreEasyui = {};
    var coreJquery = function () { return $.apply(this, arguments); };

    coreJquery.fn = coreJquery.prototype = {};
    coreJquery.easyui = coreEasyui;

    coreEasyui.getTopEasyuiMessager = function () {
        if ($.util.isTopMost) { return $.messager; }
        return $.util.$ && $.util.$.messager ? $.util.$.messager : $.messager;
    };
    coreEasyui.messager = coreEasyui.getTopEasyuiMessager();

    coreEasyui.getTopEasyuiTooltip = function () {
        if ($.util.isTopMost) { return $.fn.tooltip; }
        return $.util.$ && $.util.$.fn && $.util.$.fn.tooltip ? $.util.$.fn.tooltip : $.fn.tooltip;
    };
    coreEasyui.tooltip = $.fn.tooltip;
    coreEasyui.tooltip.init = function (target, options) {
        var t = $.util.parseJquery(target);
        t.mouseover(function () {
            t.tooltip($.extend({ trackMouse: true }, options, { onHide: function () {
                if ($.isFunction(options.onHide)) { options.onHide.apply(this, arguments); }
                t.tooltip("destroy");
            }
            })).tooltip("show");
        });
    };

    var icons = { "error": "messager-error", "info": "messager-info", "question": "messager-question", "warning": "messager-warning" },
        _show = $.messager.show, _alert = $.messager.alert, _confirm = $.messager.confirm, _prompt = $.messager.prompt,
        defaults = { title: "操作提醒", confirm: "您确认要进行该操作？", prompt: "请输入相应内容：", icon: "info", loading: "正在努力为您加载，请稍待..." };

    //  重写 $.messager.show 方法，使其支持图标以及默认的单个字符串参数的重载；该方法定义如下参数：
    //      options:    表示需要弹出消息的内容、图标和方式等信息，该参数类型可以为如下：
    //          JSON Object: 兼容 $.messager.show 官方默认 API 的所有属性，并在此基础上增加如下参数：
    //              icon: 表示弹出消息的图标，为一个 String 类型值，该值可选的内容与 $.messager.alert 方法的第三个参数可选内容相同；
    //                  包括："error", "info", "question", "warning"；
    //                  具体内容参见 $.messager.alert 该方法的官方默认 API 中第三个参数可选内容。
    //              position: 表示弹出消息的位置，为一个 String 类型值，该值可选的内容定义如下：
    //                  topLeft: 屏幕左上角, topCenter: 屏幕上方中间，topRight: 屏幕右上角
    //                  centerLeft: 屏幕左侧中间，center: 屏幕正中间，centerRight: 屏幕右侧中间
    //                  bottomLeft: 屏幕左下角，bottomCenter: 屏幕下方中间，bottomRight: 屏幕右下角
    //          String: 以 icon: "info"、title: "操作提醒"、msg: options 为默认的方式调用上一重载。
    $.messager.show = function (options) {
        var isString = $.util.isString(options) || $.util.isBoolean(options) || $.isNumeric(options);
        if (isString) {
            arguments.length == 1 ? $.messager.show({ msg: String(options) }) : $.messager.show({ title: options, msg: arguments[1], icon: arguments[2], position: arguments[3] });
            return;
        }
        var defaults = $.extend({}, $.messager.defaults, { title: "操作提醒", timeout: 3000, showType: "slide" });
        var position = {
            topLeft: { right: "", left: 0, top: document.body.scrollTop + document.documentElement.scrollTop, bottom: "" },
            topCenter: { right: "", top: document.body.scrollTop + document.documentElement.scrollTop, bottom: "" },
            topRight: { left: "", right: 0, top: document.body.scrollTop + document.documentElement.scrollTop, bottom: "" },
            centerLeft: { left: 0, right: "", bottom: "" },
            center: { right: "", bottom: "" },
            centerRight: { left: "", right: 0, bottom: "" },
            bottomLeft: { left: 0, right: "", top: "", bottom: -document.body.scrollTop - document.documentElement.scrollTop },
            bottomCenter: { right: "", top: "", bottom: -document.body.scrollTop - document.documentElement.scrollTop },
            bottomRight: null
        };
        var opts = $.extend({}, defaults, options);
        opts.style = position[options.position] ? position[options.position] : position.topCenter;
        var iconCls = icons[opts.icon] ? icons[opts.icon] : icons.info;
        opts.msg = "<div class='messager-icon " + iconCls + "'></div>" + "<div>" + opts.msg + "</div>";
        return _show(opts);
    };
    $.union($.messager.show, _show);


    $.messager.alert = function (title, msg, icon, fn) {
        if (arguments.length == 1) { return _alert(defaults.title, arguments[0], defaults.icon); }
        if (arguments.length == 2) {
            if ($.isFunction(arguments[1])) { return _alert(defaults.title, arguments[0], defaults.icon, arguments[1]); }
            if (arguments[1] in icons) { return _alert(defaults.title, arguments[0], arguments[1]); }
            return _alert.apply(this, arguments);
        }
        if (arguments.length == 3) {
            if ($.isFunction(arguments[2])) {
                return (arguments[1] in icons) ? _alert(defaults.title, arguments[0], arguments[1], arguments[2])
                    : _alert(arguments[0], arguments[1], defaults.icon, arguments[2]);
            }
            return _alert.apply(this, arguments);
        }
        return _alert.apply(this, arguments);
    };


    $.messager.confirm = function (title, msg, fn) {
        if (arguments.length == 1) {
            return $.isFunction(arguments[0]) ? _confirm(defaults.title, defaults.confirm, arguments[0]) : _confirm(defaults.title, arguments[0]);
        }
        if (arguments.length == 2) {
            return $.isFunction(arguments[1]) ? _confirm(defaults.title, arguments[0], arguments[1]) : _confirm(arguments[0], arguments[1]);
        }
        return _confirm.apply(this, arguments);
    };


    $.messager.prompt = function (title, msg, fn) {
        if (arguments.length == 1) {
            return $.isFunction(arguments[0]) ? _prompt(defaults.title, defaults.prompt, arguments[0]) : _prompt(defaults.title, defaults.prompt);
        }
        if (arguments.length == 2) {
            return $.isFunction(arguments[0]) ? _prompt(defaults.title, arguments[0], arguments[1]) : _prompt(arguments[0], arguments[1]);
        }
        return _prompt.apply(this, arguments);
    };


    //  备注： $.messager 表示当前页面的 easyui-messager 对象；
    //         $.easyui.messager 表示可控顶级页面的 easyui-messager 对象；


    //  更改 jQuery EasyUI 中部分控件的国际化语言显示。
    $.extend($.fn.panel.defaults, { loadingMessage: defaults.loading });
    $.extend($.fn.window.defaults, { loadingMessage: defaults.loading });
    $.extend($.fn.dialog.defaults, { loadingMessage: defaults.loading });

    //  更改 jeasyui-combo 组件的非空验证提醒消息语言。
    $.extend($.fn.combo.defaults, { missingMessage: $.fn.validatebox.defaults.missingMessage });

    //  更改 jQuery EasyUI 部分组件的通用错误提示。
    var onLoadError = function (XMLHttpRequest, textStatus, errorThrown) {
        $.messager.progress("close");
        if (coreEasyui.messager != $.messager) { coreEasyui.messager.progress("close"); }
        var msg = (XMLHttpRequest && !$.string.isNullOrWhiteSpace(XMLHttpRequest.responseText) ?
                "如果该问题重复出现，请联系您的系统管理员并反馈该故障。<br />" +
                "错误号：" + XMLHttpRequest.status + "(" + XMLHttpRequest.statusText + ")；<hr />" + XMLHttpRequest.responseText :
                "系统出现了一个未指明的错误，如果该问题重复出现，请联系您的系统管理员并反馈该故障。");
        coreEasyui.messager.alert("错误提醒", msg, "error");
        var win = $.util.$("div.panel.window.messager-window:last").children("div.messager-body.panel-body.window-body"),
                opts = win.window("options"), panel = win.window("panel"), width = panel.outerWidth(), height = panel.outerHeight();
        if (width > 800 || height > 800) { win.window("resize", { width: width > 800 ? 800 : width, height: height > 800 ? 800 : height }); }
        win.window("center");
    };
    $.fn.form.defaults.onLoadError = onLoadError;
    $.fn.combobox.defaults.onLoadError = onLoadError;
    $.fn.combotree.defaults.onLoadError = onLoadError;
    $.fn.combogrid.defaults.onLoadError = onLoadError;
    $.fn.datagrid.defaults.onLoadError = onLoadError;
    $.fn.propertygrid.defaults.onLoadError = onLoadError;
    $.fn.tree.defaults.onLoadError = onLoadError;
    $.fn.treegrid.defaults.onLoadError = onLoadError;


    //  更改 jQuery.ajax 函数的部分默认属性。
    $.ajaxSetup({
        dataFilter: function (data, type) {
            return $.util.isString(type) && type.toLowerCase(type) == "json" ? $.string.toJSONString(data) : data;
        },
        error: onLoadError
    });

    $.union(coreJquery);
    $.fn.union(coreJquery.fn);
})(jQuery);