/*
==============================================================================
//  主页中商务跟进页面 WorkSpaceBusinessFollow.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.business) { window.business = new Object(); }
    if (!window.business.WorkSpaceBusinessFollow_aspx) { window.business.WorkSpaceBusinessFollow_aspx = new Object(); }

    window.business.WorkSpaceBusinessFollow_aspx.initPage = function (ajaxContainerSelector) {
        window.business.WorkSpaceBusinessFollow_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {

            var _BFFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 48 });
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Key == value) return sexdata[i].Name;
                }
                return value;
            }

            ////跟进记录表格///////////////////////////////////////////
            var businessFollow_options = {
                fit: true,
                fitColumns: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Business/BusinessFollowService.asmx/GetPagingData'),
                queryParams: {
                    CustomerKey: -1,
                    ProjectKey: -1
                },
                idField: 'Key',
                columns: [[{ field: 'ck', checkbox: true },
				{ field: 'ContactDate', title: '接洽时间', width: 100, sortable: true, formatter: function (value) { return value.toDate().format() } },
                { field: 'BusinessForms', title: '商务形式', width: 100, sortable: true, formatter: _BFFormatter },
                { field: 'ContactMan', title: '接洽人员', width: 100, sortable: true },
                {field: 'opt', title: '操作', width: 100, align: 'center',
                formatter: function (value, rowData, rowIndex) {
                    var delspan = $("<a title='处理更多'></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.business.WorkSpaceBusinessFollow_aspx.processBusinessFollow(\'' + rowData.Key + '\');');
                    var div = $("<div></div>").append(delspan);
                    return div.html();
                }
            }
			    ]],
            sortName: 'ContactDate',
            sortOrder: 'asc',
            pagination: true,
            toolbar: [{
                id: 'btnadd',
                text: '添加',
                iconCls: 'icon-create',
                handler: function () {
                    $.plugin.showDialog({
                        title: "添加跟进记录",
                        href: "Views/Business/BusinessFollowAdd.aspx",
                        onSave: function (dialog) {
                            var verifyResult = $(dialog).form("validate");
                            if (!verifyResult) { return false };
                            var businessFollow = $(dialog).form('getData');
                            var _callback = function (success) {
                                if (success) {
                                    $.plugin.showMessage("添加跟进记录成功。");
                                    $("#Grid", ajaxContainerSelector).datagrid('reload');
                                } else {
                                    $.plugin.showMessage("添加跟进记录失败。");
                                }
                            };
                            window.business.businessfollow.addBusinessFollow(businessFollow, _callback);
                        },
                        width: 900,
                        height: 500
                    });
                }
            }, '-', {
                id: 'btncut',
                text: '删除',
                iconCls: 'icon-no',
                handler: function () {
                    var keys = [];
                    var rows = $("#Grid", ajaxContainerSelector).datagrid('getChecked');
                    if (rows.length == 0) { $.plugin.showMessage("请勾选要删除的项!"); }
                    else {
                        for (var i = 0; i < rows.length; i++) {
                            keys.push(rows[i].Key);
                        }
                        window.business.WorkSpaceBusinessFollow_aspx.delBusinessFollow(keys.join(','));
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
        $("#Grid", ajaxContainerSelector).datagrid(businessFollow_options);
    };
    var _bindButtonEvent = function () {
        $("#panel", ajaxContainerSelector).panel({
            title: '商务跟进记录',
            fit: true,
            border: false,
            tools: [{
                iconCls: 'layout-button-left',
                handler: function () { $("#divLayout", ajaxContainerSelector).layout("collapse", "west") }
            }]
        });
    };

    _bindControl();
    _bindButtonEvent();

    window.business.WorkSpaceBusinessFollow_aspx.delBusinessFollow = function (keys) {
        $.plugin.messager.confirm("提示", "点击确定将删除跟进记录<br />是否执行此操作？", function (fn) {
            if (fn) {
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("删除跟进记录成功。");
                        $("#Grid", ajaxContainerSelector).datagrid('clearSelections');
                        $("#Grid", ajaxContainerSelector).datagrid('clearChecked');
                        $("#Grid", ajaxContainerSelector).datagrid('reload');
                    } else {
                        $.plugin.showMessage("删除跟进记录失败。");
                    }
                };
                window.business.businessfollow.deleteBusinessFollow(keys, _callback);
            }
        });
    }

    window.business.WorkSpaceBusinessFollow_aspx.processBusinessFollow = function (key) {
        window.addTab({ title: "商务跟进管理", href: "Views/Business/BusinessFollowManage.aspx?key=" + key, iconCls: '', closable: true, selected: true });
    }
};
})(jQuery);