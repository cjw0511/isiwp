/*
==============================================================================
//  知识库类别编辑页面 LoreTypeUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.LoreTypeUpdate_aspx) { window.lorelibs.LoreTypeUpdate_aspx = new Object(); }

    window.lorelibs.LoreTypeUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        window.lorelibs.LoreTypeUpdate_aspx.isFrozen = false;
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["名称","Services/LoreLibs/LoreTypeService.asmx/AjaxValidateType","Name",' + key + ']']
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["编号","Services/LoreLibs/LoreTypeService.asmx/AjaxValidateType","Code",' + key + ']']
            });
//            $("#txtDescription", ajaxContainerSelector).validatebox({
//                validType: 'unnormal'
//            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            window.lorelibs.loretype.getAllLoreType(function (data) {
                $("#txtParentKey", ajaxContainerSelector).combotree("loadData", data);
            });
            window.lorelibs.loretype.getLoreTypeByKey(key, function (loretype) {
                $(ajaxContainerSelector).form('loadData', loretype);
                window.lorelibs.LoreTypeUpdate_aspx.isFrozen = loretype.IsFrozen;
            });
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                if (window.lorelibs.LoreTypeUpdate_aspx.isFrozen) {
                    $.plugin.showMessage("该类别被冻结，不允许编辑!");
                }
                var loretype = $(ajaxContainerSelector).form('getData');
                $.extend(loretype, { Key: key });
                $.extend(loretype, { Description: "" });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("编辑类别成功。");
                        window.lorelibs.LoreTypeManage_aspx.refreshAfterAdd();
                        window.lorelibs.loretype.getAllLoreType(function (data) {
                            $("#txtParentKey", ajaxContainerSelector).combotree("loadData", data);
                        });
                    } else {
                        $.plugin.showMessage("编辑类别失败。");
                    }
                };
                window.lorelibs.loretype.updateLoreType(loretype, _callback);
            });

            $("#btnDelete", ajaxContainerSelector).click(function () {
                if (window.lorelibs.LoreTypeUpdate_aspx.isFrozen) {
                    $.plugin.showMessage("该类别被冻结，不允许删除!");
                }
                var node = $("#Tree", window.lorelibs.LoreTypeManage_aspx.ajaxContainerSelector).tree('find', key);
                if (!$("#Tree", window.lorelibs.LoreTypeManage_aspx.ajaxContainerSelector).tree('isLeaf', node.target)) {
                    $.plugin.messager.alert("提示", node.text + " 有子节点，请先删除!", "warning");
                    return;
                }
                $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除类别成功。");
                                window.lorelibs.LoreTypeManage_aspx.refreshAfterDelete();
                            } else {
                                $.plugin.showMessage("删除类别失败。");
                            }
                        };
                        window.lorelibs.loretype.deleteLoreType(key, _callback);
                    }
                });
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);