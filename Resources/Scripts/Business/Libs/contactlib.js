//
//================================================================================
(function ($) {

    if (!window.business) { window.business = new Object(); }
    if (!window.business.contact) { window.business.contact = new Object(); }

    window.business.contact.getContactByUserKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/ContactService.asmx/GetContactByUserKey"), { UserKey: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var contact = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, contact); }
        });
    }

    window.business.contact.getContactByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/Business/ContactService.asmx/GetContactByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var contact = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, contact); }
        });
    }

    window.business.contact.addContact = function (contactObj, callback) {
//        for (var key in contactObj) {
//            alert(key);
//        }
        $.post(window.resolveUrl("Services/Business/ContactService.asmx/AddContact"), contactObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.business.contact.updateContact = function (contactObj, callback) {
//        for (var key in contactObj) {
//            alert(key);
//        }
        $.post(window.resolveUrl("Services/Business/ContactService.asmx/UpdateContact"), contactObj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    window.business.contact.deleteContact = function (keys, callback) {
        $.post(window.resolveUrl("Services/Business/ContactService.asmx/DeleteContact"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
})(jQuery);
