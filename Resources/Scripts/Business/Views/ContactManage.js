/*
==============================================================================
//  客户联系人管理页面 ContactManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.ContactManage_aspx) { window.business.ContactManage_aspx = new Object(); }
    window.business.ContactManage_aspx.initPage = function (ajaxContainerSelector) {
        var _bindControl = function () {

            $("#selSexSearch", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name"
            });
            var data = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 4 });
            data.unshift({ Key: -1, Name: '不限' });
            $("#selSexSearch", ajaxContainerSelector).combobox("loadData", data).combobox("setValue", -1);

            var _sexFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 4 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Value == value) return sexdata[i].Name;
                }
                return value;
            }
            var _khFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Business/CustomerService.asmx/GetAllCustomer", null);
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) { return sexdata[i].Name; }
                }
                return value;
            }
            var options = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Business/ContactService.asmx/LoadGridDataOfRecordManage'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    Name: function () { return $("#txtName", ajaxContainerSelector).val().trim(); },
                    Sex: function () { return $("#selSexSearch", ajaxContainerSelector).combobox("getValue"); }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '姓名', width: 100, sortable: true }]],
                columns: [[
				{ field: 'CustomerKey', title: '所属客户', width: 150, sortable: true, formatter:_khFormatter },
                { field: 'Tel', title: '联系人电话', width: 150, sortable: true },
                { field: 'Email', title: '电子邮箱', width: 150, sortable: true },
				{ field: 'SexKey', title: '性别', width: 100, sortable: true, formatter: _sexFormatter },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.ContactManage_aspx.editContact(\'' + rowData.Key + '\');');
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.ContactManage_aspx.delContact(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(editbtn).append(delspan);
                        return div.html();
                    }
                }
			]],
                sortName: 'CreateDate',
                sortOrder: 'desc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.ContactManage_aspx.editContact(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.ContactManage_aspx.delContact(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加新联系人",
                            href: "Views/Business/ContactAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var contact = $(dialog).form('getData');
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加联系人信息成功。");
                                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加联系人信息失败。");
                                    };
                                };
                                window.business.contact.addContact(contact, _callback);
                            },
                            width: 920,
                            height: 400
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
                            window.business.ContactManage_aspx.delContact(ids.join(','), names.join(','));
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

        window.business.ContactManage_aspx.editContact = function (key) {
            $.plugin.showDialog({
                title: "编辑联系人资料",
                href: "Views/Business/ContactUpdate.aspx?key=" + key,
                onSave: function (dialog) {
                    var verifyResult = $(dialog).form("validate");
                    if (!verifyResult) { return false };
                    var contact = $(dialog).form('getData');
                    $.extend(contact, { Key: key });
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("修改联系人信息成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("修改联系人信息失败。");
                        }
                    };
                    window.business.contact.updateContact(contact, _callback);
                },
                width: 920,
                height: 400
            });
        }
        window.business.ContactManage_aspx.delContact = function (keys, names) {
            $.plugin.messager.confirm("提示", "点击确定将删除 <strong>" + names + "</strong><br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除联系人成功。");
                            $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#Grid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("删除联系人失败。");
                        }
                    };
                    window.business.contact.deleteContact(keys, _callback);
                }
            });
        }
    };
})(jQuery);