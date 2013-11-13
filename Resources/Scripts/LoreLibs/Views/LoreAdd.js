/*
==============================================================================
//  知识添加页面 LoreAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreAdd_aspx) { window.lorelibs.LoreAdd_aspx = new Object(); }
    window.lorelibs.LoreAdd_aspx.initPage = function (ajaxContainerSelector, nodekey) {

        window.lorelibs.lorefield.getLoreNodeFieldMappingByNodeKey(nodekey, function (data) {
            if (data.length == 0) {
                $.plugin.messager.alert("操作提醒", "请先在知识库类别管理-修改类别-字段信息中添加字段！", "warning", function () {
                    $(window.lorelibs.LoreList_aspx.dialog).panel("destroy");
                });
                return;
            }
            window.lorelibs.lorefield.getAllLoreField(function (fielddata) {
                var extraHeight = 0;
                var configFactory = {
                    defaultconfig: {
                        longerstyle: '',
                        colspan: '',
                        lab: "input",
                        required: '：',
                        tdleftstyle: '',
                        tdrightstyle: '',
                        controltype: '',
                        options: null,
                        field: null
                    },
                    _dataFormatter: function (value) {
                        for (var i = 0; i < fielddata.length; i++) {
                            if (fielddata[i].Key == value.MappingFieldKey) return fielddata[i];
                        }
                        return value;
                    },
                    _getConfig: function (data) {
                        var config = null;
                        if (data.FieldType == 0) {
                            config = this._inputConfig(data);
                        }
                        else {
                            if (data.ShowType == 0) {
                                config = this._comboboxConfig(data);
                            }
                            else {
                                config = this._combogridConfig(data);
                            }
                        }
                        return config;
                    },
                    _inputConfig: function (data) {
                        var config = $.extend([], this.defaultconfig);
                        var field = this._dataFormatter(data);
                        config.field = field;
                        if (field.Cols == 2) {
                            $.extend(config, { longerstyle: ' style="width:620px;" ', tdrightstyle: ' colspan="3" ' });
                        }
                        if (field.Rows > 1) {
                            $.extend(config, { lab: 'textarea rows="' + field.Rows + '" ', tdleftstyle: ' style="vertical-align:baseline;padding-top:7px;" ', tdrightstyle: config.tdrightstyle + ' colspan="3" ' });
                            if (field.Cols == 1) {
                                $.extend(config, { longerstyle: ' style="width:200px;" ' });
                            }
                        }
                        if (!field.IsNullable) {
                            $.extend(config, { required: '<span class="required">*</span>：' });
                        }
                        var dic = window.platform.getDataDictionarySingleRecord({ MainKey: 33, Key: field.DataType });
                        $.extend(config, { controltype: String(dic.Value1) });
                        if (String.isNullOrWhiteSpace(config.controltype)) { config.controltype = "validatebox"; };
                        var validtype = [];
                        if (!String.isNullOrWhiteSpace(String(field.ValidType))) {
                            validtype = $(String(field.ValidType).split(",")).toArray();
                        }
                        if (field.MaxLength != 0 && config.controltype === "validatebox") {
                            validtype.push('maxLength[' + field.MaxLength + ']');
                        };
                        config.options = { required: !field.IsNullable, validType: validtype };
                        if (config.controltype === "ckeditor") {
                            $.extend(config.options, { height: 28 + field.Rows * 34 });
                            extraHeight += 28 + field.Rows * 34 + 35;
                            if (field.Cols == 1) {
                                field.Cols = 2;
                                $.extend(config, { longerstyle: ' style="width:620px;" ', tdrightstyle: ' colspan="3" ' });
                            }
                        }
                        if (config.controltype === "combobox") {
                            config.options = { required: !field.IsNullable, valueField: 'Key', textField: "Name", url: window.resolveUrl(String(dic.Value2)), queryParams: $.parseJSON(String(dic.Value3)) };
                        }
                        return config;
                    },
                    _comboboxConfig: function (data) {
                        var config = $.extend([], this.defaultconfig);
                        var field = data;
                        config.field = field;
                        if (field.Cols == 2) {
                            $.extend(config, { longerstyle: ' style="width:624px;" ', tdrightstyle: ' colspan="3" ' });
                        }
                        if (!field.IsNullable) {
                            $.extend(config, { required: '<span class="required">*</span>：' });
                        }
                        $.extend(config, { controltype: "combobox" });
                        config.options = { required: !field.IsNullable, valueField: 'Key', textField: "Name", multiple: field.IsMultiple, url: window.resolveUrl("Services/LoreLibs/LoreService.asmx/GetLoreByNodeKey"), queryParams: { "NodeKey": field.MappingNodeKey} };
                        return config;
                    },
                    _combogridConfig: function (data) {
                        var config = $.extend([], this.defaultconfig);
                        var field = data;
                        config.field = field;
                        if (field.Cols == 2) {
                            $.extend(config, { longerstyle: ' style="width:624px;" ', tdrightstyle: ' colspan="3" ' });
                        }
                        if (!field.IsNullable) {
                            $.extend(config, { required: '<span class="required">*</span>：' });
                        }
                        $.extend(config, { controltype: "combogrid" });
                        config.options = { required: !field.IsNullable, valueField: 'Key', textField: "Name", url: window.resolveUrl("Services/LoreLibs/LoreService.asmx/GetLoreByNodeKey"), queryParams: { "NodeKey": field.MappingNodeKey} };
                        var mappingdata = $.plugin.getJsonDataRequestWebService("Services/LoreLibs/LoreFieldService.asmx/GetLoreNodeFieldMappingByNodeKey", { NodeKey: field.MappingNodeKey });
                        var _columns = [];
                        for (var i = 0; i < mappingdata.length && i < 3; i++) {
                            _columns.push({ field: String(mappingdata[i].Key), title: String(mappingdata[i].MappingName), width: 150, formatter: function (value, rowData, rowIndex) { return "<span title='" + value + "'>" + value + "</span>" } });
                        }
                        config.options = {
                            fitColumns: true,
                            multiple: field.IsMultiple,
                            rownumbers: true,
                            panelWidth: 430,
                            panelHeight: 310,
                            nowrap: true,
                            sortName: 'Sort',
                            sortOrder: 'asc',
                            idField: 'Key',
                            textField: _columns[0].field,
                            url: window.resolveUrl('Services/LoreLibs/LoreService.asmx/GetPagingData'),
                            queryParams: {
                                NodeKey: field.MappingNodeKey
                            },
                            columns: [_columns],
                            pagination: true
                        };
                        return config;

                    }
                };

                var html = $("<tr></tr>");
                for (var i = 0; i < data.length; i++) {
                    var config = configFactory._getConfig(data[i]);
                    var tdleft = $('<td class="table_td_left" ' + config.tdleftstyle + ' ></td>').append(String(data[i].MappingName) + config.required);
                    var control = $('<' + config.lab + ' type="text" ' + config.longerstyle + ' />').attr("id", "txt" + String(data[i].Key)).attr("name", String(data[i].Key));
                    var tdright = $('<td ' + config.tdrightstyle + ' class="table_td_right"></td>').append(control);
                    if (String.isNullOrWhiteSpace(html.html())) {
                        html.append(tdleft).append(tdright);
                        $("#fieldtable").append(html);
                        if (config.field.Cols == 2) {
                            html = $("<tr></tr>");
                        }
                    }
                    else {
                        if (config.field.Cols == 2) {
                            html = $("<tr></tr>");
                        }
                        html.append(tdleft).append(tdright);
                        $("#fieldtable").append(html);
                        html = $("<tr></tr>");
                    }
                    control[config.controltype](config.options);
                }
                var dialogheight = $("#fieldtable").height() + 120 + extraHeight;
                $(window.lorelibs.LoreList_aspx.dialog).panel("resize", { height: dialogheight });

            });
        });

    };
})(jQuery);