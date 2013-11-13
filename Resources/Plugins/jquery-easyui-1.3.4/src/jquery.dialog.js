/**
* jQuery EasyUI 1.3.4
* 
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact us: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/licensebtnommercial.php
*
*/
(function ($) {

    function createContent(target) {
        var cp = document.createElement("div");
        while (target.firstChild) {
            cp.appendChild(target.firstChild);
        }
        target.appendChild(cp);

        var contentPanel = $(cp);
        contentPanel.attr("style", $(target).attr("style"));
        $(target).removeAttr("style").css("overflow", "hidden");
        contentPanel.panel({ border: false, doSize: false, bodyCls: "dialog-content" });

        return contentPanel;
    };


    function initialize(target) {
        var opts = $.data(target, "dialog").options;
        var cp = $.data(target, "dialog").contentPanel;

        if (opts.toolbar) {
            if ($.isArray(opts.toolbar)) {
                $(target).find("div.dialog-toolbar").remove();
                var toolbar = $("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(target);
                var tr = toolbar.find("tr");
                for (var i = 0; i < opts.toolbar.length; i++) {
                    var tbItem = opts.toolbar[i];
                    if (tbItem == "-") {
                        $("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
                    } else {
                        var td = $("<td></td>").appendTo(tr);
                        var tbBtn = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
                        tbBtn[0].onclick = eval(tbItem.handler || function () { });
                        tbBtn.linkbutton($.extend({}, tbItem, { plain: true }));
                    }
                }
            } else {
                $(opts.toolbar).addClass("dialog-toolbar").prependTo(target);
                $(opts.toolbar).show();
            }
        } else {
            $(target).find("div.dialog-toolbar").remove();
        }

        if (opts.buttons) {
            if ($.isArray(opts.buttons)) {
                $(target).find("div.dialog-button").remove();
                var buttons = $("<div class=\"dialog-button\"></div>").appendTo(target);
                for (var i = 0; i < opts.buttons.length; i++) {
                    var p = opts.buttons[i];
                    var btn = $("<a href=\"javascript:void(0)\"></a>").appendTo(buttons);
                    if (p.handler) {
                        btn[0].onclick = p.handler;
                    }
                    btn.linkbutton(p);
                }
            } else {
                $(opts.buttons).addClass("dialog-button").appendTo(target);
                $(opts.buttons).show();
            }
        } else {
            $(target).find("div.dialog-button").remove();
        }

        var href = opts.href;
        var content = opts.content;
        opts.href = null;
        opts.content = null;
        cp.panel({
            closed: opts.closed, cache: opts.cache, href: href, content: content,
            onLoad: function () {
                if (opts.height == "auto") {
                    $(target).window("resize");
                }
                opts.onLoad.apply(target, arguments);
            }
        });
        $(target).window($.extend({}, opts, {
            onOpen: function () {
                if (cp.panel("options").closed) {
                    cp.panel("open");
                }
                if (opts.onOpen) {
                    opts.onOpen.call(target);
                }
            },
            onResize: function (width, height) {
                var current = $(target);
                cp.panel("panel").show();
                cp.panel("resize", {
                    width: current.width(),
                    height: (height == "auto") ? "auto" : current.height() - current.children("div.dialog-toolbar")._outerHeight() - current.children("div.dialog-button")._outerHeight()
                });
                if (opts.onResize) {
                    opts.onResize.call(target, width, height);
                }
            }
        }));
        opts.href = href;
        opts.content = content;
    };


    function refresh(target, href) {
        var contentPanel = $.data(target, "dialog").contentPanel;
        contentPanel.panel("refresh", href);
    };

    $.fn.dialog = function (options, param) {
        if (typeof options == "string") {
            var method = $.fn.dialog.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.window(options, param);
            }
        }
        options = options || {};
        return this.each(function () {
            var state = $.data(this, "dialog");
            if (state) {
                $.extend(state.options, options);
            } else {
                $.data(this, "dialog", {
                    options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), options),
                    contentPanel: createContent(this)
                });
            }
            initialize(this);
        });
    };

    $.fn.dialog.methods = {
        options: function (jq) {
            var _1a = $.data(jq[0], "dialog").options;
            var _1b = jq.panel("options");
            $.extend(_1a, { closed: _1b.closed, collapsed: _1b.collapsed, minimized: _1b.minimized, maximized: _1b.maximized });
            var _1c = $.data(jq[0], "dialog").contentPanel;
            return _1a;
        },
        dialog: function (jq) {
            return jq.window("window");
        },
        refresh: function (jq, href) {
            return jq.each(function () {
                refresh(this, href);
            });
        }
    };

    $.fn.dialog.parseOptions = function (target) {
        return $.extend({}, $.fn.window.parseOptions(target), $.parser.parseOptions(target, ["toolbar", "buttons"]));
    };

    $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
        title: "New Dialog",
        collapsible: false,
        minimizable: false,
        maximizable:
        false,
        resizable: false,
        toolbar: null,
        buttons: null
    });

})(jQuery);

