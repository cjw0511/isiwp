/*
==============================================================================
//  主页portlets编辑 PortletsUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PortletsUpdate_aspx) { window.platform.PortletsUpdate_aspx = new Object(); }
    window.platform.PortletsUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtTitle", ajaxContainerSelector).validatebox({
            required: true,
            //            validType: 'name'
            validType: ['title', 'updateValidate["面板标题","Services/Platform/PortletsService.asmx/AjaxValidate","Title",' + key + ']']
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

        $("#txtHeight", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'number'
        });

        window.platform.portlets.getPortletsByKey({ Key: key }, function (portlets) {
            $(ajaxContainerSelector).form('loadData', portlets);
            $("#txtNavigateUrl", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/MenuService.asmx/GetSystemFileNameNode"),
                panelHeight: 300,
                editable: true,
                onLoadSuccess: function () {
                    $("#txtNavigateUrl", ajaxContainerSelector).combobox("setText", portlets.Href);
                }
            });     
        });
    };
})(jQuery);