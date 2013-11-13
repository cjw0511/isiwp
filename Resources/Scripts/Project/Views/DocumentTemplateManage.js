/*
==============================================================================
//  文档模版管理页面 DocumentTemplateManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.DocumentTemplateManage_aspx) { window.project.DocumentTemplateManage_aspx = new Object(); }
    window.project.DocumentTemplateManage_aspx.initPage = function (ajaxContainerSelector, key) {
        $("#Grid", ajaxContainerSelector).datagrid({
            title: '文档模版列表',
            fit: true,
            border: false,
            nowrap: true,
            rownumbers: true,
            url: window.resolveUrl('Services/Project/DocumentService.asmx/LoadGridData'),
            idField: 'Key',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Name', title: '模版名称', width: 200, sortable: true },
                { field: 'ModifyDate', title: '修改时间', width: 200, sortable: true, formatter: function (value) { return value.toDate().format() } },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.project.DocumentTemplateManage_aspx.editDocument(\'' + rowData.Key + '\');');
                        var delbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.project.DocumentTemplateManage_aspx.delDocument(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(editbtn).append(delbtn);
                        return div.html();
                    }
                }
			    ]],
            sortName: 'Key',
            sortOrder: 'asc',
            pagination: true,
            toolbar: [{
                id: 'btnadd',
                text: '添加',
                iconCls: 'icon-create',
                handler: function () {
                    window.project.openOfficeWindow('Views/Project/Office/_DocumentTemplate.aspx');
                }
            }, '-', {
                id: 'btncut',
                text: '删除',
                iconCls: 'icon-no',
                handler: function () {
                    var ids = [];
                    var names = [];
                    var rows = $('#Grid', ajaxContainerSelector).datagrid('getChecked');
                    if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                    else {
                        for (var i = 0; i < rows.length; i++) {
                            ids.push(rows[i].Key);
                            names.push(rows[i].Name);
                        }
                        window.project.DocumentTemplateManage_aspx.delDocument(ids.join(','), names.join(','));
                    }
                }
            }, '-', {
                id: 'btnrefresh',
                text: '刷新',
                iconCls: 'icon-refresh',
                handler: function () {
                    $("#Grid", ajaxContainerSelector).datagrid('reload');
                }
            }]
        });
        window.project.DocumentTemplateManage_aspx.editDocument = function (key) {
            window.project.openOfficeWindow('Views/Project/Office/_DocumentTemplate.aspx', { templateKey: key });
        }
        window.project.DocumentTemplateManage_aspx.delDocument = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除模版成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除模版失败。");
                        }
                    };
                    $.post(window.resolveUrl("Services/Project/DocumentService.asmx/DeleteTemplates"), { TemplateKeys: keys }, function (data, textStatus, XMLHttpRequest) {
                        var result = $(data).text();
                        var returndata = $.parseJSON(result);
                        if ($.isFunction(callback)) { callback.call(this, returndata); }
                    });
                }
            });
        }
    };
})(jQuery);