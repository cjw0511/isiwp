/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact us: jeasyui@gmail.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI combobox Extensions 1.0 beta
* jQuery EasyUI combobox 组件扩展
* jeasyui.extensions.combobox.js
* 二次开发 陈建伟
* 最近更新：2013-05-21
*
* 依赖项：
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/

/*
功能说明：
*/
(function ($, undefined) {


    $.fn.combobox.extensions = {};



    var loader = function (param, success, error) {
        var opts = $(this).combobox('options');
        if (!opts.url) return false;
        if (opts.queryParams) {
            var p = $.util.parseMapFunction(opts.queryParams);
            param = $.extend({}, param, p);
        }
        $.ajax({
            type: opts.method, url: opts.url, data: param, dataType: 'json',
            success: function (data) { success(data); },
            error: function () { error.apply(this, arguments); }
        });
    };

    function load(target, param) {
        var t = $.util.parseJquery(target);
        if (!param) { return; }
        if (typeof param === "string") { return t.combobox("reload", param); }
        var opts = t.combobox("options");
        opts.queryParams = param;
        t.combobox("reload");
    }

    var defaults = $.fn.combobox.extensions.defaults = {

        //  增加 easyui-combobox 控件默认参数 queryParams；该参数表示从远程服务器调取数据时发送的额外查询参数；该参数应该定义为一个 JSON 对象。
        //  默认为 null。
        queryParams: null,

        //  重新定义 easyui-combobox 控件的默认属性 loader，使之能处理 queryParams 参数。
        loader: loader
    };

    var methods = $.fn.combobox.extensions.methods = {

        //  增加 easyui-combobox 控件的 load 方法；该方法用于以指定的参数查询重新加载远程数据；该方法定义如下参数：
        //      param:  可选；参数类型可以如下：
        //          String: 
        //          JSON Object: 表示要发送至远程服务器查询数据的参数。
        load: function (jq, param) { return jq.each(function () { load(this, param); }); }
    };

    $.extend($.fn.combobox.defaults, defaults);
    $.extend($.fn.combobox.methods, methods);

})(jQuery);