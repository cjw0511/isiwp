<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="CKEditor.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.CKEditor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
<script type="text/javascript">
    $(function () {
        ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";

        //        $("#editor1", ajaxContainerSelector).ckeditor({ uiColor: '#14B8C4' });
        $("#btnInsertText").click(function () {
            $("#editor1", ajaxContainerSelector).ckeditor("insertText", "<h1>assdasdasdasd</h1>");
        });
        $("#btnInsertHtml").click(function () {
            $("#editor1", ajaxContainerSelector).ckeditor("insertHtml", "<a href='/Test1.html'>sample</a>");
        });
        var ss;
        $("#btnGetData").click(function () {
            alert($("#editor1", ajaxContainerSelector).ckeditor("getValue"));
        });
        $("#btnSetData").click(function () {
            $("#editor1", ajaxContainerSelector).ckeditor("setValue","fsafsgfsadg");
        });
        $("#btnFocus").click(function () {
            $("#editor1", ajaxContainerSelector).ckeditor("setUiColor", "#14B8C4");
        });
        $("#btnBold").click(function () {
            alert($("#editor1", ajaxContainerSelector).ckeditor("isEmpty"));
        });

    });
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnInsertText" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'">插入text</a>
    <a id="btnInsertHtml" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'">插入html</a>
    <a id="btnGetData" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">获取文本</a>
    <a id="btnSetData" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">设置文本</a>
    <a id="btnFocus" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">设置焦点</a>
    <a id="btnBold" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">Bold</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
<div id="ap" >
    <textarea id="editor1" class="easyui-ckeditor" data-options="entities:false,height:600" >asas
    </textarea>
</div>
<h3 contenteditable="true">
				Lorem ipsum dolor sit amet dolor duis blandit vestibulum faucibus a, tortor.
			</h3>
        <div class="demo-options col-2 ui-colors">
		<h3>Select a Color</h3>
		<ul style="cursor:pointer">
			<li><a style="background:#0AD4EB;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#0AD4EB')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
			<li><a style="background:#9ADB17;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#9ADB17')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
			<li><a style="background:#E51669;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#E51669')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
			<li><a style="background:#FAAC0F;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#FAAC0F')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
			<li><a style="background:#000000;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#000000')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
			<li><a style="background:#E48CF2;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#E48CF2')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
			<li><a style="background:#F79393;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#F79393')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
			<li><a style="background:#A1CFF3;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#A1CFF3')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
			<li><a style="background:#C0B9B9;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#C0B9B9')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
			<li><a style="background:#FAFAFA;" onclick="$('#editor1', ajaxContainerSelector).ckeditor('setUiColor', '#FAFAFA')">&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
		</ul>
	</div>
</asp:Content>
