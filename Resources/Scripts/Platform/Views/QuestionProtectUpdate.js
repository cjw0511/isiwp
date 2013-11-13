/*
==============================================================================
// 密码保护问题页面 QuestionProtectUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.QuestionProtectUpdate_aspx) { window.platform.QuestionProtectUpdate_aspx = new Object(); }
    window.platform.QuestionProtectUpdate_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtQuestion1", ajaxContainerSelector).validatebox({
            required: true
        });
        $("#txtAnswer1", ajaxContainerSelector).validatebox({
            required: true
        });
        $("#txtQuestion2", ajaxContainerSelector).validatebox({
            required: true
        });
        $("#txtAnswer2", ajaxContainerSelector).validatebox({
            required: true
        });
        $("#txtQuestion3", ajaxContainerSelector).validatebox({
            required: true
        });
        $("#txtAnswer3", ajaxContainerSelector).validatebox({
            required: true
        });
        $("#CheckPwd", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'CheckPwd'
        });
        window.platform.securityinfo.getCurrentUserSecurityInfo(function (securityinfo) {
//            $(ajaxContainerSelector).form('loadData', securityinfo);
            $("#txtQuestion1", ajaxContainerSelector).val(securityinfo.Question1);
            $("#txtAnswer1", ajaxContainerSelector).val(securityinfo.Answer1);
            $("#txtQuestion2", ajaxContainerSelector).val(securityinfo.Question2);
            $("#txtAnswer2", ajaxContainerSelector).val(securityinfo.Answer2);
            $("#txtQuestion3", ajaxContainerSelector).val(securityinfo.Question3);
            $("#txtAnswer3", ajaxContainerSelector).val(securityinfo.Answer3);
        });
    };
})(jQuery);