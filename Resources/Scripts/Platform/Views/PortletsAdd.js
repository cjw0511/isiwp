/*
==============================================================================
//  主页portlets添加PortletsAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PortletsAdd_aspx) { window.platform.PortletsAdd_aspx = new Object(); }
    window.platform.PortletsAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtTitle", ajaxContainerSelector).validatebox({
            required: true,
            //            validType: 'name'
            validType: ['title', 'insertValidate["面板标题","Services/Platform/PortletsService.asmx/AjaxValidate","Title"]']
        });

        $("#selIcon", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "IconValue",
            url: window.resolveUrl("Services/Platform/IconService.asmx/GetAllIcon"),
            panelHeight: 200,
            formatter: function (node) {
                return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + node.Name + '</div><div class="panel-icon ' + node.Name + '"></div></div>';
            }
        });
        $("#selIcon", ajaxContainerSelector).combobox("setValue", 0);

        $("#txtHeight", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'number'
        });

        $("#txtNavigateUrl", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/MenuService.asmx/GetSystemFileNameNode"),
            panelHeight: 300,
            editable: true
        });
    };
})(jQuery);