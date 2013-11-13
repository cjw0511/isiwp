/*
==============================================================================
//  项目启动管理页面 ProjectManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.ProjectManage_aspx) { window.project.ProjectManage_aspx = new Object(); }
    window.project.ProjectManage_aspx.initPage = function (ajaxContainerSelector) {
        window.project.ProjectManage_aspx.SubProjectIsApproval = null;
        window.project.ProjectManage_aspx.ProjectKey = null;
        window.project.ProjectManage_aspx.ProjectName = null;
        window.project.ProjectManage_aspx.ProgressKey = null;
        var _bindControl = function () {

            $("#selProgress", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name"
            });
            var data = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 56 });
            data.unshift({ Key: -1, Name: '全部' });
            $("#selProgress", ajaxContainerSelector).combobox("loadData", data).combobox("setValue", -1);

            var planprojdata = $.plugin.getJsonDataRequestWebService("Services/Business/PlanProjectService.asmx/GetAllPlanProject", null);
            var _planProjFormatter = function (value) {
                for (var i = 0; i < planprojdata.length; i++) {
                    if (planprojdata[i].Key == value) { return planprojdata[i].Name; }
                }
                return value;
            }
            //            var approvaldata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 57 });
            //            var _approvalStatusFormatter = function (value) {
            //                for (var i = 0; i < approvaldata.length; i++) {
            //                    if (approvaldata[i].Key == value) { return approvaldata[i].Name; }
            //                }
            //                return value;
            //            }
            //            var progressdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 56 });
            //            var _progressFormatter = function (value) {
            //                for (var i = 0; i < progressdata.length; i++) {
            //                    if (progressdata[i].Key == value) { return progressdata[i].Name; }
            //                }
            //                return value;
            //            }
            $("#ProjGrid", ajaxContainerSelector).datagrid({
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/ProjectService.asmx/LoadGridDataOfProjectManage'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    Name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); },
                    ProgressKey: function () { return $("#selProgress", ajaxContainerSelector).combotree("getValue"); }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
        			{ field: 'Name', title: '项目名称', width: 200, sortable: true }
                    ]],
                columns: [[
                    { field: 'Code', title: '项目编号', width: 120, sortable: true },
                    { field: 'PlanProjKey', title: '所属计划项目', width: 200, sortable: true, formatter: _planProjFormatter },
                    { field: 'StartDate', title: '项目启动时间', width: 120, sortable: true, formatter: function (val) { return val.toDate().format("yyyy-MM-dd"); } },
                //                    { field: 'IsApproval', title: '项目审核状态', width: 120, sortable: true, formatter: _approvalStatusFormatter },
                //                    { field: 'ProgressKey', title: '项目实施状态', width: 120, sortable: true, formatter: _progressFormatter },
                    {field: 'opt', title: '操作', width: 150, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.project.ProjectManage_aspx.editProject(\'' + rowData.Key + '\');').attr("title", '编辑项目');
                        var entrybtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-add" }).attr("onclick", 'javascript:window.project.ProjectManage_aspx.entrySubProject(\'' + rowData.Key + '\',\'' + rowData.Name + '\');').attr("title", '进入子项目管理');

                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" });
                        //                            if (rowData.IsApproval == 2) {
                        //                                delspan.linkbutton('disable').attr("title", "项目已被禁用，该项不可删除！");
                        //                            } else {
                        //                                if (rowData.ProgressKey == 1) {
                        //                                    delspan.linkbutton('disable').attr("title", "项目正在实施，该项不可删除！");
                        //                                } else if (rowData.ProgressKey == 2) {
                        //                                    delspan.linkbutton('disable').attr("title", "项目已结案，该项不可删除！");
                        //                                } else {
                        //                                    delspan.attr("onclick", '');
                        //                                }
                        //                            }
                        delspan.attr("onclick", 'javascript:window.project.ProjectManage_aspx.delProject(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(editbtn).append(entrybtn).append(delspan);
                        return div.html();
                    }
                }
        		]],
                sortName: 'StartDate',
                sortOrder: 'desc',
                pagination: true,
                rowContextMenus: [
                    { text: function (e, rowIndex, rowData, eventData) {
                        return "编辑：" + rowData.Name;
                    },
                        iconCls: "icon-edit",
                        handler: function (e, rowIndex, rowData, eventData) {
                            if (rowData.IsApproval == 2) {
                                $.plugin.showMessage("项目已被禁用，此项不可编辑！");
                            } else {
                                if (rowData.ProgressKey == 2) {
                                    $.plugin.showMessage("项目已经结案，此项不可编辑！");
                                } else {
                                    window.project.ProjectManage_aspx.editProject(rowData.Key);
                                }
                            }
                        }
                    },
                    { text: function (e, rowIndex, rowData, eventData) {
                        return "删除：" + rowData.Name;
                    },
                        iconCls: "icon-no",
                        handler: function (e, rowIndex, rowData, eventData) {
                            window.project.ProjectManage_aspx.delProject(rowData.Key, rowData.Name);
                            //                            if (rowData.IsApproval == 2) {
                            //                                $.plugin.showMessage("项目已被禁用，此项不可删除！");
                            //                            } else {
                            //                                if (rowData.ProgressKey == 1) {
                            //                                    $.plugin.showMessage("项目正在实施，此项不可删除！");
                            //                                } else if (rowData.ProgressKey == 2) {
                            //                                    $.plugin.showMessage("项目已经结案，此项不可删除！");
                            //                                } else {
                            //                                    window.project.ProjectManage_aspx.delProject(rowData.Key, rowData.Name);
                            //                                }
                            //                            }
                        }
                    }
                ],
                toolbar: [{
                    id: 'btnadd',
                    text: '启动新项目',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "启动新项目",
                            href: "Views/Project/ProjectAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var project = $(dialog).form('getData');
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("启动新项目成功。");
                                        $("#ProjGrid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("启动新项目失败。");
                                    };
                                };
                                window.project.project.addProject(project, _callback);
                            },
                            width: 900,
                            height: 420
                        });
                    }
                },
                    '-', {
                        id: 'btncut',
                        text: '删除',
                        iconCls: 'icon-no',
                        handler: function () {
                            var ids = [];
                            var names = [];
                            var rows = $('#ProjGrid', ajaxContainerSelector).datagrid('getChecked');
                            if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                            else {
                                for (var i = 0; i < rows.length; i++) {
                                    if (rows[i].IsApproval == 2) {
                                        $.plugin.showMessage("你选择的项目含有禁用的项，禁用项不能删除，请取消已勾选到的禁用项。");
                                        return;
                                    } else if (rows[i].IsApproval == 1) {
                                        if (rows[i].ProgressKey == 1) {
                                            $.plugin.showMessage("你选择的项目含有正在实施的项，正在实施的项不能删除，请取消已勾选到的正在实施的项。");
                                            return;
                                        } else if (rows[i].ProgressKey == 2) {
                                            $.plugin.showMessage("你选择的项目含有已结案的项,已结案的项不能删除,请取消已勾选到的已结案的项。");
                                            return;
                                        }
                                    }
                                    ids.push(rows[i].Key);
                                    names.push(rows[i].Name);
                                }
                                window.project.ProjectManage_aspx.delProject(ids.join(','), names.join(','));
                            }
                        }
                    },
                 '-', {
                     id: 'btnrefresh',
                     text: '刷新',
                     iconCls: 'icon-refresh',
                     handler: function () {
                         $("#ProjGrid", ajaxContainerSelector).datagrid('reload');
                     }
                 }, '-', {
                     id: 'btnhelp',
                     text: '帮助',
                     iconCls: 'icon-help',
                     handler: function () {
                         var _content = $("<div />").css({ "padding": "15px", "font-size": "15px" });
                         _content.append($(this).next().html()).append("一、数据列表中项目审核状态为禁用的项目不可删除，也不可编辑；" +
                        "<br/><br/>二、数据列表中项目审核状态为有效并且项目实施状态为已经结案的项目不可删除，也不可编辑；" +
                        "<br/><br/>三、数据列表中项目审核状态为有效并且项目实施状态为正在实施的项目不可删除，但可以编辑；" +
                        "<br/><br/>四、点击左边主项目列表某一记录，右边显示该记录详情，并且可对修改的数据进行保存；" +
                        "<br/><br/>五、项目经理拥有相应权限，可以禁用项目、审核项目的有效性、审核项目的实施状态。");
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
                         $.extend(pos, { top: pos.top + 30, left: pos.left });
                         $(dialog.dialog).panel("move", pos);
                     }
                 }],
                animate: true
            });
        };
        var _bindButtonEvent = function () {
            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtName", ajaxContainerSelector).val('');

                $("#selProgress", ajaxContainerSelector).combobox("setValue", "-1");

            });
            $("#ProjPanel, ajaxContainerSelector").panel({
                title: '项目启动管理',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#ProjLayout", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });

        };
        _bindControl();
        _bindButtonEvent();
        window.project.ProjectManage_aspx.editProject = function (key) {
            $.plugin.showDialog({
                title: "编辑项目信息",
                href: "Views/Project/ProjectUpdate.aspx?key=" + key,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var project = $(dialog).form('getData');
                    $.extend(project, { Key: key });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改项目信息成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("修改项目信息失败。");
                        }
                    };
                    window.project.project.updateProject(project, _callback);
                },
                width: 920,
                height: 400
            });
        }


        window.project.ProjectManage_aspx.entrySubProject = function (key, name) {
            $.plugin.showDialog({
                title: "子项目列表信息",
                href: "Views/Project/SubProjectEntry.aspx?key=" + key + "&name=" + escape(name),
                onSave: function (dialog) {

                },
                width: 920,
                height: 400
            });
        }

        window.project.ProjectManage_aspx.delProject = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除<b><span style='color:red'>" + names + "</span></b><br /><br/>是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除启动项目成功！");
                            $("#ProjGrid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#ProjGrid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#ProjGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("请先删除此主项目下的所有子项目，再删除该主项目！");
                        }
                    };
                    window.project.project.deleteProject(keys, _callback);
                }
            });
        }

    };
})(jQuery);