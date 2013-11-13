<%@ Page Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="WorkSpacePersonalInfo.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Platform.WorkSpacePersonalInfo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Platform/Libs/employeelib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Platform/Views/WorkSpacePersonalInfo.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            window.platform.WorkSpacePersonalInfo_aspx.initPage(ajaxContainerSelector);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div data-options="region:'center',split:true" style="height:125px;border-top-width:0px;border-left-width:0px;border-right-width:0px;">
        <div id="panel" class="datagrid-toolbar" style="padding:20px;">
            <table class="tablecss" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td class="table_td_left" width="20%">
                        <a id="btnProcess" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit'">处理更多</a>
                    </td>
                    <td width="30%">
                    </td>
                    <td width="20%">
                    </td>
                    <td width="30%">
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        职员姓名：
                    </td>
                    <td class="table_td_right">
                        <span id="txtName" name="Name" ></span>
                    </td>
                    <td class="table_td_left">
                        
                        编号：
                    </td>
                    <td class="table_td_right">
                        <span id="txtCode" name="Code" ></span>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        姓氏：
                    </td>
                    <td class="table_td_right">
                        <span id="txtLastName" name="LastName" ></span>
                    </td>
                    <td class="table_td_left">
                        名：
                    </td>
                    <td class="table_td_right">
                        <span id="txtFirstName" name="FirstName" ></span>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        曾用名：
                    </td>
                    <td class="table_td_right">
                        <span id="txtFormerName" name="FormerName" ></span>
                    </td>
                    <td class="table_td_left">
                        性别：
                    </td>
                    <td class="table_td_right">
                        <span id="selSex" name="SexKey" ></span>
                    </td>
                </tr>
                <tr>
                    <td class="table_td_left">
                        出生日期：
                    </td>
                    <td class="table_td_right">
                        <span id="txtBirtyday" name="Birtyday" ></span>
                    </td>
                    <td class="table_td_left">
                        身份证号码：
                    </td>
                    <td class="table_td_right">
                    <span id="txtIDcard" name="IDcard" ></span>
                    </td>
                </tr>
            </table>
            </div>
            </div>
</asp:Content>
