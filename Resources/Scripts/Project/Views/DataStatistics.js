/*
==============================================================================
//  符合情况统计页面 DataStatistics.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.DataStatistics_aspx) { window.project.DataStatistics_aspx = new Object(); }
    window.project.DataStatistics_aspx.initPage = function (ajaxContainerSelector, key) {
        var _resultControl = function () {
            var resoptions = {
                idField: 'Key',
                fit: true,
                animate: true,
                collapsible: true,
                rownumbers: true,
                showFooter: true,
                fitColumns: true,
                scroll:onscroll,
                border: false,
                url: window.resolveUrl('Services/Project/WorkInstructionService.asmx/ReportDataStatistics'),
                queryParams: {
                    WorkInstrKey: key
                },
                columns: [[
                {title:'指导书名称',field:'Name',rowspan:2,width:150,formatter: function (value) { if (value) return "<span title='" + value + "'>" + value + "</span>" }},
                { title: '统计结果', colspan: 3}], [
                { title: '符合数量', field: 'Accord1', width: 150, rowspan: 2, formatter: function (value) { if (value) return "<span title='" + value + "'>" + value + "</span>" } },
                { title: '不符合数量', field: 'Accord2', width: 150, rowspan: 2, formatter: function (value) { if (value) return "<span title='" + value + "'>" + value + "</span>" } },
                { title: '部分符合数量', field: 'Accord3', width: 150, rowspan: 2, formatter: function (value) { if (value) return "<span title='" + value + "'>" + value + "</span>" } }
                ]]
            }
            $("#Result", ajaxContainerSelector).datagrid(resoptions);
        }        
        _resultControl();
    };
})(jQuery);