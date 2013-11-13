/*
==============================================================================
//  知识库类别管理信息页面 LoreTypeManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.platform = new Object(); }
    if (!window.lorelibs.LoreTypeManage_aspx) { window.lorelibs.LoreTypeManage_aspx = new Object(); }
    window.lorelibs.LoreTypeManage_aspx.initPage = function (ajaxContainerSelector) {
        window.lorelibs.LoreTypeManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {
            $("#Tree", ajaxContainerSelector).tree({
                autoToggle: false,
                toggleMenu: { submenu: false },
                animate: true,
                moveMenu: false,
                onSelect: function (node) {
                    var key = node.id;
                    if (key == $(this).tree('getRoot').id) {
                        return;
                    }
                    var url;
                    if ($.type(key) === "string") {
                        url = "Views/LoreLibs/LoreNodeUpdate.aspx?key=" + key;
                    }
                    else {
                        url = "Views/LoreLibs/LoreTypeUpdate.aspx?key=" + key;
                    }
                    $("#Tab", ajaxContainerSelector).tabs('enableTab', '修改类别');
                    $("#Tab", ajaxContainerSelector).tabs('select', '修改类别');
                    $("#Tab", ajaxContainerSelector).tabs('getTab', '修改类别').panel("refresh", url);
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
            window.lorelibs.loretype.getAllLoreType(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                window.lorelibs.loretype.getAllLoreNode(function (childrens) {
                    for (var i = 0; i < childrens.length; i++) {
                        childrens[i].id = new String(childrens[i].base.TypeKey + "_" + childrens[i].id);
                        childrens[i].iconCls = "icon-gears";
                        var node = $("#Tree", ajaxContainerSelector).tree('find', childrens[i].base.TypeKey);
                        var param = {
                            parent: node.target,
                            data: [childrens[i]]
                        };
                        $("#Tree", ajaxContainerSelector).tree("append", param);
                    }
                    var rootnode = $("#Tree", ajaxContainerSelector).tree('find', 0);
                    var allnodes = $("#Tree", ajaxContainerSelector).tree('getChildren', rootnode.target);
                    for (var i = 0; i < allnodes.length; i++) {
                        $('#Tree', ajaxContainerSelector).tree('collapse', allnodes[i].target);
                    }
                });
            });
        };

        var _add = function () {
            $("#Tab", ajaxContainerSelector).tabs('select', '添加类别');
        }

        var _del = function (node) {
            if (!node || node.id == $("#Tree", ajaxContainerSelector).tree('getRoot').id) {
                return;
            }
            if (!$("#Tree", ajaxContainerSelector).tree('isLeaf', node.target)) {
                $.plugin.messager.alert("提示", node.text + " 有子节点，请先删除!", "warning");
                return;
            }
            $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除类别成功。");
                            window.lorelibs.LoreTypeManage_aspx.refreshAfterDelete();
                        } else {
                            $.plugin.showMessage("删除类别失败。");
                        }
                    };
                    var key = node.id;
                    if ($.type(key) === "string") {
                        if (window.lorelibs.LoreNodeUpdate_aspx.isFrozen) {
                            $.plugin.showMessage("该节点被冻结，不允许删除!");
                        }
                        var nodekey = key.split("_")[1];
                        window.lorelibs.loretype.deleteLoreNode(nodekey, _callback);
                    }
                    else {
                        if (window.lorelibs.LoreTypeUpdate_aspx.isFrozen) {
                            $.plugin.showMessage("该类别被冻结，不允许删除!");
                        }
                        window.lorelibs.loretype.deleteLoreType(key, _callback);
                    }
                }
            });
        }

        var _move = function (targetId, sourseId, point) {

        }
        _bindControl();
        _bindButtonEvent();

        window.lorelibs.LoreTypeManage_aspx.refreshAfterAdd = function () {
            var oldnode = $("#Tree", ajaxContainerSelector).tree('getSelected');
            window.lorelibs.loretype.getAllLoreType(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
                window.lorelibs.loretype.getAllLoreNode(function (childrens) {
                    for (var i = 0; i < childrens.length; i++) {
                        childrens[i].id = new String(childrens[i].base.TypeKey + "_" + childrens[i].id);
                        childrens[i].iconCls = "icon-gears";
                        var node = $("#Tree", ajaxContainerSelector).tree('find', childrens[i].base.TypeKey);
                        var param = {
                            parent: node.target,
                            data: [childrens[i]]
                        };
                        $("#Tree", ajaxContainerSelector).tree("append", param);
                    }
                    if (oldnode) {
                        var _node = $("#Tree", ajaxContainerSelector).tree('find', oldnode.id);
                        $("#Tree", ajaxContainerSelector).tree('select', _node.target);
                    }
                });
            });
        }

        window.lorelibs.LoreTypeManage_aspx.refreshAfterDelete = function () {
            _loadData();
            $("#Tab", ajaxContainerSelector).tabs('select', '添加类别');
            $("#Tab", ajaxContainerSelector).tabs('disableTab', '修改类别');
        }

    };
})(jQuery);
