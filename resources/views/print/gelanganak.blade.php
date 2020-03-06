<!DOCTYPE html>
<html>
<head>
    <title>Gelang Anak</title>
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
<table border="0" cellpadding="1" cellspacing="0" align="center" style="margin:0;padding:0; width:700px;">

        <tr>
            <td colspan="2" style="padding-top:30px;padding-bottom:5px;padding-left:400px;width:70px;">
                <b>RS UNTAN</b>
            </td>
            <td style="padding-top:3px;width:75px;">
              
            </td>
        </tr>
        <tr>
            <td colspan="2" style="padding-bottom:5px;padding-left:400px;">
               <b>{{$label->NORM}}</b>
            </td>
            <td class="kanan" colspan="3" style="padding-bottom:5px;padding-top:3px;padding-left:50px;">
                Tgl Lahir : {{$label->TANGGAL_LAHIR}}
            
            
            </td>
        </tr>
        <tr>
            <td colspan="2" style="padding-bottom:5px;padding-left:400px;">
              {{$label->NAMA}}
            </td>
            <td colspan="3">
                
            </td>
        </tr>


    </table>
@endforeach

</body>
</html>
