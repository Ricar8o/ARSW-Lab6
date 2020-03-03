
var api = apimock;

var app = (function () {


  var getAuthors = function(author){
	$("#blups").find("tr:gt(0)").remove();
    api.getBlueprintsByAuthor(author, table);
  }

  var table = function(a, blueprintss) {
  var i = 0;
    $("#blups").append(
    blueprintss.map(function(blueprint){
	  i+= blueprint.points.length;
      return "<tr><td>" + blueprint.name + "</td><td>" + blueprint.points.length + "</td><td><button type='button' onclick='app.getp(\"" +blueprint.name + '" , "' + blueprint.author + "\")'>Open</button></td></tr>"
      })  
    );
    $("#total").text(i);
  }

  var limpiar = function(){
    var lienzo = document.getElementById("Canvas");
    var conte = lienzo.getContext("2d");
    conte.clearRect(0, 0, lienzo.width, lienzo.height );
	conte.beginPath();
  }

  var getPoints = function(name,author){
    api.getBlueprintsByNameAndAuthor(name,author, canvas);
  }

  var canvas = function(n,blueprint) {
	app.limpiar();
    var points = blueprint.points;
    var lienzo = document.getElementById("Canvas");
    var ctx = lienzo.getContext("2d");
    ctx.moveTo(points[0].x,points[0].y);
    for(var i = 0; i < points.length; i++) {
      ctx.lineTo(points[i].x,points[i].y); 
    };
    ctx.stroke();
  }

  return{
      get : getAuthors,
      getp : getPoints,
      limpiar : limpiar
  };
})();