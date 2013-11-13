//
//================================================================================
//  该文件提供 Platform 平台项目的用户组处理的 javascript 函数库，例如增加、修改、删除和查询普通以及收藏夹菜单等功能。
//  该文件基于 util.js 、 jquery-1.8.0.min.js、jquery-easyui-1.3.1.js、jq.extent.easyui.js 以及 comlib.js 构建。
//================================================================================
//

(function ($) {

    if (!window.lorelibs) { window.lorelibs = new Object(); }
    if (!window.lorelibs.norm) { window.lorelibs.norm = new Object(); }

    ////根据行业key获取行业
    window.lorelibs.norm.getTradeByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTradeByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    ////根据层面key获取层面
    window.lorelibs.norm.getTierByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTierByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    ////根据单元key获取单元
    window.lorelibs.norm.getUnitByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/GetUnitByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    ////根据要求项key获取要求项
    window.lorelibs.norm.getItemByKey = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/GetItemByKey"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var returndata = $.parseJSON(result);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    ////获取所有层面
    window.lorelibs.norm.getAllTier = function (callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/GetAllTier"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var returndata = window.platform.convert.toTreeData(json);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    ////获取平级层面
    window.lorelibs.norm.getLevelTier = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/GetLevelTier"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var returndata = window.platform.convert.toTreeData(json);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    ////获取层面关联信息
    window.lorelibs.norm.getTierRelation = function (callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/GetTierRelation"), function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var returndata = window.platform.convert.toTreeData(json);
            if ($.isFunction(callback)) { callback.call(this, returndata); }
        });
    }
    ////根据行业key和层面key获取所有单元
    window.lorelibs.norm.getUnitByTradeKeyAndTierKey = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/GetUnitByTradeKeyAndTierKey"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var json = $.parseJSON(result);
            var treedata = window.platform.convert.toTreeData(json);
            window.lorelibs.norm.getTierByKey(obj.TierKey, function (tier) {
                var returndata = [{ id: '0', text: tier.Name, children: treedata}];
                if ($.isFunction(callback)) { callback.call(this, returndata); }
            });
        });
    }
    ///添加单元
    window.lorelibs.norm.addUnit = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/AddUnit"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };
    ///编辑单元
    window.lorelibs.norm.updateUnit = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/UpdateUnit"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };
    ///删除单元
    window.lorelibs.norm.deleteUnit = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/DeleteUnit"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };

    ///添加要求项
    window.lorelibs.norm.addItem = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/AddItem"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };
    ///编辑要求项
    window.lorelibs.norm.updateItem = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/UpdateItem"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };
    ///删除要求项
    window.lorelibs.norm.deleteItem = function (keys, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/DeleteItem"), { Keys: keys }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    };

    window.lorelibs.norm.addTier = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/AddTier"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.norm.updateTier = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/UpdateTier"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.norm.deleteTier = function (key, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/DeleteTier"), { Key: key }, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    ///行业复制相关的方法
    window.lorelibs.norm.addTrade = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/AddTrade"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.norm.renameTrade = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/RenameTrade"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.norm.deleteTrade = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/DeleteTrade"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.norm.updateTrade = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/UpdateTrade"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

    window.lorelibs.norm.deleteWorkInstructionFile = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/DeleteWorkInstructionFile"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    //复制单元和要求项
    window.lorelibs.norm.copyUnitItem = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/TierItemCopy"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }
    //移动单元项
    window.lorelibs.norm.moveUnit = function (obj, callback) {
        $.post(window.resolveUrl("Services/LoreLibs/NormService.asmx/MoveUnit"), obj, function (data, textStatus, XMLHttpRequest) {
            var result = $(data).text();
            var success = (result.toLowerCase() == "true");
            if ($.isFunction(callback)) { callback.call(this, success); }
        });
    }

})(jQuery);