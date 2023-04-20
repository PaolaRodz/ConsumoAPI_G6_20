var UrlApiGetAll = 'http://localhost:5006/pasajero/getall';
var UrlApiInsert= 'http://localhost:5006/pasajero/insertar/:codigo_pasajero';
var UrlApiGetUno= 'http://localhost:5006/pasajero/getOne/:codigo_pasajero';
var UrlApiUpdate= 'http://localhost:5006/pasajero/actualizar/:codigo_pasajero';
var UrlApiDelete= 'http://localhost:5006/pasajero/eliminar/:codigo_pasajero';

$(document).ready(function(){
    CargarPasajero();
});

function CargarPasajero(){
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
                 '<td>'+ MisItems [i].codigo_pasajero +'</td>'+
                 '<td>'+ MisItems [i].nombres +'</td>'+
                 '<td>'+ MisItems [i].apellidos +'</td>'+
                 '<td>'+ MisItems [i].fecha_registro +'</td>'+
                 '<td>'+ MisItems [i].nacionalidad +'</td>'+
                 '<td>'+ MisItems [i].numero_telefonico +'</td>'+
                 '<td>'+ MisItems [i].email +'</td>'+
                 '<td>'+
                 '<button id="btneditar" class="btn btn-info" onclick="CargarRegistro('+ MisItems [i].codigo_pasajero +')">Editar</button>'+
                 '</td>'+
                 '<td>'+
                 '<button id="btneliminar" class="btn btn-dark" onclick="EliminarRegistro('+ MisItems[i].codigo_pasajero +')">Eliminar</button>'+
                 '</td>'+
                '</tr>';
                $('#RegistroPasajeros').html(Valores);
  
            } 
        }
    });
}

function AgregarPasajero(){
var datospasajeros={
    codigo_pasajero: $('#CodigoPasajero').val(),
    nombres: $('#Nombres').val(),
    apellidos: $('#Apellidos').val(),
    fecha_registro: $('#FechaRegistro').val(),
    nacionalidad: $('#Nacionalidad').val(),
    numero_telefonico: $('#NumeroTelefonico').val(),
    email: $('#Email').val()
};

var datospasajerosjson =JSON.stringify(datospasajeros);
//alert(datospasajerosjson);

$.ajax({    
url: UrlApiInsert,
type: 'POST',
data: datospasajerosjson,
datatype: 'JSON',
contentType: 'application/json',
success: function(response){
    alert('Pasajero ingresado de forma correcta');
    $('#Miformulario').submit();
  },
  error: function(textStatus, errorThrown){
  alert('Error: '+ textStatus + errorThrown);
  }
}
);
//alert('');
}

function CargarRegistro(p_codigo_pasajero){

    var datospasajeros={

        codigo_pasajero: p_codigo_pasajero
    };

    var datospasajerosjson =JSON.stringify(datospasajeros);
    //alert(datospasajerosjson);

    $.ajax({
        url: UrlApiGetUno,
        type: 'POST',
        data: datospasajerosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            var MisItems = response;
            for(i=0; i < MisItems.length; i++){
                $('#CodigoPasajero').val(MisItems [i].codigo_pasajero);
                $('#Nombres').val(MisItems[i].nombres);
                $('#Apellidos').val(MisItems[i].apellidos);
                $('#FechaRegistro').val(MisItems[i].fecha_registro);
                $('#Nacionalidad').val(MisItems[i].nacionalidad);
                $('#NumeroTelefonico').val(MisItems[i].numero_telefonico);
                $('#Email').val(MisItems[i].email);
                var btnactualizar= '<input type="button" class="btn btn-outline-danger"'+
                 'id="btnagregar" onclick="ActualizarPasajero('+ MisItems[i].codigo_pasajero +')" value="Actualizar Pasajero" >';
                $('#btnagregarpasajero').html(btnactualizar)

            }
        }
    });
}

function ActualizarPasajero(p_codigo_pasajero){

    var datospasajeros={
        codigo_pasajero: $('#CodigoPasajero').val(),
        nombres: $('#Nombres').val(),
        apellidos: $('#Apellidos').val(),
        fecha_registro: $('#FechaRegistro').val(),
        nacionalidad: $('#Nacionalidad').val(),
        numero_telefonico: $('#NumeroTelefonico').val(),
        email: $('#Email').val()

    };
    var datospasajerosjson =JSON.stringify(datospasajeros);

    $.ajax({
        url: UrlApiUpdate,
        type: 'PUT',
        data: datospasajerosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            console.log(response);
            alert('Pasajero actualizado de forma correcta');
            $('#Miformulario').submit();
        },
        error: function(textStatus, errorThrown){
            alert('error ' + textStatus+ errorThrown);
        }
    })

}

function EliminarRegistro(p_codigo_pasajero){
    var datospasajeros={
       codigo_pasajero: p_codigo_pasajero,
    };

    var datospasajerosjson =JSON.stringify(datospasajeros);

    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data: datospasajerosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success : function(response){
            console.log(response);
            alert('Pasajero Eliminado de Forma Correcta');
            $('#Miformulario').submit();
        },
        error: function(textStatus, errorThrown){
            alert('Error ' + textStatus+ errorThrown);
        }
    })
}