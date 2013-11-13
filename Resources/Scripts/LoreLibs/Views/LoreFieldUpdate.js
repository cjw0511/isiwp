/*
==============================================================================
//  知识库字段编辑页面 LoreFieldUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreFieldUpdate_aspx) { window.lorelibs.LoreFieldUpdate_aspx = new Object(); }
    window.lorelibs.LoreFieldUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            //            validType: 'name'
            validType: ['name', 'updateValidate["知识库字段名称","Services/LoreLibs/LoreFieldService.asmx/AjaxValidateField","Name",' + key + ']']
        });
        $("#txtCode", ajaxContainerSelector).validatebox({
            required: true,
//            validType: 'code
            validType: ['code', 'updateValidate["知识库字段名称","Services/LoreLibs/LoreFieldService.asmx/AjaxValidateField","Code",' + key + ']']
        });
        $("#selDataType", ajaxContainerSelector).combotree({
            required: true,
            editable: false,
            animate: true,
            lines: true,
            panelHeight: 300,
            panelWidth: 250,
            onBeforeSelect: function (node) {
                var par = $("#selDataType", ajaxContainerSelector).combotree("tree").tree("getParent", node.target);
                if (String(node.id).contains("m")) { return false; }
                else if (String(par.text) === "日期和时间") {
                    $("#txtMaxLength", ajaxContainerSelector).attr("disabled", "disabled");
                    $("#selValidType", ajaxContainerSelector).combobox("enable")
                }
                else if (String(par.text) === "自定义类型") {
                    $("#txtMaxLength", ajaxContainerSelector).attr("disabled", "disabled");
                    $("#selValidType", ajaxContainerSelector).combobox("disable")
                }
                else {
                    $("#txtMaxLength", ajaxContainerSelector).removeAttr("disabled");
                    $("#selValidType", ajaxContainerSelector).combobox("enable")
                }
            }
        });

        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.lorelibs.lorefield.getLoreFieldByKey(key, function (lorefield) {
            window.lorelibs.lorefield.getFieldDataType(function (data) {
                $("#selDataType", ajaxContainerSelector).combotree("loadData", data);
                $("#selDataType", ajaxContainerSelector).combotree("setValue", lorefield.DataType);
            });
            $(ajaxContainerSelector).form('loadData', lorefield);
            $("#selValidType", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 34 },
                multiple: true,
                panelHeight: 180,
                editable: true,
                onLoadSuccess: function () {
                    $(this).combobox("setText", lorefield.ValidType);
                }
            });
        });
    };
})(jQuery);