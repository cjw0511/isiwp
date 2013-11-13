/*
==============================================================================
//  编辑证书页面 CertificateUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.CertificateUpdate_aspx) { window.platform.CertificateUpdate_aspx = new Object(); }

    window.platform.CertificateUpdate_aspx.initPage = function (ajaxContainerSelector, id) {
        ///定义验证规则
        $("#txtGetDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
//            validType: 'name'
            validType: ['name', 'updateValidate["证书名称","Services/Platform/CertificateService.asmx/AjaxValidate","Name",' + id + ']']
        });
        $("#txtIssuingUnit", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'unnormal'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.platform.employee.getCertificateById(id, function (certificate) {
            $(ajaxContainerSelector).form('loadData', certificate);
        });
    };
})(jQuery);