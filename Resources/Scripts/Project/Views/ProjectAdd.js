/*
==============================================================================
//  项目启动添加页面 ProjectAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.ProjectAdd_aspx) { window.project.ProjectAdd_aspx = new Object(); }
    window.project.ProjectAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            /******表单验证 start******/
            $("#txtName2", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'insertValidate["项目名称","Services/Project/ProjectService.asmx/ajaxAddValid","Name"]']
            });

            $("#txtCode2", ajaxContainerSelector).validatebox({
                required: true,
                validType: [ 'insertValidate["编号","Services/Project/ProjectService.asmx/ajaxAddValid","Code"]']
            });

            $("#txtPlanProject10", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#PlanProject10").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#PlanProject10").val(selections[0].Key);
                            $("#txtPlanProject10").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.project.showPlanProjectSelector(onEnterClick, selected);
                }
            });
            $("#txtPlanProject10", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtPlanProject10", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtPlanProject10", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

            $("#txtManager2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#Manager2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#Manager2").val(selections[0].Key);
                            $("#txtManager2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.project.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtManager2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtManager2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtManager2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

            $("#txtBusiMgr2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#BusiMgr2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#BusiMgr2").val(selections[0].Key);
                            $("#txtBusiMgr2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.project.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtBusiMgr2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtBusiMgr2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtBusiMgr2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

            $("#selIsApproval2", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 57 }
            });
            $("#selIsApproval2", ajaxContainerSelector).combobox("setValue", 0);

            $("#selProgress2", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 56 }
            });
            $("#selProgress2", ajaxContainerSelector).combobox("setValue", 0);

            $("#txtStartDate2", ajaxContainerSelector).datebox({
                required: true,
                validType: 'shortDate'
            });

            $("#txtStopDate2", ajaxContainerSelector).datebox({
                required: true,
                validType: 'shortDate'
            });

            $("#txtDescription2", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            /******表单验证 stop******/

        };
        var _bindButtonEvent = function () {

            $("#b2_clear", ajaxContainerSelector).click(function () {
                $("#PlanProject10", ajaxContainerSelector).val('0');
                $("#txtPlanProject10", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#c2_clear", ajaxContainerSelector).click(function () {
                $("#Manager2", ajaxContainerSelector).val('0');
                $("#txtManager2", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#e2_clear", ajaxContainerSelector).click(function () {
                $("#BusiMgr2", ajaxContainerSelector).val('0');
                $("#txtBusiMgr2", ajaxContainerSelector).searchbox("setValue", "");
            });
        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);