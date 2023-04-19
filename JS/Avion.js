var UrlApiGetAll = 'http://localhost:5006/avion/getall';
var UrlApiInsert= 'http://localhost:5006/avion/insertar/:num_avion';
var UrlApiGetUno= 'http://localhost:5006/avion/getOne/:num_avion';
var UrlApiUpdate= 'http://localhost:5006/avion/actualizar/:num_avion';
var UrlApiDelete= 'http://localhost:5006/avion/eliminar/:num_avion';

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
                 '<td>'+
                 '<button id="btneditar" class="btn btn-info" onclick="CargarRegistro('+MisItems [i].num_avion+')">Editar</button>'+
                 '</td>'+
                 '<td>'+
                 '<button id="btneliminar" class="btn btn-info" onclick="EliminarRegistro('+MisItems [i].num_avion+')">Eliminar</button>'+
                 '</td>'+
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

function CargarRegistro (p_num_avion){

    var datosavion={

        num_avion: p_num_avion
    };

    var datosavionjson =JSON.stringify(datosavion);

    $.ajax({
        url: UrlApiGetUno,
        type: 'POST',
        data: datosavionjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            var MisItems = response;
            for(i=0; i < MisItems.length; i++){
                $('#num_avion').val(MisItems[i].num_avion)
                $('#tipo_avion').val(MisItems[i].tipo_avion)
                $('#horasvuelo').val(MisItems[i].horas_vuelo)
                $('#cap_pasajeros').val(MisItems[i].cap_pasajeros)
                $('#fechaprimer_avion').val(MisItems[i].fecha_primer_avion)
                $('#paisconstruccion').val(MisItems[i].pais_construccion)
                $('#cant_vuelos').val(MisItems[i].cant_vuelos)
                var btnactualizar= '<input type="submit" class="btn btn-outline-danger"'+
                 'id="btnagregar"onclick="ActualizarAvion('+ MisItems[i].num_avion+')" value="Actualizar Registro" >';
                $('#btnagregaravion').html(btnactualizar);

            }


        }
    })

}

function ActualizarAvion(p_num_avion){

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

    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: datosavionjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            console.log(response);
            alert('Registro Actualizado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('error ' + textStatus+ errorThrown);
        }
    });

}

function EliminarRegistro(p_num_avion){
    var datosavion={
        num_avion: p_num_avion,
    };

    var datosavionjson =JSON.stringify(datosavion);

    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data: datosavionjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            console.log(response);
            alert('Registro Eliminado Correctamente');
            CargarAvion();
        },
        error: function(textStatus, errorThrown){
            alert('Error ' + textStatus+ errorThrown);
        }
    })
}