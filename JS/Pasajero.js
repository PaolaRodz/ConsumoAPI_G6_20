var UrlApiGetAll = 'http://localhost:5006/pasajero/getall';
var UrlApiInsert ='http://localhost:5006/pasajero/insertar/:codigo_pasajero';
var UrlApiGetUno = 'http://localhost:5006/pasajero/getOne/:codigo_pasajero';
var UrlApiActualizar = 'http://localhost:5006/pasajero/actualizar/:codigo_pasajero';
var UrlApiEliminar = 'http://localhost:5006/pasajero/eliminar/:codigo_pasajero';


$(document).ready(function(){
    CargarPasajeros();
   });
   
   function CargarPasajeros(){
       $.ajax({
           url: UrlApiGetAll,
           type: 'GET',
           datatype: 'JSON',
           success: function(response){
               var MisItems = response;
               var Valores = '';
               for(i=0; i<MisItems.length; i++)
               {
                   Valores +=  '<tr>'+
                   '<td>'+ MisItems[i].codigo_pasajero +'</td>'+
                   '<td>'+ MisItems[i].nombres +'</td>'+
                   '<td>'+ MisItems[i].apellidos +'</td>'+
                   '<td>'+ MisItems[i].fecha_registro +'</td>'+
                   '<td>'+ MisItems[i].nacionalidad + '</td>'+
                   '<td>'+ MisItems[i].numero_telefonico +'</td>'+
                   '<td>'+ MisItems[i].email +'</td>'+
                '<td>'+
                '<button id="btneditar" class="btn btn-primary" onclick="CargarPasajero('+ MisItems[i].codigo_pasajero +')">Editar</button>' +
                '<td>'+
                '<button id="btneliminar" class="btn btn-dark" onclick="EliminarPasajero('+ MisItems[i].codigo_pasajero +')">Eliminar</button>' +
                '</td>'+
                '</td>' + 
               '</tr>';
               $('#DatosPasajeros').html(Valores);
               }
           }
       });
   }
   function AgregarPasajero(){
    var datospasajeros ={
        codigo_pasajero :$('#CODPASAJERO').val(),
        nombres :$('#NOMBRES').val(),
        apellidos :$('#APELLIDOS').val(),
        fecha_registro :$('#FECHAREGISTRO').val(),
        nacionalidad :$('#NACIONALIDAD').val(),
        numero_telefonico :$('#NUMTELEFONICO').val(),
        email:$('#EMAIL').val()
    };
    var datospasajerosjson = JSON.stringify(datospasajeros);
   //alert(datospasajerosjson);
    $.ajax({
        url : UrlApiInsert,
        type : 'POST',
        data : datospasajerosjson,
        datatype :'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
            alert('Pasajero Agregado de Forma Correcta');
        },
        error : function(textStatus, errorThrown){
            alert('Error ' + textStatus + errorThrown);
        }
    }
    );
    //alert('');
}

function CargarPasajero(p_codigo_pasajero){
   var datospasajeros = {
    codigo_pasajero: p_codigo_pasajero
   };
   var datospasajerosjson = JSON.stringify(datospasajeros);
   $.ajax({
    url : UrlApiGetUno,
    type : 'POST',
    data : datospasajerosjson,
    datatype :'JSON',
    contentType : 'application/json',
    success : function(response){
        var MisItems = response;
        for(i=0; i<MisItems.length; i++){
            $('#CODPASAJERO').val(MisItems[i].codigo_pasajero);
            $('#NOMBRES').val(MisItems[i].nombres);
            $('#APELLIDOS').val(MisItems[i].apellidos);
            $('#FECHAREGISTRO').val(MisItems[i].fecha_registro);
            $('#NACIONALIDAD').val(MisItems[i].nacionalidad);
            $('#NUMTELEFONICO').val(MisItems[i].numero_telefonico);
            $('#EMAIL').val(MisItems[i].email);
            var btnactualizar = '<input type="submit" class="btn btn-primary" ' +
             'id="btnagregar" onclick="ActualizarPasajero('+ MisItems[i].codigo_pasajero +')" value="Actualizar Pasajero" >';
            $('#btnagregarpasajero').html(btnactualizar)
        }
    }
   }
   );
}

function ActualizarPasajero(p_codigo_pasajero){
    var datospasajeros ={
        codigo_pasajero :$('#CODPASAJERO').val(),
        nombres :$('#NOMBRES').val(),
        apellidos :$('#APELLIDOS').val(),
        fecha_registro :$('#FECHAREGISTRO').val(),
        nacionalidad :$('#NACIONALIDAD').val(),
        numero_telefonico :$('#NUMTELEFONICO').val(),
        email :$('#EMAIL').val()
    };
    var datospasajerosjson = JSON.stringify(datospasajeros);
   //alert(datospasajerosjson);
    $.ajax({
        url : UrlApiActualizar,
        type : 'PUT',
        data : datospasajerosjson,
        datatype :'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
            alert('Pasajero Actualizado de Forma Correcta');
           
        },
        error : function(textStatus, errorThrown){
            alert('Error ' + textStatus + errorThrown);
        }
    }
    );
    //alert('');
}

function EliminarPasajero(p_codigo_pasajero){
    var datospasajeros ={
        codigo_pasajero : p_codigo_pasajero,
    };
    var datospasajerosjson = JSON.stringify(datospasajeros);
   //alert(datospasajerosjson);
    $.ajax({
        url : UrlApiEliminar,
        type : 'DELETE',
        data : datospasajerosjson,
        datatype :'JSON',
        contentType : 'application/json',
        success : function(response){
            console.log(response);
            alert('Pasajero Eliminado de Forma Correcta');
            CargarPasajeros();
        },
        error : function(textStatus, errorThrown){
            alert('Error ' + textStatus + errorThrown);
        }
    }
    );
    //alert('');
}