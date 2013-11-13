/*
==============================================================================
//  知识库节点字段映射添加页面 LoreNodeFieldMappingAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreNodeFieldMappingAdd_aspx) { window.lorelibs.LoreNodeFieldMappingAdd_aspx = new Object(); }
    window.lorelibs.LoreNodeFieldMappingAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        var _bindControl = function () {
            $("#txtMappingName", ajaxContainerSelector).validatebox({
                required:true
//                validType: 'name'
//                validType: ['name', 'insertValidate["别名","Services/LoreLibs/LoreFieldService.asmx/AjaxValidateMapping","MappingName"]']
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
                    for (var i = 0; i < childrens.length; i++) {
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
                });
            });
        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);