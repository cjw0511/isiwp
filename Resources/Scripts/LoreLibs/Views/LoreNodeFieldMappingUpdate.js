/*
==============================================================================
//  知识库节点字段映射编辑页面 LoreNodeFieldMappingUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreNodeFieldMappingUpdate_aspx) { window.lorelibs.LoreNodeFieldMappingUpdate_aspx = new Object(); }
    window.lorelibs.LoreNodeFieldMappingUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        window.lorelibs.lorefield.getLoreNodeFieldMappingByKey(key, function (lorenodefield) {
            var _bindControl = function () {
                if (lorenodefield.FieldType == 0) {
                    $("tr", ajaxContainerSelector).slice(1, 6).show();
                    $("tr", ajaxContainerSelector).slice(6, 9).hide();
                }
                else {
                    $("#fieldtype2", ajaxContainerSelector).attr("checked", 'checked');
                    $("tr", ajaxContainerSelector).slice(1, 6).hide();
                    $("tr", ajaxContainerSelector).slice(6, 9).show();
                }
                $("#txtMappingName", ajaxContainerSelector).validatebox({
                    required:true
                    //                    validType: 'name'
          //          validType: ['name', 'updateValidate["别名","Services/LoreLibs/LoreFieldService.asmx/AjaxValidateMapping","MappingName",' + key + ']']
                });
                $("#selMappingField", ajaxContainerSelector).combobox({
                    valueField: 'Key',
                    textField: "Name",
                    url: window.resolveUrl("Services/LoreLibs/LoreFieldService.asmx/GetAllLoreField"),
                    panelHeight: 200,
                    onSelect: function (node) {
                        var _callback = function (loretype) {
                            $("#spnName", ajaxContainerSelector).text(loretype.Name);
                            $("#spnCode", ajaxContainerSelector).text(loretype.Code);
                            var dic = window.platform.getDataDictionarySingleRecord({ MainKey: 33, Key: loretype.DataType });
                            $("#spnDataType", ajaxContainerSelector).text(dic.Name);
                            $("#spnIsNullable", ajaxContainerSelector).text(loretype.IsNullable == true ? "是" : "否");
                            $("#spnValidType", ajaxContainerSelector).text(loretype.ValidType);
                            $("#spnDescription", ajaxContainerSelector).text(loretype.Description);
                        }
                        window.lorelibs.lorefield.getLoreFieldByKey(node.Key, _callback);
                    },
                    onLoadSuccess: function () {
                        if (lorenodefield.FieldType == 0) {
                            $("#selMappingField", ajaxContainerSelector).combobox("select", lorenodefield.MappingFieldKey);
                            $("#txtMappingName", ajaxContainerSelector).val(lorenodefield.MappingName);
                        }
                    }
                });
                var conhide = true;
                $("#selMappingNode", ajaxContainerSelector).combotree({
                    animate: true,
                    editable: false,
                    panelHeight: 'auto',
                    panelWidth: 300,
                    onBeforeSelect: function (node) {
                        if (!String(node.id).contains("_")) {
                            $("#selMappingNode", ajaxContainerSelector).combotree("tree").tree("toggle", node.target);
                            conhide = false;
                            return false;
                        }
                        else { conhide = true; }
                    },
                    onHidePanel: function () {
                        if (!conhide) { $("#selMappingNode", ajaxContainerSelector).combotree("showPanel"); }
                    }
                });
                if (lorenodefield.FieldType == 1) {
                    $("#txtMappingName", ajaxContainerSelector).val(lorenodefield.MappingName);
                    $("#selShowType", ajaxContainerSelector).combobox("setValue", lorenodefield.ShowType == true ? "1" : "0");
                    $("#IsMultiple", ajaxContainerSelector).combobox("setValue", lorenodefield.IsMultiple == true ? "1" : "0");
                    $("#IsNullable", ajaxContainerSelector).combobox("setValue", lorenodefield.IsNullable == true ? "1" : "0");
                    $("#selCols", ajaxContainerSelector).combobox("setValue", lorenodefield.Cols);
                }
                _loadData();
            };
            var _bindButtonEvent = function () {
                $("input[name='FieldType']", ajaxContainerSelector).click(function () {
                    var va = $("input[name='FieldType']:checked", ajaxContainerSelector).val();
                    if (va == "0") {
                        $("tr", ajaxContainerSelector).slice(1, 6).show();
                        $("tr", ajaxContainerSelector).slice(6, 9).hide();
                    }
                    else if (va == "1") {
                        $("tr", ajaxContainerSelector).slice(1, 6).hide();
                        $("tr", ajaxContainerSelector).slice(6, 9).show();
                    }
                })
            };
            var _loadData = function () {
                window.lorelibs.loretype.getAllLoreType(function (data) {
                    $("#selMappingNode", ajaxContainerSelector).combotree("tree").tree("loadData", data);
                    window.lorelibs.loretype.getAllLoreNode(function (childrens) {
                        var select = null;
                        for (var i = 0; i < childrens.length; i++) {
                            if (lorenodefield.FieldType == 1 && childrens[i].id == lorenodefield.MappingNodeKey) {
                                select = new String(childrens[i].base.TypeKey + "_" + childrens[i].id);
                            }
                            childrens[i].id = new String(childrens[i].base.TypeKey + "_" + childrens[i].id);
                            childrens[i].iconCls = "icon-gears";
                            var node = $("#selMappingNode", ajaxContainerSelector).combotree("tree").tree('find', childrens[i].base.TypeKey);
                            var param = {
                                parent: node.target,
                                data: [childrens[i]]
                            };
                            $("#selMappingNode", ajaxContainerSelector).combotree("tree").tree("append", param);
                        }
                        $("#selMappingNode", ajaxContainerSelector).combotree("tree").tree('collapseAll');
                        var rootnode = $("#selMappingNode", ajaxContainerSelector).combotree("tree").tree('find', 0);
                        $("#selMappingNode", ajaxContainerSelector).combotree("tree").tree('expand', rootnode.target);
                        if (select) {
                            $("#selMappingNode", ajaxContainerSelector).combotree("setValue", select);
                        }
                    });
                });
            }
            _bindControl();
            _bindButtonEvent();
        });
    };
})(jQuery);