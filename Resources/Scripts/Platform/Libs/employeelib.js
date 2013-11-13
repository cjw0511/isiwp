//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.employee) { window.platform.employee = new Object(); }

    window.platform.employee.getEmployeeByUserKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/GetEmployeeByUserKey"), { UserKey: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var employee = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, employee); }
        });
    }

    window.platform.employee.getEmployeeByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/GetEmployeeByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var employee = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, employee); }
        });
    }

    window.platform.employee.addEmployee = function (employeeObj, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/AddEmployee"), employeeObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.employee.updateEmployee = function (employeeObj, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/UpdateEmployee"), employeeObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.employee.addEmployeeBasicInfo = function (employeeObj, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/AddEmployeeBasicInfo"), employeeObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.employee.updateEmployeeBasicInfo = function (employeeObj, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/UpdateEmployeeBasicInfo"), employeeObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.employee.addEmployeeRecordInfo = function (employeeObj, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/AddEmployeeRecordInfo"), employeeObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.employee.updateEmployeeRecordInfo = function (employeeObj, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/UpdateEmployeeRecordInfo"), employeeObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.employee.deleteEmployee = function (keys, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/DeleteEmployee"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    //////////
    window.platform.employee.getFamilyMemberById = function (id, callback) {
        $.post(window.resolveUrl("Services/Platform/FamilyMemberService.asmx/GetFamilyMemberById"), { Id: id }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var familyMember = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, familyMember); }
        });
    }
    window.platform.employee.addFamilyMember = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/FamilyMemberService.asmx/AddFamilyMember"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.employee.updateFamilyMember = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/FamilyMemberService.asmx/UpdateFamilyMember"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.employee.deleteFamilyMember = function (ids, callback) {
        $.post(window.resolveUrl("Services/Platform/FamilyMemberService.asmx/DeleteFamilyMember"), { IDs: ids }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.employee.getExperienceById = function (id, callback) {
        $.post(window.resolveUrl("Services/Platform/ExperienceService.asmx/GetExperienceById"), { Id: id }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var experience = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, experience); }
        });
    }
    window.platform.employee.addExperience = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/ExperienceService.asmx/AddExperience"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.employee.updateExperience = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/ExperienceService.asmx/UpdateExperience"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.employee.deleteExperience = function (ids, callback) {
        $.post(window.resolveUrl("Services/Platform/ExperienceService.asmx/DeleteExperience"), { IDs: ids }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.platform.employee.getCertificateById = function (id, callback) {
        $.post(window.resolveUrl("Services/Platform/CertificateService.asmx/GetCertificateById"), { Id: id }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var certificate = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, certificate); }
        });
    }
    window.platform.employee.addCertificate = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/CertificateService.asmx/AddCertificate"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.employee.updateCertificate = function (obj, callback) {
        $.post(window.resolveUrl("Services/Platform/CertificateService.asmx/UpdateCertificate"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.employee.deleteCertificate = function (ids, callback) {
        $.post(window.resolveUrl("Services/Platform/CertificateService.asmx/DeleteCertificate"), { IDs: ids }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.platform.employee.delelePhoto = function (param, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/DeletePhoto"), param, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);





