/**
* jQuery EasyUI 1.3.3
* Copyright (c) 2009-2013 www.jeasyui.com. All rights reserved.
*
* Licensed under the GPL or commercial licenses
* To use it on other terms please contact us: info@jeasyui.com
* http://www.gnu.org/licenses/gpl.txt
* http://www.jeasyui.com/license_commercial.php
*
* jQuery EasyUI datagrid Extensions 1.2.2 release
* jQuery EasyUI datagrid 组件扩展
* jeasyui.extensions.datagrid.js
* 二次开发 陈建伟
* 最近更新：2013-07-24
*
* 依赖项：
*   1、jquery.jdirk.js v1.0 beta late
*   2、jeasyui.extensions.js v1.0 beta late
*   3、jeasyui.extensions.menu.js v1.0 beta late
*   4、jeasyui.extensions.panel.js v1.0 beta late 和 jeasyui.extensions.window.js v1.0 beta late(可选)
*
* Copyright (c) 2013 ChenJianwei personal All rights reserved.
* http://www.chenjianwei.org
*/

使用本扩展前请仔细阅读本文件。

扩展说明：
1，概述：扩展 easyui-datagrid 插件的功能，使其
    A、支持表头右键、行右键菜单的直接生成创建，并设置默认的菜单项；
    B、增加部分扩展方法和扩展属性；
    C、依据与增加的扩展方法和扩展属性，实现部分扩展功能，包括：
        使 easyui-datagrid 控件自动动态适应浏览器大小（非 fit 属性控制）；
        增加表头过滤器 UI 组件并实现效果

2，文件目录说明：
├─jquery-easyui-extensions          扩展文件根目录
    ├─目录jquery-easyui-1.3.3       jquery-easyui-1.3.3 插件目录，jeasyui-columnFilter-test.html DEMO 文件中需要调用 easyui 基础库相应文件存放于此。
    ├─目录src                       未经过混淆源的代码文件存放目录。
    │
    ├  demo.css                      jeasyui-columnFilter-demo.html DEMO 文件中要引用的默认显示样式，和本扩展功能无关；
    ├  jquery-1.9.1.js               jquery-1.9.1.js 基础库，用于在 jeasyui-columnFilter-demo.html DEMO 文件中提出 jquery 基础环境；
    ├  jquery.jdirk.min.js               jeasyui.extensions.datagrid.js 扩展所需要调用的基础函数库，需要在页面中引入；
    ├  jeasyui.extensions.min.js         jeasyui.extensions.datagrid.js 扩展的依赖项，需要在页面中引入；
    ├  jeasyui.extensions.menu.min.js    jeasyui.extensions.datagrid.js 扩展的依赖项，需要在页面中引入；
    ├  jeasyui.extensions.datagrid.min.js       本扩展主程序文件，需要在页面中引入；
    ├  jeasyui-columnFilter-demo.html       DEMO 演示文件。
    ├  changelog.txt                        本扩展的更新日志。
    ├  readme.txt                           本说明文件。

3，引用方式：
    A，在需要使用该扩展的页面引入 jquery 和 jeasyui 的相关基本库文件，例如 "jquery-1.9.1.js"、"easyui.css" 和 "jquery.easyui.min.js"；
    B，引入 "jquery.jdirk.min.js" 文件；
    C，引入 "jeasyui.extensions.min.js" 文件，
    D，引入 "jeasyui.extensions.menu.min.js" 文件，
    E，引入 "jeasyui.extensions.datagrid.min.js" 文件；

4，注意：
    A，请勿修改本文件夹下任何文件的名称，请勿删除本文件夹下任何文件；



======================================================
API 文档：
1，DEMO：参见文件 jeasyui-columnFilter-demo.html



2，属性：继承于 jquery-easyui-datagrid 本身的所有属性；并且在此基础上，增加了如下自定义属性：
        参见源码文件 "src/jeasyui.extensions.datagrid.js" 中的注释；

  另，
    一、增加了 easyui-datagrid 中列 columnOption 的部分自定义扩展属性：
        参见源码文件 "src/jeasyui.extensions.datagrid.js" 中的注释；
        
    二、覆盖了 easyui-datagrid 插件的部分官方属性或事件，具体列表如下：
        参见源码文件 "src/jeasyui.extensions.datagrid.js" 中的注释；


3，方法：继承于 easyui-datagrid；并且在此基础上，增加了如下自定义扩展方法：
        参见源码文件 "src/jeasyui.extensions.datagrid.js" 中的注释；

4，事件：继承于 easyui-datagrid，该扩展中未做任何调整；
        参见源码文件 "src/jeasyui.extensions.datagrid.js" 中的注释；


关于 jquery-easyui-datagrid 相关API，参见：http://www.jeasyui.com/documentation/index.php






