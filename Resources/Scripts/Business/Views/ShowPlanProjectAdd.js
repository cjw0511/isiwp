/*
==============================================================================
//  在PlanProjectAdd.aspx页面显示计划项目添加页面 PlanProjectAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ShowPlanProjectAdd_aspx) { window.business.ShowPlanProjectAdd_aspx = new Object(); }
    window.business.ShowPlanProjectAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName2", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'FullName'
            });


            $("#txtCode2", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'ajaxAddValid["编号","Services/Business/PlanProjectService.asmx/ajaxAddValid","Code"]']
            });

            $("#txtShortName2", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });


            $("#txtManager2", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });


            $("#selProjectType2", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 36 }
            });
            $("#selProjectType2", ajaxContainerSelector).combobox("setValue", 0);

            $("#txtSummary2", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });




            $("#txtCustomer2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#CustomerKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#CustomerKey2").val(selections[0].Key);
                            $("#txtCustomer2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.business.showCustomerSelector(onEnterClick, selected);
                }
            });
            $("#txtCustomer2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtCustomer2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtCustomer2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });




            $("#txtEmployee2", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#EmployeeKey2").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#EmployeeKey2").val(selections[0].Key);
                            $("#txtEmployee2").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtEmployee2", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtEmployee2", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            $("#txtEmployee2", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

        };
        var _bindButtonEvent = function () {

            $("#a_clear").click(function () {
                $("#CustomerKey2", ajaxContainerSelector).val('0');
                $("#txtCustomer2", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#b_clear").click(function () {
                $("#EmployeeKey2", ajaxContainerSelector).val('0');
                $("#txtEmployee2", ajaxContainerSelector).searchbox("setValue", "");
            });

           

        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);