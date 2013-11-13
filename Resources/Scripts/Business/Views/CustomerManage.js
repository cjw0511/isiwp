/*
==============================================================================
//  客户管理页面 CustomerManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.CustomerManage_aspx) { window.business.CustomerManage_aspx = new Object(); }
    window.business.CustomerManage_aspx.initPage = function (ajaxContainerSelector) {
        $.extend($.fn.validatebox.defaults.rules, {
            telephone: {
                validator: function (value) {
                    return (/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value) || /^(13|15|18)\d{9}$/i.test(value))
                },
                message: '输入的格式必须为固话或手机号码！'
            }
        })
        var _bindControl = function () {
            var _khlxFormatter = function (value) {
                var khlxdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 1 });
                for (var i = 0; i < khlxdata.length; i++) {
                    if (khlxdata[i].Value == value) return khlxdata[i].Name;
                }
                return value;
            }
            var _khhyFormatter = function (value) {
                var khhydata = $.plugin.getJsonDataRequestWebService("Services/LoreLibs/NormService.asmx/GetTrade");
                for (var i = 0; i < khhydata.length; i++) {
                    if (khhydata[i].Key == value) return khhydata[i].Name;
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
                url: window.resolveUrl('Services/Business/CustomerService.asmx/LoadGridData'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    Name: function () { return $("#txtNameSearch", ajaxContainerSelector).val().trim(); }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '客户名称', width: 150, sortable: true}]],
                columns: [[
				{ field: 'CustomerType', title: '客户类型', width: 160, sortable: true, formatter: _khlxFormatter },
				{ field: 'IndustryType', title: '行业类型', width: 100, sortable: true, formatter: _khhyFormatter },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onclick", 'javascript:window.business.CustomerManage_aspx.delCustomer(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(delspan);
                        return div.html();
                    }
                }
			]],
                pageSize: 10,
                sortName: 'CreateDate',
                sortOrder: 'desc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.CustomerManage_aspx.editCustomer(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.CustomerManage_aspx.delCustomer(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
                    id: 'btnadd',
                    text: '添加',
                    iconCls: 'icon-create',
                    handler: function () {
                        $.plugin.showDialog({
                            title: "添加新客户",
                            href: "Views/Business/CustomerAdd.aspx",
                            onSave: function (dialog) {
                                var verifyResult = $(dialog).form("validate");
                                if (!verifyResult) { return false };
                                var customer = $(dialog).form('getData');
                                var _callback = function (success) {
                                    if (success) {
                                        $.plugin.showMessage("添加客户信息成功。");
                                        $("#CusGrid", ajaxContainerSelector).datagrid('reload');
                                    } else {
                                        $.plugin.showMessage("添加客户信息失败。");
                                    };
                                };
                                window.business.customer.addCustomer(customer, _callback);
                            },
                            width: 940,
                            height: 480
                        });
                    }
                }, '-', {
                    id: 'btncut',
                    text: '删除',
                    iconCls: 'icon-no',
                    handler: function () {
                        var ids = [];
                        var names = [];
                        var rows = $('#CusGrid', ajaxContainerSelector).datagrid('getChecked');
                        if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                        else {
                            for (var i = 0; i < rows.length; i++) {
                                ids.push(rows[i].Key);
                                names.push(rows[i].Name);
                            }
                            window.business.CustomerManage_aspx.delCustomer(ids.join(','), names.join(','));
                        }
                    }
                }, '-', {
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#CusGrid", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            };
            $("#CusGrid", ajaxContainerSelector).datagrid(options);
            $('#CusGrid', ajaxContainerSelector).datagrid({
                onSelect: function (rowIndex, rowData) {
                    window.business.CustomerManage_aspx.editCustomer(rowData.Key);
                }
            });
        };
        var _bindButtonEvent = function () {
            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtNameSearch", ajaxContainerSelector).val('');
            });
            $("#tt, ajaxContainerSelector").panel({
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#cc", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });
            $("#ss, ajaxContainerSelector").panel({
                tools: [{
                    iconCls: 'layout-button-up',
                    handler: function () { $("#pp", ajaxContainerSelector).layout("collapse", "south") }
                }]
            });
        };
        _bindControl();
        _bindButtonEvent();

        window.business.CustomerManage_aspx.editCustomer = function (key) {
            InitCustomer(key);
            IniInfoSystem(key);
            IniContact(key);
        }

        window.business.CustomerManage_aspx.delCustomer = function (keys, names) {
            $.plugin.messager.confirm("提示", "该操作将会同时删除相关的联系人、信息系统、计划项目，点击确定将删除 <strong>" + names + "</strong><br />是否执行此操作？", function (fn) {
                if (fn) {
                    var _callback = function (success) {
                        if (success) {
                            $.plugin.showMessage("删除客户成功。");
                            $("#CusGrid", ajaxContainerSelector).datagrid('clearSelections');
                            $("#CusGrid", ajaxContainerSelector).datagrid('clearChecked');
                            $("#CusGrid", ajaxContainerSelector).datagrid('reload');
                        } else {
                            $.plugin.showMessage("您需要先删除与所选客户相关的计划项目，删除客户失败。");
                        }
                    };
                    window.business.customer.deleteCustomer(keys, _callback);
                }
            });
        }
        //--------------------------Update验证---------------------------//
       
        $("#txtZipCode", ajaxContainerSelector).validatebox({
            validType: 'zipCode'
        });
        $("#txtTel", ajaxContainerSelector).validatebox({
            validType: 'telephone'
        });
        $("#txtEmail", ajaxContainerSelector).validatebox({
            validType: 'email'
        });
        $("#txtAddress", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        ///选择行业类型
        $("#selIndustryType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTrade")
        });
        $("#selIndustryType", ajaxContainerSelector).combobox("setValue", 1);
        $("#selCustomerType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 1 }
        });
        $('#selCustomerType', ajaxContainerSelector).combobox('select', '0');
        var InitCustomer = function (key) {
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["名称","Services/Business/CustomerService.asmx/AjaxValidate","Name",' + key + ']']
            });
//            $("#txtCode", ajaxContainerSelector).validatebox({
//                required: true,
//                validType: ['code', 'updateValidate["编号","Services/Business/CustomerService.asmx/AjaxValidate","Code",' + key + ']']
//            });

            $('#tool', ajaxContainerSelector).panel('open');
            $('#btnSave', ajaxContainerSelector).unbind("click");
            $("#btnSave", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form("validate");
                if (!verifyResult) { return false };
                var customer = $(ajaxContainerSelector).form('getData');
                $.extend(customer, { Key: key });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改客户信息成功。");
                        $("#CusGrid", ajaxContainerSelector).datagrid('reload');
                    } else {
                        $.plugin.showMessage("修改客户信息失败。");
                    }
                };
                window.business.customer.updateCustomer(customer, _callback);
            });
            window.business.customer.getCustomerByKey(key, function (customer) {
                $("#customertab", ajaxContainerSelector).form('clear');
                $("#customertab", ajaxContainerSelector).form('loadData', customer);
            });
            $("#btnRefresh", ajaxContainerSelector).click(function () {
                window.business.customer.getCustomerByKey(key, function (customer) {
                    $("#customertab", ajaxContainerSelector).form('clear');
                    $("#customertab", ajaxContainerSelector).form('loadData', customer);
                });
            });
        }
        //首次加载客户信息系统
        var _infoSysFormatter = function (value) {
            var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 35 });
            for (var i = 0; i < sexdata.length; i++) {
                if (sexdata[i].Key == value) return sexdata[i].Name;
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
        var _plFormatter = function (value) {
            var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 42 });
            for (var i = 0; i < sexdata.length; i++) {
                if (sexdata[i].Key == value) return sexdata[i].Name;
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
            idField: 'Key',
            frozenColumns: [[{ field: 'ck', checkbox: true },
			    { field: 'Name', title: '名称', width: 150, sortable: true}]],
            columns: [[
                { field: 'ProtectionLevel', title: '等保级别', width: 80, sortable: true, formatter: _plFormatter },
                { field: 'InfoSystemType', title: '信息系统类型', width: 110, sortable: true, formatter: _infoSysFormatter },
                { field: 'Manager', title: '客户方负责人', width: 110, sortable: true },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.CustomerManage_aspx.editInfoSystem(\'' + rowData.Key + '\');');
                        var div = $("<div></div>").append(editbtn);
                        return div.html();
                    }
                }
                ]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true
        }
        $("#InfGrid", ajaxContainerSelector).datagrid(options);
        //首次加载客户联系人
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
            idField: 'Key',
            frozenColumns: [[{ field: 'ck', checkbox: true },
			    { field: 'Name', title: '名称', width: 120, sortable: true}]],
            columns: [[
                { field: 'Tel', title: '联系人电话', width: 100, sortable: true },
                { field: 'Email', title: '电子邮箱', width: 120, sortable: true },
				{ field: 'SexKey', title: '性别', width: 60, sortable: true, formatter: _sexFormatter },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.CustomerManage_aspx.editContact(\'' + rowData.Key + '\');');
                        var div = $("<div></div>").append(editbtn);
                        return div.html();
                    }
                }
                ]],
            sortName: 'CreateDate',
            sortOrder: 'desc',
            pagination: true
        }
        $("#ConGrid", ajaxContainerSelector).datagrid(options);
        //加载客户信息系统
        var IniInfoSystem = function (key) {
            var param = { Key: function () { return key; } };
            $("#InfGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Business/InfoSystemService.asmx/LoadGridDataOfInfoSystemManageByKey');
            $("#InfGrid", ajaxContainerSelector).datagrid('load', param);
        };
        window.business.CustomerManage_aspx.editInfoSystem = function (key) {
            window.addTab({ title: "信息系统管理", href: "Views/Business/InfoSystemManage.aspx", iconCls: '', closable: true, selected: true });
        }
        //加载客户联系人
        var IniContact = function (key) {
            var param = { Key: function () { return key; } };
            $("#ConGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Business/ContactService.asmx/LoadGridDataOfRecordManageByKey');
            $("#ConGrid", ajaxContainerSelector).datagrid('load', param);
        };
        window.business.CustomerManage_aspx.editContact = function (key) {
            window.addTab({ title: "联系人信息管理", href: "Views/Business/ContactManage.aspx", iconCls: '', closable: true, selected: true });
        }
    };
})(jQuery);