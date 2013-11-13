/*
==============================================================================
//  整改方案页面 SubProjectRectification.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectRectification_aspx) { window.project.SubProjectRectification_aspx = new Object(); }
    window.project.SubProjectRectification_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            var mainkey = $.plugin.getJsonDataRequestWebService("Services/Project/SubRectificationService.asmx/GetRectRectiMasterKey", { SubProjKey: key });
            $("#TemplateKey", ajaxContainerSelector).val(mainkey)
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
            var maintitle = $.plugin.getJsonDataRequestWebService("Services/Project/SubRectificationService.asmx/GetSubProjectRectTemplateByKey", { Key: mainkey });
            var title = "";
            if (maintitle.Title != undefined) {
                title = " - " + maintitle.Title
            }
            var Main_options = {
                title: '整改方案模板设置' + title,
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/SubRectificationService.asmx/LoadGridDataOfMainByKey'),
                queryParams: {
                    title: "", templateType: -1, key: mainkey
                },
                searchButton: $("#btnSearch", ajaxContainerSelector),
                idField: 'Key',
                columns: [[{ field: 'ck', checkbox: true },
                { field: 'Title', title: '模板标题', width: 150, sortable: true },
                { field: 'TypeKey', title: '方案类型', width: 120, sortable: true, formatter: _templateFormatter },
                { field: 'TemplateType', title: '模版类型', width: 100, sortable: true, formatter: _rectificationFormatter },
                { field: 'Description', title: '模板描述', width: 200, sortable: true }
			    ]],
                pagination: true,
                onSelect: function (rowIndex, rowData) {
                    $("#EastMainGrid").empty();
                    if (rowData.TemplateType == "1") {
                        LoadTextField(rowData.Key);
                    }
                    else if (rowData.TemplateType == "2") {
                        LoadSingelTable(rowData.Key);
                    }
                    else if (rowData.TemplateType == "3") {
                        LoadMultyTable(rowData.Key);
                    }
                },
                toolbar: [
                //                    {
                //                    id: 'btnadd',
                //                    text: '添加',
                //                    iconCls: 'icon-create',
                //                    handler: function () {
                //                        $.plugin.showDialog({
                //                            title: "添加整改方案模版",
                //                            href: "Views/Project/SubRectificationMainAdd.aspx",
                //                            onSave: function (dialog) {
                //                                var verifyResult = $(dialog).form("validate");
                //                                if (!verifyResult) { return false };
                //                                var main = $(dialog).form('getData');
                //                                var _callback = function (success) {
                //                                    if (success) {
                //                                        $.plugin.showMessage("添加整改方案模版成功。");
                //                                        $("#MainGrid", ajaxContainerSelector).datagrid('reload');
                //                                    } else {
                //                                        $.plugin.showMessage("添加整改方案模版失败。");
                //                                    }
                //                                };
                //                                window.project.subrectification.addSubProjectRectMain(main, _callback);
                //                            },
                //                            width: 900,
                //                            height: 350
                //                        });
                //                    }
                //                }, '-', {
                //                    id: 'btncut',
                //                    text: '删除',
                //                    iconCls: 'icon-no',
                //                    handler: function () {
                //                        var keys = [];
                //                        var rows = $("#MainGrid", ajaxContainerSelector).datagrid('getChecked');
                //                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                //                        else {
                //                            for (var i = 0; i < rows.length; i++) {
                //                                keys.push(rows[i].Key);
                //                            }
                //                            window.project.SubRectificationMainManage_aspx.delSubProjectRectMain(keys.join(','));
                //                        }
                //                    }
                //                }, '-', 
                {
                id: 'btnrefresh',
                text: '刷新',
                iconCls: 'icon-refresh',
                handler: function () {
                    $("#MainGrid", ajaxContainerSelector).datagrid('reload');
                }
            }]
        };
        $("#MainGrid", ajaxContainerSelector).datagrid(Main_options);


    }

    var _bindButtonEvent = function () {
        $("#btnAdd", ajaxContainerSelector).click(function () {
            var selected = $("#TemplateKey", ajaxContainerSelector).val();
            var onEnterClick = function (datagrid, selections) {
                if (selections.length > 0) {
                    $("#TemplateKey", ajaxContainerSelector).val(selections[0].Key);
                    var param = { title: "", templateType: -1, key: selections[0].Key };
                    $("#MainGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/SubRectificationService.asmx/LoadGridDataOfMainByKey');
                    $("#MainGrid", ajaxContainerSelector).datagrid('load', param);
                } else {
                    $.plugin.messager.alert("提示", "请先选择一行", "warning");
                    return false;
                }
            };
            window.project.showRectiTemplateSelector(onEnterClick, selected);
        });
        //        $("#btnView", ajaxContainerSelector).click(function () {
        //            $("#MainGrid", ajaxContainerSelector).datagrid('reload');
        //            $("#MainGrid", ajaxContainerSelector).datagrid('unselectAll');
        //            $('#containerPanel').panel('open').panel('refresh');
        //        });
        $("#btnSubmit", ajaxContainerSelector).click(function () {
            $.plugin.messager.confirm("提示", "点击确定将进行 <strong>整改方案生成操作</strong><br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("整改方案生成操作成功，您现在可以进入 子项目结案阶段。");
                        } else {
                            $.plugin.showMessage("整改方案生成结操作失败。");
                        };
                    }
                    //window.project.subProject.confirmStageFinish({ SubProjectKey: key, Stage: 4 }, _callback);
                }
            });
        });
        $("#btnDown", ajaxContainerSelector).click(function () {
            window.project.doc.ShowDownDialog("整改方案下载", "Subrectification");
        });
    }

    var LoadTextField = function (TemplateKey) {
        $("#EastMainGrid").append("<div id=\"tool\" class=\"datagrid-toolbar easyui-panel\" data-options=\"closed:true\"><a id=\"btnSave\" href=\"javascript:void(0);\" class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-save',plain:true\">保存</a></div>");
        $('.easyui-linkbutton').linkbutton({});
        var fielddata = $.plugin.getJsonDataRequestWebService("Services/Project/SubRectificationService.asmx/GetSubProjectRecordByTemplateKey", { TemplateKey: TemplateKey, RowIndex: 0 });
        $('#btnSave', ajaxContainerSelector).unbind("click");
        $("#btnSave", ajaxContainerSelector).click(function () {
            for (var i = 0; i < fielddata.length; i++) {
                var Content = escape($("#txt" + String(fielddata[i].Key), ajaxContainerSelector).ckeditor("getValue"));
                $.extend(fielddata[i], { Content: Content });
                if (fielddata[i].RecordKey == "0") {
                    $.extend(fielddata[i], { SubProjKey: key });
                    $.extend(fielddata[i], { MainKey: fielddata[i].Key });
                    $.extend(fielddata[i], { RowIndex: 0 });
                    window.project.subrectification.addSubProjectRectContent(fielddata[i], function () { });
                }
                else {
                    window.project.subrectification.updateSubProjectRectContent(fielddata[i], function () { });
                }
            }
            $.plugin.showMessage("编辑模板内容成功！");
        });
        if ($("#fdFieldGrid").length <= 0) {
            $("#EastMainGrid").append("<fieldset id='fdFieldGrid' class='datebox-button' style='padding: 8px; margin: 10px; height: auto; text-align: left;'><legend class='panel-title'>模板内容：</legend><table id='FieldGrid'></table></fieldset>");
        }
        $("#FieldGrid", ajaxContainerSelector).className = "tablecss";
        for (var i = 0; i < fielddata.length; i++) {
            var html = $("<tr></tr>");
            var tdleft = $('<td height="180" class="table_td_left"></td>').append(String(fielddata[i].Name) + "：");
            var control = $('<textarea class="easyui-ckeditor" rows=\'10\' />').attr("id", "txt" + String(fielddata[i].Key)).attr("name", String(fielddata[i].Key));
            var tdright = $('<td class="table_td_right"></td>').append(control);
            html.append(tdleft).append(tdright);
            $("#FieldGrid").append(html);
            $("#txt" + String(fielddata[i].Key), ajaxContainerSelector).val(unescape(fielddata[i].Content));
        }
        $('.easyui-ckeditor').ckeditor({});
    }

    var LoadSingelTable = function (TemplateKey) {
        $("#EastMainGrid").append("<div id=\"tool\" class=\"datagrid-toolbar easyui-panel\" data-options=\"closed:true\"><a id=\"btnSave\" href=\"javascript:void(0);\" class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-save',plain:true\">保存</a></div>");
        $('.easyui-linkbutton').linkbutton({});
        var fielddata = $.plugin.getJsonDataRequestWebService("Services/Project/SubRectificationService.asmx/GetSubProjectRecordByTemplateKey", { TemplateKey: TemplateKey, RowIndex: 0 });
        $('#btnSave', ajaxContainerSelector).unbind("click");
        $("#btnSave", ajaxContainerSelector).click(function () {
            for (var i = 0; i < fielddata.length; i++) {
                var Content = $("#txt" + String(fielddata[i].Key), ajaxContainerSelector).val();
                $.extend(fielddata[i], { Content: Content });
                if (fielddata[i].RecordKey == "0") {
                    $.extend(fielddata[i], { SubProjKey: key });
                    $.extend(fielddata[i], { MainKey: fielddata[i].Key });
                    $.extend(fielddata[i], { RowIndex: 0 });
                    window.project.subrectification.addSubProjectRectContent(fielddata[i], function () { });
                }
                else {
                    window.project.subrectification.updateSubProjectRectContent(fielddata[i], function () { });
                }
            }
            $.plugin.showMessage("编辑模板内容成功！");
        });

        var configFactory = {
            defaultconfig: {
                longerstyle: '',
                colspan: '',
                lab: "input",
                required: '：',
                tdleftstyle: '',
                tdrightstyle: '',
                controltype: '',
                options: null
            },
            _getConfig: function (fielddata) {
                return this._inputConfig(fielddata); ;
            },
            _inputConfig: function (fielddata) {
                var config = $.extend([], this.defaultconfig);
                var dic = window.platform.getDataDictionarySingleRecord({ MainKey: 33, Key: fielddata.TypeKey });
                $.extend(config, { controltype: String(dic.Value1) });
                if (String.isNullOrWhiteSpace(config.controltype)) { config.controltype = "validatebox"; };
                var validtype = [];
                if (fielddata.MaxLength != 0 && config.controltype === "validatebox") {
                    var validtype = 'maxLength[' + fielddata.MaxLength + ']';
                };
                config.options = { validType: validtype };
                return config;
            }
        };
        if ($("#fdFieldGrid").length <= 0) {
            $("#EastMainGrid").append("<fieldset id='fdFieldGrid' class='datebox-button' style='padding: 8px; margin: 10px; height: auto; text-align: left;'><legend class='panel-title'>模板内容：</legend><table id='FieldGrid'></table></fieldset>");
        }
        $("#FieldGrid", ajaxContainerSelector).className = "tablecss";
        var html = $("<tr></tr>");
        for (var i = 0; i < fielddata.length; i++) {
            var config = configFactory._getConfig(fielddata[i]);
            var tdleft = $('<td class="table_td_left" ' + config.tdleftstyle + ' ></td>').append(String(fielddata[i].Name) + config.required);
            var control = $('<' + config.lab + ' type="text" ' + config.longerstyle + ' />').attr("id", "txt" + String(fielddata[i].Key)).attr("name", String(fielddata[i].Key));
            var tdright = $('<td ' + config.tdrightstyle + ' class="table_td_right"></td>').append(control);
            if (String.isNullOrWhiteSpace(html.html())) {
                html.append(tdleft).append(tdright);
                $("#FieldGrid").append(html);
            }
            else {
                html.append(tdleft).append(tdright);
                $("#FieldGrid").append(html);
                html = $("<tr></tr>");
            }
            control[config.controltype](config.options);
            $("#txt" + String(fielddata[i].Key), ajaxContainerSelector).val(fielddata[i].Content);
        }
    }

    var LoadMultyTable = function (TemplateKey) {
        $('#tool', ajaxContainerSelector).panel('close');
        if ($("#FieldGrid").length <= 0) {
            $("#EastMainGrid").append("<table id='FieldGrid'></table>");
        }
        var editIndex = undefined;
        var isEditor = false;
        var SaveRecord = function (rowIndex, rowData) {
            if (rowData.Key != undefined) {
                var fielddata = $.plugin.getJsonDataRequestWebService("Services/Project/SubRectificationService.asmx/GetAllRectField", { TemplateKey: TemplateKey });
                for (var i = 0; i < fielddata.length; i++) {
                    var fieldkey = $.plugin.getJsonDataRequestWebService("Services/Project/SubRectificationService.asmx/GetRectRecordKey", { SubProjKey: key, MainKey: fielddata[i].Key, RowIndex: rowIndex });
                    $.extend(fielddata[i], { Content: rowData[i + 1] });
                    if (fieldkey == "0") {
                        $.extend(fielddata[i], { SubProjKey: key });
                        $.extend(fielddata[i], { MainKey: fielddata[i].Key });
                        $.extend(fielddata[i], { RowIndex: rowIndex });
                        window.project.subrectification.addSubProjectRectContent(fielddata[i], function () { });
                    }
                    else {
                        $.extend(fielddata[i], { RecordKey: fieldkey });
                        window.project.subrectification.updateSubProjectRectContent(fielddata[i], function () { });
                    }
                }
            }
        }
        var onClickRow = function (rowIndex, rowData) {
            if (editIndex == rowIndex && isEditor == true) {
                dg.datagrid("endEdit", rowIndex);
                isEditor = false;
            } else {
                if (isEditor == true) {
                    dg.datagrid("endEdit", editIndex);
                }
                dg.datagrid("beginEdit", rowIndex);
                isEditor = true;
            }
            editIndex = rowIndex;
        };
        window.project.SubProjectRectification_aspx.DelRow = function (rowIndex, rowkey) {
            if (rowkey == "undefined") {
                $('#FieldGrid', ajaxContainerSelector).datagrid('deleteRow', rowIndex);
            }
            else {
                $.plugin.messager.confirm("提示", "点击确定将删除 <strong>第" + (parseInt(rowIndex) + 1) + "行</strong><br />是否执行此操作？", function (fn) {
                    if (fn) {
                        window.project.subrectification.delSubProjectRectContent(key, rowIndex, function () { $("#FieldGrid", ajaxContainerSelector).datagrid('reload'); });
                    }
                });
            }
        }
        var _columns = [];
        //                _columns.push({ field: 'ck', checkbox: true });
        var templatedata = $.plugin.getJsonDataRequestWebService("Services/Project/SubRectificationService.asmx/GetAllRectField", { TemplateKey: TemplateKey });
        for (var i = 0; i < templatedata.length; i++) {
            var dic = window.platform.getDataDictionarySingleRecord({ MainKey: 33, Key: templatedata[i].dataType });
            var type = 'text';
            if (dic.Value1 == "datebox") {
                type = 'datebox';
            }
            _columns.push({ field: String(templatedata[i].Key), title: String(templatedata[i].Name), width: 150, editor: type, formatter: function (value, rowData, rowIndex) { return "<span title='" + value + "'>" + value + "</span>" } });
        }
        _columns.push({ field: 'opt', title: '操作', width: 60, align: 'center',
            formatter: function (value, rowData, rowIndex) {
                var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.project.SubProjectRectification_aspx.DelRow(\'' + rowIndex + '\',\'' + rowData.Key + '\');');
                var div = $("<div></div>").append(delspan);
                return div.html();
            }
        });
        var Field_options = {
            title: '整改方案字段设置',
            fit: true,
            fitColumns: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            border: false,
            rownumbers: true,
            nowrap: true,
            url: window.resolveUrl('Services/Project/SubRectificationService.asmx/GetSubProjectRecordMultyTableByTemplateKey'),
            queryParams: {
                TemplateKey: TemplateKey
            },
            searchButton: $("#btnSearch", ajaxContainerSelector),
            idField: 'Key',
            sortName: 'Sort',
            sortOrder: 'asc',
            onClickRow: onClickRow,
            columns: [_columns],
            pagination: true,
            toolbar: [
                {
                    text: '添加',
                    iconCls: 'icon-add',
                    handler: function () {
                        if (editIndex > -1) {
                            $('#FieldGrid', ajaxContainerSelector).datagrid('endEdit', editIndex);
                        }
                        $('#FieldGrid', ajaxContainerSelector).datagrid('appendRow', {});
                        var rowIndex = $('#FieldGrid', ajaxContainerSelector).datagrid('getRows').length - 1;
                        editIndex = rowIndex;
                        $('#FieldGrid', ajaxContainerSelector).datagrid('selectRow', rowIndex).datagrid('beginEdit', rowIndex);
                    }
                }, '-',
                {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#FieldGrid", ajaxContainerSelector).datagrid('reload');
                    }
                }],
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

        };
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var dg = $("#FieldGrid", ajaxContainerSelector);
        $("#" + btnId, dg).click(function () {
            var name = $("#" + txtId, dg).val();
            dg.datagrid("load", { name: name });
        });
        $("#FieldGrid", ajaxContainerSelector).datagrid(Field_options);

    }

    _bindControl();
    _bindButtonEvent();

}
})(jQuery);