//
//================================================================================
//  该文件提供 Platform 平台项目的菜单处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//
(function ($) {
    window.platform.menus = new Object();



    //获取当前用户下某个菜单节点下所有的子菜单，如果子菜单含有多级目录，则返回的是一个递归的结果，该方法返回的数据格式和 window.platform.getRootMenus 相同。
    window.platform.menus.getMenusAndChildren = function (parentKey) {
        window.platform.checkLogin();
        var menus = $.plugin.getJsonDataRequestWebService("./Service/Platform/RoleService.asmx/GetMenusAndChildren", { parentKey: parentKey });
        return menus;
    };

    //根据某个菜单的 id 获取该菜单的详情信息
    window.platform.menus.getMenuById = function (menuId) {
        window.platform.checkLogin();
        var menu = $.plugin.getJsonDataRequestWebService("./Service/Platform/MenusService.asmx/GetMenuById", { menuId: menuId });
        return menu;
    };


    //添加某个菜单节点至当前登录用户的收藏夹中，如果添加成功则返回true，否则返回false。
    window.platform.menus.addToFavoById = function (menuId) {
        window.platform.checkLogin();
        var url = "./Service/Platform/MenusService.asmx/AddToFavoById";
        var result = $.plugin.getBooleanDataRequestWebService(url, { menuId: menuId });
        return result;
    };


})(jQuery);





