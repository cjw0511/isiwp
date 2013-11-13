/*
==============================================================================
//  法人代表信息页面 LegalRepInfo.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.LegalRepInfo_aspx) { window.platform.LegalRepInfo_aspx = new Object(); }
    window.platform.LegalRepInfo_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'name'
        });
        $("#txtPost", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtAuthorizeOrgan", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtCretifCode", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtTel", ajaxContainerSelector).validatebox({
            validType: 'tel'
        });
        $("#txtPhone", ajaxContainerSelector).validatebox({
            validType: 'mobile'
        });
        $("#txtEmail", ajaxContainerSelector).validatebox({
            validType: 'email'
        });
        $("#txtAddress", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtRemark", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#selCretifType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 31 }
        });
        ///绑定数据信息
        window.platform.company.getLegalRepInfo(function (legalRep) {
            $(ajaxContainerSelector).form('loadData', legalRep);
        });
    };
})(jQuery);