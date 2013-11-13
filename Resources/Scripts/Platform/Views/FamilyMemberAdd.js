/*
==============================================================================
//  添加家庭成员页面 FamilyMemberAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.FamilyMemberAdd_aspx) { window.platform.FamilyMemberAdd_aspx = new Object(); }
    window.platform.FamilyMemberAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则
        $("#txtName", ajaxContainerSelector).validatebox({
            required: true,
//            validType: 'name'
            validType: ['name', 'insertValidate["家庭成员姓名","Services/Platform/FamilyMemberService.asmx/AjaxValidate","Name"]']
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
        $("#selFamilyMemberType", ajaxContainerSelector).combobox("setValue", 0);
        $("#selSex", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 4 }
        });
        $("#selSex", ajaxContainerSelector).combobox("setValue", 0);
    };
})(jQuery);