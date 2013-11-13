////////////////////////////////////////////////////////
/// 定义后台 JSON 数据模型对象转换至前台的 jQuery EasyUI JSON 数据模型对象的转换器。
////////////////////////////////////////////////////////
(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.convert) { window.platform.convert = new Object(); }


    var _defaultNodeOptions = { id: null, text: null, state: null, iconCls: null, checked: null, attributes: {}, children: [] };

    window.platform.convert.toTreeNode = function (item) {
        var opts = {
            id: item.Key, text: item.Name, iconCls: item.IconValue, attributes: { url: item.NavigateUrl },
            pid: item.ParentKey, level: item.Level, sort: item.Sort, base: item
        };
        return $.extend({}, _defaultNodeOptions, opts);
    };

    window.platform.convert.toTreeArray = function (data) {
        if (!$.isArray(data)) { $.error("传入的数据格式有误"); }
        if (data.length == 0) { return data; }
        var array = new Array();
        for (var i = 0; i < data.length; i++) { array.push(window.platform.convert.toTreeNode(data[i])); }
        array.sort(function (a, b) {
            var level = a.level - b.level;
            if (level == 0) { return a.sort - b.sort; }
            return level;
        });
        return array;
    };


    var _findChildren = function (trees, item, level) {
        var result = new Array();
        result = trees.filter(function (node) { return item.id == node.pid && node.level == level; });
        for (var i = 0; i < result.length; i++) {
            result[i].children = _findChildren(trees, result[i], level + 1);
        }
        return result;
    };
    window.platform.convert.toTreeData = function (data) {
        if (!$.isArray(data)) { $.error("传入的数据格式有误"); }
        var result = new Array();
        var trees = window.platform.convert.toTreeArray(data);
        if (trees.length > 0) {
            var minLevel = trees[0].level;
            result = trees.filter(function (item) { return item.level == minLevel }).sort(function (a, b) { return a.sort - b.sort; });
            for (var i = 0; i < result.length; i++) {
                var item = result[i];
                item.children = _findChildren(trees, item, minLevel + 1).sort(function (a, b) { return a.sort - b.sort; });
            }
        }
        return result;
    };
})(jQuery);