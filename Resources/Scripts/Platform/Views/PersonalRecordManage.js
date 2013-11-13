/*
==============================================================================
//  人事档案管理页面 PersonalRecordManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PersonalRecordManage_aspx) { window.platform.PersonalRecordManage_aspx = new Object(); }
    window.platform.PersonalRecordManage_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {

            $("#selSex", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name"
            });
            var data = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 4 });
            data.unshift({ Key: -1, Name: '不限' });
            $("#selSex", ajaxContainerSelector).combobox("loadData", data).combobox("setValue", -1);

            var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 4 });
            var _sexFormatter = function (value) {
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return "";
            }
            var zzdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 13 });
            var _zzFormatter = function (value) {
                for (var i = 0; i < zzdata.length; i++) {
                    if (zzdata[i].Key == value) return zzdata[i].Name;
                }
                return "";
            }
            var gwdata = $.plugin.getJsonDataRequestWebService("Services/Platform/PositionService.asmx/LoadTreeData");
            var _gwFormatter = function (value) {
                for (var i = 0; i < gwdata.length; i++) {
                    if (gwdata[i].Key == value) return gwdata[i].Name;
                }
                return "";
            }
            var marrydata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 16 });
            var _marryFormatter = function (value) {
                for (var i = 0; i < marrydata.length; i++) {
                    if (marrydata[i].Key == value) return marrydata[i].Name;
                }
                return "";
            }
            var options = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Platform/EmployeeService.asmx/LoadGridDataOfRecordManage'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    Name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); },
                    Sex: function () { return $("#selSex", ajaxContainerSelector).combobox("getValue"); }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '姓名', width: 100, sortable: true },
                { field: 'Code', title: '编号', width: 100, sortable: true}]],
                columns: [[
				{ field: 'SexKey', title: '性别', width: 100, sortable: true, formatter: _sexFormatter },
				{ field: 'PoliticalStatusKey', title: '政治身份', width: 150, sortable: true, formatter: _zzFormatter },
                { field: 'PostKey', title: '岗位', width: 150, sortable: true, formatter: _gwFormatter },
                { field: 'MartalStatusKey', title: '婚姻状态', width: 150, sortable: true, formatter: _marryFormatter },
                { field: 'Phone', title: '手机号码', width: 150, sortable: true },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.platform.PersonalRecordManage_aspx.editEmployee(\'' + rowData.Key + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.platform.PersonalRecordManage_aspx.delEmployee(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan);
                        return div.html();
                    }
                }
			]],
                sortName: 'Code',
                sortOrder: 'asc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.PersonalRecordManage_aspx.editEmployee(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.platform.PersonalRecordManage_aspx.delEmployee(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加新员工",
                            href: "Views/Platform/EmployeeAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var employee = $(dialog).form('getData');
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加员工信息成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加员工信息失败。");
                                    };
                                };
                                window.platform.employee.addEmployee(employee, _callback);
                            },
                            width: 920,
                            height: 600
                        });
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var ids = [];
                        var names = [];
                        var rows = $('#Grid', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].Key);
                                names.push(rows[i].Name);
                            }
                            window.platform.PersonalRecordManage_aspx.delEmployee(ids.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            };
            $("#Grid", ajaxContainerSelector).datagrid(options);
        };
        var _bindButtonEvent = function () {
            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtName", ajaxContainerSelector).val('');
                $("#selSex", ajaxContainerSelector).combobox("setValue", "-1");
            });
        };
        _bindControl();
        _bindButtonEvent();

        window.platform.PersonalRecordManage_aspx.editEmployee = function (key) {
            $.plugin.showDialog({
                title: "编辑员工资料",
                href: "Views/Platform/EmployeeUpdate.aspx?key=" + key,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var employee = $(dialog).form('getData');
                    $.extend(employee, { Key: key });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改员工信息成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("修改员工信息失败。");
                        }
                    };
                    window.platform.employee.updateEmployee(employee, _callback);
                },
                width: 920,
                height: 600
            });
        }
        window.platform.PersonalRecordManage_aspx.delEmployee = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 " + names + "<br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除员工成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除员工失败。");
                        }
                    };
                    window.platform.employee.deleteEmployee(keys, _callback);
                }
            });
        }
    };
})(jQuery);