/*
==============================================================================
//  编辑经历页面 ExperienceUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.ExperienceUpdate_aspx) { window.platform.ExperienceUpdate_aspx = new Object(); }
    window.platform.ExperienceUpdate_aspx.initPage = function (ajaxContainerSelector, id) {
        ///定义验证规则
        $("#txtBeginDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtEndDate", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
//            validType: 'unnormal'
            validType: ['unnormal', 'updateValidate["工作经历名称","Services/Platform/ExperienceService.asmx/AjaxValidate","Name",' + id + ']']
        });
        $("#txtLocation", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#selExperienceType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 18 },
            panelHeight: 100
        });
        window.platform.employee.getExperienceById(id, function (experience) {
            $(ajaxContainerSelector).form('loadData', experience);
        });
    };
})(jQuery);