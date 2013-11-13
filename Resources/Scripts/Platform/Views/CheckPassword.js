/*
==============================================================================
// 密码验证页面 CheckPassword.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.CheckPassword_aspx) { window.platform.CheckPassword_aspx = new Object(); }
    window.platform.CheckPassword_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        window.platform.securityinfo.getCurrentUserSecurityInfo(function (info) {
            $("#CheckPwd", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'CheckPwd["' + info.Password + '"]'
            });
        });
    };
})(jQuery);