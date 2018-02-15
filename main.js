var res_main_frame;
var xhttp = new XMLHttpRequest();

function generate_table_from_product_query(res_query) {

  var table ='';
  for(var id in res_query.id){
    table +='<tr><td>'+ res_query[i].id +'</td><td>'+ res_query[i].serial_number +'</td><td>'+ res_query[i].type_produit
    +'</td><td>'+ res_query[i].date_entree +'</td><td>'+ res_query[i].date_sortie +'</td><td>'+ res_query[i].lieu_stockage
    +'</td><td>'+ res_query[i].attribution +'</td><td>'+ res_query[i].remarque +'</td></tr>';
  }
  table ='<table class="striped"><tr><th>Id</th><th>S/N</th><th>type</th><th>date_entree</th><th>date_sortie</th><th>lieu de stockage</th><th>attribution</th><th>remarques</th></tr>'+ table +'</table>';
  return table;
};

function ret(param){
  return param;
}

function fetch_stuff(url, cFunction) {
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open("GET", "http://localhost/js/test.js", true);
  xhttp.send();
};

res_main_frame = fetch_stuff('#blabla',ret)
document.getElementById('main_frame').innerHTML = res_main_frame;
