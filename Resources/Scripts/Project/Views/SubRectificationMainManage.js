/*
==============================================================================
//  整改方案模版页面 SubRectificationMainManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubRectificationMainManage_aspx) { window.project.SubRectificationMainManage_aspx = new Object(); }
    window.project.SubRectificationMainManage_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            var Template_options = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/SubRectificationService.asmx/LoadGridDataOfTemplate'),
                queryParams: {
                    title: ""
                },
                searchButton: $("#btnSearch", ajaxContainerSelector),
                idField: 'Key',
                columns: [[{ field: 'ck', checkbox: true },
                { field: 'Title', title: '整改方案标题', width: 180, sortable: true },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.project.SubRectificationMainManage_aspx.editSubProjectRectTemplate(\'' + rowData.Key + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.project.SubRectificationMainManage_aspx.delSubProjectRectTemplate(\'' + rowData.Key + '\',\'' + rowData.Title + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan);
                        return div.html();
                    }
                }
			    ]],
                pagination: true,
                onSelect: function (rowIndex, rowData) {
                    var param = { title: "", templateType: -1, key: rowData.Key };
                    $("#MainGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubRectificationService.asmx/LoadGridDataOfMainByKey');
                    $("#MainGrid", ajaxContainerSelector).datagrid('load', param);
                },
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加整改方案",
                            href: "Views/Project/SubRectificationTemplateAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var main = $(dialog).form('getData');
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加整改方案成功。");
                                        $("#TemplateGrid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加整改方案失败。");
                                    }
                                };
                                window.project.subrectification.addSubProjectRectTemplate(main, _callback);
                            },
                            width: 900,
                            height: 250
                        });
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var ids = [];
                        var names = [];
                        var rows = $('#TemplateGrid', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].Key);
                                names.push(rows[i].Title);
                            }
                            window.project.SubRectificationMainManage_aspx.delSubProjectRectTemplate(ids.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#TemplateGrid", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            };
            window.project.SubRectificationMainManage_aspx.editSubProjectRectTemplate = function (key) {
                $.plugin.showDialog({
                    title: "编辑整改方案",
                    href: "Views/Project/SubRectificationTemplateUpdate.aspx?key=" + key,
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var project = $(dialog).form('getData');
                        $.extend(project, { Key: key });
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("修改整改方案成功。");
                                $("#TemplateGrid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("修改整改方案失败。");
                            }
                        };
                        window.project.subrectification.updateSubProjectRectTemplate(project, _callback);
                    },
                    width: 920,
                    height: 250
                });
            }

            window.project.SubRectificationMainManage_aspx.delSubProjectRectTemplate = function (keys, names) {
                $.plugin.messager.confirm("提示", "点击确定将删除 <strong>" + names + "</strong><br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除整改方案成功。");
                                $("#TemplateGrid", ajaxContainerSelector).datagrid('clearSelections');
                                $("#TemplateGrid", ajaxContainerSelector).datagrid('clearChecked');
                                $("#TemplateGrid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("请先删除该方案下的所有整改方案模板，再删除该方案！");
                            }
                        };
                        window.project.subrectification.deleteSubProjectRectTemplate(keys, _callback);
                    }
                });
            }

            $("#TemplateGrid", ajaxContainerSelector).datagrid(Template_options);


            var templatedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 58 });
            var _templateFormatter = function (value) {
                for (var i = 0; i < templatedata.length; i++) {
                    if (templatedata[i].Key == value) return templatedata[i].Name;
                }
                return value;
            }
            var _rectificationFormatter = function (value) {
                if (value == "1") {
                    return "大文本";
                }
                else if (value == "2") {
                    return "一维表";
                }
                else if (value == "3") {
                    return "二维表";
                }
            }
            var Main_options = {
                title: '整改方案模板设置',
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                //                url: window.resolveUrl('Services/Project/SubRectificationService.asmx/GetPagingDataOfMain'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                idField: 'Key',
                columns: [[{ field: 'ck', checkbox: true },
                { field: 'Title', title: '模板标题', width: 150, sortable: true },
                { field: 'TypeKey', title: '方案类型', width: 100, sortable: true, formatter: _templateFormatter },
                { field: 'TemplateType', title: '模版类型', width: 80, sortable: true, formatter: _rectificationFormatter },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.project.SubRectificationMainManage_aspx.editSubProjectRectMain(\'' + rowData.Key + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.project.SubRectificationMainManage_aspx.delSubProjectRectMain(\'' + rowData.Key + '\',\'' + rowData.Title + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan);
                        return div.html();
                    }
                }
			    ]],
                pagination: true,
                onSelect: function (rowIndex, rowData) {
                    var param = { name: "", key: rowData.Key };
                    $("#FieldGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubRectificationService.asmx/LoadGridDataOfFieldByKey');
                    $("#FieldGrid", ajaxContainerSelector).datagrid('load', param);
                },
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        if ($("#TemplateGrid", ajaxContainerSelector).datagrid('getSelected')) {
                            $.plugin.showDialog({
                                title: "添加整改方案模版",
                                href: "Views/Project/SubRectificationMainAdd.aspx",
                                onSave: function (dialog) {
                                    var verifyResult = $(dialog).form("validate");
                                    if (!verifyResult) { return false };
                                    var main = $(dialog).form('getData');
                                    $.extend(main, { MasterKey: $("#TemplateGrid", ajaxContainerSelector).datagrid('getSelected').Key });
                                    var _callback = function (success) {
                                        if (success) {
                                            $.plugin.showMessage("添加整改方案模版成功。");
                                            $("#MainGrid", ajaxContainerSelector).datagrid('reload');
                                        } else {
                                            $.plugin.showMessage("添加整改方案模版失败。");
                                        }
                                    };
                                    window.project.subrectification.addSubProjectRectMain(main, _callback);
                                },
                                width: 900,
                                height: 350
                            });
                        }
                        else {
                            $.plugin.showMessage("请先选择整改方案!");
                        }
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var keys = [];
                        var names = [];
                        var rows = $("#MainGrid", ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                keys.push(rows[i].Key);
                                names.push(rows[i].Title);
                            }
                            window.project.SubRectificationMainManage_aspx.delSubProjectRectMain(keys.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#MainGrid", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            };
            window.project.SubRectificationMainManage_aspx.editSubProjectRectMain = function (key) {
                $.plugin.showDialog({
                    title: "编辑整改模版方案",
                    href: "Views/Project/SubRectificationMainUpdate.aspx?key=" + key,
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var project = $(dialog).form('getData');
                        $.extend(project, { Key: key });
                        $.extend(project, { MasterKey: $("#TemplateGrid", ajaxContainerSelector).datagrid('getSelected').Key });
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("修改整改方案模版成功。");
                                $("#MainGrid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("修改整改方案模板失败。");
                            }
                        };
                        window.project.subrectification.updateSubProjectRectMain(project, _callback);
                    },
                    width: 920,
                    height: 350
                });
            }

            window.project.SubRectificationMainManage_aspx.delSubProjectRectMain = function (keys, names) {
                $.plugin.messager.confirm("提示", "点击确定将删除 <strong>" + names + "</strong><br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除整改方案模版成功。");
                                $("#MainGrid", ajaxContainerSelector).datagrid('clearSelections');
                                $("#MainGrid", ajaxContainerSelector).datagrid('clearChecked');
                                $("#MainGrid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("请先删除该模板下的所有整改方案字段，再删除该模板！");
                            }
                        };
                        window.project.subrectification.deleteSubProjectRectMain(keys, _callback);
                    }
                });
            }
            $("#MainGrid", ajaxContainerSelector).datagrid(Main_options);

            var Field_options = {
                fit: true,
                fitColumns: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                searchButton: $("#btnSearch", ajaxContainerSelector),
                idField: 'Key',
                columns: [[{ field: 'ck', checkbox: true },
                { field: 'Name', title: '字段名称', width: 180, sortable: true },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.project.SubRectificationMainManage_aspx.editSubProjectRectField(\'' + rowData.Key + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.project.SubRectificationMainManage_aspx.delSubProjectRectField(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan);
                        return div.html();
                    }
                }
			    ]],
                pagination: true,
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        if ($("#MainGrid", ajaxContainerSelector).datagrid('getSelected')) {
                            var rowtemplate = $("#TemplateGrid", ajaxContainerSelector).datagrid("getSelected");
                            $.plugin.showDialog({
                                title: "添加整改方案字段",
                                href: "Views/Project/SubRectificationFieldAdd.aspx?MasterKey=" + rowtemplate.Key,
                                onSave: function (dialog) {
                                    var verifyResult = $(dialog).form("validate");
                                    if (!verifyResult) { return false };
                                    var detail = $(dialog).form('getData');
                                    var row = $("#MainGrid", ajaxContainerSelector).datagrid("getSelected");
                                    if (!row) {
                                        $.plugin.showMessage("请先选择整改方案模版,再进行添加。");
                                        return false
                                    }
                                    $.extend(detail, { TemplateKey: row.Key });
                                    if (String.isNullOrWhiteSpace(detail.MaxLength)) { detail.MaxLength = 0; };
                                    var _callback = function (success) {
                                        if (success) {
                                            $.plugin.showMessage("添加整改方案字段成功。");
                                            $("#FieldGrid", ajaxContainerSelector).datagrid('reload');
                                        } else {
                                            $.plugin.showMessage("添加整改方案字段失败。");
                                        }
                                    };
                                    window.project.subrectification.addSubProjectRectField(detail, _callback);
                                },
                                width: 900,
                                height: 300
                            });
                        }
                        else {
                            $.plugin.showMessage("请先选择整改方案模版!");
                        }
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var keys = [];
                        var names = [];
                        var rows = $("#FieldGrid", ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                keys.push(rows[i].Key);
                                names.push(rows[i].Name);
                            }
                            window.project.SubRectificationMainManage_aspx.delSubProjectRectField(keys.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#FieldGrid", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            };
            window.project.SubRectificationMainManage_aspx.editSubProjectRectField = function (key) {
                var rowtemplate = $("#TemplateGrid", ajaxContainerSelector).datagrid("getSelected");
                $.plugin.showDialog({
                    title: "编辑整改方案字段",
                    href: "Views/Project/SubRectificationFieldUpdate.aspx?MasterKey=" + rowtemplate.Key + "&key=" + key,
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var project = $(dialog).form('getData');
                        $.extend(project, { Key: key });
                        $.extend(project, { TemplateKey: $("#MainGrid", ajaxContainerSelector).datagrid('getSelected').Key });
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("修改整改方案字段成功。");
                                $("#FieldGrid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("修改整改方案字段失败。");
                            }
                        };
                        window.project.subrectification.updateSubProjectRectField(project, _callback);
                    },
                    width: 920,
                    height: 300
                });
            }

            window.project.SubRectificationMainManage_aspx.delSubProjectRectField = function (keys, names) {
                $.plugin.messager.confirm("提示", "点击确定将删除 <strong>" + names + "</strong><br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除整改方案字段成功。");
                                $("#FieldGrid", ajaxContainerSelector).datagrid('clearSelections');
                                $("#FieldGrid", ajaxContainerSelector).datagrid('clearChecked');
                                $("#FieldGrid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("删除整改方案字段失败。");
                            }
                        };
                        window.project.subrectification.deleteSubProjectRectField(keys, _callback);
                    }
                });
            }
            $("#FieldGrid", ajaxContainerSelector).datagrid(Field_options);
        }

        var _bindButtonEvent = function () {
            $("#panel", ajaxContainerSelector).panel({
                title: '整改方案设置',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#divLayout", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });
            $("#panel1", ajaxContainerSelector).panel({
                title: '整改方案字段设置',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-right',
                    handler: function () { $("#divLayout", ajaxContainerSelector).layout("collapse", "east") }
                }]
            });
        }

        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);