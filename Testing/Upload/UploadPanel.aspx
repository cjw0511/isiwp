<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="UploadPanel.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.Upload.UploadPanel" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    
    <script src="../Testing/Upload/Scripts/swfobject.js" type="text/javascript"></script>

    

    <script src="../Testing/Upload/Scripts/jquery.uploadify.v2.1.0.min.js" type="text/javascript"></script>

    <link href="../Testing/Upload/Content/uploadify.css" rel="stylesheet" type="text/css" />
    
    
    <style type="text/css">
        .textstyle1
        {
            color: Red;
            font-weight: bold;
        }
        .textstyle2
        {
            color: Green;
            font-weight: bold;
        }
    </style>
    
    <script type="text/javascript" language="javascript">
        $(function () {
            //上传
            $('#fileInput1').uploadify({
                'uploader': '../Testing/Upload/Content/uploadify.swf',
                'script': '../Testing/Upload/UploadHandler1.ashx',
                'folder': '/Testing/Upload/UploadFiles',
                'cancelImg': '../Testing/Upload/Content/cancel.png',
                'fileExt': '*.xls;*.bmp;*.doc;*.docx;*.gif;*.jpeg;*.jpg;*.pdf;*.png;*.ppt;*.pptx;*.rar;*.txt;*.zip',
                'fileDesc': '*.xls;*.bmp;*.doc;*.docx;*.gif;*.jpeg;*.jpg;*.pdf;*.png;*.ppt;*.pptx;*.rar;*.txt;*.zip',
                'sizeLimit': 1024 * 1024 * 4, //4M
                'multi': true,
                'onComplete':fun
            });

        });
        function fun(event, queueID, fileObj, response, data) {
            if (response != "") {
                showInfo("成功上传" + response, true); //showInfo方法设置上传结果     
            }
            else {
                showInfo("文件上传出错！", false);
            }
        }
        //显示提示信息，textstyle2为绿色，即正确信息；textstyl1为红色，即错误信息
        function showInfo(msg, type) {
            var msgClass = type == true ? "textstyle2" : "textstyle1";
            $("#result").removeClass();
            $("#result").addClass(msgClass);
            $("#result").html(msg);
        }
        //如果点击‘导入文件’时选择文件为空，则提示
        function checkImport() {
            if ($.trim($('#fileInput1Queue').html()) == "") {
                alert('请先选择要导入的文件！');
                return false;
            }
            return true;
        } 
    </script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">   
<div>
    <input type="text" id="test" />
    <p><input id="fileInput1" name="fileInput1" type="file"/></p>5
    <p style="margin-top:5px;font-size:14px;font-weight:bold;">
    <a href="javascript:if(checkImport()){$('#fileInput1').uploadifySettings('scriptData',{'name':$('#test').val()});$('#fileInput1').uploadifyUpload();}">上传</a></p>
    <p style="margin-top:5px;font-size:14px;font-weight:bold;"><span id="result"></span></p>
</div>
</asp:Content>
