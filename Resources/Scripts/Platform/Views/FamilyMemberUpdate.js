/*
==============================================================================
//  编辑家庭成员页面 FamilyMemberUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.FamilyMemberUpdate_aspx) { window.platform.FamilyMemberUpdate_aspx = new Object(); }
    window.platform.FamilyMemberUpdate_aspx.initPage = function (ajaxContainerSelector, id) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
            //            validType: 'name'
            validType: ['name', 'updateValidate["家庭成员名称","Services/Platform/FamilyMemberService.asmx/AjaxValidate","Name",' + id + ']']
        });
        $("#txtContact", ajaxContainerSelector).validatebox({
            validType: 'telOrMobile'
        });
        $("#txtWorkUnit", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#txtSummary", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        $("#selFamilyMemberType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 17 },
            panelHeight: 100
        });
        $("#selSex", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 4 }
        });
        window.platform.employee.getFamilyMemberById(id, function (familyMember) {
            $(ajaxContainerSelector).form('loadData', familyMember);
        })
    };
})(jQuery);