<%@ Page Title="" Language="C#" MasterPageFile="~/InnerAjaxPage.Master" AutoEventWireup="true" CodeBehind="SogouMap.aspx.cs" Inherits="ISIWP.Platform.WebClient.Testing.SogouMap" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentHead" runat="server">
    <script type="text/javascript">
        var initialize = function () {
            var myLatlng = new sogou.maps.LatLng(39.99226610365429, 116.32591408950312);
            var opts = {
                'zoom': 17,
                'center': myLatlng,
                'mapTypeId': sogou.maps.MapTypeId.ROADMAP
            }
            var mapContainer = $("#map_canvas", "#<%= this.MasterAjaxContainerID %>").css("height", "100%");
            var map = new sogou.maps.Map(mapContainer[0], opts);
        };
        $(function () {
            window.loadJs("http://api.go2map.com/maps/js/api_v2.5.1.js", initialize);
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentBody" runat="server">
    <div id="map_canvas" />
</asp:Content>
