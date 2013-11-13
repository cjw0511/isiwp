///////////////////////////////////////////////////////////////////////////
/// 提供通过轮询方式来校验当前登录状态的方法
///////////////////////////////////////////////////////////////////////////
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.checkLoginTask) { window.platform.checkLoginTask = new Object(); }

    var _run = true;
    var _timeout = 0;
    var _delay = 60000;

    var _start = function (delay) {
        var run = function () {
            window.platform.checkLogin();
            if (_run) { window.setTimeout(run, delay); }
        };
        if (_run) { run(); }
    };
    //开始自动轮询校验登录状态；该方法有两个参数：
    //timeout：可选，表示开始第一次轮询的等待时间，默认为 0 表示不等待。
    //delay：表示两次轮询的间隔时间；默认为 60 秒，最小为 30 秒。
    window.platform.checkLoginTask.start = function (timeout, delay) {
        var t, d;
        if (arguments.length == 0) { t = 0; d = 60000; }
        if (arguments.length == 1) { t = 0; d = timeout; }
        if (arguments.length == 2) { t = timeout; d = delay; }
        if (!$.isNumeric(timeout) || timeout < 0) { timeout = 0; }
        if (!$.isNumeric(delay) || delay < 3000) { $.error("传入的参数 delay 必须是数字且不能低于 30 "); }
        var _do = function () { _start(delay); };
        if (timeout == 0) { _do(); } else { window.setTimeout(_do, timeout); }
    };


    var _stop = function () { _run = false; };
    //停止自动轮询校验登录状态。
    window.platform.checkLoginTask.stop = function (delay) {
        if (!delay) { delay = 0; }
        if (delay == 0) { _stop(); } else { window.setTimeout(_stop, delay); }
    };

    window.platform.checkLoginTask.start(_timeout, _delay);
})(jQuery);