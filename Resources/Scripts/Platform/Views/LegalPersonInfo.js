/*
==============================================================================
//  法人信息页面 LegalPersonInfo.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.LegalPersonInfo_aspx) { window.platform.LegalPersonInfo_aspx = new Object(); }
    window.platform.LegalPersonInfo_aspx.initPage = function (ajaxContainerSelector) {
        window.platform.LegalPersonInfo_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                validType: 'name',
                required: true
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                validType: 'code'
            });
            $("#txtRegisterCode", ajaxContainerSelector).validatebox({
                validType: 'code'
            });
            $("#txtIssuedOrgan", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            $("#txtValidityBegin", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtValidityEnd", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtAddress", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            $("#selLegalPersonType", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 2 }
            });

            $("#txtLegalRepInfo", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    $.plugin.showDialog({
                        title: "编辑法人代表",
                        href: "Views/Platform/LegalRepInfo.aspx",
                        onSave: function (dialog) {
                            var verifyResult = $(dialog).form("validate");
                            if (!verifyResult) { return false };
                            var legalRep = $(dialog).form('getData');
                            var _callback = function (success) {
                                if (success) {
                                    $.plugin.showMessage("编辑法人代表信息成功。");
                                    window.platform.company.getLegalRepInfo(function (legalRep) {
                                        $("#txtLegalRepInfo", ajaxContainerSelector).searchbox("setValue", legalRep.Name);
                                    });
                                } else {
                                    $.plugin.showMessage("编辑法人代表信息失败。");
                                }
                            };
                            window.platform.company.updateLegalRepInfo(legalRep, _callback);
                        },
                        width: 900,
                        height: 370
                    });
                }
            });
            $("#txtLegalRepInfo", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

            ///绑定数据信息
            window.platform.company.getLegalPersonInfo(function (legalPerson) {
                $(ajaxContainerSelector).form('loadData', legalPerson);
                window.platform.company.getLegalRepInfo(function (legalRep) {
                    $("#txtLegalRepInfo", ajaxContainerSelector).searchbox("setValue", legalRep.Name);
                });
            });        
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var legalPerson = $(ajaxContainerSelector).form('getData');
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("编辑法人信息成功。");
                    } else {
                        $.plugin.showMessage("编辑法人信息失败。");
                    }
                };
                window.platform.company.updateLegalPersonInfo(legalPerson, _callback);
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);