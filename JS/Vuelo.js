var UrlApiGetAll = 'http://localhost:5006/vuelo/getall';
var UrlApiInsert = 'http://localhost:5006/vuelo/insertar/:codigo_de_vuelo';
var UrlApiGetUno = 'http://localhost:5006/vuelo/getOne/:codigo_de_vuelo';
var UrlApiUpdate = 'http://localhost:5006/vuelo/actualizar/:codigo_de_vuelo';
var UrlApiDelete = 'http://localhost:5006/vuelo/eliminar/:codigo_de_vuelo';

$(document).ready(function(){
    CargarVuelos();
});
function CargarVuelos(){
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
                    '<td>'+ MisItems[i].codigo_de_vuelo +'</td>'+
                    '<td>'+ MisItems[i].ciudad_origen +'</td>'+
                    '<td>'+ MisItems[i].ciudad_destino +'</td>'+
                    '<td>'+ MisItems[i].fecha_de_vuelo +'</td>'+
                    '<td>'+ MisItems[i].cantidad_de_pasajeros +'</td>'+
                    '<td>'+ MisItems[i].tipo_avion +'</td>'+
                    '<td>'+ MisItems[i].distancia_km +'</td>'+
                    '<td> ' +
                    '<button id="btneditar" class="btn btn-outline-primary" onclick="CargarVuelo('+ MisItems[i].codigo_de_vuelo +')"><b>Editar</b></button>'+
                    '</td>'+
                    '<td>'+
                    '<button id="btneliminar" class="btn btn-outline-danger" onclick="EliminarVuelo('+ MisItems[i].codigo_de_vuelo +')"><b>Eliminar</b></button>'+
                    '</td>'+
                    '</tr>';
                $('#DatosVuelos').html(Valores);
            }
        }
    });
}

function AgregarVuelo(){
    var datosvuelo={
        codigo_de_vuelo : $('#CODVUELO').val() ,
        ciudad_origen : $('#CIUORIGEN').val(),
        ciudad_destino : $('#CIUDESTINO').val(),
        fecha_de_vuelo : $('#FECHAVUELO').val(),
        cantidad_de_pasajeros: $('#CANTPASAJEROS').val(),
        tipo_avion : $('#TIPOAVION').val(),
        distancia_km : $('#DISTANCIAKM').val()
    };
    var datosvuelojson = JSON.stringify(datosvuelo);

    $.ajax({
        url: UrlApiInsert,
        type: 'POST',
        data: datosvuelojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            alert('Vuelo ingresado correctamente!!');
            $('#Miformulario').submit();
        },
        error : function(textError, errorThrown){
            alert('Error: ' + textError + errorThrown);
        }
    });
    
}
function CargarVuelo(p_codigo_de_vuelo){
    var datosvuelo = {
        codigo_de_vuelo : p_codigo_de_vuelo
    };

    var datosvuelojson = JSON.stringify(datosvuelo);
    
    $.ajax({
        url : UrlApiGetUno,
        type: 'POST',
        data: datosvuelojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            var MisItems = response;
            for(i=0; i < MisItems.length; i++){
                $('#CODVUELO').val(MisItems[i].codigo_de_vuelo);
                $('#CIUORIGEN').val(MisItems[i].ciudad_origen);
                $('#CIUDESTINO').val(MisItems[i].ciudad_destino);
                $('#FECHAVUELO').val(MisItems[i].fecha_de_vuelo);
                $('#CANTPASAJEROS').val(MisItems[i].cantidad_de_pasajeros);
                $('#TIPOAVION').val(MisItems[i].tipo_avion);
                $('#DISTANCIAKM').val(MisItems[i].distancia_km);
                var btnactualizar = '<input type="button" class="btn btn-primary" ' + 
                'id="btnagregar" onclick="ActualizarVuelo(' + MisItems[i].codigo_de_vuelo +')" value="Actalizar Vuelo" >'; 
                $('#btnagregarvuelo').html(btnactualizar);
                
            }
        }
    });
}

function ActualizarVuelo(p_codigo_de_vuelo){
    var datosvuelo={
        codigo_de_vuelo : $('#CODVUELO').val(),
        ciudad_origen : $('#CIUORIGEN').val(),
        ciudad_destino : $('#CIUDESTINO').val(),
        fecha_de_vuelo : $('#FECHAVUELO').val(),
        cantidad_de_pasajeros : $('#CANTPASAJEROS').val(),
        tipo_avion : $('#TIPOAVION').val(),
        distancia_km : $('#DISTANCIAKM').val()

    };

    var datosvuelojson = JSON.stringify(datosvuelo);

    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: datosvuelojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            console.log(response);
            alert('Vuelo actualizado correctamente!!');
            $('#Miformulario').submit();
        },
        error: function(textStatus, errorThrown){
            alert('error ' + textStatus+ errorThrown);
        }
    });
}

function EliminarVuelo(p_codigo_de_vuelo){
    var datosvuelo={
        codigo_de_vuelo : p_codigo_de_vuelo,
    };

    var datosvuelojson =JSON.stringify(datosvuelo);

    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data: datosvuelojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            console.log(response);
            alert('Vuelo eliminado correctamente!!');
            $('#Miformulario').submit();
        },
        error: function(textStatus, errorThrown){
            alert('Error ' + textStatus+ errorThrown);
        }
    })
}