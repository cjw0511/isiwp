/*
==============================================================================
//  添加问题分析关联资产页面 SubProjectPropertyAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectPropertyAdd_aspx) { window.project.SubProjectPropertyAdd_aspx = new Object(); }
    window.project.SubProjectPropertyAdd_aspx.initPage = function (ajaxContainerSelector, subkey, syskey) {
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

        var _bindButtonEvent = function () {


        };
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);