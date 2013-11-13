<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CKEditorTest.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.CKEditorTest" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../Resources/Plugins/jquery-easyui-1.3.2/themes/icon.css" rel="stylesheet"
        type="text/css" />
    <link href="../Resources/Plugins/jquery-easyui-1.3.2/themes/default/easyui.css" rel="stylesheet"
        type="text/css" />
    <script src="../Resources/Plugins/jquery-easyui-1.3.2/jquery-1.8.0.min.js" type="text/javascript"></script>
    <script src="../Resources/Plugins/jquery-easyui-1.3.2/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="../Resources/Plugins/ckeditor/ckeditor.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            //            CKEDITOR.appendTo('editorSpace');
            CKEDITOR.replace('editor', null);

//            CKEDITOR.replace('editor111', { uiColor: '#14B8C4',
//                toolbarCanCollapse: true,
//                colorButton_colors: '000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520',
//                toolbar: 'Full',
//                toolbar_Full:
//                    [
//                        { name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates'] },
//                        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
//                        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt'] },
//                        { name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
//                        '/',
//                        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
//                        { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'] },
//                        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
//                        { name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'] },
//                        '/',
//                        { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
//                        { name: 'colors', items: ['TextColor', 'BGColor'] },
//                        { name: 'tools', items: ['Maximize', 'ShowBlocks', '-', 'About'] }
//                    ]
//            });
        });
</script>
</head>
<body>
<%--<div id="editorSpace"></div>--%>
<textarea  name="editor" cols="100" rows="10"  >asas
    </textarea>
    <script type="text/javascript">        
                    </script>

                    <h3 contenteditable="true">
				Lorem ipsum dolor sit amet dolor duis blandit vestibulum faucibus a, tortor.
			</h3>
</body>
</html>
