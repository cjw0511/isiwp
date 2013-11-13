(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.menumain) { window.platform.menumain = new Object(); }
    var _resolveUrl = window.resolveUrl;

    var treeId = "#menuMainTree";


    var singleSelect = function (node) {
        var url;
        if (node.attributes && node.attributes.url) { url = node.attributes.url; }
        var clen = $(treeId).tree("getChildren", node.target).length;
        if (clen == 0) { window.addTab({ title: node.text, href: url, iconCls: node.iconCls, closable: true, selected: true }); }
    };
    var initTree = function (data) {
        $(treeId).tree({
            animate: true,
            onSelect: function (node) { singleSelect(node); },
            onAfterEdit: function (node) { $.plugin.showMessage("您已经更改: " + node.id + ", text:" + node.text); },
            toggleMenu: { submenu: false },
            data: data,
            nodeContextMenus: [
                    { text: "打开/转到", iconCls: "icon-add-menu", handler: function (e, tree, node) { $(tree).tree("select", node.target); } },
                    { text: "取消选择", iconCls: "icon-tree-state", handler: function (e, tree, node) { window.platform.menumain.unselect(); } },
                    "-",
                    { text: "添加至收藏夹", iconCls: "icon-favo-add", handler: function (e, tree, node) { window.platform.menumain.addfavo(node); } },
                    { text: "重命名", iconCls: "icon-edit", handler: function (e, tree, node) { window.platform.menumain.editMenuName(node); } }
                ]
        });
    };
    window.platform.menumain.loadTreeData = function (key) {
        window.platform.authmenus.getMenu(key, function (node) {
            window.platform.authmenus.getMenus(key, function (data) {
                node.children = data;
                initTree([node]);
                window.platform.menumain.collapseChildren();
            });
        });
    };
    window.platform.menumain.expandCurrent = function () {
        var node = $(treeId).tree('getSelected');
        if (!node) { $.plugin.messager.alert("操作提醒", "选中菜单后方能执行该操作。", "warning"); return; }
        $(treeId).tree('expand', node.target);
    };
    window.platform.menumain.collapseChildren = function () {
        var roots = $(treeId).tree("getRoots");
        for (var i = 0; i < roots.length; i++) {
            var children = (roots.length > 1 ? roots : $(treeId).tree("getChildren", roots[i].target));
            for (var j = 0; j < children.length; j++) { $(treeId).tree("collapseAll", children[j].target); }
        }
    };
    window.platform.menumain.collapseCurrent = function () {
        var node = $(treeId).tree('getSelected');
        if (!node) { $.plugin.messager.alert("操作提醒", "选中菜单后方能执行该操作。", "warning"); return; }
        $(treeId).tree('collapse', node.target);
    };
    window.platform.menumain.expand = function () {
        var node = $(treeId).tree('getSelected');
        if (!node) { $.plugin.messager.alert("操作提醒", "选中菜单后方能执行该操作。", "warning"); return; }
        var children = $(treeId).tree("getChildren", node.target);
        $(treeId).tree("expand", node.target);
        for (var i = 0; i < children.length; i++) { $(treeId).tree("expand", children[i].target); }
    };
    window.platform.menumain.collapse = function () {
        var node = $(treeId).tree('getSelected');
        if (!node) { $.plugin.messager.alert("操作提醒", "选中菜单后方能执行该操作。", "warning"); return; }
        var children = $(treeId).tree("getChildren", node.target);
        $(treeId).tree("collapse", node.target);
        for (var i = 0; i < children.length; i++) { $(treeId).tree("collapse", children[i].target); }
    };
    window.platform.menumain.expandAll = function () { $(treeId).tree('expandAll'); };
    window.platform.menumain.collapseAll = function () { $(treeId).tree('collapseAll'); };
    window.platform.menumain.unselect = function () {
        var node = $(treeId).tree('getSelected');
        if (node && node.target) { $(node.target).removeClass("tree-node-selected"); }
    };
    window.platform.menumain.addfavo = function (node) {
        if (!node) { var node = $(treeId).tree('getSelected'); }
        if (!node) { $.plugin.messager.alert("操作提醒", "选中菜单后方能执行该操作。", "warning"); return; }
        //        var b = window.platform.menus.addToFavoById(node.id);
        //        if (b) {
        //            $.plugin.messager.alert("操作提醒", "将菜单\"" + node.text + "\"添加至收藏夹成功！", "info");
        //        } else {
        //            $.plugin.messager.alert("操作提醒", "将菜单\"" + node.text + "\"添加至收藏夹失败，详情请查看操作日志！", "warning");
        //        }
    };
    window.platform.menumain.editMenuName = function (node) {
        if (!node) { var node = $(treeId).tree('getSelected'); }
        if (!node) { $.plugin.messager.alert("操作提醒", "选中菜单后方能执行该操作。", "warning"); return; }
        $(treeId).tree("beginEdit", node.target);
    };
})(jQuery);