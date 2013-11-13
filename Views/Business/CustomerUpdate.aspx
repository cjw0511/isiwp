<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPageForm.Master" AutoEventWireup="true" CodeBehind="CustomerUpdate.aspx.cs" Inherits="ISIWP.Platform.WebClient.Views.Business.CustomerUpdate" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script src="Resources/Scripts/Business/Common/busicomlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Libs/Customerlib.js" type="text/javascript"></script>
    <script src="Resources/Scripts/Business/Views/CustomerUpdate.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(function () {
            var ajaxContainerSelector = "#<%= this.MasterAjaxContainerID %>";
            var key = '<%= this.Request["key"] %>';
            window.business.CustomerUpdate_aspx.initPage(ajaxContainerSelector, key);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentToolBar" runat="server">
    <a id="btnSave" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">保存</a>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentBody" runat="server">
<%--<div id="_panel" class="easyui-tabs" data-options="border:false, fit: true,enableConextMenu:false,defaultEnableRefresh:false">--%>
   <%--<div title="客户基本信息">--%>
         <div class="div_center">
            <fieldset class="datebox-button" style="padding: 8px;height: auto;text-align: left;">
                <%--<legend class="panel-title">客户基本资料：</legend>--%>
            <table class="tablecss" cellpadding="0" cellspacing="0">
            <tr>
                <td class="table_td_left">
                    客户名称<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtName" name="Name" />
                </td>
                <td class="table_td_left">
                    客户编号<span class="required">*</span>：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtCode" name="Code" />
                </td>
            </tr>
			<tr>
                <td class="table_td_left">
                    客户简称：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtShortName" name="ShortName" /></td>
                <td class="table_td_left">
                    法人代表姓名：
                </td>
                <td class="table_td_right">
                    <input type="text" id="txtLegalRepName" name="LegalRepName" />
                </td>
            </tr>
            <tr><td class="table_td_left">		
		     行业类型：</td>
            <td class="table_td_right">
            <select id="selIndustryType" name="IndustryType">
            </select></td>
            <td class="table_td_left">		
		     安全责任部门名称：</td>
            <td class="table_td_right">
            <input type="text" id="txtSecurityDepartment" name="SecurityDepartment" /></td>
            </tr>
                <tr><td class="table_td_left">		
		     客户类型：</td>
            <td class="table_td_right">
                <select id="selCustomerType" name="CustomerType">
                </select>
            </td>
            <td class="table_td_left">		
		     联系电话：</td>
            <td class="table_td_right">
            <input type="text" id="txtTel" name="Tel" />
            </td>
            </tr> 
			<tr>
            <td class="table_td_left">邮政编码：</td>
            <td class="table_td_right"><input type="text" id="txtZipCode" name="ZipCode" /></td>
            <td class="table_td_left">联系地址：</td>
            <td class="table_td_right"><input type="text" id="txtAddress" name="Address" />
            </td>
            </tr>
				<tr><td class="table_td_left">		
		 传真：</td>
        <td class="table_td_right">
            <input type="text" id="txtFax" name="Fax" />
        </td>
        <td class="table_td_left">		
		 电子邮箱：</td>
        <td class="table_td_right">
            <input type="text" id="txtEmail" name="Email" />
        </td>
        </tr>
        <tr>
            <td height="80" class="table_td_left">
                客户信息说明：
            </td>
            <td class="table_td_right">
                <textarea id="txtSummary" name="Summary" style="overflow: auto; height: 60px; width: 300px;"></textarea>
            </td>
            <td class="table_td_left">
                客户信息描述：
            </td>
            <td class="table_td_right">
                <textarea id="txtDescription" name="Description" style="overflow: auto; height: 60px;
                    width: 300px;"></textarea>
            </td>
        </tr>
        <tr><td height="75" class="table_td_left">		
		 备注信息：</td>
        <td class="table_td_right" colspan="4">
            <textarea id="txtRemark" name="Remark" style="overflow: auto; height: 60px; width: 300px;" ></textarea>
        </td></tr>        
        </table>
        </fieldset>
        </div>
    <%--</div>--%>
<%--</div>--%>
</asp:Content>
