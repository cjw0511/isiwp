/*
==============================================================================
//  子项目编辑页面 SubProjectUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectEntry_aspx) { window.project.SubProjectEntry_aspx = new Object(); }
    window.project.SubProjectEntry_aspx.initPage = function (ajaxContainerSelector, key,name) {

        var typedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 58 });
        var _typeFormatter = function (value) {
            for (var i = 0; i < typedata.length; i++) {
                if (typedata[i].Key == value) { return typedata[i].Name; }
            }
            return value;
        }
        var projdata = $.plugin.getJsonDataRequestWebService("Services/Project/ProjectService.asmx/GetAllProject", null);
        var _projectFormatter = function (value) {
            for (var i = 0; i < projdata.length; i++) {
                if (projdata[i].Key == value) { return projdata[i].Name; }
            }
            return value;
        }
        var progdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 56 });
        var _progFormatter = function (value) {
            for (var i = 0; i < progdata.length; i++) {
                if (progdata[i].Key == value) { return progdata[i].Name; }
            }
            return value;
        }
        var stagedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 55 });
        var _stageFormatter = function (value) {
            for (var i = 0; i < stagedata.length; i++) {
                if (stagedata[i].Value == value) { return stagedata[i].Name; }
            }
            return value;
        }
        var _bindControl = function () {
            var options = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/SubProjectService.asmx/LoadGridDataOfSubProjManageByKey'),
                queryParams: {
                    Key: function () { return key; }
                },
                idField: 'Key',
                columns: [[
                                { field: 'ck', checkbox: true },
                			    { field: 'Name', title: '子项目名称', width: 110, sortable: true },
                                { field: 'Code', title: '子项目编号', width: 110, sortable: true },
                			    { field: 'ProjectKey', title: '主项目', width: 110, sortable: true, formatter: _projectFormatter },
                			    { field: 'TypeKey', title: '子项目类型', width: 100, sortable: true, formatter: _typeFormatter },
                                { field: 'ProgressKey', title: '子项目实施状态', width: 120, sortable: true, formatter: _progFormatter },
                                { field: 'StageType', title: '子项目所处阶段', width: 120, sortable: true, formatter: _stageFormatter },
                                { field: 'opt', title: '操作', width: 120, align: 'center',
                                    formatter: function (value, rowData, rowIndex) {
                                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" });
                                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" });
                                        if (window.project.ProjectManage_aspx.SubProjectIsApproval == 2) {
                                            editbtn.linkbutton('disable').attr("title", '主项目已被禁用，该子项目不可编辑！');
                                            delspan.linkbutton('disable').attr("title", '主项目已被禁用，该子项目不可删除！');
                                        } else {
                                            if (rowData.ProgressKey == 1) {
                                                editbtn.attr("onclick", 'javascript:window.project.SubProjectEntry_aspx.editSubProject(\'' + rowData.Key + '\',\'' + rowData.ProgressKey + '\');');
                                                delspan.linkbutton('disable').attr("title", '该子项目正在实施，此项不可删除！');
                                            } else if (rowData.ProgressKey == 2) {
                                                editbtn.linkbutton('disable').attr("title", '该子项目已经结案，此项不可编辑');
                                                delspan.linkbutton('disable').attr("title", '该子项目已经结案，此项不可删除！');
                                            } else {
                                                editbtn.attr("onclick", 'javascript:window.project.SubProjectEntry_aspx.editSubProject(\'' + rowData.Key + '\',\'' + rowData.ProgressKey + '\');');
                                                delspan.attr("onclick", 'javascript:window.project.SubProjectEntry_aspx.delSubProject(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                                            }
                                        }
                                        var div = $("<div></div>").append(editbtn).append(delspan);
                                        return div.html();
                                    }
                                }
                                ]],
                view: detailview,
                detailFormatter: function (rowIndex, rowData) {
                    return '<table style="width:100%"><tr width="100%">' +
                                    '<td style="border:0">' +
                                    '<p>子项目名称:<b>' + rowData.Name + '</b></p>' +
                                    '</td><td style="border:0">' +
                                    '<p>子项目编号:<b>' + rowData.Code + '</b></p>' +
                                    '</td><td style="border:0">' +
                                    '<p>主项目名称:<b>' + _projectFormatter(rowData.ProjectKey) + '</b></p>' +
                                    '</td><td style="border:0">' +
                                    '<p>子项目类型:<b>' + _typeFormatter(rowData.TypeKey) + '</b></p>' +
                                    '</td></tr><tr><td style="border:0">' +
                                    '<p>项目进度:<b>' + _progFormatter(rowData.ProgressKey) + '</b></p>' +
                                    '</td><td style="border:0">' +
                                    '<p>所处阶段:<b>' + _stageFormatter(rowData.StageType) + '</b></p>' +
                                    '</td><td style="border:0">' +
                                    '<p>计划启动时间:<b>' + rowData.StartDate + '</b></p>' +
                                    '</td><td style="border:0">' +
                                    '<p>计划结束时间:<b>' + rowData.StopDate + '</b></p>' +
                                    '</td><td style="border:0">' +
                                    '<p>项目描述:<b>' + rowData.Remark + '</b></p>' +
                                    '</td><td style="border:0">' +
                                    '</td>' +
                                    '</tr></table>';
                },
                sortName: 'Code',
                sortOrder: 'asc',
                pagination: true,
                rowContextMenus: [
                        { text: function (e, rowIndex, rowData, eventData) {
                            return "编辑：" + rowData.Name;
                        },
                            iconCls: "icon-edit",
                            handler: function (e, rowIndex, rowData, eventData) {
                                if (window.project.SubProjectEntry_aspx.SubProjectIsApproval == 2) {
                                    $.plugin.showMessage("主项目已被禁用，该子项目不可编辑！");
                                } else {
                                    if (rowData.ProgressKey == 2) {
                                        $.plugin.showMessage("项目已经结案，此项不可编辑！");
                                    } else {
                                        window.project.SubProjectEntry_aspx.editSubProject(rowData.Key, rowData.ProgressKey);
                                    }
                                }
                            }
                        },
                        { text: function (e, rowIndex, rowData, eventData) {
                            return "删除：" + rowData.Name;
                        },
                            iconCls: "icon-no",
                            handler: function (e, rowIndex, rowData, eventData) {
                                if (window.project.SubProjectEntry_aspx.SubProjectIsApproval == 2) {
                                    $.plugin.showMessage("主项目已被禁用，该子项目不可删除！");
                                } else {
                                    if (rowData.ProgressKey == 1) {
                                        $.plugin.showMessage("项目正在实施，此项不可删除！");
                                    } else if (rowData.ProgressKey == 2) {
                                        $.plugin.showMessage("项目已经结案，此项不可删除！");
                                    } else {
                                        window.project.SubProjectEntry_aspx.delSubProject(rowData.Key, rowData.Name);
                                    }
                                }
                            }
                        }
                    ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加子项目',
                    iconCls: 'icon-create',
                    handler: function () {
                        if (window.project.SubProjectEntry_aspx.SubProjectIsApproval == 2) {
                            $.plugin.showMessage("主项目已被禁用，添加操作无效！");
                        } else {
                            if (window.project.SubProjectEntry_aspx.ProgressKey == 2) {
                                $.plugin.showMessage("主项目已经结案，添加操作无效！");
                            } else {
                                $.plugin.showDialog({
                                    title: "添加子项目",
                                    href: "Views/Project/SubProjectAdd.aspx?key=" + key + "&name=" + escape(name),
                                    onSave: function (dialog) {
                                        var verifyResult = $(dialog).form("validate");
                                        if (!verifyResult) { return false };
                                        var subProject = $(dialog).form('getData');
                                        var callback = function (success) {
                                            if (success) {
                                                $.plugin.showMessage("添加子项目成功。");
                                                $("#SubProjectGrid", ajaxContainerSelector).datagrid('reload');
                                            } else {
                                                $.plugin.showMessage("添加子项目失败。");
                                            };
                                        };
                                        window.project.project.addSubProject(subProject, callback);
                                    },
                                    width: 920,
                                    height: 400
                                });
                            }
                        }
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        if (window.project.SubProjectEntry_aspx.SubProjectIsApproval == 2) {
                            $.plugin.showMessage("主项目已被禁用，删除操作无效！");
                        } else {
                            if (window.project.SubProjectEntry_aspx.ProgressKey == 2) {
                                $.plugin.showMessage("主项目已经结案，删除操作无效！");
                            } else {
                                var ids = [];
                                var names = [];
                                var rows = $('#SubProjectGrid', ajaxContainerSelector).datagrid('getChecked');
                                if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                                else {
                                    for (var i = 0; i < rows.length; i++) {
                                        if (rows[i].ProgressKey == 1) {
                                            $.plugin.showMessage("你选择的项目含有正在实施的项，正在实施的项不能删除，请取消已勾选到的正在实施的项。");
                                            return;
                                        } else if (rows[i].ProgressKey == 2) {
                                            $.plugin.showMessage("你选择的项目含有已结案的项,已结案的项不能删除,请取消已勾选到的已结案的项。");
                                            return;
                                        }
                                        ids.push(rows[i].Key);
                                        names.push(rows[i].Name);
                                    }
                                    window.project.SubProjectEntry_aspx.delSubProject(ids.join(','), names.join(','));
                                }
                            }
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#SubProjectGrid", ajaxContainerSelector).datagrid('reload');
                    }
                }, '-', {
                    id: 'btnhelp',
                    text: '帮助',
                    iconCls: 'icon-help',
                    handler: function () {
                        var _content = $("<div />").css({ "padding": "15px", "font-size": "15px" });
                        _content.append($(this).next().html()).append("一、子项目列表中项目实施状态为已经结案的项目不可删除，也不可编辑；" +
                        "<br/><br/>二、子项目列表中项目实施状态为正在实施的项目不可删除，但可以编辑；" +
                        "<br/><br/>三、主项目的项目审核状态为禁用，则该主项目下的所有子项目编辑和删除操作都无效；" +
                        "<br/><br/>四、主项目的项目实施状态为已经结案，则该主项目下的所有子项目编辑和删除操作都无效；" +
                        "<br/><br/>五、主项目的项目审核状态为禁用或则项目实施状态为已经结案，则在其下子项目列表中添加子项目和批量删除子项目操作无效；" +
                        "<br/><br/>六、点击子项目列表每条记录的白色‘+’符合，则可以查看该子项目的详情。");
                        var dialog = $.plugin.showDialog({
                            title: "操作帮助",
                            width: 700,
                            height: 330,
                            autoCenter: false,
                            content: _content,
                            enableSaveButton: false,
                            enableApplyButton: false,
                            maximizable: false,
                            resizable: false
                        });
                        var pos = $(this).offset();
                        $(dialog.dialog).panel("move", pos);
                    }
                }]
            }
            $("#SubProjectGrid", ajaxContainerSelector).datagrid(options);
        };
        _bindControl();

        window.project.SubProjectEntry_aspx.editSubProject = function (key, progresskey) {
            $.plugin.showDialog({
                title: "编辑子项目",
                href: "Views/Project/SubProjectUpdate.aspx?key=" + key + "&progresskey=" + progresskey,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var subProject = $(dialog).form('getData');
                    $.extend(subProject, { Key: key });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改子项目成功。");
                            $("#SubProjectGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("修改子项目失败。");
                        }
                    };
                    window.project.project.updateSubProject(subProject, _callback);
                },
                resizable: false,
                minimizable: false,
                maximizable: false,
                width: 820,
                height: 560
            });
        }
        window.project.SubProjectEntry_aspx.delSubProject = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除<b><span style='color:red'>" + names + "</span></b><br /><br/>是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除子项目成功。");
                            $("#SubProjectGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除子项目失败。");
                        }
                    };
                    window.project.project.deleteSubProject(keys, _callback);
                }
            });
        }
    };
})(jQuery);