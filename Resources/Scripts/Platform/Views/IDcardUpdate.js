/*
==============================================================================
// 身份证修改页面 IDcardUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.IDcardUpdate_aspx) { window.platform.IDcardUpdate_aspx = new Object(); }
    window.platform.IDcardUpdate_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#NewIDcard", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'idCard'
        });
        $("#CheckPwd", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'CheckPwd'
        });
        window.platform.securityinfo.getCurrentUserSecurityInfo(function (securityinfo) {
            $("#OldIDcard", ajaxContainerSelector).text(securityinfo.IDcard);
        });
    };
})(jQuery);
//    String.prototype.hideIDcard = function () {
//        if (this.isNullOrWhiteSpace()) {
//            return '';
//        }
//        else {
//            return this.left(6) + '********' + this.right(4);
//        }
//    }