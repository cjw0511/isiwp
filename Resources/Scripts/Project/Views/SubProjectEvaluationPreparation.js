/*
==============================================================================
//  子项目测评准备页面 SubProjectEvaluationPreparation.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {

    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectEvaluationPreparation_aspx) { window.project.SubProjectEvaluationPreparation_aspx = new Object(); }
    window.project.SubProjectEvaluationPreparation_aspx.initPage = function (ajaxContainerSelector, key) {
        var _bindControl = function () {
            _filldata();
        }

        var _bindButtonEvent = function () {

            $("#btnDown", ajaxContainerSelector).click(function () {
                window.project.DownLoadFile(window.resolveUrl('Services/Project/DocumentService.asmx/DownLoadFileByUrl'), { Path: "/Upload/Document/基本情况调查表模版.xlsx" });
            });

            $("#btnImport", ajaxContainerSelector).click(function () {
                window.platform.showUploadWindow({ title: "基本情况调查表导入" }, {
                    width: 100,
                    height: 20,
                    formData: { SubProjKey: key },
                    swf: 'Resources/Plugins/uploadify/uploadify.swf',
                    uploader: 'Services/Project/SubProjectSurtableService.asmx/ImportSurveyTableFile',
                    buttonText: '浏览文件',
                    multi: false,
                    uploadLimit: 1,
                    fileTypeDesc: 'excel',
                    fileTypeExts: '*.xls;*.xlsx;',
                    onUploadSuccess: function () {
                        _filldata();
                    }
                });
            });
            //保存单位基本情况
            $("#btnSaveUnitBaseInfo", ajaxContainerSelector).click(function () {
                var param = {
                    SubProjKey: key,
                    UnitFullName: $("#UnitFullName", ajaxContainerSelector).val(),
                    SuperiorDept: $("#SuperiorDept", ajaxContainerSelector).val(),
                    UnitSummary: $("#UnitSummary", ajaxContainerSelector).val(),
                    UnitAddress: $("#UnitAddress", ajaxContainerSelector).val(),
                    UnitWebSite: $("#UnitWebSite", ajaxContainerSelector).val(),
                    ZipCode: $("#ZipCode", ajaxContainerSelector).val(),
                    ResponsibleDept: $("#ResponsibleDept", ajaxContainerSelector).val(),
                    OfficeAddress: $("#OfficeAddress", ajaxContainerSelector).val(),
                    UnitMgr: $("#UnitMgr", ajaxContainerSelector).val(),
                    UnitMgrPosition: $("#UnitMgrPosition", ajaxContainerSelector).val(),
                    UnitMgrTel: $("#UnitMgrTel", ajaxContainerSelector).val(),
                    UnitMgrPhone: $("#UnitMgrPhone", ajaxContainerSelector).val(),
                    InfoMgr: $("#InfoMgr", ajaxContainerSelector).val(),
                    InfoMgrPosition: $("#InfoMgrPosition", ajaxContainerSelector).val(),
                    InfoMgrTel: $("#InfoMgrTel", ajaxContainerSelector).val(),
                    InfoMgrPhone: $("#InfoMgrPhone", ajaxContainerSelector).val(),
                    ResponsibleDeptSummary: $("#ResponsibleDeptSummary", ajaxContainerSelector).val(),
                    DeptMgr: $("#DeptMgr", ajaxContainerSelector).val(),
                    DeptMgrTel: $("#DeptMgrTel", ajaxContainerSelector).val(),
                    DeptMgrPhone: $("#DeptMgrPhone", ajaxContainerSelector).val(),
                    DeptMgrEmail: $("#DeptMgrEmail", ajaxContainerSelector).val(),
                    WorkMgr: $("#WorkMgr", ajaxContainerSelector).val(),
                    WorkMgrTel: $("#WorkMgrTel", ajaxContainerSelector).val(),
                    WorkMgrPhone: $("#WorkMgrPhone", ajaxContainerSelector).val(),
                    WorkMgrEmail: $("#WorkMgrEmail", ajaxContainerSelector).val()
                }
                window.project.surveytable.saveUnitBaseInfo(param, function (success) {
                    if (success) {
                        $.plugin.showMessage("保存成功。");
                    } else {
                        $.plugin.showMessage("保存失败。");
                    }
                });
            });
            //保存信息系统安全管理情况
            $("#btnSaveInfoSystemSafeManageSituation", ajaxContainerSelector).click(function () {
                var datalist = _getTable($("#InfoSystemSafeManageSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        SystemName: datalist[i][0],
                        ProtectionLevel: datalist[i][1],
                        BusiSafeLevel: datalist[i][2],
                        SystemSafeLevel: datalist[i][3],
                        SystemSafeManageDeptBuild: datalist[i][4],
                        SystemSafeManageDeptOperation: datalist[i][5],
                        SystemSafeManageDeptUser: datalist[i][6],
                        SystemServiceRange: datalist[i][7],
                        ContainChildSystem: datalist[i][8]
                    }
                    $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveInfoSystemSafeManageSituation", param);
                }
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteInfoSystemSafeManageSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                $.plugin.showMessage("保存成功");
            });
            //保存系统运维安全管理人员情况
            $("#btnSaveInfoSystemSafeManagePersonSituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteInfoSystemSafeManagePersonSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#InfoSystemSafeManagePersonSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        SystemName: datalist[i][0],
                        Department: datalist[i][1],
                        Name: datalist[i][2],
                        WorkContent: datalist[i][3],
                        Position: datalist[i][4],
                        Tel: datalist[i][5],
                        Phone: datalist[i][6],
                        Email: datalist[i][7],
                        Remark: datalist[i][8]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveInfoSystemSafeManagePersonSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存物理环境情况
            $("#btnSavePhysicalEnvironmentSituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeletePhysicalEnvironmentSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#PhysicalEnvironmentSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        Name: datalist[i][0],
                        Location: datalist[i][1],
                        RelateSystem: datalist[i][2]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SavePhysicalEnvironmentSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存网络拓扑图
            $("#btnSaveNetTopology", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteNetTopology", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#NetTopology", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        NetName: datalist[i][0],
                        Remark: datalist[i][1]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveNetTopology", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存网络结构（环境）情况调查
            $("#btnSaveNetStructureSituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteNetStructureSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#NetStructureSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        NetRegionName: datalist[i][0],
                        MainFunction: datalist[i][1],
                        IpRange: datalist[i][2],
                        ServerQuantity: datalist[i][3],
                        TerminalQuantity: datalist[i][4],
                        ConnectedNetRegion: datalist[i][5],
                        InterconnectionDev: datalist[i][6],
                        ManageDept: datalist[i][7],
                        Remark: datalist[i][8]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveNetStructureSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存网络区域边界情况调查
            $("#btnSaveNetRegionBoundarySituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteNetRegionBoundarySituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#NetRegionBoundarySituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        RegionName: datalist[i][0],
                        BoundaryDevName: datalist[i][1],
                        BoundaryDevIP: datalist[i][2],
                        ConnectedNetRegion: datalist[i][3],
                        ConnectedLineType: datalist[i][4],
                        LineBandwidth: datalist[i][5],
                        Remark: datalist[i][6]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveNetRegionBoundarySituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存网络设备情况调查
            $("#btnSaveNetDevSituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteNetDevSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#NetDevSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        NetDevName: datalist[i][0],
                        Type: datalist[i][1],
                        IP: datalist[i][2],
                        MainPurpose: datalist[i][3],
                        BelongtoNetRegion: datalist[i][4],
                        Management: datalist[i][5],
                        PhysicalLocation: datalist[i][6],
                        IsHotBackup: datalist[i][7],
                        ImportanceC: datalist[i][8],
                        ImportanceI: datalist[i][9],
                        ImportanceA: datalist[i][10]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveNetDevSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存网络安全设备(软件)情况调查
            $("#btnSaveNetSafeDevSituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteNetSafeDevSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#NetSafeDevSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        NetDevName: datalist[i][0],
                        Type: datalist[i][1],
                        IP: datalist[i][2],
                        MainPurpose: datalist[i][3],
                        PhysicalLocation: datalist[i][4],
                        BelongtoNetRegion: datalist[i][5],
                        Management: datalist[i][6],
                        IsHotBackup: datalist[i][7],
                        ImportanceC: datalist[i][8],
                        ImportanceI: datalist[i][9],
                        ImportanceA: datalist[i][10]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveNetSafeDevSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存服务器设备情况调查
            $("#btnSaveServerDevSituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteServerDevSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#ServerDevSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        ServerDevName: datalist[i][0],
                        Type: datalist[i][1],
                        IP: datalist[i][2],
                        SystemVersion: datalist[i][3],
                        DataBaseVersion: datalist[i][4],
                        BusinessApplication: datalist[i][5],
                        BusinessData: datalist[i][6],
                        PhysicalLocation: datalist[i][7],
                        BelongtoNetRegion: datalist[i][8],
                        IsHotBackup: datalist[i][9],
                        ImportanceC: datalist[i][10],
                        ImportanceI: datalist[i][11],
                        ImportanceA: datalist[i][12]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveServerDevSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存管理终端设备情况调查
            $("#btnSaveTerminalDevSituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteTerminalDevSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#TerminalDevSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        TerminalDevName: datalist[i][0],
                        Type: datalist[i][1],
                        IP: datalist[i][2],
                        OperatingSystem: datalist[i][3],
                        MainPurpose: datalist[i][4],
                        PhysicalLocation: datalist[i][5],
                        BelongtoNetRegion: datalist[i][6],
                        ImportanceC: datalist[i][7],
                        ImportanceI: datalist[i][8],
                        ImportanceA: datalist[i][9]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveTerminalDevSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存业务数据情况调查
            $("#btnSaveBusinessDataSituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteBusinessDataSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#BusinessDataSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        BusinessDataName: datalist[i][0],
                        BusinessApplication: datalist[i][1],
                        DataQuantity: datalist[i][2],
                        DataStorageDev: datalist[i][3],
                        BackupMethod: datalist[i][4],
                        BackupMode: datalist[i][5],
                        BackupCycle: datalist[i][6],
                        OffsiteSave: datalist[i][7],
                        ImportanceC: datalist[i][8],
                        ImportanceI: datalist[i][9],
                        ImportanceA: datalist[i][10],
                        Remark: datalist[i][11]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveBusinessDataSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存应用系统情况调查
            $("#btnSaveApplicationSystemSituation", ajaxContainerSelector).click(function () {
                var isdel = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/DeleteApplicationSystemSituation", { SubProjKey: key });
                if (!isdel) {
                    $.plugin.showMessage("保存失败!");
                    return;
                }
                var datalist = _getTable($("#ApplicationSystemSituation", ajaxContainerSelector));
                if (datalist.length == 0) {
                    $.plugin.showMessage("保存成功!");
                }
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        SubProjKey: key,
                        SystemName: datalist[i][0],
                        BusinessData: datalist[i][1],
                        MainPurpose: datalist[i][2],
                        SoftwareName: datalist[i][3],
                        MiddlewareName: datalist[i][4],
                        Developers: datalist[i][5],
                        csOrbs: datalist[i][6],
                        DayRunning: datalist[i][7],
                        UserAmount: datalist[i][8],
                        ImportanceC: datalist[i][9],
                        ImportanceI: datalist[i][10],
                        ImportanceA: datalist[i][11]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveApplicationSystemSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功,共保存" + total + "条!");
                        }
                        else {
                            var left = datalist.length - total;
                            $.plugin.showMessage("保存失败,共保存" + total + "条,剩余" + left + "条未保存!");
                        }
                    };
                }
            });
            //保存管理类文档情况调查
            $("#btnSaveManageDocumentSituation", ajaxContainerSelector).click(function () {
                var datalist = _getDocumentTable($("#ManageDocumentSituation", ajaxContainerSelector));
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        Key: datalist[i][0],
                        DocumentName: datalist[i][1],
                        Remark: datalist[i][2]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveManageDocumentSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功");
                        }
                        else {
                            $.plugin.showMessage("保存失败");
                        }
                    };
                }
            });
            //保存记录类文档情况调查
            $("#btnSaveRecordDocumentSituation", ajaxContainerSelector).click(function () {
                var datalist = _getDocumentTable($("#RecordDocumentSituation", ajaxContainerSelector));
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        Key: datalist[i][0],
                        DocumentName: datalist[i][1]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveRecordDocumentSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功");
                        }
                        else {
                            $.plugin.showMessage("保存失败");
                        }
                    };
                }
            });
            //保存证据类文档情况
            $("#btnSaveEvidenceDocumentSituation", ajaxContainerSelector).click(function () {
                var datalist = _getDocumentTable($("#EvidenceDocumentSituation", ajaxContainerSelector));
                var total = 0;
                for (var i = 0; i < datalist.length; i++) {
                    var param = {
                        Key: datalist[i][0],
                        DocumentName: datalist[i][1]
                    }
                    var success = $.plugin.getJsonDataRequestWebService("Services/Project/SubProjectSurtableService.asmx/SaveEvidenceDocumentSituation", param);
                    if (success) {
                        total = total + 1;
                    }
                    if (i == datalist.length - 1) {
                        if (total == datalist.length) {
                            $.plugin.showMessage("保存成功");
                        }
                        else {
                            $.plugin.showMessage("保存失败");
                        }
                    };
                }
            });
            $("#btnSubmit", ajaxContainerSelector).click(function () {
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("测评准备完结操作成功，您现在可以进入 作业指导书编制阶段。");
                        $("#btn2", window.project.SubProjectImpl_aspx.ajaxContainerSelector).linkbutton('enable');
                        $("#btn2", window.project.SubProjectImpl_aspx.ajaxContainerSelector).click(function () {
                            $("#StagePanel", window.project.SubProjectImpl_aspx.ajaxContainerSelector).panel("refresh", window.resolveUrl("Views/Project/SubProjectSolution.aspx?key=" + key));
                        });
                    } else {
                        $.plugin.showMessage("测评准备完结操作失败。");
                    };
                }

                window.project.subProject.confirmStageFinish({ SubProjectKey: key, Stage: 1 }, _callback);
            });
        }
        var _filldata = function () {
            window.project.surveytable.getSurveyTableData({ SubProjKey: key }, function (data) {
                //填充单位基本情况
                _fillUnitBaseInfo(data.UnitBaseInfo);
                //填充信息系统安全管理情况
                _fillTable($("#InfoSystemSafeManageSituation", ajaxContainerSelector), data.InfoSystemSafeManageSituation);
                //填充信息系统安全管理人员情况
                _fillTable($("#InfoSystemSafeManagePersonSituation", ajaxContainerSelector), data.InfoSystemSafeManagePersonSituation);
                //填充物理环境情况
                _fillTable($("#PhysicalEnvironmentSituation", ajaxContainerSelector), data.PhysicalEnvironmentSituation);
                //填充网络拓扑图
                _fillTable($("#NetTopology", ajaxContainerSelector), data.NetTopology);
                //填充网络结构（环境）情况调查
                _fillTable($("#NetStructureSituation", ajaxContainerSelector), data.NetStructureSituation);
                //填充网络区域边界情况调查
                _fillTable($("#NetRegionBoundarySituation", ajaxContainerSelector), data.NetRegionBoundarySituation);
                //填充网络设备情况调查
                _fillTable($("#NetDevSituation", ajaxContainerSelector), data.NetDevSituation);
                //填充网络安全设备(软件)情况调查
                _fillTable($("#NetSafeDevSituation", ajaxContainerSelector), data.NetSafeDevSituation);
                //填充服务器设备情况调查
                _fillTable($("#ServerDevSituation", ajaxContainerSelector), data.ServerDevSituation);
                //填充管理终端设备情况调查
                _fillTable($("#TerminalDevSituation", ajaxContainerSelector), data.TerminalDevSituation);
                //填充业务数据情况调查
                _fillTable($("#BusinessDataSituation", ajaxContainerSelector), data.BusinessDataSituation);
                //填充应用系统情况调查
                _fillTable($("#ApplicationSystemSituation", ajaxContainerSelector), data.ApplicationSystemSituation);
                //填充管理类文档情况调查
                _fillDocumentTable($("#ManageDocumentSituation", ajaxContainerSelector), data.ManageDocumentSituation);
                //填充记录类文档情况
                _fillDocumentTable($("#RecordDocumentSituation", ajaxContainerSelector), data.RecordDocumentSituation);
                //填充证据类文档情况
                _fillDocumentTable($("#EvidenceDocumentSituation", ajaxContainerSelector), data.EvidenceDocumentSituation);
            });
        }

        _bindControl();
        _bindButtonEvent();

        var _fillUnitBaseInfo = function (unitdata) {
            if (!unitdata) {
                return;
            }
            $("#UnitFullName", ajaxContainerSelector).val(unitdata.UnitFullName);
            $("#SuperiorDept", ajaxContainerSelector).val(unitdata.SuperiorDept);
            $("#UnitSummary", ajaxContainerSelector).val(unitdata.UnitSummary);
            $("#UnitAddress", ajaxContainerSelector).val(unitdata.UnitAddress);
            $("#UnitWebSite", ajaxContainerSelector).val(unitdata.UnitWebSite);
            $("#ZipCode", ajaxContainerSelector).val(unitdata.ZipCode);
            $("#ResponsibleDept", ajaxContainerSelector).val(unitdata.ResponsibleDept);
            $("#OfficeAddress", ajaxContainerSelector).val(unitdata.OfficeAddress);
            $("#UnitMgr", ajaxContainerSelector).val(unitdata.UnitMgr);
            $("#UnitMgrPosition", ajaxContainerSelector).val(unitdata.UnitMgrPosition);
            $("#UnitMgrTel", ajaxContainerSelector).val(unitdata.UnitMgrTel);
            $("#UnitMgrPhone", ajaxContainerSelector).val(unitdata.UnitMgrPhone);
            $("#InfoMgr", ajaxContainerSelector).val(unitdata.InfoMgr);
            $("#InfoMgrPosition", ajaxContainerSelector).val(unitdata.InfoMgrPosition);
            $("#InfoMgrTel", ajaxContainerSelector).val(unitdata.InfoMgrTel);
            $("#InfoMgrPhone", ajaxContainerSelector).val(unitdata.InfoMgrPhone);
            $("#ResponsibleDeptSummary", ajaxContainerSelector).val(unitdata.ResponsibleDeptSummary);
            $("#DeptMgr", ajaxContainerSelector).val(unitdata.DeptMgr);
            $("#DeptMgrTel", ajaxContainerSelector).val(unitdata.DeptMgrTel);
            $("#DeptMgrPhone", ajaxContainerSelector).val(unitdata.DeptMgrPhone);
            $("#DeptMgrEmail", ajaxContainerSelector).val(unitdata.DeptMgrEmail);
            $("#WorkMgr", ajaxContainerSelector).val(unitdata.WorkMgr);
            $("#WorkMgrTel", ajaxContainerSelector).val(unitdata.WorkMgrTel);
            $("#WorkMgrPhone", ajaxContainerSelector).val(unitdata.WorkMgrPhone);
            $("#WorkMgrEmail", ajaxContainerSelector).val(unitdata.WorkMgrEmail);
        }
        var _fillTable = function (table, data) {
            var tbody = table.children("tbody");
            tbody.children("tr").remove();
            $.each(data, function (index, element) {
                delete element.ID;
                delete element.Key;
                delete element.SubProjectKey;
                delete element.Flag;
                delete element.Status;
                var tr = $("<tr></tr>");
                for (var key in element) {
                    var td = $('<input type="text" />').val(element[key]);
                    tr.append($('<td></td>').append(td));
                }
                tr.append('<td style="width:100px;text-align:center"><a href="javascript:void(0)" style="color:Blue;" onclick="$(this).parent().parent().remove();">删除行</a></td>');
                tbody.append(tr);
            })
        }
        var _fillDocumentTable = function (table, data) {
            var tbody = table.children("tbody");
            tbody.children("tr").remove();
            $.each(data, function (index, element) {
                delete element.ID;
                delete element.SubProjectKey;
                delete element.Flag;
                delete element.Status;
                var tr = $("<tr></tr>");
                for (var key in element) {
                    var td = null;
                    if (key == "DocumentRequire") {
                        td = $('<span></span>').text(element[key]);
                        tr.append($('<td></td>').append(td));
                    }
                    else if (key == "Key") {
                        tr.data("Key", element[key]);
                    }
                    else {
                        td = $('<input type="text" />').val(element[key]);
                        tr.append($('<td></td>').append(td));
                    }
                }
                tbody.append(tr);
            })
        }
        var _getTable = function (table) {
            var data = [];
            var trs = table.find("tbody tr");
            $.each(trs, function (index, element) {
                var zd = [];
                var err = false;
                $.each($(element).find("input"), function (i, n) {
                    if (i == 0 && $(n).val().trim() == '')
                        err = true;
                    zd.push($(n).val());
                });
                if (!err)
                    data.push(zd);
            });
            return data;
        }
        var _getDocumentTable = function (table) {
            var data = [];
            var trs = table.find("tbody tr");
            $.each(trs, function (index, element) {
                var zd = [];
                if ($(element).data("Key")) {
                    zd.push($(element).data("Key"));
                }
                $.each($(element).find("input"), function (i, n) {
                    zd.push($(n).val());
                });
                data.push(zd);
            });
            return data;
        }
        window.project.SubProjectEvaluationPreparation_aspx.addRow = function (obj, col) {
            var tbody = $(obj).parent().parent().parent().parent();
            var tr = $("<tr></tr>");
            for (var i = 0; i < col; i++) {
                tr.append('<td><input type="text" /></td>');
            }
            tr.append('<td style="width:100px;text-align:center"><a href="javascript:void(0)" style="color:Blue;" onclick="$(this).parent().parent().remove();">删除行</a></td>');
            tbody.append(tr);
        }
    }
})(jQuery);