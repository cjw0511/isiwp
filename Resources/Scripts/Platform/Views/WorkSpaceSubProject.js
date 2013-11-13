/*
==============================================================================
//  主页中子项目列表页面 WorkSpaceSubProject.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.WorkSpaceSubProject_aspx) { window.platform.WorkSpaceSubProject_aspx = new Object(); }
    window.platform.WorkSpaceSubProject_aspx.initPage = function (ajaxContainerSelector) {

        window.platform.WorkSpaceSubProject_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {

//            $("#selProgressKey", ajaxContainerSelector).combobox({
//                valueField: 'Key',
//                textField: "Name"
//            });
//            var progressdata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 51 });
//            progressdata.unshift({ Key: 1, Name: '正在实施' });
//            $("#selProgressKey", ajaxContainerSelector).combobox("loadData", progressdata).combobox("setValue", 1);

            $("#selStageType", ajaxContainerSelector).combobox({
                valueField: 'Value',
                textField: "Name"
            });
            var stagedata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 55 });
            stagedata.unshift({ Value: -1, Name: '全部' });
            $("#selStageType", ajaxContainerSelector).combobox("loadData", stagedata).combobox("setValue", -1);

            var _STFormatter = function (value) {
                var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 55 });
                if (value == "0") {
                    return "";
                }
                for (var i = 0; i < sexdata.length; i++) {
                    if (sexdata[i].Value == value) return sexdata[i].Name + "(" + value + ")";
                }
                return value;
            }

            $("#Grid", ajaxContainerSelector).datagrid({
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
                    Name: "",
                    StageType: function () { return $("#selStageType", ajaxContainerSelector).combotree("getValue"); },
                    ProgressKey: function () { return 1 },
                    ProjectName: ""
                },
                idField: 'Key',
                columns: [[
                { field: 'Name', title: '名称', width: 150, sortable: true },
                { field: 'StageType', title: '项目所处阶段', width: 150, sortable: true, formatter: _STFormatter },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var editbtn = $("<a title='处理更多'></a>").linkbutton({ plain: true, iconCls: "icon-edit" }).attr("onclick", 'javascript:window.platform.WorkSpaceSubProject_aspx.processSubProject(\'' + rowData.Key + '\');');
                        var div = $("<div></div>").append(editbtn);
                        return div.html();
                    }
                }
			]],
                animate: true,
                sortName: 'ProgressKey',
                sortOrder: 'asc',
                pagination: true
            });
        }

        var _bindButtonEvent = function () {
            $("#panel", ajaxContainerSelector).panel({
                title: '子项目列表',
                fit: true,
                border: false,
                tools: [{
                    iconCls: 'layout-button-left',
                    handler: function () { $("#divLayout", ajaxContainerSelector).layout("collapse", "west") }
                }]
            });

            $("#btnReset", ajaxContainerSelector).click(function () {
//                $("#selProgressKey", ajaxContainerSelector).combobox("setValue", "1");
                $("#selStageType", ajaxContainerSelector).combobox("setValue", "-1");
            });
            $("#btnRefresh", ajaxContainerSelector).click(function () {
                $("#Grid", ajaxContainerSelector).datagrid('reload');
            });
        }

        _bindControl();
        _bindButtonEvent();

        window.platform.WorkSpaceSubProject_aspx.processSubProject = function (key) {
            window.addTab({ title: "子项目列表", href: "Views/Project/SubProjectList.aspx?key=" + key, iconCls: '', closable: true, selected: true });
        }
    }
})(jQuery);