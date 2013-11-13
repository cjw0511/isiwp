/*
==============================================================================
//  单位基本信息页面 CompanyBasicInfo.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.CompanyBasicInfo_aspx) { window.platform.CompanyBasicInfo_aspx = new Object(); }

    window.platform.CompanyBasicInfo_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtCompCode", ajaxContainerSelector).validatebox({
                validType: 'code'
            });
            $("#txtOrgCode", ajaxContainerSelector).validatebox({
                validType: 'code'
            });
            $("#txtCompName", ajaxContainerSelector).validatebox({
                validType: 'name',
                required: true
            });
            $("#txtCompEngName", ajaxContainerSelector).validatebox({
                validType: 'english'
            });
            $("#txtRegAddr", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            $("#txtRegAddrZipCode", ajaxContainerSelector).validatebox({
                validType: 'zipCode'
            });
            $("#txtAddress", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            $("#txtZipCode", ajaxContainerSelector).validatebox({
                validType: 'zipCode'
            });
            $("#txtEmail", ajaxContainerSelector).validatebox({
                validType: 'email'
            });
            $("#txtTel", ajaxContainerSelector).validatebox({
                validType: 'telOrMobile'
            });
            $("#txtBusiCretifCode", ajaxContainerSelector).validatebox({
                validType: 'code'
            });
            $("#txtBusiCretifValidity", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtTaxCode", ajaxContainerSelector).validatebox({
                validType: 'code'
            });
            $("#txtEmpCounts", ajaxContainerSelector).validatebox({
                validType: 'integer'
            });
            $("#txtTechEmpCounts", ajaxContainerSelector).validatebox({
                validType: 'integer'
            });
            $("#txtAssetsTotal", ajaxContainerSelector).validatebox({
                validType: 'number'
            });
            $("#txtFixedAssetsTotal", ajaxContainerSelector).validatebox({
                validType: 'number'
            });
            $("#txtDebtAssetRatio", ajaxContainerSelector).validatebox({
                validType: 'number'
            });
            $("#selEconomicType", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 1 }
            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            $("#txtLegalPerson", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    window.addTab({ title: "法人信息", href: "Views/Platform/LegalPersonInfo.aspx", iconCls: '', closable: true, selected: true });
                }
            });
            $("#txtLegalPerson", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            ///绑定数据信息
            window.platform.company.getCompanyInfo(function (company) {
//                company.BusiCretifValidity = "";
                $(ajaxContainerSelector).form('loadData', company);
                window.platform.company.getLegalPersonInfo(function (legalPerson) {
                    $("#txtLegalPerson", ajaxContainerSelector).searchbox("setValue", legalPerson.Name);
                });
            });
        };

        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var company = $(ajaxContainerSelector).form('getData');
                var _callback = function (success) {
                    if (success) {
                        $.plugin.messager.alert("操作提醒", "编辑单位基本信息成功。", "info");
                    } else {
                        $.plugin.messager.alert("操作提醒", "编辑单位基本信息失败。", "warning");
                    }
                };
                window.platform.company.updateCompanyInfo(company, _callback);
            });
            $("#btnRefresh", ajaxContainerSelector).click(function () {
                window.platform.company.getCompanyInfo(function (company) {
                    //                company.BusiCretifValidity = "";
                    $(ajaxContainerSelector).form('loadData', company);
                    window.platform.company.getLegalPersonInfo(function (legalPerson) {
                        $("#txtLegalPerson", ajaxContainerSelector).searchbox("setValue", legalPerson.Name);
                    });
                });
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);