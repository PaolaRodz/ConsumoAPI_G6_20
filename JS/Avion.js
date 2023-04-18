var UrlApiGetAll = 'http://localhost:5006/avion/getall';
var UrlApiInsert= 'http://localhost:5006/avion/insertar/:num_avion';

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

function AgregarAvion(){
var datosavion={
    num_avion: $('#num_avion').val(),
    tipo_avion: $('#tipo_avion').val(),
    horas_vuelo: $('#horasvuelo').val(),
    cap_pasajeros: $('#cap_pasajeros').val(),
    fecha_primer_avion: $('#fechaprimer_avion').val(),
    pais_construccion: $('#paisconstruccion').val(),
    cant_vuelos: $('#cant_vuelos').val()
};

var datosavionjson =JSON.stringify(datosavion);
//alert(datosavionjson);

$.ajax({
url: UrlApiInsert,
type: 'POST',
data: datosavionjson,
datatype: 'JSON',
contentType: 'application/json',
success: function(response){
    alert('Registro ingresado de forma correcta');
    $('#Miformulario').submit();

},
error: function(textError, errorThrown){
alert('Error: '+ textError + errorThrown);
}

});

}