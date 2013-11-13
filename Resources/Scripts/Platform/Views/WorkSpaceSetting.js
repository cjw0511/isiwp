/*
==============================================================================
//  个人桌面设置 WorkSpaceSetting.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.WorkSpaceSetting_aspx) { window.platform.WorkSpaceSetting_aspx = new Object(); }

    window.platform.WorkSpaceSetting_aspx.initPage = function (ajaxContainerSelector) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            $("#panellist", ajaxContainerSelector).datagrid({
                fit: true,
                border: false,
                singleSelect: true,
                fitColumns: true,
                idField: 'Key',
                columns: [[
                { field: 'Key', hidden: true },
                { field: 'Title', title: '添加首页内容', width: 300,
                    formatter: function (value, rowData, rowIndex) {
                        return '<div style="position:relative;padding-left:5px;"><div class="panel-with-icon">' + value + '</div><div class="panel-icon ' + rowData.iconCls + '"></div></div>';
                    }
                },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var addbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-add" }).attr("onclick", 'javascript:window.platform.WorkSpace_aspx.addPortlets(\'' + rowData.Key + '\');');
                        var div = $("<div></div>").append(addbtn);
                        return div.html();
                    }
                }
			    ]]
            });

            window.platform.workspace.getPortletsForAdd(function (data) {
                $("#panellist", ajaxContainerSelector).datagrid("loadData", data);
            });
            window.platform.workspace.getUserWorkSpaceCols(function (data) {
                $("#selCols").combobox("setValue", data);
            });
        };

        var _bindButtonEvent = function () {
            $("#a_apply", ajaxContainerSelector).click(function () {
                window.platform.WorkSpace_aspx.setUserWorkSpaceCols($("#selCols").combobox("getValue"));
            });
        };

        _bindControl();
        _bindButtonEvent();

    };
})(jQuery);