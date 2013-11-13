/*
==============================================================================
//  项目计划书管理页面 ProjectFinishList.aspx 的页面控制层代码。
==============================================================================
*/

(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.ProjectFinishList_aspx) { window.project.ProjectFinishList_aspx = new Object(); }
    window.project.ProjectFinishList_aspx.initPage = function (ajaxContainerSelector) {
        var _planprojectFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Business/PlanProjectService.asmx/GetAllPlanProject", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) return data[i].Name;
            }
            return value;
        }
        var _projecttypeFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 58 });
            for (var i = 0; i < data.length; i++) {
                if (data[i].Value == value) return data[i].Name;
            }
            return value;
        }
        var _managerFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/UserService.asmx/GetAllUser", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) return data[i].Name;
            }
            return value;
        }
//        var _TechMgrFormatter = function (value) {
//            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/EmployeeService.asmx/GetAllEmployee", null);
//            for (var i = 0; i < data.length; i++) {
//                if (data[i].Key == value) return data[i].Name;
//            }
//            return value;
//        }
        var _BusiMgrFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/EmployeeService.asmx/GetAllEmployee", null);
            for (var i = 0; i < data.length; i++) {
                if (data[i].Key == value) return data[i].Name;
            }
            return value;
        }
//        var _CustomerFormatter = function (value) {
//            var data = $.plugin.getJsonDataRequestWebService("Services/Business/CustomerService.asmx/GetAllCustomer", null);
//            for (var i = 0; i < data.length; i++) {
//                if (data[i].Key == value) return data[i].Name;
//            }
//            return value;
//        }
        var _projectstateFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 56 });
            for (var i = 0; i < data.length; i++) {
                if (data[i].Value == value) return data[i].Name;
            }
            return value;
        }
        var _approvalFormatter = function (value) {
            var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 57 });
            for (var i = 0; i < data.length; i++) {
                if (data[i].Value == value) return data[i].Name;
            }
            return value;
        }

        var _bindControl = function () {
            $("#selProgressKey", ajaxContainerSelector).combobox({
                valueField: 'Key',
                textField: "Name"
            });
            var data = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 56 });
            data.unshift({ Key: -1, Name: '全部' });
            $("#selProgressKey", ajaxContainerSelector).combobox("loadData", data).combobox("setValue", -1);
            var options = {
                fit: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/ProjectService.asmx/LoadGridDataOfFinish'),
                searchButton: $("#btnSearch", ajaxContainerSelector),
                queryParams: {
                    name: function () { return $("#txtNameSearch", ajaxContainerSelector).val().trim(); },
                    ProgressKey: function () { return $("#selProgressKey", ajaxContainerSelector).combotree("getValue"); }
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
				{ field: 'Name', title: '项目名称', width: 150, sortable: true}]],
                columns: [[
                { field: 'Code', title: '项目编号', width: 100, sortable: true },
//                { field: 'CustomerKey', title: '所属客户', width: 120, sortable: true, formatter: _CustomerFormatter },
//                { field: 'CustomerMgr', title: '客户负责人', width: 90, sortable: true },
                { field: 'ProgressKey', title: '项目进度', width: 90, sortable: true, formatter: _projectstateFormatter },
                { field: 'StartDate', title: '项目启动时间', width: 120, sortable: true, formatter: function (val) { return val.toDate().format("yyyy-MM-dd"); } },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
//                        var flag = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectService.asmx/CheckSubProjectState", { key: rowData.Key });
//                        if (rowData.ProgressKey == 1 && flag == true) {
                            var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-ok" }).attr("onclick", 'javascript:window.project.ProjectFinishList_aspx.finishProject(\'' + rowData.Key + '\',\'' + rowData.ProgressKey + '\',\'' + rowData.ManagerKey + '\');');
//                        }
//                        else if (rowData.ProgressKey == 2) {
//                            var editbtn = $("<a></a>")
//                        }
//                        else {
//                            var editbtn = $("<a></a>").linkbutton({ disabled: true, plain: true, iconCls: "icon-edit" }).attr("title","项目进度为正在实施且所有子项目已结案才能进行项目结案！");
//                        }
                        var div = $("<div></div>").append(editbtn);
                        return div.html();
                    }
                }
			    ]],
                pageSize: 10,
                sortName: 'StartDate',
                sortOrder: 'desc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "结案：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.project.ProjectFinishList_aspx.finishProject(rowData.Key,rowData.ProgressKey,rowData.ManagerKey);
                    }
                }
                ]
            };
            $("#Grid", ajaxContainerSelector).datagrid(options);
            $('#Grid', ajaxContainerSelector).datagrid({
                onSelect: function (rowIndex, rowData) {
//                    $('#projectdiv', ajaxContainerSelector).panel('open');
//                    $('#subprojectdiv', ajaxContainerSelector).panel('close');
//                    $('#SubGrid', ajaxContainerSelector).datagrid('unselectAll');
                    window.project.ProjectFinishList_aspx.editProjectFinish(rowData.Key);
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
            $("#pp, ajaxContainerSelector").panel({
                tools: [{
                    iconCls: 'layout-button-bottom',
                    handler: function () { $("#dd", ajaxContainerSelector).layout("collapse", "south") }
                }]
            });
            $("#btnHelp", ajaxContainerSelector).click(function () {
                var _content = $("<div />").css({ "padding": "15px", "font-size": "15px"});
                _content.append($(this).next().html()).append("一、数据列表中所有项目均为有效项目；"+
                "<br/><br/>二、数据列表中所有项目不可编辑和删除；" +
                "<br/><br/>三、对大项目结案要满足三个条件：1，大项目还未结案；2，大项目下所有的子项目已经结案；3，当前登录用户在选中项目中角色是项目经理；" +
                "<br/><br/>四、对子项目结案要满足两个条件：1，子项目还未结案；2，当前登录用户在选中子项目中角色是项目经理或项目组长。");
                var dialog = $.plugin.showDialog({
                    title: "操作帮助",
                    width: 700,
                    height: 330,
                    autoCenter: false,
                    content: _content,
                    enableSaveButton: false,
                    enableApplyButton: false,
                    maximizable:false,
                    resizable: false
                });
                var pos = $(this).offset();
                $.extend(pos, { top: pos.top + 30, left: pos.left });
                $(dialog.dialog).panel("move", pos);
            });
        };
        _bindControl();
        _bindButtonEvent();

        window.project.ProjectFinishList_aspx.finishProject = function (key,ProgressKey,ManagerKey) {
            var ismanager = $.plugin.getJsonDataRequestWebService("Services/Project/ProjectService.asmx/IsManager", { UserKey: ManagerKey });
            var flag = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectService.asmx/CheckSubProjectState", { key: key });
            if(ProgressKey==2 && ismanager==true)
            {
                $('#di').dialog({
                    title: "项目还原",
                    href: "Views/Project/ProjectFinish.aspx?key=" + key,
                    buttons:[
                        {text:'还原',iconCls:'icon-redo',handler:function(){
                        var verifyResult = $('#di').form('validate');
                        if (!verifyResult) { return false };
                        var project = $('#di').form('getData');
                        $.extend(project, { ProgressKey: 1 });
                        $.extend(project, { Key: key });
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("还原成功。");
                                $("#Grid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("还原失败。");
                            }
                            $('#di').dialog('close');
                        };
                        window.project.project.finishProject(project, _callback);
                        }},
                        {text:'关闭',iconCls:'icon-close',handler:function(){$('#di').dialog('close');}}
                    ],
                    closed: false,  
                    cache: false,
                    modal: true,
                    width: 920,
                    height: 250
                });
            }
            else if(ismanager==false)
            {
                $.plugin.showMessage("您没有权限结案！");
                return;
            }
            else if(flag == false)
            {
                $.plugin.showMessage("该项目下还有未结案的子项目！");
                return;
            }
            else
            {
                $('#di').dialog({
                    title: "项目结案",
                    href: "Views/Project/ProjectFinish.aspx?key=" + key,
                    buttons:[
                        {text:'结案',iconCls:'icon-save',handler:function(){
                        var verifyResult = $('#di').form('validate');
                        if (!verifyResult) { return false };
                        var project = $('#di').form('getData');
                        $.extend(project, { ProgressKey: 2 });
                        $.extend(project, { Key: key });
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("项目结案成功。");
                                $("#Grid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("项目结案失败。");
                            }
                            $('#di').dialog('close');
                        };
                        window.project.project.finishProject(project, _callback);
                        }},
                        {text:'关闭',iconCls:'icon-close',handler:function(){$('#di').dialog('close');}}
                    ],
                    closed: false,  
                    cache: false,
                    modal: true,
                    width: 920,
                    height: 250
                });
            }
        }

        window.project.ProjectFinishList_aspx.editProjectFinish = function (key) {
            window.project.project.getProjectByKey(key, function (project) {
                $("projectfd", ajaxContainerSelector).form('loadData', project);
                $("#txtName", ajaxContainerSelector).text(project.Name);
                $("#txtCode", ajaxContainerSelector).text(project.Code);
                $("#txtPlanProject", ajaxContainerSelector).text(_planprojectFormatter(project.PlanProjKey));
//                $("#txtCustomer", ajaxContainerSelector).text(_CustomerFormatter(project.CustomerKey));
//                $("#txtTechMgr", ajaxContainerSelector).text(_TechMgrFormatter(project.TechMgrKey));
                $("#txtBusiMgr", ajaxContainerSelector).text(_BusiMgrFormatter(project.BusiMgrKey));
                $("#txtManager", ajaxContainerSelector).text(_managerFormatter(project.ManagerKey));
//                $("#txtCustomerMgr", ajaxContainerSelector).text(project.CustomerMgr);
                $("#selIsApproval", ajaxContainerSelector).text(_approvalFormatter(project.IsApproval));
                $("#selProjectStatus", ajaxContainerSelector).text(_projectstateFormatter(project.ProgressKey));
                $("#txtStartDate", ajaxContainerSelector).text(project.StartDate);
                $("#txtStopDate", ajaxContainerSelector).text(project.StopDate);
//                $("#txtRealStartDate", ajaxContainerSelector).text(project.RealStartDate);
//                $("#txtRealStopDate", ajaxContainerSelector).text(project.RealStopDate);
                $("#txtDescription", ajaxContainerSelector).text(project.Description);
                $("#txtRemark", ajaxContainerSelector).text(project.Remark);            
            });
            InitSubProject(key);
        }

        //首次加载客子项目列表
        var optionsfirst = {
            fit: true,
            singleSelect: true,
            checkOnSelect: false,
            selectOnCheck: false,
            border: false,
            rownumbers: true,
            nowrap: true,
            idField: 'Key',
            frozenColumns: [[{ field: 'ck', checkbox: true },
			{ field: 'Name', title: '子项目名称', width: 130, sortable: true}]],
            columns: [[
            { field: 'ProjectKey', title: '主项目名称', width: 120, sortable: true },
            { field: 'TypeKey', title: '子项目类型', width: 100, sortable: true },
            { field: 'ProgressKey', title: '子项目进度', width: 100, sortable: true },
            { field: 'StageType', title: '子项目阶段', width: 120, sortable: true },
            { field: 'StartDate', title: '计划启动时间', width: 120, sortable: true },
            { field: 'StopDate', title: '计划结束时间', width: 120, sortable: true },
            { field: 'opt', title: '操作', width: 60, align: 'center' }
            ]]
        }
        $("#SubGrid", ajaxContainerSelector).datagrid(optionsfirst);
        //--------------------------子项目验证---------------------------//
        ///定义验证规则
        $("#txtSubName", ajaxContainerSelector).validatebox({
            required: true
        });
        $("#txtSubCode", ajaxContainerSelector).validatebox({
            required: true
        });
        ///选择项目类型
        $("#selProjectType", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 58 }
        });
        $('#selProjectType', ajaxContainerSelector).combobox('select', '0');
        ///项目进度
        $("#selSubProjectStatus", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 56 }
        });
        $('#selSubProjectStatus', ajaxContainerSelector).combobox('select', '0');
        ///项目阶段
        $("#selProjectStage", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 55 }
        });
        $('#selProjectStage', ajaxContainerSelector).combobox('select', '0');
        //所属主项目
        $("#txtProjectKey", ajaxContainerSelector).searchbox({
            required: true,
            searcher: function (value) {
                var selected = $("#ProjectKey", ajaxContainerSelector).val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#ProjectKey", ajaxContainerSelector).val(selections[0].Key);
                        $("#txtProjectKey", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                //                window.project.showPlanProjectSelector(onEnterClick, selected);
            }
        });
        $("#txtProjectKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtProjectKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        //        $("#txtSubStartDate", ajaxContainerSelector).datebox({
        //            validType: 'shortDate'
        //        });
        //        $("#txtSubStopDate", ajaxContainerSelector).datebox({
        //            validType: 'shortDate'
        //        });
        //        $("#txtSubRealStartDate", ajaxContainerSelector).datebox({
        //            validType: 'shortDate'
        //        });
        //        $("#txtSubRealStopDate", ajaxContainerSelector).datebox({
        //            validType: 'shortDate'
        //        });
        var InitSubProject = function (key) {
            var _projectFormatter = function (value) {
                var data = $.plugin.getJsonDataRequestWebService("Services/Project/ProjectService.asmx/GetAllProject", null);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Key == value) return data[i].Name;
                }
                return value;
            }
            var _projectsubtypeFormatter = function (value) {
                var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 58 });
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Value == value) return data[i].Name;
                }
                return value;
            }
            var _projectsubstateFormatter = function (value) {
                var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 56 });
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Value == value) return data[i].Name;
                }
                return value;
            }
            var _projectsubstageFormatter = function (value) {
                var data = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 55 });
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Value == value) return data[i].Name;
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
                url: window.resolveUrl('Services/Project/SubProjectService.asmx/LoadGridDataOfSubProjManageByKey'),
                queryParams: {
                    Key: function () { return key; },
                },
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true },
			    { field: 'Name', title: '子项目名称', width: 130, sortable: true}]],
                columns: [[
                { field: 'ProjectKey', title: '主项目名称', width: 120, sortable: true, formatter: _projectFormatter },
                { field: 'TypeKey', title: '子项目类型', width: 100, sortable: true, formatter: _projectsubtypeFormatter },
                { field: 'ProgressKey', title: '子项目进度', width: 100, sortable: true, formatter: _projectsubstateFormatter },
                { field: 'StageType', title: '子项目阶段', width: 120, sortable: true, formatter: _projectsubstageFormatter },
                { field: 'StartDate', title: '计划启动时间', width: 120, sortable: true },
                { field: 'StopDate', title: '计划结束时间', width: 120, sortable: true },
                { field: 'opt', title: '操作', width: 60, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
//                        if (rowData.ProgressKey == 1) {
                            var editbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-ok" }).attr("onclick", 'javascript:window.project.ProjectFinishList_aspx.finishSubProject(\'' + rowData.Key + '\',\'' + rowData.ProgressKey + '\');');
//                        }
//                        else if (rowData.ProgressKey == 2) {
//                            var editbtn = $("<a></a>")
//                        }
//                        else {
//                            var editbtn = $("<a></a>").linkbutton({ disabled: true, plain: true, iconCls: "icon-edit" }).attr("title", "只有子项目进度为正在实施才能进行子项目结案！");
//                        }
                        var div = $("<div></div>").append(editbtn);
                        return div.html();
                    }
                }
                ]],
                sortName: 'Code',
                sortOrder: 'asc',
                pagination: true,
                rowContextMenus: [
                { text: function (e, rowIndex, rowData, eventData) {
                    return "结案：" + rowData.Name;
                },
                    iconCls: "icon-edit",
                    handler: function (e, rowIndex, rowData, eventData) {
                        window.project.ProjectFinishList_aspx.finishSubProject(rowData.Key, rowData.ProgressKey);
                    }
                }
                ]
            }
            $("#SubGrid", ajaxContainerSelector).datagrid(options);
