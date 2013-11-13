(function ($) {
    function _treeLoadFilter(rows) {

        for (var i = 0; i < rows.length; i++) {
            if (rows[i]._parentId == undefined)
                return rows;
        }

        function exists(rows, parentId) {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].id == parentId) return true;
            }
            return false;
        }

        var nodes = [];
        // 得到顶层节点
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (!exists(rows, row._parentId)) {
                nodes.push({
                    id: row.id,
                    text: row.name,
                    iconCls: row.iconCls,
                    checked: row.checked,
                    attributes: row.attributes
                });
            }
        }

        var toDo = [];
        for (var i = 0; i < nodes.length; i++) {
            toDo.push(nodes[i]);
        }
        while (toDo.length) {
            // the parent node  
            var node = toDo.shift();
            // get the children nodes  
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row._parentId == node.id) {
                    var child = {
                        id: row.id,
                        text: row.name,
                        iconCls: row.iconCls,
                        checked: row.checked,
                        attributes: row.attributes
                    };
                    if (node.children) {
                        node.children.push(child);
                    } else {
                        node.children = [child];
                    }
                    toDo.push(child);
                }
            }
        }
        return nodes;
    }
    $.extend($.fn.tree.defaults, {
        loadFilter: _treeLoadFilter
    });
})(jQuery);

(function ($) {
    $.extend($.fn.tabs.methods, {
        //显示遮罩  
        loading: function (jq, msg) {
            return jq.each(function () {
                var panel = $(this).tabs("getSelected");
                if (msg == undefined) {
                    //msg = "正在加载数据，请稍候...";
                    msg = panel.panel("options").loadingMessage;
                }
                $("<div class=\"datagrid-mask\"></div>").css({ display: "block",top: $(this).find(".tabs-header").outerHeight(true), width: panel.outerWidth(true), height: panel.outerHeight(true) }).appendTo(panel);
                $("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo(panel).css({ display: "block", left: (panel.width() - $("div.datagrid-mask-msg", panel).outerWidth()) / 2, top: (panel.height() - $("div.datagrid-mask-msg", panel).outerHeight()) / 2 });
            });
        },
        //隐藏遮罩  
        loaded: function (jq) {
            return jq.each(function () {
                var panel = $(this).tabs("getSelected");
                panel.find("div.datagrid-mask-msg").remove();
                panel.find("div.datagrid-mask").remove();
            });
        }
    });
})(jQuery);
/// 确认数组中是否包含指定的元素。
Array.prototype.contains = function (item, compare) {
    var result = false;
    for (var i = 0; i < this.length; i++) {
        var b = (item == this[i]);
        if (b || (typeof(compare) == "function" && compare.call(this, item, this[i]) == true)) {
            result = true; 
            break;
        }
    }
    return result;
};
///如果数组中不存在指定的项，则添加
Array.prototype.merge = function (item, compare) {
    if (!this.contains(item, compare)) { this.push(item); }
};
///去除数组中重复的元素使之只保留一个，返回的是一个新的数组。
Array.prototype.distinct = function (compare) {
    var array = new Array();
    for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (i == 0) { array.push(item); } else { array.merge(item, compare); }
    }
    return array;
};
///创建一个和当前数组对象相同的数组并返回
Array.prototype.clone = function () {
    var temp = [];
    this.copyTo(temp);
    return temp;
};
///复制数组内的所有项到一个新的数组中
Array.prototype.copyTo = function (array) {
    for (var i = 0; i < this.length; i++) { array.push(this[i]); }
};
///移除数组中的指定项，并返回一个新的数组
Array.prototype.remove = function (item, compare) {
    var temps = new Array();
    for (var i = 0; i < this.length; i++) {
        var b = item == this[i];
        if (!(b || (typeof (compare) == "function" && compare.call(this, item, this[i]) == true))) { temps.push(this[i]); }
    }
    return temps;
};

