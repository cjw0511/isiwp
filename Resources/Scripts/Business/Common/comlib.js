//
//================================================================================
//  该文件提供 Business 平台项目的公共 javascript 函数库，例如登录、验证、提取菜单、权限、拉取角色菜单等。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js 和 jq.extent.easyui.js 构建。
//================================================================================
//
(function ($) {
    if (!window.business) { window.business = new Object(); }
    
    
    //选择客户，传入的参数为一个回调函数
    window.business.showCustomerSelector = function (onEnterClick, selected) {
        

        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >客户名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择客户',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Business/CustomerService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                Name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'Name', title: '客户名称', width: 300, sortable: true },
                { field: 'IndustryType', title: '行业类型', sortable: true, width: 100 },
                { field: 'CustomerType', title: '客户类型', sortable: true, width: 100 },
                { field: 'Tel', title: '联系电话', width: 200, sortable: true }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };
    
   
})(jQuery);





