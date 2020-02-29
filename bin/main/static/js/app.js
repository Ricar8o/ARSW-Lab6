
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
      return "<tr><td>" + blueprint.name + "</td><td>" + blueprint.points.length + "</td><td><input type='checkbox' name='open'></td></tr>"
      })  
    );
    $("#total").text(i);
  }

  var limpiar = function(){
    var lienzo = document.getElementById("Canvas");
    var conte = lienzo.getContext("2d");
    conte.clearRect(0, 0, lienzo.width, lienzo.height );
  }

  var getPoints = function(name,author){
    api.getBlueprintsByNameAndAuthor(name,author, canvas);
      
  }

  var canvas = function(n,blueprint) {
    var points = blueprint.points;
    var lienzo = document.getElementById("Canvas");
    var ctx = lienzo.getContext("2d");
    ctx.moveTo(points[0].x,points[0].y);
    for(var i = 0; i < points.length; i++) {
      //console.log(points[i].x + ' ' + points[i].y);
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