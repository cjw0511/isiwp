/*
==============================================================================
//  项目启动添加页面 SubProjectAdd.aspx 的页面控制层代码。
==============================================================================
*/
(function ($) {
    if (!window.project) { window.project = new Object(); }
    if (!window.project.SubProjectAdd_aspx) { window.project.SubProjectAdd_aspx = new Object(); }
    window.project.SubProjectAdd_aspx.initPage = function (ajaxContainerSelector, key, name) {
        $("#txtName3", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['name', 'insertValidate["项目名称","Services/Project/SubProjectService.asmx/ajaxAddValid","Name"]']
        });
        $("#txtCode3", ajaxContainerSelector).validatebox({
            required: true,
            validType: ['code', 'insertValidate["编号","Services/Project/SubProjectService.asmx/ajaxAddValid","Code"]']
        });
        $("#selType3", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 58 }
        });
        $("#selType3", ajaxContainerSelector).combobox("setValue", 1);
        $("#selProgress3", ajaxContainerSelector).combobox({
            valueField: 'Key',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 56 }
        });
        $("#selProgress3", ajaxContainerSelector).combobox("setValue", 0);
        $("#selStageType3", ajaxContainerSelector).combobox({
            valueField: 'Value',
            textField: "Name",
            url: window.resolveUrl("Services/Platform/DataDictionaryService.asmx/GetDetailDataByMainKey"),
            queryParams: { MainKey: 55 }
        });
        $("#selStageType3", ajaxContainerSelector).combobox("setValue", 1);
        $("#txtStartDate3", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });
        $("#txtStopDate3", ajaxContainerSelector).datebox({
            required: true,
            validType: 'shortDate'
        });

        $("#txtProjName3", ajaxContainerSelector).validatebox({
            required: true
        });

        $("#txtProjName3", ajaxContainerSelector).val(name);
        $("#ProjectKey3").val(key);

        $("#txtRemark3", ajaxContainerSelector).validatebox({
            validType: 'unnormal'
        });

        var _userGridInit = function () {
            var options = {
                singleSelect: true,
                checkOnSelect: false,
                selectOnCheck: false,
                fit: true,
                border: false,
                rownumbers: true,
                nowrap: true,
                url: window.resolveUrl('Services/Platform/EmployeeService.asmx/GetAllEmployee'),
                idField: 'Key',
                frozenColumns: [[{ field: 'ck', checkbox: true}]],
                columns: [[
                { field: 'Code', title: '编码', width: 100, sortable: true },
				{ field: 'Name', title: '名称', width: 100, sortable: true },
                { field: 'Tel', title: '座机号', width: 100, sortable: true },
                { field: 'Phone', title: '手机号', width: 100, sortable: true },
                { field: 'Email', title: 'Email', width: 100, sortable: true }
			]],
                sortName: 'Code',
                sortOrder: 'asc',
                pagination: true
            };
            $("#UserGrid", ajaxContainerSelector).datagrid(options);
        }

        var _bindControl = function () {
            $("#Tree", ajaxContainerSelector).tree({
                animate: true,
                onSelect: function (node) {
                    if (node.id == $(this).tree('getRoot').id) {
                        return;
                    }
                    var url = 'Views/Project/ProjRoleUpdate.aspx?key=' + node.id;
                    $("#Tab", ajaxContainerSelector).tabs('enableTab', '修改角色');
                    $("#Tab", ajaxContainerSelector).tabs('select', '修改角色');
                    $("#Tab", ajaxContainerSelector).tabs('getTab', '修改角色').panel("refresh", url);
                },
                moveMenu: { up: true, upLevel: false, down: true, downLevel: false },
                onDrop: function (target, source, point) {
                    var node = $(this).tree("getNode", target);
                    _move(node.id, source.id);
                }
            });
            _loadData();
        };

        var _loadData = function () {
            window.project.role.getTreeDataOfRole(function (data) {
                $("#Tree", ajaxContainerSelector).tree("loadData", data);
            });
        };
        _bindControl();
        _userGridInit();
    };
})(jQuery);