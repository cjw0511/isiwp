/*
==============================================================================
//  整改方案模板添加页面 SubRectificationFieldUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubRectificationFieldUpdate_aspx) { window.project.SubRectificationFieldUpdate_aspx = new Object(); }
    window.project.SubRectificationFieldUpdate_aspx.initPage = function (ajaxContainerSelector, key, MasterKey) {
        ///定义验证规则
//        $("#txtTemplateKey", ajaxContainerSelector).searchbox({
//            required: true,
//            searcher: function (value) {
//                var selected = $("#TemplateKey", ajaxContainerSelector).val();
//                var onEnterClick = function (datagrid, selections) {
//                    if (selections.length > 0) {
//                        $("#TemplateKey", ajaxContainerSelector).val(selections[0].Key);
//                        $("#txtTemplateKey", ajaxContainerSelector).searchbox("setValue", selections[0].Title);
//                    } else {
//                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                        return false;
//                    }
//                };
//                window.project.showRectiMainSelector(onEnterClick, selected, MasterKey);
//            }
//        });
//        $("#txtTemplateKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
//        $("#txtTemplateKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtName6", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'updateValidate["字段名称","Services/Project/SubRectificationService.asmx/ajaxAddValid2","Name",' + key + ']']
        });
        $("#txtSort6", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'number'
//            validType: ['number', 'updateValidate["字段排序号","Services/Project/SubRectificationService.asmx/ajaxAddValid2","Sort",' + key + ']']
        });
        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.project.subrectification.getSubProjectRectFieldByKey(key, function (field) {
            $(ajaxContainerSelector).form('loadData', field);
            $("#TemplateKey", ajaxContainerSelector).val(field.TemplateKey);
            if (field.TemplateKey != '0' && field.TemplateKey != undefined) {
                window.project.subrectification.getSubProjectRectMainByKey(field.TemplateKey, function (field) {
                    if (project)
                        $("#txtTemplateKey", ajaxContainerSelector).searchbox("setValue", field.Title);
                });
            }
        });
    };
})(jQuery);