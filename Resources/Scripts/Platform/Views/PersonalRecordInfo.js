/*
==============================================================================
//  人事档案信息页面 PersonalRecordInfo.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PersonalRecordInfo_aspx) { window.platform.PersonalRecordInfo_aspx = new Object(); }

    window.platform.PersonalRecordInfo_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {
            window.platform.getCurrentUserKey(function (userkey) {
                window.platform.employee.getEmployeeByUserKey(userkey, function (employee) {
                    ///////定义验证规则//////////////////////////////////////////
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
                    $("#selWageBankKey", ajaxContainerSelector).combobox({
                        valueField: 'Key',
                        textField: "Name",
                        url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                        queryParams: { MainKey: 15 }
                    });

                    if (!employee) {
                        $.plugin.messager.alert("操作提醒", "该用户未被关联，无法获取档案信息。", "info");
                        return;
                    }
                    //绑定数据信息
                    $(ajaxContainerSelector).form('loadData', employee);
                    var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 4 });
                    var _sexFormatter = function (value) {
                        for (var i = 0; i < sexdata.length; i++) {
                            if (sexdata[i].Key == value) return sexdata[i].Name;
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
                    if (employee.WorkDate == "") {
                        $("#txtWorkDate", ajaxContainerSelector).datebox('setValue', '');
                    }
                    if (employee.PostEntryDate == "") {
                        $("#txtPostEntryDate", ajaxContainerSelector).datebox('setValue', '');
                    }
                    if (employee.PostReportDate == "") {
                        $("#txtPostReportDate", ajaxContainerSelector).datebox('setValue', '');
                    }
                    if (employee.PostIntoDate == "") {
                        $("#txtPostIntoDate", ajaxContainerSelector).datebox('setValue', '');
                    }
                    if (employee.EmploymentDate == "") {
                        $("#txtEmploymentDate", ajaxContainerSelector).datebox('setValue', '');
                    }
                    //家庭成员
                    var options_familymember = {
                        border: false,
                        rownumbers: true,
                        singleSelect: true,
                        checkOnSelect: false,
                        selectOnCheck: false,
                        fit: true,
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
                                            var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.platform.PersonalRecordInfo_aspx.editFamilyMember(\'' + rowData.ID + '\');');
                                            var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.platform.PersonalRecordInfo_aspx.delFamilyMember(\'' + rowData.ID + '\',\'' + rowData.Name + '\');');
                                            var div = $("<div></div>").append(editbtn).append(delspan);
                                            return div.html();
                                        }
                                    }
                    			]],
                        rowContextMenus: [
                            { text: function (e, rowIndex, rowData, eventData) {
                                return "编辑：" + rowData.Name;
                            },
                                iconCls: "icon-edit",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.platform.PersonalRecordInfo_aspx.editFamilyMember(rowData.ID);
                                }
                            },
                            { text: function (e, rowIndex, rowData, eventData) {
                                return "删除：" + rowData.Name;
                            },
                                iconCls: "icon-no",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.platform.PersonalRecordInfo_aspx.delFamilyMember(rowData.ID, rowData.Name);
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
                                var rows = $('#familyMemberGrid', ajaxContainerSelector).datagrid('getChecked');
                                if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                                else {
                                    for (var i = 0; i < rows.length; i++) {
                                        ids.push(rows[i].ID);
                                        names.push(rows[i].Name);
                                    }
                                    window.platform.PersonalRecordInfo_aspx.delFamilyMember(ids.join(','), names.join(','));
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
                        border: false,
                        rownumbers: true,
                        singleSelect: true,
                        checkOnSelect: false,
                        selectOnCheck: false,
                        fit: true,
                        nowrap: true,
                        remoteSort: false,
                        pagination: true,
                        url: window.resolveUrl('Services/Platform/ExperienceService.asmx/LoadGridData'),
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
                                var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.platform.PersonalRecordInfo_aspx.editExperience(\'' + rowData.ID + '\');');
                                var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.platform.PersonalRecordInfo_aspx.delExperience(\'' + rowData.ID + '\',\'' + rowData.Name + '\');');
                                var div = $("<div></div>").append(editbtn).append(delspan);
                                return div.html();
                            }
                        }
                    ]],
                        rowContextMenus: [
                            { text: function (e, rowIndex, rowData, eventData) {
                                return "编辑：" + rowData.Name;
                            },
                                iconCls: "icon-edit",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.platform.PersonalRecordInfo_aspx.editExperience(rowData.ID);
                                }
                            },
                            { text: function (e, rowIndex, rowData, eventData) {
                                return "删除：" + rowData.Name;
                            },
                                iconCls: "icon-no",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.platform.PersonalRecordInfo_aspx.delExperience(rowData.ID, rowData.Name);
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
                                var rows = $('#experienceGrid', ajaxContainerSelector).datagrid('getChecked');
                                if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                                else {
                                    for (var i = 0; i < rows.length; i++) {
                                        ids.push(rows[i].ID);
                                        names.push(rows[i].Name);
                                    }
                                    window.platform.PersonalRecordInfo_aspx.delExperience(ids.join(','), names.join(','));
                                }
                            }
                        }]
                    };
                    $("#experienceGrid", ajaxContainerSelector).datagrid(options_experience);

                    //获得证书
                    var options_certificate = {
                        border: false,
                        rownumbers: true,
                        singleSelect: true,
                        checkOnSelect: false,
                        selectOnCheck: false,
                        fit: true,
                        nowrap: true,
                        remoteSort: false,
                        idField: 'ID',
                        pagination: true,
                        url: window.resolveUrl('Services/Platform/CertificateService.asmx/LoadGridData'),
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
                                var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.platform.PersonalRecordInfo_aspx.editCertificate(\'' + rowData.ID + '\');');
                                var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.platform.PersonalRecordInfo_aspx.delCertificate(\'' + rowData.ID + '\',\'' + rowData.Name + '\');');
                                var div = $("<div></div>").append(editbtn).append(delspan);
                                return div.html();
                            }
                        }
                    ]],
                        rowContextMenus: [
                            { text: function (e, rowIndex, rowData, eventData) {
                                return "编辑：" + rowData.Name;
                            },
                                iconCls: "icon-edit",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.platform.PersonalRecordInfo_aspx.editCertificate(rowData.ID);
                                }
                            },
                            { text: function (e, rowIndex, rowData, eventData) {
                                return "删除：" + rowData.Name;
                            },
                                iconCls: "icon-no",
                                handler: function (e, rowIndex, rowData, eventData) {
                                    window.platform.PersonalRecordInfo_aspx.delCertificate(rowData.ID, rowData.Name);
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
                                var rows = $('#certificateGrid', ajaxContainerSelector).datagrid('getChecked');
                                if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                                else {
                                    for (var i = 0; i < rows.length; i++) {
                                        ids.push(rows[i].ID);
                                        names.push(rows[i].Name);
                                    }
                                    window.platform.PersonalRecordInfo_aspx.delCertificate(ids.join(','), names.join(','));
                                }
                            }
                        }]
                    };
                    $("#certificateGrid", ajaxContainerSelector).datagrid(options_certificate);
                })
            });
        };

        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; };
                window.platform.getCurrentUserKey(function (userKey) {
                    var employee = $(ajaxContainerSelector).form('getData');
                    $.extend(employee, { UserKey: userKey });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改用户档案信息成功。");
                        } else {
                            $.plugin.showMessage("修改用户档案信息失败。");
                        }
                    };
                    var flag = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/EmployeeService.asmx/IsAddOrUpdate"), { UserKey: employee.UserKey });
                    if (flag) {
                        window.platform.employee.updateEmployeeRecordInfo(employee, _callback);
                    }
                    else {
                        $.plugin.showMessage("请先添加个人基本信息！");
                    }
                });
            });

        };
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        _bindControl();
        _bindButtonEvent();


        window.platform.PersonalRecordInfo_aspx.editFamilyMember = function (id) {
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
        window.platform.PersonalRecordInfo_aspx.delFamilyMember = function (ids, names) {
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

        window.platform.PersonalRecordInfo_aspx.editExperience = function (id) {
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
        window.platform.PersonalRecordInfo_aspx.delExperience = function (ids, names) {
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

        window.platform.PersonalRecordInfo_aspx.editCertificate = function (id) {
            $.plugin.showDialog({
                title: "编辑证书",
                href: "Views/Platform/CertificateUpdate.aspx?id=" + id,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var certificate = $(dialog).form('getData');
                    $.extend(certificate, { Id: id });
                    var _callback = function (success) {
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
        window.platform.PersonalRecordInfo_aspx.delCertificate = function (ids, names) {
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