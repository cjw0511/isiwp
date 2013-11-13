/*
==============================================================================
//  整改方案模板添加页面 SubRectificationMainAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubRectificationMainAdd_aspx) { window.project.SubRectificationMainAdd_aspx = new Object(); }
    window.project.SubRectificationMainAdd_aspx.initPage = function (ajaxContainerSelector) {
        ///定义验证规则

        $("#txtTitle3", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['title', 'insertValidate["模板标题","Services/Project/SubRectificationService.asmx/ajaxAddValid1","Title"]']
        });
        $("#txtSort3", ajaxContainerSelector).validatebox({
            required: true,
            validType: 'number'
//            validType: ['number', 'insertValidate["模板排序号","Services/Project/SubRectificationService.asmx/ajaxAddValid1","Sort"]']
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
        $("#selTemplateType", ajaxContainerSelector).combobox("setValue", 0);
        $("#selTypeKey", ajaxContainerSelector).combobox({
            required: true,
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

    };
})(jQuery);