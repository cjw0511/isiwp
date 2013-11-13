/*
======================================================================================
jquery.easyui 扩展.
基于 jquery-1.8.2 和 jquery-easyui 1.3.1 实现。
======================================================================================
*/


/*
===========================================
//重新定向传入的 <a></a> 标签的 target 值使之在当前顶部window.document打开新的easyui选项卡
===========================================
*/
var redirectATarget = function (aTarget) {
    var target = $(aTarget).attr("target");
    if (target == "_blank" || target == "_search") {
        var href = $(aTarget).attr("href");
        var iconCls = null;
        try {
            iconCls = $(aTarget).linkbutton("options").iconCls;
            if (iconCls == "undefined" || iconCls == null) {
                iconCls = "icon-tab";
            }
        } catch (ex) {
            iconCls = "icon-tab";
        }
        $(aTarget).attr("href", "javascript:void(0);");
        $(aTarget).removeAttr("target");
        $(aTarget).click(function () {
            window.top.addTab($(aTarget).text(), href, iconCls, true);
        });
    }
};


/*
===========================================
//在document加载时调用该代码段，使得所有的 <a target="_blank" /> 标签效果变为在当前顶部window.document打开新的easyui选项卡
===========================================
*/
$(function () {
    $("a").each(function (i, e) {
        redirectATarget(e);
    });
});
