//            $('#SubGrid', ajaxContainerSelector).datagrid({
//                onSelect: function (rowIndex, rowData) {
//                    window.project.subProject.getSubProjectByKey(rowData.Key, function (subproject) {
//                        $('#projectdiv', ajaxContainerSelector).panel('close');
//                        $('#subprojectdiv', ajaxContainerSelector).panel('open');
//                        $("subprojectfd", ajaxContainerSelector).form('loadData', subproject);
//                        $("#txtSubName", ajaxContainerSelector).val(subproject.Name);
//                        $("#txtSubCode", ajaxContainerSelector).val(subproject.Code);
//                        $("#ProjectKey", ajaxContainerSelector).val(subproject.ProjectKey);
//                        if (subproject.ProjectKey != '0' && subproject.ProjectKey != undefined) {
//                            window.project.project.getProjectByKey(subproject.ProjectKey, function (subproject) {
//                                if (subproject)
//                                    $("#txtProjectKey", ajaxContainerSelector).searchbox("setValue", subproject.Name);
//                            });
//                        }
//                        $("#selProjectType", ajaxContainerSelector).combobox("setValue", subproject.TypeKey);
//                        $("#selProjectStage", ajaxContainerSelector).combobox("setValue", subproject.StageType);
//                        $("#selSubProjectStatus", ajaxContainerSelector).combobox("setValue", subproject.ProgressKey);
//                        $("#txtSubStartDate", ajaxContainerSelector).val(subproject.StartDate);
//                        $("#txtSubStopDate", ajaxContainerSelector).val(subproject.StopDate);
//                        $("#txtSubRealStartDate", ajaxContainerSelector).val(subproject.RealStartDate);
//                        $("#txtSubRealStopDate", ajaxContainerSelector).val(subproject.RealStopDate);
//                        $("#txtSubRemark", ajaxContainerSelector).val(subproject.Remark);
//                    });
//                }
//            });
            $("#btnSubReset", ajaxContainerSelector).click(function () {
                $("#txtSubNameSearch", ajaxContainerSelector).val('');
            });
        };
        window.project.ProjectFinishList_aspx.finishSubProject = function (key, ProgressKey) {
            var roledata = $.plugin.getJsonDataRequestWebService("Services/Project/MappingService.asmx/GetRoleBySubProjectKeyEmpKey", { SubProjectKey: key });
            if(ProgressKey==2 && (roledata=="1" || roledata=="2"))
            {
                $('#disub').dialog({
                title: "子项目结案",
                    closed: false,  
                    cache: false,
                    modal: true,
                    buttons:[
                        {text:'还原',iconCls:'icon-redo',handler:function(){
                        var verifyResult = $('#disub').form('validate');
                        if (!verifyResult) { return false };
                        var subproject = $('#disub').form('getData');
                        $.extend(subproject, { ProgressKey: 1 });
                        $.extend(subproject, { Key: key });
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("还原成功。");
                                $("#SubGrid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("还原失败。");
                            }
                            $('#disub').dialog('close');
                        };
                        window.project.subProject.finishSubProject(subproject, _callback);
                        }},
                        {text:'关闭',iconCls:'icon-close',handler:function(){$('#disub').dialog('close');}}
                    ],
                    onOpen:function(){  
                        $('#disub').dialog('refresh', 'Views/Project/SubProjectFinish.aspx?math=' + parseInt(Math.random()*100000) + '&key=' + key);  
                    },
                    width: 920,
                    height: 250
                });
            }
            else if(roledata!="1" && roledata!="2")
            {
                $.plugin.showMessage("您没有权限结案！");
                return;
            }
            else
            {
                $('#disub').dialog({
                    title: "子项目结案",
                    closed: false,  
                    cache: false,
                    modal: true,
                    buttons:[
                        {text:'结案',iconCls:'icon-save',handler:function(){
                        var verifyResult = $('#disub').form('validate');
                        if (!verifyResult) { return false };
                        var subproject = $('#disub').form('getData');
                        $.extend(subproject, { ProgressKey: 2 });
                        $.extend(subproject, { Key: key });
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("子项目结案成功。");
                                $("#SubGrid", ajaxContainerSelector).datagrid('reload');
                            } else {
                                $.plugin.showMessage("子项目结案失败。");
                            }
                            $('#disub').dialog('close');
                        };
                        window.project.subProject.finishSubProject(subproject, _callback);
                        }},
                        {text:'关闭',iconCls:'icon-close',handler:function(){$('#disub').dialog('close');}}
                    ],
                    onOpen:function(){  
                        $('#disub').dialog('refresh', 'Views/Project/SubProjectFinish.aspx?math=' + parseInt(Math.random()*100000) + '&key=' + key);  
                    },

                    width: 920,
                    height: 250
                });
            }
        }
    }
})(jQuery);