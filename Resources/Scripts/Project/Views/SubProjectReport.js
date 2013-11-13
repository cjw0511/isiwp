
/*
==============================================================================
//  项目报告编制阶段 SubProjectReport.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectReport_aspx) { window.project.SubProjectReport_aspx = new Object(); }

    window.project.SubProjectReport_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            //作业指导书列表
            $("#WorkInstrGrid", ajaxContainerSelector).datagrid({
                title: '作业指导书列表',
                fit: true,
                fitColumns: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/WorkInstructionService.asmx/GetPagingData'),
                queryParams: {
                    SubProjectKey: key
                },
                idField: 'Key',
                columns: [[{ field: 'ck', checkbox: true },
                { field: 'Name', title: '名称', width: 100, sortable: true },
                { field: 'ObjectName', title: '测评对象', width: 100, sortable: true },
                { field: 'opt', title: '数据统计操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var data = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-export" }).attr("title", '对每个层面的符合情况进行统计').attr("onclick", 'javascript:window.project.SubProjectReport_aspx.dataStatistics(\'' + rowData.Key + '\');');
                        var div = $("<div></div>").append(data);
                        return div.html();
                    }
                }
                ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                onClickRow: function (rowIndex, rowData) {
                    window.project.workInstr.loadWorkInstr({ WorkInstrKey: rowData.Key }, function (data) {
                        $("#WorkInstrTree", ajaxContainerSelector).treegrid("loadData", data);
                    });
                }
            });
            //作业指导书表格树
            $("#WorkInstrTree", ajaxContainerSelector).treegrid({
                title: '报告编制录入',
                idField: 'Key',
                treeField: 'Name',
                fit: true,
                animate: true,
                rownumbers: true,
                fitColumns: true,
                border: false,
                columns: [[
                    { title: '要求项', field: 'Name', width: 170, formatter: function (value) { if (value) return "<span title='" + value + "'>" + value + "</span>" } },
                    { title: '实施过程', field: 'Process', width: 170, formatter: function (value) {
                        if (value) {
                            var detailbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-grid" }).attr("title", "查看详细").attr("onclick", 'javascript:window.project.SubProjectImpl_aspx.showGridDetail.call(this);');
                            var div = $("<div></div>").append(detailbtn).append("  <span title='" + value + "'>" + value + "</span>");
                            return div.html();
                        }
                    }
                    },
                    { title: '预期结果', field: 'Result', width: 170, formatter: function (value) {
                        if (value) {
                            var detailbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-grid" }).attr("title", "查看详细").attr("onclick", 'javascript:window.project.SubProjectImpl_aspx.showGridDetail.call(this);');
                            var div = $("<div></div>").append(detailbtn).append("  <span title='" + value + "'>" + value + "</span>");
                            return div.html();
                        }
                    }
                    },
                    { title: '现场测评情况', field: 'Scene', width: 170, editor: "textarea" },
                    { title: '符合情况', field: 'Accord', width: 150, formatter: function (value) {
                        if (value) {
                            var dic = window.platform.getDataDictionarySingleRecordByValue({ MainKey: 59, Value: value });
                            return dic.Name;
                        }
                    }, editor: { type: "combobox", options: {
                        valueField: 'Value',
                        textField: "Name",
                        url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                        queryParams: { MainKey: 59 }
                    }
                    }
                    },
                    { title: '问题分析', field: 'Description', width: 170, editor: "textarea", formatter: function (value) { if (value) return "<span title='" + value + "'>" + value + "</span>" } },
                    { field: 'opt', title: '操作', width: 60, align: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            var savebtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-save" }).attr("onmouseover", "javascript:window.project.SubProjectReport_aspx.isSave = true;").attr("onmouseout", "javascript:window.project.SubProjectReport_aspx.isSave = false;").attr("title", "修改");
                            var cancelspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-undo" }).attr("onmouseover", "javascript:window.project.SubProjectReport_aspx.isCancel = true;").attr("onmouseout", "javascript:window.project.SubProjectReport_aspx.isCancel = false;").attr("title", "取消");
                            var div = $("<div></div>").append(savebtn).append(cancelspan);
                            return div.html();
                        }
                    }
                ]],
                toolbar: [
                    {
                        text: '展开',
                        iconCls: 'icon-add',
                        handler: function () {
                            $("#WorkInstrTree", ajaxContainerSelector).treegrid("expandAll");
                        }
                    },
                    {
                        text: '折叠',
                        iconCls: 'icon-remove',
                        handler: function () {
                            $("#WorkInstrTree", ajaxContainerSelector).treegrid("collapseAll");
                        }
                    }],
                onClickRow: function (row) {
                    if (window.project.SubProjectReport_aspx.editingId != undefined) {
                        $('#WorkInstrTree', ajaxContainerSelector).treegrid('endEdit', window.project.SubProjectReport_aspx.editingId);
                        window.project.SubProjectReport_aspx.editingId = undefined;
                    }
                    if (window.project.SubProjectReport_aspx.isSave) {
                        if (String.isNullOrWhiteSpace(row.Accord)) {
                            $.plugin.showMessage("请选择符合情况。");
                            return;
                        }
                        var item = {
                            Key: row.Key.replaceAll("Item_", ""),
                            Scene: row.Scene,
                            Accord: row.Accord,
                            Description: row.Description
                        };
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("保存成功。");
                            } else {
                                $.plugin.showMessage("保存失败。");
                            }
                        };
                        window.project.workInstr.saveReportSubProjectItem(item, _callback);
                        window.project.SubProjectReport_aspx.isSave = false;
                    }
                    else if (window.project.SubProjectReport_aspx.isCancel) {
                        var workInstrKey = $("#WorkInstrGrid", ajaxContainerSelector).datagrid("getSelected").Key;
                        window.project.workInstr.loadWorkInstr({ WorkInstrKey: workInstrKey }, function (data) {
                            $("#WorkInstrTree", ajaxContainerSelector).treegrid("loadData", data);
                        });
                        $.plugin.showMessage("取消成功。");
                        window.project.SubProjectReport_aspx.isCancel = false;
                    }
                    else {
                        if (row.Key.contains("Item_")) {
                            window.project.SubProjectReport_aspx.editingId = row.Key;
                            $('#WorkInstrTree', ajaxContainerSelector).treegrid('selectRow', row.Key).treegrid('beginEdit', row.Key);
                        }
                    }
                }
            });
            //资产管理
            $("#selSys1", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "SystemName",
                url: window.resolveUrl("Services/Project/SubProjectReportService.asmx/GetSubProjectSystem"),
                queryParams: { SubProjectKey: key },
                onSelect: function (record) {
                    $("#PropertyGird", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectReportService.asmx/LoadPropertyGridData');
                    $("#PropertyGird", ajaxContainerSelector).datagrid("load", { SubProjectKey: key, SystemKey: record.Key });
                }
            });

            $("#PropertyGird").datagrid({
                fitColumns: true,
                fit: true,
                border: false,
                rownumbers: true,
                nowrap: true,
                idField: 'Key',
                columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Name', title: '资产名称', width: 200 },
                { field: 'ImportanceC', title: '重要性A', width: 200 },
                { field: 'ImportanceI', title: '重要性I', width: 200 },
                { field: 'ImportanceA', title: '重要性C', width: 200 },
                { field: 'opt', title: '操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("title", "编辑").attr("onclick", 'javascript:window.project.SubProjectReport_aspx.editProperty(\'' + rowData.Key + '\');');
                        var delbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除").attr("onclick", 'javascript:window.project.SubProjectReport_aspx.delProperty(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(editbtn).append(delbtn);
                        return div.html();
                    }
                }
			    ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                toolbar: [
                    {
                        text: '添加',
                        iconCls: 'icon-add',
                        handler: function () {
                            var syskey = $('#selSys1').combobox('getValue');
                            if (syskey == "") {
                                $.plugin.showMessage("请先选择系统!");
                            }
                            else {
                                $.plugin.showDialog({
                                    title: "添加资产",
                                    href: "Views/Project/SubProjectPropertyAdd.aspx",
                                    onSave: function (dialog) {
                                        var verifyResult = $(dialog).form("validate");
                                        if (!verifyResult) { return false };
                                        var property = $(dialog).form('getData');
                                        $.extend(property, { SubProjectKey: key });
                                        $.extend(property, { SystemKey: syskey });
                                        var _callback = function (success) {
                                            if (success) {
                                                $.plugin.showMessage("添加资产成功。");
                                                $("#PropertyGird", ajaxContainerSelector).datagrid('reload');
                                            } else {
                                                $.plugin.showMessage("添加资产失败。");
                                            };
                                        };
                                        window.project.report.addProperty(property, _callback);
                                    },
                                    width: 770,
                                    height: 220
                                });
                            }
                        }
                    },
                    {
                        id: 'btnrefresh',
                        text: '刷新',
                        iconCls: 'icon-refresh',
                        handler: function () {
                            $("#PropertyGird", ajaxContainerSelector).datagrid('reload');
                        }
                    },
                    {
                        text: '删除',
                        iconCls: 'icon-no',
                        handler: function () {
                            var ids = [];
                            var names = [];
                            var rows = $('#PropertyGird', ajaxContainerSelector).datagrid('getChecked');
                            if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                            else {
                                for (var i = 0; i < rows.length; i++) {
                                    ids.push(rows[i].Key);
                                    names.push(rows[i].Name);
                                }
                                window.project.SubProjectReport_aspx.delProperty(ids.join(','), names.join(','));
                            }
                        }
                    }]
            });
            window.project.SubProjectReport_aspx.editProperty = function (key) {
                $.plugin.showDialog({
                    title: "编辑资产",
                    href: "Views/Project/SubProjectPropertyUpdate.aspx?porkey=" + key,
                    onSave: function (dialog) {
                        var verifyResult = $(dialog).form("validate");
                        if (!verifyResult) { return false };
                        var property = $(dialog).form('getData');
                        $.extend(property, { Key: key });
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("编辑资产成功。");
                                $("#PropertyGird", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("编辑资产失败。");
                            }
                        };
                        window.project.report.updateProperty(property, _callback);
                    },
                    width: 770,
                    height: 220
                });
            }
            window.project.SubProjectReport_aspx.delProperty = function (keys, names) {
                $.plugin.messager.confirm("提示", "点击确定将删除 <strong>" + names + "</strong><br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除联系人成功。");
                                $("#PropertyGird", ajaxContainerSelector).datagrid('clearSelections');
                                $("#PropertyGird", ajaxContainerSelector).datagrid('clearChecked');
                                $("#PropertyGird", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("删除联系人失败。");
                            }
                        };
                        window.project.report.deleteProperty(keys, _callback);
                    }
                });
            }
            //风险分析
            var editIndex = undefined;
            var isEditor = false;
            var SaveRecord = function (rowIndex, rowData) {
                if (rowData.Key != undefined) {
                    var problem = {};
                    $.extend(problem, { ProblemKey: rowData.Key });
                    $.extend(problem, { Value: rowData.Value });
                    var _callback = function (success) {
                        if (success) {

                        } else {

                        }
                    };
                    window.project.report.setProblemValue(problem, _callback);
                }
            }
            $("#selSys2", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "SystemName",
                url: window.resolveUrl("Services/Project/SubProjectReportService.asmx/GetSubProjectSystem"),
                queryParams: { SubProjectKey: key },
                onSelect: function (record) {
                    $("#ProblemGrid", ajaxContainerSelector).datagrid("clearSelections");
                    $("#ProblemPropertyGrid").datagrid("loadData", []);
                    $("#ProblemGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectReportService.asmx/LoadProblemGridData');
                    $("#ProblemGrid", ajaxContainerSelector).datagrid("load", { SubProjectKey: key, SystemKey: record.Key });
                }
            });
            var tierlist = $.plugin.getJsonDataRequestWebService("Services/LoreLibs/NormService.asmx/GetRootTier");
            var _tierFormatter = function (value) {
                for (var i = 0; i < tierlist.length; i++) {
                    if (tierlist[i].Key == value) return tierlist[i].Name;
                }
                return value;
            }
            $("#ProblemGrid").datagrid({
                singleSelect: true,
                fitColumns: true,
                fit: true,
                border: false,
                rownumbers: true,
                nowrap: true,
                idField: 'Key',
                columns: [[
                { field: 'TierKey', title: '层面名称', width: 150, formatter: _tierFormatter },
                { field: 'ObjectName', title: '测评对象', width: 150 },
                { field: 'Name', title: '问题描述', width: 400 },
                { field: 'Value', title: '赋值', width: 100,
                    editor:{  
                        type:'numberbox',
                        options:
                        {
                            min: 0,
                            precision:1
                        }
                    }  

                }
			    ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                onClickRow: function (rowIndex, rowData) {
                    if (editIndex == rowIndex && isEditor == true) {
                        $("#ProblemGrid", ajaxContainerSelector).datagrid("endEdit", rowIndex);
                        isEditor = false;
                    } else {
                        if (isEditor == true) {
                            $("#ProblemGrid", ajaxContainerSelector).datagrid("endEdit", editIndex);
                        }
                        $("#ProblemGrid", ajaxContainerSelector).datagrid("beginEdit", rowIndex);
                        isEditor = true;
                    }
                    editIndex = rowIndex;

                    if (window.project.SubProjectReport_aspx.isSetValue) {
                        alert(rowData.Key);
                        window.project.SubProjectReport_aspx.isSetValue = false;
                    }
                    $("#ProblemPropertyGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectReportService.asmx/LoadProblemPropertyGridData');
                    $("#ProblemPropertyGrid", ajaxContainerSelector).datagrid("load", { ProblemKey: rowData.Key });

                },
                onBeforeEdit: function (index, row) {
                    row.editing = true;
                },
                onAfterEdit: function (index, row) {
                    row.editing = false;
                    SaveRecord(index, row);
                },
                onCancelEdit: function (index, row) {
                    row.editing = false;
                    SaveRecord(index, row);
                }
            });
            $("#ProblemPropertyGrid").datagrid({
                singleSelect: true,
                fitColumns: true,
                fit: true,
                border: false,
                rownumbers: true,
                nowrap: true,
                idField: 'Key',
                columns: [[
                { field: 'Name', title: '关联资产', width: 200 },
                { field: 'ImportanceC', title: '重要性C', width: 100 },
                { field: 'ImportanceI', title: '重要性I', width: 100 },
                { field: 'ImportanceA', title: '重要性A', width: 100 },
                { field: 'Threaten', title: '关联威胁', width: 100 },
                { field: 'opt', title: '操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var relationspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-select" }).attr("title", "关联威胁").attr("onmouseover", "javascript:window.project.SubProjectReport_aspx.isSetThreaten = true;").attr("onmouseout", "javascript:window.project.SubProjectReport_aspx.isSetThreaten = false;");
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除").attr("onmouseover", "javascript:window.project.SubProjectReport_aspx.isDelMapping = true;").attr("onmouseout", "javascript:window.project.SubProjectReport_aspx.isDelMapping = false;");
                        var div = $("<div></div>").append(relationspan).append(delspan);
                        return div.html();
                    }
                }
			    ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: false,
                onClickRow: function (rowIndex, rowData) {
                    if (window.project.SubProjectReport_aspx.isSetThreaten) {
                        var selected = [];
                        var threatenList = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectReportService.asmx/GetThreatenMapping", { MappingKey: rowData.Key });
                        for (var i = 0; i < threatenList.length; i++) {
                            selected.push((threatenList[i].ThreatenKey));
                        };
                        var onEnterClick = function (datagrid, selections) {
                            var keys = [];
                            for (var i = 0; i < selections.length; i++) {
                                keys.push(selections[i].Key);
                            }
                            var param = {
                                MappingKey: rowData.Key,
                                ThreatenKeys: keys.join(',')
                            }
                            window.project.report.setThreatenMapping(param, function (success) {
                                if (success) {
                                    $.plugin.showMessage("设置关联威胁成功!");
                                    var problemRow = $("#ProblemGrid", ajaxContainerSelector).datagrid("getSelected");
                                    if (problemRow == null) {
                                        return;
                                    }
                                    $("#ProblemPropertyGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectReportService.asmx/LoadProblemPropertyGridData');
                                    $("#ProblemPropertyGrid", ajaxContainerSelector).datagrid("load", { ProblemKey: problemRow.Key });
                                }
                                else {
                                    $.plugin.showMessage("设置关联威胁失败!");
                                }
                            });
                        };
                        window.project.showRelationThreaten(onEnterClick, selected);

                        window.project.SubProjectReport_aspx.isSetThreaten = false;
                    }
                    if (window.project.SubProjectReport_aspx.isDelMapping) {
                        window.project.report.deleteProblemPropertyMapping({ MappingKey: rowData.Key }, function (success) {
                            if (success) {
                                $.plugin.showMessage("删除关联资产成功。");
                                var problemRow = $("#ProblemGrid", ajaxContainerSelector).datagrid("getSelected");
                                if (problemRow == null) {
                                    return;
                                }
                                $("#ProblemPropertyGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectReportService.asmx/LoadProblemPropertyGridData');
                                $("#ProblemPropertyGrid", ajaxContainerSelector).datagrid("load", { ProblemKey: problemRow.Key });
                            } else {
                                $.plugin.showMessage("删除关联资产失败。");
                            }
                        })
                        window.project.SubProjectReport_aspx.isDelMapping = false;
                    }
                },
                toolbar: [
                    {
                        text: '添加关联资产',
                        iconCls: 'icon-add',
                        handler: function () {
                            var sysKey = $("#selSys2", ajaxContainerSelector).combobox("getValue");
                            if (sysKey == '') {
                                $.plugin.showMessage("请选择系统！");
                                return;
                            }
                            var problemRow = $("#ProblemGrid", ajaxContainerSelector).datagrid("getSelected");
                            if (problemRow == null) {
                                $.plugin.showMessage("请选择问题分析！");
                                return;
                            }
                            var paramobj = {
                                SubProjectKey: key,
                                SystemKey: sysKey,
                                ProblemKey: problemRow.Key
                            };
                            window.project.showRelationProperty(paramobj, function (datagrid, selections) {
                                var keys = [];
                                for (var i = 0; i < selections.length; i++) {
                                    keys.push(selections[i].Key);
                                }
                                var param = {
                                    ProblemKey: problemRow.Key,
                                    PropertyKeys: keys.join(',')
                                }
                                window.project.report.setProblemPropertyMapping(param, function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加资产成功!");
                                        $("#ProblemPropertyGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectReportService.asmx/LoadProblemPropertyGridData');
                                        $("#ProblemPropertyGrid", ajaxContainerSelector).datagrid("load", { ProblemKey: problemRow.Key });
                                    }
                                    else {
                                        $.plugin.showMessage("添加资产失败!");
                                    }
                                });
                            });
                        }
                    }]
            });

            //生成报告
            $("#selSystem", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "SystemName",
                url: window.resolveUrl("Services/Project/SubProjectReportService.asmx/GetSubProjectSystem"),
                queryParams: { SubProjectKey: key }
            });

            var systemlist = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectReportService.asmx/GetSubProjectSystem", { SubProjectKey: key });
            var _systemFormatter = function (value) {
                for (var i = 0; i < systemlist.length; i++) {
                    if (systemlist[i].Key == value) return systemlist[i].SystemName;
                }
                return value;
            }
            //报告列表
            $("#reportTable", ajaxContainerSelector).datagrid({
                fit: true,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/SubProjectReportService.asmx/LoadReportGridData'),
                idField: 'Key',
                queryParams: {
                    SubProjectKey: key
                },
                columns: [[
                { field: 'Name', title: '报告名称', width: 450 },
                { field: 'SystemKey', title: '系统名称', width: 200, formatter: _systemFormatter },
                { field: 'ReportCode', title: '报告编号', width: 200 },
                { field: 'DocumentCode', title: '文件编号', width: 200 },
                { field: 'opt', title: '操作', width: 100, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var downspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-down" }).attr("title", "下载报告").attr("onmouseover", "javascript:window.project.SubProjectReport_aspx.isDownReport = true;").attr("onmouseout", "javascript:window.project.SubProjectReport_aspx.isDownReport = false;");
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除报告").attr("onmouseover", "javascript:window.project.SubProjectReport_aspx.isDelReport = true;").attr("onmouseout", "javascript:window.project.SubProjectReport_aspx.isDelReport = false;");
                        var div = $("<div></div>").append(downspan).append(delspan);
                        return div.html();
                    }
                }
			    ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                onClickRow: function (rowIndex, rowData) {
                    if (window.project.SubProjectReport_aspx.isDelReport) {
                        window.project.project.deleteReport({ ReportKey: rowData.Key }, function (success) {
                            if (success) {
                                $("#reportTable", ajaxContainerSelector).datagrid("reload");
                                $.plugin.showMessage("删除测评报告成功。");
                            } else {
                                $.plugin.showMessage("删除测评报告失败。");
                            }
                        })
                        window.project.SubProjectReport_aspx.isDelReport = false;
                    }
                    if (window.project.SubProjectReport_aspx.isDownReport) {
                        window.project.DownLoadFile(window.resolveUrl('Services/Project/DocumentService.asmx/DownLoadFile'), { FileKey: rowData.DocumentFileKey });
                        window.project.SubProjectReport_aspx.isDownReport = false;
                    }
                }
            });




        }

        /// 数据统计
        window.project.SubProjectReport_aspx.dataStatistics = function (key) {
            $.plugin.showDialog({
                title: "项目数据统计",
                href: "Views/Project/DataStatistics.aspx?key=" + key,
                width: 800,
                height: 260,
                resizable: false,
                minimizable: false,
                maximizable: false
            });
        }
        var _bindButtonEvent = function () {
            $("#btnCreateReport", ajaxContainerSelector).click(function () {
                if ($("#selSystem", ajaxContainerSelector).combobox("getValue") == '') {
                    $.plugin.showMessage("请选择系统！");
                    return;
                }
                var param = {
                    SubProjectKey: key,
                    SystemKey: $("#selSystem", ajaxContainerSelector).combobox("getValue"),
                    ReportCode: $("#txtReportCode", ajaxContainerSelector).val(),
                    DocumentCode: $("#txtDocumentCode", ajaxContainerSelector).val(),
                    RecordCode: $("#txtRecordCode", ajaxContainerSelector).val()
                };
                $.plugin.messager.progress({ title: "操作提醒", msg: "正在生成测评报告,请稍等..." });
                var _callback = function (success) {
                    if (success) {
                        $("#reportTable", ajaxContainerSelector).datagrid("reload");
                        $.plugin.showMessage("生成测评报告成功！");
                    } else {
                        $.plugin.showMessage("生成测评报告失败！");
                    }
                    $.plugin.messager.progress("close");
                };
                window.project.report.createReport(param, _callback);
            });
            $("#btnSubmit", ajaxContainerSelector).click(function () {
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("报告编制完结操作成功，您现在可以进入 子项目结案。");
                    } else {
                        $.plugin.showMessage("报告编制完结操作失败。");
                    };
                }
                window.project.subProject.confirmStageFinish({ SubProjectKey: key, Stage: 4 }, _callback);
            });

            $("#btnImportProperty", ajaxContainerSelector).click(function () {
                var sysKey = $("#selSys1", ajaxContainerSelector).combobox("getValue");
                if (sysKey == '') {
                    $.plugin.showMessage("请选择系统！");
                    return;
                }
                var param = {
                    SubProjectKey: key,
                    SystemKey: $("#selSys1", ajaxContainerSelector).combobox("getValue")
                };
                var _callback = function (success) {
                    if (success) {
                        $("#PropertyGird", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectReportService.asmx/LoadPropertyGridData');
                        $("#PropertyGird", ajaxContainerSelector).datagrid("load", { SubProjectKey: key, SystemKey: sysKey });
                        $.plugin.showMessage("导入资产成功！");
                    } else {
                        $.plugin.showMessage("导入资产失败！");
                    }
                    $.plugin.messager.progress("close");
                };
                window.project.report.importProperty(param, _callback);
            });
            $("#btnImportProblem", ajaxContainerSelector).click(function () {
                var sysKey = $("#selSys2", ajaxContainerSelector).combobox("getValue");
                if (sysKey == '') {
                    $.plugin.showMessage("请选择系统！");
                    return;
                }
                var param = {
                    SubProjectKey: key,
                    SystemKey: $("#selSys2", ajaxContainerSelector).combobox("getValue")
                };
                var _callback = function (success) {
                    if (success) {
                        $("#ProblemGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubProjectReportService.asmx/LoadProblemGridData');
                        $("#ProblemGrid", ajaxContainerSelector).datagrid("load", { SubProjectKey: key, SystemKey: sysKey });
                        $.plugin.showMessage("导入问题描述成功！");
                    } else {
                        $.plugin.showMessage("导入问题描述失败！");
                    }
                    $.plugin.messager.progress("close");
                };
                window.project.report.importProblem(param, _callback);
            });
        }

        _bindControl();
        _bindButtonEvent();

    }
})(jQuery);
