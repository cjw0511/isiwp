<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="PartitionUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.PartitionUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/partitionlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/PartitionUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.platform.PartitionUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
    <a id="btnDelete" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no'">删除</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">机构信息：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">机构名称<span class="required">*</span>：</td>
                    <td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="100" /></td>
                    <td class="table_td_left">机构简称：</td>
                    <td class="table_td_right"><input type="text" id="txtShortName" name="ShortName" maxlength="50" /></td>
                </tr>
                <tr>
                    <td class="table_td_left">机构编码<span class="required">*</span>：</td>
                    <td class="table_td_right"><input type="text" id="txtCode" name="Code" maxlength="20" /></td>
                    <td class="table_td_left">机构类型：</td>
                    <td class="table_td_right"><select id="txtPartType" name="PartType" ></select></td>
                </tr>
                <tr>
                    <td class="table_td_left">电话：</td>
                    <td class="table_td_right"><input type="text" id="txtTel" name="Tel" maxlength="20" /></td>
                    <td class="table_td_left">邮箱：</td>
                    <td class="table_td_right"><input type="text" id="txtEmail" name="Email" maxlength="50" /></td>
                </tr>
                <tr>
                    <td class="table_td_left">地址：</td>
                    <td colspan="3"><input type="text" id="txtAddress" name="Address" style="width: 620px;" maxlength="100" /></td>
                </tr>
                <tr>
                    <td class="table_td_left">邮编：</td>
                    <td class="table_td_right"><input type="text" id="txtZipCode" name="ZipCode" maxlength="6" /></td>
                    <td class="table_td_left">成立日期：</td>
                    <td class="table_td_right"><input type="text" id="txtBuildDate" name="BuildDate" /></td>
                </tr>
                <tr>
                    <td class="table_td_left">联系人：</td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;"><input id="txtLinkMan" name="LinkMan" /><input type="hidden" id="LinkManKey" name="LinkManKey" />&nbsp;
                                </td>
                                <td><a id="clear_LinkMan" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'"></a>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
        <legend class="panel-title">机构简介：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left" style="vertical-align: top">机构简介：</td>
                    <td><textarea id="txtRemark" name="Remark" rows="4" maxlength="500" ></textarea></td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
