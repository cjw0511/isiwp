(function ($, undefined) {

	if (!$.easyui) { $.easyui = {}; }

    var iconData = [
        { iconCls: "icon-woocons-32-arrow-down", cls: ".icon-woocons-32-arrow-down", text: "icon-woocons-32-arrow-down", style: "woocons", path: "icon-woocons/32x32/arrow-down.png" },
        { iconCls: "icon-woocons-32-arrow-left", cls: ".icon-woocons-32-arrow-left", text: "icon-woocons-32-arrow-left", style: "woocons", path: "icon-woocons/32x32/arrow-left.png" },
        { iconCls: "icon-woocons-32-arrow-right", cls: ".icon-woocons-32-arrow-right", text: "icon-woocons-32-arrow-right", style: "woocons", path: "icon-woocons/32x32/arrow-right.png" },
        { iconCls: "icon-woocons-32-arrow-up", cls: ".icon-woocons-32-arrow-up", text: "icon-woocons-32-arrow-up", style: "woocons", path: "icon-woocons/32x32/arrow-up.png" },
        { iconCls: "icon-woocons-32-black-board", cls: ".icon-woocons-32-black-board", text: "icon-woocons-32-black-board", style: "woocons", path: "icon-woocons/32x32/black-board.png" },
        { iconCls: "icon-woocons-32-bluetooth", cls: ".icon-woocons-32-bluetooth", text: "icon-woocons-32-bluetooth", style: "woocons", path: "icon-woocons/32x32/bluetooth.png" },
        { iconCls: "icon-woocons-32-bookmarks", cls: ".icon-woocons-32-bookmarks", text: "icon-woocons-32-bookmarks", style: "woocons", path: "icon-woocons/32x32/bookmarks.png" },
        { iconCls: "icon-woocons-32-box-add", cls: ".icon-woocons-32-box-add", text: "icon-woocons-32-box-add", style: "woocons", path: "icon-woocons/32x32/box-add.png" },
        { iconCls: "icon-woocons-32-box-down", cls: ".icon-woocons-32-box-down", text: "icon-woocons-32-box-down", style: "woocons", path: "icon-woocons/32x32/box-down.png" },
        { iconCls: "icon-woocons-32-box-remove", cls: ".icon-woocons-32-box-remove", text: "icon-woocons-32-box-remove", style: "woocons", path: "icon-woocons/32x32/box-remove.png" },
        { iconCls: "icon-woocons-32-box-up", cls: ".icon-woocons-32-box-up", text: "icon-woocons-32-box-up", style: "woocons", path: "icon-woocons/32x32/box-up.png" },
        { iconCls: "icon-woocons-32-box", cls: ".icon-woocons-32-box", text: "icon-woocons-32-box", style: "woocons", path: "icon-woocons/32x32/box.png" },
        { iconCls: "icon-woocons-32-briefcase", cls: ".icon-woocons-32-briefcase", text: "icon-woocons-32-briefcase", style: "woocons", path: "icon-woocons/32x32/briefcase.png" },
        { iconCls: "icon-woocons-32-bug", cls: ".icon-woocons-32-bug", text: "icon-woocons-32-bug", style: "woocons", path: "icon-woocons/32x32/bug.png" },
        { iconCls: "icon-woocons-32-button-add", cls: ".icon-woocons-32-button-add", text: "icon-woocons-32-button-add", style: "woocons", path: "icon-woocons/32x32/button-add.png" },
        { iconCls: "icon-woocons-32-button-burn", cls: ".icon-woocons-32-button-burn", text: "icon-woocons-32-button-burn", style: "woocons", path: "icon-woocons/32x32/button-burn.png" },
        { iconCls: "icon-woocons-32-button-check", cls: ".icon-woocons-32-button-check", text: "icon-woocons-32-button-check", style: "woocons", path: "icon-woocons/32x32/button-check.png" },
        { iconCls: "icon-woocons-32-button-color-circle", cls: ".icon-woocons-32-button-color-circle", text: "icon-woocons-32-button-color-circle", style: "woocons", path: "icon-woocons/32x32/button-color-circle.png" },
        { iconCls: "icon-woocons-32-button-eject", cls: ".icon-woocons-32-button-eject", text: "icon-woocons-32-button-eject", style: "woocons", path: "icon-woocons/32x32/button-eject.png" },
        { iconCls: "icon-woocons-32-button-help", cls: ".icon-woocons-32-button-help", text: "icon-woocons-32-button-help", style: "woocons", path: "icon-woocons/32x32/button-help.png" },
        { iconCls: "icon-woocons-32-button-info", cls: ".icon-woocons-32-button-info", text: "icon-woocons-32-button-info", style: "woocons", path: "icon-woocons/32x32/button-info.png" },
        { iconCls: "icon-woocons-32-button-load", cls: ".icon-woocons-32-button-load", text: "icon-woocons-32-button-load", style: "woocons", path: "icon-woocons/32x32/button-load.png" },
        { iconCls: "icon-woocons-32-button-next", cls: ".icon-woocons-32-button-next", text: "icon-woocons-32-button-next", style: "woocons", path: "icon-woocons/32x32/button-next.png" },
        { iconCls: "icon-woocons-32-button-pause", cls: ".icon-woocons-32-button-pause", text: "icon-woocons-32-button-pause", style: "woocons", path: "icon-woocons/32x32/button-pause.png" },
        { iconCls: "icon-woocons-32-button-play", cls: ".icon-woocons-32-button-play", text: "icon-woocons-32-button-play", style: "woocons", path: "icon-woocons/32x32/button-play.png" },
        { iconCls: "icon-woocons-32-button-previous", cls: ".icon-woocons-32-button-previous", text: "icon-woocons-32-button-previous", style: "woocons", path: "icon-woocons/32x32/button-previous.png" },
        { iconCls: "icon-woocons-32-button-record-active", cls: ".icon-woocons-32-button-record-active", text: "icon-woocons-32-button-record-active", style: "woocons", path: "icon-woocons/32x32/button-record-active.png" },
        { iconCls: "icon-woocons-32-button-record", cls: ".icon-woocons-32-button-record", text: "icon-woocons-32-button-record", style: "woocons", path: "icon-woocons/32x32/button-record.png" },
        { iconCls: "icon-woocons-32-button-remove", cls: ".icon-woocons-32-button-remove", text: "icon-woocons-32-button-remove", style: "woocons", path: "icon-woocons/32x32/button-remove.png" },
        { iconCls: "icon-woocons-32-button-rss", cls: ".icon-woocons-32-button-rss", text: "icon-woocons-32-button-rss", style: "woocons", path: "icon-woocons/32x32/button-rss.png" },
        { iconCls: "icon-woocons-32-button-stop", cls: ".icon-woocons-32-button-stop", text: "icon-woocons-32-button-stop", style: "woocons", path: "icon-woocons/32x32/button-stop.png" },
        { iconCls: "icon-woocons-32-button-white-add", cls: ".icon-woocons-32-button-white-add", text: "icon-woocons-32-button-white-add", style: "woocons", path: "icon-woocons/32x32/button-white-add.png" },
        { iconCls: "icon-woocons-32-button-white-check", cls: ".icon-woocons-32-button-white-check", text: "icon-woocons-32-button-white-check", style: "woocons", path: "icon-woocons/32x32/button-white-check.png" },
        { iconCls: "icon-woocons-32-button-white-help", cls: ".icon-woocons-32-button-white-help", text: "icon-woocons-32-button-white-help", style: "woocons", path: "icon-woocons/32x32/button-white-help.png" },
        { iconCls: "icon-woocons-32-button-white-info", cls: ".icon-woocons-32-button-white-info", text: "icon-woocons-32-button-white-info", style: "woocons", path: "icon-woocons/32x32/button-white-info.png" },
        { iconCls: "icon-woocons-32-button-white-load", cls: ".icon-woocons-32-button-white-load", text: "icon-woocons-32-button-white-load", style: "woocons", path: "icon-woocons/32x32/button-white-load.png" },
        { iconCls: "icon-woocons-32-button-white-remove", cls: ".icon-woocons-32-button-white-remove", text: "icon-woocons-32-button-white-remove", style: "woocons", path: "icon-woocons/32x32/button-white-remove.png" },
        { iconCls: "icon-woocons-32-button-white-rss", cls: ".icon-woocons-32-button-white-rss", text: "icon-woocons-32-button-white-rss", style: "woocons", path: "icon-woocons/32x32/button-white-rss.png" },
        { iconCls: "icon-woocons-32-button-white-stop", cls: ".icon-woocons-32-button-white-stop", text: "icon-woocons-32-button-white-stop", style: "woocons", path: "icon-woocons/32x32/button-white-stop.png" },
        { iconCls: "icon-woocons-32-calendar", cls: ".icon-woocons-32-calendar", text: "icon-woocons-32-calendar", style: "woocons", path: "icon-woocons/32x32/calendar.png" },
        { iconCls: "icon-woocons-32-camera", cls: ".icon-woocons-32-camera", text: "icon-woocons-32-camera", style: "woocons", path: "icon-woocons/32x32/camera.png" },
        { iconCls: "icon-woocons-32-chart-bar", cls: ".icon-woocons-32-chart-bar", text: "icon-woocons-32-chart-bar", style: "woocons", path: "icon-woocons/32x32/chart-bar.png" },
        { iconCls: "icon-woocons-32-chart-pie", cls: ".icon-woocons-32-chart-pie", text: "icon-woocons-32-chart-pie", style: "woocons", path: "icon-woocons/32x32/chart-pie.png" },
        { iconCls: "icon-woocons-32-chart", cls: ".icon-woocons-32-chart", text: "icon-woocons-32-chart", style: "woocons", path: "icon-woocons/32x32/chart.png" },
        { iconCls: "icon-woocons-32-checkbox-empty", cls: ".icon-woocons-32-checkbox-empty", text: "icon-woocons-32-checkbox-empty", style: "woocons", path: "icon-woocons/32x32/checkbox-empty.png" },
        { iconCls: "icon-woocons-32-checkbox-full", cls: ".icon-woocons-32-checkbox-full", text: "icon-woocons-32-checkbox-full", style: "woocons", path: "icon-woocons/32x32/checkbox-full.png" },
        { iconCls: "icon-woocons-32-clock-alarm", cls: ".icon-woocons-32-clock-alarm", text: "icon-woocons-32-clock-alarm", style: "woocons", path: "icon-woocons/32x32/clock-alarm.png" },
        { iconCls: "icon-woocons-32-clock", cls: ".icon-woocons-32-clock", text: "icon-woocons-32-clock", style: "woocons", path: "icon-woocons/32x32/clock.png" },
        { iconCls: "icon-woocons-32-cmd-key", cls: ".icon-woocons-32-cmd-key", text: "icon-woocons-32-cmd-key", style: "woocons", path: "icon-woocons/32x32/cmd-key.png" },
        { iconCls: "icon-woocons-32-cocktail", cls: ".icon-woocons-32-cocktail", text: "icon-woocons-32-cocktail", style: "woocons", path: "icon-woocons/32x32/cocktail.png" },
        { iconCls: "icon-woocons-32-cog", cls: ".icon-woocons-32-cog", text: "icon-woocons-32-cog", style: "woocons", path: "icon-woocons/32x32/cog.png" },
        { iconCls: "icon-woocons-32-comment-add", cls: ".icon-woocons-32-comment-add", text: "icon-woocons-32-comment-add", style: "woocons", path: "icon-woocons/32x32/comment-add.png" },
        { iconCls: "icon-woocons-32-comment-edit", cls: ".icon-woocons-32-comment-edit", text: "icon-woocons-32-comment-edit", style: "woocons", path: "icon-woocons/32x32/comment-edit.png" },
        { iconCls: "icon-woocons-32-comment-remove", cls: ".icon-woocons-32-comment-remove", text: "icon-woocons-32-comment-remove", style: "woocons", path: "icon-woocons/32x32/comment-remove.png" },
        { iconCls: "icon-woocons-32-comment", cls: ".icon-woocons-32-comment", text: "icon-woocons-32-comment", style: "woocons", path: "icon-woocons/32x32/comment.png" },
        { iconCls: "icon-woocons-32-computer-off", cls: ".icon-woocons-32-computer-off", text: "icon-woocons-32-computer-off", style: "woocons", path: "icon-woocons/32x32/computer-off.png" },
        { iconCls: "icon-woocons-32-computer-on", cls: ".icon-woocons-32-computer-on", text: "icon-woocons-32-computer-on", style: "woocons", path: "icon-woocons/32x32/computer-on.png" },
        { iconCls: "icon-woocons-32-contact", cls: ".icon-woocons-32-contact", text: "icon-woocons-32-contact", style: "woocons", path: "icon-woocons/32x32/contact.png" },
        { iconCls: "icon-woocons-32-contacts-add", cls: ".icon-woocons-32-contacts-add", text: "icon-woocons-32-contacts-add", style: "woocons", path: "icon-woocons/32x32/contacts-add.png" },
        { iconCls: "icon-woocons-32-contacts-remove", cls: ".icon-woocons-32-contacts-remove", text: "icon-woocons-32-contacts-remove", style: "woocons", path: "icon-woocons/32x32/contacts-remove.png" },
        { iconCls: "icon-woocons-32-contacts-sync", cls: ".icon-woocons-32-contacts-sync", text: "icon-woocons-32-contacts-sync", style: "woocons", path: "icon-woocons/32x32/contacts-sync.png" },
        { iconCls: "icon-woocons-32-contacts", cls: ".icon-woocons-32-contacts", text: "icon-woocons-32-contacts", style: "woocons", path: "icon-woocons/32x32/contacts.png" },
        { iconCls: "icon-woocons-32-credit-card-paypal", cls: ".icon-woocons-32-credit-card-paypal", text: "icon-woocons-32-credit-card-paypal", style: "woocons", path: "icon-woocons/32x32/credit-card-paypal.png" },
        { iconCls: "icon-woocons-32-credit-card", cls: ".icon-woocons-32-credit-card", text: "icon-woocons-32-credit-card", style: "woocons", path: "icon-woocons/32x32/credit-card.png" },
        { iconCls: "icon-woocons-32-dashboard", cls: ".icon-woocons-32-dashboard", text: "icon-woocons-32-dashboard", style: "woocons", path: "icon-woocons/32x32/dashboard.png" },
        { iconCls: "icon-woocons-32-database-add", cls: ".icon-woocons-32-database-add", text: "icon-woocons-32-database-add", style: "woocons", path: "icon-woocons/32x32/database-add.png" },
        { iconCls: "icon-woocons-32-database-remove", cls: ".icon-woocons-32-database-remove", text: "icon-woocons-32-database-remove", style: "woocons", path: "icon-woocons/32x32/database-remove.png" },
        { iconCls: "icon-woocons-32-database", cls: ".icon-woocons-32-database", text: "icon-woocons-32-database", style: "woocons", path: "icon-woocons/32x32/database.png" },
        { iconCls: "icon-woocons-32-desktop", cls: ".icon-woocons-32-desktop", text: "icon-woocons-32-desktop", style: "woocons", path: "icon-woocons/32x32/desktop.png" },
        { iconCls: "icon-woocons-32-disc-blu-ray", cls: ".icon-woocons-32-disc-blu-ray", text: "icon-woocons-32-disc-blu-ray", style: "woocons", path: "icon-woocons/32x32/disc-blu-ray.png" },
        { iconCls: "icon-woocons-32-disc-dvd", cls: ".icon-woocons-32-disc-dvd", text: "icon-woocons-32-disc-dvd", style: "woocons", path: "icon-woocons/32x32/disc-dvd.png" },
        { iconCls: "icon-woocons-32-document-add", cls: ".icon-woocons-32-document-add", text: "icon-woocons-32-document-add", style: "woocons", path: "icon-woocons/32x32/document-add.png" },
        { iconCls: "icon-woocons-32-document-blueprint", cls: ".icon-woocons-32-document-blueprint", text: "icon-woocons-32-document-blueprint", style: "woocons", path: "icon-woocons/32x32/document-blueprint.png" },
        { iconCls: "icon-woocons-32-document-checklist", cls: ".icon-woocons-32-document-checklist", text: "icon-woocons-32-document-checklist", style: "woocons", path: "icon-woocons/32x32/document-checklist.png" },
        { iconCls: "icon-woocons-32-document-edit", cls: ".icon-woocons-32-document-edit", text: "icon-woocons-32-document-edit", style: "woocons", path: "icon-woocons/32x32/document-edit.png" },
        { iconCls: "icon-woocons-32-document-remove", cls: ".icon-woocons-32-document-remove", text: "icon-woocons-32-document-remove", style: "woocons", path: "icon-woocons/32x32/document-remove.png" },
        { iconCls: "icon-woocons-32-document", cls: ".icon-woocons-32-document", text: "icon-woocons-32-document", style: "woocons", path: "icon-woocons/32x32/document.png" },
        { iconCls: "icon-woocons-32-drawer-closed", cls: ".icon-woocons-32-drawer-closed", text: "icon-woocons-32-drawer-closed", style: "woocons", path: "icon-woocons/32x32/drawer-closed.png" },
        { iconCls: "icon-woocons-32-drawer-open", cls: ".icon-woocons-32-drawer-open", text: "icon-woocons-32-drawer-open", style: "woocons", path: "icon-woocons/32x32/drawer-open.png" },
        { iconCls: "icon-woocons-32-file-add", cls: ".icon-woocons-32-file-add", text: "icon-woocons-32-file-add", style: "woocons", path: "icon-woocons/32x32/file-add.png" },
        { iconCls: "icon-woocons-32-file-receive", cls: ".icon-woocons-32-file-receive", text: "icon-woocons-32-file-receive", style: "woocons", path: "icon-woocons/32x32/file-receive.png" },
        { iconCls: "icon-woocons-32-file-remove", cls: ".icon-woocons-32-file-remove", text: "icon-woocons-32-file-remove", style: "woocons", path: "icon-woocons/32x32/file-remove.png" },
        { iconCls: "icon-woocons-32-file-send", cls: ".icon-woocons-32-file-send", text: "icon-woocons-32-file-send", style: "woocons", path: "icon-woocons/32x32/file-send.png" },
        { iconCls: "icon-woocons-32-file", cls: ".icon-woocons-32-file", text: "icon-woocons-32-file", style: "woocons", path: "icon-woocons/32x32/file.png" },
        { iconCls: "icon-woocons-32-finder", cls: ".icon-woocons-32-finder", text: "icon-woocons-32-finder", style: "woocons", path: "icon-woocons/32x32/finder.png" },
        { iconCls: "icon-woocons-32-folder-add", cls: ".icon-woocons-32-folder-add", text: "icon-woocons-32-folder-add", style: "woocons", path: "icon-woocons/32x32/folder-add.png" },
        { iconCls: "icon-woocons-32-folder-remove", cls: ".icon-woocons-32-folder-remove", text: "icon-woocons-32-folder-remove", style: "woocons", path: "icon-woocons/32x32/folder-remove.png" },
        { iconCls: "icon-woocons-32-folder-smart", cls: ".icon-woocons-32-folder-smart", text: "icon-woocons-32-folder-smart", style: "woocons", path: "icon-woocons/32x32/folder-smart.png" },
        { iconCls: "icon-woocons-32-folder-sync", cls: ".icon-woocons-32-folder-sync", text: "icon-woocons-32-folder-sync", style: "woocons", path: "icon-woocons/32x32/folder-sync.png" },
        { iconCls: "icon-woocons-32-folder", cls: ".icon-woocons-32-folder", text: "icon-woocons-32-folder", style: "woocons", path: "icon-woocons/32x32/folder.png" },
        { iconCls: "icon-woocons-32-fonts", cls: ".icon-woocons-32-fonts", text: "icon-woocons-32-fonts", style: "woocons", path: "icon-woocons/32x32/fonts.png" },
        { iconCls: "icon-woocons-32-fork", cls: ".icon-woocons-32-fork", text: "icon-woocons-32-fork", style: "woocons", path: "icon-woocons/32x32/fork.png" },
        { iconCls: "icon-woocons-32-globe-active", cls: ".icon-woocons-32-globe-active", text: "icon-woocons-32-globe-active", style: "woocons", path: "icon-woocons/32x32/globe-active.png" },
        { iconCls: "icon-woocons-32-globe-inactive", cls: ".icon-woocons-32-globe-inactive", text: "icon-woocons-32-globe-inactive", style: "woocons", path: "icon-woocons/32x32/globe-inactive.png" },
        { iconCls: "icon-woocons-32-glyph-add", cls: ".icon-woocons-32-glyph-add", text: "icon-woocons-32-glyph-add", style: "woocons", path: "icon-woocons/32x32/glyph-add.png" },
        { iconCls: "icon-woocons-32-glyph-check", cls: ".icon-woocons-32-glyph-check", text: "icon-woocons-32-glyph-check", style: "woocons", path: "icon-woocons/32x32/glyph-check.png" },
        { iconCls: "icon-woocons-32-glyph-remove", cls: ".icon-woocons-32-glyph-remove", text: "icon-woocons-32-glyph-remove", style: "woocons", path: "icon-woocons/32x32/glyph-remove.png" },
        { iconCls: "icon-woocons-32-home", cls: ".icon-woocons-32-home", text: "icon-woocons-32-home", style: "woocons", path: "icon-woocons/32x32/home.png" },
        { iconCls: "icon-woocons-32-ipad", cls: ".icon-woocons-32-ipad", text: "icon-woocons-32-ipad", style: "woocons", path: "icon-woocons/32x32/ipad.png" },
        { iconCls: "icon-woocons-32-iphone", cls: ".icon-woocons-32-iphone", text: "icon-woocons-32-iphone", style: "woocons", path: "icon-woocons/32x32/iphone.png" },
        { iconCls: "icon-woocons-32-light-bulb-off", cls: ".icon-woocons-32-light-bulb-off", text: "icon-woocons-32-light-bulb-off", style: "woocons", path: "icon-woocons/32x32/light-bulb-off.png" },
        { iconCls: "icon-woocons-32-light-bulb-on", cls: ".icon-woocons-32-light-bulb-on", text: "icon-woocons-32-light-bulb-on", style: "woocons", path: "icon-woocons/32x32/light-bulb-on.png" },
        { iconCls: "icon-woocons-32-link", cls: ".icon-woocons-32-link", text: "icon-woocons-32-link", style: "woocons", path: "icon-woocons/32x32/link.png" },
        { iconCls: "icon-woocons-32-lock-closed", cls: ".icon-woocons-32-lock-closed", text: "icon-woocons-32-lock-closed", style: "woocons", path: "icon-woocons/32x32/lock-closed.png" },
        { iconCls: "icon-woocons-32-lock-open", cls: ".icon-woocons-32-lock-open", text: "icon-woocons-32-lock-open", style: "woocons", path: "icon-woocons/32x32/lock-open.png" },
        { iconCls: "icon-woocons-32-love", cls: ".icon-woocons-32-love", text: "icon-woocons-32-love", style: "woocons", path: "icon-woocons/32x32/love.png" },
        { iconCls: "icon-woocons-32-magic-wand", cls: ".icon-woocons-32-magic-wand", text: "icon-woocons-32-magic-wand", style: "woocons", path: "icon-woocons/32x32/magic-wand.png" },
        { iconCls: "icon-woocons-32-mail-add", cls: ".icon-woocons-32-mail-add", text: "icon-woocons-32-mail-add", style: "woocons", path: "icon-woocons/32x32/mail-add.png" },
        { iconCls: "icon-woocons-32-mail-edit", cls: ".icon-woocons-32-mail-edit", text: "icon-woocons-32-mail-edit", style: "woocons", path: "icon-woocons/32x32/mail-edit.png" },
        { iconCls: "icon-woocons-32-mail-forward", cls: ".icon-woocons-32-mail-forward", text: "icon-woocons-32-mail-forward", style: "woocons", path: "icon-woocons/32x32/mail-forward.png" },
        { iconCls: "icon-woocons-32-mail-open", cls: ".icon-woocons-32-mail-open", text: "icon-woocons-32-mail-open", style: "woocons", path: "icon-woocons/32x32/mail-open.png" },
        { iconCls: "icon-woocons-32-mail-receive", cls: ".icon-woocons-32-mail-receive", text: "icon-woocons-32-mail-receive", style: "woocons", path: "icon-woocons/32x32/mail-receive.png" },
        { iconCls: "icon-woocons-32-mail-remove", cls: ".icon-woocons-32-mail-remove", text: "icon-woocons-32-mail-remove", style: "woocons", path: "icon-woocons/32x32/mail-remove.png" },
        { iconCls: "icon-woocons-32-mail-reply", cls: ".icon-woocons-32-mail-reply", text: "icon-woocons-32-mail-reply", style: "woocons", path: "icon-woocons/32x32/mail-reply.png" },
        { iconCls: "icon-woocons-32-mail-send", cls: ".icon-woocons-32-mail-send", text: "icon-woocons-32-mail-send", style: "woocons", path: "icon-woocons/32x32/mail-send.png" },
        { iconCls: "icon-woocons-32-mail", cls: ".icon-woocons-32-mail", text: "icon-woocons-32-mail", style: "woocons", path: "icon-woocons/32x32/mail.png" },
        { iconCls: "icon-woocons-32-maps", cls: ".icon-woocons-32-maps", text: "icon-woocons-32-maps", style: "woocons", path: "icon-woocons/32x32/maps.png" },
        { iconCls: "icon-woocons-32-mobile-phone", cls: ".icon-woocons-32-mobile-phone", text: "icon-woocons-32-mobile-phone", style: "woocons", path: "icon-woocons/32x32/mobile-phone.png" },
        { iconCls: "icon-woocons-32-money-bundle", cls: ".icon-woocons-32-money-bundle", text: "icon-woocons-32-money-bundle", style: "woocons", path: "icon-woocons/32x32/money-bundle.png" },
        { iconCls: "icon-woocons-32-money", cls: ".icon-woocons-32-money", text: "icon-woocons-32-money", style: "woocons", path: "icon-woocons/32x32/money.png" },
        { iconCls: "icon-woocons-32-movies", cls: ".icon-woocons-32-movies", text: "icon-woocons-32-movies", style: "woocons", path: "icon-woocons/32x32/movies.png" },
        { iconCls: "icon-woocons-32-music-blue", cls: ".icon-woocons-32-music-blue", text: "icon-woocons-32-music-blue", style: "woocons", path: "icon-woocons/32x32/music-blue.png" },
        { iconCls: "icon-woocons-32-music-green", cls: ".icon-woocons-32-music-green", text: "icon-woocons-32-music-green", style: "woocons", path: "icon-woocons/32x32/music-green.png" },
        { iconCls: "icon-woocons-32-music-red", cls: ".icon-woocons-32-music-red", text: "icon-woocons-32-music-red", style: "woocons", path: "icon-woocons/32x32/music-red.png" },
        { iconCls: "icon-woocons-32-news-add", cls: ".icon-woocons-32-news-add", text: "icon-woocons-32-news-add", style: "woocons", path: "icon-woocons/32x32/news-add.png" },
        { iconCls: "icon-woocons-32-news-remove", cls: ".icon-woocons-32-news-remove", text: "icon-woocons-32-news-remove", style: "woocons", path: "icon-woocons/32x32/news-remove.png" },
        { iconCls: "icon-woocons-32-news", cls: ".icon-woocons-32-news", text: "icon-woocons-32-news", style: "woocons", path: "icon-woocons/32x32/news.png" },
        { iconCls: "icon-woocons-32-note-pinned", cls: ".icon-woocons-32-note-pinned", text: "icon-woocons-32-note-pinned", style: "woocons", path: "icon-woocons/32x32/note-pinned.png" },
        { iconCls: "icon-woocons-32-note-sticky", cls: ".icon-woocons-32-note-sticky", text: "icon-woocons-32-note-sticky", style: "woocons", path: "icon-woocons/32x32/note-sticky.png" },
        { iconCls: "icon-woocons-32-pencil", cls: ".icon-woocons-32-pencil", text: "icon-woocons-32-pencil", style: "woocons", path: "icon-woocons/32x32/pencil.png" },
        { iconCls: "icon-woocons-32-pictures", cls: ".icon-woocons-32-pictures", text: "icon-woocons-32-pictures", style: "woocons", path: "icon-woocons/32x32/pictures.png" },
        { iconCls: "icon-woocons-32-printer", cls: ".icon-woocons-32-printer", text: "icon-woocons-32-printer", style: "woocons", path: "icon-woocons/32x32/printer.png" },
        { iconCls: "icon-woocons-32-private", cls: ".icon-woocons-32-private", text: "icon-woocons-32-private", style: "woocons", path: "icon-woocons/32x32/private.png" },
        { iconCls: "icon-woocons-32-ruler", cls: ".icon-woocons-32-ruler", text: "icon-woocons-32-ruler", style: "woocons", path: "icon-woocons/32x32/ruler.png" },
        { iconCls: "icon-woocons-32-search-add", cls: ".icon-woocons-32-search-add", text: "icon-woocons-32-search-add", style: "woocons", path: "icon-woocons/32x32/search-add.png" },
        { iconCls: "icon-woocons-32-search-remove", cls: ".icon-woocons-32-search-remove", text: "icon-woocons-32-search-remove", style: "woocons", path: "icon-woocons/32x32/search-remove.png" },
        { iconCls: "icon-woocons-32-search", cls: ".icon-woocons-32-search", text: "icon-woocons-32-search", style: "woocons", path: "icon-woocons/32x32/search.png" },
        { iconCls: "icon-woocons-32-sign-public", cls: ".icon-woocons-32-sign-public", text: "icon-woocons-32-sign-public", style: "woocons", path: "icon-woocons/32x32/sign-public.png" },
        { iconCls: "icon-woocons-32-sign-warning", cls: ".icon-woocons-32-sign-warning", text: "icon-woocons-32-sign-warning", style: "woocons", path: "icon-woocons/32x32/sign-warning.png" },
        { iconCls: "icon-woocons-32-smiley-happy", cls: ".icon-woocons-32-smiley-happy", text: "icon-woocons-32-smiley-happy", style: "woocons", path: "icon-woocons/32x32/smiley-happy.png" },
        { iconCls: "icon-woocons-32-smiley-sad", cls: ".icon-woocons-32-smiley-sad", text: "icon-woocons-32-smiley-sad", style: "woocons", path: "icon-woocons/32x32/smiley-sad.png" },
        { iconCls: "icon-woocons-32-speaker", cls: ".icon-woocons-32-speaker", text: "icon-woocons-32-speaker", style: "woocons", path: "icon-woocons/32x32/speaker.png" },
        { iconCls: "icon-woocons-32-star-off", cls: ".icon-woocons-32-star-off", text: "icon-woocons-32-star-off", style: "woocons", path: "icon-woocons/32x32/star-off.png" },
        { iconCls: "icon-woocons-32-star-on", cls: ".icon-woocons-32-star-on", text: "icon-woocons-32-star-on", style: "woocons", path: "icon-woocons/32x32/star-on.png" },
        { iconCls: "icon-woocons-32-stop", cls: ".icon-woocons-32-stop", text: "icon-woocons-32-stop", style: "woocons", path: "icon-woocons/32x32/stop.png" },
        { iconCls: "icon-woocons-32-system-activity-monitor", cls: ".icon-woocons-32-system-activity-monitor", text: "icon-woocons-32-system-activity-monitor", style: "woocons", path: "icon-woocons/32x32/system-activity-monitor.png" },
        { iconCls: "icon-woocons-32-system-equalizer", cls: ".icon-woocons-32-system-equalizer", text: "icon-woocons-32-system-equalizer", style: "woocons", path: "icon-woocons/32x32/system-equalizer.png" },
        { iconCls: "icon-woocons-32-system-preferences", cls: ".icon-woocons-32-system-preferences", text: "icon-woocons-32-system-preferences", style: "woocons", path: "icon-woocons/32x32/system-preferences.png" },
        { iconCls: "icon-woocons-32-system-terminal", cls: ".icon-woocons-32-system-terminal", text: "icon-woocons-32-system-terminal", style: "woocons", path: "icon-woocons/32x32/system-terminal.png" },
        { iconCls: "icon-woocons-32-trash-empty", cls: ".icon-woocons-32-trash-empty", text: "icon-woocons-32-trash-empty", style: "woocons", path: "icon-woocons/32x32/trash-empty.png" },
        { iconCls: "icon-woocons-32-trash-full", cls: ".icon-woocons-32-trash-full", text: "icon-woocons-32-trash-full", style: "woocons", path: "icon-woocons/32x32/trash-full.png" },
        { iconCls: "icon-woocons-32-trash-shredder", cls: ".icon-woocons-32-trash-shredder", text: "icon-woocons-32-trash-shredder", style: "woocons", path: "icon-woocons/32x32/trash-shredder.png" },
        { iconCls: "icon-woocons-32-tv-off", cls: ".icon-woocons-32-tv-off", text: "icon-woocons-32-tv-off", style: "woocons", path: "icon-woocons/32x32/tv-off.png" },
        { iconCls: "icon-woocons-32-tv-on", cls: ".icon-woocons-32-tv-on", text: "icon-woocons-32-tv-on", style: "woocons", path: "icon-woocons/32x32/tv-on.png" },
        { iconCls: "icon-woocons-32-user", cls: ".icon-woocons-32-user", text: "icon-woocons-32-user", style: "woocons", path: "icon-woocons/32x32/user.png" },
        { iconCls: "icon-woocons-32-users", cls: ".icon-woocons-32-users", text: "icon-woocons-32-users", style: "woocons", path: "icon-woocons/32x32/users.png" },
        { iconCls: "icon-woocons-32-wifi-singal", cls: ".icon-woocons-32-wifi-singal", text: "icon-woocons-32-wifi-singal", style: "woocons", path: "icon-woocons/32x32/wifi-singal.png" },
        { iconCls: "icon-woocons-32-window-move", cls: ".icon-woocons-32-window-move", text: "icon-woocons-32-window-move", style: "woocons", path: "icon-woocons/32x32/window-move.png" },
        { iconCls: "icon-woocons-32-window-resize", cls: ".icon-woocons-32-window-resize", text: "icon-woocons-32-window-resize", style: "woocons", path: "icon-woocons/32x32/window-resize.png" },
        { iconCls: "icon-woocons-32-window", cls: ".icon-woocons-32-window", text: "icon-woocons-32-window", style: "woocons", path: "icon-woocons/32x32/window.png" }
    ];

    if ($.isArray($.easyui.icons)) { $.array.merge($.easyui.icons, iconData); } else { $.easyui.icons = iconData; }

	var iconStyle = { name: "woocons", size: "32" };
	if ($.isArray($.easyui.iconStyles)) { $.array.merge($.easyui.iconStyles, iconStyle); } else { $.easyui.iconStyles = [iconStyle]; }

})(jQuery);