/*
==============================================================================
//  子项目管理页面 SubProjectManage.aspx 的页面控制层代码。
==============================================================================
//*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectManage_aspx) { window.project.SubProjectManage_aspx = new Object(); }
    window.project.SubProjectManage_aspx.initPage = function (ajaxContainerSelector) {
        window.project.SubProjectManage_aspx.ajaxContainerSelector = ajaxContainerSelector;
        $("#selProgressKey1", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name"
        });
        var progressdata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 51 });
        progressdata.unshift({ Key: -1, Name: '全部' });
        $("#selProgressKey1", ajaxContainerSelector).combobox("loadData", progressdata).combobox("setValue", -1);

        $("#selStageType1", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name"
        });
        var stagedata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 55 });
        stagedata.unshift({ Key: -1, Name: '全部' });
        $("#selStageType1", ajaxContainerSelector).combobox("loadData", stagedata).combobox("setValue", -1);

        $("#selProjectKey1", ajaxContainerSelector).combogrid({
            title: '选择项目名称',
            fit: true,
            fitColumns: true,
            border: true,
            singleSelect: true,
            rownumbers: true,
            panelWidth: 430,
            panelHeight: 340,
            idField: 'Key',
            textField: 'Name',
            url: window.resolveUrl('Services/Project/ProjectService.asmx/LoadGridData'),
            queryParams: {
                name: ""
            },
            columns: [[
                { field: 'Name', title: '父项目名称', width: 250, sortable: true },
                { field: 'ProgressKey', title: '实施状态', width: 50, sortable: true }
			    ]],
            sortName: 'Code',
            sortOrder: 'asc',
            pagination: true
        });

        var _bindControl = function () {
            var options = {
                fit: true,
                fitColumns: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/SubProjectService.asmx/LoadGridDataOfSubProjectManage'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    Name: function () { return $("#txtName1", ajaxContainerSelector).val().trim(); },
                    StageType: function () { return $("#selStageType1", ajaxContainerSelector).combotree("getValue"); },
                    ProgressKey: function () { return $("#selProgressKey1", ajaxContainerSelector).combotree("getValue"); },
                    ProjectKey: function () { var key = $("#selProjectKey1", ajaxContainerSelector).combotree("getValue"); if (key.isNullOrWhiteSpace()) { key = -1 } return key }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '名称', width: 150, sortable: true}]],
                columns: [[
                { field: 'ProjectKey', title: '投标状态', width: 100, sortable: true },
                { field: 'ProgressKey', title: '投标时间', width: 90, sortable: true },
                { field: 'StageType', title: '投标负责人', width: 100, sortable: true }
			]],
                animate: true,
                onSelect: function (rowIndex, rowData) {
                    window.project.subProject.getSubProjectByKey(rowData.Key, function (subProject) {
                        $(ajaxContainerSelector).form('loadData', subProject);
                    });
                },
                sortName: 'ProgressKey',
                sortOrder: 'asc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "编辑：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.BiddingManage_aspx.editBidding(rowData.Key);
                    }
                },
                { text: function (e, rowIndex, rowData, eventData) {
                    return "删除：" + rowData.Name;
                },
                    iconCls: "icon-no",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.business.BiddingManage_aspx.delBidding(rowData.Key, rowData.Name);
                    }
                }
            ],
                toolbar: [{
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
            $("#panel, ajaxContainerSelector").panel({
                title: '子项目记录',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#divLayout", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });
            $("#btnReset", ajaxContainerSelector).click(function () {
                $("#txtName1", ajaxContainerSelector).val('');
                $("#selStageType1", ajaxContainerSelector).combobox("setValue", "-1");
                $("#selProgressKey1", ajaxContainerSelector).combobox("setValue", "-1");
                $("#selProjectKey1", ajaxContainerSelector).combogrid("clear");
            });
        };
        _bindControl();
        _bindButtonEvent();

    };

})(jQuery);
