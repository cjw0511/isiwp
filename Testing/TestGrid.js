/*
==============================================================================
//  人事档案管理页面 TestGrid.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.TestGrid_aspx) { window.platform.TestGrid_aspx = new Object(); }

    window.platform.TestGrid_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            var options = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
//                url: window.resolveUrl('Services/Testing/TestGridService.asmx/LoadGridData'),
//                idField: 'Key',
//                frozenColumns: [[{ field: 'ck', checkbox: true },
//				{ field: 'FileName', title: '附件名称', width: 100, sortable: true }
//                ]],
//                columns: [[
//                { field: 'FileType', title: '附件类型', width: 150, sortable: true },
//                { field: 'FileKey', title: '附件所属', width: 150, sortable: true },
//                { field: 'FilePath', title: '附件路径', width: 200, sortable: true },
//                { field: 'opt', title: '操作', width: 80, align: 'center',
//                    formatter: function (value, rowData, rowIndex) {
//                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.platform.TestGrid_aspx.delEmployee(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
//                        var div = $("<div></div>").append(delspan);
//                        return div.html();
//                    }
//                }
//			    ]],
//                sortName: 'Code',
//                sortOrder: 'asc',
//                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
//                        window.platform.PersonalRecordManage_aspx.delEmployee(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
//                        $.plugin.showDialog({
//                            
//                        });
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            };
//            $("#Grid", ajaxContainerSelector).datagrid(options);
        };
        var _bindButtonEvent = function () {
            $('#btnUpload').unbind("click");
            $('#btnUpload').bind('click', function () {
                $.plugin.showDialog({
                    title: "多附件上传列表",
                    href: "Testing/Upload/UploadFiles.aspx"
                });
            });
        };
        _bindControl();
        _bindButtonEvent();

        window.platform.TestGrid_aspx.delEmployee = function (keys, names) {
            
        }
    };
})(jQuery);