var express    =    require("express");
var mysql      =    require('mysql');
var bodyParser =    require('body-parser');
var app        =    express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'highscores',
    debug    :  false
});

function error(statusCode, error, response){
  switch(statusCode) {
      case 500:
          console.error("INTERNAL SERVER ERROR: ", error);
          break;
      case 503:
          console.error('CONNECTION ERROR: ', error);
          break;
      default:
          console.error('UNKNOWN ERROR: ', error);
  }
  response.statusCode = statusCode;
  response.send({
      result: 'error',
      error:   error.code
  });
};

app.get("/gettopten",function(req,res){
  pool.getConnection(function(err,connection){
    if (err) {
      error(503, err, res);
    } else {
      connection.query("select * from highscores order by score desc limit 10", function(err,rows){
          connection.release();
          if (err) {
              error(500, err, res);
          } else {
              res.json(rows);
          }
      });
    }
  });
});

app.post('/add',function(req,res){
    var score = req.body.score;
    var name  = req.body.name;
    if((score === undefined) ||(name === undefined)){
      error(500, "Undefined parameters", res);
      return;
    }
    pool.getConnection(function(err,connection){
      if (err) {
        error(503, err, res);
      } else {
        console.log("ADDING SCORE: " + name +  " - " + score)
        connection.query("insert into `highscores` (`score`, `name`) VALUES (" + score + ",'" + name + "')",function(err,rows){
            connection.release();
            if (err) {
                error(500, err, res);
            } else {
                res.send({
                    result: 'success',
                });
            }
        });
      }
    });
});

app.listen(5555);
console.log('Highscore server listening on port 5555');
