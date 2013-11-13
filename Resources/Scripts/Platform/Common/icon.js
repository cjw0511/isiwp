(function ($) {
    if (!window.platform) { window.platform = new Object(); }
    if (!window.platform.icon) { window.platform.icon = new Object(); }

    var _resolveUrl = window.resolveUrl;


    window.platform.icon.getIcon = function (key, callback) {
        $.post(_resolveUrl("./Services/Platform/IconService.asmx/GetIcon"), function (data, textStatus, XMLHttpRequest) {
            var json = $.plugin.parseSOADataToJSON(data);
            if ($.isFunction(callback)) { callback.call(this, json); }
        });
    };

})(jQuery);