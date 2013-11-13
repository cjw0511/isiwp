/*
==============================================================================
//  整改方案模板添加页面 SubRectificationTemplateUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubRectificationTemplateUpdate_aspx) { window.project.SubRectificationTemplateUpdate_aspx = new Object(); }
    window.project.SubRectificationTemplateUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则
        $("#txtTitle2", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['title', 'updateValidate["整改方案标题","Services/Project/SubRectificationService.asmx/ajaxAddValid","Title",' + key + ']']
        });
        $("#txtSort2", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'number'
//            validType: ['number', 'updateValidate["整改方案排序号","Services/Project/SubRectificationService.asmx/ajaxAddValid","Sort",' + key + ']']
        });
        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.project.subrectification.getSubProjectRectTemplateByKey(key, function (main) {
            $(ajaxContainerSelector).form('loadData', main);
        });
    };
})(jQuery);