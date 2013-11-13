/*
==============================================================================
//  个人基本信息页面 UserBasicInfo.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PersonalBaseInfo_aspx) { window.platform.PersonalBaseInfo_aspx = new Object(); }

    window.platform.PersonalBaseInfo_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {

            window.platform.getCurrentUserKey(function (userkey) {

                window.platform.employee.getEmployeeByUserKey(userkey, function (employee) {
                    if (!employee) {
                        $.plugin.messager.alert("操作提醒", "该用户未被关联，无法获取个人信息。", "info");
                        return;
                    }
                    ///////定义验证规则
                    $("#txtName", ajaxContainerSelector).validatebox({
                        required: true,
                        validType: 'FullName'
                    });
                    $("#txtCode", ajaxContainerSelector).validatebox({
                        required: true,
                        validType: ['code', 'updateValidate["编号","Services/Platform/EmployeeService.asmx/AjaxValidate","Code",' + employee.Key + ']']
                    });
                    $("#txtLastName", ajaxContainerSelector).validatebox({
                        validType: 'FullName'
                    });
                    $("#txtFirstName", ajaxContainerSelector).validatebox({
                        validType: 'FullName'
                    });
                    $("#txtFormerName", ajaxContainerSelector).validatebox({
                        validType: 'FullName'
                    });
                    $("#txtBirtyday", ajaxContainerSelector).datebox({
                        required: true,
                        validType: 'shortDate'
                    });
                    $("#txtIDcard", ajaxContainerSelector).validatebox({
                        validType: 'idCard'
                    });
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
                        onSelect: function (record) {
                            $("#selProvinceKey", ajaxContainerSelector).combobox("load", { key: record.Key });
                            $("#selProvinceKey", ajaxContainerSelector).combobox("setValue", "");
                            $("#selCityKey", ajaxContainerSelector).combobox("clear");
                        }
                    });
                    ///选择省份
                    $("#selProvinceKey", ajaxContainerSelector).combobox({
                        valueField: 'Key',
                        textField: "Name",
                        url: window.resolveUrl("Services/Platform/AreaService.asmx/GetProvinceByCountry"),
                        queryParams: { key: employee.AreaKey },
                        panelHeight: 200,
                        onSelect: function (record) {
                            $("#selCityKey", ajaxContainerSelector).combobox("load", { key: record.Key });
                            $("#selCityKey", ajaxContainerSelector).combobox("clear");
                        }
                    });

                    ///选择城市
                    $("#selCityKey", ajaxContainerSelector).combobox({
                        valueField: 'Key',
                        textField: "Name",
                        url: window.resolveUrl("Services/Platform/AreaService.asmx/GetCityByProvince"),
                        queryParams: { key: employee.ProvinceKey },
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

                    ///绑定数据信息
                    $(ajaxContainerSelector).form('loadData', employee);
                    if (employee.Birtyday == "") {
                        $("#txtBirtyday", ajaxContainerSelector).datebox('setValue', '');
                    }
                    if (employee.PoliticalStatusDate == "") {
                        $("#txtPoliticalStatusDate", ajaxContainerSelector).datebox('setValue', '');
                    }
                    loadImage();
                    $("#btnUpload", ajaxContainerSelector).click(function () {
                        window.platform.showUploadWindow({ title: "上传照片" }, {
                            width: 100,
                            height: 20,
                            formData: { UserKey: userkey, PhotoKey: employee.PhotoKey },
                            swf: 'Resources/Plugins/uploadify/uploadify.swf',
                            uploader: 'Services/Platform/EmployeeService.asmx/UploadPhoto',
                            buttonText: '浏览图片',
                            multi: false,
                            uploadLimit: 1,
                            fileTypeDesc: 'Image Files',
                            fileTypeExts: '*.jpg; *.jpeg;',
                            onUploadSuccess: function () {
                                loadImage();
                            }
                        });
                    });
                    window.platform.PersonalBaseInfo_aspx.deletePhoto = function () {
                        window.platform.employee.delelePhoto({ UserKey: userkey }, function (success) {
                            if (success) {
                                var v = Math.random();
                                $("#imgPhoto", ajaxContainerSelector).attr("src", window.resolveUrl("Services/Platform/EmployeeService.asmx/LoadPhoto?PhotoKey=0&v=" + v));
                            }
                        })
                    };
                })

                var loadImage = function () {
                    window.platform.employee.getEmployeeByUserKey(userkey, function (employee) {
                        var v = Math.random();
                        $("#imgPhoto", ajaxContainerSelector).attr("src", window.resolveUrl("Services/Platform/EmployeeService.asmx/LoadPhoto?PhotoKey=" + employee.PhotoKey + "&v=" + v));
                    });
                };
            });
        };

        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform())
                    return;
                window.platform.getCurrentUserKey(function (userkey) {
                    var employee = $(ajaxContainerSelector).form('getData');
                    $.extend(employee, { UserKey: userkey });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改个人基本信息成功。");
                        } else {
                            $.plugin.showMessage("修改个人基本信息失败。");
                        }
                    };
                    var flag = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/EmployeeService.asmx/IsAddOrUpdate"), { UserKey: employee.UserKey });
                    if (flag) {
                        window.platform.employee.updateEmployeeBasicInfo(employee, _callback);
                    }
                    else {
                        window.platform.employee.addEmployeeBasicInfo(employee, _callback);
                    }
                })
            });
        };
        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);