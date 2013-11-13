/*
==============================================================================
// 电子邮箱修改页面 EmailUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.EmailUpdate_aspx) { window.platform.EmailUpdate_aspx = new Object(); }
    window.platform.EmailUpdate_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#NewEmail", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'email'
        });
        $("#CheckPwd", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'CheckPwd'
        });
        window.platform.securityinfo.getCurrentUserSecurityInfo(function (securityinfo) {
            $("#OldEmail", ajaxContainerSelector).text(securityinfo.Email);
        });
    };
})(jQuery);