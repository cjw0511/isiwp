/*
==============================================================================
//  子项目编辑页面 SubProjectUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectUpdate_aspx) { window.project.SubProjectUpdate_aspx = new Object(); }
    window.project.SubProjectUpdate_aspx.initPage = function (ajaxContainerSelector, key, progkey) {
        if (progkey >= 1) {
            $("#btnImplement", ajaxContainerSelector).linkbutton({ disabled: true, plain: true, iconCls: "icon-edit" }).attr("title", "此项已对项目实施状态进行过审核操作,该操作已被禁用");
        } else {
            $("#btnImplement", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-edit" }).attr("title", "此项是对项目实施状态的审核操作,需要相关权限的人才可操作");
        }
        $("#txtName4", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'updateValidate["项目名称","Services/Project/SubProjectService.asmx/ajaxAddValid","Name",' + key + ']']
        });
        $("#txtCode4", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['code', 'updateValidate["编号","Services/Project/SubProjectService.asmx/ajaxAddValid","Code",' + key + ']']
        });
        $("#selType4", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 58 }
        });
        $("#selType4", ajaxContainerSelector).combobox("setValue", 0);

        $("#selProgress4", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 56 }
        });
        $("#selProgress4", ajaxContainerSelector).combobox("setValue", 0);

        $("#selStageType4", ajaxContainerSelector).combobox({
            valueField: 'Value',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 55 }
        });
        $("#selStageType4", ajaxContainerSelector).combobox("setValue", 1);

        $("#txtStartDate4", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtStopDate4", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });

        $("#txtProjName4", ajaxContainerSelector).validatebox({
            required: true
        });
        var rowData = $("#ProjGrid", window.project.ProjectManage_aspx.ajaxContainerSelector).datagrid("getSelected");
        $("#txtProjName4", ajaxContainerSelector).val(rowData.Name);
        $("#ProjectKey4").val(rowData.Key);
        $("#txtRemark4", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        var _bindControl = function () {
            var subprojdata = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectService.asmx/GetAllSubProject", null);
            var roledata = $.plugin.getJsonDataRequestWebService("Services/Project/RoleService.asmx/GetAllRole", null);
            var userdata = $.plugin.getJsonDataRequestWebService('Services/Platform/UserService.asmx/GetAllUser', null);
            var options = {
                width: 625,
                fit: true,
                height: 300,
                fitColumns: true,
                border: false,
                rownumbers: true,
                singleSelect: true,
                nowrap: true,
                url: window.resolveUrl('Services/Project/MappingService.asmx/GetSubProjRoleEmpBySubProjKey'),
                queryParams: {
                    SubProjKey: function () { return key; }
                },
                idField: 'Key',
                columns: [[
                    { field: 'SubProjectKey', title: '子项目', width: 100, sortable: true, hidden: true, editor: "text",
                        formatter: function (value) {
                            for (var i = 0; i < subprojdata.length; i++) {
                                if (subprojdata[i].Key == value) { return subprojdata[i].Name; }
                            }
                            return "<span title='" + value + "'>" + value + "</span>"
                        }
                    },
                    { field: 'RoleKey', title: '项目角色', width: 100, sortable: true,
                        formatter: function (value) {
                            for (var i = 0; i < roledata.length; i++) {
                                if (roledata[i].Key == value) return roledata[i].Name;
                            }
                            return "<span title='" + value + "'>" + value + "</span>"
                        },
                        editor: {
                            type: 'combobox',
                            options: {
                                valueField: 'Key',
                                textField: 'Name',
                                data: roledata,
                                required: true
                            }
                        }
                    },
                    { field: 'EmployeeKey', title: '项目成员', width: 100, sortable: true,
                        formatter: function (value) {
                            for (var i = 0; i < userdata.length; i++) {
                                if (userdata[i].Key == value) return userdata[i].Name;
                            }
                            return "<span title='" + value + "'>" + value + "</span>"
                        },
                        editor: {
                            type: 'combogrid',
                            options: {
                                title: '选择成员名称',
                                fit: true,
                                fitColumns: true,
                                border: true,
                                rownumbers: true,
                                panelWidth: 350,
                                panelHeight: 250,
                                idField: 'Key',
                                textField: 'Name',
                                data: userdata,
                                columns: [[
                                { field: 'Name', title: '员工名称', width: 100, sortable: true },
                                { field: 'Code', title: '员工编码', width: 100, sortable: true }
                            ]],
                                required: true
                            }
                        }
                    },
                { field: 'opt', title: '操作', width: 80, align: 'center',
                    formatter: function (value, rowData, rowIndex) {
                        var addbtn = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-save" }).attr("onmouseover", "javascript:window.project.SubProjectUpdate_aspx.isSave = true;").attr("onmouseout", "javascript:window.project.SubProjectUpdate_aspx.isSave = false;").attr("title", "对选择项进行保存操作");
                        var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("onmouseover", "javascript:window.project.SubProjectUpdate_aspx.isDel = true;").attr("onmouseout", "javascript:window.project.SubProjectUpdate_aspx.isDel = false;").attr("title", "对选择项进行删除操作");
                        var div = $("<div></div>").append(addbtn).append(delspan);
                        return div.html();
                    }
                }
                ]],
                onClickRow: function (rowIndex, rowData) {
                    if (window.project.SubProjectUpdate_aspx.editRowIndex > -1) {
                        $('#dg', ajaxContainerSelector).datagrid('endEdit', window.project.SubProjectUpdate_aspx.editRowIndex);
                        window.project.SubProjectUpdate_aspx.editRowIndex = -1;
                    }
                    if (window.project.SubProjectUpdate_aspx.isSave) {
                        if (rowData.Key == null) {
                            window.project.SubProjectUpdate_aspx.editRowIndex = rowIndex;
                            $('#dg', ajaxContainerSelector).datagrid('selectRow', rowIndex).datagrid('beginEdit', rowIndex);
                            var verifyResult = $("#aa", ajaxContainerSelector).form("validate");
                            if (!verifyResult) { return false };
                            var _callback = function (success) {
                                if (success) {
                                    $.plugin.showMessage("添加角色成员成功！");
                                    $("#dg", ajaxContainerSelector).datagrid('reload');
                                } else {
                                    $.plugin.showMessage("添加角色成员失败！");
                                };
                            };
                            var detail = $.extend(rowData, { SubProjectKey: key });
                            window.project.subProject.addSubProjectRoleMapping(detail, _callback);
                            window.project.SubProjectUpdate_aspx.editRowIndex = rowIndex;
                            $('#dg', ajaxContainerSelector).datagrid('selectRow', rowIndex).datagrid('beginEdit', rowIndex);
                        }
                        else {
                            var verifyResult = $("#aa", ajaxContainerSelector).form("validate");
                            if (!verifyResult) { return false };
                            var _callback = function (success) {
                                if (success) {
                                    $.plugin.showMessage("修改角色成员成功！");
                                    $("#dg", ajaxContainerSelector).datagrid('reload');
                                } else {
                                    $.plugin.showMessage("修改角色成员失败！");
                                };
                            };
                            window.project.subProject.updateSubProjectRoleMapping(rowData, _callback);
                        }
                        window.project.SubProjectUpdate_aspx.isSave = false;
                    }
                    else if (window.project.SubProjectUpdate_aspx.isDel) {
                        if (rowData.Key == null) {
                            $('#dg', ajaxContainerSelector).datagrid('deleteRow', rowIndex);
                        }
                        else {
                            $.plugin.messager.confirm("提示", "你将删除该项<br/>是否执行此操作？", function (fn) {
                                if (fn) {
                                    var _callback = function (success) {
                                        if (success) {
                                            $.plugin.showMessage("删除该项成功。");
                                            $("#dg", ajaxContainerSelector).datagrid('reload');
                                        } else {
                                            $.plugin.showMessage("删除该项失败。");
                                        }
                                    };
                                    window.project.subProject.deleteSubProjectRoleMapping(rowData.Key, rowData.Key1, _callback);
                                }
                            });
                        }
                        window.project.SubProjectUpdate_aspx.isDel = false;
                    }
                    else {
                        window.project.SubProjectUpdate_aspx.editRowIndex = rowIndex;
                        $('#dg', ajaxContainerSelector).datagrid('selectRow', rowIndex).datagrid('beginEdit', rowIndex);
                    }
                },
                toolbar: [
                    {
                        text: '添加',
                        iconCls: 'icon-add',
                        handler: function () {
                            if (window.project.SubProjectUpdate_aspx.editRowIndex > -1) {
                                $('#dg', ajaxContainerSelector).datagrid('endEdit', window.project.SubProjectUpdate_aspx.editRowIndex);
                            }
                            var rows = $('#dg', ajaxContainerSelector).datagrid('getSelections');
                            var row = $('#dg', ajaxContainerSelector).datagrid('getSelected');
                            if (rows.length > 0) {
                                if (row.Key > 0) {
                                    $('#dg', ajaxContainerSelector).datagrid('appendRow', {});
                                } else {
                                    $.plugin.messager.alert("提示", "<div style='text-align:center;'><br/><span style='color:red;'><b>请先保存当前选择项，再进行添加空行！</b></span></div>", "warning");
                                }
                            } else {
                                $('#dg', ajaxContainerSelector).datagrid('appendRow', {});
                            }
                            var rowIndex = $('#dg', ajaxContainerSelector).datagrid('getRows').length - 1;
                            window.project.SubProjectUpdate_aspx.editRowIndex = rowIndex;
                            $('#dg', ajaxContainerSelector).datagrid('selectRow', rowIndex).datagrid('beginEdit', rowIndex);
                        }
                    }
                    ]
            };
            $("#dg", ajaxContainerSelector).datagrid(options);
        };
        var _bindButtonEvent = function () {
            $("#btnImplement", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form("validate");
                if (!verifyResult) { return false };
                var subProject = $(ajaxContainerSelector).form('getData');
                $.extend(subProject, { Key: key });
                if (subProject.ProgressKey == 0) {
                    subProject.ProgressKey = 1;
                    $("#selProgress4", ajaxContainerSelector).combobox("setValue", 1);
                    $.plugin.showMessage("子项目实施状态审核通过。");
                    $("#btnImplement", ajaxContainerSelector).linkbutton('disable').attr("title", "此项已对子项目实施进行过审核操作，该操作被禁用");
                    window.project.subProject.updateSubProject(subProject, _callback);
                }
                var _callback = function (success) {
                    if (success) {
                    } else {
                        $.plugin.showMessage("子项目实施状态审核失败。");
                    }
                };
            });
        };
        _bindControl();
        _bindButtonEvent();
        window.project.project.getSubProjectByKey(key, function (subProject) {
            $(ajaxContainerSelector).form('loadData', subProject);
        });
    };
})(jQuery);