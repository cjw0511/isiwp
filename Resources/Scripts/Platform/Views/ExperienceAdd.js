/*
==============================================================================
//  添加经历页面 ExperienceAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.ExperienceAdd_aspx) { window.platform.ExperienceAdd_aspx = new Object(); }
    window.platform.ExperienceAdd_aspx.initPage = function (ajaxContainerSelector) {
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
            validType: ['unnormal', 'insertValidate["工作经历名称","Services/Platform/ExperienceService.asmx/AjaxValidate","Name"]']
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
        $("#selExperienceType", ajaxContainerSelector).combobox("setValue", 0);
    };
})(jQuery);