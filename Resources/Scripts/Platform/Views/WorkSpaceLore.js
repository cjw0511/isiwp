/*
==============================================================================
//  主页中个人基本信息页面 WorkSpacePersonalInfo.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.WorkSpaceLore_aspx) { window.platform.WorkSpaceLore_aspx = new Object(); }

    window.platform.WorkSpaceLore_aspx.initPage = function (ajaxContainerSelector) {

        var _bindControl = function () {
            $("#btnProcess1", ajaxContainerSelector).click(function () {
                window.addTab({ title: "知识库字段维护", href: "Views/LoreLibs/LoreFieldManage.aspx", iconCls: '', closable: true, selected: true });
            });
            $("#btnProcess2", ajaxContainerSelector).click(function () {
                window.addTab({ title: "知识库类别管理", href: "Views/LoreLibs/LoreTypeManage.aspx", iconCls: '', closable: true, selected: true });
            });
            $("#btnProcess3", ajaxContainerSelector).click(function () {
                window.addTab({ title: "知识管理", href: "Views/LoreLibs/LoreManage.aspx", iconCls: '', closable: true, selected: true });
            });
            $("#btnProcess4", ajaxContainerSelector).click(function () {
                window.addTab({ title: "通用指标管理", href: "Views/LoreLibs/CommonNormManage.aspx", iconCls: '', closable: true, selected: true });
            });
            $("#btnProcess5", ajaxContainerSelector).click(function () {
                window.addTab({ title: "行业指标管理", href: "Views/LoreLibs/TradeNormManage.aspx", iconCls: '', closable: true, selected: true });
            });
        };

        var _bindButtonEvent = function () {
        };
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);