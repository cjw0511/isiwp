/*
==============================================================================
//  岗位编辑页面 PositionUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PositionUpdate_aspx) { window.platform.PositionUpdate_aspx = new Object(); }

    window.platform.PositionUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["岗位名称","Services/Platform/PositionService.asmx/AjaxValidate","Name",' + key + ']']
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["岗位编号","Services/Platform/PositionService.asmx/AjaxValidate","Code",' + key + ']']
            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            window.platform.position.getPositionByKey(key, function (position) {
                $(ajaxContainerSelector).form('loadData', position);
            });
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var position = $(ajaxContainerSelector).form('getData');
                $.extend(position, { Key: key });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改岗位成功。");
                        window.platform.PositionManage_aspx.refreshAfterAdd();
                    } else {
                        $.plugin.showMessage("修改岗位失败。");
                    }
                };
                window.platform.position.updatePosition(position, _callback);
            });
            $("#btnDelete", ajaxContainerSelector).click(function () {
                var node = $("#Tree", window.platform.PositionManage_aspx.ajaxContainerSelector).tree('find', key);
                if (!$("#Tree", window.platform.PositionManage_aspx.ajaxContainerSelector).tree('isLeaf', node.target)) {
                    $.plugin.showMessage("提示", node.text + " 有子节点，请先删除!");
                    return;
                }
                $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除岗位成功。");
                                window.platform.PositionManage_aspx.refreshAfterDelete();
                            } else {
                                $.plugin.showMessage("删除岗位失败。");
                            }
                        };
                        window.platform.position.deletePosition(key, _callback);
                    }
                });
            });
        };

        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);