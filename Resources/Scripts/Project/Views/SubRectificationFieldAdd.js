/*
==============================================================================
//  整改方案模板添加页面 SubRectificationFieldAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubRectificationFieldAdd_aspx) { window.project.SubRectificationFieldAdd_aspx = new Object(); }
    window.project.SubRectificationFieldAdd_aspx.initPage = function (ajaxContainerSelector, MasterKey) {
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
        $("#txtName5", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'insertValidate["字段名称","Services/Project/SubRectificationService.asmx/ajaxAddValid2","Name"]']
        });
        $("#txtSort5", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'number'
//            validType: ['number', 'insertValidate["字段排序号","Services/Project/SubRectificationService.asmx/ajaxAddValid2","Sort"]']
        });
        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

    };
})(jQuery);