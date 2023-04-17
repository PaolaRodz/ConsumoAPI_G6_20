var UrlApiGetAll = 'http://localhost:5006/vuelo/getall';

$(document).ready(function(){
    CargarVuelo();
   });
   
   function CargarVuelo(){
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
                   '<td>'+ MisItems[i].codigo_de_vuelo +'</td>'+
                   '<td>'+ MisItems[i].ciudad_origen +'</td>'+
                   '<td>'+ MisItems[i].ciudad_destino +'</td>'+
                   '<td>'+ MisItems[i].fecha_de_vuelo +'</td>'+
                   '<td>'+ MisItems[i].cantidad_de_pasajeros + '</td>'+
                   '<td>'+ MisItems[i].tipo_avion +'</td>'+
                   '<td>'+ MisItems[i].distancia_km +'</td>'+
                '<td>'+
                '<button id="btneditar" class="btn btn-primary" onclick="CargarVuelo('+ MisItems[i].codigo_de_vuelo +')">Editar</button>' +
                '</td>' + 
               '</tr>';
               $('#DatosVuelo').html(Valores);
               }
           }
       });
   }