(function ($) {
    $("head").append("<style type=\"text/css\">.datagrid-row-hidden{display: none;}</style>");
    $("head").append("<style type=\"text/css\">.datagrid-header-filter-icon{float:right;background-image: url('/scripts/jquery-easyui-extension/sprite.png');background-position: 0px -36px;width: 16px;height: 16px;}</style>");
    $("head").append("<style type=\"text/css\">.datagrid-header-filtered-icon{background-position: 0px -54px;}</style>");
    function _datagridLoadFilter(data) {

        /***支持列表头过滤***/
        var distinctRows = [];
        var grid = $(this);
        var opts = grid.datagrid("options");
        var gridPanel = grid.datagrid("getPanel");

        // 初始化
        $('#filterMenu').remove();
        var headerCell = gridPanel.find("table.datagrid-htable div.datagrid-cell");
        headerCell.find(".datagrid-header-filter-icon").remove();

        var headerFilterIcon = $('<div class="datagrid-header-filter-icon"></div>');
        if (opts.headerFilterData && opts.headerFilterData.length > 0) {
            headerFilterIcon.addClass('datagrid-header-filtered-icon');
        }

        headerFilterIcon.appendTo(headerCell).on('click', function (event) {
            function _getField(target) {
                return $(target).parents('td[field]').attr('field');
            }
            function _filterHandler(event, field, target, row) {
                var rows = grid.datagrid("getRows");
                var opts = grid.datagrid("options");
                var isArray = $.isArray(opts.headerFilterData);
                var gridBody = gridPanel.panel("body").find(".datagrid-view .datagrid-body");
                var t = isArray ? 0 : 1;    //0：显示，1：隐藏
                if (row) {
                    t = (isArray && opts.headerFilterData.contains(row, compare) ? 0 : 1);
                    var text = row[field];
                    var indexs = [];
                    var dom = $();
                    $.each(rows, function (index, value) { if (value[field] == row[field]) { indexs.push(index); } });

                    gridBody.each(function () {
                        var rr = $(".datagrid-row", this);
                        $.each(indexs, function (index, value) { dom = dom.add(rr[value]); });
                    });
                    if (t == 0) {
                        dom.removeClass("datagrid-row-hidden");
                        $.each(indexs, function (index, value) {
                            var r = rows[value];
                            if ($.isArray(opts.headerFilterData)) { opts.headerFilterData = opts.headerFilterData.remove(r, compare); }
                        });
                    } else {
                        dom.addClass("datagrid-row-hidden");
                        $.each(indexs, function (index, value) {
                            var r = rows[value];
                            if (!$.isArray(opts.headerFilterData)) { opts.headerFilterData = []; }
                            opts.headerFilterData.merge(r, compare);
                        });
                    }
                    $(target).find('.filterItemIcon').removeClass('tree-checkbox0 tree-checkbox1 tree-checkbox2').addClass(_getFilterIconCls(row));
                    $('#filterMenu .allFilterItem').find('.filterItemIcon').removeClass('tree-checkbox0 tree-checkbox1 tree-checkbox2').addClass(_getFilterIconCls());
                } else {
                    if (isArray) { t = (opts.headerFilterData.length > 0 ? 0 : 1); }
                    if (t == 0) {
                        $(".datagrid-row", gridBody).removeClass("datagrid-row-hidden");
                        opts.headerFilterData = null;
                    } else {
                        $(".datagrid-row", gridBody).addClass("datagrid-row-hidden");
                        opts.headerFilterData = distinctRows.clone();
                    }
                    var iconClass = _getFilterIconCls();
                    $(target).find('.filterItemIcon').removeClass('tree-checkbox0 tree-checkbox1 tree-checkbox2').addClass(iconClass);
                    $('#filterMenu .rowFilterItem').find('.filterItemIcon').removeClass('tree-checkbox0 tree-checkbox1 tree-checkbox2').addClass(iconClass);
                }
                if (opts.headerFilterData && opts.headerFilterData.length > 0) {
                    headerCell.parent('td[field="' + field + '"]').find(".datagrid-header-filter-icon").addClass("datagrid-header-filtered-icon");
                }
                else {
                    headerCell.parent('td[field="' + field + '"]').find(".datagrid-header-filter-icon").removeClass("datagrid-header-filtered-icon");
                }
            }
            function _getFilterIconCls(row) {
                var icon = "";
                var opts = grid.datagrid("options");
                var isArray = $.isArray(opts.headerFilterData)
                if (row) {
                    icon = (isArray && opts.headerFilterData.contains(row, compare) ? "tree-checkbox0" : "tree-checkbox1");
                }
                else {
                    if (!isArray || opts.headerFilterData.length == 0)
                    { icon = "tree-checkbox1"; }
                    else
                    { icon = (opts.headerFilterData.length == distinctRows.length ? "tree-checkbox0" : "tree-checkbox2"); }
                }
                return icon;
            }

            event.stopPropagation();
            if ($('#filterMenu').length > 0) {
                $('#filterMenu').remove();
                return false;
            }
            var filterPanel = $('<div id="filterMenu" class="panel-body panel-body-noheader" style="width:150px;max-height:150px;position:fixed"></div>').appendTo('body').on('blur', function (event) {
                $(this).remove();
            });
            var field = _getField(this);
            var compare = function (a, b) { return a[field] == b[field]; };
            var sortCompare = function (a, b) {
                var x = Number(a[field]);
                var y = Number(b[field]);
                if (isNaN(x) || isNaN(y)) {
                    return String(a[field]).localeCompare(String(b[field]));
                }
                else {
                    return x - y;
                }
            }
            distinctRows = data.rows.distinct(compare).sort(sortCompare);
            $('<div class="allFilterItem"></div>').appendTo(filterPanel).on('click', function (event) {
                _filterHandler(event, field, this);
            }).append('<img src="/scripts/jquery-easyui-extension/blank.gif" class="filterItemIcon ' + _getFilterIconCls() + '" style="width:15px;height:15px;border:0;"></img><span>全部</span>');

            $('<div class="rowFilterItem"></div>').appendTo(filterPanel).append('<hr/>');
            $.each(distinctRows, function (i, row) {
                $('<div class="rowFilterItem"></div>').appendTo(filterPanel).on('click', function (event) {
                    _filterHandler(event, field, this, row);
                }).append('<img src="/scripts/jquery-easyui-extension/blank.gif" class="filterItemIcon ' + _getFilterIconCls(row) + '" style="width:15px;height:15px;border:0;"></img><span>' + row[field] + '</span>');
            });

            var headerFilterOffSet = $(this).offset();
            filterPanel.css({ left: headerFilterOffSet.left - 150 + 15, top: headerFilterOffSet.top + $(this).outerHeight() });
            filterPanel.focus();
        });
        /***支持列表头过滤***/
        /***支持中文列排序***/
        var cols = grid.datagrid('getColumnFields');
        for (var i = 0; i < cols.length; i++) {
            grid.datagrid('getColumnOption', cols[i]).sorter = function (a, b) {
                var x = Number(a);
                var y = Number(b);
                if (isNaN(x) || isNaN(y)) {
                    return String(a).localeCompare(String(b));
                }
                else {
                    return x - y;
                }
            };
        }
        /***支持中文列排序***/
        return data;
    }
    $.extend($.fn.datagrid.defaults, {
        loadFilter: _datagridLoadFilter
    });

    function _onAfterRender(target) {
        var compare = function (a, b) { return a == b; };
        var opts = $(target).datagrid("options");
        if (opts.showFooter) {
            var gridFooter = $(target).datagrid("getPanel").find("div.datagrid-footer");
            gridFooter.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility", "hidden");
        }
        var rows = $(target).datagrid("getRows");
        var gridBody = $(target).datagrid("getPanel").panel("body").find(".datagrid-view .datagrid-btable");
        if (opts.headerFilterData) {
            $.each(rows, function (index, row) {
                if (opts.headerFilterData.contains(row, compare))
                {
                    gridBody.find('.datagrid-row').eq(index).addClass("datagrid-row-hidden");
                }
            });
        }
    }
    $.extend($.fn.datagrid.defaults.view, {
        onAfterRender: _onAfterRender
    });
})(jQuery);

