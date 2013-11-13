/*
==============================================================================
//  子项目实施页面 SubProjectImpl.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectImpl_aspx) { window.project.SubProjectImpl_aspx = new Object(); }
    window.project.SubProjectImpl_aspx.initPage = function (ajaxContainerSelector, key) {
        window.project.SubProjectImpl_aspx.ajaxContainerSelector = ajaxContainerSelector;
        window.project.subProject.getSubProjectByKey(key, function (subporj) {
            var _bindControl = function () {
                if (subporj.StageType > 0) {
                    $("#btn1", ajaxContainerSelector).linkbutton('enable');
                    $("#btn1", ajaxContainerSelector).click(function () {
                        $("#StagePanel", ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectEvaluationPreparation.aspx?key=" + key));
                    });
                }
                if (subporj.StageType > 1) {
                    $("#btn2", ajaxContainerSelector).linkbutton('enable');
                    $("#btn2", ajaxContainerSelector).click(function () {
                        $("#StagePanel", ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectSolution.aspx?key=" + key));
                    });
                }
                if (subporj.StageType > 2) {
                    $("#btn3", ajaxContainerSelector).linkbutton('enable');
                    $("#btn3", ajaxContainerSelector).click(function () {
                        $("#StagePanel", ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectEvaluation.aspx?key=" + key)); //现场评测
                    });
                }
                if (subporj.StageType > 3) {
                    $("#btn4", ajaxContainerSelector).linkbutton('enable');
                    $("#btn4", ajaxContainerSelector).click(function () {
                        $("#StagePanel", ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectReport.aspx?key=" + key)); //报告编制
                    });
                    $("#btn5", ajaxContainerSelector).linkbutton('enable');
                    $("#btn5", ajaxContainerSelector).click(function () {
                        $("#StagePanel", ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectRectification.aspx?key=" + key)); //整改方案
                    });
                }
                if (subporj.StageType > 4) {
                    $("#btn6", ajaxContainerSelector).linkbutton('enable');
                    $("#btn6", ajaxContainerSelector).click(function () {
                        $("#StagePanel", ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/FinishSubProject.aspx?key=" + key)); //子项目结案
                    });
                }
                var dicP = window.platform.getDataDictionarySingleRecordByValue({ MainKey: 55, Value: subporj.StageType });
                $("#spnStage", ajaxContainerSelector).text(dicP.Name);

                window.project.subProject.getSubProjectByKey(key, function (subProject) {
                    $("#subName", ajaxContainerSelector).text(subProject.Name);
                    $("#subCode", ajaxContainerSelector).text(subProject.Code);
                    var dic = window.platform.getDataDictionarySingleRecord({ MainKey: 58, Key: subProject.TypeKey });
                    $("#subType", ajaxContainerSelector).text(dic.Name);
                    $("#subStartDate", ajaxContainerSelector).text(subProject.StartDate.toDate().format());
                    $("#subStopDate", ajaxContainerSelector).text(subProject.StopDate.toDate().format());
                    window.project.project.getProjectByKey(subProject.ProjectKey, function (project) {
                        $("#subMainProj", ajaxContainerSelector).text(project.Name);
                        $("#spnName", ajaxContainerSelector).text(project.Name);
                        $("#spnCode", ajaxContainerSelector).text(project.Code);
                        if (project.CustomerKey != '0' && project.CustomerKey != undefined) {
                            window.project.customer.getCustomerByKey(project.CustomerKey, function (customer) {
                                if (customer)
                                    $("#spnCustomer", ajaxContainerSelector).text(customer.Name);
                            });
                        };
                        if (project.PlanProjKey != '0' && project.PlanProjKey != undefined) {
                            window.project.planProject.getPlanProjectByKey(project.PlanProjKey, function (planProject) {
                                if (planProject)
                                    $("#spnPlanProject", ajaxContainerSelector).text(planProject.Name);
                            });
                        }
                        if (project.ManagerKey != '0' && project.ManagerKey != undefined) {
                            window.project.employee.getEmployeeByKey(project.ManagerKey, function (manager) {
                                if (manager)
                                    $("#spnManager", ajaxContainerSelector).text(manager.Name);
                            });
                        }
                        if (project.TechMgrKey != '0' && project.TechMgrKey != undefined) {
                            window.project.employee.getEmployeeByKey(project.TechMgrKey, function (techMgr) {
                                if (techMgr)
                                    $("#spnTechMgr", ajaxContainerSelector).text(techMgr.Name);
                            });
                        }
                        if (project.BusiMgrKey != '0' && project.BusiMgrKey != undefined) {
                            window.project.employee.getEmployeeByKey(project.BusiMgrKey, function (busiMgr) {
                                if (busiMgr)
                                    $("#spnBusiMgr", ajaxContainerSelector).text(busiMgr.Name);
                            });
                        }

                        $("#spnCustomerMgr", ajaxContainerSelector).text(project.CustomerMgr);
                        var dicApproval = window.platform.getDataDictionarySingleRecord({ MainKey: 57, Key: project.IsApproval });
                        $("#spnApproval", ajaxContainerSelector).text(dicApproval.Name);
                        var dicProgress = window.platform.getDataDictionarySingleRecord({ MainKey: 56, Key: project.ProgressKey });
                        $("#spnProgress", ajaxContainerSelector).text(dicProgress.Name);
                        $("#spnStartDate", ajaxContainerSelector).text(project.StartDate.toDate().format());
                        $("#spnStopDate", ajaxContainerSelector).text(project.StopDate.toDate().format());
                        $("#spnDescription", ajaxContainerSelector).text(project.Description);
                    });
                });

            }

            var _bindButtonEvent = function () {


            }

            _bindControl();
            _bindButtonEvent();

        });
    }
    window.project.SubProjectImpl_aspx.showGridDetail = function () {
        var _content = $("<div />").css({ "padding": "15px", "font-size": "15px" });
        _content.append($(this).next().html());
        var dialog = $.plugin.showDialog({
            title: "详细",
            width: 500,
            height: 250,
            autoCenter: false,
            content: _content,
            enableSaveButton: false,
            enableApplyButton: false
        });
        var pos = $(this).offset();
        $.extend(pos, { top: pos.top + 30, left: pos.left });
        $(dialog.dialog).panel("move", pos);
    }
})(jQuery);