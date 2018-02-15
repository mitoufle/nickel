const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql');
const http = require('http');
const app = express()
const port = 3000
var cam_query;

function generate_table_from_product_query(res_query) {

  var table ='';
  for(var i=0;i<res_query.length; i++){
    table +='<tr><td>'+ res_query[i].serial_number +'</td><td>'+ res_query[i].type_produit
    +'</td><td>'+ res_query[i].date_e +'</td><td>'+ res_query[i].date_s +'</td><td>'+ res_query[i].lieu_stockage
    +'</td><td>'+ res_query[i].attribution +'</td><td>'+ res_query[i].remaques +'</td></tr>';
  }
  table ='<table class="striped bordered responsive-table highlight"><thead><tr><th>S/N</th><th>type</th><th>date d\'entrée</th><th>date de sortie</th><th>lieu de stockage</th><th>attribution</th><th>remarques</th></tr></thead>'+ table +'</table>';
  table = table.replace(/null/g, "");
  return table;
};

var con = mysql.createConnection({
  host: "fr-mysql-prod-data",
  user: "francois",
  password: "12rapack",
  database: "TEST"
});

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')

app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
  response.render('home', {
    cam_table: cam_query
  })
})

app.use((err, request, response, next) => {
  // log the error, for now just console.log
  console.log(err)
  response.status(500).send('Something broke!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

con.connect(function(err) {
  if (err) throw err;
  console.log("[mysql error1]",err);
  console.log("Connected!");
  var sql_request = 'SELECT *, DATE_FORMAT(date_entree,"%d/%m/%Y") as date_e, DATE_FORMAT(date_sortie,"%d/%m/%Y") as date_s FROM produit'
  con.query(sql_request, function (err, req_result) {
    cam_query = generate_table_from_product_query(req_result);
    console.log(cam_query);
    console.log("[mysql error]",err);
  });
  });
