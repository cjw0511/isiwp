//
//================================================================================
//  该文件提供 project 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.project) { window.project = new Object(); }
    if (!window.project.employee) { window.project.employee = new Object(); }


    window.project.employee.getEmployeeByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Platform/EmployeeService.asmx/GetEmployeeByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var employee = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, employee); }
        });
    }

})(jQuery);