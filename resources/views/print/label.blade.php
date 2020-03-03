<!DOCTYPE html>
<html>
<head>
    <title>Print Obat Dalam</title>
    <style>
        body {
            font-size:10px;
            margin:0px;
            line-height: 8px;
        }
        @page {
            margin:0px;
        }
        .page-break {
            page-break-after: always;
        }
        .aturan {
            font-size:15px;
            line-height: 10px;
            /* font-size:10px; */
            font-weight:bold;
        }
        .kanan {
            /* width: 60px; */
            /* text-align:left; */
            /* font-size:10px; */
        }
        tr.border_bottom td {
            border-bottom:1pt solid black;
        }
    </style>
</head>

<body>
@foreach($label as $i => $label)
    {{$label->NORM}}
@endforeach

</body>
</html>
