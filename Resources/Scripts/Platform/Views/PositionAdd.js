/*
==============================================================================
//  岗位添加页面 PositionAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PositionAdd_aspx) { window.platform.PositionAdd_aspx = new Object(); }

    window.platform.PositionAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["岗位名称","Services/Platform/PositionService.asmx/AjaxValidate","Name"]']
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["岗位编号","Services/Platform/PositionService.asmx/AjaxValidate","Code"]']
            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var position = $(ajaxContainerSelector).form('getData');
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("添加岗位成功。");
                        window.platform.PositionManage_aspx.refreshAfterAdd();
                        $(ajaxContainerSelector).form("clear");
                    } else {
                        $.plugin.showMessage("添加岗位失败。");
                    }
                };
                window.platform.position.addPosition(position, _callback);
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);