var UrlApiGetAll = 'http://localhost:5006/reserva/getAll';
var UrlApiInsert = 'http://localhost:5006/reserva/insertar/:numero_de_reservacion';
var UrlApiGetUno = 'http://localhost:5006/reserva/getone/:numero_de_reservacion';

$(document).ready(function(){
    CargarReservas();
})

function CargarReservas(){
    $.ajax({
        url: UrlApiGetAll,
        type: 'GET', 
        datatype: 'JSON',
        success: function(response){
            var MisItems = response;
            var Valores = '';

            for(i=0; i < MisItems.length; i++)
            {
                Valores += 
                '<tr>'+
                    '<td>'+ MisItems[i].numero_de_reservacion +'</td>'+
                    '<td>'+ MisItems[i].codigo_de_vuelo +'</td>'+
                    '<td>'+ MisItems[i].codigo_de_pasajero +'</td>'+
                    '<td>'+ MisItems[i].nombre_psajero +'</td>'+
                    '<td>'+ MisItems[i].ciudad_destino +'</td>'+
                    '<td>'+ MisItems[i].fecha_de_vuelo +'</td>'+
                    '<td>'+ MisItems[i].precio_vuelo +'</td>'+
                    '<td>'+
                    '<button id="btneditar" class="btn btn-outline-info" onclick="CargarReserva('+ MisItems[i].numero_de_reservacion +')">Editar</button>'+
                    '</td>'+
                '</tr>';
                $('#DatosReservas').html(Valores);
            }
        }
    });
}

function AgregarReserva(){
    var datosreserva={
        numero_de_reservacion : $('#NumerodeReservacion').val(),
        codigo_de_vuelo : $('#CodigodeVuelo').val(),
        codigo_de_pasajero : $('#CodigodePasajero').val(),
        nombre_psajero : $('#NombrePasajero').val(),
        ciudad_destino : $('#CiudadDestino').val(),
        fecha_de_vuelo : $('#FechadeVuelo').val(),
        precio_vuelo : $('#PrecioVuelo').val()
    };

    var datosreservajson = JSON.stringify(datosreserva);

    $.ajax({
        url: UrlApiInsert,
        type: 'POST',
        data: datosreservajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Reserva Ingresada de Forma Correcta');
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrown){
            alert('Error: ' + textError + errorThrown);
        }
    });
}

function CargarReserva(p_numero_de_reservacion){
   var datosreserva = {
    numero_de_reservacion : p_numero_de_reservacion
   };

   var datosreservajson = JSON.stringify(datosreserva);

   $.ajax({
    url : UrlApiGetUno,
    type : 'POST',
    data: datosreservajson,
    datatype: 'JSON',
    contentType: 'application/json',
    success : function(response){
        var MisItems = response;
        for(i=0; i < MisItems.length; i++){
            $('#NumerodeReservacion').val(MisItems[i].numero_de_reservacion);
            $('#CodigodeVuelo').val(MisItems[i].codigo_de_vuelo);
            $('#CodigodePasajero').val(MisItems[i].codigo_de_pasajero);
            $('#NombrePasajero').val(MisItems[i].nombre_psajero);
            $('#CiudadDestino').val(MisItems[i].ciudad_destino);
            $('#FechadeVuelo').val(MisItems[i].fecha_de_vuelo);
            $('#PrecioVuelo').val(MisItems[i].precio_vuelo);
            var btnactualizar =  '<input type="submit" class="btn btn-outline-primary" '+
            ' id="btnagregar"  onclick="ActualizarReserva('+ MisItems[i].numero_de_reservacion +') value="Actualizar Reserva" >';
            $('#btagregarreserva').html(btnactualizar);
        }
    }
   });
}

function ActualizarReserva(p_numero_de_reservacion){

}