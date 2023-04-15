var ApiGetAll = '{{UrlPasajero}}/pasajero/getall';

$(document).ready(function(){
    CargarPasajeros();
   });
   
   function CargarPasajeros(){
       $.ajax({
           url: ApiGetAll,
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
                   '<td>' + 
                   '<button id="btneditar" class="btn btn-primary" onclick="CargarEstudiante('+ MisItems[i].numero_alumno +')">Editar</button>' +
                   '<td>'+
                   '<button id="btneliminar" class="btn btn-dark" onclick="EliminarEstudiante('+ MisItems[i].numero_alumno +')">Eliminar</button>' +
                   '</td>'+
                   '</td>' + 
               '</tr>';
               $('#DatosEstudiantes').html(Valores);
               }
           }
       });
   }