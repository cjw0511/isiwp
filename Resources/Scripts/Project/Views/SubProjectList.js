/*
==============================================================================
//  子项目列表页面 SubProjectList.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectList_aspx) { window.project.SubProjectList_aspx = new Object(); }
    window.project.SubProjectList_aspx.initPage = function (ajaxContainerSelector) {

        window.project.SubProjectList_aspx.ajaxContainerSelector = ajaxContainerSelector;
        var _bindControl = function () {

            $("#selProgressKey", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name"
            });
            var progressdata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 51 });
            progressdata.unshift({ Key: -1, Name: '全部' });
            $("#selProgressKey", ajaxContainerSelector).combobox("loadData", progressdata).combobox("setValue", -1);

            $("#selStageType", ajaxContainerSelector).combobox({
                valueField: 'Value',
                textField: "Name"
            });
            var stagedata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 55 });
            stagedata.unshift({ Value: -1, Name: '全部' });
            $("#selStageType", ajaxContainerSelector).combobox("loadData", stagedata).combobox("setValue", -1);

            var progdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 56 });
            var _progFormatter = function (value) {
                for (var i = 0; i < progdata.length; i++) {
                    if (progdata[i].Key == value) { return progdata[i].Name; }
                }
                return value;
            };

            var progressdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 55 });
            var _progressFormatter = function (value) {
                if (value == "0") {
                    return "";
                }
                for (var i = 0; i < progressdata.length; i++) {
                    if (progressdata[i].Value == value) return progressdata[i].Name + "(" + value + ")";
                }
                return value;
            }
            var projectdata = $.plugin.getJsonDataRequestWebService("Services/Project/ProjectService.asmx/GetAllProject");
            var _projectFormatter = function (value) {
                if (value == "0") {
                    return "";
                }
                for (var i = 0; i < projectdata.length; i++) {
                    if (projectdata[i].Key == value) return projectdata[i].Name;
                }
                return value;
            }
            $("#SubProjectGrid", ajaxContainerSelector).datagrid({
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/SubProjectService.asmx/LoadGridDataOfSubProjectManage'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    Name: function () { return $("#txtN", ajaxContainerSelector).val(); },
                    StageType: function () { return $("#selStageType", ajaxContainerSelector).combotree("getValue"); },
                    ProgressKey: function () { return $("#selProgressKey", ajaxContainerSelector).combotree("getValue"); },
                    ProjectName: function () { return $("#txtProjectName", ajaxContainerSelector).val(); }
                },
                idField: 'Key',
                columns: [[
                { field: 'Name', title: '名称', width: 150, sortable: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'ProjectKey', title: '所属项目', width: 110, sortable: true, formatter: _projectFormatter },
                { field: 'StageType', title: '项目所处阶段', width: 110, sortable: true, formatter: _progressFormatter },
                { field: 'StartDate', title: '项目启动时间', width: 120, sortable: true, formatter: function (val) { return val.toDate().format("yyyy-MM-dd"); } },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var enterbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-add" }).attr("title", "进入项目").attr("onclick", 'javascript:window.project.SubProjectList_aspx.enterSubProject(\'' + rowData.Key + '\',\'' + rowData.Name + '\');');
                        var div = $("<div></div>").append(enterbtn);
                        return div.html();
                    }
                }
			]],
                animate: true,
                onSelect: function (rowIndex, rowData) {
                    window.project.subProject.getSubProjectByKey(rowData.Key, function (subProject) {
                        $(ajaxContainerSelector).form('loadData', subProject);
                        window.project.project.getProjectByKey(subProject.ProjectKey, function (project) {
                            $("#txtMainProj", ajaxContainerSelector).text(project.Name);
                        });
                        var dic = window.platform.getDataDictionarySingleRecord({ MainKey: 58, Key: subProject.TypeKey });
                        $("#txtType", ajaxContainerSelector).text(dic.Name);
                        $("#txtStartDate", ajaxContainerSelector).text(subProject.StartDate.toDate().format());
                        $("#txtStopDate", ajaxContainerSelector).text(subProject.StopDate.toDate().format());

                        $("#MenberGrid", ajaxContainerSelector).datagrid("options").url = window.resolveUrl('Services/Project/MappingService.asmx/GetSubProjRoleEmpBySubProjKey');
                        $("#MenberGrid", ajaxContainerSelector).datagrid("load", { SubProjKey: rowData.Key });

                    });
                },
                sortName: 'StartDate',
                sortOrder: 'desc',
                pagination: true,
                rowContextMenus: [
                //                { text: function (e, rowIndex, rowData, eventData) {
                //                    return "编辑：" + rowData.Name;
                //                },
                //                    iconCls: "icon-edit",
                //                    handler: function (e, rowIndex, rowData, eventData) {
                //                        window.business.BiddingManage_aspx.editBidding(rowData.Key);
                //                    }
                //                },
                //                { text: function (e, rowIndex, rowData, eventData) {
                //                    return "删除：" + rowData.Name;
                //                },
                //                    iconCls: "icon-no",
                //                    handler: function (e, rowIndex, rowData, eventData) {
                //                        window.business.BiddingManage_aspx.delBidding(rowData.Key, rowData.Name);
                //                    }
                //                }
            ],
                toolbar: [{
                    id: 'btnrefresh',
                    text: '刷新',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        $("#SubProjectGrid", ajaxContainerSelector).datagrid('reload');
                    }
                }]
            });

            var roledata = $.plugin.getJsonDataRequestWebService("Services/Project/RoleService.asmx/GetAllRole");
            var userdata = $.plugin.getJsonDataRequestWebService('Services/Platform/UserService.asmx/GetAllUser');
            $("#MenberGrid", ajaxContainerSelector).datagrid({
                title: '项目角色成员列表',
                fit: true,
                //                fitColumns: true,
                border: false,
                rownumbers: true,
                singleSelect: true,
                columns: [[
                    { field: 'RoleKey', title: '项目角色', width: 200, sortable: true,
                        formatter: function (value) {
                            for (var i = 0; i < roledata.length; i++) {
                                if (roledata[i].Key == value) return roledata[i].Name;
                            }
                            return value;
                        }
                    },
                    { field: 'EmployeeKey', title: '项目成员', width: 200, sortable: true,
                        formatter: function (value) {
                            for (var i = 0; i < userdata.length; i++) {
                                if (userdata[i].Key == value) return userdata[i].Name;
                            }
                            return value;
                        }
                    }
                    ]]
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
        }

        _bindControl();
        _bindButtonEvent();

        window.project.SubProjectList_aspx.enterSubProject = function (key, name) {
            window.addTab({ title: "项目实施 - " + name, href: "Views/Project/SubProjectImpl.aspx?key=" + key, iconCls: '', closable: true, selected: true });

        }
    }
})(jQuery);