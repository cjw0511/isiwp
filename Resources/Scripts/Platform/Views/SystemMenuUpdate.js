/*
==============================================================================
//  编辑菜单页面 SystemMenuUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.SystemMenuUpdate_aspx) { window.platform.SystemMenuUpdate_aspx = new Object(); }
    window.platform.SystemMenuUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'updateValidate["菜单名称","Services/Platform/MenuService.asmx/AjaxValidate","Name",' + key + ']'
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'updateValidate["菜单编号","Services/Platform/MenuService.asmx/AjaxValidate","Code",' + key + ']'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.platform.menu.getTreeDataOfMenu(function (data) {
            $("#selParentKey", ajaxContainerSelector).combotree("loadData", data);
        });
        $("#selIcon", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "IconValue",
            url: window.resolveUrl("Services/Platform/IconService.asmx/GetAllIcon"),
            panelHeight: 200,
            formatter: function (node) {
                return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + node.Name + '</div><div class="panel-icon ' + node.IconValue + '"></div></div>';
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
        window.platform.menu.getMenuByKey(key, function (menu) {
            $(ajaxContainerSelector).form('loadData', menu);
            $("#txtNavigateUrl", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/MenuService.asmx/GetSystemFileNameNode"),
                panelHeight: 300,
                editable: true,
                onLoadSuccess: function () {
                    $("#txtNavigateUrl", ajaxContainerSelector).combobox("setText", menu.NavigateUrl);
                }
            });
        });
    };
})(jQuery);