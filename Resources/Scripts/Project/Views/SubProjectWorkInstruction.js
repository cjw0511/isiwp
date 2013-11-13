/*
==============================================================================
//  子项目作业指导书页面 SubProjectWorkInstruction.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectWorkInstruction_aspx) { window.project.SubProjectWorkInstruction_aspx = new Object(); }
    window.project.SubProjectWorkInstruction_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            $("#selTrade", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTrade")
            });
            $("#selTier", ajaxContainerSelector).combotree({
                onlyLeafCheck: true,
                animate: true,
                multiple: true,
                editable: false,
                panelHeight: 'auto',
                onBeforeCheck: function (node, checked) {

                }
            });
            $("#selLevel", ajaxContainerSelector).combobox({
                valueField: 'Value',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 39 }
            });
            window.lorelibs.norm.getAllTier(function (data) {
                $("#selTier", ajaxContainerSelector).combotree("loadData", data);
            });

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
                columns: [[
                { field: 'Name', title: '名称', width: 100, sortable: true },
                { field: 'TierName', title: '层面', width: 100, sortable: true },
                { field: 'opt', title: '操作', width: 50, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var downspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-down" }).attr("title", "点击打开").attr("onmouseover", "javascript:window.project.SubProjectWorkInstruction_aspx.isDown = true;").attr("onmouseout", "javascript:window.project.SubProjectWorkInstruction_aspx.isDown = false;");
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除").attr("onmouseover", "javascript:window.project.SubProjectWorkInstruction_aspx.isDel = true;").attr("onmouseout", "javascript:window.project.SubProjectWorkInstruction_aspx.isDel = false;");
                        var div = $("<div></div>").append(downspan).append(delspan);
                        return div.html();
                    }
                }
			    ]],
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                onClickRow: function (rowIndex, rowData) {
                    if (window.project.SubProjectWorkInstruction_aspx.isDown) {
                        window.project.DownLoadFile(window.resolveUrl('Services/Project/DocumentService.asmx/DownLoadFile'), { FileKey: rowData.DocumentFileKey });
                        window.project.SubProjectWorkInstruction_aspx.isDown = false;
                    }
                    else if (window.project.SubProjectWorkInstruction_aspx.isDel) {
                        $.plugin.messager.confirm("提示", "点击确定将删除 " + rowData.Name + "<br />是否执行此操作？", function (fn) {
                            if (fn) {
                                var _callback = function (success) {
                                    if (success) {
                                        $("#WorkInstrGrid", ajaxContainerSelector).datagrid('reload');
                                        $.plugin.showMessage("作业指导书删除成功。");
                                    } else {
                                        $.plugin.showMessage("作业指导书删除失败。");
                                    }
                                };
                                window.project.workInstr.deleteWorkInstr({ WorkInstrKey: rowData.Key }, _callback);
                            }
                        });
                        window.project.SubProjectWorkInstruction_aspx.isDel = false;
                    }
                    else {
                        window.project.workInstr.loadWorkInstr({ WorkInstrKey: rowData.Key }, function (data) {
                            $("#WorkInstrTree", ajaxContainerSelector).treegrid("loadData", data);
                        });
                    }
                }
            });

            $("#WorkInstrTree", ajaxContainerSelector).treegrid({
                title: '作业指导书详细',
                idField: 'Key',
                treeField: 'Name',
                fit: true,
                animate: true,
                rownumbers: true,
                fitColumns: true,
                border: false,
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
                     }
                    ]
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
            }); $("#btnCreate", ajaxContainerSelector).click(function () {
                var trade = $("#selTrade", ajaxContainerSelector).combobox("getValue");
                if (String.isNullOrWhiteSpace(trade)) {
                    $.plugin.showMessage("请选择行业。");
                    return;
                }
                var tier = $("#selTier", ajaxContainerSelector).combotree("getValues");
                if (String.isNullOrWhiteSpace(tier)) {
                    $.plugin.showMessage("请选择层面。");
                    return;
                }
                var level = $("#selLevel", ajaxContainerSelector).combobox("getValue");
                if (String.isNullOrWhiteSpace(level)) {
                    $.plugin.showMessage("请选择级别。");
                    return;
                }
                var name = $("#txtName", ajaxContainerSelector).val();
                if (String.isNullOrWhiteSpace(name)) {
                    $.plugin.showMessage("请填写项目指导书名称。");
                    return;
                }
                var set = {
                    SubProjectKey: key,
                    Name: name,
                    TradeKey: trade,
                    TierKey: String(tier),
                    Level: level
                };
                var _callback = function (success) {
                    if (success) {
                        $("#WorkInstrGrid", ajaxContainerSelector).datagrid('reload');
                        $.plugin.showMessage("生成作业指导书成功。");
                    } else {
                        $.plugin.showMessage("生成作业指导书失败。");
                    }
                };
                window.project.workInstr.createWorkInstr(set, _callback);

            });



            $("#btnSubmit", ajaxContainerSelector).click(function () {
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("作业指导书编制完结操作成功，您现在可以进入 现场测评阶段。");
                        $("#btn3", window.project.SubProjectImpl_aspx.ajaxContainerSelector).linkbutton('enable');
                        $("#btn3", window.project.SubProjectImpl_aspx.ajaxContainerSelector).click(function () {
                            $("#StagePanel", window.project.SubProjectImpl_aspx.ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectEvaluation.aspx?key=" + key));
                        });
                    } else {
                        $.plugin.showMessage("作业指导书编制完结操作失败。");
                    };
                }
                //                window.project.subProject.updateStageType({ StageType: 2 }, _callback);
                //                window.project.subProject.updateStageType({ Key: key, StageType: 1 }, _callback);
                window.project.subProject.confirmStageFinish({ SubProjectKey: key, Stage: 2 }, _callback);
            });



        }

        _bindControl();
        _bindButtonEvent();

    };

})(jQuery);