/*
==============================================================================
//  知识管理信息页面 LoreManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.platform = new Object(); }
    if (!window.lorelibs.LoreManage_aspx) { window.lorelibs.LoreManage_aspx = new Object(); }
    window.lorelibs.LoreManage_aspx.initPage = function (ajaxContainerSelector) {
        window.lorelibs.LoreManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {
            $("#Tree", ajaxContainerSelector).tree({
                autoToggle: false,
                toggleMenu: { submenu: false },
                animate: true,
                moveMenu: false,
                onSelect: function (node) {
                    var key = node.id;
                    var url;
                    if ($.type(key) === "string") {
                        url = "Views/LoreLibs/LoreList.aspx?key=" + key;
                    }
                    else {
                        url = "Views/LoreLibs/LoreStatistics.aspx?key=" + key;
                    }
                    $("#Panel", ajaxContainerSelector).panel("refresh", url);
                }
            });
            _loadData();
        };

        var _bindButtonEvent = function () {
            $("#a_expand", ajaxContainerSelector).click(function () { $("#Tree", ajaxContainerSelector).tree("expandAll") });
            $("#a_collapse", ajaxContainerSelector).click(function () { $("#Tree", ajaxContainerSelector).tree("collapseAll") });
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


        _bindControl();
        _bindButtonEvent();



    };
})(jQuery);
