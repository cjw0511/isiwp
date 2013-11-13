/*
==============================================================================
//  知识统计页面 LoreStatistics.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreStatistics_aspx) { window.lorelibs.LoreStatistics_aspx = new Object(); }

    window.lorelibs.LoreStatistics_aspx.initPage = function (ajaxContainerSelector, key) {
        var options = {
            border: false,
            rownumbers: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            fit: true,
            nowrap: true,
            remoteSort: false,
            showFooter: true,
            url: window.resolveUrl('Services/LoreLibs/LoreService.asmx/GetPagingDataOfLoreStatistics'),
            pagination: true,
            searchButton: $("#btnSearch", ajaxContainerSelector),
            queryParams: {
                Name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); },
                TypeKey: key
            },
            idField: 'Key',
            columns: [[
                        { field: 'Name', title: '知识节点', width: 200, sortable: true },
                    	{ field: 'Count', title: '条目数量', width: 200, sortable: true}]],
            toolbar: [{
                id: 'btncut',
                text: '刷新',
                iconCls: 'icon-refresh',
                handler: function () {
                    $("#Grid", ajaxContainerSelector).datagrid('reload');
                }
            }]
        };
        $("#Grid", ajaxContainerSelector).datagrid(options);
    };
})(jQuery);