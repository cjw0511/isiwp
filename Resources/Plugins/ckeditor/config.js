/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.uiColor = '#AADC6E';
    // config.uiColor = '#14B8C4';
    config.toolbarCanCollapse = false;

    ///文件浏览地址
    var ckfinderUrl = "Resources/Plugins";
    config.filebrowserBrowseUrl = ckfinderUrl + '/ckfinder/ckfinder.html';
    config.filebrowserImageBrowseUrl = ckfinderUrl + '/ckfinder/ckfinder.html?Type=Images';
    config.filebrowserFlashBrowseUrl = ckfinderUrl + '/ckfinder/ckfinder.html?Type=Flash';
    config.filebrowserUploadUrl = ckfinderUrl + '/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files';
    config.filebrowserImageUploadUrl = ckfinderUrl + '/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';
    config.filebrowserFlashUploadUrl = ckfinderUrl + '/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';

    config.toolbar = 'Basic';
    config.toolbar_Basic =
    [
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'editing', items: ['Scayt'] },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'insert', items: ['Image', 'Flash', 'Table', 'Smiley', 'SpecialChar'] },
        { name: 'tools', items: ['Maximize'] },
        { name: 'document', items: ['Source'] },
//        '/',
//        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
//        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
//        { name: 'styles', items: [ 'Format', 'Font', 'FontSize', '-', 'About'] },

    ];
    config.toolbar_Full =
    [
        { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
        { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
        '/',
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'] },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'] },
        '/',
        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'tools', items: ['Maximize', 'ShowBlocks', '-', 'About'] }
    ];
    config.width = 620; //宽度 
    config.height = 80; //高度 
};