<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="DepartmentUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.DepartmentUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/partitionlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Libs/departmentlib.js" type="text/javascript"></script> 
    <script src="Resources/Scripts/Platform/Views/DepartmentUpdate.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.platform.DepartmentUpdate_aspx.initPage(ajaxContainerSelector, key);
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
            <legend class="panel-title">部门信息：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left">部门名称<span class="required">*</span>：</td>
                    <td class="table_td_right"><input type="text" id="txtName" name="Name" maxlength="100" /></td>
                    <td class="table_td_left">部门简称：</td>
                    <td class="table_td_right"><input type="text" id="txtShortName" name="ShortName" maxlength="50" /></td>
                </tr>
                <tr>
                    <td class="table_td_left">所属机构：</td>
                    <td class="table_td_right"><select id="selPartition" name="OrganKey" ></select></td>
                    <td class="table_td_left">上级部门：</td>
                    <td class="table_td_right"><select id="selDepartment" name="ParentKey" class="easyui-combotree" data-options="required:true,editable:false,panelHeight:'auto',panelWidth:200"></select></td>
                </tr>
                <tr>
                    <td class="table_td_left">部门编码<span class="required">*</span>：</td>
                    <td class="table_td_right"><input type="text" id="txtCode" name="Code" maxlength="20" /></td>
                    <td class="table_td_left">负责人：</td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;"><input id="txtHeadEmp" name="HeadEmp" /><input type="hidden" id="HeadEmpKey" name="HeadEmpKey" />&nbsp;</td>
                                <td><a id="clear_HeadEmp" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'"></a></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">联系人：</td>
                    <td class="table_td_right">
                        <table cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="padding-top: 4px;"><input id="txtLinkMan" name="LinkMan" /><input type="hidden" id="LinkManKey" name="LinkManKey" />&nbsp;</td>
                                <td><a id="clear_LinkMan" href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:'true'"></a></td>
                            </tr>
                        </table>
                    </td>
                    <td class="table_td_left"></td>
                    <td class="table_td_right"><a id="setRange" class="easyui-linkbutton">设置职能范围</a></td>
                </tr>
            </table>
        </fieldset>
    </div>
    <div class="div_center">
        <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
            <legend class="panel-title">部门简介：</legend>
            <table class="tablecss" cellpadding="0" cellspacing="0">
                <tr>
                    <td class="table_td_left" style="vertical-align: top">部门简介：</td>
                    <td><textarea id="txtRemark" name="Remark" rows="4" maxlength="500" ></textarea></td>
                </tr>
            </table>
        </fieldset>
    </div>
</asp:Content>
