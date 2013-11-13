//
//================================================================================
//  该文件为Office文档控件基础脚本
//  封装方法：1.post传值方式实现window.open方法打开文档窗口操作;
//  修改时间：2013-6-24
//================================================================================
//
(function ($) {
    if (!window.project) { window.project = new Object(); }
    window.project.openOfficeWindow = function (url, param) {
        var targetname = "newWindow";
        var tempForm = document.createElement("form");
        tempForm.id = "tempForm";
        tempForm.method = "post";
        tempForm.action = url;
        tempForm.target = targetname;
        for (var key in param) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = param[key];
            tempForm.appendChild(input);
        }
        if (tempForm.addEventListener != undefined) {
            tempForm.addEventListener("onsubmit", function () { openWin(targetname); });
        }
        else {
            tempForm.attachEvent("onsubmit", function () { openWin(targetname); });
        }
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);
        var openWin = function (name) {
            window.open("about:blank", name, "", true);
        }
    };

    window.project.DownLoadFile = function (url, param) {
        var targetname = "newWindow";
        var tempForm = document.createElement("form");
        tempForm.id = "tempForm";
        tempForm.method = "post";
        tempForm.action = url;
        tempForm.target = targetname;
        for (var key in param) {
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = param[key];
            tempForm.appendChild(input);
        }
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);
    }

    window.project.openInWord = function (url) {
        var openDocuments = null;
        try {
            openDocuments = new ActiveXObject("SharePoint.OpenDocuments.3");
        }
        catch (e) {
            openDocuments = new ActiveXObject("SharePoint.OpenDocuments.2");
        }
        var result = openDocuments.EditDocument(url, "Word.Document");
        if (result == false) {
            alert("无法打开文档.");
        }
    }
})(jQuery);