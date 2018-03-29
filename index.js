var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var MongoClient = require("mongodb").MongoClient;
var port =8888;
var db;

MongoClient.connect('mongodb://localhost:27017/yaf',
	function(err,_db)  {
		if (err)
			console.log("Erreur de connexion à mongodb");
		else {
			console.log("Yeah! Connected to port : "+port);

			db = _db;

		}
	}
	);

app.use("/css", express.static(__dirname + "/css"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/js", express.static(__dirname + "/js"));


app.get("/", function(req, res) {
	res.sendFile(__dirname + "/html/index.html");

});

app.listen(port);
console.log("running... port : "+port);
var taille = 25
var map = new Array(taille)

for (var i = map.length - 1; i >= 0; i--) {
	map[i] = new Array(taille)
}

for (var j = map.length - 1; j >= 0; j--) {
	for (var k = map[j].length - 1; k >= 0; k--) {
		if(j!=0&&k!=0&&j!=map.length-1&&k!=map[j].length-1)
			map[j][k] = 0;
		else
			map[j][k]=-1;
	}
}




setInterval(function(){ 
	map[10][10]=10;


}, 3000);



app.post("/getMap", function(req, res) {
	res.json(map)

});



var tableauID = new Array(10)
app.get("/:id", function(req, res) {
	var id = eval(req.params.id)
	var existeDeja = false;
	for (var j = map.length - 1; j >= 0; j--) {
		for (var k = map[j].length - 1; k >= 0; k--) {
			if(map[j][k] == id)
				existeDeja = true;
			
		}
	}
	if(!existeDeja){
		var pos = new Array(2)
		pos[0]=5
		pos[1]=5
		tableauID[id] = pos
		map[tableauID[id][0]][tableauID[id][0]] = id
	}
	res.sendFile(__dirname + "/html/map.html");

});


app.post("/move/:direction/:id", function(req, res) {
	var direction = req.params.direction
	var id = eval(req.params.id)

		var xdeb= tableauID[id][0]
		var ydeb= tableauID[id][1]

		var x = tableauID[id][0]
		var y = tableauID[id][1]

	for (var j = map.length - 1; j >= 0; j--) {
		for (var k = map[j].length - 1; k >= 0; k--) {
			if(map[j][k]==id)
			{
				x=j
				y=k
				xdeb =j
				ydeb =k

			}
		}
	}
	
	

	switch (direction)
	{
		case "37":
		y=y-1;
		break;

		case "38":
		x=x-1;
		break;

		case "39":
		y=y+1;
		
		break;

		case "40":
		x=x+1;
		
		break;
	}

	if(map[x][y]!=-1)
	{	
		map[xdeb][ydeb] = 0
		map[x][y] = id

	}
	
	
	res.json(map)

});
