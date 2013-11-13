/*
==============================================================================
//  主页中个人基本信息页面 WorkSpacePersonalInfo.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.WorkSpacePersonalInfo_aspx) { window.platform.WorkSpacePersonalInfo_aspx = new Object(); }

    window.platform.WorkSpacePersonalInfo_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {

            window.platform.getCurrentUserKey(function (userkey) {
                window.platform.employee.getEmployeeByUserKey(userkey, function (employee) {
                    if (!employee) {
                        $.plugin.messager.alert("操作提醒", "该用户未被关联，无法获取个人信息。", "info");
                        return;
                    }
                    $(ajaxContainerSelector).form('loadData', employee);
                    var dic = window.platform.getDataDictionarySingleRecord({ MainKey: 4, Key: employee.SexKey });
                    $("#selSex", ajaxContainerSelector).text(dic.Name);

                    $("#txtBirtyday", ajaxContainerSelector).text(employee.Birtyday.toDate().format());
                })
            });
        };

        var _bindButtonEvent = function () {
            $("#btnProcess", ajaxContainerSelector).click(function () {
                window.addTab({ title: "个人基本信息", href: "Views/Platform/PersonalBaseInfo.aspx", iconCls: '', closable: true, selected: true });
            });
        };
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);