/*
==============================================================================
//  编辑问题分析关联资产页面 SubProjectPropertyUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectPropertyUpdate_aspx) { window.project.SubProjectPropertyUpdate_aspx = new Object(); }
    window.project.SubProjectPropertyUpdate_aspx.initPage = function (ajaxContainerSelector, porkey, subkey, syskey) {
        $.extend($.fn.validatebox.defaults.rules, {
            float: {
                validator: function (value) {
                    return (/^\d+\.\d+$/ || /^\\d+$/.test(value))
                },
                message: '输入的格式必须为正小数！'
            }
        })
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'FullName'
            });
            $("#txtImportanceC", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'float'
            });
            $("#txtImportanceI", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'float'
            });
            $("#txtImportanceA", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'float'
            });
        };
        window.project.report.getPropertyByKey(porkey, function (property) {
            $(ajaxContainerSelector).form('loadData', property);
        });
        var _bindButtonEvent = function () {


        };
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);