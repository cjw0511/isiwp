/*
==============================================================================
//  设置职能范围页面 FunctionRangeSetting.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.FunctionRangeSetting_aspx) { window.platform.FunctionRangeSetting_aspx = new Object(); }
    window.platform.FunctionRangeSetting_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            $("#Tree", ajaxContainerSelector).tree({
                animate: true,
                checkbox: true,
                cascadeCheck: false,
                onCheck: function (node) {
                    if (node.id == 0) {
                        $(this).tree('uncheck', node.target);
                    }
                }
            });
            window.platform.department.getTreeDataOfDepartment(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                var param = {
                    Key: key
                };
                window.platform.department.getFunctionRange(param, function (keys) {
                    if (!keys.isNullOrWhiteSpace()) {
                        var nodes = keys.split(",");
                        $.each(nodes, function (i, n) {
                            var node = $("#Tree", ajaxContainerSelector).tree('find', n);
                            $("#Tree", ajaxContainerSelector).tree("check", node.target);
                        });
                    }
                });
            });
        };
        var _bindButtonEvent = function () {
            $("#menu_expand", ajaxContainerSelector).click(function () {
                $('#Tree', ajaxContainerSelector).tree('expandAll');
            });
            $("#menu_collapse", ajaxContainerSelector).click(function () {
                $('#Tree', ajaxContainerSelector).tree('collapseAll');
            });
        }
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);