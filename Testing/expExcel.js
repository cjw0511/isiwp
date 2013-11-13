(function () {

    function utf8Encode(str) {
        str = str.replace(/\r\n/g, "\n");
        var ret = "";
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c < 128) { ret += String.fromCharCode(c); } else if (c > 127 && c < 2048) {
                ret += String.fromCharCode((c >> 6) | 192);
                ret += String.fromCharCode((c & 63) | 128);
            } else {
                ret += String.fromCharCode((c >> 12) | 224);
                ret += String.fromCharCode(((c >> 6) & 63) | 128);
                ret += String.fromCharCode((c & 63) | 128);
            }
        }
        return ret;
    };
    function base64Encode(input) {
        var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var ret = "", c1, c2, c3, e1, e2, e3, e4, i = 0;
        input = utf8Encode(input);
        while (i < input.length) {
            c1 = input.charCodeAt(i++); c2 = input.charCodeAt(i++); c3 = input.charCodeAt(i++);
            e1 = c1 >> 2; e2 = ((c1 & 3) << 4) | (c2 >> 4); e3 = ((c2 & 15) << 2) | (c3 >> 6);
            e4 = c3 & 63;
            if (isNaN(c2)) { e3 = e4 = 64; } else if (isNaN(c3)) { e4 = 64; }
            ret = ret + key.charAt(e1) + key.charAt(e2) + key.charAt(e3) + key.charAt(e4);
        }
        return ret;
    };
    function getCellType(val) {
        var type = $.type(val), ret;
        switch (type) {
            case "date": ret = "DateTime"; break;
            case "number": ret = "Number"; break;
            case "boolean":
            case "function":
            case "array":
            case "regExp":
            case "object":
            case "error":
            case "string":
            default: ret = "String"; break;
        }
        return ret;
    };
    function getCellClass(val) {
        var type = $.type(val), ret;
        switch (type) {
            case "number":
            case "float": ret = "float"; break;
            case "int": ret = "int"; break;
            case "date": ret = "date"; break;
            case "bool":
            case "boolean":
            default: ret = ""; break;
        }
        return ret;
    };
    function buildExcel(file, columns, date) {
        file = !$.util.isString(file) || $.string.isNullOrEmpty(file) ? "未命名Excel文件" : file;
        columns = $.util.likeArray(columns) && !$.util.isString(columns) ? $.array.clone(columns) : [];
        date = $.util.likeArray(date) && !$.util.isString(date) ? columns : [];
        var headerXml = "<ss:Cell ss:StyleID=\"headercell\" ss:MergeAcross=\""
                + (columns.length - 1)
                + "\">"
                + "<ss:Data ss:Type=\"String\">"
                + file
                + "</ss:Data>"
                + "<ss:NamedCell ss:Name=\"Print_Titles\" />"
                + "</ss:Cell>",
            bodyXml = "<ss:Worksheet ss:Name=\"" + file + "_Sheet1\">"
                + "<ss:Table>" + "<ss:Column ss:AutoFitWidth=\"1\"/>"
                + "<ss:Row ss:AutoFitHeight=\"1\">" + headerXml + "</ss:Row>",
            defaults, col, row, val;
        for (var i = 0; i < columns.length; i++) {
            defaults = { field: null, title: null, width: 120, type: "String", formatter: function (field, rowIndex, rowData, array) { return rowData[field]; } };
            col = columns[i] = $.extend(defaults, columns[i]);
            bodyXml += "<ss:Cell ss:StyleID=\"headerCell\"><ss:Data ss:Type=\"String\">";
            bodyXml += col.title;
            bodyXml += "</ss:Data></ss:Cell>";
        }
        bodyXml += "</ss:Row>";
        for (var i = 0; i < data.length; i++) {
            var c = i ? "even" : "odd", row = data[i];
            for (var j = 0; j < columns.length; j++) {
                col = columns[j]; val = row[col.field];
                bodyXml += "<ss:Cell ss:StyleID=\"" + c + getCellClass(val) + "\"><ss:Data ss:Type=\"" + getCellType(val) + "\">";
                bodyXml += ($.util.isDate(val) ? $.date.format(val) : val) + "</ss:Data></ss:Cell";
            }
            bodyXml += "</ss:Row";
        }
        bodyXml += "</ss:Table>";
        bodyXml += "</ss:Worksheet>";
        var ret = "<xml version=\"1.0\" encoding=\"utf-8\">"
            + "<ss:Workbook xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">"
            + '<o:DocumentProperties><o:Title>'
            + 'title111111111111111111111'
            + '</o:Title></o:DocumentProperties>'
            + '<ss:ExcelWorkbook>'
            + '<ss:WindowHeight>'
            + 100
            + '</ss:WindowHeight>'
            + '<ss:WindowWidth>'
            + 500
            + '</ss:WindowWidth>'
            + '<ss:ProtectStructure>False</ss:ProtectStructure>'
            + '<ss:ProtectWindows>False</ss:ProtectWindows>'
            + '</ss:ExcelWorkbook>'
            + '<ss:Styles>'
            + '<ss:Style ss:ID="Default">'
            + '<ss:Alignment ss:Vertical="Top" ss:WrapText="1" />'
            + '<ss:Font ss:FontName="arial" ss:Size="10" />'
            + '<ss:Borders>'
            + '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top" />'
            + '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom" />'
            + '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left" />'
            + '<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right" />'
            + '</ss:Borders>'
            + '<ss:Interior />'
            + '<ss:NumberFormat />'
            + '<ss:Protection />'
            + '</ss:Style>'
            + '<ss:Style ss:ID="title">'
            + '<ss:Borders />'
            + '<ss:Font />'
            + '<ss:Alignment ss:WrapText="1" ss:Vertical="Center" ss:Horizontal="Center" />'
            + '<ss:NumberFormat ss:Format="@" />'
            + '</ss:Style>'
            + '<ss:Style ss:ID="headercell">'
            + '<ss:Font ss:Bold="1" ss:Size="10" />'
            + '<ss:Alignment ss:WrapText="1" ss:Horizontal="Center" />'
            + '<ss:Interior ss:Pattern="Solid" ss:Color="#A3C9F1" />'
            + '</ss:Style>'
            + '<ss:Style ss:ID="even">'
            + '<ss:Interior ss:Pattern="Solid" ss:Color="#CCFFFF" />'
            + '</ss:Style>'
            + '<ss:Style ss:Parent="even" ss:ID="evendate">'
            + '<ss:NumberFormat ss:Format="yyyy-mm-dd" />'
            + '</ss:Style>'
            + '<ss:Style ss:Parent="even" ss:ID="evenint">'
            + '<ss:NumberFormat ss:Format="0" />'
            + '</ss:Style>'
            + '<ss:Style ss:Parent="even" ss:ID="evenfloat">'
            + '<ss:NumberFormat ss:Format="0.00" />'
            + '</ss:Style>'
            + '<ss:Style ss:ID="odd">'
            + '<ss:Interior ss:Pattern="Solid" ss:Color="#CCCCFF" />'
            + '</ss:Style>'
            + '<ss:Style ss:Parent="odd" ss:ID="odddate">'
            + '<ss:NumberFormat ss:Format="yyyy-mm-dd" />'
            + '</ss:Style>'
            + '<ss:Style ss:Parent="odd" ss:ID="oddint">'
            + '<ss:NumberFormat ss:Format="0" />' + '</ss:Style>'
            + '<ss:Style ss:Parent="odd" ss:ID="oddfloat">'
            + '<ss:NumberFormat ss:Format="0.00" />'
            + '</ss:Style>' + '</ss:Styles>' + bodyXml
            + '</ss:Workbook>';
        return ret;
    };


    function exportExcel(options) {
        var opts = options = $.extend({ file: "未命名Excel文件", columns: null, rows: null }, options);
        var content = buildExcel(opts.title, opts.columns, opts.data);
        var url = "data:application/vnd.ms-excel;base64," + base64Encode(content);
        return url;
    };


    $.exportExcel = exportExcel;

})();