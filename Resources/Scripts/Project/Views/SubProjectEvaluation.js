/*
==============================================================================
//  现场测评页面 SubProjectEvaluation.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectEvaluation_aspx) { window.project.SubProjectEvaluation_aspx = new Object(); }
    window.project.SubProjectEvaluation_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            $("#WorkInstrGrid", ajaxContainerSelector).datagrid({
                //                title: '作业指导书列表',
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
                columns: [[
                { field: 'Name', title: '名称', width: 100, sortable: true },
                { field: 'ObjectName', title: '测评对象', width: 100, sortable: true },
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

            $("#WorkInstrTree", ajaxContainerSelector).treegrid({
                title: '现场测评录入',
                idField: 'Key',
                treeField: 'Name',
                fit: true,
                animate: true,
                rownumbers: true,
                fitColumns: true,
                border: false,
                //           nowrap:false,
                columns: [[
                    { title: '要求项', field: 'Name', width: 200, formatter: function (value) { if (value) return "<span title='" + value + "'>" + value + "</span>" } },
                    { title: '实施过程', field: 'Process', width: 200, formatter: function (value) {
                        if (value) {
                            var detailbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-grid" }).attr("title", "查看详细").attr("onclick", 'javascript:window.project.SubProjectImpl_aspx.showGridDetail.call(this);');
                            var div = $("<div></div>").append(detailbtn).append("  <span title='" + value + "'>" + value + "</span>");
                            return div.html();
                        }
                    }
                    },
                    { title: '预期结果', field: 'Result', width: 200, formatter: function (value) {
                        if (value) {
                            var detailbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-grid" }).attr("title", "查看详细").attr("onclick", 'javascript:window.project.SubProjectImpl_aspx.showGridDetail.call(this);');
                            var div = $("<div></div>").append(detailbtn).append("  <span title='" + value + "'>" + value + "</span>");
                            return div.html();
                        }
                    }
                    },
                    { title: '现场测评情况', field: 'Scene', width: 200, editor: "textarea" },
                    { title: '符合情况', field: 'Accord', width: 200, formatter: function (value) {
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
                    { field: 'opt', title: '操作', width: 60, align: 'center',
                        formatter: function (value, rowData, rowIndex) {
                            if (rowData.Key.contains("Item_")) {
                                var savebtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-save" }).attr("onmouseover", "javascript:window.project.SubProjectEvaluation_aspx.isSave = true;").attr("onmouseout", "javascript:window.project.SubProjectEvaluation_aspx.isSave = false;");
                                var div = $("<div></div>").append(savebtn);
                                return div.html();
                            }
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
                    },
                    {
                        text: '导入现场记录表',
                        iconCls: 'icon-export',
                        handler: function () {
                            var _node = $("#WorkInstrGrid", ajaxContainerSelector).datagrid("getSelected");
                            if (!_node) {
                                $.plugin.showMessage("请在左方表格内选中要导入的现场记录表!");
                            }
                            window.platform.showUploadWindow({ title: "现场记录表导入" }, {
                                width: 100,
                                height: 20,
                                formData: { WorkInstrKey: _node.Key },
                                swf: 'Resources/Plugins/uploadify/uploadify.swf',
                                uploader: 'Services/Project/WorkInstructionService.asmx/ImportFieldRecordFile',
                                buttonText: '浏览文件',
                                multi: false,
                                uploadLimit: 1,
                                fileTypeDesc: 'doc',
                                fileTypeExts: '*.doc;*.docx;',
                                onUploadSuccess: function () {
                                    $("#WorkInstrTree", ajaxContainerSelector).treegrid("reload");
                                    window.project.workInstr.loadWorkInstr({ WorkInstrKey: _node.Key }, function (data) {
                                        $("#WorkInstrTree", ajaxContainerSelector).treegrid("loadData", data);
                                    });
                                }
                            });
                        }
                    },
                    {
                        text: '导出作业指导书',
                        iconCls: 'icon-down',
                        handler: function () {
                            var _node = $("#WorkInstrGrid", ajaxContainerSelector).datagrid("getSelected");
                            if (!_node) {
                                $.plugin.showMessage("请在左方表格内选中要导入的作业指导书!");
                            }
                            window.project.DownLoadFile(window.resolveUrl('Services/Project/WorkInstructionService.asmx/DownWorkInstruction'), { WorkInstrKey: _node.Key });

                        }
                    }],
                onClickRow: function (row) {
                    if (window.project.SubProjectEvaluation_aspx.editingId != undefined) {
                        $('#WorkInstrTree', ajaxContainerSelector).treegrid('endEdit', window.project.SubProjectEvaluation_aspx.editingId);
                        window.project.SubProjectEvaluation_aspx.editingId = undefined;
                    }
                    if (window.project.SubProjectEvaluation_aspx.isSave) {
                        if (String.isNullOrWhiteSpace(row.Accord)) {
                            $.plugin.showMessage("请选择符合情况。");
                            return;
                        }
                        var item = {
                            Key: row.Key.replaceAll("Item_", ""),
                            Scene: row.Scene,
                            Accord: row.Accord
                        };
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("保存成功。");
                            } else {
                                $.plugin.showMessage("保存失败。");
                            }
                        };
                        window.project.workInstr.saveSubProjectItem(item, _callback);
                        window.project.SubProjectEvaluation_aspx.isSave = false;
                    }
                    else {
                        if (row.Key.contains("Item_")) {
                            window.project.SubProjectEvaluation_aspx.editingId = row.Key;
                            $('#WorkInstrTree', ajaxContainerSelector).treegrid('selectRow', row.Key).treegrid('beginEdit', row.Key);
                        }
                    }

                }
            });

        }

        var _bindButtonEvent = function () {
            $("#panel", ajaxContainerSelector).panel({
                title: '作业指导书选取',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#divLayout2", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });
            $("#btnSubmit", ajaxContainerSelector).click(function () {
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("现场测评完结操作成功，您现在可以进入 方案编制及整改方案阶段。");
                        $("#btn4", window.project.SubProjectImpl_aspx.ajaxContainerSelector).linkbutton('enable');
                        $("#btn4", window.project.SubProjectImpl_aspx.ajaxContainerSelector).click(function () {
                            $("#StagePanel", window.project.SubProjectImpl_aspx.ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectReport.aspx?key=" + key));
                        });
                        $("#btn5", window.project.SubProjectImpl_aspx.ajaxContainerSelector).linkbutton('enable');
                        $("#btn5", window.project.SubProjectImpl_aspx.ajaxContainerSelector).click(function () {
                            $("#StagePanel", window.project.SubProjectImpl_aspx.ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectRectification.aspx?key=" + key));
                        });
                    } else {
                        $.plugin.showMessage("现场测评完结操作失败。");
                    };
                }
                window.project.subProject.confirmStageFinish({ SubProjectKey: key, Stage: 3 }, _callback);
            });

        }

        _bindControl();
        _bindButtonEvent();

    }
})(jQuery);