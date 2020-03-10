
var api = apimock;
var Pintar = false;
var app = (function () {

  var puntos = [];
  var currentAuthor;
  var currentBluePrint;
  var requestResponse;

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
  currentAuthor = author;
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
    Pintar = true;
	  api = apiclient;
    api.getBlueprintsByNameAndAuthor(name,author, canvas);
    $("#current").text("Current blueprint: " + name);
    currentBluePrint = name;
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

  var addPoints = function (){
    for(var i = 0; i < puntos.length; i++) {
      requestResponse.points.push(puntos[i]); 
    };
    puntos = [];
  }

  var blueprintGet = function () {
    var promise = $.get('http://localhost:8080/blueprints/' + currentAuthor + '/' + currentBluePrint);

    promise.then(
            function (data) {
                requestResponse = data;
            },
            function () {
                requestResponse = {author : currentAuthor, name : "", points : []};
                alert("$.get failed!");
            }
    );
    return promise;
  };

    
  var putBluePrint = function(){
    var putPromise = $.ajax({
          url: 'http://localhost:8080/blueprints/' + currentAuthor + '/' + currentBluePrint,
          type: 'PUT',    
          data: JSON.stringify(requestResponse),
          contentType: "application/json",
    });
    putPromise.then(
                function () {
                    console.info("OK");
                    getAuthors(currentAuthor);
                    getPoints(currentBluePrint,currentAuthor);
                },
                function () {
                    console.info("ERROR");
                }

        );

    return putPromise;
  };
    

  return{
      get : getAuthors,
      getp : getPoints,
      limpiar : limpiar,

      addOrUpdate: function () {
        blueprintGet()
        .then(addPoints)
        .then(putBluePrint);
      },

    init:function(){
      var canvas = document.getElementById("Canvas");
      var ctx = canvas.getContext("2d");
      var offset  = gOffset(canvas);

      if(window.PointerEvent) {
        canvas.addEventListener("pointerdown", function(event){
          console.log(Pintar);
          if(Pintar){
            var point = {x: event.pageX-offset.left, y : event.pageY-offset.top}
            puntos.push(point);
            ctx.lineTo(event.pageX-offset.left , event.pageY-offset.top);
            ctx.stroke();
          }
        });
      }
    }
  };
})();