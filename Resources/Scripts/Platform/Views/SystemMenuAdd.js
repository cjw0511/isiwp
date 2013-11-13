/*
==============================================================================
//  添加菜单页面 SystemMenuAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.SystemMenuAdd_aspx) { window.platform.SystemMenuAdd_aspx = new Object(); }
    window.platform.SystemMenuAdd_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'insertValidate["菜单名称","Services/Platform/MenuService.asmx/AjaxValidate","Name"]'
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'insertValidate["菜单编号","Services/Platform/MenuService.asmx/AjaxValidate","Code"]'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.platform.menu.getTreeDataOfMenu(function (data) {
            $("#selParentKey", ajaxContainerSelector).combotree("loadData", data);
            if (key != "" && key != "0") {
                window.platform.menu.getMenuByKey(key, function (menu) {
                    $("#selParentKey", ajaxContainerSelector).combotree("setValue", menu.ParentKey);
                });
            }
        });
        $("#selIcon", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "IconValue",
            url: window.resolveUrl("Services/Platform/IconService.asmx/GetAllIcon"),
            panelHeight: 200,
            formatter: function (node) {
                return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + node.Name + '</div><div class="panel-icon ' + node.IconValue + '"></div></div>';
            },
            onLoadSuccess: function () {
                $(this).combobox("setValue", 0);
            }
        });
        $("#selLayoutType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            required: true,
            queryParams: { MainKey: 30 },
            panelHeight: 300
        });
        $("#selLayoutType", ajaxContainerSelector).combobox("setValue", 1);
        $("#txtNavigateUrl", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/MenuService.asmx/GetSystemFileNameNode"),
            panelHeight: 300,
            editable: true
        });
        $("#txtNavigateUrl", ajaxContainerSelector).combobox("setValue", 0);
    };
})(jQuery);