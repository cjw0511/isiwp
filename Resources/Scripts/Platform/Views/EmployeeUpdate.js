/*
==============================================================================
//  新员工编辑页面 EmployeeUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.EmployeeUpdate_aspx) { window.platform.EmployeeUpdate_aspx = new Object(); }
    window.platform.EmployeeUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            ///定义验证规则
            window.platform.employee.getEmployeeByKey(key, function (employee) {
                $("#txtName", ajaxContainerSelector).validatebox({
                    required: true,
                    //                    validType: 'FullName'
                    validType: ['FullName', 'updateValidate["职员名称","Services/Platform/EmployeeService.asmx/AjaxValidate","Name",' + key + ']']
                });
                $("#txtLastName", ajaxContainerSelector).validatebox({
                    validType: 'FullName'
                });
                $("#txtFirstName", ajaxContainerSelector).validatebox({
                    validType: 'FullName'
                });
                $("#txtCode", ajaxContainerSelector).validatebox({
                    required: true,
                    validType: ['code', 'updateValidate["编号","Services/Platform/EmployeeService.asmx/AjaxValidate","Code",' + key + ']']
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
                    required: true,
                    valueField: 'Key',
                    textField: "Name",
                    url: window.resolveUrl("Services/Platform/AreaService.asmx/GetAllCountry"),
                    panelHeight: 200,
//                    onChange: function (newValue, oldValue) {
//                        $("#selProvinceKey", ajaxContainerSelector).combobox("load", { key: newValue });
//                        $("#selProvinceKey", ajaxContainerSelector).combobox("setValue", "");
//                    }
                    onSelect: function (record) {
                        $("#selProvinceKey", ajaxContainerSelector).combobox("load", { key: record.Key });
                        $("#selProvinceKey", ajaxContainerSelector).combobox("setValue", "");
                        $("#selCityKey", ajaxContainerSelector).combobox("clear");
                    }
                });
                ///选择省份
                $("#selProvinceKey", ajaxContainerSelector).combobox({
                    required: true,
                    valueField: 'Key',
                    textField: "Name",
                    url: window.resolveUrl("Services/Platform/AreaService.asmx/GetProvinceByCountry"),
//                    queryParams: { key: "" },
//                    panelHeight: 200,
//                    onChange: function (newValue, oldValue) {
//                        $("#selCityKey", ajaxContainerSelector).combobox("load", { key: newValue });
//                        $("#selCityKey", ajaxContainerSelector).combobox("clear");
//                    }
                    queryParams: { key: employee.AreaKey },
                    panelHeight: 200,
                    onSelect: function (record) {
                        $("#selCityKey", ajaxContainerSelector).combobox("load", { key: record.Key });
                        $("#selCityKey", ajaxContainerSelector).combobox("clear");
                    }
                });

                ///选择城市
                $("#selCityKey", ajaxContainerSelector).combobox({
                    required: true,
                    valueField: 'Key',
                    textField: "Name",
                    url: window.resolveUrl("Services/Platform/AreaService.asmx/GetCityByProvince"),
                    //                    queryParams: { key: "" },
                    queryParams: { key: employee.ProvinceKey },
                    panelHeight: 200
                });

                ///选择民族
                $("#selNationKey", ajaxContainerSelector).combobox({
                    required: true,
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
                $("#selSex", ajaxContainerSelector).combobox("setValue", 0);
                ///选择婚姻状况
                $("#selMartalStatusKey", ajaxContainerSelector).combobox({
                    valueField: 'Key',
                    textField: "Name",
                    url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                    queryParams: { MainKey: 16 }
                });
                $("#selMartalStatusKey", ajaxContainerSelector).combobox("setValue", 0);
                ///选择政治面貌
                $("#selPoliticalStatusKey", ajaxContainerSelector).combobox({
                    valueField: 'Key',
                    textField: "Name",
                    url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                    queryParams: { MainKey: 13 }
                });
                $("#selPoliticalStatusKey", ajaxContainerSelector).combobox("setValue", 0);
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
                $("#selPostKey", ajaxContainerSelector).combobox({
                    required: true,
                    valueField: 'Key',
                    textField: "Name",
                    url: window.resolveUrl("Services/Platform/PositionService.asmx/LoadTreeData")
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
                $("#selPostType", ajaxContainerSelector).combobox("setValue", 0);

                $("#selWageBankKey", ajaxContainerSelector).combobox({
                    valueField: 'Key',
                    textField: "Name",
                    url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                    queryParams: { MainKey: 15 }
                });
                $("#selWageBankKey", ajaxContainerSelector).combobox("setValue", 0);

                $("#IsEmployment", ajaxContainerSelector).combobox({
                    required: true
                });
                $("#IsEmployment", ajaxContainerSelector).combobox("setValue", 0);

                $("#txtUser", ajaxContainerSelector).searchbox({
                    searcher: function (value) {
                        var selected = $("#UserKey", ajaxContainerSelector).val();
                        var onEnterClick = function (datagrid, selections) {
                            if (selections.length > 0) {
                                $("#UserKey", ajaxContainerSelector).val(selections[0].Key);
                                $("#txtUser", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                            } else {
                                $.plugin.showMessage("请先选择一行!");
                                return false;
                            }
                        };
                        window.platform.showUserSelector(onEnterClick, selected);
                    }
                });
                $("#txtUser", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
                $("#txtUser", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
                $("#txtUser", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });

                $("#UserKey", ajaxContainerSelector).val(employee.UserKey);
                if (employee.UserKey != '0' && employee.UserKey != undefined) {
                    window.platform.user.getUserByKey(employee.UserKey, function (user) {
                        if (user)
                            $("#txtUser", ajaxContainerSelector).searchbox("setValue", user.Name);
                        $("#txtUser", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                    });
                }

                ///绑定数据信息
                $(ajaxContainerSelector).form('loadData', employee);
                var v = Math.random();
                $("#imgPhoto", ajaxContainerSelector).attr("src", window.resolveUrl("Services/Platform/EmployeeService.asmx/LoadPhoto?PhotoKey=" + employee.PhotoKey + "&v=" + v));

                $("#btnUpload", ajaxContainerSelector).click(function () {
                    window.platform.showUploadWindow({ title: "上传照片" }, {
                        width: 100,
                        height: 20,
                        formData: { UserKey: employee.UserKey, PhotoKey: employee.PhotoKey },
                        swf: 'Resources/Plugins/uploadify/uploadify.swf',
                        uploader: 'Services/Platform/EmployeeService.asmx/UploadPhoto',
                        buttonText: '浏览图片',
                        multi: false,
                        uploadLimit: 1,
                        fileTypeDesc: 'Image Files',
                        fileTypeExts: '*.jpg; *.jpeg;',
                        onUploadSuccess: function () {
                            var v = Math.random();
                            $("#imgPhoto", ajaxContainerSelector).attr("src", window.resolveUrl("Services/Platform/EmployeeService.asmx/LoadPhoto?PhotoKey=" + employee.PhotoKey + "&v=" + v));
                        }
                    });
                });
                window.platform.EmployeeUpdate_aspx.deletePhoto = function () {
                    window.platform.employee.delelePhoto({ UserKey: employee.UserKey }, function (success) {
                        if (success) {
                            var v = Math.random();
                            $("#imgPhoto", ajaxContainerSelector).attr("src", window.resolveUrl("Services/Platform/EmployeeService.asmx/LoadPhoto?PhotoKey=0&v=" + v));
                        }
                    })
                };

                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 4 });
                function _sexFormatter(value) {
                    for (var i = 0; i < sexdata.length; i++) {
                        if (sexdata[i].id == value) return sexdata[i].text;
                    }
                    return value;
                }
                var familydata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 17 });
                var _familyFormatter = function (value) {
                    for (var i = 0; i < familydata.length; i++) {
                        if (familydata[i].Key == value) return familydata[i].Name;
                    }
                    return value;
                }
                //家庭成员
                var options_familymember = {
                    rownumbers: true,
                    singleSelect: true,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    fit: true,
                    border: false,
                    autoRowHeight: false,
                    nowrap: true,
                    remoteSort: false,
                    url: window.resolveUrl('Services/Platform/FamilyMemberService.asmx/LoadGridData'),
                    pagination: true,
                    queryParams: {
                        EmpKey: employee.Key
                    },
                    idField: 'ID',
                    columns: [[
                                    { field: 'ck', checkbox: true },
                                    { field: 'Name', title: '姓名', width: 120, sortable: true },
                    				{ field: 'SexKey', title: '性别', width: 120, sortable: true, formatter: _sexFormatter },
                    				{ field: 'FamilyMemberType', title: '成员关系', width: 120, sortable: true, formatter: _familyFormatter },
                                    { field: 'Contact', title: '联系方式', width: 150, sortable: true },
                                    { field: 'WorkUnit', title: '工作单位', width: 150, sortable: true },
                                    { field: 'opt', title: '操作', width: 80, align: 'center',
                                        formatter: function (value, rowData, rowIndex) {
                                            return '<div><div style="cursor:pointer;width:20px;display:inline-block" class="icon-edit" title="编辑" onclick="javascript:window.platform.EmployeeUpdate_aspx.editFamilyMember(\'' + rowData.ID + '\')" >&nbsp;</div><div style="width:5px;display:inline-block">&nbsp;</div><div style="cursor:pointer;width:20px;display:inline-block" class="icon-no" title="删除" onclick="javascript:window.platform.EmployeeUpdate_aspx.delFamilyMember(\'' + rowData.ID + '\',\'' + rowData.Name + '\')" >&nbsp;</div></div>';
                                        }
                                    }
                    			]],
                    rowContextMenus: [
                        { text: function (e, rowIndex, rowData, eventData) {
                            return "编辑：" + rowData.Name;
                        },
                            iconCls: "icon-edit",
                            handler: function (e, rowIndex, rowData, eventData) {
                                window.platform.EmployeeUpdate_aspx.editFamilyMember(rowData.ID);
                            }
                        },
                        { text: function (e, rowIndex, rowData, eventData) {
                            return "删除：" + rowData.Name;
                        },
                            iconCls: "icon-no",
                            handler: function (e, rowIndex, rowData, eventData) {
                                window.platform.EmployeeUpdate_aspx.delFamilyMember(rowData.ID, rowData.Name);
                            }
                        }
                    ],
                    toolbar: [{
                        id: 'btnadd',
                        text: '添加成员',
                        iconCls: 'icon-create',
                        handler: function () {
                            $.plugin.showDialog({
                                title: "添加家庭成员",
                                href: "Views/Platform/FamilyMemberAdd.aspx",
                                onSave: function (dialog) {
                                    var verifyResult = $(dialog).form("validate");
                                    if (!verifyResult) { return false };
                                    var familyMember = $(dialog).form('getData');
                                    $.extend(familyMember, { EmpKey: employee.Key });
                                    var _callback = function (success) {
                                        if (success) {
                                            $("#familyMemberGrid", ajaxContainerSelector).datagrid('reload');
                                            $.plugin.showMessage("添加家庭成员信息成功。");

                                        } else {
                                            $.plugin.showMessage("添加家庭成员信息失败。");
                                        }
                                    };
                                    window.platform.employee.addFamilyMember(familyMember, _callback);
                                },
                                width: 900,
                                height: 280
                            });
                        }
                    }, '-', {
                        id: 'btncut',
                        text: '删除成员',
                        iconCls: 'icon-no',
                        handler: function () {
                            var ids = [];
                            var names = [];
                            var rows = $('#familyMemberGrid', ajaxContainerSelector).datagrid('getSelections');
                            if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                            else {
                                for (var i = 0; i < rows.length; i++) {
                                    ids.push(rows[i].ID);
                                    names.push(rows[i].Name);
                                }
                                window.platform.EmployeeUpdate_aspx.delFamilyMember(ids.join(','), names.join(','));
                            }
                        }
                    }]
                };
                $("#familyMemberGrid", ajaxContainerSelector).datagrid(options_familymember);
                //工作经历
                var experiencedata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 18 });
                var _experienceFormatter = function (value) {
                    for (var i = 0; i < experiencedata.length; i++) {
                        if (experiencedata[i].Key == value) return experiencedata[i].Name;
                    }
                    return value;
                }
                var options_experience = {
                    rownumbers: true,
                    singleSelect: true,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    fit: true,
                    border: false,
                    autoRowHeight: false,
                    nowrap: true,
                    remoteSort: false,
                    url: window.resolveUrl('Services/Platform/ExperienceService.asmx/LoadGridData'),
                    pagination: true,
                    queryParams: {
                        EmpKey: employee.Key
                    },
                    idField: 'ID',
                    columns: [[
                        { field: 'ck', checkbox: true },
                        { field: 'BeginDate', title: '开始时间', width: 120, sortable: true, formatter: function (value) { return value.toDate().format() } },
                    	{ field: 'EndDate', title: '结束时间', width: 120, sortable: true, formatter: function (value) { return value.toDate().format() } },
                    	{ field: 'Name', title: '经历名称', width: 120, sortable: true },
                        { field: 'Location', title: '所在地', width: 150, sortable: true },
                        { field: 'ExperienceType', title: '经历类型', width: 150, sortable: true, formatter: _experienceFormatter },
                        { field: 'opt', title: '操作', width: 80, align: 'center',
                            formatter: function (value, rowData, rowIndex) {
                                return '<div><div style="cursor:pointer;width:20px;display:inline-block" class="icon-edit" title="编辑" onclick="javascript:window.platform.EmployeeUpdate_aspx.editExperience(\'' + rowData.ID + '\')" >&nbsp;</div><div style="width:5px;display:inline-block">&nbsp;</div><div style="cursor:pointer;width:20px;display:inline-block" class="icon-no" title="删除" onclick="javascript:window.platform.EmployeeUpdate_aspx.delExperience(\'' + rowData.ID + '\',\'' + rowData.Name + '\')" >&nbsp;</div></div>';
                            }
                        }
                    ]],
                    rowContextMenus: [
                        { text: function (e, rowIndex, rowData, eventData) {
                            return "编辑：" + rowData.Name;
                        },
                            iconCls: "icon-edit",
                            handler: function (e, rowIndex, rowData, eventData) {
                                window.platform.EmployeeUpdate_aspx.editExperience(rowData.ID);
                            }
                        },
                        { text: function (e, rowIndex, rowData, eventData) {
                            return "删除：" + rowData.Name;
                        },
                            iconCls: "icon-no",
                            handler: function (e, rowIndex, rowData, eventData) {
                                window.platform.EmployeeUpdate_aspx.delExperience(rowData.ID, rowData.Name);
                            }
                        }
                    ],
                    toolbar: [{
                        id: 'btnadd',
                        text: '添加经历',
                        iconCls: 'icon-create',
                        handler: function () {
                            $.plugin.showDialog({
                                title: "添加经历",
                                href: "Views/Platform/ExperienceAdd.aspx",
                                onSave: function (dialog) {
                                    var verifyResult = $(dialog).form("validate");
                                    if (!verifyResult) { return false };
                                    var experience = $(dialog).form('getData');
                                    $.extend(experience, { EmpKey: employee.Key });
                                    var _callback = function (success) {
                                        if (success) {
                                            $("#experienceGrid", ajaxContainerSelector).datagrid('reload');
                                            $.plugin.showMessage("添加经历信息成功。");

                                        } else {
                                            $.plugin.showMessage("添加经历信息失败。");
                                        }
                                    };
                                    window.platform.employee.addExperience(experience, _callback);
                                },
                                width: 900,
                                height: 280
                            });
                        }
                    }, '-', {
                        id: 'btncut',
                        text: '删除经历',
                        iconCls: 'icon-no',
                        handler: function () {
                            var ids = [];
                            var names = [];
                            var rows = $('#experienceGrid', ajaxContainerSelector).datagrid('getSelections');
                            if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                            else {
                                for (var i = 0; i < rows.length; i++) {
                                    ids.push(rows[i].ID);
                                    names.push(rows[i].Name);
                                }
                                window.platform.EmployeeUpdate_aspx.delExperience(ids.join(','), names.join(','));
                            }
                        }
                    }]
                };
                $("#experienceGrid", ajaxContainerSelector).datagrid(options_experience);

                //获得证书
                var options_certificate = {
                    rownumbers: true,
                    singleSelect: true,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    fit: true,
                    border: false,
                    autoRowHeight: false,
                    nowrap: true,
                    remoteSort: false,
                    idField: 'ID',
                    url: window.resolveUrl('Services/Platform/CertificateService.asmx/LoadGridData'),
                    pagination: true,
                    queryParams: {
                        EmpKey: employee.Key
                    },
                    columns: [[
                        { field: 'ck', checkbox: true },
                        { field: 'GetDate', title: '获得日期', width: 120, sortable: true, formatter: function (value) { return value.toDate().format() } },
                    	{ field: 'Name', title: '所获证书/资历名称', width: 200, sortable: true },
                    	{ field: 'IssuingUnit', title: '颁发机构', width: 200, sortable: true },
                        { field: 'opt', title: '操作', width: 80, align: 'center',
                            formatter: function (value, rowData, rowIndex) {
                                return '<div><div style="cursor:pointer;width:20px;display:inline-block" class="icon-edit" title="编辑" onclick="javascript:window.platform.EmployeeUpdate_aspx.editCertificate(\'' + rowData.ID + '\')" >&nbsp;</div><div style="width:5px;display:inline-block">&nbsp;</div><div style="cursor:pointer;width:20px;display:inline-block" class="icon-no" title="删除" onclick="javascript:window.platform.EmployeeUpdate_aspx.delCertificate(\'' + rowData.ID + '\',\'' + rowData.Name + '\')" >&nbsp;</div></div>';
                            }
                        }
                    ]],
                    rowContextMenus: [
                        { text: function (e, rowIndex, rowData, eventData) {
                            return "编辑：" + rowData.Name;
                        },
                            iconCls: "icon-edit",
                            handler: function (e, rowIndex, rowData, eventData) {
                                window.platform.EmployeeUpdate_aspx.editCertificate(rowData.ID);
                            }
                        },
                        { text: function (e, rowIndex, rowData, eventData) {
                            return "删除：" + rowData.Name;
                        },
                            iconCls: "icon-no",
                            handler: function (e, rowIndex, rowData, eventData) {
                                window.platform.EmployeeUpdate_aspx.delCertificate(rowData.ID, rowData.Name);
                            }
                        }
                    ],
                    toolbar: [{
                        id: 'btnadd',
                        text: '添加证书',
                        iconCls: 'icon-create',
                        handler: function () {
                            $.plugin.showDialog({
                                title: "添加证书",
                                href: "Views/Platform/CertificateAdd.aspx",
                                onSave: function (dialog) {
                                    var verifyResult = $(dialog).form("validate");
                                    if (!verifyResult) { return false };
                                    var certificate = $(dialog).form('getData');
                                    $.extend(certificate, { EmpKey: employee.Key });
                                    var _callback = function (success) {
                                        if (success) {
                                            $("#certificateGrid", ajaxContainerSelector).datagrid('reload');
                                            $.plugin.showMessage("编辑证书成功。");

                                        } else {
                                            $.plugin.showMessage("编辑证书失败。");
                                        }
                                    };
                                    window.platform.employee.addCertificate(certificate, _callback);
                                },
                                width: 900,
                                height: 250
                            });
                        }
                    }, '-', {
                        id: 'btncut',
                        text: '删除证书',
                        iconCls: 'icon-no',
                        handler: function () {
                            var ids = [];
                            var names = [];
                            var rows = $('#certificateGrid', ajaxContainerSelector).datagrid('getSelections');
                            if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                            else {
                                for (var i = 0; i < rows.length; i++) {
                                    ids.push(rows[i].ID);
                                    names.push(rows[i].Name);
                                }
                                window.platform.EmployeeUpdate_aspx.delCertificate(ids.join(','), names.join(','));
                            }
                        }
                    }]
                };
                $("#certificateGrid", ajaxContainerSelector).datagrid(options_certificate);
            });
        };
        var _bindButtonEvent = function () {
            $("#btnUpload", ajaxContainerSelector).click(function () {
                $("#upload", ajaxContainerSelector).click();
            });
            $("#a_clear", ajaxContainerSelector).click(function () {
                $("#UserKey", ajaxContainerSelector).val('0');
                $("#txtUser", ajaxContainerSelector).searchbox("setValue", "");
            });
        }
        _bindControl();
        _bindButtonEvent();

        window.platform.EmployeeUpdate_aspx.editFamilyMember = function (id) {
            $.plugin.showDialog({
                title: "编辑家庭成员",
                href: "Views/Platform/FamilyMemberUpdate.aspx?id=" + id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var familyMember = $(dialog).form('getData');
                    $.extend(familyMember, { Id: id });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("编辑家庭成员信息成功。");
                            $("#familyMemberGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("编辑家庭成员信息失败。");
                        }
                    };
                    window.platform.employee.updateFamilyMember(familyMember, _callback);
                },
                width: 900,
                height: 280
            });
        };
        window.platform.EmployeeUpdate_aspx.delFamilyMember = function (ids, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除家庭成员成功。");
                            $("#familyMemberGrid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#familyMemberGrid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#familyMemberGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除家庭成员失败。");
                        }
                    };
                    window.platform.employee.deleteFamilyMember(ids, _callback);
                }
            });
        }

        window.platform.EmployeeUpdate_aspx.editExperience = function (id) {
            $.plugin.showDialog({
                title: "编辑经历",
                href: "Views/Platform/ExperienceUpdate.aspx?id=" + id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var experience = $(dialog).form('getData');
                    $.extend(experience, { Id: id });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("编辑经历信息成功。");
                            $("#experienceGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("编辑经历信息失败。");
                        }
                    };
                    window.platform.employee.updateExperience(experience, _callback);
                },
                width: 900,
                height: 280
            });
        }
        window.platform.EmployeeUpdate_aspx.delExperience = function (ids, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除经历成功。");
                            $("#experienceGrid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#experienceGrid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#experienceGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除经历失败。");
                        }
                    };
                    window.platform.employee.deleteExperience(ids, _callback);
                }
            });
        }

        window.platform.EmployeeUpdate_aspx.editCertificate = function (id) {
            $.plugin.showDialog({
                title: "编辑证书",
                href: "Views/Platform/CertificateUpdate.aspx?id=" + id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var certificate = $(dialog).form('getData');
                    $.extend(certificate, { Id: id }); lback = function (success) {
                        if (success) {

                            $.plugin.showMessage("编辑证书成功。");
                            $("#certificateGrid", ajaxContainerSelector).datagrid('reload');

                        } else {
                            $.plugin.showMessage("编辑证书失败。");
                        }
                    };
                    window.platform.employee.updateCertificate(certificate, _callback);
                },
                width: 900,
                height: 250
            });
        }
        window.platform.EmployeeUpdate_aspx.delCertificate = function (ids, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除证书成功。");
                            $("#certificateGrid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#certificateGrid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#certificateGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除证书失败。");
                        }
                    };
                    window.platform.employee.deleteCertificate(ids, _callback);
                }
            });
        }
    };
})(jQuery);