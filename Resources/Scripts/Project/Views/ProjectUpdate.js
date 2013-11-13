/*
==============================================================================
//  项目编辑页面 ProjectUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.ProjectUpdate_aspx) { window.project.ProjectUpdate_aspx = new Object(); }
    window.project.ProjectUpdate_aspx.initPage = function (ajaxContainerSelector, key) {

        $("#txtName1", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'updateValidate["项目名称","Services/Project/ProjectService.asmx/ajaxAddValid","Name",' + key + ']']
        });
        $("#txtCode1", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['code', 'updateValidate["编号","Services/Project/ProjectService.asmx/ajaxAddValid","Code",' + key + ']']
        });
        $("#txtPlanProject9", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#PlanProject9").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#PlanProject9").val(selections[0].Key);
                        $("#txtPlanProject9").searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.project.showPlanProjectSelector(onEnterClick, selected);
            }
        });
        $("#txtPlanProject9", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select").attr("disabled", true);
        $("#txtPlanProject9", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtPlanProject9", ajaxContainerSelector).next(".searchbox").find("input").attr("disabled", true);
        $("#txtManager11", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#Manager11").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#Manager11").val(selections[0].Key);
                        $("#txtManager11").searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.project.showEmployeeSelector(onEnterClick, selected);
            }
        });
        $("#txtManager11", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtManager11", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

        $("#txtBusiMgr11", ajaxContainerSelector).searchbox({
            searcher: function (value) {
                var selected = $("#BusiMgr11").val();
                var onEnterClick = function (datagrid, selections) {
                    if (selections.length > 0) {
                        $("#BusiMgr11").val(selections[0].Key);
                        $("#txtBusiMgr11").searchbox("setValue", selections[0].Name);
                    } else {
                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
                        return false;
                    }
                };
                window.project.showEmployeeSelector(onEnterClick, selected);
            }
        });
        $("#txtBusiMgr11", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtBusiMgr11", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");

        $("#selIsApproval", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 57 }
        });
        $("#selIsApproval", ajaxContainerSelector).combobox("setValue", 0);
        $("#selProgress1", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 56 }
        });
        $("#selProgress1", ajaxContainerSelector).combobox("setValue", 0);
        $("#txtStartDate1", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtStopDate1", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });

        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        window.project.project.getProjectByKey(key, function (project) {

            if (project.IsApproval == 2) {
                $("#btnVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已被禁用，该有效审核操作无效");
                $("#btnForbidden", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已被禁用，该禁用操作无效");
                $("#btnSave", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已被禁用，该保存操作无效");
                $("#btnImpleVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已被禁用，该实施审核操作无效");
            } else if (project.IsApproval == 1) {
                if (project.ProgressKey == 1) {
                    $("#btnVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "已对项目有效性进行过审核操作，该有效审核操作无效");
                    $("#btnSave", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-save" }).attr("title", "这是对修改的项目进行保存操作");
                    $("#btnForbidden", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-edit" }).attr("title", "这是对项目的禁用操作,需要相关权限的人才可操作");
                    $("#btnImpleVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "已对项目实施状态进行过审核操作,该实施审核操作无效");
                } else if (project.ProgressKey == 2) {
                    $("#btnVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已经结案，该有效审核操作无效");
                    $("#btnForbidden", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已经结案，该项目禁用操作无效");
                    $("#btnSave", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已经结案，该保存操作无效");
                    $("#btnImpleVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已经结案，该实施审核操作无效");
                } else {
                    $("#btnVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "已对项目有效性进行过审核操作，该有效审核操作无效");
                    $("#btnSave", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-save" }).attr("title", "这是对修改的项目进行保存操作");
                    $("#btnForbidden", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-edit" }).attr("title", "这是对项目的禁用操作,需要相关权限的人才可操作");
                    $("#btnImpleVerify", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-edit" }).attr("title", "这是对项目实施状态的审核操作,需要相关权限的人才可操作");
                }
            } else {
                if (project.ProgressKey == 1) {
                    $("#btnVerify", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-edit" }).attr("title", "已对项目有效性进行过审核操作，该有效审核操作无效");
                    $("#btnSave", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-save" }).attr("title", "这是对修改的项目进行保存操作");
                    $("#btnForbidden", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-edit" }).attr("title", "这是对项目的禁用操作,需要相关权限的人才可操作");
                    $("#btnImpleVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "这是对项目实施状态的审核操作,该实施审核操作无效");
                } else if (project.ProgressKey == 2) {
                    $("#btnVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已经结案，该有效审核操作无效");
                    $("#btnForbidden", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已经结案，该项目禁用操作无效");
                    $("#btnSave", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已经结案，该保存操作无效");
                    $("#btnImpleVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已经结案，该实施审核操作无效");
                } else {
                    $("#btnVerify", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-edit" }).attr("title", "这是对项目有效性的审核操作，需要相关权限的人才可操作");
                    $("#btnSave", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-save" }).attr("title", "这是对修改的项目进行保存操作");
                    $("#btnForbidden", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-edit" }).attr("title", "这是对项目的禁用操作,需要相关权限的人才可操作");
                    $("#btnImpleVerify", ajaxContainerSelector).linkbutton({ disabled: false, plain: true, iconCls: "icon-edit" }).attr("title", "这是对项目实施状态的审核操作,需要相关权限的人才可操作");
                }
            }

            $("#PlanProject9", ajaxContainerSelector).val(project.PlanProjKey);
            if (project.PlanProjKey != '0' && project.PlanProjKey != undefined) {
                window.project.planProject.getPlanProjectByKey(project.PlanProjKey, function (planProject) {
                    if (planProject)
                        $("#txtPlanProject9", ajaxContainerSelector).searchbox("setValue", planProject.Name);
                    $("#txtPlanProject9", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                });
            }
            $("#Manager11", ajaxContainerSelector).val(project.ManagerKey);
            if (project.ManagerKey != '0' && project.ManagerKey != undefined) {
                window.project.employee.getEmployeeByKey(project.ManagerKey, function (manager) {
                    if (manager)
                        $("#txtManager11", ajaxContainerSelector).searchbox("setValue", manager.Name);
                    $("#txtManager11", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                });
            }
            $("#BusiMgr11", ajaxContainerSelector).val(project.BusiMgrKey);
            if (project.BusiMgrKey != '0' && project.BusiMgrKey != undefined) {
                window.project.employee.getEmployeeByKey(project.BusiMgrKey, function (busiMgr) {
                    if (busiMgr)
                        $("#txtBusiMgr11", ajaxContainerSelector).searchbox("setValue", busiMgr.Name);
                    $("#txtBusiMgr11", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true, validType: 'FullName' });
                });
            }

            $(ajaxContainerSelector).form('loadData', project);

        });
//        var _bindButtonEvent = function () {

            $("#b_clear", ajaxContainerSelector).click(function () {
                $("#PlanProject9", ajaxContainerSelector).val('0');
                $("#txtPlanProject9", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#c_clear", ajaxContainerSelector).click(function () {
                $("#Manager11", ajaxContainerSelector).val('0');
                $("#txtManager11", ajaxContainerSelector).searchbox("setValue", "");
            });

            $("#e_clear", ajaxContainerSelector).click(function () {
                $("#BusiMgr11", ajaxContainerSelector).val('0');
                $("#txtBusiMgr11", ajaxContainerSelector).searchbox("setValue", "");
            });
            
            $("#btnForbidden", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form("validate");
                if (!verifyResult) { return false };
                var project = $(ajaxContainerSelector).form('getData');
                $.extend(project, { Key: key });
                if (project.IsApproval == 2) {
                } else {
                    if (project.ProgressKey == 2) {

                    } else {
                        $.plugin.messager.confirm("提示", "点击确定将禁用<b><span style='color:red'>" + project.Name + "</span></b><br /><br/>是否执行此操作？", function (fn) {
                            if (fn) {
                                project.IsApproval = 2;
                                $("#selIsApproval", ajaxContainerSelector).combobox("setValue", 2);
                                $.plugin.showMessage("项目禁用成功。");
                                $("#ProjGrid", ajaxContainerSelector).datagrid('reload');
                                $("#btnVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已被禁用，该有效审核操作无效");
                                $("#btnSave", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已被禁用，该保存操作无效");
                                $("#btnForbidden", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已被禁用，该禁用操作无效");
                                $("#btnImpleVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "此项目已被禁用，该实施审核操作无效");
                                window.project.project.updateProject(project, _callback);
                            }
                        });
                    }
                }
                var _callback = function (success) {
                    if (success) {

                    } else {
                        $.plugin.showMessage("项目禁用失败。");
                    }
                };

            });
            $("#btnVerify", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form("validate");
                if (!verifyResult) { return false };
                var project = $(ajaxContainerSelector).form('getData');
                $.extend(project, { Key: key });
                if (project.IsApproval == 0) {
                    project.IsApproval = 1;
                    $("#selIsApproval", ajaxContainerSelector).combobox("setValue", 1);
                    $.plugin.showMessage("项目有效性审核通过。");
                    $("#ProjGrid", ajaxContainerSelector).datagrid('reload');
                    $("#btnVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "已对项目有效性进行过审查操作，该有效审核操作无效");
                    window.project.project.updateProject(project, _callback);
                }
                var _callback = function (success) {
                    if (success) {

                    } else {
                        $.plugin.showMessage("项目审查失败。");
                    }
                };
            });

            $("#btnImpleVerify", ajaxContainerSelector).click(function () {
                var verifyResult = $(ajaxContainerSelector).form("validate");
                if (!verifyResult) { return false };
                var project = $(ajaxContainerSelector).form('getData');
                
                $.extend(project, { Key: key });
                if (project.ProgressKey == 0) {
                    project.ProgressKey = 1;
                    $("#selProgress1", ajaxContainerSelector).combobox("setValue", 1);
                    $.plugin.showMessage("项目实施审核通过。");
                    $("#ProjGrid", ajaxContainerSelector).datagrid('reload');
                    $("#btnImpleVerify", ajaxContainerSelector).linkbutton('disable').attr("title", "已对项目实施进行过审核操作，该实施审核操作无效");
                    window.project.project.updateProject(project, _callback);
                }
                var _callback = function (success) {
                    if (success) {

                    } else {
                        $.plugin.showMessage("项目实施审核失败。");
                    }
                };
            });
//        };
//        _bindButtonEvent();
    };
})(jQuery);