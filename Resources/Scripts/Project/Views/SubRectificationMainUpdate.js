/*
==============================================================================
//  整改方案模板添加页面 SubRectificationMainUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubRectificationMainUpdate_aspx) { window.project.SubRectificationMainUpdate_aspx = new Object(); }
    window.project.SubRectificationMainUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        ///定义验证规则

        $("#txtTitle4", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['title', 'updateValidate["模板标题","Services/Project/SubRectificationService.asmx/ajaxAddValid1","Title",' + key + ']']
        });
        $("#txtSort4", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'number'
//            validType: ['number', 'updateValidate["模板排序号","Services/Project/SubRectificationService.asmx/ajaxAddValid1","Sort",' + key + ']']
        });


//        $("#txtMasterKey", ajaxContainerSelector).searchbox({
//            required: true,
//            searcher: function (value) {
//                var selected = $("#MasterKey", ajaxContainerSelector).val();
//                var onEnterClick = function (datagrid, selections) {
//                    if (selections.length > 0) {
//                        $("#MasterKey", ajaxContainerSelector).val(selections[0].Key);
//                        $("#txtMasterKey", ajaxContainerSelector).searchbox("setValue", selections[0].Title);
//                    } else {
//                        $.plugin.messager.alert("提示", "请先选择一行", "warning");
//                        return false;
//                    }
//                };
//                window.project.showRectiTemplateSelector(onEnterClick, selected);
//            }
//        });
        $("#txtTemplateKey", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
        $("#txtTemplateKey", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
        $("#txtTitle", ajaxContainerSelector).validatebox({
            required: true
        });
        $("#selTemplateType", ajaxContainerSelector).combobox({
            required: true,
            valueField: 'Key',
            textField: "Name",
            data: [{
                Key: 1,
                Name: '大文本',
                selected: true
            }, {
                Key: 2,
                Name: '一维表'
            }, {
                Key: 3,
                Name: '二维表'
            }]
        });
        $("#selTypeKey", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 58 }
        });
        $("#selTypeKey", ajaxContainerSelector).combobox("setValue", 0);
//        $("#txtSort", ajaxContainerSelector).validatebox({
//            required: true,
//            validType: 'number'
//        });
        $("#txtDescription", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });
        window.project.subrectification.getSubProjectRectMainByKey(key, function (main) {
            $(ajaxContainerSelector).form('loadData', main);
            $("#MasterKey", ajaxContainerSelector).val(main.MasterKey);
            if (main.MasterKey != '0' && main.MasterKey != undefined) {
                window.project.subrectification.getSubProjectRectTemplateByKey(main.MasterKey, function (main) {
                    if (project)
                        $("#txtMasterKey", ajaxContainerSelector).searchbox("setValue", main.Title);
                });
            }
        });
    };
})(jQuery);