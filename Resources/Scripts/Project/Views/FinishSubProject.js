/*
==============================================================================
//  项目结案阶段 FinishSubProject.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.FinishSubProject_aspx) { window.project.FinishSubProject_aspx = new Object(); }
    window.project.FinishSubProject_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            window.project.subProject.getSubProjectByKey(key, function (subproject) {
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

                $("subprojectfd", ajaxContainerSelector).form('loadData', subproject);
                $("#txtSubName", ajaxContainerSelector).text(subproject.Name);
                $("#txtSubCode", ajaxContainerSelector).text(subproject.Code);
                $("#txtProjectKey", ajaxContainerSelector).text(_projectFormatter(subproject.ProjectKey));
                $("#selProjectType", ajaxContainerSelector).text(_projectsubtypeFormatter(subproject.TypeKey));
                $("#selProjectStage", ajaxContainerSelector).text(_projectsubstageFormatter(subproject.StageType));
                $("#selSubProjectStatus", ajaxContainerSelector).text(_projectsubstateFormatter(subproject.ProgressKey));
                $("#hdProjectStatusKey", ajaxContainerSelector).val(subproject.ProgressKey);
                $("#txtSubStartDate", ajaxContainerSelector).text(subproject.StartDate.toDate().format());
                $("#txtSubStopDate", ajaxContainerSelector).text(subproject.StopDate.toDate().format());
//                $("#txtSubRealStartDate", ajaxContainerSelector).text(subproject.RealStartDate.toDate().format());
//                $("#txtSubRealStopDate", ajaxContainerSelector).text(subproject.RealStopDate.toDate().format());
                $("#txtSubRemark", ajaxContainerSelector).text(subproject.Remark);
            });

        }

        window.project.FinishSubProject_aspx.finishSubProject = function (key, ProgressKey) {
            var roledata = $.plugin.getJsonDataRequestWebService("Services/Project/MappingService.asmx/GetRoleBySubProjectKeyEmpKey", { SubProjectKey: key });
            if (ProgressKey == 2) {
                $.plugin.showMessage("该项目已经结案！");
                return;
            }
            else if (roledata != "1" && roledata != "2") {
                $.plugin.showMessage("您没有权限结案！");
                return;
            }
            else {
                $('#disub').dialog({
                    title: "子项目结案",
                    closed: false,
                    cache: false,
                    modal: true,
                    buttons: [
                        { text: '结案', iconCls: 'icon-save', handler: function () {
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
                        }
                        },
                        { text: '关闭', iconCls: 'icon-close', handler: function () { $('#disub').dialog('close'); } }
                    ],
                    onOpen: function () {
                        $('#disub').dialog('refresh', 'Views/Project/SubProjectFinish.aspx?math=' + parseInt(Math.random() * 100000) + '&key=' + key);
                    },

                    width: 920,
                    height: 250
                });
            }
        }

        var _bindButtonEvent = function () {
            $("#btnSubmit", ajaxContainerSelector).click(function () {
                var ProgressKey = $("#hdProjectStatusKey", ajaxContainerSelector).val();
                window.project.FinishSubProject_aspx.finishSubProject(key, ProgressKey);
            });
        }

        _bindControl();
        _bindButtonEvent();

    }
})(jQuery);