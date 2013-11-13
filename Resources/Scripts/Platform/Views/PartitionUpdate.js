/*
==============================================================================
//  机构编辑页面 PartitionUpdate.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.PartitionUpdate_aspx) { window.platform.PartitionUpdate_aspx = new Object(); }

    window.platform.PartitionUpdate_aspx.initPage = function (ajaxContainerSelector, key) {
        var _verifyform = function () { return $(ajaxContainerSelector).form('validate'); };
        var _bindControl = function () {
            ///定义验证规则
            $("#txtName", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['name', 'updateValidate["机构名称","Services/Platform/PartitionService.asmx/AjaxValidate","Name",' + key + ']']
            });
            $("#txtShortName", ajaxContainerSelector).validatebox({
                validType: 'name'
            });
            $("#txtCode", ajaxContainerSelector).validatebox({
                required: true,
                validType: ['code', 'updateValidate["机构编号","Services/Platform/PartitionService.asmx/AjaxValidate","Code",' + key + ']']
            });
            $("#txtTel", ajaxContainerSelector).validatebox({
                validType: 'phone'
            });
            $("#txtEmail", ajaxContainerSelector).validatebox({
                validType: 'email'
            });
            $("#txtAddress", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            //            $("#txtZipCode", ajaxContainerSelector).validatebox({
            //                validType: 'zipCode'
            //            });
            $("#txtBuildDate", ajaxContainerSelector).datebox({
                validType: 'shortDate'
            });
            $("#txtRemark", ajaxContainerSelector).validatebox({
                validType: 'unnormal'
            });
            ///选择联系人
            $("#txtLinkMan", ajaxContainerSelector).searchbox({
                searcher: function (value) {
                    var selected = $("#LinkManKey", ajaxContainerSelector).val();
                    var onEnterClick = function (datagrid, selections) {
                        if (selections.length > 0) {
                            $("#LinkManKey", ajaxContainerSelector).val(selections[0].Key);
                            $("#txtLinkMan", ajaxContainerSelector).searchbox("setValue", selections[0].Name);
                        } else {
                            $.plugin.messager.alert("提示", "请先选择一行", "warning");
                            return false;
                        }
                    };
                    window.platform.showEmployeeSelector(onEnterClick, selected);
                }
            });
            $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("span").find("span").addClass("base-select-button").addClass("icon-select");
            $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("input").attr("readonly", "readonly");
            
            //机构类型
            $("#txtPartType", ajaxContainerSelector).combobox({
                required: true,
                valueField: 'Key',
                textField: "Name",
                url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
                queryParams: { MainKey: 32 }
            });
            ///绑定数据信息
            window.platform.partition.getPartitionByKey(key, function (partition) {
                $(ajaxContainerSelector).form('loadData', partition);
                window.platform.employee.getEmployeeByKey(partition.LinkManKey, function (emp) {
                    $("#txtLinkMan", ajaxContainerSelector).searchbox("setValue", emp.Name);
                    $("#txtLinkMan", ajaxContainerSelector).next(".searchbox").find("input").validatebox({ required: true });
                });
            });
        };
        var _bindButtonEvent = function () {
            $("#btnSave", ajaxContainerSelector).click(function () {
                if (!_verifyform()) { return; }
                var partition = $(ajaxContainerSelector).form('getData');
                $.extend(partition, { Key: key });
                var _callback = function (success) {
                    if (success) {
                        $.plugin.showMessage("修改机构成功。");
                        window.platform.PartitionManage_aspx.refreshAfterAdd();
                    } else {
                        $.plugin.showMessage("修改机构失败。");
                    }
                };
                window.platform.partition.updatePartition(partition, _callback);
            });

            $("#btnDelete", ajaxContainerSelector).click(function () {
                var node = $("#Tree", window.platform.PartitionManage_aspx.ajaxContainerSelector).tree('find', key);
                if (!$("#Tree", window.platform.PartitionManage_aspx.ajaxContainerSelector).tree('isLeaf', node.target)) {
                    $.plugin.messager.alert("提示", node.text + " 有子节点，请先删除!", "warning");
                    return;
                }
                $.plugin.messager.confirm("提示", "点击确定将删除 " + node.text + "<br />是否执行此操作？", function (fn) {
                    if (fn) {
                        var _callback = function (success) {
                            if (success) {
                                $.plugin.showMessage("删除机构成功。");
                                window.platform.PartitionManage_aspx.refreshAfterDelete();
                            } else {
                                $.plugin.showMessage("删除机构失败。");
                            }
                        };
                        window.platform.partition.deletePartition(key, _callback);
                    }
                });
            });

            $("#clear_LinkMan", ajaxContainerSelector).click(function () {
                $("#txtLinkMan", ajaxContainerSelector).searchbox('setValue', '');
                $("#LinkManKey", ajaxContainerSelector).val('');
            });
        };
        _bindControl();
        _bindButtonEvent();
    };
})(jQuery);