/*
==============================================================================
//  整改方案添加页面 SubRectificationTemplateAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubRectificationTemplateAdd_aspx) { window.project.SubRectificationTemplateAdd_aspx = new Object(); }
    window.project.SubRectificationTemplateAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtTitle1", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['title', 'insertValidate["整改方案标题","Services/Project/SubRectificationService.asmx/ajaxAddValid","Title"]']
        });
        $("#txtSort1", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'number'
//            validType: ['number', 'insertValidate["整改方案排序号","Services/Project/SubRectificationService.asmx/ajaxAddValid","Sort"]']
        });
        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

    };
})(jQuery);