/*
==============================================================================
//  员工岗位管理信息页面 PositionManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PositionManage_aspx) { window.platform.PositionManage_aspx = new Object(); }
    window.platform.PositionManage_aspx.initPage = function (ajaxContainerSelector) {
        window.platform.PositionManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {
            $("#Tree", ajaxContainerSelector).tree({
                animate: true,
                onSelect: function (node) {
                    if (node.id == $(this).tree('getRoot').id) {
                        return;
                    }
                    var url = 'Views/Platform/PositionUpdate.aspx?key=' + node.id;
                    $("#Tab", ajaxContainerSelector).tabs('enableTab', '修改岗位');
                    $("#Tab", ajaxContainerSelector).tabs('select', '修改岗位');
                    $("#Tab", ajaxContainerSelector).tabs('getTab', '修改岗位').panel("refresh", url);
                },
                moveMenu: { up: true, upLevel: false, down: true, downLevel: false },
                onDrop: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    _move(node.id, source.id);
                }
            });
            _loadData();
        };

        var _bindButtonEvent = function () {
            $("#a_add", ajaxContainerSelector).click(_add);
            $("#a_del", ajaxContainerSelector).click(function () {
                var node = $("#Tree", ajaxContainerSelector).tree('getSelected');
                _del(node);
            });
            $("#a_refresh", ajaxContainerSelector).click(_loadData);
        };
        var _loadData = function () {
            window.platform.position.getTreeDataOfPosition(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
            });
        };
        ///添加岗位
        var _add = function () {
            $("#Tab", ajaxContainerSelector).tabs('select', '添加岗位');
        }
        ///删除岗位
        var _del = function (node) {
            if (!node || node.id == $("#Tree", ajaxContainerSelector).tree('getRoot').id) {
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
                    window.platform.position.deletePosition(node.id, _callback);
                }
            });
        }
        ///移动岗位
        var _move = function (targetId, sourseId) {
            var obj = {
                Target: targetId,
                Sourse: sourseId
            };
            window.platform.position.moveNode(obj);
        }
        _bindControl();
        _bindButtonEvent();

        window.platform.PositionManage_aspx.refreshAfterAdd = function () {
            var oldnode = $("#Tree", ajaxContainerSelector).tree('getSelected');
            window.platform.position.getTreeDataOfPosition(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                if (oldnode) {
                    var node = $("#Tree", ajaxContainerSelector).tree('find', oldnode.id);
                    $("#Tree", ajaxContainerSelector).tree('select', node.target);
                }
            });
        }
        window.platform.PositionManage_aspx.refreshAfterDelete = function () {
            window.platform.position.getTreeDataOfPosition(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
            });
            $("#Tab", ajaxContainerSelector).tabs('select', '添加岗位');
            $("#Tab", ajaxContainerSelector).tabs('disableTab', '修改岗位');
        }
    };
})(jQuery);