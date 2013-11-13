/*
==============================================================================
//  添加证书页面 CertificateAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.CertificateAdd_aspx) { window.platform.CertificateAdd_aspx = new Object(); }

    window.platform.CertificateAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtGetDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
//            validType: 'name'
            validType: ['name', 'insertValidate["证书名称","Services/Platform/CertificateService.asmx/AjaxValidate","Name"]']
        });
        $("#txtIssuingUnit", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'unnormal'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
    };
})(jQuery);