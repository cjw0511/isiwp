(function ($) {
    window.loginFormId = "#loginForm";
    window.warningMessage = ".warningMessage";
    window.loginCodeId = "";
    window.passwordId = "";
    window.txtVerifyCodeId = "";
    window.imgVerifyCodeId = "";
    window.loginButtonId = "";
    window.resetButtonId = "";

    window.getInputAccount = function () {
        return $(window.loginFormId).form("getData");
    };
    window.bindButtonEvent = function () {
        $(window.loginButtonId).click(function () {
            $(window.loginCodeId).validatebox("validate");
            if ($(window.loginFormId).form("validate")) {
                var account = window.getInputAccount();
                window.platform.login(account.loginCode, account.password, account.verifyCode);
            }
        });
        $(window.resetButtonId).click(function () {
            $(window.loginFormId).form("clear");
            window.refreshVerifyCode();
            $(window.warningMessage).hide().text("");
            $(window.loginCodeId).focus();
        });

        $(window.imgVerifyCodeId).click(function () {
            window.refreshVerifyCode();
        });

        $(window.loginCodeId).bind({
            "keydown": function (e) { if (e.which == 13) { $(window.passwordId).focus(); } },
            "focus": function (e) { this.select(); }
        });
        $(window.passwordId).bind({
            "keydown": function (e) { if (e.which == 13) { $(window.txtVerifyCodeId).focus(); } },
            "focus": function (e) { this.select(); }
        });
        $(window.txtVerifyCodeId).bind({
            "keydown": function (e) { if (e.which == 13) { $(window.loginButtonId).focus(); } },
            "focus": function (e) { this.select(); }
        });
    };


    window.refreshVerifyCode = function () {
        var v = Math.random();
        var src = "./Services/Platform/VerifyCode.ashx?v=" + v;
        $(window.imgVerifyCodeId).attr("src", src);
    };
})(jQuery);




