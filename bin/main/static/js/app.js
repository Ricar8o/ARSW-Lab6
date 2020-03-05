
var api = apimock;

var app = (function () {

  var getAuthors = function(author){
  $("#authorP").text("");
  $("#current").text("");
	api = apiclient;
	$("#total").text(0);
	$("#blups").find("tr:gt(0)").remove();
  apiclient.getBlueprintsByAuthor(author, table);
  if (author != ""){
    $("#authorP").text(author+"'s blueprints:");
  }
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
	  api = apiclient;
    api.getBlueprintsByNameAndAuthor(name,author, canvas);
    $("#current").text("Current blueprint: " + name);
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

  var gOffset = function getOffset(obj) {
    var offsetLeft = 0;
    var offsetTop = 0;
    do {
      if (!isNaN(obj.offsetLeft)) {
          offsetLeft += obj.offsetLeft;
      }
      if (!isNaN(obj.offsetTop)) {
          offsetTop += obj.offsetTop;
      }   
    } while(obj = obj.offsetParent );
    return {left: offsetLeft, top: offsetTop};
  } 

  return{
      get : getAuthors,
      getp : getPoints,
      limpiar : limpiar,

    
    init:function(){
      var canvas = document.getElementById("Canvas");
      var ctx = canvas.getContext("2d");
      var offset  = gOffset(canvas);

      if(window.PointerEvent) {
        canvas.addEventListener("pointerdown", function(event){
          ctx.lineTo(event.pageX-offset.left , event.pageY-offset.top);
          ctx.stroke();
          console.info((event.pageX-offset.left)+','+(event.pageY-offset.top));
        });
      }
    }
  };
})();