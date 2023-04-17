var UrlApiGetAll = 'http://localhost:5006/avion/getall';

$(document).ready(function(){
    CargarAvion();
});

function CargarAvion(){
    $.ajax({
        url: UrlApiGetAll,
        type: 'GET', 
        datatype: 'JSON',
        success: function(response){
            var MisItems = response;
            var Valores= '';

            for(i=0; i < MisItems.length; i++)
            {
                Valores += 
                '<tr>'+
                 '<td>'+ MisItems [i].num_avion +'</td>'+
                 '<td>'+ MisItems [i].tipo_avion +'</td>'+
                 '<td>'+ MisItems [i].horas_vuelo +'</td>'+
                 '<td>'+ MisItems [i].cap_pasajeros +'</td>'+
                 '<td>'+ MisItems [i].fecha_primer_avion +'</td>'+
                 '<td>'+ MisItems [i].pais_construccion +'</td>'+
                 '<td>'+ MisItems [i].cant_vuelos +'</td>'+
                '</tr>';

                $('#RegistroAviones').html(Valores);


                
            } 
        }
    });
}