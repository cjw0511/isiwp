/*
==============================================================================
//  知识库类别页面 LoreTypeAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreTypeAdd_aspx) { window.lorelibs.LoreTypeAdd_aspx = new Object(); }

    window.lorelibs.LoreTypeAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["名称","Services/LoreLibs/LoreTypeService.asmx/AjaxValidateType","Name"]']
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'insertValidate["编号","Services/LoreLibs/LoreTypeService.asmx/AjaxValidateType","Code"]']
            });
//            $("#txtDescription", ajaxContainerSelector).validatebox({
//                validType: 'unnormal'
//            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            window.lorelibs.loretype.getAllLoreType(function (data) {
                $("#txtParentKey", ajaxContainerSelector).combotree("loadData", data);
                $("#txtParentKey", ajaxContainerSelector).combotree("setValue", 0);
            });
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var loretype = $(ajaxContainerSelector).form('getData');
                $.extend(loretype, { Description: "" });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("添加类别成功。");
                        window.lorelibs.LoreTypeManage_aspx.refreshAfterAdd();
                        window.lorelibs.loretype.getAllLoreType(function (data) {
                            $("#txtParentKey", ajaxContainerSelector).combotree("loadData", data);
                        });
                        $(ajaxContainerSelector).form("clear");
                    } else {
                        $.plugin.showMessage("添加类别失败。");
                    }
                };
                if (loretype.Type == 1) {
                    window.lorelibs.loretype.addLoreType(loretype, _callback);
                }
                else {
                    window.lorelibs.loretype.addLoreNode(loretype, _callback);
                }
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);