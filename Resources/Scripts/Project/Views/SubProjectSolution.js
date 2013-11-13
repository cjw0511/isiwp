/*
==============================================================================
//  方案编制页面 SubProjectSolution.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectSolution_aspx) { window.project.SubProjectSolution_aspx = new Object(); }
    window.project.SubProjectSolution_aspx.initPage = function (ajaxContainerSelector, key) {

        var _bindControl = function () {
            //关联对象
            $("#systemRelationTree", ajaxContainerSelector).tree({
                autoToggle: false,
                onSelect: _loadRelationGridData
            });
            _loadSystemTypeTreeData();
            $("#objectTable", ajaxContainerSelector).datagrid({
                fit: true,
                fitColumns: true,
                border: false,
                rownumbers: true,
                nowrap: true,
                idField: 'Key',
                columns: [[
                { field: 'ObjectName', title: '测评对象名称', width: 100 },
                { field: 'opt', title: '操作', width: 40, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除关联").attr("onmouseover", "javascript:window.project.SubProjectSolution_aspx.isDelRelation = true;").attr("onmouseout", "javascript:window.project.SubProjectSolution_aspx.isDelRelation = false;");
                        var div = $("<div></div>").append(delspan);
                        return div.html();
                    }
                }
			    ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                onClickRow: function (rowIndex, rowData) {
                    if (window.project.SubProjectSolution_aspx.isDelRelation) {
                        window.project.solution.deleteSystemRelation({ RelationKey: rowData.Key }, function (success) {
                            if (success) {
                                _loadRelationGridData();
                                $.plugin.showMessage("删除关联成功。");
                            } else {
                                $.plugin.showMessage("删除关联失败。");
                            }
                        })
                        window.project.SubProjectSolution_aspx.isDelRelation = false;
                    }
                },
                toolbar: [{
                    id: 'btnadd',
                    text: '添加关联对象',
                    iconCls: 'icon-add',
                    handler: function () {
                        var selectnode = $("#systemRelationTree", ajaxContainerSelector).tree("getSelected");
                        if (!selectnode || !$("#systemRelationTree", ajaxContainerSelector).tree("isLeaf", selectnode.target)) {
                            $.plugin.showMessage("请选择叶节点。");
                            return;
                        }
                        var parentnode = $("#systemRelationTree", ajaxContainerSelector).tree("getParent", selectnode.target);
                        var objectTypeKey = selectnode.id;
                        var relateSystemKey = parentnode.id;
                        var paramobj = {
                            SubProjectKey: key,
                            RelateSystemKey: relateSystemKey,
                            ObjectTypeKey: objectTypeKey
                        };
                        window.project.showRelationObject(paramobj, function (datagrid, selections) {
                            var keys = [];
                            for (var i = 0; i < selections.length; i++) {
                                keys.push(selections[i].Key);
                            }
                            var param = {
                                SubProjectKey: key,
                                RelateSystemKey: relateSystemKey,
                                ObjectTypeKey: objectTypeKey,
                                ObjectKeys: keys.join(',')
                            }
                            window.project.solution.setSystemRelation(param, function (success) {
                                if (success) {
                                    $.plugin.showMessage("添加成功!");
                                    _loadRelationGridData();
                                }
                                else {
                                    $.plugin.showMessage("添加失败!");
                                }
                            });
                        });
                    }
                }]
            });

            //测评方案
            $("#selProjType", ajaxContainerSelector).combobox({
                valueField: 'Value',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 61 }
            });
            $("#selProjType", ajaxContainerSelector).combobox("setValue", 1);
            $("#solutionTable", ajaxContainerSelector).datagrid({
                fit: true,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/SubProjectSolutionService.asmx/LoadSolutionGridData'),
                idField: 'Key',
                queryParams: {
                    SubProjectKey: key
                },
                columns: [[
                { field: 'Name', title: '方案名称', width: 450 },
                { field: 'DocumentCode', title: '文件编号', width: 200 },
                { field: 'opt', title: '操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var downspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-down" }).attr("title", "下载方案").attr("onmouseover", "javascript:window.project.SubProjectSolution_aspx.isDownSolution = true;").attr("onmouseout", "javascript:window.project.SubProjectSolution_aspx.isDownSolution = false;");
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除方案").attr("onmouseover", "javascript:window.project.SubProjectSolution_aspx.isDelSolution = true;").attr("onmouseout", "javascript:window.project.SubProjectSolution_aspx.isDelSolution = false;");
                        var div = $("<div></div>").append(downspan).append(delspan);
                        return div.html();
                    }
                }
			    ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                onClickRow: function (rowIndex, rowData) {
                    if (window.project.SubProjectSolution_aspx.isDelSolution) {
                        window.project.solution.deleteSolution({ SolutionKey: rowData.Key }, function (success) {
                            if (success) {
                                $("#solutionTable", ajaxContainerSelector).datagrid("reload");
                                $.plugin.showMessage("删除测评方案成功。");
                            } else {
                                $.plugin.showMessage("删除测评方案失败。");
                            }
                        })
                        window.project.SubProjectSolution_aspx.isDelSolution = false;
                    }
                    if (window.project.SubProjectSolution_aspx.isDownSolution) {
                        window.project.DownLoadFile(window.resolveUrl('Services/Project/DocumentService.asmx/DownLoadFile'), { FileKey: rowData.DocumentFileKey });
                        window.project.SubProjectSolution_aspx.isDownSolution = false;
                    }
                }
            });
            //选取测评对象

            $("#tierTree", ajaxContainerSelector).tree({
                autoToggle: false,
                onSelect: _loadSelectObjectGridData
            });

            _loadSelectTierTreeData();
            $("#selectObjectTable", ajaxContainerSelector).datagrid({
                fit: true,
                border: false,
                rownumbers: true,
                nowrap: true,
                idField: 'Key',
                columns: [[
                { field: 'ObjectName', title: '测评对象名称', width: 500 },
                { field: 'opt', title: '操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除").attr("onmouseover", "javascript:window.project.SubProjectSolution_aspx.isDelSelect = true;").attr("onmouseout", "javascript:window.project.SubProjectSolution_aspx.isDelSelect = false;");
                        var div = $("<div></div>").append(delspan);
                        return div.html();
                    }
                }
			    ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                onClickRow: function (rowIndex, rowData) {
                    if (window.project.SubProjectSolution_aspx.isDelSelect) {
                        window.project.solution.deleteSelectObject({ SelectObjectKey: rowData.Key }, function (success) {
                            if (success) {
                                _loadSelectObjectGridData();
                                $.plugin.showMessage("删除成功。");
                            } else {
                                $.plugin.showMessage("删除失败。");
                            }
                        })
                        window.project.SubProjectSolution_aspx.isDelSelect = false;
                    }
                },
                toolbar: [{
                    id: 'btnadd',
                    text: '添加选择对象',
                    iconCls: 'icon-add',
                    handler: function () {
                        var selectnode = $("#tierTree", ajaxContainerSelector).tree("getSelected");
                        if (!selectnode || !$("#tierTree", ajaxContainerSelector).tree("isLeaf", selectnode.target)) {
                            $.plugin.showMessage("请选择叶节点。");
                            return;
                        }
                        var tierKey = selectnode.id;
                        var paramobj = {
                            SubProjectKey: key,
                            TierKey: tierKey
                        };
                        window.project.showSelectObject(paramobj, function (datagrid, selections) {
                            var keys = [];
                            for (var i = 0; i < selections.length; i++) {
                                keys.push(selections[i].Key);
                            }
                            var param = {
                                SubProjectKey: key,
                                TierKey: tierKey,
                                ObjectKeys: keys.join(',')
                            }
                            window.project.solution.setSelectObject(param, function (success) {
                                if (success) {
                                    $.plugin.showMessage("添加成功!");
                                    _loadSelectObjectGridData();
                                }
                                else {
                                    $.plugin.showMessage("添加失败!");
                                }
                            });
                        });
                    }
                }]
            });

            //作业指导书

            $("#selTrade", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTrade")
            });
            $("#selTrade", ajaxContainerSelector).combobox("setValue", 1);

            $("#workInstruTable", ajaxContainerSelector).datagrid({
                fit: true,
                border: false,
                rownumbers: true,
                checkOnSelect: false,
                selectOnCheck: false,
                nowrap: true,
                url: window.resolveUrl('Services/Project/SubProjectSolutionService.asmx/LoadWorkInstruGridData'),
                idField: 'Key',
                queryParams: {
                    SubProjectKey: key
                },
                columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Name', title: '作业指导书名称', width: 450 },
                { field: 'ObjectName', title: '测评对象名称', width: 200 },
                { field: 'opt', title: '操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var downspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-down" }).attr("title", "下载作业指导书").attr("onmouseover", "javascript:window.project.SubProjectSolution_aspx.isDownWorkInstru = true;").attr("onmouseout", "javascript:window.project.SubProjectSolution_aspx.isDownWorkInstru = false;");
                        var downrecordspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-down" }).attr("title", "下载现场记录表").attr("onmouseover", "javascript:window.project.SubProjectSolution_aspx.isDownRecord = true;").attr("onmouseout", "javascript:window.project.SubProjectSolution_aspx.isDownRecord = false;");
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除报告").attr("onmouseover", "javascript:window.project.SubProjectSolution_aspx.isDelWorkInstru = true;").attr("onmouseout", "javascript:window.project.SubProjectSolution_aspx.isDelWorkInstru = false;");
                        var div = $("<div></div>").append(downspan).append(downrecordspan).append(delspan);
                        return div.html();
                    }
                }
			    ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                onClickRow: function (rowIndex, rowData) {
                    if (window.project.SubProjectSolution_aspx.isDelWorkInstru) {
                        window.project.SubProjectSolution_aspx.delWorkInstruction(rowData.Key);
                        window.project.SubProjectSolution_aspx.isDelWorkInstru = false;
                    }
                    else if (window.project.SubProjectSolution_aspx.isDownWorkInstru) {
                        window.project.DownLoadFile(window.resolveUrl('Services/Project/DocumentService.asmx/DownLoadFile'), { FileKey: rowData.DocumentFileKey });
                        window.project.SubProjectSolution_aspx.isDownWorkInstru = false;
                    }
                    else if (window.project.SubProjectSolution_aspx.isDownRecord) {
                        window.project.DownLoadFile(window.resolveUrl('Services/Project/DocumentService.asmx/DownLoadFile'), { FileKey: rowData.RecordFileKey });
                        window.project.SubProjectSolution_aspx.isDownRecord = false;
                    }
                },
                toolbar: [{
                    id: 'btndelete',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var ids = [];
                        var names = [];
                        var rows = $('#workInstruTable', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].Key);
                                names.push(rows[i].Name);
                            }
                            window.project.SubProjectSolution_aspx.delWorkInstruction(ids.join(','));
                        }
                    }
                }]
            });

        }
        window.project.SubProjectSolution_aspx.delWorkInstruction = function (keys) {
            var _callback = function (success) {
                if (success) {
                    $.plugin.showMessage("删除作业指导书成功。");
                    $("#workInstruTable", ajaxContainerSelector).datagrid('clearSelections');
                    $("#workInstruTable", ajaxContainerSelector).datagrid('clearChecked');
                    $("#workInstruTable", ajaxContainerSelector).datagrid('reload');
                } else {
                    $.plugin.showMessage("删除作业指导书失败。");
                }
            };
            window.project.solution.deleteWorkInstru({ WorkInstrKeys: keys }, _callback);
        }
        var _loadSystemTypeTreeData = function () {
            window.project.solution.getSystemRelationTree({ SubProjectKey: key }, function (data) {
                $("#systemRelationTree", ajaxContainerSelector).tree("loadData", data);
            })
        }
        var _loadRelationGridData = function (selectnode) {
            if (selectnode == null) {
                selectnode = $("#systemRelationTree", ajaxContainerSelector).tree("getSelected");
            }
            if (!$("#systemRelationTree", ajaxContainerSelector).tree("isLeaf", selectnode.target)) {
                return;
            }
            var parentnode = $("#systemRelationTree", ajaxContainerSelector).tree("getParent", selectnode.target);
            var objectTypeKey = selectnode.id;
            var relateSystemKey = parentnode.id;
            $("#objectTable", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectSolutionService.asmx/LoadSystemRelationData');
            $("#objectTable", ajaxContainerSelector).datagrid("load", {
                SubProjectKey: key,
                RelateSystemKey: relateSystemKey,
                ObjectTypeKey: objectTypeKey
            });
        }
        var _loadSelectTierTreeData = function () {
            window.project.solution.getSelectTierTreeData(function (data) {
                $("#tierTree", ajaxContainerSelector).tree("loadData", data);
            })
        }
        var _loadSelectObjectGridData = function (selectnode) {
            if (selectnode == null) {
                selectnode = $("#tierTree", ajaxContainerSelector).tree("getSelected");
            }
            if (!$("#tierTree", ajaxContainerSelector).tree("isLeaf", selectnode.target)) {
                return;
            }
            $("#selectObjectTable", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectSolutionService.asmx/LoadSelectObjectData');
            $("#selectObjectTable", ajaxContainerSelector).datagrid("load", {
                SubProjectKey: key,
                TierKey: selectnode.id
            });
        }
        var _bindButtonEvent = function () {
            $("#btnCreateSolution", ajaxContainerSelector).click(function () {
                var param = {
                    SubProjectKey: key,
                    DocumentCode: $("#txtDocumentCode", ajaxContainerSelector).val(),
                    ProjType: $("#selProjType", ajaxContainerSelector).combobox("getValue")
                };
                $.plugin.messager.progress({ title: "操作提醒", msg: "正在生成测评方案,请稍等..." });
                var _callback = function (success) {
                    if (success) {
                        $("#solutionTable", ajaxContainerSelector).datagrid("reload");
                        $.plugin.showMessage("生成测评方案成功！");
                    } else {
                        $.plugin.showMessage("生成测评方案失败！");
                    }
                    $.plugin.messager.progress("close");
                };
                window.project.solution.createSolution(param, _callback);
            });
            $("#btnCreateWorkInstru", ajaxContainerSelector).click(function () {
                var param = {
                    SubProjectKey: key
                };
                $.plugin.messager.progress({ title: "操作提醒", msg: "正在生成作业指导书,请稍等..." });
                var _callback = function (success) {
                    if (success) {
                        $("#workInstruTable", ajaxContainerSelector).datagrid("reload");
                        $.plugin.showMessage("生成作业指导书成功！");
                    } else {
                        $.plugin.showMessage("生成作业指导书失败！");
                    }
                    $.plugin.messager.progress("close");
                };
                window.project.solution.createWorkInstru(param, _callback);
            });
            $("#btnSubmit", ajaxContainerSelector).click(function () {
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("方案编制完结操作成功，您现在可以进入 现场测评阶段。");
                        $("#btn3", window.project.SubProjectImpl_aspx.ajaxContainerSelector).linkbutton('enable');
                        $("#btn3", window.project.SubProjectImpl_aspx.ajaxContainerSelector).click(function () {
                            $("#StagePanel", window.project.SubProjectImpl_aspx.ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectEvaluation.aspx?key=" + key));
                        });
                    } else {
                        $.plugin.showMessage("方案编制完结操作失败。");
                    };
                }
                window.project.subProject.confirmStageFinish({ SubProjectKey: key, Stage: 2 }, _callback);
            });
        }

        _bindControl();
        _bindButtonEvent();
    }
})(jQuery);