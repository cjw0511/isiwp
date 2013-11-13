//
//================================================================================
//  该文件提供 Platform 平台项目的公共 javascript 函数库，例如登录、验证、提取菜单、权限、拉取角色菜单等。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js 和 jq.extent.easyui.js 构建。
//================================================================================
//
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    window.platform.loginPage = window.resolveUrl("Login.aspx");
    window.platform.mainFormPage = window.resolveUrl("MainForm.aspx");


    var verifyLoginCallback = function (d) {
        switch (d) {
            case "0":
                window.location.href = "MainForm.aspx";
                break;
            case "1":
                $.plugin.messager.alert("操作提醒", "用户名或者密码错误，请重新输入。", "warning");
                break;
            case "2":
                $.plugin.messager.alert("操作提醒", "验证码错误，请重新输入。", "warning");
                break;
            case "5":
                $.plugin.messager.alert("操作提醒", "该用户是无效的，请联系管理员更改状态。", "warning");
                break;
            case "6":
                $.plugin.messager.alert("操作提醒", "该用户已被锁定，请联系管理员解锁。", "warning");
                break;
            default:
                $.plugin.messager.alert("操作提醒", "用户名或者密码错误，请重新输入。", "warning");
                break;
        }
    };

    //系统登录。
    window.platform.login = function (loginCode, password, verifyCode) {
        if (String.isNullOrWhiteSpace(loginCode)) { $.plugin.messager.alert("操作提醒", "用户名不能为空，请输入！", "warning"); }
        if (String.isNullOrWhiteSpace(password)) { $.plugin.messager.alert("操作提醒", "密码不能为空，请输入！", "warning"); }
        if (String.isNullOrWhiteSpace(verifyCode)) { $.plugin.messager.alert("操作提醒", "验证码不能为空，请输入！", "warning"); }
        window.platform.verifyAccount(loginCode, password, verifyCode, verifyLoginCallback, function (XMLHttpRequest, textStatus, errorThrown) {
            $.plugin.messager.alert("系统错误", "登录操作出现了一个异常：" + XMLHttpRequest.responseText, "error");
        });
    };

    //验证登录状态后执行某个函数；
    //参数：callback，表示在验证登录状态后需要执行的回调函数，该回调函数签名为 function(loginStatus)；
    //其中loginStatus表示当前用户的登录状态，为 String 类型值，可选的值为 unlogin、logined、logout。
    window.platform.verifyLoginCallback = function (callback) {
        $.post(window.resolveUrl("./Services/Platform/LoginService.asmx/LoginStatus"), function (data, textStatus, XMLHttpRequest) {
            var d = $(data).text().toLowerCase();
            if ($.isFunction(callback)) { callback.call(this, d); }
        });
    };

    //验证登录后的状态，并在验证后执行一个回调函数，该方法参数列表如下
    // loginCode：登录用户名
    // password: 登录密码
    // verifyCode: 登录的验证码
    // callback：验证后执行的回调函数，该回调函数的签名为 function(status)，status表示 loginCode、password、verifyCode 的验证结果，验证结果可能的值包括：0：登录成功，1：用户名或密码无效，2：验证码无效，3：用户名无效，4：密码无效。
    // error：执行出现异常后的回调函数，该回调函数的用法参考 $.ajax 的参数 error
    window.platform.verifyAccount = function (loginCode, password, verifyCode, callback, error) {
        var data = { loginCode: loginCode, password: password, verifyCode: verifyCode };
        $.ajax({
            url: window.resolveUrl("./Services/Platform/LoginService.asmx/Login"),
            data: data,
            beforeSend: function (XMLHttpRequest) {
                $.plugin.messager.progress({ title: "操作提醒", text: "正在登录" });
            },
            success: function (data, textStatus, XMLHttpRequest) {
                if ($.isFunction(callback)) { callback.call(this, $(data).text()); }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if ($.isFunction(error)) { error.call(this, XMLHttpRequest, textStatus, errorThrown); }
            },
            complete: function (XMLHttpRequest, textStatus) {
                $.plugin.messager.progress("close");
            }
        });
    }

    //系统注销登录，并在注销后执行一个回调函数。
    window.platform.logout = function (callback) {
        $.post(window.resolveUrl("./Services/Platform/LoginService.asmx/Logout"), function (data, textStatus, XMLHttpRequest) {
            if ($.isFunction(callback)) { callback.apply(this, arguments); }
        });
    }

    //系统注销登录并且返回登录界面。
    window.platform.logoutAndExit = function () {
        window.platform.logout(function (data, textStatus, XMLHttpRequest) {
            var id = "span_" + window.guid().replaceAll("-", "");
            var span = "#" + id;
            var timeout = 5;
            var jump = function () { window.location.href = window.platform.loginPage; };
            $.plugin.messager.alert("操作提醒", "注销成功，系统将会在您点击本窗口的 \"确定\"/\"关闭\" 按钮或者 <span id='" + id + "'>"
                + timeout + "</span> 秒后跳转到登录页面", "info", jump);
            //$(span).getCurrentPanel().panel("options").onClose = jump;
            var c = function (value) { $(span).text(value); if (value == 0) { jump(); } };
            var run = function () {
                c(timeout);
                timeout--;
                if (timeout >= 0) { window.call(run, 1000); }
            };
            window.call(run);
        });
    };

    //点击注销动作，确认用户是否注销，如果是则注销当前登录并且返回登录界面。
    window.platform.logoutConfirmAndExit = function () {
        $.plugin.messager.confirm("操作提醒", "您确定要注销本次登录？", function (q) {
            if (q) {
                window.platform.logoutAndExit();
            }
        });
    };

    //点击退出系统动作，确认用户是否退出系统，如果是则注销当前登录并且关闭当前窗口。
    window.platform.exitSysConfirm = function () {
        $.plugin.messager.confirm("操作提醒", "您确定要退出系统并关闭本窗口？", function (q) {
            if (q) {
                window.platform.logout(window.closeNoConfirm);
            }
        });
    };

    //判断当前是否已经登录，如果未登录，则在弹出消息提示后跳转至登录页面。
    window.platform.checkLogin = function () {
        var href = window.location.href;
        if (!href.startsWith(window.platform.loginPage) && !href.endsWith(window.rootPath + "/")) {
            window.platform.verifyLoginCallback(function (state) {
                if (state != "logined") {
                    window.alert("您当前尚未登录或者登录已经超时，不能进行该操作；系统将跳转至登录页面。");
                    href = window.encodeURI(href);
                    $.plugin.top.location.href = window.platform.loginPage + "?callback=" + href;
                    return;
                }
            });
        }
    };

    //获取当前登录用户的登录编码
    window.platform.getCurrentLoginCode = function (callback) {
        $.post(window.resolveUrl("./Services/Platform/LoginService.asmx/CurrentLoginCode"), function (data, textStatus, XMLHttpRequest) {
            var loginCode = $(data).text();
            if ($.isFunction(callback)) { callback.call(this, loginCode); }
        });
    };

    //获取当前登录的用户key
    window.platform.getCurrentUserKey = function (callback) {
        $.post(window.resolveUrl("./Services/Platform/LoginService.asmx/CurrentUserKey"), function (data, textStatus, XMLHttpRequest) {
            var userKey = $(data).text();
            if (!String.isNullOrWhiteSpace(userKey)) { userKey = window.parseInt(userKey, 10); }
            if ($.isFunction(callback)) { callback.call(this, userKey); }
        });
    };

    //获取当前登录的用户。
    window.platform.getCurrentUser = function (callback) {
        $.post(window.resolveUrl("./Services/Platform/LoginService.asmx/CurrentUser"), function (data, textStatus, XMLHttpRequest) {
            var user = $.plugin.parseSOADataToJSON(data);
            if ($.isFunction(callback)) { callback.call(this, user); }
        });
    };


    //选择用户组，传入的参数为一个回调函数
    window.platform.showUserGroupSelector = function (onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择用户组',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Platform/UserGroupService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'Name', title: '名称', width: 300, sortable: true },
                { field: 'ShortName', title: '简称', width: 200, sortable: true }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };
    //选择角色，传入的参数为一个回调函数
    window.platform.showRoleSelector = function (onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择角色',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Platform/RoleService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'Name', title: '名称', width: 300, sortable: true },
                { field: 'ShortName', title: '简称', width: 200, sortable: true }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };
    //选择角色，该方法为多选，传入的参数为一个回调函数
    window.platform.showRoleMultipleSelector = function (onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择角色',
            fitColumns: true,
            rownumbers: true,
            singleSelect: false,
            url: window.resolveUrl("Services/Platform/RoleService.asmx/LoadGridDataNoPaging"),
            toolbar: toolbar,
            queryParams: {
                name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                            { field: 'ck', checkbox: true },
                            { field: 'Code', title: '编号', width: 100, sortable: true },
                            { field: 'Name', title: '名称', width: 300, sortable: true },
                            { field: 'ShortName', title: '简称', width: 200, sortable: true }
                        ]],
            pagination: false,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };
    //选择部门，传入的参数为一个回调函数
    window.platform.showDepartmentSelector = function (onEnterClick, selected) {
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择部门',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Platform/DepartmentService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'Name', title: '名称', width: 300, sortable: true },
                { field: 'ParentDepartmentName', title: '父级部门', width: 200, sortable: true },
                { field: 'OrganName', title: '组织机构', width: 200, sortable: true }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };

    //选择用户，传入的参数为一个回调函数
    window.platform.showUserSelector = function (onEnterClick, selected) {
        var departmentdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DepartmentService.asmx/LoadTreeData");
        var _departmentFormatter = function (value) {
            for (var i = 0; i < departmentdata.length; i++) {
                if (departmentdata[i].Key == value) return departmentdata[i].Name;
            }
            return "";
        }
        var roledata = $.plugin.getJsonDataRequestWebService("Services/Platform/RoleService.asmx/LoadTreeData");
        var _roleFormatter = function (value) {
            for (var i = 0; i < roledata.length; i++) {
                if (roledata[i].Key == value) return roledata[i].Name;
            }
            return "";
        }
        var usergroupdata = $.plugin.getJsonDataRequestWebService("Services/Platform/UserGroupService.asmx/LoadTreeData");
        var _usergroupFormatter = function (value) {
            for (var i = 0; i < usergroupdata.length; i++) {
                if (usergroupdata[i].Key == value) return usergroupdata[i].Name;
            }
            return "";
        }
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择用户',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Platform/UserService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
				{ field: 'Name', title: '名称', width: 100, sortable: true },
                { field: 'Code', title: '编码', width: 100, sortable: true },
				{ field: 'LoginCode', title: '登录编号', width: 100, sortable: true },
				{ field: 'DepartmentKey', title: '所属部门', width: 150, sortable: true, formatter: _departmentFormatter },
				{ field: 'RoleKey', title: '所属角色', width: 150, sortable: true, formatter: _roleFormatter },
				{ field: 'UserGroupKey', title: '用户组', width: 150, sortable: true, formatter: _usergroupFormatter },
                { field: 'IsValid', title: '是否有效', width: 100, sortable: true, formatter: function (value, rowData, rowIndex) { if (value == true) return '是'; else if (value == false) return '否' } },
                { field: 'IsLocked', title: '是否锁定', width: 100, sortable: true, formatter: function (value, rowData, rowIndex) { if (value == true) return '是'; else if (value == false) return '否' } }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };
    //选择职员，传入的参数为一个回调函数
    window.platform.showEmployeeSelector = function (onEnterClick, selected) {
        var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 4 });
        var sexFormatter = function (value) {
            for (var i = 0; i < sexdata.length; i++) {
                if (sexdata[i].id == value) return sexdata[i].text;
            }
            return value;
        }

        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择职员',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Platform/EmployeeService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'Name', title: '姓名', width: 300, sortable: true },
                { field: 'SexKey', title: '性别', sortable: true, width: 100, formatter: sexFormatter },
                { field: 'PostKey', title: '岗位', width: 300, sortable: true }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };
    //选择联系人，传入的参数为一个回调函数
    window.platform.showLinkManSelector = function (onEnterClick, selected) {
        var sexdata = $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey", { MainKey: 4 });
        var sexFormatter = function (value) {
            for (var i = 0; i < sexdata.length; i++) {
                if (sexdata[i].id == value) return sexdata[i].text;
            }
            return value;
        }
        var txtId = "txt" + window.guid().replaceAll("-", "").left(12);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var toolbar = "<div style='padding-left: 10px;' >名称：<input id='" + txtId + "' type='text' /><a id='" + btnId + "' class='easyui-linkbutton' data-options='plain: true' iconCls='icon-search' >查询</a></div>";
        var options = {
            title: '请选择联系人',
            fitColumns: true,
            rownumbers: true,
            singleSelect: true,
            url: window.resolveUrl("Services/Platform/LinkManService.asmx/LoadGridData"),
            toolbar: toolbar,
            queryParams: {
                name: ""
            },
            idField: 'Key',
            sortName: 'Code',
            sortOrder: 'asc',
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'Code', title: '编号', width: 100, sortable: true },
                { field: 'Name', title: '姓名', width: 250, sortable: true },
                { field: 'LinkManType', title: '类型', width: 200, sortable: true },
                { field: 'SexKey', title: '性别', width: 100, formatter: sexFormatter, sortable: true },
                { field: 'Phone', title: '手机', width: 250, sortable: true }
            ]],
            pagination: true,
            onEnterClick: onEnterClick
        };
        if (selected) {
            $.extend(options, { selected: selected });
        }
        var selector = $.plugin.showSingleDataGridSelector(options);
        $(selector.toolbar).find("#" + btnId).click(function () {
            var name = selector.toolbar.find("#" + txtId).val();
            selector.datagrid.datagrid("load", { name: name });
        });
    };
    //获取公司名称
    window.platform.getCompanyName = function (callback) {
        $.post(window.resolveUrl("Services/Platform/CompanyService.asmx/GetCompany"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var info = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, info.CompName); }
        });
    }
    window.platform.getDataDictionarySingleRecord = function (obj) {
        return $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDataDictionarySingleRecord", obj);
    }
    window.platform.getDataDictionarySingleRecordByValue = function (obj) {
        return $.plugin.getJsonDataRequestWebService("Services/Platform/DataDictionaryService.asmx/GetDataDictionarySingleRecordByValue", obj);
    }

    window.platform.showUploadWindow = function (dialogconfig, uploadifyconfig) {
        var defaultdialog = {
            title: "上传文件",
            enableSaveButton: false,
            enableApplyButton: false,
            width: 500,
            height: 200
        };
        var _dialog = $.extend({}, defaultdialog, dialogconfig);
        var btnId = "btn" + window.guid().replaceAll("-", "").left(12);
        var _content = '<div class="div_center"><input id="' + btnId + '" name="inputfile" type="file"/></div>';
        $.extend(_dialog, { content: _content });
        var dialog = $.plugin.showDialog(_dialog);
        var inituploadify = function () {
            $(dialog.dialog).find("#" + btnId).uploadify(uploadifyconfig);
        }
        window.setTimeout(inituploadify, 0);
    }

})(jQuery);





