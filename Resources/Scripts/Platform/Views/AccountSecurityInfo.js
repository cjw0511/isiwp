/*
==============================================================================
//  账户安全信息页面 AccountSecurityInfo.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.AccountSecurityInfo_aspx) { window.platform.AccountSecurityInfo_aspx = new Object(); }
    window.platform.AccountSecurityInfo_aspx.initPage = function (ajaxContainerSelector) {
        window.platform.AccountSecurityInfo_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {
            window.platform.getCurrentUser(function (user) {
                $("#labLoginCode", ajaxContainerSelector).text(user.LoginCode);
                $("#labUserName", ajaxContainerSelector).text(user.Name);

            });
            window.platform.securityinfo.getCurrentUserSecurityInfo(function (securityinfo) {
                ///是否设置身份证号码
                if (securityinfo.IsSetIDcardProtect) {
                    $("#spnIdCard", ajaxContainerSelector).removeClass();
                    $("#spnIdCard", ajaxContainerSelector).addClass("setok");
                    $("#labIdCard", ajaxContainerSelector).text("已");
                    $('#btnIDcardUpdate', ajaxContainerSelector).linkbutton({ text: '修改设置' });
                    $("#btnIDcardDelete", ajaxContainerSelector).show();
                    $("#trIdCard", ajaxContainerSelector).show();
                    $("#IdCard", ajaxContainerSelector).text(securityinfo.IDcard);
                }
                else {
                    $("#spnIdCard", ajaxContainerSelector).removeClass();
                    $("#spnIdCard", ajaxContainerSelector).addClass("setno");
                    $("#labIdCard", ajaxContainerSelector).text("未");
                    $('#btnIDcardUpdate', ajaxContainerSelector).linkbutton({ text: '立即设置' });
                    $("#btnIDcardDelete", ajaxContainerSelector).hide();
                    $("#trIdCard", ajaxContainerSelector).hide();
                }
                ///是否设置电子邮箱
                if (securityinfo.IsSetEmailProtect) {
                    $("#spnEmail", ajaxContainerSelector).removeClass();
                    $("#spnEmail", ajaxContainerSelector).addClass("setok");
                    $("#labEmail", ajaxContainerSelector).text("已");
                    $('#btnEmailUpdate', ajaxContainerSelector).linkbutton({ text: '修改设置' });
                    $("#btnEmailDelete", ajaxContainerSelector).show();
                    $("#trEmail", ajaxContainerSelector).show();
                    $("#Email", ajaxContainerSelector).text(securityinfo.Email);
                }
                else {
                    $("#spnEmail", ajaxContainerSelector).removeClass();
                    $("#spnEmail", ajaxContainerSelector).addClass("setno");
                    $("#labEmail", ajaxContainerSelector).text("未");
                    $('#btnEmailUpdate', ajaxContainerSelector).linkbutton({ text: '立即设置' });
                    $("#btnEmailDelete", ajaxContainerSelector).hide();
                    $("#trEmail", ajaxContainerSelector).hide();
                }
                ///是否设置密保问题
                if (securityinfo.IsSetQuestionProtect) {
                    $("#spnQuestionProtect", ajaxContainerSelector).removeClass();
                    $("#spnQuestionProtect", ajaxContainerSelector).addClass("setok");
                    $("#labQuestionProtect", ajaxContainerSelector).text("已");
                    $('#btnQuestionProtectUpdate', ajaxContainerSelector).linkbutton({ text: '修改设置' });
                    $("#btnQuestionProtectDelete", ajaxContainerSelector).show();
                }
                else {
                    $("#spnQuestionProtect", ajaxContainerSelector).removeClass();
                    $("#spnQuestionProtect", ajaxContainerSelector).addClass("setno");
                    $("#labQuestionProtect", ajaxContainerSelector).text("未");
                    $('#btnQuestionProtectUpdate', ajaxContainerSelector).linkbutton({ text: '立即设置' });
                    $("#btnQuestionProtectDelete", ajaxContainerSelector).hide();
                }
            });
        };
        var _bindButtonEvent = function () {
            $("#btnPasswordUpdate", ajaxContainerSelector).click(function () {
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
                                _bindControl();
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
            $("#btnIDcardUpdate", ajaxContainerSelector).click(function () {
                $.plugin.showDialog({
                    title: "修改身份证号",
                    href: "Views/Platform/IDcardUpdate.aspx",
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var param = $(dialog).form('getData');
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("修改身份证号成功。");
                                _bindControl();
                            } else {
                                $.plugin.showMessage("修改身份证号失败。");
                            }
                        };
                        window.platform.securityinfo.currentUserSecurityInfoIDcardUpdate(param, _callback);
                    },
                    width: 500,
                    height: 210
                });
            });
            $("#btnIDcardDelete", ajaxContainerSelector).click(function () {
                $.plugin.showDialog({
                    title: "密码验证",
                    href: "Views/Platform/CheckPassword.aspx",
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var param = $(dialog).form('getData');
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除身份证号成功。");
                                _bindControl();
                            } else {
                                $.plugin.showMessage("删除身份证号失败。");
                            }
                        };
                        window.platform.securityinfo.currentUserSecurityInfoIDcardDelete(param, _callback);
                    },
                    width: 550,
                    height: 150
                });
            });
            $("#btnEmailUpdate", ajaxContainerSelector).click(function () {
                $.plugin.showDialog({
                    title: "修改电子邮箱",
                    href: "Views/Platform/EmailUpdate.aspx",
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var param = $(dialog).form('getData');
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("修改电子邮箱成功。");
                                _bindControl();
                            } else {
                                $.plugin.showMessage("修改电子邮箱失败。");
                            }
                        };
                        window.platform.securityinfo.currentUserSecurityInfoEmailUpdate(param, _callback);
                    },
                    width: 550,
                    height: 210
                });
            });
            $("#btnEmailDelete", ajaxContainerSelector).click(function () {
                $.plugin.showDialog({
                    title: "密码验证",
                    href: "Views/Platform/CheckPassword.aspx",
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var param = $(dialog).form('getData');
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除电子邮箱成功。");
                                _bindControl();
                            } else {
                                $.plugin.showMessage("删除电子邮箱失败。");
                            }
                        };
                        window.platform.securityinfo.currentUserSecurityInfoEmailDelete(param, _callback);
                    },
                    width: 550,
                    height: 150
                });
            });
            $("#btnQuestionProtectUpdate", ajaxContainerSelector).click(function () {
                $.plugin.showDialog({
                    title: "修改密保问题",
                    href: "Views/Platform/QuestionProtectUpdate.aspx",
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var param = $(dialog).form('getData');
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("修改密保问题成功。");
                                _bindControl();
                            } else {
                                $.plugin.showMessage("修改密保问题失败。");
                            }
                        };
                        window.platform.securityinfo.currentUserSecurityInfoQuestionProtectUpdate(param, _callback);
                    },
                    width: 600,
                    height: 335
                });
            });
            $("#btnQuestionProtectDelete", ajaxContainerSelector).click(function () {
                $.plugin.showDialog({
                    title: "密码验证",
                    href: "Views/Platform/CheckPassword.aspx",
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var param = $(dialog).form('getData');
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除密保问题成功。");
                                _bindControl();
                            } else {
                                $.plugin.showMessage("删除密保问题失败。");
                            }
                        };
                        window.platform.securityinfo.currentUserSecurityInfoQuestionProtectDelete(param, _callback);
                    },
                    width: 550,
                    height: 150
                });
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);