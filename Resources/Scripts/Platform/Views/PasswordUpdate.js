/*
==============================================================================
//  密码修改页面 PasswordUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PasswordUpdate_aspx) { window.platform.PasswordUpdate_aspx = new Object(); }
    window.platform.PasswordUpdate_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        window.platform.securityinfo.getCurrentUserSecurityInfo(function (info) {
            $("#txtOldPwd", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'CheckPwd["' + info.Password + '"]'
            });
        });
        $("#txtNewPwd", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'password'
        });
        $("#txtRePwd", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'equals["#txtNewPwd"]'
        });
    };
})(jQuery);