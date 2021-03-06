﻿/*
==============================================================================
//  新员工添加页面TestGridAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.EmployeeAdd_aspx) { window.platform.EmployeeAdd_aspx = new Object(); }
    window.platform.EmployeeAdd_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'FullName'
            });
            $("#txtLastName", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });
            $("#txtFirstName", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'ajaxAddValid["编号","Services/Platform/EmployeeService.asmx/ajaxAddValid","Code"]']
            });
            $("#txtFormerName", ajaxContainerSelector).validatebox({
                validType: 'FullName'
            });
            $("#txtBirtyday", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtIDcard", ajaxContainerSelector).validatebox({
                validType: 'idCard'
            });
            //        $("#txtUser", ajaxContainerSelector).validatebox({
            //            validType: 'ajaxAddValid["关联用户","Services/Platform/EmployeeService.asmx/ajaxAddValid","Name"]'
            //        });
            $("#txtZipCode", ajaxContainerSelector).validatebox({
                validType: 'zipCode'
            });
            $("#txtPoliticalStatusDate", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtPhone", ajaxContainerSelector).validatebox({
                validType: 'mobile'
            });
            $("#txtTel", ajaxContainerSelector).validatebox({
                validType: 'tel'
            });
            $("#txtQQ", ajaxContainerSelector).validatebox({
                validType: 'qq'
            });
            $("#txtMSN", ajaxContainerSelector).validatebox({
                validType: 'msn'
            });
            $("#txtEmail", ajaxContainerSelector).validatebox({
                validType: 'email'
            });
            $("#txtAddress", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            $("#txtHomeTel", ajaxContainerSelector).validatebox({
                validType: 'tel'
            });
            $("#txtHomeZipCode", ajaxContainerSelector).validatebox({
                validType: 'zipCode'
            });
            $("#txtHomeAddress", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            $("#txtSummary", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            ///选择国籍
            $("#selCountryKey", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/AreaService.asmx/GetAllCountry"),
                panelHeight: 200,
                onChange: function (newValue, oldValue) {
                    $("#selProvinceKey", ajaxContainerSelector).combobox("load", { key: newValue });
                    $("#selProvinceKey", ajaxContainerSelector).combobox("setValue", "");
                }
            });
            ///选择省份
            $("#selProvinceKey", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/AreaService.asmx/GetProvinceByCountry"),
                queryParams: { key: "" },
                panelHeight: 200,
                onChange: function (newValue, oldValue) {
                    $("#selCityKey", ajaxContainerSelector).combobox("load", { key: newValue });
                    $("#selCityKey", ajaxContainerSelector).combobox("clear");
                }
            });
            ///选择城市
            $("#selCityKey", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/AreaService.asmx/GetCityByProvince"),
                queryParams: { key: "" },
                panelHeight: 200
            });
            ///选择民族
            $("#selNationKey", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/AreaService.asmx/GetAllNation"),
                panelHeight: 200
            });
            ///选择性别
            $("#selSex", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 4 }
            });
            ///选择婚姻状况
            $("#selMartalStatusKey", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 16 }
            });
            ///选择政治面貌
            $("#selPoliticalStatusKey", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 13 }
            });
            /////////////////////////////////////////////
            $("#txtArchiveUnitName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtWorkDate", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtPostEntryDate", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtPostReportDate", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtPostKey", ajaxContainerSelector).validatebox({
                required: true,
                validType: 'integer'
            });
            $("#txtPostIntoDate", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtEmploymentDate", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtWageBankAccount", ajaxContainerSelector).validatebox({
                validType: 'number'
            });
            $("#selPostType", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 14 }
            });
            $("#selWageBankKey", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 15 }
            });
            $("#txtUser", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#LinkManKey").val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#UserKey").val(selections[0].Key);
                            $("#txtUser").searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showUserSelector(onEnterClick, selected);
                }
            });
            $("#txtUser", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtUser", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        };
        var _bindButtonEvent = function () {
            $("#btnUpload", ajaxContainerSelector).click(function () {
                $("#upload", ajaxContainerSelector).click();
            });
            $("#a_clear").click(function () {
                $("#UserKey", ajaxContainerSelector).val('0');
                $("#txtUser", ajaxContainerSelector).searchbox("setValue", "");
            });
        }
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);