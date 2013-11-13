/*
==============================================================================
//  默认文档管理页面 DocumentManage.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.DocumentManage_aspx) { window.lorelibs.DocumentManage_aspx = new Object(); }
    window.lorelibs.DocumentManage_aspx.initPage = function (ajaxContainerSelector, tradeKey, tierKey) {
        ///定义验证规则
        var _bindControl = function () {
            var gradedata = $.plugin.getJsonDataRequestWebService(window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"), { MainKey: 39 });
            $("#selGrade", ajaxContainerSelector).combobox({
                valueField: 'Value',
                textField: "Name"
            }).combobox("loadData", gradedata).combobox("setValue", 1);
            //上传文档
            $("#a_upload", ajaxContainerSelector).click(function () {
                window.platform.showUploadWindow({ title: "默认文档导入" }, {
                    width: 100,
                    height: 20,
                    formData: { TradeKey: tradeKey, TierKey: tierKey, Grade: $("#selGrade", ajaxContainerSelector).combobox("getValue") },
                    swf: 'Resources/Plugins/uploadify/uploadify.swf',
                    uploader: 'Services/LoreLibs/NormService.asmx/ImportWorkInstructionFile',
                    buttonText: '上传文档',
                    multi: false,
                    uploadLimit: 1,
                    fileTypeDesc: 'excel',
                    fileTypeExts: '*.doc;*.docx;',
                    onUploadSuccess: function (file, data, response) {
                        $.plugin.showMessage(file.name + "上传成功！");
                        $("#DocumentGrid", ajaxContainerSelector).datagrid("reload");
                    }
                });
            });

            var _gradeFormatter = function (value) {
                for (var i = 0; i < gradedata.length; i++) {
                    if (gradedata[i].Value == value) return gradedata[i].Name;
                }
                return "";
            }
            //文档列表
            $("#DocumentGrid", ajaxContainerSelector).datagrid({
                fitColumns: true,
                border: false,
                rownumbers: true,
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                fit: true,
                nowrap: false,
                url: window.resolveUrl('Services/LoreLibs/NormService.asmx/GetWorkInstructionFilePagingData'),
                queryParams: {
                    TradeKey: tradeKey,
                    TierKey: tierKey
                },
                idField: 'Key',
                sortName: 'Key',
                sortOrder: 'asc',
                pagination: true,
                columns: [[
                        { field: 'Grade', title: '级别', width: 300, formatter: _gradeFormatter },
                        { field: 'opt', title: '操作', width: 100, align: 'center',
                            formatter: function (value, rowData, rowIndex) {
                                var downspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-down" }).attr("title", "下载文档").attr("onmouseover", "javascript:window.lorelibs.DocumentManage_aspx.isDownDocument = true;").attr("onmouseout", "javascript:window.lorelibs.DocumentManage_aspx.isDownDocument = false;");
                                var delspan = $("<a></a>").linkbutton({ plain: true, iconCls: "icon-no" }).attr("title", "删除文档").attr("onmouseover", "javascript:window.lorelibs.DocumentManage_aspx.isDelDocument = true;").attr("onmouseout", "javascript:window.lorelibs.DocumentManage_aspx.isDelDocument = false;");
                                var div = $("<div></div>").append(downspan).append(delspan);
                                return div.html();
                            }
                        }
                        ]],
                onClickRow: function (rowIndex, rowData) {
                    if (window.lorelibs.DocumentManage_aspx.isDownDocument) {
                        alert(rowData.FileKey);
                        window.project.DownLoadFile(window.resolveUrl('Services/Project/DocumentService.asmx/DownLoadFile'), { FileKey: rowData.FileKey });
                        window.lorelibs.DocumentManage_aspx.isDownDocument = false;
                    }
                    if (window.lorelibs.DocumentManage_aspx.isDelDocument) {
                        var _callback = function (success) {
                            if (success) {
                                $("#DocumentGrid", ajaxContainerSelector).datagrid('reload');
                                $.plugin.showMessage("文档删除成功。");
                            } else {
                                $.plugin.showMessage("文档删除失败。");
                            }
                        };
                        window.lorelibs.norm.deleteWorkInstructionFile({ Key: rowData.Key }, _callback);
                        window.lorelibs.DocumentManage_aspx.isDelDocument = false;
                    }
                }
            });
        }

        var _bindButtonEvent = function () {


        }

        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);